#!/usr/bin/env node

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');
const fs = require('fs');
const path = require('path');

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = process.env.TABLE_NAME || 'flight-schools';

// Read the school data from the TypeScript files
// We'll need to parse and transform the data

async function loadSchoolsData() {
  // For now, we'll create a sample data structure based on the detailedSchools format
  // In practice, you'd want to export the data from your TypeScript files as JSON

  console.log('Loading school data from mock files...');

  // Read the schools.ts file and extract data
  // Since it's TypeScript, we'll need to manually create the data array

  // This is a simplified version - you'll need to copy the actual data
  const schools = require('../frontend/src/mock/schools.ts');

  return schools;
}

async function migrateSchool(school) {
  try {
    // Transform the school object to match DynamoDB schema
    const item = {
      schoolId: school.id || school.schoolId,
      name: school.name,
      state: school.location?.state || extractState(school.location),
      city: school.location?.city || extractCity(school.location),
      zipCode: school.location?.zipCode,
      coordinates: school.location?.coordinates,
      programs: school.programs || [],
      costBand: school.costBand,
      trainingType: school.trainingType,
      trustTier: school.trustTier,
      description: school.description,
      yearsInOperation: school.yearsInOperation,
      facilities: school.facilities || [],
      instructorCount: school.instructorCount,
      reviewCount: school.reviewCount || school.rating?.count || 0,
      avgRating: school.avgRating || school.rating?.score || 0,
      heroImageUrl: school.heroImageUrl || school.imageUrl,
      fleetDetails: school.fleetDetails || [],
      fleetSize: school.fleetSize || (school.fleetDetails ? school.fleetDetails.reduce((sum, fleet) => sum + fleet.count, 0) : 0),
      instructors: school.instructors || [],
      programDetails: school.programDetails || [],
      reviews: school.reviews || [],
      verificationDetails: school.verificationDetails,
      contactInfo: school.contactInfo,
      // Add timestamps
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const command = new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
    });

    await docClient.send(command);
    console.log(`✓ Migrated school: ${school.name} (${item.schoolId})`);
    return true;
  } catch (error) {
    console.error(`✗ Failed to migrate school ${school.name}:`, error.message);
    return false;
  }
}

function extractState(location) {
  if (typeof location === 'string') {
    const parts = location.split(',');
    return parts[1]?.trim().split(' ')[0] || '';
  }
  return location?.state || '';
}

function extractCity(location) {
  if (typeof location === 'string') {
    const parts = location.split(',');
    return parts[0]?.trim() || '';
  }
  return location?.city || '';
}

async function main() {
  console.log(`Starting migration to DynamoDB table: ${TABLE_NAME}`);
  console.log('Region: us-east-1\n');

  try {
    // Load schools from JSON file
    const dataPath = path.join(__dirname, 'schools-data.json');
    if (!fs.existsSync(dataPath)) {
      console.log('⚠️  No schools data found at:', dataPath);
      console.log('Please export your school data to a JSON file first.');
      console.log('\nTo use this script:');
      console.log('1. Export your schools data to scripts/schools-data.json');
      console.log('2. Run: TABLE_NAME=flight-schools node scripts/migrate-to-dynamo.js');
      process.exit(1);
    }

    const schools = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    console.log(`📚 Loaded ${schools.length} schools from ${dataPath}\n`);

    let successCount = 0;
    let failCount = 0;

    for (const school of schools) {
      const success = await migrateSchool(school);
      if (success) {
        successCount++;
      } else {
        failCount++;
      }
    }

    console.log(`\n✅ Migration complete!`);
    console.log(`   Successful: ${successCount}`);
    console.log(`   Failed: ${failCount}`);
    console.log(`   Total: ${schools.length}`);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    process.exit(1);
  }
}

// Only run if called directly
if (require.main === module) {
  main();
}

module.exports = { migrateSchool, extractState, extractCity };
