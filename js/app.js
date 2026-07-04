/* =========================================================
   ILM ADVENTURE — app logic
   Now supports TWO exams (Islamic Studies + Tajweed).
   The learner picks an exam with the tabs on the home screen;
   each exam keeps its own chapters, track, final quiz and games.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- tiny helpers ---------- */
  const $  = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* Wrap runs of Arabic letters in a <span class="ar"> so they render
     big and clear with the right (right-to-left) direction. Always
     escape first, then wrap — Arabic characters are never HTML-special. */
  const AR_RUN = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿][؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿\s]*/g;
  const rich = (s) => esc(s).replace(AR_RUN, (m) => {
    const trimmed = m.replace(/\s+$/, "");
    const trail = m.slice(trimmed.length);
    return `<span class="ar">${trimmed}</span>${trail}`;
  });

  /* ---------- saved progress ---------- */
  const STORE_KEY = "ilmAdventure.v1";
  const emptyExam = () => ({ modules: {}, final: null, games: {}, memoryBest: null });
  const defaultState = () => ({
    name: "",
    sound: true,
    currentExam: "islamic",
    exams: {}      // examId -> { modules, final, games, memoryBest }
  });
  let state = load();

  function load() {
    let s = null;
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) s = JSON.parse(raw);
    } catch (e) { /* ignore */ }
    if (!s) return defaultState();
    s = Object.assign(defaultState(), s);
    if (!s.exams) s.exams = {};
    // migrate the old (single-exam) save shape into exams.islamic
    if (s.modules || s.final || s.games || s.bestMoves != null) {
      const isl = s.exams.islamic || emptyExam();
      if (s.modules) isl.modules = Object.assign(isl.modules || {}, s.modules);
      if (s.final && !isl.final) isl.final = s.final;
      if (s.games) isl.games = Object.assign(isl.games || {}, s.games);
      if (s.bestMoves != null && isl.memoryBest == null) isl.memoryBest = s.bestMoves;
      s.exams.islamic = isl;
      delete s.modules; delete s.final; delete s.games; delete s.bestMoves;
    }
    if (!s.currentExam) s.currentExam = "islamic";
    return s;
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  /* ---------- exams ---------- */
  const EXAMS = APP_DATA.exams;
  let MODULES = [];                       // chapters of the current exam

  function curExam() { return EXAMS.find((e) => e.id === state.currentExam) || EXAMS[0]; }
  function P() {                          // progress bucket for the current exam
    const id = curExam().id;
    if (!state.exams[id]) state.exams[id] = emptyExam();
    return state.exams[id];
  }
  function examProgress(id) { return state.exams[id] || emptyExam(); }
  function setExam(id) {
    if (!EXAMS.some((e) => e.id === id)) return;
    state.currentExam = id;
    MODULES = curExam().modules;
    save();
  }
  function examDoneCount(ex) {
    const p = examProgress(ex.id);
    return ex.modules.filter((m) => p.modules[m.id] && p.modules[m.id].done).length;
  }
  function allChaptersDone() {
    const p = P();
    return MODULES.every((m) => p.modules[m.id] && p.modules[m.id].done);
  }

  /* ---------- sound (Web Audio, no files needed) ---------- */
  let audioCtx = null;
  function beep(freq, dur, type, when, vol) {
    if (!state.sound) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const t = audioCtx.currentTime + (when || 0);
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type || "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(vol || 0.18, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(gain).connect(audioCtx.destination);
      osc.start(t); osc.stop(t + dur + 0.02);
    } catch (e) { /* ignore */ }
  }
  const sfx = {
    click:   () => beep(520, 0.08, "triangle"),
    correct: () => { beep(660, 0.12, "sine"); beep(880, 0.16, "sine", 0.1); },
    wrong:   () => beep(200, 0.25, "sawtooth", 0, 0.12),
    flip:    () => beep(440, 0.06, "sine"),
    match:   () => { beep(700, 0.1, "sine"); beep(1040, 0.14, "sine", 0.08); },
    win:     () => { [523, 659, 784, 1047].forEach((f, i) => beep(f, 0.22, "triangle", i * 0.12, 0.18)); }
  };

  /* ---------- sparkle background ---------- */
  function makeSparkles() {
    const layer = $("#sparkle-layer");
    const glyphs = ["✨", "⭐", "🌟", "💫", "🌸", "💖", "🦋"];
    for (let i = 0; i < 16; i++) {
      const s = el("span", "sparkle", glyphs[i % glyphs.length]);
      s.style.left = Math.random() * 100 + "vw";
      s.style.fontSize = (12 + Math.random() * 20) + "px";
      s.style.animationDuration = (9 + Math.random() * 10) + "s";
      s.style.animationDelay = (-Math.random() * 12) + "s";
      layer.appendChild(s);
    }
  }

  /* ---------- confetti ---------- */
  function confetti(amount) {
    const layer = $("#confetti-layer");
    const colors = ["#ff77c8", "#9b5de5", "#ffd45e", "#38d39f", "#6bd5ff", "#ff6b8a"];
    for (let i = 0; i < (amount || 80); i++) {
      const c = el("span", "confetti");
      c.style.left = Math.random() * 100 + "vw";
      c.style.background = colors[Math.floor(Math.random() * colors.length)];
      c.style.animationDuration = (1.6 + Math.random() * 1.6) + "s";
      c.style.animationDelay = (Math.random() * 0.4) + "s";
      if (Math.random() > 0.5) c.style.borderRadius = "50%";
      c.style.width = c.style.height = (8 + Math.random() * 8) + "px";
      layer.appendChild(c);
      setTimeout(() => c.remove(), 3600);
    }
  }

  /* ---------- screen switching ---------- */
  function show(screenId) {
    $$(".screen").forEach((s) => s.classList.add("hidden"));
    $("#" + screenId).classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ===================================================
     HEADER
     =================================================== */
  function refreshHeader() {
    $("#app-header").classList.toggle("hidden", !state.name);
    $("#hello-pill").textContent = state.name ? "👧 " + state.name : "";
    $("#star-count").textContent = totalStars();
    $("#sound-btn").textContent = state.sound ? "🔊" : "🔇";
  }
  // all the stars she has earned, across BOTH exams
  function totalStars() {
    let s = 0;
    EXAMS.forEach((ex) => {
      const p = examProgress(ex.id);
      ex.modules.forEach((m) => { if (p.modules[m.id]) s += p.modules[m.id].stars || 0; });
      if (p.final) s += p.final.stars || 0;
    });
    return s;
  }

  /* ===================================================
     WELCOME
     =================================================== */
  function initWelcome() {
    const input = $("#name-input");
    if (state.name) input.value = state.name;
    const go = () => {
      const name = input.value.trim();
      if (!name) { input.focus(); input.placeholder = "Please type your name 😊"; return; }
      state.name = name; save(); sfx.win(); confetti(60);
      refreshHeader(); goHome();
    };
    $("#start-btn").addEventListener("click", go);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
  }

  /* ===================================================
     HOME  (exam tabs + track + module cards + fun zone)
     =================================================== */
  function goHome() {
    if (!EXAMS.some((e) => e.id === state.currentExam)) state.currentExam = EXAMS[0].id;
    MODULES = curExam().modules;
    $("#home-greeting").textContent = "Assalamu Alaikum, " + state.name + "! 🌸";
    renderExamTabs();
    renderTrack();
    renderModuleCards();
    updateFunZone();
    show("screen-home");
    refreshHeader();
  }

  function renderExamTabs() {
    const wrap = $("#exam-tabs");
    if (!wrap) return;
    wrap.innerHTML = "";
    EXAMS.forEach((ex) => {
      const done = examDoneCount(ex);
      const total = ex.modules.length;
      const complete = done === total;
      const tab = el("button", "exam-tab" + (ex.id === state.currentExam ? " active" : ""));
      tab.innerHTML =
        `<span class="et-emoji">${ex.emoji}</span>
         <span class="et-body">
           <span class="et-title">${esc(ex.title)}</span>
           <span class="et-sub">${esc(ex.subtitle)}</span>
         </span>
         <span class="et-badge">${complete ? "✅ Done" : done + "/" + total}</span>`;
      tab.addEventListener("click", () => {
        if (ex.id === state.currentExam) return;
        sfx.click(); setExam(ex.id); goHome();
      });
      wrap.appendChild(tab);
    });
    const tag = $("#exam-blurb");
    if (tag) tag.textContent = curExam().blurb;
  }

  function renderModuleCards() {
    const grid = $("#module-grid");
    grid.innerHTML = "";
    const p = P();
    MODULES.forEach((m, i) => {
      const prog = p.modules[m.id];
      const done = prog && prog.done;
      const card = el("button", "module-card" + (done ? " done" : ""));
      const stars = done ? "⭐".repeat(prog.stars) + "☆".repeat(3 - prog.stars) : "";
      card.innerHTML =
        `<div class="mc-top"><span class="mc-emoji">${m.emoji}</span>
           <div><div class="mc-num">Chapter ${i + 1}</div>
           <div class="mc-title">${esc(m.title)}</div></div></div>
         <p class="mc-tag">${esc(m.tagline)}</p>
         <span class="mc-status">${done
            ? `Done! <span class="mc-stars">${stars}</span>`
            : "Tap to learn ✨"}</span>`;
      card.addEventListener("click", () => { sfx.click(); openModule(m.id); });
      grid.appendChild(card);
    });
  }

  /* keep the three Fun Zone cards in sync with the chosen exam */
  function updateFunZone() {
    const ex = curExam();

    // 1) Memory Match — same game, this exam's word pairs
    const memDesc = $("#game-card-desc");
    if (memDesc) {
      const mb = P().memoryBest;
      memDesc.textContent = mb != null ? `🏅 Best: ${mb} tries` : "Match the words to their meanings!";
    }

    // 2) the exam's signature challenge (order game or sort game)
    const fg = ex.funGame;
    const cEmoji = $("#challenge-emoji");
    const cTitle = $("#challenge-title");
    const cDesc = $("#challenge-desc");
    if (fg && cEmoji && cTitle && cDesc) {
      cEmoji.textContent = fg.emoji;
      cTitle.textContent = fg.title;
      const rec = gameRecord(fg.gameId);
      cDesc.textContent = (rec.solved && rec.bestMoves != null)
        ? `🏅 Best: ${rec.bestMoves} moves · ${fmtTime(rec.bestTime)}`
        : fg.desc;
    }

    // 3) Big Final Quiz
    const finalDesc = $("#final-card-desc");
    const p = P();
    if (finalDesc) {
      if (p.final) {
        finalDesc.textContent = `Best: ${p.final.score}/${p.final.total} ${"⭐".repeat(p.final.stars)}`;
      } else if (allChaptersDone()) {
        finalDesc.textContent = "You unlocked it! Tap to start 🌟";
      } else {
        finalDesc.textContent = "Finish the chapters to power up first!";
      }
    }
  }

  /* ---------- racing track ---------- */
  function renderTrack() {
    const track = $("#track");
    track.innerHTML = "";
    const p = P();

    // checkpoints: start, each module, final, finish
    const points = [{ emoji: "🏁", label: "Start", key: "start" }];
    MODULES.forEach((m) => points.push({ emoji: m.emoji, label: m.short, key: m.id }));
    points.push({ emoji: "🏆", label: "Final Quiz", key: "final" });
    points.push({ emoji: "👑", label: "Finish!", key: "finish" });

    // how far has she got in THIS exam?
    let reached = 0;
    for (let i = 0; i < MODULES.length; i++) {
      if (p.modules[MODULES[i].id] && p.modules[MODULES[i].id].done) reached = i + 1;
    }
    if (allChaptersDone()) reached = MODULES.length + 1;   // at final
    if (p.final) reached = MODULES.length + 2;             // finished!

    points.forEach((pt, i) => {
      const cp = el("div", "checkpoint");
      if (i < reached) cp.classList.add("done");
      if (i === reached) cp.classList.add("current");
      cp.innerHTML =
        `<div class="cp-dot">${pt.emoji}</div>
         <div class="cp-label">${esc(pt.label)}</div>
         ${i < reached && i !== 0 ? '<span class="cp-check">✅</span>' : ""}`;
      track.appendChild(cp);
    });

    // the runner girl, positioned over the current checkpoint
    const runner = el("div", "", "🏃‍♀️");
    runner.id = "runner";
    track.appendChild(runner);
    requestAnimationFrame(() => {
      const cps = $$("#track .checkpoint");
      const target = cps[Math.min(reached, cps.length - 1)];
      if (target) runner.style.left = (target.offsetLeft + target.offsetWidth / 2) + "px";
    });
  }

  function celebrateAdvance() {
    renderTrack();
    const runner = $("#runner");
    if (runner) {
      runner.classList.add("run");
      setTimeout(() => runner.classList.remove("run"), 1400);
    }
  }

  /* ===================================================
     MODULE CONTENT
     =================================================== */
  let currentModule = null;

  function openModule(id) {
    currentModule = MODULES.find((m) => m.id === id);
    const box = $("#module-content");
    box.innerHTML = "";

    const hero = el("div", "module-hero",
      `<div class="mh-emoji">${currentModule.emoji}</div>
       <h2>${esc(currentModule.title)}</h2>
       <p>${esc(currentModule.tagline)}</p>`);
    box.appendChild(hero);

    // render the lesson blocks, but NOT the playable games — those open on
    // their own screen (like the quiz) so the pieces are shuffled fresh.
    currentModule.blocks.forEach((b) => {
      if (b.type !== "ordergame" && b.type !== "sortgame") box.appendChild(renderBlock(b));
    });

    // add a "play the game" button if this chapter has a game
    const actions = $(".module-actions");
    const old = $("#module-game-btn");
    if (old) old.remove();
    const gameBlock = currentModule.blocks.find((b) => b.type === "ordergame" || b.type === "sortgame");
    if (gameBlock) {
      const gBtn = el("button", "big-btn alt-btn", "🎯 Play the Game");
      gBtn.id = "module-game-btn";
      gBtn.onclick = () => {
        sfx.click();
        openGame(gameBlock.type === "sortgame" ? "sort" : "order",
                 currentModule.id, gameBlock.id, currentModule.id);
      };
      actions.appendChild(gBtn);
    }

    $("#module-quiz-btn").onclick = () => { sfx.click(); startQuiz(currentModule); };
    show("screen-module");
  }

  function renderBlock(b) {
    switch (b.type) {
      case "lead":
        return el("p", "lead", rich(b.text));

      case "flipgrid": {
        const grid = el("div", "flip-grid");
        b.cards.forEach((c) => {
          const card = el("button", "flip");
          card.innerHTML =
            `<div class="flip-inner">
               <div class="flip-face flip-front">
                 <span class="fe">${c.emoji}</span>
                 <span class="ft">${esc(c.front)}</span>
                 <span class="fs">${esc(c.sub)}</span>
                 <span class="tap">tap to flip 🔄</span>
               </div>
               <div class="flip-face flip-back">${rich(c.back)}</div>
             </div>`;
          card.addEventListener("click", () => { card.classList.toggle("flipped"); sfx.flip(); });
          grid.appendChild(card);
        });
        return grid;
      }

      /* Arabic flip cards — big Arabic word on the front, the rule on the back */
      case "arflip": {
        const grid = el("div", "flip-grid");
        b.cards.forEach((c) => {
          const card = el("button", "flip arflip");
          card.innerHTML =
            `<div class="flip-inner">
               <div class="flip-face flip-front">
                 <span class="af-ar ar">${esc(c.ar)}</span>
                 ${c.translit ? `<span class="af-tr">${esc(c.translit)}</span>` : ""}
                 ${c.sub ? `<span class="fs">${rich(c.sub)}</span>` : ""}
                 <span class="tap">tap to flip 🔄</span>
               </div>
               <div class="flip-face flip-back">${rich(c.back)}</div>
             </div>`;
          card.addEventListener("click", () => { card.classList.toggle("flipped"); sfx.flip(); });
          grid.appendChild(card);
        });
        return grid;
      }

      /* a group of Arabic letters shown as big tiles (heavy / madd / qalqalah) */
      case "lettertiles": {
        const wrap = el("div", "letter-tiles " + (b.variant || ""));
        if (b.note) wrap.appendChild(el("div", "lt-note", rich(b.note)));
        const grid = el("div", "lt-grid");
        b.tiles.forEach((t) => {
          grid.appendChild(el("div", "lt-tile",
            `<span class="lt-ar ar">${esc(t.ar)}</span>
             <span class="lt-name">${esc(t.name)}</span>
             ${t.sub ? `<span class="lt-sub">${rich(t.sub)}</span>` : ""}`));
        });
        wrap.appendChild(grid);
        return wrap;
      }

      /* the 3 coloured Qalqalah levels */
      case "levels": {
        const wrap = el("div", "levels");
        if (b.title) wrap.appendChild(el("div", "levels-title", rich(b.title)));
        b.items.forEach((it) => {
          wrap.appendChild(el("div", "level-card lv-" + it.color,
            `<div class="lv-badge">${esc(it.name)}</div>
             <div class="lv-ar ar">${esc(it.ar)}</div>
             <div class="lv-desc">${rich(it.desc)}</div>
             ${it.tip ? `<div class="lv-tip">${rich(it.tip)}</div>` : ""}`));
        });
        return wrap;
      }

      case "timeline": {
        const tl = el("div", "timeline");
        b.events.forEach((ev) => {
          const item = el("div", "tl-item",
            `<div class="tl-bullet">${ev.emoji}</div>
             <div class="tl-body">
               <div class="tl-label">${rich(ev.label)}</div>
               <p class="tl-text">${rich(ev.text)}</p>
             </div>`);
          tl.appendChild(item);
        });
        return tl;
      }

      case "flashgrid": {
        const grid = el("div", "flash-grid");
        b.cards.forEach((c) => {
          const card = el("button", "flash");
          card.innerHTML =
            `<div class="flash-inner">
               <div class="flash-face flash-front">
                 <span class="fe">${c.emoji}</span>
                 <span class="fw">${esc(c.when)}</span>
                 <span class="tap">tap to see the dua 🔄</span>
               </div>
               <div class="flash-face flash-back">
                 <div class="translit">${esc(c.translit)}</div>
                 <div class="meaning">${esc(c.meaning)}</div>
               </div>
             </div>`;
          card.addEventListener("click", () => { card.classList.toggle("flipped"); sfx.flip(); });
          grid.appendChild(card);
        });
        return grid;
      }

      case "journey": {
        const wrap = el("div", "journey");
        b.stops.forEach((s) => {
          wrap.appendChild(el("div", "journey-stop",
            `<span class="js-emoji">${s.emoji}</span>
             <div><span class="js-day">${esc(s.day)}</span>
               <div class="js-title">${esc(s.title)}</div>
               <p class="js-text">${rich(s.text)}</p></div>`));
        });
        return wrap;
      }

      case "ordergame":
        return renderOrderGame(b, b.id);

      case "sortgame":
        return renderSortGame(b, b.id);

      case "callout":
        return el("div", "callout",
          `<div class="co-emoji">${b.emoji}</div>
           <div class="co-title">${rich(b.title)}</div>
           <div class="co-text">${rich(b.text)}</div>
           ${b.meaning ? `<div class="co-meaning">${rich(b.meaning)}</div>` : ""}`);

      default:
        return el("div");
    }
  }

  /* ===================================================
     SHARED GAME RECORD (best moves / time), per exam
     =================================================== */
  let gameTimerId = null;

  function fmtTime(ms) {
    const s = Math.max(0, Math.round(ms / 1000));
    const m = Math.floor(s / 60), r = s % 60;
    return m + ":" + (r < 10 ? "0" + r : r);
  }
  function gameRecord(id) {
    const g = P().games;
    let r = g[id];
    if (!r || typeof r !== "object") r = { solved: !!r, bestMoves: null, bestTime: null };
    return r;
  }
  function saveGameRecord(id, moves, elapsed) {
    const r = gameRecord(id);
    const newMoves = (r.bestMoves == null || moves < r.bestMoves);
    const newTime = (r.bestTime == null || elapsed < r.bestTime);
    r.solved = true;
    if (newMoves) r.bestMoves = moves;
    if (newTime) r.bestTime = elapsed;
    P().games[id] = r;
    save();
    return newMoves || newTime;
  }
  function bestText(id) {
    const r = gameRecord(id);
    if (!r.solved || r.bestMoves == null) return "";
    return `🏅 Best: ${r.bestMoves} moves · ${fmtTime(r.bestTime)}`;
  }
  function stopGameClock() { if (gameTimerId) { clearInterval(gameTimerId); gameTimerId = null; } }

  /* ===================================================
     ORDER-THE-STEPS GAME
     =================================================== */
  function renderOrderGame(b, gameId) {
    const n = b.steps.length;
    const wrap = el("div", "order-game");
    wrap.appendChild(el("div", "og-head",
      `<div class="og-title">🎯 ${esc(b.title)}</div>
       <p class="og-intro">${esc(b.intro)}</p>`));

    const stats = el("div", "og-stats",
      `<span class="og-stat">🔄 Moves: <b class="og-moves">0</b></span>
       <span class="og-stat">⏱️ Time: <b class="og-time">0:00</b></span>
       <span class="og-stat og-best">${bestText(gameId)}</span>`);
    wrap.appendChild(stats);
    const movesEl = stats.querySelector(".og-moves");
    const timeEl = stats.querySelector(".og-time");
    const bestEl = stats.querySelector(".og-best");

    const list = el("div", "order-list");
    wrap.appendChild(list);

    const controls = el("div", "og-controls");
    const checkBtn = el("button", "big-btn", "Check my order ✅");
    const shuffleBtn = el("button", "mini-btn", "🔀 Shuffle again");
    controls.appendChild(checkBtn);
    controls.appendChild(shuffleBtn);
    wrap.appendChild(controls);

    const banner = el("div", "og-banner");
    wrap.appendChild(banner);

    const range = () => { const a = []; for (let i = 0; i < n; i++) a.push(i); return a; };
    const isSorted = (a) => a.every((v, i) => v === i);
    function freshOrder() { let a; do { a = shuffle(range()); } while (n > 1 && isSorted(a)); return a; }

    let order = freshOrder();
    let dragFrom = null;
    let moves = 0;
    let startTime = null;

    stopGameClock();

    function tick() { if (startTime != null) timeEl.textContent = fmtTime(Date.now() - startTime); }
    function startClock() {
      if (startTime == null) { startTime = Date.now(); gameTimerId = setInterval(tick, 500); }
    }
    function clearMarks() { banner.innerHTML = ""; banner.className = "og-banner"; }
    function countMove() { moves++; movesEl.textContent = moves; startClock(); }

    function move(pos, dir) {
      const t = pos + dir;
      if (t < 0 || t >= order.length) return;
      const tmp = order[pos]; order[pos] = order[t]; order[t] = tmp;
      countMove(); checkBtn.disabled = false; clearMarks(); sfx.flip(); render();
    }
    function moveTo(from, to) {
      if (from === to || from == null) return;
      const item = order.splice(from, 1)[0];
      order.splice(to, 0, item);
      countMove(); checkBtn.disabled = false; clearMarks(); sfx.flip(); render();
    }

    function render() {
      list.innerHTML = "";
      order.forEach((stepIdx, pos) => {
        const s = b.steps[stepIdx];
        const card = el("div", "order-card");
        card.dataset.idx = stepIdx;
        card.setAttribute("draggable", "true");
        card.innerHTML =
          `<span class="oc-medal">${pos + 1}</span>
           <span class="oc-emoji">${s.emoji}</span>
           <span class="oc-label">${esc(s.label)}${s.hint ? ` <span class="oc-hint">(${esc(s.hint)})</span>` : ""}</span>
           <span class="oc-arrows">
             <button class="os-up" ${pos === 0 ? "disabled" : ""} title="Move up">⬆</button>
             <button class="os-down" ${pos === order.length - 1 ? "disabled" : ""} title="Move down">⬇</button>
           </span>`;
        card.querySelector(".os-up").addEventListener("click", (e) => { if (e && e.stopPropagation) e.stopPropagation(); move(pos, -1); });
        card.querySelector(".os-down").addEventListener("click", (e) => { if (e && e.stopPropagation) e.stopPropagation(); move(pos, 1); });
        card.addEventListener("dragstart", () => { dragFrom = pos; card.classList.add("dragging"); });
        card.addEventListener("dragend", () => { card.classList.remove("dragging"); });
        card.addEventListener("dragover", (e) => { if (e && e.preventDefault) e.preventDefault(); });
        card.addEventListener("drop", (e) => { if (e && e.preventDefault) e.preventDefault(); moveTo(dragFrom, pos); dragFrom = null; });
        list.appendChild(card);
      });
    }

    checkBtn.addEventListener("click", () => {
      sfx.click();
      const cards = list.querySelectorAll(".order-card");
      let allRight = true;
      cards.forEach((card, pos) => {
        card.classList.remove("right", "wrong");
        if (Number(card.dataset.idx) === pos) card.classList.add("right");
        else { card.classList.add("wrong"); allRight = false; }
      });
      if (allRight) {
        stopGameClock();
        const elapsed = startTime != null ? Date.now() - startTime : 0;
        const pb = saveGameRecord(gameId, moves, elapsed);
        bestEl.textContent = bestText(gameId);
        banner.innerHTML = `🎉 MashaAllah! All in order in <b>${moves}</b> moves and <b>${fmtTime(elapsed)}</b>!${pb ? " 🌟 New best!" : ""} 🏅`;
        banner.className = "og-banner good";
        checkBtn.disabled = true;
        sfx.win(); confetti(120);
      } else {
        banner.innerHTML = "💡 Almost! The green cards are in the right spot. Move the pink ones and try again.";
        banner.className = "og-banner bad";
        sfx.wrong();
      }
    });

    shuffleBtn.addEventListener("click", () => {
      sfx.click();
      stopGameClock(); startTime = null; moves = 0; movesEl.textContent = "0"; timeEl.textContent = "0:00";
      order = freshOrder(); checkBtn.disabled = false; clearMarks(); render();
    });

    render();
    return wrap;
  }

  /* ===================================================
     SORT-INTO-BUCKETS GAME  (Tajweed)
     =================================================== */
  function renderSortGame(b, gameId) {
    const items = b.items;
    const wrap = el("div", "sort-game");
    wrap.appendChild(el("div", "og-head",
      `<div class="og-title">🎯 ${esc(b.title)}</div>
       <p class="og-intro">${rich(b.intro)}</p>`));

    const stats = el("div", "og-stats",
      `<span class="og-stat">🔄 Moves: <b class="og-moves">0</b></span>
       <span class="og-stat">⏱️ Time: <b class="og-time">0:00</b></span>
       <span class="og-stat og-best">${bestText(gameId)}</span>`);
    wrap.appendChild(stats);
    const movesEl = stats.querySelector(".og-moves");
    const timeEl = stats.querySelector(".og-time");
    const bestEl = stats.querySelector(".og-best");

    // the pool of not-yet-sorted chips
    const poolWrap = el("div", "sort-pool-wrap",
      `<div class="sort-pool-label">Tap a letter, then tap a box 👇</div>`);
    const pool = el("div", "sort-pool");
    poolWrap.appendChild(pool);
    wrap.appendChild(poolWrap);

    // the buckets
    const board = el("div", "sort-board");
    board.style.setProperty("--buckets", b.buckets.length);
    b.buckets.forEach((bk) => {
      const bucket = el("div", "sort-bucket");
      bucket.dataset.bucket = bk.id;
      bucket.innerHTML =
        `<div class="sb-head"><span class="sb-label">${rich(bk.label)}</span>
           ${bk.hint ? `<span class="sb-hint">${esc(bk.hint)}</span>` : ""}</div>
         <div class="sb-drop"></div>`;
      board.appendChild(bucket);
    });
    wrap.appendChild(board);

    const controls = el("div", "og-controls");
    const checkBtn = el("button", "big-btn", "Check my boxes ✅");
    const resetBtn = el("button", "mini-btn", "🔀 Start over");
    controls.appendChild(checkBtn);
    controls.appendChild(resetBtn);
    wrap.appendChild(controls);

    const banner = el("div", "og-banner");
    wrap.appendChild(banner);

    let placement = items.map(() => null);   // index -> bucketId or null
    let selected = null;                      // index of the picked-up chip
    let moves = 0;
    let startTime = null;

    stopGameClock();

    function tick() { if (startTime != null) timeEl.textContent = fmtTime(Date.now() - startTime); }
    function startClock() {
      if (startTime == null) { startTime = Date.now(); gameTimerId = setInterval(tick, 500); }
    }
    function clearMarks() { banner.innerHTML = ""; banner.className = "og-banner"; }
    function countMove() { moves++; movesEl.textContent = moves; startClock(); }

    function chip(idx, placed) {
      const it = items[idx];
      const c = el("button", "sort-chip" + (selected === idx ? " picked" : "") + (placed ? " placed" : ""));
      c.dataset.idx = idx;
      c.setAttribute("draggable", "true");
      c.innerHTML =
        `<span class="sc-ar ar">${esc(it.ar)}</span>
         ${it.tip ? `<span class="sc-tip">${esc(it.tip)}</span>` : ""}`;
      c.addEventListener("click", () => {
        if (placement[idx]) {                 // tap a placed chip -> back to pool
          placement[idx] = null; selected = null;
          countMove(); checkBtn.disabled = false; clearMarks(); sfx.flip(); render();
        } else {                              // tap a pool chip -> pick it up / drop
          selected = (selected === idx) ? null : idx;
          sfx.click(); render();
        }
      });
      c.addEventListener("dragstart", () => { selected = idx; c.classList.add("dragging"); });
      c.addEventListener("dragend", () => { c.classList.remove("dragging"); });
      return c;
    }

    function placeSelected(bucketId) {
      if (selected == null) return;
      placement[selected] = bucketId; selected = null;
      countMove(); checkBtn.disabled = false; clearMarks(); sfx.flip(); render();
    }

    function render() {
      pool.innerHTML = "";
      items.forEach((it, idx) => { if (placement[idx] == null) pool.appendChild(chip(idx, false)); });
      if (!pool.children.length) pool.appendChild(el("div", "sort-pool-empty", "All sorted — press Check! ✅"));

      board.querySelectorAll(".sort-bucket").forEach((bucket) => {
        const drop = bucket.querySelector(".sb-drop");
        drop.innerHTML = "";
        const bid = bucket.dataset.bucket;
        bucket.classList.toggle("aim", selected != null);
        items.forEach((it, idx) => { if (placement[idx] === bid) drop.appendChild(chip(idx, true)); });
      });
    }

    // clicking / dropping onto a bucket places the selected chip there
    board.querySelectorAll(".sort-bucket").forEach((bucket) => {
      const bid = bucket.dataset.bucket;
      bucket.addEventListener("click", (e) => {
        if (e.target.closest(".sort-chip")) return;   // chip handles its own click
        placeSelected(bid);
      });
      bucket.addEventListener("dragover", (e) => { if (e && e.preventDefault) e.preventDefault(); });
      bucket.addEventListener("drop", (e) => { if (e && e.preventDefault) e.preventDefault(); placeSelected(bid); });
    });

    checkBtn.addEventListener("click", () => {
      sfx.click();
      const allPlaced = placement.every((p) => p != null);
      if (!allPlaced) {
        banner.innerHTML = "💡 Put every letter into a box first!";
        banner.className = "og-banner bad";
        sfx.wrong();
        return;
      }
      let allRight = true;
      board.querySelectorAll(".sort-chip").forEach((c) => {
        const idx = Number(c.dataset.idx);
        c.classList.remove("right", "wrong");
        if (placement[idx] === items[idx].cat) c.classList.add("right");
        else { c.classList.add("wrong"); allRight = false; }
      });
      if (allRight) {
        stopGameClock();
        const elapsed = startTime != null ? Date.now() - startTime : 0;
        const pb = saveGameRecord(gameId, moves, elapsed);
        bestEl.textContent = bestText(gameId);
        banner.innerHTML = `🎉 MashaAllah! All sorted in <b>${moves}</b> moves and <b>${fmtTime(elapsed)}</b>!${pb ? " 🌟 New best!" : ""} 🏅`;
        banner.className = "og-banner good";
        checkBtn.disabled = true;
        sfx.win(); confetti(120);
      } else {
        banner.innerHTML = "💡 Almost! The green ones are in the right box. Tap a pink one to move it and try again.";
        banner.className = "og-banner bad";
        sfx.wrong();
      }
    });

    resetBtn.addEventListener("click", () => {
      sfx.click();
      stopGameClock(); startTime = null; moves = 0; selected = null;
      movesEl.textContent = "0"; timeEl.textContent = "0:00";
      placement = items.map(() => null);
      checkBtn.disabled = false; clearMarks(); render();
    });

    render();
    return wrap;
  }

  /* open a game (order or sort) on its own screen */
  let gameReturn = "home";
  function openGame(kind, moduleId, gameId, returnTo) {
    gameReturn = returnTo || "home";
    const mod = MODULES.find((m) => m.id === moduleId);
    if (!mod) return;
    const wantType = kind === "sort" ? "sortgame" : "ordergame";
    const block = mod.blocks.find((bl) => bl.type === wantType && (gameId == null || bl.id === gameId))
                || mod.blocks.find((bl) => bl.type === wantType);
    if (!block) return;
    const back = $("#order-back");
    if (back) back.textContent = (gameReturn !== "home") ? "⬅ Back to chapter" : "⬅ Back to track";
    const host = $("#order-host");
    host.innerHTML = "";
    host.appendChild(kind === "sort" ? renderSortGame(block, block.id) : renderOrderGame(block, block.id));
    show("screen-order");
  }

  /* the Fun Zone challenge card launches this exam's signature game */
  function startFunGame() {
    const fg = curExam().funGame;
    if (!fg) return;
    openGame(fg.kind, fg.moduleId, fg.gameId, "home");
  }

  /* ===================================================
     QUIZ
     =================================================== */
  let quiz = null; // { questions, index, score, mode:'module'|'final', module }

  function startQuiz(module) {
    const questions = shuffle(module.quiz).map(prepQ);
    quiz = { questions, index: 0, score: 0, mode: "module", module };
    $("#quiz-title").innerHTML = module.emoji + " " + esc(module.short) + " Quiz";
    renderQuestion();
    show("screen-quiz");
  }

  function startFinal() {
    const questions = shuffle(curExam().finalQuiz).map(prepQ);
    quiz = { questions, index: 0, score: 0, mode: "final", module: null };
    $("#quiz-title").innerHTML = "🏆 " + esc(curExam().title) + " Final Quiz";
    renderQuestion();
    show("screen-quiz");
  }

  // shuffle the options of a question while remembering the right answer text
  function prepQ(q) {
    const correctText = q.options[q.answer];
    const opts = shuffle(q.options);
    return { q: q.q, options: opts, correct: correctText, explain: q.explain };
  }

  function renderQuestion() {
    const q = quiz.questions[quiz.index];
    const total = quiz.questions.length;
    $("#quiz-counter").textContent = (quiz.index + 1) + " / " + total;
    $("#quiz-progress-fill").style.width = (quiz.index / total * 100) + "%";
    $("#quiz-question").innerHTML = rich(q.q);
    $("#quiz-feedback").textContent = "";
    $("#quiz-feedback").className = "quiz-feedback";
    $("#quiz-next").classList.add("hidden");

    const box = $("#quiz-options");
    box.innerHTML = "";
    q.options.forEach((opt) => {
      const btn = el("button", "opt", rich(opt));
      btn.dataset.opt = opt;
      btn.addEventListener("click", () => answer(btn, opt, q));
      box.appendChild(btn);
    });
  }

  function answer(btn, opt, q) {
    const buttons = $$("#quiz-options .opt");
    buttons.forEach((b) => (b.disabled = true));
    const fb = $("#quiz-feedback");

    if (opt === q.correct) {
      quiz.score++;
      btn.classList.add("correct");
      btn.innerHTML += '<span class="tick">✅</span>';
      fb.textContent = "🎉 " + cheer();
      fb.className = "quiz-feedback good";
      sfx.correct(); confetti(28);
    } else {
      btn.classList.add("wrong");
      btn.innerHTML += '<span class="tick">❌</span>';
      buttons.forEach((b) => {
        if (b.dataset.opt === q.correct) {
          b.classList.add("correct");
          b.innerHTML += '<span class="tick">✅</span>';
        }
      });
      fb.innerHTML = "💡 " + rich(q.explain);
      fb.className = "quiz-feedback bad";
      sfx.wrong();
    }
    const next = $("#quiz-next");
    next.textContent = (quiz.index + 1 < quiz.questions.length) ? "Next ➡" : "See my score 🌟";
    next.classList.remove("hidden");
  }

  function cheer() {
    const c = ["Great job!", "Brilliant!", "MashaAllah!", "You got it!", "Superstar!", "Amazing!", "Well done!"];
    return c[Math.floor(Math.random() * c.length)];
  }

  $("#quiz-next").addEventListener("click", () => {
    sfx.click();
    quiz.index++;
    if (quiz.index < quiz.questions.length) renderQuestion();
    else finishQuiz();
  });

  function starsFor(score, total) {
    const pct = score / total;
    if (pct >= 0.9) return 3;
    if (pct >= 0.6) return 2;
    if (pct >= 0.3) return 1;
    return 0;
  }

  function finishQuiz() {
    const total = quiz.questions.length;
    const score = quiz.score;
    const stars = starsFor(score, total);
    const p = P();

    if (quiz.mode === "module") {
      const id = quiz.module.id;
      const prev = p.modules[id];
      if (!prev || score >= prev.score) {
        p.modules[id] = { done: true, score, total, stars };
      } else {
        prev.done = true;
        p.modules[id] = prev;
      }
    } else {
      if (!p.final || score >= p.final.score) {
        p.final = { score, total, stars };
      }
    }
    save();
    refreshHeader();
    showResult(score, total, stars);
  }

  function showResult(score, total, stars) {
    const card = $("#result-card");
    const pct = score / total;
    let emoji, title, msg;
    if (pct >= 0.9)      { emoji = "🏆"; title = "Superstar!"; msg = "MashaAllah! You really know your stuff!"; }
    else if (pct >= 0.6) { emoji = "🌟"; title = "Well done!"; msg = "Great work! A little more practice and you'll be perfect."; }
    else if (pct >= 0.3) { emoji = "💪"; title = "Good try!"; msg = "Nice effort! Read the chapter again and try once more."; }
    else                 { emoji = "🌱"; title = "Keep going!"; msg = "Every superstar starts here. Let's read it again together!"; }

    const isFinal = quiz.mode === "final";
    card.innerHTML =
      `<div class="result-emoji">${emoji}</div>
       <h2>${title}</h2>
       <div class="result-score">You scored ${score} / ${total}</div>
       <div class="result-stars">${"⭐".repeat(stars)}${"☆".repeat(3 - stars)}</div>
       <p class="result-msg">${msg}</p>
       <div class="result-actions"></div>`;
    const actions = card.querySelector(".result-actions");

    const tryAgain = el("button", "mini-btn", "🔁 Try again");
    tryAgain.onclick = () => { sfx.click(); isFinal ? startFinal() : startQuiz(quiz.module); };
    actions.appendChild(tryAgain);

    if (!isFinal) {
      const idx = MODULES.findIndex((m) => m.id === quiz.module.id);
      if (idx + 1 < MODULES.length) {
        const nextM = MODULES[idx + 1];
        const nextBtn = el("button", "big-btn", "Next chapter ➡");
        nextBtn.onclick = () => { sfx.click(); openModule(nextM.id); };
        actions.appendChild(nextBtn);
      } else if (allChaptersDone()) {
        const fb = el("button", "big-btn", "🏆 Final Quiz!");
        fb.onclick = () => { sfx.click(); startFinal(); };
        actions.appendChild(fb);
      }
    }

    const homeBtn = el("button", "mini-btn", "🏁 Back to track");
    homeBtn.onclick = () => { sfx.click(); goHome(); };
    actions.appendChild(homeBtn);

    show("screen-result");
    celebrateAdvance();
    if (stars >= 2) { sfx.win(); confetti(120); }
    else confetti(40);
  }

  /* ===================================================
     MEMORY MATCH GAME
     =================================================== */
  let game = null;

  function startGame() {
    const pairs = shuffle(curExam().memoryPairs).slice(0, 6); // 6 pairs = 12 cards
    const cards = [];
    pairs.forEach((p, i) => {
      cards.push({ pair: i, text: p.a });
      cards.push({ pair: i, text: p.b });
    });
    game = { cards: shuffle(cards), first: null, lock: false, moves: 0, matched: 0, totalPairs: pairs.length };

    $("#game-moves").textContent = "0";
    $("#game-pairs").textContent = "0";
    const board = $("#memory-board");
    board.innerHTML = "";
    const oldWin = $(".game-win"); if (oldWin) oldWin.remove();

    game.cards.forEach((c, idx) => {
      const card = el("div", "mcard");
      card.dataset.idx = idx;
      card.innerHTML =
        `<div class="mcard-inner">
           <div class="mcard-face mcard-front">❓</div>
           <div class="mcard-face mcard-back">${rich(c.text)}</div>
         </div>`;
      card.addEventListener("click", () => flipCard(idx, card));
      board.appendChild(card);
    });
    show("screen-game");
  }

  function flipCard(idx, card) {
    if (game.lock) return;
    const c = game.cards[idx];
    if (card.classList.contains("matched") || card.classList.contains("flipped")) return;

    card.classList.add("flipped");
    sfx.flip();

    if (game.first === null) {
      game.first = { idx, card, c };
      return;
    }
    game.moves++;
    $("#game-moves").textContent = game.moves;

    const first = game.first;
    if (first.c.pair === c.pair && first.idx !== idx) {
      first.card.classList.add("matched");
      card.classList.add("matched");
      game.first = null;
      game.matched++;
      $("#game-pairs").textContent = game.matched;
      sfx.match(); confetti(20);
      if (game.matched === game.totalPairs) winGame();
    } else {
      game.lock = true;
      setTimeout(() => {
        first.card.classList.remove("flipped");
        card.classList.remove("flipped");
        game.first = null;
        game.lock = false;
      }, 850);
    }
  }

  function winGame() {
    sfx.win(); confetti(140);
    const p = P();
    const best = p.memoryBest;
    if (best == null || game.moves < best) { p.memoryBest = game.moves; save(); }
    const banner = el("div", "game-win",
      `<h3>🎉 You matched them all!</h3>
       <p>You did it in <b>${game.moves}</b> tries. Best ever: <b>${p.memoryBest}</b> 🏅</p>`);
    const btn = el("button", "big-btn", "Play again 🔁");
    btn.onclick = () => { sfx.click(); startGame(); };
    banner.appendChild(btn);
    $("#screen-game").appendChild(banner);
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }

  /* ===================================================
     WIRING
     =================================================== */
  function wire() {
    $("#home-btn").addEventListener("click", () => { sfx.click(); goHome(); });
    $("#sound-btn").addEventListener("click", () => {
      state.sound = !state.sound; save(); refreshHeader();
      if (state.sound) sfx.correct();
    });
    $("#reset-btn").addEventListener("click", () => {
      if (confirm("Start the whole adventure again? Your stars will be reset.")) {
        const name = state.name;
        state = defaultState();
        state.name = name;
        save(); refreshHeader(); goHome();
      }
    });
    $("#open-game").addEventListener("click", () => { sfx.click(); startGame(); });
    $("#open-order").addEventListener("click", () => { sfx.click(); startFunGame(); });
    $("#order-back").addEventListener("click", () => {
      sfx.click();
      if (gameReturn && gameReturn !== "home") openModule(gameReturn);
      else goHome();
    });
    $("#open-final").addEventListener("click", () => {
      if (!allChaptersDone()) {
        sfx.wrong();
        alert("Finish all the chapters first to power up for the Big Final Quiz! 💪");
        return;
      }
      sfx.click(); startFinal();
    });
    $("#game-restart").addEventListener("click", () => { sfx.click(); startGame(); });
    $$("[data-go='home']").forEach((b) => b.addEventListener("click", () => { sfx.click(); goHome(); }));
  }

  /* ---------- boot ---------- */
  function boot() {
    MODULES = curExam().modules;
    makeSparkles();
    initWelcome();
    wire();
    refreshHeader();
    if (state.name) goHome();
    else show("screen-welcome");
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
