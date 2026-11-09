const fs = require('fs');
const path = require('path');

// Load assets and svgs
const assets = JSON.parse(fs.readFileSync('all_assets.json', 'utf8'));
const activitySvgs = JSON.parse(fs.readFileSync('activity_svgs.json', 'utf8'));

const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#FAF4E2">
  <meta name="description" content="Một tấm vé hẹn hò lãng mạn dành riêng cho người thương">
  <title>Một Tấm Vé Hẹn Hò ♡</title>

  <style>
    /* ====================================================
       1. EMBEDDED FONTS & TOKENS
       ==================================================== */
    @font-face {
      font-family: 'Dancing Script';
      src: url(data:font/ttf;base64,${assets.fontDancingScript}) format('truetype');
      font-weight: 400 700;
      font-style: normal;
      font-display: swap;
    }

    :root {
      --ink: #504735;
      --muted: #A18C70;
      --caramel: #AA713D;
      --caramel-hover: #946032;
      --caramel-active: #7E4F25;
      --paper: #F3ECE2;
      --paper-light: #FBF8F2;
      --border: #DCCEBC;
      --border-dark: #C5B29B;
      --white-frame: #FFFEFA;
      --pink: #E9ADA6;
      --pink-soft: #FDECE9;
      --shadow-card: 0 28px 48px rgba(105, 77, 39, 0.17), 0 2px 6px rgba(105, 77, 39, 0.06);
      --shadow-sm: 0 6px 16px rgba(105, 77, 39, 0.08);
      --font-script: 'Dancing Script', 'Segoe Script', 'Segoe Print', cursive;
      --font-ui: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    /* ====================================================
       2. RESET & GLOBAL LAYOUT
       ==================================================== */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    html {
      color-scheme: light;
      font-family: var(--font-ui);
      background-color: #EADBBB;
    }

    body {
      min-height: 100vh;
      min-height: 100svh;
      margin: 0;
      padding: 0;
      color: var(--ink);
      background: radial-gradient(circle at 50% 18%, #FAF4E2 0%, #F0E3CB 45%, #EADBBB 75%, #D9C5A1 100%);
      background-attachment: fixed;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
    }

    /* Paper grain texture overlay (pointer-events none) */
    .paper-grain {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 990;
      opacity: 0.035;
      mix-blend-mode: multiply;
    }

    /* Stage shell */
    .stage {
      width: 100%;
      max-width: 460px;
      min-height: 100vh;
      min-height: 100svh;
      padding: calc(24px + env(safe-area-inset-top, 0px)) 20px calc(24px + env(safe-area-inset-bottom, 0px));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 10;
    }

    /* Step root container */
    .step-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    /* ====================================================
       3. TYPOGRAPHY
       ==================================================== */
    .script-font {
      font-family: var(--font-script);
    }

    .eyebrow {
      font-family: var(--font-script);
      font-size: 18px;
      color: var(--muted);
      text-align: center;
      margin-bottom: 6px;
      font-weight: 500;
    }

    .title-intro {
      font-family: var(--font-script);
      font-size: clamp(29px, 7.5vw, 38px);
      line-height: 1.1;
      font-weight: 700;
      color: var(--ink);
      text-align: center;
      margin-bottom: 24px;
    }

    .title-card {
      font-family: var(--font-script);
      font-size: clamp(32px, 8vw, 38px);
      line-height: 1.08;
      font-weight: 700;
      color: var(--ink);
      text-align: center;
      margin-bottom: 16px;
    }

    /* ====================================================
       4. CARDS & CONTAINERS
       ==================================================== */
    .card-paper {
      width: min(80vw, 340px);
      background: var(--paper);
      background-image: repeating-linear-gradient(180deg, rgba(80, 71, 53, 0.016) 0px, rgba(80, 71, 53, 0.016) 1px, transparent 1px, transparent 4px);
      border-radius: 18px;
      border: 1px solid var(--border);
      box-shadow: var(--shadow-card);
      padding: 26px 22px;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .card-paper-long {
      width: min(76vw, 320px);
      padding: 24px 20px 32px 20px;
    }

    /* ====================================================
       5. BUTTONS & CONTROLS
       ==================================================== */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: var(--font-ui);
      font-size: 15px;
      font-weight: 700;
      border-radius: 28px;
      cursor: pointer;
      border: none;
      outline: none;
      text-decoration: none;
      transition: transform 140ms ease, background-color 140ms ease, box-shadow 140ms ease, border-color 140ms ease;
      touch-action: manipulation;
    }

    .btn:active {
      transform: scale(0.97);
    }

    .btn:focus-visible {
      outline: 2px solid var(--caramel);
      outline-offset: 3px;
    }

    .btn-caramel {
      background-color: var(--caramel);
      color: #FFFFFF;
      box-shadow: 0 4px 14px rgba(170, 113, 61, 0.35);
    }

    .btn-caramel:hover {
      background-color: var(--caramel-hover);
      box-shadow: 0 6px 18px rgba(170, 113, 61, 0.45);
    }

    .btn-secondary {
      background-color: var(--paper-light);
      color: var(--ink);
      border: 1px solid var(--border);
      box-shadow: 0 2px 8px rgba(105, 77, 39, 0.06);
    }

    .btn-secondary:hover {
      background-color: #FFFFFF;
      border-color: var(--border-dark);
    }

    .btn-outline {
      background-color: transparent;
      color: var(--caramel);
      border: 1.5px solid var(--caramel);
    }

    .btn-outline:hover {
      background-color: rgba(170, 113, 61, 0.06);
    }

    .btn-text {
      background: transparent;
      border: none;
      color: var(--muted);
      font-size: 13.5px;
      font-weight: 500;
      text-decoration: underline;
      cursor: pointer;
      padding: 6px 12px;
    }

    .btn-text:hover {
      color: var(--ink);
    }

    /* ====================================================
       6. SCENE 0: MÁY ẢNH (INTRO)
       ==================================================== */
    .intro-scene {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .camera-box {
      width: min(82vw, 310px);
      height: min(80vw, 290px);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px 0 32px 0;
      position: relative;
      animation: cameraFloat 4.8s ease-in-out infinite;
      transition: transform 160ms cubic-bezier(0.2, 0.8, 0.3, 1);
    }

    .camera-img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      mix-blend-mode: multiply;
      filter: drop-shadow(0 16px 22px rgba(105, 77, 39, 0.22));
    }

    @keyframes cameraFloat {
      0%, 100% {
        transform: translateY(0px) rotate(0deg);
      }
      50% {
        transform: translateY(-5px) rotate(0.4deg);
      }
    }

    .flash-overlay {
      position: fixed;
      inset: 0;
      background-color: #FAF4E2;
      opacity: 0;
      pointer-events: none;
      z-index: 1000;
      transition: opacity 120ms ease;
    }

    .flash-overlay.active {
      opacity: 0.35;
    }

    /* ====================================================
       7. SCENE 1: POLAROID CÒN THIẾU EM (PRINTING)
       ==================================================== */
    .polaroid-card {
      width: min(86vw, 340px);
      background: var(--white-frame);
      padding: 18px 18px 26px 18px;
      border-radius: 4px;
      box-shadow: 0 24px 44px rgba(105, 77, 39, 0.22), 0 2px 6px rgba(0,0,0,0.04);
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }

    .polaroid-inner {
      width: 100%;
      height: 270px;
      background-color: #EDE5DB;
      border: 1.5px dashed rgba(161, 140, 112, 0.5);
      border-radius: 2px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      box-sizing: border-box;
      padding: 20px;
    }

    .polaroid-qmark {
      position: absolute;
      top: 14px;
      right: 14px;
      width: 26px;
      height: 26px;
      border: 1.5px dashed var(--muted);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-ui);
      font-weight: 700;
      font-size: 13px;
      color: var(--muted);
    }

    .polaroid-illustration {
      width: 72px;
      height: 64px;
      stroke: var(--muted);
      stroke-width: 1.6;
      fill: none;
      margin-bottom: 28px;
    }

    .polaroid-caption-inner {
      font-family: var(--font-script);
      font-size: 20px;
      line-height: 1.25;
      color: var(--ink);
      font-weight: 600;
      text-align: center;
      position: absolute;
      bottom: 18px;
    }

    .polaroid-caption-outer {
      font-family: var(--font-script);
      font-size: 21px;
      line-height: 1.3;
      color: var(--caramel);
      font-weight: 700;
      text-align: center;
      margin-top: 20px;
      padding: 0 10px;
    }

    /* ====================================================
       8. SCENE 2: LỜI MỜI (INVITATION)
       ==================================================== */
    .couple-polaroid {
      width: 140px;
      background: var(--white-frame);
      padding: 8px 8px 18px 8px;
      border-radius: 3px;
      box-shadow: 0 10px 20px rgba(105, 77, 39, 0.16);
      transform: rotate(-3.5deg);
      margin-bottom: 18px;
      transition: transform 300ms ease;
    }

    .couple-polaroid:hover {
      transform: rotate(-1deg) scale(1.03);
    }

    .couple-img {
      width: 100%;
      height: 125px;
      object-fit: cover;
      display: block;
      border-radius: 2px;
    }

    .playful-hint {
      font-family: var(--font-script);
      font-size: 18px;
      line-height: 1.35;
      color: var(--muted);
      min-height: 26px;
      text-align: center;
      margin-bottom: 18px;
      padding: 0 10px;
      transition: opacity 200ms ease;
    }

    .btn-agree {
      width: 82%;
      height: 60px;
      font-size: 17px;
      margin-bottom: 14px;
      z-index: 5;
    }

    .playful-zone {
      width: 100%;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .btn-think {
      height: 46px;
      padding: 0 22px;
      font-size: 14px;
      position: relative;
      cursor: pointer;
      z-index: 4;
      white-space: nowrap;
    }

    /* ====================================================
       9. SCENE 3: YEAY
       ==================================================== */
    .yeay-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 40px 20px;
    }

    .yeay-title {
      font-family: var(--font-script);
      font-size: clamp(52px, 14vw, 68px);
      line-height: 1.05;
      font-weight: 700;
      color: var(--caramel);
      margin-bottom: 12px;
    }

    .yeay-sub {
      font-family: var(--font-script);
      font-size: clamp(23px, 6vw, 28px);
      color: var(--ink);
    }

    .heart-particle {
      position: absolute;
      pointer-events: none;
      font-size: 20px;
      color: var(--pink);
      animation: floatHeart 1.6s ease-out forwards;
      z-index: 20;
    }

    @keyframes floatHeart {
      0% {
        opacity: 0;
        transform: translate(0, 0) scale(0.6);
      }
      20% {
        opacity: 1;
        transform: translate(var(--tx, 0), -20px) scale(1);
      }
      100% {
        opacity: 0;
        transform: translate(calc(var(--tx, 0) * 1.5), -90px) scale(1.2);
      }
    }

    /* ====================================================
       10. SCENE 4: LÝ DO MUỐN HẸN HÒ (REASONS)
       ==================================================== */
    .collage-container {
      width: min(80vw, 290px);
      height: 160px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
      position: relative;
    }

    .collage-img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 12px 20px rgba(105, 77, 39, 0.16));
    }

    .reason-text {
      font-family: var(--font-script);
      font-size: 20px;
      line-height: 1.5;
      color: var(--ink);
      text-align: center;
      margin-bottom: 24px;
      padding: 0 4px;
    }

    /* ====================================================
       11. SCENE 5: CHỌN THỜI GIAN (AVAILABILITY)
       ==================================================== */
    .form-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;
    }

    .input-box {
      width: 100%;
      height: 56px;
      background-color: var(--paper-light);
      border: 1px solid var(--border);
      border-radius: 14px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      gap: 12px;
      position: relative;
      cursor: pointer;
      box-sizing: border-box;
      transition: border-color 160ms ease, box-shadow 160ms ease;
    }

    .input-box:focus-within, .input-box.active {
      border-color: var(--caramel);
      box-shadow: 0 0 0 2px rgba(170, 113, 61, 0.2);
    }

    .input-box svg {
      width: 22px;
      height: 22px;
      stroke: var(--caramel);
      flex-shrink: 0;
    }

    .input-display {
      font-family: var(--font-ui);
      font-size: 15px;
      color: var(--ink);
      font-weight: 500;
      flex-grow: 1;
    }

    .input-display.placeholder {
      color: var(--muted);
    }

    .native-hidden-input {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }

    .periods-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      margin: 8px 0;
    }

    .pill-period {
      min-width: 160px;
      height: 44px;
      padding: 0 24px;
      border-radius: 22px;
      border: 1px solid var(--border);
      background-color: var(--paper-light);
      color: var(--ink);
      font-family: var(--font-ui);
      font-size: 14.5px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 140ms ease;
      touch-action: manipulation;
    }

    .pill-period:hover {
      background-color: #FFFFFF;
      border-color: var(--border-dark);
    }

    .pill-period.active {
      background-color: var(--caramel);
      color: #FFFFFF;
      border-color: var(--caramel);
      box-shadow: 0 4px 12px rgba(170, 113, 61, 0.28);
    }

    .date-warning {
      font-size: 12.5px;
      color: #D9534F;
      text-align: center;
      margin-top: -6px;
      display: none;
    }

    /* ====================================================
       12. SCENE 6: CHỌN HOẠT ĐỘNG (ACTIVITIES)
       ==================================================== */
    .activities-grid {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 10px;
    }

    .activity-card {
      height: 146px;
      background-color: var(--paper-light);
      border: 1px solid var(--border);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px 8px;
      box-sizing: border-box;
      cursor: pointer;
      text-align: center;
      transition: all 140ms cubic-bezier(0.2, 0.8, 0.3, 1);
      user-select: none;
      touch-action: manipulation;
    }

    .activity-card:hover {
      background-color: #FFFFFF;
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }

    .activity-card.active {
      border: 2px solid var(--caramel);
      background-color: #FFF9F3;
      box-shadow: 0 6px 16px rgba(170, 113, 61, 0.22);
    }

    .activity-icon {
      width: 52px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }

    .activity-icon svg {
      width: 100%;
      height: 100%;
    }

    .activity-label {
      font-family: var(--font-ui);
      font-size: 13px;
      font-weight: 700;
      line-height: 1.25;
      color: var(--ink);
    }

    /* ====================================================
       13. SCENE 7: LỜI NHẮN (NOTE)
       ==================================================== */
    .note-textarea-box {
      width: 100%;
      margin: 12px 0 20px 0;
      position: relative;
    }

    .note-textarea {
      width: 100%;
      height: 128px;
      background-color: var(--paper-light);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 16px;
      box-sizing: border-box;
      font-family: var(--font-script);
      font-size: 21px;
      line-height: 1.5;
      color: var(--ink);
      text-align: center;
      resize: none;
      outline: none;
      transition: border-color 160ms ease, box-shadow 160ms ease;
    }

    .note-textarea:focus {
      border-color: var(--caramel);
      box-shadow: 0 0 0 2px rgba(170, 113, 61, 0.22);
    }

    .note-textarea::placeholder {
      font-family: var(--font-script);
      font-size: 19px;
      color: var(--muted);
      opacity: 0.8;
      text-align: center;
    }

    .note-counter {
      font-size: 12px;
      color: var(--muted);
      text-align: right;
      margin-top: 4px;
    }

    /* ====================================================
       14. SCENE 8: VÉ HẸN HÒ & THAO TÁC (TICKET)
       ==================================================== */
    .ticket-wrapper {
      width: min(84vw, 340px);
      filter: drop-shadow(0 24px 38px rgba(105, 77, 39, 0.18));
      margin-bottom: 24px;
    }

    .ticket-card {
      --notch-y: 200px;
      width: 100%;
      background-color: #FAF4E2;
      background-image: repeating-linear-gradient(180deg, rgba(80, 71, 53, 0.016) 0px, rgba(80, 71, 53, 0.016) 1px, transparent 1px, transparent 4px);
      border-radius: 18px;
      border: 1px solid rgba(220, 206, 188, 0.85);
      box-sizing: border-box;
      padding: 24px 20px 28px 20px;
      position: relative;
      display: flex;
      flex-direction: column;
      /* Symmetrical semi-circle cutouts */
      -webkit-mask-image: radial-gradient(circle 14px at 0% var(--notch-y), transparent 13.5px, #000 14px),
                          radial-gradient(circle 14px at 100% var(--notch-y), transparent 13.5px, #000 14px);
      -webkit-mask-composite: source-in;
      mask-image: radial-gradient(circle 14px at 0% var(--notch-y), transparent 13.5px, #000 14px),
                  radial-gradient(circle 14px at 100% var(--notch-y), transparent 13.5px, #000 14px);
      mask-composite: intersect;
    }

    .ticket-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
    }

    .ticket-title-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .ticket-badge {
      font-family: var(--font-ui);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: var(--muted);
      margin-bottom: 4px;
    }

    .ticket-main-title {
      font-family: var(--font-script);
      font-size: 36px;
      line-height: 1.05;
      font-weight: 700;
      color: var(--ink);
    }

    .ticket-stamp {
      width: 54px;
      height: 54px;
      border-radius: 50%;
      border: 1.5px dashed var(--border-dark);
      background: #FFFDF9;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transform: rotate(6deg);
    }

    .stamp-heart {
      width: 28px;
      height: 28px;
      fill: var(--pink);
    }

    .ticket-divider {
      width: 100%;
      border: none;
      border-top: 1.5px dashed #D4C4B0;
      margin: 12px 0 16px 0;
    }

    .ticket-rows {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 8px;
    }

    .ticket-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }

    .ticket-icon-disc {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #FFFDF9;
      border: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 2px 4px rgba(105, 77, 39, 0.04);
    }

    .ticket-icon-disc svg {
      width: 24px;
      height: 24px;
    }

    .ticket-row-content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      overflow-wrap: anywhere;
    }

    .ticket-row-label {
      font-family: var(--font-ui);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      color: var(--muted);
      margin-bottom: 2px;
    }

    .ticket-row-val {
      font-family: var(--font-script);
      font-size: 21px;
      line-height: 1.35;
      color: var(--ink);
      font-weight: 600;
    }

    .ticket-closing-text {
      font-family: var(--font-script);
      font-size: 19px;
      line-height: 1.5;
      color: var(--ink);
      text-align: center;
      margin: 4px 0 14px 0;
      padding: 0 6px;
    }

    .ticket-signature {
      font-family: var(--font-script);
      font-size: 18px;
      color: var(--muted);
      text-align: center;
      font-weight: 600;
    }

    .ticket-actions-group {
      width: min(84vw, 340px);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    .ticket-hint-guide {
      font-family: var(--font-ui);
      font-size: 13.5px;
      line-height: 1.4;
      color: var(--muted);
      text-align: center;
      margin-bottom: 6px;
      padding: 0 10px;
    }

    /* ====================================================
       15. TRANSITIONS & ANIMATIONS
       ==================================================== */
    .fade-slide-enter {
      animation: sceneEnter 420ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }

    .fade-slide-exit {
      animation: sceneExit 320ms cubic-bezier(0.4, 0, 1, 1) forwards;
    }

    @keyframes sceneEnter {
      0% {
        opacity: 0;
        transform: translateY(18px) scale(0.985);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes sceneExit {
      0% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      100% {
        opacity: 0;
        transform: translateY(-16px) scale(0.985);
      }
    }

    /* ====================================================
       16. TOAST & MODAL FALLBACK
       ==================================================== */
    .toast-container {
      position: fixed;
      bottom: calc(28px + env(safe-area-inset-bottom, 0px));
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: rgba(80, 71, 53, 0.94);
      color: #FAF4E2;
      padding: 12px 22px;
      border-radius: 24px;
      font-family: var(--font-ui);
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.22);
      pointer-events: none;
      opacity: 0;
      transition: opacity 200ms ease, transform 200ms ease;
      z-index: 10000;
      max-width: 90vw;
      text-align: center;
    }

    .toast-container.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    /* Copy modal dialog */
    .copy-dialog {
      border: none;
      background: transparent;
      padding: 0;
      max-width: min(90vw, 400px);
      margin: auto;
    }

    .copy-dialog::backdrop {
      background: rgba(80, 71, 53, 0.45);
      backdrop-filter: blur(2px);
    }

    .copy-dialog-card {
      background: var(--paper);
      border: 1px solid var(--border);
      border-radius: 18px;
      box-shadow: 0 24px 44px rgba(0, 0, 0, 0.25);
      padding: 22px 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .copy-dialog-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--ink);
      text-align: center;
    }

    .copy-dialog-textarea {
      width: 100%;
      height: 140px;
      border: 1px solid var(--border);
      border-radius: 10px;
      background: #FFFFFF;
      padding: 10px;
      font-family: var(--font-ui);
      font-size: 13px;
      line-height: 1.4;
      color: var(--ink);
      resize: none;
    }

    .copy-dialog-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    /* Footer */
    .app-footer {
      font-family: var(--font-ui);
      font-size: 12px;
      color: var(--muted);
      text-align: center;
      margin-top: 28px;
      padding-bottom: 12px;
    }

    /* ====================================================
       17. REDUCED MOTION
       ==================================================== */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
      .camera-box {
        animation: none;
      }
    }
  </style>
</head>
<body>

  <!-- Paper grain SVG filter overlay -->
  <svg class="paper-grain" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <filter id="grainFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0 0.18  0 0 0 0.04 0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#grainFilter)" />
  </svg>

  <!-- Flash overlay for camera snap -->
  <div class="flash-overlay" id="flashOverlay" aria-hidden="true"></div>

  <!-- Main Application Shell -->
  <main class="stage" id="app">
    <!-- Scene container mounted here -->
    <div class="step-container" id="stepContainer"></div>

    <!-- App Footer -->
    <footer class="app-footer" id="appFooter">Một chiếc hẹn dành riêng cho em ♡</footer>
  </main>

  <!-- Toast Announcement -->
  <aside class="toast-container" id="toast" role="status" aria-live="polite"></aside>

  <!-- Fallback dialog for manual text copying -->
  <dialog id="copyModal" class="copy-dialog">
    <div class="copy-dialog-card">
      <h3 class="copy-dialog-title" id="copyModalTitle">Nội dung sao chép</h3>
      <textarea class="copy-dialog-textarea" id="copyModalText" readonly></textarea>
      <div class="copy-dialog-actions">
        <button class="btn btn-caramel" id="btnCopyModalAction" style="padding: 0 18px; height: 38px;">Sao chép</button>
        <button class="btn btn-secondary" id="btnCopyModalClose" style="padding: 0 16px; height: 38px;">Đóng</button>
      </div>
    </div>
  </dialog>

  <!-- Hidden canvas for rendering Ticket PNG -->
  <canvas id="ticketCanvas" style="display:none;"></canvas>

  <script>
    /* ====================================================
       CONFIG: SỬA TÊN, ẢNH VÀ LỜI NHẮN Ở ĐÂY
       ==================================================== */
    const CONFIG = {
      senderName: 'anh',
      recipientName: 'em',
      introLines: ['Anh muốn lưu lại', 'thêm một khoảnh', 'khắc bên em...'],
      invitationTitle: 'Em đi hẹn hò\\nvới anh nhé?',
      reasonTitle: 'Vài lý do anh muốn\\nđưa em đi hẹn hò...',
      reasonText: 'Nụ cười của em làm anh vui cả ngày và muốn có thêm nhiều kỷ niệm bên em 🥰 📷',
      closingText: 'Vậy là hẹn nhau rồi nha! Anh sẽ đón em đúng giờ, đúng như trên vé. Từ giờ tới hôm đó chắc anh đếm từng ngày mất thôi.',
      couplePhoto: '', // Dán data:image/...;base64,... của ảnh riêng; rỗng thì dùng asset mẫu nhúng.
      cameraImage: '', // Rỗng thì dùng camera mẫu.
      footerText: 'Một chiếc hẹn dành riêng cho em ♡',
      showFooter: true,
      enablePlayfulButton: true,
      invitationUrl: '', // URL công khai khi đưa lên hosting; rỗng thì lấy URL hiện tại nếu là http(s).
      storageKey: 'thiep3-date-draft-v1'
    };

    /* ====================================================
       EMBEDDED ASSETS (DATA URIs)
       ==================================================== */
    const EMBEDDED_ASSETS = {
      camera: '${assets.camera}',
      couple: '${assets.couple}',
      collage: '${assets.collage}'
    };

    /* ====================================================
       PERIODS & ACTIVITIES & HINTS
       ==================================================== */
    const PERIODS = [
      { id: 'morning', label: 'Buổi sáng' },
      { id: 'noon', label: 'Buổi trưa' },
      { id: 'afternoon', label: 'Buổi chiều' },
      { id: 'afterwork', label: 'Sau giờ tan làm' },
      { id: 'evening', label: 'Buổi tối' },
      { id: 'night', label: 'Đêm muộn' }
    ];

    const ACTIVITIES = [
      { id: 'dinner', label: 'Đi ăn cùng nhau' },
      { id: 'coffee', label: 'Hẹn cà phê' },
      { id: 'cinema', label: 'Đi xem phim' },
      { id: 'walk', label: 'Đi dạo' },
      { id: 'aquarium', label: 'Thủy cung' },
      { id: 'craft', label: 'Làm đồ thủ công' },
      { id: 'museum', label: 'Bảo tàng' },
      { id: 'gaming', label: 'Chơi game, quậy tí' },
      { id: 'shopping', label: 'Đi mua sắm' },
      { id: 'home', label: 'Ở nhà nấu ăn, xem phim' }
    ];

    const ACTIVITY_SVGS = ${JSON.stringify(activitySvgs)};

    const HINTS = [
      'Ơ, một cái mời có tâm thế này mà 🥺',
      'Nút đồng ý lớn dễ hơn nhiều đó nha 👉',
      'Chỉ một buổi hẹn thôi mà 🥺',
      'Thôi mà, em bấm đồng ý đi 😌',
      'Đừng suy nghĩ nữa mà, bấm đồng ý đi em ơi ❤️'
    ];

    /* ====================================================
       STATE & RUNTIME
       ==================================================== */
    const state = {
      step: 'intro', // 'intro', 'printing', 'invitation', 'celebrate', 'reasons', 'availability', 'activities', 'note', 'ticket'
      busy: false,
      teaseCount: 0,
      availability: { date: '', period: 'morning', time: '' },
      activityId: 'aquarium',
      note: '',
      ticket: null,
      isViewOnly: false
    };

    const runtime = {
      timerIds: [],
      rAFIds: [],
      toastTimer: null,
      lastTeaseMove: 0,
      resetConfirmTimer: null,
      cachedTicketBlob: null
    };

    function addTimer(id) {
      runtime.timerIds.push(id);
      return id;
    }

    function clearAllTimers() {
      runtime.timerIds.forEach(id => clearTimeout(id));
      runtime.timerIds = [];
      runtime.rAFIds.forEach(id => cancelAnimationFrame(id));
      runtime.rAFIds = [];
    }

    /* ====================================================
       HELPERS: SANITIZATION, FORMATTING, STORAGE
       ==================================================== */
    function escapeHtml(str) {
      if (typeof str !== 'string') return '';
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function formatDateVi(dateStr) {
      if (!dateStr) return '';
      try {
        const [y, m, d] = dateStr.split('-').map(Number);
        const date = new Date(y, m - 1, d);
        if (isNaN(date.getTime())) return '';
        const days = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
        const dayName = days[date.getDay()];
        const dd = String(d).padStart(2, '0');
        const mm = String(m).padStart(2, '0');
        return \`\${dayName}, \${dd}/\${mm}/\${y}\`;
      } catch (e) {
        return dateStr;
      }
    }

    function isDateInPast(dateStr) {
      if (!dateStr) return false;
      try {
        const [y, m, d] = dateStr.split('-').map(Number);
        const selected = new Date(y, m - 1, d);
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return selected < today;
      } catch (e) {
        return false;
      }
    }

    function getPeriodLabel(periodId) {
      const p = PERIODS.find(item => item.id === periodId);
      return p ? p.label : 'Buổi sáng';
    }

    function getActivityLabel(actId) {
      const a = ACTIVITIES.find(item => item.id === actId);
      return a ? a.label : 'Thủy cung';
    }

    function formatAvailability(avail) {
      const parts = [];
      if (avail.date) {
        const dateStr = formatDateVi(avail.date);
        if (dateStr) parts.push(dateStr);
      }
      parts.push(getPeriodLabel(avail.period));
      if (avail.time) {
        parts.push(avail.time);
      }
      return parts.join(' · ');
    }

    function showToast(msg, duration = 2400) {
      const toast = document.getElementById('toast');
      if (!toast) return;
      toast.textContent = msg;
      toast.classList.add('show');
      if (runtime.toastTimer) clearTimeout(runtime.toastTimer);
      runtime.toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, duration);
    }

    function openCopyModal(title, text) {
      const modal = document.getElementById('copyModal');
      const titleEl = document.getElementById('copyModalTitle');
      const textEl = document.getElementById('copyModalText');
      const actionBtn = document.getElementById('btnCopyModalAction');
      const closeBtn = document.getElementById('btnCopyModalClose');

      if (!modal || !textEl) return;
      titleEl.textContent = title;
      textEl.value = text;

      actionBtn.onclick = () => {
        textEl.select();
        try {
          document.execCommand('copy');
          showToast('Đã sao chép 💌');
        } catch (e) {}
        modal.close();
      };

      closeBtn.onclick = () => modal.close();

      if (typeof modal.showModal === 'function') {
        modal.showModal();
        textEl.select();
      } else {
        alert(text);
      }
    }

    function loadDraft() {
      try {
        const raw = localStorage.getItem(CONFIG.storageKey);
        if (!raw) return;
        const d = JSON.parse(raw);
        if (d && d.availability) state.availability = Object.assign(state.availability, d.availability);
        if (d && d.activityId) state.activityId = d.activityId;
        if (d && typeof d.note === 'string') state.note = d.note;
      } catch (e) {}
    }

    function saveDraft() {
      try {
        const draft = {
          version: 1,
          availability: state.availability,
          activityId: state.activityId,
          note: state.note
        };
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(draft));
      } catch (e) {}
    }

    function clearDraft() {
      try {
        localStorage.removeItem(CONFIG.storageKey);
      } catch (e) {}
    }

    /* ====================================================
       PAYLOAD ENCODING / DECODING (#ticket=...)
       ==================================================== */
    function encodeTicketPayload(model) {
      const jsonStr = JSON.stringify(model);
      const bytes = new TextEncoder().encode(jsonStr);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary).replace(/\\+/g, '-').replace(/\\//g, '_').replace(/=+$/, '');
    }

    function decodeTicketPayload(hashStr) {
      try {
        let clean = hashStr.replace(/^#?ticket=/, '').trim();
        if (!clean || clean.length > 12000) return null;
        clean = clean.replace(/-/g, '+').replace(/_/g, '/');
        while (clean.length % 4) clean += '=';
        const binary = atob(clean);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const jsonStr = new TextDecoder().decode(bytes);
        const data = JSON.parse(jsonStr);
        if (data && data.version === 1 && typeof data.senderName === 'string') {
          return data;
        }
        return null;
      } catch (e) {
        return null;
      }
    }

    function createTicketModel() {
      return {
        version: 1,
        senderName: CONFIG.senderName || 'anh',
        recipientName: CONFIG.recipientName || 'em',
        date: state.availability.date || '',
        period: state.availability.period || 'morning',
        time: state.availability.time || '',
        activityId: state.activityId || 'aquarium',
        note: state.note.trim(),
        closingText: CONFIG.closingText
      };
    }

    /* ====================================================
       SCENE BUILDERS
       ==================================================== */
    function renderStep(step) {
      const container = document.getElementById('stepContainer');
      if (!container) return;
      container.innerHTML = '';

      switch (step) {
        case 'intro': {
          const lines = (CONFIG.introLines && CONFIG.introLines.length) 
            ? CONFIG.introLines.map(l => escapeHtml(l)).join('<br>')
            : 'Anh muốn lưu lại<br>thêm một khoảnh<br>khắc bên em...';

          const cameraSrc = CONFIG.cameraImage || EMBEDDED_ASSETS.camera;

          container.innerHTML = \`
            <div class="intro-scene">
              <h1 class="title-intro" tabindex="-1">\${lines}</h1>
              <div class="camera-box" id="cameraBox">
                <img src="\${cameraSrc}" alt="Máy ảnh hồng vintage" class="camera-img">
              </div>
              <button class="btn btn-caramel" id="btnSnap" style="width: min(72vw, 270px); height: 56px; font-size: 16px;">
                Chụp tấm đầu tiên 📷
              </button>
            </div>
          \`;

          const snapBtn = document.getElementById('btnSnap');
          snapBtn.addEventListener('click', handleSnapClick);
          break;
        }

        case 'printing': {
          container.innerHTML = \`
            <div class="polaroid-card" id="polaroidCard" tabindex="-1">
              <div class="polaroid-inner">
                <div class="polaroid-qmark">?</div>
                <svg class="polaroid-illustration" viewBox="0 0 72 64">
                  <path d="M4 52L24 28L38 44L48 32L68 52H4Z" />
                  <circle cx="50" cy="18" r="6" />
                </svg>
                <div class="polaroid-caption-inner">
                  Huhu, ảnh còn trống mất<br>rồi...
                </div>
              </div>
              <div class="polaroid-caption-outer">
                Có thêm em nữa là thành<br>một kỷ niệm đẹp đó ❤️
              </div>
            </div>
          \`;

          const pCard = document.getElementById('polaroidCard');
          let canSkip = false;
          addTimer(setTimeout(() => { canSkip = true; }, 1200));

          pCard.addEventListener('click', () => {
            if (canSkip && !state.busy) {
              transitionTo('invitation');
            }
          });

          // Auto proceed after reading
          addTimer(setTimeout(() => {
            if (state.step === 'printing') {
              transitionTo('invitation');
            }
          }, 3800));
          break;
        }

        case 'invitation': {
          const coupleSrc = CONFIG.couplePhoto || EMBEDDED_ASSETS.couple;
          const title = escapeHtml(CONFIG.invitationTitle || 'Em đi hẹn hò\\nvới anh nhé?').replace(/\\n/g, '<br>');

          container.innerHTML = \`
            <div class="card-paper card-paper-long" tabindex="-1">
              <div class="couple-polaroid">
                <img src="\${coupleSrc}" alt="Ảnh đôi kỷ niệm" class="couple-img">
              </div>
              <div class="eyebrow">gửi em</div>
              <h2 class="title-card">\${title}</h2>
              <div class="playful-hint" id="playfulHint">
                \${state.teaseCount > 0 ? escapeHtml(HINTS[(state.teaseCount - 1) % HINTS.length]) : ''}
              </div>
              <button class="btn btn-caramel btn-agree" id="btnAgree">
                Đồng ý luôn!
              </button>
              <div class="playful-zone" id="playfulZone">
                <button class="btn btn-secondary btn-think" id="btnThink">
                  Để em suy nghĩ xíu...
                </button>
              </div>
            </div>
          \`;

          const agreeBtn = document.getElementById('btnAgree');
          const thinkBtn = document.getElementById('btnThink');

          if (state.teaseCount > 0) {
            agreeBtn.style.transform = \`scale(\${Math.min(1 + state.teaseCount * 0.025, 1.10)})\`;
          }

          agreeBtn.addEventListener('click', () => {
            if (state.busy) return;
            agreeBtn.style.transform = 'scale(0.96)';
            addTimer(setTimeout(() => {
              transitionTo('celebrate');
            }, 140));
          });

          if (CONFIG.enablePlayfulButton) {
            initPlayfulButton(thinkBtn, agreeBtn);
          }
          break;
        }

        case 'celebrate': {
          container.innerHTML = \`
            <div class="yeay-box" tabindex="-1">
              <h1 class="yeay-title">Yeay!</h1>
              <p class="yeay-sub">Em gật đầu rồi nè 💌</p>
            </div>
          \`;

          const box = container.querySelector('.yeay-box');
          for (let i = 0; i < 10; i++) {
            const h = document.createElement('div');
            h.className = 'heart-particle';
            h.textContent = i % 2 === 0 ? '❤️' : '💌';
            h.style.left = \`calc(50% + \${(Math.random() - 0.5) * 160}px)\`;
            h.style.top = \`calc(50% + \${(Math.random() - 0.5) * 60}px)\`;
            h.style.setProperty('--tx', \`\${(Math.random() - 0.5) * 80}px\`);
            h.style.animationDelay = \`\${i * 90}ms\`;
            box.appendChild(h);
          }

          addTimer(setTimeout(() => {
            transitionTo('reasons');
          }, 1400));
          break;
        }

        case 'reasons': {
          const title = escapeHtml(CONFIG.reasonTitle || 'Vài lý do anh muốn\\nđưa em đi hẹn hò...').replace(/\\n/g, '<br>');
          const text = escapeHtml(CONFIG.reasonText || 'Nụ cười của em làm anh vui cả ngày và muốn có thêm nhiều kỷ niệm bên em 🥰 📷');
          const collageSrc = EMBEDDED_ASSETS.collage;

          container.innerHTML = \`
            <div class="card-paper" tabindex="-1">
              <div class="eyebrow">trước khi buổi hẹn bắt đầu</div>
              <div class="collage-container">
                <img src="\${collageSrc}" alt="Kỷ niệm dễ thương" class="collage-img">
              </div>
              <h2 class="title-card" style="font-size: 26px; margin-bottom: 12px;">\${title}</h2>
              <p class="reason-text">\${text}</p>
              <button class="btn btn-caramel" id="btnToAvailability" style="width: 82%; height: 54px;">
                Cùng lên kế hoạch nhé
              </button>
            </div>
          \`;

          document.getElementById('btnToAvailability').addEventListener('click', () => {
            transitionTo('availability');
          });
          break;
        }

        case 'availability': {
          container.innerHTML = \`
            <div class="card-paper" tabindex="-1">
              <div class="eyebrow">gửi em</div>
              <h2 class="title-card" style="margin-bottom: 20px;">Khi nào em<br>rảnh?</h2>
              
              <div class="form-group">
                <!-- Date picker box -->
                <div class="input-box" id="dateBox">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <div class="input-display \${state.availability.date ? '' : 'placeholder'}" id="dateDisplay">
                    \${state.availability.date ? formatDateVi(state.availability.date) : 'Chọn ngày (không bắt buộc)'}
                  </div>
                  <input type="date" class="native-hidden-input" id="nativeDate" value="\${state.availability.date || ''}">
                </div>
                <div class="date-warning" id="dateWarning">Ngày này đã qua rồi nè, em chọn một ngày sắp tới nhé ♡</div>

                <!-- Periods pills list -->
                <div class="periods-list" id="periodsList">
                  \${PERIODS.map(p => \`
                    <button type="button" class="pill-period \${state.availability.period === p.id ? 'active' : ''}" data-period="\${p.id}">
                      \${p.label}
                    </button>
                  \`).join('')}
                </div>

                <!-- Time picker box -->
                <div class="input-box" id="timeBox">
                  <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div class="input-display \${state.availability.time ? '' : 'placeholder'}" id="timeDisplay">
                    \${state.availability.time ? state.availability.time : 'Chọn giờ (không bắt buộc)'}
                  </div>
                  <input type="time" class="native-hidden-input" id="nativeTime" value="\${state.availability.time || ''}">
                </div>
              </div>

              <button class="btn btn-caramel" id="btnToActivities" style="width: 82%; height: 54px;">
                Tiếp tục
              </button>
            </div>
          \`;

          const nativeDate = document.getElementById('nativeDate');
          const dateDisplay = document.getElementById('dateDisplay');
          const dateBox = document.getElementById('dateBox');
          const dateWarning = document.getElementById('dateWarning');

          // Trigger picker on box click
          dateBox.addEventListener('click', () => {
            if (typeof nativeDate.showPicker === 'function') {
              try { nativeDate.showPicker(); } catch (e) { nativeDate.focus(); }
            } else {
              nativeDate.focus();
            }
          });

          nativeDate.addEventListener('change', (e) => {
            const val = e.target.value;
            state.availability.date = val;
            if (val) {
              dateDisplay.textContent = formatDateVi(val);
              dateDisplay.classList.remove('placeholder');
              dateBox.classList.add('active');

              if (isDateInPast(val)) {
                dateWarning.style.display = 'block';
              } else {
                dateWarning.style.display = 'none';
              }
            } else {
              dateDisplay.textContent = 'Chọn ngày (không bắt buộc)';
              dateDisplay.classList.add('placeholder');
              dateBox.classList.remove('active');
              dateWarning.style.display = 'none';
            }
            saveDraft();
          });

          // Period selection
          const periodBtns = document.querySelectorAll('.pill-period');
          periodBtns.forEach(btn => {
            btn.addEventListener('click', () => {
              periodBtns.forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              state.availability.period = btn.getAttribute('data-period');
              saveDraft();
            });
          });

          // Time selection
          const nativeTime = document.getElementById('nativeTime');
          const timeDisplay = document.getElementById('timeDisplay');
          const timeBox = document.getElementById('timeBox');

          timeBox.addEventListener('click', () => {
            if (typeof nativeTime.showPicker === 'function') {
              try { nativeTime.showPicker(); } catch (e) { nativeTime.focus(); }
            } else {
              nativeTime.focus();
            }
          });

          nativeTime.addEventListener('change', (e) => {
            const val = e.target.value;
            state.availability.time = val;
            if (val) {
              timeDisplay.textContent = val;
              timeDisplay.classList.remove('placeholder');
              timeBox.classList.add('active');
            } else {
              timeDisplay.textContent = 'Chọn giờ (không bắt buộc)';
              timeDisplay.classList.add('placeholder');
              timeBox.classList.remove('active');
            }
            saveDraft();
          });

          document.getElementById('btnToActivities').addEventListener('click', () => {
            saveDraft();
            transitionTo('activities');
          });
          break;
        }

        case 'activities': {
          container.innerHTML = \`
            <div class="card-paper" style="width: min(92vw, 380px); padding: 24px 18px;" tabindex="-1">
              <div class="eyebrow">gửi em</div>
              <h2 class="title-card" style="font-size: 28px; margin-bottom: 8px;">Mình đi đâu, làm gì<br>nhỉ?</h2>
              
              <div class="activities-grid">
                \${ACTIVITIES.map(act => \`
                  <div class="activity-card \${state.activityId === act.id ? 'active' : ''}" data-act="\${act.id}" role="button" tabindex="0">
                    <div class="activity-icon">
                      \${ACTIVITY_SVGS[act.id] || ''}
                    </div>
                    <div class="activity-label">\${escapeHtml(act.label)}</div>
                  </div>
                \`).join('')}
              </div>
            </div>
          \`;

          const actCards = document.querySelectorAll('.activity-card');
          actCards.forEach(card => {
            const selectAct = () => {
              if (state.busy) return;
              actCards.forEach(c => c.classList.remove('active'));
              card.classList.add('active');
              state.activityId = card.getAttribute('data-act');
              saveDraft();

              card.style.transform = 'scale(0.96)';
              addTimer(setTimeout(() => {
                card.style.transform = '';
              }, 140));

              // Auto advance
              addTimer(setTimeout(() => {
                transitionTo('note');
              }, 280));
            };

            card.addEventListener('click', selectAct);
            card.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                selectAct();
              }
            });
          });
          break;
        }

        case 'note': {
          container.innerHTML = \`
            <div class="card-paper" tabindex="-1">
              <div class="eyebrow">điều cuối cùng</div>
              <h2 class="title-card" style="font-size: 28px; margin-bottom: 12px;">Có lời nhắn nào<br>cho anh không?</h2>
              
              <div class="note-textarea-box">
                <textarea class="note-textarea" id="noteInput" maxlength="500" placeholder="không bắt buộc, bỏ trống\\ncũng được..."></textarea>
                <div class="note-counter" id="noteCounter" style="display:none;">0/500</div>
              </div>

              <button class="btn btn-caramel" id="btnCreateTicket" style="width: 82%; height: 54px;">
                Tạo vé cho mình
              </button>
            </div>
          \`;

          const noteInput = document.getElementById('noteInput');
          const counter = document.getElementById('noteCounter');
          noteInput.value = state.note;

          const updateCounter = () => {
            const len = noteInput.value.length;
            if (len >= 400) {
              counter.style.display = 'block';
              counter.textContent = \`\${len}/500\`;
            } else {
              counter.style.display = 'none';
            }
          };
          updateCounter();

          noteInput.addEventListener('input', () => {
            state.note = noteInput.value;
            updateCounter();
            saveDraft();
          });

          document.getElementById('btnCreateTicket').addEventListener('click', () => {
            state.note = noteInput.value.trim();
            saveDraft();
            state.ticket = createTicketModel();
            runtime.cachedTicketBlob = null;
            transitionTo('ticket');
          });
          break;
        }

        case 'ticket': {
          const model = state.ticket || createTicketModel();
          const recipient = escapeHtml(model.recipientName || CONFIG.recipientName || 'em');
          const sender = escapeHtml(model.senderName || CONFIG.senderName || 'anh');
          const availFormatted = escapeHtml(formatAvailability(model));
          const actLabel = escapeHtml(getActivityLabel(model.activityId));
          const noteText = model.note 
            ? escapeHtml(model.note).replace(/\\n/g, '<br>') 
            : 'Một lời nhắn để dành khi gặp nhau ♡';
          const closing = escapeHtml(model.closingText || CONFIG.closingText);

          container.innerHTML = \`
            <div class="ticket-wrapper">
              <div class="ticket-card" id="ticketCard" tabindex="-1">
                <!-- Header -->
                <div class="ticket-header">
                  <div class="ticket-title-group">
                    <span class="ticket-badge">VÉ CHO HAI NGƯỜI</span>
                    <h1 class="ticket-main-title">Vé Hẹn<br>Hò</h1>
                  </div>
                  <div class="ticket-stamp">
                    <svg class="stamp-heart" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>
                </div>

                <hr class="ticket-divider" id="ticketDivider">

                <!-- Rows -->
                <div class="ticket-rows">
                  <!-- Row 1: Recipient -->
                  <div class="ticket-row">
                    <div class="ticket-icon-disc">
                      <svg viewBox="0 0 24 24" fill="#AA713D">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                    <div class="ticket-row-content">
                      <span class="ticket-row-label">DÀNH CHO</span>
                      <span class="ticket-row-val">\${recipient}</span>
                    </div>
                  </div>

                  <!-- Row 2: Availability -->
                  <div class="ticket-row">
                    <div class="ticket-icon-disc">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#AA713D" stroke-width="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div class="ticket-row-content">
                      <span class="ticket-row-label">KHI NÀO</span>
                      <span class="ticket-row-val">\${availFormatted}</span>
                    </div>
                  </div>

                  <!-- Row 3: Activity -->
                  <div class="ticket-row">
                    <div class="ticket-icon-disc">
                      \${ACTIVITY_SVGS[model.activityId] || ''}
                    </div>
                    <div class="ticket-row-content">
                      <span class="ticket-row-label">KẾ HOẠCH</span>
                      <span class="ticket-row-val">\${actLabel}</span>
                    </div>
                  </div>

                  <!-- Row 4: Note -->
                  <div class="ticket-row">
                    <div class="ticket-icon-disc">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#AA713D" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                    </div>
                    <div class="ticket-row-content">
                      <span class="ticket-row-label">LỜI NHẮN</span>
                      <span class="ticket-row-val">\${noteText}</span>
                    </div>
                  </div>
                </div>

                <hr class="ticket-divider">

                <!-- Closing -->
                <p class="ticket-closing-text">\${closing}</p>
                <div class="ticket-signature">từ \${sender}, gửi \${recipient} 💌</div>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="ticket-actions-group">
              <p class="ticket-hint-guide">Gửi tấm vé này cho anh nhé, để cả hai cùng đếm ngược đến buổi hẹn 💌</p>
              
              <button class="btn btn-caramel" id="btnShareTicket" style="width: 100%; height: 54px; font-size: 16px;">
                Chia sẻ vé 📷
              </button>
              
              <button class="btn btn-secondary" id="btnCopyNote" style="width: 100%; height: 50px;">
                Chép lời nhắn
              </button>

              <button class="btn btn-secondary" id="btnCopyLink" style="width: 100%; height: 50px;">
                Chép link gửi lại
              </button>

              <button class="btn-text" id="btnReset">
                \${state.isViewOnly ? 'Tạo lời mời mới' : 'Làm lại từ đầu'}
              </button>
            </div>
          \`;

          // Dynamically align cutout notch with the divider line
          const ticketCard = document.getElementById('ticketCard');
          const divider = document.getElementById('ticketDivider');
          if (ticketCard && divider) {
            const notchY = divider.offsetTop + 1;
            ticketCard.style.setProperty('--notch-y', notchY + 'px');
          }

          document.getElementById('btnShareTicket').addEventListener('click', shareTicket);
          document.getElementById('btnCopyNote').addEventListener('click', copyTicketText);
          document.getElementById('btnCopyLink').addEventListener('click', copyTicketLink);
          document.getElementById('btnReset').addEventListener('click', handleResetClick);
          break;
        }
      }
    }

    /* ====================================================
       STEP MOUNTING & TRANSITIONS
       ==================================================== */
    function transitionTo(nextStep) {
      if (state.busy) return;
      state.busy = true;

      const container = document.getElementById('stepContainer');
      clearAllTimers();

      if (container && container.firstElementChild) {
        container.firstElementChild.classList.add('fade-slide-exit');
        addTimer(setTimeout(() => {
          state.step = nextStep;
          renderStep(nextStep);
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (container.firstElementChild) {
            container.firstElementChild.classList.add('fade-slide-enter');
          }
          state.busy = false;

          const h = container.querySelector('h1, h2, [tabindex="-1"]');
          if (h && typeof h.focus === 'function') h.focus();
        }, 300));
      } else {
        state.step = nextStep;
        renderStep(nextStep);
        if (container && container.firstElementChild) {
          container.firstElementChild.classList.add('fade-slide-enter');
        }
        state.busy = false;
      }
    }

    /* ====================================================
       INTERACTIONS: SNAP (INTRO)
       ==================================================== */
    function handleSnapClick() {
      if (state.busy) return;
      const cameraBox = document.getElementById('cameraBox');
      const flash = document.getElementById('flashOverlay');

      if (cameraBox) {
        cameraBox.style.transform = 'scale(0.96) translateY(4px)';
      }
      if (flash) {
        flash.classList.add('active');
        setTimeout(() => {
          flash.classList.remove('active');
        }, 130);
      }

      setTimeout(() => {
        transitionTo('printing');
      }, 200);
    }

    /* ====================================================
       INTERACTIONS: PLAYFUL "THINK" BUTTON
       ==================================================== */
    function initPlayfulButton(thinkBtn, agreeBtn) {
      if (!thinkBtn) return;

      const TAUNT_LABELS = [
        'Để em suy nghĩ xíu...',
        'Hông cho bấm đâu 😜',
        'Né nèee 💨',
        'Bấm hụt rồi lêu lêu 😝',
        'Đồng ý đi mừ ❤️',
        'Vẫn cố bấm hả? 😂',
        'Đừng đuổi theo em 🏃',
        'Chịu thua chưa nè? 🥺'
      ];

      const HINT_MESSAGES = [
        'Ơ, một cái mời có tâm thế này mà 🥺',
        'Nút đồng ý lớn dễ hơn nhiều đó nha 👉',
        'Nút này né siêu đỉnh, em không bấm được đâu 😜',
        'Chạy đâu cho thoát, bấm "Đồng ý luôn" đi nè ❤️',
        'Càng né càng yêu đó nha, bấm Đồng Ý thôi em ơi! 🏃💨',
        'Mỏi tay chưa nè? Chịu thua bấm Đồng Ý đi mà 🥰',
        'Nút này cài radar né rồi, chỉ còn mỗi cách Đồng Ý thôi! 💌'
      ];

      let lastX = 0;
      let lastY = 0;
      let lastDodgeTime = 0;

      const dodge = (e) => {
        if (e && e.type === 'focus') return;
        if (e && e.cancelable) e.preventDefault();

        const now = Date.now();
        if (now - lastDodgeTime < 70) return; // Tiny cooldown to avoid browser loop
        lastDodgeTime = now;

        state.teaseCount++;

        // Update playful hint text
        const hintEl = document.getElementById('playfulHint');
        if (hintEl) {
          hintEl.textContent = HINT_MESSAGES[(state.teaseCount - 1) % HINT_MESSAGES.length];
        }

        // Change button taunt label
        thinkBtn.textContent = TAUNT_LABELS[state.teaseCount % TAUNT_LABELS.length];

        // Progressively grow "Đồng ý luôn!" button
        if (agreeBtn) {
          const scale = Math.min(1 + state.teaseCount * 0.035, 1.20);
          agreeBtn.style.transform = `scale(${scale})`;
          agreeBtn.style.boxShadow = `0 ${4 + state.teaseCount * 2}px ${14 + state.teaseCount * 3}px rgba(170, 113, 61, ${Math.min(0.35 + state.teaseCount * 0.04, 0.7)})`;
        }

        const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isReduced) return;

        const zone = document.getElementById('playfulZone');
        if (!zone) return;

        const zoneRect = zone.getBoundingClientRect();
        const btnRect = thinkBtn.getBoundingClientRect();

        const maxX = Math.max(25, (zoneRect.width - btnRect.width) / 2);
        const maxY = 45;

        // Pick a spot that is far from current position (> 60px)
        let newX, newY;
        let attempts = 0;
        do {
          newX = (Math.random() * 2 - 1) * maxX;
          newY = (Math.random() * 2 - 1) * maxY;
          attempts++;
        } while (Math.hypot(newX - lastX, newY - lastY) < 65 && attempts < 10);

        lastX = newX;
        lastY = newY;

        // Chaotic rotation between -10 and +10 degrees
        const rot = (Math.random() * 20 - 10).toFixed(1);

        thinkBtn.style.transition = 'transform 160ms cubic-bezier(0.18, 0.89, 0.32, 1.28)';
        thinkBtn.style.transform = `translate(${newX.toFixed(1)}px, ${newY.toFixed(1)}px) rotate(${rot}deg)`;
      };

      // 1. Proximity magnet dodge: when cursor enters within 65px on desktop
      const zone = document.getElementById('playfulZone');
      if (zone) {
        zone.addEventListener('pointermove', (e) => {
          if (e.pointerType === 'touch') return;
          const rect = thinkBtn.getBoundingClientRect();
          const btnCenterX = rect.left + rect.width / 2;
          const btnCenterY = rect.top + rect.height / 2;
          const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
          if (dist < 65) {
            dodge(e);
          }
        });
      }

      // 2. Direct hover, pointerdown, touchstart and click events
      thinkBtn.addEventListener('pointerenter', dodge);
      thinkBtn.addEventListener('pointerover', dodge);
      thinkBtn.addEventListener('pointerdown', dodge);
      thinkBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        dodge(e);
      }, { passive: false });
      thinkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dodge(e);
      });
    }

    /* ====================================================
       CANVAS 2D TICKET RENDERER (PNG EXPORT)
       ==================================================== */
    async function renderTicketPng(model) {
      if (runtime.cachedTicketBlob) {
        return runtime.cachedTicketBlob;
      }

      await document.fonts.ready;

      const canvas = document.getElementById('ticketCanvas');
      const ctx = canvas.getContext('2d');

      const W = 720;
      ctx.font = '28px "Dancing Script", cursive';
      const note = model.note ? model.note : 'Một lời nhắn để dành khi gặp nhau ♡';
      const noteLines = getWrappedLines(ctx, note, W - 140);
      const closingLines = getWrappedLines(ctx, model.closingText || CONFIG.closingText, W - 100);

      const headerH = 170;
      const rowsH = 65 + 65 + 65 + Math.max(65, noteLines.length * 36 + 30);
      const closingH = closingLines.length * 40 + 40;
      const signatureH = 60;
      const H = headerH + rowsH + closingH + signatureH + 80;

      const scale = 2;
      canvas.width = W * scale;
      canvas.height = H * scale;
      ctx.scale(scale, scale);

      ctx.clearRect(0, 0, W, H);

      const notchY = 220;
      const notchR = 24;
      const r = 28;

      // Draw ticket path with inward semi-circle notches
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(W - r, 0);
      ctx.arcTo(W, 0, W, r, r);
      ctx.lineTo(W, notchY - notchR);
      ctx.arc(W, notchY, notchR, -Math.PI / 2, Math.PI / 2, true);
      ctx.lineTo(W, H - r);
      ctx.arcTo(W, H, W - r, H, r);
      ctx.lineTo(r, H);
      ctx.arcTo(0, H, 0, H - r, r);
      ctx.lineTo(0, notchY + notchR);
      ctx.arc(0, notchY, notchR, Math.PI / 2, -Math.PI / 2, true);
      ctx.lineTo(0, r);
      ctx.arcTo(0, 0, r, 0, r);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, '#FAF4E2');
      grad.addColorStop(1, '#F3ECE2');
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = '#DCCEBC';
      ctx.lineWidth = 2.5;
      ctx.stroke();
      ctx.restore();

      // 1. Header: VÉ CHO HAI NGƯỜI
      ctx.fillStyle = '#A18C70';
      ctx.font = '700 16px system-ui, -apple-system, sans-serif';
      ctx.fillText('VÉ CHO HAI NGƯỜI', 50, 68);

      // Title: Vé Hẹn Hò
      ctx.fillStyle = '#504735';
      ctx.font = '700 52px "Dancing Script", cursive';
      ctx.fillText('Vé Hẹn', 50, 120);
      ctx.fillText('Hò', 50, 168);

      // Stamp in top right
      ctx.save();
      ctx.translate(W - 85, 95);
      ctx.rotate(0.08);
      ctx.beginPath();
      ctx.arc(0, 0, 42, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF9';
      ctx.fill();
      ctx.strokeStyle = '#DCCEBC';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();

      ctx.fillStyle = '#E9ADA6';
      drawHeart(ctx, 0, 3, 24);
      ctx.restore();

      // Divider 1
      drawDashedLine(ctx, 50, notchY, W - 50, notchY);

      // Rows
      let currY = notchY + 45;

      // Row 1: DÀNH CHO
      drawInfoRow(ctx, 'DÀNH CHO', model.recipientName || CONFIG.recipientName || 'em', 50, currY, 'heart');
      currY += 68;

      // Row 2: KHI NÀO
      drawInfoRow(ctx, 'KHI NÀO', formatAvailability(model), 50, currY, 'clock');
      currY += 68;

      // Row 3: KẾ HOẠCH
      drawInfoRow(ctx, 'KẾ HOẠCH', getActivityLabel(model.activityId), 50, currY, model.activityId);
      currY += 68;

      // Row 4: LỜI NHẮN
      drawInfoRowMultiLine(ctx, 'LỜI NHẮN', noteLines, 50, currY);
      currY += Math.max(65, noteLines.length * 36 + 25);

      // Divider 2
      drawDashedLine(ctx, 50, currY, W - 50, currY);
      currY += 38;

      // Closing paragraph (centered)
      ctx.fillStyle = '#504735';
      ctx.font = '26px "Dancing Script", cursive';
      ctx.textAlign = 'center';
      for (const line of closingLines) {
        ctx.fillText(line, W / 2, currY);
        currY += 38;
      }

      // Signature (centered)
      currY += 12;
      ctx.fillStyle = '#A18C70';
      ctx.font = '22px "Dancing Script", cursive';
      ctx.fillText(\`từ \${model.senderName || CONFIG.senderName || 'anh'}, gửi \${model.recipientName || CONFIG.recipientName || 'em'} 💌\`, W / 2, currY);

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          runtime.cachedTicketBlob = blob;
          resolve(blob);
        }, 'image/png');
      });
    }

    function drawDashedLine(ctx, x1, y1, x2, y2) {
      ctx.save();
      ctx.strokeStyle = '#D4C4B0';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.restore();
    }

    function drawInfoRow(ctx, label, value, x, y, iconType) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x + 22, y + 10, 22, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF9';
      ctx.fill();
      ctx.strokeStyle = '#DCCEBC';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#AA713D';
      drawBadgeIcon(ctx, iconType, x + 22, y + 10, 12);
      ctx.restore();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#A18C70';
      ctx.font = '700 13px system-ui, -apple-system, sans-serif';
      ctx.fillText(label, x + 58, y);

      ctx.fillStyle = '#504735';
      ctx.font = '600 28px "Dancing Script", cursive';
      ctx.fillText(value, x + 58, y + 30);
    }

    function drawInfoRowMultiLine(ctx, label, lines, x, y) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x + 22, y + 10, 22, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFDF9';
      ctx.fill();
      ctx.strokeStyle = '#DCCEBC';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#AA713D';
      drawMessageIcon(ctx, x + 22, y + 10, 11);
      ctx.restore();

      ctx.textAlign = 'left';
      ctx.fillStyle = '#A18C70';
      ctx.font = '700 13px system-ui, -apple-system, sans-serif';
      ctx.fillText(label, x + 58, y);

      ctx.fillStyle = '#504735';
      ctx.font = '600 28px "Dancing Script", cursive';
      let lineY = y + 30;
      for (const line of lines) {
        ctx.fillText(line, x + 58, lineY);
        lineY += 34;
      }
    }

    function drawBadgeIcon(ctx, type, cx, cy, s) {
      ctx.save();
      ctx.fillStyle = '#AA713D';
      ctx.strokeStyle = '#AA713D';
      ctx.lineWidth = 1.8;

      if (type === 'heart') {
        drawHeart(ctx, cx, cy + 2, s * 1.1);
      } else if (type === 'clock') {
        drawClock(ctx, cx, cy, s * 0.9);
      } else if (type === 'aquarium') {
        // cute fish
        ctx.beginPath();
        ctx.ellipse(cx, cy, s * 0.8, s * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(cx + s * 0.6, cy);
        ctx.lineTo(cx + s * 1.1, cy - s * 0.5);
        ctx.lineTo(cx + s * 1.1, cy + s * 0.5);
        ctx.closePath();
        ctx.fill();
      } else if (type === 'coffee') {
        ctx.strokeRect(cx - s * 0.7, cy - s * 0.4, s * 1.4, s * 1.1);
        ctx.beginPath();
        ctx.arc(cx + s * 0.7, cy + s * 0.1, s * 0.35, -Math.PI / 2, Math.PI / 2);
        ctx.stroke();
      } else if (type === 'cinema') {
        ctx.strokeRect(cx - s * 0.8, cy - s * 0.6, s * 1.6, s * 1.2);
        drawStar(ctx, cx, cy, s * 0.45);
      } else if (type === 'dinner') {
        ctx.beginPath();
        ctx.arc(cx, cy + s * 0.2, s * 0.8, 0, Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx - s, cy + s * 0.2);
        ctx.lineTo(cx + s, cy + s * 0.2);
        ctx.stroke();
      } else {
        drawStar(ctx, cx, cy, s * 0.9);
      }
      ctx.restore();
    }

    function drawHeart(ctx, cx, cy, size) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.beginPath();
      ctx.moveTo(0, size * 0.4);
      ctx.bezierCurveTo(-size * 0.7, -size * 0.2, -size * 0.7, -size * 0.8, 0, -size * 0.3);
      ctx.bezierCurveTo(size * 0.7, -size * 0.8, size * 0.7, -size * 0.2, 0, size * 0.4);
      ctx.fill();
      ctx.restore();
    }

    function drawClock(ctx, cx, cy, r) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx, cy - r * 0.6);
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + r * 0.45, cy);
      ctx.stroke();
    }

    function drawStar(ctx, cx, cy, r) {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    }

    function drawMessageIcon(ctx, cx, cy, s) {
      ctx.strokeRect(cx - s, cy - s * 0.7, s * 2, s * 1.4);
      ctx.beginPath();
      ctx.moveTo(cx - s, cy - s * 0.7);
      ctx.lineTo(cx, cy + s * 0.2);
      ctx.lineTo(cx + s, cy - s * 0.7);
      ctx.stroke();
    }

    function getWrappedLines(ctx, text, maxWidth) {
      const paragraphs = text.split(/\\r?\\n/);
      const lines = [];
      for (const para of paragraphs) {
        if (!para.trim()) {
          lines.push('');
          continue;
        }
        const words = para.split(' ');
        let currentLine = words[0];
        for (let i = 1; i < words.length; i++) {
          const testLine = currentLine + ' ' + words[i];
          if (ctx.measureText(testLine).width <= maxWidth) {
            currentLine = testLine;
          } else {
            lines.push(currentLine);
            currentLine = words[i];
          }
        }
        lines.push(currentLine);
      }
      return lines;
    }

    /* ====================================================
       SHARING & CLIPBOARD ACTIONS
       ==================================================== */
    async function shareTicket() {
      const btn = document.getElementById('btnShareTicket');
      if (!btn || btn.disabled) return;

      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      btn.textContent = 'Đang chuẩn bị...';

      try {
        const model = state.ticket || createTicketModel();
        const blob = await renderTicketPng(model);

        if (blob && navigator.share && navigator.canShare) {
          const file = new File([blob], 've-hen-ho.png', { type: 'image/png' });
          if (navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                title: 'Vé hẹn hò của mình 💌',
                text: 'Tấm vé hẹn hò đặc biệt dành riêng cho hai đứa mình nè!',
                files: [file]
              });
              showToast('Đã mở chia sẻ vé 💌');
              return;
            } catch (err) {
              if (err.name === 'AbortError') {
                return;
              }
            }
          }
        }

        // Fallback: download PNG file
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 've-hen-ho.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => URL.revokeObjectURL(url), 2000);
          showToast('Đã lưu ảnh vé hẹn hò 📷');
        }
      } catch (err) {
        showToast('Chưa thể chia sẻ trực tiếp, bạn hãy chụp màn hình vé nhé ♡');
      } finally {
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
        btn.innerHTML = originalText;
      }
    }

    async function copyTicketText() {
      const model = state.ticket || createTicketModel();
      const recipient = model.recipientName || CONFIG.recipientName || 'em';
      const sender = model.senderName || CONFIG.senderName || 'anh';
      const avail = formatAvailability(model);
      const act = getActivityLabel(model.activityId);
      const note = model.note ? model.note : 'Một lời nhắn để dành khi gặp nhau ♡';
      const closing = model.closingText || CONFIG.closingText;

      const text = [
        '💌 VÉ HẸN HÒ',
        \`Dành cho: \${recipient}\`,
        \`Khi nào: \${avail}\`,
        \`Kế hoạch: \${act}\`,
        \`Lời nhắn: \${note}\`,
        '',
        closing,
        \`Từ \${sender}, gửi \${recipient} ♡\`
      ].join('\\n');

      let copied = false;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch (e) {}
      }

      if (!copied) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        ta.style.top = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
          copied = document.execCommand('copy');
        } catch (e) {}
        document.body.removeChild(ta);
      }

      if (copied) {
        showToast('Đã chép lời nhắn 💌');
      } else {
        openCopyModal('Lời nhắn vé hẹn hò', text);
      }
    }

    async function copyTicketLink() {
      let baseUrl = CONFIG.invitationUrl;
      if (!baseUrl && window.location.protocol.startsWith('http')) {
        baseUrl = window.location.origin + window.location.pathname;
      }

      if (!baseUrl || !baseUrl.startsWith('http')) {
        showToast('Bạn cần đưa file lên hosting để có link gửi lại. Hiện tại có thể lưu ảnh hoặc chép lời nhắn ♡', 4000);
        return;
      }

      const model = state.ticket || createTicketModel();
      const payload = encodeTicketPayload(model);
      const fullUrl = \`\${baseUrl}#ticket=\${payload}\`;

      let copied = false;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(fullUrl);
          copied = true;
        } catch (e) {}
      }

      if (!copied) {
        const ta = document.createElement('textarea');
        ta.value = fullUrl;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        ta.style.top = '0';
        document.body.appendChild(ta);
        ta.select();
        try {
          copied = document.execCommand('copy');
        } catch (e) {}
        document.body.removeChild(ta);
      }

      if (copied) {
        showToast('Đã chép link gửi lại 💌');
      } else {
        openCopyModal('Link gửi lại vé hẹn hò', fullUrl);
      }
    }

    function handleResetClick() {
      const btn = document.getElementById('btnReset');
      if (!btn) return;

      if (!runtime.resetConfirmTimer) {
        btn.textContent = 'Bấm lần nữa để xác nhận làm lại';
        runtime.resetConfirmTimer = setTimeout(() => {
          btn.textContent = state.isViewOnly ? 'Tạo lời mời mới' : 'Làm lại từ đầu';
          runtime.resetConfirmTimer = null;
        }, 3000);
      } else {
        clearTimeout(runtime.resetConfirmTimer);
        runtime.resetConfirmTimer = null;
        clearDraft();
        state.teaseCount = 0;
        state.availability = { date: '', period: 'morning', time: '' };
        state.activityId = 'aquarium';
        state.note = '';
        state.ticket = null;
        state.isViewOnly = false;
        runtime.cachedTicketBlob = null;
        if (window.location.hash) {
          history.replaceState(null, '', window.location.pathname);
        }
        transitionTo('intro');
        showToast('Đã bắt đầu lại từ đầu ♡');
      }
    }

    /* ====================================================
       INITIALIZATION
       ==================================================== */
    function init() {
      const footerEl = document.getElementById('appFooter');
      if (footerEl) {
        if (!CONFIG.showFooter) {
          footerEl.style.display = 'none';
        } else if (CONFIG.footerText) {
          footerEl.textContent = CONFIG.footerText;
        }
      }

      // Check URL Hash for shared ticket
      if (window.location.hash && window.location.hash.includes('ticket=')) {
        const decoded = decodeTicketPayload(window.location.hash);
        if (decoded) {
          state.ticket = decoded;
          state.isViewOnly = true;
          state.step = 'ticket';
          renderStep('ticket');
          showToast('Đã mở vé hẹn hò được chia sẻ 💌');
          return;
        } else {
          showToast('Link vé chưa hợp lệ, mình bắt đầu lại nhé');
        }
      }

      loadDraft();
      state.step = 'intro';
      renderStep('intro');
    }

    window.addEventListener('DOMContentLoaded', init);
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', htmlContent, 'utf8');
console.log('Successfully updated index.html. Total size:', fs.statSync('index.html').size);
