const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
const { createLogger } = require('./logger');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event, context) => {
  const logger = createLogger(context);
  logger.logEvent(event);

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    logger.debug('Handling OPTIONS request for CORS');
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const tableName = process.env.TABLE_NAME;
    const queryParams = event.queryStringParameters || {};

    logger.addContext('tableName', tableName);

    let command;
    let params = {
      TableName: tableName,
    };

    // If filtering by state, use the GSI
    if (queryParams.state) {
      logger.info('Querying schools by state', { state: queryParams.state });
      command = new QueryCommand({
        ...params,
        IndexName: 'StateIndex',
        KeyConditionExpression: '#state = :state',
        ExpressionAttributeNames: {
          '#state': 'state',
        },
        ExpressionAttributeValues: {
          ':state': queryParams.state,
        },
      });
    } else {
      logger.info('Scanning all schools');
      command = new ScanCommand(params);
    }

    const response = await docClient.send(command);

    // Apply additional filters if needed
    let items = response.Items || [];
    const initialCount = items.length;

    logger.debug('Retrieved items from DynamoDB', { count: initialCount });

    // Filter by training type if specified
    if (queryParams.trainingType && queryParams.trainingType !== 'Both') {
      items = items.filter(school => school.trainingType === queryParams.trainingType);
      logger.debug('Filtered by training type', {
        trainingType: queryParams.trainingType,
        remainingCount: items.length
      });
    }

    // Filter by programs if specified
    if (queryParams.programs) {
      const requestedPrograms = queryParams.programs.split(',');
      items = items.filter(school =>
        requestedPrograms.some(program => school.programs?.includes(program))
      );
      logger.debug('Filtered by programs', {
        programs: requestedPrograms,
        remainingCount: items.length
      });
    }

    // Filter by budget if specified
    if (queryParams.maxBudget) {
      const maxBudget = parseInt(queryParams.maxBudget);
      items = items.filter(school => school.costBand?.min <= maxBudget);
      logger.debug('Filtered by budget', {
        maxBudget,
        remainingCount: items.length
      });
    }

    // Sort if specified
    if (queryParams.sortBy) {
      items = sortSchools(items, queryParams.sortBy);
      logger.debug('Sorted results', { sortBy: queryParams.sortBy });
    }

    logger.logResponse(200, { schoolCount: items.length });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        schools: items,
        count: items.length,
      }),
    };
  } catch (error) {
    logger.error('Failed to retrieve schools', error, {
      tableName: process.env.TABLE_NAME,
      queryParams: event.queryStringParameters
    });

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to retrieve schools',
        message: error.message,
      }),
    };
  }
};

function sortSchools(schools, sortBy) {
  const sorted = [...schools];

  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case 'price-asc':
      return sorted.sort((a, b) => (a.costBand?.min || 0) - (b.costBand?.min || 0));
    case 'price-desc':
      return sorted.sort((a, b) => (b.costBand?.min || 0) - (a.costBand?.min || 0));
    case 'rating-desc':
      return sorted.sort((a, b) => (b.avgRating || 0) - (a.avgRating || 0));
    case 'rating-asc':
      return sorted.sort((a, b) => (a.avgRating || 0) - (b.avgRating || 0));
    default:
      return sorted;
  }
}
