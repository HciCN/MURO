const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9224;
const USER_DATA = path.join(__dirname, 'chrome_tmp_test_profile_2');

async function main() {
  console.log('Launching headless Chrome on port', PORT);
  const chrome = spawn(CHROME_PATH, [
    '--headless=new',
    '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${USER_DATA}`,
    '--window-size=1920,1080',
    'about:blank'
  ]);

  chrome.on('error', (err) => console.error('Chrome spawn error:', err));

  let versionData = null;
  for (let i = 0; i < 25; i++) {
    try {
      await new Promise(r => setTimeout(r, 400));
      versionData = await new Promise((resolve, reject) => {
        http.get(`http://127.0.0.1:${PORT}/json/version`, (res) => {
          let body = '';
          res.on('data', d => body += d);
          res.on('end', () => {
            try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
          });
        }).on('error', reject);
      });
      if (versionData && versionData.webSocketDebuggerUrl) break;
    } catch (e) {}
  }

  const list = await new Promise((resolve) => {
    http.get(`http://127.0.0.1:${PORT}/json/list`, (res) => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => {
        try {
          const l = JSON.parse(body);
          resolve(l.find(t => t.type === 'page') || l[0]);
        } catch (e) { resolve(null); }
      });
    });
  });

  const ws = new WebSocket(list.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();

  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      const p = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) p.reject(data.error);
      else p.resolve(data.result);
    }
  };

  await new Promise(resolve => ws.onopen = resolve);
  console.log('CDP Connected!');

  await send('Page.enable');
  await send('DOM.enable');

  async function takeScreenshot(url, filename, evalScript = '', waitTime = 2500) {
    console.log(`Navigating to ${url}...`);
    await send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, waitTime));

    if (evalScript) {
      await send('Runtime.evaluate', { expression: evalScript });
      await new Promise(r => setTimeout(r, 1200));
    }

    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filename, Buffer.from(data, 'base64'));
    console.log(`✓ Saved screenshot: ${filename} (${(data.length * 0.75 / 1024).toFixed(1)} KB)`);
  }

  // 1. Home 3D Reel with fixes applied
  await takeScreenshot('http://127.0.0.1:8080/home', 'verified_home_clean.png', '', 3000);

  // 2. Work Page in 150 Games Archive Mode
  await takeScreenshot('http://127.0.0.1:8080/work', 'verified_work_150_catalog.png', 
    `switchView('archive');`, 2500);

  // 3. Work Page with Search Filter "黑神话"
  await takeScreenshot('http://127.0.0.1:8080/work', 'verified_work_search_wukong.png', 
    `switchView('archive'); document.getElementById('game-search-input').value = '黑神话'; updateFilter();`, 2500);

  // 4. Work Page with Search Filter "赛车"
  await takeScreenshot('http://127.0.0.1:8080/work', 'verified_work_category_racing.png', 
    `switchView('archive'); filterCategory('赛车竞速', document.querySelectorAll('.cat-pill')[5]);`, 2500);

  ws.close();
  chrome.kill();
  console.log('=== All CDP Verifications Complete! ===');
  process.exit(0);
}

main().catch(err => {
  console.error('CDP Error:', err);
  process.exit(1);
});
