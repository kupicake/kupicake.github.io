import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = content.split('\n');

for (let i = 329; i <= 360; i++) {
  // Replace all md: occurrences with lg: in this range
  lines[i] = lines[i].replace(/md:/g, 'lg:');
}

content = lines.join('\n');
fs.writeFileSync('src/App.tsx', content);
console.log('done');
