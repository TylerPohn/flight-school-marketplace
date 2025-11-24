# Scripts

Utilities for generating synthetic flight school data and migrating it to DynamoDB.

## Overview

These scripts handle the ETL pipeline for populating the DynamoDB `flight-schools` table with mock/synthetic data extracted from the frontend's TypeScript mock files.

## Scripts

| Script | Purpose |
|--------|---------|
| `extract-schools.mjs` | Extracts school data from `frontend/src/mock/detailedSchools.ts` and outputs to JSON |
| `extract-schools-to-json.js` | Alternative extraction script (CommonJS) |
| `prepare-school-data.js` | Creates a template `schools-data.json` for manual data entry |
| `migrate-to-dynamo.js` | Writes `schools-data.json` to DynamoDB |
| `export-schools-data.js` | Exports school data to various formats |

## Usage

### 1. Extract data from TypeScript mocks

```bash
node scripts/extract-schools.mjs
```

This parses `frontend/src/mock/detailedSchools.ts` and generates `schools-data.json`.

### 2. Migrate to DynamoDB

```bash
# Uses default table name 'flight-schools'
node scripts/migrate-to-dynamo.js

# Or specify a custom table name
TABLE_NAME=my-table-name node scripts/migrate-to-dynamo.js
```

## Prerequisites

- AWS credentials configured (`~/.aws/credentials` or environment variables)
- DynamoDB table must already exist (created via CDK)
- Node.js 18+

## Output

- `schools-data.json` - Intermediate JSON file containing all extracted school records
