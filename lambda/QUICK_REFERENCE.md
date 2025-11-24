# Structured Logging - Quick Reference

## Import the Logger

### CommonJS (get-schools, get-school-by-id)
```javascript
const { createLogger } = require('./logger');
```

### ES Modules (match-explainer)
```javascript
import { createLogger } from './logger.mjs';
```

## Initialize in Handler

```javascript
export const handler = async (event, context) => {
  const logger = createLogger(context);
  // ... rest of handler
};
```

## Log Levels

| Level | When to Use | Method |
|-------|-------------|--------|
| DEBUG | Detailed debugging info, filter operations, internal state | `logger.debug(message, metadata)` |
| INFO | Normal operations, API calls, successful operations | `logger.info(message, metadata)` |
| WARN | Concerning but non-critical issues, validation failures, 404s | `logger.warn(message, metadata)` |
| ERROR | Errors, exceptions, failed operations | `logger.error(message, error, metadata)` |

## Common Patterns

### Log Lambda Event
```javascript
logger.logEvent(event);
// Outputs: Lambda invocation started with sanitized event details
```

### Add Persistent Context
```javascript
logger.addContext('userId', userId);
logger.addContextBatch({ orderId, customerId });
// All subsequent logs will include this context
```

### Log Response
```javascript
logger.logResponse(200, { itemCount: 5 });
// Outputs: Lambda invocation completed with status and metadata
```

### Log Errors
```javascript
try {
  // ... code
} catch (error) {
  logger.error('Operation failed', error, {
    additionalContext: 'value'
  });
}
// Outputs: Error with full stack trace and context
```

## Quick Examples

### INFO - Normal Operation
```javascript
logger.info('Fetching data from DynamoDB', {
  tableName: 'Schools',
  key: schoolId
});
```

### DEBUG - Detailed Info
```javascript
logger.debug('Applied filter', {
  filterType: 'budget',
  maxBudget: 50000,
  remainingCount: 12
});
```

### WARN - Non-Critical Issue
```javascript
logger.warn('Resource not found', {
  resourceId: 'unknown-123'
});
```

### ERROR - With Exception
```javascript
logger.error('Database query failed', error, {
  query: 'GetItem',
  tableName: 'Schools'
});
```

## CloudWatch Query Examples

### All Errors
```
fields @timestamp, message, error.message
| filter level = "ERROR"
| sort @timestamp desc
```

### Specific Request Trace
```
fields @timestamp, level, message
| filter requestId = "your-request-id"
| sort @timestamp asc
```

### Performance Metrics
```
fields bedrockLatencyMs, matchScore
| filter message = "Successfully generated explanation"
| stats avg(bedrockLatencyMs)
```

## Log Structure

Every log entry includes:
- `timestamp` - ISO 8601 timestamp
- `level` - Log level (DEBUG, INFO, WARN, ERROR)
- `requestId` - Lambda request ID for tracing
- `functionName` - Lambda function name
- `functionVersion` - Lambda function version
- `message` - Log message
- `...metadata` - Additional context

## Tips

1. Use DEBUG for verbose info you might need during troubleshooting
2. Use INFO for key operations and state changes
3. Use WARN for concerning situations that aren't errors
4. Use ERROR for actual errors with stack traces
5. Add relevant context to help with debugging
6. Request IDs allow tracing complete request flows
7. All logs are searchable JSON in CloudWatch

## Security

- Sensitive headers are automatically redacted
- Use sanitization for PII data
- Don't log passwords, tokens, or secrets
- Logger handles header sanitization automatically

## Files

- CommonJS: `/lambda/logger.js`
- ES Modules: `/lambda/logger.mjs`
- Documentation: `/lambda/STRUCTURED_LOGGING.md`
- Examples: `/lambda/LOG_EXAMPLES.md`
