# Operational Runbook

This runbook provides operational procedures for deploying, monitoring, and maintaining the Flight School Marketplace application.

---

## Table of Contents

- [Deployment Procedures](#deployment-procedures)
- [Monitoring & Observability](#monitoring--observability)
- [Maintenance Tasks](#maintenance-tasks)
- [Incident Response](#incident-response)
- [Backup & Recovery](#backup--recovery)
- [Scaling & Performance](#scaling--performance)
- [Security Operations](#security-operations)
- [Cost Management](#cost-management)

---

## Deployment Procedures

### Initial Deployment

**Prerequisites**:
- AWS Account with appropriate permissions
- AWS CLI configured with credentials
- Node.js 20.x or later installed
- AWS CDK CLI installed globally

**Steps**:

1. **Deploy Infrastructure (CDK)**

   ```bash
   # Bootstrap CDK (first time only)
   cd cdk
   npx cdk bootstrap aws://ACCOUNT-ID/us-east-1

   # Install dependencies
   npm install

   # Build TypeScript
   npm run build

   # Preview changes
   npx cdk diff

   # Deploy stack
   npx cdk deploy

   # Note the outputs - you'll need them
   ```

   **Expected Outputs**:
   - `ApiEndpoint`: API Gateway URL
   - `SchoolsTableName`: DynamoDB table name
   - `LambdaFunctionName`: Match explainer function name
   - `VercelEnvVar`: Environment variable for frontend

2. **Enable Bedrock Model Access**

   ```bash
   # Via AWS Console
   # 1. Navigate to AWS Bedrock > Model access
   # 2. Request access to: anthropic.claude-3-5-sonnet-20240620-v1:0
   # 3. Wait for approval (usually instant in us-east-1)
   ```

3. **Populate Database**

   ```bash
   # Set environment variables
   export AWS_REGION=us-east-1
   export TABLE_NAME=flight-schools

   # Run migration script
   cd scripts/school-data
   node addFinalSchools.cjs

   # Verify data was inserted
   aws dynamodb scan --table-name flight-schools --limit 5
   ```

4. **Deploy Frontend**

   ```bash
   cd frontend

   # Create production environment file
   cat > .env.production << EOF
   VITE_MATCH_API_URL=https://YOUR_API_ID.execute-api.us-east-1.amazonaws.com/prod
   EOF

   # Install dependencies
   npm install

   # Build for production
   npm run build

   # Output will be in frontend/dist/
   ```

5. **Deploy to Hosting Platform**

   **Option A: Vercel**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Deploy from frontend directory
   cd frontend
   vercel --prod

   # Set environment variable in Vercel dashboard:
   # VITE_MATCH_API_URL = <your API Gateway URL>
   ```

   **Option B: AWS S3 + CloudFront**
   ```bash
   # Create S3 bucket for hosting
   aws s3 mb s3://flight-school-marketplace --region us-east-1

   # Enable static website hosting
   aws s3 website s3://flight-school-marketplace \
     --index-document index.html \
     --error-document index.html

   # Upload build files
   cd frontend/dist
   aws s3 sync . s3://flight-school-marketplace --delete

   # Create CloudFront distribution (see AWS Console)
   # Configure with S3 origin and custom error response for SPA routing
   ```

6. **Verify Deployment**

   ```bash
   # Test API endpoints
   curl https://YOUR_API_URL/prod/schools

   # Test frontend
   open https://your-frontend-url.com

   # Test full flow
   # 1. Navigate to /find-my-school
   # 2. Complete matching quiz
   # 3. Verify AI explanations load
   ```

### Update Deployment

**Frontend Updates**:

```bash
cd frontend

# Pull latest changes
git pull origin master

# Install any new dependencies
npm install

# Build
npm run build

# Deploy
# Vercel: vercel --prod
# S3: aws s3 sync dist/ s3://flight-school-marketplace --delete
```

**Backend Updates**:

```bash
cd cdk

# Pull latest changes
git pull origin master

# Install any new dependencies
npm install

# Review what will change
npx cdk diff

# Deploy changes
npx cdk deploy

# Update frontend environment variables if API URL changed
```

**Lambda Function Updates**:

```bash
# Lambda code is deployed automatically by CDK
cd cdk
npx cdk deploy

# Verify function was updated
aws lambda get-function --function-name CdkStack-MatchExplainerFunction

# Check logs for new version
aws logs tail /aws/lambda/CdkStack-MatchExplainerFunction --follow --since 5m
```

### Rollback Procedures

**Frontend Rollback** (Vercel):
```bash
# List deployments
vercel ls

# Promote previous deployment to production
vercel promote <deployment-url>
```

**Backend Rollback** (CloudFormation):
```bash
# List stack events
aws cloudformation describe-stack-events --stack-name CdkStack --max-items 50

# Rollback to previous template (if available)
# Note: CDK doesn't support automatic rollback
# Best practice: Deploy previous git commit

git checkout <previous-commit>
cd cdk
npx cdk deploy
```

**Database Rollback**:
```bash
# Enable point-in-time recovery (already enabled in CDK stack)
# Restore to specific time
aws dynamodb restore-table-to-point-in-time \
  --source-table-name flight-schools \
  --target-table-name flight-schools-restored \
  --restore-date-time 2024-01-01T00:00:00Z

# Manually verify restored table
# Update CDK stack to point to new table
```

---

## Monitoring & Observability

### CloudWatch Dashboards

**Create Custom Dashboard**:

```bash
# Navigate to CloudWatch > Dashboards > Create dashboard
# Add widgets for:
# - Lambda invocations (all functions)
# - Lambda errors
# - Lambda duration
# - API Gateway 4XX/5XX errors
# - API Gateway latency
# - DynamoDB read/write capacity
# - Bedrock API calls and errors
```

### Key Metrics to Monitor

**Lambda Functions**:

| Metric | Threshold | Alert Action |
|--------|-----------|--------------|
| Error Rate | > 5% | Investigate logs, check recent deployments |
| Duration | > 25s | Optimize code, increase timeout |
| Throttles | > 0 | Increase concurrency limit |
| Concurrent Executions | > 800 | Consider provisioned concurrency |

**API Gateway**:

| Metric | Threshold | Alert Action |
|--------|-----------|--------------|
| 5XX Errors | > 1% | Check Lambda errors, check DynamoDB |
| 4XX Errors | > 10% | Check for API breaking changes |
| Latency (p99) | > 10s | Investigate Lambda cold starts |
| Count | Unexpected spike | Check for abuse, verify costs |

**DynamoDB**:

| Metric | Threshold | Alert Action |
|--------|-----------|--------------|
| ThrottledRequests | > 0 | Check on-demand billing is enabled |
| UserErrors | > 10/hour | Check for schema issues |
| System Errors | > 0 | Contact AWS Support |
| Latency | > 100ms | Check table design, add indexes |

### Log Management

**Access Lambda Logs**:

```bash
# List log groups
aws logs describe-log-groups --log-group-name-prefix /aws/lambda/CdkStack

# Tail logs in real-time
aws logs tail /aws/lambda/CdkStack-GetSchoolsFunction --follow

# Search for errors
aws logs filter-log-events \
  --log-group-name /aws/lambda/CdkStack-GetSchoolsFunction \
  --filter-pattern "ERROR"

# Get logs for specific time range
aws logs filter-log-events \
  --log-group-name /aws/lambda/CdkStack-MatchExplainerFunction \
  --start-time $(date -u -d '1 hour ago' +%s)000 \
  --end-time $(date -u +%s)000
```

**CloudWatch Insights Queries**:

```sql
-- Find slowest Lambda invocations
fields @timestamp, @duration, @requestId
| filter @type = "REPORT"
| sort @duration desc
| limit 20

-- Count errors by type
fields @timestamp, @message
| filter @message like /ERROR/
| stats count() by @message
| sort count desc

-- API Gateway access patterns
fields @timestamp, @message
| filter @message like /method/
| stats count() by @message

-- Bedrock API costs estimate
fields @timestamp, @message
| filter @message like /Bedrock/
| stats count() as invocations
| eval estimatedCost = invocations * 0.008
```

### Health Checks

**Automated Health Check Script**:

```bash
#!/bin/bash
# health-check.sh

API_URL="https://your-api-url.execute-api.us-east-1.amazonaws.com/prod"

echo "=== Health Check ==="

# Test schools endpoint
echo "Testing GET /schools..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "${API_URL}/schools")
if [ "$RESPONSE" = "200" ]; then
  echo "✓ Schools API: OK"
else
  echo "✗ Schools API: FAILED (HTTP $RESPONSE)"
fi

# Test specific school
echo "Testing GET /schools/{id}..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "${API_URL}/schools/school-001")
if [ "$RESPONSE" = "200" ]; then
  echo "✓ School Detail API: OK"
else
  echo "✗ School Detail API: FAILED (HTTP $RESPONSE)"
fi

# Test match explainer
echo "Testing POST /explain-match..."
PAYLOAD='{"student":{"trainingGoal":"PPL","maxBudget":15000},"school":{"name":"Test"},"matchScore":85}'
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" -X POST "${API_URL}/explain-match" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD")
if [ "$RESPONSE" = "200" ]; then
  echo "✓ Match Explainer API: OK"
else
  echo "✗ Match Explainer API: FAILED (HTTP $RESPONSE)"
fi

echo "=== Health Check Complete ==="
```

**Run health checks**:
```bash
chmod +x health-check.sh
./health-check.sh

# Schedule with cron (every 15 minutes)
*/15 * * * * /path/to/health-check.sh >> /var/log/health-check.log 2>&1
```

### Alerting Setup

**CloudWatch Alarms**:

```bash
# Lambda error rate alarm
aws cloudwatch put-metric-alarm \
  --alarm-name flight-school-lambda-errors \
  --alarm-description "Alert when Lambda error rate > 5%" \
  --metric-name Errors \
  --namespace AWS/Lambda \
  --statistic Average \
  --period 300 \
  --threshold 0.05 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 2

# API Gateway 5XX errors
aws cloudwatch put-metric-alarm \
  --alarm-name flight-school-api-5xx \
  --alarm-description "Alert on API 5XX errors" \
  --metric-name 5XXError \
  --namespace AWS/ApiGateway \
  --statistic Sum \
  --period 300 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1

# DynamoDB throttling
aws cloudwatch put-metric-alarm \
  --alarm-name flight-school-dynamodb-throttle \
  --alarm-description "Alert on DynamoDB throttling" \
  --metric-name ThrottledRequests \
  --namespace AWS/DynamoDB \
  --statistic Sum \
  --period 300 \
  --threshold 0 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1
```

---

## Maintenance Tasks

### Daily Tasks

**Automated** (can be scripted):
- Check CloudWatch alarms for any active alerts
- Review error logs from previous 24 hours
- Verify backup jobs completed successfully

**Script**:
```bash
#!/bin/bash
# daily-check.sh

echo "=== Daily Maintenance Check ==="
echo "Date: $(date)"

# Check for active alarms
echo -e "\n--- CloudWatch Alarms ---"
aws cloudwatch describe-alarms --state-value ALARM --query 'MetricAlarms[*].[AlarmName,StateReason]' --output table

# Check Lambda errors in last 24 hours
echo -e "\n--- Lambda Errors (24h) ---"
aws logs filter-log-events \
  --log-group-name /aws/lambda/CdkStack-GetSchoolsFunction \
  --start-time $(($(date +%s) - 86400))000 \
  --filter-pattern "ERROR" \
  --query 'events[*].message' \
  --output text | wc -l

# Check DynamoDB table status
echo -e "\n--- DynamoDB Status ---"
aws dynamodb describe-table --table-name flight-schools --query 'Table.TableStatus'

echo "=== Daily Check Complete ==="
```

### Weekly Tasks

1. **Review Metrics**:
   - API usage patterns
   - Lambda cold start frequency
   - Bedrock API costs
   - DynamoDB read/write patterns

2. **Check for Updates**:
   ```bash
   cd frontend
   npm outdated

   cd ../cdk
   npm outdated
   ```

3. **Security Scan**:
   ```bash
   npm audit
   npm audit fix  # Apply safe fixes
   ```

4. **Database Maintenance**:
   - Review DynamoDB item count
   - Check for data quality issues
   - Verify backups are working

### Monthly Tasks

1. **Cost Review**:
   - Review AWS billing dashboard
   - Identify cost optimization opportunities
   - Verify costs match estimates

2. **Dependency Updates**:
   ```bash
   # Update non-breaking changes
   npm update

   # Check for major version updates
   npm outdated
   ```

3. **Performance Review**:
   - Analyze CloudWatch metrics
   - Identify bottlenecks
   - Plan optimizations

4. **Documentation Review**:
   - Update docs for any changes
   - Review and close stale issues
   - Update runbook with lessons learned

### Quarterly Tasks

1. **Security Audit**:
   - Review IAM policies
   - Check for unused credentials
   - Review CloudTrail logs
   - Update security groups

2. **Disaster Recovery Test**:
   - Test backup restoration
   - Verify rollback procedures
   - Update incident response plan

3. **Capacity Planning**:
   - Review usage growth trends
   - Plan for scaling needs
   - Budget for next quarter

---

## Incident Response

### Severity Levels

**P1 - Critical** (Resolution: 1 hour):
- Complete service outage
- Data loss or corruption
- Security breach

**P2 - High** (Resolution: 4 hours):
- Partial service degradation
- API errors affecting >50% requests
- Performance severely degraded

**P3 - Medium** (Resolution: 1 day):
- Minor feature not working
- API errors affecting <10% requests
- Slow performance

**P4 - Low** (Resolution: 1 week):
- Cosmetic issues
- Enhancement requests
- Documentation updates

### Incident Response Procedure

1. **Detect & Alert**:
   - CloudWatch alarm triggers
   - User reports issue
   - Monitoring detects anomaly

2. **Assess**:
   ```bash
   # Quick health check
   ./health-check.sh

   # Check recent deployments
   git log --oneline -10

   # Review recent alarms
   aws cloudwatch describe-alarm-history --max-records 20
   ```

3. **Communicate**:
   - Update status page (if available)
   - Notify stakeholders
   - Create incident channel

4. **Investigate**:
   - Check CloudWatch logs
   - Review metrics
   - Identify root cause

5. **Mitigate**:
   - Apply immediate fix
   - Rollback if necessary
   - Scale resources if needed

6. **Resolve**:
   - Verify fix works
   - Monitor for recurrence
   - Update documentation

7. **Post-Mortem**:
   - Document timeline
   - Identify root cause
   - Create action items
   - Update runbook

### Common Incidents & Solutions

**API Gateway Returns 5XX Errors**:

```bash
# Check Lambda function status
aws lambda get-function --function-name CdkStack-GetSchoolsFunction

# Check recent errors
aws logs tail /aws/lambda/CdkStack-GetSchoolsFunction --since 30m

# Quick fix: Redeploy Lambda
cd cdk
npx cdk deploy

# If DynamoDB issue: Check table status
aws dynamodb describe-table --table-name flight-schools
```

**Frontend Not Loading**:

```bash
# Check hosting platform status
# Vercel: vercel ls
# S3: aws s3 ls s3://flight-school-marketplace

# Check DNS
dig your-domain.com

# Check CDN (CloudFront)
aws cloudfront list-distributions

# Rollback frontend if needed
vercel rollback <previous-deployment>
```

**Database Corruption/Data Loss**:

```bash
# Immediately: Stop all write operations
# Update CDK to remove write permissions temporarily

# Restore from backup (point-in-time recovery)
aws dynamodb restore-table-to-point-in-time \
  --source-table-name flight-schools \
  --target-table-name flight-schools-restored \
  --restore-date-time <timestamp-before-corruption>

# Verify restored data
aws dynamodb scan --table-name flight-schools-restored --limit 10

# Switch to restored table (update CDK stack)
```

---

## Backup & Recovery

### Automated Backups

**DynamoDB Point-in-Time Recovery**:

```bash
# Already enabled in CDK stack
# Verify it's enabled
aws dynamodb describe-continuous-backups --table-name flight-schools

# Should show:
# "PointInTimeRecoveryStatus": "ENABLED"
```

**Manual Backup**:

```bash
# Create on-demand backup
aws dynamodb create-backup \
  --table-name flight-schools \
  --backup-name flight-schools-$(date +%Y%m%d)

# List backups
aws dynamodb list-backups --table-name flight-schools

# Restore from backup
aws dynamodb restore-table-from-backup \
  --target-table-name flight-schools-restored \
  --backup-arn arn:aws:dynamodb:region:account:table/flight-schools/backup/01234567890123
```

### Data Export

**Export School Data**:

```bash
# Export all schools to JSON
aws dynamodb scan --table-name flight-schools > schools-backup.json

# Export to S3
aws s3 cp schools-backup.json s3://your-backup-bucket/$(date +%Y%m%d)/schools.json

# Compress for storage
gzip schools-backup.json
```

### Recovery Procedures

**Restore Database**:

```bash
# 1. Restore to point in time
aws dynamodb restore-table-to-point-in-time \
  --source-table-name flight-schools \
  --target-table-name flight-schools-temp \
  --restore-date-time 2024-01-01T12:00:00Z

# 2. Wait for restore to complete
aws dynamodb wait table-exists --table-name flight-schools-temp

# 3. Verify data
aws dynamodb scan --table-name flight-schools-temp --limit 5

# 4. Update CDK stack to use new table
# OR copy data to original table
```

**Disaster Recovery**:

```bash
# Complete infrastructure rebuild
cd cdk

# Deploy infrastructure
npx cdk deploy

# Restore database from backup
aws dynamodb restore-table-from-backup \
  --target-table-name flight-schools \
  --backup-arn <backup-arn>

# Deploy frontend
cd ../frontend
npm run build
vercel --prod
```

---

## Scaling & Performance

### Lambda Scaling

**Current Configuration**:
- Concurrency: Unreserved (shared account limit)
- Memory: 256 MB (get-schools), 512 MB (match-explainer)
- Timeout: 10s (get-schools), 30s (match-explainer)

**Scale Up**:

```bash
# Increase memory (also increases CPU)
# Edit cdk/lib/cdk-stack.ts:
memorySize: 1024,  # Up from 512

# Increase timeout
timeout: cdk.Duration.seconds(60),  # Up from 30

# Deploy changes
npx cdk deploy

# For high traffic: Enable provisioned concurrency
aws lambda put-provisioned-concurrency-config \
  --function-name CdkStack-MatchExplainerFunction \
  --provisioned-concurrent-executions 5
```

### DynamoDB Scaling

**Current Configuration**:
- Billing Mode: PAY_PER_REQUEST (on-demand)
- Auto-scales automatically

**Monitor**:

```bash
# Check consumed capacity
aws cloudwatch get-metric-statistics \
  --namespace AWS/DynamoDB \
  --metric-name ConsumedReadCapacityUnits \
  --dimensions Name=TableName,Value=flight-schools \
  --start-time $(date -u -d '1 hour ago' +%s) \
  --end-time $(date -u +%s) \
  --period 3600 \
  --statistics Sum

# If switching to provisioned mode (for predictable traffic):
aws dynamodb update-table \
  --table-name flight-schools \
  --billing-mode PROVISIONED \
  --provisioned-throughput ReadCapacityUnits=10,WriteCapacityUnits=5
```

### Caching Strategies

**CloudFront Caching** (for frontend):

```bash
# Create CloudFront distribution with:
# - Default TTL: 86400 (1 day)
# - Max TTL: 31536000 (1 year)
# - Compress objects: Yes
# - Cache based on: Headers (none), Cookies (none), Query strings (all)
```

**API Caching**:

```typescript
// Add cache to API Gateway (in CDK)
const api = new apigateway.RestApi(this, 'Api', {
  deploy: true,
  deployOptions: {
    cachingEnabled: true,
    cacheClusterEnabled: true,
    cacheClusterSize: '0.5',  // 0.5 GB
    cacheTtl: cdk.Duration.minutes(5),
  },
});
```

**Application-Level Caching**:

```typescript
// React Query for frontend caching
import { useQuery } from '@tanstack/react-query';

const { data } = useQuery({
  queryKey: ['schools'],
  queryFn: fetchSchools,
  staleTime: 5 * 60 * 1000,  // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
});
```

---

## Security Operations

### Access Management

**Rotate AWS Credentials**:

```bash
# Create new access key
aws iam create-access-key --user-name deployment-user

# Update credentials in CI/CD
# GitHub Secrets, Vercel env vars, etc.

# Delete old access key (after verifying new one works)
aws iam delete-access-key --access-key-id OLD_KEY_ID --user-name deployment-user
```

**Review IAM Policies**:

```bash
# List Lambda execution roles
aws iam list-roles --query 'Roles[?contains(RoleName, `CdkStack`)]'

# Get role policy
aws iam get-role-policy --role-name CdkStack-GetSchoolsFunction-Role --policy-name default

# Review for least privilege
# Ensure no * permissions except where necessary
```

### Security Monitoring

**CloudTrail Logging**:

```bash
# Enable CloudTrail (if not already)
aws cloudtrail create-trail --name flight-school-trail --s3-bucket-name my-cloudtrail-bucket

# Start logging
aws cloudtrail start-logging --name flight-school-trail

# Query recent API calls
aws cloudtrail lookup-events --max-results 50
```

**GuardDuty** (optional):

```bash
# Enable GuardDuty for threat detection
aws guardduty create-detector --enable

# Check findings
aws guardduty list-findings --detector-id <detector-id>
```

### Security Checklist

Monthly security review:

- [ ] Review CloudTrail logs for unusual activity
- [ ] Check for unused IAM users/roles
- [ ] Verify MFA is enabled on root account
- [ ] Review security groups and CORS policies
- [ ] Scan dependencies for vulnerabilities (`npm audit`)
- [ ] Review Bedrock API usage (ensure no abuse)
- [ ] Check for exposed secrets in code/logs
- [ ] Verify encryption at rest (DynamoDB)
- [ ] Review API Gateway throttling settings

---

## Cost Management

### Cost Breakdown (Estimated)

| Service | Monthly Cost | Notes |
|---------|--------------|-------|
| DynamoDB | $5 | On-demand, low traffic |
| Lambda | $1 | First 1M requests free |
| API Gateway | $4 | REST API, 1M requests |
| Bedrock (Claude) | $40 | ~5K invocations/month |
| CloudWatch Logs | $2 | Log storage and queries |
| **Total** | **~$52** | Low-moderate traffic |

### Cost Monitoring

**Set Up Billing Alerts**:

```bash
# Create billing alarm
aws cloudwatch put-metric-alarm \
  --alarm-name flight-school-billing \
  --alarm-description "Alert when monthly bill > $100" \
  --metric-name EstimatedCharges \
  --namespace AWS/Billing \
  --statistic Maximum \
  --period 21600 \
  --threshold 100 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 1

# Set up SNS topic for notifications
aws sns create-topic --name billing-alerts
aws sns subscribe --topic-arn arn:aws:sns:us-east-1:ACCOUNT:billing-alerts \
  --protocol email --notification-endpoint your-email@example.com
```

**Cost Explorer Queries**:

```bash
# Get current month costs by service
aws ce get-cost-and-usage \
  --time-period Start=$(date +%Y-%m-01),End=$(date +%Y-%m-%d) \
  --granularity MONTHLY \
  --metrics BlendedCost \
  --group-by Type=DIMENSION,Key=SERVICE
```

### Cost Optimization

**Reduce Bedrock Costs**:
- Reduce `max_tokens` from 250 to 150 (faster, cheaper)
- Cache explanations (same profile + school = same explanation)
- Batch requests when possible
- Consider fallback to templates for low-match scores

**Lambda Optimization**:
- Right-size memory allocation (use CloudWatch metrics)
- Reduce cold starts with provisioned concurrency (if needed)
- Optimize code for faster execution

**DynamoDB Optimization**:
- Use Query instead of Scan
- Implement pagination
- Consider reserved capacity if traffic is predictable

**General**:
- Delete old CloudWatch log groups
- Remove unused Lambda versions
- Clean up old DynamoDB backups
- Use CloudFront to reduce API calls

---

## On-Call Procedures

### On-Call Responsibilities

- Monitor alerts and alarms
- Respond to incidents within SLA
- Escalate critical issues
- Document all incidents
- Perform health checks

### Escalation Path

1. **On-Call Engineer**: First responder (you)
2. **Lead Developer**: Complex technical issues
3. **AWS Support**: Infrastructure/service issues
4. **Management**: Business-critical outages

### On-Call Checklist

**Start of Shift**:
- [ ] Review handoff notes from previous on-call
- [ ] Check for any active alarms
- [ ] Review recent deployments
- [ ] Verify health check is passing
- [ ] Test pager/alerting system

**During Shift**:
- [ ] Monitor CloudWatch dashboard
- [ ] Respond to alerts within SLA
- [ ] Document all incidents
- [ ] Communicate with stakeholders

**End of Shift**:
- [ ] Write handoff notes for next on-call
- [ ] Update incident log
- [ ] Close resolved tickets
- [ ] Escalate ongoing issues

---

**Last Updated**: November 2024
**Version**: 1.0
