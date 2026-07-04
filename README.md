# ✨ Ilm Adventure

A sparkly, interactive learning website to help with the **ILM exams**.
Built for an 8-year-old, with a pink & purple sparkle theme.

It now covers **two exams**, chosen with the tabs on the home screen:

| Exam | Topic |
|------|-------|
| 🕌 **Islamic Studies** | Term 1 — the Five Pillars, the Prophet ﷺ, Salah duas, Hajj, prayer times, Al-Fatiha & the Names of Allah (7 chapters) |
| 📖 **Tajweed** | Level 3 — heavy & light letters, changing Laam & Raa, Sukoon, Madd, Qalqalah & reading the surahs (6 chapters) |

Each exam keeps **its own** chapters, racing track, games, final quiz and progress, so finishing one exam doesn't mix into the other.

## ▶️ How to open it

No installation needed — it's just a website.

1. Open the folder `ilm_learning`.
2. **Double-click `index.html`** — it opens in your web browser (Chrome, Safari, Edge, etc.).

That's it! It works fully offline. It also works great on a tablet or phone if you copy the folder over (or just open `index.html`).

> Tip: turn the sound **on** the first time by tapping the 🔊 button — browsers keep sound muted until you tap something.

## 📚 What's inside

**Islamic Studies** content comes from the `lessons/` folder; **Tajweed** content is
based on the teacher's notes in the `tajweed/` folder.

**Tajweed chapters:**

| Chapter | Topic |
|--------|-------|
| 1 | Heavy & Light letters (Tafkheem / Tarqeeq) — the 7 always-heavy letters |
| 2 | Changing letters — the Laam in "Allah" and the letter Raa |
| 3 | Sukoon — the "stop" sign |
| 4 | Madd — stretching a sound for 2 counts |
| 5 | Qalqalah — the bounce, and its 3 levels (Small 🟢 / Medium 🟡 / Big 🔴) |
| 6 | Spotting the rules in real surahs (An-Naas, Quraysh, Al-Falaq, Al-Masad) |

For each chapter she can:
- 📖 **Learn** — colourful flip-cards, a timeline, Arabic **letter tiles**, coloured
  **Qalqalah levels**, dua flashcards and journey maps. Arabic is shown large and clear.
- ✏️ **Quiz** — a short quiz right after the lesson, with instant feedback and stars.
- 🎯 **Sort game** (Tajweed) — tap an Arabic letter/word, then tap the right box
  (e.g. *Heavy vs Light*, *Has Madd vs No Madd*, or the three *Qalqalah levels*).

The **Hajj chapter** also has a 🎯 **"Put the steps in order" game**: the steps of Hajj
start shuffled, and she uses the ⬆ ⬇ arrows (or drags them on a computer) to arrange
them correctly, then presses **Check** — correct steps turn green, and getting them all
right earns confetti and a 🏅. It tracks her **moves** and a **timer**, and remembers her
**best score** ("New best!" when she beats it).

Then, for **each exam**, there's:
- 🏆 **Big Final Quiz** — unlocks after all that exam's chapters are done; mixes questions from everything.
- 🧠 **Memory Match** game in the Fun Zone — match words to their meanings (uses that exam's word pairs).
- 🎯 **Challenge** in the Fun Zone — Islamic Studies has the **Hajj Order Challenge**; Tajweed has the **Qalqalah Levels Sort**. Replayable any time, showing her best moves/time.
- 🏃‍♀️ **Racing track** — a girl runner zooms forward along the track each time a chapter is finished, all the way to the 👑 finish line.
- ⭐ **Stars & confetti** to keep it fun and rewarding.

Progress is saved automatically in the browser, **separately for each exam**, so she can
close it and come back later. The ♻️ button (top right) starts the whole adventure over.

## ✏️ Want to add more questions?

Open `js/data.js` in any text editor. It holds two exams inside `APP_DATA.exams`
(`ISLAMIC` and `TAJWEED`). Each chapter has a `quiz` list, and each exam has a
`finalQuiz` list too. Copy an existing question block and change the words. The first
item in `options` is marked correct by `answer: 0`, but the app shuffles the options
automatically, so the order she sees is always mixed.

## 📁 Files

```
ilm_learning/
├── index.html        ← open this
├── css/styles.css    ← the look & feel
├── js/data.js        ← both exams: lesson text, letters & quiz questions (edit me to add more)
├── js/app.js         ← how the app works
├── lessons/          ← Islamic Studies source material
└── tajweed/          ← Tajweed teacher's notes (the source for exam 2)
```
