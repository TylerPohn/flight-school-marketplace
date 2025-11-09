import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the TypeScript file
const tsFilePath = path.join(__dirname, '../frontend/src/mock/detailedSchools.ts');
const tsContent = fs.readFileSync(tsFilePath, 'utf-8');

// Extract just the export statement and convert to JSON-like format
// Remove imports and types
let content = tsContent
  .replace(/^import.*$/gm, '')
  .replace(/^export interface.*{[\s\S]*?^}/gm, '')
  .replace(/^export const detailedMockSchools.*=\s*/, 'module.exports = ');

// Write a temporary JS file
const tempPath = path.join(__dirname, '_temp_schools.cjs');
fs.writeFileSync(tempPath, content);

// Import it
const schools = require('./_temp_schools.cjs');

// Clean up temp file
fs.unlinkSync(tempPath);

// Write JSON
fs.writeFileSync(
  path.join(__dirname, 'schools-data.json'),
  JSON.stringify(schools, null, 2)
);

console.log(`✓ Exported ${schools.length} schools to schools-data.json`);
