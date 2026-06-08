import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Also update other grid sections to use lg: instead of md: for the 115px grid
content = content.replace(/md:grid-cols-\[115px/g, 'lg:grid-cols-[115px');
content = content.replace(/md:grid-rows-\[115px/g, 'lg:grid-rows-[115px');

fs.writeFileSync('src/App.tsx', content);
console.log('done');
