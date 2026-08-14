/* ENHANCED DYNAMIC STARFIELD & SHOOTING STARS */
(function(){
  var sf = document.getElementById('starfield');
  if(!sf) return;
  var types = ['gold-star', 'white-star', 'violet-star'];

  for(var i = 0; i < 160; i++){
    var s = document.createElement('div');
    var cls = types[Math.floor(Math.random() * types.length)];
    s.className = 'star ' + cls;
    var sz = (Math.random() * 2.5 + 0.8).toFixed(1);
    s.style.cssText = 'width:' + sz + 'px;height:' + sz + 'px;top:' + (Math.random() * 100).toFixed(1) + '%;left:' + (Math.random() * 100).toFixed(1) + '%;--delay:' + (Math.random() * 8).toFixed(1) + 's;--dur:' + (Math.random() * 4 + 3.5).toFixed(1) + 's;opacity:' + (Math.random() * 0.7 + 0.25).toFixed(2);
    sf.appendChild(s);
  }

  for(var m = 0; m < 8; m++){
    var met = document.createElement('div');
    met.className = 'meteor';
    var topPos = (Math.random() * 45 + 2).toFixed(1);
    var leftPos = (Math.random() * 40 + 55).toFixed(1);
    var delayVal = (m * 2.2 + Math.random() * 1.5).toFixed(1);
    var durVal = (Math.random() * 2.5 + 3.5).toFixed(1);
    met.style.cssText = 'top:' + topPos + '%;left:' + leftPos + '%;--delay:' + delayVal + 's;--dur:' + durVal + 's';
    sf.appendChild(met);
  }
})();
