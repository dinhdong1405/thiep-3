// Generator script for Thiệp 4: Gửi em một vũ trụ
const fs = require('fs');
const path = require('path');

function generateHtml() {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#080C24">
  <meta name="description" content="Gửi em một vũ trụ — Một món quà tương tác lãng mạn giữa những vì sao">
  <title>Gửi Em Một Vũ Trụ ✨</title>
  <style>
    /* ====================================================
       1. DESIGN TOKENS & RESET
       ==================================================== */
    :root {
      --night: #080C24;
      --night-2: #151333;
      --night-3: #251B42;
      --nebula: #72549B;
      --ice: #A5D9EF;
      --rose: #F1A8C1;
      --peach: #FFD1AE;
      --starlight: #FFF2DC;
      --text: #F8F1FF;
      --muted: #BDB5CE;
      --paper: #FFF6EA;
      --paper-ink: #51405C;
      --glass: rgba(255, 255, 255, 0.055);
      --glass-border: rgba(255, 241, 220, 0.16);
      --glass-card: rgba(21, 19, 51, 0.76);
      --ease-out: cubic-bezier(.22, 1, .36, 1);
      --font-serif: Georgia, 'Times New Roman', serif;
      --font-ui: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    html {
      color-scheme: dark;
      font-family: var(--font-ui);
      background-color: var(--night);
      height: 100%;
    }

    body {
      min-height: 100vh;
      min-height: 100svh;
      margin: 0;
      padding: 0;
      color: var(--text);
      background: linear-gradient(175deg, var(--night) 0%, var(--night-2) 48%, var(--night-3) 100%);
      background-attachment: fixed;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      overflow-x: hidden;
      overflow-y: auto;
      position: relative;
    }

    /* Fullscreen Universe Canvas (pointer-events none) */
    #universe {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }

    /* Ambient Nebulae */
    .nebula-glow {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }
    .nebula-glow::before {
      content: '';
      position: absolute;
      top: 15%;
      right: -10%;
      width: 70vw;
      height: 70vw;
      max-width: 500px;
      max-height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(114, 84, 155, 0.22) 0%, rgba(241, 168, 193, 0.1) 45%, transparent 70%);
      filter: blur(40px);
    }
    .nebula-glow::after {
      content: '';
      position: absolute;
      bottom: 5%;
      left: -10%;
      width: 65vw;
      height: 65vw;
      max-width: 440px;
      max-height: 440px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(165, 217, 239, 0.14) 0%, rgba(37, 27, 66, 0.12) 50%, transparent 70%);
      filter: blur(45px);
    }

    /* Main Container */
    #app {
      position: relative;
      z-index: 2;
      width: 100%;
      max-width: 440px;
      min-height: 100vh;
      min-height: 100svh;
      padding: calc(24px + env(safe-area-inset-top, 0px)) 20px calc(28px + env(safe-area-inset-bottom, 0px));
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    /* Scene Transitions & Visibility */
    .scene {
      width: 100%;
      display: none;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
      opacity: 0;
      transform: translateY(12px);
      transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
    }
    .scene.active {
      display: flex;
      opacity: 1;
      transform: translateY(0);
    }
    .scene.scene-exiting {
      opacity: 0;
      transform: translateY(-14px);
      pointer-events: none;
    }

    /* Typography */
    .eyebrow {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--starlight);
      opacity: 0.88;
      margin-bottom: 14px;
      text-shadow: 0 0 12px rgba(255, 242, 220, 0.45);
    }

    .title-serif {
      font-family: var(--font-serif);
      font-size: clamp(28px, 7.5vw, 36px);
      line-height: 1.25;
      letter-spacing: -0.02em;
      color: var(--text);
      margin-bottom: 12px;
      white-space: pre-line;
      text-shadow: 0 2px 20px rgba(0, 0, 0, 0.65);
    }

    .subtitle {
      font-size: 15px;
      line-height: 1.6;
      color: var(--muted);
      max-width: 340px;
      margin-bottom: 24px;
    }

    /* Standard Interactive Buttons */
    .btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 56px;
      padding: 0 32px;
      border-radius: 999px;
      background: linear-gradient(135deg, var(--peach) 0%, var(--rose) 100%);
      color: var(--night);
      font-family: var(--font-ui);
      font-size: 16px;
      font-weight: 650;
      border: none;
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(241, 168, 193, 0.32), 0 0 20px rgba(255, 209, 174, 0.28);
      transition: transform 0.2s var(--ease-out), box-shadow 0.2s var(--ease-out);
      position: relative;
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
    }
    .btn-primary:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 12px 28px rgba(241, 168, 193, 0.45), 0 0 26px rgba(255, 209, 174, 0.38);
    }
    .btn-primary:active {
      transform: translateY(1px) scale(0.98);
    }
    .btn-primary:focus-visible {
      outline: 2px solid var(--starlight);
      outline-offset: 3px;
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      height: 50px;
      padding: 0 24px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      color: var(--text);
      font-family: var(--font-ui);
      font-size: 15px;
      font-weight: 600;
      border: 1px solid var(--glass-border);
      cursor: pointer;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: all 0.2s var(--ease-out);
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
    }
    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.14);
      border-color: rgba(255, 241, 220, 0.35);
      transform: translateY(-1px);
    }
    .btn-secondary:active {
      transform: translateY(1px);
    }
    .btn-secondary:focus-visible {
      outline: 2px solid var(--starlight);
      outline-offset: 3px;
    }

    .btn-text {
      background: transparent;
      border: none;
      color: var(--starlight);
      font-family: var(--font-ui);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      padding: 8px 14px;
      border-radius: 8px;
      opacity: 0.85;
      transition: opacity 0.2s, background 0.2s;
      text-decoration: underline;
      text-underline-offset: 3px;
      touch-action: manipulation;
    }
    .btn-text:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.06);
    }

    /* ====================================================
       SCENE 0: SIGNAL (TÍN HIỆU NGÔI SAO)
       ==================================================== */
    #scene-signal {
      min-height: 80svh;
      justify-content: space-around;
      padding: 20px 0;
    }
    .signal-header {
      margin-top: 10px;
      transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
    }
    .signal-header.flying-out {
      opacity: 0;
      transform: translateY(-16px);
    }

    .signal-center {
      position: relative;
      width: 220px;
      height: 220px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
      cursor: pointer;
      transition: transform 0.85s cubic-bezier(.22, 1, .36, 1), opacity 0.85s;
    }
    .signal-center.flying-up {
      transform: translateY(-160px) scale(0.4);
      opacity: 0;
    }

    /* Breathing Halo */
    .signal-halo {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(241, 168, 193, 0.45) 0%, rgba(255, 209, 174, 0.25) 35%, transparent 70%);
      animation: signalHaloBreath 2.8s ease-in-out infinite alternate;
      pointer-events: none;
    }
    @keyframes signalHaloBreath {
      0% { transform: scale(0.9); opacity: 0.25; }
      100% { transform: scale(1.18); opacity: 0.65; }
    }

    /* Elliptical Orbits with orbiting satellites */
    .signal-orbit {
      position: absolute;
      border-radius: 50%;
      border: 1px dashed rgba(255, 241, 220, 0.24);
      pointer-events: none;
    }
    .signal-orbit-1 {
      width: 172px;
      height: 72px;
      transform: rotate(-24deg);
      animation: orbitRotate1 22s linear infinite;
    }
    .signal-orbit-2 {
      width: 198px;
      height: 78px;
      transform: rotate(32deg);
      animation: orbitRotate2 31s linear infinite reverse;
    }
    @keyframes orbitRotate1 {
      from { transform: rotate(-24deg); }
      to { transform: rotate(336deg); }
    }
    @keyframes orbitRotate2 {
      from { transform: rotate(32deg); }
      to { transform: rotate(-328deg); }
    }

    .satellite-star {
      position: absolute;
      top: -4px;
      left: 50%;
      width: 8px;
      height: 8px;
      margin-left: -4px;
      border-radius: 50%;
      background: var(--starlight);
      box-shadow: 0 0 10px 2px var(--starlight);
    }

    /* Central Luminous Star Button */
    .btn-signal-star {
      position: relative;
      width: 88px;
      height: 88px;
      background: transparent;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: signalStarBreath 2.8s ease-in-out infinite alternate;
      z-index: 3;
      touch-action: manipulation;
    }
    @keyframes signalStarBreath {
      0% { transform: scale(1); }
      100% { transform: scale(1.08); }
    }
    .btn-signal-star:focus-visible {
      outline: 2px solid var(--starlight);
      border-radius: 50%;
    }
    .star-core-svg {
      width: 88px;
      height: 88px;
      filter: drop-shadow(0 0 16px rgba(255, 209, 174, 0.85));
      transition: transform 0.15s ease-out;
    }
    .btn-signal-star:active .star-core-svg {
      transform: scale(0.82);
    }

    /* Ripple ring expanding on click */
    .signal-ripple {
      position: absolute;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid var(--peach);
      opacity: 0;
      pointer-events: none;
    }
    .signal-ripple.expanding {
      animation: rippleExpand 0.65s var(--ease-out) forwards;
    }
    @keyframes rippleExpand {
      0% { width: 30px; height: 30px; opacity: 0.95; }
      100% { width: 260px; height: 260px; opacity: 0; }
    }

    .signal-hint {
      font-size: 14px;
      color: var(--starlight);
      opacity: 0.85;
      display: flex;
      align-items: center;
      gap: 6px;
      animation: hintPulse 2.4s ease-in-out infinite alternate;
    }
    @keyframes hintPulse {
      0% { opacity: 0.6; transform: translateY(0); }
      100% { opacity: 1; transform: translateY(-2px); }
    }

    /* Ringed Pastel Planet at bottom right */
    .signal-planet {
      position: absolute;
      bottom: -20px;
      right: -25px;
      width: 130px;
      height: 130px;
      opacity: 0.85;
      pointer-events: none;
      transition: transform 1s var(--ease-out), opacity 1s;
    }

    /* ====================================================
       SCENE 1: QUESTION (CÂU HỎI VÀ NÚT CHẠY TRỐN)
       ==================================================== */
    #scene-question {
      min-height: 86svh;
      justify-content: flex-start;
      padding-top: 10px;
    }

    .question-celestial {
      position: relative;
      width: 140px;
      height: 60px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.6s var(--ease-out);
    }
    .planet-small {
      position: absolute;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      transition: transform 0.5s var(--ease-out);
    }
    .planet-ice {
      left: 18px;
      background: radial-gradient(circle at 35% 35%, #D4F1FF 0%, #7AC5E8 60%, #316E98 100%);
      box-shadow: 0 0 14px rgba(165, 217, 239, 0.6);
      animation: floatPlanet1 4.5s ease-in-out infinite alternate;
    }
    .planet-rose {
      right: 18px;
      background: radial-gradient(circle at 35% 35%, #FFE0EA 0%, #F1A8C1 60%, #9F5374 100%);
      box-shadow: 0 0 14px rgba(241, 168, 193, 0.6);
      animation: floatPlanet2 4.2s ease-in-out infinite alternate;
    }
    .celestial-heart {
      position: absolute;
      width: 20px;
      height: 20px;
      color: var(--peach);
      filter: drop-shadow(0 0 10px var(--rose));
      animation: celestialHeartBeat 1.8s ease-in-out infinite alternate;
    }
    @keyframes floatPlanet1 {
      0% { transform: translateY(-3px); }
      100% { transform: translateY(3px); }
    }
    @keyframes floatPlanet2 {
      0% { transform: translateY(3px); }
      100% { transform: translateY(-3px); }
    }
    @keyframes celestialHeartBeat {
      0% { transform: scale(0.9); opacity: 0.8; }
      100% { transform: scale(1.15); opacity: 1; }
    }

    /* Play Area for dodging button */
    .play-area {
      position: relative;
      width: 100%;
      height: 480px;
      max-height: 70svh;
      border-radius: 24px;
      background: var(--glass);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 12px 36px rgba(0, 0, 0, 0.35);
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      padding: 16px;
    }

    .question-texts {
      position: relative;
      z-index: 2;
      width: 100%;
      padding: 8px 12px 0;
    }

    /* Stationary YES CTA button */
    .btn-yes-wrapper {
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 5;
    }
    #btn-yes {
      min-width: 220px;
      height: 56px;
      font-size: 16px;
      font-weight: 650;
      white-space: nowrap;
      transition: transform 0.25s var(--ease-out), box-shadow 0.25s var(--ease-out);
    }
    #btn-yes.boost-halo {
      box-shadow: 0 0 32px 8px rgba(241, 168, 193, 0.52), 0 8px 30px rgba(255, 209, 174, 0.4);
    }

    /* Dodging Pill Button */
    #btn-dodge {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 4;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      width: clamp(180px, 52vw, 224px);
      height: 46px;
      padding: 0 16px;
      border-radius: 999px;
      background: rgba(21, 19, 51, 0.9);
      border: 1.5px solid rgba(241, 168, 193, 0.45);
      color: var(--starlight);
      font-family: var(--font-ui);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 0 14px rgba(241, 168, 193, 0.22);
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
      will-change: transform;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    #btn-dodge:focus-visible {
      outline: 2px solid var(--starlight);
      outline-offset: 2px;
    }
    .dodge-star-icon {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      color: var(--peach);
      transition: transform 0.2s, opacity 0.2s;
    }
    .dodge-label {
      flex: 1;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Comet Tail attached to dodging button */
    .comet-tail {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 16px;
      width: 70px;
      margin-top: -8px;
      margin-left: -35px;
      pointer-events: none;
      background: linear-gradient(to right, rgba(241, 168, 193, 0.55), transparent);
      border-radius: 999px;
      filter: blur(3px);
      opacity: 0;
      transform-origin: center center;
      transition: opacity 0.15s ease-out;
      z-index: -1;
    }
    .comet-tail.active {
      opacity: 1;
    }

    .question-hint {
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 13px;
      color: var(--muted);
      opacity: 0.8;
      white-space: nowrap;
      pointer-events: none;
      z-index: 2;
    }

    /* ====================================================
       SCENE 2: WARP (CÙNG BAY XUYÊN NHỮNG VÌ SAO)
       ==================================================== */
    #scene-warp {
      min-height: 80svh;
      justify-content: center;
      pointer-events: none;
    }
    .warp-center-glow {
      position: absolute;
      width: 160px;
      height: 160px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 242, 220, 0.7) 0%, rgba(241, 168, 193, 0.4) 40%, transparent 75%);
      filter: blur(16px);
      animation: warpRingScale 2.8s var(--ease-out) forwards;
    }
    @keyframes warpRingScale {
      0% { transform: scale(0.1); opacity: 0; }
      40% { transform: scale(1.4); opacity: 0.85; }
      80% { transform: scale(1.2); opacity: 0.7; }
      100% { transform: scale(0.6); opacity: 0; }
    }
    .warp-title {
      font-family: var(--font-serif);
      font-size: clamp(24px, 6vw, 30px);
      line-height: 1.35;
      color: var(--starlight);
      text-shadow: 0 0 24px rgba(255, 242, 220, 0.6), 0 0 40px rgba(241, 168, 193, 0.4);
      opacity: 0;
      transform: translateY(8px);
      animation: warpTitleAppear 2.4s ease-out forwards;
      animation-delay: 0.9s;
      z-index: 3;
    }
    @keyframes warpTitleAppear {
      0% { opacity: 0; transform: translateY(12px) scale(0.96); }
      30% { opacity: 1; transform: translateY(0) scale(1); }
      75% { opacity: 1; transform: translateY(0) scale(1.02); }
      100% { opacity: 0; transform: translateY(-8px) scale(1.05); }
    }

    /* ====================================================
       SCENE 3: CONSTELLATION (GOM SAO THÀNH TRÁI TIM)
       ==================================================== */
    #scene-constellation {
      min-height: 86svh;
      justify-content: space-between;
      padding: 16px 0;
    }
    .constellation-stage {
      position: relative;
      width: 100%;
      max-width: 360px;
      height: 320px;
      margin: 10px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* SVG Heart Outline */
    .heart-svg-track {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    }
    .heart-bg-line {
      stroke: rgba(255, 241, 220, 0.14);
      stroke-width: 1.5;
      fill: none;
      stroke-dasharray: 4 6;
    }
    .heart-glow-line {
      stroke: url(#heartGradient);
      stroke-width: 2.5;
      fill: none;
      stroke-linecap: round;
      stroke-dasharray: 1000;
      stroke-dashoffset: 1000;
      transition: stroke-dashoffset 0.85s var(--ease-out);
      filter: drop-shadow(0 0 8px rgba(241, 168, 193, 0.65));
    }

    /* Miniature shooting star running along the completed heart */
    .heart-tracer-star {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #FFF;
      box-shadow: 0 0 12px 3px var(--peach), 0 0 20px 6px var(--rose);
      pointer-events: none;
      opacity: 0;
      z-index: 3;
    }

    /* Center Star/Heart Emblem inside Constellation */
    .constellation-center {
      position: absolute;
      top: 52%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: none;
    }
    .center-gem {
      width: 18px;
      height: 18px;
      color: var(--starlight);
      opacity: 0.65;
      animation: centerGemPulse 2.5s ease-in-out infinite alternate;
    }
    @keyframes centerGemPulse {
      0% { transform: scale(0.9); opacity: 0.45; }
      100% { transform: scale(1.15); opacity: 0.85; }
    }
    .constellation-names {
      font-family: var(--font-serif);
      font-size: 20px;
      font-style: italic;
      color: var(--starlight);
      margin-top: 6px;
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
      text-shadow: 0 0 16px rgba(255, 209, 174, 0.6);
      white-space: nowrap;
    }
    .constellation-names.revealed {
      opacity: 1;
      transform: scale(1);
    }

    /* Interactive 5 Star Buttons */
    .star-anchor {
      position: absolute;
      width: 48px;
      height: 48px;
      margin-left: -24px;
      margin-top: -24px;
      background: transparent;
      border: none;
      cursor: pointer;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
      touch-action: manipulation;
    }
    .star-anchor:focus-visible {
      outline: 2px solid var(--starlight);
      border-radius: 50%;
    }
    .star-node {
      width: 26px;
      height: 26px;
      color: var(--ice);
      filter: drop-shadow(0 0 8px rgba(165, 217, 239, 0.5));
      transition: transform 0.3s var(--ease-out), color 0.3s, filter 0.3s;
    }
    .star-anchor.collected .star-node {
      color: var(--peach);
      filter: drop-shadow(0 0 14px rgba(255, 209, 174, 0.85));
    }
    .star-anchor-halo {
      position: absolute;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px dashed rgba(255, 209, 174, 0.35);
      animation: orbitRotate1 14s linear infinite;
      opacity: 0;
      transition: opacity 0.4s;
      pointer-events: none;
    }
    .star-anchor.collected .star-anchor-halo {
      opacity: 1;
    }

    /* Reading Box below Constellation */
    .reading-box {
      width: 100%;
      min-height: 108px;
      padding: 16px 20px;
      border-radius: 18px;
      background: var(--glass);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 10px;
    }
    .reading-text {
      font-size: 16px;
      line-height: 1.6;
      color: var(--text);
      text-align: center;
      min-height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.3s var(--ease-out), transform 0.3s var(--ease-out);
    }
    .reading-dots {
      display: flex;
      gap: 8px;
      margin-top: 10px;
    }
    .dot-pip {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(255, 241, 220, 0.2);
      transition: all 0.3s var(--ease-out);
    }
    .dot-pip.active {
      background: var(--peach);
      box-shadow: 0 0 8px var(--peach);
      transform: scale(1.3);
    }

    /* Button to proceed to letter */
    #btn-to-letter-wrapper {
      margin-top: 16px;
      opacity: 0;
      transform: translateY(10px);
      pointer-events: none;
      transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
    }
    #btn-to-letter-wrapper.revealed {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    /* ====================================================
       SCENE 4: LETTER (LÁ THƯ TỪ QUỸ ĐẠO)
       ==================================================== */
    #scene-letter {
      min-height: 86svh;
      justify-content: center;
      padding: 16px 0;
    }

    .envelope-container {
      position: relative;
      width: 100%;
      max-width: 360px;
      min-height: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
      perspective: 900px;
      margin: 20px 0;
    }

    .envelope-wrapper {
      position: relative;
      width: 300px;
      height: 190px;
      transform-style: preserve-3d;
      transition: transform 0.8s var(--ease-out);
      animation: envelopeDropIn 0.95s var(--ease-out) forwards;
    }
    @keyframes envelopeDropIn {
      0% { opacity: 0; transform: translate3d(50px, -60px, 0) rotate(-12deg); }
      70% { opacity: 1; transform: translate3d(0, 6px, 0) rotate(3deg); }
      100% { opacity: 1; transform: translate3d(0, 0, 0) rotate(0deg); }
    }

    /* Envelope Body */
    .envelope-base {
      position: absolute;
      inset: 0;
      border-radius: 14px;
      background: linear-gradient(145deg, #2B1E4A 0%, #1A1333 100%);
      border: 1px solid rgba(241, 168, 193, 0.3);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5), 0 0 20px rgba(114, 84, 155, 0.25);
      overflow: hidden;
      z-index: 1;
    }

    /* Envelope Folds */
    .envelope-folds-svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
      pointer-events: none;
    }

    /* Top Flap (Flips open) */
    .envelope-flap {
      position: absolute;
      top: 0;
      left: 0;
      width: 300px;
      height: 110px;
      transform-origin: top center;
      transform-style: preserve-3d;
      z-index: 4;
      transition: transform 0.65s var(--ease-out);
    }
    .envelope-flap-svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
    }
    .envelope-wrapper.opened .envelope-flap {
      transform: rotateX(-165deg);
      z-index: 1;
    }

    /* Wax Seal */
    .wax-seal {
      position: absolute;
      top: 92px;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #FFDFBA 0%, #E89E78 50%, #B25D42 100%);
      border: 1.5px solid rgba(255, 242, 220, 0.6);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4), 0 0 14px rgba(255, 209, 174, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 5;
      touch-action: manipulation;
      transition: transform 0.2s var(--ease-out), opacity 0.3s;
    }
    .wax-seal:hover {
      transform: translate(-50%, -50%) scale(1.08);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 209, 174, 0.7);
    }
    .wax-seal:focus-visible {
      outline: 2px solid var(--starlight);
      outline-offset: 3px;
    }
    .seal-heart-icon {
      width: 24px;
      height: 24px;
      color: #511A22;
      filter: drop-shadow(0 1px 2px rgba(255, 255, 255, 0.3));
    }
    .envelope-wrapper.opened .wax-seal {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.6);
      pointer-events: none;
    }

    /* Sliding & Expanding Letter Sheet */
    .letter-sheet {
      position: absolute;
      top: 15px;
      left: 20px;
      width: 260px;
      height: 160px;
      border-radius: 8px;
      background: var(--paper);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
      z-index: 2;
      transition: transform 0.7s var(--ease-out);
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 14px;
      overflow: hidden;
    }
    .envelope-wrapper.opened .letter-sheet {
      transform: translateY(-110px);
      z-index: 6;
    }

    /* Full Expanded Letter Modal/Card */
    .letter-panel {
      display: none;
      width: 100%;
      max-width: 420px;
      border-radius: 20px;
      background: var(--paper);
      color: var(--paper-ink);
      padding: 32px 24px 28px;
      box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 32px rgba(255, 241, 220, 0.2);
      border: 1px solid rgba(255, 241, 220, 0.8);
      position: relative;
      text-align: left;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
    }
    .letter-panel.visible {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }
    .letter-crest {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
      color: #9F7E59;
      opacity: 0.7;
    }
    .letter-paragraph {
      font-family: var(--font-serif);
      font-size: clamp(17px, 4.5vw, 19px);
      line-height: 1.75;
      color: var(--paper-ink);
      margin-bottom: 16px;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
    }
    .letter-paragraph.revealed {
      opacity: 1;
      transform: translateY(0);
    }
    .letter-photo-wrapper {
      margin: 16px 0;
      display: flex;
      justify-content: center;
    }
    .letter-photo {
      max-width: 180px;
      max-height: 180px;
      border-radius: 12px;
      border: 4px solid #FFF;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
      object-fit: cover;
    }
    .letter-signature {
      font-family: var(--font-serif);
      font-size: 18px;
      font-style: italic;
      color: #6C5143;
      text-align: right;
      margin-top: 24px;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.5s var(--ease-out) 0.3s, transform 0.5s var(--ease-out) 0.3s;
    }
    .letter-signature.revealed {
      opacity: 1;
      transform: translateY(0);
    }
    .letter-footer-action {
      margin-top: 28px;
      text-align: center;
    }

    /* ====================================================
       SCENE 5: WISH (MỘT ĐIỀU ƯỚC CHO CHÚNG MÌNH)
       ==================================================== */
    #scene-wish {
      min-height: 84svh;
      justify-content: center;
      padding: 16px 0;
    }
    .wish-box {
      width: 100%;
      max-width: 400px;
      border-radius: 24px;
      background: var(--glass-card);
      border: 1px solid var(--glass-border);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      padding: 24px 20px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 8px;
    }

    /* Glowing Star above Textarea */
    .wish-star-glow {
      width: 34px;
      height: 34px;
      color: var(--peach);
      margin-bottom: 14px;
      filter: drop-shadow(0 0 12px var(--peach));
      transition: transform 0.3s, filter 0.3s;
    }
    .wish-star-glow.active {
      transform: scale(1.22);
      filter: drop-shadow(0 0 20px var(--rose));
    }

    /* Suggestion Chips */
    .wish-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      margin-bottom: 16px;
    }
    .chip {
      padding: 6px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 241, 220, 0.18);
      color: var(--starlight);
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
    }
    .chip:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 209, 174, 0.4);
      transform: translateY(-1px);
    }
    .chip.selected {
      background: rgba(241, 168, 193, 0.2);
      border-color: var(--rose);
      color: #FFF;
      box-shadow: 0 0 12px rgba(241, 168, 193, 0.3);
    }

    /* Wish Textarea */
    .wish-textarea-wrapper {
      position: relative;
      width: 100%;
      margin-bottom: 16px;
    }
    #wish-input {
      width: 100%;
      height: 110px;
      padding: 14px 16px;
      border-radius: 14px;
      background: rgba(8, 12, 36, 0.55);
      border: 1.5px solid rgba(241, 168, 193, 0.3);
      color: var(--text);
      font-family: var(--font-ui);
      font-size: 16px; /* prevent mobile zoom */
      line-height: 1.5;
      resize: none;
      outline: none;
      transition: border-color 0.25s, box-shadow 0.25s;
    }
    #wish-input:focus {
      border-color: var(--rose);
      box-shadow: 0 0 16px rgba(241, 168, 193, 0.35);
    }
    #wish-input::placeholder {
      color: var(--muted);
      opacity: 0.65;
    }
    .wish-counter {
      position: absolute;
      bottom: 8px;
      right: 12px;
      font-size: 11px;
      color: var(--muted);
      opacity: 0.7;
    }

    /* Wish Beam animation */
    .wish-beam {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 4px;
      height: 0;
      background: linear-gradient(to top, transparent, var(--starlight), var(--peach));
      filter: blur(2px);
      transform: translateX(-50%);
      opacity: 0;
      pointer-events: none;
    }
    .wish-beam.shooting {
      animation: beamShoot 0.7s var(--ease-out) forwards;
    }
    @keyframes beamShoot {
      0% { height: 0; opacity: 1; top: 60%; }
      50% { height: 180px; opacity: 1; top: 20%; }
      100% { height: 0; opacity: 0; top: 0%; }
    }

    /* ====================================================
       SCENE 6: KEEPSAKE (TỌA ĐỘ CỦA CHÚNG MÌNH)
       ==================================================== */
    #scene-keepsake {
      min-height: 90svh;
      justify-content: flex-start;
      padding: 16px 0 32px;
    }

    /* Keepsake Card */
    .keepsake-card {
      position: relative;
      width: 100%;
      max-width: 380px;
      border-radius: 24px;
      background: linear-gradient(170deg, #181438 0%, #0F0D29 60%, #1F1538 100%);
      border: 1.5px solid rgba(255, 209, 174, 0.45);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 28px rgba(241, 168, 193, 0.22);
      padding: 30px 22px 28px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      overflow: hidden;
      margin-bottom: 24px;
      opacity: 0;
      transform: scale(0.92) rotateY(-8deg) translateY(24px);
      transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out);
    }
    .keepsake-card.revealed {
      opacity: 1;
      transform: scale(1) rotateY(0deg) translateY(0);
    }

    /* Border light sweep */
    .keepsake-card::before {
      content: '';
      position: absolute;
      inset: -2px;
      border-radius: 25px;
      background: linear-gradient(90deg, transparent, rgba(255, 242, 220, 0.65), transparent);
      opacity: 0;
      pointer-events: none;
    }
    .keepsake-card.revealed::before {
      animation: borderSweep 1.4s ease-out 0.2s forwards;
    }
    @keyframes borderSweep {
      0% { opacity: 0; transform: translateX(-100%); }
      50% { opacity: 0.8; }
      100% { opacity: 0; transform: translateX(100%); }
    }

    /* Card Inner Elements */
    .card-eyebrow {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.22em;
      color: var(--starlight);
      opacity: 0.88;
      margin-bottom: 6px;
    }
    .card-recipient {
      font-family: var(--font-serif);
      font-size: clamp(32px, 8vw, 42px);
      line-height: 1.15;
      background: linear-gradient(135deg, var(--starlight) 20%, var(--peach) 60%, var(--rose) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 16px;
      padding: 0 4px;
    }
    .card-constellation-box {
      position: relative;
      width: 180px;
      height: 150px;
      margin-bottom: 14px;
    }
    .card-names {
      font-family: var(--font-serif);
      font-size: 20px;
      font-style: italic;
      color: var(--peach);
      margin-bottom: 4px;
      text-shadow: 0 0 12px rgba(255, 209, 174, 0.5);
    }
    .card-poetic-sub {
      font-size: 13px;
      color: var(--muted);
      margin-bottom: 14px;
    }
    .card-divider {
      display: flex;
      align-items: center;
      width: 80%;
      margin: 4px 0 16px;
      opacity: 0.45;
    }
    .card-divider::before, .card-divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(to right, transparent, var(--starlight), transparent);
    }
    .card-divider-star {
      width: 12px;
      height: 12px;
      margin: 0 8px;
      color: var(--starlight);
    }
    .card-wish-label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.16em;
      color: var(--rose);
      margin-bottom: 8px;
    }
    .card-wish-content {
      font-family: var(--font-serif);
      font-size: clamp(17px, 4.2vw, 19px);
      font-style: italic;
      line-height: 1.6;
      color: var(--starlight);
      margin-bottom: 16px;
      padding: 0 8px;
    }
    .card-final-line {
      font-size: 14px;
      line-height: 1.5;
      color: var(--muted);
      margin-bottom: 16px;
      font-style: italic;
    }
    .card-signature {
      font-family: var(--font-serif);
      font-size: 15px;
      color: var(--peach);
      opacity: 0.9;
    }

    /* Actions below Keepsake Card */
    .keepsake-actions {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      width: 100%;
      max-width: 380px;
    }
    .keepsake-actions .btn-primary,
    .keepsake-actions .btn-secondary {
      width: 100%;
    }
    .keepsake-subactions {
      display: flex;
      gap: 16px;
      margin-top: 4px;
    }
    .keepsake-closing-note {
      font-size: 13px;
      color: var(--starlight);
      opacity: 0.75;
      margin-top: 14px;
      font-style: italic;
      text-align: center;
    }

    /* ====================================================
       TOAST FEEDBACK
       ==================================================== */
    .toast {
      position: fixed;
      bottom: calc(24px + env(safe-area-inset-bottom, 0px));
      left: 50%;
      transform: translateX(-50%) translateY(30px);
      background: rgba(21, 19, 51, 0.94);
      color: var(--starlight);
      border: 1px solid var(--rose);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.5), 0 0 16px rgba(241, 168, 193, 0.4);
      padding: 12px 24px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 500;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s var(--ease-out);
      z-index: 999;
      white-space: nowrap;
    }
    .toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
      pointer-events: auto;
    }

    /* ====================================================
       REDUCED MOTION STYLES
       ==================================================== */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.15s !important;
      }
      .scene {
        transition: opacity 0.15s linear !important;
        transform: none !important;
      }
      #btn-dodge {
        transition: none !important;
      }
      .keepsake-card {
        transform: none !important;
      }
    }
  </style>
</head>
<body>
  <!-- Fullscreen Universe Canvas (Stars, Particles, Warp) -->
  <canvas id="universe" aria-hidden="true"></canvas>

  <!-- Ambient Nebulae -->
  <div class="nebula-glow" aria-hidden="true"></div>

  <!-- Main Multi-Scene Stage -->
  <main id="app">

    <!-- ==============================================
         SCENE 0: SIGNAL (TÍN HIỆU CỦA MỘT NGÔI SAO)
         ============================================== -->
    <section id="scene-signal" class="scene active" aria-label="Tín hiệu mở đầu">
      <div class="signal-header" id="signal-header-block">
        <p class="eyebrow" id="signal-eyebrow"></p>
        <h1 class="title-serif" id="signal-title"></h1>
      </div>

      <div class="signal-center" id="signal-interactive-area" role="button" tabindex="0" aria-label="Chạm vào ngôi sao để mở thiệp">
        <div class="signal-halo" aria-hidden="true"></div>
        <div class="signal-orbit signal-orbit-1" aria-hidden="true"><div class="satellite-star"></div></div>
        <div class="signal-orbit signal-orbit-2" aria-hidden="true"><div class="satellite-star"></div></div>
        <div class="signal-ripple" id="signal-ripple" aria-hidden="true"></div>

        <button class="btn-signal-star" id="btn-signal-star" type="button" aria-label="Ngôi sao ước nguyện">
          <svg class="star-core-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="starGlowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FFF2DC"/>
                <stop offset="35%" stop-color="#FFD1AE"/>
                <stop offset="70%" stop-color="#F1A8C1"/>
                <stop offset="100%" stop-color="rgba(241,168,193,0)"/>
              </radialGradient>
              <linearGradient id="starBladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="40%" stop-color="#FFF2DC"/>
                <stop offset="80%" stop-color="#FFD1AE"/>
                <stop offset="100%" stop-color="#F1A8C1"/>
              </linearGradient>
            </defs>
            <!-- 4-pointed Diamond Star -->
            <path d="M50 4 C50 36 36 50 4 50 C36 50 50 64 50 96 C50 64 64 50 96 50 C64 50 50 36 50 4 Z" fill="url(#starBladeGrad)"/>
            <!-- Inner Glowing Core -->
            <circle cx="50" cy="50" r="14" fill="url(#starGlowGrad)"/>
            <circle cx="50" cy="50" r="6" fill="#FFFFFF"/>
          </svg>
        </button>
      </div>

      <p class="signal-hint" id="signal-hint-text">Chạm vào ngôi sao để mở điều anh giấu ✨</p>

      <!-- Ringed Pastel Planet in corner -->
      <div class="signal-planet" aria-hidden="true">
        <svg viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="planetGrad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stop-color="#FFE4EC"/>
              <stop offset="45%" stop-color="#EAA6C1"/>
              <stop offset="85%" stop-color="#72549B"/>
              <stop offset="100%" stop-color="#251B42"/>
            </radialGradient>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="rgba(255,209,174,0.1)"/>
              <stop offset="40%" stop-color="rgba(255,241,220,0.7)"/>
              <stop offset="60%" stop-color="rgba(165,217,239,0.85)"/>
              <stop offset="100%" stop-color="rgba(241,168,193,0.1)"/>
            </linearGradient>
          </defs>
          <!-- Back Ring Segment -->
          <ellipse cx="70" cy="70" rx="64" ry="20" transform="rotate(-28 70 70)" stroke="url(#ringGrad)" stroke-width="6" opacity="0.45"/>
          <!-- Planet Sphere -->
          <circle cx="70" cy="70" r="38" fill="url(#planetGrad)" filter="drop-shadow(0 0 16px rgba(114,84,155,0.4))"/>
          <!-- Front Ring Segment -->
          <path d="M 12 70 A 64 20 0 0 0 128 70" transform="rotate(-28 70 70)" stroke="url(#ringGrad)" stroke-width="7" stroke-linecap="round"/>
        </svg>
      </div>
    </section>

    <!-- ==============================================
         SCENE 1: QUESTION (CÂU HỎI VÀ NÚT CHẠY TRỐN)
         ============================================== -->
    <section id="scene-question" class="scene" aria-label="Câu hỏi">
      <div class="play-area" id="play-area">
        <div class="question-texts" id="question-heading-box">
          <div class="question-celestial" id="question-planets" aria-hidden="true">
            <div class="planet-small planet-ice" id="planet-ice"></div>
            <div class="planet-small planet-rose" id="planet-rose"></div>
            <svg class="celestial-heart" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h2 class="title-serif" id="question-title"></h2>
          <p class="subtitle" id="question-subtitle">Anh hứa sẽ không chiếm hết đâu… chỉ xin một góc cạnh em thôi.</p>
        </div>

        <!-- Stationary YES CTA button -->
        <div class="btn-yes-wrapper" id="btn-yes-wrapper">
          <button class="btn-primary" id="btn-yes" type="button"></button>
        </div>

        <!-- Dodging Button -->
        <button id="btn-dodge" type="button" aria-label="Để em suy nghĩ xíu">
          <div class="comet-tail" id="comet-tail" aria-hidden="true"></div>
          <svg class="dodge-star-icon" id="dodge-star-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"/>
          </svg>
          <span class="dodge-label" id="dodge-label-text">Để em suy nghĩ xíu...</span>
        </button>

        <p class="question-hint" id="bottom-hint">Có một nút hơi nghịch… thử bắt xem 😏</p>
      </div>
    </section>

    <!-- ==============================================
         SCENE 2: WARP (CÙNG BAY XUYÊN NHỮNG VÌ SAO)
         ============================================== -->
    <section id="scene-warp" class="scene" aria-label="Xuyên qua cổng sao">
      <div class="warp-center-glow" aria-hidden="true"></div>
      <h2 class="warp-title">Tìm thấy một người muốn cùng anh đi xa rồi ✨</h2>
    </section>

    <!-- ==============================================
         SCENE 3: CONSTELLATION (GOM SAO THÀNH TRÁI TIM)
         ============================================== -->
    <section id="scene-constellation" class="scene" aria-label="Gom sao thành trái tim">
      <div>
        <h2 class="title-serif">Có vài điều nhỏ xíu,\nanh muốn em biết.</h2>
        <p class="subtitle">Chạm vào từng ngôi sao nhé ✨</p>
      </div>

      <div class="constellation-stage" id="constellation-stage">
        <!-- SVG Heart Trace -->
        <svg class="heart-svg-track" viewBox="0 0 400 360" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFD1AE"/>
              <stop offset="50%" stop-color="#F1A8C1"/>
              <stop offset="100%" stop-color="#A5D9EF"/>
            </linearGradient>
          </defs>
          <!-- Background guideline -->
          <path class="heart-bg-line" d="M 200 90 C 130 18, 30 45, 30 145 C 30 230, 120 285, 200 340 C 280 285, 370 230, 370 145 C 370 45, 270 18, 200 90 Z"/>
          <!-- Active Drawn Track -->
          <path id="heart-active-track" class="heart-glow-line" d="M 200 90 C 130 18, 30 45, 30 145 C 30 230, 120 285, 200 340 C 280 285, 370 230, 370 145 C 370 45, 270 18, 200 90 Z" pathLength="1000"/>
        </svg>

        <!-- Shooting star tracer on heart completion -->
        <div class="heart-tracer-star" id="heart-tracer-star"></div>

        <!-- Center Emblem inside Heart -->
        <div class="constellation-center">
          <svg class="center-gem" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"/>
          </svg>
          <div class="constellation-names" id="constellation-names"></div>
        </div>

        <!-- 5 Star Anchor Buttons (populated by JS) -->
        <div id="star-anchors-container"></div>
      </div>

      <div class="reading-box">
        <p class="reading-text" id="constellation-reading-text">Chạm vào một ngôi sao để lắng nghe...</p>
        <div class="reading-dots" id="constellation-dots">
          <span class="dot-pip"></span>
          <span class="dot-pip"></span>
          <span class="dot-pip"></span>
          <span class="dot-pip"></span>
          <span class="dot-pip"></span>
        </div>
      </div>

      <div id="btn-to-letter-wrapper">
        <button class="btn-primary" id="btn-to-letter" type="button">Còn một lá thư nữa 💌</button>
      </div>
    </section>

    <!-- ==============================================
         SCENE 4: LETTER (LÁ THƯ TỪ QUỸ ĐẠO)
         ============================================== -->
    <section id="scene-letter" class="scene" aria-label="Mở thư">
      <div id="letter-closed-view">
        <h2 class="title-serif">Có những điều,\nanh muốn nói chậm hơn.</h2>
        <p class="subtitle">Chạm vào con dấu để mở thư</p>

        <div class="envelope-container">
          <div class="envelope-wrapper" id="envelope-wrapper">
            <!-- Envelope Back Pocket -->
            <div class="envelope-base"></div>

            <!-- Letter Sheet tucked inside -->
            <div class="letter-sheet" id="letter-sheet-tucked">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#9F7E59" opacity="0.6">
                <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"/>
              </svg>
            </div>

            <!-- Envelope Folds SVG -->
            <svg class="envelope-folds-svg" viewBox="0 0 300 190" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Left Fold -->
              <path d="M 0 0 L 150 115 L 0 190 Z" fill="#20173A" opacity="0.95"/>
              <!-- Right Fold -->
              <path d="M 300 0 L 150 115 L 300 190 Z" fill="#261C44" opacity="0.95"/>
              <!-- Bottom Fold -->
              <path d="M 0 190 L 150 100 L 300 190 Z" fill="#1C1433" stroke="rgba(241,168,193,0.2)" stroke-width="1"/>
            </svg>

            <!-- Top Flap -->
            <div class="envelope-flap" id="envelope-flap">
              <svg class="envelope-flap-svg" viewBox="0 0 300 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 0 L 150 105 L 300 0 Z" fill="#322254" stroke="rgba(241,168,193,0.25)" stroke-width="1"/>
              </svg>
            </div>

            <!-- Glowing Wax Seal -->
            <button class="wax-seal" id="btn-wax-seal" type="button" aria-label="Mở con dấu phong bì">
              <svg class="seal-heart-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Opened Letter Panel -->
      <div class="letter-panel" id="letter-panel">
        <div class="letter-crest">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"/>
          </svg>
        </div>
        <div id="letter-paragraphs-container"></div>
        <div class="letter-photo-wrapper" id="letter-photo-wrapper" style="display: none;">
          <img class="letter-photo" id="letter-photo" alt="Ảnh kỷ niệm">
        </div>
        <div class="letter-signature" id="letter-signature-text"></div>
        <div class="letter-footer-action">
          <button class="btn-primary" id="btn-to-wish" type="button">Cùng anh viết tiếp nhé ✨</button>
        </div>
      </div>
    </section>

    <!-- ==============================================
         SCENE 5: WISH (MỘT ĐIỀU ƯỚC CHO CHÚNG MÌNH)
         ============================================== -->
    <section id="scene-wish" class="scene" aria-label="Nhập điều ước">
      <h2 class="title-serif">Nếu gửi một điều ước\nlên trời tối nay…</h2>
      <p class="subtitle">Em muốn chúng mình cùng làm điều gì?</p>

      <div class="wish-box">
        <svg class="wish-star-glow" id="wish-star-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"/>
        </svg>

        <div class="wish-chips" id="wish-chips">
          <button class="chip" type="button" data-text="Cùng đi ngắm hoàng hôn">Cùng đi ngắm hoàng hôn</button>
          <button class="chip" type="button" data-text="Một buổi hẹn không vội">Một buổi hẹn không vội</button>
          <button class="chip" type="button" data-text="Cùng nhau đi thật xa">Cùng nhau đi thật xa</button>
        </div>

        <div class="wish-textarea-wrapper">
          <textarea id="wish-input" maxlength="280" placeholder="Viết điều em muốn ở đây…"></textarea>
          <div class="wish-counter" id="wish-counter">0/280</div>
          <div class="wish-beam" id="wish-beam"></div>
        </div>

        <button class="btn-primary" id="btn-submit-wish" type="button">Gửi điều ước lên trời ✨</button>
        <button class="btn-text" id="btn-clear-wish" type="button" style="margin-top: 8px; display: none;">Xóa điều ước đã lưu</button>
      </div>
    </section>

    <!-- ==============================================
         SCENE 6: KEEPSAKE (TỌA ĐỘ CỦA CHÚNG MÌNH)
         ============================================== -->
    <section id="scene-keepsake" class="scene" aria-label="Món quà kỷ niệm">
      <div class="keepsake-card" id="keepsake-card">
        <p class="card-eyebrow">MỘT GÓC VŨ TRỤ DÀNH RIÊNG CHO</p>
        <h2 class="card-recipient" id="card-recipient-name"></h2>

        <!-- Constellation in card -->
        <div class="card-constellation-box">
          <svg viewBox="0 0 200 160" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 100 40 C 70 8, 20 20, 20 65 C 20 105, 60 130, 100 152 C 140 130, 180 105, 180 65 C 180 20, 130 8, 100 40 Z" stroke="rgba(255,209,174,0.65)" stroke-width="1.5" stroke-dasharray="3 3"/>
            <!-- 5 Anchors -->
            <circle cx="50" cy="38" r="4.5" fill="#FFD1AE" filter="drop-shadow(0 0 6px #FFD1AE)"/>
            <circle cx="150" cy="38" r="4.5" fill="#FFD1AE" filter="drop-shadow(0 0 6px #FFD1AE)"/>
            <circle cx="172" cy="85" r="4.5" fill="#FFD1AE" filter="drop-shadow(0 0 6px #FFD1AE)"/>
            <circle cx="100" cy="144" r="5.5" fill="#FFF2DC" filter="drop-shadow(0 0 8px #FFF2DC)"/>
            <circle cx="28" cy="85" r="4.5" fill="#FFD1AE" filter="drop-shadow(0 0 6px #FFD1AE)"/>
            <!-- Center diamond -->
            <path d="M 100 85 L 104 93 L 112 95 L 104 97 L 100 105 L 96 97 L 88 95 L 96 93 Z" fill="#FFF2DC" opacity="0.85"/>
          </svg>
        </div>

        <p class="card-names" id="card-couple-names"></p>
        <p class="card-poetic-sub">Nơi chúng mình chọn ở lại bên nhau</p>

        <div class="card-divider" aria-hidden="true">
          <svg class="card-divider-star" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"/>
          </svg>
        </div>

        <p class="card-wish-label">ĐIỀU ƯỚC CỦA CHÚNG MÌNH</p>
        <p class="card-wish-content" id="card-wish-text"></p>

        <p class="card-final-line" id="card-final-line"></p>
        <p class="card-signature" id="card-signature-text"></p>
      </div>

      <!-- Action buttons below keepsake card -->
      <div class="keepsake-actions">
        <button class="btn-primary" id="btn-save-png" type="button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          Lưu bầu trời của mình ✨
        </button>

        <button class="btn-secondary" id="btn-share" type="button">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          Chia sẻ món quà 💌
        </button>

        <div class="keepsake-subactions">
          <button class="btn-text" id="btn-copy-msg" type="button">Chép lời nhắn</button>
          <button class="btn-text" id="btn-restart" type="button">Xem lại hành trình</button>
        </div>

        <p class="keepsake-closing-note">Gửi lại cho anh nhé. Anh muốn giữ cả điều ước của em nữa.</p>
      </div>
    </section>

  </main>

  <!-- Toast Notification Feedback -->
  <div id="toast" role="status" aria-live="polite" class="toast"></div>

  <!-- Hidden helper link for download -->
  <a id="download-helper" style="display:none;"></a>

  <!-- ====================================================
       JAVASCRIPT LOGIC & ANIMATION ENGINE
       ==================================================== -->
  <script>
  (function() {
    'use strict';

    /* ====================================================
       1. CONFIGURATION & CONSTANTS
       ==================================================== */
    const CONFIG = {
      senderName: 'anh',
      recipientName: 'em',
      openingEyebrow: 'MỘT TÍN HIỆU DÀNH RIÊNG CHO EM',
      openingTitle: 'Giữa hàng triệu vì sao,\\nanh có điều muốn gửi em.',
      questionTitle: 'Cho anh được ở trong\\nvũ trụ của em nhé?',
      yesLabel: 'Đồng ý, cho anh một chỗ ❤️',
      starMessages: [
        'Vì nụ cười của em khiến những ngày bình thường cũng sáng lên.',
        'Vì anh thích cả những câu chuyện nhỏ xíu em kể.',
        'Vì ở bên em, anh được là chính mình.',
        'Vì anh muốn những ngày sắp tới đều có em.',
        'Vì người anh muốn chọn, vẫn luôn là em.'
      ],
      letterParagraphs: [
        'Gửi em,',
        'Anh không biết giữa bao nhiêu người, vì sao chúng mình lại gặp nhau. Nhưng anh biết mình đã vui hơn từ khi có em.',
        'Anh muốn cùng em đi qua những ngày rực rỡ, và cả những ngày chẳng có gì đặc biệt. Cùng ăn một món ngon, kể nhau nghe chuyện vụn vặt, rồi thấy một ngày bình thường cũng đáng nhớ.',
        'Anh không hứa biến mọi ngày thành cổ tích. Anh chỉ muốn mỗi khi em quay lại, anh vẫn ở đây, sẵn lòng nghe em nói.',
        'Vậy nên, cho anh được cùng em viết tiếp câu chuyện này nhé.'
      ],
      signature: 'Người đang mỉm cười vì em',
      finalLine: 'Vũ trụ thì rộng. Chỗ của em trong anh thì luôn ở đây.',
      optionalPhotoDataUrl: '',
      shareBaseUrl: '',
      storageKey: 'thiep4-universe-draft-v1'
    };

    const DODGE_LABELS = [
      'Để em suy nghĩ xíu...',
      'Hông cho bấm đâu 😜',
      'Né nèee 💨',
      'Bấm hụt rồi lêu lêu 😝',
      'Đồng ý đi mừ ❤️',
      'Vẫn cố bấm hả? 😂',
      'Đừng đuổi theo em 🏃',
      'Chịu thua chưa nè?'
    ];

    const STAR_ANCHORS = [
      { x: 0.24, y: 0.23 },
      { x: 0.74, y: 0.23 },
      { x: 0.86, y: 0.52 },
      { x: 0.50, y: 0.86 },
      { x: 0.14, y: 0.52 }
    ];

    /* ====================================================
       2. APPLICATION STATE
       ==================================================== */
    const state = {
      scene: 'signal',
      transitioning: false,
      teaseCount: 0,
      collectedStars: [],
      letterOpened: false,
      wish: '',
      giftModel: null
    };

    // Pre-load saved wish from localStorage
    try {
      const savedWish = localStorage.getItem(CONFIG.storageKey);
      if (savedWish && savedWish.trim()) {
        state.wish = savedWish.trim();
      }
    } catch (e) {
      // Ignore private browsing storage restriction
    }

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ====================================================
       3. UNIVERSE CANVAS 2D ENGINE (STARS, PARTICLES, WARP)
       ==================================================== */
    const canvas = document.getElementById('universe');
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Star layers
    const farStars = [];
    const midStars = [];
    const nearStars = [];

    // Shooting star (sao băng)
    let shootingStar = null;
    let nextShootingStarTime = performance.now() + 2500;

    // Warp mode state
    let warpActive = false;
    let warpProgress = 0;
    const warpStars = [];

    // Particle Object Pool
    const MAX_PARTICLES = 90;
    const particles = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push({
        active: false,
        x: 0, y: 0,
        vx: 0, vy: 0,
        size: 2,
        color: '#FFF',
        alpha: 1,
        life: 0,
        maxLife: 1,
        curve: null
      });
    }

    function spawnParticle(cfg) {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        if (!particles[i].active) {
          const p = particles[i];
          p.active = true;
          p.x = cfg.x;
          p.y = cfg.y;
          p.vx = cfg.vx || 0;
          p.vy = cfg.vy || 0;
          p.size = cfg.size || 2.5;
          p.color = cfg.color || '#FFF2DC';
          p.alpha = cfg.alpha !== undefined ? cfg.alpha : 1;
          p.life = 0;
          p.maxLife = cfg.maxLife || 0.6;
          p.curve = cfg.curve || null;
          return p;
        }
      }
      return null;
    }

    function spawnBurst(cx, cy, count, colors) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 40 + Math.random() * 140;
        const color = colors[Math.floor(Math.random() * colors.length)];
        spawnParticle({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 1.5 + Math.random() * 2.5,
          color: color,
          alpha: 0.9,
          maxLife: 0.45 + Math.random() * 0.4
        });
      }
    }

    function resizeCanvas() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initStars();
    }
    window.addEventListener('resize', resizeCanvas);

    function initStars() {
      farStars.length = 0;
      midStars.length = 0;
      nearStars.length = 0;
      warpStars.length = 0;

      const numFar = width < 600 ? 50 : 80;
      const numMid = width < 600 ? 25 : 45;
      const numNear = width < 600 ? 10 : 18;

      for (let i = 0; i < numFar; i++) {
        farStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.5 + Math.random() * 0.7,
          alpha: 0.15 + Math.random() * 0.3,
          speed: 1.5 + Math.random() * 3
        });
      }

      for (let i = 0; i < numMid; i++) {
        midStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 1.0 + Math.random() * 0.9,
          alpha: 0.4 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0018 + Math.random() * 0.0025
        });
      }

      for (let i = 0; i < numNear; i++) {
        nearStars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 1.8 + Math.random() * 1.0,
          color: i % 2 === 0 ? '#FFD1AE' : '#A5D9EF',
          phase: Math.random() * Math.PI * 2
        });
      }

      // Pre-seed warp stars
      const numWarp = width < 600 ? 95 : 150;
      for (let i = 0; i < numWarp; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 20 + Math.random() * (Math.max(width, height) * 0.7);
        warpStars.push({
          angle: angle,
          dist: dist,
          speed: 250 + Math.random() * 450,
          size: 1.2 + Math.random() * 1.8,
          color: Math.random() > 0.4 ? '#FFF2DC' : '#F1A8C1'
        });
      }
    }

    // Parallax mouse offset
    let targetParallaxX = 0;
    let targetParallaxY = 0;
    let currentParallaxX = 0;
    let currentParallaxY = 0;

    window.addEventListener('pointermove', function(e) {
      if (!isReducedMotion) {
        targetParallaxX = (e.clientX / width - 0.5) * 14;
        targetParallaxY = (e.clientY / height - 0.5) * 14;
      }
    }, { passive: true });

    /* ====================================================
       4. ANIMATION ENGINE LOOP (DELTA TIME TICK)
       ==================================================== */
    let lastTime = performance.now();
    let frameId = null;

    function tick(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.033);
      lastTime = now;

      currentParallaxX += (targetParallaxX - currentParallaxX) * 0.06;
      currentParallaxY += (targetParallaxY - currentParallaxY) * 0.06;

      ctx.clearRect(0, 0, width, height);

      if (warpActive) {
        renderWarp(dt, now);
      } else {
        renderBackground(dt, now);
      }

      updateAndRenderParticles(dt);
      updateDodgePhysics(dt, now);

      frameId = requestAnimationFrame(tick);
    }

    function renderBackground(dt, now) {
      // Far Stars (slow drift)
      ctx.fillStyle = '#FFF';
      for (let i = 0; i < farStars.length; i++) {
        const s = farStars[i];
        s.y -= s.speed * dt;
        if (s.y < 0) {
          s.y = height;
          s.x = Math.random() * width;
        }
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x + currentParallaxX * 0.3, s.y + currentParallaxY * 0.3, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Mid Stars (twinkle)
      for (let i = 0; i < midStars.length; i++) {
        const s = midStars[i];
        const twinkle = 0.3 + 0.5 * Math.sin(now * s.speed + s.phase);
        ctx.globalAlpha = Math.max(0.1, twinkle);
        ctx.fillStyle = '#FFF2DC';
        ctx.beginPath();
        ctx.arc(s.x + currentParallaxX * 0.6, s.y + currentParallaxY * 0.6, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Near Stars (cross glint)
      for (let i = 0; i < nearStars.length; i++) {
        const s = nearStars[i];
        const pulse = 0.7 + 0.3 * Math.sin(now * 0.003 + s.phase);
        const px = s.x + currentParallaxX;
        const py = s.y + currentParallaxY;

        ctx.globalAlpha = pulse * 0.85;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();

        // 4-point subtle sparkle
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(px - s.r * 2.5, py);
        ctx.lineTo(px + s.r * 2.5, py);
        ctx.moveTo(px, py - s.r * 2.5);
        ctx.lineTo(px, py + s.r * 2.5);
        ctx.stroke();
      }

      // Shooting Star (Sao băng)
      if (now > nextShootingStarTime && !shootingStar && !isReducedMotion) {
        shootingStar = {
          x: Math.random() * (width * 0.7),
          y: Math.random() * (height * 0.35),
          vx: 520,
          vy: 300,
          length: 90 + Math.random() * 50,
          life: 0,
          maxLife: 0.95
        };
        nextShootingStarTime = now + 5000 + Math.random() * 3500;
      }

      if (shootingStar) {
        shootingStar.life += dt;
        shootingStar.x += shootingStar.vx * dt;
        shootingStar.y += shootingStar.vy * dt;

        const progress = shootingStar.life / shootingStar.maxLife;
        let starAlpha = 1;
        if (progress < 0.2) starAlpha = progress / 0.2;
        else if (progress > 0.6) starAlpha = 1 - (progress - 0.6) / 0.4;

        if (progress >= 1) {
          shootingStar = null;
        } else {
          ctx.globalAlpha = Math.max(0, starAlpha);
          const grad = ctx.createLinearGradient(
            shootingStar.x, shootingStar.y,
            shootingStar.x - (shootingStar.vx / 520) * shootingStar.length,
            shootingStar.y - (shootingStar.vy / 520) * shootingStar.length
          );
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(0.3, '#FFD1AE');
          grad.addColorStop(1, 'rgba(241,168,193,0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.2;
          ctx.beginPath();
          ctx.moveTo(shootingStar.x, shootingStar.y);
          ctx.lineTo(
            shootingStar.x - (shootingStar.vx / 520) * shootingStar.length,
            shootingStar.y - (shootingStar.vy / 520) * shootingStar.length
          );
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
    }

    function renderWarp(dt, now) {
      const cx = width / 2;
      const cy = height / 2;
      const maxDist = Math.max(width, height) * 0.85;

      for (let i = 0; i < warpStars.length; i++) {
        const s = warpStars[i];
        s.dist += s.speed * dt * (1 + warpProgress * 2.5);

        if (s.dist > maxDist) {
          s.dist = 10 + Math.random() * 40;
          s.angle = Math.random() * Math.PI * 2;
        }

        const streakLen = Math.min(120, s.dist * 0.35 * (1 + warpProgress * 1.5));
        const headX = cx + Math.cos(s.angle) * s.dist;
        const headY = cy + Math.sin(s.angle) * s.dist;
        const tailX = cx + Math.cos(s.angle) * (s.dist - streakLen);
        const tailY = cy + Math.sin(s.angle) * (s.dist - streakLen);

        const grad = ctx.createLinearGradient(headX, headY, tailX, tailY);
        grad.addColorStop(0, s.color);
        grad.addColorStop(1, 'rgba(114,84,155,0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(headX, headY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }
    }

    function updateAndRenderParticles(dt) {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = particles[i];
        if (!p.active) continue;

        p.life += dt;
        if (p.life >= p.maxLife) {
          p.active = false;
          continue;
        }

        const t = p.life / p.maxLife;

        if (p.curve) {
          // Bézier curved path {p0, p1, p2}
          const u = 1 - t;
          p.x = u * u * p.curve.p0.x + 2 * u * t * p.curve.p1.x + t * t * p.curve.p2.x;
          p.y = u * u * p.curve.p0.y + 2 * u * t * p.curve.p1.y + t * t * p.curve.p2.y;
        } else {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.vx *= 0.96;
          p.vy *= 0.96;
        }

        const alpha = (1 - t) * p.alpha;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - t * 0.4), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    // Handle Tab Visibility
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        if (frameId) cancelAnimationFrame(frameId);
      } else {
        lastTime = performance.now();
        frameId = requestAnimationFrame(tick);
      }
    });

    /* ====================================================
       5. DODGE CONTROLLER (SCENE 1: QUESTION)
       ==================================================== */
    const playArea = document.getElementById('play-area');
    const headingBox = document.getElementById('question-heading-box');
    const btnYesWrapper = document.getElementById('btn-yes-wrapper');
    const btnYes = document.getElementById('btn-yes');
    const btnDodge = document.getElementById('btn-dodge');
    const dodgeStarIcon = document.getElementById('dodge-star-icon');
    const cometTail = document.getElementById('comet-tail');
    const dodgeLabelText = document.getElementById('dodge-label-text');
    const bottomHint = document.getElementById('bottom-hint');

    const dodgeState = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      isMoving: false,
      moveStart: 0,
      moveDuration: 320,
      p0: { x: 0, y: 0 },
      p1: { x: 0, y: 0 },
      p2: { x: 0, y: 0 },
      p3: { x: 0, y: 0 },
      width: 200,
      height: 46,
      lastDodgeTime: 0,
      cooldown: 200,
      recentTargets: [],
      touchTime: 0
    };

    function initDodgeButtonPosition() {
      if (!playArea || !btnDodge) return;
      const areaRect = playArea.getBoundingClientRect();
      const btnRect = btnDodge.getBoundingClientRect();
      dodgeState.width = btnRect.width || 200;
      dodgeState.height = btnRect.height || 46;

      // Initial placement: centered horizontally, at ~69% vertically
      dodgeState.x = (areaRect.width - dodgeState.width) / 2;
      dodgeState.y = areaRect.height * 0.69;
      dodgeState.targetX = dodgeState.x;
      dodgeState.targetY = dodgeState.y;

      btnDodge.style.transform = \`translate3d(\${dodgeState.x}px, \${dodgeState.y}px, 0)\`;
      dodgeLabelText.textContent = DODGE_LABELS[0];
    }

    function checkRectOverlap(r1, r2) {
      return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
    }

    function chooseEscapeTarget(pointerLocal) {
      const areaW = playArea.clientWidth;
      const areaH = playArea.clientHeight;
      const pad = 16;
      const pillW = dodgeState.width;
      const pillH = dodgeState.height;

      // Obstacle 1: Heading box
      const headingRect = {
        left: headingBox.offsetLeft - 14,
        top: headingBox.offsetTop - 10,
        right: headingBox.offsetLeft + headingBox.offsetWidth + 14,
        bottom: headingBox.offsetTop + headingBox.offsetHeight + 14
      };

      // Obstacle 2: Stationary YES CTA (+28px safe corridor)
      const yesRect = {
        left: btnYesWrapper.offsetLeft - 28,
        top: btnYesWrapper.offsetTop - 28,
        right: btnYesWrapper.offsetLeft + btnYesWrapper.offsetWidth + 28,
        bottom: btnYesWrapper.offsetTop + btnYesWrapper.offsetHeight + 28
      };

      // Obstacle 3: Bottom hint
      const hintRect = {
        left: bottomHint.offsetLeft - 10,
        top: bottomHint.offsetTop - 10,
        right: bottomHint.offsetLeft + bottomHint.offsetWidth + 10,
        bottom: bottomHint.offsetTop + bottomHint.offsetHeight + 10
      };

      const safeBounds = {
        minX: pad,
        minY: pad,
        maxX: areaW - pillW - pad,
        maxY: areaH - pillH - pad
      };

      // Generate 24 diverse candidate locations
      const candidates = [];
      const cols = [
        safeBounds.minX,
        safeBounds.minX + (safeBounds.maxX - safeBounds.minX) * 0.25,
        safeBounds.minX + (safeBounds.maxX - safeBounds.minX) * 0.5,
        safeBounds.minX + (safeBounds.maxX - safeBounds.minX) * 0.75,
        safeBounds.maxX
      ];
      const rows = [
        safeBounds.minY + 20,
        safeBounds.minY + (safeBounds.maxY - safeBounds.minY) * 0.35,
        safeBounds.minY + (safeBounds.maxY - safeBounds.minY) * 0.65,
        safeBounds.minY + (safeBounds.maxY - safeBounds.minY) * 0.85,
        safeBounds.maxY
      ];

      for (let r = 0; r < rows.length; r++) {
        for (let c = 0; c < cols.length; c++) {
          const jitterX = (Math.random() - 0.5) * 16;
          const jitterY = (Math.random() - 0.5) * 16;
          const candX = Math.max(safeBounds.minX, Math.min(safeBounds.maxX, cols[c] + jitterX));
          const candY = Math.max(safeBounds.minY, Math.min(safeBounds.maxY, rows[r] + jitterY));

          const candBox = {
            left: candX,
            top: candY,
            right: candX + pillW,
            bottom: candY + pillH
          };

          // Validate non-overlapping
          if (!checkRectOverlap(candBox, headingRect) &&
              !checkRectOverlap(candBox, yesRect) &&
              !checkRectOverlap(candBox, hintRect)) {
            candidates.push({ x: candX, y: candY });
          }
        }
      }

      // If strict check produced few candidates, relax hint slightly
      if (candidates.length < 3) {
        candidates.push(
          { x: safeBounds.minX, y: safeBounds.maxY - 10 },
          { x: safeBounds.maxX, y: safeBounds.maxY - 10 },
          { x: (safeBounds.minX + safeBounds.maxX) / 2, y: safeBounds.maxY }
        );
      }

      // Score candidates
      const currentPos = { x: dodgeState.x, y: dodgeState.y };
      const scored = candidates.map(function(cand) {
        let score = 0;
        // Far from current pointer
        if (pointerLocal) {
          const distPointer = Math.hypot(cand.x - pointerLocal.x, cand.y - pointerLocal.y);
          score += distPointer * 1.8;
        }
        // Far from current button pos
        const distCurrent = Math.hypot(cand.x - currentPos.x, cand.y - currentPos.y);
        score += distCurrent * 1.2;

        // Far from recent targets
        for (let i = 0; i < dodgeState.recentTargets.length; i++) {
          const prev = dodgeState.recentTargets[i];
          const distPrev = Math.hypot(cand.x - prev.x, cand.y - prev.y);
          if (distPrev < 70) score -= 250;
        }

        return { cand: cand, score: score };
      });

      scored.sort(function(a, b) { return b.score - a.score; });

      // Pick randomly among top 3
      const topSlice = scored.slice(0, Math.min(3, scored.length));
      const chosen = topSlice[Math.floor(Math.random() * topSlice.length)].cand;

      dodgeState.recentTargets.push(chosen);
      if (dodgeState.recentTargets.length > 4) {
        dodgeState.recentTargets.shift();
      }

      return chosen;
    }

    function buildSafeEscapePath(p0, p3) {
      const dx = p3.x - p0.x;
      const dy = p3.y - p0.y;
      const dist = Math.hypot(dx, dy);

      // Normal vector
      const nx = -dy / (dist || 1);
      const ny = dx / (dist || 1);

      // Amplitude 35 - 65px
      const amp = 38 + Math.random() * 28;
      // Direction: choose curve away from YES button
      const yesCenter = {
        x: btnYesWrapper.offsetLeft + btnYesWrapper.offsetWidth / 2,
        y: btnYesWrapper.offsetTop + btnYesWrapper.offsetHeight / 2
      };
      const midPoint = { x: p0.x + dx * 0.5, y: p0.y + dy * 0.5 };
      const testDir1 = { x: midPoint.x + nx * amp, y: midPoint.y + ny * amp };
      const testDir2 = { x: midPoint.x - nx * amp, y: midPoint.y - ny * amp };

      const dist1 = Math.hypot(testDir1.x - yesCenter.x, testDir1.y - yesCenter.y);
      const dist2 = Math.hypot(testDir2.x - yesCenter.x, testDir2.y - yesCenter.y);
      let sign = dist1 > dist2 ? 1 : -1;

      let p1 = {
        x: p0.x + dx * 0.3 + nx * amp * sign,
        y: p0.y + dy * 0.3 + ny * amp * sign
      };
      let p2 = {
        x: p0.x + dx * 0.7 + nx * amp * sign,
        y: p0.y + dy * 0.7 + ny * amp * sign
      };

      // Sample 20 points along Bézier curve to check collision with YES CTA
      const yesBox = {
        left: btnYesWrapper.offsetLeft - 12,
        top: btnYesWrapper.offsetTop - 12,
        right: btnYesWrapper.offsetLeft + btnYesWrapper.offsetWidth + 12,
        bottom: btnYesWrapper.offsetTop + btnYesWrapper.offsetHeight + 12
      };

      function testPathCollision(p1Test, p2Test) {
        for (let i = 1; i < 20; i++) {
          const t = i / 20;
          const u = 1 - t;
          const sx = u*u*u*p0.x + 3*u*u*t*p1Test.x + 3*u*t*t*p2Test.x + t*t*t*p3.x;
          const sy = u*u*u*p0.y + 3*u*u*t*p1Test.y + 3*u*t*t*p2Test.y + t*t*t*p3.y;
          const pillBox = {
            left: sx,
            top: sy,
            right: sx + dodgeState.width,
            bottom: sy + dodgeState.height
          };
          if (checkRectOverlap(pillBox, yesBox)) {
            return true;
          }
        }
        return false;
      }

      if (testPathCollision(p1, p2)) {
        // Try opposite curve sign
        sign = -sign;
        const altP1 = {
          x: p0.x + dx * 0.3 + nx * amp * sign,
          y: p0.y + dy * 0.3 + ny * amp * sign
        };
        const altP2 = {
          x: p0.x + dx * 0.7 + nx * amp * sign,
          y: p0.y + dy * 0.7 + ny * amp * sign
        };
        if (!testPathCollision(altP1, altP2)) {
          p1 = altP1;
          p2 = altP2;
        } else {
          // Increase curvature amplitude to sweep wide around the button
          const wideAmp = amp * 1.6;
          p1 = {
            x: p0.x + dx * 0.2 + nx * wideAmp * sign,
            y: p0.y + dy * 0.2 + ny * wideAmp * sign
          };
          p2 = {
            x: p0.x + dx * 0.8 + nx * wideAmp * sign,
            y: p0.y + dy * 0.8 + ny * wideAmp * sign
          };
        }
      }

      return { p0: p0, p1: p1, p2: p2, p3: p3, dist: dist };
    }

    function requestDodge(pointerLocal) {
      const now = performance.now();
      if (now - dodgeState.lastDodgeTime < dodgeState.cooldown) return;
      dodgeState.lastDodgeTime = now;

      // Advance tease counter & label
      state.teaseCount++;
      const labelIdx = Math.min(state.teaseCount, 7);
      dodgeLabelText.textContent = DODGE_LABELS[labelIdx];

      // Slightly scale up YES button halo
      const scaleHalo = Math.min(1.06, 1 + state.teaseCount * 0.008);
      btnYes.style.transform = \`scale(\${scaleHalo})\`;
      btnYes.classList.add('boost-halo');

      // If reduced motion is active, do not animate position
      if (isReducedMotion) {
        return;
      }

      // Pick target
      const target = chooseEscapeTarget(pointerLocal);
      const path = buildSafeEscapePath({ x: dodgeState.x, y: dodgeState.y }, target);

      dodgeState.p0 = path.p0;
      dodgeState.p1 = path.p1;
      dodgeState.p2 = path.p2;
      dodgeState.p3 = path.p3;
      dodgeState.targetX = target.x;
      dodgeState.targetY = target.y;

      dodgeState.isMoving = true;
      dodgeState.moveStart = now;
      dodgeState.moveDuration = Math.max(240, Math.min(380, path.dist * 0.95));

      cometTail.classList.add('active');

      // Spawn stardust particles
      const areaRect = playArea.getBoundingClientRect();
      spawnBurst(areaRect.left + dodgeState.x + dodgeState.width / 2, areaRect.top + dodgeState.y + dodgeState.height / 2, 8, ['#FFD1AE', '#F1A8C1', '#FFF2DC']);
    }

    function updateDodgePhysics(dt, now) {
      if (!dodgeState.isMoving) return;

      const elapsed = now - dodgeState.moveStart;
      const t = Math.min(1, elapsed / dodgeState.moveDuration);

      // Ease out cubic
      const u = 1 - t;
      const easeT = 1 - u * u * u;

      // Cubic Bézier
      const uE = 1 - easeT;
      const curX = uE * uE * uE * dodgeState.p0.x +
                   3 * uE * uE * easeT * dodgeState.p1.x +
                   3 * uE * easeT * easeT * dodgeState.p2.x +
                   easeT * easeT * easeT * dodgeState.p3.x;

      const curY = uE * uE * uE * dodgeState.p0.y +
                   3 * uE * uE * easeT * dodgeState.p1.y +
                   3 * uE * easeT * easeT * dodgeState.p2.y +
                   easeT * easeT * easeT * dodgeState.p3.y;

      // Velocity for tilt
      const vx = curX - dodgeState.x;
      const vy = curY - dodgeState.y;
      const tilt = Math.max(-6, Math.min(6, (vx / (dt || 0.016)) * 0.015));

      // Calculate comet tail angle opposing motion
      const velAngle = Math.atan2(vy, vx);
      cometTail.style.transform = \`rotate(\${velAngle + Math.PI}rad) scaleX(1.4)\`;

      dodgeState.x = curX;
      dodgeState.y = curY;

      btnDodge.style.transform = \`translate3d(\${curX}px, \${curY}px, 0) rotate(\${tilt}deg)\`;

      // Spawn comet trail dust into pool
      if (Math.random() < 0.65) {
        const areaRect = playArea.getBoundingClientRect();
        spawnParticle({
          x: areaRect.left + curX + dodgeState.width / 2 - vx * 0.8,
          y: areaRect.top + curY + dodgeState.height / 2 - vy * 0.8 + (Math.random() - 0.5) * 8,
          vx: -vx * 0.4,
          vy: -vy * 0.4,
          size: 1.5 + Math.random() * 1.8,
          color: '#F1A8C1',
          alpha: 0.75,
          maxLife: 0.38
        });
      }

      if (t >= 1) {
        dodgeState.isMoving = false;
        dodgeState.x = dodgeState.p3.x;
        dodgeState.y = dodgeState.p3.y;
        cometTail.classList.remove('active');

        // Gentle 1-beat soft bounce ±2px on landing
        btnDodge.style.transform = \`translate3d(\${dodgeState.x}px, \${dodgeState.y - 2}px, 0) rotate(0deg)\`;
        setTimeout(function() {
          btnDodge.style.transform = \`translate3d(\${dodgeState.x}px, \${dodgeState.y}px, 0) rotate(0deg)\`;
        }, 110);

        // Soft twinkle of star icon
        dodgeStarIcon.style.transform = 'scale(1.25)';
        setTimeout(function() {
          dodgeStarIcon.style.transform = 'scale(1)';
        }, 220);
      }
    }

    // Desktop: pointermove on playArea
    playArea.addEventListener('pointermove', function(e) {
      if (state.scene !== 'question') return;
      if (e.pointerType === 'touch') return;

      const rect = btnDodge.getBoundingClientRect();
      const pointerX = e.clientX;
      const pointerY = e.clientY;

      // Distance to dodge pill box
      const dx = Math.max(rect.left - pointerX, 0, pointerX - rect.right);
      const dy = Math.max(rect.top - pointerY, 0, pointerY - rect.bottom);
      const dist = Math.hypot(dx, dy);

      if (dist < 52) {
        const areaRect = playArea.getBoundingClientRect();
        const localPointer = { x: pointerX - areaRect.left, y: pointerY - areaRect.top };
        requestDodge(localPointer);
      }
    }, { passive: true });

    // Safeguard pointerenter on button
    btnDodge.addEventListener('pointerenter', function(e) {
      if (state.scene !== 'question') return;
      if (e.pointerType === 'touch') return;
      const areaRect = playArea.getBoundingClientRect();
      requestDodge({ x: e.clientX - areaRect.left, y: e.clientY - areaRect.top });
    });

    // Mobile: pointerdown immediately dodges
    btnDodge.addEventListener('pointerdown', function(e) {
      if (state.scene !== 'question') return;
      e.preventDefault();
      dodgeState.touchTime = performance.now();
      const areaRect = playArea.getBoundingClientRect();
      requestDodge({ x: e.clientX - areaRect.left, y: e.clientY - areaRect.top });
    });

    // Prevent default click & NEVER advance scene on dodge button
    btnDodge.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const now = performance.now();
      if (now - dodgeState.touchTime > 250) {
        requestDodge();
      }
    });

    // Accessible keyboard activation
    btnDodge.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        requestDodge();
      }
    });

    // Stationary YES Button Click -> WARP
    btnYes.addEventListener('click', function() {
      if (state.transitioning) return;
      goToScene('warp');
    });

    /* ====================================================
       6. SCENE CONTROLLER (STATE MACHINE)
       ==================================================== */
    const scenes = {
      signal: document.getElementById('scene-signal'),
      question: document.getElementById('scene-question'),
      warp: document.getElementById('scene-warp'),
      constellation: document.getElementById('scene-constellation'),
      letter: document.getElementById('scene-letter'),
      wish: document.getElementById('scene-wish'),
      keepsake: document.getElementById('scene-keepsake')
    };

    function goToScene(nextSceneName) {
      if (state.transitioning) return;
      const currentSceneName = state.scene;
      if (currentSceneName === nextSceneName) return;

      state.transitioning = true;
      const currentEl = scenes[currentSceneName];
      const nextEl = scenes[nextSceneName];

      if (currentEl) {
        currentEl.classList.add('scene-exiting');
      }

      setTimeout(function() {
        if (currentEl) {
          currentEl.classList.remove('active', 'scene-exiting');
        }
        if (nextEl) {
          nextEl.classList.add('active');
          window.scrollTo({ top: 0, behavior: isReducedMotion ? 'auto' : 'smooth' });
        }
        state.scene = nextSceneName;
        state.transitioning = false;

        onSceneEnter(nextSceneName);
      }, isReducedMotion ? 60 : 450);
    }

    function onSceneEnter(sceneName) {
      if (sceneName === 'question') {
        initDodgeButtonPosition();
      } else if (sceneName === 'warp') {
        startWarpSequence();
      } else if (sceneName === 'constellation') {
        renderConstellationAnchors();
      } else if (sceneName === 'letter') {
        renderLetterClosed();
      } else if (sceneName === 'wish') {
        renderWishScene();
      } else if (sceneName === 'keepsake') {
        revealKeepsakeCard();
      }
    }

    /* ====================================================
       7. SCENE 0: SIGNAL INTERACTION & CONNECTING MOTION
       ==================================================== */
    const signalArea = document.getElementById('signal-interactive-area');
    const signalHeader = document.getElementById('signal-header-block');
    const signalRipple = document.getElementById('signal-ripple');
    const btnSignalStar = document.getElementById('btn-signal-star');
    const signalHintText = document.getElementById('signal-hint-text');

    function triggerSignalTransition(e) {
      if (e) {
        if (e.preventDefault) e.preventDefault();
        if (e.stopPropagation) e.stopPropagation();
      }
      if (state.transitioning || state.scene !== 'signal') return;

      signalRipple.classList.add('expanding');
      signalHeader.classList.add('flying-out');
      signalHintText.style.opacity = '0';

      const rect = btnSignalStar.getBoundingClientRect();
      spawnBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 24, ['#FFF2DC', '#FFD1AE', '#F1A8C1', '#A5D9EF']);

      // Connecting object: star flies upward toward question scene's celestial heart
      signalArea.classList.add('flying-up');

      setTimeout(function() {
        goToScene('question');
      }, isReducedMotion ? 100 : 750);
    }

    signalArea.addEventListener('click', triggerSignalTransition);
    btnSignalStar.addEventListener('click', triggerSignalTransition);
    signalArea.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerSignalTransition();
      }
    });

    /* ====================================================
       8. SCENE 2: WARP CINEMATIC TIMELINE
       ==================================================== */
    function startWarpSequence() {
      warpActive = true;
      warpProgress = 0;

      if (isReducedMotion) {
        setTimeout(function() {
          warpActive = false;
          goToScene('constellation');
        }, 600);
        return;
      }

      const startTime = performance.now();
      const warpDuration = 2800; // ms

      const interval = setInterval(function() {
        const now = performance.now();
        const elapsed = now - startTime;
        warpProgress = Math.min(1, elapsed / warpDuration);

        if (warpProgress >= 1) {
          clearInterval(interval);
          warpActive = false;
          goToScene('constellation');
        }
      }, 50);
    }

    /* ====================================================
       9. SCENE 3: CONSTELLATION (GOM SAO THÀNH TIM)
       ==================================================== */
    const anchorsContainer = document.getElementById('star-anchors-container');
    const constellationReadingText = document.getElementById('constellation-reading-text');
    const constellationNames = document.getElementById('constellation-names');
    const heartActiveTrack = document.getElementById('heart-active-track');
    const heartTracerStar = document.getElementById('heart-tracer-star');
    const constellationDots = document.getElementById('constellation-dots').children;
    const btnToLetterWrapper = document.getElementById('btn-to-letter-wrapper');
    const btnToLetter = document.getElementById('btn-to-letter');

    function renderConstellationAnchors() {
      anchorsContainer.innerHTML = '';
      const stage = document.getElementById('constellation-stage');

      STAR_ANCHORS.forEach(function(anchor, index) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'star-anchor' + (state.collectedStars.includes(index) ? ' collected' : '');
        btn.setAttribute('aria-label', \`Điều thứ \${index + 1}\`);
        btn.style.left = (anchor.x * 100) + '%';
        btn.style.top = (anchor.y * 100) + '%';

        btn.innerHTML = \`
          <div class="star-anchor-halo" aria-hidden="true"></div>
          <svg class="star-node" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"/>
          </svg>
        \`;

        btn.addEventListener('click', function() {
          collectConstellationStar(index, btn);
        });

        anchorsContainer.appendChild(btn);
      });

      updateConstellationUI();
    }

    function collectConstellationStar(index, btnEl) {
      const isNew = !state.collectedStars.includes(index);
      if (isNew) {
        state.collectedStars.push(index);
      }

      btnEl.classList.add('collected');

      // Sparkle Burst
      const rect = btnEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      spawnBurst(cx, cy, 14, ['#FFD1AE', '#FFF2DC', '#F1A8C1']);

      // Curve particle toward heart center
      const stage = document.getElementById('constellation-stage');
      const stageRect = stage.getBoundingClientRect();
      const centerScreen = { x: stageRect.left + stageRect.width / 2, y: stageRect.top + stageRect.height * 0.52 };

      for (let i = 0; i < 6; i++) {
        spawnParticle({
          x: cx,
          y: cy,
          size: 2.5,
          color: '#FFD1AE',
          alpha: 1,
          maxLife: 0.65,
          curve: {
            p0: { x: cx, y: cy },
            p1: { x: (cx + centerScreen.x) / 2 + (Math.random() - 0.5) * 40, y: Math.min(cy, centerScreen.y) - 40 },
            p2: { x: centerScreen.x, y: centerScreen.y }
          }
        });
      }

      // Display Message
      const msg = CONFIG.starMessages[index] || '';
      constellationReadingText.style.opacity = '0';
      constellationReadingText.style.transform = 'translateY(8px)';
      setTimeout(function() {
        constellationReadingText.textContent = msg;
        constellationReadingText.style.opacity = '1';
        constellationReadingText.style.transform = 'translateY(0)';
      }, 150);

      updateConstellationUI();
    }

    function animateShootingStarLoop() {
      if (isReducedMotion) return;
      const heartPath = document.getElementById('heart-active-track');
      if (!heartPath || !heartTracerStar) return;

      const pathLen = heartPath.getTotalLength();
      heartTracerStar.style.opacity = '1';

      const startTime = performance.now();
      const duration = 1500; // ms

      function stepTracer(now) {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const pt = heartPath.getPointAtLength(progress * pathLen);

        // Convert SVG coordinates to stage coordinates
        const stage = document.getElementById('constellation-stage');
        const scaleX = stage.clientWidth / 400;
        const scaleY = stage.clientHeight / 360;

        heartTracerStar.style.left = (pt.x * scaleX) + 'px';
        heartTracerStar.style.top = (pt.y * scaleY) + 'px';

        if (progress < 1) {
          requestAnimationFrame(stepTracer);
        } else {
          heartTracerStar.style.opacity = '0';
        }
      }

      requestAnimationFrame(stepTracer);
    }

    function updateConstellationUI() {
      const count = state.collectedStars.length;
      // Heart stroke dashoffset
      const offset = 1000 - (count * 200);
      heartActiveTrack.style.strokeDashoffset = offset;

      // Update dots
      for (let i = 0; i < constellationDots.length; i++) {
        if (state.collectedStars.includes(i)) {
          constellationDots[i].classList.add('active');
        } else {
          constellationDots[i].classList.remove('active');
        }
      }

      // When all 5 are gathered
      if (count === 5) {
        setTimeout(function() {
          animateShootingStarLoop();
          constellationNames.textContent = \`\${CONFIG.senderName} ♡ \${CONFIG.recipientName}\`;
          constellationNames.classList.add('revealed');
          constellationReadingText.textContent = 'Ghép lại mới thấy… hình như điều nào cũng là em.';

          setTimeout(function() {
            btnToLetterWrapper.classList.add('revealed');
          }, 1300);
        }, 700);
      }
    }

    btnToLetter.addEventListener('click', function() {
      goToScene('letter');
    });

    /* ====================================================
       10. SCENE 4: LETTER (LÁ THƯ TỪ QUỸ ĐẠO)
       ==================================================== */
    const closedView = document.getElementById('letter-closed-view');
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const btnWaxSeal = document.getElementById('btn-wax-seal');
    const letterPanel = document.getElementById('letter-panel');
    const paragraphsContainer = document.getElementById('letter-paragraphs-container');
    const letterPhotoWrapper = document.getElementById('letter-photo-wrapper');
    const letterPhoto = document.getElementById('letter-photo');
    const letterSignatureText = document.getElementById('letter-signature-text');
    const btnToWish = document.getElementById('btn-to-wish');

    function renderLetterClosed() {
      if (state.letterOpened) {
        closedView.style.display = 'none';
        letterPanel.classList.add('visible');
        return;
      }
      closedView.style.display = 'block';
      letterPanel.classList.remove('visible');
      envelopeWrapper.classList.remove('opened');
    }

    function openEnvelopeSequence() {
      if (state.letterOpened) return;
      state.letterOpened = true;

      // Wax Seal Burst
      const sealRect = btnWaxSeal.getBoundingClientRect();
      spawnBurst(sealRect.left + sealRect.width / 2, sealRect.top + sealRect.height / 2, 16, ['#FFDFBA', '#E89E78', '#F1A8C1']);

      envelopeWrapper.classList.add('opened');

      setTimeout(function() {
        closedView.style.display = 'none';
        letterPanel.classList.add('visible');

        // Reveal paragraphs staggered
        paragraphsContainer.innerHTML = '';
        CONFIG.letterParagraphs.forEach(function(para, idx) {
          const p = document.createElement('p');
          p.className = 'letter-paragraph';
          p.textContent = para;
          paragraphsContainer.appendChild(p);

          setTimeout(function() {
            p.classList.add('revealed');
          }, 150 + idx * 220);
        });

        // Optional photo if supplied in CONFIG
        if (CONFIG.optionalPhotoDataUrl && CONFIG.optionalPhotoDataUrl.trim()) {
          letterPhoto.src = CONFIG.optionalPhotoDataUrl;
          letterPhotoWrapper.style.display = 'flex';
        }

        letterSignatureText.textContent = CONFIG.signature;
        setTimeout(function() {
          letterSignatureText.classList.add('revealed');
        }, 150 + CONFIG.letterParagraphs.length * 220);

      }, isReducedMotion ? 100 : 1100);
    }

    btnWaxSeal.addEventListener('click', openEnvelopeSequence);

    btnToWish.addEventListener('click', function() {
      goToScene('wish');
    });

    /* ====================================================
       11. SCENE 5: WISH (MỘT ĐIỀU ƯỚC CHO CHÚNG MÌNH)
       ==================================================== */
    const wishInput = document.getElementById('wish-input');
    const wishCounter = document.getElementById('wish-counter');
    const wishChips = document.getElementById('wish-chips');
    const wishStarIcon = document.getElementById('wish-star-icon');
    const wishBeam = document.getElementById('wish-beam');
    const btnSubmitWish = document.getElementById('btn-submit-wish');
    const btnClearWish = document.getElementById('btn-clear-wish');
    let lastTypingSparkle = 0;

    function renderWishScene() {
      if (state.wish) {
        wishInput.value = state.wish;
        wishCounter.textContent = \`\${state.wish.length}/280\`;
        btnClearWish.style.display = 'inline-block';
      } else {
        wishInput.value = '';
        wishCounter.textContent = '0/280';
        btnClearWish.style.display = 'none';
      }
    }

    wishChips.addEventListener('click', function(e) {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      const text = chip.dataset.text;
      wishInput.value = text;
      wishCounter.textContent = \`\${text.length}/280\`;
      btnClearWish.style.display = 'inline-block';

      // Chip highlight
      Array.from(wishChips.children).forEach(function(c) { c.classList.remove('selected'); });
      chip.classList.add('selected');
      wishInput.focus();
    });

    wishInput.addEventListener('focus', function() {
      wishStarIcon.classList.add('active');
    });
    wishInput.addEventListener('blur', function() {
      wishStarIcon.classList.remove('active');
    });

    wishInput.addEventListener('input', function() {
      const len = wishInput.value.length;
      wishCounter.textContent = \`\${len}/280\`;
      btnClearWish.style.display = len > 0 ? 'inline-block' : 'none';

      // Sparkle on typing (throttled 500ms)
      const now = performance.now();
      if (now - lastTypingSparkle > 500) {
        lastTypingSparkle = now;
        const starRect = wishStarIcon.getBoundingClientRect();
        spawnParticle({
          x: starRect.left + starRect.width / 2 + (Math.random() - 0.5) * 14,
          y: starRect.top + starRect.height / 2,
          vx: (Math.random() - 0.5) * 20,
          vy: -35 - Math.random() * 30,
          size: 2,
          color: '#FFD1AE',
          alpha: 0.85,
          maxLife: 0.5
        });
      }
    });

    btnClearWish.addEventListener('click', function() {
      wishInput.value = '';
      state.wish = '';
      wishCounter.textContent = '0/280';
      btnClearWish.style.display = 'none';
      try {
        localStorage.removeItem(CONFIG.storageKey);
      } catch(e) {}
      showToast('Đã xóa điều ước đã lưu');
    });

    btnSubmitWish.addEventListener('click', function() {
      const val = wishInput.value.trim();
      const finalWish = val || 'Cùng nhau có thêm thật nhiều ngày dịu dàng.';
      state.wish = finalWish;

      try {
        localStorage.setItem(CONFIG.storageKey, finalWish);
      } catch(e) {}

      // Shooting light beam upward
      wishBeam.classList.add('shooting');
      const starRect = wishStarIcon.getBoundingClientRect();
      spawnBurst(starRect.left + starRect.width / 2, starRect.top + starRect.height / 2, 20, ['#FFF2DC', '#FFD1AE', '#F1A8C1']);

      setTimeout(function() {
        wishBeam.classList.remove('shooting');
        goToScene('keepsake');
      }, isReducedMotion ? 100 : 950);
    });

    /* ====================================================
       12. SCENE 6: KEEPSAKE & PNG EXPORT
       ==================================================== */
    const keepsakeCard = document.getElementById('keepsake-card');
    const cardRecipientName = document.getElementById('card-recipient-name');
    const cardCoupleNames = document.getElementById('card-couple-names');
    const cardWishText = document.getElementById('card-wish-text');
    const cardFinalLine = document.getElementById('card-final-line');
    const cardSignatureText = document.getElementById('card-signature-text');
    const btnSavePng = document.getElementById('btn-save-png');
    const btnShare = document.getElementById('btn-share');
    const btnCopyMsg = document.getElementById('btn-copy-msg');
    const btnRestart = document.getElementById('btn-restart');
    const downloadHelper = document.getElementById('download-helper');

    function revealKeepsakeCard() {
      const model = buildGiftModel();
      cardRecipientName.textContent = model.recipientName;
      cardCoupleNames.textContent = \`\${model.senderName} ♡ \${model.recipientName}\`;
      cardWishText.textContent = \`“\${model.wish}”\`;
      cardFinalLine.textContent = model.finalLine;
      cardSignatureText.textContent = \`Từ \${model.senderName}, gửi \${model.recipientName}\`;

      setTimeout(function() {
        keepsakeCard.classList.add('revealed');
        const cardRect = keepsakeCard.getBoundingClientRect();
        spawnBurst(cardRect.left + cardRect.width / 2, cardRect.top + cardRect.height * 0.35, 18, ['#FFD1AE', '#FFF2DC', '#A5D9EF']);
      }, 100);
    }

    function buildGiftModel() {
      return {
        version: 1,
        senderName: CONFIG.senderName,
        recipientName: CONFIG.recipientName,
        wish: state.wish.trim() || 'Cùng nhau có thêm thật nhiều ngày dịu dàng.',
        finalLine: CONFIG.finalLine,
        starSeed: 2404
      };
    }

    /* 2D Canvas PNG Generator (NO external dependencies) */
    async function renderGiftPng(model) {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      const canvasWidth = 800;
      const canvasHeight = 1240;
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = canvasWidth * 2;
      exportCanvas.height = canvasHeight * 2;
      const g = exportCanvas.getContext('2d');
      g.scale(2, 2);

      // 1. Deep Midnight Sky Gradient
      const bgGrad = g.createLinearGradient(0, 0, 0, canvasHeight);
      bgGrad.addColorStop(0, '#080C24');
      bgGrad.addColorStop(0.45, '#151333');
      bgGrad.addColorStop(1, '#251B42');
      g.fillStyle = bgGrad;
      g.fillRect(0, 0, canvasWidth, canvasHeight);

      // 2. Subtle Nebula Radiance
      const nebGrad1 = g.createRadialGradient(canvasWidth * 0.75, canvasHeight * 0.28, 0, canvasWidth * 0.75, canvasHeight * 0.28, 380);
      nebGrad1.addColorStop(0, 'rgba(114,84,155,0.25)');
      nebGrad1.addColorStop(0.5, 'rgba(241,168,193,0.1)');
      nebGrad1.addColorStop(1, 'transparent');
      g.fillStyle = nebGrad1;
      g.fillRect(0, 0, canvasWidth, canvasHeight);

      const nebGrad2 = g.createRadialGradient(canvasWidth * 0.2, canvasHeight * 0.78, 0, canvasWidth * 0.2, canvasHeight * 0.78, 340);
      nebGrad2.addColorStop(0, 'rgba(165,217,239,0.18)');
      nebGrad2.addColorStop(1, 'transparent');
      g.fillStyle = nebGrad2;
      g.fillRect(0, 0, canvasWidth, canvasHeight);

      // 3. Deterministic Starfield using fixed seed
      let seed = model.starSeed || 2404;
      function pseudoRandom() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
      }

      for (let i = 0; i < 90; i++) {
        const sx = pseudoRandom() * canvasWidth;
        const sy = pseudoRandom() * canvasHeight;
        const sr = 0.6 + pseudoRandom() * 1.5;
        const sa = 0.2 + pseudoRandom() * 0.65;
        g.fillStyle = pseudoRandom() > 0.4 ? '#FFF2DC' : '#FFD1AE';
        g.globalAlpha = sa;
        g.beginPath();
        g.arc(sx, sy, sr, 0, Math.PI * 2);
        g.fill();
      }
      g.globalAlpha = 1;

      // 4. Ornate Double Rose-Gold Border
      const m = 36;
      g.strokeStyle = 'rgba(255,209,174,0.45)';
      g.lineWidth = 1.5;
      g.strokeRect(m, m, canvasWidth - m * 2, canvasHeight - m * 2);

      g.strokeStyle = 'rgba(255,241,220,0.2)';
      g.lineWidth = 1;
      g.strokeRect(m + 8, m + 8, canvasWidth - (m + 8) * 2, canvasHeight - (m + 8) * 2);

      // Corner Stars
      function drawCornerStar(cx, cy) {
        g.fillStyle = '#FFD1AE';
        g.beginPath();
        g.arc(cx, cy, 3, 0, Math.PI * 2);
        g.fill();
      }
      drawCornerStar(m + 8, m + 8);
      drawCornerStar(canvasWidth - m - 8, m + 8);
      drawCornerStar(m + 8, canvasHeight - m - 8);
      drawCornerStar(canvasWidth - m - 8, canvasHeight - m - 8);

      // 5. Card Typography
      g.textAlign = 'center';

      // Eyebrow
      g.font = '600 13px system-ui, sans-serif';
      g.fillStyle = '#FFF2DC';
      g.fillText('MỘT GÓC VŨ TRỤ DÀNH RIÊNG CHO', canvasWidth / 2, 110);

      // Recipient Name
      g.font = 'bold 50px Georgia, "Times New Roman", serif';
      const nameGrad = g.createLinearGradient(canvasWidth / 2 - 150, 140, canvasWidth / 2 + 150, 180);
      nameGrad.addColorStop(0, '#FFF2DC');
      nameGrad.addColorStop(0.5, '#FFD1AE');
      nameGrad.addColorStop(1, '#F1A8C1');
      g.fillStyle = nameGrad;
      g.fillText(model.recipientName, canvasWidth / 2, 175);

      // 6. Draw Completed Constellation Heart
      const hx = canvasWidth / 2;
      const hy = 320;
      g.save();
      g.translate(hx - 150, hy - 110);
      g.scale(0.75, 0.75);

      g.strokeStyle = 'rgba(241,168,193,0.7)';
      g.lineWidth = 2.5;
      g.beginPath();
      // Heart path
      g.moveTo(200, 90);
      g.bezierCurveTo(130, 18, 30, 45, 30, 145);
      g.bezierCurveTo(30, 230, 120, 285, 200, 340);
      g.bezierCurveTo(280, 285, 370, 230, 370, 145);
      g.bezierCurveTo(370, 45, 270, 18, 200, 90);
      g.stroke();

      // 5 Golden Anchor Stars
      const anchors = [
        { x: 96, y: 83 },
        { x: 296, y: 83 },
        { x: 344, y: 187 },
        { x: 200, y: 310 },
        { x: 56, y: 187 }
      ];
      anchors.forEach(function(pt) {
        g.fillStyle = '#FFD1AE';
        g.beginPath();
        g.arc(pt.x, pt.y, 7, 0, Math.PI * 2);
        g.fill();
        g.fillStyle = '#FFFFFF';
        g.beginPath();
        g.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
        g.fill();
      });
      g.restore();

      // Couple Names
      g.font = 'italic 24px Georgia, "Times New Roman", serif';
      g.fillStyle = '#FFD1AE';
      g.fillText(\`\${model.senderName} ♡ \${model.recipientName}\`, canvasWidth / 2, 490);

      // Poetic Subtitle
      g.font = '15px system-ui, sans-serif';
      g.fillStyle = '#BDB5CE';
      g.fillText('Nơi chúng mình chọn ở lại bên nhau', canvasWidth / 2, 524);

      // Divider Line with Star
      g.strokeStyle = 'rgba(255,241,220,0.3)';
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(canvasWidth / 2 - 140, 560);
      g.lineTo(canvasWidth / 2 - 16, 560);
      g.moveTo(canvasWidth / 2 + 16, 560);
      g.lineTo(canvasWidth / 2 + 140, 560);
      g.stroke();

      g.fillStyle = '#FFF2DC';
      g.beginPath();
      g.arc(canvasWidth / 2, 560, 4, 0, Math.PI * 2);
      g.fill();

      // Wish Section
      g.font = '600 13px system-ui, sans-serif';
      g.fillStyle = '#F1A8C1';
      g.fillText('ĐIỀU ƯỚC CỦA CHÚNG MÌNH', canvasWidth / 2, 610);

      // Text Wrapping for User Wish
      g.font = 'italic 26px Georgia, "Times New Roman", serif';
      g.fillStyle = '#FFF2DC';

      const maxTextWidth = 560;
      const lineHeight = 42;
      const wishLines = [];
      const words = model.wish.split(' ');
      let curLine = '';

      for (let i = 0; i < words.length; i++) {
        const testLine = curLine ? (curLine + ' ' + words[i]) : words[i];
        const metrics = g.measureText(testLine);
        if (metrics.width > maxTextWidth && curLine) {
          wishLines.push(curLine);
          curLine = words[i];
        } else {
          curLine = testLine;
        }
      }
      if (curLine) wishLines.push(curLine);

      let textStartY = 665;
      for (let i = 0; i < wishLines.length; i++) {
        const lineContent = (i === 0 ? '“' : '') + wishLines[i] + (i === wishLines.length - 1 ? '”' : '');
        g.fillText(lineContent, canvasWidth / 2, textStartY + i * lineHeight);
      }

      const finalLineY = Math.max(830, textStartY + wishLines.length * lineHeight + 40);

      // Final Line
      g.font = 'italic 18px Georgia, "Times New Roman", serif';
      g.fillStyle = '#BDB5CE';
      g.fillText(model.finalLine, canvasWidth / 2, finalLineY);

      // Signature
      g.font = 'italic 20px Georgia, "Times New Roman", serif';
      g.fillStyle = '#FFD1AE';
      g.fillText(\`Từ \${model.senderName}, gửi \${model.recipientName}\`, canvasWidth / 2, finalLineY + 54);

      return new Promise(function(resolve) {
        exportCanvas.toBlob(function(blob) {
          resolve(blob);
        }, 'image/png');
      });
    }

    async function downloadKeepsakePng() {
      const originalText = btnSavePng.innerHTML;
      btnSavePng.disabled = true;
      btnSavePng.innerHTML = 'Đang gom sao…';

      try {
        const model = buildGiftModel();
        const blob = await renderGiftPng(model);
        const url = URL.createObjectURL(blob);
        downloadHelper.href = url;
        downloadHelper.download = 'gui-em-mot-vu-tru.png';
        downloadHelper.click();
        showToast('Đã lưu bức ảnh vũ trụ về máy ✨');

        setTimeout(function() {
          URL.revokeObjectURL(url);
        }, 5000);
      } catch (err) {
        showToast('Có chút gián đoạn khi lưu ảnh');
      } finally {
        btnSavePng.disabled = false;
        btnSavePng.innerHTML = originalText;
      }
    }

    async function shareKeepsake() {
      const model = buildGiftModel();
      const shareText = \`\${model.recipientName} ơi, giữa hàng triệu vì sao, anh có điều muốn gửi em: "\\\${model.wish}\\\"\`;

      if (navigator.share) {
        try {
          const blob = await renderGiftPng(model);
          const file = new File([blob], 'gui-em-mot-vu-tru.png', { type: 'image/png' });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: 'Gửi em một vũ trụ ✨',
              text: shareText,
              files: [file]
            });
            return;
          } else {
            await navigator.share({
              title: 'Gửi em một vũ trụ ✨',
              text: shareText
            });
            return;
          }
        } catch (err) {
          if (err.name === 'AbortError') return; // User closed sheet
        }
      }

      // Fallback: Copy text and download
      copyMessage();
      downloadKeepsakePng();
    }

    function copyMessage() {
      const model = buildGiftModel();
      const textToCopy = \`\${model.recipientName} ơi, điều ước của chúng mình:\\n"\${model.wish}"\\n\\n\${model.finalLine}\\n— Từ \${model.senderName}, gửi \${model.recipientName}\`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy).then(function() {
          showToast('Đã sao chép lời nhắn vào khay nhớ tạm ❤️');
        }).catch(function() {
          fallbackCopyText(textToCopy);
        });
      } else {
        fallbackCopyText(textToCopy);
      }
    }

    function fallbackCopyText(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        showToast('Đã sao chép lời nhắn vào khay nhớ tạm ❤️');
      } catch (e) {
        showToast('Không thể tự sao chép, bạn chép thủ công nhé');
      }
      document.body.removeChild(ta);
    }

    function restartJourney() {
      state.collectedStars = [];
      state.letterOpened = false;
      state.teaseCount = 0;
      state.transitioning = false;

      // Reset signal
      signalArea.classList.remove('flying-up');
      signalHeader.classList.remove('flying-out');
      signalHintText.style.opacity = '0.85';

      // Reset heart stroke
      heartActiveTrack.style.strokeDashoffset = '1000';
      constellationNames.classList.remove('revealed');
      btnToLetterWrapper.classList.remove('revealed');

      // Reset envelope
      envelopeWrapper.classList.remove('opened');
      letterPanel.classList.remove('visible');
      closedView.style.display = 'block';

      // Reset keepsake
      keepsakeCard.classList.remove('revealed');

      goToScene('signal');
      showToast('Đã trở về điểm bắt đầu ✨');
    }

    btnSavePng.addEventListener('click', downloadKeepsakePng);
    btnShare.addEventListener('click', shareKeepsake);
    btnCopyMsg.addEventListener('click', copyMessage);
    btnRestart.addEventListener('click', restartJourney);

    /* ====================================================
       13. TOAST NOTIFICATION HELPER
       ==================================================== */
    const toastEl = document.getElementById('toast');
    let toastTimeout = null;

    function showToast(msg) {
      if (!toastEl) return;
      toastEl.textContent = msg;
      toastEl.classList.add('show');
      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(function() {
        toastEl.classList.remove('show');
      }, 3200);
    }

    /* ====================================================
       14. INITIALIZATION
       ==================================================== */
    function initApp() {
      // Set static text from CONFIG
      document.getElementById('signal-eyebrow').textContent = CONFIG.openingEyebrow;
      document.getElementById('signal-title').textContent = CONFIG.openingTitle;
      document.getElementById('question-title').textContent = CONFIG.questionTitle;
      btnYes.textContent = CONFIG.yesLabel;

      resizeCanvas();
      frameId = requestAnimationFrame(tick);
    }

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', initApp);
    } else {
      initApp();
    }

  })();
  </script>
</body>
</html>`;
}

// Generate the HTML content
const html = generateHtml();

// Write to thiep-4/index.html
const thiep4IndexPath = path.join(__dirname, 'thiep-4', 'index.html');
fs.writeFileSync(thiep4IndexPath, html, 'utf8');
console.log('Successfully wrote to:', thiep4IndexPath, '(' + Buffer.byteLength(html, 'utf8') + ' bytes)');

