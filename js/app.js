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

// ===== Splash Screen =====
(function () {
  var splash = document.getElementById('splash');
  var btn = document.getElementById('splashEnter');
  var music = document.getElementById('bgMusic');

  if (!splash || !btn) return;

  btn.addEventListener('click', function () {
    // Lancer la musique
    if (music) {
      music.volume = 0.5;
      music.play().catch(function () {});
    }
    // Cacher le splash
    splash.classList.add('hidden');
    // Retirer du DOM après la transition
    setTimeout(function () {
      splash.style.display = 'none';
    }, 950);
  });
})();
// ===== Fin Splash Screen =====
