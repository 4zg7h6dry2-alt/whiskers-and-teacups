const W = 256, H = 144;
const canvas = document.getElementById('cafe');
const ctx = canvas.getContext('2d');
canvas.width = W;
canvas.height = H;

// Read the palette from style.css so both files always match
const css = getComputedStyle(document.documentElement);
const C = name => css.getPropertyValue(name).trim();
const PAL = {
  forestDeep: C('--forest-deep'),
  forest:     C('--forest'),
  blackSoft:  C('--black-soft'),
  gold:       C('--gold'),
  goldLight:  C('--gold-light'),
  cream:      C('--cream'),
  burgundy:   C('--burgundy'),
  // Extra shades for wood and sky
  wood:       '#3a2318',
  woodLight:  '#59361f',
  skyTop:     '#5f4f8a',
  skyMid:     '#9a86bf',
  skyLow:     '#d6b4d4'
};

// Draw a filled rectangle
const rect = (x, y, w, h, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
};

// Draw a window shape with a rounded top
function arch(cx, top, w, h, colorAt) {
  const half = w / 2;
  for (let y = 0; y < h; y++) {
    let a = half;
    if (y < half) a = Math.round(Math.sqrt(half * half - (half - y - 0.5) ** 2));
    rect(cx - a, top + y, a * 2, 1, colorAt(y));
  }
}

function drawRoom() {
  const FLOOR = 94;

  // Wall: deep green with soft stripes
  rect(0, 0, W, FLOOR, PAL.forestDeep);
  for (let x = 0; x < W; x += 8) rect(x, 0, 1, FLOOR, PAL.forest);

  // Ceiling beam
  rect(0, 0, W, 6, PAL.blackSoft);
  rect(0, 6, W, 1, PAL.gold);

  // Wooden panelling with a gold rail
  rect(0, 66, W, 28, PAL.wood);
  rect(0, 66, W, 2, PAL.gold);
  for (let x = 0; x < W; x += 16) {
    rect(x + 2, 72, 12, 18, PAL.blackSoft);
    rect(x + 3, 73, 10, 16, PAL.woodLight);
  }
  rect(0, 92, W, 2, PAL.blackSoft);

  // Floor: cream and burgundy checks
  for (let y = FLOOR; y < H; y += 8) {
    for (let x = 0; x < W; x += 8) {
      const odd = ((x + y) / 8) % 2;
      rect(x, y, 8, 8, odd ? PAL.burgundy : PAL.cream);
    }
  }

  // Arched window in the middle of the back wall
  const cx = 128, top = 14, w = 56, h = 50;
  arch(cx, top - 3, w + 6, h + 3, () => PAL.gold);
  arch(cx, top, w, h, y => y < h * 0.3 ? PAL.skyTop : y < h * 0.6 ? PAL.skyMid : PAL.skyLow);
  rect(cx, top, 1, h, PAL.gold);                      // upright bar
  rect(cx - w / 2, top + Math.round(h * 0.45), w, 1, PAL.gold); // cross bar
  rect(cx - w / 2 - 3, top + h, w + 6, 3, PAL.gold);  // window sill
}

drawRoom();
