import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = content.split('\n');

for (let i = 217; i <= 321; i++) {
  // Replace all md: occurrences with lg: in this range
  lines[i] = lines[i].replace(/md:/g, 'lg:');
}

// Special case line 242 (was 241 now possibly shifted, anyway let's just string match)
// window.innerWidth >= 768 ? 115 : 75) to 1024
content = lines.join('\n');
content = content.replace('window.innerWidth >= 768', 'window.innerWidth >= 1024');

fs.writeFileSync('src/App.tsx', content);
console.log('done');
