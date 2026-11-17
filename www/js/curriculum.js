/**
 * Maple Math Quest - Pan-Canadian / Ontario 2020 K-6 Mathematics Curriculum Engine
 * Covers all 5 official curriculum strands across 7 Grade levels (Kindergarten to Grade 6):
 * - B. Number (Number Sense & Operations)
 * - C. Algebra (Patterning, Coding & Algebraic Reasoning)
 * - D. Data (Data Literacy & Probability)
 * - E. Spatial Sense (Geometry & Measurement - Metric SI units)
 * - F. Financial Literacy (Canadian Coins, Polymer Bills, Making Change, Unit Rates & HST/Budgeting)
 */

const CANADIAN_GRADES = [
  {
    id: 'K',
    name: 'Kindergarten',
    shortName: 'Kindergarten',
    ageRange: 'Ages 4–5',
    division: 'Early Learners',
    mascot: '🦫',
    mascotName: 'Bucky the Beaver',
    regionTheme: 'Algonquin Acorn Woods',
    color: '#FF9F1C',
    bgGradient: 'linear-gradient(135deg, #FFF3B0 0%, #FFD166 100%)',
    description: 'Subitizing, counting to 10 & 20 on Ten-Frames, AB patterns, 2D shapes, and identifying Canadian coins.'
  },
  {
    id: '1',
    name: 'Grade 1',
    shortName: 'Grade 1',
    ageRange: 'Ages 6–7',
    division: 'Primary Division',
    mascot: '🫎',
    mascotName: 'Monty the Moose',
    regionTheme: 'Bay of Fundy Tides',
    color: '#FF6B4A',
    bgGradient: 'linear-gradient(135deg, #FFD8CC 0%, #FF9B85 100%)',
    description: 'Numbers to 50, addition & subtraction to 20, skip counting by 2s/5s/10s, telling time to the hour, and coins to 50¢.'
  },
  {
    id: '2',
    name: 'Grade 2',
    shortName: 'Grade 2',
    ageRange: 'Ages 7–8',
    division: 'Primary Division',
    mascot: '🐻‍❄️',
    mascotName: 'Nanook the Polar Bear',
    regionTheme: 'Hudson Bay Ice Trail',
    color: '#2EC4B6',
    bgGradient: 'linear-gradient(135deg, #CBF3F0 0%, #72EFDD 100%)',
    description: 'Place value to 200 with Base-10 blocks, two-digit operations, fair-share fractions, bar graphs, and money to $2.'
  },
  {
    id: '3',
    name: 'Grade 3',
    shortName: 'Grade 3',
    ageRange: 'Ages 8–9',
    division: 'Primary Division',
    mascot: '🦆',
    mascotName: 'Lucky the Loon',
    regionTheme: 'Muskoka Lakes Camp',
    color: '#118AB2',
    bgGradient: 'linear-gradient(135deg, #CDE8F6 0%, #7CC6FE 100%)',
    description: 'Numbers to 1,000, multiplication & division to 7×7, fraction strips, perimeter & area grids, and making change.'
  },
  {
    id: '4',
    name: 'Grade 4',
    shortName: 'Grade 4',
    ageRange: 'Ages 9–10',
    division: 'Junior Division',
    mascot: '🦊',
    mascotName: 'Fiona the Arctic Fox',
    regionTheme: 'Prairie Golden Skies',
    color: '#8338EC',
    bgGradient: 'linear-gradient(135deg, #E9D8FD 0%, #C499F3 100%)',
    description: 'Place value to 10,000, decimals to tenths, multiplication to 10×10, rectangle area formulas, and Canadian bills to $100.'
  },
  {
    id: '5',
    name: 'Grade 5',
    shortName: 'Grade 5',
    ageRange: 'Ages 10–11',
    division: 'Junior Division',
    mascot: '🦉',
    mascotName: 'Ollie the Snowy Owl',
    regionTheme: 'Banff Rocky Peaks',
    color: '#06A77D',
    bgGradient: 'linear-gradient(135deg, #C7F9CC 0%, #80ED99 100%)',
    description: 'Numbers to 100,000, equivalent fractions, decimals to hundredths, solving algebraic equations, and unit rates.'
  },
  {
    id: '6',
    name: 'Grade 6',
    shortName: 'Grade 6',
    ageRange: 'Ages 11–12',
    division: 'Junior Division',
    mascot: '🐋',
    mascotName: 'Bella the Beluga',
    regionTheme: 'Pacific West Coast Fjord',
    color: '#D9381E',
    bgGradient: 'linear-gradient(135deg, #FFD6DF 0%, #FF8FA3 100%)',
    description: 'Integers on a number line, order of operations, ratios & percents, triangle area, and Canadian 13% HST & savings goals.'
  }
];

const CURRICULUM_STRANDS = [
  {
    id: 'number',
    code: 'Strand B',
    name: 'Number Sense',
    icon: '🔢',
    color: '#E63946',
    badgeBg: '#FFE5E7',
    subtitle: 'Counting, Place Value, Operations & Fractions'
  },
  {
    id: 'algebra',
    code: 'Strand C',
    name: 'Algebra & Patterns',
    icon: '🧩',
    color: '#8338EC',
    badgeBg: '#F0E6FF',
    subtitle: 'Repeating & Growing Patterns, Equations & Coding Logic'
  },
  {
    id: 'data',
    code: 'Strand D',
    name: 'Data & Probability',
    icon: '📊',
    color: '#118AB2',
    badgeBg: '#E0F4FF',
    subtitle: 'Pictographs, Bar Charts, Mean/Median & Likelihood'
  },
  {
    id: 'spatial',
    code: 'Strand E',
    name: 'Spatial & Measurement',
    icon: '📐',
    color: '#06A77D',
    badgeBg: '#E2FBE8',
    subtitle: '2D/3D Shapes, Metric Length/Area, Angles & Clocks'
  },
  {
    id: 'financial',
    code: 'Strand F',
    name: 'Financial Literacy',
    icon: '🪙',
    color: '#D97706',
    badgeBg: '#FEF3C7',
    subtitle: 'Canadian Coins, Polymer Bills, Change & Smart Budgets'
  }
];

const CANADIAN_STICKERS = [
  { id: 'stk_beaver', name: 'Busy Beaver', icon: '🦫', desc: 'Complete your first Kindergarten or Number quest!' },
  { id: 'stk_maple', name: 'Golden Maple Leaf', icon: '🍁', desc: 'Earn 3 stars on any quest!' },
  { id: 'stk_moose', name: 'Mighty Moose', icon: '🫎', desc: 'Master a Grade 1 math challenge!' },
  { id: 'stk_loonie', name: 'Lucky Loonie', icon: '🦆', desc: 'Complete a Canadian Financial Literacy quest!' },
  { id: 'stk_polar', name: 'Northern Polar Bear', icon: '🐻‍❄️', desc: 'Solve 10 problems using Visual Manipulatives!' },
  { id: 'stk_canoe', name: 'Voyageur Canoe', icon: '🛶', desc: 'Explore 3 different Canadian curriculum strands!' },
  { id: 'stk_owl', name: 'Snowy Owl Scholar', icon: '🦉', desc: 'Get a 5-in-a-row streak of correct answers!' },
  { id: 'stk_aurora', name: 'Northern Lights', icon: '🌌', desc: 'Earn 15 total stars across Canada!' },
  { id: 'stk_hockey', name: 'Pond Hockey Champ', icon: '🏒', desc: 'Complete a Spatial Sense or Geometry quest!' },
  { id: 'stk_totem', name: 'Pacific Orca Whale', icon: '🐋', desc: 'Tackle a Junior Division (Grade 4–6) quest!' },
  { id: 'stk_puffin', name: 'Atlantic Puffin', icon: '🐧', desc: 'Master a Data & Probability graph challenge!' },
  { id: 'stk_mountie', name: 'True North Explorer', icon: '🏔️', desc: 'Earn 30 total stars on your math journey!' }
];

class CurriculumGenerator {
  static randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static shuffle(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  static buildNumericChoices(correctAnswer, minVal = 0, spread = 4, unitSuffix = '') {
    const set = new Set([correctAnswer]);
    let attempts = 0;
    while (set.size < 4 && attempts < 40) {
      attempts++;
      const offset = this.randInt(-spread, spread);
      const candidate = correctAnswer + offset;
      if (candidate >= minVal && candidate !== correctAnswer) {
        set.add(candidate);
      }
    }
    let fallback = correctAnswer + 1;
    while (set.size < 4) {
      if (!set.has(fallback)) set.add(fallback);
      fallback++;
    }
    return this.shuffle([...set]).map(v => ({
      label: `${v}${unitSuffix}`,
      value: String(v)
    }));
  }

  static generateQuestion(gradeId, strandId) {
    const key = `${gradeId}_${strandId}`;
    switch (key) {
      // ==================== KINDERGARTEN ====================
      case 'K_number': {
        const mode = this.randInt(1, 2);
        if (mode === 1) {
          const count = this.randInt(2, 10);
          const emoji = this.pickRandom(['🍁', '🍓', '🐝', '🌲', '🍄']);
          return {
            standardCode: 'K.B1 (Number Sense: Counting & Subitizing to 10)',
            prompt: `How many ${emoji} are in the Ten-Frame?`,
            hint: `Tap each ${emoji} in the Ten-Frame to count them one by one! Remember a full top row has 5.`,
            visual: { type: 'ten-frame', countA: count, capacity: 10, emojiA: emoji },
            choices: this.buildNumericChoices(count, 1, 3),
            correctValue: String(count),
            explanation: `There are ${count} ${emoji} in the Ten-Frame!`
          };
        } else {
          const a = this.randInt(1, 5);
          const b = this.randInt(1, 5);
          const sum = a + b;
          return {
            standardCode: 'K.B2 (Composing Quantities to 10)',
            prompt: `Bucky has ${a} 🍁 red leaves and finds ${b} 🌼 yellow flowers. How many in all?`,
            hint: `Count all the items inside the Ten-Frame together: ${a} + ${b}.`,
            visual: { type: 'ten-frame', countA: a, countB: b, capacity: 10, emojiA: '🍁', emojiB: '🌼', showEquation: `${a} + ${b} = ?` },
            choices: this.buildNumericChoices(sum, 1, 3),
            correctValue: String(sum),
            explanation: `${a} and ${b} make ${sum} altogether!`
          };
        }
      }

      case 'K_algebra': {
        const patterns = [
          { seq: ['🍁', '🌲', '🍁', '🌲', '🍁', '?'], ans: '🌲', distractors: ['🍁', '🍄', '⭐'], rule: 'Maple Leaf, Pine Tree, Maple Leaf, Pine Tree (AB pattern)' },
          { seq: ['🦫', '🦫', '🪵', '🦫', '🦫', '?'], ans: '🪵', distractors: ['🦫', '🐟', '🍁'], rule: 'Beaver, Beaver, Log (AAB pattern)' },
          { seq: ['🔴', '🔵', '🟡', '🔴', '🔵', '?'], ans: '🟡', distractors: ['🔴', '🔵', '🟢'], rule: 'Red, Blue, Yellow (ABC pattern)' },
          { seq: ['❄️', '⛄', '❄️', '⛄', '❄️', '?'], ans: '⛄', distractors: ['❄️', '🌞', '🌧️'], rule: 'Snowflake, Snowman (AB pattern)' }
        ];
        const p = this.pickRandom(patterns);
        return {
          standardCode: 'K.C1 (Patterning: Repeating Patterns)',
          prompt: `What comes next in the pattern?`,
          hint: `Say the pattern out loud from left to right: ${p.rule}.`,
          visual: { type: 'pattern-sequence', items: p.seq },
          choices: this.shuffle([p.ans, ...p.distractors]).map(x => ({ label: x, value: x })),
          correctValue: p.ans,
          explanation: `The pattern repeats! Next comes ${p.ans}.`
        };
      }

      case 'K_data': {
        const a = this.randInt(2, 6);
        let b = this.randInt(2, 6);
        while (b === a) b = this.randInt(2, 6);
        const c = this.randInt(1, 5);
        const cats = [
          { label: 'Beavers', icon: '🦫', value: a, color: '#FF9F1C' },
          { label: 'Moose', icon: '🫎', value: b, color: '#2EC4B6' },
          { label: 'Loons', icon: '🦆', value: c, color: '#118AB2' }
        ];
        const target = this.pickRandom(cats);
        return {
          standardCode: 'K.D1 (Data Literacy: Reading Pictographs & Bar Charts)',
          prompt: `Look at the forest chart! How many ${target.icon} ${target.label} did we spot?`,
          hint: `Find ${target.icon} ${target.label} at the bottom and look at the number on top of its bar!`,
          visual: { type: 'bar-graph', title: 'Animals Spotted in Algonquin Park', categories: cats },
          choices: this.buildNumericChoices(target.value, 1, 3),
          correctValue: String(target.value),
          explanation: `The bar for ${target.label} goes up to ${target.value}!`
        };
      }

      case 'K_spatial': {
        const shapes = [
          { key: 'triangle', name: 'Triangle', sides: 3 },
          { key: 'square', name: 'Square', sides: 4 },
          { key: 'circle', name: 'Circle', sides: 0 },
          { key: 'pentagon', name: 'Pentagon', sides: 5 },
          { key: 'hexagon', name: 'Hexagon', sides: 6 }
        ];
        const s = this.pickRandom(shapes);
        const askSides = s.sides > 0 && Math.random() > 0.45;
        if (askSides) {
          return {
            standardCode: 'K.E1 (Spatial Sense: Attributes of 2D Shapes)',
            prompt: `How many straight sides does this ${s.name} have?`,
            hint: `Trace and count each straight edge around the outside of the ${s.name}!`,
            visual: { type: 'shape-2d', shape: s.key, label: s.name },
            choices: this.buildNumericChoices(s.sides, 0, 3),
            correctValue: String(s.sides),
            explanation: `A ${s.name} has ${s.sides} straight sides and ${s.sides} corners!`
          };
        } else {
          return {
            standardCode: 'K.E1 (Spatial Sense: Identifying 2D Shapes)',
            prompt: `What is the name of this shape?`,
            hint: s.sides === 0 ? `It is round with 0 corners!` : `Count its sides: it has ${s.sides} sides.`,
            visual: { type: 'shape-2d', shape: s.key, label: '?' },
            choices: this.shuffle(shapes.slice(0, 4).includes(s) ? shapes.slice(0, 4) : [s, ...shapes.slice(0, 3)]).map(sh => ({
              label: sh.name,
              value: sh.name
            })),
            correctValue: s.name,
            explanation: `That shape is a ${s.name}!`
          };
        }
      }

      case 'K_financial': {
        const coins = [
          { key: 'nickel', name: 'Nickel (5¢)', val: '5¢', clue: 'It has a Beaver 🦫 and is worth 5 cents!' },
          { key: 'dime', name: 'Dime (10¢)', val: '10¢', clue: 'It is our smallest silver coin with the Bluenose sailboat ⛵ (10 cents)!' },
          { key: 'quarter', name: 'Quarter (25¢)', val: '25¢', clue: 'It has a Caribou 🦌 and is worth 25 cents!' },
          { key: 'loonie', name: 'Loonie ($1)', val: '$1', clue: 'It is gold-coloured with a Loon 🦆 and worth 1 dollar!' },
          { key: 'toonie', name: 'Toonie ($2)', val: '$2', clue: 'It has two colours and a Polar Bear 🐻‍❄️, worth 2 dollars!' }
        ];
        const target = this.pickRandom(coins);
        return {
          standardCode: 'K.F1 (Financial Literacy: Canadian Coins Recognition)',
          prompt: `Which Canadian coin is shown here? Tap the coin to hear its clue!`,
          hint: target.clue,
          visual: { type: 'canadian-coins', coins: [target.key], promptLabel: 'Tap the Canadian coin!' },
          choices: this.shuffle([target, ...coins.filter(c => c.key !== target.key).slice(0, 3)]).map(c => ({
            label: c.name,
            value: c.name
          })),
          correctValue: target.name,
          explanation: `${target.clue}`
        };
      }

      // ==================== GRADE 1 ====================
      case '1_number': {
        const isAdd = Math.random() > 0.4;
        if (isAdd) {
          const a = this.randInt(5, 11);
          const b = this.randInt(3, 8);
          const sum = a + b;
          return {
            standardCode: 'G1.B2.4 (Addition Facts & Making 10 to 20)',
            prompt: `Solve using the Double Ten-Frame: ${a} + ${b} = ?`,
            hint: `Fill the first 10-frame to make 10, then see how many more are in the second frame!`,
            visual: { type: 'ten-frame', countA: a, countB: b, capacity: 20, emojiA: '🍁', emojiB: '⭐', showEquation: `${a} + ${b} = ?` },
            choices: this.buildNumericChoices(sum, 2, 4),
            correctValue: String(sum),
            explanation: `${a} + ${b} makes 10 and ${sum - 10} more, which is ${sum}!`
          };
        } else {
          const total = this.randInt(9, 18);
          const sub = this.randInt(3, 7);
          const diff = total - sub;
          return {
            standardCode: 'G1.B2.4 (Subtraction Within 20)',
            prompt: `Monty had ${total} berries and ate ${sub} of them. How many berries are left? (${total} − ${sub})`,
            hint: `Start at ${total} and count back ${sub}, or look at the ${diff} red berries!`,
            visual: { type: 'ten-frame', countA: diff, countB: sub, capacity: 20, emojiA: '🍓', emojiB: '🍽️', showEquation: `${total} − ${sub} = ?` },
            choices: this.buildNumericChoices(diff, 1, 4),
            correctValue: String(diff),
            explanation: `${total} − ${sub} = ${diff} berries left!`
          };
        }
      }

      case '1_algebra': {
        const step = this.pickRandom([2, 5, 10]);
        const startMult = this.randInt(1, 4);
        const seq = [];
        for (let i = 0; i < 5; i++) {
          seq.push(String((startMult + i) * step));
        }
        const ans = Number(seq[4]);
        seq[4] = '?';
        return {
          standardCode: 'G1.C1.4 (Skip Counting & Number Patterns by 2s, 5s, 10s)',
          prompt: `Skip count by ${step}s! What number goes in the mystery box?`,
          hint: `Each step adds ${step} more: ${Number(seq[3])} + ${step} = ?`,
          visual: { type: 'pattern-sequence', items: seq },
          choices: this.buildNumericChoices(ans, 2, step * 2),
          correctValue: String(ans),
          explanation: `Counting by ${step}s: ${Number(seq[3])} + ${step} = ${ans}!`
        };
      }

      case '1_data': {
        const cats = [
          { label: 'Apples', icon: '🍎', value: this.randInt(5, 10), color: '#E63946' },
          { label: 'Bananas', icon: '🍌', value: this.randInt(2, 4), color: '#FFB703' },
          { label: 'Blueberries', icon: '🫐', value: this.randInt(6, 11), color: '#118AB2' }
        ];
        const diff = cats[2].value - cats[1].value;
        return {
          standardCode: 'G1.D1.5 (Comparing Categories on a Bar Graph)',
          prompt: `How many MORE 🫐 Blueberries (${cats[2].value}) were picked than 🍌 Bananas (${cats[1].value})?`,
          hint: `Subtract to find the difference: ${cats[2].value} − ${cats[1].value} = ?`,
          visual: { type: 'bar-graph', title: 'Favorite Camp Snacks', categories: cats },
          choices: this.buildNumericChoices(diff, 1, 3),
          correctValue: String(diff),
          explanation: `${cats[2].value} − ${cats[1].value} = ${diff} more blueberries!`
        };
      }

      case '1_spatial': {
        const hr = this.randInt(1, 12);
        const min = this.pickRandom([0, 30]);
        const formatted = `${hr}:${min === 0 ? '00' : '30'}`;
        const distractors = new Set([formatted]);
        while (distractors.size < 4) {
          const fakeHr = this.randInt(1, 12);
          const fakeMin = this.pickRandom([0, 30]);
          distractors.add(`${fakeHr}:${fakeMin === 0 ? '00' : '30'}`);
        }
        return {
          standardCode: 'G1.E2.3 (Measurement: Reading Analog Clocks to Hour & Half-Hour)',
          prompt: `What time does the clock show?`,
          hint: min === 0
            ? `The blue minute hand points straight up to 12 (:00), and the red hour hand points to ${hr}!`
            : `The blue minute hand points down to 6 (:30, half past ${hr})!`,
          visual: { type: 'clock', hours: hr, minutes: min },
          choices: this.shuffle([...distractors]).map(t => ({ label: t, value: t })),
          correctValue: formatted,
          explanation: `The clock shows ${formatted}!`
        };
      }

      case '1_financial': {
        const combos = [
          { coins: ['quarter', 'dime', 'nickel'], total: 40, text: '25¢ + 10¢ + 5¢' },
          { coins: ['quarter', 'quarter'], total: 50, text: '25¢ + 25¢' },
          { coins: ['dime', 'dime', 'nickel'], total: 25, text: '10¢ + 10¢ + 5¢' },
          { coins: ['dime', 'dime', 'dime', 'nickel'], total: 35, text: '10¢ + 10¢ + 10¢ + 5¢' },
          { coins: ['quarter', 'nickel', 'nickel'], total: 35, text: '25¢ + 5¢ + 5¢' }
        ];
        const pick = this.pickRandom(combos);
        return {
          standardCode: 'G1.F1.1 (Financial Literacy: Counting Canadian Coins to 50¢)',
          prompt: `Count the Canadian coins! How many cents (¢) are there in total?`,
          hint: `Tap each coin to add them up: ${pick.text}.`,
          visual: { type: 'canadian-coins', coins: pick.coins, promptLabel: 'Tap each coin to hear its value in cents!' },
          choices: this.buildNumericChoices(pick.total, 5, 15, '¢'),
          correctValue: String(pick.total),
          explanation: `${pick.text} = ${pick.total}¢!`
        };
      }

      // ==================== GRADE 2 ====================
      case '2_number': {
        const hundreds = this.randInt(0, 1);
        const tens = this.randInt(2, 8);
        const ones = this.randInt(1, 9);
        const val = hundreds * 100 + tens * 10 + ones;
        return {
          standardCode: 'G2.B1.2 (Place Value to 200 with Base-10 Blocks)',
          prompt: `What number is shown by these Base-10 blocks?`,
          hint: `Count the Hundreds (${hundreds * 100}), the Tens rods (${tens * 10}), and the Ones units (${ones}).`,
          visual: {
            type: 'base-ten',
            hundreds,
            tens,
            ones,
            label: `${hundreds ? `${hundreds} hundred + ` : ''}${tens} tens + ${ones} ones`
          },
          choices: this.buildNumericChoices(val, 10, 20),
          correctValue: String(val),
          explanation: `${hundreds * 100} + ${tens * 10} + ${ones} = ${val}!`
        };
      }

      case '2_algebra': {
        const sum = this.randInt(15, 35);
        const known = this.randInt(6, sum - 5);
        const missing = sum - known;
        return {
          standardCode: 'G2.C2.2 (Algebraic Reasoning: Missing Addends & Equivalence)',
          prompt: `Keep the balance scale equal! What number goes in the ❓ box so both sides equal ${sum}?`,
          hint: `Think: ${known} + ? = ${sum}, or subtract ${sum} − ${known}.`,
          visual: { type: 'balance-scale', leftLabel: `❓ + ${known}`, rightLabel: `${sum}` },
          choices: this.buildNumericChoices(missing, 1, 5),
          correctValue: String(missing),
          explanation: `${missing} + ${known} = ${sum}, so both sides of the scale are balanced!`
        };
      }

      case '2_data': {
        const c1 = this.randInt(4, 9);
        const c2 = this.randInt(5, 10);
        const c3 = this.randInt(3, 8);
        const total = c1 + c2 + c3;
        const cats = [
          { label: 'Kayaks', icon: '🛶', value: c1, color: '#FF6B4A' },
          { label: 'Sailboats', icon: '⛵', value: c2, color: '#118AB2' },
          { label: 'Ferry Boats', icon: '⛴️', value: c3, color: '#06A77D' }
        ];
        return {
          standardCode: 'G2.D1.5 (Data Analysis: Combining Categories in Graphs)',
          prompt: `How many boats were counted on the lake in TOTAL across all 3 bars?`,
          hint: `Add the numbers on top of all three bars: ${c1} + ${c2} + ${c3}.`,
          visual: { type: 'bar-graph', title: 'Boats on Lake Ontario', categories: cats },
          choices: this.buildNumericChoices(total, 5, 5),
          correctValue: String(total),
          explanation: `${c1} + ${c2} + ${c3} = ${total} boats in all!`
        };
      }

      case '2_spatial': {
        const den = this.pickRandom([2, 3, 4, 6]);
        const num = this.randInt(1, den - 1);
        const ans = `${num}/${den}`;
        const opts = new Set([ans, `${den - num}/${den}`, `1/${den}`, `${num}/${den + 1}`]);
        while (opts.size < 4) {
          opts.add(`${this.randInt(1, den)}/${den + 2}`);
        }
        return {
          standardCode: 'G2.B1.6 & E1 (Fair Sharing & Visual Fractions)',
          prompt: `What fraction of the bar is coloured orange?`,
          hint: `The top number (numerator) is how many orange pieces (${num}), and the bottom number (denominator) is total equal parts (${den}).`,
          visual: { type: 'fraction-bar', numerator: num, denominator: den },
          choices: this.shuffle([...opts]).map(x => ({ label: x, value: x })),
          correctValue: ans,
          explanation: `${num} out of ${den} equal parts are shaded, which is ${ans}!`
        };
      }

      case '2_financial': {
        const sets = [
          { coins: ['toonie', 'loonie', 'quarter'], label: '$3.25', explain: '$2.00 + $1.00 + 25¢ = $3.25' },
          { coins: ['toonie', 'toonie', 'dime'], label: '$4.10', explain: '$2.00 + $2.00 + 10¢ = $4.10' },
          { coins: ['loonie', 'loonie', 'quarter', 'quarter'], label: '$2.50', explain: '$1.00 + $1.00 + 50¢ = $2.50' },
          { coins: ['toonie', 'quarter', 'dime', 'nickel'], label: '$2.40', explain: '$2.00 + 25¢ + 10¢ + 5¢ = $2.40' }
        ];
        const pick = this.pickRandom(sets);
        const allLabels = ['$3.25', '$4.10', '$2.50', '$2.40', '$3.50'];
        const choiceSet = new Set([pick.label]);
        while (choiceSet.size < 4) {
          choiceSet.add(this.pickRandom(allLabels));
        }
        return {
          standardCode: 'G2.F1.1 (Financial Literacy: Loonies, Toonies & Coins up to $5)',
          prompt: `What is the total value of these Canadian coins?`,
          hint: `Start by counting the Toonies ($2) and Loonies ($1), then add the cents!`,
          visual: { type: 'canadian-coins', coins: pick.coins, promptLabel: 'Tap each coin to add dollars and cents!' },
          choices: this.shuffle([...choiceSet]).map(x => ({ label: x, value: x })),
          correctValue: pick.label,
          explanation: `${pick.explain}!`
        };
      }

      // ==================== GRADE 3 ====================
      case '3_number': {
        const rows = this.randInt(2, 6);
        const cols = this.randInt(3, 7);
        const prod = rows * cols;
        return {
          standardCode: 'G3.B2.6 (Multiplication & Array Models to 7×7)',
          prompt: `Look at this array of ${rows} rows with ${cols} squares in each row. What is ${rows} × ${cols}?`,
          hint: `You can skip count ${rows} groups of ${cols}, or tap the squares in the grid!`,
          visual: { type: 'rectangle-grid', rows, cols, unit: 'units' },
          choices: this.buildNumericChoices(prod, 4, 6),
          correctValue: String(prod),
          explanation: `${rows} rows × ${cols} columns = ${prod}!`
        };
      }

      case '3_algebra': {
        const mult = this.randInt(3, 7);
        const factor = this.randInt(3, 8);
        const prod = mult * factor;
        return {
          standardCode: 'G3.C2.2 (Missing Factors in Multiplication Equations)',
          prompt: `Find the missing number to balance the equation: ${mult} × ❓ = ${prod}`,
          hint: `Think: how many groups of ${mult} make ${prod}? (${prod} ÷ ${mult})`,
          visual: { type: 'balance-scale', leftLabel: `${mult} × ❓`, rightLabel: `${prod}` },
          choices: this.buildNumericChoices(factor, 1, 4),
          correctValue: String(factor),
          explanation: `${mult} × ${factor} = ${prod}!`
        };
      }

      case '3_data': {
        const vals = [this.randInt(2, 5), this.randInt(4, 8), this.randInt(6, 10)];
        // Make sum divisible by 3 for clean mean/fair share in Grade 3
        const rem = (vals[0] + vals[1] + vals[2]) % 3;
        if (rem !== 0) vals[2] += (3 - rem);
        const mean = (vals[0] + vals[1] + vals[2]) / 3;
        const cats = [
          { label: 'Day 1', icon: '🏕️', value: vals[0], color: '#FF9F1C' },
          { label: 'Day 2', icon: '🏕️', value: vals[1], color: '#2EC4B6' },
          { label: 'Day 3', icon: '🏕️', value: vals[2], color: '#8338EC' }
        ];
        return {
          standardCode: 'G3.D1.4 (Data Literacy: Finding the Mean by Levelling/Fair Share)',
          prompt: `If we share the pinecones equally across all 3 days (the MEAN), how many pinecones per day is that?`,
          hint: `Add all 3 bars (${vals[0]} + ${vals[1]} + ${vals[2]} = ${vals[0] + vals[1] + vals[2]}) and divide equally by 3!`,
          visual: { type: 'bar-graph', title: 'Pinecones Collected per Day', categories: cats },
          choices: this.buildNumericChoices(mean, 1, 4),
          correctValue: String(mean),
          explanation: `Total is ${vals[0] + vals[1] + vals[2]}. Shared equally among 3 days is ${mean} per day!`
        };
      }

      case '3_spatial': {
        const rows = this.randInt(3, 6);
        const cols = this.randInt(4, 7);
        const perim = 2 * (rows + cols);
        return {
          standardCode: 'G3.E2.5 (Measurement: Perimeter of Rectangles in Metric cm)',
          prompt: `What is the PERIMETER (distance all the way around the outside) of this ${cols} cm by ${rows} cm rectangle?`,
          hint: `Add all 4 sides around the outside: ${cols} + ${rows} + ${cols} + ${rows} cm.`,
          visual: { type: 'rectangle-grid', rows, cols, unit: 'cm' },
          choices: this.buildNumericChoices(perim, 8, 6, ' cm'),
          correctValue: String(perim),
          explanation: `Perimeter = ${cols} + ${rows} + ${cols} + ${rows} = ${perim} cm!`
        };
      }

      case '3_financial': {
        const paid = 10;
        const cost = this.randInt(3, 8);
        const change = paid - cost;
        return {
          standardCode: 'G3.F1.1 (Financial Literacy: Making Change with Canadian Bills)',
          prompt: `You buy a maple syrup bottle for $${cost} and pay with a Canadian $10 bill. How much change should you get back?`,
          hint: `Subtract the cost from $10: $${paid} − $${cost} = ?`,
          visual: { type: 'canadian-coins', coins: ['bill10'], promptLabel: `Paid with a $10 bill for a $${cost} item` },
          choices: this.buildNumericChoices(change, 1, 4, ' dollars'),
          correctValue: String(change),
          explanation: `$${paid} − $${cost} = $${change} in change!`
        };
      }

      // ==================== GRADE 4 ====================
      case '4_number': {
        const denA = 4;
        const numA = this.randInt(1, 3);
        const denB = 8;
        const numB = numA * 2;
        return {
          standardCode: 'G4.B1.4 (Equivalent Fractions & Tenths)',
          prompt: `Look at the two fraction bars! ${numA}/${denA} is equal to how many eighths (?/${denB})?`,
          hint: `Count how many teal 1/8 segments line up with ${numA}/${denA}!`,
          visual: { type: 'fraction-bar', numerator: numA, denominator: denA, compareNum: numB, compareDen: denB },
          choices: this.buildNumericChoices(numB, 1, 3, '/8'),
          correctValue: String(numB),
          explanation: `${numA}/${denA} = ${numB}/${denB} because multiplying top and bottom by 2 keeps the same amount!`
        };
      }

      case '4_algebra': {
        const mult = this.randInt(3, 6);
        const add = this.randInt(1, 5);
        const seq = [];
        for (let step = 1; step <= 4; step++) {
          seq.push(String(step * mult + add));
        }
        const ans = 5 * mult + add;
        seq.push('?');
        return {
          standardCode: 'G4.C1.2 (Linear Growing Patterns & Pattern Rules)',
          prompt: `This pattern grows by +${mult} each step! What is Term 5 in the mystery box?`,
          hint: `Add ${mult} to the 4th number: ${Number(seq[3])} + ${mult} = ?`,
          visual: { type: 'pattern-sequence', items: seq },
          choices: this.buildNumericChoices(ans, 5, 6),
          correctValue: String(ans),
          explanation: `${Number(seq[3])} + ${mult} = ${ans}!`
        };
      }

      case '4_data': {
        const nums = [this.randInt(3, 5), this.randInt(6, 9), this.randInt(10, 13), this.randInt(14, 17), this.randInt(18, 22)];
        const median = nums[2];
        const cats = nums.map((v, i) => ({
          label: `G${i + 1}`,
          icon: '🏒',
          value: v,
          color: i === 2 ? '#E63946' : '#118AB2'
        }));
        return {
          standardCode: 'G4.D1.5 (Data Literacy: Finding the Median of Ordered Data)',
          prompt: `These 5 hockey scores are ordered from least to greatest. What is the MEDIAN (middle value)?`,
          hint: `In an ordered list of 5 numbers (${nums.join(', ')}), the median is the exact middle (3rd) number!`,
          visual: { type: 'bar-graph', title: 'Ordered Hockey Goals: ' + nums.join(', '), categories: cats },
          choices: this.buildNumericChoices(median, 2, 5),
          correctValue: String(median),
          explanation: `The middle number in [${nums.join(', ')}] is ${median}!`
        };
      }

      case '4_spatial': {
        const rows = this.randInt(4, 8);
        const cols = this.randInt(5, 9);
        const area = rows * cols;
        return {
          standardCode: 'G4.E2.5 (Measurement: Area of Rectangles Formula A = l × w)',
          prompt: `What is the AREA (in square centimetres, cm²) of this ${cols} cm by ${rows} cm rectangle?`,
          hint: `Use the rectangle area formula: Area = length × width (${cols} × ${rows}).`,
          visual: { type: 'rectangle-grid', rows, cols, unit: 'cm' },
          choices: this.buildNumericChoices(area, 10, 8, ' cm²'),
          correctValue: String(area),
          explanation: `Area = ${cols} cm × ${rows} cm = ${area} cm²!`
        };
      }

      case '4_financial': {
        const combinations = [
          { coins: ['bill20', 'bill10', 'bill5', 'toonie'], ans: 37, desc: '$20 + $10 + $5 + $2' },
          { coins: ['bill20', 'bill20', 'bill5', 'loonie'], ans: 46, desc: '$20 + $20 + $5 + $1' },
          { coins: ['bill10', 'bill10', 'bill5', 'toonie', 'loonie'], ans: 28, desc: '$10 + $10 + $5 + $2 + $1' }
        ];
        const pick = this.pickRandom(combinations);
        return {
          standardCode: 'G4.F1.2 (Financial Literacy: Whole-Dollar Transactions with Canadian Bills)',
          prompt: `Count the Canadian polymer bills and coins! How many dollars ($) do you have in total?`,
          hint: `Add the bills and coins together: ${pick.desc}.`,
          visual: { type: 'canadian-coins', coins: pick.coins, promptLabel: 'Tap each Canadian bill or coin!' },
          choices: this.buildNumericChoices(pick.ans, 15, 8, ' dollars'),
          correctValue: String(pick.ans),
          explanation: `${pick.desc} = $${pick.ans}!`
        };
      }

      // ==================== GRADE 5 ====================
      case '5_number': {
        const pairs = [
          { a: 1.25, b: 2.50, sum: '3.75' },
          { a: 3.40, b: 1.35, sum: '4.75' },
          { a: 2.60, b: 1.80, sum: '4.40' },
          { a: 4.15, b: 2.45, sum: '6.60' }
        ];
        const p = this.pickRandom(pairs);
        const choices = this.shuffle([
          p.sum,
          ( parseFloat(p.sum) + 0.25 ).toFixed(2),
          ( parseFloat(p.sum) - 0.15 ).toFixed(2),
          ( parseFloat(p.sum) + 1.00 ).toFixed(2)
        ]);
        return {
          standardCode: 'G5.B2.4 (Adding & Subtracting Decimals to Hundredths)',
          prompt: `A trail map is ${p.a.toFixed(2)} km to the bridge and ${p.b.toFixed(2)} km to the summit. What is the total distance?`,
          hint: `Line up the decimal points! Add the ones first, then the hundredths: ${p.a.toFixed(2)} + ${p.b.toFixed(2)}.`,
          visual: { type: 'balance-scale', leftLabel: `${p.a.toFixed(2)} + ${p.b.toFixed(2)}`, rightLabel: `? km` },
          choices: choices.map(c => ({ label: `${c} km`, value: c })),
          correctValue: p.sum,
          explanation: `${p.a.toFixed(2)} + ${p.b.toFixed(2)} = ${p.sum} km!`
        };
      }

      case '5_algebra': {
        const x = this.randInt(4, 12);
        const coef = this.randInt(2, 5);
        const add = this.randInt(3, 10);
        const rhs = coef * x + add;
        return {
          standardCode: 'G5.C2.2 (Solving Two-Step Algebraic Equations)',
          prompt: `Solve for n on the balance scale: ${coef}n + ${add} = ${rhs}`,
          hint: `First subtract ${add} from both sides (${rhs} − ${add} = ${coef * x}), then divide by ${coef}!`,
          visual: { type: 'balance-scale', leftLabel: `${coef}n + ${add}`, rightLabel: `${rhs}` },
          choices: this.buildNumericChoices(x, 1, 4),
          correctValue: String(x),
          explanation: `${coef} × ${x} + ${add} = ${coef * x} + ${add} = ${rhs}, so n = ${x}!`
        };
      }

      case '5_data': {
        const red = this.randInt(3, 6);
        const blue = this.randInt(2, 4);
        const green = 10 - red - blue;
        const cats = [
          { label: 'Red', icon: '🔴', value: red, color: '#E63946' },
          { label: 'Blue', icon: '🔵', value: blue, color: '#118AB2' },
          { label: 'Green', icon: '🟢', value: green, color: '#06A77D' }
        ];
        const ans = `${red}/10`;
        const opts = this.shuffle([`${red}/10`, `${blue}/10`, `${green}/10`, `${red}/5`]);
        return {
          standardCode: 'G5.D2.1 (Probability as a Fraction Between 0 and 1)',
          prompt: `A bag has 10 marbles shown in the graph. What is the probability fraction of picking a 🔴 Red marble?`,
          hint: `Probability = (Favourable Red marbles: ${red}) / (Total marbles: 10).`,
          visual: { type: 'bar-graph', title: '10 Marbles in the Mystery Bag', categories: cats },
          choices: opts.map(o => ({ label: o, value: o })),
          correctValue: ans,
          explanation: `There are ${red} red marbles out of 10 total, so the probability is ${ans}!`
        };
      }

      case '5_spatial': {
        const shapes = [
          { type: 'Acute Angle (45°)', deg: 45, kind: 'Acute (< 90°)' },
          { type: 'Right Angle (90°)', deg: 90, kind: 'Right (= 90°)' },
          { type: 'Obtuse Angle (130°)', deg: 130, kind: 'Obtuse (90° to 180°)' },
          { type: 'Straight Angle (180°)', deg: 180, kind: 'Straight (= 180°)' }
        ];
        const pick = this.pickRandom(shapes);
        return {
          standardCode: 'G5.E1.3 (Spatial Sense: Classifying Angles by Benchmark Degrees)',
          prompt: `An angle measures ${pick.deg}°. How do we classify an angle of ${pick.deg}°?`,
          hint: `Remember: Acute is less than 90°, Right is exactly 90°, Obtuse is between 90° and 180°, Straight is 180°.`,
          visual: { type: 'shape-2d', shape: 'triangle', label: `Angle Measure = ${pick.deg}°` },
          choices: shapes.map(s => ({ label: s.kind, value: s.kind })),
          correctValue: pick.kind,
          explanation: `A ${pick.deg}° angle is ${pick.kind}!`
        };
      }

      case '5_financial': {
        const qty = this.randInt(3, 6);
        const unitCost = this.randInt(3, 7);
        const total = qty * unitCost;
        return {
          standardCode: 'G5.F1.3 (Financial Literacy: Unit Rates & Best Value Comparison)',
          prompt: `A pack of ${qty} Canadian national park badges costs $${total}. What is the UNIT RATE (cost for 1 badge)?`,
          hint: `Divide total cost by quantity: $${total} ÷ ${qty} badges = ?`,
          visual: { type: 'balance-scale', leftLabel: `${qty} badges`, rightLabel: `$${total}` },
          choices: this.buildNumericChoices(unitCost, 1, 3, ' dollars each'),
          correctValue: String(unitCost),
          explanation: `$${total} ÷ ${qty} = $${unitCost} per badge!`
        };
      }

      // ==================== GRADE 6 ====================
      case '6_number': {
        const start = this.randInt(-5, -1);
        const jump = this.randInt(3, 8);
        const target = start + jump;
        return {
          standardCode: 'G6.B1.2 (Integers on a Number Line & Temperature in °C)',
          prompt: `In Banff, the morning temperature is ${start}°C (🐸). By noon it warms up by +${jump}°C. What is the new temperature (⭐)?`,
          hint: `Start at ${start} on the number line and hop ${jump} steps to the right: ${start} + ${jump}.`,
          visual: { type: 'number-line', min: -6, max: 6, start, highlight: target },
          choices: this.buildNumericChoices(target, -6, 4, '°C'),
          correctValue: String(target),
          explanation: `${start}°C + ${jump}°C = ${target}°C!`
        };
      }

      case '6_algebra': {
        const a = this.randInt(3, 8);
        const b = this.randInt(2, 5);
        const c = this.randInt(2, 4);
        const ans = a + (b * c);
        return {
          standardCode: 'G6.B2.1 & C2 (Order of Operations - BEDMAS)',
          prompt: `Use BEDMAS (Order of Operations) to evaluate: ${a} + ${b} × ${c}`,
          hint: `In BEDMAS, Multiplication comes BEFORE Addition! First calculate ${b} × ${c} = ${b * c}, then add ${a}.`,
          visual: { type: 'balance-scale', leftLabel: `${a} + (${b} × ${c})`, rightLabel: `?` },
          choices: this.buildNumericChoices(ans, 5, 7),
          correctValue: String(ans),
          explanation: `Multiply first (${b} × ${c} = ${b * c}), then add ${a} + ${b * c} = ${ans}!`
        };
      }

      case '6_data': {
        const pct = this.pickRandom([20, 25, 40, 50, 75]);
        const total = 20;
        const count = (pct / 100) * total;
        const cats = [
          { label: 'Goalies', icon: '🥅', value: count, color: '#E63946' },
          { label: 'Skaters', icon: '⛸️', value: total - count, color: '#118AB2' }
        ];
        return {
          standardCode: 'G6.D1 & B1.3 (Ratios, Percents & Data Proportions)',
          prompt: `Out of ${total} players on the ice, ${count} are Goalies (${count}/${total}). What PERCENT (%) of the players are Goalies?`,
          hint: `Convert ${count}/${total} to a fraction out of 100 by multiplying top and bottom by 5!`,
          visual: { type: 'bar-graph', title: `Hockey Roster (${total} Players Total)`, categories: cats },
          choices: this.shuffle([20, 25, 40, 50, 75].slice(0, 4).includes(pct) ? [20, 25, 40, 50] : [pct, 25, 50, 75]).map(p => ({
            label: `${p}%`,
            value: String(p)
          })),
          correctValue: String(pct),
          explanation: `${count}/${total} = ${pct}/100 = ${pct}%!`
        };
      }

      case '6_spatial': {
        const base = this.pickRandom([4, 6, 8, 10]);
        const height = this.randInt(3, 7);
        const area = (base * height) / 2;
        return {
          standardCode: 'G6.E2.2 (Area of Triangles: A = (base × height) ÷ 2)',
          prompt: `A triangular canoe sail has a base of ${base} m and a height of ${height} m. What is its AREA (in m²)?`,
          hint: `A triangle is half of a rectangle! Multiply base × height (${base} × ${height} = ${base * height}) and divide by 2.`,
          visual: { type: 'shape-2d', shape: 'triangle', label: `Base = ${base} m, Height = ${height} m` },
          choices: this.buildNumericChoices(area, 4, 6, ' m²'),
          correctValue: String(area),
          explanation: `Area = (${base} × ${height}) ÷ 2 = ${base * height} ÷ 2 = ${area} m²!`
        };
      }

      case '6_financial': {
        const items = [
          { price: 100, taxRate: 13, total: 113, desc: 'Ontario 13% HST on a $100 hockey stick' },
          { price: 50, taxRate: 10, total: 55, desc: '10% savings interest bonus on a $50 deposit' },
          { price: 20, taxRate: 15, total: 23, desc: 'Atlantic Canada 15% HST on a $20 book ($3 tax)' }
        ];
        const pick = this.pickRandom(items);
        return {
          standardCode: 'G6.F1.4 (Financial Literacy: Canadian Sales Tax HST, Interest & Financial Goals)',
          prompt: `Calculate the total for: ${pick.desc}. What is the final amount in dollars?`,
          hint: `${pick.taxRate}% of $${pick.price} is $${pick.total - pick.price}. Add $${pick.price} + $${pick.total - pick.price}!`,
          visual: { type: 'canadian-coins', coins: ['bill20', 'bill10', 'loonie'], promptLabel: pick.desc },
          choices: this.buildNumericChoices(pick.total, 15, 6, ' dollars'),
          correctValue: String(pick.total),
          explanation: `$${pick.price} + $${pick.total - pick.price} (${pick.taxRate}%) = $${pick.total}!`
        };
      }

      default:
        return this.generateQuestion('1', 'number');
    }
  }
}

window.CANADIAN_GRADES = CANADIAN_GRADES;
window.CURRICULUM_STRANDS = CURRICULUM_STRANDS;
window.CANADIAN_STICKERS = CANADIAN_STICKERS;
window.CurriculumGenerator = CurriculumGenerator;
