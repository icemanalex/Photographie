// iOS Safari — forcer la lecture de la vidéo background
(function() {
  const video = document.getElementById('myVideo');
  if (!video) return;

  function tryPlay() {
    const promise = video.play();
    if (promise !== undefined) {
      promise.catch(() => {
        // Autoplay bloqué (Low Power Mode, etc.) → cacher la vidéo, garder le poster
        video.style.display = 'none';
      });
    }
  }

  // Tenter dès le chargement
  if (video.readyState >= 2) {
    tryPlay();
  } else {
    video.addEventListener('canplay', tryPlay, { once: true });
  }

  // iOS — relancer sur premier touch si nécessaire
  document.addEventListener('touchstart', function onFirstTouch() {
    if (video.paused) tryPlay();
    document.removeEventListener('touchstart', onFirstTouch);
  }, { once: true, passive: true });
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

// Support touch pour mobile
hamburger.addEventListener("touchstart", (e) => {
  e.preventDefault();
  hamburger.classList.toggle("active");
  mobile_menu.classList.toggle("active");
}, { passive: false });

// Fermer le menu si on clique en dehors (mobile)
document.addEventListener("touchstart", (e) => {
  if (!hamburger.contains(e.target) && !mobile_menu.contains(e.target)) {
    hamburger.classList.remove("active");
    mobile_menu.classList.remove("active");
  }
}, { passive: true });
