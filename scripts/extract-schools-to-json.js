#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the TypeScript file
const tsFilePath = path.join(__dirname, '../frontend/src/mock/detailedSchools.ts');
const outputPath = path.join(__dirname, 'schools-data.json');

console.log('Reading TypeScript file...');
const tsContent = fs.readFileSync(tsFilePath, 'utf8');

// Find the start of the array (after "export const detailedMockSchools: DetailedSchool[] = ")
const arrayStartPattern = /export const detailedMockSchools: DetailedSchool\[\] = /;
const arrayStartMatch = tsContent.match(arrayStartPattern);

if (!arrayStartMatch) {
  console.error('Could not find detailedMockSchools export in file');
  process.exit(1);
}

const arrayStartIndex = arrayStartMatch.index + arrayStartMatch[0].length;

// Find the end of the array - look for "];" at the end of the export
// We need to find the matching bracket, accounting for nested arrays
let bracketCount = 0;
let arrayEndIndex = -1;
let inString = false;
let stringChar = null;
let escaped = false;

for (let i = arrayStartIndex; i < tsContent.length; i++) {
  const char = tsContent[i];
  const prevChar = i > 0 ? tsContent[i - 1] : '';

  // Handle escape sequences
  if (escaped) {
    escaped = false;
    continue;
  }

  if (char === '\\') {
    escaped = true;
    continue;
  }

  // Handle strings
  if ((char === '"' || char === "'" || char === '`') && !inString) {
    inString = true;
    stringChar = char;
    continue;
  }

  if (char === stringChar && inString) {
    inString = false;
    stringChar = null;
    continue;
  }

  if (inString) {
    continue;
  }

  // Count brackets
  if (char === '[') {
    bracketCount++;
  } else if (char === ']') {
    bracketCount--;
    if (bracketCount === 0) {
      arrayEndIndex = i + 1;
      break;
    }
  }
}

if (arrayEndIndex === -1) {
  console.error('Could not find end of array');
  process.exit(1);
}

// Extract the array string
let arrayString = tsContent.substring(arrayStartIndex, arrayEndIndex);

console.log('Parsing array data...');

// Remove TypeScript enum references (e.g., "TrustTier.VERIFIED_FSP" -> "'VERIFIED_FSP'")
// Do this BEFORE removing type assertions
arrayString = arrayString.replace(/TrustTier\.VERIFIED_FSP/g, "'VERIFIED_FSP'");
arrayString = arrayString.replace(/TrustTier\.PREMIER/g, "'PREMIER'");
arrayString = arrayString.replace(/TrustTier\.COMMUNITY_VERIFIED/g, "'COMMUNITY_VERIFIED'");
arrayString = arrayString.replace(/TrustTier\.UNVERIFIED/g, "'UNVERIFIED'");
arrayString = arrayString.replace(/TrustTier\.BASIC/g, "'BASIC'");

// Remove TypeScript type assertions (e.g., "as TrustTier")
arrayString = arrayString.replace(/\s+as\s+\w+(\.\w+)*/g, '');

// Use eval to parse the JavaScript array (since it's now valid JS syntax)
// This is safe since we're reading from a trusted source file
let schoolsData;
try {
  schoolsData = eval('(' + arrayString + ')');
} catch (error) {
  console.error('Error parsing array:', error.message);
  console.error('First 500 chars of processed array:', arrayString.substring(0, 500));
  process.exit(1);
}

console.log(`Found ${schoolsData.length} schools`);

// Write to JSON file
console.log('Writing to JSON file...');
fs.writeFileSync(outputPath, JSON.stringify(schoolsData, null, 2), 'utf8');

console.log(`✓ Successfully exported ${schoolsData.length} schools to ${outputPath}`);

// Print school IDs and names
console.log('\nSchools exported:');
schoolsData.forEach((school, index) => {
  console.log(`${index + 1}. [${school.schoolId}] ${school.name}`);
});
