const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/mock/detailedSchools.ts');

// Read the file
let content = fs.readFileSync(filePath, 'utf8');

// Replace all single-quoted strings that contain apostrophes (escaped as \')
// with template literals (backticks)

// Match pattern: description: 'text with \' text'
// Replace with: description: `text with ' text`
content = content.replace(/body: '([^']*(?:\\'[^']*)*)'/g, (match, p1) => {
  const unescaped = p1.replace(/\\'/g, "'");
  return `body: \`${unescaped}\``;
});

content = content.replace(/title: '([^']*(?:\\'[^']*)*)'/g, (match, p1) => {
  const unescaped = p1.replace(/\\'/g, "'");
  return `title: \`${unescaped}\``;
});

content = content.replace(/bio: '([^']*(?:\\'[^']*)*)'/g, (match, p1) => {
  const unescaped = p1.replace(/\\'/g, "'");
  return `bio: \`${unescaped}\``;
});

content = content.replace(/reviewerName: '([^']*(?:\\'[^']*)*)'/g, (match, p1) => {
  const unescaped = p1.replace(/\\'/g, "'");
  return `reviewerName: \`${unescaped}\``;
});

// Write back
fs.writeFileSync(filePath, content, 'utf8');

console.log('✅ Fixed all single-quoted strings with apostrophes');
