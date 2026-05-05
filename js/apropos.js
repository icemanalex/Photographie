document.addEventListener('DOMContentLoaded', function () {
  var items = document.querySelectorAll('.slide-in');
  if (!items.length) return;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  items.forEach(function (el) { observer.observe(el); });
});
