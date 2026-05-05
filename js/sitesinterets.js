document.addEventListener('DOMContentLoaded', function () {

  // Stagger delays pour les éléments reveal-up du hero
  var heroItems = document.querySelectorAll('.si-hero-content .reveal-up');
  heroItems.forEach(function(el, i) {
    el.style.transitionDelay = (i * 0.12) + 's';
  });

  // IntersectionObserver pour tous les éléments animés
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // Observer les éléments du hero
  document.querySelectorAll('.reveal-up').forEach(function(el) {
    observer.observe(el);
  });

  // Observer les cartes avec délai cascadé
  var cards = document.querySelectorAll('.reveal-card');
  var cardObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, 80);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  cards.forEach(function(card) {
    cardObserver.observe(card);
  });

  // Compteur animé pour les stats
  function animateCounter(el, target) {
    var start = 0;
    var duration = 1200;
    var step = target / (duration / 16);
    var current = 0;
    var timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(current);
    }, 16);
  }

  var statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        document.querySelectorAll('.si-stat-n').forEach(function(el) {
          var val = parseInt(el.textContent);
          el.textContent = '0';
          animateCounter(el, val);
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  var statsEl = document.querySelector('.si-stats');
  if (statsEl) statsObserver.observe(statsEl);

});
