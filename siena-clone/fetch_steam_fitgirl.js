const https = require('https');
const fs = require('fs');

const appIds = {
  'black-myth-wukong': 2358720,
  'elden-ring': 1245620,
  'cyberpunk-2077': 1091500,
  'red-dead-redemption-2': 1174180,
  'grand-theft-auto-v': 271590,
  'god-of-war-ragnarok': 2322010,
  'baldurs-gate-3': 1086940,
  'marvels-spider-man-2': 2651280
};

function fetchApp(appId) {
  return new Promise((resolve) => {
    https.get(`https://store.steampowered.com/api/appdetails?appids=${appId}&l=schinese&cc=cn`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Cookie': 'birthtime=568022401; lastagecheckage=1-0-1988; mature_content=1; wants_mature_content=1'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed[appId]?.data || null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function run() {
  const results = {};
  for (const [slug, id] of Object.entries(appIds)) {
    console.log(`Fetching ${slug} (${id})...`);
    const data = await fetchApp(id);
    if (data) {
      console.log(`✓ Fetched ${data.name}`);
      results[slug] = {
        name: data.name,
        short_description: data.short_description,
        developers: data.developers,
        publishers: data.publishers,
        release_date: data.release_date?.date,
        header_image: data.header_image,
        screenshots: data.screenshots?.slice(0, 8).map(s => s.path_full),
        movies: data.movies?.map(m => m.webm?.max || m.mp4?.max),
        pc_requirements: data.pc_requirements
      };
    } else {
      console.log(`✗ Failed to fetch ${slug}`);
    }
  }
  fs.writeFileSync('steam_fitgirl_games.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('Saved steam_fitgirl_games.json');
}

run();
