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

// Soft pixel glow made from stacked circles
function glow(cx, cy, r, color) {
  ctx.globalAlpha = 0.07;
  for (let rr = r; rr > 4; rr -= 7) {
    for (let y = -rr; y <= rr; y++) {
      const w = Math.round(rr * Math.sqrt(1 - (y / rr) ** 2));
      rect(cx - w, cy + y, w * 2, 1, color);
    }
  }
  ctx.globalAlpha = 1;
}

// ---- The room itself ----
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
  rect(cx, top, 1, h, PAL.gold);                                // upright bar
  rect(cx - w / 2, top + Math.round(h * 0.45), w, 1, PAL.gold); // cross bar
  rect(cx - w / 2 - 3, top + h, w + 6, 3, PAL.gold);            // window sill
}

// ---- Wall decorations ----
const shelf = (x, y, w) => {
  rect(x, y, w, 2, PAL.woodLight);
  rect(x, y + 2, w, 1, PAL.blackSoft);
};

const teapot = (x, y, color) => {
  rect(x + 1, y - 5, 6, 4, color);   // body
  rect(x + 3, y - 7, 2, 2, color);   // lid
  rect(x, y - 4, 1, 2, color);       // spout
  rect(x + 7, y - 4, 1, 3, color);   // handle
  rect(x + 1, y - 1, 6, 1, PAL.blackSoft);
};

const jar = (x, y, color, h) => {
  rect(x, y - h, 5, h, color);
  rect(x, y - h - 1, 5, 1, PAL.gold); // lid
};

function drawWallDecor() {
  // Left shelves
  shelf(8, 34, 76);
  teapot(12, 34, PAL.cream);
  jar(26, 34, '#b98a6a', 6);
  jar(33, 34, PAL.cream, 8);
  jar(40, 34, PAL.burgundy, 5);
  teapot(52, 34, '#e8c8d0');
  jar(66, 34, '#4f8556', 7);

  shelf(8, 52, 76);
  jar(12, 52, PAL.burgundy, 7);
  jar(19, 52, '#b98a6a', 5);
  teapot(30, 52, PAL.cream);
  jar(44, 52, PAL.cream, 7);
  jar(51, 52, '#4f8556', 5);
  teapot(62, 52, '#e8c8d0');

  // Hanging lantern
  glow(166, 24, 28, '#ffd479');
  rect(166, 7, 1, 9, PAL.gold);       // chain
  rect(162, 16, 9, 2, PAL.gold);      // top
  rect(162, 18, 9, 11, PAL.gold);     // frame
  rect(164, 20, 5, 7, '#ffe9a0');     // light
  rect(164, 29, 5, 2, PAL.gold);      // base

  // Chalkboard
  rect(180, 20, 40, 30, PAL.woodLight);
  rect(182, 22, 36, 26, '#1f2420');
  const chalk = '#cfc8b4';
  rect(186, 25, 14, 1, chalk);        // writing lines
  rect(186, 28, 10, 1, chalk);
  rect(196, 36, 8, 5, chalk);         // teacup
  rect(204, 37, 2, 3, chalk);
  rect(194, 41, 12, 1, chalk);        // saucer
  rect(198, 32, 1, 3, chalk);         // steam
  rect(201, 31, 1, 3, chalk);
  rect(209, 26, 2, 1, '#e8a0b4');     // little heart
  rect(212, 26, 2, 1, '#e8a0b4');
  rect(209, 27, 5, 1, '#e8a0b4');
  rect(210, 28, 3, 1, '#e8a0b4');
  rect(211, 29, 1, 1, '#e8a0b4');
}

// ---- Draw everything, back to front ----
drawRoom();
drawWallDecor();
