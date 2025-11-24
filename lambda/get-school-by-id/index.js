const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');
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
    const schoolId = event.pathParameters?.schoolId;
    const tableName = process.env.TABLE_NAME;

    logger.addContextBatch({
      tableName,
      schoolId
    });

    if (!schoolId) {
      logger.warn('Missing schoolId parameter in request');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing schoolId parameter',
        }),
      };
    }

    logger.info('Fetching school from DynamoDB', { schoolId });

    const command = new GetCommand({
      TableName: tableName,
      Key: {
        schoolId,
      },
    });

    const response = await docClient.send(command);

    if (!response.Item) {
      logger.warn('School not found', { schoolId });
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: 'School not found',
        }),
      };
    }

    logger.logResponse(200, { schoolId, schoolName: response.Item.name });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.Item),
    };
  } catch (error) {
    logger.error('Failed to retrieve school', error, {
      tableName: process.env.TABLE_NAME,
      schoolId: event.pathParameters?.schoolId
    });

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to retrieve school',
        message: error.message,
      }),
    };
  }
};
