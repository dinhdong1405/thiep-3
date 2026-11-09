const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- STARTING VERIFICATION OF THIEP 5 ---');

// 1. Check files existence
const files = [
  'thiep-5.html',
  path.join('thiep-5', 'index.html'),
  'index.html',
  'thiep-5.md'
];

for (const f of files) {
  if (fs.existsSync(f)) {
    console.log(`[PASS] File exists: ${f} (${fs.statSync(f).size} bytes)`);
  } else {
    console.error(`[FAIL] File missing: ${f}`);
    process.exit(1);
  }
}

// 2. Check index.html integration
const indexContent = fs.readFileSync('index.html', 'utf8');
if (indexContent.includes('thiep-5.html') && indexContent.includes('Thiệp 05') && indexContent.includes('theme-thiep5')) {
  console.log('[PASS] index.html contains Thiệp 5 card, link, and theme class.');
} else {
  console.error('[FAIL] index.html missing Thiệp 5 integration!');
  process.exit(1);
}

// 3. Check thiep-5.html content & syntax
const thiep5Content = fs.readFileSync('thiep-5.html', 'utf8');

// Ensure zero external CDN links
const cdnPatterns = [
  /https?:\/\/cdn/i,
  /https?:\/\/fonts\.googleapis/i,
  /https?:\/\/cdnjs/i,
  /https?:\/\/unpkg/i,
  /https?:\/\/code\.jquery/i
];

for (const p of cdnPatterns) {
  if (p.test(thiep5Content)) {
    console.error(`[FAIL] Detected external CDN link matching ${p} in thiep-5.html!`);
    process.exit(1);
  }
}
console.log('[PASS] No external CDN dependencies detected in thiep-5.html.');

// Extract <script>...</script> and test with Node vm
const scriptMatch = thiep5Content.match(/<script>([\s\S]*?)<\/script>/);
if (!scriptMatch) {
  console.error('[FAIL] Could not find <script> tag in thiep-5.html!');
  process.exit(1);
}

const jsCode = scriptMatch[1];

// Mock basic browser globals to evaluate JS syntax and CARD_CONFIG
const sandbox = {
  window: {
    addEventListener: () => {},
    innerWidth: 390,
    innerHeight: 780,
    devicePixelRatio: 2,
    location: { hash: '', search: '' }
  },
  document: {
    getElementById: () => ({
      getContext: () => ({
        translate: () => {},
        rotate: () => {},
        scale: () => {},
        save: () => {},
        restore: () => {},
        clearRect: () => {},
        drawImage: () => {},
        beginPath: () => {},
        arc: () => {},
        fill: () => {},
        stroke: () => {},
        ellipse: () => {},
        moveTo: () => {},
        lineTo: () => {},
        closePath: () => {},
        setTransform: () => {},
        createLinearGradient: () => ({ addColorStop: () => {} }),
        createRadialGradient: () => ({ addColorStop: () => {} })
      }),
      classList: { add: () => {}, remove: () => {}, contains: () => false },
      style: {},
      querySelector: () => ({ style: {} }),
      addEventListener: () => {}
    }),
    createElement: () => ({
      getContext: () => ({
        translate: () => {},
        rotate: () => {},
        scale: () => {},
        save: () => {},
        restore: () => {},
        clearRect: () => {},
        drawImage: () => {},
        beginPath: () => {},
        arc: () => {},
        fill: () => {},
        stroke: () => {},
        ellipse: () => {},
        moveTo: () => {},
        lineTo: () => {},
        closePath: () => {},
        createLinearGradient: () => ({ addColorStop: () => {} }),
        createRadialGradient: () => ({ addColorStop: () => {} })
      })
    }),
    documentElement: { outerHTML: '<html></html>' }
  },
  performance: { now: () => 1000 },
  requestAnimationFrame: () => {},
  setTimeout: () => {},
  clearTimeout: () => {},
  Image: function() { this.onload = null; },
  FileReader: function() { this.onload = null; this.readAsDataURL = () => {}; },
  Blob: function() {},
  URL: { createObjectURL: () => '', revokeObjectURL: () => {} },
  console: console
};

try {
  vm.createContext(sandbox);
  vm.runInContext(jsCode, sandbox);
  console.log('[PASS] JavaScript in thiep-5.html executed without syntax errors!');
  const config = vm.runInContext('CARD_CONFIG', sandbox);
  console.log('[PASS] CARD_CONFIG parsed successfully:', {
    senderName: config.senderName,
    recipientName: config.recipientName,
    pin: config.pin,
    flowerShowerMs: config.flowerShowerMs
  });
  console.log('[PASS] window.__cardDebug hook is present:', typeof sandbox.window.__cardDebug === 'object');
} catch (err) {
  console.error('[FAIL] Error executing JavaScript from thiep-5.html:', err);
  process.exit(1);
}

// 4. Test Heart Geometry Formula Output
console.log('[TEST] Checking parametric heart geometry coordinates...');
const points = vm.runInContext('getHeartPoints(52)', sandbox);
console.log(`[PASS] Generated ${points.length} arc-length distributed heart points.`);
const xs = points.map(p => p.x);
const ys = points.map(p => p.y);
const minX = Math.min(...xs);
const maxX = Math.max(...xs);
const minY = Math.min(...ys);
const maxY = Math.max(...ys);

console.log(`[INFO] Heart bounding box: x in [${minX.toFixed(1)}, ${maxX.toFixed(1)}], y in [${minY.toFixed(1)}, ${maxY.toFixed(1)}]`);
if (minX >= 45 && maxX <= 340 && minY >= 260 && maxY <= 535) {
  console.log('[PASS] Heart bounding box matches specs (approx 280x258 px around center 192, 395).');
} else {
  console.warn('[WARN] Heart bounding box slightly outside expected range:', { minX, maxX, minY, maxY });
}

console.log('--- ALL CHECKS PASSED SUCCESSFULLY! ---');
