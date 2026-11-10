/**
 * THIỆP 8 — Cấu hình dữ liệu duy nhất
 * Tuân thủ mục 3.2, 5 & 8 tài liệu đặc tả
 */
const THIEP_8_CONFIG = {
  templateId: 'thiep-8',
  locale: 'vi',
  senderName: 'Anh',
  recipientName: 'Em',
  coverEyebrow: 'DEAR',
  coverTitle: 'My Love',
  message: '💖 Gửi người con gái anh thương nhất,\nCảm ơn em đã bước vào cuộc sống của anh, mang theo muôn vàn nụ cười và sưởi ấm những ngày tháng bình yên. Giữa vũ trụ bao la này, gặp được em chính là điều kỳ diệu và may mắn nhất đối với anh. Mong chúng mình sẽ luôn nắm chặt tay nhau đi qua mọi mùa yêu thương nhé! ✨❤️',
  orbitMessages: [
    'Cảm ơn em đã đến bên anh ✨',
    'Em là điều kỳ diệu nhất 💖',
    'Thương em nhiều hơn mỗi ngày 🌸',
    'Nắm tay nhau qua ngàn mùa nhớ 💫',
    'Bình yên là khi có em bên cạnh 🤍'
  ],
  photos: [
    { src: './assets/thiep-8/images/photo-01.svg', alt: 'Kỷ niệm ngọt ngào', objectPosition: 'center 40%' },
    { src: './assets/thiep-8/images/photo-02.svg', alt: 'Buổi tối ấm áp', objectPosition: 'center 40%' },
    { src: './assets/thiep-8/images/photo-03.svg', alt: 'Nụ cười rạng rỡ', objectPosition: 'center 35%' }
  ],
  primaryPhotoIndex: 0,
  intro: { allowSkip: true, autoAdvanceMs: 7800 },
  motion: { quality: 'auto', respectReducedMotion: true },
  gallery: { durationMs: 12000, maxPhotos: 6 },
  audio: { enabled: false }
};

if (typeof window !== 'undefined') {
  window.THIEP_8_CONFIG = THIEP_8_CONFIG;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = THIEP_8_CONFIG;
}
