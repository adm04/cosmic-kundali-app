/* MAIN APPLICATION CONTROLLER */
import html2pdf from 'html2pdf.js';
import { getFullNumerologyProfile, getCrystalBadgesHtml } from './numerology-engine.js';
import { generateVedicNumerologyReport } from './numerology-data.js';

/* ==========================================================================
   CELESTIAL UNIFIED DATE PICKER INITIALIZATION (FUNCTIONAL & EASY)
   ========================================================================== */
function initCelestialDatePicker(dayId, monthId, yearId, hiddenId, defY, defM, defD) {
  var daySel = document.getElementById(dayId);
  var monthSel = document.getElementById(monthId);
  var yearSel = document.getElementById(yearId);
  var hiddenInput = document.getElementById(hiddenId);

  if (!daySel || !monthSel || !yearSel || !hiddenInput) return;

  var MONTHS = [
    { num: 1, name: "Jan" },
    { num: 2, name: "Feb" },
    { num: 3, name: "Mar" },
    { num: 4, name: "Apr" },
    { num: 5, name: "May" },
    { num: 6, name: "Jun" },
    { num: 7, name: "Jul" },
    { num: 8, name: "Aug" },
    { num: 9, name: "Sep" },
    { num: 10, name: "Oct" },
    { num: 11, name: "Nov" },
    { num: 12, name: "Dec" }
  ];

  function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  function updateDays(targetDay) {
    var curYear = parseInt(yearSel.value, 10) || defY;
    var curMonth = parseInt(monthSel.value, 10) || defM;
    var maxDays = getDaysInMonth(curYear, curMonth);
    var currentSelected = targetDay !== undefined ? targetDay : (parseInt(daySel.value, 10) || defD);
    if (currentSelected > maxDays) currentSelected = maxDays;

    daySel.innerHTML = '';
    for (var d = 1; d <= maxDays; d++) {
      var opt = document.createElement('option');
      var valStr = d < 10 ? '0' + d : String(d);
      opt.value = valStr;
      opt.textContent = valStr;
      if (d === currentSelected) opt.selected = true;
      daySel.appendChild(opt);
    }
  }

  // Populate Months
  monthSel.innerHTML = '';
  MONTHS.forEach(function(m) {
    var optM = document.createElement('option');
    var mStr = m.num < 10 ? '0' + m.num : String(m.num);
    optM.value = mStr;
    optM.textContent = m.name;
    if (m.num === defM) optM.selected = true;
    monthSel.appendChild(optM);
  });

  // Populate Years 2026 down to 1920
  yearSel.innerHTML = '';
  var currentY = new Date().getFullYear();
  for (var y = currentY; y >= 1920; y--) {
    var optY = document.createElement('option');
    optY.value = String(y);
    optY.textContent = String(y);
    if (y === defY) optY.selected = true;
    yearSel.appendChild(optY);
  }

  updateDays(defD);

  function syncHidden() {
    var dayVal = daySel.value || '15';
    var monthVal = monthSel.value || '01';
    var yearVal = yearSel.value || '2000';
    var formatted = yearVal + '-' + monthVal + '-' + dayVal;
    if (hiddenInput.value !== formatted) {
      hiddenInput.value = formatted;
      hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  monthSel.addEventListener('change', function() {
    updateDays();
    syncHidden();
  });
  yearSel.addEventListener('change', function() {
    updateDays();
    syncHidden();
  });
  daySel.addEventListener('change', syncHidden);

  syncHidden();

  // Programmatic setter for synchronization
  hiddenInput._setDate = function(isoStr) {
    if (!isoStr || !isoStr.includes('-')) return;
    var parts = isoStr.split('-');
    if (parts.length >= 3) {
      var y = parseInt(parts[0], 10);
      var m = parseInt(parts[1], 10);
      var d = parseInt(parts[2], 10);
      if (!isNaN(y)) yearSel.value = String(y);
      if (!isNaN(m)) monthSel.value = m < 10 ? '0' + m : String(m);
      updateDays(d);
      syncHidden();
    }
  };
}

// Initialize on Screen 1 & Screen 3
(function() {
  initCelestialDatePicker('f-dob-day', 'f-dob-month', 'f-dob-year', 'f-dob', 2000, 1, 15);
  initCelestialDatePicker('num-dob-day', 'num-dob-month', 'num-dob-year', 'numBirthDate', 2000, 1, 15);
})();


/* INTERACTIVE CITY SEARCH AUTOCOMPLETE & LIVE OPENSTREETMAP API GEOCODER */
(function(){
  var input = document.getElementById('f-place');
  var suggestions = document.getElementById('city-suggestions');
  var latInput = document.getElementById('f-lat');
  if(!input || !suggestions) return;

  var currentFocus = -1;
  var apiTimer = null;

  function capitalize(str) {
    return str.replace(/\b\w/g, function(l){ return l.toUpperCase(); });
  }

  function getLocalMatches(val) {
    var keys = [];
    var seenCity = {};
    var cityMap = (typeof CITIES !== 'undefined' ? CITIES : (window.CITIES || {}));
    for (var k in cityMap) {
      if (k.indexOf(val) >= 0) {
        var display = capitalize(k);
        var baseCity = display.split(',')[0].trim().toLowerCase();
        if (!seenCity[baseCity]) {
          seenCity[baseCity] = true;
          keys.push({ raw: k, display: display, data: cityMap[k], source: 'local' });
        }
      }
    }
    return keys.slice(0, 8);
  }

  function renderItems(itemsList) {
    suggestions.innerHTML = '';
    currentFocus = -1;

    if (!itemsList || itemsList.length === 0) {
      suggestions.classList.remove('show');
      document.body.classList.remove('city-dropdown-open');
      return;
    }

    itemsList.forEach(function(item, idx) {
      var div = document.createElement('div');
      div.className = 'ck-city-item';
      div.dataset.index = idx;

      var nameParts = item.display.split(',');
      var cityName = nameParts[0].trim();
      var stateName = nameParts.slice(1).join(',').trim() || 'India';

      div.innerHTML = '<span class="ck-city-name">' + cityName + '</span><span class="ck-city-badge">' + stateName + '</span>';

      function selectCity(e) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        window._justSelectedCity = Date.now();
        input.value = item.display;
        if (latInput && item.data && item.data.lat !== undefined) {
          latInput.value = item.data.lat;
        }
        suggestions.classList.remove('show');
        suggestions.innerHTML = '';
        document.body.classList.remove('city-dropdown-open');
      }

      div.addEventListener('mousedown', selectCity);
      div.addEventListener('touchstart', selectCity);
      div.addEventListener('click', selectCity);

      suggestions.appendChild(div);
    });

    suggestions.classList.add('show');
    document.body.classList.add('city-dropdown-open');
  }

  input.addEventListener('focus', function() {
    var val = this.value.trim().toLowerCase();
    if (val && val.length >= 2) {
      var localMatches = getLocalMatches(val);
      if (localMatches && localMatches.length > 0) {
        renderItems(localMatches);
      }
    }
  });

  input.addEventListener('input', function() {
    var val = this.value.trim().toLowerCase();
    if (apiTimer) clearTimeout(apiTimer);

    if (!val || val.length < 2) {
      suggestions.innerHTML = '';
      suggestions.classList.remove('show');
      document.body.classList.remove('city-dropdown-open');
      return;
    }

    var localMatches = getLocalMatches(val);
    renderItems(localMatches);

    // Live API query for 100% full Indian coverage
    apiTimer = setTimeout(function() {
      fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(val) + '&countrycodes=in&limit=8&addressdetails=1', {
        headers: { 'Accept': 'application/json' }
      })
      .then(function(res){ return res.json(); })
      .then(function(apiResults) {
        if (!apiResults || apiResults.length === 0) return;

        var combined = localMatches.slice();
        var seenNames = {};
        combined.forEach(function(m){ seenNames[m.display.toLowerCase()] = true; });

        apiResults.forEach(function(res) {
          var addr = res.address || {};
          var cityTitle = addr.city || addr.town || addr.village || addr.suburb || addr.county || res.display_name.split(',')[0];
          var stateTitle = addr.state || addr.state_district || 'India';
          var fullDisplay = cityTitle + ', ' + stateTitle;

          if (!seenNames[fullDisplay.toLowerCase()]) {
            seenNames[fullDisplay.toLowerCase()] = true;
            combined.push({
              raw: fullDisplay.toLowerCase(),
              display: fullDisplay,
              data: { lat: parseFloat(res.lat), lng: parseFloat(res.lon) },
              source: 'api'
            });
          }
        });

        renderItems(combined.slice(0, 14));
      })
      .catch(function(err) {
        // Silent fallback
      });
    }, 280);
  });

  input.addEventListener('keydown', function(e) {
    var items = suggestions.querySelectorAll('.ck-city-item');
    if (!items.length) return;

    if (e.keyCode === 40) { // DOWN
      currentFocus++;
      if (currentFocus >= items.length) currentFocus = 0;
      setActive(items);
    } else if (e.keyCode === 38) { // UP
      currentFocus--;
      if (currentFocus < 0) currentFocus = items.length - 1;
      setActive(items);
    } else if (e.keyCode === 13) { // ENTER
      if (currentFocus > -1 && items[currentFocus]) {
        e.preventDefault();
        items[currentFocus].click();
      }
    }
  });

  function setActive(items) {
    items.forEach(function(el){ el.classList.remove('active'); });
    if (items[currentFocus]) {
      items[currentFocus].classList.add('active');
      items[currentFocus].scrollIntoView({ block: 'nearest' });
    }
  }

  document.addEventListener('click', function(e) {
    if (e.target !== input && !suggestions.contains(e.target)) {
      suggestions.classList.remove('show');
      document.body.classList.remove('city-dropdown-open');
    }
  });
})();

/* AM/PM SEGMENTED TOGGLE CONTROLLER */
(function(){
  var wrap = document.getElementById('ampm-segmented');
  var hiddenInp = document.getElementById('f-tob-ampm');
  if(!wrap || !hiddenInp) return;

  wrap.addEventListener('click', function(e){
    var btn = e.target.closest('.ck-ampm-btn');
    if(!btn) return;
    e.preventDefault();
    wrap.querySelectorAll('.ck-ampm-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    hiddenInp.value = btn.dataset.value;
  });
})();

/* TIME OF BIRTH AUTO-ADVANCE & FORMATTING */
(function(){
  var hrInp = document.getElementById('f-tob-hr');
  var minInp = document.getElementById('f-tob-min');

  if(hrInp && minInp){
    hrInp.addEventListener('focus', function(){ this.select(); });
    minInp.addEventListener('focus', function(){ this.select(); });

    hrInp.addEventListener('input', function(){
      if(this.value.length >= 2){
        minInp.focus();
        minInp.select();
      }
    });

    hrInp.addEventListener('blur', function(){
      var v = parseInt(this.value, 10);
      if(!isNaN(v)){
        if(v < 1) v = 1;
        if(v > 12) v = 12;
        this.value = v < 10 ? '0' + v : v;
      }
    });

    minInp.addEventListener('blur', function(){
      var v = parseInt(this.value, 10);
      if(!isNaN(v)){
        if(v < 0) v = 0;
        if(v > 59) v = 59;
        this.value = v < 10 ? '0' + v : v;
      }
    });
  }
})();

/* MAIN GENERATE FORM HANDLER */
/* ROBUST PARSERS */
function parseDobString(str) {
  if (!str) return { year: 2000, month: 1, day: 15 };
  var parts = str.split(/[-/]/);
  if (parts.length === 3) {
    var p0 = parseInt(parts[0], 10);
    var p1 = parseInt(parts[1], 10);
    var p2 = parseInt(parts[2], 10);
    if (p0 > 1000) {
      return { year: p0, month: isNaN(p1) ? 1 : p1, day: isNaN(p2) ? 15 : p2 };
    } else if (p2 > 1000) {
      return { year: p2, month: isNaN(p1) ? 1 : p1, day: isNaN(p0) ? 15 : p0 };
    }
  }
  var d = new Date(str);
  if (!isNaN(d.getTime())) {
    return { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() };
  }
  return { year: 2000, month: 1, day: 15 };
}

function parseTobString(tobStr, hrParam, mnParam) {
  if (hrParam !== undefined && mnParam !== undefined && !isNaN(hrParam) && !isNaN(mnParam)) {
    return { hr: hrParam, mn: mnParam };
  }
  if (tobStr) {
    var parts = tobStr.split(':');
    if (parts.length >= 2) {
      var h = parseInt(parts[0], 10);
      var m = parseInt(parts[1], 10);
      return { hr: isNaN(h) ? 12 : h, mn: isNaN(m) ? 0 : m };
    }
  }
  return { hr: 12, mn: 0 };
}

/* MAIN GENERATE FORM HANDLER */
function generate(form){
  try {
    var name = form.name || 'User';
    var gender = form.gender || 'Male';
    var dob = form.dob || '2000-01-15';
    var tob = form.tob || '12:00';
    var place = form.place || 'Kolkata, India';
    var userLat = form.lat;

    var dobParsed = parseDobString(dob);
    var year = dobParsed.year, month = dobParsed.month, day = dobParsed.day;

    var tobParsed = parseTobString(tob, form.hr, form.mn);
    var hr = tobParsed.hr, mn = tobParsed.mn;

    var dobDate = new Date(year, month - 1, day);
    if(isNaN(dobDate.getTime())) dobDate = new Date(2000, 0, 15);

    var loc = lookupCity(place);
    var lat = userLat ? parseFloat(userLat) : loc.lat;
    var lng = loc.lng;
    if(isNaN(lat)) lat = loc.lat;
    if(isNaN(lng)) lng = loc.lng;

    // Regional Timezone Offset Resolution (IST = +05:30 -> -5.5 hours to UT)
    var tzOffsetHours = 5.5;
    var pLower = place.toLowerCase();
    if (pLower.indexOf('london') >= 0 || pLower.indexOf('united kingdom') >= 0 || pLower.indexOf('uk') >= 0) {
      tzOffsetHours = 0.0;
    } else if (pLower.indexOf('new york') >= 0 || pLower.indexOf('chicago') >= 0 || pLower.indexOf('united states') >= 0 || pLower.indexOf('usa') >= 0) {
      tzOffsetHours = -5.0;
    } else if (pLower.indexOf('sydney') >= 0 || pLower.indexOf('australia') >= 0) {
      tzOffsetHours = 10.0;
    } else if (pLower.indexOf('dubai') >= 0 || pLower.indexOf('uae') >= 0) {
      tzOffsetHours = 4.0;
    } else if (pLower.indexOf('tokyo') >= 0 || pLower.indexOf('japan') >= 0) {
      tzOffsetHours = 9.0;
    } else if (form.tz !== undefined && !isNaN(parseFloat(form.tz))) {
      tzOffsetHours = parseFloat(form.tz);
    }

    var utHr = hr + (mn / 60) - tzOffsetHours;
    var jd = toJD(year, month, day, utHr);

    var trop = planetLon(jd);
    var ay = ayanamsa(jd);
    var planetsLon = {};
    for (var p in trop) planetsLon[p] = norm(trop[p] - ay);

    var ascTrop = calcAsc(jd, lat, lng);
    planetsLon['As'] = norm(ascTrop - ay);

    var lagnaIdx = signOf(planetsLon['As']);
    var moonIdx = signOf(planetsLon['Mo']);
    var sunIdx = signOf(planetsLon['Su']);

    var lagnaSign = ZODIAC[lagnaIdx] || ZODIAC[0];
    var moonSign = ZODIAC[moonIdx] || ZODIAC[0];
    var sunSign = ZODIAC[sunIdx] || ZODIAC[0];

    var lagnaRuler = RULERS[lagnaIdx] || RULERS[0];
    var moonNakIdx = nakOf(planetsLon['Mo']);
    var moonNak = NAKSHATRA[moonNakIdx] || NAKSHATRA[0];
    var lagnaNakIdx = nakOf(planetsLon['As']);
    var lagnaNak = NAKSHATRA[lagnaNakIdx] || NAKSHATRA[0];

    var houses = buildHouses(planetsLon['As'], planetsLon);
    var hSigns = houses.hSigns; var pHouse = houses.pHouse;

    var dashas = calcDasha(planetsLon['Mo'], dobDate);
    var cd = currentDasha(dashas); var nd = nextDasha(dashas);

    var cAntar = null;
    if (cd) {
      var antars = calcAntardashas(cd.planet, cd.start, cd.end);
      var now = new Date();
      cAntar = antars.find(function(a){ return a.start <= now && a.end > now; });
    }

    var data = {
      name: name, gender: gender, dob: dob, tob: tob, place: place,
      lat: lat, lng: lng, jd: jd, planetsLon: planetsLon,
      lagnaSign: lagnaSign, moonSign: moonSign, sunSign: sunSign,
      lagnaRuler: lagnaRuler, moonNak: moonNak, lagnaNak: lagnaNak,
      hSigns: hSigns, pHouse: pHouse, dashas: dashas, dobDate: dobDate
    };

    renderChart(hSigns, pHouse, planetsLon);

    document.getElementById('r-name').textContent = name + "'s Kundali, Decoded";
    document.getElementById('r-bio').textContent = gender + ' · born ' + dayName(dobDate) + ', ' + dobDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) + ' · ' + tob + ' · ' + place;

    var bHtml = [
      '<div class="ck-badge">' + ZODIAC_SYM[sunIdx] + ' Sun in ' + sunSign + '</div>',
      '<div class="ck-badge">Moon in ' + moonSign + ' &middot; ' + moonNak + '</div>',
      '<div class="ck-badge">&uarr; ' + lagnaSign + ' Lagna &middot; ' + lagnaNak + '</div>',
    ];
    document.getElementById('r-badges').innerHTML = bHtml.join('');

    var fHtml = [];
    if (cd) fHtml.push('<span>Mahadasha: <b>' + PNAME[cd.planet] + '</b></span>');
    if (cAntar) fHtml.push('<span>Antardasha: <b>' + PNAME[cAntar.planet] + '</b> (until ' + fmtDate(cAntar.end) + ')</span>');
    if (nd) fHtml.push('<span>Next Dasha: <b>' + PNAME[nd.planet] + '</b> from ' + fmtDate(nd.start) + '</span>');
    fHtml.push('<span>Age: <b>' + calcAge(dobDate) + '</b></span>');
    document.getElementById('r-facts').innerHTML = fHtml.join('');

    window._kd = data;
    window._currentTab = 'overview';
    window._kdMode = window._kdMode || 'simplified';
    renderTab('overview', data);
  } catch (err) {
    console.error('Generation calculation error:', err);
    alert('Could not calculate chart for these birth details. Please check the inputs.');
  }
}

function renderTab(id,data){
  id = id || window._currentTab || 'overview';
  window._currentTab = id;
  data = data || window._kd;
  var mode = window._kdMode || 'simplified';
  var gens = {
    overview: genOverview,
    career: genCareer,
    love: genLove,
    health: genHealth,
    wealth: genWealth,
    numerology: window.genNumerology || genOverview
  };
  var fn = gens[id] || (window['gen' + id.charAt(0).toUpperCase() + id.slice(1)]) || genOverview;
  document.getElementById('tab-content').innerHTML = fn(data, mode);
}

/* MODE TOGGLE (SIMPLIFIED | DETAILED) */
var modeToggleEl = document.getElementById('mode-toggle');
if(modeToggleEl){
  modeToggleEl.addEventListener('click',function(e){
    var btn = e.target.closest('.ck-mode-btn'); if(!btn) return;
    document.querySelectorAll('.ck-mode-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    window._kdMode = btn.dataset.mode;
    renderTab(window._currentTab || 'overview');
  });
}

/* TAB NAV */
var tabNavEl = document.getElementById('tab-nav');
if(tabNavEl){
  tabNavEl.addEventListener('click',function(e){
    var btn=e.target.closest('.ck-tab'); if(!btn)return;
    document.querySelectorAll('.ck-tab').forEach(function(t){t.classList.remove('active');});
    btn.classList.add('active');
    renderTab(btn.dataset.tab);
  });
}

/* FORM SUBMIT */
var kundaliFormEl = document.getElementById('kundali-form');
if (kundaliFormEl) {
  kundaliFormEl.addEventListener('submit', function(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (window._justSelectedCity && Date.now() - window._justSelectedCity < 250) {
      return false;
    }

    try {
      var name = document.getElementById('f-name').value.trim();
      var gender = document.getElementById('f-gender').value;

      var dobStr = '';
      var dobEl = document.getElementById('f-dob');
      if (dobEl && dobEl.value) {
        dobStr = dobEl.value;
      } else {
        var dDayEl = document.getElementById('f-dob-day');
        var dMonthEl = document.getElementById('f-dob-month');
        var dYearEl = document.getElementById('f-dob-year');
        var dDay = dDayEl ? parseInt(dDayEl.value, 10) : 15;
        var dMonth = dMonthEl ? parseInt(dMonthEl.value, 10) : 1;
        var dYear = dYearEl ? parseInt(dYearEl.value, 10) : 2000;
        dobStr = dYear + '-' + (dMonth < 10 ? '0' + dMonth : dMonth) + '-' + (dDay < 10 ? '0' + dDay : dDay);
      }
      if (!dobStr) { alert('Please select your date of birth.'); return false; }

      var tHr = parseInt(document.getElementById('f-tob-hr').value, 10);
      var tMin = parseInt(document.getElementById('f-tob-min').value, 10);
      var tAmPm = document.getElementById('f-tob-ampm').value;
      if (isNaN(tHr)) tHr = 12;
      if (isNaN(tMin)) tMin = 0;
      var hr24 = tHr;
      if (tAmPm === 'PM' && tHr < 12) hr24 = tHr + 12;
      if (tAmPm === 'AM' && tHr === 12) hr24 = 0;
      var tobStr = (hr24 < 10 ? '0' + hr24 : hr24) + ':' + (tMin < 10 ? '0' + tMin : tMin);

      var place = document.getElementById('f-place').value.trim();
      var lat = document.getElementById('f-lat').value;

      if (!name) { alert('Please enter your full name.'); return false; }
      if (!place) { alert('Please enter your birth city.'); return false; }

      var formWrap = document.querySelector('.form-wrap');
      if (formWrap) formWrap.classList.add('is-warping');

      var loader = document.getElementById('loading');
      var loaderMsg = document.getElementById('loading-msg');

      setTimeout(function() {
        if (loader) loader.classList.add('show');
        if (loaderMsg) loaderMsg.textContent = 'Casting Your Cosmic Kundali…';
      }, 150);

      setTimeout(function() {
        try {
          generate({ name: name, gender: gender, dob: dobStr, tob: tobStr, place: place, lat: lat, hr: hr24, mn: tMin });
          if (loader) loader.classList.remove('show');
          if (formWrap) formWrap.classList.remove('is-warping');

          document.getElementById('screen-form').style.display = 'none';
          var resScreen = document.getElementById('screen-result');
          resScreen.style.display = 'block';
          resScreen.classList.add('is-entering');

          window.scrollTo({ top: 0, behavior: 'smooth' });

          setTimeout(function() {
            resScreen.classList.remove('is-entering');
          }, 800);
        } catch (err2) {
          console.error('Submission execution error:', err2);
          if (loader) loader.classList.remove('show');
          if (formWrap) formWrap.classList.remove('is-warping');
          alert('Error generating chart. Please check inputs.');
        }
      }, 900);

    } catch (errOuter) {
      console.error('Outer submission error:', errOuter);
      alert('Could not submit form: ' + errOuter.message);
    }

    return false;
  });
}

/* BACK BUTTON */
var btnBackEl = document.getElementById('btn-back');
if(btnBackEl){
  btnBackEl.addEventListener('click',function(){
    document.getElementById('screen-result').style.display='none';
    document.getElementById('screen-form').style.display='flex';
    window.scrollTo({top:0,behavior:'smooth'});
  });
}

/* SUPABASE SAVE CHART */
var SUPABASE_URL = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_URL) || '';
var SUPABASE_KEY = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_SUPABASE_ANON_KEY) || '';

var btnSaveEl = document.getElementById('btn-save');
if(btnSaveEl){
  btnSaveEl.addEventListener('click', function(){
    if(!window._kd){ alert('No chart generated to save.'); return; }
    if(!SUPABASE_URL || !SUPABASE_KEY){
      alert('Supabase not configured — please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
      return;
    }
    var d = window._kd;
    var record = {
      name: d.name,
      gender: d.gender,
      dob: d.dob,
      tob: d.tob,
      place: d.place,
      lagna_sign: d.lagnaSign,
      moon_sign: d.moonSign,
      sun_sign: d.sunSign,
      moon_nak: d.moonNak,
      lagna_nak: d.lagnaNak,
      chart_data: {
        planetsLon: d.planetsLon,
        hSigns: d.hSigns,
        pHouse: d.pHouse
      }
    };

    fetch(SUPABASE_URL + '/rest/v1/kundali_charts', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(record)
    }).then(function(res){
      if(!res.ok) return res.text().then(function(t){ throw new Error(t); });
      return res.json();
    }).then(function(){
      alert('Chart saved to Supabase database successfully! ✦');
    }).catch(function(err){
      console.error('Supabase save error:', err);
      alert('Save status: ' + err.message);
    });
  });
}

/* PDF REPORT EXPORT */
var pdfBtn = document.getElementById('btn-export-pdf');
if(pdfBtn){
  pdfBtn.addEventListener('click', function(){
    if(!window._kd){ alert('No chart generated to export.'); return; }

    try {
      var d = window._kd;
      var nameClean = (d.name || 'Kundali').replace(/[^a-zA-Z0-9_-]/g, '_');

      var tempWrap = document.createElement('div');
      tempWrap.id = 'pdf-export-temp-wrap';
      tempWrap.style.cssText = 'position:fixed; inset:0; background:#0a0818; z-index:99999; display:flex; flex-direction:column; align-items:center; overflow-y:auto; padding:30px 10px; backdrop-filter:blur(12px);';

      var loadingNotice = document.createElement('div');
      loadingNotice.style.cssText = 'font-family:\'Cinzel\', serif; font-size:12px; letter-spacing:0.2em; color:#f2d38a; text-transform:uppercase; margin-bottom:20px; background:rgba(201,162,75,0.15); border:1px solid #c9a24b; padding:10px 24px; border-radius:999px; text-align:center;';
      loadingNotice.innerHTML = '✦ Generating High-Resolution PDF Report... Please Wait ✦';
      tempWrap.appendChild(loadingNotice);

      var reportHolder = document.createElement('div');
      reportHolder.innerHTML = buildPdfReportHtml(d);
      tempWrap.appendChild(reportHolder);

      document.body.appendChild(tempWrap);

      var targetEl = reportHolder.firstElementChild || reportHolder;

      setTimeout(function(){
        try {
          var opt = {
            margin: [0.2, 0.2, 0.2, 0.2],
            filename: nameClean + '_Cosmic_Kundali_Report.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, backgroundColor: '#0a0818', scrollX: 0, scrollY: 0 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            pagebreak: { mode: ['css', 'legacy'] }
          };

          var worker = html2pdf();
          if (worker && typeof worker.set === 'function') {
            worker.set(opt).from(targetEl).save().then(function(){
              if(document.body.contains(tempWrap)) document.body.removeChild(tempWrap);
            }).catch(function(err){
              console.warn('html2pdf error, using print fallback:', err);
              if(document.body.contains(tempWrap)) document.body.removeChild(tempWrap);
              window.print();
            });
          } else {
            window.print();
            if(document.body.contains(tempWrap)) document.body.removeChild(tempWrap);
          }
        } catch(workerErr) {
          console.warn('Worker execution fallback:', workerErr);
          window.print();
          if(document.body.contains(tempWrap)) document.body.removeChild(tempWrap);
        }
      }, 400);

    } catch (exportErr) {
      console.error('PDF export error:', exportErr);
      alert('Could not generate PDF: ' + exportErr.message);
    }
  });
}

window.generate = generate;
window.renderTab = renderTab;

/* ==========================================================================
   PORTAL NAVIGATION CONTROLLER (KUNDALI / NUMEROLOGY)
   ========================================================================== */
(function setupPortalSwitcher() {
  var btnKundali = document.getElementById('btn-portal-kundali');
  var btnNumerology = document.getElementById('btn-portal-numerology');
  var btnNumBack = document.getElementById('btn-num-back');
  var screenForm = document.getElementById('screen-form');
  var screenResult = document.getElementById('screen-result');
  var screenNumerology = document.getElementById('screen-numerology');

  function showNumerology() {
    if (screenForm) screenForm.style.display = 'none';
    if (screenResult) screenResult.style.display = 'none';
    if (screenNumerology) {
      screenNumerology.style.display = 'flex';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Synchronize form fields if entered on Kundali screen
    var kName = document.getElementById('f-name');
    var kDob = document.getElementById('f-dob');
    var nName = document.getElementById('numFullName');
    var nDob = document.getElementById('numBirthDate');
    if (kName && nName && kName.value && !nName.value) {
      nName.value = kName.value;
    }
    if (kDob && nDob && kDob.value) {
      if (nDob._setDate) nDob._setDate(kDob.value);
      else nDob.value = kDob.value;
    }
  }

  function showKundali() {
    if (screenNumerology) screenNumerology.style.display = 'none';
    if (screenResult) screenResult.style.display = 'none';
    if (screenForm) {
      screenForm.style.display = 'flex';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    var kDob = document.getElementById('f-dob');
    var nDob = document.getElementById('numBirthDate');
    if (kDob && nDob && nDob.value) {
      if (kDob._setDate) kDob._setDate(nDob.value);
      else kDob.value = nDob.value;
    }
    if (btnKundali) btnKundali.classList.add('active');
    if (btnNumerology) btnNumerology.classList.remove('active');
  }

  if (btnNumerology) {
    btnNumerology.addEventListener('click', function(e) {
      e.preventDefault();
      btnNumerology.classList.add('active');
      if (btnKundali) btnKundali.classList.remove('active');
      showNumerology();
    });
  }

  if (btnKundali) {
    btnKundali.addEventListener('click', function(e) {
      e.preventDefault();
      showKundali();
    });
  }

  if (btnNumBack) {
    btnNumBack.addEventListener('click', function(e) {
      e.preventDefault();
      showKundali();
    });
  }
})();

/* ==========================================================================
   CELESTIAL UTC CLOCK
   ========================================================================== */
(function setupCelestialClock() {
  var clockEl = document.getElementById('utcTime');
  if (!clockEl) return;
  function updateTime() {
    var now = new Date();
    var utcStr = now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
    clockEl.textContent = utcStr;
  }
  updateTime();
  setInterval(updateTime, 1000);
})();

/* ==========================================================================
   STANDALONE NUMEROLOGY CALCULATOR CONTROLLER
   ========================================================================== */
(function setupNumerologyCalculator() {
  var form = document.getElementById('numerology-form');
  var calcBtn = document.getElementById('calculateBtn');
  var resultsWrap = document.getElementById('num-results');
  var historyList = document.getElementById('numHistoryList');

  if (!form || !calcBtn) return;

  function animateNumber(elementId, finalNumber) {
    var element = document.getElementById(elementId);
    if (!element) return;
    var duration = 1200;
    var steps = 18;
    var stepDuration = duration / steps;
    var currentStep = 0;

    var interval = setInterval(function() {
      currentStep++;
      if (currentStep >= steps) {
        clearInterval(interval);
        element.textContent = finalNumber;
        return;
      }
      var progress = currentStep / steps;
      var currentNumber = Math.max(1, Math.floor(finalNumber * progress));
      element.textContent = currentNumber;
    }, stepDuration);
  }

  function renderHistory() {
    if (!historyList) return;
    try {
      var history = JSON.parse(localStorage.getItem('cosmic_numerology_history') || '[]');
      if (history.length === 0) {
        historyList.innerHTML = '<div style="color:var(--muted); font-size:12px; font-style:italic;">No recent readings yet. Enter your details above to reveal your sacred vibrations!</div>';
        return;
      }
      historyList.innerHTML = history.slice(0, 5).map(function(item, idx) {
        return '<div class="num-history-item" data-idx="' + idx + '">' +
          '<div>' +
            '<span class="num-history-name">' + item.name + '</span>' +
            '<span class="num-history-meta"> &middot; ' + item.dob + '</span>' +
          '</div>' +
          '<div style="font-family:\'Cinzel\', serif; color:#f2d38a; font-size:11px;">' +
            'LP ' + item.lifePath + ' / D ' + item.destiny +
          '</div>' +
        '</div>';
      }).join('');

      historyList.querySelectorAll('.num-history-item').forEach(function(el) {
        el.addEventListener('click', function() {
          var idx = parseInt(el.dataset.idx, 10);
          var record = history[idx];
          if (record) {
            document.getElementById('numFullName').value = record.name;
            var nDobEl = document.getElementById('numBirthDate');
            if (nDobEl) {
              if (nDobEl._setDate) nDobEl._setDate(record.dob);
              else nDobEl.value = record.dob;
            }
            performCalculation(record.name, record.dob, false);
          }
        });
      });
    } catch (e) {
      // Ignore localStorage read errors
    }
  }

  function saveHistory(name, dob, lifePath, destiny) {
    try {
      var history = JSON.parse(localStorage.getItem('cosmic_numerology_history') || '[]');
      history = history.filter(function(h) {
        return !(h.name.toLowerCase() === name.toLowerCase() && h.dob === dob);
      });
      history.unshift({ name: name, dob: dob, lifePath: lifePath, destiny: destiny, timestamp: Date.now() });
      localStorage.setItem('cosmic_numerology_history', JSON.stringify(history.slice(0, 10)));
      renderHistory();
    } catch (e) {
      // Ignore localStorage write errors
    }
  }

  function performCalculation(name, dob, shouldSave) {
    if (shouldSave === undefined) shouldSave = true;
    var btnText = calcBtn.querySelector('.btn-text');
    calcBtn.disabled = true;
    if (btnText) btnText.textContent = '✨ Consulting the Stars... ✨';

    setTimeout(function() {
      calcBtn.disabled = false;
      if (btnText) btnText.textContent = 'Reveal Your Destiny ✦';

      try {
        var profile = getFullNumerologyProfile(name, dob);
        var nums = profile.numbers;
        var meanings = profile.meanings;
        var rulers = profile.rulers;

        if (resultsWrap) {
          resultsWrap.classList.remove('hidden');
          resultsWrap.style.opacity = '0';
          setTimeout(function() { resultsWrap.style.opacity = '1'; }, 50);
        }

        animateNumber('destinyNumber', nums.destiny);
        animateNumber('lifePathNumber', nums.lifePath);
        animateNumber('soulNumber', nums.soul);
        animateNumber('personalityNumber', nums.personality);
        animateNumber('birthdayNumber', nums.birthday);

        var dSub = document.getElementById('destinySub');
        var lpSub = document.getElementById('lifePathSub');
        var sSub = document.getElementById('soulSub');
        var pSub = document.getElementById('personalitySub');
        var bSub = document.getElementById('birthdaySub');

        if (dSub) dSub.textContent = meanings.destiny.title;
        if (lpSub) lpSub.textContent = meanings.lifePath.keyword;
        if (sSub) sSub.textContent = meanings.soul.title;
        if (pSub) pSub.textContent = meanings.personality.title;
        if (bSub) bSub.textContent = meanings.birthday.title;

        var dBadges = document.getElementById('destinyBadges');
        var lpBadges = document.getElementById('lifePathBadges');
        var sBadges = document.getElementById('soulBadges');
        var pBadges = document.getElementById('personalityBadges');
        var bBadges = document.getElementById('birthdayBadges');

        if (dBadges) dBadges.innerHTML = getCrystalBadgesHtml(nums.destiny, rulers.destiny);
        if (lpBadges) lpBadges.innerHTML = getCrystalBadgesHtml(nums.lifePath, rulers.lifePath);
        if (sBadges) sBadges.innerHTML = getCrystalBadgesHtml(nums.soul);
        if (pBadges) pBadges.innerHTML = getCrystalBadgesHtml(nums.personality);
        if (bBadges) bBadges.innerHTML = getCrystalBadgesHtml(nums.birthday);

        var meaningEl = document.getElementById('numerologyMeaning');
        if (meaningEl) {
          var vedicRep = generateVedicNumerologyReport(name, dob);
          var vmData = vedicRep.data.mulank;
          var vbData = vedicRep.data.bhagyank;
          var vnData = vedicRep.data.namank;
          var vmContent = vedicRep.content.mulank;
          var vbContent = vedicRep.content.bhagyank;
          var vnContent = vedicRep.content.namank;

          meaningEl.innerHTML =
            '<div class="prophecy-item">' +
              '<div class="prophecy-title-sub">✦ Radical Number (Mulank ' + vedicRep.numbers.mulank + ') &mdash; ' + vmData.ruling_planet + ' &middot; ' + vmData.title + '</div>' +
              '<p>' + vmContent.meaning + '</p>' +
              '<p style="margin-top:6px; color:#f2d38a;"><em>Sacred Mantra:</em> ' + vmData.mantra + '</p>' +
              '<p style="margin-top:4px; font-size:13px; color:#c0b4db;"><b>Auspicious Colour:</b> ' + vmData.auspicious_colour + ' &middot; <b>Gemstone:</b> ' + vmData.gemstone + ' &middot; <b>Favourable Dates:</b> ' + vmData.favourable_dates + '</p>' +
            '</div>' +
            '<div class="prophecy-item">' +
              '<div class="prophecy-title-sub">✦ Destiny Number (Bhagyank ' + vedicRep.numbers.bhagyank + ') &mdash; ' + vbData.ruling_planet + ' &middot; ' + vbData.title + '</div>' +
              '<p>' + vbContent.meaning + '</p>' +
              '<p style="margin-top:6px; color:#f2d38a;"><em>Deity &amp; Fast Day:</em> ' + vbData.god_goddess + ' &middot; Fast: ' + vbData.fast_day + '</p>' +
              '<p style="margin-top:4px; font-size:13px; color:#c0b4db;"><b>Karmic Calling:</b> ' + vbContent.career + '</p>' +
            '</div>' +
            '<div class="prophecy-item">' +
              '<div class="prophecy-title-sub">✦ Chaldean Name Number (Namank ' + vedicRep.numbers.namank + ') &mdash; ' + vnData.ruling_planet + ' &middot; ' + vnData.title + '</div>' +
              '<p>' + vnContent.meaning + '</p>' +
              '<p style="margin-top:6px; font-size:13px; color:#c0b4db;"><b>Acoustic Letters:</b> ' + vnData.favourable_alphabets + ' &middot; <b>Direction:</b> ' + vnData.direction + '</p>' +
            '</div>' +
            '<div class="prophecy-item">' +
              '<div class="prophecy-title-sub">✦ Life Path ' + nums.lifePath + ' &mdash; ' + meanings.lifePath.keyword + '</div>' +
              '<p>' + meanings.lifePath.summary + '</p>' +
              '<p style="margin-top:6px; color:#f2d38a;"><em>Guidance:</em> ' + meanings.lifePath.guidance + '</p>' +
            '</div>' +
            '<div class="prophecy-item">' +
              '<div class="prophecy-title-sub">✦ Soul Urge ' + nums.soul + ' (Heart\'s Desire) &amp; Personality ' + nums.personality + '</div>' +
              '<p><strong>Inner Soul Craving:</strong> ' + meanings.soul.desc + '</p>' +
              '<p style="margin-top:6px;"><strong>Outer Aura Impression:</strong> ' + meanings.personality.desc + '</p>' +
            '</div>' +
            '<div class="prophecy-item" style="border-bottom:none;">' +
              '<div class="prophecy-title-sub">✧ Cosmic Synthesis &amp; Sacred Resonance ✧</div>' +
              '<p>' + profile.synthesis + '</p>' +
            '</div>';
        }

        if (shouldSave) {
          saveHistory(name, dob, nums.lifePath, nums.destiny);
        }

        setTimeout(function() {
          resultsWrap.scrollIntoView({ behavior: 'smooth' });
        }, 300);

      } catch (err) {
        console.error('Numerology computation error:', err);
        alert('Could not calculate numerology. Please verify your sacred name and star date.');
      }
    }, 600);
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var name = document.getElementById('numFullName').value.trim();
    var dob = document.getElementById('numBirthDate').value;
    if (!name) { alert('Please enter your sacred name.'); return; }
    if (!dob) { alert('Please select your star date of birth.'); return; }
    performCalculation(name, dob, true);
  });

  renderHistory();
})();

