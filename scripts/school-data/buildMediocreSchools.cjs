const fs = require('fs');
const path = require('path');

console.log('Building mediocre schools data file...\n');

const tsFilePath = path.join(__dirname, 'src', 'mock', 'mediocreSchools10.ts');
const tsContent = fs.readFileSync(tsFilePath, 'utf8');

const arrayMatch = tsContent.match(/export const mediocreSchools: DetailedSchool\[\] = (\[[\s\S]*?\]);/);

if (!arrayMatch) {
  console.error('❌ Could not find mediocreSchools array in TypeScript file');
  process.exit(1);
}

let arrayContent = arrayMatch[1];

// Remove TypeScript type assertions
arrayContent = arrayContent.replace(/\s+as\s+TrustTier/g, '');
arrayContent = arrayContent.replace(/TrustTier\.\w+\s+as\s+TrustTier/g, function(match) {
  const enumValue = match.match(/TrustTier\.(\w+)/)[1];
  const mapping = {
    'VERIFIED_FSP': 'Verified FSP',
    'COMMUNITY_VERIFIED': 'Community-Verified',
    'UNVERIFIED': 'Unverified'
  };
  return `"${mapping[enumValue] || enumValue}"`;
});

arrayContent = arrayContent.replace(/TrustTier\.VERIFIED_FSP/g, '"Verified FSP"');
arrayContent = arrayContent.replace(/TrustTier\.COMMUNITY_VERIFIED/g, '"Community-Verified"');
arrayContent = arrayContent.replace(/TrustTier\.UNVERIFIED/g, '"Unverified"');

try {
  const schools = eval(arrayContent);

  console.log(`✅ Successfully parsed ${schools.length} schools from TypeScript file`);

  const distDir = path.join(__dirname, 'dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const jsonFilePath = path.join(distDir, 'mediocreSchools10Data.json');
  fs.writeFileSync(jsonFilePath, JSON.stringify(schools, null, 2));

  console.log(`✅ Successfully wrote JSON to: ${jsonFilePath}`);
  console.log('\n📋 Schools included:');
  schools.forEach((school, index) => {
    console.log(`   ${index + 1}. ${school.name} (${school.location.city}, ${school.location.state}) - ${school.avgRating}★`);
  });

  console.log('\n✨ Build complete! You can now run: node addMediocreSchools.cjs');

} catch (error) {
  console.error('❌ Error parsing or writing schools data:', error.message);
  process.exit(1);
}
