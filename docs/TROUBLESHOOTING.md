# Troubleshooting Guide

This guide covers common issues and their solutions for the Flight School Marketplace application.

---

## Table of Contents

- [Environment Setup Issues](#environment-setup-issues)
- [Build Errors](#build-errors)
- [AWS & CDK Issues](#aws--cdk-issues)
- [Runtime Errors](#runtime-errors)
- [API Integration Issues](#api-integration-issues)
- [Database Issues](#database-issues)
- [Performance Issues](#performance-issues)

---

## Environment Setup Issues

### Node Version Mismatch

**Problem**: Build or runtime errors related to Node version compatibility.

**Symptoms**:
```
Error: The engine "node" is incompatible with this module
```

**Solution**:
1. Check your Node version: `node --version`
2. Install Node 20.x or later (22.x recommended)
3. Use nvm to manage versions:
   ```bash
   nvm install 22
   nvm use 22
   ```

### Missing Environment Variables

**Problem**: Application fails to start or API calls don't work.

**Symptoms**:
- "VITE_MATCH_API_URL not configured" warnings in console
- API calls returning 404 or CORS errors
- Frontend shows hardcoded mock data instead of real data

**Solution**:

1. **Frontend Setup**:
   ```bash
   cd frontend
   cp .env.example .env.local
   ```

2. **Edit `.env.local`**:
   ```env
   VITE_MATCH_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/prod
   ```

3. **Get your API URL**:
   ```bash
   cd cdk
   cdk deploy
   # Look for "ApiEndpoint" in the outputs
   ```

4. **Verify environment variables are loaded**:
   - Check browser console for `import.meta.env.VITE_MATCH_API_URL`
   - Restart Vite dev server after changing `.env` files

**Note**: Environment variables must be prefixed with `VITE_` to be accessible in the frontend.

### AWS Credentials Not Configured

**Problem**: CDK deployment or DynamoDB scripts fail with authentication errors.

**Symptoms**:
```
Error: Unable to resolve AWS account to use
Error: Missing credentials in config
```

**Solution**:

1. **Configure AWS CLI**:
   ```bash
   aws configure
   ```
   Enter your:
   - AWS Access Key ID
   - AWS Secret Access Key
   - Default region (e.g., `us-east-1`)
   - Default output format (e.g., `json`)

2. **Verify credentials**:
   ```bash
   aws sts get-caller-identity
   ```

3. **Alternative: Use environment variables**:
   ```bash
   export AWS_ACCESS_KEY_ID=your_access_key
   export AWS_SECRET_ACCESS_KEY=your_secret_key
   export AWS_DEFAULT_REGION=us-east-1
   ```

### Package Installation Failures

**Problem**: `npm install` fails or shows dependency conflicts.

**Symptoms**:
```
npm ERR! ERESOLVE unable to resolve dependency tree
npm ERR! peer dependency conflicts
```

**Solutions**:

1. **Clean install**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Use correct Node version** (see above)

3. **Force install (use cautiously)**:
   ```bash
   npm install --legacy-peer-deps
   ```

4. **Clear npm cache**:
   ```bash
   npm cache clean --force
   npm install
   ```

---

## Build Errors

### TypeScript Compilation Errors

**Problem**: Build fails with TypeScript type errors.

**Symptoms**:
```
error TS2307: Cannot find module 'xyz'
error TS2322: Type 'X' is not assignable to type 'Y'
```

**Solutions**:

1. **Check for missing type definitions**:
   ```bash
   npm install --save-dev @types/node @types/react @types/react-dom
   ```

2. **Clear TypeScript cache**:
   ```bash
   rm -rf frontend/node_modules/.vite
   rm -rf frontend/dist
   npm run build
   ```

3. **Verify tsconfig.json** is properly configured:
   - Check `compilerOptions.paths` for custom module paths
   - Ensure `include` array contains all TypeScript files
   - Verify `moduleResolution` is set to "bundler" or "node"

4. **Type-check without building**:
   ```bash
   cd frontend
   npx tsc --noEmit
   ```

### Vite Build Failures

**Problem**: Vite build process fails.

**Symptoms**:
```
Failed to parse source for import analysis
[vite]: Rollup failed to resolve import
```

**Solutions**:

1. **Check import paths**:
   - Use relative imports: `./components/MyComponent`
   - Don't use `.tsx` extension in imports
   - Verify file names match case-sensitively

2. **Clear Vite cache**:
   ```bash
   rm -rf frontend/node_modules/.vite
   rm -rf frontend/dist
   npm run dev
   ```

3. **Check for circular dependencies**:
   - Use `madge` to detect circular imports:
   ```bash
   npx madge --circular frontend/src
   ```

### ESLint Errors Blocking Build

**Problem**: ESLint errors prevent development or build.

**Symptoms**:
```
error  'React' must be in scope when using JSX
error  Missing return type on function
```

**Solutions**:

1. **Fix common issues**:
   - Remove unused imports
   - Add return types to functions
   - Fix React Hook dependency arrays

2. **Temporarily disable during development** (not recommended for production):
   ```bash
   # Add to vite.config.ts
   export default defineConfig({
     plugins: [react({
       // disable eslint during dev
     })],
   })
   ```

3. **Auto-fix issues**:
   ```bash
   npm run lint -- --fix
   ```

---

## AWS & CDK Issues

### CDK Bootstrap Required

**Problem**: First-time CDK deployment fails.

**Symptoms**:
```
Error: This stack uses assets, so the toolkit stack must be deployed
```

**Solution**:
```bash
cdk bootstrap aws://ACCOUNT-ID/REGION
# Or let CDK detect your account:
cdk bootstrap
```

### CDK Deployment Failures

**Problem**: `cdk deploy` fails with various errors.

**Common Issues & Solutions**:

1. **IAM Permissions**:
   ```
   Error: User is not authorized to perform: cloudformation:CreateStack
   ```
   - Ensure your AWS user has Administrator or sufficient CloudFormation permissions
   - Check IAM policy includes: `cloudformation:*`, `lambda:*`, `apigateway:*`, `dynamodb:*`, `iam:*`

2. **Resource Already Exists**:
   ```
   Error: Table flight-schools already exists
   ```
   - Delete existing resources manually or change resource names
   - Use `cdk destroy` to remove the stack first

3. **Stack Update Blocked**:
   ```
   Error: No updates are to be performed
   ```
   - This is informational, not an error
   - No changes needed to your infrastructure

4. **Bedrock Model Access**:
   ```
   Error: Access denied for model anthropic.claude-3-5-sonnet
   ```
   - Request model access in AWS Bedrock console
   - Go to AWS Console → Bedrock → Model access
   - Request access to Claude 3.5 Sonnet
   - Wait for approval (usually instant for us-east-1)

### Lambda Function Errors

**Problem**: Lambda functions fail at runtime.

**Symptoms** (check CloudWatch Logs):
```
Error: Cannot find module '@aws-sdk/client-bedrock-runtime'
Task timed out after 30.00 seconds
```

**Solutions**:

1. **Missing Dependencies**:
   - Lambda layers not properly configured
   - Re-deploy with correct dependencies:
   ```bash
   cd cdk
   cdk deploy --force
   ```

2. **Timeout Issues**:
   - Increase timeout in `cdk/lib/cdk-stack.ts`:
   ```typescript
   timeout: cdk.Duration.seconds(30), // Increase from 10
   ```

3. **Environment Variables**:
   - Verify `TABLE_NAME` is set in Lambda environment
   - Check `cdk/lib/cdk-stack.ts` environment configuration

4. **View Lambda Logs**:
   ```bash
   aws logs tail /aws/lambda/YourFunctionName --follow
   ```

### API Gateway CORS Issues

**Problem**: Frontend receives CORS errors when calling API.

**Symptoms**:
```
Access to fetch at 'https://xyz.amazonaws.com' from origin 'http://localhost:5173'
has been blocked by CORS policy
```

**Solutions**:

1. **Verify CORS configuration** in `cdk/lib/cdk-stack.ts`:
   ```typescript
   defaultCorsPreflightOptions: {
     allowOrigins: apigateway.Cors.ALL_ORIGINS,
     allowMethods: apigateway.Cors.ALL_METHODS,
     allowHeaders: ['Content-Type', 'Authorization'],
   }
   ```

2. **Add CORS headers to Lambda responses**:
   ```javascript
   return {
     statusCode: 200,
     headers: {
       'Access-Control-Allow-Origin': '*',
       'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
       'Access-Control-Allow-Headers': 'Content-Type'
     },
     body: JSON.stringify(data)
   };
   ```

3. **Handle OPTIONS requests**:
   - API Gateway should handle preflight automatically
   - If not, add explicit OPTIONS method handling

---

## Runtime Errors

### React Component Errors

**Problem**: "Cannot read property 'X' of undefined" or "Cannot read property 'X' of null"

**Symptoms**:
```
TypeError: Cannot read property 'map' of undefined
TypeError: Cannot destructure property 'X' of 'undefined'
```

**Solutions**:

1. **Add null checks**:
   ```typescript
   // Before
   {schools.map(school => ...)}

   // After
   {schools?.map(school => ...)}
   {(schools ?? []).map(school => ...)}
   ```

2. **Provide default values**:
   ```typescript
   const { data = [] } = useQuery();
   ```

3. **Add loading states**:
   ```typescript
   if (!schools) return <CircularProgress />;
   ```

### React Router Navigation Issues

**Problem**: Navigation not working or showing 404 on refresh.

**Symptoms**:
- Links don't navigate
- Refreshing page shows "Cannot GET /schools"

**Solutions**:

1. **Development server (Vite)**:
   - Already configured with `vite.config.ts` historyApiFallback
   - Restart dev server: `npm run dev`

2. **Production deployment**:
   - Configure hosting platform for SPA routing
   - **Vercel**: Automatic
   - **Netlify**: Add `_redirects` file:
     ```
     /*  /index.html  200
     ```
   - **S3/CloudFront**: Configure error page to serve `index.html`

3. **Use `Link` component**:
   ```typescript
   import { Link } from 'react-router-dom';

   // Don't use <a> tags for internal navigation
   <Link to="/schools">Schools</Link>
   ```

### Material-UI Theme Issues

**Problem**: Styles not applying or theme errors.

**Symptoms**:
```
Error: MUI: The `styles` argument provided is invalid
useTheme() may only be used in a theme context
```

**Solutions**:

1. **Ensure ThemeProvider wraps app**:
   ```typescript
   import { ThemeProvider, createTheme } from '@mui/material/styles';

   const theme = createTheme({ /* config */ });

   <ThemeProvider theme={theme}>
     <App />
   </ThemeProvider>
   ```

2. **Check emotion dependencies**:
   ```bash
   npm install @emotion/react @emotion/styled
   ```

3. **Clear cache**:
   ```bash
   rm -rf node_modules/.cache
   ```

---

## API Integration Issues

### API Returns 404

**Problem**: Frontend API calls return 404 errors.

**Solutions**:

1. **Verify API URL**:
   - Check `.env.local` has correct `VITE_MATCH_API_URL`
   - URL should include `/prod` or your stage name
   - Example: `https://abc123.execute-api.us-east-1.amazonaws.com/prod`

2. **Check API Gateway deployment**:
   ```bash
   cd cdk
   cdk deploy
   # Note the ApiEndpoint output
   ```

3. **Test API directly**:
   ```bash
   curl https://your-api-url.amazonaws.com/prod/schools
   ```

4. **Verify endpoint paths**:
   - `/schools` - GET all schools
   - `/schools/{id}` - GET school by ID
   - `/explain-match` - POST match explanation

### API Returns 500 Internal Server Error

**Problem**: API calls fail with server errors.

**Solutions**:

1. **Check CloudWatch Logs**:
   ```bash
   aws logs tail /aws/lambda/CdkStack-GetSchoolsFunction --follow
   ```

2. **Common causes**:
   - DynamoDB table doesn't exist or is empty
   - Lambda doesn't have DynamoDB permissions
   - Malformed data in database
   - Code errors in Lambda function

3. **Verify DynamoDB table**:
   ```bash
   aws dynamodb describe-table --table-name flight-schools
   aws dynamodb scan --table-name flight-schools --limit 1
   ```

4. **Re-populate database**:
   ```bash
   cd scripts/school-data
   node addFinalSchools.cjs
   ```

### Bedrock API Errors

**Problem**: Match explanations fail or show template responses.

**Symptoms**:
- "Failed to generate explanation" errors
- Fallback to generic explanations
- 403 Access Denied errors

**Solutions**:

1. **Enable Bedrock model access**:
   - AWS Console → Bedrock → Model access
   - Request access to `anthropic.claude-3-5-sonnet-20240620-v1:0`
   - Ensure region is `us-east-1`

2. **Check IAM permissions**:
   - Lambda execution role needs `bedrock:InvokeModel` permission
   - Verify in `cdk/lib/cdk-stack.ts`:
   ```typescript
   matchExplainerFunction.addToRolePolicy(new iam.PolicyStatement({
     effect: iam.Effect.ALLOW,
     actions: ['bedrock:InvokeModel'],
     resources: ['arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-5-sonnet-20240620-v1:0']
   }));
   ```

3. **Check CloudWatch Logs**:
   ```bash
   aws logs tail /aws/lambda/CdkStack-MatchExplainerFunction --follow
   ```

4. **Test with fallback disabled**:
   - Temporarily remove try-catch to see actual error
   - Check Bedrock request format matches API spec

---

## Database Issues

### DynamoDB Table Not Found

**Problem**: Queries fail with "Table not found" error.

**Symptoms**:
```
ResourceNotFoundException: Cannot do operations on a non-existent table
```

**Solutions**:

1. **Verify table exists**:
   ```bash
   aws dynamodb list-tables
   aws dynamodb describe-table --table-name flight-schools
   ```

2. **Create table via CDK**:
   ```bash
   cd cdk
   cdk deploy
   ```

3. **Check AWS region**:
   - Ensure Lambda and DynamoDB are in same region
   - Default is `us-east-1`

### DynamoDB Returns Empty Results

**Problem**: API returns empty arrays when data should exist.

**Solutions**:

1. **Check if table has data**:
   ```bash
   aws dynamodb scan --table-name flight-schools --limit 5
   ```

2. **Populate table**:
   ```bash
   cd scripts/school-data
   node addFinalSchools.cjs
   ```

3. **Verify script configuration**:
   - Check `TABLE_NAME` environment variable
   - Ensure AWS credentials are configured
   - Verify region matches CDK deployment

4. **Check GSI (Global Secondary Index)**:
   ```bash
   aws dynamodb describe-table --table-name flight-schools
   # Look for "GlobalSecondaryIndexes" in output
   ```

### DynamoDB Throttling Errors

**Problem**: "ProvisionedThroughputExceededException" errors.

**Symptoms**:
```
Request rate for this table exceeds provisioned throughput limit
```

**Solutions**:

1. **Using on-demand billing** (default in this app):
   - Should not see throttling with PAY_PER_REQUEST mode
   - Verify in `cdk/lib/cdk-stack.ts`:
   ```typescript
   billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
   ```

2. **If using provisioned mode**:
   - Increase RCU/WCU in table settings
   - Add auto-scaling policies
   - Implement exponential backoff in client code

3. **Optimize queries**:
   - Use Query instead of Scan when possible
   - Implement pagination
   - Add caching layer

---

## Performance Issues

### Slow Initial Page Load

**Problem**: First page load takes a long time.

**Solutions**:

1. **Enable code splitting**:
   ```typescript
   // Use React.lazy for route-based splitting
   const SchoolDirectory = lazy(() => import('./pages/SchoolDirectory'));
   ```

2. **Optimize bundle size**:
   ```bash
   npm run build
   npx vite-bundle-visualizer
   ```

3. **Check network tab**:
   - Large API responses (implement pagination)
   - Unoptimized images (use WebP, lazy loading)
   - Too many API calls (batch requests)

4. **Implement caching**:
   - Add service worker for static assets
   - Use React Query or SWR for API caching
   - Enable CloudFront CDN

### Slow API Responses

**Problem**: API calls take multiple seconds.

**Solutions**:

1. **Lambda cold starts**:
   - First request to Lambda is slower (5-10 seconds)
   - Subsequent requests should be fast (<100ms)
   - Consider provisioned concurrency for production

2. **DynamoDB performance**:
   - Scan operations are slow - use Query with indexes
   - Add GSI for frequently queried attributes
   - Implement pagination

3. **Bedrock API latency**:
   - Claude API can take 2-5 seconds
   - Already set to max_tokens: 250 (low for performance)
   - Consider caching explanations by school+profile hash

4. **Monitor with CloudWatch**:
   ```bash
   aws cloudwatch get-metric-statistics \
     --namespace AWS/Lambda \
     --metric-name Duration \
     --dimensions Name=FunctionName,Value=YourFunction \
     --start-time 2024-01-01T00:00:00Z \
     --end-time 2024-01-02T00:00:00Z \
     --period 3600 \
     --statistics Average
   ```

### React Re-rendering Issues

**Problem**: Application feels sluggish, components re-render unnecessarily.

**Solutions**:

1. **Use React DevTools Profiler**:
   - Identify components re-rendering frequently
   - Check for unnecessary prop changes

2. **Memoization**:
   ```typescript
   import { memo, useMemo, useCallback } from 'react';

   const MemoizedComponent = memo(MyComponent);

   const value = useMemo(() => expensiveCalculation(), [deps]);
   const callback = useCallback(() => doSomething(), [deps]);
   ```

3. **Context optimization**:
   - Split contexts by concern
   - Use context selectors
   - Move frequently changing state to local component state

4. **Virtual scrolling**:
   - For long lists, use react-window or react-virtuoso
   - Implement pagination for large datasets

---

## Getting Additional Help

### Viewing Logs

**Frontend (Browser)**:
```javascript
// Open browser console
console.log('Debug info:', import.meta.env);
```

**Lambda Functions**:
```bash
# List log groups
aws logs describe-log-groups --log-group-name-prefix /aws/lambda/CdkStack

# Tail logs
aws logs tail /aws/lambda/CdkStack-GetSchoolsFunction --follow --since 5m
```

**API Gateway**:
- Enable CloudWatch Logs in API Gateway settings
- Access logs show request/response details

### Debugging Tools

1. **React Developer Tools** (browser extension)
   - Component tree inspection
   - Props and state debugging
   - Profiler for performance

2. **Redux DevTools** (if using Redux)
   - Time-travel debugging
   - State inspection

3. **AWS CLI**:
   ```bash
   # Check stack status
   aws cloudformation describe-stacks --stack-name CdkStack

   # Check Lambda function
   aws lambda get-function --function-name YourFunctionName
   ```

4. **CDK Diff**:
   ```bash
   cd cdk
   cdk diff  # See what would change before deploying
   ```

### Contact & Support

- **GitHub Issues**: Open an issue in the repository
- **Email**: tylerpohn@gmail.com
- **Documentation**: See `/docs` folder for additional guides

---

## Appendix: Common Error Messages

| Error Message | Common Cause | Quick Fix |
|---------------|--------------|-----------|
| "VITE_MATCH_API_URL not configured" | Missing env variable | Create `.env.local` with API URL |
| "Cannot find module 'X'" | Missing dependency | `npm install` |
| "401 Unauthorized" | AWS credentials issue | `aws configure` |
| "Access denied for model" | Bedrock access not enabled | Enable in Bedrock console |
| "Table not found" | DynamoDB not deployed | `cdk deploy` |
| "CORS policy" | CORS misconfiguration | Check API Gateway CORS settings |
| "Module parse failed" | TypeScript/Vite issue | Check import paths, restart dev server |
| "Network error" | API URL wrong | Verify VITE_MATCH_API_URL |
| "429 Too Many Requests" | Rate limiting | Add retry logic, check quotas |
| "Cold start timeout" | Lambda initialization slow | Increase timeout, use provisioned concurrency |

---

**Last Updated**: November 2024
**Version**: 1.0
