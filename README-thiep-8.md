# THIỆP 8 — VŨ TRỤ TRÁI TIM, PHONG THƯ 3D VÀ ẢNH KỶ NIỆM 💖 (BẢN CẢI TIẾN HOÀN CHỈNH)

> Triển khai hoàn thiện bằng HTML, CSS và JavaScript thuần theo đúng đặc tả thay thế video.  
> Không dùng framework nặng, không dùng Three.js/GSAP qua CDN, hoàn toàn tự chứa (self-contained).

---

## 1. Hướng Dẫn Khởi Chạy

Khuyến nghị chạy bằng một HTTP server local (hoặc extension **Live Server** trong VS Code) để các tài nguyên SVG, TTF font tải trơn tru:

### Dùng Node.js
```bash
# Khởi chạy server tại thư mục dự án
npx serve .
# Hoặc
npx http-server . -p 8080
```
Truy cập trình duyệt:
- Danh sách tất cả các thiệp: `http://localhost:8080/index.html`
- Thiệp 8 trực tiếp: `http://localhost:8080/thiep-8.html` (hoặc `http://localhost:8080/thiep-8/index.html`)

---

## 2. Các Điểm Đã Sửa Đổi Toàn Diện Theo Yêu Cầu

1. **Khối tim particle 3D có thể tích (Taubin 3D Formulation)**:
   - Tâm tim tại $x = 50\%$, $y = 38.5\%$ chiều cao viewport, rộng $70\%$ chiều rộng trên mobile.
   - 11.000 hạt particle có chiều sâu thực sự, hai múi tròn đầy, rãnh giữa sâu và chóp tim thu thon thả.
   - **Xóa bỏ hoàn toàn đường dọc xé đôi tim ở giữa** nhờ thuật toán phân bố điểm thể tích 3D thực tế.
   - Xoay nhẹ $\pm 7^\circ$ quanh trục đứng và nhịp đập 1.8s mềm mại.
2. **Hệ vòng chữ và ảnh elip 3D bên dưới tim**:
   - Nằm ngay dưới tim tại $y = 52\text{--}76\%$, cùng chung tâm không gian và nghiêng góc $68^\circ$.
   - 5 vòng elip đồng tâm gồm bụi sao, tim mini và các dải chữ tình yêu chạy thực sự theo quỹ đạo: chữ phía trước to rõ sáng, chữ phía sau nhỏ mờ xa.
   - Cụm ảnh kỷ niệm nhỏ xoay quanh tâm cùng các điểm sáng vàng trắng.
3. **Bỏ nút "Chạm vào trái tim ✨"**: Cho phép chạm trực tiếp vào tim hoặc bất kỳ đâu trên màn hình để chuyển cảnh.
4. **Phong thư lớn ở vùng dưới ($y = 66\text{--}89\%$)**:
   - Rộng 92% viewport, trắng sáng sạch sẽ, các nếp gấp chéo và nắp khép kín không hở, có tim niêm phong sáp.
   - Dòng chữ nhỏ xám nhạt: `"Nhấn vào thư để mở 💌"` (hoặc `"Nhấn vào thư để mở lại 💌"`).
5. **Tấm thiệp rút dạng dọc & Mở gáy sách 3D**:
   - Tấm thiệp tỷ lệ dọc chuẩn 0.74 (không phải hình chữ nhật ngang).
   - Rút thẳng đứng lên khỏi miệng bì, xoay nghiêng $42^\circ$ trên mặt phẳng, tiến ra trước và mở bìa sách quanh gáy dọc (`rotateY: 0 -> -150deg`), để lộ ảnh người nhận bên trái và lời nhắn bên phải trước khi chuyển sang bảng đọc thư.
6. **Bảng thư trắng chuẩn bố cục**:
   - Rộng 95% sân khấu, cao 75% sân khấu trên mobile, bo góc 20px, nền xanh tím tối `#101020`.
   - **Ảnh chân dung người nhận trên cùng**: chiếm 60% chiều rộng bảng, tỷ lệ dọc 0.88, bo góc 9px, không có khung caption/nhãn thừa.
   - **Lời nhắn viết tay**: font Dancing Script hỗ trợ 100% tiếng Việt, gõ dần từng grapheme không giật chiều cao bảng thư.
   - **Trái tim đỏ nổi bật**: đập nhẹ dưới lời nhắn.
   - **Nút × hồng**: đóng thư nhanh và êm ái.
   - **Đã xóa bỏ hoàn toàn nút "Hiện đầy đủ"**.
7. **Tim phát sáng & Ảnh kỷ niệm bay**:
   - Nền đỏ rượu vang trung tâm với 16–22 tim phát sáng có quầng glow mềm, được phân bố sẵn ngay từ đầu khắp màn hình.
   - Ảnh bay vuông bo góc (rộng 40% màn hình), viền trắng mỏng và quầng hồng bao quanh, bay so le hai làn trái/phải, tuần hoàn liên tục không bị trống nền.
   - **Đã bỏ hẳn hai nút "Đọc lại thư" và "Xem lại từ đầu" cố định ở đáy**.
   - Sau đợt ảnh (~12s), phong thư tự động trở lại ở vùng dưới; người xem chạm phong thư để mở lại toàn bộ chuỗi mở thiệp và viết lại chữ.

---

## 3. Cấu Trúc File

```text
index.html                             # Trang danh mục thiệp (đã đăng ký Thiệp 08)
thiep-8.html                            # File chạy chính của Thiệp 8
thiep-8/index.html                      # Entrypoint phụ tương thích thư mục
README-thiep-8.md                      # Hướng dẫn chi tiết
assets/thiep-8/
├── css/
│   └── thiep-8.css                    # Scoped CSS, bố cục phong thư 66-89%, thiệp dọc 3D, modal
├── fonts/
│   └── dancing-script.ttf             # Font chữ viết tay lãng mạn local, hỗ trợ tiếng Việt có dấu
├── images/
│   ├── photo-01.svg                   # Placeholder sạch không chữ (Bàn tiệc nến lãng mạn)
│   ├── photo-02.svg                   # Placeholder sạch không chữ (Buổi tối ấm áp)
│   └── photo-03.svg                   # Placeholder sạch không chữ (Nụ cười rạng rỡ)
└── js/
    ├── config.js                      # Cấu hình dữ liệu duy nhất THIEP_8_CONFIG
    ├── universe.js                    # 3D Taubin volumetric particle heart & elip orbit system
    ├── letter.js                      # Rút thiệp dọc, xoay 42°, mở gáy sách 3D & bảng đọc thư
    ├── gallery.js                     # Tim nền phát sáng & ảnh kỷ niệm bay viền glow lặp vòng
    └── main.js                        # State machine điều phối & quản lý mở lại thư
```
