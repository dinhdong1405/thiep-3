# THIỆP 4 — GỬI EM MỘT VŨ TRỤ

> Tài liệu giao việc trọn gói cho Codex. Hãy đọc toàn bộ rồi xây một thiệp tương tác hoàn chỉnh, chạy được, nhiều chuyển động có chủ đích. Đầu ra chính: **một file `index.html` tự chứa toàn bộ CSS, JavaScript và tài nguyên cần thiết**. Người nhận mở trên điện thoại là chơi được; chủ thiệp đưa file lên hosting tĩnh để gửi link.
>
> Đây là concept mới: vũ trụ xanh đêm, quỹ đạo, hành tinh, sao băng, cổng ánh sáng, chòm sao trái tim, thư và lời hẹn giữa các vì sao. Điểm kế thừa là nút suy nghĩ chạy né người dùng và chỉ nút đồng ý mới đưa câu chuyện đi tiếp. Không cần tài liệu hay video của mẫu trước để triển khai mẫu này.

## 1. Mục tiêu cảm xúc và sản phẩm

Một người nhận được tín hiệu từ vũ trụ. Họ chạm vào một ngôi sao đang phát sáng, mở một lời mời “Cho anh được ở trong vũ trụ của em nhé?”. Nút đồng ý đứng yên, sáng ấm; nút suy nghĩ biến thành một “sao chổi tinh nghịch”, liên tục chạy sang vị trí khác khi bị đuổi theo. Sau khi đồng ý, cả màn hình bay xuyên cổng sao. Người nhận gom những ngôi sao kỷ niệm thành trái tim, mở thư, rồi nhận một tấm “Tọa độ của chúng mình” có thể lưu ảnh và gửi lại.

Chất lượng phải giống một món quà được chăm chút: hình ảnh đẹp khi đứng yên, phản hồi sống động khi chạm, có nhịp nghỉ để đọc. “Nhiều motion” nghĩa là có chiều sâu, quỹ đạo, đuôi sáng, biến hình, vẽ đường, phản hồi thao tác và chuyển cảnh; không phải thêm nhiều vật thể ngẫu nhiên che chữ.

Không xây trang giới thiệu sản phẩm. Không header navigation, dashboard, bảng giá, đăng nhập, form dài hay backend. Không tự thêm âm nhạc. Chỉ cần một trải nghiệm riêng tư, lãng mạn, gửi được bằng link hosting.

## 2. Yêu cầu không được làm thiếu

1. Có đủ 7 cảnh: tín hiệu → câu hỏi và nút né → bay xuyên sao → gom sao → mở thư → lời hẹn → quà cuối.
2. Màn câu hỏi phải có hành vi **né trước khi con trỏ tới nút**, né khi chạm trên mobile, đổi câu đúng danh sách. Nút phụ tuyệt đối không chuyển câu chuyện sang nhánh khác khi bị click trúng.
3. Nút đồng ý luôn đứng yên và có vùng chạm rõ; nút né không che, không đè hoặc chạy qua nó.
4. Motion có nhiều lớp: nền, vật thể chính, typography, tương tác, chuyển cảnh. Không chỉ fade giữa những thẻ tĩnh.
5. Dựng vũ trụ bằng Canvas 2D, CSS và SVG inline. Không dùng video nền, không ảnh URL ngoài, không CDN, không cần API key.
6. Có chế độ giảm chuyển động; không tạo nhấp nháy gây khó chịu.
7. Cá nhân hóa bằng CONFIG. Có nội dung mặc định đủ đẹp ngay cả khi người dùng chưa thêm ảnh.
8. Tạo được ảnh PNG quà cuối và copy lời nhắn. Chia sẻ có fallback, không nút giả.
9. Không hứa “đã gửi cho anh” khi không có backend gửi tin. Sao chép/chia sẻ là do người nhận tự thực hiện.
10. Dọn timer/listener/animation khi đổi cảnh hoặc làm lại. Không có cảnh chạy chồng sau khi reset.
11. Giao sản phẩm chạy được, không dừng ở dàn ý, scaffold hoặc vài component rời.

## 3. Hướng mỹ thuật

### 3.1. Không gian

Màu chủ đạo xanh đen và tím sâu. Ánh sáng hồng đào, trắng ngà và xanh băng làm điểm nhấn. Cảm giác mơ màng, trong trẻo, có chiều sâu; không phải màn hình điều khiển tàu vũ trụ công nghệ cao.

- Nền gradient lớn `#080C24` → `#151333` → `#251B42`.
- Một đám tinh vân hồng tím rộng ở khoảng 70% ngang, 30% dọc, alpha .12–.2; một đám xanh ở góc trái dưới alpha .08–.14.
- Sao xa rất nhỏ, ít sáng; sao gần rõ, chuyển động nhẹ nhanh hơn. Không rải hàng trăm ngôi sao 5 cánh cùng kích thước.
- Một hành tinh pastel có vành xuất hiện ở các cảnh 0–1; về sau thành vật thể phụ ở góc. Hành tinh là SVG, không emoji lớn.
- Sao quan trọng là hình 4 cánh có lõi tròn và halo, tạo cảm giác đính đá lên bầu trời.
- Khi có khung thư: giấy trắng ngà, viền sáng nhẹ, màu chữ nâu tím. Trước khi thư mở, toàn bộ bối cảnh vẫn là vũ trụ đêm.

### 3.2. Token

```css
:root {
  --night: #080C24;
  --night-2: #151333;
  --nebula: #72549B;
  --ice: #A5D9EF;
  --rose: #F1A8C1;
  --peach: #FFD1AE;
  --starlight: #FFF2DC;
  --text: #F8F1FF;
  --muted: #BDB5CE;
  --paper: #FFF6EA;
  --paper-ink: #51405C;
  --glass: rgba(255,255,255,.055);
  --glass-border: rgba(255,241,220,.16);
  --ease-out: cubic-bezier(.22,1,.36,1);
}
```

Không dùng neon xanh lá, màu đỏ báo lỗi rực hoặc glow trắng tràn khắp chữ. Bóng sáng chỉ quanh vật thể được chọn.

### 3.3. Typography

- Tiêu đề dùng serif mềm hỗ trợ tiếng Việt: fallback `Georgia, 'Times New Roman', serif`; nếu có font đẹp được phép dùng thì nhúng WOFF2 trực tiếp vào HTML.
- Câu thư, chữ ký có thể dùng script Việt hóa được nhúng; nếu không có font phù hợp dùng serif italic, không để dấu Việt nhảy sang font khác.
- UI dùng `system-ui, -apple-system, 'Segoe UI', sans-serif`.
- Main heading mobile 32–40px, line-height 1.12–1.2; letter-spacing -.02em. Text 16–18px, line-height 1.65.
- Nhãn siêu nhỏ 10–12px uppercase, tracking .2em.
- Nút chính 15–17px, weight 650. Nút né 13–14px, weight 600, tối đa 2 dòng nếu màn quá nhỏ.
- Không set font nhỏ hơn 16px cho input trên mobile để tránh zoom khi focus.

### 3.4. Layout

Mobile-first, viewport mục tiêu 390×844. Stage toàn màn có `min-height:100svh`; support 100vh fallback, safe-area. Nội dung chính max-width 440px, desktop giữ ở giữa, không giãn nhiều cột.

Các cảnh tương tác dùng một vùng sân khấu có chiều cao tính được, không lấy rect từ body vô hạn. Cảnh thư và kết quả được cuộn dọc tự nhiên khi dài. Không khóa body overflow hidden ở mọi cảnh.

- Padding ngang 24px, mobile nhỏ 18px.
- Nút chính cao 54–60px, radius 999px, gradient hồng đào, chữ xanh đêm, glow có kiểm soát.
- Kính mờ chỉ ở vùng cảnh cần khung, radius 24px, border sáng 1px. Không bọc mọi scene trong cùng một card.
- Không footer thương mại. Một dòng nhỏ tùy chọn cuối quà “Từ [sender], dành riêng cho [recipient]”.
- Không đưa các thông số kỹ thuật như FPS, seed hoặc scene ID lên giao diện người nhận.

## 4. Cá nhân hóa

Đặt CONFIG ở đầu script, một chỗ duy nhất. Toàn bộ thiệp phải chạy đẹp với dữ liệu này, không cần ảnh.

```js
const CONFIG = {
  senderName: 'anh',
  recipientName: 'em',
  openingEyebrow: 'MỘT TÍN HIỆU DÀNH RIÊNG CHO EM',
  openingTitle: 'Giữa hàng triệu vì sao,\nanh có điều muốn gửi em.',
  questionTitle: 'Cho anh được ở trong\nvũ trụ của em nhé?',
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
```

`optionalPhotoDataUrl` nếu có ảnh thì xuất hiện nhỏ trong phần thư, không thay thế chòm sao. Nếu rỗng thì thiết kế vẫn đầy đủ, không hiện ô “thêm ảnh”. Nội dung dài phải wrap và không bị cắt dấu. Không hardcode tên người khác ngoài CONFIG.

## 5. Luồng chính và trạng thái

```text
SIGNAL --chạm ngôi sao--> QUESTION
QUESTION --đuổi nút phụ--> QUESTION
QUESTION --đồng ý--> WARP --tự chạy--> CONSTELLATION
CONSTELLATION --gom đủ 5 sao--> LETTER_CLOSED
LETTER_CLOSED --mở thư--> LETTER_OPEN
LETTER_OPEN --cùng viết tiếp--> WISH
WISH --nhận món quà--> KEEPSAKE
KEEPSAKE --xem lại hành trình--> SIGNAL
```

Đếm LETTER_CLOSED/LETTER_OPEN là hai trạng thái cùng một cảnh thư; tổng 7 cảnh chính. Không cần modal trung gian xác nhận đồng ý.

```js
const state = {
  scene: 'signal',
  transitioning: false,
  teaseCount: 0,
  collectedStars: [],
  letterOpened: false,
  wish: '',
  giftModel: null
};
```

Một scene controller quản lý `enter`, `exit`, `cleanup`; một animation engine chung quản lý nền và particle. Không tạo thêm rAF loop sau mỗi lượt né hoặc mỗi ngôi sao được chọn.

`goToScene()` phải chống gọi trùng, hủy timeout của cảnh cũ, đặt scene mới, reset scroll phù hợp, đưa focus tới heading khi cần. Các trạng thái “thư đang mở”, “đang tạo PNG” có cờ riêng, không tái sử dụng một boolean làm nghẽn mọi tương tác.

## 6. Cảnh 0 — Tín hiệu của một ngôi sao

### Bố cục

- Eyebrow ở khoảng 17–20% chiều cao viewport.
- Title 3 dòng vừa phải ở 25–36%.
- Ngôi sao lớn ở giữa khoảng 52–59%, kích thước 72–92px. Hai vòng quỹ đạo mảnh ellipse xoay chậm quanh sao, không phải loading spinner.
- Chỉ dẫn bên dưới: “Chạm vào ngôi sao để mở điều anh giấu ✨”.
- Hành tinh có vành ở góc dưới phải, đường kính 110–140px; chỉ cắt nhẹ ở cạnh, không che câu chữ.

### Motion bắt buộc

1. Bầu trời đã chuyển động trước khi người dùng chạm; không chờ click mới bắt đầu nền.
2. Sao lớn thở: scale 1→1.08→1 trong 2.8s; halo opacity .25→.55→.25, lệch pha .3s.
3. Quỹ đạo thứ nhất xoay 360°/22s, thứ hai ngược chiều/31s; đặt sao vệ tinh nhỏ chạy trên đường.
4. Một sao băng đi chéo 25–35° mỗi 5–8s, xuất hiện 800–1100ms, không băng liên tục.
5. Khi nhấn sao: lõi nén .82 trong 100ms rồi bung 1.25, 18–26 hạt sáng nở ra và tắt. Vòng ripple lan 30→220px trong 650ms.
6. Chữ hiện tại fade/translate lên 12px; sao bay theo đường cong đến vị trí biểu tượng tim ở cảnh 1. Không chỉ thay innerHTML ngay lập tức.

Thời gian từ click tới câu hỏi rõ hoàn toàn khoảng 900–1100ms. Tap lại trong lúc chuyển không tạo thêm cảnh.

## 7. Cảnh 1 — Câu hỏi và sao chổi chạy trốn

### 7.1. Bố cục nghỉ

Phía trên là hai hành tinh nhỏ trên hai quỹ đạo giao nhau, một xanh băng và một hồng. Giữa chúng có trái tim sáng nhỏ. Heading bên dưới: “Cho anh được ở trong\nvũ trụ của em nhé?”. Dòng phụ: “Anh hứa sẽ không chiếm hết đâu… chỉ xin một góc cạnh em thôi.”

Nút đồng ý đặt giữa, khoảng 54–60% chiều cao sân khấu. Nút suy nghĩ ban đầu nằm dưới, khoảng 68–73%. Một hint ở gần đáy “Có một nút hơi nghịch… thử bắt xem 😏”.

Sau khi bắt đầu đuổi, nút phụ được phép chạy khắp vùng an toàn của sân khấu, gồm trái/phải/trên/dưới, không chỉ đổi giữa hai vị trí. Không chạy ra viewport, không chạy đè heading hay CTA chính. Các khoảng trống phải được thiết kế từ đầu để có đường thoát.

### 7.2. Các nhãn bắt buộc, đúng thứ tự

```js
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
// label = DODGE_LABELS[Math.min(teaseCount, 7)]
// Ban đầu count=0; lần né hợp lệ đầu tiên count=1.
```

Lượt 7 trở đi giữ câu cuối, vẫn tiếp tục chạy vô hạn cho đến khi người nhận chọn đồng ý. Không tăng count vì resize, initial render hoặc chuyển cảnh. Không đổi nhãn nhiều lần chỉ vì một chuỗi pointerenter/pointerdown/click cùng thao tác.

### 7.3. Diện mạo nút chạy

Nút là pill tối trong suốt viền sáng hồng, có một sao nhỏ ở bên trái; viền 1px, nền đủ đậm để đọc chữ trên sao. Đuôi sao chổi chỉ xuất hiện khi đang chạy, dài 35–80px, gradient hồng→trong suốt theo hướng ngược vận tốc. Bổ sung 6–12 hạt sáng nhỏ rơi lại phía sau, sống 250–500ms.

Text phải nằm ngang khi dừng. Được xoay nhẹ ±6° và squash/stretch dưới 6% khi chuyển hướng, không quay toàn nút 360° khiến khó đọc. Nút không teleport không vệt; người dùng phải nhìn thấy nó lướt tránh.

Nút chính đứng yên. Sau mỗi lượt né, halo của nút đồng ý tăng nhẹ; scale tối đa 1.06, không lớn dần đến mức chiếm cả màn hình.

### 7.4. Sự kiện desktop: né sớm

Không chỉ bắt `click`. Dùng `pointermove` trên vùng sân khấu, cộng `pointerenter` trên chính nút làm bảo hiểm.

- Chỉ xử lý hover sớm khi `(hover: hover) and (pointer: fine)` phù hợp và pointerType không phải touch.
- Tính khoảng cách con trỏ tới hình chữ nhật hiện tại của nút, không chỉ tới tâm. Khi con trỏ cách mép dưới 42–64px, kích hoạt né. Khoảng cách nhỏ hơn ở màn nhỏ.
- Nếu con trỏ vào thẳng rect do nhảy nhanh, `pointerenter` cũng yêu cầu né.
- `pointerdown` capture trên nút: `preventDefault()`, không cho default activation, yêu cầu né nếu thao tác chưa được tính. `click` vẫn phải có handler ngăn và không chuyển scene.
- Đừng chặn sự kiện cả trang: nút đồng ý phải bấm được ngay cả khi nút phụ đang chạy.
- Nút có thể liên tục đổi đích nếu người dùng chặn đường, nhưng đếm nhãn mỗi lần né có chủ đích, cooldown khoảng 180–260ms. Khi đang rất sát (<12px) được đổi hướng khẩn cấp để thoát, không tăng count thêm nếu trong cùng cooldown.
- Không để con trỏ nằm yên làm phát sinh vô hạn lần né sau khi nút đã chạy xa. Chỉ tái kích hoạt nếu con trỏ thực sự lại gần hoặc nút bay vào vùng nguy hiểm hiện tại.

### 7.5. Sự kiện điện thoại

Không dựa vào hover trên mobile. Dùng Pointer Events:

- `pointerdown` trên nút nhận tọa độ chạm rồi né ngay, trước khi pointerup/click.
- Gán `touch-action: manipulation` cho nút, không `touch-action:none` toàn trang. Không chặn thao tác cuộn khi chạm ngoài nút.
- `click` phát sinh từ lần chạm cũ chỉ được nuốt, không tăng count thêm lần thứ hai. Dùng token theo pointerId/lần gesture hoặc kiểm tra thời gian của pointerdown vừa xử lý.
- Không dùng `pointercancel` để tăng lượt.
- Nếu người dùng chạm được nút tại vị trí đang chuyển động, tiếp tục né từ vị trí hiện tại, không teleport về đích cũ.
- Luôn coi đây là nút đùa, không phải nút gửi biểu mẫu. Nút phải `type='button'`.

### 7.6. Vùng an toàn và chọn đích

Hệ tọa độ duy nhất là local tọa độ sân khấu `playArea`, origin ở góc trái trên. Không trộn client/page/local coordinates.

1. Đo `playArea`, kích thước nút thực tế và các rect cần bảo vệ sau khi font sẵn sàng.
2. Trừ safe padding 16px và safe-area. Nút sau khi đổi nhãn vẫn nằm trọn bên trong vùng.
3. Tạo các vùng cấm: heading + body mở rộng 12px; nút đồng ý mở rộng 28px; hint đáy mở rộng 8px. Check **toàn rect của nút phụ**, không chỉ tâm.
4. Dùng pool khoảng 16–24 ứng viên ở cả hai bên và nhiều cao độ, thêm jitter nhỏ. Mỗi đích cách vị trí cũ tối thiểu 95px nếu không gian cho phép; ưu tiên xa con trỏ/touch ít nhất 140px.
5. Chấm điểm: xa pointer + xa vị trí cũ + mới so với 3 đích gần nhất. Chọn ngẫu nhiên trong 3 ứng viên điểm cao nhất để khó đoán mà vẫn an toàn.
6. Sau khi đổi label, đo lại rect ở vị trí layout trung tính trước khi chấm điểm; không dùng rect đã scale/rotate như kích thước nền tảng. Có thể cố định chiều rộng pill ở `clamp(174px, 54vw, 222px)` để tránh nhảy chiều rộng; không để text dài tràn.
7. Nếu không có vị trí đủ khoảng cách, giảm yêu cầu khoảng cách theo thứ tự nhưng **không bỏ điều kiện tránh CTA và nằm trong bounds**. Màn rất thấp cần mở rộng stage cho cuộn tự nhiên hoặc dùng các anchor trên/dưới, không đẩy nút ra ngoài.
8. Trên resize/orientationchange: tính lại bounds và clamp vị trí hiện tại, không tăng count. Nếu bàn phím không liên quan không tự làm viewport chạy lung tung.

Để tránh đường chạy cắt ngang nút đồng ý, không chỉ kiểm tra đích. Kiểm tra đường cong bằng cách sample 20–30 điểm và rect pill ở mỗi điểm, kể cả padding do tilt. Nếu đường giao vùng cấm, thử control point khác hoặc ghép 2 đoạn quanh trái/phải CTA. Có thể dùng anchor graph các hành lang trống, tìm đường qua anchor hợp lệ. Không chọn đường đi xuyên chữ/nút chính chỉ để tăng tính ngẫu nhiên.

### 7.7. Động học phải nhìn thấy được

Ưu tiên **một bộ điều khiển rAF** để vị trí logic trùng vị trí render, có thể đổi hướng giữa chừng. Không trộn CSS transition transform với một model x/y khác chưa cập nhật.

Mỗi lần né tạo đường cubic Bézier:

```js
// P0 = vị trí thật ở thời điểm né, P3 = đích an toàn.
// P1/P2 tạo độ cong và được kiểm tra tránh vùng cấm.
function cubic(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return {
    x: u*u*u*p0.x + 3*u*u*t*p1.x + 3*u*t*t*p2.x + t*t*t*p3.x,
    y: u*u*u*p0.y + 3*u*u*t*p1.y + 3*u*t*t*p2.y + t*t*t*p3.y
  };
}
```

Thời gian 220–420ms tùy độ dài; lúc đầu bứt nhanh, cuối giảm tốc. Không dùng spring overshoot vượt bounds. Khi đổi hướng giữa chừng, lấy vị trí render hiện tại làm P0 mới; cancel path cũ. Góc nghiêng tính từ vận tốc nhưng clamp ±6°. Đuôi/hạt sinh theo quãng đường, giới hạn pool; không sinh 10 hạt mỗi frame.

Biên độ cong 25–70px. Có ít nhất 4 kiểu chuyển hướng: lướt chéo, vòng quanh mép CTA, giả chạy sang trái rồi quẹo lên theo đường hợp lệ, lượn ngang qua vùng trống dưới. Quỹ đạo tinh nghịch nhưng không giật/nháy.

Khi dừng, nút rung nảy nhẹ 1 nhịp ±2px, sao icon chớp mềm một lần. Không lặp rung liên tục.

### 7.8. Ngữ nghĩa và bàn phím

Nút phụ là phần đùa và không có nhánh từ chối thật. `click`/Enter/Space trên nút này có thể đổi nhãn và né theo cách phù hợp; **không gọi handler đồng ý thay người dùng**. Người nhận tự nhấn nút đồng ý để tiếp tục. Không bẫy Tab, không khóa Back hoặc đóng trang.

Khi người dùng điều hướng bằng bàn phím hoặc bật reduced motion, ngừng chạy vị trí để focus không bị đuổi. Nút phụ vẫn đổi câu, không chuyển bước. Nút đồng ý luôn là thao tác xác nhận duy nhất đưa câu chuyện đi tiếp.

Không tự nhấn đồng ý sau N lần né; không giấu nút chính; không hiển thị thông báo hệ thống giả.

## 8. Cảnh 2 — Cùng bay xuyên những vì sao

Sau khi nhấn đồng ý, tạo một đoạn chuyển cảnh điện ảnh 2.6–3.2 giây:

| Thời điểm | Chuyển động |
|---|---|
| 0–180ms | Nút chính nén .96 rồi nở 1.08, trái tim lóe mềm |
| 120–550ms | Hai hành tinh phía trên tiến gần nhau; quỹ đạo cuộn về cùng một tâm |
| 350–900ms | Một vòng sáng mở ra sau tim, scale .15→1.3; các chữ fade trôi lên |
| 750–1900ms | Sao kéo thành vệt hướng từ tâm ra mép; cảm giác camera tiến tới cổng |
| 1000–2000ms | Chữ giữa màn “Tìm thấy một người muốn cùng anh đi xa rồi ✨” |
| 1900–2500ms | Giảm tốc; vệt sao co thành chấm; vòng sáng tan thành 5 ngôi sao |
| 2500–3100ms | 5 sao ổn định vào vị trí chòm sao; title cảnh 3 hiện |

Canvas warp tính tọa độ quanh tâm local `(cx,cy)`; sao có depth, khi tiến thì screen radius tăng. Giới hạn vệt dài để không phủ trắng màn. Số hạt tối đa mobile khoảng 80–110, desktop 140–180. Dùng speed theo delta time. Không flash trắng toàn màn hoặc rung camera mạnh.

Không thêm nút Skip bắt buộc vì đoạn ngắn, nhưng reduced motion thay bằng tim nở nhẹ + fade 400–700ms. Nếu tab bị ẩn giữa đoạn, khi trở lại tiếp tục hoặc hoàn tất có kiểm soát, không tua qua 3 màn do timeout cùng nổ.

## 9. Cảnh 3 — Gom những ngôi sao thành một trái tim

### 9.1. Bố cục

Title: “Có vài điều nhỏ xíu,\nanh muốn em biết.” Dòng phụ: “Chạm vào từng ngôi sao nhé.”

Giữa màn là 5 điểm sáng lớn sắp theo khung trái tim. Thay vì tự rải ngẫu nhiên, dùng vị trí normalized có chủ ý trong vùng constellation:

```js
const STAR_ANCHORS = [
  {x:.24,y:.23},
  {x:.74,y:.23},
  {x:.86,y:.52},
  {x:.50,y:.86},
  {x:.14,y:.52}
];
```

Năm điểm là nút chạm ít nhất 48×48px, core star 20–30px. Khung trái tim đầy đủ dùng SVG path có các đoạn cong chứ không nối 5 điểm thành ngũ giác. Có một viên tim/viên sao bé ở vùng giữa để không trống.

Dưới vùng tương tác là nơi đọc lời nhắn của sao, min-height khoảng 92–120px; bố trí sẵn để chữ dài không đẩy sao ra ngoài. Bộ đếm nhẹ “0/5 điều anh muốn nói” có thể dùng 5 chấm sáng thay chữ.

### 9.2. Mỗi lần chọn sao

1. Star nén .85 rồi nảy 1.25→1 trong 420ms.
2. Vòng halo bung 0→80px, alpha .7→0 trong 650ms.
3. 12–18 hạt sáng bay cong về sao trung tâm; dùng đường Bézier, không bay thẳng đồng loạt.
4. Hiện câu tương ứng trong CONFIG, fade + translateY 8px, 300ms. Giữ câu cho tới khi chọn sao khác.
5. Đánh dấu đã gom bằng lõi sao vàng ấm và quỹ đạo mảnh. Không cho cùng sao tăng count hai lần.
6. Vẽ thêm một đoạn đường ánh sáng ôm theo trái tim. `pathLength=1`, dashoffset giảm theo collected count; không bật cả trái tim ngay lượt đầu.

Chọn sao theo bất cứ thứ tự nào. Chạm lại sao đã gom thì đọc lại câu và sparkle nhẹ, không mất tiến trình.

### 9.3. Hoàn thành

Khi đủ 5, hình tim được vẽ hết trong 900ms, có sao nhỏ chạy dọc đường tim 1 vòng 1500ms rồi dừng. Tên hai người xuất hiện bên trong, separator “×” hoặc trái tim nhỏ; không dùng dấu + kiểu phép cộng khô cứng.

Dòng mới: “Ghép lại mới thấy… hình như điều nào cũng là em.” Nút “Còn một lá thư nữa 💌” hiện sau ít nhất 1.2s. **Không tự chuyển ngay khi gom sao cuối**: người nhận cần đọc câu cuối và ngắm hình tim. Nhấn nút → cảnh thư đóng.

## 10. Cảnh 4 — Một lá thư rơi từ quỹ đạo

### 10.1. Phong bì đóng

Bầu trời chậm lại, hành tinh giảm sáng. Một phong bì màu tím hồng nhạt rơi theo đường cong từ trên phải về giữa, xoay -12°→3°→0 trong 950ms; bóng mềm đi theo và có 5–8 hạt sao rơi sau.

Phong bì dựng bằng các lớp thật:

1. back rectangle bo góc nhẹ;
2. tờ giấy ở giữa, ban đầu chìm sau mặt trước;
3. hai flap cạnh dưới;
4. flap trên có transform-origin cạnh trên;
5. con dấu trái tim ở giữa.

Title: “Có những điều,\nanh muốn nói chậm hơn.” Gợi ý: “Chạm vào con dấu để mở thư”. Toàn con dấu có vùng chạm tối thiểu 52px, bàn phím Enter mở được.

### 10.2. Chuỗi mở thư

| Thời gian từ click | Hiệu ứng |
|---|---|
| 0–180ms | Con dấu scale 1→1.12→.85, vỡ thành 8 hạt tim nhỏ |
| 120–650ms | Nắp trên rotateX 0→-165°, có perspective khoảng 900px |
| Khoảng 350ms | Đổi z-index nắp để giấy đi ra đúng phía |
| 400–1200ms | Tờ giấy trượt lên 110–150px, shadow tăng, phong bì hạ xuống |
| 900–1500ms | Giấy mở rộng thành letter panel, nền sao tối thêm nhẹ |
| 1200ms+ | Các đoạn thư hiện lần lượt, không chạy từng chữ quá chậm |

Có thể dùng FLIP để giấy từ vị trí nhỏ chuyển sang panel đọc thư; đảm bảo đo trước/sau layout đúng, chỉ animate transform/opacity. Không đặt `overflow:hidden` trên envelope ancestor làm giấy bị cắt.

### 10.3. Thư đã mở

Panel giấy trắng ngà rộng `min(88vw,420px)`, bo 16px, viền rất nhạt, shadow sâu. Bên trên có icon sao dập chìm. Nội dung từ CONFIG; từng paragraph xuất hiện cách nhau 180ms, duration 450ms. Không bắt người nhận chờ typewriter 30 giây. Tất cả văn bản tồn tại trong DOM; có thể chọn/chép.

Nếu thư dài, cuộn tự nhiên; không dùng một khung cuộn nhỏ ở giữa gây khó đọc. Chữ thư 18–21px, line-height 1.75. Chữ ký ở phải cuối thư. Có thể thêm vòng sao rất mờ phía sau panel nhưng không chạy đè chữ.

Nút dưới thư: “Cùng anh viết tiếp nhé ✨”. Chỉ xuất hiện sau khi thư đã mở và nội dung đầu tiên rõ, không cần chờ người nhận đọc hết hoặc cuộn hết mới mở khóa. Nhấn sang cảnh 5.

## 11. Cảnh 5 — Một điều ước cho chúng mình

Không lặp lại form chọn lịch của mẫu trước. Đây là một lời hẹn nhỏ để cá nhân hóa món quà.

Title: “Nếu gửi một điều ước\nlên trời tối nay…”

Body: “Em muốn chúng mình cùng làm điều gì?”. Ba chip gợi ý, không bắt buộc:

- “Cùng đi ngắm hoàng hôn”
- “Một buổi hẹn không vội”
- “Cùng nhau đi thật xa”

Tap chip điền vào textarea và sáng viền, nhưng người nhận vẫn sửa được. Textarea tối trong suốt, border tím hồng, placeholder “Viết điều em muốn ở đây…”, giới hạn 280 ký tự. Không bắt nhập. Nếu trống dùng “Cùng nhau có thêm thật nhiều ngày dịu dàng.”

Phía trên textarea có ngôi sao nhỏ. Khi focus, nó sáng lên; nhập chữ làm 2–3 hạt sáng bay lên theo đợt tối đa 1 lần/500ms. Không bắn hạt theo từng ký tự khiến gõ lag; không truy cập nội dung bàn phím ngoài textarea.

CTA: “Gửi điều ước lên trời ✨”. Nhấn: text từ textarea không bay thành hàng nghìn ký tự DOM; dùng một dải ánh sáng mảnh từ trường lên sao, 600ms. Ngôi sao bung thành vòng quỹ đạo, chuyển sang món quà cuối khoảng 1100ms. Giữ dữ liệu trong state, không gửi mạng.

## 12. Cảnh 6 — Tọa độ của chúng mình

### 12.1. Quà cuối

Một tấm thẻ đêm hình chữ nhật đứng, rộng khoảng 330–390px, góc 24px, viền vàng hồng rất mảnh, nền tím đen có sao. Đây là “bản đồ bầu trời của hai người”, không tái sử dụng vé giấy của mẫu trước.

Thứ tự:

1. Eyebrow “MỘT GÓC VŨ TRỤ DÀNH RIÊNG CHO”.
2. Tên người nhận, serif 36–44px.
3. Chòm sao trái tim đã hoàn thành, core star vàng/hồng, đường nối mảnh.
4. Hai tên, dạng “anh ♡ em”.
5. Nhãn “ĐIỀU ƯỚC CỦA CHÚNG MÌNH”.
6. Điều ước vừa chọn/nhập, chữ 18–20px, line-height 1.6.
7. Câu từ CONFIG.finalLine.
8. Chữ ký “Từ [sender], gửi [recipient]”.

Có thể có dòng thơ “Nơi chúng mình chọn ở lại bên nhau” nhỏ dưới tim. **Không hiển thị tọa độ thiên văn thật hoặc dữ liệu bầu trời theo ngày nếu không tính thiên văn**. “Tọa độ” ở đây là tên thơ cho món quà, không tuyên bố đây là star map chính xác.

### 12.2. Reveal cuối

Card từ scale .9 và rotateY -8° về 1/0, translateY 28px→0 trong 750ms. Viền ánh sáng vẽ quanh card một lần 1200ms; chòm sao được vẽ lại 900ms; tên hiện sau 250ms, wish hiện sau 450ms. Tối đa 20 hạt sáng rơi chậm quanh card trong 2s rồi trở về sao nền yên bình.

Không chạy lại reveal mỗi khi người nhận bấm copy. Không lặp sweep ánh sáng qua chữ mỗi 2s; kết quả phải dễ đọc/lưu.

### 12.3. Nút thao tác

Bên dưới card, ngoài phần ảnh xuất:

1. Primary “Lưu bầu trời của mình ✨” → tạo/tải PNG.
2. Secondary “Chia sẻ món quà 💌” → Web Share nếu hỗ trợ, fallback tải ảnh/copy text.
3. Text button “Chép lời nhắn”.
4. Text link “Xem lại hành trình”.

Thông báo ngắn: “Gửi lại cho anh nhé. Anh muốn giữ cả điều ước của em nữa.”

Không thêm tự động gửi email, thông báo push hoặc yêu cầu quyền ngoài Web Share do người dùng tự mở.

## 13. Hệ motion và hiệu năng

### 13.1. Các lớp sao nền

Sử dụng một Canvas fullscreen `pointer-events:none`, các scene interactive là DOM phía trên.

| Lớp | Mobile | Đặc điểm |
|---|---:|---|
| Sao xa | 40–60 | Radius .4–1.1px, alpha .15–.45, trôi rất chậm |
| Sao giữa | 20–30 | Radius 1–1.7px, alpha .35–.7, twinkle lệch pha |
| Sao gần | 8–12 | Radius 1.6–2.6px, một số có cross glint, trôi nhanh hơn |
| Hạt tương tác | Pool tối đa 90 | Chỉ sinh khi click/né/gom sao/chuyển cảnh |
| Warp | Pool riêng 80–110 | Chỉ dùng ở cảnh bay, không cộng thêm nền đầy đủ |

Desktop tăng khoảng 1.3–1.5×, không nhân theo toàn bộ số pixel màn hình. Canvas DPR clamp ≤2. Khi máy chậm giảm hạt và glow trước, giữ tương tác.

Twinkle sin chậm 2–5s, pha mỗi sao khác nhau, không opacity 0↔1 liên tục. Pointer parallax max 8–12px, easing .06–.1 trong loop; không cần quyền con quay/DeviceOrientation.

### 13.2. Một engine, delta time thật

```js
function tick(now) {
  const dt = Math.min((now - lastTime) / 1000, 0.033);
  lastTime = now;
  updateBackground(dt, now);
  updateDodgePath(dt, now);
  updateParticles(dt, now);
  renderBackground();
  frameId = requestAnimationFrame(tick);
}
```

Không dùng chuyển động kiểu “mỗi frame +3px” làm máy 120Hz chạy nhanh gấp đôi. Dùng elapsed time cho timeline. Không tạo promise chờ animationend không có timeout fallback; khi reduced motion tắt animation sự kiện có thể không đến.

Khi `visibilitychange` hidden: pause loop và timeline; khi visible reset lastTime, resume hợp lý. Các CSS animation decorative cũng pause. Không để rAF đã cancel bị tái khởi tạo trùng từ resize listener.

### 13.3. Hạt sáng

Particle fields: position, velocity hoặc path, age, lifetime, size, color, alpha, optional trail. Object pool tái sử dụng, hạt hết tuổi trả pool. Không tạo nhiều div rồi không xóa. Tạo một vài sprite glow offscreen để drawImage thay vì shadowBlur cao cho mọi hạt từng frame.

Vệt sao chổi nút phụ lấy 6–10 sample gần nhất, render opacity giảm theo tuổi; dùng vị trí local chuyển sang canvas đúng offset. Xóa trail khi ra khỏi scene câu hỏi.

### 13.4. Bảng chuyển cảnh

| Chuyển | Cử chỉ thị giác | Tổng thời gian |
|---|---|---:|
| Signal → Question | Sao bung ripple, bay cong, tạo tim ở quỹ đạo | 900–1100ms |
| Question → Warp | Hai quỹ đạo nhập tâm, cổng mở | 700–900ms đầu |
| Warp → Constellation | Vệt sao giảm tốc thành 5 điểm sáng | Trong timeline 2.6–3.2s |
| Constellation → Envelope | Tim thu thành con dấu, phong bì bay xuống | 850–1050ms |
| Envelope → Letter | Nắp lật, giấy trượt lên, mở rộng panel | 1200–1500ms |
| Letter → Wish | Giấy gập nhẹ rồi tan thành bụi sao, form hiện | 600–800ms |
| Wish → Keepsake | Điều ước thành tia sáng, card kết tinh | 1000–1300ms |

Có vật thể nối liền hai cảnh: sao→tim; tim→con dấu; điều ước→sao trên card. Không phải 7 slide độc lập chỉ crossfade.

### 13.5. Reduced motion

Khi `prefers-reduced-motion:reduce` hoặc config/debug chế độ tương đương:

- Sao nền đứng yên hoặc twinkle cực nhẹ, không parallax/warp/particle bay nhanh.
- Nút phụ đứng yên, vẫn đổi câu và không chuyển bước; người nhận tự chọn đồng ý.
- Chuyển cảnh dùng fade ≤180ms; mở thư đổi trạng thái nhẹ không xoay 3D.
- Gom sao vẫn đủ 5 tương tác và hiện lời nhắn; tim hiện từng phần mà không kéo đường dài.
- Giữ toàn bộ nội dung và chức năng. Không đánh đổi tính truy cập để ép chạy loạn khi người nhận đã yêu cầu giảm motion.

## 14. Ảnh PNG, chia sẻ và dữ liệu

### 14.1. Một model chung

```js
const giftModel = {
  version: 1,
  senderName: CONFIG.senderName,
  recipientName: CONFIG.recipientName,
  wish: state.wish.trim() || 'Cùng nhau có thêm thật nhiều ngày dịu dàng.',
  finalLine: CONFIG.finalLine,
  starSeed: 2404
};
```

DOM và PNG lấy từ cùng model. Không hardcode wish trong hàm xuất ảnh. Dùng seed cố định cho bầu trời bên trong card để xem trước và ảnh xuất có cùng bố cục sao.

### 14.2. Xuất PNG

Vẽ trực tiếp Canvas 2D, không phụ thuộc html2canvas CDN. Logical width 800px, scale 1.5–2 tùy khả năng. Height tự tính theo nội dung, tối thiểu khoảng 1120px. Vẽ nền đêm, viền, sao có seed, hình tim, typography, wish, closing, signature. Có padding khoảng 64–72px; giữ chữ Việt đầy đủ dấu.

Chờ `document.fonts.ready`. Wrap text theo đo measureText, giữ xuống dòng, xử lý từ dài. Vẽ glow tối đa vừa phải để ảnh không lóa. Export bằng toBlob, tên `gui-em-mot-vu-tru.png`. Ảnh không chứa nhóm nút, toast, scrollbar hoặc UI trình duyệt.

Có thể tạo sẵn blob sau khi vào keepsake để share từ click còn user activation. Không regenerate khi dữ liệu không đổi. Blob/object URL được cleanup khi reset hoặc unload.

### 14.3. Chia sẻ/copy

- `navigator.canShare({files})` nếu có, Web Share file PNG với lời nhắn ngắn. AbortError khi đóng sheet là thao tác hủy bình thường.
- Nếu không hỗ trợ file share, tải ảnh. iOS cần preview ảnh để nhấn giữ lưu thì cung cấp fallback rõ, không báo đã lưu khi chưa biết kết quả.
- Busy state label “Đang gom sao…”; finally phục hồi enabled/label dù thành công, cancel hoặc lỗi.
- Copy text gồm tên, điều ước, finalLine và chữ ký; Clipboard API có fallback chọn chép thủ công. Chỉ báo thành công khi đã copy được.
- Không tạo URL chia sẻ chứa file://, localhost hoặc data URI ảnh hàng MB.
- Nút share không bắt buộc có link vé/result để chạy: chia sẻ ảnh là đủ. Nếu triển khai link kết quả tùy chọn, dùng payload hash UTF-8 base64url, validate schema/length và không lấy HTML từ payload. Không để tính năng tùy chọn này làm chậm việc hoàn tất các yêu cầu chính.

### 14.4. Nháp/reset

Lưu wish bằng localStorage try/catch, không lưu thông tin nhạy cảm khác. Mở link mời luôn từ signal, chỉ khôi phục wish khi đến cảnh nhập. Không lưu animation progress hoặc tự đồng ý khi reload.

“Xem lại hành trình” reset state/timer/scene animations nhưng giữ wish đã gõ để không mất câu chữ; ở cảnh wish có text action nhỏ “Xóa điều ước đã lưu” nếu cần. Không clear toàn localStorage.

Không gửi nội dung textarea tới API/analytics. Escape/`textContent` cho toàn text người dùng.

## 15. Cấu trúc code một file

```text
index.html
  head: charset, viewport, theme-color, title
  style:
    tokens, font nhúng nếu có
    body/stage/canvas layers
    buttons, typography
    từng scene
    envelope/letter
    reduced motion + responsive
  body:
    canvas#universe (aria-hidden)
    main#app
    status#toast (role=status)
    vùng fallback ảnh/copy, mặc định hidden
  script:
    CONFIG, DODGE_LABELS, STAR_ANCHORS
    state, runtime, constants
    seeded random + geometry + text helpers
    scene controller
    animation engine + pool
    dodge controller + path validation
    signal/question/warp/constellation/envelope/letter/wish/keepsake render
    PNG renderer + share/copy
    draft + reset + init
```

Các hàm cần trách nhiệm rõ:

```js
function goToScene(next) {}
function cleanupScene() {}
function measurePlayArea() {}
function chooseEscapeTarget(pointer) {}
function buildSafeEscapePath(start, end, obstacles) {}
function requestDodge(pointer, gestureToken) {}
function updateDodgePath(now) {}
function collectStar(id) {}
function openEnvelope() {}
function buildGiftModel() {}
async function renderGiftPng(model) {}
async function shareGift() {}
function restartJourney() {}
```

Không để hàm rỗng/TODO. Không dùng `setInterval` sinh sao mãi không cleanup. Mọi event listener theo scene có AbortController hoặc remover cụ thể. Khi scene được thay, listener không còn tác động tới state.

Nếu có các lớp transform lồng nhau, chia rõ:

- wrapper ngoài chịu tọa độ chuyển động;
- wrapper giữa chịu rotation/tilt;
- wrapper trong chịu pulse/press scale;

Không để CSS animation pulse và JS cùng ghi đè `transform` trên một element, vì đây là nguyên nhân phổ biến gây “mất motion”.

## 16. Responsive, truy cập và trình duyệt

- Test 360×740, 390×844, 430×932, 1366×768; thêm landscape 844×390 và zoom 200% nếu được.
- Màn câu hỏi khi landscape/zoom có thể cao hơn viewport để có vùng né an toàn; vẫn cuộn tới nút đồng ý được. Không bắt toàn bộ text và 2 nút chui vào 250px cao.
- Không scroll ngang; pill né không thoát viewport ngang; rect đo lại khi font load hoặc thay đổi kích thước.
- Các ngôi sao dùng button có aria-label chứa “Điều thứ 1…”; chỉ dẫn text rõ. Không Canvas-only toàn bộ tương tác.
- Canvas trang trí aria-hidden, pointer-events none. Không đặt overlay backdrop trong suốt chặn các nút.
- Heading focus quản lý vừa đủ; toast polite. Nút né không làm screen reader đọc liên tục theo từng frame.
- Mọi scene inactive phải inert/hidden, không để Tab đi vào những nút vô hình.
- Focus-visible có viền sáng, tương phản đủ; không xóa outline toàn cục.
- Firefox/Safari có thể không hỗ trợ cùng các API: feature detect, fallback. Không phụ thuộc CSS experimental bắt buộc.
- `backdrop-filter` không có thì nền panel vẫn đủ đậm để đọc chữ.
- SVG mask/filter IDs không trùng giữa nhiều component.

## 17. Checklist nghiệm thu — phải tự đi qua

### Hình và motion

- [ ] Có nhiều lớp sao thật, parallax nhẹ, hành tinh và vành SVG đẹp.
- [ ] Signal có sao thở + quỹ đạo + ripple và chuyển vật thể nối cảnh.
- [ ] Question có nút chạy theo đường cong, đuôi sao chổi, nhãn đổi đúng.
- [ ] CTA đồng ý luôn đứng yên, sáng rõ, bấm được trong mọi lúc.
- [ ] Warp có tăng tốc và giảm tốc, không một màn loading giả.
- [ ] Gom 5 sao có từng lời nhắn, từng đoạn tim, không chỉ tăng một số đếm.
- [ ] Hoàn thành tim có khoảnh khắc nghỉ và nút tiếp tục, đọc được câu cuối.
- [ ] Mở phong bì có đúng thứ tự seal→flap→paper→letter, không lộ sai z-index.
- [ ] Letter hiện từng đoạn, chữ đọc được, scroll không cắt mất cuối.
- [ ] Wish gửi lên trời có tia sáng trước khi món quà kết tinh.
- [ ] Keepsake có reveal một lần và sau đó ổn định để đọc.

### Nút né — kiểm tra riêng kỹ

- [ ] Hover gần cạnh nút là nó chạy, không phải chờ bấm mới đổi vị trí.
- [ ] Chạy đa hướng, có ít nhất 6–8 đích phân bố trong vùng an toàn.
- [ ] Theo đuổi 20 lượt không mắc góc, không hết nhãn, không biến mất.
- [ ] Nhãn đầu là “Để em suy nghĩ xíu...”, lượt 1–7 đúng bảng; sau đó giữ câu cuối.
- [ ] Một tap mobile chỉ tăng một lượt, không bị pointerdown + click tính hai lần.
- [ ] click/Enter trúng nút phụ không được tự đưa sang scene khác.
- [ ] Đường đi và cả rect pill không cắt qua CTA đồng ý/heading.
- [ ] Đổi nhãn dài không làm tràn bounds; resize không tăng lượt.
- [ ] Có thể bấm đồng ý ngay lượt 0 hoặc khi nút phụ đang chạy.
- [ ] Reduced motion/keyboard focus vẫn vận hành được, không bẫy người nhận.

### Chức năng

- [ ] Từ intro đi đến keepsake được, không cần console hoặc thao tác ngoài.
- [ ] 5 sao chọn thứ tự ngẫu nhiên vẫn hiện đúng câu, không đếm trùng.
- [ ] Tap nhanh liên tiếp không mở thư hai lần hoặc chuyển hai scene.
- [ ] Wish rỗng dùng mặc định; wish tiếng Việt/emoji/nhiều dòng xuất đúng.
- [ ] Note có `<script>` chỉ hiển thị chữ, không thực thi.
- [ ] PNG đẹp, đúng dữ liệu, không cắt chữ, không có UI thao tác.
- [ ] Share cancel không hiện lỗi giả và không treo nút busy.
- [ ] Copy không được hỗ trợ thì cho chép thủ công.
- [ ] Refresh, tab ẩn, resume, reset nhiều lần không tăng số rAF/listener vô hạn.
- [ ] Mở file trực tiếp được; HTTPS mở được các chức năng chia sẻ khi trình duyệt cho phép.

## 18. Trình tự Codex phải làm và bàn giao

1. Dựng bố cục và art direction của toàn bộ scene, kiểm tra static view đẹp trước.
2. Nối state machine, nội dung cá nhân hóa và toàn luồng.
3. Làm **nút né trước**, tự kiểm tra hover/touch/nhãn/bounds/đường đi.
4. Tạo engine sao/particle một loop, thêm các motion cụ thể theo timeline.
5. Làm gom sao, mở thư, điều ước, keepsake và Canvas xuất PNG.
6. Tự chạy checklist theo môi trường có sẵn; nếu không có mobile thật, nói rõ đã mô phỏng/tự kiểm tra gì, không tuyên bố test thiết bị chưa dùng.
7. Sửa mọi lỗi cắt chữ, click không phản hồi, motion bị ghi đè hoặc canvas chặn tương tác.
8. Giao **`index.html` hoàn chỉnh**, thêm chỉ dẫn ngắn vị trí đổi CONFIG và cách đưa file lên hosting tĩnh. Không tự xuất bản khi chỉ được yêu cầu code.

### Lệnh giao việc ngắn

> Đọc toàn bộ `thiep-4.md` và triển khai ngay thành một `index.html` hoàn chỉnh. Ưu tiên motion thật: nhiều lớp sao, nút né hover/touch theo quỹ đạo an toàn, cổng không gian, gom sao vẽ tim, mở thư nhiều lớp và món quà kết tinh. Hoàn thành toàn bộ luồng và tính năng lưu/chia sẻ; không chỉ làm giao diện tĩnh, không dừng ở một cảnh. Các câu của nút né phải đúng danh sách và nút phụ không được chuyển bước khi bấm trúng. Đầu ra mở trực tiếp được, không cần CDN hoặc cài thư viện.
