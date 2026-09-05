/**
 * NUMEROLOGY ENGINE
 * Adapted and enhanced from aryanbrite/Numerology-app
 * Provides Sacred Pythagorean & Vedic Numerology calculations:
 * - Life Path Number (1-9, 11, 22, 33)
 * - Destiny / Expression Number (1-9, 11, 22, 33)
 * - Soul Urge / Heart's Desire Number (1-9, 11, 22, 33)
 * - Personality Number (1-9, 11, 22, 33)
 * - Birthday Number (1-9, 11, 22)
 * Includes rich mystical interpretations, ruling planetary bodies, and cosmic synthesis.
 */

export const LETTER_VALUES = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9
};

export const VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

export const PLANETARY_RULERS = {
  1: {
    planet: "Sun (Surya)",
    symbol: "☉",
    element: "Fire",
    sanskritElement: "Agni",
    chakra: "Solar Plexus",
    gemstone: "Ruby (Manikya)",
    frequency: "Root Frequency",
    quality: "Leadership, Vitality & Pure Willpower"
  },
  2: {
    planet: "Moon (Chandra)",
    symbol: "☽",
    element: "Water",
    sanskritElement: "Jala",
    chakra: "Sacral",
    gemstone: "Pearl (Moti)",
    frequency: "Harmonic Vibration",
    quality: "Intuition, Harmony, Sensitivity & Empathy"
  },
  3: {
    planet: "Jupiter (Brihaspati)",
    symbol: "♃",
    element: "Ether",
    sanskritElement: "Akasha",
    chakra: "Throat",
    gemstone: "Yellow Sapphire (Pukhraj)",
    frequency: "Expansive Vibration",
    quality: "Expansive Wisdom, Optimism & Creativity"
  },
  4: {
    planet: "Rahu / Uranus",
    symbol: "☊",
    element: "Earth",
    sanskritElement: "Prithvi",
    chakra: "Root",
    gemstone: "Hessonite (Gomed)",
    frequency: "Architectural Grid",
    quality: "Structure, Discipline, Breakthroughs & Foundations"
  },
  5: {
    planet: "Mercury (Budha)",
    symbol: "☿",
    element: "Air",
    sanskritElement: "Vayu",
    chakra: "Throat",
    gemstone: "Emerald (Panna)",
    frequency: "Mercurial Current",
    quality: "Freedom, Eloquence, Curiosity & Versatility"
  },
  6: {
    planet: "Venus (Shukra)",
    symbol: "♀",
    element: "Water",
    sanskritElement: "Jala",
    chakra: "Heart",
    gemstone: "Diamond (Heera)",
    frequency: "Nurturing Resonance",
    quality: "Harmony, Love, Artistry, Healing & Nurturing"
  },
  7: {
    planet: "Ketu / Neptune",
    symbol: "☋",
    element: "Water",
    sanskritElement: "Jala",
    chakra: "Third Eye",
    gemstone: "Cat's Eye (Lehsunia)",
    frequency: "Mystical Current",
    quality: "Mysticism, Deep Analysis, Solitude & Spiritual Truth"
  },
  8: {
    planet: "Saturn (Shani)",
    symbol: "♄",
    element: "Earth",
    sanskritElement: "Prithvi",
    chakra: "Root",
    gemstone: "Blue Sapphire (Neelam)",
    frequency: "Karmic Weight",
    quality: "Karma, Executive Mastery, Manifestation & Wealth"
  },
  9: {
    planet: "Mars (Mangala)",
    symbol: "♂",
    element: "Fire",
    sanskritElement: "Agni",
    chakra: "Solar Plexus",
    gemstone: "Red Coral (Moonga)",
    frequency: "Universal Alchemist",
    quality: "Universal Compassion, High Ideals, Philanthropy & Courage"
  },
  11: {
    planet: "Super-Moon / Neptune",
    symbol: "✨",
    element: "Ether",
    sanskritElement: "Akasha",
    chakra: "Crown / Third Eye",
    gemstone: "Labradorite / Opal",
    frequency: "Master Vibration 11",
    quality: "Master Intuitive, Psychic Illumination & Inspiration"
  },
  22: {
    planet: "Super-Saturn / Vulcan",
    symbol: "🏛️",
    element: "Earth",
    sanskritElement: "Prithvi",
    chakra: "Root / Crown",
    gemstone: "Moldavite / Obsidian",
    frequency: "Master Vibration 22",
    quality: "Master Architect, Visionary Manifestation & Global Impact"
  },
  33: {
    planet: "Universal Consciousness",
    symbol: "🌟",
    element: "Cosmic Light",
    sanskritElement: "Tejas",
    chakra: "Heart / Crown",
    gemstone: "Seraphinite / Diamond",
    frequency: "Master Vibration 33",
    quality: "Master Teacher, Universal Healing & Unconditional Compassion"
  }
};

/**
 * Generate Shields/Awesome-Badges inspired dual-tone mystical capsules
 */
export function renderMysticBadgeHtml(label, value, icon, variant = 'gold') {
  return `<div class="mystic-badge mystic-badge-${variant}">` +
    `<span class="mb-label">${icon ? icon + ' ' : ''}${label}</span>` +
    `<span class="mb-value">${value}</span>` +
  `</div>`;
}

export function getCrystalBadgesHtml(num, ruler) {
  if (!ruler) ruler = PLANETARY_RULERS[num] || PLANETARY_RULERS[1];
  const isMaster = num === 11 || num === 22 || num === 33;
  const masterVariant = isMaster ? 'master' : 'gold';

  return `<div class="crystal-badges-cluster">` +
    renderMysticBadgeHtml('Ruler', ruler.planet.split(' ')[0], ruler.symbol, 'planet') +
    renderMysticBadgeHtml('Element', `${ruler.element} (${ruler.sanskritElement})`, '⚡', 'element') +
    renderMysticBadgeHtml('Gem', ruler.gemstone.split(' ')[0], '💎', 'gem') +
    renderMysticBadgeHtml('Chakra', ruler.chakra, '🕉️', 'chakra') +
    renderMysticBadgeHtml('Level', isMaster ? `Master ${num}` : `Root ${num}`, isMaster ? '👑' : '✦', masterVariant) +
  `</div>`;
}


export const NUMEROLOGY_MEANINGS = {
  life_path: {
    1: {
      keyword: "The Pioneer & Trailblazer",
      summary: "A natural-born leader destined to forge untrodden paths with sheer determination, fierce autonomy, and courage.",
      traits: ["Pioneering spirit", "Independent thinker", "Original ambition", "Unshakable drive"],
      guidance: "Channel your inner fire into creating opportunities for others rather than walking completely isolated."
    },
    2: {
      keyword: "The Diplomat & Peacemaker",
      summary: "A gentle bridge-builder whose deep empathy and acute emotional antenna harmonize conflict and foster sacred partnerships.",
      traits: ["Intuitive empathy", "Cooperative spirit", "Patient listener", "Harmonious grace"],
      guidance: "Honor your sensitive boundaries so you do not absorb psychic residue from chaotic environments."
    },
    3: {
      keyword: "The Radiant Creator & Muse",
      summary: "A vessel of joyful self-expression, bringing light, humor, and brilliant artistry into the mortal realm.",
      traits: ["Effervescent charisma", "Creative genius", "Magnetic communicator", "Spontaneous wit"],
      guidance: "Focus your scattered sparks of inspiration into sustained masterpieces."
    },
    4: {
      keyword: "The Master Architect & Anchor",
      summary: "The bedrock of stability, order, and enduring work, capable of transmuting abstract ideas into solid, grounded reality.",
      traits: ["Rock-solid discipline", "Methodical strategist", "Unmatched reliability", "Loyal cornerstone"],
      guidance: "Cultivate flexibility; remember that the strongest trees bend gracefully with the cosmic wind."
    },
    5: {
      keyword: "The Adventurer & Catalyst of Change",
      summary: "A mercurial seeker of liberty and sensory evolution, thriving on metamorphosis, travel, and untamed discovery.",
      traits: ["Dynamic versatility", "Progressive worldview", "Magnetic allure", "Fearless curiosity"],
      guidance: "Ground your boundless craving for stimulation with purposeful direction so momentum is not dissipated."
    },
    6: {
      keyword: "The Sacred Guardian & Healer",
      summary: "A pillar of benevolent service, unconditional affection, and familial sanctuary, bringing healing wherever there is discord.",
      traits: ["Nurturing presence", "Protective guardian", "Artistic harmony", "Deep sense of duty"],
      guidance: "Avoid martyrdom or over-interfering; honor the divine sovereignty of those you love."
    },
    7: {
      keyword: "The Mystic Sage & Truth Seeker",
      summary: "A contemplative philosopher with an intellectual and metaphysical magnifying glass, unraveling the universe's esoteric mysteries.",
      traits: ["Piercing analytical mind", "Esoteric affinity", "Deep inner sanctum", "Spiritual discernment"],
      guidance: "Step out of your ivory sanctuary periodically to share your luminous epiphanies with the collective."
    },
    8: {
      keyword: "The Sovereign of Abundance & Karma",
      summary: "A master of material and karmic balances, possessing raw executive power, strategic foresight, and organizational genius.",
      traits: ["Executive authority", "Manifestation mastery", "Karmic equilibrium", "Resilient stamina"],
      guidance: "Remember that true abundance is an energetic current meant to flow and uplift communities."
    },
    9: {
      keyword: "The Universal Humanitarian & Alchemist",
      summary: "A compassionate soul standing at the threshold of completion, offering selflessness, transcendent wisdom, and artistic closure.",
      traits: ["Universal empathy", "Transpersonal vision", "Artistic depth", "Karmic completion"],
      guidance: "Surrender past attachments gracefully; you are preparing space for higher spiritual ascents."
    },
    11: {
      keyword: "The Master Illuminator",
      summary: "A sacred master vibration acting as an ethereal conduit between the unseen dimensions and earthly consciousness.",
      traits: ["Supernatural intuition", "Visionary ideals", "Charismatic inspiration", "Metaphysical awakening"],
      guidance: "Ground your nervous system through meditation and communion with nature to support high psychic voltage."
    },
    22: {
      keyword: "The Master Builder & Titan",
      summary: "The most powerful constructive energy in numerology, able to materialize transcendent visions into permanent monuments and institutions.",
      traits: ["Architectural genius", "Global impact", "Practical idealism", "Tireless execution"],
      guidance: "Keep your heart tethered to moral purity as immense power flows through your hands."
    },
    33: {
      keyword: "The Master Avatar & Uplifter",
      summary: "The pinnacle of selfless cosmic love and spiritual guidance, dedicated to elevating collective humanity through healing and compassion.",
      traits: ["Christed benevolence", "Spiritual illumination", "Selfless devotion", "Universal healing"],
      guidance: "Protect your emotional sanctuary while holding space for the healing of the world."
    }
  },

  destiny: {
    1: {
      title: "Destiny of Command & Innovation",
      desc: "Your cosmic assignment is to initiate original ventures, break outdated paradigms, and inspire others through solitary courage."
    },
    2: {
      title: "Destiny of Concord & Sacred Union",
      desc: "Your path is destined to weave peace through diplomacy, collaborative alliance, and mediating human discord into symphony."
    },
    3: {
      title: "Destiny of Divine Expression",
      desc: "Destined to lift spirits through writing, speech, humor, or art, acting as a joyful lightning rod for celestial inspiration."
    },
    4: {
      title: "Destiny of Foundation & Craftsmanship",
      desc: "Your purpose lies in designing enduring structures, reliable systems, and tangible legacies that outlive generations."
    },
    5: {
      title: "Destiny of Liberation & Evolution",
      desc: "Destined to be an agent of transformation, opening closed minds through fearless inquiry, movement, and dynamic experience."
    },
    6: {
      title: "Destiny of Stewardship & Loving Sanctuary",
      desc: "Your sacred charge is healing families, cultivating beautiful environments, and protecting the vulnerable with tender devotion."
    },
    7: {
      title: "Destiny of Wisdom & Sacred Insight",
      desc: "Destined to pierce the veil of illusions, distilling philosophical, scientific, or mystical truths for humanity's enlightenment."
    },
    8: {
      title: "Destiny of Mastery & Material Elevation",
      desc: "Your soul contract demands executive stewardship over resources, commerce, and leadership to bring prosperity into divine order."
    },
    9: {
      title: "Destiny of Universal Philanthropy",
      desc: "Destined to champion the underdog, cultivate cosmic consciousness, and complete grand karmic cycles through broad compassion."
    },
    11: {
      title: "Destiny of Spiritual Catalyst",
      desc: "Destined to inspire mass awakenings, translating higher spiritual wisdom into accessible beacons of light."
    },
    22: {
      title: "Destiny of Monumental Manifestation",
      desc: "Destined to build world-altering organizations, technologies, or societal paradigms that anchor higher ideals into earthly reality."
    },
    33: {
      title: "Destiny of Supreme Spiritual Guidance",
      desc: "Destined to become a sanctuary of universal love, uplifting suffering beings through profound teaching and energetic healing."
    }
  },

  soul: {
    1: {
      title: "Soul Hunger for Independence",
      desc: "Deep within, your soul craves total autonomy, freedom of self-determination, and the thrill of being first."
    },
    2: {
      title: "Soul Hunger for Intimacy & Harmony",
      desc: "Your secret longing is unconditional companionship, gentle emotional safety, and harmonious mutual devotion."
    },
    3: {
      title: "Soul Hunger for Play & Creation",
      desc: "Your inner child yearns to laugh, create uninhibited art, captivate audiences, and experience joy without boundaries."
    },
    4: {
      title: "Soul Hunger for Stability & Order",
      desc: "Your spirit finds peace in predictable anchors, disciplined mastery, and constructing a rock-solid perimeter of safety."
    },
    5: {
      title: "Soul Hunger for Unshackled Freedom",
      desc: "Your soul longs to roam without cages, taste the exotic nuances of existence, and never be constrained by routine."
    },
    6: {
      title: "Soul Hunger to Love & Be Cherished",
      desc: "Your heart whispers of home, warm hearths, caring for loved ones, and being appreciated for your nurturing generosity."
    },
    7: {
      title: "Soul Hunger for Quiet Truth",
      desc: "Your spirit requires sanctuary, quiet communion with the cosmos, and solving the deep existential puzzles of existence."
    },
    8: {
      title: "Soul Hunger for Influence & Conquest",
      desc: "Deep down, you desire to command respect, orchestrate great enterprises, and leave an indelible mark of power."
    },
    9: {
      title: "Soul Hunger for Universal Transcendence",
      desc: "Your soul weeps for the suffering of all creatures and yearns to give itself over to a noble, planetary cause."
    },
    11: {
      title: "Soul Hunger for Mystical Epiphany",
      desc: "An intense internal yearning for mystical communion, divine purpose, and seeing behind the cosmic curtain."
    },
    22: {
      title: "Soul Hunger for Legacy & World Impact",
      desc: "A burning inner demand to build lasting works that elevate the standard of living for entire civilizations."
    },
    33: {
      title: "Soul Hunger to Heal the World",
      desc: "An all-consuming urge to radiate comforting grace and alleviate darkness across every hurting soul."
    }
  },

  personality: {
    1: { title: "Magnetic & Commanding", desc: "You project an aura of confidence, directness, and immediate authority when entering any room." },
    2: { title: "Gentle & Approachable", desc: "Others perceive you as remarkably warm, considerate, peaceful, and an attentive listener." },
    3: { title: "Charming & Radiant", desc: "You project sparkling wit, creative vitality, colorful style, and infectious enthusiasm." },
    4: { title: "Dignified & Grounded", desc: "People see you as honest, no-nonsense, dependable, and reassuringly steady in a storm." },
    5: { title: "Electrifying & Dynamic", desc: "You exude an adventurous, youthful spark with a stylish flair and irresistible curiosity." },
    6: { title: "Warm & Protective", desc: "You radiate comfort, maternal/paternal dependability, aesthetic grace, and hospitality." },
    7: { title: "Enigmatic & Intellectual", desc: "You carry an intriguing air of mystery, quiet dignity, and intellectual depth." },
    8: { title: "Formidable & Authoritative", desc: "Others instantly recognize a capable leader of high status, keen judgment, and executive power." },
    9: { title: "Noble & Aristocratic", desc: "You project gracious elegance, broad-minded kindness, and magnetic worldly charm." },
    11: { title: "Mystical & Visionary", desc: "You appear illuminated, other-worldly, and inspiring, naturally drawing seekers to your presence." },
    22: { title: "Imposing & Architectonic", desc: "You project immense capability, composure, and the gravity of an architect of destinies." },
    33: { title: "Benevolent & Saintly", desc: "You exude profound warmth, compassionate presence, and a reassuring spiritual radiance." }
  },

  birthday: {
    1: { title: "Pioneer Seed", desc: "Born to originate and lead with independent vigor." },
    2: { title: "Diplomatic Gift", desc: "Blessed with natural sensitivity, tact, and relational harmony." },
    3: { title: "Creative Spark", desc: "Natural eloquence, artistic expression, and quick wit." },
    4: { title: "Solid Anchor", desc: "Unwavering practicality, craftsmanship, and perseverance." },
    5: { title: "Free Bird", desc: "Resourceful adaptability, love of adventure, and quick reflexes." },
    6: { title: "Nurturing Heart", desc: "Instinctive caregiver, aesthetic eye, and peace-bringer." },
    7: { title: "Analytical Sage", desc: "Penetrating mind, natural philosopher, and truth seeker." },
    8: { title: "Karmic Executive", desc: "Business intuition, financial acuity, and strategic stamina." },
    9: { title: "Compassionate Elder", desc: "Broad humanitarian worldview and artistic vision." },
    11: { title: "Intuitive Beacon", desc: "Heightened sixth sense, prophetic flashes, and inspiring presence." },
    22: { title: "Master Builder", desc: "Practical genius capable of turning grand dreams into reality." }
  }
};

/**
 * Reduce a number to a single digit, preserving Master Numbers 11, 22, 33 if requested.
 */
export function reduceNumber(num, preserveMaster = true) {
  num = parseInt(num, 10);
  if (isNaN(num) || num <= 0) return 0;

  while (num > 9) {
    if (preserveMaster && (num === 11 || num === 22 || num === 33)) {
      return num;
    }
    num = String(num)
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num;
}

/**
 * Calculate Life Path Number from a date string (YYYY-MM-DD or DD/MM/YYYY) or Date object.
 */
export function calculateLifePath(dobInput) {
  let day = 0, month = 0, year = 0;

  if (dobInput instanceof Date && !isNaN(dobInput.getTime())) {
    day = dobInput.getDate();
    month = dobInput.getMonth() + 1;
    year = dobInput.getFullYear();
  } else if (typeof dobInput === 'string') {
    const clean = dobInput.trim();
    if (clean.includes('-')) {
      const parts = clean.split('-');
      if (parts.length === 3) {
        year = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        day = parseInt(parts[2], 10);
      }
    } else if (clean.includes('/')) {
      const parts = clean.split('/');
      if (parts.length === 3) {
        day = parseInt(parts[0], 10);
        month = parseInt(parts[1], 10);
        year = parseInt(parts[2], 10);
      }
    }
  }

  if (!day || !month || !year) return 1;

  // Traditional Pythagorean method: reduce each component first, then sum and reduce
  const redDay = reduceNumber(day, true);
  const redMonth = reduceNumber(month, true);
  const redYear = reduceNumber(year, true);

  return reduceNumber(redDay + redMonth + redYear, true);
}

/**
 * Calculate Destiny (Expression) Number from a name.
 */
export function calculateDestiny(name) {
  if (!name || typeof name !== 'string') return 1;
  const clean = name.toLowerCase().replace(/[^a-z]/g, '');
  if (!clean.length) return 1;

  let sum = 0;
  for (const char of clean) {
    sum += LETTER_VALUES[char] || 0;
  }
  return reduceNumber(sum, true);
}

/**
 * Calculate Soul Urge (Heart's Desire) Number from vowels in the name.
 */
export function calculateSoulUrge(name) {
  if (!name || typeof name !== 'string') return 1;
  const clean = name.toLowerCase().replace(/[^a-z]/g, '');
  let sum = 0;
  for (const char of clean) {
    if (VOWELS.has(char)) {
      sum += LETTER_VALUES[char] || 0;
    }
  }
  return sum > 0 ? reduceNumber(sum, true) : 1;
}

/**
 * Calculate Personality Number from consonants in the name.
 */
export function calculatePersonality(name) {
  if (!name || typeof name !== 'string') return 1;
  const clean = name.toLowerCase().replace(/[^a-z]/g, '');
  let sum = 0;
  for (const char of clean) {
    if (!VOWELS.has(char)) {
      sum += LETTER_VALUES[char] || 0;
    }
  }
  return sum > 0 ? reduceNumber(sum, true) : 1;
}

/**
 * Calculate Birthday Number from day of the month.
 */
export function calculateBirthday(dobInput) {
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
  return reduceNumber(day, true);
}

/**
 * Generate full numerology reading profile.
 */
export function getFullNumerologyProfile(name, dob) {
  const safeName = (name || "Sacred Soul").trim();
  const lifePath = calculateLifePath(dob);
  const destiny = calculateDestiny(safeName);
  const soul = calculateSoulUrge(safeName);
  const personality = calculatePersonality(safeName);
  const birthday = calculateBirthday(dob);

  const lpData = NUMEROLOGY_MEANINGS.life_path[lifePath] || NUMEROLOGY_MEANINGS.life_path[1];
  const destData = NUMEROLOGY_MEANINGS.destiny[destiny] || NUMEROLOGY_MEANINGS.destiny[1];
  const soulData = NUMEROLOGY_MEANINGS.soul[soul] || NUMEROLOGY_MEANINGS.soul[1];
  const persData = NUMEROLOGY_MEANINGS.personality[personality] || NUMEROLOGY_MEANINGS.personality[1];
  const bdayData = NUMEROLOGY_MEANINGS.birthday[birthday] || NUMEROLOGY_MEANINGS.birthday[1];

  const lpRuler = PLANETARY_RULERS[lifePath] || PLANETARY_RULERS[1];
  const destRuler = PLANETARY_RULERS[destiny] || PLANETARY_RULERS[1];

  // Synthesis creation
  const isMasterLP = lifePath === 11 || lifePath === 22 || lifePath === 33;
  const isMasterDest = destiny === 11 || destiny === 22 || destiny === 33;

  let synthesis = `Your sacred signature is governed by the divine triad: Life Path ${lifePath} (${lpData.keyword}), Destiny ${destiny} (${destData.title}), and Soul Urge ${soul} (${soulData.title}). `;

  if (isMasterLP || isMasterDest) {
    synthesis += `You carry a rare Master Vibration (${isMasterLP ? 'Life Path ' + lifePath : ''}${isMasterLP && isMasterDest ? ' & ' : ''}${isMasterDest ? 'Destiny ' + destiny : ''}), denoting a profound evolutionary mission and accelerated karmic awakening in this incarnation. `;
  }

  synthesis += `While your Life Path ${lifePath} under ${lpRuler.planet} illuminates the winding road beneath your feet, your Destiny ${destiny} governed by ${destRuler.planet} acts as your northern star. Deep beneath the surface, your Soul Number ${soul} beats with the hidden longing of ${soulData.desc.toLowerCase()}`;

  return {
    name: safeName,
    dob: dob,
    numbers: {
      lifePath,
      destiny,
      soul,
      personality,
      birthday
    },
    rulers: {
      lifePath: lpRuler,
      destiny: destRuler
    },
    meanings: {
      lifePath: lpData,
      destiny: destData,
      soul: soulData,
      personality: persData,
      birthday: bdayData
    },
    synthesis: synthesis
  };
}
