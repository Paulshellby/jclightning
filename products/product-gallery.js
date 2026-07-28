document.addEventListener('DOMContentLoaded', () => {
  initProductMotion();
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

function initProductMotion() {
  const wraps = [...document.querySelectorAll('.pa-wrap')];
  if (!wraps.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const path = window.location.pathname.toLowerCase();
  const groups = {
    water: ['solar-pool-float-light'],
    industrial: ['ufo-high-bay-light', 'ac-led-floodlight'],
    road: ['all-in-one-solar-street-light', 'split-solar-street-light', 'ac-street-light', 'solar-flag-pole-light'],
    security: ['solar-motion-flood-light', 'solar-flood-security-light', 'pir-motion-sensor-wall-light', 'solar-bug-zapper-light'],
    garden: ['solar-garden-', 'solar-courtyard-column-light', 'solar-deck-step-light', 'solar-flame-torch-light'],
    decorative: ['outdoor-wall-lantern', 'solar-umbrella-light', 'solar-edison-string', 'solar-fairy-copper', 'solar-string-'],
    portable: ['solar-home-lighting-kit', 'solar-indoor-wall-light', 'solar-portable', 'solar-power-bank', 'emergency-', 'solar-emergency', 'solar-ceiling-fan']
  };
  const group = Object.keys(groups).find(key => groups[key].some(slug => path.includes(slug))) || 'garden';
  const supportsPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  wraps.forEach(wrap => {
    const stage = wrap.querySelector('.pa-stage');
    if (!stage) return;
    wrap.classList.add('pm-ready', `pm-${group}`);
    stage.tabIndex = 0;
    stage.setAttribute('role', 'button');
    stage.setAttribute('aria-label', 'Play product interaction');

    const fx = document.createElement('div');
    fx.className = 'pm-fx';
    fx.setAttribute('aria-hidden', 'true');
    fx.innerHTML = '<span class="pm-aura"></span><span class="pm-scan"></span><span class="pm-ripple"></span><span class="pm-spark"></span>';
    stage.prepend(fx);

    const pulse = () => {
      wrap.classList.remove('pm-pulse');
      requestAnimationFrame(() => wrap.classList.add('pm-pulse'));
      window.setTimeout(() => wrap.classList.remove('pm-pulse'), 850);
    };
    stage.addEventListener('click', pulse);
    stage.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        pulse();
      }
    });

    if (!supportsPointer) return;
    stage.addEventListener('pointermove', event => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      stage.style.transform = `perspective(1100px) rotateX(${-y * 3}deg) rotateY(${x * 4}deg) translateZ(0)`;
    });
    stage.addEventListener('pointerleave', () => { stage.style.transform = ''; });
  });
}
