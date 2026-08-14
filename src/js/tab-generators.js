/* TAB CONTENT & HORIZON TIMELINE GENERATORS */

var NAK_DESC={
  'Ashwini':'a spirit of swift healing and pioneering instinct',
  'Bharani':'the weight of restraint — you carry what others cannot',
  'Krittika':'fire of purification and decisive clarity',
  'Rohini':'a magnetic pull toward beauty, growth, and sensory richness',
  'Mrigashira':'an eternal seeker — curious, restless, searching',
  'Ardra':'the storm before clarity — emotional intensity that becomes wisdom',
  'Punarvasu':'a return to light after difficulty — resilience is your core',
  'Pushya':'a nurturing force that sustains others while feeding on purpose',
  'Ashlesha':'a coiled awareness — penetrating, hypnotic, transmutative',
  'Magha':'the throne of the ancestors — dignity, authority, and roots',
  'Purva Phalguni':'pleasure and creative expression as a spiritual path',
  'Uttara Phalguni':'the marriage of service and self — you shine through giving',
  'Hasta':'precise craftsmanship and healing through the hands',
  'Chitra':'a jewel of artistry — you create beauty as a cosmic act',
  'Swati':'independence and freedom — you resist containment',
  'Vishakha':'focused ambition toward a singular burning goal',
  'Anuradha':'loyalty and devotion — you build lasting bonds across time',
  'Jyeshtha':'the elder\'s authority — leadership as burden and gift',
  'Mula':'the root of things — driven to uncover what is hidden',
  'Purva Ashadha':'invincibility of spirit — you do not yield easily',
  'Uttara Ashadha':'final victory through patience and sustained effort',
  'Shravana':'the gift of listening — you hear what others miss',
  'Dhanistha':'abundance through action — you are made to achieve',
  'Shatabhisha':'the healer of hidden wounds, a mysterious solitude',
  'Purva Bhadrapada':'a fire that purifies — intensity seeking transformation',
  'Uttara Bhadrapada':'depths of compassion and cosmic understanding',
  'Revati':'nurturing, mystical, and eternally kind',
};

var SIGN_DESC={
  'Aries':'a pioneer and natural leader, quick-thinking and bold',
  'Taurus':'sensual, patient and deeply persistent — you build to last',
  'Gemini':'intellectually agile and socially gifted, you thrive on variety',
  'Cancer':'emotionally intelligent and nurturing, with deep intuitive roots',
  'Leo':'radiant and self-expressive, you carry a natural charisma',
  'Virgo':'analytical, service-oriented and driven by a deep love of craft',
  'Libra':'a natural diplomat who seeks beauty, harmony and balance',
  'Scorpio':'penetrating and transformative, you deal in depth not surface',
  'Sagittarius':'philosophical and freedom-seeking, you follow meaning over routine',
  'Capricorn':'ambitious and disciplined, you build patiently for the long view',
  'Aquarius':'original and forward-thinking, you belong to the future',
  'Pisces':'empathic and intuitive, you carry the ocean within you',
};

var CAREER_Q={
  'Aries':'pioneering ventures, leadership, and competitive fields',
  'Taurus':'finance, luxury, arts, or any field requiring patient accumulation',
  'Gemini':'writing, communication, trade, technology, or roles requiring versatile thinking',
  'Cancer':'caregiving, real estate, hospitality, food, or fields with emotional resonance',
  'Leo':'leadership, entertainment, education, or any platform requiring presence',
  'Virgo':'analysis, medicine, research, editing, or any precision-craft that serves others',
  'Libra':'law, diplomacy, design, or any domain requiring balance and people skills',
  'Scorpio':'investigation, psychology, finance, or transformation-focused fields',
  'Sagittarius':'education, law, travel, or any field rooted in higher meaning',
  'Capricorn':'government, corporate, engineering, or structure-building that rewards longevity',
  'Aquarius':'technology, social causes, innovation, or fields that serve the collective',
  'Pisces':'arts, healing, spirituality, film, or domains where imagination is the raw material',
};

var LOVE_Q={
  'Aries':'directness, passion, independence, and spontaneity',
  'Taurus':'sensuality, stability, loyalty, and a love of beauty',
  'Gemini':'wit, curiosity, adaptability, and intellectual stimulation',
  'Cancer':'emotional depth, nurturing warmth, and protective loyalty',
  'Leo':'warmth, generosity, confidence, and a flair for drama',
  'Virgo':'attentiveness, reliability, and practical devotion',
  'Libra':'elegance, fairness, romantic thoughtfulness, and social grace',
  'Scorpio':'intensity, depth, transformative power, and unswerving loyalty',
  'Sagittarius':'freedom, philosophical depth, adventure, and honest directness',
  'Capricorn':'ambition, reliability, and long-view commitment',
  'Aquarius':'originality, friendship-as-love, and progressive thinking',
  'Pisces':'empathy, imagination, spiritual connection, and boundless compassion',
};

var BODY_FOCUS={
  'Aries':'Head & Brain','Taurus':'Throat & Thyroid','Gemini':'Lungs & Nerves',
  'Cancer':'Chest & Stomach','Leo':'Heart & Spine','Virgo':'Intestines & Digestion',
  'Libra':'Kidneys & Lower Back','Scorpio':'Reproductive System','Sagittarius':'Hips & Thighs',
  'Capricorn':'Knees & Bones','Aquarius':'Circulation & Ankles','Pisces':'Feet & Lymphatics',
};

var VENUS_NOTE={
  1:'Venus here makes your personality magnetic — love and beauty are central to your identity.',
  2:'Love and wealth are intertwined — you attract through your voice, your values, and what you have built.',
  3:'Love expressed through communication and shared effort. Partners who share your intellectual world resonate deeply.',
  4:'Deep, domestic, soulful love — home is where your heart truly opens.',
  5:'Romantic and creative love — affairs of the heart are vivid and artistically coloured.',
  6:'Love expressed through service and devotion — you show up for people in practical ways.',
  7:'Venus in the house of partnership is a classic placement for deep romantic relationships and significant marriage.',
  8:'Intensity and transformation define your love experiences — nothing is surface-level.',
  9:'Love that teaches and expands — partners tend to be wise, inspiring, or philosophically rich.',
  10:'Public life and career are entangled with love — partners often share your professional world.',
  11:'Love through friendship and shared ideals — your best partnerships begin as deep friendships.',
  12:'Private, spiritual love — the most meaningful connections begin in hidden or unusual ways.',
};

var DASHA_CAREER={
  Su:'A time for authority and visibility. Pitch yourself boldly — the Sun rewards those who step into the light.',
  Mo:'Intuition leads the way. Career moves guided by gut feeling tend to land well in this period.',
  Ma:'High energy and drive activate the career. Bold action and assertion are rewarded.',
  Me:'Mercury brings skill-building and communication to the fore. A strong period for learning and pitching.',
  Ve:'Venus-ruled periods favour creative fields, relationships, and anything where aesthetics matter.',
  Ju:'Expansion and wisdom — one of the strongest windows for growth, title change, or higher responsibility.',
  Sa:'Patience and discipline are the currency. Slow, methodical work compounds into something lasting.',
  Ra:'Obsessive drive and unconventional ambition. Technology and disruptive moves are highlighted.',
  Ke:'A period of inner work. Career gains may feel indirect, but spiritual clarity sharpens direction.',
};

var PLANET_UPAYA={
  Su:'honour Sundays with acts of service; offer water to the rising sun',
  Mo:'Mondays, offer white flowers or milk at a Shiva or Devi shrine',
  Ma:'Tuesdays, a physical discipline or act of courage; donate red lentils',
  Me:'Wednesdays, green moong dal to charity; recite Om Budhaya Namaha 108 times',
  Ve:'Fridays, beauty and artistic acts; offer white or pink flowers to Lakshmi',
  Ju:'Thursdays, generosity and study; offer yellow foods or a donation to a teacher',
  Sa:'Saturdays, fasting or simplicity; offer sesame seeds',
  Ra:'Feed the poor on Saturdays; avoid impulsive decisions',
  Ke:'Tuesday acts of spiritual humility; recite Ganesh mantras',
};

var WEALTH_H11={
  'Aries':'Gains come quickly but require initiative — the first mover advantage is yours if you act',
  'Taurus':'Gains accrue slowly and solidly — you build wealth as you build everything else: patiently',
  'Gemini':'Multiple income streams and intellectual ventures are natural channels for gain',
  'Cancer':'Gains often tied to family, real estate, or nurturing ventures',
  'Leo':'Public recognition and leadership roles open financial doors',
  'Virgo':'Service, precision, and health-related fields are natural gain channels',
  'Libra':'Partnership and negotiation are where your gains are made',
  'Scorpio':'Investment and transformation-focused ventures are the natural channels',
  'Sagittarius':'Teaching, travel, and higher knowledge open the doors to abundance',
  'Capricorn':'Career achievement and structural expertise are the primary gain channels',
  'Aquarius':'Technology, innovation, and collective causes are where gains flow',
  'Pisces':'Creative, spiritual, and imaginative ventures carry the greatest potential',
};

function getAscTakeaways(sign, deg, nak, pada) {
  var bullets = [];
  if (deg < 10) {
    bullets.push('Early degree (' + deg + '°) placement gives raw, pioneering energy in starting new chapters.');
  } else if (deg < 20) {
    bullets.push('Mid-degree (' + deg + '°) placement brings balanced, fully-expressed ' + sign + ' character.');
  } else {
    bullets.push('Late degree (' + deg + '°) placement gives mature, seasoned perspective and deep endurance.');
  }
  bullets.push('Pada ' + pada + ' of ' + nak + ' directs your energy toward ' + (PADA_NOTE[pada] || 'focused personal growth') + '.');
  return bullets;
}

function getMoonTakeaways(sign, deg, nak, pada, dignity) {
  var bullets = [];
  if (dignity.status === 'exalted') {
    bullets.push('Exalted Moon gives exceptional emotional resilience, poise, and steady inner peace under pressure.');
  } else if (dignity.status === 'debilitated') {
    bullets.push('Debilitated Moon creates deep sensitivity — emotional mastery comes through self-compassion.');
  } else if (dignity.status === 'own') {
    bullets.push('Moon in Swagriha brings strong intuitive intelligence and natural nurturing instincts.');
  } else {
    bullets.push('Moon in ' + sign + ' gives adaptable emotional processing tuned to ' + sign + ' qualities.');
  }
  bullets.push('Pada ' + pada + ' of ' + nak + ' anchors your instincts in ' + (PADA_NOTE[pada] || 'self-awareness') + '.');
  return bullets;
}

function genHorizonTimeline(d) {
  var dashas = d.dashas;
  var cd = currentDasha(dashas);
  if (!cd) return '';

  var antars = calcAntardashas(cd.planet, cd.start, cd.end);
  var now = new Date();
  var cAntar = antars.find(function(a) { return a.start <= now && a.end > now; }) || antars[0];
  var cAntarIdx = antars.indexOf(cAntar);
  var nAntar = (cAntarIdx < antars.length - 1) ? antars[cAntarIdx + 1] : null;
  var nd = nextDasha(dashas);
  var dobDate = d.dobDate || new Date();
  var saturnReturn = new Date(dobDate.getFullYear() + 29.5, dobDate.getMonth(), dobDate.getDate());

  var nodes = [
    {
      badge: 'Dasha Start',
      date: fmtDate(cd.start),
      label: PNAME[cd.planet] + ' Mahadasha',
      desc: 'Major 120y cycle phase began.',
      isHere: false
    },
    {
      badge: 'Sub-Period',
      date: fmtDate(cAntar.start),
      label: PNAME[cAntar.planet] + ' Antardasha',
      desc: 'Active sub-cycle focus.',
      isHere: false
    },
    {
      badge: 'Current Phase',
      date: 'Today (' + fmtDate(now) + ')',
      label: 'YOU ARE HERE',
      desc: 'Active: ' + PNAME[cd.planet] + ' / ' + PNAME[cAntar.planet] + '.',
      isHere: true
    },
    {
      badge: 'Upcoming Sub',
      date: nAntar ? fmtDate(nAntar.start) : 'Future',
      label: nAntar ? PNAME[nAntar.planet] + ' Antardasha' : 'Next Sub-Period',
      desc: nAntar ? 'Next sub-cycle shift begins.' : 'Upcoming transition.',
      isHere: false
    },
    {
      badge: 'Major Milestone',
      date: nd ? fmtDate(nd.start) : fmtDate(saturnReturn),
      label: nd ? PNAME[nd.planet] + ' Mahadasha' : 'Saturn Return',
      desc: nd ? 'Next major 120y Dasha shift.' : 'First Saturn return cycle.',
      isHere: false
    }
  ];

  var trackHtml = nodes.map(function(n) {
    return '<div class="ck-horizon-node' + (n.isHere ? ' is-here' : '') + '">' +
      '<div class="ck-node-dot"></div>' +
      '<div class="ck-node-badge">' + n.badge + '</div>' +
      '<div class="ck-node-date">' + n.date + '</div>' +
      '<div class="ck-node-label">' + n.label + '</div>' +
      '<div class="ck-node-desc">' + n.desc + '</div>' +
      '</div>';
  }).join('');

  return '<div class="ck-horizon-wrap">' +
    '<div class="ck-horizon-header">' +
    '<div class="ck-horizon-title"><span>✦</span> Horizon Timeline &mdash; Cosmic Time Stream</div>' +
    '<div class="ck-horizon-subtitle">Vimshottari Dasha &amp; Antardasha Progression</div>' +
    '</div>' +
    '<div class="ck-horizon-track">' + trackHtml + '</div>' +
    '</div>';
}

/* TAB GENERATORS */
function genOverview(d, mode){
  var isSimple = (mode === 'simplified');

  var ascLon = d.planetsLon['As'] || 0;
  var moonLon = d.planetsLon['Mo'] || 0;
  var sunLon = d.planetsLon['Su'] || 0;

  var ascSign = d.lagnaSign;
  var ascDegStr = fmtDegMin(ascLon);
  var ascNakIdx = nakOf(ascLon);
  var ascNak = NAKSHATRA[ascNakIdx];
  var ascNakLord = PNAME[NAK_LORDS[ascNakIdx]] || NAK_LORDS[ascNakIdx];
  var ascNakDeity = NAK_DEITIES[ascNakIdx] || 'Celestial Guardian';
  var ascPada = Math.floor((ascLon % (360/27)) / 3.3333333) + 1;

  var moonSign = d.moonSign;
  var moonDegStr = fmtDegMin(moonLon);
  var moonNakIdx = nakOf(moonLon);
  var moonNak = NAKSHATRA[moonNakIdx];
  var moonNakLord = PNAME[NAK_LORDS[moonNakIdx]] || NAK_LORDS[moonNakIdx];
  var moonNakDeity = NAK_DEITIES[moonNakIdx] || 'Celestial Nurturer';
  var moonPada = Math.floor((moonLon % (360/27)) / 3.3333333) + 1;
  var moonDignity = getPlanetDignity('Mo', moonLon);

  var ascBullets = getAscTakeaways(ascSign, Math.floor(ascLon % 30), ascNak, ascPada);
  var moonBullets = getMoonTakeaways(moonSign, Math.floor(moonLon % 30), moonNak, moonPada, moonDignity);

  var signature = detectChartSignature(d);
  var horizonHtml = genHorizonTimeline(d);

  if (isSimple) {
    return '<div class="ck-hero-line">"Your chart combines your ' + ascSign + ' rising outer personality with your ' + moonSign + ' emotional core."</div>' +
      '<div class="ck-card"><div class="ck-eyebrow">Outer Self &mdash; Ascendant (Lagna)</div><h3 class="ck-card-title">' + ascSign + ' ' + ascDegStr + ' &middot; ' + ascNak + ' (Pada ' + ascPada + ')</h3><div class="ck-card-body">' +
      '<p><strong>What it means:</strong> Your core outward behavior is guided by <strong>' + ascSign + '</strong> energy (' + (SIGN_DESC[ascSign] || 'a unique presence') + '). You naturally approach new opportunities and people with this focus.</p>' +
      '<p><strong>Why it matters:</strong> This shapes how others perceive your initial presence, confidence, and personal boundaries.</p>' +
      '<div class="ck-remedy" style="margin-top:16px;"><div class="ck-remedy-title">Key Takeaways</div><ul>' +
      '<li>' + ascBullets[0] + '</li>' +
      '<li>' + ascBullets[1] + '</li>' +
      '</ul></div>' +
      '</div></div>' +

      '<div class="ck-card ck-card-rose"><div class="ck-eyebrow">Inner Self &mdash; Moon (Chandra)</div><h3 class="ck-card-title">Moon in ' + moonSign + ' ' + moonDegStr + ' &middot; ' + moonNak + ' (Pada ' + moonPada + ')</h3><div class="ck-card-body">' +
      '<p><strong>What it means:</strong> Deep down, your emotional instincts, inner processing, and sub-conscious needs are guided by <strong>' + moonSign + '</strong>.</p>' +
      '<p><strong>Dignity Status:</strong> <span class="ck-badge" style="display:inline-block; padding:3px 10px; font-size:11px;">' + moonDignity.label + '</span></p>' +
      '<div class="ck-remedy" style="margin-top:16px;"><div class="ck-remedy-title">Key Takeaways</div><ul>' +
      '<li>' + moonBullets[0] + '</li>' +
      '<li>' + moonBullets[1] + '</li>' +
      '</ul></div>' +
      '</div></div>' +

      '<div class="ck-card ck-card-sage"><div class="ck-eyebrow">Chart Signature &mdash; Distinctive Alignment</div><h3 class="ck-card-title">What Makes Your Chart Unique</h3><div class="ck-card-body">' +
      '<p>' + signature.summary + '</p>' +
      '</div></div>' +

      horizonHtml;
  }

  // DETAILED MODE
  var sigList = [];
  if (signature.stelliums.length > 0) {
    signature.stelliums.forEach(function(s) {
      sigList.push('<strong>Stellium in House ' + s.house + ':</strong> ' + s.planets.join(', '));
    });
  }
  if (signature.exalted.length > 0) {
    signature.exalted.forEach(function(e) {
      sigList.push('<strong>Exalted Planet:</strong> ' + e.planet + ' in ' + e.sign + ' (House ' + e.house + ')');
    });
  }
  if (signature.ownSigns.length > 0) {
    signature.ownSigns.forEach(function(o) {
      sigList.push('<strong>Swagriha (Own Sign):</strong> ' + o.planet + ' in ' + o.sign + ' (House ' + o.house + ')');
    });
  }
  if (signature.debilitated.length > 0) {
    signature.debilitated.forEach(function(d) {
      sigList.push('<strong>Debilitated Planet:</strong> ' + d.planet + ' in ' + d.sign + ' (House ' + d.house + ')');
    });
  }

  var sigItemsHtml = sigList.length ? '<ul style="margin-top:10px; line-height:1.7;"><li>' + sigList.join('</li><li>') + '</li></ul>' : '<p style="margin-top:8px;">Balanced planetary distribution across houses.</p>';

  return '<div class="ck-hero-line">"' + ascSign + ' ' + ascDegStr + ' rising, ' + moonSign + ' Moon — chart written in precision and purpose."</div>' +
    '<div class="ck-card"><div class="ck-eyebrow">Outer Self &mdash; Lagna (' + ascSign + ' ' + ascDegStr + ')</div><h3 class="ck-card-title">' + ascSign + ' Ascendant &middot; ' + ascNak + ' Nakshatra (Pada ' + ascPada + ')</h3><div class="ck-card-body">' +
    '<p>Your rising sign is <strong>' + ascSign + ' (' + ascDegStr + ')</strong>, ruled by <strong>' + d.lagnaRuler + '</strong>. Nakshatra: <strong>' + ascNak + '</strong> (Ruled by ' + ascNakLord + ' &middot; Deity: <em>' + ascNakDeity + '</em>).</p>' +
    '<p><strong>Behavioral Tendency:</strong> ' + (SIGN_DESC[ascSign] || 'A complex celestial presence') + '. ' + (NAK_DESC[ascNak] || '') + '.</p>' +
    '<p><strong>Social Perception:</strong> People meet you through the lens of ' + ascSign + ' before seeing your deeper waters.</p>' +
    '<div class="ck-remedy" style="margin-top:16px;"><div class="ck-remedy-title">Nakshatra &amp; Pada Takeaways</div><ul>' +
    '<li>' + ascBullets[0] + '</li>' +
    '<li>' + ascBullets[1] + '</li>' +
    '</ul></div>' +
    '</div></div>' +

    '<div class="ck-card ck-card-rose"><div class="ck-eyebrow">Inner Self &mdash; Chandra (' + moonSign + ' ' + moonDegStr + ')</div><h3 class="ck-card-title">Moon in ' + moonSign + ' &middot; ' + moonNak + ' Nakshatra (Pada ' + moonPada + ')</h3><div class="ck-card-body">' +
    '<p>Your Moon sits at <strong>' + moonDegStr + ' ' + moonSign + '</strong> in <strong>' + moonNak + '</strong> nakshatra (Ruled by ' + moonNakLord + ' &middot; Deity: <em>' + moonNakDeity + '</em>).</p>' +
    '<p><strong>Dignity Flag:</strong> <span class="ck-badge" style="display:inline-block; padding:3px 12px; font-size:11.5px; color:var(--gold-bright);">' + moonDignity.label + '</span></p>' +
    '<p><strong>Emotional Processing:</strong> ' + (moonSign === ascSign ? 'Moon shares your Ascendant sign, creating a unified physical and emotional identity.' : 'Colours your instincts, memory, and emotional responses with the qualities of ' + moonSign + '.') + '</p>' +
    '<div class="ck-remedy" style="margin-top:16px;"><div class="ck-remedy-title">Nakshatra &amp; Dignity Takeaways</div><ul>' +
    '<li>' + moonBullets[0] + '</li>' +
    '<li>' + moonBullets[1] + '</li>' +
    '</ul></div>' +
    '</div></div>' +

    '<div class="ck-card ck-card-sage"><div class="ck-eyebrow">Chart Signature &mdash; Primary Lever</div><h3 class="ck-card-title">Unique Planetary Configurations</h3><div class="ck-card-body">' +
    '<p>' + signature.summary + '</p>' +
    sigItemsHtml +
    '</div></div>' +

    horizonHtml;
}

function genCareer(d, mode){
  var isSimple = (mode === 'simplified');
  var h10=d.hSigns[10]; var h10Lord=RULERS[ZODIAC.indexOf(h10)];
  var cd=currentDasha(d.dashas); var cp=cd?cd.planet:'Su';
  var h10Ps=PORDER.filter(function(p){return d.pHouse[p]===10&&p!=='As';});
  var planetIn10Note=h10Ps.length>0?h10Ps.map(function(p){return PNAME[p]||p;}).join(', ')+' placed directly in your 10th house of career':'no planets placed directly in the 10th house — your career direction is governed cleanly by your 10th lord, '+h10Lord;

  if(isSimple){
    return '<div class="ck-hero-line">"Your career thrives when you align your work with your natural 10th house strengths."</div>'+
      '<div class="ck-stat-row"><div class="ck-stat"><div class="ck-stat-label">Career Sign</div><div class="ck-stat-value">'+h10+'</div></div><div class="ck-stat"><div class="ck-stat-label">Career Ruler</div><div class="ck-stat-value">'+h10Lord+'</div></div><div class="ck-stat"><div class="ck-stat-label">Active Period</div><div class="ck-stat-value">'+(PNAME[cp]||cp)+'</div></div></div>'+
      '<div class="ck-card"><div class="ck-eyebrow">Career Purpose</div><h3 class="ck-card-title">Your Work Alignment</h3><div class="ck-card-body">'+
      '<p><strong>What it means:</strong> Your 10th house of career sits in <strong>'+h10+'</strong>. You are naturally suited for '+(CAREER_Q[h10]||'building a meaningful professional life')+'.</p>'+
      '<p><strong>Why it matters:</strong> Focusing on roles that allow you to express this energy leads to long-term satisfaction and success.</p>'+
      '<div class="ck-remedy" style="margin-top:16px;"><div class="ck-remedy-title">Key Takeaways</div><ul><li>Seek work environments where your '+h10+' skills are valued.</li><li>During your current '+PNAME[cp]+' period, '+(DASHA_CAREER[cp]||'focus on consistent, purposeful effort')+'.</li></ul></div>'+
      '</div></div>';
  }

  return '<div class="ck-hero-line">"The 10th house in '+h10+' — a career path ruled by '+h10Lord+'."</div>'+
    '<div class="ck-stat-row"><div class="ck-stat"><div class="ck-stat-label">10th House Sign</div><div class="ck-stat-value">'+h10+'</div></div><div class="ck-stat"><div class="ck-stat-label">House Ruler</div><div class="ck-stat-value">'+h10Lord+'</div></div><div class="ck-stat"><div class="ck-stat-label">Current Dasha</div><div class="ck-stat-value">'+(PNAME[cp]||cp)+'</div></div></div>'+
    '<div class="ck-card"><div class="ck-eyebrow">Career Signature</div><h3 class="ck-card-title">10th House in '+h10+'</h3><div class="ck-card-body"><p>Your 10th house of career, public standing, and karma is governed by <strong>'+h10+'</strong>, making <strong>'+h10Lord+'</strong> your career lord. Fields that resonate: '+(CAREER_Q[h10]||'structure and leadership')+'.</p><p>Specifically, you have '+planetIn10Note+'.</p></div></div>'+
    '<div class="ck-card ck-card-sage"><div class="ck-eyebrow">Active Period Alignment</div><h3 class="ck-card-title">Current Dasha: '+(PNAME[cp]||cp)+' Period</h3><div class="ck-card-body"><p>'+(DASHA_CAREER[cp]||'A period of steady professional evolution.')+'</p><div class="ck-remedy"><div class="ck-remedy-title">Suggested Upaya (Remedy)</div><ul><li>To strengthen your active planet ('+(PNAME[cp]||cp)+'): '+(PLANET_UPAYA[cp]||'practice clarity and discipline')+'</li></ul></div></div></div>';
}

function genLove(d, mode){
  var isSimple = (mode === 'simplified');
  var h7=d.hSigns[7]; var h7Lord=RULERS[ZODIAC.indexOf(h7)];
  var vHouse=d.pHouse['Ve'];
  var h7Ps=PORDER.filter(function(p){return d.pHouse[p]===7&&p!=='As';});
  var pIn7Note=h7Ps.length>0?'Planets in your 7th house: <strong>'+h7Ps.map(function(p){return PNAME[p]||p;}).join(', ')+'</strong> — these planets strongly influence your marriage and partnership dynamics.':'No planets sit in your 7th house — your partnerships are guided smoothly by your 7th lord, '+h7Lord+'.';

  if(isSimple){
    return '<div class="ck-hero-line">"Your relationship style is rooted in deep trust, communication, and mutual growth."</div>'+
      '<div class="ck-stat-row"><div class="ck-stat"><div class="ck-stat-label">Partnership Sign</div><div class="ck-stat-value">'+h7+'</div></div><div class="ck-stat"><div class="ck-stat-label">Partnership Ruler</div><div class="ck-stat-value">'+h7Lord+'</div></div><div class="ck-stat"><div class="ck-stat-label">Venus House</div><div class="ck-stat-value">House '+vHouse+'</div></div></div>'+
      '<div class="ck-card"><div class="ck-eyebrow">Relationships</div><h3 class="ck-card-title">Your Partnership Dynamics</h3><div class="ck-card-body">'+
      '<p><strong>What it means:</strong> Your 7th house of marriage and partnership is in <strong>'+h7+'</strong>. In relationships, you value '+(LOVE_Q[h7]||'harmony and mutual respect')+'.</p>'+
      '<p><strong>Why it matters:</strong> Understanding this pattern helps you choose partners who bring out your best self.</p>'+
      '<div class="ck-remedy" style="margin-top:16px;"><div class="ck-remedy-title">Key Takeaways</div><ul><li>Look for partners who appreciate '+(LOVE_Q[h7]||'genuine warmth')+'.</li><li>'+(VENUS_NOTE[vHouse]||'Venus guides your romantic expression.')+'</li></ul></div>'+
      '</div></div>';
  }

  return '<div class="ck-hero-line">"7th house in '+h7+' — partnerships ruled by '+h7Lord+'."</div>'+
    '<div class="ck-stat-row"><div class="ck-stat"><div class="ck-stat-label">7th House Sign</div><div class="ck-stat-value">'+h7+'</div></div><div class="ck-stat"><div class="ck-stat-label">7th Lord</div><div class="ck-stat-value">'+h7Lord+'</div></div><div class="ck-stat"><div class="ck-stat-label">Venus Placement</div><div class="ck-stat-value">House '+vHouse+'</div></div></div>'+
    '<div class="ck-card"><div class="ck-eyebrow">Partnership Blueprint</div><h3 class="ck-card-title">7th House in '+h7+'</h3><div class="ck-card-body"><p>Your 7th house of marriage and long-term partnership is in <strong>'+h7+'</strong>. You seek partners who offer '+(LOVE_Q[h7]||'trust and stability')+'.</p><p>'+pIn7Note+'</p></div></div>'+
    '<div class="ck-card ck-card-rose"><div class="ck-eyebrow">Venus Analysis</div><h3 class="ck-card-title">Venus in House '+vHouse+'</h3><div class="ck-card-body"><p>'+(VENUS_NOTE[vHouse]||'Venus here shapes how you give and receive love.')+'</p><div class="ck-remedy"><div class="ck-remedy-title">Upaya for Harmony</div><ul><li>Honour Fridays with small acts of beauty, appreciation, or generosity to strengthen Venus.</li></ul></div></div></div>';
}

function genHealth(d, mode){
  var isSimple = (mode === 'simplified');
  var h6=d.hSigns[6]; var h6Lord=RULERS[ZODIAC.indexOf(h6)];
  var bf=BODY_FOCUS[d.lagnaSign]||'Whole System';
  var STRESS_NOTE={
    'Aries':'Headaches, heat, or tension in the head and eyes.',
    'Taurus':'Throat, jaw, and neck tension when unexpressed feelings build up.',
    'Gemini':'Nervous exhaustion, anxiety, or shallow breathing.',
    'Cancer':'Digestive sensitivity or stomach tightness under emotional stress.',
    'Leo':'Upper back tension, heart palpitations, or posture fatigue.',
    'Virgo':'Stomach bloating, digestive slowdowns, and overthinking.',
    'Libra':'Lower back aches and energy dips from balance disruption.',
    'Scorpio':'Pelvic or reproductive organ sensitivity under intense stress.',
    'Sagittarius':'Hip tightness or sciatic discomfort after mental strain.',
    'Capricorn':'Knee stiffness, joint aches, or bone fatigue.',
    'Aquarius':'Poor circulation, cold feet, or ankle tension.',
    'Pisces':'Foot soreness, sluggish immunity, or feeling easily drained.'
  };

  if(isSimple){
    return '<div class="ck-hero-line">"Your vitality flourishes when you balance steady daily habits with emotional rest."</div>'+
      '<div class="ck-stat-row"><div class="ck-stat"><div class="ck-stat-label">Health Sign</div><div class="ck-stat-value">'+h6+'</div></div><div class="ck-stat"><div class="ck-stat-label">Health Ruler</div><div class="ck-stat-value">'+h6Lord+'</div></div><div class="ck-stat"><div class="ck-stat-label">Body Sensitivity</div><div class="ck-stat-value">'+bf+'</div></div></div>'+
      '<div class="ck-card"><div class="ck-eyebrow">Physical Wellbeing</div><h3 class="ck-card-title">Your Body Constitution</h3><div class="ck-card-body">'+
      '<p><strong>What it means:</strong> Your physical health responds closely to emotional stress. Your primary sensitive area is <strong>'+bf+'</strong>.</p>'+
      '<p><strong>Why it matters:</strong> Physical symptoms like '+(STRESS_NOTE[d.lagnaSign]||'body tension')+' are early signals from your nervous system to rest.</p>'+
      '<div class="ck-remedy" style="margin-top:16px;"><div class="ck-remedy-title">Key Takeaways</div><ul><li>Maintain a consistent daily sleep schedule to protect your baseline energy.</li><li>Hydration, fresh air, and light daily walks act as natural health regulators.</li></ul></div>'+
      '</div></div>'+
      '<div class="ck-card ck-card-rose"><div class="ck-eyebrow">Stress Management</div><h3 class="ck-card-title">How to Reset Your Energy</h3><div class="ck-card-body">'+
      '<p><strong>What it means:</strong> When feeling overwhelmed, quick physical movement or grounding rituals help clear mental clutter.</p>'+
      '<p><strong>Why it matters:</strong> Preventing stress buildup is much easier than recovering from burn-out.</p>'+
      '</div></div>';
  }

  var STRENGTH_NOTE={
    'Aries':'Physical movement is your fastest reset — burn the energy before it becomes inflammation.',
    'Taurus':'Sensory pleasure — good food, warm baths, time in nature — is genuinely medicinal.',
    'Gemini':'Mental variety and movement together are your best medicine.',
    'Cancer':'Water environments and ocean air soothe your nervous system deeply.',
    'Leo':'Sunlight and posture alignment maintain your core vital force.',
    'Virgo':'Routine digestive cleanses and herbal teas restore your energy fast.',
    'Libra':'Symmetrical exercise (swimming, yoga) keeps your energy flowing.',
    'Scorpio':'Deep breathwork and sauna/sweat sessions clear accumulated stress.',
    'Sagittarius':'Outdoor adventure and stretching keep your hips and spirit fluid.',
    'Capricorn':'Strength training and bone-density focus build long-term stamina.',
    'Aquarius':'Leg circulation exercises and dry brushing boost your immune response.',
    'Pisces':'Foot reflexology and sound baths recharge your aura.'
  };

  return '<div class="ck-hero-line">"6th house in '+h6+' — vitality managed through '+h6Lord+'."</div>'+
    '<div class="ck-stat-row"><div class="ck-stat"><div class="ck-stat-label">6th House Sign</div><div class="ck-stat-value">'+h6+'</div></div><div class="ck-stat"><div class="ck-stat-label">Health Ruler</div><div class="ck-stat-value">'+h6Lord+'</div></div><div class="ck-stat"><div class="ck-stat-label">Focus Area</div><div class="ck-stat-value">'+bf+'</div></div></div>'+
    '<div class="ck-card"><div class="ck-eyebrow">Constitutional Tendencies</div><h3 class="ck-card-title">6th House in '+h6+'</h3><div class="ck-card-body"><p>Your 6th house of health, daily routine, and physical stress sits in <strong>'+h6+'</strong>, ruled by <strong>'+h6Lord+'</strong>. Your physical system is particularly attuned to <strong>'+bf+'</strong>.</p><p>Under stress: '+(STRESS_NOTE[d.lagnaSign]||'watch for fatigue and nervous tension.')+'</p></div></div>'+
    '<div class="ck-card ck-card-sage"><div class="ck-eyebrow">Vitality Reset</div><h3 class="ck-card-title">Restorative Practices</h3><div class="ck-card-body"><p>'+(STRENGTH_NOTE[d.lagnaSign]||'Regular rest and balanced nutrition maintain your core energy.')+'</p><div class="ck-remedy"><div class="ck-remedy-title">Daily Health Upaya</div><ul><li>Hydrate well upon waking to flush toxins before morning tea or coffee.</li><li>Short daily walks under sunlight strengthen your solar plexus and immunity.</li></ul></div></div></div>';
}

function genWealth(d, mode){
  var isSimple = (mode === 'simplified');
  var h2=d.hSigns[2]; var h2Lord=RULERS[ZODIAC.indexOf(h2)];
  var h11=d.hSigns[11]; var h11Lord=RULERS[ZODIAC.indexOf(h11)];
  var jHouse=d.pHouse['Ju'];
  var h2Ps=PORDER.filter(function(p){return d.pHouse[p]===2&&p!=='As';});
  var h11Ps=PORDER.filter(function(p){return d.pHouse[p]===11&&p!=='As';});

  if(isSimple){
    return '<div class="ck-hero-line">"Financial growth for you comes through patience, wise investments, and discipline."</div>'+
      '<div class="ck-stat-row"><div class="ck-stat"><div class="ck-stat-label">Savings Sign</div><div class="ck-stat-value">'+h2+'</div></div><div class="ck-stat"><div class="ck-stat-label">Income Sign</div><div class="ck-stat-value">'+h11+'</div></div><div class="ck-stat"><div class="ck-stat-label">Jupiter House</div><div class="ck-stat-value">House '+jHouse+'</div></div></div>'+
      '<div class="ck-card"><div class="ck-eyebrow">Financial Blueprint</div><h3 class="ck-card-title">Your Wealth Potential</h3><div class="ck-card-body">'+
      '<p><strong>What it means:</strong> Your 2nd house of assets is in <strong>'+h2+'</strong>, and your 11th house of income is in <strong>'+h11+'</strong>. You build financial security steadily over time.</p>'+
      '<p><strong>Why it matters:</strong> Understanding how you generate and save money helps you make confident financial choices.</p>'+
      '<div class="ck-remedy" style="margin-top:16px;"><div class="ck-remedy-title">Key Takeaways</div><ul><li>' + (WEALTH_H11[h11] || 'Focus on long-term value.') + '</li><li>Automate your savings to build an unshakeable financial cushion.</li></ul></div>'+
      '</div></div>';
  }

  var pIn2Note=h2Ps.length>0?'Planets in 2nd house (Accumulated Wealth): <strong>'+h2Ps.map(function(p){return PNAME[p]||p;}).join(', ')+'</strong>.':'No planets in 2nd house — assets build through steady, direct application of '+h2Lord+' qualities.';
  var pIn11Note=h11Ps.length>0?'Planets in 11th house (Gains & Network): <strong>'+h11Ps.map(function(p){return PNAME[p]||p;}).join(', ')+'</strong>.':'No planets in 11th house — gains flow cleanly through '+h11Lord+' channels.';
  var w2Text=getW2Note(pIn2Note);

  return '<div class="ck-hero-line">"2nd house in '+h2+' (ruled by '+h2Lord+'), 11th in '+h11+' (ruled by '+h11Lord+')."</div>'+
    '<div class="ck-stat-row"><div class="ck-stat"><div class="ck-stat-label">2nd House (Assets)</div><div class="ck-stat-value">'+h2+'</div></div><div class="ck-stat"><div class="ck-stat-label">11th House (Gains)</div><div class="ck-stat-value">'+h11+'</div></div><div class="ck-stat"><div class="ck-stat-label">Jupiter Placement</div><div class="ck-stat-value">House '+jHouse+'</div></div></div>'+
    '<div class="ck-card"><div class="ck-eyebrow">Wealth Accumulation (2nd House)</div><h3 class="ck-card-title">Assets &amp; Values — '+h2+'</h3><div class="ck-card-body"><p>Your 2nd house governs family assets, savings, and liquid wealth. Ruled by <strong>'+h2Lord+'</strong> in <strong>'+h2+'</strong>. '+w2Text+'.</p><p>'+pIn2Note+'</p></div></div>'+
    '<div class="ck-card ck-card-rose"><div class="ck-eyebrow">Income &amp; Gains (11th House)</div><h3 class="ck-card-title">Revenue Channels — '+h11+'</h3><div class="ck-card-body"><p>Your 11th house governs cash flow, network gains, and desire-fulfillment. In <strong>'+h11+'</strong> (ruled by '+h11Lord+'): '+(WEALTH_H11[h11]||'gains compound through strategic effort')+'.</p><p>'+pIn11Note+'</p></div></div>'+
    '<div class="ck-remedy"><div class="ck-remedy-title">Wealth Upayas</div><ul><li>Automate saving on payday before the money feels available — this routes around impulse patterns.</li><li>Before any investment that feels urgent or exciting, sit with it for 3 full days — your gains house rewards patience, not speed.</li><li>Thursdays: a small act of generosity or study strengthens Jupiter, which governs expansion.</li></ul></div>';
}

function getW2Note(ps){
  if(ps.indexOf('Jupiter')>=0&&ps.indexOf('Saturn')>=0)return 'growth and discipline stand guard — a genuinely strong signature for compounding wealth';
  if(ps.indexOf('Jupiter')>=0)return 'Jupiter here is a classic wealth-house blessing — expansion and optimism colour your financial story';
  if(ps.indexOf('Saturn')>=0)return 'Saturn demands patience but rewards consistency with lasting financial structure';
  if(ps.indexOf('Venus')>=0)return 'Venus here — income may come through beauty, luxury, or relationship';
  return 'these planets colour how wealth accumulates and what it means to you';
}

window.NAK_DESC = NAK_DESC;
window.SIGN_DESC = SIGN_DESC;
window.CAREER_Q = CAREER_Q;
window.LOVE_Q = LOVE_Q;
window.BODY_FOCUS = BODY_FOCUS;
window.VENUS_NOTE = VENUS_NOTE;
window.DASHA_CAREER = DASHA_CAREER;
window.PLANET_UPAYA = PLANET_UPAYA;
window.WEALTH_H11 = WEALTH_H11;
window.getAscTakeaways = getAscTakeaways;
window.getMoonTakeaways = getMoonTakeaways;
window.genHorizonTimeline = genHorizonTimeline;
window.genOverview = genOverview;
window.genCareer = genCareer;
window.genLove = genLove;
window.genHealth = genHealth;
window.genWealth = genWealth;
window.getW2Note = getW2Note;
