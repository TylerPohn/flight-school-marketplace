#!/usr/bin/env node

/**
 * Helper script to prepare school data for DynamoDB migration
 * This creates a schools-data.json file from the current mock data
 */

const fs = require('fs');
const path = require('path');

// Sample schools data based on your current structure
// TODO: Replace this with actual data from your TypeScript files
const schools = [
  // You'll paste the school objects here from detailedSchools.ts
  // For now, this is a template
];

const outputPath = path.join(__dirname, 'schools-data.json');

try {
  fs.writeFileSync(outputPath, JSON.stringify(schools, null, 2));
  console.log(`✅ Created ${outputPath}`);
  console.log(`   Schools count: ${schools.length}`);
  console.log('\nNext: Update this file with your actual school data, then run migration.');
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
