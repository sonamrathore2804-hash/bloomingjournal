// Smart keyword-based flower & quote matching — no API key needed

const FLOWER_PROFILES = {
  rose: {
    keywords: [
      'love','loved','loving','heart','miss','missing','longing','longed',
      'romance','romantic','passion','passionate','desire','desire','crush',
      'heartbreak','heartbroken','broken','hurt','pain','ache','aching',
      'relationship','partner','boyfriend','girlfriend','husband','wife',
      'together','apart','distance','close','tender','tenderness','deep',
      'feel','feeling','feelings','emotion','emotional','soulmate','connection',
    ],
    quotes: [
      { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
      { text: "We loved with a love that was more than love.", author: "Edgar Allan Poe" },
      { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott" },
      { text: "The heart wants what it wants — or else it does not care.", author: "Emily Dickinson" },
      { text: "Love is not consolation. It is light.", author: "Simone Weil" },
      { text: "The most important thing in the world is to learn to give out love, and to let it come in.", author: "Morrie Schwartz" },
      { text: "Where you used to be, there is a hole in the world, which I find myself constantly walking around in the daytime.", author: "Edna St. Vincent Millay" },
    ],
    reflection: (entry) => `Your words carry the weight of a heart that feels deeply — and that depth is a gift, not a burden. Like a rose that blooms even with thorns, the love and longing you carry is proof of how fully you're living.`,
  },

  sunflower: {
    keywords: [
      'hope','hopeful','hoping','dream','dreaming','dreams','goal','goals',
      'future','forward','new','start','beginning','change','grow','growing',
      'growth','better','improve','trying','try','effort','work','working',
      'excited','exciting','happy','happiness','joy','joyful','smile','smiling',
      'energy','motivated','motivation','inspired','inspire','possible','can',
      'morning','sun','light','bright','positive','optimistic','believe','faith',
      'strong','strength','rise','rising','move','moving','progress','achieve',
    ],
    quotes: [
      { text: "Keep your face always toward the sunshine, and shadows will fall behind you.", author: "Walt Whitman" },
      { text: "Once you choose hope, anything is possible.", author: "Christopher Reeve" },
      { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
      { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
      { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    ],
    reflection: (entry) => `There's a quiet courage in the way you're looking ahead — a sunflower always finds the light, and so do you. Whatever you're reaching for, the very fact that you're reaching means you're already growing.`,
  },

  lotus: {
    keywords: [
      'hard','difficult','difficulty','struggle','struggling','tough','challenge',
      'challenging','overwhelmed','overwhelm','stress','stressed','anxious','anxiety',
      'worry','worried','fear','scared','afraid','lost','confusion','confused',
      'tired','exhausted','exhaustion','drained','heavy','burden','stuck',
      'heal','healing','healed','recover','recovery','surviving','survive',
      'overcome','overcoming','through','despite','still','peace','peaceful',
      'calm','breathe','breathing','okay','better','finally','slowly','gentle',
      'therapy','mental','health','grateful','gratitude','lesson','learned',
    ],
    quotes: [
      { text: "Out of difficulties grow miracles.", author: "Jean de La Bruyère" },
      { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.", author: "Lori Deschene" },
      { text: "The lotus flower blooms most beautifully from the deepest and thickest mud.", author: "Buddhist proverb" },
      { text: "Even the darkest night will end and the sun will rise.", author: "Victor Hugo" },
      { text: "You were given this life because you are strong enough to live it.", author: "Robin Sharma" },
      { text: "Healing is not linear. Be patient with yourself.", author: "Unknown" },
      { text: "Rock bottom became the solid foundation on which I rebuilt my life.", author: "J.K. Rowling" },
    ],
    reflection: (entry) => `What you're carrying is real, and it's okay that it feels heavy right now. Like the lotus that rises through murky water to bloom in open air, you are already in the process of becoming — even on the days it doesn't feel that way.`,
  },

  lavender: {
    keywords: [
      'remember','remembering','memory','memories','past','used to','once','ago',
      'nostalgia','nostalgic','childhood','child','young','years','time','back',
      'miss','missing','old','home','family','mother','father','grandmother',
      'grandfather','friend','friends','gone','left','changed','change',
      'quiet','still','slow','soft','gentle','rest','resting','tired',
      'evening','night','twilight','dusk','alone','solitude','think','thinking',
      'reflect','reflection','journal','write','writing','wonder','wondering',
      'melancholy','wistful','bittersweet','simple','ordinary','everyday',
    ],
    quotes: [
      { text: "We do not remember days, we remember moments.", author: "Cesare Pavese" },
      { text: "Quiet is peace. Tranquility. Quiet is turning down the volume knob on life.", author: "Khaled Hosseini" },
      { text: "Sometimes you will never know the value of a moment until it becomes a memory.", author: "Dr. Seuss" },
      { text: "Almost everything will work again if you unplug it for a few minutes — including you.", author: "Anne Lamott" },
      { text: "There is virtue in work and there is virtue in rest. Use both and overlook neither.", author: "Alan Cohen" },
      { text: "You don't always need a plan. Sometimes you just need to breathe, trust, let go.", author: "Mandy Hale" },
      { text: "The present moment always will have been.", author: "Unknown" },
    ],
    reflection: (entry) => `There's something tender in the way you're sitting with your thoughts today — not rushing, just feeling. Lavender grows slowly, releasing its fragrance most gently, and there's wisdom in that quietness you're practicing.`,
  },

  daisy: {
    keywords: [
      'today','good','nice','fun','played','walked','ate','cooked','made',
      'small','little','simple','ordinary','routine','morning','coffee','tea',
      'sunshine','outside','weather','season','spring','summer','garden',
      'laugh','laughed','laughing','smile','smiled','silly','funny','light',
      'grateful','thankful','appreciate','appreciation','blessed','blessing',
      'friend','friendship','family','together','shared','enjoyed','enjoy',
      'fresh','clean','new','free','easy','relief','relieved','content',
      'satisfied','enough','perfect','beautiful','wonder','surprise','noticed',
    ],
    quotes: [
      { text: "Enjoy the little things, for one day you may look back and realize they were the big things.", author: "Robert Brault" },
      { text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.", author: "Thích Nhất Hạnh" },
      { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama" },
      { text: "Find joy in the ordinary.", author: "Unknown" },
      { text: "Life is not measured by the number of breaths we take, but by the moments that take our breath away.", author: "Maya Angelou" },
      { text: "Bloom where you are planted.", author: "Saint Francis de Sales" },
      { text: "Today is a good day to have a good day.", author: "Unknown" },
    ],
    reflection: (entry) => `There's a gentle magic in the way you noticed the small things today — daisies don't compete with roses, they simply open wide and face the sun. That lightness and presence you're carrying is its own kind of grace.`,
  },

  cherry_blossom: {
    keywords: [
      'ending','end','over','finish','finished','leaving','leave','goodbye',
      'moving','move','transition','change','chapter','next','last','final',
      'soon','while','fleeting','temporary','moment','brief','passing',
      'birthday','anniversary','graduation','wedding','loss','grief','grieving',
      'season','autumn','fall','winter','letting go','let go','release',
      'accept','acceptance','impermanence','appreciate','present','now',
      'growing up','older','age','aging','time flies','bittersweet',
      'beautiful','short','precious','treasure','hold','savour','savor',
    ],
    quotes: [
      { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
      { text: "Nothing is permanent. Everything is subject to change. Being is always becoming.", author: "Buddha" },
      { text: "The flowers of late winter and early spring occupy places in our hearts well out of proportion to their size.", author: "Gertrude S. Wister" },
      { text: "Life is not what it's supposed to be. It's what it is. The way you cope with it is what makes the difference.", author: "Virginia Satir" },
      { text: "Impermanence is not something to be sad about. It's to be celebrated.", author: "Pema Chödrön" },
      { text: "One must always be careful of blossom. The moment you think you have it, it passes you by.", author: "Unknown" },
      { text: "To everything there is a season, and a time to every purpose under heaven.", author: "Ecclesiastes 3:1" },
    ],
    reflection: (entry) => `Cherry blossoms are loved not in spite of their briefness, but because of it — their beauty is inseparable from how quickly they pass. You seem to be feeling that same tender awareness of time, and that sensitivity is something rare and beautiful.`,
  },
};

// Score each flower by counting keyword matches
function scoreEntry(text, keywords) {
  const lower = text.toLowerCase();
  const words = lower.split(/\W+/);
  let score = 0;
  for (const kw of keywords) {
    if (words.some(w => w === kw || w.startsWith(kw))) score++;
    // partial phrase match
    if (lower.includes(kw)) score += 0.5;
  }
  return score;
}

// Pick a random quote from the matched flower
function pickQuote(quotes) {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export async function analyzeJournalEntry(text) {
  // Small delay so the loading screen doesn't flash too fast
  await new Promise(r => setTimeout(r, 900));

  const scores = {};
  for (const [flower, profile] of Object.entries(FLOWER_PROFILES)) {
    scores[flower] = scoreEntry(text, profile.keywords);
  }

  // Pick highest scoring flower; fall back to daisy if nothing matches
  let best = 'daisy';
  let bestScore = 0;
  for (const [flower, score] of Object.entries(scores)) {
    if (score > bestScore) { bestScore = score; best = flower; }
  }

  const profile = FLOWER_PROFILES[best];
  const quote = pickQuote(profile.quotes);

  return {
    flower: best,
    quote: quote.text,
    author: quote.author,
    reflection: profile.reflection(text),
  };
}
