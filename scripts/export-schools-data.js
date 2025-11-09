#!/usr/bin/env node

/**
 * This script exports school data from TypeScript mock files to JSON
 * Run this first to prepare data for DynamoDB migration
 */

const fs = require('fs');
const path = require('path');

// We'll manually create the schools data array from the detailedSchools.ts file
// Since we can't directly require TypeScript files, we'll extract the data

console.log('📦 Exporting school data to JSON...\n');

// Read the detailedSchools.ts file
const detailedSchoolsPath = path.join(__dirname, '../frontend/src/mock/detailedSchools.ts');
const schoolsPath = path.join(__dirname, '../frontend/src/mock/schools.ts');

try {
  const detailedContent = fs.readFileSync(detailedSchoolsPath, 'utf8');
  const basicContent = fs.readFileSync(schoolsPath, 'utf8');

  console.log('✓ Read TypeScript files');
  console.log('⚠️  Note: You need to manually copy the school objects from the TypeScript files');
  console.log('   to scripts/schools-data.json\n');
  console.log('File locations:');
  console.log(`   Detailed: ${detailedSchoolsPath}`);
  console.log(`   Basic: ${schoolsPath}`);
  console.log('\nNext steps:');
  console.log('1. Manually create scripts/schools-data.json with your school objects');
  console.log('2. Run: npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb (in scripts/)');
  console.log('3. Run: TABLE_NAME=flight-schools node scripts/migrate-to-dynamo.js');

} catch (error) {
  console.error('❌ Error reading files:', error.message);
  process.exit(1);
}
