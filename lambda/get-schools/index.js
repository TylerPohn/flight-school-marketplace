const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const tableName = process.env.TABLE_NAME;
    const queryParams = event.queryStringParameters || {};

    let command;
    let params = {
      TableName: tableName,
    };

    // If filtering by state, use the GSI
    if (queryParams.state) {
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
      // Otherwise scan the whole table
      command = new ScanCommand(params);
    }

    const response = await docClient.send(command);

    // Apply additional filters if needed
    let items = response.Items || [];

    // Filter by training type if specified
    if (queryParams.trainingType && queryParams.trainingType !== 'Both') {
      items = items.filter(school => school.trainingType === queryParams.trainingType);
    }

    // Filter by programs if specified
    if (queryParams.programs) {
      const requestedPrograms = queryParams.programs.split(',');
      items = items.filter(school =>
        requestedPrograms.some(program => school.programs?.includes(program))
      );
    }

    // Filter by budget if specified
    if (queryParams.maxBudget) {
      const maxBudget = parseInt(queryParams.maxBudget);
      items = items.filter(school => school.costBand?.min <= maxBudget);
    }

    // Sort if specified
    if (queryParams.sortBy) {
      items = sortSchools(items, queryParams.sortBy);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        schools: items,
        count: items.length,
      }),
    };
  } catch (error) {
    console.error('Error:', error);
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
