const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'games_fitgirl_config.json'), 'utf8'));

config.forEach(g => {
  const gDir = path.join(__dirname, 'games', g.folder);
  const coverExists = fs.existsSync(path.join(gDir, 'cover.webp'));
  const posterExists = fs.existsSync(path.join(gDir, 'poster.webp'));
  const ssDir = path.join(gDir, 'screenshots');
  const ssCount = fs.existsSync(ssDir) ? fs.readdirSync(ssDir).filter(f => f.endsWith('.webp') || f.endsWith('.jpg')).length : 0;
  console.log(g.folder + ': cover=' + coverExists + ', poster=' + posterExists + ', screenshots=' + ssCount);
});
