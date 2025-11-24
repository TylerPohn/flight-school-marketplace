# Partner Presentation Script - Costs & Security

## Monthly Hosting Costs (10K Visitors/Month)

### Frontend Hosting (Vercel)
- **Current**: Free tier (Hobby plan)
- **At 10K visitors**: Still free tier eligible
- **Bandwidth**: ~100GB/month included
- **Build minutes**: Unlimited
- **Cost**: $0/month

### AWS Backend Services

#### API Gateway
- **Requests**: ~50K/month (5 requests per visitor average)
- **Pricing**: $3.50 per million requests
- **Cost**: ~$0.18/month

#### Lambda Functions
- **Invocations**: ~50K/month
- **Compute time**: ~2.5M GB-seconds/month
- **Free tier**: First 1M requests + 400K GB-seconds free
- **Cost**: ~$1-2/month (mostly covered by free tier)

#### DynamoDB
- **Reads**: ~100K read requests/month
- **Storage**: <1GB (75 schools)
- **On-demand pricing**: $1.25 per million reads
- **Cost**: ~$3-5/month

#### AWS Bedrock (Claude AI)
- **AI explanations**: ~20K/month (2 per visitor average)
- **Input tokens**: ~30M tokens (~1.5K per call)
- **Output tokens**: ~6M tokens (~300 per call)
- **Pricing**: $3/M input, $15/M output
- **Calculation**: (30M × $3) + (6M × $15) = $90 + $90 = $180/month
- **Cost**: ~$180/month

### Total Monthly Cost: ~$185/month

**Breakdown by Category**:
- Frontend hosting: $0
- API infrastructure: $0.18
- Compute (Lambda): $1-2
- Database: $3-5
- AI/ML (Bedrock): $180
- **Grand Total**: ~$185/month at 10K visitors

### Cost Optimization Options
- **Reduce AI calls**: Implement caching (could cut Bedrock costs by 50-70%)
- **Lower AI usage**: Only generate explanations on-demand vs. all 5 matches
- **Alternative**: Template-based explanations (reduces to ~$10/month total)
- **Scale consideration**: Costs scale linearly with visitors

## Security Architecture

### Infrastructure Security

#### AWS Security Controls
- **IAM Policies**: Least-privilege access (Lambda functions only have specific permissions)
- **Lambda isolation**: Each function runs in isolated execution environment
- **VPC**: Can be enabled for Lambda functions (not currently required)
- **Encryption at rest**: DynamoDB uses AWS-managed encryption keys
- **Encryption in transit**: All API calls use HTTPS/TLS 1.2+

#### API Security
- **CORS**: Configured to allow specific origins (can be restricted to production domain)
- **Rate limiting**: Available via API Gateway throttling (not currently enabled)
- **API keys**: Can be implemented for partner access
- **Request validation**: API Gateway validates request schemas
- **DDoS protection**: AWS Shield Standard included (automatic)

### Application Security

#### Frontend Security
- **CSP Headers**: Content Security Policy configured via Vercel
- **HTTPS only**: All traffic forced to HTTPS
- **XSS Protection**: React's built-in escaping + Material-UI sanitization
- **No sensitive data**: No user accounts, no payment processing, no PII storage
- **Environment variables**: API URLs stored securely in Vercel, not in code

#### Data Security
- **No authentication required**: Public directory of schools (by design)
- **Input validation**: Zod schemas validate all form inputs
- **SQL injection**: N/A (NoSQL database, no raw queries)
- **Data retention**: Schools data retained, no user data stored
- **Backup**: DynamoDB point-in-time recovery enabled

### Code Security

#### Development Practices
- **TypeScript**: Type safety reduces runtime errors
- **Dependency scanning**: Can enable Dependabot/Snyk
- **Linting**: ESLint configured with security rules
- **No secrets in code**: All credentials in environment variables
- **Git security**: .gitignore prevents committing .env files

#### Third-Party Security
- **React 19**: Latest stable version
- **Material-UI v7**: Actively maintained, security patches
- **AWS SDK**: Official AWS libraries, regularly updated
- **Minimal dependencies**: Reduced attack surface

### Compliance & Privacy

#### Data Privacy
- **No user accounts**: No login, no user data collection
- **No cookies**: Session-less architecture (only React state)
- **No tracking**: No analytics currently enabled (can add privacy-focused)
- **GDPR**: Not applicable (no personal data collected)
- **Public data only**: School information is public directory data

#### Monitoring & Logging
- **CloudWatch**: Lambda execution logs
- **API Gateway logs**: Request/response logging available
- **Error tracking**: Can enable Sentry or similar
- **Audit trail**: CloudTrail tracks all AWS API calls
- **Alerts**: Can configure CloudWatch alarms for anomalies

### Security Best Practices Implemented
- ✅ HTTPS everywhere
- ✅ Least-privilege IAM
- ✅ Encryption at rest and in transit
- ✅ Input validation (Zod schemas)
- ✅ No secrets in code
- ✅ DDoS protection (AWS Shield)
- ✅ Regular dependency updates
- ✅ Type-safe codebase (TypeScript)
- ✅ Isolated Lambda execution
- ✅ Point-in-time recovery (DynamoDB)

### Security Roadmap (Future Enhancements)
- [ ] WAF (Web Application Firewall) for advanced threat protection
- [ ] API rate limiting per IP
- [ ] Advanced monitoring (Sentry, DataDog)
- [ ] Automated security scanning (Snyk, CodeQL)
- [ ] API keys for partner integrations
- [ ] Enhanced logging and alerting
- [ ] Penetration testing
- [ ] SOC 2 compliance (if handling partner data)

## Cost Comparison vs. Alternatives

### Traditional Hosting (EC2/RDS)
- **Cost**: $50-100/month (t3.small + RDS)
- **Maintenance**: Server patching, scaling, monitoring required
- **Scaling**: Manual configuration needed

### Current Serverless Architecture
- **Cost**: ~$185/month (with AI), ~$10 without AI
- **Maintenance**: Automatic updates, no server management
- **Scaling**: Automatic, pay-per-use
- **Winner**: Serverless (lower ops burden, better scalability)

### Hosted Platform (Heroku, Railway)
- **Cost**: $25-50/month + database + AI
- **Total**: Similar to current (~$200/month)
- **Control**: Less infrastructure control
- **Winner**: Current setup (more control, similar cost)
