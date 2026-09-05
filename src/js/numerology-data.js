/**
 * CHALDEAN VEDIC NUMEROLOGY DATA MODEL & CONTENT GENERATOR
 * Core Numbers:
 * 1. Radical Number (Mulank): Day of birth reduced to 1-9
 * 2. Destiny Number (Bhagyank): Full DOB (DD+MM+YYYY) reduced to 1-9
 * 3. Name Number (Namank): Chaldean Alphabet gematria reduced to 1-9
 */

// Chaldean Letter Values (No letter maps to 9)
export const CHALDEAN_VALUES = {
  a: 1, i: 1, j: 1, q: 1, y: 1,
  b: 2, k: 2, r: 2,
  c: 3, g: 3, l: 3, s: 3,
  d: 4, m: 4, t: 4,
  e: 5, h: 5, n: 5, x: 5,
  u: 6, v: 6, w: 6,
  o: 7, z: 7,
  f: 8, p: 8
};

/**
 * Reduce any integer to a single digit 1-9
 */
export function reduceToSingleDigit(num) {
  num = parseInt(num, 10);
  if (isNaN(num) || num <= 0) return 1;
  while (num > 9) {
    num = String(num)
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num;
}

/**
 * Calculate Radical Number (Mulank) from birth date
 * Sum of the digits of the birth day only, reduced to 1-9
 */
export function calculateMulank(dobInput) {
  let day = 1;
  if (dobInput instanceof Date && !isNaN(dobInput.getTime())) {
    day = dobInput.getDate();
  } else if (typeof dobInput === 'string') {
    const clean = dobInput.trim();
    if (clean.includes('-')) {
      const parts = clean.split('-');
      day = parseInt(parts[2], 10) || 1;
    } else if (clean.includes('/')) {
      const parts = clean.split('/');
      day = parseInt(parts[0], 10) || 1;
    }
  }
  return reduceToSingleDigit(day);
}

/**
 * Calculate Destiny Number (Bhagyank) from full birth date
 * Sum of every single digit across day, month, year reduced to 1-9
 */
export function calculateBhagyank(dobInput) {
  let day = 1, month = 1, year = 2000;
  if (dobInput instanceof Date && !isNaN(dobInput.getTime())) {
    day = dobInput.getDate();
    month = dobInput.getMonth() + 1;
    year = dobInput.getFullYear();
  } else if (typeof dobInput === 'string') {
    const clean = dobInput.trim();
    if (clean.includes('-')) {
      const parts = clean.split('-');
      year = parseInt(parts[0], 10) || 2000;
      month = parseInt(parts[1], 10) || 1;
      day = parseInt(parts[2], 10) || 1;
    } else if (clean.includes('/')) {
      const parts = clean.split('/');
      day = parseInt(parts[0], 10) || 1;
      month = parseInt(parts[1], 10) || 1;
      year = parseInt(parts[2], 10) || 2000;
    }
  }

  // Sum every digit across the full DOB
  const dateStr = `${day}${month}${year}`;
  let total = 0;
  for (const char of dateStr) {
    const d = parseInt(char, 10);
    if (!isNaN(d)) total += d;
  }
  return reduceToSingleDigit(total);
}

/**
 * Calculate Name Number (Namank) using Chaldean letter valuations
 */
export function calculateNamank(fullName) {
  if (!fullName || typeof fullName !== 'string') return 1;
  const clean = fullName.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean.length) return 1;

  let sum = 0;
  for (const char of clean) {
    sum += CHALDEAN_VALUES[char] || 0;
  }
  return reduceToSingleDigit(sum);
}

/**
 * Static JSON Lookup Table for Numbers 1-9
 * Fields:
 * - ruling_planet
 * - favourable_sign
 * - favourable_alphabets
 * - gemstone
 * - favourable_days
 * - favourable_number
 * - direction
 * - auspicious_colour
 * - god_goddess
 * - fast_day
 * - favourable_dates
 * - mantra
 */
export const NUMEROLOGY_DATA = {
  1: {
    number: 1,
    title: "The Sovereign Pioneer",
    ruling_planet: "Sun (Surya)",
    planet_symbol: "☉",
    favourable_sign: "Leo (Simha)",
    favourable_alphabets: "A, I, J, Q, Y",
    gemstone: "Ruby (Manikya) set in Gold or Copper",
    favourable_days: "Sunday and Monday",
    favourable_number: "1, 2, 3, 9",
    direction: "East (Purva)",
    auspicious_colour: "Golden Yellow, Orange, Copper & Royal Red",
    god_goddess: "Lord Surya & Lord Shiva",
    fast_day: "Sunday (Ravivar) with saltless diet",
    favourable_dates: "1st, 10th, 19th, 28th, 2nd, 3rd, and 9th of any month",
    mantra: "Om Hram Hrim Hraum Sah Suryaya Namah (ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः)"
  },
  2: {
    number: 2,
    title: "The Gentle Luminary",
    ruling_planet: "Moon (Chandra)",
    planet_symbol: "☽",
    favourable_sign: "Cancer (Karka)",
    favourable_alphabets: "B, K, R",
    gemstone: "Natural Pearl (Moti) or Moonstone set in Silver",
    favourable_days: "Monday and Sunday",
    favourable_number: "1, 2, 4, 7",
    direction: "North-West (Vayavya)",
    auspicious_colour: "Pearly White, Cream, Silver & Sea Green",
    god_goddess: "Goddess Parvati & Lord Shiva",
    fast_day: "Monday (Somvar)",
    favourable_dates: "2nd, 11th, 20th, 29th, 1st, 4th, and 7th of any month",
    mantra: "Om Shram Shrim Shraum Sah Chandraya Namah (ॐ श्रां श्रीं श्रौं सः चन्द्राय नमः)"
  },
  3: {
    number: 3,
    title: "The Divine Preceptor",
    ruling_planet: "Jupiter (Guru / Brihaspati)",
    planet_symbol: "♃",
    favourable_sign: "Sagittarius (Dhanu) & Pisces (Meena)",
    favourable_alphabets: "C, G, L, S",
    gemstone: "Yellow Sapphire (Pukhraj) or Topaz set in Gold",
    favourable_days: "Thursday and Tuesday",
    favourable_number: "3, 6, 9, 1",
    direction: "North-East (Ishanya)",
    auspicious_colour: "Bright Yellow, Saffron, Gold & Amber",
    god_goddess: "Lord Vishnu & Lord Brihaspati",
    fast_day: "Thursday (Guruvar)",
    favourable_dates: "3rd, 12th, 21st, 30th, 1st, 6th, and 9th of any month",
    mantra: "Om Gram Grim Graum Sah Gurave Namah (ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः)"
  },
  4: {
    number: 4,
    title: "The Visionary Architect",
    ruling_planet: "Rahu (North Lunar Node)",
    planet_symbol: "☊",
    favourable_sign: "Virgo (Kanya) & Gemini (Mithuna)",
    favourable_alphabets: "D, M, T",
    gemstone: "Hessonite Garnet (Gomed) set in Ashtadhatu or Silver",
    favourable_days: "Saturday and Sunday",
    favourable_number: "1, 4, 6, 8",
    direction: "South-West (Nairutya)",
    auspicious_colour: "Smoky Blue, Grey, Electric Cyan & Khaki",
    god_goddess: "Lord Bhairava & Goddess Saraswati",
    fast_day: "Saturday (Shanivar)",
    favourable_dates: "4th, 13th, 22nd, 31st, 1st, 6th, and 8th of any month",
    mantra: "Om Bhram Bhrim Bhraum Sah Rahave Namah (ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः)"
  },
  5: {
    number: 5,
    title: "The Agile Catalyst",
    ruling_planet: "Mercury (Budha)",
    planet_symbol: "☿",
    favourable_sign: "Gemini (Mithuna) & Virgo (Kanya)",
    favourable_alphabets: "E, H, N, X",
    gemstone: "Emerald (Panna) or Peridot set in Gold or Bronze",
    favourable_days: "Wednesday and Friday",
    favourable_number: "1, 5, 6",
    direction: "North (Uttara)",
    auspicious_colour: "Emerald Green, Mint, Turquoise & Light Olive",
    god_goddess: "Lord Vishnu & Lord Ganesha",
    fast_day: "Wednesday (Budhavar)",
    favourable_dates: "5th, 14th, 23rd, 1st, 6th, and 15th of any month",
    mantra: "Om Bram Brim Braum Sah Budhaya Namah (ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः)"
  },
  6: {
    number: 6,
    title: "The Radiant Harmonizer",
    ruling_planet: "Venus (Shukra)",
    planet_symbol: "♀",
    favourable_sign: "Taurus (Vrishabha) & Libra (Tula)",
    favourable_alphabets: "U, V, W",
    gemstone: "Diamond (Heera) or White Zircon set in Platinum or Silver",
    favourable_days: "Friday and Wednesday",
    favourable_number: "3, 6, 9, 5",
    direction: "South-East (Agneya)",
    auspicious_colour: "Dazzling White, Light Blue, Rose Pink & Pastel Violet",
    god_goddess: "Goddess Lakshmi & Goddess Shukra-Devi",
    fast_day: "Friday (Shukravar)",
    favourable_dates: "6th, 15th, 24th, 3rd, 9th, and 18th of any month",
    mantra: "Om Dram Drim Draum Sah Shukraya Namah (ॐ द्रां द्रीं द्रौं सः शुक्राय नमः)"
  },
  7: {
    number: 7,
    title: "The Mystic Seeker",
    ruling_planet: "Ketu (South Lunar Node)",
    planet_symbol: "☋",
    favourable_sign: "Pisces (Meena) & Sagittarius (Dhanu)",
    favourable_alphabets: "O, Z",
    gemstone: "Cat's Eye (Lehsunia) set in Silver or Panchadhatu",
    favourable_days: "Tuesday and Thursday",
    favourable_number: "1, 2, 7",
    direction: "North-East (Ishanya)",
    auspicious_colour: "Smoky Green, Light Yellow, Mottled Grey & Beige",
    god_goddess: "Lord Ganesha & Lord Matsya Avatar",
    fast_day: "Tuesday or Thursday (Mangal / Guruvar)",
    favourable_dates: "7th, 16th, 25th, 1st, 2nd, and 10th of any month",
    mantra: "Om Stram Strim Straum Sah Ketave Namah (ॐ स्रां स्रीं स्रौं सः केतवे नमः)"
  },
  8: {
    number: 8,
    title: "The Pillar of Karma",
    ruling_planet: "Saturn (Shani)",
    planet_symbol: "♄",
    favourable_sign: "Capricorn (Makara) & Aquarius (Kumbha)",
    favourable_alphabets: "F, P",
    gemstone: "Blue Sapphire (Neelam) or Amethyst set in Iron or Silver",
    favourable_days: "Saturday and Wednesday",
    favourable_number: "4, 8, 5",
    direction: "West (Pashchima)",
    auspicious_colour: "Deep Navy Blue, Midnight Black, Charcoal & Dark Violet",
    god_goddess: "Lord Shani & Lord Hanuman",
    fast_day: "Saturday (Shanivar)",
    favourable_dates: "8th, 17th, 26th, 4th, 5th, and 13th of any month",
    mantra: "Om Pram Prim Praum Sah Shanaischaraya Namah (ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः)"
  },
  9: {
    number: 9,
    title: "The Cosmic Warrior",
    ruling_planet: "Mars (Mangala)",
    planet_symbol: "♂",
    favourable_sign: "Aries (Mesha) & Scorpio (Vrischika)",
    favourable_alphabets: "A, C, G, L, S (synergistic through 9-resonance)",
    gemstone: "Red Coral (Moonga) set in Copper or Gold",
    favourable_days: "Tuesday and Thursday",
    favourable_number: "1, 3, 9",
    direction: "South (Dakshina)",
    auspicious_colour: "Crimson Red, Scarlet, Coral & Deep Pink",
    god_goddess: "Lord Hanuman & Lord Kartikeya (Murugan)",
    fast_day: "Tuesday (Mangalvar)",
    favourable_dates: "9th, 18th, 27th, 1st, 3rd, and 12th of any month",
    mantra: "Om Kram Krim Kraum Sah Bhaumaya Namah (ॐ क्रां क्रीं क्रौं सः भौमाय नमः)"
  }
};

/**
 * Sacred Geometric Magic Squares and Consecration Rituals for each planetary Yantra
 */
export const YANTRA_DATA = {
  1: {
    name: "Surya Yantra (Solar Power & Divine Vitality)",
    day: "Sunday morning during Shukla Paksha",
    nakshatra: "Krittika, Uttara Phalguni, or Uttara Ashadha",
    metal: "Pure Copper or Gold Plate",
    grid: [[6, 1, 8], [7, 5, 3], [2, 9, 4]],
    constant: 15,
    consecration: "Inscribe on a copper plate on Sunday at sunrise. Purify with Ganga jal and cow's milk. Offer red sandalwood paste, jaggery, and red flowers. Chant the Surya Beej Mantra 7,000 times before placing in the East."
  },
  2: {
    name: "Chandra Yantra (Lunar Peace & Intuitive Balance)",
    day: "Monday evening or Full Moon night (Purnima)",
    nakshatra: "Rohini, Hasta, or Shravana",
    metal: "Pure Silver Plate",
    grid: [[7, 2, 9], [8, 6, 4], [3, 10, 5]],
    constant: 18,
    consecration: "Consecrate on a Monday night under moonlight. Bathe with unboiled raw milk and water. Anoint with white sandalwood paste and white jasmine flowers. Recite the Chandra mantra 11,000 times before establishing in the North-West."
  },
  3: {
    name: "Guru Yantra (Jupiterian Wisdom & Auspicious Grace)",
    day: "Thursday morning during Brahma Muhurta",
    nakshatra: "Punarvasu, Vishakha, or Purva Bhadrapada",
    metal: "Gold-Plated Copper or Brass",
    grid: [[10, 5, 12], [11, 9, 7], [6, 13, 8]],
    constant: 27,
    consecration: "Engrave on brass or gold-plated copper on a bright Thursday. Cleanse with Panchamrit. Offer yellow marigold blossoms, saffron, and chana dal. Chant the Guru mantra 19,000 times to invite divine preceptor blessings."
  },
  4: {
    name: "Rahu Yantra (Modern Breakthroughs & Shield of Insight)",
    day: "Saturday evening at dusk during Krishna Paksha",
    nakshatra: "Ardra, Swati, or Shatabhisha",
    metal: "Ashtadhatu (Eight-Metal Alloy) or Lead",
    grid: [[13, 8, 15], [14, 12, 10], [9, 16, 11]],
    constant: 36,
    consecration: "Energize on a Saturday at sunset. Purify with holy water. Offer blue flowers, mustard oil lamp, and black sesame seeds. Recite the Rahu Beej mantra 18,000 times to transform confusion into visionary focus."
  },
  5: {
    name: "Budha Yantra (Mercurial Intellect & Commercial Prosperity)",
    day: "Wednesday morning at sunrise",
    nakshatra: "Ashlesha, Jyeshtha, or Revati",
    metal: "Polished Brass or Bronze",
    grid: [[9, 4, 11], [10, 8, 6], [5, 12, 7]],
    constant: 24,
    consecration: "Prepare on a Wednesday morning during waxing moon. Cleanse with Gangajal. Offer fresh green tulsi leaves, green grass, and unbroken rice. Chant the Budha mantra 9,000 times to activate commercial acumen."
  },
  6: {
    name: "Shukra Yantra (Venusian Luxury, Romance & Harmony)",
    day: "Friday morning at dawn",
    nakshatra: "Bharani, Purva Phalguni, or Purva Ashadha",
    metal: "Pure Silver or Platinum Foil",
    grid: [[11, 6, 13], [12, 10, 8], [7, 14, 9]],
    constant: 30,
    consecration: "Consecrate on Friday sunrise. Cleanse with fragrant rose water and milk. Adorn with white lotus, camphor incense, and silver leaf. Chant the Shukra mantra 16,000 times to attract beauty and refined wealth."
  },
  7: {
    name: "Ketu Yantra (Spiritual Liberation & Occult Clarity)",
    day: "Tuesday or Thursday evening at twilight",
    nakshatra: "Ashwini, Magha, or Mula",
    metal: "Copper, Silver, or Panchadhatu",
    grid: [[14, 9, 16], [15, 13, 11], [10, 17, 12]],
    constant: 39,
    consecration: "Inscribe on copper on Tuesday dusk. Purify with water and sacred ashes (vibhuti). Offer mixed multi-colored flowers, guggul dhoop, and yellow cloth. Recite Ketu mantra 17,000 times to awaken spiritual discernment."
  },
  8: {
    name: "Shani Yantra (Saturnian Discipline, Justice & Iron Will)",
    day: "Saturday evening during twilight",
    nakshatra: "Pushya, Anuradha, or Uttara Bhadrapada",
    metal: "Iron or Cast Steel Plate",
    grid: [[12, 7, 14], [13, 11, 9], [8, 15, 10]],
    constant: 33,
    consecration: "Consecrate on a Saturday evening under a sacred Peepal tree. Anoint with pure mustard oil. Offer blue aparajita flowers, black urad dal, and iron nails. Chant the Shani Beej mantra 23,000 times for steadfast protection."
  },
  9: {
    name: "Mangala Yantra (Martian Valor, Victory & Physical Vigor)",
    day: "Tuesday noon during Shukla Paksha",
    nakshatra: "Mrigashira, Chitra, or Dhanistha",
    metal: "Pure Copper Plate",
    grid: [[8, 3, 10], [9, 7, 5], [4, 11, 6]],
    constant: 21,
    consecration: "Engrave on pure copper on Tuesday at midday. Purify with water and red kumkum. Offer red hibiscus flowers, jaggery, and red sandalwood paste. Chant the Mangala Beej mantra 10,000 times to bestow triumphant courage."
  }
};

/**
 * Generate decorative SVG representation of Sacred Planetary Yantra
 */
export function generateYantraSvg(num) {
  const y = YANTRA_DATA[num] || YANTRA_DATA[1];
  const grid = y.grid;

  return `<svg class="ck-yantra-svg" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${y.name}">
    <defs>
      <radialGradient id="yantraglow-${num}" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#f2d38a" stop-opacity="0.25"/>
        <stop offset="60%" stop-color="#c9a24b" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#0a0818" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="goldgrad-${num}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffe699"/>
        <stop offset="50%" stop-color="#c9a24b"/>
        <stop offset="100%" stop-color="#9a7628"/>
      </linearGradient>
    </defs>
    <rect width="320" height="320" rx="14" fill="#0c091f" stroke="rgba(201,162,75,0.3)" stroke-width="1.5"/>
    <circle cx="160" cy="160" r="145" fill="url(#yantraglow-${num})"/>
    <!-- Sacred Bhupura (Outer Stepped Enclosure) -->
    <path d="M 40 40 H 130 V 20 H 190 V 40 H 280 V 130 H 300 V 190 H 280 V 280 H 190 V 300 H 130 V 280 H 40 V 190 H 20 V 130 H 40 Z"
          fill="none" stroke="url(#goldgrad-${num})" stroke-width="2"/>
    <rect x="48" y="48" width="224" height="224" fill="none" stroke="#f2d38a" stroke-width="1" stroke-dasharray="3,3" opacity="0.6"/>
    <!-- Concentric Rings & Lotus Petals -->
    <circle cx="160" cy="160" r="105" fill="none" stroke="url(#goldgrad-${num})" stroke-width="1.5"/>
    <circle cx="160" cy="160" r="88" fill="none" stroke="#c9a24b" stroke-width="1" opacity="0.8"/>
    <!-- 8-Directional Radial Rays -->
    <line x1="160" y1="55" x2="160" y2="72" stroke="#f2d38a" stroke-width="1.5"/>
    <line x1="160" y1="248" x2="160" y2="265" stroke="#f2d38a" stroke-width="1.5"/>
    <line x1="55" y1="160" x2="72" y2="160" stroke="#f2d38a" stroke-width="1.5"/>
    <line x1="248" y1="160" x2="265" y2="160" stroke="#f2d38a" stroke-width="1.5"/>
    <line x1="85" y1="85" x2="98" y2="98" stroke="#f2d38a" stroke-width="1.5"/>
    <line x1="235" y1="235" x2="222" y2="222" stroke="#f2d38a" stroke-width="1.5"/>
    <line x1="235" y1="85" x2="222" y2="98" stroke="#f2d38a" stroke-width="1.5"/>
    <line x1="85" y1="235" x2="98" y2="222" stroke="#f2d38a" stroke-width="1.5"/>
    <!-- Central 3x3 Magic Grid -->
    <rect x="90" y="90" width="140" height="140" fill="rgba(10,8,24,0.75)" stroke="url(#goldgrad-${num})" stroke-width="2"/>
    <line x1="136.6" y1="90" x2="136.6" y2="230" stroke="#c9a24b" stroke-width="1.2"/>
    <line x1="183.3" y1="90" x2="183.3" y2="230" stroke="#c9a24b" stroke-width="1.2"/>
    <line x1="90" y1="136.6" x2="230" y2="136.6" stroke="#c9a24b" stroke-width="1.2"/>
    <line x1="90" y1="183.3" x2="230" y2="183.3" stroke="#c9a24b" stroke-width="1.2"/>
    <!-- Magic Square Digits -->
    <text x="113.3" y="119" font-family="'Cinzel', serif" font-size="16" font-weight="700" fill="#f2d38a" text-anchor="middle">${grid[0][0]}</text>
    <text x="160" y="119" font-family="'Cinzel', serif" font-size="16" font-weight="700" fill="#f2d38a" text-anchor="middle">${grid[0][1]}</text>
    <text x="206.6" y="119" font-family="'Cinzel', serif" font-size="16" font-weight="700" fill="#f2d38a" text-anchor="middle">${grid[0][2]}</text>
    <text x="113.3" y="165.6" font-family="'Cinzel', serif" font-size="16" font-weight="700" fill="#f2d38a" text-anchor="middle">${grid[1][0]}</text>
    <text x="160" y="165.6" font-family="'Cinzel', serif" font-size="16" font-weight="700" fill="#ffb703" text-anchor="middle">${grid[1][1]}</text>
    <text x="206.6" y="165.6" font-family="'Cinzel', serif" font-size="16" font-weight="700" fill="#f2d38a" text-anchor="middle">${grid[1][2]}</text>
    <text x="113.3" y="212.3" font-family="'Cinzel', serif" font-size="16" font-weight="700" fill="#f2d38a" text-anchor="middle">${grid[2][0]}</text>
    <text x="160" y="212.3" font-family="'Cinzel', serif" font-size="16" font-weight="700" fill="#f2d38a" text-anchor="middle">${grid[2][1]}</text>
    <text x="206.6" y="212.3" font-family="'Cinzel', serif" font-size="16" font-weight="700" fill="#f2d38a" text-anchor="middle">${grid[2][2]}</text>
  </svg>`;
}

/**
 * 81 Rich Paragraphs (9 sections x 9 numbers)
 * Strictly structured per specification:
 * 1. Radical Number: 2 paragraphs (personality/character tied to planet + behavioral traits)
 * 2. Destiny Number: 2 paragraphs (life pattern, ups/downs, warnings + karmic trajectory)
 * 3. Name Number: 2 paragraphs (Chaldean concept + personalized analysis naming user)
 * 4. Auspicious Place: 1 paragraph (direction + specific cities/countries)
 * 5. Health: 1 paragraph (illness tendencies + remedies/yoga)
 * 6. Auspicious Time: 1 paragraph (lucky months/periods/hours)
 * 7. Career: 1 paragraph (specific job fields/industries)
 * 8. Fasts & Remedies: 1 paragraph (fasting count, clothing color, donations, mantra)
 * 9. Yantra: 1 paragraph (yantra name, day, nakshatra, consecration ritual)
 */
export const DESCRIPTIVE_CONTENT = {
  1: {
    mulank_p1: (name) => `${name}, governed by Radical Number 1, your core psychological essence is vitalized by the resplendent energy of the Sun (Surya). As the celestial sovereign of the planetary pantheon, the Sun endows you with an innate sense of dignity, radiant ambition, and an unquenchable drive for self-governance. You view life through the lens of individual mastery, possessing an original intellect that prefers initiating untrodden pathways rather than treading upon worn collective trails. Your natural aura commands instinctive respect, and you operate with an upright moral code that scorns deceit, underhanded diplomacy, and small-minded pettiness.`,
    mulank_p2: (name) => `In daily behavioral conduct, you are an unequivocal leader rather than a passive follower; being placed in subservient or micromanaged roles suffocates your creative spirit. Your social nature is aristocratic yet warm—you maintain a small, handpicked circle of loyal confidants who honor your integrity rather than a sprawling crowd of superficial acquaintances. However, your intense sensitivity to perceived disrespect or loss of prestige can occasionally manifest as stubborn authoritarianism or impatience. Cultivating humility and active listening transforms your fiery solar authority into inspirational leadership.`,

    bhagyank_p1: (name) => `With Destiny Number 1, ${name}, your overarching worldly trajectory follows a steep, heroic arc marked by early institutional friction followed by decisive ascension to prominence. You will encounter phases where the universe tests your self-reliance by stripping away convenient safety nets, compelling you to trust your singular vision. Beware of slipping into autocratic arrogance, extreme impatience, or pessimistic despair when initial plans encounter bureaucratic delays; setbacks are merely designed to forge your executive resilience.`,
    bhagyank_p2: (name) => `Your karmic life mission is to demonstrate that enlightened willpower can transmute adversity into lasting cultural or institutional monuments. Destiny persistently places you at the vanguard of new ventures, where your courage serves as an anchor for more hesitant souls. As you learn to share the spotlight and elevate worthy collaborators, your worldly accomplishments become permanent foundations of honor and benevolence.`,

    namank_concept: `In the ancient Chaldean acoustic tradition, the Name Number (Namank) serves as the vibrational broadcasting frequency through which the mortal world perceives and receives your inner identity. While the Radical and Destiny numbers represent natal cosmic blueprints, your Name Number governs everyday social magnetism, professional negotiations, and the goodwill generated whenever your name is spoken, written, or remembered across the collective sphere.`,
    namank_personal: (name) => `An analysis of your name, ${name}, suggests that your Chaldean Name Number 1 projects supreme clarity of purpose, executive gravitas, and creative distinction. It aligns your everyday voice with the solar vibration, ensuring that clients, superiors, and social circles instinctively perceive you as a decisive authority capable of spearheading complex initiatives and inspiring lasting trust.`,

    auspicious_place: "East (Purva) direction; auspicious cities and global regions include New York, Tokyo, London, Delhi, Rome, Cairo, and sunny elevated plateaus, grand civic capitals, high architectural elevations, and sun-drenched eastward-facing residences.",
    health: "Vitality is centered in the cardiovascular system, heart, eyesight, blood pressure, and spinal column. Guard against heat exhaustion, high arterial tension during intense mental strain, and eye fatigue. Practice Surya Namaskar (Sun Salutations) at sunrise, Bhastrika pranayama, and prioritize clean morning sunlight exposure.",
    auspicious_time: "The celestial solar transit between March 21 and April 28 (Sun in Aries) and July 21 to August 20 (Sun in Leo); daily golden hours occur from sunrise until 10:30 AM on clear mornings.",
    career: "Senior government administration (civil services), corporate chief executive roles, politics, diplomacy, independent entrepreneurship, surgical medicine, jewelry and precious metals commerce, and executive project directorship.",
    fasts_remedies: "Observe fasts on 12 or 30 consecutive Sundays (Ravivar); consume saltless food once before sunset; dress in saffron, gold, or copper garments; donate wheat, jaggery, or copper vessels to spiritual seekers; chant the Surya Gayatri Mantra 108 times daily.",
    yantra_desc: "Surya Yantra engraved on pure copper plate; consecrated on a Sunday morning at dawn during Shukla Paksha under Krittika or Uttara Phalguni nakshatra; activated with red flowers, red sandalwood paste, and 7,000 chants of the Surya Beej mantra."
  },
  2: {
    mulank_p1: (name) => `${name}, ruled by Radical Number 2, your psyche is illuminated by the reflective, gentle, and deeply perceptive luminescence of the Moon (Chandra). You possess profound emotional intelligence, psychic empathy, and an instinctual understanding of the unseen currents that govern human relationships. Like the tides drawn by lunar gravity, your thoughts are fluid, imaginative, and deeply resonant with beauty, poetry, and artistic rhythm. You seek peace above victory and naturally harmonize discordant social spaces with your soothing presence.`,
    mulank_p2: (name) => `Behaviorally, you are a master of diplomatic collaboration and gentle alliance-building, excelling far more in cooperative partnerships than in ruthless, isolated competition. Your social circle is formed through soulful emotional bonds; you are a devoted, attentive confidant who feels the unspoken sorrows of those around you. However, because your psychic antenna is so receptive, you are highly sensitive to emotional coldness, sharp criticism, or chaotic environments, which can trigger sudden bouts of self-doubt or melancholic withdrawal. Establishing energetic boundaries preserves your luminous grace.`,

    bhagyank_p1: (name) => `With Destiny Number 2, ${name}, your worldly path mirrors the waxing and waning cycles of the Moon, characterized by alternating periods of public prominence and contemplative retreat. Success is achieved not through brute force, but through strategic patience, emotional endurance, and intuitive timing. You must vigilantly avoid pessimistic over-thinking, paralyzing indecision, and the temptation to play the martyr when others fail to reciprocate your emotional depth.`,
    bhagyank_p2: (name) => `Your karmic evolution requires you to step into the role of the sacred bridge-builder—one who heals social, familial, and ideological fractures. As you mature, your destiny elevates you into advisory, creative, and diplomatic positions where your acute perception resolves conflicts that logical intellect alone cannot fathom. When you trust your inner knowing over external noise, abundance flows effortlessly.`,

    namank_concept: `In Chaldean esoteric science, the Name Number signifies the acoustic resonance of your mortal calling card. It acts as an energetic prism that translates your internal intentions into outer perception, shaping the initial impressions, subconscious trust, and social warmth you elicit from the collective environment throughout your life.`,
    namank_personal: (name) => `An analysis of your name, ${name}, suggests that your Chaldean Name Number 2 emits gentle charm, artistic sensitivity, and reassuring diplomacy. It softens aggressive social resistance, invites spontaneous emotional confidence from peers, and makes you naturally magnetic in artistic, advisory, and cooperative negotiations.`,

    auspicious_place: "North-West (Vayavya) direction; fortunate cities and coastal havens include Venice, Paris, Amsterdam, Vancouver, Sydney, Mumbai, Geneva, and serene lakeside retreats, coastal islands, river valleys, and artistically designed gardens.",
    health: "Governs the digestive tract, stomach lining, lymphatic circulation, breasts, and emotional nervous stability. Prone to water-retention, gastric acidity, seasonal emotional melancholy, and psychosomatic fatigue. Practice Chandra Bhedana pranayama, drink water from a pure silver vessel, and take evening walks beside calm bodies of water.",
    auspicious_time: "The lush period between June 21 and July 22 (Moon in Cancer) and waxing moon fortnights (Shukla Paksha); daily peak hours occur during evening twilight and soothing moonlit nights.",
    career: "Psychology, counseling, creative literature, interior design, international diplomacy, healthcare, nursing, hospitality, dairy and maritime commerce, and fine visual arts.",
    fasts_remedies: "Observe fasts on 16 consecutive Mondays (Somvar); consume milk, curd, or rice kheer once after sunset; wear pearl-white, silver, or cream attire; donate white rice, silver coins, or milk to orphanages or priests; chant Chandra Beej Mantra 108 times daily.",
    yantra_desc: "Chandra Yantra etched upon a pure silver plate; consecrated on a full moon (Purnima) night under Rohini, Hasta, or Shravana nakshatra; energized with white sandalwood paste, jasmine flowers, and 11,000 recitations of the Chandra mantra."
  },
  3: {
    mulank_p1: (name) => `${name}, guided by Radical Number 3, your consciousness vibrates with the expansive wisdom, moral authority, and creative eloquence of Jupiter (Guru / Brihaspati). As the preceptor of the gods, Jupiter bestows upon you an optimistic philosophical intellect, a commanding yet benevolent voice, and an unquenchable thirst for higher knowledge. You are an innate scholar, teacher, and ethical compass, driven by the desire to elevate cultural standards and inspire intellectual dignity wherever you speak.`,
    mulank_p2: (name) => `In your social and behavioral interactions, you radiate dignity, good humor, and generous warmth, effortlessly gathering an intellectually stimulating circle of scholars, artists, and seekers around you. You cannot tolerate small-minded hypocrisy, petty jealousy, or vulgar conduct, and you instinctively assume the role of the wise elder or counselor in both family and professional circles. However, your immense self-assurance can occasionally cross into dogmatic preachiness or over-committing to grand schemes; cultivating humble restraint keeps your expansive vision grounded.`,

    bhagyank_p1: (name) => `With Destiny Number 3, ${name}, your life path is designed for scholarly distinction, literary influence, and public mentorship. Your journey is marked by progressive intellectual milestones, where early philosophical inquiry matures into executive advisory power. You are cautioned to avoid squandering your creative talents across too many scattered interests, and to resist the trap of intellectual snobbery or financial extravagance during prosperous tides.`,
    bhagyank_p2: (name) => `Your karmic responsibility is to serve as a beacon of truth and moral clarity in a world frequently distracted by superficial illusions. Destiny will repeatedly summon you to lecture, publish, adjudicate, or counsel, making you a pillar of community stability. By sharing your accumulated wisdom without patronizing others, you establish an enduring legacy of cultural and spiritual enlightenment.`,

    namank_concept: `The Chaldean system regards the Name Number as the phonetic key that unlocks societal favor. It represents the vibrational frequency that echoes into the universal ether whenever your identity is invoked, dictating whether opportunities arrive through friction or through benevolent synchronicities.`,
    namank_personal: (name) => `An analysis of your name, ${name}, suggests that your Chaldean Name Number 3 projects scholarly stature, trustworthy counsel, and expansive prosperity. It commands immediate respect from mentors, institutional leaders, and judicial authorities, ensuring that your ideas are heard with seriousness and celebrated with generosity.`,

    auspicious_place: "North-East (Ishanya) direction; prosperous cities and educational capitals include Oxford, Athens, Varanasi, Boston, Kyoto, Zurich, Cambridge, and elevated university campuses, sanctified temple cities, grand libraries, and high judicial courthouses.",
    health: "Governs the liver, arterial circulation, hips, thighs, and cerebral nervous energy. Tendencies toward blood glucose imbalances, fatty liver sluggishness, and arterial tension from rich dietary habits. Practice Bhramari pranayama, adopt disciplined brisk morning walking, and drink warm water infused with turmeric and lemon.",
    auspicious_time: "The vibrant periods between November 21 and December 20 (Sagittarius) and February 19 to March 20 (Pisces); optimal daily cosmic windows occur during morning Brahma Muhurta (4:30 AM to 6:00 AM).",
    career: "Higher education, university professorship, judiciary and corporate law, ministerial advisory, publishing, spiritual and philosophical leadership, banking, and strategic economic consulting.",
    fasts_remedies: "Observe fasts on 16 consecutive Thursdays (Guruvar); consume yellow gram dal (chana dal) and besan sweets once a day; wear bright yellow, saffron, or amber clothing; feed soaked chana dal and jaggery to cows; chant the Guru Beej Mantra 108 times daily.",
    yantra_desc: "Guru / Brihaspati Yantra inscribed upon a gold-plated copper or brass plate; consecrated on a Thursday morning under Punarvasu or Vishakha nakshatra; energized with yellow marigolds, saffron water, and 19,000 recitations of the Jupiter mantra."
  },
  4: {
    mulank_p1: (name) => `${name}, anchored by Radical Number 4, your mind is animated by the unconventional genius, structural depth, and revolutionary foresight of Rahu (North Lunar Node). You are a born structural architect and systematic thinker who perceives the hidden mechanics behind complex systems. Unafraid of challenging antiquated dogmas, you possess an independent, rebellious streak that seeks truth through empirical verification rather than blind faith, excelling at bringing radical concepts into tangible reality.`,
    mulank_p2: (name) => `Behaviorally, you are a tireless, methodical worker who values substance over superficial showmanship, often preferring to labor behind the scenes until your creation is impregnable. Your social nature is guarded and intensely selective; you maintain a tight circle of open-minded, intellectually fearless comrades while remaining aloof to conformists. Because your perspective is decades ahead of your time, you are frequently misunderstood in your youth, which can foster cynicism, sudden stubbornness, or dark pessimistic thinking if you let isolation harden your spirit.`,

    bhagyank_p1: (name) => `With Destiny Number 4, ${name}, your worldly trajectory is defined by sudden turning points, unexpected upheavals, and dramatic breakthroughs. Your path tests your perseverance by throwing sudden obstacles in your path, forcing you to rebuild with greater engineering precision. You are warned to avoid speculative shortcuts, illicit financial gambles, and chronic cynicism; your triumphs are forged solely through unwavering ethical discipline and structural grit.`,
    bhagyank_p2: (name) => `Your karmic mission is that of the master builder who anchors future-proof institutions, cutting-edge technologies, and enduring social reforms into mortal soil. Destiny will place you in high-stakes environments where crisis management and technological innovation are desperately needed. By anchoring your restless electrical energy into service for humanity, you turn chaos into architectural triumph.`,

    namank_concept: `In Chaldean acoustic science, your Name Number represents the energetic resonance through which the external world deciphers your character. It establishes your professional magnetism, dictating how readily external opportunities, contracts, and social respect gravitate toward your person.`,
    namank_personal: (name) => `An analysis of your name, ${name}, suggests that your Chaldean Name Number 4 radiates formidable strategic authority, modern intellectual grit, and analytical dependability. It assures business partners and collaborators that you possess the executive stamina to untangle Gordian knots and execute massive projects flawlessly.`,

    auspicious_place: "South-West (Nairutya) direction; fortunate cities and technological metropolises include Berlin, San Francisco, Seoul, Melbourne, Chicago, Bengaluru, Munich, and cutting-edge industrial hubs, scientific research complexes, modern high-rises, and electronic innovation centers.",
    health: "Focus on the central nervous system, knees, lower limbs, respiratory lungs, and circadian sleep cycles. Prone to electrical nervous tension, sudden unexplained fatigue, and insomnia from mental hyperactivity. Practice Nadi Shodhana pranayama, daily earthing (barefoot contact on grass), and unhurried evening meditation with sandalwood incense.",
    auspicious_time: "Periods during late winter and transitional solar equinoxes; daily beneficial windows occur during nocturnal twilight and overcast, electrically charged atmospheric conditions.",
    career: "Software engineering, cutting-edge artificial intelligence, aviation, heavy structural infrastructure, forensic analytics, scientific research, investigative journalism, and specialized patent law.",
    fasts_remedies: "Observe fasts on 18 consecutive Saturdays (Shanivar); wear smoky blue, charcoal, or khaki attire; donate black sesame seeds, mustard oil, or dark blankets to manual laborers; feed stray black dogs regularly; chant the Rahu Beej Mantra 108 times daily.",
    yantra_desc: "Rahu Yantra engraved upon an Ashtadhatu (eight-metal alloy) or lead plate; consecrated on a Saturday evening during dusk under Ardra, Swati, or Shatabhisha nakshatra; energized with blue flowers and 18,000 recitations of the Rahu mantra."
  },
  5: {
    mulank_p1: (name) => `${name}, animated by Radical Number 5, your essence is quickened by the mercurial wit, commercial acumen, and sparkling adaptability of Mercury (Budha). You are the eternal youth and versatile communicator of the cosmos, endowed with lightning-fast cognitive processing and an insatiable curiosity for diverse experiences. Highly perceptive and linguistically gifted, you effortlessly decode commerce, human psychology, and market trends, thriving in dynamic environments where rapid transformation is the norm.`,
    mulank_p2: (name) => `In everyday social dynamics, your charisma is magnetic, playful, and socially versatile—you bridge distinct cultural, intellectual, and professional circles with effortless charm. You cultivate a vast and colorful network of acquaintances across the globe, dreading routine, monotony, and rigid dogmatism above all else. However, your boundless appetite for stimulation can occasionally trigger nervous restlessness, scattered focus, or impulsive decisions; practicing disciplined focus ensures your brilliant ideas manifest into enduring enterprises.`,

    bhagyank_p1: (name) => `With Destiny Number 5, ${name}, your worldly path is an adventurous odyssey marked by frequent travel, commercial expansion, and evolving career chapters. You are designed to thrive amidst change rather than stagnation, finding your greatest fortunes through international trade, digital communications, and media ventures. Beware the temptations of reckless speculation, nervous burnout from constant multitasking, or abandoning projects before they reach full commercial fruition.`,
    bhagyank_p2: (name) => `Your karmic destiny is to act as the universal connector and trade envoy—transmuting raw information into actionable knowledge and bringing disparate communities into mutually prosperous harmony. As you mature, your ability to synthesize diverse disciplines elevates you to prominent commercial and advisory heights. By anchoring your versatile brilliance to a single moral compass, your worldly success becomes boundless.`,

    namank_concept: `Chaldean numerology identifies the Name Number as your vibrational signature within the collective mind. It functions as an acoustic antenna, governing how smoothly your messages are understood, how rapidly contracts are signed, and how favorably society responds to your personal brand.`,
    namank_personal: (name) => `An analysis of your name, ${name}, suggests that your Chaldean Name Number 5 emits persuasive eloquence, vibrant modern charm, and commercial magnetism. It opens doors in high-speed negotiations, digital communication channels, and international circles, ensuring that your proposals are met with eager enthusiasm.`,

    auspicious_place: "North (Uttara) direction; dynamic cities and commercial epicenters include Singapore, Dubai, Hong Kong, Frankfurt, Toronto, Mumbai, London, and bustling trade terminals, media production suites, international transit ports, and vibrant botanical hubs.",
    health: "Governs the central nervous system, vocal cords, respiratory bronchial branches, and fine motor dexterity in the hands. Tendencies toward nervous exhaustion, digestive sensitivity from eating on the run, and speech fatigue. Practice Anulom Vilom pranayama, implement strict digital detox hours before sleep, and sip chamomile or tulsi tea.",
    auspicious_time: "The highly fertile windows between May 21 and June 20 (Gemini) and August 23 to September 22 (Virgo); daily peak productivity occurs during vibrant midday business hours.",
    career: "International commerce, digital marketing, journalism and broadcasting, software development, stock brokerage, public relations, language translation, travel entrepreneurship, and diplomatic liaison.",
    fasts_remedies: "Observe fasts on 21 consecutive Wednesdays (Budhavar); consume green moong dal and vegetarian dishes once a day; wear emerald green or mint-colored garments; donate green vegetables, educational books, or clothing to needy students; chant Budha Beej Mantra 108 times daily.",
    yantra_desc: "Budha Yantra inscribed on a polished brass or bronze plate; consecrated on a Wednesday morning at sunrise during Shukla Paksha under Ashlesha or Revati nakshatra; energized with green tulsi leaves, unbroken rice, and 9,000 chants of the Mercury mantra."
  },
  6: {
    mulank_p1: (name) => `${name}, graced by Radical Number 6, your being is infused with the luxurious aesthetic refinement, romantic warmth, and harmonious magnetism of Venus (Shukra). You possess an instinctual affinity for fine arts, sensory elegance, and domestic sanctuary, moving through the world with natural poise and hospitality. Governed by the cosmic goddess of beauty and love, your presence is restorative and attractive, naturally softening interpersonal friction and infusing your surroundings with elegance and grace.`,
    mulank_p2: (name) => `Behaviorally, you are deeply devoted to your family, creative partners, and close friends, demonstrating your affection through thoughtful aesthetic gestures, protective care, and loyal generosity. You surround yourself with cultivated, artistic companions who share your love of harmony, instinctively recoiling from vulgarity, squalor, or harsh emotional cruelty. However, your immense need for harmony can sometimes trap you in people-pleasing compromises or over-indulgent luxury; cultivating firm personal boundaries protects your generous heart.`,

    bhagyank_p1: (name) => `With Destiny Number 6, ${name}, your worldly journey is blessed with increasing material abundance, artistic appreciation, and deep familial satisfaction. You are positioned to prosper in domains connected to luxury goods, creative diplomacy, hospitality, and communal stewardship. You must guard against the pitfalls of vanity, extravagant complacency, domestic possessiveness, or allowing yourself to become a martyr for ungrateful associates.`,
    bhagyank_p2: (name) => `Your karmic life mission is to manifest divine beauty, unconditional affection, and structural harmony within the mortal realm. Life consistently summons you to elevate the quality of living for your community, making you an indispensable cornerstone of peace and prosperity. When you channel your refined Venusian tastes into uplifting service, lasting wealth and emotional bliss follow naturally.`,

    namank_concept: `In Chaldean acoustic wisdom, the Name Number is the vibrational dress your spirit wears in the public theater. It determines the subconscious emotional response of those who meet you, governing the ease with which you attract affection, loyal patronage, and material prosperity.`,
    namank_personal: (name) => `An analysis of your name, ${name}, suggests that your Chaldean Name Number 6 carries glamorous allure, compassionate warmth, and refined artistic authority. It magnetically attracts loyal allies, romantic devotion, and lucrative opportunities in luxury, design, and relationship-driven enterprises.`,

    auspicious_place: "South-East (Agneya) direction; elegant artistic capitals and picturesque landscapes include Vienna, Milan, Florence, Los Angeles, Paris, Montreal, Kyoto, and verdant vineyard estates, designer boutique districts, scenic luxury retreats, and fragrant botanical gardens.",
    health: "Governs the throat, vocal cords, kidneys, reproductive system, and complexion. Prone to sugar imbalances, metabolic sluggishness, renal strain from dehydration, and skin breakouts. Practice Bhujangasana (Cobra Pose), daily hydration infused with rose water or lemon, and calming evening mindfulness.",
    auspicious_time: "The gentle spring transit between April 20 and May 20 (Taurus) and September 23 to October 22 (Libra); daily magical hours occur during peaceful sunsets and dusk.",
    career: "Architecture, high-end interior styling, luxury branding, haute couture, cinematic arts, fine cosmetics, gourmet hospitality, music production, and marital relationship counseling.",
    fasts_remedies: "Observe fasts on 21 consecutive Fridays (Shukravar); consume sweet curd or rice kheer once before sunset; dress in pristine white, cream, or soft pastel attire; donate white silk, sugar, rice, or camphor to women in need; chant the Shukra Beej Mantra 108 times daily.",
    yantra_desc: "Shukra Yantra etched upon a pure silver or platinum plate; consecrated on a Friday morning at dawn under Bharani or Purva Phalguni nakshatra; energized with white fragrant lotus blossoms, sandalwood paste, and 16,000 recitations of the Venus mantra."
  },
  7: {
    mulank_p1: (name) => `${name}, guided by Radical Number 7, your psyche resonates with the mystical depth, philosophical introspection, and esoteric insight of Ketu (South Lunar Node). You are an intellectual diver who plunges into the deepest oceans of thought, indifferent to superficial worldly trivialities. Possessing an acute analytical radar and instinctive clairvoyant sensitivity, you see right through social posturing and deceptive masks, continually probing the existential mysteries that lie beneath external reality.`,
    mulank_p2: (name) => `In your behavioral patterns, you require generous doses of contemplative solitude to recharge your spiritual energies, often feeling drained by loud, chaotic, or commercialized environments. Your friend circle is small, esoteric, and fiercely loyal; you value one profound, soul-stirring conversation over a hundred shallow pleasantries. However, your deep-seated skepticism can occasionally curdle into cynical detachment, melancholic pessimism, or social aloofness; balancing your solitary studies with grounded human connection preserves your compassionate wisdom.`,

    bhagyank_p1: (name) => `With Destiny Number 7, ${name}, your worldly path is an unconventional, non-linear pilgrimage punctuated by profound spiritual epiphanies and intellectual discoveries. The universe will periodically disrupt your reliance on material securities to ensure you cultivate indestructible inner wisdom. Beware the hazards of chronic cynicism, escapist tendencies, or retreating into an ivory tower when your unique insights are needed to guide others.`,
    bhagyank_p2: (name) => `Your karmic trajectory is that of the mystic sage and investigative researcher whose discoveries illuminate dark corners for the collective. Whether in scientific laboratories, metaphysical academies, or investigative writing, your destiny calls you to unmask hidden truths. As you surrender the need for conventional worldly validation, authentic spiritual authority and serene prosperity embrace you.`,

    namank_concept: `Chaldean numerology understands the Name Number as your energetic signature etched into the psychic matrix. It dictates the subconscious respect, scholarly credibility, and spiritual gravitas you project whenever your name is spoken or your signature is appended to an endeavor.`,
    namank_personal: (name) => `An analysis of your name, ${name}, suggests that your Chaldean Name Number 7 resonates with quiet authority, esoteric depth, and intellectual distinction. It commands immediate intellectual respect from serious researchers, spiritual leaders, and institutional bodies, giving your words penetrating credibility.`,

    auspicious_place: "North-East (Ishanya) direction; contemplative sanctuaries and ancient historical capitals include Edinburgh, Prague, Reykjavik, Rishikesh, Kyoto, Wellington, Oxford, and serene mountain monasteries, quiet coastal cliffs, ancient archival libraries, and quiet forest sanctuaries.",
    health: "Focus on the digestive intestines, psychosomatic nervous balance, feet, and lymphatic fluids. Prone to anxiety-induced digestive sensitivity, psychosomatic sleep disturbances, and joint dryness. Practice Vipassana meditation, grounding Tadasana (Mountain Pose), and unhurried evening warm footbaths with Epsom salts.",
    auspicious_time: "The introspective windows between June 21 and July 20 and deep mid-winter months; daily optimal hours occur during sacred dawn twilight and silent moonlit midnights.",
    career: "Advanced theoretical science, philosophical academia, clinical psychiatry, cyber-security investigation, archaeological research, esoteric authorship, and holistic naturopathic medicine.",
    fasts_remedies: "Observe fasts on 17 consecutive Tuesdays or Thursdays; wear smoke-grey, light yellow, or multi-colored natural garments; feed stray dogs, birds, and fish regularly; donate blankets, sesame seeds, or yellow lentils to hermits or seekers; chant the Ketu Beej Mantra 108 times daily.",
    yantra_desc: "Ketu Yantra engraved on pure copper or silver alloy; consecrated on a Tuesday or Thursday evening under Ashwini, Magha, or Mula nakshatra; energized with fragrant guggul incense, mixed wild flowers, and 17,000 recitations of the Ketu mantra."
  },
  8: {
    mulank_p1: (name) => `${name}, forged by Radical Number 8, your psychological foundation is fortified by the unyielding discipline, karmic endurance, and executive realism of Saturn (Shani). You are a pragmatic architect of enduring structures who measures worth through concrete achievements rather than hollow promises. Possessing immense stamina and administrative patience, you are equipped to shoulder monumental burdens that would crush lesser spirits, viewing obstacles merely as tests designed to harden your resolve.`,
    mulank_p2: (name) => `In your social and behavioral conduct, you are deliberate, prudent, and slow to trust, but once you give your word, your loyalty is indestructible and lifelong. You maintain a small, trusted circle of mature, disciplined colleagues and friends, having zero tolerance for superficial frivolity, deceit, or unearned privilege. However, your immense self-reliance can sometimes calcify into emotional rigidity, fatalistic pessimism, or harboring long-standing grievances; cultivating gentle forgiveness and celebrating small joy softens your iron exterior.`,

    bhagyank_p1: (name) => `With Destiny Number 8, ${name}, your worldly destiny follows the classic Saturnian trajectory: severe early trials, heavy responsibilities, and systematic delays that forge unshakeable resilience, culminating in massive late-career power and enduring wealth. You are warned to avoid cut-throat ruthlessness, miserly hoarding, or slipping into gloomy despair during slow periods; your empire is built brick by patient brick, and what Saturn gives through honest sweat cannot be destroyed by any mortal adversary.`,
    bhagyank_p2: (name) => `Your karmic mission is that of the impartial steward of material justice and institutional governance. Destiny will elevate you to oversee vast resources, heavy industries, or legal structures where fairness and longevity are critical. By using your formidable executive strength to protect the vulnerable and reward honest labor, you achieve immortal legacy and supreme material security.`,

    namank_concept: `In the Chaldean gematria tradition, your Name Number represents the acoustic currency of your mortal identity. It determines how market forces, legal structures, and societal hierarchies respond to your leadership, governing the scale of enterprise you can successfully manifest.`,
    namank_personal: (name) => `An analysis of your name, ${name}, suggests that your Chaldean Name Number 8 carries immense executive presence, commercial weight, and structural dependability. It signals to financial institutions, corporate leaders, and legal authorities that you are an unshakeable cornerstone capable of executing monumental undertakings.`,

    auspicious_place: "West (Pashchima) direction; historic industrial capitals and stone-masonry metropolises include London, Stockholm, Moscow, Pittsburgh, Johannesburg, Nagpur, Chicago, and historic civic institutions, mining districts, stone architectural landmarks, and corporate headquarters.",
    health: "Governs the skeletal system, teeth, joints, knees, and lower spine. Susceptible to rheumatic stiffness, joint dryness, dental vulnerabilities, and sluggish intestinal elimination. Practice joint-liberating Pawanmuktasana, daily warm sesame oil massage (Abhyanga), and consume soaked black raisins and walnuts.",
    auspicious_time: "The steadfast periods between December 21 and January 20 (Capricorn) and January 21 to February 19 (Aquarius); daily optimal focus windows occur during quiet late afternoon and dusk.",
    career: "Real estate development, corporate executive directorship, judiciary and corporate law, structural civil engineering, metallurgy, public infrastructure, mining, and heavy industrial manufacturing.",
    fasts_remedies: "Observe fasts on 19 consecutive Saturdays (Shanivar); consume khichdi made with black urad dal once after sunset; wear dark navy blue, charcoal, or black garments; light a mustard oil lamp beneath a Peepal tree at dusk; donate iron tools, mustard oil, or footwear to laborers; chant the Shani Beej Mantra 108 times daily.",
    yantra_desc: "Shani Yantra inscribed upon an iron or pure copper plate; consecrated on a Saturday evening during twilight under Pushya, Anuradha, or Uttara Bhadrapada nakshatra; energized with blue aparajita flowers, mustard oil, and 23,000 recitations of the Saturn mantra."
  },
  9: {
    mulank_p1: (name) => `${name}, charged with Radical Number 9, your core essence radiates the fiery valor, pioneering passion, and humanitarian courage of Mars (Mangala). You are a born champion and natural warrior, endowed with boundless stamina, a high-octane physical drive, and an instinctive urge to defend the oppressed. Guided by the celestial commander-in-chief, your spirit burns with enthusiasm; you confront adversity head-on with fearless directness, scorning cowardice and lethargy above all things.`,
    mulank_p2: (name) => `In your social and behavioral life, you are passionate, candid, and fiercely protective of your comrades, radiating a magnetic vibrancy that naturally rallies people to your banner. You maintain an active, adventurous friend circle that respects your honesty and boldness; you speak your mind without sugarcoating, quick to flare in righteous anger but equally swift to forgive and reconcile. However, your volcanic drive can sometimes trigger reckless impulsiveness, unnecessary arguments, or physical burnout; learning patience and deliberate tactical calm elevates your heroic valor into legendary leadership.`,

    bhagyank_p1: (name) => `With Destiny Number 9, ${name}, your life path is an epic battleground that demands that you fight for grand, collective ideals rather than selfish micro-interests. Your journey alternates between high-stakes confrontations and glorious triumphs, where your physical and mental stamina are continuously challenged. You are cautioned to avoid hot-headed confrontation, vindictive grudges, and reckless road accidents born of haste; master your inner fire before attempting to conquer the world.`,
    bhagyank_p2: (name) => `Your karmic destiny is that of the universal protector, reformer, and noble philanthropist. You are destined to champion worthy causes that outlast your lifetime, using your immense vitality to construct hospitals, defense structures, or athletic movements that inspire millions. When your passion is dedicated to selfless service, Mars crowns your existence with unassailable victory and global honor.`,

    namank_concept: `In Chaldean esoteric wisdom, the Name Number functions as the vibrational spearhead of your identity. It governs how forcefully your presence is felt in competitive arenas, determining your ability to capture public attention and overcome adversary resistance.`,
    namank_personal: (name) => `An analysis of your name, ${name}, suggests that your Chaldean Name Number 9 carries magnetic vibrancy, fearless courage, and commanding heroic energy. It inspires instant confidence in followers and signals to competitors that your resolve will never waver under pressure.`,

    auspicious_place: "South (Dakshina) direction; dynamic sporting capitals and sun-warmed territories include Madrid, Rio de Janeiro, Dallas, Munich, Chennai, Cape Town, Milan, and vibrant sporting complexes, mountain ridges, active military academies, and energetic southern territories.",
    health: "Governs the muscular system, blood circulation, head, bone marrow, and vital physical stamina. Prone to inflammatory fevers, sharp cuts, burns, blood pressure spikes, and muscular exhaustion. Practice cooling Sheetali and Sheetkari pranayama, stay hydrated with fresh coconut water, and channel excess heat into disciplined martial arts or swimming.",
    auspicious_time: "The triumphant transits between March 21 and April 19 (Aries) and October 23 to November 21 (Scorpio); daily peak vitality windows occur during early active morning hours.",
    career: "Military and national defense, surgical medicine, professional athletics, mechanical and defense engineering, emergency disaster relief, real estate development, and high-impact trial litigation.",
    fasts_remedies: "Observe fasts on 21 consecutive Tuesdays (Mangalvar); consume wheat and jaggery preparations once after sunset; wear bright crimson, scarlet, or coral attire; donate red lentils (masoor dal), red cloth, or blood to medical banks; chant the Mangala Beej Mantra 108 times daily.",
    yantra_desc: "Mangala Yantra engraved upon a pure copper plate; consecrated on a Tuesday noon under Mrigashira, Chitra, or Dhanistha nakshatra; energized with red hibiscus blossoms, red vermillion (sindoor), and 10,000 recitations of the Mars mantra."
  }
};

/**
 * Generate full numerology report object combining Mulank, Bhagyank, and Namank
 */
export function generateVedicNumerologyReport(fullName, dob) {
  const name = (fullName || "Seeker").trim();
  const mulank = calculateMulank(dob);
  const bhagyank = calculateBhagyank(dob);
  const namank = calculateNamank(name);

  const mData = NUMEROLOGY_DATA[mulank] || NUMEROLOGY_DATA[1];
  const bData = NUMEROLOGY_DATA[bhagyank] || NUMEROLOGY_DATA[1];
  const nData = NUMEROLOGY_DATA[namank] || NUMEROLOGY_DATA[1];

  const mContent = DESCRIPTIVE_CONTENT[mulank] || DESCRIPTIVE_CONTENT[1];
  const bContent = DESCRIPTIVE_CONTENT[bhagyank] || DESCRIPTIVE_CONTENT[1];
  const nContent = DESCRIPTIVE_CONTENT[namank] || DESCRIPTIVE_CONTENT[1];

  const mYantra = YANTRA_DATA[mulank] || YANTRA_DATA[1];

  return {
    name,
    dob,
    numbers: {
      mulank,
      bhagyank,
      namank
    },
    data: {
      mulank: mData,
      bhagyank: bData,
      namank: nData
    },
    yantra: {
      data: mYantra,
      svg: generateYantraSvg(mulank)
    },
    content: {
      mulank: {
        p1: mContent.mulank_p1(name),
        p2: mContent.mulank_p2(name),
        auspicious_place: mContent.auspicious_place,
        health: mContent.health,
        auspicious_time: mContent.auspicious_time,
        career: mContent.career,
        fasts_remedies: mContent.fasts_remedies,
        yantra_desc: mContent.yantra_desc
      },
      bhagyank: {
        p1: bContent.bhagyank_p1(name),
        p2: bContent.bhagyank_p2(name),
        auspicious_place: bContent.auspicious_place,
        health: bContent.health,
        auspicious_time: bContent.auspicious_time,
        career: bContent.career,
        fasts_remedies: bContent.fasts_remedies,
        yantra_desc: bContent.yantra_desc
      },
      namank: {
        concept: nContent.namank_concept,
        personal: nContent.namank_personal(name),
        auspicious_place: nContent.auspicious_place,
        health: nContent.health,
        auspicious_time: nContent.auspicious_time,
        career: nContent.career,
        fasts_remedies: nContent.fasts_remedies,
        yantra_desc: nContent.yantra_desc
      }
    }
  };
}
