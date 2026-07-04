/* ============================================================
   ILM ADVENTURE — Learning content & quizzes
   The app now holds TWO exams (see APP_DATA at the bottom):
     • ISLAMIC  — Term 1 Islamic Studies (chapters from lessons/)
     • TAJWEED  — Level 3 Tajweed (content from the tajweed/ notes)
   A grown-up can safely edit the words here to add more practice.
   ============================================================ */

/* ===========================================================
   EXAM 1 — ISLAMIC STUDIES (Term 1)
   Content comes ONLY from the lessons/ folder.
   =========================================================== */
const ISLAMIC = {

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
          id: "hajjOrder",
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
    },

    /* ---------- CHAPTER 5 ---------- */
    {
      id: "prayers",
      title: "The Five Daily Prayers",
      short: "Prayer Times",
      emoji: "🕰️",
      tagline: "The five daily prayers, their times and Rakat.",
      blocks: [
        {
          type: "lead",
          text: "Muslims pray five times every day: Fajr, Dhuhr, Asr, Maghrib and Isha. Each prayer has its own time, based on the position of the sun, and a number of Rakat (units of prayer). Tap each card to learn more! 🌅"
        },
        {
          type: "flipgrid",
          cards: [
            { emoji: "🌅", front: "Fajr", sub: "Dawn", back: "Before sunrise, at dawn. 2 Rakat." },
            { emoji: "☀️", front: "Dhuhr", sub: "Midday", back: "After the sun passes its highest point, at midday. 4 Rakat." },
            { emoji: "🌤️", front: "Asr", sub: "Afternoon", back: "In the late afternoon. 4 Rakat." },
            { emoji: "🌇", front: "Maghrib", sub: "Sunset", back: "At dusk or just after sunset. 3 Rakat." },
            { emoji: "🌙", front: "Isha", sub: "Night", back: "Between sunset and midnight. 4 Rakat." }
          ]
        },
        {
          type: "ordergame",
          id: "prayersOrder",
          title: "Game: Put the prayers in order!",
          intro: "The five daily prayers are all mixed up! Use the ⬆ and ⬇ arrows (or drag them on a computer) to put them in the right order, from the first prayer of the day to the last. ⏰",
          steps: [
            { emoji: "🌅", label: "Fajr", hint: "dawn" },
            { emoji: "☀️", label: "Dhuhr", hint: "midday" },
            { emoji: "🌤️", label: "Asr", hint: "afternoon" },
            { emoji: "🌇", label: "Maghrib", hint: "sunset" },
            { emoji: "🌙", label: "Isha", hint: "night" }
          ]
        },
        {
          type: "callout",
          emoji: "⏰",
          title: "The order of the day",
          text: "Fajr → Dhuhr → Asr → Maghrib → Isha",
          meaning: "Prayer times follow the position of the sun, from dawn until night."
        }
      ],
      quiz: [
        { q: "How many prayers do Muslims pray every day?",
          options: ["5", "3", "4", "6"], answer: 0,
          explain: "Muslims pray five daily prayers: Fajr, Dhuhr, Asr, Maghrib and Isha." },
        { q: "Which prayer is prayed at dawn, before sunrise?",
          options: ["Fajr", "Dhuhr", "Maghrib", "Isha"], answer: 0,
          explain: "Fajr is prayed before sunrise, at dawn." },
        { q: "How many Rakat is the Fajr prayer?",
          options: ["2", "3", "4", "5"], answer: 0,
          explain: "Fajr is 2 Rakat." },
        { q: "Which prayer is prayed at midday, after the sun passes its highest point?",
          options: ["Dhuhr", "Asr", "Fajr", "Maghrib"], answer: 0,
          explain: "Dhuhr is prayed at midday." },
        { q: "Which prayer is prayed in the late afternoon?",
          options: ["Asr", "Dhuhr", "Isha", "Fajr"], answer: 0,
          explain: "Asr is the late afternoon prayer." },
        { q: "Which prayer is prayed at dusk, just after sunset?",
          options: ["Maghrib", "Isha", "Asr", "Fajr"], answer: 0,
          explain: "Maghrib is prayed just after sunset." },
        { q: "How many Rakat is the Maghrib prayer?",
          options: ["3", "2", "4", "5"], answer: 0,
          explain: "Maghrib is 3 Rakat." },
        { q: "Which prayer is prayed between sunset and midnight?",
          options: ["Isha", "Maghrib", "Asr", "Dhuhr"], answer: 0,
          explain: "Isha is prayed between sunset and midnight." },
        { q: "How many Rakat are Dhuhr, Asr and Isha each?",
          options: ["4", "2", "3", "5"], answer: 0,
          explain: "Dhuhr, Asr and Isha are each 4 Rakat." },
        { q: "Prayer times are based on the position of what in the sky?",
          options: ["The sun", "The moon", "The stars", "The clouds"], answer: 0,
          explain: "The prayer times are based on the position of the sun." },
        { q: "Which is the LAST of the five prayers each day?",
          options: ["Isha", "Maghrib", "Fajr", "Asr"], answer: 0,
          explain: "Isha, prayed between sunset and midnight, is the last prayer of the day." }
      ]
    },

    /* ---------- CHAPTER 6 ---------- */
    {
      id: "fatiha",
      title: "The Meaning of Surah Al-Fatiha",
      short: "Al-Fatiha",
      emoji: "📿",
      tagline: "What each verse of Surah Al-Fatiha means.",
      blocks: [
        {
          type: "lead",
          text: "Surah Al-Fatiha is a very special surah. Let's learn what each of its seven verses means. Read through them, then test yourself! 🤍"
        },
        {
          type: "timeline",
          events: [
            { label: "Verse 1", emoji: "1️⃣", text: "In the name of Allah, the Most Gracious, the Most Merciful." },
            { label: "Verse 2", emoji: "2️⃣", text: "All praise is for Allah, the Lord of all the worlds." },
            { label: "Verse 3", emoji: "3️⃣", text: "The Most Gracious, the Most Merciful." },
            { label: "Verse 4", emoji: "4️⃣", text: "Master of the Day of Judgment." },
            { label: "Verse 5", emoji: "5️⃣", text: "You alone we worship, and You alone we ask for help." },
            { label: "Verse 6", emoji: "6️⃣", text: "Guide us to the straight path." },
            { label: "Verse 7", emoji: "7️⃣", text: "The path of those You have blessed, not of those who have earned Your anger, nor of those who have gone astray." }
          ]
        }
      ],
      quiz: [
        { q: "How does Verse 1 begin?",
          options: ["In the name of Allah", "All praise is for Allah", "Master of the Day of Judgment", "Guide us to the straight path"], answer: 0,
          explain: "Verse 1: “In the name of Allah, the Most Gracious, the Most Merciful.”" },
        { q: "“In the name of Allah, the Most Gracious, the Most ___.”",
          options: ["Merciful", "Powerful", "Holy", "Wise"], answer: 0,
          explain: "“…the Most Gracious, the Most Merciful.”" },
        { q: "“All praise is for Allah, the Lord of all the ___.”",
          options: ["worlds", "people", "angels", "skies"], answer: 0,
          explain: "Verse 2: “All praise is for Allah, the Lord of all the worlds.”" },
        { q: "Which verse means “Master of the Day of Judgment”?",
          options: ["Verse 4", "Verse 2", "Verse 6", "Verse 7"], answer: 0,
          explain: "Verse 4: “Master of the Day of Judgment.”" },
        { q: "“You alone we worship, and You alone we ask for ___.”",
          options: ["help", "money", "food", "rain"], answer: 0,
          explain: "Verse 5: “You alone we worship, and You alone we ask for help.”" },
        { q: "In Verse 6, what do we ask Allah to guide us to?",
          options: ["The straight path", "A long life", "Lots of food", "A big house"], answer: 0,
          explain: "Verse 6: “Guide us to the straight path.”" },
        { q: "Verse 7 asks for the path of those Allah has ___.",
          options: ["blessed", "forgotten", "punished", "tested"], answer: 0,
          explain: "Verse 7: “The path of those You have blessed…”" },
        { q: "How many verses does Surah Al-Fatiha have?",
          options: ["7", "5", "10", "3"], answer: 0,
          explain: "Surah Al-Fatiha has 7 verses." }
      ]
    },

    /* ---------- CHAPTER 7 ---------- */
    {
      id: "names",
      title: "The First 10 Names of Allah",
      short: "Names of Allah",
      emoji: "💫",
      tagline: "Ten beautiful names of Allah and their meanings.",
      blocks: [
        {
          type: "lead",
          text: "Allah has many beautiful names. Here are the first ten and what they mean. Tap each card to flip it and see the meaning! 💫"
        },
        {
          type: "flipgrid",
          cards: [
            { emoji: "💗", front: "Ar-Rahman", sub: "Name of Allah", back: "The Most Gracious — the One whose mercy and kindness reaches all of creation." },
            { emoji: "💞", front: "Ar-Raheem", sub: "Name of Allah", back: "The Most Merciful — the One who shows special, lasting mercy to the believers." },
            { emoji: "👑", front: "Al-Malik", sub: "Name of Allah", back: "The King — the Sovereign and Owner of everything that exists." },
            { emoji: "🤍", front: "Al-Quddus", sub: "Name of Allah", back: "The Most Holy — the Pure One, free from any fault or imperfection." },
            { emoji: "🕊️", front: "As-Salam", sub: "Name of Allah", back: "The Source of Peace — the One who is perfect and gives safety and peace to others." },
            { emoji: "🛡️", front: "Al-Mu'min", sub: "Name of Allah", back: "The Giver of Faith — the One who grants security and keeps His promises." },
            { emoji: "👁️", front: "Al-Muhaymin", sub: "Name of Allah", back: "The Guardian — the Protector and Watcher over all of creation." },
            { emoji: "💪", front: "Al-Aziz", sub: "Name of Allah", back: "The Almighty — the All-Powerful who can never be overcome." },
            { emoji: "🔧", front: "Al-Jabbar", sub: "Name of Allah", back: "The Compeller — the One whose will is always carried out, and who mends what is broken." },
            { emoji: "🌟", front: "Al-Mutakabbir", sub: "Name of Allah", back: "The Supreme — the Greatest, the One who is truly worthy of all majesty and pride." }
          ]
        }
      ],
      quiz: [
        { q: "What does Ar-Rahman mean?",
          options: ["The Most Gracious", "The King", "The Guardian", "The Supreme"], answer: 0,
          explain: "Ar-Rahman — The Most Gracious, whose mercy reaches all of creation." },
        { q: "What does Ar-Raheem mean?",
          options: ["The Most Merciful", "The Most Holy", "The Almighty", "The Compeller"], answer: 0,
          explain: "Ar-Raheem — The Most Merciful, who shows special, lasting mercy to the believers." },
        { q: "Which name means “The King”?",
          options: ["Al-Malik", "Al-Quddus", "As-Salam", "Al-Aziz"], answer: 0,
          explain: "Al-Malik — The King, the Owner of everything that exists." },
        { q: "What does Al-Quddus mean?",
          options: ["The Most Holy", "The King", "The Guardian", "The Source of Peace"], answer: 0,
          explain: "Al-Quddus — The Most Holy, the Pure One, free from any fault." },
        { q: "Which name means “The Source of Peace”?",
          options: ["As-Salam", "Al-Mu'min", "Al-Malik", "Al-Mutakabbir"], answer: 0,
          explain: "As-Salam — The Source of Peace, who gives safety and peace to others." },
        { q: "What does Al-Mu'min mean?",
          options: ["The Giver of Faith", "The Almighty", "The Most Gracious", "The King"], answer: 0,
          explain: "Al-Mu'min — The Giver of Faith, who grants security and keeps His promises." },
        { q: "What does Al-Muhaymin mean?",
          options: ["The Guardian", "The Compeller", "The Most Merciful", "The Supreme"], answer: 0,
          explain: "Al-Muhaymin — The Guardian, the Protector and Watcher over all of creation." },
        { q: "Which name means “The Almighty”, the All-Powerful who can never be overcome?",
          options: ["Al-Aziz", "Al-Jabbar", "Al-Malik", "Al-Quddus"], answer: 0,
          explain: "Al-Aziz — The Almighty, who can never be overcome." },
        { q: "What does Al-Jabbar mean?",
          options: ["The Compeller", "The Guardian", "The Source of Peace", "The Most Holy"], answer: 0,
          explain: "Al-Jabbar — The Compeller, whose will is always carried out, and who mends what is broken." },
        { q: "What does Al-Mutakabbir mean?",
          options: ["The Supreme", "The King", "The Giver of Faith", "The Almighty"], answer: 0,
          explain: "Al-Mutakabbir — The Supreme, the Greatest, worthy of all majesty." }
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
      options: ["Eid al-Adha", "Eid al-Fitr", "Eid Milad", "Eid Ghadir"], answer: 0, explain: "Eid al-Adha." },
    { q: "Which prayer is prayed at dawn, before sunrise?",
      options: ["Fajr", "Dhuhr", "Maghrib", "Isha"], answer: 0, explain: "Fajr is the dawn prayer." },
    { q: "How many Rakat is the Maghrib prayer?",
      options: ["3", "2", "4", "5"], answer: 0, explain: "Maghrib is 3 Rakat." },
    { q: "Which is the last of the five daily prayers?",
      options: ["Isha", "Maghrib", "Asr", "Fajr"], answer: 0, explain: "Isha, between sunset and midnight." },
    { q: "In Surah Al-Fatiha, what do we ask Allah to guide us to?",
      options: ["The straight path", "A long life", "A big house", "Lots of food"], answer: 0, explain: "“Guide us to the straight path.”" },
    { q: "“All praise is for Allah, the Lord of all the ___.” (Al-Fatiha)",
      options: ["worlds", "people", "angels", "skies"], answer: 0, explain: "Verse 2 of Surah Al-Fatiha." },
    { q: "What does the name Ar-Rahman mean?",
      options: ["The Most Gracious", "The King", "The Guardian", "The Supreme"], answer: 0, explain: "Ar-Rahman — The Most Gracious." },
    { q: "Which name of Allah means “The King”?",
      options: ["Al-Malik", "Al-Quddus", "As-Salam", "Al-Aziz"], answer: 0, explain: "Al-Malik — The King." }
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
    { a: "Arafat", b: "Place of the last sermon" },
    { a: "Fajr", b: "Dawn prayer (2 Rakat)" },
    { a: "Maghrib", b: "Sunset prayer (3 Rakat)" },
    { a: "Al-Fatiha", b: "The opening surah (7 verses)" },
    { a: "Ar-Rahman", b: "The Most Gracious" },
    { a: "Al-Malik", b: "The King" }
  ]
};

/* ===========================================================
   EXAM 2 — TAJWEED (Level 3)
   Content is based on the teacher's notes in the tajweed/ folder:
     • Heavy & Light letters (Tafkheem / Tarqeeq)
     • Changing letters (Laam in "Allah" and Raa)
     • Sukoon
     • Madd (stretching)
     • Qalqalah (the bounce) and its 3 levels
     • Identifying the rules in real surahs
   =========================================================== */
const TAJWEED = {

  modules: [

    /* ---------- TAJWEED CHAPTER 1: Heavy & Light Letters ---------- */
    {
      id: "heavy-light",
      title: "Heavy & Light Letters",
      short: "Heavy/Light",
      emoji: "💪",
      tagline: "Some letters are heavy and full, others are light and thin.",
      blocks: [
        {
          type: "lead",
          text: "In Tajweed, some letters are read HEAVY — with a big, full mouth (this is called Tafkheem 💪). Other letters are LIGHT — thin and soft (this is called Tarqeeq 🍃). There are 7 letters that are ALWAYS heavy. Every other letter is light. Let's meet the 7 heavy letters!"
        },
        {
          type: "lettertiles",
          variant: "heavy",
          note: "The 7 letters that are ALWAYS heavy 💪",
          tiles: [
            { ar: "خ", name: "Khaa" },
            { ar: "ص", name: "Saad" },
            { ar: "ض", name: "Daad" },
            { ar: "غ", name: "Ghayn" },
            { ar: "ط", name: "Taa" },
            { ar: "ق", name: "Qaaf" },
            { ar: "ظ", name: "Dhaa" }
          ]
        },
        {
          type: "callout",
          emoji: "🌟",
          title: "Remember the 7 heavy letters!",
          text: "خ ص ض غ ط ق ظ",
          meaning: "Every other letter is light 🍃. Tip: a heavy letter fills your mouth like a big yawn; a light letter is thin like a smile."
        },
        {
          type: "sortgame",
          id: "hlSort",
          title: "Game: Heavy or Light?",
          intro: "Tap a letter to pick it up, then tap the box it belongs in. Put every letter in the right box and press Check! 💪🍃",
          buckets: [
            { id: "heavy", label: "Heavy 💪", hint: "full mouth" },
            { id: "light", label: "Light 🍃", hint: "thin & soft" }
          ],
          items: [
            { ar: "ق", tip: "Qaaf", cat: "heavy" },
            { ar: "ص", tip: "Saad", cat: "heavy" },
            { ar: "غ", tip: "Ghayn", cat: "heavy" },
            { ar: "ط", tip: "Taa", cat: "heavy" },
            { ar: "ب", tip: "Baa", cat: "light" },
            { ar: "ف", tip: "Faa", cat: "light" },
            { ar: "س", tip: "Seen", cat: "light" },
            { ar: "ك", tip: "Kaaf", cat: "light" }
          ]
        }
      ],
      quiz: [
        { q: "How do we read a HEAVY letter?",
          options: ["With a big, full mouth", "Thin and soft", "Very fast", "Silently"], answer: 0,
          explain: "A heavy letter (Tafkheem) is read with a big, full mouth." },
        { q: "How many letters are ALWAYS heavy?",
          options: ["7", "5", "3", "10"], answer: 0,
          explain: "There are 7 always-heavy letters: خ ص ض غ ط ق ظ." },
        { q: "Which of these is a HEAVY letter?",
          options: ["ق", "ب", "س", "ف"], answer: 0,
          explain: "ق (Qaaf) is one of the 7 heavy letters." },
        { q: "Which of these is a LIGHT letter?",
          options: ["ب", "ص", "ط", "غ"], answer: 0,
          explain: "ب (Baa) is light. ص, ط and غ are all heavy." },
        { q: "Reading a letter heavy and full is called…?",
          options: ["Tafkheem", "Tarqeeq", "Madd", "Qalqalah"], answer: 0,
          explain: "Tafkheem means making a letter heavy and full." },
        { q: "Reading a letter light and thin is called…?",
          options: ["Tarqeeq", "Tafkheem", "Sukoon", "Shaddah"], answer: 0,
          explain: "Tarqeeq means making a letter light and thin." },
        { q: "Is ط (Taa) heavy or light?",
          options: ["Heavy", "Light"], answer: 0,
          explain: "ط (Taa) is one of the 7 heavy letters." },
        { q: "Is ك (Kaaf) heavy or light?",
          options: ["Light", "Heavy"], answer: 0,
          explain: "ك (Kaaf) is light — it is not one of the 7 heavy letters." }
      ]
    },

    /* ---------- TAJWEED CHAPTER 2: Changing Letters (Laam & Raa) ---------- */
    {
      id: "changing",
      title: "Changing Letters — Laam & Raa",
      short: "Changing",
      emoji: "🔄",
      tagline: "Laam and Raa can change between heavy and light.",
      blocks: [
        {
          type: "lead",
          text: "Some special letters can CHANGE — sometimes heavy, sometimes light! The two changing letters are Laam (ل) in the word \"Allah\", and Raa (ر). What decides? The little vowel signs: Fatha ( َ ), Dammah ( ُ ) and Kasrah ( ِ ). Tap a card to see how they change."
        },
        {
          type: "arflip",
          cards: [
            { ar: "وَاللّٰه", translit: "Wallahu", sub: "the sound before is 'a' (Fatha)",
              back: "HEAVY Laam 💪 — say a deep, full \"Allah\"." },
            { ar: "بِاللّٰه", translit: "Billahi", sub: "the sound before is 'ee' (Kasrah)",
              back: "LIGHT Laam 🍃 — say a soft, gentle \"Allah\"." },
            { ar: "رَبُّكُم", translit: "Rabbukum", sub: "the Raa has a Fatha ( َ )",
              back: "HEAVY Raa 💪 — a strong, deep \"RRR\"." },
            { ar: "رِزْقًا", translit: "Rizqan", sub: "the Raa has a Kasrah ( ِ )",
              back: "LIGHT Raa 🍃 — a soft, thin \"r\"." }
          ]
        },
        {
          type: "callout",
          emoji: "🎯",
          title: "Easy trick!",
          text: "\"ee\" sound (Kasrah) → LIGHT · \"a\" or \"u\" sound (Fatha/Dammah) → HEAVY",
          meaning: "This works for both the Laam in \"Allah\" and the letter Raa."
        },
        {
          type: "sortgame",
          id: "raaSort",
          title: "Game: Is the Raa Heavy or Light?",
          intro: "Look at the vowel on the Raa (ر). Fatha or Dammah = heavy 💪. Kasrah = light 🍃. Sort them all!",
          buckets: [
            { id: "heavy", label: "Heavy Raa 💪", hint: "Fatha / Dammah" },
            { id: "light", label: "Light Raa 🍃", hint: "Kasrah" }
          ],
          items: [
            { ar: "رَبّ", tip: "Rabb", cat: "heavy" },
            { ar: "رَحْمٰن", tip: "Rahmaan", cat: "heavy" },
            { ar: "رُسُل", tip: "Rusul", cat: "heavy" },
            { ar: "رِزْق", tip: "Rizq", cat: "light" },
            { ar: "رِجَال", tip: "Rijaal", cat: "light" },
            { ar: "رِيح", tip: "Reeh", cat: "light" }
          ]
        }
      ],
      quiz: [
        { q: "The two CHANGING letters are…?",
          options: ["Laam & Raa", "Baa & Taa", "Seen & Sheen", "Alif & Waw"], answer: 0,
          explain: "Laam (in \"Allah\") and Raa can change between heavy and light." },
        { q: "In \"Wallahu\" (وَاللّٰه), the sound before is 'a' (Fatha), so the Laam is…?",
          options: ["Heavy", "Light"], answer: 0,
          explain: "After a Fatha or Dammah, the Laam in \"Allah\" is heavy." },
        { q: "In \"Billahi\" (بِاللّٰه), the sound before is 'ee' (Kasrah), so the Laam is…?",
          options: ["Light", "Heavy"], answer: 0,
          explain: "After a Kasrah, the Laam in \"Allah\" is light." },
        { q: "Raa with a Kasrah ( ِ ) is…?",
          options: ["Light", "Heavy"], answer: 0,
          explain: "A Kasrah ('ee' sound) makes the Raa light." },
        { q: "Raa with a Fatha ( َ ) or Dammah ( ُ ) is…?",
          options: ["Heavy", "Light"], answer: 0,
          explain: "Fatha ('a') or Dammah ('u') makes the Raa heavy." },
        { q: "In \"Rabbukum\" (رَبُّكُم), the Raa is…?",
          options: ["Heavy", "Light"], answer: 0,
          explain: "The Raa has a Fatha, so it is heavy — a deep \"RRR\"." },
        { q: "In \"Rizqan\" (رِزْقًا), the Raa is…?",
          options: ["Light", "Heavy"], answer: 0,
          explain: "The Raa has a Kasrah, so it is light and thin." },
        { q: "The 'ee' (Kasrah) sound makes a changing letter…?",
          options: ["Light", "Heavy"], answer: 0,
          explain: "\"ee\" (Kasrah) → light. \"a\"/\"u\" (Fatha/Dammah) → heavy." }
      ]
    },

    /* ---------- TAJWEED CHAPTER 3: Sukoon ---------- */
    {
      id: "sukoon",
      title: "Sukoon — the Stop Sign",
      short: "Sukoon",
      emoji: "🛑",
      tagline: "A letter with no vowel — stop quickly, don't stretch.",
      blocks: [
        {
          type: "lead",
          text: "Sukoon ( ْ ) is a tiny circle ○ on top of a letter. It means the letter has NO vowel — no Fatha, no Kasrah, no Dammah. When a letter has sukoon we stop quickly on it and join it to the letter before. We do NOT stretch it!"
        },
        {
          type: "callout",
          emoji: "🚦",
          title: "Think of Sukoon like a RED LIGHT in a race!",
          text: "Stop quickly on the letter and don't stretch it.",
          meaning: "The sukoon letter is the one with the little circle ○ on top."
        },
        {
          type: "arflip",
          cards: [
            { ar: "بَكْر", translit: "Bakr", sub: "which letter has the ○?",
              back: "The ك (Kaaf) has sukoon — read it short, joined to the letter before." },
            { ar: "نُور", translit: "Noor", sub: "which letter has the ○?",
              back: "The ر (Raa) has sukoon — a short \"r\", not \"Raaa\"." },
            { ar: "حَمْد", translit: "Hamd", sub: "which letter has the ○?",
              back: "The م (Meem) has sukoon — read it quickly with no vowel." },
            { ar: "ذِكْر", translit: "Dhikr", sub: "which letter has the ○?",
              back: "The ك (Kaaf) has sukoon — stop quickly, joined to the ذ before." }
          ]
        }
      ],
      quiz: [
        { q: "Sukoon means the letter has…?",
          options: ["No vowel", "Two vowels", "A long stretch", "A bounce"], answer: 0,
          explain: "Sukoon means the letter has no vowel (no Fatha, Kasrah or Dammah)." },
        { q: "The sukoon sign looks like a…?",
          options: ["Small circle ○", "Straight line", "Big dot", "Star"], answer: 0,
          explain: "Sukoon is a small circle ○ placed on top of a letter." },
        { q: "When a letter has sukoon we…?",
          options: ["Stop quickly and don't stretch", "Stretch it long", "Skip it", "Say it twice"], answer: 0,
          explain: "We stop quickly on the letter and do not stretch it." },
        { q: "A letter with sukoon joins with the letter…?",
          options: ["Before it", "After it", "At the very end", "In another word"], answer: 0,
          explain: "A sukoon letter joins with the letter before it." },
        { q: "In \"Noor\" (نُور), which letter has the sukoon?",
          options: ["ر (Raa)", "ن (Noon)", "و (Waw)"], answer: 0,
          explain: "The ر (Raa) has the sukoon ○ — read it short." },
        { q: "In \"Bakr\" (بَكْر), which letter has the sukoon?",
          options: ["ك (Kaaf)", "ب (Baa)", "ر (Raa)"], answer: 0,
          explain: "The ك (Kaaf) has the sukoon ○." },
        { q: "Do we stretch a letter that has sukoon?",
          options: ["No, we stop quickly", "Yes, very long", "Yes, a little"], answer: 0,
          explain: "No — sukoon means stop quickly, don't stretch." },
        { q: "Sukoon is like which traffic light?",
          options: ["Red 🚦 (stop)", "Green (go)", "Yellow (slow)"], answer: 0,
          explain: "Sukoon is like a red light — stop quickly on the letter!" }
      ]
    },

    /* ---------- TAJWEED CHAPTER 4: Madd ---------- */
    {
      id: "madd",
      title: "Madd — the Stretch",
      short: "Madd",
      emoji: "〰️",
      tagline: "Stretch the sound smoothly, for 2 counts.",
      blocks: [
        {
          type: "lead",
          text: "Madd means to STRETCH a sound. We stretch it smoothly for 2 counts — like \"Aaa\". It is smooth, NOT bouncy! There are 3 Madd letters: Alif (ا), Waw (و) and Yaa (ي). A Madd letter has NO vowel sign on it."
        },
        {
          type: "lettertiles",
          variant: "madd",
          note: "The 3 Madd letters 〰️",
          tiles: [
            { ar: "ا", name: "Alif", sub: "after Fatha → \"Aaa\"" },
            { ar: "و", name: "Waw", sub: "after Dammah → \"Ooo\"" },
            { ar: "ي", name: "Yaa", sub: "after Kasrah → \"Eee\"" }
          ]
        },
        {
          type: "arflip",
          cards: [
            { ar: "بَا", translit: "Baa", sub: "Alif after Fatha", back: "Stretch: \"Baaa\" 〰️ (2 counts)." },
            { ar: "بُو", translit: "Boo", sub: "Waw after Dammah", back: "Stretch: \"Booo\" 〰️ (2 counts)." },
            { ar: "بِي", translit: "Bee", sub: "Yaa after Kasrah", back: "Stretch: \"Beee\" 〰️ (2 counts)." },
            { ar: "قَال", translit: "Qaal", sub: "Alif after Fatha on ق", back: "Stretch: \"Qaaal\" 〰️." },
            { ar: "نُور", translit: "Noor", sub: "Waw after Dammah on ن", back: "Stretch: \"Nooor\" 〰️." },
            { ar: "فِيل", translit: "Feel", sub: "Yaa after Kasrah on ف", back: "Stretch: \"Feeel\" 〰️." }
          ]
        },
        {
          type: "callout",
          emoji: "🎯",
          title: "Remember!",
          text: "Stretch Madd for 2 counts — smooth and long.",
          meaning: "NO Madd if there's no Alif, Waw or Yaa. And Madd is smooth — not bouncy like Qalqalah!"
        },
        {
          type: "sortgame",
          id: "maddSort",
          title: "Game: Has Madd or No Madd?",
          intro: "Does the word have a stretch (Alif ا, Waw و, or Yaa ي with no vowel)? Sort them! 〰️✋",
          buckets: [
            { id: "madd", label: "Has Madd 〰️", hint: "there's a stretch" },
            { id: "no", label: "No Madd ✋", hint: "no ا و ي" }
          ],
          items: [
            { ar: "نُور", tip: "Noor", cat: "madd" },
            { ar: "قَال", tip: "Qaal", cat: "madd" },
            { ar: "فِيل", tip: "Feel", cat: "madd" },
            { ar: "كَتَبَ", tip: "Kataba", cat: "no" },
            { ar: "مَلِك", tip: "Malik", cat: "no" },
            { ar: "أَحَد", tip: "Ahad", cat: "no" }
          ]
        }
      ],
      quiz: [
        { q: "Madd means to…?",
          options: ["Stretch a sound", "Stop quickly", "Bounce", "Read it heavy"], answer: 0,
          explain: "Madd means to stretch a sound smoothly." },
        { q: "The 3 Madd letters are…?",
          options: ["ا و ي", "ب ت ث", "ق ط ب", "خ ص ض"], answer: 0,
          explain: "The 3 Madd letters are Alif (ا), Waw (و) and Yaa (ي)." },
        { q: "How many counts do we stretch a Madd?",
          options: ["2", "5", "1", "10"], answer: 0,
          explain: "We stretch Madd for 2 counts." },
        { q: "Is Madd smooth or bouncy?",
          options: ["Smooth", "Bouncy"], answer: 0,
          explain: "Madd is one smooth stretch — not bouncy like Qalqalah." },
        { q: "A Madd letter has…?",
          options: ["No vowel sign on it", "A Fatha", "A Shaddah", "A bounce"], answer: 0,
          explain: "Madd letters don't have a harakah (no Fatha, Dammah or Kasrah)." },
        { q: "After a Kasrah ( ِ ), the Madd letter is…?",
          options: ["Yaa (ي) → \"Eee\"", "Waw (و) → \"Ooo\"", "Alif (ا) → \"Aaa\""], answer: 0,
          explain: "A Kasrah is followed by Yaa (ي) to make an \"Eee\" stretch." },
        { q: "After a Dammah ( ُ ), the Madd letter is…?",
          options: ["Waw (و) → \"Ooo\"", "Yaa (ي) → \"Eee\"", "Alif (ا) → \"Aaa\""], answer: 0,
          explain: "A Dammah is followed by Waw (و) to make an \"Ooo\" stretch." },
        { q: "Is there Madd in \"Malik\" (مَلِك)?",
          options: ["No — there's no Alif, Waw or Yaa", "Yes, a long one"], answer: 0,
          explain: "There is no Madd letter in \"Malik\", so there's no stretch." }
      ]
    },

    /* ---------- TAJWEED CHAPTER 5: Qalqalah ---------- */
    {
      id: "qalqalah-ch",
      title: "Qalqalah — the Bounce",
      short: "Qalqalah",
      emoji: "⚡",
      tagline: "The bouncing echo of 5 special letters.",
      blocks: [
        {
          type: "lead",
          text: "Qalqalah means a BOUNCE or ECHO sound! It happens when 5 special letters have a sukoon ○. It's like a tiny pop or bounce at the end. The 5 Qalqalah letters are: ق ط ب ج د."
        },
        {
          type: "lettertiles",
          variant: "qalqalah",
          note: "The 5 Qalqalah letters ⚡",
          tiles: [
            { ar: "ق", name: "Qaaf" },
            { ar: "ط", name: "Taa" },
            { ar: "ب", name: "Baa" },
            { ar: "ج", name: "Jeem" },
            { ar: "د", name: "Daal" }
          ]
        },
        {
          type: "callout",
          emoji: "🎵",
          title: "Remember the 5 Qalqalah letters!",
          text: "ق ط ب ج د",
          meaning: "They bounce when they have a sukoon ○. Try saying them together: \"Qutb Jad\"!"
        },
        {
          type: "levels",
          title: "The 3 Levels of Qalqalah",
          items: [
            { color: "green", name: "Small (Sughra) 🟢", ar: "أَجْرْ",
              desc: "The bounce is in the MIDDLE of a word and you keep going. This is the smallest bounce.",
              tip: "the ج bounces a little" },
            { color: "amber", name: "Medium (Wusta) 🟡", ar: "أَحَدْ",
              desc: "You STOP on the letter at the END of a word or ayah (with no shaddah). A bigger bounce.",
              tip: "the د bounces more" },
            { color: "red", name: "Big (Kubra) 🔴", ar: "وَتَبَّ",
              desc: "You STOP at the end AND the letter has a Shaddah ( ّ ). This is the BIGGEST bounce!",
              tip: "the ب bounces the most" }
          ]
        },
        {
          type: "callout",
          emoji: "🌟",
          title: "Important!",
          text: "At the END of an ayah you might NOT see the sukoon circle ○…",
          meaning: "…but the sukoon is still there — so the letter still bounces!"
        },
        {
          type: "sortgame",
          id: "qalqalahSort",
          title: "Game: Which Qalqalah Level?",
          intro: "Middle of a word = Small 🟢. Stop at the end (no shaddah) = Medium 🟡. Stop at the end WITH a shaddah = Big 🔴. Sort them all!",
          buckets: [
            { id: "small", label: "Small 🟢", hint: "middle of word" },
            { id: "medium", label: "Medium 🟡", hint: "stop, no shaddah" },
            { id: "big", label: "Big 🔴", hint: "stop + shaddah" }
          ],
          items: [
            { ar: "أَجْرْ", tip: "aj-r", cat: "small" },
            { ar: "أَقْبَلَ", tip: "aq-bala", cat: "small" },
            { ar: "أَحَدْ", tip: "a-had", cat: "medium" },
            { ar: "وَقَبْ", tip: "wa-qab", cat: "medium" },
            { ar: "وَتَبَّ", tip: "wa-tabb", cat: "big" },
            { ar: "الْحَقّْ", tip: "al-haqq", cat: "big" }
          ]
        }
      ],
      quiz: [
        { q: "Qalqalah means a…?",
          options: ["Bounce or echo", "Long stretch", "Silence", "Heavy sound"], answer: 0,
          explain: "Qalqalah is a bounce or echo sound." },
        { q: "How many Qalqalah letters are there?",
          options: ["5", "7", "3", "10"], answer: 0,
          explain: "There are 5 Qalqalah letters: ق ط ب ج د." },
        { q: "The Qalqalah letters are…?",
          options: ["ق ط ب ج د", "ا و ي", "خ ص ض غ", "ل ر ن م"], answer: 0,
          explain: "The 5 Qalqalah letters are ق ط ب ج د." },
        { q: "Qalqalah happens when a Qalqalah letter has a…?",
          options: ["Sukoon ○", "Fatha", "Madd", "Kasrah"], answer: 0,
          explain: "A Qalqalah letter bounces when it has a sukoon." },
        { q: "Which of these is a Qalqalah letter?",
          options: ["ق", "س", "ف", "م"], answer: 0,
          explain: "ق (Qaaf) is one of the 5 Qalqalah letters." },
        { q: "SMALL Qalqalah is when the bounce is…?",
          options: ["In the middle of a word", "At the end with a shaddah", "At the end with no shaddah"], answer: 0,
          explain: "Small (Sughra) Qalqalah is a bounce in the middle of a word." },
        { q: "MEDIUM Qalqalah is when you STOP at the end…?",
          options: ["With no shaddah", "In the middle", "With a shaddah"], answer: 0,
          explain: "Medium (Wusta) Qalqalah is stopping at the end with no shaddah." },
        { q: "BIG Qalqalah is when you stop at the end AND the letter has a…?",
          options: ["Shaddah ( ّ )", "Kasrah", "Madd"], answer: 0,
          explain: "Big (Kubra) Qalqalah is stopping at the end with a shaddah." },
        { q: "In \"Watabba\" (وَتَبَّ), the bounce is…?",
          options: ["Big (stop + shaddah)", "Small (middle)", "No bounce"], answer: 0,
          explain: "وَتَبَّ ends with a shaddah and you stop — so it's Big Qalqalah." },
        { q: "At the end of an ayah, even with no circle ○, the sukoon…?",
          options: ["Is still there", "Disappears", "Becomes a Fatha"], answer: 0,
          explain: "The sukoon is still there, so the letter still bounces." }
      ]
    },

    /* ---------- TAJWEED CHAPTER 6: Reading the Surahs ---------- */
    {
      id: "surahs",
      title: "Spotting Rules in the Surahs",
      short: "The Surahs",
      emoji: "📿",
      tagline: "Put it all together and find the rules in real surahs.",
      blocks: [
        {
          type: "lead",
          text: "Now let's put it all together and spot the rules in real surahs! Look for heavy letters, changing letters (Laam & Raa) and Qalqalah bounces. Tap each surah card."
        },
        {
          type: "journey",
          stops: [
            { day: "Surah An-Naas", title: "Heavy letters & the changing Raa", emoji: "📖",
              text: "Find heavy letters like ق in قُلْ. The Raa is HEAVY in بِرَبِّ (it has a Fatha), but LIGHT in صُدُور (it has a Kasrah). صُدُور also hides a heavy letter — the ص (Saad)!" },
            { day: "Surah Quraysh", title: "Heavy letters & Raa again", emoji: "🕋",
              text: "Spot the heavy letters (خ ص ض غ ط ق ظ). The Raa is LIGHT in قُرَيْش because it has a Kasrah. When a Raa has a Fatha on top instead, it becomes HEAVY." },
            { day: "Surah Al-Falaq", title: "All Medium Qalqalah 🟡", emoji: "🌅",
              text: "In Surah Al-Falaq, all the Qalqalah is MEDIUM — because the bounce is at the end of the ayah with no shaddah. Listen for it in الْفَلَقْ, وَقَبْ, الْعُقَدْ and حَاسِدْ." },
            { day: "Surah Al-Masad", title: "Find the Big Qalqalah 🔴", emoji: "🔥",
              text: "Here you can find BIG Qalqalah in وَتَبَّ — the ب has a shaddah AND you stop, so it's the biggest bounce. Also look for the Shaddah ( ّ ) sign in the surah." }
          ]
        },
        {
          type: "callout",
          emoji: "🏆",
          title: "You did it! Quick recap:",
          text: "7 heavy letters · changing Laam & Raa · Sukoon = stop · Madd = stretch (2 counts) · Qalqalah = bounce (3 levels)",
          meaning: "Take the quiz to show how much you know — you're ready for the Tajweed exam! 🌟"
        }
      ],
      quiz: [
        { q: "In Surah Al-Falaq, the Qalqalah is which level?",
          options: ["Medium 🟡", "Big 🔴", "Small 🟢"], answer: 0,
          explain: "All the Qalqalah in Al-Falaq is Medium — a stop at the end with no shaddah." },
        { q: "In \"watabba\" (وَتَبَّ) in Surah Al-Masad, the Qalqalah is…?",
          options: ["Big 🔴", "Small 🟢", "Medium 🟡"], answer: 0,
          explain: "وَتَبَّ has a shaddah and you stop, so it's Big Qalqalah." },
        { q: "In \"biRabbi\" (بِرَبِّ), the Raa has a Fatha, so it is…?",
          options: ["Heavy", "Light"], answer: 0,
          explain: "A Fatha on the Raa makes it heavy." },
        { q: "In \"Sudoor\" (صُدُور), the Raa has a Kasrah, so it is…?",
          options: ["Light", "Heavy"], answer: 0,
          explain: "A Kasrah on the Raa makes it light." },
        { q: "\"Sudoor\" (صُدُور) also has a heavy letter — which one?",
          options: ["ص (Saad)", "د (Daal)", "ر (Raa)"], answer: 0,
          explain: "ص (Saad) is one of the 7 always-heavy letters." },
        { q: "In \"Qul\" (قُلْ), which is the heavy letter?",
          options: ["ق (Qaaf)", "ل (Laam)", "و (Waw)"], answer: 0,
          explain: "ق (Qaaf) is a heavy letter." },
        { q: "The Shaddah on وَتَبَّ makes the bounce…?",
          options: ["Bigger (Big Qalqalah)", "Smaller", "Disappear"], answer: 0,
          explain: "A shaddah plus stopping makes the biggest bounce — Big Qalqalah." },
        { q: "Which surah is a great place to find BIG Qalqalah?",
          options: ["Al-Masad", "An-Naas", "Al-Falaq"], answer: 0,
          explain: "Surah Al-Masad has Big Qalqalah in وَتَبَّ." }
      ]
    }
  ],

  /* The big final quiz — a mix from every Tajweed chapter. */
  finalQuiz: [
    { q: "How many letters are ALWAYS heavy?",
      options: ["7", "5", "3", "10"], answer: 0, explain: "There are 7 heavy letters: خ ص ض غ ط ق ظ." },
    { q: "Reading a letter heavy and full is called…?",
      options: ["Tafkheem", "Tarqeeq", "Madd", "Qalqalah"], answer: 0, explain: "Tafkheem = heavy and full." },
    { q: "Which of these is a HEAVY letter?",
      options: ["ص", "ب", "س", "ك"], answer: 0, explain: "ص (Saad) is one of the 7 heavy letters." },
    { q: "The two CHANGING letters are…?",
      options: ["Laam & Raa", "Baa & Taa", "Alif & Waw", "Seen & Sheen"], answer: 0, explain: "Laam (in Allah) and Raa change." },
    { q: "Raa with a Kasrah ( ِ ) is…?",
      options: ["Light", "Heavy"], answer: 0, explain: "\"ee\" (Kasrah) → light Raa." },
    { q: "In \"Wallahu\" (وَاللّٰه), the Laam is…?",
      options: ["Heavy", "Light"], answer: 0, explain: "A Fatha before \"Allah\" makes the Laam heavy." },
    { q: "Sukoon means the letter has…?",
      options: ["No vowel", "Two vowels", "A long stretch", "A bounce"], answer: 0, explain: "Sukoon = no vowel." },
    { q: "When a letter has sukoon we…?",
      options: ["Stop quickly, don't stretch", "Stretch it long", "Skip it"], answer: 0, explain: "Stop quickly on it." },
    { q: "Madd means to…?",
      options: ["Stretch a sound", "Bounce", "Stop quickly", "Read it heavy"], answer: 0, explain: "Madd = stretch." },
    { q: "The 3 Madd letters are…?",
      options: ["ا و ي", "ق ط ب", "خ ص ض", "ب ت ث"], answer: 0, explain: "Alif, Waw and Yaa." },
    { q: "How many counts do we stretch a Madd?",
      options: ["2", "5", "1", "10"], answer: 0, explain: "We stretch Madd for 2 counts." },
    { q: "Qalqalah means a…?",
      options: ["Bounce or echo", "Stretch", "Silence", "Heavy sound"], answer: 0, explain: "Qalqalah = bounce/echo." },
    { q: "The Qalqalah letters are…?",
      options: ["ق ط ب ج د", "ا و ي", "خ ص ض غ", "ل ر ن م"], answer: 0, explain: "ق ط ب ج د." },
    { q: "Qalqalah happens when a Qalqalah letter has a…?",
      options: ["Sukoon ○", "Fatha", "Madd", "Kasrah"], answer: 0, explain: "A sukoon makes it bounce." },
    { q: "BIG Qalqalah is when you stop at the end AND the letter has a…?",
      options: ["Shaddah ( ّ )", "Kasrah", "Madd"], answer: 0, explain: "Stop + shaddah = Big Qalqalah." },
    { q: "In Surah Al-Falaq, the Qalqalah is which level?",
      options: ["Medium 🟡", "Big 🔴", "Small 🟢"], answer: 0, explain: "All Medium — stop at the end, no shaddah." },
    { q: "Is Madd smooth or bouncy?",
      options: ["Smooth", "Bouncy"], answer: 0, explain: "Madd is smooth; Qalqalah is bouncy." },
    { q: "Reading a letter light and thin is called…?",
      options: ["Tarqeeq", "Tafkheem", "Sukoon", "Shaddah"], answer: 0, explain: "Tarqeeq = light and thin." }
  ],

  /* Pairs for the Memory Match game (Fun Zone). */
  memoryPairs: [
    { a: "Tafkheem", b: "Heavy (full mouth)" },
    { a: "Tarqeeq", b: "Light (thin & soft)" },
    { a: "Sukoon ○", b: "No vowel — stop quickly" },
    { a: "Madd", b: "Stretch for 2 counts" },
    { a: "Qalqalah", b: "Bounce / echo" },
    { a: "ق ط ب ج د", b: "The 5 Qalqalah letters" },
    { a: "خ ص ض غ ط ق ظ", b: "The 7 heavy letters" },
    { a: "ا و ي", b: "The 3 Madd letters" },
    { a: "Shaddah ّ", b: "Doubles the letter" },
    { a: "Changing letters", b: "Laam & Raa" },
    { a: "Small Qalqalah 🟢", b: "Bounce in the middle" },
    { a: "Big Qalqalah 🔴", b: "Stop + Shaddah" }
  ]
};

/* ===========================================================
   THE TWO EXAMS — this is what the app reads.
   Each exam has its own chapters, final quiz and games.
   =========================================================== */
const APP_DATA = {
  exams: [
    {
      id: "islamic",
      title: "Islamic Studies",
      subtitle: "Term 1 · 7 chapters",
      emoji: "🕌",
      blurb: "The Five Pillars, the Prophet ﷺ, Salah duas, Hajj, prayer times, Al-Fatiha & the Names of Allah.",
      funGame: { kind: "order", moduleId: "hajj", gameId: "hajjOrder",
                 emoji: "🕋", title: "Hajj Order Challenge", desc: "Put the steps of Hajj in order!" },
      modules: ISLAMIC.modules,
      finalQuiz: ISLAMIC.finalQuiz,
      memoryPairs: ISLAMIC.memoryPairs
    },
    {
      id: "tajweed",
      title: "Tajweed",
      subtitle: "Level 3 · 6 chapters",
      emoji: "📖",
      blurb: "Heavy & light letters, changing Laam & Raa, Sukoon, Madd, Qalqalah and reading the surahs beautifully.",
      funGame: { kind: "sort", moduleId: "qalqalah-ch", gameId: "qalqalahSort",
                 emoji: "🌈", title: "Qalqalah Levels Sort", desc: "Sort the bounces: Small, Medium & Big!" },
      modules: TAJWEED.modules,
      finalQuiz: TAJWEED.finalQuiz,
      memoryPairs: TAJWEED.memoryPairs
    }
  ]
};
