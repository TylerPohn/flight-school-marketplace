const fs = require('fs');
const path = require('path');

// This script converts the TypeScript newSchools10.ts file to a JSON file
// that can be used by the upload script

console.log('Building new schools data file...\n');

// Read the TypeScript file
const tsFilePath = path.join(__dirname, 'src', 'mock', 'newSchools10.ts');
const tsContent = fs.readFileSync(tsFilePath, 'utf8');

// Extract the array data using a regex pattern
// This looks for the export const newSchools: DetailedSchool[] = [...];
const arrayMatch = tsContent.match(/export const newSchools: DetailedSchool\[\] = (\[[\s\S]*?\]);/);

if (!arrayMatch) {
  console.error('❌ Could not find newSchools array in TypeScript file');
  process.exit(1);
}

// Get the array content and clean it up
let arrayContent = arrayMatch[1];

// Remove TypeScript type assertions (e.g., "as TrustTier")
arrayContent = arrayContent.replace(/\s+as\s+TrustTier/g, '');
arrayContent = arrayContent.replace(/TrustTier\.\w+\s+as\s+TrustTier/g, function(match) {
  // Extract the enum value (e.g., TrustTier.VERIFIED_FSP -> "Verified FSP")
  const enumValue = match.match(/TrustTier\.(\w+)/)[1];
  const mapping = {
    'VERIFIED_FSP': 'Verified FSP',
    'COMMUNITY_VERIFIED': 'Community-Verified',
    'UNVERIFIED': 'Unverified'
  };
  return `"${mapping[enumValue] || enumValue}"`;
});

// Replace all TrustTier enum references with string values
arrayContent = arrayContent.replace(/TrustTier\.VERIFIED_FSP/g, '"Verified FSP"');
arrayContent = arrayContent.replace(/TrustTier\.COMMUNITY_VERIFIED/g, '"Community-Verified"');
arrayContent = arrayContent.replace(/TrustTier\.UNVERIFIED/g, '"Unverified"');

try {
  // Parse the cleaned JavaScript array
  const schools = eval(arrayContent);

  console.log(`✅ Successfully parsed ${schools.length} schools from TypeScript file`);

  // Create dist directory if it doesn't exist
  const distDir = path.join(__dirname, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Write to JSON file
  const jsonFilePath = path.join(distDir, 'newSchools10Data.json');
  fs.writeFileSync(jsonFilePath, JSON.stringify(schools, null, 2));

  console.log(`✅ Successfully wrote JSON to: ${jsonFilePath}`);
  console.log('\n📋 Schools included:');
  schools.forEach((school, index) => {
    console.log(`   ${index + 1}. ${school.name} (${school.location.city}, ${school.location.state})`);
  });

  console.log('\n✨ Build complete! You can now run: node add10NewSchools.cjs');

} catch (error) {
  console.error('❌ Error parsing or writing schools data:', error.message);
  process.exit(1);
}
