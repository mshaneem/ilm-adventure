/* =========================================================
   ILM ADVENTURE — app logic
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

  /* ---------- saved progress ---------- */
  const STORE_KEY = "ilmAdventure.v1";
  const defaultState = () => ({
    name: "",
    sound: true,
    modules: {},   // id -> { done:true, score, total, stars }
    final: null,   // { score, total, stars }
    bestMoves: null,
    games: {}      // mini-games solved, e.g. { hajjOrder: true }
  });
  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return Object.assign(defaultState(), JSON.parse(raw));
    } catch (e) { /* ignore */ }
    return defaultState();
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  /* track order = modules then final quiz then finish */
  const MODULES = APP_DATA.modules;

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
  function totalStars() {
    let s = 0;
    MODULES.forEach((m) => { if (state.modules[m.id]) s += state.modules[m.id].stars || 0; });
    if (state.final) s += state.final.stars || 0;
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
     HOME  (track + module cards)
     =================================================== */
  function goHome() {
    $("#home-greeting").textContent = "Assalamu Alaikum, " + state.name + "! 🌸";
    renderTrack();
    renderModuleCards();
    updateFinalCard();
    updateOrderCard();
    show("screen-home");
    refreshHeader();
  }

  function renderModuleCards() {
    const grid = $("#module-grid");
    grid.innerHTML = "";
    MODULES.forEach((m, i) => {
      const prog = state.modules[m.id];
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

  function updateOrderCard() {
    const desc = $("#order-card-desc");
    if (!desc) return;
    const r = orderRecord();
    desc.textContent = (r.solved && r.bestMoves != null)
      ? `🏅 Best: ${r.bestMoves} moves · ${fmtTime(r.bestTime)}`
      : "Put the steps of Hajj in order!";
  }

  function updateFinalCard() {
    const allDone = MODULES.every((m) => state.modules[m.id] && state.modules[m.id].done);
    const desc = $("#final-card-desc");
    if (state.final) {
      desc.textContent = `Best: ${state.final.score}/${state.final.total} ${"⭐".repeat(state.final.stars)}`;
    } else if (allDone) {
      desc.textContent = "You unlocked it! Tap to start 🌟";
    } else {
      desc.textContent = "Finish the chapters to power up first!";
    }
  }

  /* ---------- racing track ---------- */
  function renderTrack() {
    const track = $("#track");
    track.innerHTML = "";

    // checkpoints: start, each module, final, finish
    const points = [{ emoji: "🏁", label: "Start", key: "start" }];
    MODULES.forEach((m) => points.push({ emoji: m.emoji, label: m.short, key: m.id }));
    points.push({ emoji: "🏆", label: "Final Quiz", key: "final" });
    points.push({ emoji: "👑", label: "Finish!", key: "finish" });

    // how far has she got?
    let reached = 0; // index of current checkpoint
    for (let i = 0; i < MODULES.length; i++) {
      if (state.modules[MODULES[i].id] && state.modules[MODULES[i].id].done) reached = i + 1;
    }
    const allDone = MODULES.every((m) => state.modules[m.id] && state.modules[m.id].done);
    if (allDone) reached = MODULES.length + 1;            // at final
    if (state.final) reached = MODULES.length + 2;        // finished!

    points.forEach((p, i) => {
      const cp = el("div", "checkpoint");
      if (i < reached) cp.classList.add("done");
      if (i === reached) cp.classList.add("current");
      cp.innerHTML =
        `<div class="cp-dot">${p.emoji}</div>
         <div class="cp-label">${esc(p.label)}</div>
         ${i < reached && i !== 0 ? '<span class="cp-check">✅</span>' : ""}`;
      track.appendChild(cp);
    });

    // the runner girl, positioned over the current checkpoint
    const runner = el("div", "", "🏃‍♀️");
    runner.id = "runner";
    track.appendChild(runner);
    // position after layout
    requestAnimationFrame(() => {
      const cps = $$("#track .checkpoint");
      const target = cps[Math.min(reached, cps.length - 1)];
      if (target) {
        const left = target.offsetLeft + target.offsetWidth / 2;
        runner.style.left = left + "px";
      }
    });
  }

  // animate the girl moving forward after finishing something
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

    // render the lesson blocks, but NOT the order game — that opens on its
    // own screen (like the quiz) so the steps are shuffled, not copied from the lesson.
    currentModule.blocks.forEach((b) => { if (b.type !== "ordergame") box.appendChild(renderBlock(b)); });

    // add a "play the game" button for any module that has an order game
    const actions = $(".module-actions");
    const old = $("#module-game-btn");
    if (old) old.remove();
    const gameBlock = currentModule.blocks.find((b) => b.type === "ordergame");
    if (gameBlock) {
      const gBtn = el("button", "big-btn alt-btn", "🎯 Play the Order Game");
      gBtn.id = "module-game-btn";
      gBtn.onclick = () => { sfx.click(); startOrderGame(currentModule.id); };
      actions.appendChild(gBtn);
    }

    $("#module-quiz-btn").onclick = () => { sfx.click(); startQuiz(currentModule); };
    show("screen-module");
  }

  function renderBlock(b) {
    switch (b.type) {
      case "lead":
        return el("p", "lead", esc(b.text));

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
               <div class="flip-face flip-back">${esc(c.back)}</div>
             </div>`;
          card.addEventListener("click", () => { card.classList.toggle("flipped"); sfx.flip(); });
          grid.appendChild(card);
        });
        return grid;
      }

      case "timeline": {
        const tl = el("div", "timeline");
        b.events.forEach((ev) => {
          const item = el("div", "tl-item",
            `<div class="tl-bullet">${ev.emoji}</div>
             <div class="tl-body">
               <div class="tl-label">${esc(ev.label)}</div>
               <p class="tl-text">${esc(ev.text)}</p>
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
               <p class="js-text">${esc(s.text)}</p></div>`));
        });
        return wrap;
      }

      case "ordergame":
        return renderOrderGame(b);

      case "callout":
        return el("div", "callout",
          `<div class="co-emoji">${b.emoji}</div>
           <div class="co-title">${esc(b.title)}</div>
           <div class="co-text">${esc(b.text)}</div>
           ${b.meaning ? `<div class="co-meaning">${esc(b.meaning)}</div>` : ""}`);

      default:
        return el("div");
    }
  }

  /* ---------- Hajj "put the steps in order" mini-game ---------- */
  let orderTimerId = null;

  function fmtTime(ms) {
    const s = Math.max(0, Math.round(ms / 1000));
    const m = Math.floor(s / 60), r = s % 60;
    return m + ":" + (r < 10 ? "0" + r : r);
  }
  // normalise the saved record (older saves used a plain `true`)
  function orderRecord() {
    state.games = state.games || {};
    let r = state.games.hajjOrder;
    if (!r || typeof r !== "object") r = { solved: !!r, bestMoves: null, bestTime: null };
    return r;
  }
  function bestText() {
    const r = orderRecord();
    if (!r.solved || r.bestMoves == null) return "";
    return `🏅 Best: ${r.bestMoves} moves · ${fmtTime(r.bestTime)}`;
  }

  function renderOrderGame(b) {
    const n = b.steps.length;
    const wrap = el("div", "order-game");
    wrap.appendChild(el("div", "og-head",
      `<div class="og-title">🎯 ${esc(b.title)}</div>
       <p class="og-intro">${esc(b.intro)}</p>`));

    // live stats: moves, time, best
    const stats = el("div", "og-stats",
      `<span class="og-stat">🔄 Moves: <b class="og-moves">0</b></span>
       <span class="og-stat">⏱️ Time: <b class="og-time">0:00</b></span>
       <span class="og-stat og-best">${bestText()}</span>`);
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

    let order = freshOrder();   // order[position] = original step index
    let dragFrom = null;
    let moves = 0;
    let startTime = null;

    // only one order-game timer alive at a time
    if (orderTimerId) { clearInterval(orderTimerId); orderTimerId = null; }

    function tick() { if (startTime != null) timeEl.textContent = fmtTime(Date.now() - startTime); }
    function startClock() {
      if (startTime == null) {
        startTime = Date.now();
        if (typeof setInterval === "function") orderTimerId = setInterval(tick, 500);
      }
    }
    function stopClock() { if (orderTimerId) { clearInterval(orderTimerId); orderTimerId = null; } }

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
        // drag & drop (desktop / mouse)
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
        stopClock();
        const elapsed = startTime != null ? Date.now() - startTime : 0;
        const r = orderRecord();
        const newBestMoves = (r.bestMoves == null || moves < r.bestMoves);
        const newBestTime = (r.bestTime == null || elapsed < r.bestTime);
        r.solved = true;
        if (newBestMoves) r.bestMoves = moves;
        if (newBestTime) r.bestTime = elapsed;
        state.games.hajjOrder = r;
        save();
        bestEl.textContent = bestText();
        const pb = (newBestMoves || newBestTime) ? " 🌟 New best!" : "";
        banner.innerHTML = `🎉 MashaAllah! All steps in order in <b>${moves}</b> moves and <b>${fmtTime(elapsed)}</b>!${pb} 🏅`;
        banner.className = "og-banner good";
        checkBtn.disabled = true;
        sfx.win(); confetti(120);
      } else {
        banner.innerHTML = "💡 Almost! The green steps are in the right spot. Move the pink ones and try again.";
        banner.className = "og-banner bad";
        sfx.wrong();
      }
    });

    shuffleBtn.addEventListener("click", () => {
      sfx.click();
      stopClock(); startTime = null; moves = 0; movesEl.textContent = "0"; timeEl.textContent = "0:00";
      order = freshOrder(); checkBtn.disabled = false; clearMarks(); render();
    });

    render();
    return wrap;
  }

  /* open the order game on its own screen (from the chapter or the Fun Zone) */
  let orderReturn = "home";
  function startOrderGame(returnTo) {
    orderReturn = returnTo || "home";
    const mod = MODULES.find((m) => m.id === (orderReturn === "home" ? "hajj" : orderReturn));
    const block = (mod || MODULES.find((m) => m.id === "hajj")).blocks.find((b) => b.type === "ordergame");
    const back = $("#order-back");
    if (back) back.textContent = (orderReturn !== "home") ? "⬅ Back to chapter" : "⬅ Back to track";
    const host = $("#order-host");
    host.innerHTML = "";
    if (block) host.appendChild(renderOrderGame(block));
    show("screen-order");
  }

  /* ===================================================
     QUIZ
     =================================================== */
  let quiz = null; // { questions, index, score, mode:'module'|'final', module }

  function startQuiz(module) {
    const questions = shuffle(module.quiz).map(prepQ);
    quiz = { questions, index: 0, score: 0, mode: "module", module };
    $("#quiz-title").textContent = module.emoji + " " + module.short + " Quiz";
    renderQuestion();
    show("screen-quiz");
  }

  function startFinal() {
    const questions = shuffle(APP_DATA.finalQuiz).map(prepQ);
    quiz = { questions, index: 0, score: 0, mode: "final", module: null };
    $("#quiz-title").textContent = "🏆 Big Final Quiz";
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
    $("#quiz-question").textContent = q.q;
    $("#quiz-feedback").textContent = "";
    $("#quiz-feedback").className = "quiz-feedback";
    $("#quiz-next").classList.add("hidden");

    const box = $("#quiz-options");
    box.innerHTML = "";
    q.options.forEach((opt) => {
      const btn = el("button", "opt", esc(opt));
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
        if (b.textContent.replace("❌", "").trim() === q.correct) {
          b.classList.add("correct");
          b.innerHTML += '<span class="tick">✅</span>';
        }
      });
      fb.innerHTML = "💡 " + esc(q.explain);
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

    if (quiz.mode === "module") {
      const id = quiz.module.id;
      const prev = state.modules[id];
      // keep the best score/stars if replayed
      if (!prev || score >= prev.score) {
        state.modules[id] = { done: true, score, total, stars };
      } else {
        prev.done = true;
        state.modules[id] = prev;
      }
    } else {
      if (!state.final || score >= state.final.score) {
        state.final = { score, total, stars };
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
      } else {
        const allDone = MODULES.every((m) => state.modules[m.id] && state.modules[m.id].done);
        if (allDone) {
          const fb = el("button", "big-btn", "🏆 Final Quiz!");
          fb.onclick = () => { sfx.click(); startFinal(); };
          actions.appendChild(fb);
        }
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
    const pairs = shuffle(APP_DATA.memoryPairs).slice(0, 6); // 6 pairs = 12 cards
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
    // remove any previous win banner
    const oldWin = $(".game-win"); if (oldWin) oldWin.remove();

    game.cards.forEach((c, idx) => {
      const card = el("div", "mcard");
      card.dataset.idx = idx;
      card.innerHTML =
        `<div class="mcard-inner">
           <div class="mcard-face mcard-front">❓</div>
           <div class="mcard-face mcard-back">${esc(c.text)}</div>
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
    // second card
    game.moves++;
    $("#game-moves").textContent = game.moves;

    const first = game.first;
    if (first.c.pair === c.pair && first.idx !== idx) {
      // match!
      first.card.classList.add("matched");
      card.classList.add("matched");
      game.first = null;
      game.matched++;
      $("#game-pairs").textContent = game.matched;
      sfx.match(); confetti(20);
      if (game.matched === game.totalPairs) winGame();
    } else {
      // no match, flip back
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
    const best = state.bestMoves;
    if (best == null || game.moves < best) { state.bestMoves = game.moves; save(); }
    const banner = el("div", "game-win",
      `<h3>🎉 You matched them all!</h3>
       <p>You did it in <b>${game.moves}</b> tries. Best ever: <b>${state.bestMoves}</b> 🏅</p>`);
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
    $("#open-order").addEventListener("click", () => { sfx.click(); startOrderGame("home"); });
    $("#order-back").addEventListener("click", () => {
      sfx.click();
      if (orderReturn && orderReturn !== "home") openModule(orderReturn);
      else goHome();
    });
    $("#open-final").addEventListener("click", () => {
      const allDone = MODULES.every((m) => state.modules[m.id] && state.modules[m.id].done);
      if (!allDone) {
        sfx.wrong();
        alert("Finish all 4 chapters first to power up for the Big Final Quiz! 💪");
        return;
      }
      sfx.click(); startFinal();
    });
    $("#game-restart").addEventListener("click", () => { sfx.click(); startGame(); });
    $$("[data-go='home']").forEach((b) => b.addEventListener("click", () => { sfx.click(); goHome(); }));
  }

  /* ---------- boot ---------- */
  function boot() {
    makeSparkles();
    initWelcome();
    wire();
    refreshHeader();
    if (state.name) goHome();
    else show("screen-welcome");
  }

  document.addEventListener("DOMContentLoaded", boot);
})();
