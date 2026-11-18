/**
 * Maple Math Quest - Main Application & Offline Persistence Controller
 * Supports:
 * - Multiple Kid Profiles with Avatars & Grade Selection (K to Grade 6)
 * - Canadian Curriculum Adventure Map (5 Strands per Grade)
 * - Interactive 5-Question Quests with Visual Manipulatives & Gentle Hints
 * - Canadian Sticker Book & Star Rewards
 * - Interactive Sandbox Manipulatives Lab (Free Play Ten-Frame, Base-10, Canadian Coins)
 * - Parent / Teacher Curriculum Mastery Dashboard (Protected by quick adult math gate)
 */

const STORAGE_KEY = 'maple_math_quest_profiles_v1';

const AVATAR_OPTIONS = ['🦫', '🫎', '🐻‍❄️', '🦆', '🦊', '🦉', '🐋', '🍁', '🛶', '🏒'];

class MapleMathApp {
  constructor() {
    this.state = this.loadState();
    this.currentView = 'home'; // 'home' | 'grades' | 'quest' | 'stickers' | 'lab' | 'dashboard'
    this.activeQuest = null;
    this.labState = {
      tool: 'ten-frame',
      tfCountA: 5,
      tfCountB: 2,
      b10Hundreds: 1,
      b10Tens: 3,
      b10Ones: 4,
      coinTray: ['loonie', 'quarter', 'dime', 'nickel']
    };
    this.heroConfig = {
      suitId: 'maple_blaze',
      bossId: 'boss_calc',
      strandId: 'all',
      questionCount: 5
    };
  }

  getDefaultProfile(name = 'Explorer Sam', avatar = '🦫', gradeId = 'K') {
    return {
      id: 'prof_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      name,
      avatar,
      selectedGrade: gradeId,
      stars: 0,
      heroXp: 0,
      heroSuitId: 'maple_blaze',
      bossesDefeated: 0,
      bestStreak: 0,
      currentStreak: 0,
      manipulativesUsed: 0,
      stickers: ['stk_beaver'],
      // Progress keyed by `${gradeId}_${strandId}`: { stars: 0..3, completed: count, correct: count, attempted: count }
      progress: {}
    };
  }

  loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.profiles) && parsed.profiles.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      // Fallback to default state
    }
    const p1 = this.getDefaultProfile('Maya (Early Learner)', '🦫', 'K');
    const p2 = this.getDefaultProfile('Liam (Grade 3)', '🦆', '3');
    return {
      activeProfileId: p1.id,
      soundEnabled: true,
      voiceEnabled: true,
      profiles: [p1, p2]
    };
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      // Ignore quota errors
    }
  }

  getActiveProfile() {
    let prof = this.state.profiles.find(p => p.id === this.state.activeProfileId);
    if (!prof) {
      prof = this.state.profiles[0];
      this.state.activeProfileId = prof.id;
    }
    return prof;
  }

  getActiveGradeObj() {
    const prof = this.getActiveProfile();
    return window.CANADIAN_GRADES.find(g => g.id === prof.selectedGrade) || window.CANADIAN_GRADES[0];
  }

  init() {
    window.soundEngine.soundEnabled = this.state.soundEnabled;
    window.soundEngine.voiceEnabled = this.state.voiceEnabled;
    // Unlock WebAudio on first mobile touch gesture
    const unlockAudio = () => {
      window.soundEngine.init();
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('pointerdown', unlockAudio);
    };
    window.addEventListener('touchstart', unlockAudio, { passive: true });
    window.addEventListener('pointerdown', unlockAudio, { passive: true });
    this.render();
  }

  setView(viewName) {
    window.soundEngine.playTap();
    this.currentView = viewName;
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectGrade(gradeId) {
    const prof = this.getActiveProfile();
    prof.selectedGrade = gradeId;
    this.saveState();
    window.soundEngine.playSuccess();
    this.currentView = 'home';
    this.render();
  }

  switchProfile(profileId) {
    this.state.activeProfileId = profileId;
    this.saveState();
    window.soundEngine.playPop();
    this.closeModal();
    this.render();
  }

  createNewProfile(name, avatar, gradeId) {
    const cleanName = (name || '').trim() || 'Maple Explorer';
    const newProf = this.getDefaultProfile(cleanName, avatar || '🦫', gradeId || 'K');
    this.state.profiles.push(newProf);
    this.state.activeProfileId = newProf.id;
    this.saveState();
    window.soundEngine.playSuccess();
    this.closeModal();
    this.render();
  }

  toggleSound() {
    this.state.soundEnabled = !this.state.soundEnabled;
    window.soundEngine.soundEnabled = this.state.soundEnabled;
    this.saveState();
    if (this.state.soundEnabled) window.soundEngine.playPop();
    this.renderHeaderBar();
  }

  toggleVoice() {
    this.state.voiceEnabled = !this.state.voiceEnabled;
    window.soundEngine.voiceEnabled = this.state.voiceEnabled;
    this.saveState();
    if (this.state.voiceEnabled) {
      window.soundEngine.speak('Voice helper on!');
    }
    this.renderHeaderBar();
  }

  openTopicSelector(gradeId, strandId) {
    window.soundEngine.playTap();
    const gradeObj = window.CANADIAN_GRADES.find(g => g.id === gradeId);
    const strandObj = window.CURRICULUM_STRANDS.find(s => s.id === strandId);
    const topics = window.ExtendedQuestionGenerator
      ? window.ExtendedQuestionGenerator.getTopics(gradeId, strandId)
      : [];

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    const topicsHtml = topics.map(t => `
      <button type="button" class="topic-choice-card"
        onclick="app.launchFromTopicModal('${gradeId}', '${strandId}', '${t.id}')">
        <span class="topic-icon">${t.icon}</span>
        <div class="topic-info">
          <div class="topic-title">${t.title}</div>
          <div class="topic-desc">${t.desc}</div>
        </div>
        <span class="topic-go">▶</span>
      </button>
    `).join('');

    modalRoot.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target===this) app.closeModal()">
        <div class="modal-card topic-modal">
          <div class="modal-header">
            <h3>${strandObj.icon} ${gradeObj.name}: ${strandObj.name}</h3>
            <button type="button" class="btn-close-icon" onclick="app.closeModal()">✕</button>
          </div>

          <div class="quest-mode-picker">
            <span class="length-label">Play Style:</span>
            <div class="length-pills">
              <label class="len-pill hero-mode-pill"><input type="radio" name="questPlayMode" value="hero" checked /><span>⚡ MathHero Battle</span></label>
              <label class="len-pill"><input type="radio" name="questPlayMode" value="classic" /><span>🗺️ Calm Explorer</span></label>
            </div>
          </div>

          <div class="quest-length-picker">
            <span class="length-label">Quest Length:</span>
            <div class="length-pills">
              <label class="len-pill"><input type="radio" name="questLen" value="5" checked /><span>5 Qs (Quick)</span></label>
              <label class="len-pill"><input type="radio" name="questLen" value="10" /><span>10 Qs</span></label>
              <label class="len-pill"><input type="radio" name="questLen" value="15" /><span>15 Qs</span></label>
            </div>
          </div>

          <div class="topics-list">
            <button type="button" class="topic-choice-card topic-mixed-card"
              onclick="app.launchFromTopicModal('${gradeId}', '${strandId}', 'all')">
              <span class="topic-icon">🎲</span>
              <div class="topic-info">
                <div class="topic-title">Surprise Mix (All Question Types)</div>
                <div class="topic-desc">Shuffles all ${topics.length} skills in ${strandObj.name} so every quest feels fresh!</div>
              </div>
              <span class="topic-go">▶</span>
            </button>
            ${topicsHtml}
          </div>
        </div>
      </div>`;
  }

  launchFromTopicModal(gradeId, strandId, topicId) {
    const checkedLen = document.querySelector('input[name="questLen"]:checked');
    const checkedMode = document.querySelector('input[name="questPlayMode"]:checked');
    const count = checkedLen ? parseInt(checkedLen.value, 10) : 5;
    const isHero = checkedMode ? checkedMode.value === 'hero' : true;
    this.closeModal();
    this.startQuest(gradeId, strandId, topicId, count, isHero, 'random');
  }

  startQuest(gradeId, strandId, topicId = 'all', questionCount = 5, isHeroMode = false, bossId = 'random') {
    window.soundEngine.playPop();
    const prof = this.getActiveProfile();
    const allStrandIds = window.CURRICULUM_STRANDS.map(s => s.id);
    const questions = [];

    for (let i = 0; i < questionCount; i++) {
      const actualStrand = strandId === 'all'
        ? window.CurriculumGenerator.pickRandom(allStrandIds)
        : strandId;
      const q = window.ExtendedQuestionGenerator
        ? window.ExtendedQuestionGenerator.generate(gradeId, actualStrand, topicId)
        : window.CurriculumGenerator.generateQuestion(gradeId, actualStrand);
      q._strandId = actualStrand;
      questions.push(q);
    }

    const gradeObj = window.CANADIAN_GRADES.find(g => g.id === gradeId);
    const strandObj = window.CURRICULUM_STRANDS.find(s => s.id === strandId) || {
      id: 'all',
      code: 'All Strands',
      name: 'All-Strand Hero Mix',
      icon: '⚡',
      color: '#FF4D2D'
    };

    const suitId = prof.heroSuitId || this.heroConfig.suitId || 'maple_blaze';
    const bossObj = window.MathHeroEngine
      ? window.MathHeroEngine.getBoss(bossId)
      : null;

    this.activeQuest = {
      gradeId,
      strandId,
      topicId,
      questionCount,
      isHeroMode,
      heroSuitId: suitId,
      bossObj,
      bossMaxHp: questionCount * 100,
      bossHp: questionCount * 100,
      heroCharge: 0,
      combo: 0,
      battleAnim: 'idle',
      lastDamage: 100,
      gradeObj,
      strandObj,
      questions,
      currentIndex: 0,
      correctFirstTry: 0,
      mistakesOnCurrent: 0,
      showHint: false,
      answeredCurrent: false,
      feedbackMessage: '',
      feedbackType: '' // 'correct' | 'retry'
    };

    this.currentView = 'quest';
    this.render();

    const firstQ = questions[0];
    if (firstQ) {
      setTimeout(() => window.soundEngine.speak(firstQ.prompt), 250);
    }
  }

  submitAnswer(choiceValue, btnElement) {
    const qState = this.activeQuest;
    if (!qState || qState.answeredCurrent) return;

    const currentQ = qState.questions[qState.currentIndex];
    const prof = this.getActiveProfile();
    const actualStrand = currentQ._strandId || (qState.strandId === 'all' ? 'number' : qState.strandId);
    const progKey = `${qState.gradeId}_${actualStrand}`;
    if (!prof.progress[progKey]) {
      prof.progress[progKey] = { stars: 0, completed: 0, correct: 0, attempted: 0 };
    }

    if (String(choiceValue) === String(currentQ.correctValue)) {
      // Correct answer!
      qState.answeredCurrent = true;
      prof.progress[progKey].attempted += 1;
      prof.progress[progKey].correct += 1;
      prof.manipulativesUsed = (prof.manipulativesUsed || 0) + 1;

      if (qState.mistakesOnCurrent === 0) {
        qState.correctFirstTry += 1;
        prof.currentStreak = (prof.currentStreak || 0) + 1;
        if (prof.currentStreak > (prof.bestStreak || 0)) {
          prof.bestStreak = prof.currentStreak;
        }
      }

      if (qState.isHeroMode) {
        qState.combo = (qState.combo || 0) + 1;
        qState.heroCharge = (qState.heroCharge || 0) + 1;
        const isFinalHit = qState.currentIndex + 1 >= qState.questions.length;

        if (qState.heroCharge >= 3 || isFinalHit) {
          qState.battleAnim = 'ultimate';
          qState.heroCharge = 0;
          qState.lastDamage = 250;
          prof.heroXp = (prof.heroXp || 0) + 40;
          window.soundEngine.playHeroUltimate();
        } else {
          qState.battleAnim = 'strike';
          qState.lastDamage = 100;
          prof.heroXp = (prof.heroXp || 0) + 25;
          window.soundEngine.playHeroLaser();
        }

        const remainingQuestions = Math.max(0, qState.questions.length - (qState.currentIndex + 1));
        qState.bossHp = remainingQuestions * 100;
        qState.feedbackType = 'correct';
        qState.feedbackMessage = `⚡ HERO STRIKE! -${qState.lastDamage} HP! ${currentQ.explanation}`;
        window.soundEngine.speak(`Hero Strike! ${currentQ.explanation}`);
      } else {
        qState.feedbackType = 'correct';
        qState.feedbackMessage = `🌟 Awesome job! ${currentQ.explanation}`;
        window.soundEngine.playSuccess();
        window.soundEngine.speak(`Awesome job! ${currentQ.explanation}`);
      }

      this.saveState();
      this.renderQuestScreen();
    } else {
      // Gentle non-punitive retry with automatic visual hint
      qState.mistakesOnCurrent += 1;
      qState.showHint = true;
      qState.combo = 0;
      prof.currentStreak = 0;
      prof.progress[progKey].attempted += 1;
      qState.feedbackType = 'retry';

      if (qState.isHeroMode) {
        qState.battleAnim = 'shield';
        qState.feedbackMessage = `🛡️ HERO SHIELD BLOCKED THE ATTACK! Hero Scanner Tip: ${currentQ.hint}`;
        window.soundEngine.playHeroShield();
      } else {
        qState.feedbackMessage = `💡 Almost! Let's look at the visual helper: ${currentQ.hint}`;
        window.soundEngine.playGentleNudge();
      }

      if (btnElement) {
        btnElement.classList.add('choice-gentle-shake');
        btnElement.disabled = true;
      }
      window.soundEngine.speak(`Let's try again! ${currentQ.hint}`);
      this.saveState();

      if (qState.isHeroMode) {
        const arenaWrap = document.getElementById('hero-stage-mount');
        if (arenaWrap && window.MathHeroEngine) {
          arenaWrap.innerHTML = window.MathHeroEngine.renderBattleStage(qState);
        }
      }

      const feedbackBox = document.getElementById('quest-feedback-banner');
      if (feedbackBox) {
        feedbackBox.className = 'quest-feedback-banner feedback-retry';
        feedbackBox.innerHTML = `
          <div class="feedback-text">${qState.feedbackMessage}</div>
        `;
      }
    }
  }

  nextQuestion() {
    const qState = this.activeQuest;
    if (!qState) return;
    window.soundEngine.playTap();

    if (qState.currentIndex + 1 < qState.questions.length) {
      qState.currentIndex += 1;
      qState.mistakesOnCurrent = 0;
      qState.showHint = false;
      qState.answeredCurrent = false;
      qState.battleAnim = 'idle';
      qState.feedbackMessage = '';
      qState.feedbackType = '';
      this.renderQuestScreen();
      const nextQ = qState.questions[qState.currentIndex];
      setTimeout(() => window.soundEngine.speak(nextQ.prompt), 200);
    } else {
      this.finishQuest();
    }
  }

  finishQuest() {
    const qState = this.activeQuest;
    const prof = this.getActiveProfile();
    const targetStrand = qState.strandId === 'all' ? 'number' : qState.strandId;
    const progKey = `${qState.gradeId}_${targetStrand}`;
    if (!prof.progress[progKey]) {
      prof.progress[progKey] = { stars: 0, completed: 0, correct: 0, attempted: 0 };
    }

    const totalQs = qState.questions.length || 5;
    const ratio = qState.correctFirstTry / totalQs;
    let earnedStars = 1;
    if (ratio >= 0.9) earnedStars = 3;
    else if (ratio >= 0.6) earnedStars = 2;

    const prevStars = prof.progress[progKey]?.stars || 0;
    const starDiff = Math.max(0, earnedStars - prevStars);
    prof.stars = (prof.stars || 0) + earnedStars;
    prof.progress[progKey].stars = Math.max(prevStars, earnedStars);
    prof.progress[progKey].completed = (prof.progress[progKey].completed || 0) + 1;

    if (qState.isHeroMode) {
      prof.bossesDefeated = (prof.bossesDefeated || 0) + 1;
      prof.heroXp = (prof.heroXp || 0) + 50;
    }

    // Check sticker unlocks
    const newlyUnlocked = this.checkAndAwardStickers(prof, qState, earnedStars);

    this.saveState();
    if (qState.isHeroMode) {
      window.soundEngine.playHeroUltimate();
    } else {
      window.soundEngine.playFanfare();
    }

    this.showQuestCompleteModal(qState, earnedStars, newlyUnlocked, starDiff);
  }

  checkAndAwardStickers(prof, qState, earnedStars) {
    const unlocked = [];
    const grant = (id) => {
      if (!prof.stickers.includes(id)) {
        prof.stickers.push(id);
        const stk = window.CANADIAN_STICKERS.find(s => s.id === id);
        if (stk) unlocked.push(stk);
      }
    };

    grant('stk_beaver');
    if (earnedStars === 3) grant('stk_maple');
    if (qState.gradeId === '1') grant('stk_moose');
    if (qState.strandId === 'financial') grant('stk_loonie');
    if ((prof.manipulativesUsed || 0) >= 10) grant('stk_polar');

    const strandsCompleted = new Set(
      Object.keys(prof.progress)
        .filter(k => prof.progress[k].completed > 0)
        .map(k => k.split('_')[1])
    );
    if (strandsCompleted.size >= 3) grant('stk_canoe');
    if ((prof.bestStreak || 0) >= 5) grant('stk_owl');
    if ((prof.stars || 0) >= 15) grant('stk_aurora');
    if (qState.strandId === 'spatial') grant('stk_hockey');
    if (['4', '5', '6'].includes(qState.gradeId)) grant('stk_totem');
    if (qState.strandId === 'data') grant('stk_puffin');
    if ((prof.stars || 0) >= 30) grant('stk_mountie');

    return unlocked;
  }

  showQuestCompleteModal(qState, earnedStars, newlyUnlocked) {
    const prof = this.getActiveProfile();
    const starsHtml = '⭐'.repeat(earnedStars) + '☆'.repeat(3 - earnedStars);
    let stickerBanner = '';
    if (newlyUnlocked.length > 0) {
      stickerBanner = `
        <div class="new-sticker-callout">
          <div class="callout-title">🎉 New Canadian Sticker Unlocked!</div>
          <div class="unlocked-stickers-row">
            ${newlyUnlocked.map(s => `<div class="mini-sticker-pill"><span>${s.icon}</span> <strong>${s.name}</strong></div>`).join('')}
          </div>
        </div>`;
    }

    let heroVictoryHtml = '';
    if (qState.isHeroMode && window.MathHeroEngine) {
      const suit = window.MathHeroEngine.getSuit(qState.heroSuitId);
      const rankInfo = window.MathHeroEngine.getHeroRank(prof.heroXp || 0);
      heroVictoryHtml = `
        <div class="hero-victory-callout">
          <div class="hero-victory-icons">${suit.icon} 🏆 💥 ${qState.bossObj ? qState.bossObj.icon : '🤖'}🏳️</div>
          <div class="hero-victory-title">BOSS DEFEATED! ${qState.bossObj ? qState.bossObj.name : ''} Knocked Out!</div>
          <div class="hero-xp-pill">${rankInfo.current.badge} ${rankInfo.current.title} • ⚡ ${prof.heroXp || 0} Hero XP</div>
        </div>`;
    }

    const modalRoot = document.getElementById('modal-root');
    modalRoot.innerHTML = `
      <div class="modal-backdrop">
        <div class="modal-card celebration-modal">
          <div class="celebration-mascot">${qState.isHeroMode ? '🦸‍♂️⚡' : qState.gradeObj.mascot}</div>
          <h2 class="celebration-title">${qState.isHeroMode ? 'Hero Victory!' : 'Quest Complete!'}</h2>
          <p class="celebration-subtitle">${qState.gradeObj.name} • ${qState.strandObj.name}</p>
          <div class="celebration-stars">${starsHtml}</div>
          <p class="celebration-score">You answered <strong>${qState.correctFirstTry} out of ${qState.questions.length}</strong> on the first try and earned <strong>+${earnedStars} Stars</strong>!</p>
          ${heroVictoryHtml}
          ${stickerBanner}
          <div class="modal-actions-row">
            <button type="button" class="btn-secondary-lg" onclick="app.closeModal(); app.setView('${qState.isHeroMode ? 'hero' : 'home'}')">${qState.isHeroMode ? '⚡ Hero Arena' : '🗺️ Back to Map'}</button>
            <button type="button" class="btn-primary-lg" onclick="app.closeModal(); app.startQuest('${qState.gradeId}', '${qState.strandId}', '${qState.topicId || 'all'}', ${qState.questions.length}, ${Boolean(qState.isHeroMode)})">🔄 Battle Again</button>
          </div>
        </div>
      </div>`;
  }

  openProfileModal() {
    window.soundEngine.playTap();
    const activeProf = this.getActiveProfile();
    const modalRoot = document.getElementById('modal-root');

    const profilesListHtml = this.state.profiles.map(p => {
      const isSelected = p.id === activeProf.id;
      const gObj = window.CANADIAN_GRADES.find(g => g.id === p.selectedGrade) || window.CANADIAN_GRADES[0];
      return `
        <button type="button" class="profile-row-btn ${isSelected ? 'active-prof' : ''}" onclick="app.switchProfile('${p.id}')">
          <span class="prof-row-avatar">${p.avatar}</span>
          <div class="prof-row-info">
            <div class="prof-row-name">${p.name} ${isSelected ? '✅' : ''}</div>
            <div class="prof-row-meta">${gObj.name} • ⭐ ${p.stars || 0} Stars • 🏅 ${(p.stickers || []).length} Stickers</div>
          </div>
        </button>`;
    }).join('');

    const avatarChoicesHtml = AVATAR_OPTIONS.map((av, idx) => `
      <label class="avatar-radio-label">
        <input type="radio" name="newProfAvatar" value="${av}" ${idx === 0 ? 'checked' : ''} />
        <span>${av}</span>
      </label>
    `).join('');

    const gradeOptionsHtml = window.CANADIAN_GRADES.map(g => `
      <option value="${g.id}">${g.name} (${g.ageRange})</option>
    `).join('');

    modalRoot.innerHTML = `
      <div class="modal-backdrop" onclick="if(event.target===this) app.closeModal()">
        <div class="modal-card">
          <div class="modal-header">
            <h3>🎒 Switch or Add Learner Profile</h3>
            <button type="button" class="btn-close-icon" onclick="app.closeModal()">✕</button>
          </div>
          <div class="profiles-list">${profilesListHtml}</div>
          <hr class="modal-divider"/>
          <h4 class="form-section-title">➕ Add New Explorer</h4>
          <div class="new-profile-form">
            <input type="text" id="new-prof-name" class="kid-input" placeholder="Child's First Name (e.g., Chloe)" maxlength="20" />
            <div class="avatar-picker-grid">${avatarChoicesHtml}</div>
            <select id="new-prof-grade" class="kid-select">${gradeOptionsHtml}</select>
            <button type="button" class="btn-primary-lg full-width" onclick="app.handleCreateProfileSubmit()">Create Explorer Profile</button>
          </div>
        </div>
      </div>`;
  }

  handleCreateProfileSubmit() {
    const nameInput = document.getElementById('new-prof-name');
    const gradeSelect = document.getElementById('new-prof-grade');
    const checkedAvatar = document.querySelector('input[name="newProfAvatar"]:checked');
    this.createNewProfile(
      nameInput ? nameInput.value : 'Explorer',
      checkedAvatar ? checkedAvatar.value : '🦫',
      gradeSelect ? gradeSelect.value : 'K'
    );
  }

  closeModal() {
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) modalRoot.innerHTML = '';
  }

  renderHeaderBar() {
    const headerEl = document.getElementById('app-header-bar');
    if (!headerEl) return;
    const prof = this.getActiveProfile();
    const gradeObj = this.getActiveGradeObj();

    headerEl.innerHTML = `
      <div class="header-left">
        <button type="button" class="brand-logo-btn" onclick="app.setView('home')" title="Home Adventure Map">
          <span class="brand-maple">🍁</span>
          <div class="brand-titles">
            <span class="brand-main">Maple Math Quest</span>
            <span class="brand-sub">Canadian K–6 Offline Edition</span>
          </div>
        </button>
      </div>

      <div class="header-center">
        <button type="button" class="grade-pill-selector" style="border-color:${gradeObj.color}" onclick="app.setView('grades')">
          <span class="grade-pill-mascot">${gradeObj.mascot}</span>
          <div class="grade-pill-text">
            <span class="grade-pill-label">Grade Level</span>
            <strong class="grade-pill-name">${gradeObj.name} ▾</strong>
          </div>
        </button>
      </div>

      <div class="header-right">
        <div class="star-counter-pill" onclick="app.setView('stickers')" title="View Sticker Book">
          <span>⭐</span>
          <strong>${prof.stars || 0}</strong>
        </div>

        <button type="button" class="icon-toggle-btn ${this.state.voiceEnabled ? 'on' : 'off'}"
          onclick="app.toggleVoice()" title="Toggle Offline Voice Read-Aloud">
          ${this.state.voiceEnabled ? '🗣️' : '🔇'}
        </button>

        <button type="button" class="icon-toggle-btn ${this.state.soundEnabled ? 'on' : 'off'}"
          onclick="app.toggleSound()" title="Toggle Sound Effects">
          ${this.state.soundEnabled ? '🔊' : '🔈'}
        </button>

        <button type="button" class="profile-chip-btn" onclick="app.openProfileModal()">
          <span class="chip-avatar">${prof.avatar}</span>
          <span class="chip-name">${prof.name}</span>
        </button>
      </div>`;
  }

  renderBottomNav() {
    const navEl = document.getElementById('app-bottom-nav');
    if (!navEl) return;
    const tabs = [
      { id: 'home', icon: '🗺️', label: 'Adventure Map' },
      { id: 'hero', icon: '⚡', label: 'MathHero' },
      { id: 'grades', icon: '🎓', label: 'Grades (K–6)' },
      { id: 'lab', icon: '🧮', label: 'Math Lab' },
      { id: 'stickers', icon: '🏅', label: 'Stickers' },
      { id: 'dashboard', icon: '📈', label: 'Grown-Ups' }
    ];

    navEl.innerHTML = tabs.map(t => `
      <button type="button" class="bottom-nav-btn ${this.currentView === t.id ? 'active' : ''}"
        onclick="app.setView('${t.id}')">
        <span class="bnav-icon">${t.icon}</span>
        <span class="bnav-label">${t.label}</span>
      </button>
    `).join('');
  }

  render() {
    document.body.classList.toggle('quest-active', this.currentView === 'quest');
    this.renderHeaderBar();
    this.renderBottomNav();

    const mainEl = document.getElementById('app-main-content');
    if (!mainEl) return;

    switch (this.currentView) {
      case 'hero':
        mainEl.innerHTML = this.getHeroArenaViewHtml();
        break;
      case 'grades':
        mainEl.innerHTML = this.getGradesViewHtml();
        break;
      case 'quest':
        this.renderQuestScreen();
        break;
      case 'stickers':
        mainEl.innerHTML = this.getStickersViewHtml();
        break;
      case 'lab':
        mainEl.innerHTML = this.getMathLabViewHtml();
        break;
      case 'dashboard':
        mainEl.innerHTML = this.getParentDashboardHtml();
        break;
      case 'home':
      default:
        mainEl.innerHTML = this.getHomeMapHtml();
        break;
    }
  }

  getHomeMapHtml() {
    const prof = this.getActiveProfile();
    const gradeObj = this.getActiveGradeObj();
    const suit = window.MathHeroEngine ? window.MathHeroEngine.getSuit(prof.heroSuitId || 'maple_blaze') : { icon: '🦸‍♂️', name: 'Captain Maple Blaze' };
    const rankInfo = window.MathHeroEngine ? window.MathHeroEngine.getHeroRank(prof.heroXp || 0) : { current: { badge: '🥉', title: 'Rookie Math Ranger' } };

    const strandCardsHtml = window.CURRICULUM_STRANDS.map((strand, idx) => {
      const progKey = `${gradeObj.id}_${strand.id}`;
      const prog = prof.progress[progKey] || { stars: 0, completed: 0 };
      const starDisplay = '⭐'.repeat(prog.stars) + '☆'.repeat(3 - prog.stars);

      return `
        <div class="strand-quest-card h-snap-card" style="border-color: ${strand.color};" onclick="app.openTopicSelector('${gradeObj.id}', '${strand.id}')">
          <div class="strand-step-badge" style="background: ${strand.color}">Stop ${idx + 1} • ${strand.code}</div>
          <div class="strand-card-body">
            <div class="strand-icon-circle" style="background: ${strand.badgeBg}">${strand.icon}</div>
            <div class="strand-info">
              <h3 class="strand-title">${strand.name}</h3>
              <p class="strand-desc">${strand.subtitle}</p>
              <div class="strand-meta-row">
                <span class="strand-stars" aria-label="${prog.stars} out of 3 stars">${starDisplay}</span>
                <span class="strand-completed-pill">${prog.completed > 0 ? `Played ${prog.completed}×` : 'New!'}</span>
              </div>
            </div>
            <button type="button" class="strand-play-btn" style="background: ${strand.color}">
              Play ▶
            </button>
          </div>
        </div>`;
    }).join('');

    return `
      <section class="view-container mobile-fit-view">
        <div class="hero-region-banner" style="background: ${gradeObj.bgGradient}">
          <div class="hero-mascot-bubble">${gradeObj.mascot}</div>
          <div class="hero-banner-text">
            <div class="hero-division-tag">🇨🇦 ${gradeObj.division} • ${gradeObj.ageRange}</div>
            <h1 class="hero-grade-title">${gradeObj.name}</h1>
            <p class="hero-grade-desc">${gradeObj.regionTheme}</p>
          </div>
          <button type="button" class="hero-change-grade-btn" onclick="app.setView('grades')">
            Grade 🎓
          </button>
        </div>

        <!-- Compact MathHero Action Strip -->
        <div class="mathhero-promo-banner" onclick="app.setView('hero')">
          <div class="mh-promo-left">
            <div class="mh-promo-avatar">${suit.icon}<span>⚡</span></div>
            <div class="mh-promo-text">
              <div class="mh-promo-tag">${rankInfo.current.badge} ${prof.heroXp || 0} XP</div>
              <h2 class="mh-promo-title">⚡ MathHero Battle</h2>
              <p class="mh-promo-sub">Blast bosses with ${suit.name}!</p>
            </div>
          </div>
          <button type="button" class="mh-promo-btn">Battle ▶</button>
        </div>

        <div class="strands-trail-header">
          <h2>🧭 Pick a Math Trail</h2>
          <span class="swipe-hint-pill">← Swipe →</span>
        </div>

        <div class="strands-trail-grid h-carousel">
          ${strandCardsHtml}
        </div>
      </section>`;
  }

  getHeroArenaViewHtml() {
    const prof = this.getActiveProfile();
    const gradeObj = this.getActiveGradeObj();
    const activeSuitId = prof.heroSuitId || this.heroConfig.suitId || 'maple_blaze';
    const activeSuit = window.MathHeroEngine.getSuit(activeSuitId);
    const rankInfo = window.MathHeroEngine.getHeroRank(prof.heroXp || 0);

    const suitsHtml = window.HERO_SUITS.map(s => {
      const selected = s.id === activeSuitId;
      return `
        <button type="button" class="hero-suit-card h-snap-chip ${selected ? 'selected-suit' : ''}"
          style="border-color: ${selected ? s.color : 'var(--border-soft)'}"
          onclick="app.selectHeroSuit('${s.id}')">
          <div class="suit-card-emoji" style="background: ${s.bgGlow}">${s.icon}</div>
          <div class="suit-card-name">${s.name}</div>
          <div class="suit-card-desc">${s.badge}</div>
        </button>`;
    }).join('');

    const bossesHtml = window.MATH_BOSSES.map(b => {
      const selected = b.id === this.heroConfig.bossId;
      return `
        <button type="button" class="hero-boss-card h-snap-chip ${selected ? 'selected-boss' : ''}"
          style="border-color: ${selected ? b.color : 'var(--border-soft)'}"
          onclick="app.selectHeroBoss('${b.id}')">
          <div class="boss-card-emoji">${b.icon}</div>
          <div class="boss-card-name">${b.name}</div>
          <div class="boss-card-title">${b.title}</div>
        </button>`;
    }).join('');

    const strandPillsHtml = [
      { id: 'all', icon: '🎲', name: 'All Mix' },
      ...window.CURRICULUM_STRANDS
    ].map(st => {
      const selected = st.id === this.heroConfig.strandId;
      return `
        <button type="button" class="hero-strand-pill ${selected ? 'active' : ''}"
          onclick="app.selectHeroStrand('${st.id}')">
          ${st.icon} ${st.name}
        </button>`;
    }).join('');

    return `
      <section class="view-container mobile-fit-view">
        <div class="hero-arena-header-card">
          <div class="hero-showcase-avatar" style="background: ${activeSuit.bgGlow}; border-color: ${activeSuit.color}">
            <span class="showcase-main">${activeSuit.icon}</span>
            <span class="showcase-badge">${activeSuit.badge}</span>
          </div>
          <div class="hero-showcase-info">
            <div class="hero-rank-pill">${rankInfo.current.badge} ${prof.heroXp || 0} XP • 🏆 ${prof.bossesDefeated || 0} Wins</div>
            <h1>⚡ MathHero (${gradeObj.name})</h1>
          </div>
          <button type="button" class="btn-launch-hero-giant" onclick="app.launchHeroArenaBattle()">
            ⚡ BATTLE! ▶
          </button>
        </div>

        <div class="hero-builder-section">
          <h2>1️⃣ Hero Suit <span class="swipe-hint-inline">← Swipe →</span></h2>
          <div class="hero-suits-grid h-carousel-row">${suitsHtml}</div>
        </div>

        <div class="hero-builder-section">
          <h2>2️⃣ Boss <span class="swipe-hint-inline">← Swipe →</span></h2>
          <div class="hero-bosses-grid h-carousel-row">${bossesHtml}</div>
        </div>

        <div class="hero-builder-section">
          <h2>3️⃣ Topic & Strikes</h2>
          <div class="hero-strand-pills-row h-carousel-row">${strandPillsHtml}</div>
          <div class="hero-length-row">
            ${[5, 10, 15].map(n => `
              <button type="button" class="hero-len-btn ${this.heroConfig.questionCount === n ? 'active' : ''}"
                onclick="app.selectHeroLength(${n})">
                ⚡ ${n} Strikes
              </button>
            `).join('')}
          </div>
        </div>
      </section>`;
  }

  selectHeroSuit(suitId) {
    const prof = this.getActiveProfile();
    prof.heroSuitId = suitId;
    this.heroConfig.suitId = suitId;
    this.saveState();
    window.soundEngine.playHeroLaser();
    this.render();
  }

  selectHeroBoss(bossId) {
    this.heroConfig.bossId = bossId;
    window.soundEngine.playPop();
    this.render();
  }

  selectHeroStrand(strandId) {
    this.heroConfig.strandId = strandId;
    window.soundEngine.playTap();
    this.render();
  }

  selectHeroLength(len) {
    this.heroConfig.questionCount = len;
    window.soundEngine.playTap();
    this.render();
  }

  launchHeroArenaBattle() {
    const prof = this.getActiveProfile();
    this.startQuest(
      prof.selectedGrade || 'K',
      this.heroConfig.strandId || 'all',
      'all',
      this.heroConfig.questionCount || 5,
      true,
      this.heroConfig.bossId || 'boss_calc'
    );
  }

  getGradesViewHtml() {
    const prof = this.getActiveProfile();
    const cardsHtml = window.CANADIAN_GRADES.map(g => {
      const isSelected = g.id === prof.selectedGrade;
      let gradeStars = 0;
      window.CURRICULUM_STRANDS.forEach(s => {
        gradeStars += (prof.progress[`${g.id}_${s.id}`]?.stars || 0);
      });

      return `
        <div class="grade-select-card h-snap-card ${isSelected ? 'selected-grade-card' : ''}"
          style="background: ${g.bgGradient}; border-color: ${g.color}"
          onclick="app.selectGrade('${g.id}')">
          <div class="grade-card-top">
            <span class="grade-card-mascot">${g.mascot}</span>
            <span class="grade-card-stars">⭐ ${gradeStars} / 15</span>
          </div>
          <div class="grade-card-division">${g.division} • ${g.ageRange}</div>
          <h3 class="grade-card-title">${g.name}</h3>
          <div class="grade-card-region">📍 ${g.regionTheme}</div>
          <p class="grade-card-desc">${g.description}</p>
          <button type="button" class="grade-choose-btn" style="background: ${g.color}">
            ${isSelected ? '✓ Currently Exploring' : `Explore ${g.name}`}
          </button>
        </div>`;
    }).join('');

    return `
      <section class="view-container mobile-fit-view">
        <div class="section-heading-box">
          <h1>🇨🇦 Pick Your Grade (K–6)</h1>
          <p>Swipe to choose your Canadian Grade level <span class="swipe-hint-inline">← Swipe →</span></p>
        </div>
        <div class="grades-selection-grid h-carousel">
          ${cardsHtml}
        </div>
      </section>`;
  }

  renderQuestScreen() {
    const mainEl = document.getElementById('app-main-content');
    const qState = this.activeQuest;
    if (!mainEl || !qState) return;

    const currentQ = qState.questions[qState.currentIndex];
    const progressPct = Math.round(((qState.currentIndex + (qState.answeredCurrent ? 1 : 0)) / qState.questions.length) * 100);
    const manipulativeHtml = window.ManipulativesRenderer.render(currentQ.visual);
    const heroStageHtml = (qState.isHeroMode && window.MathHeroEngine)
      ? `<div id="hero-stage-mount">${window.MathHeroEngine.renderBattleStage(qState)}</div>`
      : '';

    const choicesHtml = currentQ.choices.map(ch => {
      let btnStateClass = '';
      if (qState.answeredCurrent && String(ch.value) === String(currentQ.correctValue)) {
        btnStateClass = 'choice-correct';
      }
      return `
        <button type="button" class="choice-giant-btn ${qState.isHeroMode ? 'choice-hero-btn' : ''} ${btnStateClass}"
          ${qState.answeredCurrent ? 'disabled' : ''}
          onclick="app.submitAnswer('${ch.value.replace(/'/g, "\\'")}', this)">
          ${qState.isHeroMode ? '<span class="strike-bolt">⚡</span> ' : ''}${ch.label}
        </button>`;
    }).join('');

    mainEl.innerHTML = `
      <section class="view-container quest-play-container">
        <div class="quest-top-bar">
          <button type="button" class="btn-back-map" onclick="app.setView('${qState.isHeroMode ? 'hero' : 'home'}')">← Exit</button>
          <div class="quest-progress-wrapper">
            <div class="quest-progress-labels">
              <span>${qState.gradeObj.mascot} ${qState.gradeObj.name} • ${qState.strandObj.name}</span>
              <span>${qState.isHeroMode ? 'Strike' : 'Question'} ${qState.currentIndex + 1} of ${qState.questions.length}</span>
            </div>
            <div class="quest-progress-bar">
              <div class="quest-progress-fill" style="width: ${progressPct}%; background: ${qState.strandObj.color}"></div>
            </div>
          </div>
          <span class="standard-code-pill">${currentQ.standardCode}</span>
        </div>

        ${heroStageHtml}

        <div class="question-stage-card ${qState.isHeroMode ? 'hero-question-card' : ''}">
          <div class="question-prompt-row">
            <button type="button" class="btn-speak-prompt" onclick="window.soundEngine.speak('${currentQ.prompt.replace(/'/g, "\\'")}')" title="Read Question Aloud">
              🔊
            </button>
            <h2 class="question-prompt-text">${currentQ.prompt}</h2>
            <button type="button" class="btn-hint-pill" onclick="app.showQuestHint()">
              ${qState.isHeroMode ? '🛡️ Hero Scanner' : '💡 Hint'}
            </button>
          </div>

          <div class="manipulative-stage">
            ${manipulativeHtml}
          </div>

          <div class="choices-grid-2x2">
            ${choicesHtml}
          </div>

          <div id="quest-feedback-banner" class="quest-feedback-banner ${qState.feedbackType ? 'feedback-' + qState.feedbackType : 'hidden'}">
            <div class="feedback-text">${qState.feedbackMessage}</div>
            ${qState.answeredCurrent ? `
              <button type="button" class="btn-next-question" onclick="app.nextQuestion()">
                ${qState.currentIndex + 1 < qState.questions.length ? (qState.isHeroMode ? 'Next Strike ⚡➔' : 'Next Question ➔') : (qState.isHeroMode ? 'Claim Hero Victory! 🏆' : 'Finish Quest 🎉')}
              </button>
            ` : ''}
          </div>
        </div>
      </section>`;
  }

  showQuestHint() {
    const qState = this.activeQuest;
    if (!qState) return;
    const currentQ = qState.questions[qState.currentIndex];
    window.soundEngine.playPop();
    window.soundEngine.speak(currentQ.hint);
    const modalRoot = document.getElementById('modal-root');
    if (modalRoot) {
      modalRoot.innerHTML = `
        <div class="modal-backdrop" onclick="if(event.target===this) app.closeModal()">
          <div class="modal-card hint-overlay-card">
            <div class="modal-header">
              <h3>${qState.isHeroMode ? '🛡️ Hero Scanner Tip' : '💡 Helper Tip'}</h3>
              <button type="button" class="btn-close-icon" onclick="app.closeModal()">✕</button>
            </div>
            <p class="hint-overlay-text">${currentQ.hint}</p>
            <button type="button" class="btn-primary-lg full-width" onclick="app.closeModal()">Got It! 👍🏻</button>
          </div>
        </div>`;
    }
  }

  getMathLabViewHtml() {
    const ls = this.labState;
    let activeToolHtml = '';

    if (ls.tool === 'ten-frame') {
      const sum = ls.tfCountA + ls.tfCountB;
      activeToolHtml = `
        <div class="lab-controls-bar">
          <div class="lab-control-group">
            <span>🍁 Red Leaves: <strong>${ls.tfCountA}</strong></span>
            <button type="button" class="lab-step-btn" onclick="app.updateLabTenFrame('A', -1)">−</button>
            <button type="button" class="lab-step-btn" onclick="app.updateLabTenFrame('A', 1)">+</button>
          </div>
          <div class="lab-control-group">
            <span>🌼 Yellow Flowers: <strong>${ls.tfCountB}</strong></span>
            <button type="button" class="lab-step-btn" onclick="app.updateLabTenFrame('B', -1)">−</button>
            <button type="button" class="lab-step-btn" onclick="app.updateLabTenFrame('B', 1)">+</button>
          </div>
          <div class="lab-total-pill">Total: ${ls.tfCountA} + ${ls.tfCountB} = <strong>${sum}</strong></div>
        </div>
        ${window.ManipulativesRenderer.renderTenFrame({
          countA: ls.tfCountA,
          countB: ls.tfCountB,
          capacity: 20,
          emojiA: '🍁',
          emojiB: '🌼',
          showEquation: `${ls.tfCountA} + ${ls.tfCountB} = ${sum}`
        })}`;
    } else if (ls.tool === 'base-ten') {
      const total = ls.b10Hundreds * 100 + ls.b10Tens * 10 + ls.b10Ones;
      activeToolHtml = `
        <div class="lab-controls-bar">
          <div class="lab-control-group">
            <span>Hundreds: <strong>${ls.b10Hundreds}</strong></span>
            <button type="button" class="lab-step-btn" onclick="app.updateLabBase10('H', -1)">−</button>
            <button type="button" class="lab-step-btn" onclick="app.updateLabBase10('H', 1)">+</button>
          </div>
          <div class="lab-control-group">
            <span>Tens: <strong>${ls.b10Tens}</strong></span>
            <button type="button" class="lab-step-btn" onclick="app.updateLabBase10('T', -1)">−</button>
            <button type="button" class="lab-step-btn" onclick="app.updateLabBase10('T', 1)">+</button>
          </div>
          <div class="lab-control-group">
            <span>Ones: <strong>${ls.b10Ones}</strong></span>
            <button type="button" class="lab-step-btn" onclick="app.updateLabBase10('O', -1)">−</button>
            <button type="button" class="lab-step-btn" onclick="app.updateLabBase10('O', 1)">+</button>
          </div>
          <div class="lab-total-pill">Value = <strong>${total}</strong></div>
        </div>
        ${window.ManipulativesRenderer.renderBaseTen({
          hundreds: ls.b10Hundreds,
          tens: ls.b10Tens,
          ones: ls.b10Ones,
          label: `${ls.b10Hundreds * 100} + ${ls.b10Tens * 10} + ${ls.b10Ones} = ${total}`
        })}`;
    } else {
      const valMap = { nickel: 5, dime: 10, quarter: 25, loonie: 100, toonie: 200, bill5: 500, bill10: 1000 };
      const totalCents = ls.coinTray.reduce((acc, k) => acc + (valMap[k] || 0), 0);
      const formattedTotal = totalCents >= 100 ? `$${(totalCents / 100).toFixed(2)}` : `${totalCents}¢`;
      activeToolHtml = `
        <div class="lab-controls-bar">
          <button type="button" class="lab-coin-add-btn" onclick="app.addLabCoin('nickel')">+ 5¢ Nickel</button>
          <button type="button" class="lab-coin-add-btn" onclick="app.addLabCoin('dime')">+ 10¢ Dime</button>
          <button type="button" class="lab-coin-add-btn" onclick="app.addLabCoin('quarter')">+ 25¢ Quarter</button>
          <button type="button" class="lab-coin-add-btn" onclick="app.addLabCoin('loonie')">+ $1 Loonie</button>
          <button type="button" class="lab-coin-add-btn" onclick="app.addLabCoin('toonie')">+ $2 Toonie</button>
          <button type="button" class="lab-coin-add-btn" onclick="app.addLabCoin('bill5')">+ $5 Bill</button>
          <button type="button" class="lab-coin-clear-btn" onclick="app.clearLabCoins()">🗑️ Clear Tray</button>
          <div class="lab-total-pill">Total = <strong>${formattedTotal}</strong></div>
        </div>
        ${window.ManipulativesRenderer.renderCanadianMoney({
          coins: ls.coinTray,
          promptLabel: `Canadian Money Bank Total: ${formattedTotal}`
        })}`;
    }

    return `
      <section class="view-container">
        <div class="section-heading-box">
          <h1>🧮 Hands-On Canadian Math Manipulatives Lab</h1>
          <p>Free-play workspace for children, parents, and teachers to explore numbers visually!</p>
        </div>
        <div class="lab-tool-switcher">
          <button type="button" class="lab-tab-btn ${ls.tool === 'ten-frame' ? 'active' : ''}" onclick="app.setLabTool('ten-frame')">🔟 Double Ten-Frame</button>
          <button type="button" class="lab-tab-btn ${ls.tool === 'base-ten' ? 'active' : ''}" onclick="app.setLabTool('base-ten')">🧱 Base-10 Blocks</button>
          <button type="button" class="lab-tab-btn ${ls.tool === 'coins' ? 'active' : ''}" onclick="app.setLabTool('coins')">🪙 Canadian Money Bank</button>
        </div>
        <div class="lab-workspace-card">
          ${activeToolHtml}
        </div>
      </section>`;
  }

  setLabTool(tool) {
    window.soundEngine.playTap();
    this.labState.tool = tool;
    this.render();
  }

  updateLabTenFrame(which, delta) {
    window.soundEngine.playPop();
    if (which === 'A') {
      this.labState.tfCountA = Math.max(0, Math.min(10, this.labState.tfCountA + delta));
    } else {
      this.labState.tfCountB = Math.max(0, Math.min(10, this.labState.tfCountB + delta));
    }
    this.render();
  }

  updateLabBase10(place, delta) {
    window.soundEngine.playPop();
    if (place === 'H') this.labState.b10Hundreds = Math.max(0, Math.min(4, this.labState.b10Hundreds + delta));
    if (place === 'T') this.labState.b10Tens = Math.max(0, Math.min(9, this.labState.b10Tens + delta));
    if (place === 'O') this.labState.b10Ones = Math.max(0, Math.min(9, this.labState.b10Ones + delta));
    this.render();
  }

  addLabCoin(coinKey) {
    window.soundEngine.playCoin();
    if (this.labState.coinTray.length < 14) {
      this.labState.coinTray.push(coinKey);
      this.render();
    }
  }

  clearLabCoins() {
    window.soundEngine.playTap();
    this.labState.coinTray = [];
    this.render();
  }

  getStickersViewHtml() {
    const prof = this.getActiveProfile();
    const unlockedIds = prof.stickers || [];

    const cardsHtml = window.CANADIAN_STICKERS.map(stk => {
      const isUnlocked = unlockedIds.includes(stk.id);
      return `
        <div class="sticker-badge-card h-snap-card ${isUnlocked ? 'unlocked' : 'locked'}"
          onclick="window.soundEngine.playPop(); if(${isUnlocked}) window.soundEngine.speak('${stk.name}. ${stk.desc}')">
          <div class="sticker-icon-wrap">${isUnlocked ? stk.icon : '🔒'}</div>
          <h3 class="sticker-name">${stk.name}</h3>
          <p class="sticker-desc">${stk.desc}</p>
          <span class="sticker-status-pill">${isUnlocked ? '✨ Collected!' : 'Keep Exploring'}</span>
        </div>`;
    }).join('');

    return `
      <section class="view-container mobile-fit-view">
        <div class="section-heading-box">
          <h1>🏅 ${prof.name}'s Sticker Book</h1>
          <p><strong>${unlockedIds.length} / ${window.CANADIAN_STICKERS.length}</strong> Stickers • ⭐ <strong>${prof.stars || 0}</strong> <span class="swipe-hint-inline">← Swipe →</span></p>
        </div>
        <div class="stickers-book-grid h-carousel">
          ${cardsHtml}
        </div>
      </section>`;
  }

  getParentDashboardHtml() {
    const prof = this.getActiveProfile();

    const rowsHtml = window.CANADIAN_GRADES.map(g => {
      const strandCells = window.CURRICULUM_STRANDS.map(s => {
        const p = prof.progress[`${g.id}_${s.id}`] || { stars: 0, completed: 0, correct: 0, attempted: 0 };
        const acc = p.attempted > 0 ? Math.round((p.correct / p.attempted) * 100) : null;
        return `
          <td class="matrix-cell ${p.completed > 0 ? 'cell-active' : ''}">
            <div class="matrix-stars">${'⭐'.repeat(p.stars)}${'☆'.repeat(3 - p.stars)}</div>
            <div class="matrix-acc">${acc !== null ? `${acc}% (${p.correct}/${p.attempted})` : 'Not started'}</div>
          </td>`;
      }).join('');

      return `
        <tr>
          <td class="matrix-grade-col">
            <strong>${g.mascot} ${g.name}</strong>
            <span>${g.ageRange}</span>
          </td>
          ${strandCells}
        </tr>`;
    }).join('');

    return `
      <section class="view-container">
        <div class="section-heading-box">
          <h1>📈 Parent & Teacher Curriculum Mastery Report</h1>
          <p>Viewing offline progress for <strong>${prof.avatar} ${prof.name}</strong> across the Pan-Canadian / Ontario 2020 K–6 Math Strands.</p>
        </div>

        <div class="dashboard-kpi-row">
          <div class="kpi-card">
            <span class="kpi-label">Total Stars Earned</span>
            <strong class="kpi-value">⭐ ${prof.stars || 0}</strong>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Best Answer Streak</span>
            <strong class="kpi-value">🔥 ${prof.bestStreak || 0} in a row</strong>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Stickers Earned</span>
            <strong class="kpi-value">🏅 ${(prof.stickers || []).length} / ${window.CANADIAN_STICKERS.length}</strong>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">Current Grade Focus</span>
            <strong class="kpi-value">🎓 Grade: ${prof.selectedGrade}</strong>
          </div>
        </div>

        <div class="matrix-table-wrapper">
          <table class="curriculum-matrix-table">
            <thead>
              <tr>
                <th>Canadian Grade</th>
                ${window.CURRICULUM_STRANDS.map(s => `<th>${s.icon} ${s.name}<br/><small>${s.code}</small></th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </section>`;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.app = new MapleMathApp();
  window.app.init();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
});
