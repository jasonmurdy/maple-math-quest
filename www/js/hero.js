/**
 * Maple Math Quest - MathHero Action & Battle Mode Engine
 * Gives kids an exciting, non-punitive superhero battle experience while solving
 * Canadian K-6 curriculum math problems!
 */

const HERO_SUITS = [
  {
    id: 'maple_blaze',
    name: 'Captain Maple Blaze',
    icon: '🦸‍♂️',
    badge: '🍁🔥',
    projectile: '🍁🔥💥',
    ultimateName: 'MEGA MAPLE SUPERNOVA!',
    ultimateIcon: '☄️🍁🔥',
    color: '#FF4D2D',
    bgGlow: 'radial-gradient(circle, rgba(255,77,45,0.35) 0%, rgba(255,159,28,0.05) 70%)',
    desc: 'Fires blazing Canadian Maple Leaf energy beams!'
  },
  {
    id: 'aurora_bolt',
    name: 'Aurora Thunder Hero',
    icon: '🦸‍♀️',
    badge: '⚡🌌',
    projectile: '⚡🌌✨',
    ultimateName: 'NORTHERN LIGHTNING STORM!',
    ultimateIcon: '🌩️⚡🌌',
    color: '#00BBF9',
    bgGlow: 'radial-gradient(circle, rgba(0,245,212,0.35) 0%, rgba(0,187,249,0.05) 70%)',
    desc: 'Harnesses the electric power of the Northern Lights!'
  },
  {
    id: 'frost_knight',
    name: 'Glacier Frost Ninja',
    icon: '🥷',
    badge: '❄️🛡️',
    projectile: '❄️💎💨',
    ultimateName: 'ARCTIC BLIZZARD CANNON!',
    ultimateIcon: '🏔️❄️💎',
    color: '#38BDF8',
    bgGlow: 'radial-gradient(circle, rgba(56,189,248,0.38) 0%, rgba(14,165,233,0.05) 70%)',
    desc: 'Freezes math monsters with unstoppable ice crystals!'
  },
  {
    id: 'cosmic_star',
    name: 'Cosmic Star Ranger',
    icon: '🦹‍♂️',
    badge: '🌟🚀',
    projectile: '🌟🚀💫',
    ultimateName: 'GALAXY LASER OVERDRIVE!',
    ultimateIcon: '🪐🌟🚀',
    color: '#9B5DE5',
    bgGlow: 'radial-gradient(circle, rgba(155,93,229,0.38) 0%, rgba(241,91,181,0.05) 70%)',
    desc: 'Blasts starlight lasers from outer space!'
  }
];

const MATH_BOSSES = [
  {
    id: 'boss_calc',
    name: 'Count Calculotron',
    icon: '🤖',
    title: 'The Number-Scrambling Robot',
    color: '#6366F1',
    taunt: 'BEEP BOOP! Can your Hero brain solve my puzzle?',
    hitQuote: 'CLANG! BZZT! Your math beam overloaded my circuits!',
    blockQuote: 'HA! My robo-puzzle was tricky—use your Hero Scanner!',
    defeatQuote: 'SYSTEM OVERLOAD! You are a true Canadian Math Hero!'
  },
  {
    id: 'boss_slime',
    name: 'Professor Minus-Slime',
    icon: '👾',
    title: 'The Goofy Goo Monster',
    color: '#10B981',
    taunt: 'GLOOP GLOOP! Let us see if you can power up!',
    hitQuote: 'SPLAT! Whoa, that answer zapped my slime right off!',
    blockQuote: 'BOING! Nice shield block, Hero! Try again!',
    defeatQuote: 'BLOOP! I shrunk to tiny size! Your math power wins!'
  },
  {
    id: 'boss_rex',
    name: 'Geom-O-Saurus Rex',
    icon: '🦖',
    title: 'The Mighty Dino Boss',
    color: '#F59E0B',
    taunt: 'ROOOAR! Show me your strongest Math Strike!',
    hitQuote: 'YOWZA! That was a super-charged Hero blast!',
    blockQuote: 'STOMP! Your Hero Shield blocked my roar! Check the hint!',
    defeatQuote: 'ROAR! I bow to the Supreme Math Hero!'
  },
  {
    id: 'boss_dragon',
    name: 'The Decimal Dragon',
    icon: '🐉',
    title: 'Guardian of the Rocky Peaks',
    color: '#EC4899',
    taunt: 'WHOOSH! Charge up your Ultra Meter if you dare!',
    hitQuote: 'KABOOM! Direct hit right on target!',
    blockQuote: 'FLAP! Your energy shield is unbreakable! Look closely!',
    defeatQuote: 'INCREDIBLE! You conquered the Dragon Challenge!'
  }
];

const HERO_RANKS = [
  { minXp: 0, title: 'Rookie Math Ranger', badge: '🥉' },
  { minXp: 150, title: 'Maple Shield Defender', badge: '🥈' },
  { minXp: 350, title: 'Northern Lights Striker', badge: '🥇' },
  { minXp: 650, title: 'Captain True North', badge: '💎' },
  { minXp: 1000, title: 'Supreme MathHero Legend', badge: '👑' }
];

class MathHeroEngine {
  static getSuit(suitId) {
    return HERO_SUITS.find(s => s.id === suitId) || HERO_SUITS[0];
  }

  static getBoss(bossId) {
    if (!bossId || bossId === 'random') {
      return MATH_BOSSES[Math.floor(Math.random() * MATH_BOSSES.length)];
    }
    return MATH_BOSSES.find(b => b.id === bossId) || MATH_BOSSES[0];
  }

  static getHeroRank(xp = 0) {
    let current = HERO_RANKS[0];
    let next = HERO_RANKS[1] || null;
    for (let i = 0; i < HERO_RANKS.length; i++) {
      if (xp >= HERO_RANKS[i].minXp) {
        current = HERO_RANKS[i];
        next = HERO_RANKS[i + 1] || null;
      }
    }
    return { current, next };
  }

  static renderBattleStage(qState) {
    const suit = this.getSuit(qState.heroSuitId);
    const boss = qState.bossObj || MATH_BOSSES[0];
    const totalQuestions = qState.questions.length;
    const bossHpPct = Math.max(0, Math.round((qState.bossHp / qState.bossMaxHp) * 100));
    const chargePips = qState.heroCharge || 0; // 0, 1, 2 -> at 3 triggers ULTRA SLAM!
    const animState = qState.battleAnim || 'idle'; // 'idle' | 'strike' | 'ultimate' | 'shield'

    const isStrike = animState === 'strike' || animState === 'ultimate';
    const isUltimate = animState === 'ultimate';
    const isShield = animState === 'shield';

    let speechText = boss.taunt;
    if (isStrike) speechText = boss.hitQuote;
    else if (isShield) speechText = boss.blockQuote;
    if (qState.bossHp <= 0) speechText = boss.defeatQuote;

    return `
      <div class="hero-battle-arena ${isUltimate ? 'arena-ultimate-flash' : ''}" id="hero-battle-arena">
        <!-- Top VS HUD Bar -->
        <div class="battle-hud-row">
          <!-- HERO HUD -->
          <div class="hud-fighter hud-hero">
            <div class="hud-avatar-badge" style="border-color:${suit.color}">
              <span>${suit.icon}</span>
            </div>
            <div class="hud-stats">
              <div class="hud-name-row">
                <strong class="hud-name">${suit.name}</strong>
                ${qState.combo > 1 ? `<span class="combo-fire-pill">🔥 ${qState.combo}× COMBO!</span>` : ''}
              </div>
              <div class="hero-charge-meter" title="Fill 3 bars for MEGA ULTRA SLAM!">
                <span class="charge-label">⚡ Ultra Power:</span>
                <div class="charge-pips">
                  <span class="charge-pip ${chargePips >= 1 || isUltimate ? 'filled' : ''}">⚡</span>
                  <span class="charge-pip ${chargePips >= 2 || isUltimate ? 'filled' : ''}">⚡</span>
                  <span class="charge-pip ${chargePips >= 3 || isUltimate ? 'filled' : ''}">💥</span>
                </div>
              </div>
            </div>
          </div>

          <div class="hud-vs-emblem">⚡ VS ⚡</div>

          <!-- BOSS HUD -->
          <div class="hud-fighter hud-boss">
            <div class="hud-stats boss-stats-right">
              <div class="hud-name-row">
                <strong class="hud-name">${boss.name}</strong>
                <span class="boss-hp-numbers">${qState.bossHp} / ${qState.bossMaxHp} HP</span>
              </div>
              <div class="boss-hp-bar-outer">
                <div class="boss-hp-bar-fill ${isStrike ? 'hp-hit-flash' : ''}" style="width: ${bossHpPct}%;"></div>
              </div>
            </div>
            <div class="hud-avatar-badge boss-badge" style="border-color:${boss.color}">
              <span>${qState.bossHp <= 0 ? '💫' : boss.icon}</span>
            </div>
          </div>
        </div>

        <!-- Animated Visual Stage -->
        <div class="battle-stage-floor">
          <!-- Left: Kid's Superhero -->
          <div class="fighter-sprite-wrap hero-side ${isStrike ? 'hero-lunge-attack' : 'hero-idle-float'}">
            <div class="hero-aura-ring" style="background:${suit.bgGlow}; border-color:${suit.color}"></div>
            <div class="fighter-main-emoji">${suit.icon}</div>
            <div class="hero-weapon-badge">${suit.badge}</div>
            ${isShield ? `
              <div class="hero-energy-shield">
                🛡️ <span>HERO SHIELD BLOCK!</span>
              </div>
            ` : ''}
            ${isStrike ? `
              <div class="hero-shout-banner" style="background:${suit.color}">
                ${isUltimate ? `☄️ ${suit.ultimateName}` : `⚡ HERO MATH STRIKE!`}
              </div>
            ` : ''}
          </div>

          <!-- Center: Energy Beam & Shockwave Track -->
          <div class="battle-fx-track">
            ${isStrike ? `
              <div class="projectile-beam ${isUltimate ? 'ultimate-beam' : ''}">
                <span>${isUltimate ? suit.ultimateIcon : suit.projectile}</span>
              </div>
            ` : `
              <div class="battle-prompt-callout">
                <span>🎯 Answer below to launch a <strong>${chargePips === 2 ? 'MEGA ULTRA SLAM' : 'Hero Strike'}</strong>!</span>
              </div>
            `}
          </div>

          <!-- Right: Math Boss -->
          <div class="fighter-sprite-wrap boss-side ${isStrike ? 'boss-hit-shake' : 'boss-idle-bob'} ${qState.bossHp <= 0 ? 'boss-ko-spin' : ''}">
            ${isStrike ? `
              <div class="floating-damage-pop ${isUltimate ? 'damage-crit' : ''}">
                ${isUltimate ? `💥 -${qState.lastDamage || 250} MEGA CRIT!` : `💥 -${qState.lastDamage || 100} HP!`}
              </div>
              <div class="impact-burst">💥✨⚡</div>
            ` : ''}
            <div class="fighter-main-emoji boss-emoji">${qState.bossHp <= 0 ? '🏳️😵' : boss.icon}</div>
            <div class="boss-speech-bubble">${speechText}</div>
          </div>
        </div>
      </div>`;
  }
}

window.HERO_SUITS = HERO_SUITS;
window.MATH_BOSSES = MATH_BOSSES;
window.HERO_RANKS = HERO_RANKS;
window.MathHeroEngine = MathHeroEngine;
