/**
 * THIỆP 8 — Phong thư trắng, rút thiệp dọc, xoay 42°, mở gáy sách 3D và bảng đọc thư
 * Tuân thủ mục 7 & 8 tài liệu đặc tả
 */

class Thiep8Letter {
  constructor(container, config, callbacks = {}) {
    this.container = container;
    this.config = config || {};
    this.callbacks = callbacks; // onLetterClosed, onOpeningComplete

    // DOM Elements
    this.envelopeWorld = container.querySelector('.envelope-world');
    this.envelopeStage = container.querySelector('.envelope-stage');
    this.envelopeContainer = container.querySelector('.envelope-container');
    this.envelopeFlap = container.querySelector('.envelope-flap-top');
    this.waxSeal = container.querySelector('.wax-seal');
    this.cardAssembly = container.querySelector('.card-book-assembly');
    this.cardLeafLeft = container.querySelector('.card-leaf-left');
    this.envelopeHint = container.querySelector('.envelope-hint');

    // Reading Modal DOM
    this.readingBackdrop = container.querySelector('.reading-backdrop');
    this.readingPanel = container.querySelector('.reading-panel');
    this.btnClose = container.querySelector('.btn-close-letter');
    this.ghostMsgEl = container.querySelector('.ghost-message');
    this.typedMsgEl = container.querySelector('.typed-message');

    this.isOpen = false;
    this.isOpening = false;
    this.isReading = false;
    this.typewriterActive = false;
    this.typewriterTimer = null;
    this.typewriterIndex = 0;
    this.graphemes = [];
    this.currentGeneration = 0;

    this.initGraphemes();
    this.bindEvents();
  }

  initGraphemes() {
    const text = this.config.message || '';
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter('vi', { granularity: 'grapheme' });
      this.graphemes = Array.from(segmenter.segment(text), s => s.segment);
    } else {
      this.graphemes = Array.from(text);
    }
  }

  bindEvents() {
    this.handleEnvelopeTrigger = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!this.isOpen && !this.isOpening) {
        this.openLetter();
      }
    };

    if (this.envelopeContainer) {
      this.envelopeContainer.addEventListener('click', this.handleEnvelopeTrigger);
      this.envelopeContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openLetter();
        }
      });
    }

    if (this.waxSeal) {
      this.waxSeal.addEventListener('click', this.handleEnvelopeTrigger);
    }

    // Modal close button
    if (this.btnClose) {
      this.btnClose.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeLetter();
      });
    }

    // Modal backdrop click
    if (this.readingBackdrop) {
      this.readingBackdrop.addEventListener('click', (e) => {
        if (e.target === this.readingBackdrop) {
          e.preventDefault();
          this.closeLetter();
        }
      });
    }

    // Escape key trap
    this.handleKeyDown = (e) => {
      if (this.isReading && e.key === 'Escape') {
        e.preventDefault();
        this.closeLetter();
      }
    };
    window.addEventListener('keydown', this.handleKeyDown);
  }

  showEnvelopeScene() {
    if (this.envelopeWorld) {
      this.envelopeWorld.classList.add('active');
    }
  }

  resetToClosedState() {
    this.isOpen = false;
    this.isOpening = false;
    this.isReading = false;
    this.abortTypewriter();

    if (this.envelopeContainer) {
      this.envelopeContainer.classList.remove('flap-open');
    }
    if (this.envelopeFlap) {
      this.envelopeFlap.style.transform = 'rotateX(0deg)';
      this.envelopeFlap.style.zIndex = '8';
    }
    if (this.waxSeal) {
      this.waxSeal.classList.remove('broken');
    }
    if (this.cardAssembly) {
      this.cardAssembly.style.transition = 'none';
      this.cardAssembly.style.transform = 'translateY(0) rotate(0deg) scale(1)';
    }
    if (this.cardLeafLeft) {
      this.cardLeafLeft.style.transition = 'none';
      this.cardLeafLeft.style.transform = 'rotateY(0deg)';
    }
    if (this.readingBackdrop) {
      this.readingBackdrop.classList.remove('active');
    }
    if (this.readingPanel) {
      this.readingPanel.classList.remove('active');
    }
    if (this.envelopeStage) {
      this.envelopeStage.classList.remove('hidden-during-gallery');
    }
    if (this.envelopeHint) {
      this.envelopeHint.style.opacity = '1';
    }
  }

  /**
   * Coordinated 3D Vertical Card Opening Sequence (Mục 7):
   * 1. Nắp lật ra sau
   * 2. Thiệp trượt lên khỏi túi
   * 3. Thiệp xoay qua góc nghiêng lớn ~42°
   * 4. Thiệp tiến lên trước và mở như bìa sách theo bản lề dọc
   * 5. Hiện mặt trong (ảnh trái, lời nhắn phải)
   * 6. Chuyển sang bảng thư phẳng để đọc
   */
  openLetter() {
    if (this.isOpening || this.isOpen) return;
    this.isOpening = true;
    this.currentGeneration++;
    const gen = this.currentGeneration;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Wax seal breaks, hint fades
    if (this.waxSeal) {
      this.waxSeal.classList.add('broken');
    }
    if (this.envelopeHint) {
      this.envelopeHint.style.opacity = '0';
    }

    if (isReduced) {
      setTimeout(() => {
        if (gen !== this.currentGeneration) return;
        if (this.envelopeFlap) {
          this.envelopeFlap.style.transform = 'rotateX(-175deg)';
          this.envelopeFlap.style.zIndex = '1';
        }
        if (this.cardAssembly) {
          this.cardAssembly.style.transform = 'translateY(-140px) scale(1)';
        }
        setTimeout(() => {
          if (gen !== this.currentGeneration) return;
          this.showReadingPanel();
        }, 400);
      }, 150);
      return;
    }

    // 1. 100ms: Flap folds backward (rotateX 0 -> -175deg)
    setTimeout(() => {
      if (gen !== this.currentGeneration) return;
      if (this.envelopeContainer) {
        this.envelopeContainer.classList.add('flap-open');
      }
    }, 100);

    // 2. 350ms: Flap passes 90 deg -> shift z-index behind card
    setTimeout(() => {
      if (gen !== this.currentGeneration) return;
      if (this.envelopeFlap) {
        this.envelopeFlap.style.zIndex = '1';
      }
    }, 350);

    // 3. 450–1200ms: Card slides up out of pocket while still in vertical plane
    setTimeout(() => {
      if (gen !== this.currentGeneration) return;
      if (this.cardAssembly) {
        this.cardAssembly.style.transition = 'transform 0.75s cubic-bezier(.22, .61, .36, 1)';
        this.cardAssembly.style.transform = 'translateY(-145px) translateZ(10px)';
      }
    }, 450);

    // 4. 1150–1800ms: Card rotates on plane through large tilt angle (~42°), then advances forward
    setTimeout(() => {
      if (gen !== this.currentGeneration) return;
      if (this.cardAssembly) {
        this.cardAssembly.style.transition = 'transform 0.75s cubic-bezier(.16, 1, .3, 1)';
        // Rotate through ~42° tilt, then settle upright with slight -6° tilt
        this.cardAssembly.style.transform = 'translateY(-190px) translateZ(85px) rotate(-6deg) scale(1.12)';
      }
    }, 1150);

    // 5. 1850–2650ms: Book cover leaf opens around vertical left spine (rotateY 0 -> -150deg)
    setTimeout(() => {
      if (gen !== this.currentGeneration) return;
      if (this.cardLeafLeft) {
        this.cardLeafLeft.style.transition = 'transform 0.85s cubic-bezier(.4, 0, .2, 1)';
        this.cardLeafLeft.style.transform = 'rotateY(-150deg)';
      }
    }, 1850);

    // 6. 2700–3500ms: Hold open in 3D perspective to appreciate mechanics, then seamlessly reveal reading modal
    setTimeout(() => {
      if (gen !== this.currentGeneration) return;
      this.showReadingPanel();
    }, 2850);
  }

  showReadingPanel() {
    this.isOpen = true;
    this.isOpening = false;
    this.isReading = true;

    if (this.readingBackdrop) {
      this.readingBackdrop.classList.add('active');
    }
    if (this.readingPanel) {
      this.readingPanel.classList.add('active');
    }

    if (this.btnClose) {
      setTimeout(() => this.btnClose.focus(), 80);
    }

    this.startTypewriter();

    if (typeof this.callbacks.onOpeningComplete === 'function') {
      this.callbacks.onOpeningComplete();
    }
  }

  startTypewriter() {
    this.abortTypewriter();
    this.typewriterActive = true;
    this.typewriterIndex = 0;

    // Pre-fill ghost message for stable height reservation
    if (this.ghostMsgEl) {
      this.ghostMsgEl.textContent = this.config.message || '';
    }
    if (this.typedMsgEl) {
      this.typedMsgEl.innerHTML = '<span class="typewriter-cursor"></span>';
    }

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      this.finishTypewriter();
      return;
    }

    this.typeNextGrapheme();
  }

  typeNextGrapheme() {
    if (!this.typewriterActive) return;

    if (this.typewriterIndex >= this.graphemes.length) {
      this.finishTypewriter();
      return;
    }

    const char = this.graphemes[this.typewriterIndex];
    this.typewriterIndex++;

    const currentText = this.graphemes.slice(0, this.typewriterIndex).join('');
    if (this.typedMsgEl) {
      this.typedMsgEl.textContent = currentText;
      const cursor = document.createElement('span');
      cursor.className = 'typewriter-cursor';
      this.typedMsgEl.appendChild(cursor);
    }

    // Pacing: 25–40ms, pause on punctuation (Mục 8)
    let delay = 28;
    if (char === ',' || char === ';') {
      delay = 120;
    } else if (char === '.' || char === '!' || char === '?' || char === '\n' || char === '💖' || char === '💝') {
      delay = 280;
    }

    this.typewriterTimer = setTimeout(() => this.typeNextGrapheme(), delay);
  }

  finishTypewriter() {
    this.abortTypewriter();
    if (this.typedMsgEl) {
      this.typedMsgEl.textContent = this.config.message || '';
    }
  }

  abortTypewriter() {
    this.typewriterActive = false;
    if (this.typewriterTimer) {
      clearTimeout(this.typewriterTimer);
      this.typewriterTimer = null;
    }
  }

  /**
   * Close letter modal and trigger gallery scene (Mục 10)
   */
  closeLetter() {
    if (!this.isReading) return;
    this.isReading = false;
    this.abortTypewriter();

    // 250–400ms: Modal fades and scales down
    if (this.readingPanel) {
      this.readingPanel.classList.remove('active');
    }
    if (this.readingBackdrop) {
      this.readingBackdrop.classList.remove('active');
    }

    // Hide envelope during gallery
    if (this.envelopeStage) {
      this.envelopeStage.classList.add('hidden-during-gallery');
    }

    if (typeof this.callbacks.onLetterClosed === 'function') {
      this.callbacks.onLetterClosed();
    }
  }

  /**
   * Return envelope back into position after gallery (Mục 10)
   */
  returnEnvelopeAfterGallery() {
    this.resetToClosedState();
    if (this.envelopeStage) {
      this.envelopeStage.classList.remove('hidden-during-gallery');
    }
    if (this.envelopeHint) {
      this.envelopeHint.textContent = 'Nhấn vào thư để mở lại 💌';
      this.envelopeHint.style.opacity = '1';
    }
  }

  destroy() {
    this.abortTypewriter();
    window.removeEventListener('keydown', this.handleKeyDown);
  }
}

if (typeof window !== 'undefined') {
  window.Thiep8Letter = Thiep8Letter;
}
