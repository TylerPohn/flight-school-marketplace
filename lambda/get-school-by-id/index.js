const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb');

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
    const schoolId = event.pathParameters?.schoolId;

    if (!schoolId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing schoolId parameter',
        }),
      };
    }

    const command = new GetCommand({
      TableName: process.env.TABLE_NAME,
      Key: {
        schoolId,
      },
    });

    const response = await docClient.send(command);

    if (!response.Item) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: 'School not found',
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response.Item),
    };
  } catch (error) {
    console.error('Error:', error);
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
