const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, BatchWriteCommand } = require('@aws-sdk/lib-dynamodb');

// Note: This file uses .cjs extension to work with CommonJS in a module project
// Import the new schools data (will need to be converted from TS)
const newSchools = require('./dist/newSchools10Data.json');

const client = new DynamoDBClient({ region: 'us-east-1' });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = 'flight-schools';

async function uploadSchools() {
  console.log(`Starting upload of ${newSchools.length} schools to DynamoDB...`);

  // DynamoDB BatchWriteItem can handle max 25 items at a time
  const batchSize = 25;
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < newSchools.length; i += batchSize) {
    const batch = newSchools.slice(i, i + batchSize);

    const putRequests = batch.map(school => ({
      PutRequest: {
        Item: school
      }
    }));

    const params = {
      RequestItems: {
        [TABLE_NAME]: putRequests
      }
    };

    try {
      console.log(`\nUploading batch ${Math.floor(i / batchSize) + 1} (${batch.length} schools)...`);

      const result = await docClient.send(new BatchWriteCommand(params));

      // Check for unprocessed items
      if (result.UnprocessedItems && Object.keys(result.UnprocessedItems).length > 0) {
        console.warn(`  ⚠️  Warning: ${Object.keys(result.UnprocessedItems).length} items were not processed`);
        errorCount += Object.keys(result.UnprocessedItems).length;
      } else {
        console.log(`  ✅ Successfully uploaded ${batch.length} schools`);
        successCount += batch.length;
      }

      // Log each school uploaded in this batch
      batch.forEach(school => {
        console.log(`     - ${school.name} (${school.schoolId})`);
      });

    } catch (error) {
      console.error(`  ❌ Error uploading batch:`, error.message);
      errorCount += batch.length;
    }

    // Add a small delay between batches to avoid throttling
    if (i + batchSize < newSchools.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('Upload Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Successfully uploaded: ${successCount} schools`);
  if (errorCount > 0) {
    console.log(`❌ Failed to upload: ${errorCount} schools`);
  }
  console.log(`📊 Total schools in batch: ${newSchools.length}`);
  console.log('='.repeat(60));

  if (successCount === newSchools.length) {
    console.log('\n🎉 All schools uploaded successfully!');
  } else {
    console.log('\n⚠️  Some schools failed to upload. Please check the errors above.');
  }
}

// Run the upload
uploadSchools()
  .then(() => {
    console.log('\n✨ Upload process completed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Fatal error during upload:', error);
    process.exit(1);
  });
