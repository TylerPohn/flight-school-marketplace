import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as path from 'path';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

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

    // API Gateway Lambda Integration
    const explainMatchIntegration = new apigateway.LambdaIntegration(matchExplainerFunction);

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
  }
}
