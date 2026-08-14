/* COSMIC KUNDALI — Pure Vanilla JS Astrology Engine */

/* CITIES */
var CITIES={
  'kolkata':{lat:22.5726,lng:88.3639},'mumbai':{lat:19.076,lng:72.8777},
  'delhi':{lat:28.7041,lng:77.1025},'new delhi':{lat:28.6139,lng:77.209},
  'bangalore':{lat:12.9716,lng:77.5946},'bengaluru':{lat:12.9716,lng:77.5946},
  'chennai':{lat:13.0827,lng:80.2707},'hyderabad':{lat:17.385,lng:78.4867},
  'pune':{lat:18.5204,lng:73.8567},'ahmedabad':{lat:23.0225,lng:72.5714},
  'jaipur':{lat:26.9124,lng:75.7873},'lucknow':{lat:26.8467,lng:80.9462},
  'varanasi':{lat:25.3176,lng:82.9739},'patna':{lat:25.5941,lng:85.1376},
  'bhopal':{lat:23.2599,lng:77.4126},'nagpur':{lat:21.1458,lng:79.0882},
  'surat':{lat:21.1702,lng:72.8311},'indore':{lat:22.7196,lng:75.8577},
  'london':{lat:51.5074,lng:-0.1278},'new york':{lat:40.7128,lng:-74.006},
  'los angeles':{lat:34.0522,lng:-118.2437},'sydney':{lat:-33.8688,lng:151.2093},
  'dubai':{lat:25.2048,lng:55.2708},'singapore':{lat:1.3521,lng:103.8198},
  'paris':{lat:48.8566,lng:2.3522},'toronto':{lat:43.6532,lng:-79.3832},
  'chicago':{lat:41.8781,lng:-87.6298},'houston':{lat:29.7604,lng:-95.3698},
  'berlin':{lat:52.52,lng:13.405},'tokyo':{lat:35.6762,lng:139.6503},
};

function lookupCity(name){
  var key=name.toLowerCase().replace(/,.*$/,'').trim();
  for(var k in CITIES){if(key.indexOf(k)>=0||k.indexOf(key)>=0)return CITIES[k];}
  return {lat:23.0,lng:81.0};
}

/* ASTROLOGY DATA */
var ZODIAC=['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
var ZODIAC_SYM=['&#9800;','&#9801;','&#9802;','&#9803;','&#9804;','&#9805;','&#9806;','&#9807;','&#9808;','&#9809;','&#9810;','&#9811;'];
var RULERS=['Mars','Venus','Mercury','Moon','Sun','Mercury','Venus','Mars','Jupiter','Saturn','Saturn','Jupiter'];
var NAKSHATRA=['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Mula','Purva Ashadha','Uttara Ashadha','Shravana','Dhanistha','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati'];
var NAK_LORDS=['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me','Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me','Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];
var DASHA_YRS={Ke:7,Ve:20,Su:6,Mo:10,Ma:7,Ra:18,Ju:16,Sa:19,Me:17};
var DASHA_ORDER=['Ke','Ve','Su','Mo','Ma','Ra','Ju','Sa','Me'];

/* MATH */
function norm(v){return((v%360)+360)%360;}
function sind(d){return Math.sin(d*Math.PI/180);}
function cosd(d){return Math.cos(d*Math.PI/180);}
function tand(d){return Math.tan(d*Math.PI/180);}

/* JULIAN DATE */
function toJD(y,mo,d,h){
  if(mo<=2){y--;mo+=12;}
  var A=Math.floor(y/100),B=2-A+Math.floor(A/4);
  return Math.floor(365.25*(y+4716))+Math.floor(30.6001*(mo+1))+d+h/24+B-1524.5;
}

/* PLANET LONGITUDES (tropical, mean elements) */
function planetLon(jd){
  var T=(jd-2451545)/36525;
  var L0=280.46646+36000.76983*T;
  var M=(357.52911+35999.05029*T-0.0001537*T*T)*Math.PI/180;
  var C=(1.914602-0.004817*T-0.000014*T*T)*Math.sin(M)+(0.019993-0.000101*T)*Math.sin(2*M)+0.000289*Math.sin(3*M);
  var sunL=norm(L0+C);

  var Lm=norm(218.3165+481267.8813*T);
  var Dm=norm(297.8502+445267.1115*T);
  var Mm=norm(357.5291+35999.0503*T);
  var Mm2=norm(134.9634+477198.8676*T);
  var F=norm(93.2721+483202.0175*T);
  var moonL=norm(Lm+6.2886*sind(Mm2)+1.274*sind(2*Dm-Mm2)+0.6583*sind(2*Dm)+0.2136*sind(2*Mm2)-0.1851*sind(Mm)-0.1143*sind(2*F)+0.0588*sind(2*Dm-2*Mm2)+0.0572*sind(2*Dm-Mm-Mm2)+0.0533*sind(2*Dm+Mm2));

  var marsL=norm(355.4633+19140.2993*T);
  var mercL=norm(252.2509+149474.0722*T);
  var venL=norm(181.9798+58517.8157*T);
  var jupL=norm(34.3515+3034.9057*T);
  var satL=norm(50.0774+1222.1138*T);
  var rahuL=norm(125.0445-1934.1363*T+0.002*T*T);
  return{Su:sunL,Mo:moonL,Ma:marsL,Me:mercL,Ve:venL,Ju:jupL,Sa:satL,Ra:rahuL,Ke:norm(rahuL+180)};
}

/* LAHIRI AYANAMSA */
function ayanamsa(jd){var T=(jd-2451545)/36525;return 23.85+0.01360*T;}

/* ASCENDANT */
function calcAsc(jd,lat,lng){
  var T=(jd-2451545)/36525;
  var GMST=norm(280.46061837+360.98564736629*(jd-2451545)+T*T*0.000387933);
  var LMST=norm(GMST+lng);
  var eps=(23.439291111-0.013004167*T);
  var LMST_r=LMST*Math.PI/180;
  var eps_r=eps*Math.PI/180;
  var lat_r=lat*Math.PI/180;
  var y=cosd(LMST);
  var x=-(Math.sin(eps_r)*Math.tan(lat_r)+Math.cos(eps_r)*sind(LMST));
  return norm(Math.atan2(y,x)*180/Math.PI);
}

function signOf(lon){return Math.floor(lon/30);}
function degInSign(lon){return Math.floor(lon%30);}
function nakOf(lon){return Math.floor(lon/(360/27));}

/* DASHA */
function calcDasha(moonLon,dob){
  var nakIdx=nakOf(moonLon);
  var lord=NAK_LORDS[nakIdx];
  var frac=(moonLon%(360/27))/(360/27);
  var lordIdx=DASHA_ORDER.indexOf(lord);
  var dashas=[];
  var dt=new Date(dob.getTime());
  for(var i=0;i<9;i++){
    var idx=(lordIdx+i)%9;
    var p=DASHA_ORDER[idx];
    var yrs=(i===0)?DASHA_YRS[p]*(1-frac):DASHA_YRS[p];
    var start=new Date(dt.getTime());
    var end=new Date(dt.getTime());
    end.setDate(end.getDate()+Math.round(yrs*365.25));
    dashas.push({planet:p,start:start,end:end,years:yrs});
    dt=new Date(end.getTime());
  }
  return dashas;
}

/* HOUSES (whole-sign from Lagna) */
function buildHouses(ascLon,planets){
  var lagnaSign=signOf(ascLon);
  var hSigns={};
  for(var h=1;h<=12;h++) hSigns[h]=ZODIAC[(lagnaSign+h-1)%12];
  var signToHouse={};
  for(var h=1;h<=12;h++) signToHouse[(lagnaSign+h-1)%12]=h;
  var pHouse={As:1};
  for(var p in planets) pHouse[p]=signToHouse[signOf(planets[p])];
  return{hSigns:hSigns,pHouse:pHouse};
}

/* SVG CHART */
var HPOLY={
  1:'200,0 300,100 200,200 100,100',2:'0,0 200,0 100,100',3:'0,0 100,100 0,200',
  4:'0,200 100,100 200,200 100,300',5:'0,200 100,300 0,400',6:'0,400 100,300 200,400',
  7:'200,400 100,300 200,200 300,300',8:'200,400 300,300 400,400',9:'400,400 300,300 400,200',
  10:'400,200 300,300 200,200 300,100',11:'400,200 300,100 400,0',12:'400,0 300,100 200,0',
};
var HLABEL={1:[200,30],2:[95,22],3:[22,95],4:[100,205],5:[22,305],6:[100,378],7:[200,370],8:[305,378],9:[378,305],10:[300,205],11:[378,95],12:[305,22]};
var HCONTENT={1:[200,90],2:[100,40],3:[40,100],4:[100,200],5:[40,300],6:[100,355],7:[200,300],8:[300,355],9:[355,300],10:[300,200],11:[355,100],12:[300,40]};
var PORDER=['As','Su','Mo','Ma','Me','Ve','Ju','Sa','Ra','Ke'];

function renderChart(hSigns,pHouse,planetsLon){
  var svg=document.getElementById('kundali-svg');
  var NS='http://www.w3.org/2000/svg';
  var kids=Array.from(svg.childNodes);
  kids.forEach(function(k){if(k.tagName!=='defs')svg.removeChild(k);});

  function el(tag,attrs,txt){
    var e=document.createElementNS(NS,tag);
    for(var k in attrs)e.setAttribute(k,attrs[k]);
    if(txt!==undefined)e.textContent=txt;
    return e;
  }

  svg.appendChild(el('rect',{x:1,y:1,width:398,height:398,fill:'#150f2b',stroke:'url(#ckGold)','stroke-width':2}));

  var hPlanets={};
  PORDER.forEach(function(p){
    var h=pHouse[p];
    if(h){if(!hPlanets[h])hPlanets[h]=[];hPlanets[h].push(p);}
  });

  for(var h=1;h<=12;h++){
    svg.appendChild(el('polygon',{points:HPOLY[h],fill:hPlanets[h]?'rgba(201,162,75,0.07)':'transparent',stroke:'rgba(201,162,75,0.55)','stroke-width':1}));
  }

  for(var h=1;h<=12;h++){
    var pos=HLABEL[h]; var lx=pos[0],ly=pos[1];
    var dy=(h===1||h===7)?14:(h===4||h===10)?0:12;
    svg.appendChild(el('text',{x:lx,y:ly,'text-anchor':'middle',class:'ck-house-num'},String(h)));
    svg.appendChild(el('text',{x:lx,y:ly+dy,'text-anchor':'middle',class:'ck-house-sign'},hSigns[h]));
  }

  for(var h=1;h<=12;h++){
    if(!hPlanets[h])continue;
    var ps=hPlanets[h]; var cp=HCONTENT[h]; var cx=cp[0],cy=cp[1];
    var perRow=ps.length>3?3:ps.length;
    ps.forEach(function(p,i){
      var row=Math.floor(i/perRow),col=i%perRow;
      var rowCount=Math.ceil(ps.length/perRow);
      var px=cx+(col-(perRow-1)/2)*34;
      var py=cy+(row-(rowCount-1)/2)*22;
      var isAsc=(p==='As');
      var g=el('g',isAsc?{filter:'url(#ckGlow)'}:{});
      var lon=planetsLon[p]!==undefined?planetsLon[p]:0;
      var deg=Math.floor(lon%30)+'°';
      g.appendChild(el('text',{x:px,y:py,'text-anchor':'middle',class:isAsc?'ck-planet ck-planet-asc':'ck-planet'},p));
      g.appendChild(el('text',{x:px,y:py+11,'text-anchor':'middle',class:'ck-planet-deg'},deg));
      svg.appendChild(g);
    });
  }
}

/* HELPERS */
var PNAME={As:'Ascendant',Su:'Sun',Mo:'Moon',Ma:'Mars',Me:'Mercury',Ve:'Venus',Ju:'Jupiter',Sa:'Saturn',Ra:'Rahu',Ke:'Ketu'};
var HTHEME=['Self & Personality','Wealth & Family','Courage & Communication','Home & Mother','Creativity & Children','Health & Service','Partnership & Marriage','Transformation','Dharma & Fortune','Career & Status','Gains & Network','Liberation'];

function ord(n){return['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th'][(n||1)-1];}
function fmtDate(d){if(!d)return '?';return d.toLocaleDateString('en-IN',{year:'numeric',month:'short'});}
function abbr(name){var m={Sun:'Su',Moon:'Mo',Mars:'Ma',Mercury:'Me',Venus:'Ve',Jupiter:'Ju',Saturn:'Sa',Rahu:'Ra',Ketu:'Ke'};return m[name]||name.substring(0,2);}
function currentDasha(dashas){var now=new Date();return dashas.find(function(d){return d.start<=now&&d.end>now;});}
function nextDasha(dashas){var now=new Date();var idx=dashas.findIndex(function(d){return d.start<=now&&d.end>now;});return(idx>=0&&idx<dashas.length-1)?dashas[idx+1]:null;}
function calcAge(dob){var now=new Date();var age=now.getFullYear()-dob.getFullYear();var m=now.getMonth()-dob.getMonth();if(m<0||(m===0&&now.getDate()<dob.getDate()))age--;return age;}
function dayName(d){return['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];}

var NAK_DEITIES = [
  'Ashvins (Golden Healers)', 'Yama (God of Dharma & Restraint)', 'Agni (God of Sacred Fire)',
  'Brahma (The Creator)', 'Soma (The Moon God of Nectar)', 'Rudra (The Storm Lord)',
  'Aditi (Mother of Abundance)', 'Brihaspati (Teacher of Gods)', 'Nagas (Serpent Deities)',
  'Pitris (Ancestral Spirits)', 'Bhaga (God of Fortune)', 'Aryaman (God of Patronage & Union)',
  'Savitar (The Solar Craftsman)', 'Vishwakarma (Divine Architect)', 'Vayu (God of Wind & Impulse)',
  'Indragni (Gods of Fire & Power)', 'Mitra (God of Divine Friendship)', 'Indra (King of Gods)',
  'Nirriti (Goddess of Roots)', 'Apas (Cosmic Waters)', 'Vishvedevas (Universal Cosmic Laws)',
  'Vishnu (Preserver of Cosmos)', 'Vasus (Eight Gods of Light)', 'Varuna (Lord of Cosmic Waters)',
  'Aja Ekapada (The Cosmic Fire)', 'Ahirbudhnya (Serpent of Depths)', 'Pushan (Nurturer & Traveler Guide)'
];

var PADA_NOTE = {
  1: 'Dharma (purpose, moral leadership, and pioneering initiative)',
  2: 'Artha (practical structure, resourcefulness, and material stability)',
  3: 'Kama (creative expression, communication, and social connection)',
  4: 'Moksha (inner reflection, intuition, and spiritual alignment)'
};

function fmtDegMin(lon) {
  var degFloat = lon % 30;
  var deg = Math.floor(degFloat);
  var min = Math.floor((degFloat - deg) * 60);
  return deg + '°' + (min < 10 ? '0' + min : min) + "'";
}

function getPlanetDignity(p, lon) {
  var sign = signOf(lon);
  var exalt = { Su: 0, Mo: 1, Ma: 9, Me: 5, Ju: 3, Ve: 11, Sa: 6, Ra: 1, Ke: 7 };
  var debil = { Su: 6, Mo: 7, Ma: 3, Me: 11, Ju: 9, Ve: 5, Sa: 0, Ra: 7, Ke: 1 };
  var own = { Su: [4], Mo: [3], Ma: [0, 7], Me: [2, 5], Ju: [8, 11], Ve: [1, 6], Sa: [9, 10], Ra: [2], Ke: [8] };

  if (exalt[p] === sign) return { status: 'exalted', label: 'Exalted in ' + ZODIAC[sign] };
  if (debil[p] === sign) return { status: 'debilitated', label: 'Debilitated in ' + ZODIAC[sign] };
  if (own[p] && own[p].indexOf(sign) >= 0) return { status: 'own', label: 'Own Sign (Swagriha) in ' + ZODIAC[sign] };
  return { status: 'neutral', label: 'Neutral in ' + ZODIAC[sign] };
}

function detectChartSignature(d) {
  var stelliums = [];
  var debilitated = [];
  var exalted = [];
  var ownSigns = [];

  for (var h = 1; h <= 12; h++) {
    var hPs = PORDER.filter(function(p) { return d.pHouse[p] === h && p !== 'As'; });
    if (hPs.length >= 3) {
      stelliums.push({ house: h, planets: hPs.map(function(p){ return PNAME[p] || p; }) });
    }
  }

  PORDER.forEach(function(p) {
    if (p === 'As') return;
    var lon = d.planetsLon[p];
    if (lon === undefined) return;
    var dig = getPlanetDignity(p, lon);
    var house = d.pHouse[p];
    if (dig.status === 'exalted') {
      exalted.push({ planet: PNAME[p] || p, house: house, sign: ZODIAC[signOf(lon)] });
    } else if (dig.status === 'debilitated') {
      debilitated.push({ planet: PNAME[p] || p, house: house, sign: ZODIAC[signOf(lon)] });
    } else if (dig.status === 'own') {
      ownSigns.push({ planet: PNAME[p] || p, house: house, sign: ZODIAC[signOf(lon)] });
    }
  });

  var summary = '';
  if (exalted.length > 0 && stelliums.length > 0) {
    summary = 'Your chart is defined by an exalted ' + exalted[0].planet + ' in House ' + exalted[0].house + ' working alongside a powerful ' + stelliums[0].planets.length + '-planet Stellium in House ' + stelliums[0].house + ' (' + stelliums[0].planets.join(', ') + '). This creates an unusually concentrated engine of ambition and personal mastery.';
  } else if (exalted.length > 0) {
    summary = 'The crowning hallmark of your chart is an exalted ' + exalted[0].planet + ' in House ' + exalted[0].house + ' (' + exalted[0].sign + '). This endows you with exceptional dignity, high standards, and a natural aura of authority in ' + HTHEME[exalted[0].house - 1] + '.';
  } else if (stelliums.length > 0) {
    summary = 'Your chart\'s primary signature is a heavy ' + stelliums[0].planets.length + '-planet Stellium in House ' + stelliums[0].house + ' (' + stelliums[0].planets.join(', ') + '). Almost your entire life force routes through ' + HTHEME[stelliums[0].house - 1] + ', making this your ultimate area of focus and growth.';
  } else if (ownSigns.length > 0) {
    summary = 'Your chart is grounded by ' + ownSigns[0].planet + ' in its own sign of ' + ownSigns[0].sign + ' (Swagriha) in House ' + ownSigns[0].house + '. This gives you an unshakeable foundation of inner strength and self-reliance in ' + HTHEME[ownSigns[0].house - 1] + '.';
  } else if (debilitated.length > 0) {
    summary = 'Your chart carries a significant growth key with ' + debilitated[0].planet + ' in debilitation in House ' + debilitated[0].house + ' (' + debilitated[0].sign + '). What feels like your deepest sensitivity or early vulnerability becomes your ultimate source of wisdom once mastered.';
  } else {
    summary = 'Your chart displays a balanced distribution of planetary forces across houses, indicating a versatile life path capable of adapting across multiple domains without extreme single-point friction.';
  }

  return {
    stelliums: stelliums,
    debilitated: debilitated,
    exalted: exalted,
    ownSigns: ownSigns,
    summary: summary
  };
}

function calcAntardashas(mahaPlanet, mahaStart, mahaEnd) {
  var mIdx = DASHA_ORDER.indexOf(mahaPlanet);
  var mYrs = DASHA_YRS[mahaPlanet];
  var totalMs = (mahaEnd.getTime() - mahaStart.getTime());
  var antars = [];
  var currentStart = new Date(mahaStart.getTime());

  for (var i = 0; i < 9; i++) {
    var aPlanet = DASHA_ORDER[(mIdx + i) % 9];
    var aYrs = (mYrs * DASHA_YRS[aPlanet]) / 120;
    var fraction = aYrs / mYrs;
    var durationMs = totalMs * fraction;
    var aEnd = new Date(currentStart.getTime() + durationMs);

    antars.push({
      planet: aPlanet,
      start: new Date(currentStart.getTime()),
      end: new Date(aEnd.getTime()),
      years: aYrs
    });
    currentStart = new Date(aEnd.getTime());
  }
  return antars;
}

window.CITIES = CITIES;
window.lookupCity = lookupCity;
window.ZODIAC = ZODIAC;
window.ZODIAC_SYM = ZODIAC_SYM;
window.RULERS = RULERS;
window.NAKSHATRA = NAKSHATRA;
window.NAK_LORDS = NAK_LORDS;
window.DASHA_YRS = DASHA_YRS;
window.DASHA_ORDER = DASHA_ORDER;
window.norm = norm;
window.sind = sind;
window.cosd = cosd;
window.tand = tand;
window.toJD = toJD;
window.planetLon = planetLon;
window.ayanamsa = ayanamsa;
window.calcAsc = calcAsc;
window.signOf = signOf;
window.degInSign = degInSign;
window.nakOf = nakOf;
window.calcDasha = calcDasha;
window.buildHouses = buildHouses;
window.renderChart = renderChart;
window.PNAME = PNAME;
window.HTHEME = HTHEME;
window.ord = ord;
window.fmtDate = fmtDate;
window.abbr = abbr;
window.currentDasha = currentDasha;
window.nextDasha = nextDasha;
window.calcAge = calcAge;
window.dayName = dayName;
window.NAK_DEITIES = NAK_DEITIES;
window.PADA_NOTE = PADA_NOTE;
window.fmtDegMin = fmtDegMin;
window.getPlanetDignity = getPlanetDignity;
window.detectChartSignature = detectChartSignature;
window.calcAntardashas = calcAntardashas;
