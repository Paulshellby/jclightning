document.addEventListener('DOMContentLoaded', () => {
  const galleries = [...document.querySelectorAll('.product-photo-gallery')];
  if (!galleries.length) return;

  const images = galleries.flatMap(gallery => [...gallery.querySelectorAll('img')]);
  images.forEach((image, index) => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `${image.alt}. View larger image`);
    image.addEventListener('click', () => open(index));
    image.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(index);
      }
    });
  });

  const lightbox = document.createElement('div');
  lightbox.className = 'pg-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Expanded product image');
  lightbox.innerHTML = `
    <button class="pg-close" type="button" aria-label="Close image viewer">×</button>
    <button class="pg-nav pg-prev" type="button" aria-label="Previous image">‹</button>
    <img class="pg-lightbox-image" alt="">
    <button class="pg-nav pg-next" type="button" aria-label="Next image">›</button>
    <p class="pg-count" aria-live="polite"></p>`;
  document.body.append(lightbox);

  const preview = lightbox.querySelector('.pg-lightbox-image');
  const count = lightbox.querySelector('.pg-count');
  let activeIndex = 0;
  let lastFocused = null;

  function render() {
    const image = images[activeIndex];
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt;
    count.textContent = `${activeIndex + 1} / ${images.length}`;
  }

  function open(index) {
    activeIndex = index;
    lastFocused = document.activeElement;
    render();
    lightbox.classList.add('is-open');
    document.body.classList.add('pg-no-scroll');
    lightbox.querySelector('.pg-close').focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('pg-no-scroll');
    preview.removeAttribute('src');
    lastFocused?.focus();
  }

  function move(step) {
    activeIndex = (activeIndex + step + images.length) % images.length;
    render();
  }

  lightbox.querySelector('.pg-close').addEventListener('click', close);
  lightbox.querySelector('.pg-prev').addEventListener('click', () => move(-1));
  lightbox.querySelector('.pg-next').addEventListener('click', () => move(1));
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) close();
  });
  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') move(-1);
    if (event.key === 'ArrowRight') move(1);
  });
});
