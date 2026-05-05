document.addEventListener('DOMContentLoaded', function () {

  var items = document.querySelectorAll('.faq-item');
  var toggleAllBtn = document.getElementById('toggleAll');
  var allOpen = false;

  // Accordion toggle
  items.forEach(function (item) {
    var btn = item.querySelector('.faq-toggle');
    btn.addEventListener('click', function () {
      var isActive = item.classList.contains('active');
      // Fermer tous les autres
      items.forEach(function (other) {
        if (other !== item) other.classList.remove('active');
      });
      item.classList.toggle('active', !isActive);
      updateToggleAllBtn();
    });
  });

  // Bouton tout ouvrir / tout fermer
  if (toggleAllBtn) {
    toggleAllBtn.addEventListener('click', function () {
      allOpen = !allOpen;
      items.forEach(function (item) {
        item.classList.toggle('active', allOpen);
      });
      toggleAllBtn.innerHTML = allOpen
        ? 'Tout fermer <i class="fas fa-chevron-down"></i>'
        : 'Tout ouvrir <i class="fas fa-chevron-down"></i>';
      toggleAllBtn.classList.toggle('open', allOpen);
    });
  }

  function updateToggleAllBtn() {
    if (!toggleAllBtn) return;
    var openCount = document.querySelectorAll('.faq-item.active').length;
    allOpen = openCount === items.length;
    toggleAllBtn.innerHTML = allOpen
      ? 'Tout fermer <i class="fas fa-chevron-down"></i>'
      : 'Tout ouvrir <i class="fas fa-chevron-down"></i>';
    toggleAllBtn.classList.toggle('open', allOpen);
  }

  // Animation d'entrée au scroll
  var slideItems = document.querySelectorAll('.slide-in');
  if (!slideItems.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  slideItems.forEach(function (el) { observer.observe(el); });
});
