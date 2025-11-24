/**
 * Structured Logger for Lambda Functions (ESM version)
 *
 * Provides JSON-formatted logging with consistent structure for CloudWatch Logs Insights.
 * Includes support for log levels, correlation IDs, and contextual metadata.
 */

import { randomUUID } from 'crypto';

export const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR'
};

export class Logger {
  constructor(context = {}) {
    this.functionName = context.functionName || process.env.AWS_LAMBDA_FUNCTION_NAME || 'unknown';
    this.functionVersion = context.functionVersion || process.env.AWS_LAMBDA_FUNCTION_VERSION || 'unknown';
    this.requestId = context.awsRequestId || this.generateRequestId();
    this.additionalContext = {};
  }

  /**
   * Generate a unique request ID if not provided by Lambda context
   */
  generateRequestId() {
    return randomUUID();
  }

  /**
   * Add persistent context that will be included in all subsequent log entries
   */
  addContext(key, value) {
    this.additionalContext[key] = value;
  }

  /**
   * Add multiple context values at once
   */
  addContextBatch(contextObject) {
    this.additionalContext = { ...this.additionalContext, ...contextObject };
  }

  /**
   * Core logging method that structures the log entry
   */
  log(level, message, metadata = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      requestId: this.requestId,
      functionName: this.functionName,
      functionVersion: this.functionVersion,
      message,
      ...this.additionalContext,
      ...metadata
    };

    // Output as JSON for structured logging
    console.log(JSON.stringify(logEntry));
  }

  /**
   * Log at DEBUG level - detailed debugging information
   */
  debug(message, metadata = {}) {
    this.log(LOG_LEVELS.DEBUG, message, metadata);
  }

  /**
   * Log at INFO level - normal operational messages
   */
  info(message, metadata = {}) {
    this.log(LOG_LEVELS.INFO, message, metadata);
  }

  /**
   * Log at WARN level - warning messages for concerning but non-critical issues
   */
  warn(message, metadata = {}) {
    this.log(LOG_LEVELS.WARN, message, metadata);
  }

  /**
   * Log at ERROR level - error messages with optional error object
   */
  error(message, error = null, metadata = {}) {
    const errorMetadata = { ...metadata };

    if (error) {
      errorMetadata.error = {
        message: error.message,
        stack: error.stack,
        name: error.name,
        ...(error.code && { code: error.code }),
        ...(error.statusCode && { statusCode: error.statusCode })
      };
    }

    this.log(LOG_LEVELS.ERROR, message, errorMetadata);
  }

  /**
   * Log Lambda event details (sanitized for security)
   */
  logEvent(event) {
    const sanitizedEvent = this.sanitizeEvent(event);
    this.info('Lambda invocation started', {
      eventType: event.httpMethod || event.RequestType || 'unknown',
      path: event.path || event.rawPath,
      resource: event.resource,
      httpMethod: event.httpMethod,
      queryStringParameters: event.queryStringParameters,
      pathParameters: event.pathParameters
    });
  }

  /**
   * Log Lambda response details
   */
  logResponse(statusCode, metadata = {}) {
    this.info('Lambda invocation completed', {
      statusCode,
      ...metadata
    });
  }

  /**
   * Sanitize event to remove sensitive data
   */
  sanitizeEvent(event) {
    const sensitive = ['authorization', 'password', 'token', 'secret', 'apikey', 'api-key'];
    const sanitized = { ...event };

    // Sanitize headers
    if (sanitized.headers) {
      sanitized.headers = Object.keys(sanitized.headers).reduce((acc, key) => {
        const lowerKey = key.toLowerCase();
        if (sensitive.some(s => lowerKey.includes(s))) {
          acc[key] = '[REDACTED]';
        } else {
          acc[key] = sanitized.headers[key];
        }
        return acc;
      }, {});
    }

    return sanitized;
  }

  /**
   * Create a child logger with additional context
   */
  child(additionalContext = {}) {
    const childLogger = new Logger({
      functionName: this.functionName,
      functionVersion: this.functionVersion,
      awsRequestId: this.requestId
    });
    childLogger.additionalContext = { ...this.additionalContext, ...additionalContext };
    return childLogger;
  }
}

/**
 * Create a logger instance for the current Lambda invocation
 * @param {Object} context - AWS Lambda context object
 * @returns {Logger} Logger instance
 */
export function createLogger(context = {}) {
  return new Logger(context);
}
