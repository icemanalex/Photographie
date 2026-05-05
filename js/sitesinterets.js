document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.slide-in');
  if (!items.length) return;

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function() {
          entry.target.classList.add('visible');
        }, i * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(function(item) {
    observer.observe(item);
  });
});
