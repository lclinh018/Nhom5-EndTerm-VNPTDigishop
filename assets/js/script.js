// MẢNG DỮ LIỆU ĐẦY ĐỦ CÁC GÓI CƯỚC THEO ĐỀ BÀI YÊU CẦU
const productData = [
    { name: "HOME INTERNET", category: "wifi", desc: "Gói cước mạng thuần cáp quang siêu tốc 150 Mbps ổn định[cite: 993].", price: "165.000", image: "home.png" },
    { name: "HOMETV 1", category: "wifi", desc: "Mạng cáp quang tốc độ cao + Gói truyền hình MyTV đặc sắc đa kênh[cite: 993].", price: "215.000", image: "hometv.png" },
    { name: "HOME MESH 2+", category: "wifi", desc: "Băng thông mạng 250 Mbps + Có thiết bị Wifi Mesh tăng sóng xuyên tường[cite: 993].", price: "210.000", image: "homemesh.png" },
    { name: "HOME CAM 1", category: "wifi", desc: "Tốc độ 150 Mbps + Trang bị sẵn thiết bị Camera Indoor an ninh[cite: 993].", price: "215.000", image: "homecam.png" },
    { name: "HOME ĐỈNH", category: "wifi", desc: "Băng thông cực đại 500 Mbps + Tích hợp ưu đãi di động đỉnh cao[cite: 993].", price: "369.000", image: "homedinh.png" },
    { name: "HOME CHẤT 1", category: "wifi", desc: "Tốc độ 150 Mbps + Miễn phí 30GB Data di động VinaPhone hàng tháng[cite: 993].", price: "249.000", image: "homechat.png" },
    { name: "VD120M", category: "mobile", desc: "Gói di động: 1GB/ngày + Miễn phí hoàn toàn Data lướt Tiktok, Youtube[cite: 994].", price: "120.000", image: "vd120m.png" },
    { name: "D159V", category: "mobile", desc: "Ưu đãi lớn: 4GB/ngày + 1500 phút nội mạng + 200 phút ngoại mạng[cite: 994].", price: "159.000", image: "d159v.png" },
    { name: "SODA125", category: "mobile", desc: "Chu kỳ 30 ngày. Miễn phí 8GB Data/ngày tốc độ cao 5G Vinaphone[cite: 994].", price: "125.000", image: "soda125.png" },
    { name: "U1500", category: "mobile", desc: "Gói cước Data 12 tháng không giới hạn dung lượng[cite: 994].", price: "1.500.000", image: "u1500.png" }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const b2tBtn = document.getElementById("backToTopBtn");
const consultForm = document.getElementById("consultationForm");

// CHỨC NĂNG 1: TỰ ĐỘNG XUẤT SẢN PHẨM KHÔNG LO LỖI ĐƯỜNG DẪN LIÊN KẾT
function renderProducts(data) {
    if (!productGrid) return;
    productGrid.innerHTML = "";

    if (data.length === 0) {
        productGrid.innerHTML = `<div class="col-12 text-center py-4 text-muted">Không tìm thấy gói cước nào phù hợp.</div>`;
        return;
    }

    // Thuật toán tự động quét cấp thư mục để chống lỗi mất ảnh/mất link
    const isInsidePages = window.location.pathname.includes("/pages/");
    const imgFolder = isInsidePages ? "../assets/images/" : "./assets/images/";
    const contactPageLink = isInsidePages ? "./contact.html" : "./pages/contact.html";

    data.forEach(product => {
        productGrid.innerHTML += `
            <div class="col-xl-4 col-md-6">
                <div class="card-product card h-100 p-3 shadow-sm border-light">
                    <div class="card-img-placeholder rounded-3 mb-3">
                        <img src="${imgFolder}${product.image}" class="card-img-actual rounded-3" alt="${product.name}" onerror="this.style.display='none';">
                        <i class="bi bi-box-seam display-5 text-muted"></i>
                    </div>
                    <div class="card-body p-0 d-flex flex-column text-start">
                        <span class="badge ${product.category === 'wifi' ? 'bg-primary' : 'bg-success'} mb-2 align-self-start">${product.category === 'wifi' ? 'Internet Fiber' : 'Gói Di Động'}</span>
                        <h4 class="fw-bold text-dark mb-2">${product.name}</h4>
                        <p class="text-muted small flex-grow-1">${product.desc}</p>
                        <div class="mt-2">
                            <span class="text-muted small d-block">Chỉ từ</span>
                            <div class="d-flex align-items-baseline">
                                <span class="price-text">${product.price}</span>
                                <span class="text-muted small ms-1">đ/tháng</span>
                            </div>
                        </div>
                        <a href="${contactPageLink}" class="btn btn-primary w-100 fw-bold mt-3 py-2 rounded-3 text-center text-decoration-none">ĐĂNG KÝ</a>
                    </div>
                </div>
            </div>`;
    });
}

// CHỨC NĂNG 2: TÌM KIẾM KẾT HỢP LỌC DANH MỤC THEO ĐỀ BÀI (PHẦN NÂNG CAO)
function runFilter() {
    const searchKey = searchInput.value.toLowerCase().trim();
    const filterCat = categoryFilter.value;

    const filtered = productData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchKey);
        const matchesCat = filterCat === "all" || item.category === filterCat;
        return matchesSearch && matchesCat;
    });
    renderProducts(filtered);
}

if (searchInput) searchInput.addEventListener("input", runFilter);
if (categoryFilter) categoryFilter.addEventListener("change", runFilter);

// KIỂM TRA TÍNH HỢP LỆ VÀ HIỂN THỊ THÔNG BÁO CHO FORM LIÊN HỆ
if (consultForm) {
    consultForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById("fullName");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phoneNumber");
        const msgInput = document.getElementById("message");
        
        let isValid = true;

        // Kiểm tra họ tên
        if (nameInput.value.trim() === "") {
            nameInput.classList.add("is-invalid");
            isValid = false;
        } else { nameInput.classList.remove("is-invalid"); nameInput.classList.add("is-valid"); }

        // Kiểm tra email cơ bản
        if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
            emailInput.classList.add("is-invalid");
            isValid = false;
        } else { emailInput.classList.remove("is-invalid"); emailInput.classList.add("is-valid"); }

        // Kiểm tra số điện thoại
        if (phoneInput.value.trim() === "" || isNaN(phoneInput.value.trim()) || phoneInput.value.trim().length < 9) {
            phoneInput.classList.add("is-invalid");
            isValid = false;
        } else { phoneInput.classList.remove("is-invalid"); phoneInput.classList.add("is-valid"); }

        // Kiểm tra nội dung yêu cầu tư vấn
        if (msgInput.value.trim().length < 5) {
            msgInput.classList.add("is-invalid");
            isValid = false;
        } else { msgInput.classList.remove("is-invalid"); msgInput.classList.add("is-valid"); }

        // Nếu tất cả các trường hợp đều điền đúng định dạng
        if (isValid) {
            // Hiển thị thông báo chính xác theo yêu cầu đề ra
            alert("Thông tin của quý khách hàng đã được hệ thống ghi nhận, Nhân viên CSKH của VNPT sẽ sớm liên hệ lại quý khách. Xin cảm ơn quý khách.");
            
            // Đặt lại form về trạng thái trống
            consultForm.reset();
            nameInput.classList.remove("is-valid"); 
            emailInput.classList.remove("is-valid"); 
            phoneInput.classList.remove("is-valid");
            msgInput.classList.remove("is-valid");
        }
    });
}

// CHỨC NĂNG 4: NÚT QUAY VỀ ĐẦU TRANG (BACK TO TOP)
window.onscroll = function() {
    if (b2tBtn) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) { b2tBtn.style.display = "flex"; }
        else { b2tBtn.style.display = "none"; }
    }
};
if (b2tBtn) {
    b2tBtn.addEventListener("click", function() { window.scrollTo({ top: 0, behavior: "smooth" }); });
}

// Khởi chạy kết xuất danh sách gói cước ban đầu
renderProducts(productData);