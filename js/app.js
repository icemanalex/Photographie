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
