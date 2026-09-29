const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const PORT = 9223;
const USER_DATA = path.join(__dirname, 'chrome_tmp_test_profile');

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
  for (let i = 0; i < 20; i++) {
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

  async function takeScreenshot(url, filename, scrollY = 0, waitTime = 2000) {
    console.log(`Navigating to ${url}...`);
    await send('Page.navigate', { url });
    await new Promise(r => setTimeout(r, waitTime));

    if (scrollY > 0) {
      await send('Runtime.evaluate', {
        expression: `window.scrollTo({ top: ${scrollY}, behavior: 'instant' });`
      });
      await new Promise(r => setTimeout(r, 1000));
    }

    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(filename, Buffer.from(data, 'base64'));
    console.log(`✓ Saved screenshot: ${filename} (${(data.length * 0.75 / 1024).toFixed(1)} KB)`);
  }

  // 1. Home 3D Reel
  await takeScreenshot('http://127.0.0.1:8080/home', 'verified_01_home_laurel_fixed.png', 0, 3000);

  // 2. Work 150 Games Grid Top
  await takeScreenshot('http://127.0.0.1:8080/work', 'verified_02_work_top.png', 0, 2500);

  // 3. Work 150 Games Grid Scrolled
  await takeScreenshot('http://127.0.0.1:8080/work', 'verified_03_work_150_grid.png', 1100, 2000);

  // 4. Exploration Detail Page
  await takeScreenshot('http://127.0.0.1:8080/films/black-myth-wukong', 'verified_04_exploration_specs.png', 900, 2000);

  ws.close();
  chrome.kill();
  console.log('=== All CDP Verifications Complete! ===');
  process.exit(0);
}

main().catch(err => {
  console.error('CDP Error:', err);
  process.exit(1);
});
