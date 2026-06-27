/* ============================================================
   ILM ADVENTURE — Learning content & quizzes
   All content below comes ONLY from the lessons/ folder:
     chapter1.txt  -> The Five Pillars of Islam
     chapter2.txt  -> Prophet Muhammad's life before Prophethood
     chapter3.txt  -> Duas during Salah
     chapter4.txt  -> The Journey of Hajj
   A grown-up can safely edit the words here to add more practice.
   ============================================================ */

const APP_DATA = {

  /* The learning modules (one per chapter). They appear as stops
     on the racing track in the order listed here. */
  modules: [

    /* ---------- CHAPTER 1 ---------- */
    {
      id: "pillars",
      title: "The Five Pillars of Islam",
      short: "5 Pillars",
      emoji: "🕌",
      tagline: "The five most important acts of worship in Islam.",
      blocks: [
        {
          type: "lead",
          text: "The Five Pillars of Islam are the five core acts of worship and practice in Islam. They give every Muslim the basic framework for their faith, worship, and daily life. Tap each pillar to learn what it means! 💖"
        },
        {
          type: "flipgrid",
          cards: [
            { emoji: "🗣️", front: "1. Shahada", sub: "Declaration of Faith",
              back: "To testify: “There is no god worthy of worship except Allah, and Muhammad is the Messenger of Allah.”" },
            { emoji: "🤲", front: "2. Salah", sub: "Prayer",
              back: "Performing the five daily prayers at their special, prescribed times." },
            { emoji: "💝", front: "3. Zakat", sub: "Almsgiving",
              back: "Giving a portion of your wealth to those in need — usually 2.5% of eligible savings each year." },
            { emoji: "🌙", front: "4. Sawm", sub: "Fasting in Ramadan",
              back: "Not eating or drinking from dawn until sunset during the holy month of Ramadan." },
            { emoji: "🕋", front: "5. Hajj", sub: "Pilgrimage to Mecca",
              back: "Making the pilgrimage to Mecca at least once in a lifetime, if you are able to in body and money." }
          ]
        },
        {
          type: "callout",
          emoji: "🌟",
          title: "The Shahada",
          text: "Ashhadu an lā ilāha illā Allāh, wa ashhadu anna Muḥammadan rasūlu Allāh.",
          meaning: "“I bear witness that there is no god worthy of worship except Allah, and I bear witness that Muhammad is the Messenger of Allah.”"
        }
      ],
      quiz: [
        { q: "How many Pillars of Islam are there?",
          options: ["5", "3", "7", "10"], answer: 0,
          explain: "There are 5 Pillars: Shahada, Salah, Zakat, Sawm and Hajj." },
        { q: "The Shahada is the declaration of…?",
          options: ["Faith", "Prayer", "Fasting", "Charity"], answer: 0,
          explain: "Shahada means the Declaration of Faith." },
        { q: "Which pillar means praying five times every day?",
          options: ["Salah", "Zakat", "Sawm", "Hajj"], answer: 0,
          explain: "Salah is performing the five daily prayers." },
        { q: "Zakat means giving about how much of your eligible savings to those in need?",
          options: ["2.5%", "10%", "25%", "50%"], answer: 0,
          explain: "Zakat is typically 2.5% of eligible savings each year." },
        { q: "Sawm means fasting during which special month?",
          options: ["Ramadan", "Shawwal", "Rajab", "Muharram"], answer: 0,
          explain: "Sawm is fasting from dawn to sunset during Ramadan." },
        { q: "Hajj is the pilgrimage (special journey) to which city?",
          options: ["Mecca", "Medina", "Cairo", "Jerusalem"], answer: 0,
          explain: "Hajj is the pilgrimage to Mecca." },
        { q: "The Shahada says there is no god worthy of worship except…?",
          options: ["Allah", "the angels", "the Prophets", "the Kaaba"], answer: 0,
          explain: "“There is no god worthy of worship except Allah, and Muhammad is the Messenger of Allah.”" }
      ]
    },

    /* ---------- CHAPTER 2 ---------- */
    {
      id: "prophet",
      title: "Prophet Muhammad ﷺ — Before Prophethood",
      short: "The Prophet ﷺ",
      emoji: "📖",
      tagline: "The early life of Prophet Muhammad ﷺ.",
      blocks: [
        {
          type: "lead",
          text: "Let's learn about the life of Prophet Muhammad ﷺ before he became a Prophet. Follow the timeline from his birth all the way to his marriage — then test how much you remember! 🤲"
        },
        {
          type: "timeline",
          events: [
            { label: "Born in 570 AD", emoji: "👶",
              text: "Prophet Muhammad ﷺ was born in Mecca in 570 AD — around 1400–1500 years ago — into the tribe of Quraysh." },
            { label: "His family", emoji: "👪",
              text: "His mother's name was Amina and his father was Abdullah bin Abdul Muttalib. He was a descendant of Prophet Ishmael (Ismail) عليه السلام, around 40 generations later. His father passed away before he was born." },
            { label: "Cared for by Halimah", emoji: "🐪",
              text: "For his first years he was cared for by a Bedouin wet nurse named Halimah. The desert was thought to be healthier for raising strong children, and Mecca had diseases at the time. He returned to his mother around age 2, but stayed with Halimah until about age 5." },
            { label: "Around age 5–6", emoji: "💔",
              text: "He returned to his mother. They travelled to Medina (then called Yathrib) to visit relatives, but on the journey back his mother passed away." },
            { label: "His grandfather", emoji: "👴",
              text: "He was then raised by his grandfather Abdul Muttalib, who loved him dearly. After about 2 years, his grandfather also passed away." },
            { label: "His uncle Abu Talib", emoji: "🤝",
              text: "He was then cared for by his uncle Abu Talib, who treated him with great care and kindness." },
            { label: "A young worker", emoji: "🐑",
              text: "As a young boy, Prophet Muhammad ﷺ worked as a shepherd for his uncle. As he grew older, he also helped Abu Talib with trading and business journeys." },
            { label: "“Al-Ameen”", emoji: "⭐",
              text: "He became known for his honesty, purity, fairness, good character and trustworthy behaviour. Because of this he was given the title “Al-Ameen” — meaning “The Trustworthy”." },
            { label: "Marriage at age 25", emoji: "💍",
              text: "Khadijah رضي الله عنها was a wealthy merchant who admired his character and honesty. She proposed marriage to him. They married when he was 25 years old and she was 40." },
            { label: "Prophethood at age 40", emoji: "🌟",
              text: "All of this happened before Prophet Muhammad ﷺ received Prophethood at the age of 40." }
          ]
        },
        {
          type: "callout",
          emoji: "⭐",
          title: "Remember this!",
          text: "Al-Ameen = “The Trustworthy”",
          meaning: "People trusted Prophet Muhammad ﷺ so much because he was always honest, fair and kind."
        }
      ],
      quiz: [
        { q: "In which city was Prophet Muhammad ﷺ born?",
          options: ["Mecca", "Medina", "Mina", "Mount Arafat"], answer: 0,
          explain: "He was born in Mecca." },
        { q: "About what year was he born?",
          options: ["570 AD", "200 AD", "700 AD", "1000 AD"], answer: 0,
          explain: "He was born in 570 AD, around 1400–1500 years ago." },
        { q: "What was his mother's name?",
          options: ["Amina", "Khadijah", "Halimah", "Hajar"], answer: 0,
          explain: "His mother's name was Amina." },
        { q: "What was his father's name?",
          options: ["Abdullah", "Abu Talib", "Abdul Muttalib", "Ismail"], answer: 0,
          explain: "His father was Abdullah bin Abdul Muttalib." },
        { q: "Which tribe was he born into?",
          options: ["Quraysh", "Aws", "Khazraj", "Thaqif"], answer: 0,
          explain: "He was born into the tribe of Quraysh." },
        { q: "Who was the kind wet nurse who cared for him as a baby?",
          options: ["Halimah", "Amina", "Khadijah", "Hajar"], answer: 0,
          explain: "He was cared for by a Bedouin wet nurse named Halimah." },
        { q: "After his mother and grandfather passed away, which uncle took care of him?",
          options: ["Abu Talib", "Abdullah", "Abdul Muttalib", "Hamza"], answer: 0,
          explain: "His uncle Abu Talib cared for him with great kindness." },
        { q: "As a young boy, what job did Prophet Muhammad ﷺ do?",
          options: ["Shepherd", "Fisherman", "Builder", "Teacher"], answer: 0,
          explain: "He worked as a shepherd for his uncle." },
        { q: "People gave him the title “Al-Ameen”. What does it mean?",
          options: ["The Trustworthy", "The Brave", "The Strong", "The Wise"], answer: 0,
          explain: "Al-Ameen means “The Trustworthy”." },
        { q: "Who was the kind, wealthy merchant who married him?",
          options: ["Khadijah", "Amina", "Halimah", "Hajar"], answer: 0,
          explain: "Khadijah رضي الله عنها married him." },
        { q: "How old was he when he married Khadijah رضي الله عنها?",
          options: ["25", "18", "30", "40"], answer: 0,
          explain: "He was 25 years old and she was 40." },
        { q: "At what age did he receive Prophethood?",
          options: ["40", "25", "30", "50"], answer: 0,
          explain: "He received Prophethood at the age of 40." },
        { q: "He was a descendant of which Prophet?",
          options: ["Ishmael (Ismail) عليه السلام", "Musa عليه السلام", "Isa عليه السلام", "Nuh عليه السلام"], answer: 0,
          explain: "He was a descendant of Prophet Ishmael (Ismail) عليه السلام." }
      ]
    },

    /* ---------- CHAPTER 3 ---------- */
    {
      id: "duas",
      title: "Duas During Salah",
      short: "Salah Duas",
      emoji: "🤲",
      tagline: "The duas we say during prayer, and what they mean.",
      blocks: [
        {
          type: "lead",
          text: "These are the special duas we say during Salah (prayer). Tap a card to flip it and see the dua and its meaning. Try to memorise each one and practise it in your prayer! 🤍"
        },
        {
          type: "flashgrid",
          cards: [
            { when: "During Ruku (Bowing)", emoji: "🙇‍♀️",
              translit: "Subhaana Rabbiyal 'Azeem (3 times)",
              meaning: "“Glory to my Lord the Exalted.”" },
            { when: "Rising from Ruku", emoji: "🧍‍♀️",
              translit: "Sami'Allaahu liman hamidah — Rabbanaa wa lakal hamd",
              meaning: "“Allah hears whoever praises Him.” / “Our Lord, and to You is praise.”" },
            { when: "During Sujud (Prostration)", emoji: "🧎‍♀️",
              translit: "Subhaana Rabbiyal 'A'la (3 times)",
              meaning: "“Glory to my Lord the Most High.”" },
            { when: "Between the Two Prostrations", emoji: "🤲",
              translit: "Rabbighfir lee, Rabbighfir lee",
              meaning: "“Lord forgive me, Lord forgive me.”" }
          ]
        }
      ],
      quiz: [
        { q: "What do we say during Ruku (bowing)?",
          options: ["Subhaana Rabbiyal 'Azeem", "Subhaana Rabbiyal 'A'la", "Rabbighfir lee", "Rabbanaa wa lakal hamd"], answer: 0,
          explain: "During Ruku we say “Subhaana Rabbiyal 'Azeem” (3 times)." },
        { q: "“Subhaana Rabbiyal 'Azeem” means…?",
          options: ["Glory to my Lord the Exalted", "Glory to my Lord the Most High", "Lord forgive me", "Allah hears whoever praises Him"], answer: 0,
          explain: "It means “Glory to my Lord the Exalted.”" },
        { q: "How many times do we say the dua during Ruku?",
          options: ["3 times", "1 time", "5 times", "7 times"], answer: 0,
          explain: "We say it 3 times during Ruku." },
        { q: "What do we say during Sujud (prostration)?",
          options: ["Subhaana Rabbiyal 'A'la", "Subhaana Rabbiyal 'Azeem", "Rabbighfir lee", "Sami'Allaahu liman hamidah"], answer: 0,
          explain: "During Sujud we say “Subhaana Rabbiyal 'A'la” (3 times)." },
        { q: "“Subhaana Rabbiyal 'A'la” means…?",
          options: ["Glory to my Lord the Most High", "Glory to my Lord the Exalted", "Lord forgive me", "Our Lord, and to You is praise"], answer: 0,
          explain: "It means “Glory to my Lord the Most High.”" },
        { q: "What do we say between the two prostrations (while sitting)?",
          options: ["Rabbighfir lee, Rabbighfir lee", "Subhaana Rabbiyal 'A'la", "Subhaana Rabbiyal 'Azeem", "Sami'Allaahu liman hamidah"], answer: 0,
          explain: "Between the two prostrations we say “Rabbighfir lee, Rabbighfir lee.”" },
        { q: "“Rabbighfir lee” means…?",
          options: ["Lord forgive me", "Glory to my Lord", "Allah hears whoever praises Him", "Our Lord, and to You is praise"], answer: 0,
          explain: "“Rabbighfir lee” means “Lord forgive me.”" },
        { q: "When rising from Ruku we say “Rabbanaa wa lakal hamd”. What does it mean?",
          options: ["Our Lord, and to You is praise", "Lord forgive me", "Glory to my Lord the Most High", "Glory to my Lord the Exalted"], answer: 0,
          explain: "It means “Our Lord, and to You is praise.”" },
        { q: "“Sami'Allaahu liman hamidah” means…?",
          options: ["Allah hears whoever praises Him", "Lord forgive me", "Glory to my Lord the Exalted", "Our Lord, and to You is praise"], answer: 0,
          explain: "It means “Allah hears whoever praises Him.”" }
      ]
    },

    /* ---------- CHAPTER 4 ---------- */
    {
      id: "hajj",
      title: "The Amazing Journey of Hajj",
      short: "Hajj",
      emoji: "🕋",
      tagline: "Follow the day-by-day journey of Hajj.",
      blocks: [
        {
          type: "lead",
          text: "Hajj is a very special journey to Makkah. Let's follow the pilgrims day by day and see what they do at each stop! 🌙🕋"
        },
        {
          type: "journey",
          stops: [
            { day: "Day 1", title: "Intention & Ihram", emoji: "🤍",
              text: "Pilgrims begin Hajj by making a sincere intention for Allah. They enter a special state called Ihram and wear simple clothes to show that everyone is equal before Allah. They then walk around the Kaaba 7 times (Tawaf), and walk between the hills of Safa and Marwa (Sai), remembering Hajar (AS) searching for water for baby Ismail." },
            { day: "Mina", title: "The Tent City", emoji: "🏕️",
              text: "Next, pilgrims travel to Mina, a city filled with white tents. They spend the day praying, reading Quran, making dua, and remembering Allah." },
            { day: "Day 2", title: "The Special Day of Arafat", emoji: "🌟",
              text: "Pilgrims travel to Mount Arafat, one of the most important places in Hajj. This is where Prophet Muhammad ﷺ gave his last sermon. They spend the whole day making dua, asking Allah for forgiveness, and worshipping from noon until sunset. Many Muslims around the world also fast on this blessed day." },
            { day: "Muzdalifah", title: "Sleeping Under the Stars", emoji: "🌌",
              text: "After sunset, pilgrims travel to Muzdalifah. They sleep outdoors under the night sky and collect 49 small pebbles for the next days." },
            { day: "Day 3", title: "Stoning the Devil & Eid al-Adha", emoji: "🪨",
              text: "Pilgrims return to Mina and throw 7 pebbles at a large pillar. This reminds Muslims how Prophet Ibrahim (AS) refused to listen to Shaytan and obeyed Allah instead. Muslims also remember Prophet Ibrahim's sacrifice on Eid al-Adha by sacrificing an animal and sharing the meat with people in need." },
            { day: "Days 4 & 5", title: "Continuing the Rami", emoji: "🪨",
              text: "Pilgrims continue throwing pebbles at the three pillars each day to show that they reject evil and choose goodness." },
            { day: "Day 6", title: "Completing Hajj", emoji: "✂️",
              text: "Men shave or trim their hair, and women cut a tiny piece of hair to show a fresh beginning. Pilgrims then return to Makkah to perform a final Tawaf and complete Sai again. This marks the completion of Hajj! 🎉" }
          ]
        },
        {
          /* GAME: put the steps of Hajj in the right order.
             The list below is the CORRECT order (same order as the journey above).
             The game shuffles it for the learner to fix. */
          type: "ordergame",
          title: "Game: Put the Hajj steps in order!",
          intro: "The cards below are all mixed up! Use the ⬆ and ⬇ arrows (or drag them on a computer) to put the steps of Hajj in the right order, then press “Check my order”. 🏁",
          steps: [
            { emoji: "🤍", label: "Make Intention & wear Ihram", hint: "then Tawaf & Sai" },
            { emoji: "🏕️", label: "Travel to Mina (the Tent City)", hint: "" },
            { emoji: "🌟", label: "Stand at Mount Arafat", hint: "the last sermon" },
            { emoji: "🌌", label: "Stay at Muzdalifah", hint: "collect pebbles" },
            { emoji: "🪨", label: "Stone the Pillars & Eid al-Adha", hint: "" },
            { emoji: "🔁", label: "Continue the Rami (Days 4 & 5)", hint: "" },
            { emoji: "✂️", label: "Cut hair & final Tawaf", hint: "Hajj complete!" }
          ]
        },
        {
          type: "callout",
          emoji: "💛",
          title: "Hajj teaches Muslims about…",
          text: "🤝 Equality · 🕊️ Patience · 💖 Kindness · 🙏 Obeying Allah · 🤲 Helping others",
          meaning: "Hajj brings everyone together as equals before Allah."
        }
      ],
      quiz: [
        { q: "Before Hajj, pilgrims make a sincere intention and wear simple clothes. What is this special state called?",
          options: ["Ihram", "Tawaf", "Sai", "Rami"], answer: 0,
          explain: "It is called Ihram. The simple clothes show everyone is equal before Allah." },
        { q: "Why do pilgrims wear simple clothes in Ihram?",
          options: ["To show everyone is equal before Allah", "To stay warm", "To look fancy", "To run faster"], answer: 0,
          explain: "Simple clothes show that everyone is equal before Allah." },
        { q: "Walking around the Kaaba is called Tawaf. How many times do pilgrims do it?",
          options: ["7 times", "3 times", "5 times", "10 times"], answer: 0,
          explain: "Pilgrims walk around the Kaaba 7 times (Tawaf)." },
        { q: "Walking between the hills of Safa and Marwa is called…?",
          options: ["Sai", "Tawaf", "Rami", "Ihram"], answer: 0,
          explain: "It is called Sai." },
        { q: "Walking between Safa and Marwa reminds us of who searching for water for baby Ismail?",
          options: ["Hajar (AS)", "Amina", "Khadijah", "Halimah"], answer: 0,
          explain: "It reminds us of Hajar (AS) searching for water for baby Ismail." },
        { q: "What is the tent city where pilgrims pray and read Quran?",
          options: ["Mina", "Muzdalifah", "Arafat", "Medina"], answer: 0,
          explain: "Mina is the tent city filled with white tents." },
        { q: "On the most important day, pilgrims travel to Mount…?",
          options: ["Arafat", "Hira", "Safa", "Marwa"], answer: 0,
          explain: "They travel to Mount Arafat." },
        { q: "Mount Arafat is where Prophet Muhammad ﷺ gave his…?",
          options: ["Last sermon", "First prayer", "First battle", "First fast"], answer: 0,
          explain: "Prophet Muhammad ﷺ gave his last sermon at Mount Arafat." },
        { q: "Where do pilgrims sleep outdoors under the stars?",
          options: ["Muzdalifah", "Mina", "Arafat", "Makkah"], answer: 0,
          explain: "Pilgrims sleep under the stars at Muzdalifah." },
        { q: "How many small pebbles do pilgrims collect at Muzdalifah?",
          options: ["49", "7", "21", "100"], answer: 0,
          explain: "They collect 49 small pebbles for the next days." },
        { q: "Throwing pebbles reminds us how which Prophet refused to listen to Shaytan?",
          options: ["Ibrahim (AS)", "Ismail (AS)", "Musa (AS)", "Nuh (AS)"], answer: 0,
          explain: "It reminds us how Prophet Ibrahim (AS) refused Shaytan and obeyed Allah." },
        { q: "Which Eid do Muslims celebrate, remembering Prophet Ibrahim's sacrifice?",
          options: ["Eid al-Adha", "Eid al-Fitr", "Eid Milad", "Eid Ghadir"], answer: 0,
          explain: "Eid al-Adha, when an animal is sacrificed and the meat shared with people in need." },
        { q: "At the end of Hajj, what do pilgrims do to show a fresh beginning?",
          options: ["Cut or trim their hair", "Plant a tree", "Build a house", "Paint the Kaaba"], answer: 0,
          explain: "Men shave or trim their hair, and women cut a tiny piece of hair." }
      ]
    }
  ],

  /* The big final quiz — a mix of questions from every chapter.
     These are pulled from the same facts as the lessons above. */
  finalQuiz: [
    { q: "How many Pillars of Islam are there?",
      options: ["5", "4", "6", "7"], answer: 0, explain: "There are 5 Pillars of Islam." },
    { q: "Which pillar is the pilgrimage to Mecca?",
      options: ["Hajj", "Zakat", "Sawm", "Salah"], answer: 0, explain: "Hajj is the pilgrimage to Mecca." },
    { q: "Sawm means fasting during which month?",
      options: ["Ramadan", "Shawwal", "Rajab", "Muharram"], answer: 0, explain: "Sawm is fasting during Ramadan." },
    { q: "In which city was Prophet Muhammad ﷺ born?",
      options: ["Mecca", "Medina", "Mina", "Cairo"], answer: 0, explain: "He was born in Mecca." },
    { q: "What was Prophet Muhammad's ﷺ mother's name?",
      options: ["Amina", "Khadijah", "Halimah", "Hajar"], answer: 0, explain: "His mother was Amina." },
    { q: "What title did Prophet Muhammad ﷺ earn for being so trustworthy?",
      options: ["Al-Ameen", "Al-Faruq", "Al-Siddiq", "Al-Kareem"], answer: 0, explain: "Al-Ameen means “The Trustworthy”." },
    { q: "At what age did Prophet Muhammad ﷺ receive Prophethood?",
      options: ["40", "25", "30", "50"], answer: 0, explain: "He received Prophethood at age 40." },
    { q: "What do we say during Ruku (bowing)?",
      options: ["Subhaana Rabbiyal 'Azeem", "Subhaana Rabbiyal 'A'la", "Rabbighfir lee", "Rabbanaa wa lakal hamd"], answer: 0,
      explain: "During Ruku we say “Subhaana Rabbiyal 'Azeem”." },
    { q: "“Subhaana Rabbiyal 'A'la” (said in Sujud) means…?",
      options: ["Glory to my Lord the Most High", "Glory to my Lord the Exalted", "Lord forgive me", "Allah hears whoever praises Him"], answer: 0,
      explain: "It means “Glory to my Lord the Most High.”" },
    { q: "What do we say between the two prostrations?",
      options: ["Rabbighfir lee, Rabbighfir lee", "Subhaana Rabbiyal 'Azeem", "Sami'Allaahu liman hamidah", "Subhaana Rabbiyal 'A'la"], answer: 0,
      explain: "We say “Rabbighfir lee, Rabbighfir lee” — “Lord forgive me.”" },
    { q: "Walking around the Kaaba 7 times is called…?",
      options: ["Tawaf", "Sai", "Rami", "Ihram"], answer: 0, explain: "It is called Tawaf." },
    { q: "On which mountain did Prophet Muhammad ﷺ give his last sermon?",
      options: ["Mount Arafat", "Mount Hira", "Safa", "Marwa"], answer: 0, explain: "Mount Arafat." },
    { q: "How many pebbles do pilgrims collect at Muzdalifah?",
      options: ["49", "7", "21", "70"], answer: 0, explain: "They collect 49 small pebbles." },
    { q: "Throwing pebbles reminds us of which Prophet refusing Shaytan?",
      options: ["Ibrahim (AS)", "Musa (AS)", "Ismail (AS)", "Isa (AS)"], answer: 0, explain: "Prophet Ibrahim (AS)." },
    { q: "Which Eid is celebrated during Hajj?",
      options: ["Eid al-Adha", "Eid al-Fitr", "Eid Milad", "Eid Ghadir"], answer: 0, explain: "Eid al-Adha." }
  ],

  /* Pairs for the Memory Match game (Fun Zone).
     Each pair becomes two cards: a word and its match. */
  memoryPairs: [
    { a: "Shahada", b: "Declaration of Faith" },
    { a: "Salah", b: "Five daily prayers" },
    { a: "Zakat", b: "Giving to those in need" },
    { a: "Sawm", b: "Fasting in Ramadan" },
    { a: "Hajj", b: "Pilgrimage to Mecca" },
    { a: "Al-Ameen", b: "The Trustworthy" },
    { a: "Tawaf", b: "Walk around the Kaaba 7 times" },
    { a: "Ihram", b: "Special simple clothes" },
    { a: "Sai", b: "Walk between Safa & Marwa" },
    { a: "Arafat", b: "Place of the last sermon" }
  ]
};
