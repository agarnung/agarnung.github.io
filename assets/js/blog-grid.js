// Dynamic column count + overflow marquee for blog post cards
(function () {
  const STORAGE_KEY = 'blog-grid-cols';
  const DEFAULT_COLS = 2;
  const MIN_COLS = 1;
  const MAX_COLS = 4;
  const MARQUEE_PX_PER_SEC = 36;

  function clamp(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return DEFAULT_COLS;
    return Math.min(MAX_COLS, Math.max(MIN_COLS, n));
  }

  function prefersReducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function unwrapMarquee(el) {
    if (!el || !el.classList.contains('post-card-marquee')) return;
    const textEl = el.querySelector('.post-card-marquee-text');
    const content = (textEl ? textEl.textContent : el.textContent || '').trim();
    const parent = el.parentNode;
    if (!parent) return;
    const span = document.createElement('span');
    span.className = 'js-card-marquee';
    span.textContent = content;
    parent.replaceChild(span, el);
  }

  function setupMarquee(span) {
    if (!span || !span.classList.contains('js-card-marquee')) return;
    if (span.classList.contains('post-card-marquee')) return;

    const parent = span.parentElement;
    if (!parent) return;

    span.style.whiteSpace = 'nowrap';
    const overflows = span.scrollWidth > parent.clientWidth + 1;
    const scrollW = span.scrollWidth;
    span.style.whiteSpace = '';

    if (!overflows || prefersReducedMotion()) return;

    const text = span.textContent.trim();
    if (!text) return;

    const duration = Math.max(6, scrollW / MARQUEE_PX_PER_SEC);

    const track = document.createElement('span');
    track.className = 'post-card-marquee-track';

    const a = document.createElement('span');
    a.className = 'post-card-marquee-text';
    a.textContent = text;

    const b = document.createElement('span');
    b.className = 'post-card-marquee-text';
    b.setAttribute('aria-hidden', 'true');
    b.textContent = text;

    track.appendChild(a);
    track.appendChild(b);

    span.classList.add('post-card-marquee', 'is-scrolling');
    span.setAttribute('title', text);
    span.style.setProperty('--marquee-duration', duration.toFixed(1) + 's');
    span.replaceChildren(track);
  }

  function refreshMarquees() {
    const grid = document.getElementById('blog-posts-grid');
    if (!grid) return;

    grid.querySelectorAll('.post-card-marquee').forEach(unwrapMarquee);

    grid.querySelectorAll('.card-title, .post-card-desc').forEach(function (host) {
      let span = host.querySelector(':scope > .js-card-marquee');
      if (!span) {
        span = document.createElement('span');
        span.className = 'js-card-marquee';
        span.textContent = host.textContent.trim();
        host.replaceChildren(span);
      }
      setupMarquee(span);
    });
  }

  function applyCols(cols) {
    const grid = document.getElementById('blog-posts-grid');
    if (!grid) return;
    grid.style.setProperty('--blog-cols', String(cols));
    grid.dataset.cols = String(cols);

    document.querySelectorAll('[data-blog-cols]').forEach(function (btn) {
      const active = parseInt(btn.getAttribute('data-blog-cols'), 10) === cols;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    requestAnimationFrame(function () {
      requestAnimationFrame(refreshMarquees);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('blog-posts-grid');
    if (!grid) return;

    let cols = clamp(localStorage.getItem(STORAGE_KEY) || DEFAULT_COLS);
    applyCols(cols);

    document.querySelectorAll('[data-blog-cols]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        cols = clamp(btn.getAttribute('data-blog-cols'));
        localStorage.setItem(STORAGE_KEY, String(cols));
        applyCols(cols);
      });
    });

    window.addEventListener('resize', function () {
      clearTimeout(window.__blogMarqueeResize);
      window.__blogMarqueeResize = setTimeout(refreshMarquees, 150);
    });
  });
})();
