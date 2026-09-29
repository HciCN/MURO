const fs = require('fs');

const raw = fs.readFileSync('C:/Users/MeHom/.gemini/antigravity/brain/f3036262-fac1-489f-be41-01dee5d6f7aa/.system_generated/steps/1823/content.md', 'utf8');

const entryStart = raw.indexOf('<div class="entry-content">');
const entryEnd = raw.indexOf('</div><!-- .entry-content -->');
console.log('Entry start:', entryStart, 'end:', entryEnd);

const entryHtml = raw.slice(entryStart, entryEnd);

// In WordPress entry-content, the 150 list is usually structured as paragraph tags or list or links.
// Let's inspect all <a href="https://fitgirl-repacks.site/..." in entryHtml
const aRegex = /<a\s+href="(https:\/\/fitgirl-repacks\.site\/([^"\/]+)\/)"[^>]*>([\s\S]*?)<\/a>/gi;
let m;
const games = [];
while ((m = aRegex.exec(entryHtml)) !== null) {
  const url = m[1];
  const slug = m[2];
  const innerHtml = m[3];
  
  // Extract img src
  const imgMatch = /<img[^>]+src="([^">]+)"/i.exec(innerHtml);
  // Extract title if exists
  const titleAttrMatch = /title="([^">]+)"/i.exec(m[0]);
  let title = titleAttrMatch ? titleAttrMatch[1] : '';
  if (!title) {
    // maybe inner text without img
    title = innerHtml.replace(/<[^>]+>/g, '').trim();
  }
  const imgSrc = imgMatch ? imgMatch[1] : '';
  
  // ignore internal categories/pages if any
  if (slug === 'popular-repacks-of-the-year' || slug === 'all-my-repacks-a-z' || slug === 'category') continue;

  games.push({
    slug,
    url,
    title,
    thumb: imgSrc
  });
}

console.log('Total extracted in entry:', games.length);
if (games.length > 0) {
  console.log('First 5:');
  console.log(games.slice(0, 5));
  console.log('Last 5:');
  console.log(games.slice(-5));
}

fs.writeFileSync('extracted_150_raw.json', JSON.stringify(games, null, 2), 'utf8');
