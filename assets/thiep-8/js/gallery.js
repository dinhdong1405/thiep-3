/**
 * THIỆP 8 — Tim nền phát sáng & Ảnh kỷ niệm bay tuần hoàn
 * Tuân thủ mục 10 tài liệu đặc tả
 */

class Thiep8Gallery {
  constructor(container, config, callbacks = {}) {
    this.container = container;
    this.config = config || {};
    this.callbacks = callbacks; // onGalleryComplete

    this.galleryContainer = container.querySelector('.gallery-container');
    this.heartsLayer = container.querySelector('.floating-hearts-layer');

    this.isRunning = false;
    this.galleryTimer = null;
    this.spawnIntervalTimer = null;
    this.activeCards = [];
    this.spawnCount = 0;

    this.initBackgroundHearts();
  }

  /**
   * Pre-populated background floating hearts with glowing halo (Mục 10)
   * Staggered initial vertical positions so the screen is immediately populated!
   */
  initBackgroundHearts() {
    if (!this.heartsLayer) return;
    this.heartsLayer.innerHTML = '';

    const heartColors = ['#ffffff', '#ffe0eb', '#ff9dbc', '#ff4d92', '#ff0068', '#d50065'];
    const heartCount = window.innerWidth < 600 ? 16 : 22;

    for (let i = 0; i < heartCount; i++) {
      const el = document.createElement('div');
      el.className = 'bg-heart';
      el.innerHTML = '♥';

      const size = 13 + Math.random() * 24; // 13px to 37px
      const left = 3 + Math.random() * 92; // 3% to 95%
      const duration = 7 + Math.random() * 6; // 7s to 13s
      // Negative animation delay pre-populates hearts across the vertical screen!
      const initialDelay = -Math.random() * duration;
      const driftX = (Math.random() - 0.5) * 40;
      const rot = (Math.random() - 0.5) * 45;
      const color = heartColors[Math.floor(Math.random() * heartColors.length)];

      el.style.fontSize = `${size}px`;
      el.style.left = `${left}%`;
      el.style.color = color;
      el.style.animationDuration = `${duration}s`;
      el.style.animationDelay = `${initialDelay}s`;
      el.style.setProperty('--drift-x', `${driftX}px`);
      el.style.setProperty('--rot', `${rot}deg`);

      this.heartsLayer.appendChild(el);
    }
  }

  /**
   * Start Floating Memory Photos Gallery Sequence (Mục 10)
   * 2–3 photos visible simultaneously, alternating left and right lanes, cycling smoothly
   */
  start() {
    this.stop();
    this.isRunning = true;
    this.spawnCount = 0;

    const photos = this.config.photos || [];
    if (photos.length === 0) {
      this.scheduleCompletion(6000);
      return;
    }

    // Spawn first photo after 350ms
    setTimeout(() => {
      if (this.isRunning) this.spawnNextPhoto();
    }, 350);

    // Continuous spawn interval ~1.9s
    this.spawnIntervalTimer = setInterval(() => {
      if (this.isRunning) {
        this.spawnNextPhoto();
      }
    }, 1900);

    // Total gallery duration before envelope returns (~12s - Mục 10)
    const galleryDuration = (this.config.gallery && this.config.gallery.durationMs) || 12000;
    this.scheduleCompletion(galleryDuration);
  }

  spawnNextPhoto() {
    const photos = this.config.photos || [];
    if (photos.length === 0) return;

    const photoData = photos[this.spawnCount % photos.length];
    // Alternating lanes: left (~27% W), right (~73% W), center-offset
    const isLeft = (this.spawnCount % 2 === 0);
    const xRatio = isLeft ? 0.27 : 0.73;
    const tiltAngle = isLeft ? -4.5 : 5.0;

    this.spawnFloatingCard(photoData, xRatio, tiltAngle);
    this.spawnCount++;
  }

  spawnFloatingCard(photoData, xRatio, tiltAngle) {
    if (!this.galleryContainer) return;

    const card = document.createElement('div');
    card.className = 'floating-memory-card';

    const img = document.createElement('img');
    img.className = 'floating-memory-img';
    img.src = photoData.src;
    img.alt = photoData.alt || 'Ảnh người nhận';
    if (photoData.objectPosition) {
      img.style.objectPosition = photoData.objectPosition;
    }
    card.appendChild(img);

    this.galleryContainer.appendChild(card);
    this.activeCards.push(card);

    const W = this.container.clientWidth || window.innerWidth;
    const H = this.container.clientHeight || window.innerHeight;

    const cardWidth = Math.min(Math.max(W * 0.40, 135), 170);
    const cardHeight = cardWidth * 1.15;
    const posX = W * xRatio - cardWidth / 2;

    const startY = H + 25;
    const endY = -cardHeight - 45;
    const duration = 4600; // 4.6 seconds smooth vertical float

    const swayX = (Math.random() - 0.5) * 20;

    // WAAPI for hardware-accelerated 60fps
    const animation = card.animate([
      {
        transform: `translate3d(${posX}px, ${startY}px, 0) rotate(${tiltAngle * 0.7}deg) scale(0.92)`,
        opacity: 0
      },
      {
        offset: 0.12,
        opacity: 1
      },
      {
        offset: 0.5,
        transform: `translate3d(${posX + swayX}px, ${startY * 0.5 + endY * 0.5}px, 0) rotate(${tiltAngle}deg) scale(1.02)`
      },
      {
        offset: 0.88,
        opacity: 1
      },
      {
        transform: `translate3d(${posX}px, ${endY}px, 0) rotate(${tiltAngle * 1.1}deg) scale(0.95)`,
        opacity: 0
      }
    ], {
      duration: duration,
      easing: 'cubic-bezier(.25, .46, .45, .94)',
      fill: 'forwards'
    });

    animation.onfinish = () => {
      if (card.parentNode) {
        card.parentNode.removeChild(card);
      }
      const idx = this.activeCards.indexOf(card);
      if (idx !== -1) this.activeCards.splice(idx, 1);
    };
  }

  scheduleCompletion(delayMs) {
    this.galleryTimer = setTimeout(() => {
      if (!this.isRunning) return;
      this.stop();
      if (typeof this.callbacks.onGalleryComplete === 'function') {
        this.callbacks.onGalleryComplete();
      }
    }, delayMs);
  }

  stop() {
    this.isRunning = false;
    if (this.galleryTimer) {
      clearTimeout(this.galleryTimer);
      this.galleryTimer = null;
    }
    if (this.spawnIntervalTimer) {
      clearInterval(this.spawnIntervalTimer);
      this.spawnIntervalTimer = null;
    }

    this.activeCards.forEach(card => {
      if (card.parentNode) card.parentNode.removeChild(card);
    });
    this.activeCards = [];
  }

  destroy() {
    this.stop();
  }
}

if (typeof window !== 'undefined') {
  window.Thiep8Gallery = Thiep8Gallery;
}
