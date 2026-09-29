const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('extracted_150_raw.json', 'utf8'));

console.log('Total games:', raw.length);
raw.forEach((g, idx) => {
  console.log(`${idx + 1}. [${g.slug}] ${g.title}`);
});
