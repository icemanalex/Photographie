document.addEventListener('DOMContentLoaded', function () {
  var allItems = document.querySelectorAll('.reveal-up, .reveal-card');
  if (!allItems.length) return;

  // Stagger hero elements
  var heroItems = document.querySelectorAll('.contact-header .reveal-up');
  heroItems.forEach(function(el, i) {
    el.style.transitionDelay = (i * 0.13) + 's';
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Cards with stagger
  var cards = document.querySelectorAll('.reveal-card');
  var cardObserver = new IntersectionObserver(function (entries) {
    var visible = [];
    entries.forEach(function(entry) {
      if (entry.isIntersecting) visible.push(entry.target);
    });
    visible.forEach(function(el, i) {
      setTimeout(function() { el.classList.add('visible'); }, i * 120);
      cardObserver.unobserve(el);
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-up').forEach(function(el) { observer.observe(el); });
  cards.forEach(function(el) { cardObserver.observe(el); });
});
