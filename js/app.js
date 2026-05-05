// Fix iOS Safari viewport height — set once, never update on scroll
(function() {
  var vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', vh + 'px');
})();

const hamburger = document.querySelector(
  ".header .nav-bar .nav-list .hamburger"
);
const mobile_menu = document.querySelector(".header .nav-bar .nav-list ul");
const menu_item = document.querySelectorAll(
  ".header .nav-bar .nav-list ul li a"
);
const header = document.querySelector(".header.container");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobile_menu.classList.toggle("active");
});

document.addEventListener("scroll", () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 250) {
    header.style.backgroundColor = "#29323c";
  } else {
    header.style.backgroundColor = "transparent";
  }
});

menu_item.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobile_menu.classList.toggle("active");
  });
});


// ===== Bokeh Canvas =====
(function() {
  var canvas = document.getElementById('splashCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function rand(min, max) { return Math.random() * (max - min) + min; }

  for (var i = 0; i < 35; i++) {
    particles.push({
      x: rand(0, 1), y: rand(0, 1),
      r: rand(2, 12),
      alpha: rand(0.05, 0.25),
      speed: rand(0.00008, 0.00025),
      drift: rand(-0.00015, 0.00015),
      hue: Math.random() > 0.7 ? 'crimson' : 'rgba(255,255,255,'
    });
  }

  var startTime = Date.now();
  function draw() {
    if (!document.getElementById('splash') || document.getElementById('splash').classList.contains('hidden')) return;
    ctx.clearRect(0, 0, W, H);
    var elapsed = Date.now() - startTime;
    particles.forEach(function(p) {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -0.05) { p.y = 1.05; p.x = rand(0, 1); }
      ctx.beginPath();
      ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
      if (p.hue === 'crimson') {
        ctx.fillStyle = 'rgba(220,20,60,' + p.alpha + ')';
      } else {
        ctx.fillStyle = p.hue + p.alpha + ')';
      }
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();
// ===== Fin Bokeh Canvas =====

// ===== Splash Screen =====
(function () {
  var splash = document.getElementById('splash');
  var btn = document.getElementById('splashEnter');
  var music = document.getElementById('bgMusic');

  // Bloquer le hero au chargement
  document.body.classList.add('splash-active');

  if (!splash || !btn) return;

  btn.addEventListener('click', function () {
    // Lancer la musique
    if (music) {
      music.volume = 0.5;
      music.play().catch(function () {});
    }
    // Révéler le hero
    document.body.classList.remove('splash-active');
    // Cacher le splash
    splash.classList.add('hidden');
    // Retirer du DOM après la transition
    setTimeout(function () {
      splash.style.display = 'none';
    }, 950);
  });
})();
// ===== Fin Splash Screen =====
