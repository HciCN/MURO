const fs = require('fs');

const content = fs.readFileSync('C:/Users/MeHom/.gemini/antigravity/brain/f3036262-fac1-489f-be41-01dee5d6f7aa/.system_generated/steps/1823/content.md', 'utf8');
const regex = /<a href="(https:\/\/fitgirl-repacks\.site\/[^"]+)" title="([^"]+)"[^>]*><img[^>]+src="([^"]+)"/g;

let match;
const games = [];
while ((match = regex.exec(content)) !== null) {
  games.push({ url: match[1], title: match[2], thumb: match[3] });
}

console.log('Total games found:', games.length);
games.forEach((g, idx) => {
  console.log(`${idx + 1}. [${g.url.split('/').filter(Boolean).pop()}] ${g.title}`);
});
