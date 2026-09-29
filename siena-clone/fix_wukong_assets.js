const https = require('https');
const fs = require('fs');
const path = require('path');

const gameDir = path.join(__dirname, 'games', '01-black-myth-wukong');
const coverUrl = 'https://cdn.cloudflare.steamstatic.com/steam/apps/2358720/library_600x900.jpg';
const coverJpg = path.join(gameDir, 'cover.jpg');
const coverWebp = path.join(gameDir, 'cover.webp');

const file = fs.createWriteStream(coverJpg);
https.get(coverUrl, (res) => {
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    fs.copyFileSync(coverJpg, coverWebp);
    console.log(`✓ Wukong cover saved (${(fs.statSync(coverJpg).size / 1024).toFixed(1)} KB)`);

    // Poster from screenshot 01 (1080P)
    const ss01 = path.join(gameDir, 'screenshots', '01.jpg');
    if (fs.existsSync(ss01)) {
      fs.copyFileSync(ss01, path.join(gameDir, 'poster.jpg'));
      fs.copyFileSync(ss01, path.join(gameDir, 'poster.webp'));
      console.log('✓ Wukong poster created from 1080P screenshot 01');
    }
  });
});
