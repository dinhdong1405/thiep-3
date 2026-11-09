# THIỆP 5 — PHONG THƯ, VƯỜN HOA, THƯ TÌNH VÀ ẢNH KỶ NIỆM

> Đặc tả thực thi dành cho Codex. Ngôn ngữ giao diện: tiếng Việt. Đầu ra bắt buộc: **một file `thiep-5.html` hoàn chỉnh**, chứa HTML, CSS, JavaScript và tài nguyên đồ họa nội tuyến; mở trực tiếp được, gửi người yêu được và đưa lên hosting tĩnh được.
> Tham chiếu đã phân tích: `chrome_0cFG8tX63q.mp4`, 390 × 780 px, dài khoảng 64,47 giây. Chỉ phân tích hình ảnh; **không tái tạo âm thanh**.
> Các mốc bên dưới là thời điểm trong bản quay, không phải tất cả đều là thời gian tự chạy: nhập mã, chạm phong thư, mở/đóng thư là tương tác. Các thời lượng chuyển động đề xuất được ghi riêng để triển khai ổn định.

---

## 0. PROMPT KHỞI ĐỘNG — CODEX PHẢI THỰC THI

```text
Hãy đọc toàn bộ thiep-5.md và trực tiếp xây dựng thiệp tình yêu hoàn chỉnh theo tài liệu. Đừng chỉ trả lời kế hoạch, đừng dừng ở wireframe hay một trang tĩnh. Làm đủ luồng: loading vòng hoa → bàn phím PIN → nền khóa trái tim → phong thư và cơn mưa hoa → mở phong thư, rút thiệp và lật bìa 3D → cửa sổ thư với ảnh và chữ gõ từng ký tự → đóng thư → ảnh kỷ niệm bay lên cùng hoa → vòng hoa hình trái tim đứng quanh quyển thiệp mở.

Đây là THIỆP SỐ 5 trong hệ thống nhiều mẫu thiệp. index.html đã là trang danh sách các thiệp: giữ nguyên vai trò, giao diện và các mẫu đang có. Tạo thiep-5.html riêng (hoặc route/module tương ứng theo cấu trúc hiện tại) và thêm đúng một mục Thiệp 5 vào danh sách bằng cơ chế registry/component sẵn có. Không ghi đè index.html thành thiệp, không đổi tên hay sửa nhầm Thiệp 3. Bản tĩnh thiep-5.html chứa đầy đủ HTML/CSS/JavaScript và SVG/canvas/assets nội tuyến, không phụ thuộc CDN; nếu dự án dùng framework thì tái sử dụng build/router hiện tại và vẫn cung cấp bản HTML độc lập khi xuất quà tặng. Không xóa dự án cũ. Ưu tiên độ giống bố cục, chất liệu, đúng đường chuyển động và đủ từng phân cảnh. Không dùng emoji hoa làm vật thể hoa chính, không dùng ảnh nền tĩnh thay cho mưa hoa, không dùng fade đơn thuần thay mở phong thư/lật giấy.

Tự triển khai phần mỹ thuật bằng SVG/canvas nếu không có asset. Phải có ít nhất 8 kiểu hoa nhiều lớp, nhụy rõ, cánh có gradient/gân/độ trong. Có thể dùng asset gốc nếu đã có quyền sử dụng và có sẵn; nhúng vào HTML. Không lấy ảnh của người trong video làm ảnh người yêu của chủ thiệp. Ảnh cá nhân phải cấu hình được ở CARD_CONFIG; khi chưa có ảnh, hiển thị placeholder đẹp và cho chủ thiệp chọn ảnh cục bộ rồi tải bản HTML đã nhúng ảnh. Không để tài nguyên hỏng hoặc chặn trải nghiệm vì thiếu ảnh.

Dùng một state machine và một đồng hồ animation trung tâm. Triển khai đủ xếp lớp nắp phong thư, mặt phong thư, tờ thiệp, bìa lật, particle phía trước/sau, backdrop và dialog. Mọi transition phải khóa tương tác lặp, có cleanup timer/rAF, hỗ trợ touch và desktop. Chạy tự kiểm thử chức năng và chụp/kiểm tra các trạng thái ở 390x780, 360x800 và desktop nếu có trình duyệt. Sửa lỗi trước khi giao. Khi báo cáo, ghi rõ ảnh cá nhân còn thiếu và những khác biệt so với bản quay; không tuyên bố giống tuyệt đối khi asset gốc không có.

Thực hiện ngay, hoàn tất file có thể sử dụng. Không yêu cầu người dùng tự viết nốt phần motion, tự tìm hoa hoặc tự ghép code. Không thêm các cảnh tỏ tình Có/Không, nút né chuột, nhạc hoặc tính năng ngoài tài liệu.
```

## 0.1. Vị trí trong website — bắt buộc thực hiện

**Đây là một mẫu trong danh sách, không phải trang chủ.** Quy ước mặc định cho website HTML tĩnh:

| Thành phần | File / định danh | Trách nhiệm |
|---|---|---|
| Trang danh sách | `index.html` có sẵn | Liệt kê các mẫu; chỉ bổ sung mục Thiệp 5 theo giao diện hiện tại |
| Mẫu thiệp này | `thiep-5.html` | Chạy toàn bộ trải nghiệm phong thư và hoa |
| ID mẫu | `thiep-5` hoặc ID 5 theo schema hiện tại | Duy nhất, không trùng Thiệp 3 hoặc mẫu khác |
| Tên hiển thị | `Thiệp 5 – Phong thư vườn hoa` | Hiển thị trên danh sách mẫu |
| File hướng dẫn | `thiep-5.md` | Tài liệu Codex đang đọc |
| Bản quà tặng xuất ra | `thiep-5-tang-em.html` | Nhúng nội dung và ảnh đã cá nhân hóa |

Trước khi code, đọc cấu trúc dự án, AGENTS.md nếu có, và cách các mẫu thiệp khác được đăng ký/mở. Nếu website dùng Next.js/React/Vue/router hoặc một template registry, thêm mẫu 5 đúng cơ chế sẵn có; route minh họa `/thiep/5` chỉ là gợi ý, phải dùng convention thực tế. Không tạo một hệ router/editor song song làm hỏng website. Không đặt thêm file index.html ở root để thay thế danh sách. Chỉ khởi tạo trang danh sách tối giản nếu workspace thực sự chưa có trang danh sách; không suy đoán rồi viết lại trang đang có.

### Mục Thiệp 5 trên danh sách

- Thêm đúng một card vào grid/list hiện có; tái sử dụng style, cấu trúc thumbnail và nút của các card đang có.
- Thumbnail riêng: nền nâu nude, phong thư trắng và vòng hoa; tạo bằng SVG/CSS nội tuyến nếu chưa có ảnh. Không dùng toàn video làm thumbnail tự chạy gây nặng trang.
- Tên `Thiệp 5 – Phong thư vườn hoa`, mô tả ngắn `Mở lá thư, ngắm hoa bay và những kỷ niệm của hai đứa.`
- Nút xem mẫu/mở thiệp đi tới `thiep-5.html` hoặc route chính xác của mẫu 5; không dẫn nhầm Thiệp 3, không dẫn về chính index.html.
- Nếu có nút cá nhân hóa, gắn vào editor hiện tại với đúng templateId 5. Editor cục bộ #edit trong tài liệu chỉ là phương án cho bản HTML độc lập khi hệ thống chưa có editor phù hợp.
- Mở URL Thiệp 5 trực tiếp phải hoạt động; không bắt buộc đi từ danh sách hoặc có state trong bộ nhớ của trang chủ.
- Bản xem mẫu có thể có nút nhỏ “Danh sách thiệp” trỏ về index.html/route danh sách hiện tại, đặt ngoài vùng thao tác chính. Bản quà tặng xuất ra ẩn nút này mặc định.

### Cách ly giữa các mẫu

Đặt CSS dưới root `.thiep-5`/`[data-template="thiep-5"]` hoặc CSS module; JavaScript trong module/IIFE. Không để selector body/button/img, keyframes hoặc biến toàn cục của mẫu 5 thay đổi trang danh sách và các thiệp khác khi dùng chung bundle. Nếu cần cấu hình body toàn màn hình, chỉ áp dụng khi trang/mẫu 5 đang mount và gỡ khi unmount. Khi điều hướng ra danh sách phải hủy rAF, timers, observers và event listeners; không để hoa tiếp tục chạy sau trang danh sách.

Không tự chạy preview toàn bộ thiệp trong từng card danh sách; chỉ khởi tạo animation khi người dùng mở mẫu. Nếu website đã có luồng tạo/lưu/chia sẻ thiệp, tích hợp mẫu 5 vào luồng đó và giữ nguyên schema/link của các mẫu cũ. Không thêm backend, thanh toán hay đăng nhập ngoài phạm vi.

## 1. Mục tiêu và mức độ bám sát

Thiệp dịu dàng, lãng mạn, màu kem hồng và nâu nude; toàn bộ trang giống một sân khấu dọc. Nhân vật chính là phong thư giấy trắng và rất nhiều bông hoa nhiều màu, sau đó là một quyển thiệp nhỏ, thư có ảnh và ba tấm ảnh bay lên. Không làm thành website có nhiều section/cuộn trang.

Thứ tự ưu tiên:

1. Đúng luồng và hình dáng của phong thư, quyển thiệp, khung thư.
2. Motion rõ ràng, đủ pha, hoa có sự sống và quỹ đạo đa dạng.
3. Tỷ lệ trên màn hình dọc sát bản quay; không phóng phong thư chiếm cả màn hình.
4. Màu, chữ thư pháp, bóng giấy và chi tiết hoa.
5. Cá nhân hóa ảnh/lời nhắn mà không cần hiểu code.

**Giới hạn nguồn tham chiếu:** Video không chứa file ảnh gốc, font gốc hoặc tọa độ animation. Các thông số pixel/timing thực thi trong tài liệu là giá trị dựng lại gần đúng từ hình ảnh. Nội dung ảnh cá nhân phải do chủ thiệp cung cấp. Không thể cam kết giống từng pixel khi thiếu những asset đó; vẫn phải hoàn thiện mọi thành phần và motion.

## 2. Storyboard đã quan sát từ video

| Mốc video | Hình ảnh quan sát | Yêu cầu dựng |
|---|---|---|
| 0–0,8 s | Nền hồng phấn, vòng nhỏ gồm hoa hồng hồng/kem ở giữa; dòng “Trái tim đang khẽ thì thầm...” phía dưới | Loading có chuyển động nhẹ, không dùng spinner hệ thống |
| Khoảng 0,8–3,6 s | Nền giấy màu nước trắng kem; khóa trái tim và chìa khóa hồng cổ; panel PIN kính mờ; tên người gửi/người nhận; 4 trái tim; keypad tròn | Có luồng nhập thật, bốn tim lần lượt được tô khi nhập |
| Khoảng 3,6–5,4 s | Điền đủ mã, panel mờ dần, khóa cổ phía sau hiện rõ rồi chuyển cảnh | Mở khóa có nhịp nghỉ, không cắt thẳng sang phong thư |
| Khoảng 5,4–7 s | Nền đổi nâu nude; một phong thư trắng, tem trái tim đỏ ở giữa nắp | Phong thư xuất hiện ở giữa, kích thước khoảng 220 × 150 px trên viewport 390 × 780 |
| Khoảng 6–18 s | Hoa xanh, tím, hồng, trắng, vàng và đỏ tràn vào phần trên; lớp hoa dày, nhiều kích cỡ, có hoa rất lớn | Không phải chỉ vài hạt hoa nhỏ. Phải tạo được giai đoạn hoa phủ dày gần toàn màn hình |
| Khoảng 18–26 s | Hoa tiếp tục trôi xuống, phần trên dần thoáng; còn hoa phía đáy; phong thư vẫn ở giữa | Hoa có đuôi kết thúc tự nhiên; không xóa đột ngột toàn bộ |
| Khoảng 26,5–28,5 s | Phong thư mở nắp; thiệp trắng rút lên, có pha xoay từ ngang về dọc; bìa “To my love”, “– BÉ NGỐC –”, hoa/tim nhỏ | Có tờ thiệp thật chuyển động qua miệng phong thư, không đổi ảnh |
| Khoảng 28,5–29,5 s | Bìa thiệp xoay về bên trái thành quyển thiệp mở; sau đó khung thư lớn xuất hiện | Dùng perspective và transform-origin đúng mép gáy |
| Khoảng 29,5–41 s | Overlay làm tối nền. Khung giấy kem bo góc, thanh đầu “To my love”, nút ×; ảnh dọc phía trên; tiêu đề đỏ và lời nhắn gõ dần | Typewriter thật, giữ ảnh và khung ổn định, có con trỏ trong lúc gõ |
| Khoảng 41–44 s | Thư đã gõ xong; tim đỏ nhỏ ở cuối; người xem bấm × gần 44 s | Đọc bao lâu tùy người xem, không tự đóng theo đồng hồ video |
| Khoảng 44–45 s | Khung thư biến mất, trở lại quyển thiệp trắng mở với phong thư phía sau | Bảo toàn trạng thái bên dưới |
| Khoảng 45–53 s | Ba ảnh dọc viền/bóng hồng bay từ dưới lên, lệch hai bên, nối tiếp nhau; hoa bay cùng và xen trước/sau ảnh | Mỗi ảnh có đường riêng, không xếp thành gallery tĩnh |
| Khoảng 52–54 s | Hoa tập hợp thành đường viền trái tim lớn trước thiệp mở, ảnh cuối bay ra khỏi đầu màn hình | Chuyển liên tục từ hoa bay sang hoa đứng thành hình tim |
| Khoảng 54–64,47 s | Vòng trái tim gồm các bông hoa đa sắc giữ quanh thiệp; dao động nhẹ; footer chữ trắng vẫn ở dưới | Kết thúc mở, duy trì sống động nhẹ, có thể chạm thiệp để đọc lại |

**Không sao chép con trỏ chuột, viền đen bo góc của thiết bị, thanh điều hướng điện thoại hoặc các mép ghi màn hình.** Nút “Tạo thiệp” góc trên trái là UI của trang mẫu; không cần để thương hiệu/link trang mẫu vào quà tặng. Bản gửi người yêu mặc định ẩn nút quản trị này.

## 3. Hệ tọa độ, bố cục và màu

### 3.1. Sân khấu

- Mốc thiết kế: `W = 390`, `H = 780` CSS px; gốc tọa độ ở góc trái trên.
- Tách `sceneRoot` toàn màn hình và `composition` chứa phong thư, thiệp, hoa tim. Các phần quan trọng dùng tọa độ logic rồi scale đồng nhất, không scaleX/scaleY khác nhau.
- `body`: margin 0; min-height 100svh; overflow hidden trong cảnh; nền phủ viewport; chống kéo ngang.
- Chiều cao thực cập nhật từ `visualViewport?.height ?? innerHeight`; có fallback `100vh`, ưu tiên `100dvh`. Resize không khởi động lại câu chuyện.
- Ở màn hình ngắn, giảm tỷ lệ composition vừa vùng an toàn; footer và nút đóng không rớt ngoài viewport. Dialog có cuộn nội bộ khi cần.
- Desktop: sân khấu nền nâu phủ cửa sổ; composition giữ tỷ lệ dọc trong vùng giữa rộng tối đa khoảng 520–600 px; particle được phép phủ rộng hơn. Không kéo giãn phong thư thành một banner.
- Safe area bằng `env(safe-area-inset-top/bottom)`; footer đặt cách đáy 42–56 px ở chiều cao 780.

### 3.2. Bảng màu khởi điểm

| Vai trò | Màu |
|---|---|
| Loading hồng nhạt | `#fbe7ed`, `#f8d4df` |
| Giấy PIN trắng kem | `#faf8ed` |
| Hồng cổ/đường khóa | `#bb838c`, `#d5a6a4` |
| Nền phong thư trung tâm | `#c9ac9d` |
| Nền cạnh/tối hơn | `#ad8e80`, `#b89a8e` |
| Phong thư | `#fffefd`, viền `#e0d8d4` |
| Giấy thư lớn | trên `#f9e7cd`, dưới `#efd0b5` |
| Chữ chính thư | `#8c6958` |
| Chữ nhấn/tim | `#b43750`, `#bc1948` |
| Footer | `#fff6e8` |
| Glow ảnh | `rgba(255,79,109,.65)` |

Nền nâu là radial/linear gradient mềm, vùng trung tâm sáng, hai bên tối hơn. Có grain rất nhẹ, không lộ chấm thô, không biến nền thành tranh phong cảnh. Loading và PIN dùng màu nước nhẹ; cảnh phong thư giữ nền trống như video.

### 3.3. Chữ

- Chữ trang trí “To my love”: script mảnh, nghiêng, nét nối, màu hồng cổ.
- Lời thư/footer: serif nghiêng mềm, kiểu Cormorant Garamond/serif thư tình; phải hiển thị tiếng Việt đầy đủ dấu.
- Tên trên keypad: nét viết tay tròn, dễ đọc; nhãn PIN nhỏ, giãn chữ.
- Tự chứa font nếu có font cục bộ hợp lệ; nếu không, dùng stack hệ thống có serif italic và cursive fallback. Không phụ thuộc Google Fonts/CDN để mở offline.
- Không dùng Comic Sans toàn bộ thiệp. Không dùng font công nghệ hoặc chữ sans đậm cho phần thư.

## 4. Cấu hình duy nhất và ảnh cá nhân

Đặt đối tượng sau ở đầu script; mọi chữ trong scene lấy từ đối tượng này, không hard-code rải rác:

```js
const CARD_CONFIG = {
  senderName: 'Anh iu',
  recipientName: 'bé ngốc',
  pin: '0000', // giữ kiểu string để không mất số 0 đầu
  showPinHint: false, // bật khi chủ thiệp muốn chế độ xem thử giống video
  title: 'To my love',
  salutation: 'Gửi bé ngốc của anh ❤️',
  message: 'Mỗi bông hoa trong khu vườn nhỏ này là dành cho em — cho sự dịu dàng, cho nụ cười, và cho từng khoảnh khắc bình yên mình có cùng nhau.',
  footer: 'Gửi yêu thương đến bé ngốc 🤍',
  coverRecipient: 'BÉ NGỐC',
  coverSnippet: 'Mỗi bông hoa trong khu vườn nhỏ là dành...',
  mainPhoto: '', // data URL sau khi cá nhân hóa
  memoryPhotos: ['', '', ''],
  loadingMs: 900,
  flowerShowerMs: 20000,
  typeMs: 65,
  enableSound: false,
  seed: 314159
};
```

Mã PIN là một chi tiết vui, **không phải cơ chế bảo mật**, vì mã và ảnh nằm trong HTML. Ghi điều này trong phần hướng dẫn cho chủ thiệp, không hiển thị cảnh báo vào trải nghiệm của người nhận.

### Chế độ chủ thiệp

- Chỉ bật bằng hash `#edit` hoặc query `?edit=1`; bình thường gửi người yêu không hiện bảng chỉnh sửa.
- Cho sửa tên, PIN, lời nhắn, chọn ảnh chính và 3 ảnh kỷ niệm qua `<input type="file" accept="image/*">`.
- Xử lý ảnh ở máy người dùng: đọc, sửa orientation qua cơ chế decode của trình duyệt, resize cạnh dài tối đa 1400 px, chuyển JPEG/WebP chất lượng khoảng .86, lưu data URL.
- Có xem trước và tải `thiep-5-tang-em.html` với cấu hình/ảnh đã nhúng. File tải lại phải mở độc lập, không dựa localStorage của máy chủ thiệp, không có blob URL hết hạn.
- Khi serialize config, escape `<` thành `\u003c`, tránh chuỗi `</script>` phá script. Chèn chữ qua textContent. File tải ra đặt trạng thái mới ở loading, không serialize DOM đang mở dialog/đang chạy particle.
- Chưa có ảnh: placeholder màu kem hồng, icon khung ảnh tinh tế; cảnh chuyển động vẫn chạy. Không dùng ảnh stock của một cô gái khác giả làm người nhận; không lấy ảnh từ frame video rồi giả là ảnh gốc chất lượng cao.
- Mặc định không cần thao tác nhập ảnh để xem được demo hoàn chỉnh.

## 5. Scene A — Loading vòng hoa

Nền hồng pastel phủ toàn màn hình. Vòng hoa tâm khoảng `(195, 370)` nếu dùng chiều cao 780, đường kính 132–145 px. 8–10 hoa hồng nhỏ nằm quanh một lỗ trống, xen hồng đậm và kem; bóng mềm bên dưới. Có thể dựng rose nhiều vòng cánh SVG, không thay bằng một emoji 🌸 phóng lớn.

- Vòng hoa scale từ .96 → 1.02 → .96 trong 1,8 s; xoay chậm ±3°, không quay nhanh liên tục như bánh xe.
- Dòng “Trái tim đang khẽ thì thầm...” khoảng y=530, font 14–15 px italic, opacity .6–.8.
- Giữ tối thiểu 850–950 ms. Nếu asset chưa decode xong, chờ tối đa hợp lý rồi dùng fallback; không treo loading vô hạn.
- Fade 350–450 ms sang PIN; loading bị bỏ khỏi hit-testing sau khi chuyển.

## 6. Scene B — PIN và trái tim khóa cổ

### 6.1. Nền

Giấy kem màu nước, vài đốm hồng, đám mây loang rất nhẹ mép trên trái. Phía giữa là dây chuyền vòng cung từ x≈65,y≈305 sang x≈315,y≈305; khóa trái tim hoa văn tâm khoảng `(195,465)`; chìa khóa nghiêng ở bên phải. Có trái tim màu nước phía trên y≈250 và phía dưới y≈680.

Khóa cần có: dây xích các mắt nối; quai khóa; thân hình tim hai thùy; hoa văn cuộn bên trong; lỗ chìa; chìa với đầu tim, thân dài, răng. Dựng SVG với stroke hồng cổ nhiều sắc độ, không dùng icon ổ khóa vuông thay thế. Trong lúc panel PIN phủ lên, khóa bị làm mềm do lớp kính, sau unlock hiện rõ.

### 6.2. Panel

- Xấp xỉ x=65,y=183,w=262,h=414, radius 20.
- Nền trắng .40–.65; border trắng .6; backdrop-filter blur 6–10 px với fallback nền trắng .82; shadow nhẹ.
- Nội dung trên: `From: Anh iu`, `For: bé ngốc`, căn giữa, mỗi hàng 22–24 px.
- Dòng `Mã PIN` ở dưới, font 11–12 px, letter spacing 2.
- Bốn trái tim nhỏ một hàng, cách nhau 12–14 px. Trống màu hồng rất nhạt; điền màu đỏ hồng; từng tim pop scale .75 → 1.2 → 1 trong 180 ms.
- Video có pill `XEM THỬ 0000`. Chỉ hiện khi `showPinHint=true`, không âm thầm cho mã vào giao diện bản tặng khi cờ tắt.
- Keypad 3 cột × 4 hàng: `1 2 3 / 4 5 6 / 7 8 9 / clear 0 backspace`.
- Nút tròn đường kính 49–51 px, gap 5–7 px; trắng trong, viền trắng, shadow mềm; chữ 20–22 px màu hồng cổ. Clear xóa cả mã; backspace xóa một chữ số; có aria-label tiếng Việt.
- Hỗ trợ bàn phím số, Backspace và Escape xóa; không cần bật bàn phím điện thoại vì có keypad riêng.
- Tap nút scale .92 trong 80 ms rồi trở lại; chỉ một pointer event cho một lần nhập, không cộng thêm click trùng.

### 6.3. Unlock

- Nhập đủ 4 số tự kiểm tra sau 200–300 ms.
- Sai: panel lắc x 0,-7,+7,-5,+5,0 trong 400 ms; một dòng nhỏ “Thử lại nhé, người thương ♡”; xóa mã sau 450 ms; không chuyển scene.
- Đúng: tô đủ 4 tim; khóa keypad; panel fade/translateY(-8 px) trong 450–650 ms; khóa phía sau lấy lại độ nét.
- SVG quai khóa có thể tách nhẹ 8–12 px và chìa xoay 12° trong 350 ms như nhấn thêm cảm giác mở khóa; đây là giải pháp thực thi đề xuất, không phải chi tiết đã xác minh rõ trong video.
- Giữ hình khóa rõ khoảng 350–500 ms, rồi crossfade nền kem → nâu trong 600–750 ms. Không chớp trắng, không chớp đen.

## 7. Scene C — Phong thư và mưa hoa

### 7.1. Phong thư giấy thật

Tại viewport 390×780, phong thư đóng khoảng x=85,y=310,w=220,h=148. Tâm theo chiều ngang. Các mốc có thể điều chỉnh ±12 px để giống frame tham chiếu.

Cấu tạo nhiều phần tử:

1. `envelope-back`: hình chữ nhật giấy trắng, shadow rơi xuống nhẹ.
2. `envelope-lining`: phần trong hơi kem.
3. `letter`: tờ thiệp chui từ lòng phong thư; ban đầu bị che đúng cách bởi túi thư.
4. `envelope-front`: hai nếp gấp từ góc trái/phải, đường chéo mảnh chạy về điểm dán.
5. `envelope-flap`: tam giác hướng xuống, đỉnh tại giữa gần y=365; transform-origin `50% 0`; có mặt trước và mặt sau; backface-visibility hidden.
6. `heart-seal`: tim đỏ hồng nổi, khoảng 27×25 px tại điểm giao nắp; highlight và shadow nhỏ.

Nắp không được có khe hở với mép phong thư. Các mặt không chồng sai khiến tờ thiệp xuyên qua phần mặt trước. Không áp `overflow:hidden` lên toàn bộ phong thư vì sẽ cắt nắp mở; mask chỉ dùng cho vùng lòng thư ở đúng giai đoạn.

Phong thư xuất hiện opacity 0→1, y+18→0, scale .94→1 trong 700 ms. Sau đó float y±3 px chu kỳ 3,6 s. Tem tim pulse 1→1.07→1 trong 2,2 s. Có thể chạm toàn phong thư; aria-label “Mở lá thư”.

Footer ở y≈714–730, căn giữa, font serif italic 19–21 px, chữ trắng kem: `Gửi yêu thương đến bé ngốc 🤍`. Chỉ shimmer/opacity nhẹ; không phát sáng trắng lóa. Footer giữ xuyên cảnh C–G, tối/mờ đi khi dialog mở.

### 7.2. Hoa — bắt buộc có độ chi tiết

Ít nhất 8 sprite/kiểu, mỗi kiểu có 2–3 biến thể:

| Kiểu | Hình dạng và màu |
|---|---|
| Cúc trắng | 12–18 cánh dài oval trắng ngà, đầu bo, tâm vàng có hạt |
| Cúc vàng/hướng dương | 16–24 cánh vàng đậm/nhạt, tâm nâu đen có vành hạt |
| Đồng tiền hồng | 2–3 tầng 24–36 cánh hẹp, tâm vàng |
| Đồng tiền đỏ | Nhiều cánh đỏ mận/xác hồng, tâm vàng xanh |
| Cúc tím | 18–28 cánh lavender, tâm vàng/nâu |
| Hoa xanh | 5 cánh tròn xanh lam nhạt, cánh có gân/gradient, tâm vàng; có thể cụm 2–3 bông |
| Hoa cầu tím | Rất nhiều cụm cánh nhỏ thành cầu, biên tua mềm, không phải một hình tròn trơn |
| Cụm tú cầu hồng | Nhiều hoa con bốn cánh màu hồng phấn, có điểm sáng/tối |

Ưu tiên canvas offscreen sinh sprite ở độ phân giải 2–3× rồi tái sử dụng. SVG cũng được nhưng không tạo hàng trăm filter nặng. Cánh cần vài sắc độ, gân rất mảnh, nhụy có điểm hạt; bóng chỉ 1–3 px mềm. Không thêm thân lá vào từng bông mưa hoa. Không dùng một icon cúc đổi màu làm toàn bộ bộ hoa.

### 7.3. Timeline mưa hoa đề xuất

Tính từ lúc nền nâu/phong thư bắt đầu hiện; tổng khoảng 20–21 giây, tương ứng cảnh hoa khoảng giây 6–26 trong bản quay.

| Thời gian tương đối | Cách sinh hoa |
|---|---|
| 0–1,5 s | 12–25 hoa bắt đầu tụ/đi qua vùng trên phong thư, tạo cảm giác bó hoa bung |
| 1,5–5 s | Tăng nhanh lên khoảng 90–140 hoa nhìn thấy; tập trung phần trên và hai bên phong thư |
| 5–11 s | Đỉnh dày, khoảng 130–190 hoa trên mobile đủ mạnh; có một số hoa 70–100 px, nhiều hoa 30–65 px và hoa nhỏ 12–28 px |
| 11–16 s | Giảm spawn, hoa rơi/tản xuống; phong thư lộ dần, vẫn có những bông lớn đi ngang |
| 16–20 s | Ngừng spawn; hoa còn lại trôi xuống đáy và ra khỏi viewport; không xóa một lượt |

Particle phải có `id,type,size,x,y,vx,vy,rotation,angularVelocity,phase,depth,birth,life` và seed riêng ổn định.

- Điểm sinh phần lớn từ y=-100 đến -20; đợt đầu có thêm vùng quanh miệng phong thư. Không spawn toàn màn hình ngay khi bắt đầu.
- Vận tốc dọc khoảng 35–95 px/s, tăng nhẹ theo thời gian; hoa nhỏ có thể nhanh hơn. Hạt sống đủ lâu để qua hết viewport.
- Drift ngang 10–35 px; sway hình sin biên độ 8–24 px, chu kỳ 2–5 s. Góc quay tốc độ ±10–40°/s; không đồng bộ.
- Xen lớp: khoảng 35% hoa ở sau phong thư, 65% phía trước. Hoa trước được đi qua và che một phần phong thư theo video; click/touch vẫn tới phong thư vì canvas `pointer-events:none`.
- Một số bông lật giả 3D bằng `scaleX` thay đổi .65–1, không bóp toàn bộ sprite tới số âm nếu không chủ động xử lý.
- Không đặt opacity .2 cho cả hệ hoa; phần lớn hoa phải rõ, có màu. Chỉ 10–20% hoa xa được nhạt/nhỏ hơn.
- Người nhận có thể mở thư trước khi mưa hoa hết. Khi chạm: giảm spawn về 0 trong khoảng .6 s, cho đuôi hoa tiếp tục rơi; không chờ 20 giây mới nhận tương tác.
- Nếu chưa chạm, phong thư vẫn chờ sau khi hoa hết. Không tự kích hoạt sự kiện click ở giây 26 theo video.

## 8. Scene D — Mở phong thư, rút và lật thiệp

Đây là chuỗi motion nối tiếp có cấu trúc, không thực hiện bằng ba ảnh fade.

### 8.1. Mốc animation sau lần chạm hợp lệ

| Khoảng ms | Motion |
|---|---|
| 0–180 | Tem tim scale 1→1.12, sau đó fade/scale .7; phong thư nhún y+3 rồi trở lại |
| 180–780 | Nắp rotateX 0→-180°, origin ở mép trên; khi qua 90° đổi stacking ra sau tờ thiệp; mặt trong lộ ra |
| 650–1400 | Thiệp trắng rút lên khỏi túi, có pha nằm ngang và xoay về dọc quanh trục Z; không xuyên qua front pocket |
| 1300–1900 | Tờ thiệp đáp về trung tâm trước phong thư; bìa dọc khoảng 128×208 px, top khoảng y=300 |
| 1900–2650 | Bìa mở rotateY 0→-155 đến -170°, origin ở mép trái; nền trang trong giữ đứng; phối cảnh 900–1200 px |
| 2700–3100 | Khung đọc thư fade/scale vào, backdrop tăng độ tối; giữ quyển thiệp mở dưới nền |

Đường rút thiệp đề xuất: bắt đầu tâm `(195,375)`, đưa lên khoảng `(195,265)`, xoay Z từ -90° về 0°, rồi hạ tâm về `(195,405)`; điều chỉnh để phần giấy đi đúng khỏi miệng phong thư. Tại lúc tờ giấy còn bị túi che, chỉ thấy phần thực sự nhô lên; sau khi thoát miệng mới reparent/nâng z-index để đặt trước.

Easing: mở nắp `cubic-bezier(.22,.61,.36,1)`; rút giấy `cubic-bezier(.25,.8,.25,1)`; lật bìa `cubic-bezier(.4,0,.2,1)`. Không dùng spring quá nảy hoặc lắc hoạt hình mạnh.

### 8.2. Bìa và trang trong

Bìa trắng, viền mảnh rất nhạt, không nền hồng. Giữa bìa có `✿ ♥ ✿` màu đỏ mận rất nhỏ, `To my love` script khoảng 25–29 px, bên dưới `– BÉ NGỐC –` uppercase 10–12 px tracking 2.

Khi mở, trang trái trắng gần như trống. Trang phải có lời chào và snippet font nhỏ, nghiêng, nằm gần phía trên; phong thư trắng vẫn nằm sau ở bên phải và nắp tam giác mở nhô lên. Cả quyển mở rộng khoảng 250–270 px. Bóng gáy mờ theo chiều dọc tạo cảm giác giấy, không tô một vạch đen cứng.

Dùng hai mặt bìa với backface-visibility để chữ không bị lật gương xuyên qua mặt sau. Bóng bìa thay đổi theo góc mở; trang trong không xoay cùng bìa. Trong cảnh kết thúc, giữ bìa mở như video.

## 9. Scene E — Cửa sổ thư, ảnh và typewriter

### 9.1. Khung và layer

- Backdrop màu nâu đen opacity khoảng .42–.50; blur nền 2–4 px; giữ nhận ra phong thư mờ.
- Trên 390×780, dialog khoảng x=16–18,y=176–180,w=354–358,h=476–482. Ảnh và nội dung gói trong giấy; modal nhìn ấm và rõ.
- Nền gradient kem phía trên/hồng da phía dưới; border 1 px màu hồng cổ rất nhạt; radius 12–15 px; shadow nâu lớn mềm.
- Header cao 36–40 px, đường kẻ dưới mảnh. Giữa có `✦ ♥ ✿ To my love ✿ ♥ ✦`, chữ 14–17 px nhẹ.
- Nút × hình tròn trắng khoảng 28–30 px ở góc phải; hit area tối thiểu 44×44, màu chữ hồng. Luôn ở trên ảnh và có focus ring.
- Ảnh chính khoảng 178–182 × 222–226 px, object-fit cover, radius 7–9 px; nằm giữa, cách header 15–18 px; shadow nhẹ; không kéo méo ảnh.
- Tiêu đề dưới ảnh margin-top 14–17 px, font serif italic đậm 18–20 px màu đỏ hồng.
- Đoạn thư cách tiêu đề 14–18 px, padding ngang 20–26 px, font serif italic 16–18 px, line-height 1.5–1.65, căn giữa. Tại reference đoạn khoảng 4 dòng khi xong.
- Tim đỏ nhỏ giữa cuối thư, margin-top 20–24 px, không dùng nút lớn.
- Khung xuất hiện opacity 0→1, scale .92→1 và y+12→0 trong 380–450 ms; nền chuyển cùng nhịp, không bay từ xa.

### 9.2. Gõ chữ

- Ảnh hiện trước và giữ nguyên kích thước. Sau 250–400 ms bắt đầu gõ lời chào, nghỉ 250 ms, rồi gõ đoạn chính.
- Dùng `Intl.Segmenter('vi', {granularity:'grapheme'})` nếu có, fallback `Array.from`; tránh tách dấu tiếng Việt.
- Tốc độ khoảng 60–75 ms/grapheme; dấu phẩy nghỉ thêm 120 ms, dấu chấm/gạch ngang nghỉ 220–350 ms. Với lời thư mẫu, thời lượng hoàn thành khoảng 9–13 giây.
- Con trỏ dạng `|` mảnh ở cuối chữ đang gõ, nháy 500–650 ms. Gõ xong ẩn con trỏ rồi tim đỏ hiện scale .6→1 trong 300 ms.
- Không để khung nhảy/ảnh dịch xuống khi thêm chữ: dành trước vùng chữ phù hợp; chiều cao tổng ổn định ở cấu hình mẫu. Với lời nhắn dài, vùng nội dung cuộn nội bộ.
- Chạm vùng lời nhắn khi đang gõ sẽ hiện toàn bộ ngay; không đóng dialog. Nút × luôn đóng được dù đang gõ.
- Cập nhật accessible text hợp lý: cung cấp bản văn hoàn chỉnh cho screen reader và `aria-hidden` trên animation chữ, tránh đọc từng ký tự liên tục.
- Không tự đóng sau thời gian cố định. Đợi người nhận đóng.

### 9.3. Tương tác dialog

Focus vào nút đóng khi mở; trap focus bên trong; Escape đóng; trả focus về thiệp sau khi đóng. Nhấn vào nội dung không đóng. Backdrop có thể đóng nếu được triển khai nhất quán, nhưng không bắt buộc.

Khi đóng: timer gõ dừng, khung fade/scale nhẹ 250–320 ms, backdrop fade 350 ms. Đừng reset phong thư về trạng thái đóng.

## 10. Scene F — Ba ảnh kỷ niệm bay lên

Chạy đúng một lần sau **lần đóng thư đầu tiên**. Khi mở lại thư rồi đóng, trở về vòng tim, không tự lặp ba ảnh trừ khi chủ động chọn xem lại.

### 10.1. Ảnh

- 3 ảnh dọc, khung khoảng 145–155 × 188–205 px, bo 12–15 px; object-fit cover.
- Viền hồng 1–2 px; glow hồng 12–22 px, cường độ .4–.65; không làm ảnh mờ.
- Bản quay có ảnh đầu bên trái, ảnh thứ hai bên phải và ảnh thứ ba lại bên phải khi vào, rồi trôi dần về trái ở đầu màn hình. Tái tạo bằng path cong riêng.
- Tất cả ảnh sinh ngoài đáy màn hình, lần lượt đi qua vùng thiệp và thoát ngoài đầu. Không pop vào ngay giữa.

### 10.2. Timing tương đối từ khi dialog đóng xong

| Ảnh | Delay | Thời lượng | Path tâm tại các mốc 0%, 35%, 70%, 100% |
|---|---|---|---|
| 1 | 450 ms | 6800 ms | `(110,H+120)` → `(120,520)` → `(170,235)` → `(155,-150)` |
| 2 | 1450 ms | 7200 ms | `(290,H+135)` → `(270,570)` → `(155,285)` → `(95,-150)` |
| 3 | 3050 ms | 7600 ms | `(290,H+130)` → `(285,600)` → `(160,290)` → `(110,-160)` |

Dùng cubic Bézier interpolation hoặc keyframe vị trí mượt; góc rotateZ khoảng -5°→3°→-3° tùy ảnh; không xoay 360°. Opacity tăng trong 250 ms khi vào và giảm ở sát đầu màn hình, không fade mất ngay giữa. Các tọa độ là gợi ý tái dựng; scale theo stage và viewport.

### 10.3. Hoa đi cùng ảnh

- Tạo đợt hoa mới, nhiều bông lớn đỏ/hồng gần hai ảnh đầu; hoa nhỏ xanh/tím/vàng xen kẽ.
- Hoa đợt này có chuyển động chủ đạo đi lên cùng ảnh, khác mưa hoa đi xuống lúc đầu.
- Có hoa đi trước ảnh, hoa bị ảnh che và hoa đi sau; không dán tất cả hoa cố định thành một sticker duy nhất.
- Không phủ kín mặt trong ảnh trong suốt chuyến bay. Tại vài khoảnh khắc có thể có hoa đi qua ảnh, nhưng giữ đủ thời gian thấy ảnh rõ.
- Khi các ảnh gần rời màn hình, một nhóm hoa bắt đầu tiến về vị trí trái tim của cảnh G. Chuyển cảnh gối nhau; không đợi màn hình trống rồi mới vẽ trái tim.

## 11. Scene G — Vòng hoa hình trái tim quanh thiệp mở

### 11.1. Hình cuối

Vòng trái tim là các **bông hoa riêng lẻ xếp trên đường viền**, giữa trống, nhìn thấy thiệp mở. Không tô kín tim, không thay bằng đường stroke hồng có vài hoa chấm lên.

Tại 390×780: tim bao khoảng x=52..332, y=278..536. Tâm khoảng `(192,395)`; đuôi tim ở `(194,526)`. Phần thùy trên có hõm ở giữa; nhiều hoa xanh/tím tụ phía dưới đuôi. Thiệp mở phía sau khoảng x=8..305,y=300..490. Bố cục hơi lệch trái như frame cuối, vẫn giữ trung tâm thị giác quanh x=190.

### 11.2. Phương trình đường tim

```js
// Tạo point cloud trước, resample theo độ dài cung để hoa rải đều.
x = 16 * Math.sin(t) ** 3;
y = 13 * Math.cos(t) - 5 * Math.cos(2*t)
    - 2 * Math.cos(3*t) - Math.cos(4*t);
// Screen: px = cx + sx*x; py = cy - sy*y;
// Fit lại bbox thực tế về 280×258 px thay vì chỉ đoán cx/cy.
```

- 42–60 hoa trên viền, kích thước 16–38 px, vài cụm 40–48 px; không đặt cách đều cứng như chuỗi hạt giống nhau.
- Resample gần đều theo arc length, thêm jitter chỉ 2–6 px; giữ hình tim rõ.
- Xen hoa tím, xanh lam, cúc trắng, vàng, đỏ/hồng. Các bông lớn hơn ở hai vai và đuôi, ít bông đỏ làm điểm nhấn.
- Tránh cụm hoa ở hõm trên che hết lời chào trên trang phải.

### 11.3. Chuyển từ hoa bay thành tim

Tại khoảng 6,5–8 s sau đóng dialog, gán các particle đã tồn tại cho các điểm tim gần hợp lý. Mỗi bông nội suy từ tọa độ hiện tại sang target trong 1,6–2,5 s với delay 0–600 ms; góc quay chậm dần. Có thể bổ sung hoa từ hai bên nếu thiếu, nhưng không làm cả vòng xuất hiện cùng một frame.

Khi đã tạo tim: giữ vị trí nền; bob 1–3 px, scale .97–1.03 chu kỳ 3–5 s, phase riêng từng bông. Nhịp thở chung cả tim scale 1→1.012→1 chu kỳ 4 s. Không để jitter random mỗi frame làm hoa rung giật.

Thiệp/hoa tim giữ đến khi người nhận chạm thiệp để đọc lại. Chạm đọc lại mở chính dialog; không yêu cầu nhập PIN lần nữa trong cùng phiên. Không thêm màn “Kết thúc” hoặc tự chuyển sang quảng cáo.

## 12. Kiến trúc animation và quản lý tương tác

### 12.1. State machine bắt buộc

```text
LOADING → PIN_IDLE → UNLOCKING → ENVELOPE_IDLE
ENVELOPE_IDLE → ENVELOPE_OPENING → CARD_UNFOLDING → LETTER_READING
LETTER_READING → LETTER_CLOSING → MEMORIES_FLYING → HEART_SETTLING → HEART_IDLE
HEART_IDLE → LETTER_READING → LETTER_CLOSING → HEART_IDLE
```

Sai mã quay lại PIN_IDLE. Nếu click trong chuyển cảnh, bỏ qua hoặc gom đúng một hành động; không tạo thêm scene/timer. Biến `memoriesPlayed` ngăn chuỗi ảnh phát lại ngoài ý muốn.

### 12.2. Một đồng hồ trung tâm

- Một requestAnimationFrame loop duy nhất cho particle/paths; CSS/WAAPI được dùng cho panel, nắp, bìa, dialog.
- Dùng `performance.now()` và elapsed theo scene; dt tính giây, clamp khoảng .033–.05 để tránh nhảy khi tab quay lại.
- Pause elapsed câu chuyện khi `document.hidden`; resume không spawn bù hàng trăm hoa. Đồng bộ cả WAAPI/CSS nếu cần, không chỉ dừng canvas.
- Không tạo setInterval cho từng hoa. Timer gõ chữ phải thuộc scene và hủy khi dialog đóng.
- Mọi scene có enter/update/exit hoặc lifecycle tương đương; cleanup listener, timeout, animation khi reset.
- Chỉ resize canvas khi kích thước thật thay đổi, giữ nguyên tọa độ chuẩn hóa và trạng thái. Dùng DPR min(devicePixelRatio,2) trên mobile.
- Seeded random cho sprite/particle và chế độ test, không gọi Math.random lại trong mỗi draw gây nhấp nháy.

### 12.3. Layer đề xuất

| Tầng | Nội dung |
|---|---|
| 0 | Nền và grain |
| 10 | Hoa phía sau |
| 20 | Lưng phong thư, nắp khi đã mở |
| 30 | Thiệp trong túi |
| 40 | Mặt/túi phong thư |
| 50 | Nắp đóng và tem tim |
| 60 | Thiệp đã rút và trang/bìa 3D |
| 70 | Các ảnh bay |
| 80 | Hoa phía trước và vòng tim |
| 90 | Footer |
| 100 | Backdrop |
| 110 | Dialog thư |
| 120 | Công cụ chủ thiệp, chỉ khi #edit |

Đây là thứ tự logic, không chỉ là gán số z-index. Kiểm tra stacking context do transform/filter: nếu cần, chia canvas trước/sau thành siblings trực tiếp ở root. Không đặt dialog trong một parent đang transform khiến fixed bị bó vào vùng thiệp.

### 12.4. Độ mượt và fallback

- Desktop mục tiêu 60 fps; mobile giữ ổn định 30–60 fps. Giảm số hoa động nếu frame time kéo dài, giữ hoa lớn và độ đa dạng.
- Pre-render sprite vào offscreen canvas, cache; hạn chế blur, shadow, SVG filter đang động. Không dựng lại texture hoa mỗi frame.
- Đồ họa tĩnh vẫn sắc; hiệu ứng màu nước không đồng nghĩa mọi thứ đều blur.
- `prefers-reduced-motion`: vẫn giữ đủ cảnh, đổi mưa hoa sang hoa fade dịu/số lượng ít, ảnh trượt ngắn, mở thiệp chậm nhẹ hoặc crossfade có trạng thái rõ. Không tự tắt hết scene/không làm nút mất tác dụng.
- Nếu canvas lỗi, fallback SVG hoa tĩnh/animation CSS số lượng ít để luồng vẫn dùng được.
- Không tự tắt motion chỉ vì máy là điện thoại hoặc `hover:none`.

## 13. Trang Thiệp 5 riêng và bản xuất độc lập

Cấu trúc `thiep-5.html` cho bản HTML tĩnh (khác với `index.html` là trang danh sách):

```html
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#c9ac9d">
  <title>Một lá thư dành cho em</title>
  <style>/* toàn bộ theme, layout, 3D, reduced motion */</style>
</head>
<body class="thiep-5">
  <!-- background, canvas back, envelope/book, photos, canvas front -->
  <!-- footer, loading/PIN overlay, dialog, editor ẩn -->
  <script>
    // CONFIG → sprite factory → seeded random → particles
    // → scene lifecycle/timeline → input/dialog → editor/export → boot
  </script>
</body>
</html>
```

- Không fetch JSON, không import module CDN, không đường dẫn file tuyệt đối của máy tác giả.
- SVG inline hoặc data URI; ảnh data URL; font có sẵn thì nhúng woff2.
- Không dùng toàn bộ video làm nền để giả thiệp tương tác.
- Không yêu cầu ảnh từ dịch vụ bên thứ ba. Không tracking/analytics hoặc tải ảnh người nhận lên server.
- File `thiep-5.html` mở qua `file://` phải có cùng luồng chính với khi hosting.
- Đính kèm comment đầu file hướng dẫn thay CARD_CONFIG và mở chế độ chỉnh sửa; hướng dẫn ngắn cho chủ thiệp khi bàn giao.

## 14. Checklist nghiệm thu — Codex phải tự kiểm tra

### Tích hợp danh sách và định danh

- [ ] Tên mẫu, ID, route và tài liệu đều là Thiệp 5; Thiệp 3 vẫn giữ nguyên.
- [ ] index.html tiếp tục hiển thị danh sách, đầy đủ các mẫu cũ.
- [ ] Chỉ thêm một card Thiệp 5, nút xem và cá nhân hóa mở đúng mẫu.
- [ ] URL mẫu 5 mở trực tiếp và refresh vẫn chạy theo cách deploy hiện tại.
- [ ] Quay về danh sách không còn canvas/timer/listener của mẫu 5 chạy ngầm.
- [ ] CSS và JavaScript mẫu 5 không ảnh hưởng các thiệp khác.
- [ ] Nếu có editor/luồng chia sẻ sẵn, mẫu 5 sử dụng đúng templateId và cơ chế hiện tại.

### Chức năng

- [ ] Loading tự kết thúc; không màn trắng.
- [ ] 0 đầu PIN được giữ; đủ 4 số kiểm tra; mã sai không mở; clear/backspace đúng.
- [ ] Touch nhập không bị nhân đôi.
- [ ] Đúng mã có fade panel, thấy khóa rồi mới tới phong thư.
- [ ] Phong thư mở được ngay khi mưa hoa còn chạy; tap liên tục không mở nhiều lần.
- [ ] Nắp mở ra sau; giấy rút đúng khỏi túi; mặt trước không chui lên che sai.
- [ ] Bìa thiệp xoay ở gáy, chữ không bị lật gương.
- [ ] Dialog có ảnh, lời chào, chữ gõ, tim kết thúc; đóng sớm vẫn hoạt động.
- [ ] Đóng thư lần đầu có đủ ba ảnh bay và hoa đi lên.
- [ ] Ảnh kết thúc ngoài màn hình, không còn một góc ảnh bị kẹt ở đáy/đỉnh.
- [ ] Hoa tụ thành tim rõ, giữ khoảng trống giữa, có thở nhẹ.
- [ ] Chạm thiệp cuối mở lại thư; đóng trở lại đúng tim, không nhân particle.
- [ ] Mở/đóng thư 5 lần không tăng timer, listener hoặc rAF loop.

### Độ giống và motion

- [ ] Nền PIN kem màu nước và nền phong thư nâu nude là hai cảnh khác nhau.
- [ ] Phong thư ban đầu nhỏ giữa màn hình, không full width.
- [ ] Có giai đoạn hoa dày nhiều lớp, nhiều cỡ, có bông rất lớn; không chỉ 10 bông thưa.
- [ ] Hoa có nhụy/cánh/texture, không emoji hoặc icon phẳng đơn điệu.
- [ ] Mưa hoa đầu đi xuống, đợt ảnh/hoa sau đi lên.
- [ ] Mọi pha rút giấy/lật bìa có chuyển động riêng, không fade thay tất cả.
- [ ] Ảnh rõ, glow hồng nhẹ, không kéo méo hoặc crop mất mặt vì hard-code vị trí.
- [ ] Footer serif nghiêng trắng, nằm gần đáy, không che nút.
- [ ] Trạng thái cuối đúng thiệp mở + vòng tim hoa, không trở về phong thư đóng.

### Mobile, offline và cá nhân hóa

- [ ] Kiểm tra 360×800, 390×780, 430×932; desktop khoảng 1366×900.
- [ ] Không overflow ngang, không nút đóng ngoài màn hình khi thanh địa chỉ đổi chiều cao.
- [ ] Xoay màn hình giữa lúc mở thư không reset PIN/câu chuyện.
- [ ] Khi tab background rồi quay lại, particle không teleport và gõ chữ không chạy trùng.
- [ ] Nút có hit area 44 px, focus/keyboard dùng được.
- [ ] Reduced motion vẫn cho xem trọn thư và ảnh.
- [ ] Mở file offline không có tài nguyên hỏng hoặc console exception.
- [ ] Chọn ảnh trong editor, tải HTML, mở file tải ra ở một tab sạch vẫn còn đủ ảnh/nội dung.
- [ ] Bản gửi người yêu không lộ editor, hint PIN hoặc UI debug.

Nếu có browser automation, cung cấp debug hook chỉ trong chế độ test, ví dụ `window.__cardDebug.goto(state)`/`seek(ms)` và seed cố định; không hiển thị nút debug cho người nhận. Kiểm tra ảnh tĩnh ở từng cảnh cộng với kiểm tra chuyển động thực theo thời gian. Ảnh chụp một frame không đủ chứng minh đúng motion. Nếu môi trường không có browser, ghi rõ chưa kiểm tra trình duyệt và hoàn thành mọi kiểm tra có thể thực hiện; không giả vờ đã xem animation chạy.

## 15. Bàn giao

Hoàn tất trang/mẫu `thiep-5.html` (hoặc route/module theo dự án) và bổ sung mục Thiệp 5 vào danh sách hiện có. Bàn giao các file đã tạo/sửa cùng bản xuất HTML độc lập; không chỉ trả code mẫu. `index.html` tiếp tục là trang danh sách, chỉ cập nhật cần thiết để thêm mẫu 5. Kèm hướng dẫn ngắn:

1. Mở HTML để xem; mã mặc định `0000`.
2. Mở thêm `#edit` để thay tên, mã, lời thư và chọn ảnh cá nhân.
3. Tải bản HTML đã nhúng ảnh; mở thử bản tải đó.
4. Có thể gửi file hoặc upload `thiep-5.html` lên hosting tĩnh để gửi link. Lưu ý một số ứng dụng nhắn tin không chạy HTML trực tiếp trong trình xem tệp, người nhận cần mở bằng trình duyệt; link hosting thuận tiện hơn.

Không tuyên bố đã triển khai online nếu mới tạo file. Không thêm nhạc vì nguồn âm thanh không thuộc yêu cầu. Chất lượng phải đủ để người dùng điền ảnh/lời nhắn rồi gửi được, không phải một dự án còn thiếu phần hiệu ứng chính.
