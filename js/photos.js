(function () {
  var track = document.getElementById('slidesTrack');
  var slides = document.querySelectorAll('.slide');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var playBtn = document.getElementById('playBtn');
  var dotsNav = document.getElementById('dotsNav');
  var thumbsWrap = document.getElementById('thumbnails');
  var currentEl = document.getElementById('currentSlide');
  var progressFill = document.getElementById('progressFill');

  var total = slides.length;
  var current = 0;
  var isPlaying = true;
  var autoplayDelay = 4500;
  var autoplayTimer = null;
  var progressTimer = null;

  // Construire dots et vignettes
  slides.forEach(function (slide, i) {
    // Dot
    var dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Photo ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); resetAutoplay(); });
    dotsNav.appendChild(dot);

    // Vignette
    var thumb = document.createElement('div');
    thumb.className = 'thumb' + (i === 0 ? ' active' : '');
    var img = document.createElement('img');
    img.src = slide.querySelector('img').src;
    img.alt = slide.querySelector('img').alt;
    thumb.appendChild(img);
    thumb.addEventListener('click', function () { goTo(i); resetAutoplay(); });
    thumbsWrap.appendChild(thumb);
  });

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function goTo(index) {
    slides[current].classList.remove('active');
    document.querySelectorAll('.dot')[current].classList.remove('active');
    document.querySelectorAll('.thumb')[current].classList.remove('active');

    current = (index + total) % total;

    slides[current].classList.add('active');
    document.querySelectorAll('.dot')[current].classList.add('active');
    document.querySelectorAll('.thumb')[current].classList.add('active');

    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    currentEl.textContent = pad(current + 1);

    // Scroll vignette active visible
    var activeThumb = document.querySelectorAll('.thumb')[current];
    if (activeThumb) activeThumb.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }

  function startProgress() {
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
    setTimeout(function () {
      progressFill.style.transition = 'width ' + autoplayDelay + 'ms linear';
      progressFill.style.width = '100%';
    }, 30);
  }

  function startAutoplay() {
    clearInterval(autoplayTimer);
    startProgress();
    autoplayTimer = setInterval(function () {
      goTo(current + 1);
      startProgress();
    }, autoplayDelay);
  }

  function stopAutoplay() {
    clearInterval(autoplayTimer);
    progressFill.style.transition = 'none';
    progressFill.style.width = '0%';
  }

  function resetAutoplay() {
    if (isPlaying) { stopAutoplay(); startAutoplay(); }
  }

  // Init première slide
  slides[0].classList.add('active');

  // Flèches
  prevBtn.addEventListener('click', function () { goTo(current - 1); resetAutoplay(); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); resetAutoplay(); });

  // Pause/Play
  playBtn.addEventListener('click', function () {
    isPlaying = !isPlaying;
    playBtn.querySelector('i').className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    isPlaying ? startAutoplay() : stopAutoplay();
  });

  // Clavier
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { goTo(current - 1); resetAutoplay(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetAutoplay(); }
    if (e.key === ' ') { playBtn.click(); }
  });

  // Touch / Swipe
  var touchStartX = 0;
  var touchEndX = 0;
  var sliderEl = document.getElementById('slider');

  sliderEl.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderEl.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    var diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      resetAutoplay();
    }
  }, { passive: true });

  // Drag souris
  var isDragging = false;
  var dragStartX = 0;

  sliderEl.addEventListener('mousedown', function (e) {
    isDragging = true;
    dragStartX = e.clientX;
  });
  sliderEl.addEventListener('mouseup', function (e) {
    if (!isDragging) return;
    isDragging = false;
    var diff = dragStartX - e.clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goTo(current + 1) : goTo(current - 1);
      resetAutoplay();
    }
  });
  sliderEl.addEventListener('mouseleave', function () { isDragging = false; });

  // Pause au hover
  sliderEl.addEventListener('mouseenter', function () { if (isPlaying) stopAutoplay(); });
  sliderEl.addEventListener('mouseleave', function () { if (isPlaying) startAutoplay(); });

  // Lancer
  startAutoplay();
})();
