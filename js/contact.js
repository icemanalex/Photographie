document.addEventListener('DOMContentLoaded', function () {

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.anim-up, .anim-card').forEach(function (el) {
    observer.observe(el);
  });
});
