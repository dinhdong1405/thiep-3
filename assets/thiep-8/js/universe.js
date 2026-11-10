/**
 * THIỆP 8 — Vũ trụ trái tim particle 3D có thể tích & hệ vòng chữ elip 3D
 * Tuân thủ mục 4 & 5 tài liệu đặc tả
 */

class Thiep8Universe {
  constructor(container, config, callbacks = {}) {
    this.container = container;
    this.config = config || {};
    this.callbacks = callbacks; // onZoomComplete

    this.canvas = container.querySelector('.universe-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.hotspotEl = container.querySelector('.heart-hotspot');

    this.isRunning = false;
    this.isZooming = false;
    this.zoomProgress = 0;
    this.zoomStartTime = 0;
    this.rafId = null;
    this.startTime = performance.now();
    this.lastTime = this.startTime;

    // Quality parameters (Mục 4 & 12)
    this.isMobile = window.innerWidth < 600;
    this.heartParticleCount = this.isMobile ? 6500 : 11000;
    this.starCount = this.isMobile ? 220 : 380;
    this.dustCount = this.isMobile ? 800 : 1400;

    // Viewport
    this.width = 0;
    this.height = 0;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Parallax
    this.targetParallaxX = 0;
    this.targetParallaxY = 0;
    this.currentParallaxX = 0;
    this.currentParallaxY = 0;

    // Model data
    this.stars = [];
    this.meteors = [];
    this.heartParticles = [];
    this.orbitDust = [];
    this.orbitRings = [];
    this.orbitThumbnails = [];
    this.photoImages = [];

    this.preloadPhotos();
    this.initListeners();
    this.resize();
    this.createStars();
    this.createVolumetricHeart();
    this.createOrbitSystem();
  }

  preloadPhotos() {
    const photos = this.config.photos || [];
    photos.forEach((p, idx) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = p.src;
      this.photoImages.push({ img, loaded: false });
      img.onload = () => {
        if (this.photoImages[idx]) this.photoImages[idx].loaded = true;
      };
      img.onerror = () => {
        if (this.photoImages[idx]) this.photoImages[idx].loaded = false;
      };
    });
  }

  initListeners() {
    this.handleResize = () => this.resize();
    window.addEventListener('resize', this.handleResize, { passive: true });

    this.handlePointerMove = (e) => {
      if (this.isZooming) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const normX = (clientX / this.width - 0.5) * 2;
      const normY = (clientY / this.height - 0.5) * 2;
      this.targetParallaxX = normX * 7;
      this.targetParallaxY = normY * 5;
    };
    window.addEventListener('mousemove', this.handlePointerMove, { passive: true });
    window.addEventListener('touchmove', this.handlePointerMove, { passive: true });

    // Touch/click anywhere on intro advances to zoom
    this.handleIntroClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.triggerZoom();
    };

    if (this.hotspotEl) {
      this.hotspotEl.addEventListener('click', this.handleIntroClick);
      this.hotspotEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.triggerZoom();
        }
      });
    }

    this.container.addEventListener('click', this.handleIntroClick);

    // Auto advance if configured (7.8s)
    if (this.config.intro && this.config.intro.autoAdvanceMs) {
      this.autoAdvanceTimer = setTimeout(() => {
        if (!this.isZooming && this.isRunning) {
          this.triggerZoom();
        }
      }, this.config.intro.autoAdvanceMs);
    }
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = Math.floor(this.width * this.dpr);
    this.canvas.height = Math.floor(this.height * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  createStars() {
    this.stars = [];
    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: 0.35 + Math.random() * 0.95,
        baseAlpha: 0.2 + Math.random() * 0.65,
        twinkleSpeed: 0.8 + Math.random() * 2.2,
        phase: Math.random() * Math.PI * 2,
        color: Math.random() > 0.8 ? '#e8f0fe' : '#fff5f8'
      });
    }
  }

  /**
   * 3D Volumetric Heart using Taubin formulation:
   * (x^2 + y^2 + 2.25*z^2 - 1)^3 - x^2*y^3 - 0.1125*z^2*y^3 <= 0
   * Provides full lobes, clean cleft, tapered tip, and ZERO center seam!
   */
  createVolumetricHeart() {
    this.heartParticles = [];
    const count = this.heartParticleCount;
    const colors = ['#ff5b91', '#ff3377', '#ff8fa3', '#ffc2d1', '#ffffff', '#ff1a6b'];

    let tries = 0;
    while (this.heartParticles.length < count && tries < count * 8) {
      tries++;
      // Bounding box for Taubin equation
      const x = (Math.random() - 0.5) * 2.3;
      const y = -0.95 + Math.random() * 2.2;
      const z = (Math.random() - 0.5) * 1.35;

      const a = x * x + y * y + 2.25 * z * z - 1;
      const val = a * a * a - x * x * y * y * y - 0.1125 * z * z * y * y * y;

      if (val <= 0) {
        // Points closer to boundary have slightly higher brightness
        const isNearBoundary = val > -0.08;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const baseSize = isNearBoundary ? (1.1 + Math.random() * 1.2) : (0.8 + Math.random() * 0.9);
        const alpha = isNearBoundary ? (0.75 + Math.random() * 0.25) : (0.45 + Math.random() * 0.35);

        this.heartParticles.push({
          baseX: x,
          baseY: y,
          baseZ: z,
          vibePhase: Math.random() * Math.PI * 2,
          vibeSpeed: 3 + Math.random() * 4,
          color: color,
          baseSize: baseSize,
          alpha: alpha,
          isNearBoundary: isNearBoundary
        });
      }
    }
  }

  /**
   * 3D Concentric Orbit System (Mục 5):
   * Occupying y = 52–76%, common center, 68° tilt
   */
  createOrbitSystem() {
    // 1. Dust particles on 5 concentric rings
    this.orbitDust = [];
    const bandRadii = [0.20, 0.26, 0.32, 0.38, 0.44];
    for (let i = 0; i < this.dustCount; i++) {
      const bandIndex = Math.floor(Math.random() * bandRadii.length);
      const r = bandRadii[bandIndex] + (Math.random() - 0.5) * 0.03;
      const angle = Math.random() * Math.PI * 2;
      this.orbitDust.push({
        radiusRatio: r,
        angle: angle,
        speed: (0.06 + (bandIndex % 2 === 0 ? 0.05 : -0.04)) * (0.8 + Math.random() * 0.4),
        size: 0.6 + Math.random() * 1.2,
        color: Math.random() > 0.4 ? '#ff8fa3' : '#ff3377',
        alpha: 0.35 + Math.random() * 0.45
      });
    }

    // 2. Mini Hearts orbiting along rings
    this.miniHearts = [];
    for (let i = 0; i < 18; i++) {
      const band = bandRadii[1 + (i % 3)];
      this.miniHearts.push({
        radiusRatio: band + (Math.random() - 0.5) * 0.02,
        angle: (i / 18) * Math.PI * 2,
        speed: 0.08 * (i % 2 === 0 ? 1 : -0.9),
        size: 3.5 + Math.random() * 3,
        color: i % 3 === 0 ? '#ffb3cb' : '#ff3377'
      });
    }

    // 3. 3D Orbiting Text Rings
    const messages = (this.config.orbitMessages && this.config.orbitMessages.length > 0)
      ? this.config.orbitMessages
      : [
          'Anh yêu em nhiều lắm!',
          'Mãi mãi bên em',
          'Em là cả thế giới của anh',
          'Yêu em mỗi ngày',
          'Cảm ơn em đã đến bên anh'
        ];

    this.orbitRings = [
      { radiusRatio: 0.26, speed: 0.11, text: messages[0], angleOffset: 0 },
      { radiusRatio: 0.33, speed: -0.09, text: messages[1 % messages.length], angleOffset: Math.PI * 0.5 },
      { radiusRatio: 0.39, speed: 0.12, text: messages[2 % messages.length], angleOffset: Math.PI },
      { radiusRatio: 0.44, speed: -0.08, text: messages[3 % messages.length], angleOffset: Math.PI * 1.4 }
    ];

    // 4. Rotating memory fragments near the common center
    this.orbitThumbnails = [];
    const photoCount = Math.min((this.config.photos ? this.config.photos.length : 3), 4);
    for (let i = 0; i < photoCount; i++) {
      this.orbitThumbnails.push({
        photoIndex: i,
        radiusRatio: 0.14,
        angle: (i / photoCount) * Math.PI * 2,
        speed: 0.14,
        width: 30,
        height: 38
      });
    }
  }

  spawnMeteor() {
    if (this.meteors.length >= 2 || Math.random() > 0.025) return;
    this.meteors.push({
      x: this.width * (0.35 + Math.random() * 0.65),
      y: this.height * (Math.random() * 0.28),
      length: 28 + Math.random() * 38,
      speed: 360 + Math.random() * 220,
      angle: Math.PI * 0.72 + (Math.random() - 0.5) * 0.08,
      life: 0,
      maxLife: 0.6 + Math.random() * 0.5
    });
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = performance.now();
    this.lastTime = this.startTime;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  triggerZoom() {
    if (this.isZooming) return;
    this.isZooming = true;
    this.zoomStartTime = performance.now();

    if (this.autoAdvanceTimer) {
      clearTimeout(this.autoAdvanceTimer);
      this.autoAdvanceTimer = null;
    }

    if (this.hotspotEl) this.hotspotEl.style.pointerEvents = 'none';
    this.container.style.pointerEvents = 'none';

    // Blur container slightly
    this.container.classList.add('zooming');

    // Soft pink-white radial flash transition (Mục 6)
    const flashEl = document.querySelector('.thiep-8 .flash-overlay');
    if (flashEl) {
      flashEl.style.opacity = '0';
      flashEl.style.display = 'block';
      setTimeout(() => {
        flashEl.style.opacity = '1';
      }, 700);
      setTimeout(() => {
        flashEl.style.opacity = '0';
      }, 1250);
    }

    setTimeout(() => {
      this.stop();
      if (typeof this.callbacks.onZoomComplete === 'function') {
        this.callbacks.onZoomComplete();
      }
    }, 1400);
  }

  loop() {
    if (!this.isRunning) return;
    const now = performance.now();
    let dt = (now - this.lastTime) / 1000;
    dt = Math.min(dt, 0.05);
    this.lastTime = now;
    const elapsed = (now - this.startTime) / 1000;

    this.currentParallaxX += (this.targetParallaxX - this.currentParallaxX) * 0.08;
    this.currentParallaxY += (this.targetParallaxY - this.currentParallaxY) * 0.08;

    this.render(elapsed, dt);
    this.rafId = requestAnimationFrame(() => this.loop());
  }

  render(elapsed, dt) {
    const ctx = this.ctx;
    const W = this.width;
    const H = this.height;

    ctx.clearRect(0, 0, W, H);

    // Zoom multiplier
    let zoomMultiplier = 1;
    let zoomAlpha = 1;
    if (this.isZooming) {
      const zoomElapsed = (performance.now() - this.zoomStartTime) / 1000;
      this.zoomProgress = Math.min(zoomElapsed / 1.35, 1);
      const easeZoom = Math.pow(this.zoomProgress, 2.6);
      zoomMultiplier = 1 + easeZoom * 5.8;
      if (this.zoomProgress > 0.65) {
        zoomAlpha = Math.max(0, 1 - (this.zoomProgress - 0.65) / 0.35);
      }
    }

    // 1. Stars and meteors
    this.renderStars(elapsed, zoomAlpha);
    this.renderMeteors(dt, zoomAlpha);

    // 2. Coordinated Layout (Mục 4 & 5)
    // Heart center at x = 50%, y = 38.5% H
    const heartCenterX = W * 0.5 + this.currentParallaxX;
    const heartCenterY = H * 0.385 + this.currentParallaxY;
    // Common orbit center at x = 50%, y = 64% H (occupying y = 52–76%)
    const orbitCenterY = H * 0.64 + this.currentParallaxY;

    // Heartbeat pulse (Mục 4: gentle 1.8s pulse)
    const beatPhase = (elapsed % 1.8) / 1.8;
    let heartPulse = 1;
    if (beatPhase < 0.12) {
      heartPulse = 1 + Math.sin((beatPhase / 0.12) * Math.PI) * 0.022;
    } else if (beatPhase > 0.18 && beatPhase < 0.28) {
      heartPulse = 1 + Math.sin(((beatPhase - 0.18) / 0.10) * Math.PI) * 0.012;
    }

    // Target heart width: 68% W on mobile, clamped on desktop
    const targetHeartWidth = Math.min(W * 0.70, 360);
    const heartBaseScale = (targetHeartWidth / 2.26) * heartPulse * zoomMultiplier;

    // 3. Render Orbit System (Back Pass: z < 0)
    this.renderOrbitSystem(elapsed, dt, heartCenterX, orbitCenterY, zoomMultiplier, zoomAlpha, false);

    // 4. Render 3D Volumetric Heart
    this.renderHeart(elapsed, heartCenterX, heartCenterY, heartBaseScale, zoomAlpha);

    // 5. Render Orbit System (Front Pass: z >= 0)
    this.renderOrbitSystem(elapsed, dt, heartCenterX, orbitCenterY, zoomMultiplier, zoomAlpha, true);
  }

  renderStars(elapsed, zoomAlpha) {
    const ctx = this.ctx;
    ctx.save();
    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      const twinkle = Math.sin(elapsed * s.twinkleSpeed + s.phase);
      const alpha = Math.max(0.08, s.baseAlpha + twinkle * 0.25) * zoomAlpha;
      ctx.fillStyle = s.color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  renderMeteors(dt, zoomAlpha) {
    this.spawnMeteor();
    const ctx = this.ctx;
    ctx.save();
    for (let i = this.meteors.length - 1; i >= 0; i--) {
      const m = this.meteors[i];
      m.life += dt;
      if (m.life >= m.maxLife) {
        this.meteors.splice(i, 1);
        continue;
      }
      const progress = m.life / m.maxLife;
      const alpha = Math.sin(progress * Math.PI) * 0.85 * zoomAlpha;
      m.x += Math.cos(m.angle) * m.speed * dt;
      m.y += Math.sin(m.angle) * m.speed * dt;

      const tailX = m.x - Math.cos(m.angle) * m.length;
      const tailY = m.y - Math.sin(m.angle) * m.length;

      const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      grad.addColorStop(0.6, 'rgba(255, 210, 230, 0.4)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0.95)');

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(m.x, m.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  renderHeart(elapsed, centerX, centerY, scaleFactor, zoomAlpha) {
    const ctx = this.ctx;
    const count = this.heartParticles.length;
    // Reveal over first 1.8s
    const revealRatio = Math.min(elapsed / 1.8, 1);
    const visibleCount = Math.floor(count * revealRatio);

    // Gentle 3D rotation: sway back and forth around vertical Y axis +-7°, tilt +-2° (Mục 4)
    const rotY = Math.sin(elapsed * 0.65) * 0.12;
    const rotX = Math.cos(elapsed * 0.45) * 0.035;

    const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

    const cameraDistance = 3.6;
    const focalLength = 3.2;

    ctx.save();

    for (let i = 0; i < visibleCount; i++) {
      const p = this.heartParticles[i];

      // Subtle vibration
      const vibe = Math.sin(elapsed * p.vibeSpeed + p.vibePhase) * 0.015;
      const bx = p.baseX + vibe;
      const by = p.baseY + vibe;
      const bz = p.baseZ;

      // 3D rotation
      const x1 = bx * cosY + bz * sinY;
      const z1 = -bx * sinY + bz * cosY;
      const y1 = by * cosX - z1 * sinX;
      const z2 = by * sinX + z1 * cosX;

      const depth = cameraDistance - z2;
      if (depth <= 0.2) continue;

      const projScale = focalLength / depth;
      const sx = centerX + x1 * scaleFactor * projScale;
      // Invert Y because canvas Y goes downwards
      const sy = centerY - y1 * scaleFactor * projScale;

      // Depth shading: front particles are brighter & crisper
      const depthFactor = (z2 + 0.67) / 1.34; // 0 (far) to 1 (near)
      const particleRadius = Math.max(0.55, p.baseSize * (0.8 + depthFactor * 0.5));
      const particleAlpha = Math.min(1, Math.max(0.2, (p.alpha * (0.6 + depthFactor * 0.45)) * zoomAlpha));

      ctx.fillStyle = p.color;
      ctx.globalAlpha = particleAlpha;
      ctx.beginPath();
      ctx.arc(sx, sy, particleRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  renderOrbitSystem(elapsed, dt, centerX, centerY, zoomMultiplier, zoomAlpha, isFrontPass) {
    const ctx = this.ctx;
    const stageW = Math.min(this.width, 480);
    // Tilt angle 68 degrees (cos(68°) ~ 0.37)
    const tiltCos = 0.37;
    const cameraDist = 480;

    ctx.save();

    // 1. Dust Particles
    for (let i = 0; i < this.orbitDust.length; i++) {
      const d = this.orbitDust[i];
      d.angle += d.speed * dt;

      const r = d.radiusRatio * (stageW * 2.0) * zoomMultiplier;
      const ox = r * Math.cos(d.angle);
      const oz = r * Math.sin(d.angle); // z > 0 is front, z < 0 is back

      if ((isFrontPass && oz < 0) || (!isFrontPass && oz >= 0)) continue;

      const depth = cameraDist - oz;
      const pScale = 450 / depth;
      const sx = centerX + ox * pScale;
      const sy = centerY + (oz * tiltCos) * pScale;

      const isFront = oz > 0;
      const alpha = (isFront ? 0.75 : 0.32) * d.alpha * zoomAlpha;

      ctx.fillStyle = d.color;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(sx, sy, d.size * (isFront ? 1.1 : 0.75), 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Mini Hearts
    for (let i = 0; i < this.miniHearts.length; i++) {
      const mh = this.miniHearts[i];
      mh.angle += mh.speed * dt;

      const r = mh.radiusRatio * (stageW * 2.0) * zoomMultiplier;
      const ox = r * Math.cos(mh.angle);
      const oz = r * Math.sin(mh.angle);

      if ((isFrontPass && oz < 0) || (!isFrontPass && oz >= 0)) continue;

      const depth = cameraDist - oz;
      const pScale = 450 / depth;
      const sx = centerX + ox * pScale;
      const sy = centerY + (oz * tiltCos) * pScale;

      const isFront = oz > 0;
      const hScale = (isFront ? 1.1 : 0.7) * (mh.size / 6) * pScale;
      const hAlpha = (isFront ? 0.85 : 0.35) * zoomAlpha;

      ctx.fillStyle = mh.color;
      ctx.globalAlpha = hAlpha;
      this.drawMiniHeart(ctx, sx, sy, hScale);
    }

    // 3. Central Memory Photo Fragments
    for (let i = 0; i < this.orbitThumbnails.length; i++) {
      const tb = this.orbitThumbnails[i];
      tb.angle += tb.speed * dt;

      const r = tb.radiusRatio * (stageW * 2.0) * zoomMultiplier;
      const ox = r * Math.cos(tb.angle);
      const oz = r * Math.sin(tb.angle);

      if ((isFrontPass && oz < 0) || (!isFrontPass && oz >= 0)) continue;

      const depth = cameraDist - oz;
      const pScale = 450 / depth;
      const sx = centerX + ox * pScale;
      const sy = centerY + (oz * tiltCos) * pScale;

      const photoObj = this.photoImages[tb.photoIndex % this.photoImages.length];
      if (photoObj && photoObj.loaded && photoObj.img) {
        const isFront = oz > 0;
        const w = tb.width * pScale * (isFront ? 1.05 : 0.75);
        const h = tb.height * pScale * (isFront ? 1.05 : 0.75);
        const alpha = (isFront ? 0.95 : 0.45) * zoomAlpha;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(sx, sy);
        ctx.beginPath();
        ctx.roundRect(-w / 2, -h / 2, w, h, 4);
        ctx.clip();
        ctx.drawImage(photoObj.img, -w / 2, -h / 2, w, h);
        ctx.restore();

        // Delicate white/pink border with sparkle
        ctx.strokeStyle = isFront ? '#ffeef5' : '#ff7597';
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.roundRect(sx - w / 2, sy - h / 2, w, h, 4);
        ctx.stroke();

        // Warm sparkling point
        ctx.fillStyle = '#fff9d6';
        ctx.globalAlpha = (0.7 + Math.sin(elapsed * 4 + i) * 0.3) * zoomAlpha;
        ctx.beginPath();
        ctx.arc(sx + w * 0.4, sy - h * 0.4, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 4. 3D Orbiting Text Strings (Mục 5)
    for (let i = 0; i < this.orbitRings.length; i++) {
      const ring = this.orbitRings[i];
      ring.angleOffset += ring.speed * dt;
      const r = ring.radiusRatio * (stageW * 2.0) * zoomMultiplier;

      // Repeat sentence 2–3 times per ring
      const repeats = 2;
      for (let s = 0; s < repeats; s++) {
        const segAngle = ring.angleOffset + (s / repeats) * Math.PI * 2;
        const ox = r * Math.cos(segAngle);
        const oz = r * Math.sin(segAngle);

        if ((isFrontPass && oz < 0) || (!isFrontPass && oz >= 0)) continue;

        const depth = cameraDist - oz;
        const pScale = 450 / depth;
        const sx = centerX + ox * pScale;
        const sy = centerY + (oz * tiltCos) * pScale;

        const isFront = oz > 0;
        // Front text is larger, crisper, brighter; back is smaller, faded (Mục 5)
        const fontSize = Math.round((isFront ? 11.5 : 7.5) * pScale);
        const fontAlpha = (isFront ? 0.88 : 0.28) * zoomAlpha;

        ctx.font = `italic 500 ${fontSize}px 'Dancing Script', cursive, serif`;
        ctx.fillStyle = isFront ? '#ffffff' : '#ffb3cb';
        ctx.globalAlpha = fontAlpha;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ring.text, sx, sy);
      }
    }

    ctx.restore();
  }

  drawMiniHeart(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    const s = size;
    ctx.moveTo(0, s * 0.3);
    ctx.bezierCurveTo(-s * 0.5, -s * 0.3, -s, s * 0.2, 0, s);
    ctx.bezierCurveTo(s, s * 0.2, s * 0.5, -s * 0.3, 0, s * 0.3);
    ctx.fill();
    ctx.restore();
  }

  destroy() {
    this.stop();
    if (this.autoAdvanceTimer) clearTimeout(this.autoAdvanceTimer);
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handlePointerMove);
    window.removeEventListener('touchmove', this.handlePointerMove);
    if (this.hotspotEl && this.handleIntroClick) {
      this.hotspotEl.removeEventListener('click', this.handleIntroClick);
    }
    this.container.removeEventListener('click', this.handleIntroClick);
  }
}

if (typeof window !== 'undefined') {
  window.Thiep8Universe = Thiep8Universe;
}
