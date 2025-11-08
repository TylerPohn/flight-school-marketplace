# Flight School Matching - CDK Deployment

AWS CDK stack for deploying the Flight School Match Explainer Lambda and API Gateway.

## Quick Deploy

```bash
cd cdk
npm install
npm run build
npx cdk bootstrap  # First time only
npx cdk deploy
```

After deployment, add the output URL to Vercel environment variables.

See full documentation in `/lambda/match-explainer/README.md`
