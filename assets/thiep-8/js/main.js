/**
 * THIỆP 8 — Master Orchestrator & State Machine
 * Tuân thủ mục 11 & toàn bộ tài liệu đặc tả
 */

(function () {
  'use strict';

  const STATES = {
    BOOT: 'BOOT',
    UNIVERSE: 'UNIVERSE',
    ZOOM_TRANSITION: 'ZOOM_TRANSITION',
    ENVELOPE_IDLE: 'ENVELOPE_IDLE',
    LETTER_OPENING: 'LETTER_OPENING',
    READING: 'READING',
    READING_CLOSING: 'READING_CLOSING',
    GALLERY: 'GALLERY',
    DESTROYED: 'DESTROYED'
  };

  class Thiep8Controller {
    constructor(rootEl, config) {
      this.root = typeof rootEl === 'string' ? document.querySelector(rootEl) : rootEl;
      if (!this.root) {
        throw new Error('Thiep8Controller: Root element not found');
      }

      this.config = Object.assign({}, window.THIEP_8_CONFIG || {}, config || {});
      this.state = STATES.BOOT;
      this.isFirstEnvelopePass = true;
      this.autoOpenTimer = null;

      this.universe = null;
      this.letter = null;
      this.gallery = null;

      this.initDom();
      this.initComponents();
      this.bindGlobalEvents();
    }

    initDom() {
      const coverEyebrow = this.root.querySelector('.cover-eyebrow');
      if (coverEyebrow && this.config.coverEyebrow) {
        coverEyebrow.textContent = this.config.coverEyebrow;
      }

      const coverTitle = this.root.querySelector('.cover-title');
      if (coverTitle && this.config.coverTitle) {
        coverTitle.textContent = this.config.coverTitle;
      }

      // Bind user portrait photo
      const primaryIndex = this.config.primaryPhotoIndex || 0;
      const primaryPhoto = (this.config.photos && this.config.photos[primaryIndex]) || { src: './assets/thiep-8/images/photo-01.svg' };

      const innerPhoto = this.root.querySelector('.inner-photo-img');
      if (innerPhoto) {
        innerPhoto.src = primaryPhoto.src;
        innerPhoto.alt = primaryPhoto.alt || 'Ảnh người nhận';
        if (primaryPhoto.objectPosition) {
          innerPhoto.style.objectPosition = primaryPhoto.objectPosition;
        }
      }

      const modalPhoto = this.root.querySelector('.modal-photo-img');
      if (modalPhoto) {
        modalPhoto.src = primaryPhoto.src;
        modalPhoto.alt = primaryPhoto.alt || 'Ảnh người nhận';
        if (primaryPhoto.objectPosition) {
          modalPhoto.style.objectPosition = primaryPhoto.objectPosition;
        }
      }

      // Inside card preview text
      const cardPreview = this.root.querySelector('.card-preview-text');
      if (cardPreview && this.config.message) {
        const snippet = this.config.message.length > 70
          ? this.config.message.slice(0, 68) + '...'
          : this.config.message;
        cardPreview.textContent = snippet;
      }
    }

    initComponents() {
      // 1. Universe World
      const universeEl = this.root.querySelector('.universe-scene');
      if (universeEl) {
        this.universe = new window.Thiep8Universe(universeEl, this.config, {
          onZoomComplete: () => this.handleZoomComplete()
        });
      }

      // 2. Letter & Envelope
      this.letter = new window.Thiep8Letter(this.root, this.config, {
        onOpeningComplete: () => {
          this.state = STATES.READING;
        },
        onLetterClosed: () => {
          this.handleLetterClosed();
        }
      });

      // 3. Gallery & Floating Hearts
      this.gallery = new window.Thiep8Gallery(this.root, this.config, {
        onGalleryComplete: () => {
          this.handleGalleryFinished();
        }
      });
    }

    bindGlobalEvents() {
      this.handleVisibilityChange = () => {
        if (document.hidden) {
          if (this.universe && this.state === STATES.UNIVERSE) {
            this.universe.stop();
          }
        } else {
          if (this.universe && this.state === STATES.UNIVERSE) {
            this.universe.start();
          }
        }
      };
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
    }

    start() {
      this.transitionTo(STATES.UNIVERSE);
      if (this.universe) {
        this.universe.start();
      }
    }

    transitionTo(newState) {
      this.state = newState;
    }

    handleZoomComplete() {
      this.transitionTo(STATES.ENVELOPE_IDLE);

      const universeEl = this.root.querySelector('.universe-scene');
      if (universeEl) {
        universeEl.style.display = 'none';
      }

      if (this.letter) {
        this.letter.showEnvelopeScene();
      }

      // First pass auto-open after 500ms (Mục 7)
      if (this.isFirstEnvelopePass) {
        this.isFirstEnvelopePass = false;
        this.autoOpenTimer = setTimeout(() => {
          if (this.state === STATES.ENVELOPE_IDLE) {
            this.openLetter();
          }
        }, 500);
      }
    }

    openLetter() {
      if (this.state === STATES.UNIVERSE || this.state === STATES.BOOT) {
        if (this.universe) {
          this.universe.triggerZoom();
        }
        return;
      }
      if (this.autoOpenTimer) {
        clearTimeout(this.autoOpenTimer);
        this.autoOpenTimer = null;
      }
      this.transitionTo(STATES.LETTER_OPENING);
      if (this.letter) {
        this.letter.openLetter();
      }
    }

    closeLetter() {
      if (this.autoOpenTimer) {
        clearTimeout(this.autoOpenTimer);
        this.autoOpenTimer = null;
      }
      if (this.letter) {
        this.letter.closeLetter();
      }
    }

    handleLetterClosed() {
      this.transitionTo(STATES.READING_CLOSING);
      setTimeout(() => {
        this.transitionTo(STATES.GALLERY);
        if (this.gallery) {
          this.gallery.start();
        }
      }, 350);
    }

    handleGalleryFinished() {
      this.transitionTo(STATES.ENVELOPE_IDLE);
      if (this.letter) {
        this.letter.returnEnvelopeAfterGallery();
      }
    }

    /**
     * Clean replay from Universe scene
     */
    replay() {
      if (this.autoOpenTimer) {
        clearTimeout(this.autoOpenTimer);
        this.autoOpenTimer = null;
      }

      if (this.gallery) {
        this.gallery.stop();
      }

      if (this.letter) {
        this.letter.resetToClosedState();
      }
      const envelopeWorld = this.root.querySelector('.envelope-world');
      if (envelopeWorld) {
        envelopeWorld.classList.remove('active');
      }

      const flashEl = this.root.querySelector('.flash-overlay');
      if (flashEl) {
        flashEl.style.opacity = '0';
        flashEl.style.display = 'none';
      }

      const universeEl = this.root.querySelector('.universe-scene');
      if (universeEl) {
        universeEl.style.display = 'block';
        universeEl.classList.remove('zooming');
      }

      if (this.universe) {
        this.universe.destroy();
        this.universe = new window.Thiep8Universe(universeEl, this.config, {
          onZoomComplete: () => this.handleZoomComplete()
        });
      }

      this.isFirstEnvelopePass = true;
      this.start();
    }

    destroy() {
      this.state = STATES.DESTROYED;
      if (this.autoOpenTimer) clearTimeout(this.autoOpenTimer);
      if (this.universe) this.universe.destroy();
      if (this.letter) this.letter.destroy();
      if (this.gallery) this.gallery.destroy();
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
  }

  function createThiep8(rootElement, userConfig) {
    return new Thiep8Controller(rootElement, userConfig);
  }

  window.createThiep8 = createThiep8;
  window.Thiep8Controller = Thiep8Controller;

  document.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.getElementById('thiep-8-app');
    if (rootEl) {
      const app = createThiep8(rootEl, window.THIEP_8_CONFIG);
      window.__thiep8Instance = app;
      app.start();
    }
  });
})();
