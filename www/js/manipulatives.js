/**
 * Maple Math Quest - Interactive Visual Manipulatives Engine
 * Designed for early learners and elementary students (K-6) with large touch targets:
 * 1. Ten-Frames (5-frames, single 10-frame, double 20-frame with interactive tap-to-count tokens)
 * 2. Base-10 Blocks (Hundreds flats, Tens rods, Ones units)
 * 3. Fraction Visuals (Pizza slices & Fraction strip bars with interactive comparison)
 * 4. Canadian Money (Nickel 5¢, Dime 10¢, Quarter 25¢, Loonie $1, Toonie $2, $5/$10/$20 polymer notes)
 * 5. Analog & Digital Clocks + Thermometer (°C) + 2D/3D Geometry + Bar/Pictographs
 */
class ManipulativesRenderer {
  static render(visualData) {
    if (!visualData || !visualData.type) return '';

    switch (visualData.type) {
      case 'ten-frame':
        return this.renderTenFrame(visualData);
      case 'base-ten':
        return this.renderBaseTen(visualData);
      case 'fraction-bar':
        return this.renderFractionVisual(visualData);
      case 'canadian-coins':
        return this.renderCanadianMoney(visualData);
      case 'clock':
        return this.renderClock(visualData);
      case 'pattern-sequence':
        return this.renderPatternSequence(visualData);
      case 'shape-2d':
        return this.renderShape2D(visualData);
      case 'bar-graph':
        return this.renderBarGraph(visualData);
      case 'number-line':
        return this.renderNumberLine(visualData);
      case 'rectangle-grid':
        return this.renderRectangleGrid(visualData);
      case 'balance-scale':
        return this.renderBalanceScale(visualData);
      case 'thermometer':
        return this.renderThermometer(visualData);
      case 'coordinate-grid':
        return this.renderCoordinateGrid(visualData);
      case 'spinner':
        return this.renderProbabilitySpinner(visualData);
      case 'coding-grid':
        return this.renderCodingGrid(visualData);
      default:
        return '';
    }
  }

  static renderTenFrame({ countA = 0, countB = 0, capacity = 10, emojiA = '🍁', emojiB = ' acorns', showEquation = '' }) {
    const frames = capacity > 10 ? 2 : 1;
    const totalCells = frames * 10;
    let html = `<div class="manipulative-card ten-frame-wrapper" aria-label="Interactive Ten Frame">`;
    html += `<div class="manipulative-hint">👆 Tap any square to count along!</div>`;
    html += `<div class="ten-frames-row">`;

    let itemIndex = 0;
    for (let f = 0; f < frames; f++) {
      html += `<div class="ten-frame-grid">`;
      for (let c = 0; c < 10; c++) {
        let tokenHtml = '';
        let cellClass = 'tf-cell';
        if (itemIndex < countA) {
          tokenHtml = `<span class="tf-token token-primary">${emojiA}</span>`;
          cellClass += ' filled-a';
        } else if (itemIndex < countA + countB) {
          tokenHtml = `<span class="tf-token token-secondary">${emojiB}</span>`;
          cellClass += ' filled-b';
        }
        const badgeNumber = itemIndex + 1;
        html += `
          <button type="button" class="${cellClass}" onclick="ManipulativesRenderer.toggleCountHighlight(this, ${badgeNumber})">
            ${tokenHtml}
            <span class="tf-count-badge">${badgeNumber}</span>
          </button>`;
        itemIndex++;
      }
      html += `</div>`;
    }
    html += `</div>`;
    if (showEquation) {
      html += `<div class="manipulative-caption">${showEquation}</div>`;
    }
    html += `</div>`;
    return html;
  }

  static toggleCountHighlight(btn, num) {
    btn.classList.toggle('counted');
    if (window.soundEngine) {
      window.soundEngine.playPop();
      if (btn.classList.contains('counted')) {
        window.soundEngine.speak(String(num));
      }
    }
  }

  static renderBaseTen({ hundreds = 0, tens = 0, ones = 0, label = '' }) {
    let html = `<div class="manipulative-card base-ten-wrapper">`;
    html += `<div class="manipulative-hint">👆 Tap blocks to hear their value!</div>`;
    html += `<div class="base-ten-groups">`;

    if (hundreds > 0) {
      html += `<div class="b10-column"><div class="b10-col-title">Hundreds (100)</div><div class="b10-items">`;
      for (let i = 0; i < hundreds; i++) {
        html += `<button type="button" class="b10-flat" onclick="window.soundEngine.playPop(); window.soundEngine.speak('100')" title="100 Flat"><span>100</span></button>`;
      }
      html += `</div></div>`;
    }

    if (tens > 0 || hundreds > 0) {
      html += `<div class="b10-column"><div class="b10-col-title">Tens (10)</div><div class="b10-items">`;
      if (tens === 0) {
        html += `<div class="b10-empty">0 rods</div>`;
      }
      for (let i = 0; i < tens; i++) {
        html += `<button type="button" class="b10-rod" onclick="window.soundEngine.playPop(); window.soundEngine.speak('10')" title="10 Rod"><span>10</span></button>`;
      }
      html += `</div></div>`;
    }

    html += `<div class="b10-column"><div class="b10-col-title">Ones (1)</div><div class="b10-items ones-grid">`;
    if (ones === 0) {
      html += `<div class="b10-empty">0 units</div>`;
    }
    for (let i = 0; i < ones; i++) {
      html += `<button type="button" class="b10-unit" onclick="window.soundEngine.playPop(); window.soundEngine.speak('1')" title="1 Unit">1</button>`;
    }
    html += `</div></div>`;

    html += `</div>`;
    if (label) {
      html += `<div class="manipulative-caption">${label}</div>`;
    }
    html += `</div>`;
    return html;
  }

  static renderFractionVisual({ numerator = 1, denominator = 4, compareNum = null, compareDen = null, mode = 'bar' }) {
    let html = `<div class="manipulative-card fraction-wrapper">`;
    html += `<div class="fraction-bars-stack">`;

    html += this.buildSingleFractionBar(numerator, denominator, '#FF6B4A', compareNum !== null ? `Fraction A` : '');
    if (compareNum !== null && compareDen !== null) {
      html += this.buildSingleFractionBar(compareNum, compareDen, '#2EC4B6', `Fraction B`);
    }

    html += `</div></div>`;
    return html;
  }

  static buildSingleFractionBar(num, den, color, title) {
    let bar = `<div class="fraction-bar-row">`;
    if (title) {
      bar += `<div class="fraction-row-label">${title}: <strong>${num}/${den}</strong></div>`;
    }
    bar += `<div class="fraction-strip" style="grid-template-columns: repeat(${den}, 1fr);">`;
    for (let i = 0; i < den; i++) {
      const isFilled = i < num;
      bar += `
        <button type="button" class="fraction-segment ${isFilled ? 'filled' : ''}"
          style="${isFilled ? `background:${color};` : ''}"
          onclick="window.soundEngine.playTap()">
          <span>1/${den}</span>
        </button>`;
    }
    bar += `</div></div>`;
    return bar;
  }

  static renderCanadianMoney({ coins = [], promptLabel = 'Tap each Canadian coin or bill to count!' }) {
    const coinDefs = {
      nickel: { name: 'Nickel', value: '5¢', cents: 5, animal: '🦫', bg: '#C0C7CE', border: '#8D99AE', size: '68px', shape: 'circle' },
      dime: { name: 'Dime', value: '10¢', cents: 10, animal: '⛵', bg: '#D8E2EC', border: '#7F8C9A', size: '60px', shape: 'circle' },
      quarter: { name: 'Quarter', value: '25¢', cents: 25, animal: '🦌', bg: '#CBD4DC', border: '#6C7A89', size: '76px', shape: 'circle' },
      loonie: { name: 'Loonie', value: '$1', cents: 100, animal: '🦆', bg: '#F4C430', border: '#B8860B', size: '82px', shape: 'hendecagon' },
      toonie: { name: 'Toonie', value: '$2', cents: 200, animal: '🐻‍❄️', bg: '#E2E6EA', border: '#D4AF37', size: '88px', shape: 'toonie' },
      bill5: { name: '$5 Bill', value: '$5', cents: 500, animal: '🛰️', bg: '#4A90E2', border: '#1B4F72', size: '112px', shape: 'bill' },
      bill10: { name: '$10 Bill', value: '$10', cents: 1000, animal: '🏛️', bg: '#8E44AD', border: '#4A235A', size: '112px', shape: 'bill' },
      bill20: { name: '$20 Bill', value: '$20', cents: 2000, animal: '🍁', bg: '#27AE60', border: '#145A32', size: '112px', shape: 'bill' }
    };

    let html = `<div class="manipulative-card money-wrapper">`;
    html += `<div class="manipulative-hint">🇨🇦 ${promptLabel}</div>`;
    html += `<div class="canadian-coins-tray">`;

    coins.forEach((cKey) => {
      const def = coinDefs[cKey] || coinDefs.loonie;
      if (def.shape === 'bill') {
        html += `
          <button type="button" class="ca-bill" style="background:${def.bg}; border-color:${def.border};"
            onclick="this.classList.toggle('counted'); window.soundEngine.playCoin(); window.soundEngine.speak('${def.name} ${def.value}')">
            <span class="ca-bill-corner">${def.value}</span>
            <span class="ca-bill-emblem">${def.animal}</span>
            <span class="ca-bill-name">CANADA ${def.name}</span>
          </button>`;
      } else if (def.shape === 'toonie') {
        html += `
          <button type="button" class="ca-coin ca-toonie" style="width:${def.size}; height:${def.size};"
            onclick="this.classList.toggle('counted'); window.soundEngine.playCoin(); window.soundEngine.speak('Toonie 2 dollars')">
            <div class="toonie-inner">
              <span class="ca-coin-animal">${def.animal}</span>
              <span class="ca-coin-val">${def.value}</span>
              <span class="ca-coin-name">${def.name}</span>
            </div>
          </button>`;
      } else {
        html += `
          <button type="button" class="ca-coin ${def.shape === 'hendecagon' ? 'ca-loonie' : ''}"
            style="width:${def.size}; height:${def.size}; background:${def.bg}; border-color:${def.border};"
            onclick="this.classList.toggle('counted'); window.soundEngine.playCoin(); window.soundEngine.speak('${def.name} ${def.value}')">
            <span class="ca-coin-animal">${def.animal}</span>
            <span class="ca-coin-val">${def.value}</span>
            <span class="ca-coin-name">${def.name}</span>
          </button>`;
      }
    });

    html += `</div></div>`;
    return html;
  }

  static renderClock({ hours = 3, minutes = 0 }) {
    const minAngle = minutes * 6;
    const hourAngle = ((hours % 12) * 30) + (minutes * 0.5);

    let numbersSvg = '';
    for (let n = 1; n <= 12; n++) {
      const rad = ((n * 30) - 90) * (Math.PI / 180);
      const x = 100 + 72 * Math.cos(rad);
      const y = 100 + 72 * Math.sin(rad) + 6;
      numbersSvg += `<text x="${x}" y="${y}" text-anchor="middle" font-size="16" font-weight="800" fill="#2B2D42">${n}</text>`;
    }

    return `
      <div class="manipulative-card clock-wrapper">
        <svg viewBox="0 0 200 200" class="analog-clock-svg">
          <circle cx="100" cy="100" r="92" fill="#FFFDF9" stroke="#D9381E" stroke-width="8"/>
          <circle cx="100" cy="100" r="84" fill="none" stroke="#F4E8C1" stroke-width="2" stroke-dasharray="4 6.99"/>
          ${numbersSvg}
          <!-- Hour hand (short, red) -->
          <line x1="100" y1="100" x2="100" y2="52" stroke="#D9381E" stroke-width="7" stroke-linecap="round"
            transform="rotate(${hourAngle} 100 100)" />
          <!-- Minute hand (long, teal) -->
          <line x1="100" y1="100" x2="100" y2="32" stroke="#118AB2" stroke-width="5" stroke-linecap="round"
            transform="rotate(${minAngle} 100 100)" />
          <circle cx="100" cy="100" r="6" fill="#2B2D42"/>
        </svg>
        <div class="clock-legend">
          <span class="legend-hour">🔴 Short Hand = Hour</span>
          <span class="legend-min">🔵 Long Hand = Minute</span>
        </div>
      </div>`;
  }

  static renderPatternSequence({ items = [] }) {
    let html = `<div class="manipulative-card pattern-wrapper"><div class="pattern-strip">`;
    items.forEach((item) => {
      const isMystery = item === '?';
      html += `
        <div class="pattern-tile ${isMystery ? 'mystery-tile' : ''}" onclick="window.soundEngine.playTap()">
          <span>${item}</span>
        </div>`;
    });
    html += `</div></div>`;
    return html;
  }

  static renderShape2D({ shape = 'triangle', label = '' }) {
    const shapes = {
      triangle: { svg: `<polygon points="100,24 176,166 24,166" fill="#FF9F1C" stroke="#E07A00" stroke-width="6" stroke-linejoin="round"/>`, corners: 3 },
      square: { svg: `<rect x="35" y="35" width="130" height="130" rx="6" fill="#2EC4B6" stroke="#1B998B" stroke-width="6"/>`, corners: 4 },
      rectangle: { svg: `<rect x="20" y="50" width="160" height="100" rx="6" fill="#4EA8DE" stroke="#118AB2" stroke-width="6"/>`, corners: 4 },
      rhombus: { svg: `<polygon points="100,20 175,100 100,180 25,100" fill="#00BBF9" stroke="#0077B6" stroke-width="6" stroke-linejoin="round"/>`, corners: 4 },
      trapezoid: { svg: `<polygon points="60,40 140,40 180,160 20,160" fill="#F15BB5" stroke="#9B5DE5" stroke-width="6" stroke-linejoin="round"/>`, corners: 4 },
      pentagon: { svg: `<polygon points="100,20 180,78 150,172 50,172 20,78" fill="#9B5DE5" stroke="#6A2C91" stroke-width="6" stroke-linejoin="round"/>`, corners: 5 },
      hexagon: { svg: `<polygon points="100,18 172,58 172,142 100,182 28,142 28,58" fill="#F15BB5" stroke="#B5179E" stroke-width="6" stroke-linejoin="round"/>`, corners: 6 },
      octagon: { svg: `<polygon points="68,20 132,20 180,68 180,132 132,180 68,180 20,132 20,68" fill="#EF476F" stroke="#B81D43" stroke-width="6" stroke-linejoin="round"/>`, corners: 8 },
      circle: { svg: `<circle cx="100" cy="100" r="74" fill="#06D6A0" stroke="#049A73" stroke-width="6"/>`, corners: 0 },
      cube: {
        svg: `
          <polygon points="45,65 115,65 115,155 45,155" fill="#4EA8DE" stroke="#1D3557" stroke-width="5" stroke-linejoin="round"/>
          <polygon points="45,65 80,35 150,35 115,65" fill="#90E0EF" stroke="#1D3557" stroke-width="5" stroke-linejoin="round"/>
          <polygon points="115,65 150,35 150,125 115,155" fill="#0077B6" stroke="#1D3557" stroke-width="5" stroke-linejoin="round"/>`,
        corners: 8
      },
      cylinder: {
        svg: `
          <path d="M50,55 L50,145 A50,20 0 0,0 150,145 L150,55 Z" fill="#2EC4B6" stroke="#0F766E" stroke-width="5"/>
          <ellipse cx="100" cy="55" rx="50" ry="20" fill="#CBF3F0" stroke="#0F766E" stroke-width="5"/>`,
        corners: 0
      },
      cone: {
        svg: `
          <polygon points="100,25 45,145 155,145" fill="#FF9F1C" stroke="#D97706" stroke-width="5" stroke-linejoin="round"/>
          <ellipse cx="100" cy="145" rx="55" ry="18" fill="#FFE6A7" stroke="#D97706" stroke-width="5"/>`,
        corners: 1
      },
      pyramid: {
        svg: `
          <polygon points="100,25 35,145 110,165" fill="#9B5DE5" stroke="#5A189A" stroke-width="5" stroke-linejoin="round"/>
          <polygon points="100,25 110,165 165,130" fill="#7B2CBF" stroke="#5A189A" stroke-width="5" stroke-linejoin="round"/>`,
        corners: 5
      }
    };
    const s = shapes[shape] || shapes.triangle;
    return `
      <div class="manipulative-card shape-wrapper">
        <svg viewBox="0 0 200 200" class="shape-svg" onclick="window.soundEngine.playPop()">
          ${s.svg}
        </svg>
        ${label ? `<div class="manipulative-caption">${label}</div>` : ''}
      </div>`;
  }

  static renderBarGraph({ title = 'Park Wildlife Tally', categories = [] }) {
    const maxVal = Math.max(...categories.map(c => c.value), 5);
    let html = `<div class="manipulative-card graph-wrapper">`;
    html += `<div class="graph-title">📊 ${title}</div>`;
    html += `<div class="bar-chart-grid">`;

    categories.forEach(cat => {
      const pct = Math.max(12, Math.round((cat.value / maxVal) * 100));
      html += `
        <div class="bar-column" onclick="window.soundEngine.playPop(); window.soundEngine.speak('${cat.label}: ${cat.value}')">
          <div class="bar-value-badge">${cat.value}</div>
          <div class="bar-track">
            <div class="bar-fill" style="height:${pct}%; background:${cat.color || '#FF6B4A'};"></div>
          </div>
          <div class="bar-label">${cat.icon || ''} ${cat.label}</div>
        </div>`;
    });

    html += `</div></div>`;
    return html;
  }

  static renderNumberLine({ min = -5, max = 5, start = 0, jump = 0, highlight = null }) {
    const steps = [];
    for (let i = min; i <= max; i++) {
      steps.push(i);
    }
    let html = `<div class="manipulative-card number-line-wrapper">`;
    html += `<div class="number-line-track">`;
    steps.forEach(n => {
      const isStart = n === start;
      const isHighlight = n === highlight;
      html += `
        <div class="nl-tick ${isStart ? 'nl-start' : ''} ${isHighlight ? 'nl-target' : ''}" onclick="window.soundEngine.playTap(); window.soundEngine.speak('${n}')">
          <div class="nl-marker">${isStart ? '🐸' : (isHighlight ? '⭐' : '')}</div>
          <div class="nl-line"></div>
          <div class="nl-num">${n}</div>
        </div>`;
    });
    html += `</div></div>`;
    return html;
  }

  static renderRectangleGrid({ rows = 3, cols = 4, unit = 'cm' }) {
    let html = `<div class="manipulative-card rect-grid-wrapper">`;
    html += `<div class="rect-dimension-top">${cols} ${unit}</div>`;
    html += `<div class="rect-body-row">`;
    html += `<div class="rect-dimension-side">${rows} ${unit}</div>`;
    html += `<div class="rect-cells-grid" style="grid-template-columns: repeat(${cols}, 1fr);">`;
    const total = rows * cols;
    for (let i = 1; i <= total; i++) {
      html += `<button type="button" class="rect-unit-cell" onclick="this.classList.toggle('counted'); window.soundEngine.playTap()">${i}</button>`;
    }
    html += `</div></div></div>`;
    return html;
  }

  static renderBalanceScale({ leftLabel = 'x + 4', rightLabel = '12' }) {
    return `
      <div class="manipulative-card balance-wrapper">
        <div class="balance-beam">
          <div class="balance-pan left-pan">
            <div class="pan-box">${leftLabel}</div>
          </div>
          <div class="balance-fulcrum">⚖️<span>=</span></div>
          <div class="balance-pan right-pan">
            <div class="pan-box">${rightLabel}</div>
          </div>
        </div>
        <div class="manipulative-caption">Both sides of the scale are equal!</div>
      </div>`;
  }

  static renderThermometer({ temp = 15, min = -20, max = 40, label = '' }) {
    const pct = Math.max(5, Math.min(95, Math.round(((temp - min) / (max - min)) * 100)));
    const mercuryColor = temp <= 0 ? '#00B4D8' : '#E63946';
    return `
      <div class="manipulative-card thermo-wrapper" onclick="window.soundEngine.playPop(); window.soundEngine.speak('${temp} degrees Celsius')">
        <div class="manipulative-hint">🌡️ Canadian Metric Thermometer (°C)</div>
        <div class="thermo-body">
          <div class="thermo-scale">
            <span>${max}°C</span>
            <span>0°C ❄️</span>
            <span>${min}°C</span>
          </div>
          <div class="thermo-tube">
            <div class="thermo-fill" style="height:${pct}%; background:${mercuryColor};"></div>
          </div>
          <div class="thermo-readout" style="color:${mercuryColor}">${temp}°C</div>
        </div>
        ${label ? `<div class="manipulative-caption">${label}</div>` : ''}
      </div>`;
  }

  static renderCoordinateGrid({ x = 2, y = 3, max = 5, icon = '🏕️', label = '' }) {
    let cells = '';
    for (let row = max; row >= 1; row--) {
      cells += `<div class="coord-y-label">${row}</div>`;
      for (let col = 1; col <= max; col++) {
        const isPoint = col === x && row === y;
        cells += `
          <button type="button" class="coord-cell ${isPoint ? 'coord-active' : ''}"
            onclick="window.soundEngine.playTap(); window.soundEngine.speak('Column ${col}, Row ${row}')">
            ${isPoint ? `<span class="coord-marker">${icon}</span>` : ''}
          </button>`;
      }
    }
    cells += `<div class="coord-corner">0</div>`;
    for (let col = 1; col <= max; col++) {
      cells += `<div class="coord-x-label">${col}</div>`;
    }

    return `
      <div class="manipulative-card coord-wrapper">
        <div class="manipulative-hint">🗺️ Remember: Go ACROSS (x) first, then UP (y)!</div>
        <div class="coord-grid" style="grid-template-columns: 28px repeat(${max}, 44px);">
          ${cells}
        </div>
        ${label ? `<div class="manipulative-caption">${label}</div>` : ''}
      </div>`;
  }

  static renderProbabilitySpinner({ items = ['🔴', '🔴', '🔴', '🔵'], title = 'Spinner Sectors' }) {
    let html = `<div class="manipulative-card spinner-wrapper">`;
    html += `<div class="manipulative-hint">🎡 ${title} (${items.length} equal sections)</div>`;
    html += `<div class="spinner-wheel-row">`;
    items.forEach((it, idx) => {
      html += `
        <button type="button" class="spinner-sector-pill" onclick="window.soundEngine.playPop()">
          <span class="sector-num">#${idx + 1}</span>
          <span class="sector-icon">${it}</span>
        </button>`;
    });
    html += `</div></div>`;
    return html;
  }

  static renderCodingGrid({ steps = ['⬆️', '⬆️', '➡️'], startLabel = '🦫 Start', endLabel = '🪵 Goal' }) {
    let html = `<div class="manipulative-card coding-wrapper">`;
    html += `<div class="manipulative-hint">🤖 Canadian Coding & Sequential Logic</div>`;
    html += `<div class="coding-strip">`;
    html += `<div class="coding-endpoint">${startLabel}</div>`;
    steps.forEach((st) => {
      html += `<div class="coding-arrow-tile" onclick="window.soundEngine.playTap()">${st}</div>`;
    });
    html += `<div class="coding-endpoint">${endLabel}</div>`;
    html += `</div></div>`;
    return html;
  }
}

window.ManipulativesRenderer = ManipulativesRenderer;
