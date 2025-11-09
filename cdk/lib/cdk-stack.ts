import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as path from 'path';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Table for Flight Schools
    const schoolsTable = new dynamodb.Table(this, 'FlightSchoolsTable', {
      tableName: 'flight-schools',
      partitionKey: { name: 'schoolId', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.RETAIN, // Keep data if stack is deleted
      pointInTimeRecovery: true,
    });

    // Add GSI for querying by state
    schoolsTable.addGlobalSecondaryIndex({
      indexName: 'StateIndex',
      partitionKey: { name: 'state', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'avgRating', type: dynamodb.AttributeType.NUMBER },
    });

    // Lambda Function for Getting Schools
    const getSchoolsFunction = new lambda.Function(this, 'GetSchoolsFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../lambda/get-schools')),
      timeout: cdk.Duration.seconds(10),
      memorySize: 256,
      environment: {
        TABLE_NAME: schoolsTable.tableName,
      },
    });

    // Lambda Function for Getting School by ID
    const getSchoolByIdFunction = new lambda.Function(this, 'GetSchoolByIdFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../lambda/get-school-by-id')),
      timeout: cdk.Duration.seconds(10),
      memorySize: 256,
      environment: {
        TABLE_NAME: schoolsTable.tableName,
      },
    });

    // Grant DynamoDB permissions
    schoolsTable.grantReadData(getSchoolsFunction);
    schoolsTable.grantReadData(getSchoolByIdFunction);

    // Lambda Function for Match Explainer
    const matchExplainerFunction = new lambda.Function(this, 'MatchExplainerFunction', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, '../../lambda/match-explainer')),
      timeout: cdk.Duration.seconds(30),
      memorySize: 512,
      environment: {
        NODE_OPTIONS: '--enable-source-maps',
      },
    });

    // Grant Bedrock permissions to Lambda
    matchExplainerFunction.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['bedrock:InvokeModel'],
      resources: [
        'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0'
      ],
    }));

    // API Gateway
    const api = new apigateway.RestApi(this, 'MatchExplainerApi', {
      restApiName: 'Flight School Match Explainer API',
      description: 'API for AI-powered flight school match explanations',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization'],
      },
    });

    // API Gateway Lambda Integrations
    const getSchoolsIntegration = new apigateway.LambdaIntegration(getSchoolsFunction);
    const getSchoolByIdIntegration = new apigateway.LambdaIntegration(getSchoolByIdFunction);
    const explainMatchIntegration = new apigateway.LambdaIntegration(matchExplainerFunction);

    // Create /schools resource
    const schools = api.root.addResource('schools');
    schools.addMethod('GET', getSchoolsIntegration);

    // Create /schools/{schoolId} resource
    const schoolById = schools.addResource('{schoolId}');
    schoolById.addMethod('GET', getSchoolByIdIntegration);

    // Create /explain-match resource
    const explainMatch = api.root.addResource('explain-match');
    explainMatch.addMethod('POST', explainMatchIntegration);

    // CloudFormation Outputs
    new cdk.CfnOutput(this, 'ApiEndpoint', {
      value: api.url,
      description: 'API Gateway endpoint URL',
      exportName: 'MatchExplainerApiEndpoint',
    });

    new cdk.CfnOutput(this, 'ApiUrl', {
      value: `${api.url}explain-match`,
      description: 'Full API URL for match explanations',
      exportName: 'MatchExplainerFullUrl',
    });

    new cdk.CfnOutput(this, 'LambdaFunctionName', {
      value: matchExplainerFunction.functionName,
      description: 'Lambda function name',
      exportName: 'MatchExplainerFunctionName',
    });

    new cdk.CfnOutput(this, 'VercelEnvVar', {
      value: `VITE_MATCH_API_URL=${api.url.replace(/\/$/, '')}`,
      description: 'Add this to Vercel environment variables',
      exportName: 'VercelEnvironmentVariable',
    });

    new cdk.CfnOutput(this, 'SchoolsTableName', {
      value: schoolsTable.tableName,
      description: 'DynamoDB table name for flight schools',
      exportName: 'FlightSchoolsTableName',
    });

    new cdk.CfnOutput(this, 'SchoolsApiUrl', {
      value: `${api.url}schools`,
      description: 'API endpoint for getting all schools',
      exportName: 'SchoolsApiUrl',
    });
  }
}
