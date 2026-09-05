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
 * As per specification:
 * ruling planet, favourable sign, favourable alphabets, gemstone,
 * favourable days, favourable number, direction, auspicious colour,
 * god/goddess, fast day, favourable dates, mantra.
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
    favourable_dates: "1st, 10th, 19th, and 28th of any month",
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
    favourable_dates: "2nd, 11th, 20th, and 29th of any month",
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
    favourable_dates: "3rd, 12th, 21st, and 30th of any month",
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
    favourable_dates: "4th, 13th, 22nd, and 31st of any month",
    mantra: "Om Bhram Bhrim Bhraum Sah Rahave Namah (ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः)"
  },
  5: {
    number: 5,
    title: "The Mercury Alchemist",
    ruling_planet: "Mercury (Budha)",
    planet_symbol: "☿",
    favourable_sign: "Gemini (Mithuna) & Virgo (Kanya)",
    favourable_alphabets: "E, H, N, X",
    gemstone: "Emerald (Panna) or Peridot set in Gold or Bronze",
    favourable_days: "Wednesday and Friday",
    favourable_number: "1, 5, 6",
    direction: "North (Uttara)",
    auspicious_colour: "Emerald Green, Mint, Light Khaki & White",
    god_goddess: "Lord Ganesha & Lord Vishnu",
    fast_day: "Wednesday (Budhavar)",
    favourable_dates: "5th, 14th, and 23rd of any month",
    mantra: "Om Bram Brim Braum Sah Budhaya Namah (ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः)"
  },
  6: {
    number: 6,
    title: "The Celestial Harmonizer",
    ruling_planet: "Venus (Shukra)",
    planet_symbol: "♀",
    favourable_sign: "Taurus (Vrishabha) & Libra (Tula)",
    favourable_alphabets: "U, V, W",
    gemstone: "Diamond (Heera) or White Zircon set in Platinum or Silver",
    favourable_days: "Friday and Wednesday",
    favourable_number: "3, 6, 9, 5",
    direction: "South-East (Agneya)",
    auspicious_colour: "Snow White, Soft Rose, Pastel Blue & Ivory",
    god_goddess: "Goddess Lakshmi & Goddess Shukra",
    fast_day: "Friday (Shukravar)",
    favourable_dates: "6th, 15th, and 24th of any month",
    mantra: "Om Dram Drim Draum Sah Shukraya Namah (ॐ द्रां द्रीं द्रौं सः शुक्राय नमः)"
  },
  7: {
    number: 7,
    title: "The Mystical Seeker",
    ruling_planet: "Ketu (South Lunar Node)",
    planet_symbol: "☋",
    favourable_sign: "Pisces (Meena) & Sagittarius (Dhanu)",
    favourable_alphabets: "O, Z",
    gemstone: "Cat's Eye (Lehsunia / Vaidurya) set in Silver",
    favourable_days: "Thursday and Monday",
    favourable_number: "2, 7, 1",
    direction: "North-East (Ishanya)",
    auspicious_colour: "Light Green, Soft Turquoise, Smoke & White",
    god_goddess: "Lord Ganesha & Lord Matsya Avatar",
    fast_day: "Tuesday or Thursday",
    favourable_dates: "7th, 16th, and 25th of any month",
    mantra: "Om Sram Srim Sraum Sah Ketave Namah (ॐ स्रां स्रीं स्रौं सः केतवे नमः)"
  },
  8: {
    number: 8,
    title: "The Karmic Sovereign",
    ruling_planet: "Saturn (Shani)",
    planet_symbol: "♄",
    favourable_sign: "Capricorn (Makara) & Aquarius (Kumbha)",
    favourable_alphabets: "F, P",
    gemstone: "Blue Sapphire (Neelam) or Amethyst set in Iron or Silver",
    favourable_days: "Saturday and Wednesday",
    favourable_number: "3, 5, 8",
    direction: "West (Pashchima)",
    auspicious_colour: "Midnight Blue, Black, Dark Violet & Steel Grey",
    god_goddess: "Lord Shani & Lord Hanuman",
    fast_day: "Saturday (Shanivar)",
    favourable_dates: "8th, 17th, and 26th of any month",
    mantra: "Om Pram Prim Praum Sah Shanaischaraya Namah (ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः)"
  },
  9: {
    number: 9,
    title: "The Cosmic Warrior",
    ruling_planet: "Mars (Mangala)",
    planet_symbol: "♂",
    favourable_sign: "Aries (Mesha) & Scorpio (Vrischika)",
    favourable_alphabets: "A, C, G, L, S (Mars synergizes through 9-resonance)",
    gemstone: "Red Coral (Moonga) set in Copper or Gold",
    favourable_days: "Tuesday and Thursday",
    favourable_number: "1, 3, 9",
    direction: "South (Dakshina)",
    auspicious_colour: "Crimson Red, Scarlet, Coral & Deep Pink",
    god_goddess: "Lord Hanuman & Lord Kartikeya (Murugan)",
    fast_day: "Tuesday (Mangalvar)",
    favourable_dates: "9th, 18th, and 27th of any month",
    mantra: "Om Kram Krim Kraum Sah Bhaumaya Namah (ॐ क्रां क्रीं क्रौं सः भौमाय नमः)"
  }
};

/**
 * Rich templated descriptive paragraphs for each number 1-9
 * covering:
 * - Radical Number meaning (Mulank)
 * - Destiny Number meaning (Bhagyank)
 * - Name Number meaning (Namank)
 * - Auspicious Place
 * - Health
 * - Auspicious Time
 * - Career
 * - Fasts & Remedies
 * - Yantra Description
 */
export const DESCRIPTIVE_CONTENT = {
  1: {
    mulank_desc: (name) => `${name}, your Mulank 1 bestows upon you the fiery, pioneering spirit of the Sun (Surya). You are an innate leader who thrives in positions of sovereign authority and self-governance. Highly independent and ambitious, you dislike subjugation and instinctively take the helm in times of uncertainty. Your presence commands natural respect and inspires confidence among peers.`,
    bhagyank_desc: (name) => `With Bhagyank 1, ${name}, your overarching destiny is designed for prominent individual accomplishment and public honor. Your life path demands that you carve original pathways rather than follow worn footsteps. Success unfolds through bold decision-making, executive responsibility, and refusing to surrender your moral core when tested.`,
    namank_desc: (name) => `Your Chaldean Namank 1 elevates your external frequency to project prestige, command, and visionary integrity. When people speak your name, it resonates with solar warmth, dignified magnetism, and pioneering credibility.`,
    auspicious_place: "Spacious hilltops, illuminated eastward facing rooms, grand administrative halls, solar observatories, and well-lit open architectural spaces.",
    health: "Vitality is centered in the cardiovascular system, eyesight, heart, and spinal column. Avoid excessive sun exposure in extreme summers and watch blood pressure during periods of high mental strain.",
    auspicious_time: "From sunrise until 10:30 AM; especially during solar transits between March 21 and April 28 (Aries exaltation).",
    career: "Government administrative services, corporate leadership, entrepreneurship, political diplomacy, surgical medicine, and visionary project directorship.",
    fasts_remedies: "Observe fasts on Sundays without salt; offer water mixed with red sandalwood and kumkum to the rising Sun (Arghya); chant the Gayatri Mantra daily.",
    yantra_desc: "Surya Yantra inscribed on copper plate on a Sunday during Shukla Paksha, energized with 7,000 chants of the Surya Beej mantra."
  },
  2: {
    mulank_desc: (name) => `${name}, governed by Mulank 2, your psyche is illuminated by the gentle, reflective grace of the Moon (Chandra). You possess profound emotional intelligence, intuition, and an innate peacemaking gift. Highly imaginative and sensitive, you feel the subtle vibrational shifts of your surroundings and excel in diplomatic mediation.`,
    bhagyank_desc: (name) => `With Bhagyank 2, ${name}, your cosmic mission centers on cooperation, relational harmony, and nurturing collectives. Your destiny flourishes when partnering with complementary minds and cultivating serene, aesthetic environments that heal discord.`,
    namank_desc: (name) => `Your Chaldean Namank 2 infuses your name with gentle magnetism, artistic empathy, and approachable charm. It softens aggressive social resistance and invites trust from all who interact with you.`,
    auspicious_place: "Locations near serene lakes, rivers, coastal retreats, verdant botanical sanctuaries, and artistically adorned water fountains.",
    health: "Focus on digestive harmony, lymphatic circulation, stomach, and emotional well-being. Guard against seasonal melancholia, water-borne afflictions, and psychosomatic fatigue.",
    auspicious_time: "Twilight and moonrise hours; the period between June 21 and July 22 when the Moon's home sign Cancer is vibrant.",
    career: "Psychology, diplomacy, creative literature, interior design, dairy and marine commerce, nursing, and counseling.",
    fasts_remedies: "Observe fasts on Mondays; donate white rice, milk, or silver coins to those in need; drink water stored in a pure silver cup.",
    yantra_desc: "Chandra Yantra etched on a silver plate, consecrated on a full moon (Purnima) night with 11,000 chants of the Chandra Beej mantra."
  },
  3: {
    mulank_desc: (name) => `${name}, your Mulank 3 is energized by the majestic wisdom of Brihaspati (Jupiter), the celestial Guru. You possess expansive optimism, intellectual depth, and eloquent speech. A natural teacher, mentor, and seeker of higher truth, you inspire those around you with scholarly dignity and warmth.`,
    bhagyank_desc: (name) => `With Bhagyank 3, ${name}, your destiny calls you to impart knowledge, expand creative frontiers, and act as a pillar of ethical counsel. Life consistently provides you with platforms to articulate grand concepts and bridge philosophical divides.`,
    namank_desc: (name) => `Your Chaldean Namank 3 projects authority, scholarly wisdom, and expansive good fortune. It draws mentors, spiritual guides, and beneficial societal patrons directly into your sphere.`,
    auspicious_place: "Libraries, universities, temples, elevated lecture halls, legal courthouses, and sanctified spiritual pilgrimage centers.",
    health: "Governs the liver, arterial circulation, thighs, and nervous vitality. Maintain a disciplined diet low in saturated fats and monitor blood glucose levels as you mature.",
    auspicious_time: "Morning twilight (Brahma Muhurta) and the vibrant period between November 21 and December 20 (Sagittarius season).",
    career: "Higher academia, law, advisory consulting, financial fund management, religious or spiritual leadership, publishing, and philosophical authorship.",
    fasts_remedies: "Observe fasts on Thursdays; wear clean yellow attire; feed soaked chana dal and jaggery to cows; respect elders and spiritual preceptors.",
    yantra_desc: "Brihaspati / Guru Yantra engraved on gold or bronze, activated on a Thursday morning with 19,000 recitations of the Guru mantra."
  },
  4: {
    mulank_desc: (name) => `${name}, your Mulank 4 is directed by Rahu's unconventional brilliance and analytical grit. You are a tireless structural thinker, questioner of dogmas, and master of groundbreaking innovations. Where others see routine, you see opportunities for systemic transformation and technical breakthroughs.`,
    bhagyank_desc: (name) => `With Bhagyank 4, ${name}, your life journey is marked by sudden karmic turning points, grand materialization, and building enduring modern institutions. Your destiny tests your endurance, rewarding consistent discipline with unassailable milestones.`,
    namank_desc: (name) => `Your Chaldean Namank 4 gives your name a magnetic, modern, and formidable edge. People perceive you as exceptionally sharp, strategically unshakeable, and capable of executing high-complexity tasks.`,
    auspicious_place: "Technological labs, modern high-rise architecture, research observatories, industrial hubs, and strategic executive boardrooms.",
    health: "Focus on the nervous system, respiratory health, knees, and lower limbs. Guard against sudden exhaustion, sleep irregularities, and unexplained inner restlessness.",
    auspicious_time: "Nocturnal twilight and overcast hours; specifically periods during early autumn and mid-winter transits.",
    career: "Software engineering, research science, aviation, infrastructure development, specialized finance, and investigative analytics.",
    fasts_remedies: "Observe fasts on Saturdays; offer black sesame seeds and mustard oil in charity; meditate with sandalwood incense to calm Rahu's electrical currents.",
    yantra_desc: "Rahu Yantra engraved on Ashtadhatu (eight-metal alloy), consecrated on a Saturday evening with 18,000 chants of the Rahu Beej mantra."
  },
  5: {
    mulank_desc: (name) => `${name}, your Mulank 5 is ruled by the swift, youthful, and intellectually agile Mercury (Budha). You possess commercial acumen, sparkling wit, versatility, and an unquenchable thirst for diverse experiences. You are a natural networker who easily decodes complex commercial and human patterns.`,
    bhagyank_desc: (name) => `With Bhagyank 5, ${name}, your life path thrives on adaptability, enterprise, and cross-cultural communication. Your fortune expands exponentially through commerce, journalism, technological media, and embracing constant progressive change.`,
    namank_desc: (name) => `Your Chaldean Namank 5 carries commercial magnetism, charm, and articulate persuasion. It opens doors in trade, negotiations, digital platforms, and social circles with effortless fluidity.`,
    auspicious_place: "Commercial trade exchanges, bustling communication centers, transit terminals, media production suites, and botanical gardens.",
    health: "Governs the central nervous system, vocal cords, speech organs, and hands. Avoid excessive caffeine and digital overstimulation to prevent nervous insomnia.",
    auspicious_time: "Midday when commerce peaks; especially during the fertile Mercury-ruled windows of late May to mid-June and September.",
    career: "International trade, financial brokerage, digital journalism, software development, marketing, public relations, and diplomatic communications.",
    fasts_remedies: "Observe fasts on Wednesdays; donate green pulses (moong dal) or feed fresh green grass to cows; chant the Budha Stotram weekly.",
    yantra_desc: "Budha Yantra inscribed on a polished brass or gold plate on a Wednesday during Shukla Paksha, energized with 9,000 chants of the Budha mantra."
  },
  6: {
    mulank_desc: (name) => `${name}, with Mulank 6, you radiate the luxuriant charm, artistic harmony, and restorative affection of Venus (Shukra). You possess refined aesthetic taste, a magnetic romantic presence, and a deep instinct for hospitality, beauty, and domestic sanctuary.`,
    bhagyank_desc: (name) => `With Bhagyank 6, ${name}, your destiny aligns with luxury, creative diplomacy, stewardship of community, and material prosperity. You are called to harmonize discordant environments and elevate quality of life for loved ones.`,
    namank_desc: (name) => `Your Chaldean Namank 6 infuses your name with glamorous allure, social popularity, and artistic grace. It magnetically draws comfort, valuable assets, and affectionate alliances into your life.`,
    auspicious_place: "Art galleries, elegant luxury estates, perfumeries, high-fashion boutiques, lush flower gardens, and scenic pastoral valleys.",
    health: "Governs the throat, renal system, reproductive health, and skin complexion. Keep a balanced lifestyle to prevent metabolic sluggishness and sugar imbalances.",
    auspicious_time: "Evening hours and sunsets; especially during the spring periods of late April to late May and the autumn festival season.",
    career: "Luxury branding, high fashion, architectural interior design, fine hospitality, film and music arts, cosmetics, and relationship counseling.",
    fasts_remedies: "Observe fasts on Fridays; donate white sweets, camphor, or curd to young girls; maintain spotless elegance in your personal sanctuary.",
    yantra_desc: "Shukra Yantra etched on pure silver, energized on a Friday morning during dawn with 16,000 recitations of the Shukra Beej mantra."
  },
  7: {
    mulank_desc: (name) => `${name}, your Mulank 7 resonates with the introspective, esoteric, and spiritual vibrations of Ketu. You are a philosopher, mystic analyst, and perceptive truth-seeker who instinctively pierces through superficial worldly illusions. You require contemplative solitude to recharge your intuitive batteries.`,
    bhagyank_desc: (name) => `With Bhagyank 7, ${name}, your soul contract is tailored for metaphysical illumination, research breakthroughs, and guiding others out of spiritual darkness. Material fortune arrives as a natural byproduct of your dedicated pursuit of mastery and truth.`,
    namank_desc: (name) => `Your Chaldean Namank 7 projects an enigmatic, dignified aura of profound wisdom. It commands silent admiration and marks you as an authentic thinker untainted by superficial fads.`,
    auspicious_place: "Mountain sanctuaries, quiet research libraries, ancient monasteries, ocean promontories, and tranquil meditation retreats.",
    health: "Governs the pineal gland, lymphatic fluids, allergies, and psychic sensitivity. Maintain gut wellness and guard against over-thinking and self-isolation.",
    auspicious_time: "Pre-dawn twilight (Brahma Muhurta) and the quiet midnight hour; especially during late February to late March.",
    career: "Metaphysical counseling, scientific research, deep-tech programming, oceanography, spiritual teaching, psychology, and investigative writing.",
    fasts_remedies: "Observe fasts on Tuesdays or Thursdays; feed street dogs with unsalted bread; chant the Ganesha Atharvashirsha or Ketu Stotram.",
    yantra_desc: "Ketu Yantra engraved on silver or Ashtadhatu, energized with 17,000 chants of the Ketu mantra during a Tuesday evening."
  },
  8: {
    mulank_desc: (name) => `${name}, your Mulank 8 is anchored by the profound karmic gravity, endurance, and justice of Saturn (Shani). You possess iron discipline, unmatched resilience, and deep executive capability. Life teaches you early self-reliance, grooming you into an indomitable pillar in times of collective storm.`,
    bhagyank_desc: (name) => `With Bhagyank 8, ${name}, your destiny commands monumental long-term achievements, organizational mastery, and karmic justice. Though success may demand patience and perseverance in early years, the legacy you build is unshakable and outlasts generations.`,
    namank_desc: (name) => `Your Chaldean Namank 8 endows your name with executive authority, seriousness, and formidable trustworthiness. Others instinctively rely upon you when high stakes require absolute dependability.`,
    auspicious_place: "Historic stone structures, institutional headquarters, judicial complexes, mining or manufacturing reserves, and contemplative sanctuaries.",
    health: "Governs bones, joints, teeth, knees, and longevity. Guard against rheumatism, chronic stiffness, and dental issues through regular yoga and oil massage (Abhyanga).",
    auspicious_time: "Saturday sunset and the reflective winter months between late December and late January (Capricorn/Aquarius seasons).",
    career: "Judicial law, corporate governance, mining, heavy manufacturing, civil engineering, long-term asset management, and political leadership.",
    fasts_remedies: "Observe fasts on Saturdays; light a mustard oil lamp (Diya) under a Peepal tree at dusk; feed black sesame to crows; serve laborers respectfully.",
    yantra_desc: "Shani Yantra inscribed on an iron or lead plate on a Saturday during Shukla Paksha, energized with 23,000 recitations of the Shani mantra."
  },
  9: {
    mulank_desc: (name) => `${name}, your Mulank 9 burns with the fearless courage, universal empathy, and dynamic drive of Mars (Mangala). You possess high ideals, an indomitable fighting spirit for just causes, and an instinctive urge to defend the vulnerable.`,
    bhagyank_desc: (name) => `With Bhagyank 9, ${name}, your destiny encompasses universal humanitarianism, organizational transformation, and completing grand karmic cycles. You achieve the highest glory when your personal ambition merges into the service of an inspiring, noble collective vision.`,
    namank_desc: (name) => `Your Chaldean Namank 9 gives your name a dynamic, courageous, and memorable resonance. It galvanizes action, sparks enthusiasm, and attracts allies who rally behind your causes.`,
    auspicious_place: "Expansive defense academies, athletic arenas, surgical operating complexes, iron foundries, and fire-warmed gatherings.",
    health: "Governs muscular vitality, blood circulation, head, and bone marrow. Channel excess fiery heat (Pitta) through physical athletics and stay well-hydrated.",
    auspicious_time: "Midday when solar and martian warmth peak; especially between March 21 and April 20 and mid-autumn.",
    career: "Defense and military leadership, surgical medicine, civil rights advocacy, sports directorship, engineering, and philanthropic foundations.",
    fasts_remedies: "Observe fasts on Tuesdays; recite the Hanuman Chalisa or Sundarkand; donate red lentils (masoor dal) or red cloth; honor brothers and defense personnel.",
    yantra_desc: "Mangala Yantra engraved on a pure copper plate, consecrated on a Tuesday noon with 10,000 recitations of the Mangala Beej mantra."
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
    content: {
      mulank: {
        meaning: mContent.mulank_desc(name),
        auspicious_place: mContent.auspicious_place,
        health: mContent.health,
        auspicious_time: mContent.auspicious_time,
        career: mContent.career,
        fasts_remedies: mContent.fasts_remedies,
        yantra: mContent.yantra_desc
      },
      bhagyank: {
        meaning: bContent.bhagyank_desc(name),
        auspicious_place: bContent.auspicious_place,
        health: bContent.health,
        auspicious_time: bContent.auspicious_time,
        career: bContent.career,
        fasts_remedies: bContent.fasts_remedies,
        yantra: bContent.yantra_desc
      },
      namank: {
        meaning: nContent.namank_desc(name),
        auspicious_place: nContent.auspicious_place,
        health: nContent.health,
        auspicious_time: nContent.auspicious_time,
        career: nContent.career,
        fasts_remedies: nContent.fasts_remedies,
        yantra: nContent.yantra_desc
      }
    }
  };
}
