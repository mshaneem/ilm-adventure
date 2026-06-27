# ✨ Ilm Adventure

A sparkly, interactive learning website to help with the **Islamic Learning Term 1 exam**.
Built for an 8-year-old, with a pink & purple sparkle theme.

## ▶️ How to open it

No installation needed — it's just a website.

1. Open the folder `ilm_learning`.
2. **Double-click `index.html`** — it opens in your web browser (Chrome, Safari, Edge, etc.).

That's it! It works fully offline. It also works great on a tablet or phone if you copy the folder over (or just open `index.html`).

> Tip: turn the sound **on** the first time by tapping the 🔊 button — browsers keep sound muted until you tap something.

## 📚 What's inside

Everything is taken **only** from the files in the `lessons/` folder:

| Chapter | Topic |
|--------|-------|
| 1 | The Five Pillars of Islam (+ the Shahada) |
| 2 | Prophet Muhammad ﷺ — his life before Prophethood |
| 3 | The duas we say during Salah |
| 4 | The amazing journey of Hajj |

For each chapter she can:
- 📖 **Learn** — colourful flip-cards, a timeline, dua flashcards and a Hajj journey map.
- ✏️ **Quiz** — a short quiz right after the lesson, with instant feedback and stars.

The **Hajj chapter** also has a 🎯 **"Put the steps in order" game**: the steps of Hajj
start shuffled, and she uses the ⬆ ⬇ arrows (or drags them on a computer) to arrange
them correctly, then presses **Check** — correct steps turn green, and getting them all
right earns confetti and a 🏅. It tracks her **moves** and a **timer**, and remembers her
**best score** ("New best!" when she beats it).

Then there's:
- 🏆 **Big Final Quiz** — unlocks after all 4 chapters are done; mixes questions from everything.
- 🧠 **Memory Match** game in the Fun Zone — match words to their meanings.
- 🕋 **Hajj Order Challenge** in the Fun Zone — the same put-the-steps-in-order game, replayable any time without opening the chapter, showing her best moves/time.
- 🏃‍♀️ **Racing track** — a girl runner zooms forward along the track each time a chapter is finished, all the way to the 👑 finish line.
- ⭐ **Stars & confetti** to keep it fun and rewarding.

Progress is saved automatically in the browser, so she can close it and come back later.
The ♻️ button (top right) starts the whole adventure over.

## ✏️ Want to add more questions?

Open `js/data.js` in any text editor. Each chapter has a `quiz` list, and there's a
`finalQuiz` list too. Copy an existing question block and change the words. The first
item in `options` is marked correct by `answer: 0`, but the app shuffles the options
automatically, so the order she sees is always mixed.

## 📁 Files

```
ilm_learning/
├── index.html        ← open this
├── css/styles.css    ← the look & feel
├── js/data.js        ← all the lesson text & quiz questions (edit me to add more)
├── js/app.js         ← how the app works
└── lessons/          ← the original source material
```
