/**
 * Maple Math Quest - Expanded Question Types & Topic Selector Engine
 * Provides 3 distinct curriculum-aligned question types per Strand per Grade
 * so learners can either play a Mixed Quest or target a specific skill!
 */

const STRAND_TOPICS = {
  // KINDERGARTEN
  K_number: [
    { id: 'count10', icon: '🍁', title: 'Counting to 10', desc: 'Count objects on a Ten-Frame' },
    { id: 'compose10', icon: '➕', title: 'Making Numbers', desc: 'Put two groups together up to 10' },
    { id: 'compare10', icon: '⚖️', title: 'More or Less?', desc: 'Compare two groups of forest items' }
  ],
  K_algebra: [
    { id: 'repeat_ab', icon: '🔁', title: 'Repeating Patterns', desc: 'Find what comes next in AB & ABC patterns' },
    { id: 'coding_path', icon: '🤖', title: 'Beaver Coding Steps', desc: 'Follow simple arrow directions' },
    { id: 'missing_pattern', icon: '❓', title: 'Fix the Pattern', desc: 'Spot the missing piece in a pattern' }
  ],
  K_data: [
    { id: 'read_graph', icon: '📊', title: 'Read the Chart', desc: 'Count animals on a forest bar chart' },
    { id: 'most_least', icon: '🏆', title: 'Most & Least', desc: 'Find which group has the most or fewest' },
    { id: 'likely_events', icon: '🎲', title: 'Always or Never?', desc: 'Sort everyday events as possible or impossible' }
  ],
  K_spatial: [
    { id: 'name_2d', icon: '🔺', title: '2D Shape Names', desc: 'Identify triangles, squares, circles & more' },
    { id: 'count_sides', icon: '📐', title: 'Count the Sides', desc: 'Count straight sides on shapes' },
    { id: 'compare_size', icon: '📏', title: 'Longer or Shorter?', desc: 'Compare lengths and sizes' }
  ],
  K_financial: [
    { id: 'id_coins', icon: '🪙', title: 'Meet Canadian Coins', desc: 'Identify Nickel, Dime, Quarter, Loonie & Toonie' },
    { id: 'coin_animals', icon: '🦫', title: 'Coin Animals', desc: 'Match Canadian animals to their coins' },
    { id: 'piggy_bank', icon: '🐷', title: 'Count Loonies ($1)', desc: 'Count $1 Loonies in the piggy bank' }
  ],

  // GRADE 1
  '1_number': [
    { id: 'add_20', icon: '➕', title: 'Addition to 20', desc: 'Use Double Ten-Frames to add' },
    { id: 'sub_20', icon: '➖', title: 'Subtraction to 20', desc: 'Take away berries and count what is left' },
    { id: 'place_50', icon: '🧱', title: 'Tens & Ones to 50', desc: 'Read Base-10 rods and units' }
  ],
  '1_algebra': [
    { id: 'skip_count', icon: '🦘', title: 'Skip Counting', desc: 'Count by 2s, 5s, and 10s' },
    { id: 'missing_add', icon: '⚖️', title: 'Missing Number', desc: 'Find the mystery number to make 10 or 20' },
    { id: 'coding_seq', icon: '🤖', title: 'Moose Coding Trail', desc: 'Count steps in a sequential code' }
  ],
  '1_data': [
    { id: 'compare_bars', icon: '📊', title: 'Compare Categories', desc: 'Find how many more or fewer' },
    { id: 'tally_total', icon: '🧮', title: 'Total Votes', desc: 'Add all categories in a class survey' },
    { id: 'chance_words', icon: '🎲', title: 'Likely or Unlikely?', desc: 'Predict spinner outcomes' }
  ],
  '1_spatial': [
    { id: 'clock_hr', icon: '🕐', title: 'Telling Time', desc: 'Read analog clocks to the hour & half-hour' },
    { id: 'shapes_3d', icon: '🧊', title: '3D Solids', desc: 'Identify cubes, cones, and cylinders' },
    { id: 'temp_c', icon: '🌡️', title: 'Canadian Weather (°C)', desc: 'Read temperatures on a thermometer' }
  ],
  '1_financial': [
    { id: 'coins_50', icon: '🪙', title: 'Counting Cents (to 50¢)', desc: 'Add nickels, dimes, and quarters' },
    { id: 'coin_match', icon: '💵', title: 'Which Coin?', desc: 'Match coin values to 5¢, 10¢, 25¢' },
    { id: 'loonie_toonie', icon: '🦆', title: 'Loonies & Toonies', desc: 'Count whole dollars up to $5' }
  ],

  // GRADE 2
  '2_number': [
    { id: 'base10_200', icon: '🧱', title: 'Place Value to 200', desc: 'Hundreds, tens, and ones blocks' },
    { id: 'two_digit_add', icon: '➕', title: '2-Digit Addition', desc: 'Add two-digit numbers' },
    { id: 'even_odd', icon: '🔢', title: 'Even or Odd?', desc: 'Identify even and odd numbers' }
  ],
  '2_algebra': [
    { id: 'balance_eq', icon: '⚖️', title: 'Balance Scale', desc: 'Find the missing addend' },
    { id: 'grow_pattern', icon: '📈', title: 'Number Patterns', desc: 'Find the rule and next number' },
    { id: 'coding_loop', icon: '🔁', title: 'Repeat Loops', desc: 'Count total steps in a repeated code' }
  ],
  '2_data': [
    { id: 'graph_total', icon: '📊', title: 'Combine Categories', desc: 'Find the total across all bars' },
    { id: 'graph_diff', icon: '📉', title: 'Bar Differences', desc: 'Compare the tallest and shortest bars' },
    { id: 'spinner_prob', icon: '🎡', title: 'Spinner Chances', desc: 'Which colour is most likely?' }
  ],
  '2_spatial': [
    { id: 'fair_fractions', icon: '🍕', title: 'Fair-Share Fractions', desc: 'Read halves, thirds, fourths & sixths' },
    { id: 'clock_qtr', icon: '🕒', title: 'Clocks & Quarter Hours', desc: 'Read 15-minute intervals' },
    { id: 'polygons_2d', icon: '⬡', title: 'Polygons & Sides', desc: 'Pentagons, hexagons, and octagons' }
  ],
  '2_financial': [
    { id: 'coins_to_5', icon: '🪙', title: 'Dollars & Cents to $5', desc: 'Count Loonies, Toonies & coins' },
    { id: 'make_dollar', icon: '💯', title: 'Make $1.00 (100¢)', desc: 'How many quarters or dimes make $1?' },
    { id: 'buy_snack', icon: '🥨', title: 'Camp Store', desc: 'Do you have enough money?' }
  ],

  // GRADE 3
  '3_number': [
    { id: 'mult_arrays', icon: '✖️', title: 'Multiplication Arrays', desc: 'Multiply rows × columns up to 7×7' },
    { id: 'div_share', icon: '➗', title: 'Fair-Share Division', desc: 'Divide groups equally' },
    { id: 'place_1000', icon: '🏛️', title: 'Numbers to 1,000', desc: 'Expanded form & place value' }
  ],
  '3_algebra': [
    { id: 'missing_factor', icon: '⚖️', title: 'Missing Factors', desc: 'Solve ? × b = c' },
    { id: 'mult_patterns', icon: '📈', title: 'Skip-Count Rules', desc: 'Growing patterns by 3s, 4s, 6s, 7s' },
    { id: 'code_coords', icon: '🤖', title: 'Grid Navigation', desc: 'Follow directional code steps' }
  ],
  '3_data': [
    { id: 'mean_level', icon: '📊', title: 'Finding the Mean', desc: 'Level bars to find the fair-share average' },
    { id: 'mode_data', icon: '🎯', title: 'Finding the Mode', desc: 'Spot the most frequent value' },
    { id: 'prob_spinner', icon: '🎡', title: 'Equally Likely?', desc: 'Compare spinner section chances' }
  ],
  '3_spatial': [
    { id: 'perimeter_cm', icon: '📏', title: 'Perimeter (cm)', desc: 'Measure distance around rectangles' },
    { id: 'area_count', icon: '🟦', title: 'Area by Unit Squares', desc: 'Count square units inside a shape' },
    { id: 'shapes_3d_faces', icon: '🧊', title: '3D Faces & Vertices', desc: 'Count corners and flat faces' }
  ],
  '3_financial': [
    { id: 'change_10', icon: '💵', title: 'Making Change ($10)', desc: 'Subtract cost from a $10 bill' },
    { id: 'change_5', icon: '🪙', title: 'Making Change ($5)', desc: 'Calculate change from a $5 bill' },
    { id: 'count_bills', icon: '🇨🇦', title: 'Canadian Bills & Coins', desc: 'Add $5, $10, Toonies & Loonies' }
  ],

  // GRADE 4
  '4_number': [
    { id: 'equiv_frac', icon: '🍕', title: 'Equivalent Fractions', desc: 'Match equal fraction bars' },
    { id: 'mult_10x10', icon: '✖️', title: 'Multiplication to 10×10', desc: 'Mental math facts & arrays' },
    { id: 'decimals_10th', icon: '🔟', title: 'Decimals to Tenths', desc: 'Add & compare tenths (0.1)' }
  ],
  '4_algebra': [
    { id: 'linear_grow', icon: '📈', title: 'Growing Patterns', desc: 'Predict Term 5 using pattern rules' },
    { id: 'solve_var', icon: '⚖️', title: 'Unknown Variables', desc: 'Solve for x in equations' },
    { id: 'inequalities', icon: '🔍', title: 'True or False?', desc: 'Check if number sentences balance' }
  ],
  '4_data': [
    { id: 'median_data', icon: '📊', title: 'Finding the Median', desc: 'Find the middle value in ordered data' },
    { id: 'mean_g4', icon: '🧮', title: 'Mean & Range', desc: 'Calculate average or spread' },
    { id: 'prob_frac4', icon: '🎡', title: 'Spinner Probability', desc: 'Express chance as a fraction' }
  ],
  '4_spatial': [
    { id: 'area_formula', icon: '📐', title: 'Area Formula (l × w)', desc: 'Calculate rectangle area in cm²' },
    { id: 'coord_grid', icon: '🗺️', title: 'Coordinate Grid', desc: 'Read (x, y) coordinates on a map' },
    { id: 'metric_conv', icon: '📏', title: 'Metric Conversions', desc: 'Convert metres (m) to centimetres (cm)' }
  ],
  '4_financial': [
    { id: 'bills_100', icon: '💵', title: 'Canadian Bills to $100', desc: 'Count $20, $10, $5 bills & coins' },
    { id: 'change_20', icon: '🛍️', title: 'Change from $20', desc: 'Calculate change from a $20 bill' },
    { id: 'budget_save', icon: '🐷', title: 'Saving Goals', desc: 'How many weeks to save up?' }
  ],

  // GRADE 5
  '5_number': [
    { id: 'dec_hundredths', icon: '💯', title: 'Decimals to Hundredths', desc: 'Add & subtract 2-decimal numbers' },
    { id: 'frac_compare', icon: '🍕', title: 'Compare Fractions', desc: 'Which fraction is larger?' },
    { id: 'mult_2x1', icon: '✖️', title: '2-Digit × 1-Digit', desc: 'Multiply larger numbers' }
  ],
  '5_algebra': [
    { id: 'two_step_eq', icon: '⚖️', title: 'Two-Step Equations', desc: 'Solve 2n + 3 = 13' },
    { id: 'pattern_rule', icon: '📈', title: 'Term-to-Term Rules', desc: 'Find the nth term in a sequence' },
    { id: 'distributive', icon: '🧩', title: 'Mental Math Split', desc: 'Use distributive property' }
  ],
  '5_data': [
    { id: 'prob_10', icon: '🎡', title: 'Probability Fractions', desc: 'Calculate outcomes out of 10' },
    { id: 'mean_median5', icon: '📊', title: 'Mean vs. Median', desc: 'Analyze sports & weather data' },
    { id: 'sample_bias', icon: '📋', title: 'Survey Predictions', desc: 'Scale up survey results' }
  ],
  '5_spatial': [
    { id: 'angles_class', icon: '📐', title: 'Classify Angles', desc: 'Acute, Right, Obtuse & Straight' },
    { id: 'triangle_angles', icon: '🔺', title: '180° in a Triangle', desc: 'Find the missing angle' },
    { id: 'coord_move', icon: '🗺️', title: 'Grid Translations', desc: 'Move points up, down, left, right' }
  ],
  '5_financial': [
    { id: 'unit_rate', icon: '🏷️', title: 'Unit Rates', desc: 'Find the price for 1 item' },
    { id: 'best_buy', icon: '🛒', title: 'Best Value Deal', desc: 'Compare two Canadian store packs' },
    { id: 'tax_est', icon: '🧾', title: 'Estimate Total Cost', desc: 'Add multiple items in CAD' }
  ],

  // GRADE 6
  '6_number': [
    { id: 'integers_c', icon: '🌡️', title: 'Integers & °C Temp', desc: 'Add/subtract positive & negative numbers' },
    { id: 'ratios_pct', icon: '💯', title: 'Percents & Ratios', desc: 'Convert fractions to percentages' },
    { id: 'prime_comp', icon: '🔢', title: 'Prime & Composite', desc: 'Identify prime numbers & factors' }
  ],
  '6_algebra': [
    { id: 'bedmas', icon: '🧮', title: 'BEDMAS Operations', desc: 'Order of operations' },
    { id: 'solve_eq6', icon: '⚖️', title: 'Algebraic Equations', desc: 'Solve multi-step equations' },
    { id: 'linear_expr', icon: '📈', title: 'Evaluate Expressions', desc: 'Plug in x to find the value' }
  ],
  '6_data': [
    { id: 'pct_data', icon: '📊', title: 'Percent of a Group', desc: 'Find percentages from bar graphs' },
    { id: 'prob_pct', icon: '🎡', title: 'Probability as %', desc: 'Express likelihood as a percent' },
    { id: 'mean_6', icon: '📈', title: 'Data Averages', desc: 'Find mean of larger datasets' }
  ],
  '6_spatial': [
    { id: 'area_tri', icon: '🔺', title: 'Area of Triangles', desc: 'Use (base × height) ÷ 2' },
    { id: 'coord_quad', icon: '🗺️', title: 'Coordinate Plotting', desc: 'Read & plot (x, y) pairs' },
    { id: 'vol_prism', icon: '🧊', title: 'Volume of Prisms', desc: 'Multiply l × w × h' }
  ],
  '6_financial': [
    { id: 'hst_tax', icon: '🧾', title: 'Canadian 13% HST', desc: 'Calculate sales tax & totals' },
    { id: 'discounts', icon: '🏷️', title: 'Percent Discounts', desc: 'Find sale prices (20% or 50% off)' },
    { id: 'interest_save', icon: '🏦', title: 'Savings & Interest', desc: 'Calculate simple interest growth' }
  ]
};

class ExtendedQuestionGenerator {
  static getTopics(gradeId, strandId) {
    return STRAND_TOPICS[`${gradeId}_${strandId}`] || [];
  }

  static generate(gradeId, strandId, topicId = 'all') {
    const topics = this.getTopics(gradeId, strandId);
    if (!topics.length) {
      return window.CurriculumGenerator.generateQuestion(gradeId, strandId);
    }

    const chosenTopic = topicId === 'all'
      ? window.CurriculumGenerator.pickRandom(topics).id
      : topicId;

    const G = window.CurriculumGenerator;

    // Route specific extended topics; index 0 falls back to the rich core generator
    if (chosenTopic === topics[0].id) {
      return G.generateQuestion(gradeId, strandId);
    }

    switch (chosenTopic) {
      // ---------- KINDERGARTEN ----------
      case 'compose10': {
        const a = G.randInt(1, 5);
        const b = G.randInt(1, 5);
        return {
          standardCode: 'K.B2 (Composing Quantities to 10)',
          prompt: `Bucky has ${a} 🍁 leaves and ${b} 🌼 flowers. How many altogether?`,
          hint: `Count all the items in the Ten-Frame: ${a} + ${b}.`,
          visual: { type: 'ten-frame', countA: a, countB: b, capacity: 10, emojiA: '🍁', emojiB: '🌼', showEquation: `${a} + ${b} = ?` },
          choices: G.buildNumericChoices(a + b, 1, 3),
          correctValue: String(a + b),
          explanation: `${a} + ${b} = ${a + b}!`
        };
      }
      case 'compare10': {
        const a = G.randInt(2, 8);
        let b = G.randInt(2, 8);
        while (b === a) b = G.randInt(2, 8);
        const askMore = Math.random() > 0.5;
        const ans = askMore ? (a > b ? 'Beavers 🦫' : 'Loons 🦆') : (a < b ? 'Beavers 🦫' : 'Loons 🦆');
        return {
          standardCode: 'K.B1.5 (Comparing Quantities)',
          prompt: `Which group has ${askMore ? 'MORE' : 'FEWER'}?`,
          hint: `Compare the height of the two bars: Beavers (${a}) vs. Loons (${b}).`,
          visual: {
            type: 'bar-graph',
            title: 'Forest Friends',
            categories: [
              { label: 'Beavers', icon: '🦫', value: a, color: '#FF9F1C' },
              { label: 'Loons', icon: '🦆', value: b, color: '#118AB2' }
            ]
          },
          choices: [
            { label: 'Beavers 🦫', value: 'Beavers 🦫' },
            { label: 'Loons 🦆', value: 'Loons 🦆' }
          ],
          correctValue: ans,
          explanation: `Beavers have ${a} and Loons have ${b}, so ${ans} has ${askMore ? 'more' : 'fewer'}!`
        };
      }
      case 'coding_path': {
        const steps = G.randInt(2, 5);
        const arrows = Array(steps).fill('➡️');
        return {
          standardCode: 'K.C3 (Sequential Coding Logic)',
          prompt: `How many steps forward (➡️) does Bucky take to reach the log?`,
          hint: `Count each ➡️ arrow from Start to Goal!`,
          visual: { type: 'coding-grid', steps: arrows, startLabel: '🦫 Start', endLabel: '🪵 Log' },
          choices: G.buildNumericChoices(steps, 1, 3),
          correctValue: String(steps),
          explanation: `There are ${steps} forward arrows!`
        };
      }
      case 'missing_pattern': {
        const sets = [
          { items: ['⭐', '🌙', '?', '🌙', '⭐', '🌙'], ans: '⭐', dist: ['🌙', '☀️', '🍁'] },
          { items: ['🍎', '🍌', '🍎', '?', '🍎', '🍌'], ans: '🍌', dist: ['🍎', '🍇', '🍓'] }
        ];
        const s = G.pickRandom(sets);
        return {
          standardCode: 'K.C1.2 (Missing Element in Repeating Pattern)',
          prompt: `Which item belongs in the ❓ box to fix the pattern?`,
          hint: `Say the pattern out loud to hear what is missing!`,
          visual: { type: 'pattern-sequence', items: s.items },
          choices: G.shuffle([s.ans, ...s.dist]).map(x => ({ label: x, value: x })),
          correctValue: s.ans,
          explanation: `${s.ans} completes the repeating pattern!`
        };
      }
      case 'most_least': {
        const a = G.randInt(2, 4);
        const b = G.randInt(6, 9);
        const c = G.randInt(1, 3);
        const cats = [
          { label: 'Acorns', icon: '🌰', value: a, color: '#D97706' },
          { label: 'Leaves', icon: '🍁', value: b, color: '#E63946' },
          { label: 'Pinecones', icon: '🌲', value: c, color: '#06A77D' }
        ];
        return {
          standardCode: 'K.D1 (Interpreting Bar Graphs: Most)',
          prompt: `Which item did we collect the MOST of?`,
          hint: `Look for the tallest bar on the chart!`,
          visual: { type: 'bar-graph', title: 'Nature Walk Treasures', categories: cats },
          choices: cats.map(ct => ({ label: `${ct.icon} ${ct.label}`, value: ct.label })),
          correctValue: 'Leaves',
          explanation: `Leaves (${b}) has the tallest bar!`
        };
      }
      case 'likely_events': {
        const ev = G.pickRandom([
          { q: 'Can a beaver fly like an airplane? 🦫✈️', ans: 'Impossible', hint: 'Real beavers swim and walk, they cannot fly!' },
          { q: 'Will the sun rise tomorrow morning? ☀️', ans: 'Certain', hint: 'The sun always rises every morning!' }
        ]);
        return {
          standardCode: 'K.D2 (Probability Language: Certain vs. Impossible)',
          prompt: ev.q,
          hint: ev.hint,
          visual: { type: 'spinner', items: ['☀️', '☀️', '☀️', '☀️'], title: 'Everyday Events' },
          choices: [
            { label: 'Certain (Always)', value: 'Certain' },
            { label: 'Impossible (Never)', value: 'Impossible' }
          ],
          correctValue: ev.ans,
          explanation: `That event is ${ev.ans}!`
        };
      }
      case 'count_sides': {
        const sh = G.pickRandom([
          { shape: 'triangle', name: 'Triangle', sides: 3 },
          { shape: 'square', name: 'Square', sides: 4 },
          { shape: 'pentagon', name: 'Pentagon', sides: 5 },
          { shape: 'hexagon', name: 'Hexagon', sides: 6 }
        ]);
        return {
          standardCode: 'K.E1 (Counting Sides of 2D Shapes)',
          prompt: `How many straight sides does this ${sh.name} have?`,
          hint: `Count each straight edge around the ${sh.name}!`,
          visual: { type: 'shape-2d', shape: sh.shape, label: sh.name },
          choices: G.buildNumericChoices(sh.sides, 2, 3),
          correctValue: String(sh.sides),
          explanation: `A ${sh.name} has ${sh.sides} straight sides!`
        };
      }
      case 'compare_size': {
        const lenA = G.randInt(2, 4);
        const lenB = G.randInt(6, 9);
        return {
          standardCode: 'K.E2 (Comparing Length)',
          prompt: `Which log is LONGER?`,
          hint: `Compare ${lenA} units vs ${lenB} units!`,
          visual: {
            type: 'bar-graph',
            title: 'Log Lengths',
            categories: [
              { label: 'Log A', icon: '🪵', value: lenA, color: '#8D99AE' },
              { label: 'Log B', icon: '🪵', value: lenB, color: '#D97706' }
            ]
          },
          choices: [
            { label: `Log A (${lenA})`, value: 'Log A' },
            { label: `Log B (${lenB})`, value: 'Log B' }
          ],
          correctValue: 'Log B',
          explanation: `Log B (${lenB}) is longer than Log A (${lenA})!`
        };
      }
      case 'coin_animals': {
        const list = [
          { coin: 'nickel', animal: 'Beaver 🦫', name: 'Nickel (5¢)' },
          { coin: 'quarter', animal: 'Caribou 🦌', name: 'Quarter (25¢)' },
          { coin: 'loonie', animal: 'Loon 🦆', name: 'Loonie ($1)' },
          { coin: 'toonie', animal: 'Polar Bear 🐻‍❄️', name: 'Toonie ($2)' }
        ];
        const pick = G.pickRandom(list);
        return {
          standardCode: 'K.F1 (Canadian Coin Symbols)',
          prompt: `Which Canadian animal is on the ${pick.name}?`,
          hint: `Tap the coin to see and hear its animal!`,
          visual: { type: 'canadian-coins', coins: [pick.coin], promptLabel: `Tap the ${pick.name}` },
          choices: list.map(x => ({ label: x.animal, value: x.animal })),
          correctValue: pick.animal,
          explanation: `The ${pick.name} has a ${pick.animal}!`
        };
      }
      case 'piggy_bank': {
        const count = G.randInt(2, 5);
        return {
          standardCode: 'K.F1 (Counting $1 Loonies)',
          prompt: `How many dollars ($1 Loonies) are in the piggy bank?`,
          hint: `Tap each gold Loonie to count $1, $2, ...`,
          visual: { type: 'canadian-coins', coins: Array(count).fill('loonie'), promptLabel: 'Tap each $1 Loonie!' },
          choices: G.buildNumericChoices(count, 1, 3, ' dollars'),
          correctValue: String(count),
          explanation: `${count} Loonies = $${count}!`
        };
      }

      // ---------- GRADE 1 ----------
      case 'sub_20': {
        const total = G.randInt(10, 18);
        const sub = G.randInt(3, 8);
        const diff = total - sub;
        return {
          standardCode: 'G1.B2.4 (Subtraction Within 20)',
          prompt: `Monty had ${total} berries and ate ${sub}. How many are left? (${total} − ${sub})`,
          hint: `Count the ${diff} red berries left in the frame!`,
          visual: { type: 'ten-frame', countA: diff, countB: sub, capacity: 20, emojiA: '🍓', emojiB: '🍽️', showEquation: `${total} − ${sub} = ?` },
          choices: G.buildNumericChoices(diff, 1, 4),
          correctValue: String(diff),
          explanation: `${total} − ${sub} = ${diff}!`
        };
      }
      case 'place_50': {
        const tens = G.randInt(1, 4);
        const ones = G.randInt(1, 9);
        const val = tens * 10 + ones;
        return {
          standardCode: 'G1.B1.2 (Place Value to 50)',
          prompt: `What number is shown by ${tens} Tens rods and ${ones} Ones?`,
          hint: `Count by 10s for the rods (${tens * 10}), then add ${ones}!`,
          visual: { type: 'base-ten', hundreds: 0, tens, ones, label: `${tens} tens + ${ones} ones` },
          choices: G.buildNumericChoices(val, 10, 12),
          correctValue: String(val),
          explanation: `${tens * 10} + ${ones} = ${val}!`
        };
      }
      case 'missing_add': {
        const target = G.pickRandom([10, 20]);
        const known = G.randInt(2, target - 2);
        const ans = target - known;
        return {
          standardCode: 'G1.C2.2 (Missing Addends to 10 & 20)',
          prompt: `What number makes ${target}? ${known} + ❓ = ${target}`,
          hint: `Count up from ${known} to ${target}!`,
          visual: { type: 'balance-scale', leftLabel: `${known} + ❓`, rightLabel: `${target}` },
          choices: G.buildNumericChoices(ans, 1, 4),
          correctValue: String(ans),
          explanation: `${known} + ${ans} = ${target}!`
        };
      }
      case 'coding_seq': {
        const up = G.randInt(2, 4);
        const right = G.randInt(1, 3);
        const steps = [...Array(up).fill('⬆️'), ...Array(right).fill('➡️')];
        return {
          standardCode: 'G1.C3 (Sequential Code Steps)',
          prompt: `How many TOTAL steps are in Monty's coding path?`,
          hint: `Add the ${up} Up arrows and ${right} Right arrows!`,
          visual: { type: 'coding-grid', steps, startLabel: '🫎 Start', endLabel: '🌲 Goal' },
          choices: G.buildNumericChoices(up + right, 2, 3),
          correctValue: String(up + right),
          explanation: `${up} + ${right} = ${up + right} total steps!`
        };
      }
      case 'shapes_3d': {
        const s = G.pickRandom([
          { key: 'cube', name: 'Cube' },
          { key: 'cylinder', name: 'Cylinder' },
          { key: 'cone', name: 'Cone' },
          { key: 'pyramid', name: 'Pyramid' }
        ]);
        return {
          standardCode: 'G1.E1.1 (3D Objects & Solids)',
          prompt: `What 3D solid shape is shown here?`,
          hint: `Look at its faces and curved or flat surfaces!`,
          visual: { type: 'shape-2d', shape: s.key, label: '3D Solid' },
          choices: [
            { label: 'Cube', value: 'Cube' },
            { label: 'Cylinder', value: 'Cylinder' },
            { label: 'Cone', value: 'Cone' },
            { label: 'Pyramid', value: 'Pyramid' }
          ],
          correctValue: s.name,
          explanation: `That 3D solid is a ${s.name}!`
        };
      }
      case 'temp_c': {
        const t = G.pickRandom([25, 10, 0, -10]);
        return {
          standardCode: 'G1.E2 (Reading Metric Temperature in °C)',
          prompt: `Look at the Canadian thermometer. What temperature does it show?`,
          hint: `Read the number next to the coloured mercury!`,
          visual: { type: 'thermometer', temp: t, min: -20, max: 40, label: t <= 0 ? 'Brrr! Freezing!' : 'Warm day!' },
          choices: [
            { label: '25°C', value: '25°C' },
            { label: '10°C', value: '10°C' },
            { label: '0°C', value: '0°C' },
            { label: '-10°C', value: '-10°C' }
          ],
          correctValue: `${t}°C`,
          explanation: `The thermometer shows ${t}°C!`
        };
      }

      // ---------- GRADE 2-6 EXPANDED TOPICS ----------
      case 'two_digit_add': {
        const a = G.randInt(12, 45);
        const b = G.randInt(11, 34);
        return {
          standardCode: 'G2.B2.4 (Two-Digit Addition)',
          prompt: `Solve: ${a} + ${b} = ?`,
          hint: `Add the tens first, then add the ones!`,
          visual: { type: 'balance-scale', leftLabel: `${a} + ${b}`, rightLabel: `?` },
          choices: G.buildNumericChoices(a + b, 20, 10),
          correctValue: String(a + b),
          explanation: `${a} + ${b} = ${a + b}!`
        };
      }
      case 'even_odd': {
        const n = G.randInt(11, 98);
        const isEven = n % 2 === 0;
        return {
          standardCode: 'G2.B1 (Even & Odd Numbers)',
          prompt: `Is the number ${n} EVEN or ODD?`,
          hint: `Look at the ones digit (${n % 10}). Even numbers end in 0, 2, 4, 6, or 8!`,
          visual: { type: 'base-ten', hundreds: 0, tens: Math.floor(n / 10), ones: n % 10, label: String(n) },
          choices: [
            { label: 'Even', value: 'Even' },
            { label: 'Odd', value: 'Odd' }
          ],
          correctValue: isEven ? 'Even' : 'Odd',
          explanation: `${n} ends in ${n % 10}, so it is ${isEven ? 'Even' : 'Odd'}!`
        };
      }
      case 'div_share': {
        const groups = G.randInt(2, 5);
        const each = G.randInt(3, 7);
        const total = groups * each;
        return {
          standardCode: 'G3.B2.6 (Fair-Share Division)',
          prompt: `Share ${total} maple treats equally among ${groups} friends. What is ${total} ÷ ${groups}?`,
          hint: `Think: ${groups} × ? = ${total}`,
          visual: { type: 'balance-scale', leftLabel: `${total} ÷ ${groups}`, rightLabel: `?` },
          choices: G.buildNumericChoices(each, 1, 3),
          correctValue: String(each),
          explanation: `${total} ÷ ${groups} = ${each} treats each!`
        };
      }
      case 'coord_grid':
      case 'coord_quad': {
        const x = G.randInt(1, 5);
        const y = G.randInt(1, 5);
        const ans = `(${x}, ${y})`;
        const dist = new Set([ans]);
        while (dist.size < 4) {
          dist.add(`(${G.randInt(1, 5)}, ${G.randInt(1, 5)})`);
        }
        return {
          standardCode: 'G4-6.E1.4 (Cartesian Coordinate Grid)',
          prompt: `What are the (x, y) coordinates of the 🏕️ campsite on the map?`,
          hint: `Go ACROSS to column ${x}, then UP to row ${y}!`,
          visual: { type: 'coordinate-grid', x, y, max: 5, icon: '🏕️', label: 'Find (x, y)' },
          choices: G.shuffle([...dist]).map(c => ({ label: c, value: c })),
          correctValue: ans,
          explanation: `Column ${x} across and Row ${y} up is ${ans}!`
        };
      }
      case 'hst_tax':
      case 'discounts': {
        const orig = G.pickRandom([40, 60, 80, 100]);
        const pct = G.pickRandom([25, 50]);
        const saved = (orig * pct) / 100;
        const sale = orig - saved;
        return {
          standardCode: 'G6.F1.4 (Percent Discounts)',
          prompt: `A $${orig} winter jacket is ${pct}% OFF! What is the new sale price?`,
          hint: `${pct}% of $${orig} is $${saved}. Subtract $${orig} − $${saved}!`,
          visual: { type: 'canadian-coins', coins: ['bill20', 'bill20'], promptLabel: `$${orig} jacket at ${pct}% off` },
          choices: G.buildNumericChoices(sale, 10, 15, ' dollars'),
          correctValue: String(sale),
          explanation: `$${orig} − $${saved} = $${sale}!`
        };
      }

      default:
        return G.generateQuestion(gradeId, strandId);
    }
  }
}

window.STRAND_TOPICS = STRAND_TOPICS;
window.ExtendedQuestionGenerator = ExtendedQuestionGenerator;
