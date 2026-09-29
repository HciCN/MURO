const fs = require('fs');
const path = require('path');

let homeHtml = fs.readFileSync('home.html', 'utf8');

// 1. Replace ALL award images (.award-img) with laurel-award.svg
homeHtml = homeHtml.replace(/<img[^>]+class="award-img"[^>]*\/>/g, 
  '<img src="/assets/laurel-award.svg" loading="lazy" alt="Game Festival Laurel" class="award-img" style="width: 58px; height: 58px; object-fit: contain; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));"/>');

// 2. Replace ALL review figure images inside .awards-w with stars-rating.svg
homeHtml = homeHtml.replace(/<figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img[^>]+><\/div><\/figure>/g,
  '<figure class="w-richtext-align-center w-richtext-figure-type-image"><div><img src="/assets/stars-rating.svg" loading="lazy" alt="5 Stars Rating" style="width: 90px; height: 16px; object-fit: contain; margin: 4px auto;"/></div></figure>');

// 3. Inject CSS fixes into <head> of home.html
const styleFixes = `
<style id="cjk-and-layout-fixes">
  /* Fix CJK / Chinese Title collisions and text overlap */
  .roll-cont-he.home {
    font-size: clamp(2.2rem, 4vw, 3.8rem) !important;
    line-height: 1.25 !important;
    letter-spacing: 0.02em !important;
    white-space: normal !important;
    word-break: keep-all !important;
    margin-bottom: 6px !important;
  }
  .split-line-wrapper {
    overflow: visible !important;
  }
  .split-line-move {
    line-height: 1.25 !important;
    height: auto !important;
    margin-bottom: 6px !important;
  }
  .split-line-move > div {
    line-height: 1.25 !important;
    height: auto !important;
    overflow: visible !important;
  }
  .split-rollover {
    display: inline-block !important;
    position: relative !important;
    overflow: hidden !important;
    vertical-align: top !important;
  }
  .cloneText2 {
    position: absolute !important;
    top: 100% !important;
    left: 0 !important;
    opacity: 0.8 !important;
  }

  /* Fix linecallout items so they don't collide or overlap */
  .linecallout-list.home {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    margin-top: 16px !important;
    padding: 0 !important;
  }
  .linecallout-item.home {
    height: auto !important;
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 16px !important;
    padding: 4px 0 !important;
    transform: none !important;
  }
  .linecallout-item.home div, 
  .linecallout-item.home span {
    transform: none !important;
    font-size: 13px !important;
    letter-spacing: 0.08em !important;
    line-height: 1.4 !important;
  }
  .linecallout-item.home .paragraph:first-child,
  .linecallout-item.home div:first-child {
    min-width: 90px !important;
    color: rgba(255, 255, 255, 0.6) !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
  }

  /* Award and reviews aesthetic */
  .award_img-wrap {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    margin-top: 6px !important;
  }
  .award_headline {
    font-size: 13px !important;
    letter-spacing: 0.08em !important;
    line-height: 1.4 !important;
    text-align: center !important;
  }
  .award-year {
    font-size: 1.8rem !important;
    font-weight: 800 !important;
  }
  .awards-w figure {
    margin: 8px auto !important;
  }
  .awards-w p {
    font-size: 12px !important;
    letter-spacing: 0.1em !important;
    margin-top: 4px !important;
    opacity: 0.75 !important;
  }
  .awards-w h3 {
    font-size: 1.25rem !important;
    line-height: 1.3 !important;
    margin-top: 2px !important;
    margin-bottom: 12px !important;
  }
</style>
`;

if (!homeHtml.includes('id="cjk-and-layout-fixes"')) {
  homeHtml = homeHtml.replace('</head>', `${styleFixes}\n</head>`);
}

// 4. Update the linecallout text in each item so they display developer, year, category nicely
// Let's replace "Director" with "开发商" / "DEVELOPER"
homeHtml = homeHtml.replaceAll('<span class="text-span">Director</span>', '<span class="text-span">DEVELOPER</span>');
homeHtml = homeHtml.replaceAll('<span class="text-span">DIRECTOR</span>', '<span class="text-span">DEVELOPER</span>');

fs.writeFileSync('home.html', homeHtml, 'utf8');
console.log('✓ Successfully patched home.html with laurel SVGs, stars SVGs, and CJK layout fixes!');
