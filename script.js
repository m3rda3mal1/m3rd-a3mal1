// تعريف المتغيرات (مربوطة بأسماء الـ HTML الصحيحة)
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const lightbox = document.getElementById('videoLightbox'); 
const lightboxVideo = document.getElementById('lightboxVideo'); 
const closeLightboxBtn = document.getElementById('closeLightbox'); 

// 1. تشغيل الفلاتر (مطاعم - ذهب - عيادات - الكل)
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // تغيير لون الزرار النشط
        filterBtns.forEach(button => button.classList.remove('active'));
        btn.classList.add('active');

        // إخفاء وإظهار الفيديوهات
        const filterValue = btn.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            // التعديل هنا: بنقرأ القسم من data-category عشان العربي يشتغل
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === itemCategory) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// 2. تشغيل الشاشة المنبثقة (Lightbox)
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        // التعديل هنا: جلب مسار الفيديو من الـ play-overlay اللي جوه الكارت
        const overlay = item.querySelector('.play-overlay');
        const videoSrc = overlay.getAttribute('data-video'); 
        
        lightboxVideo.src = videoSrc; // وضع المسار داخل الفيديو
        lightbox.classList.add('active'); // إظهار الشاشة
        lightboxVideo.play(); // تشغيل الفيديو تلقائياً
    });
});

// 3. إغلاق الشاشة المنبثقة
function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxVideo.pause(); // إيقاف الفيديو
    lightboxVideo.src = ""; // تفريغ المسار عشان ميستهلكش نت في الخلفية
}

// الإغلاق عند الضغط على X
closeLightboxBtn.addEventListener('click', closeLightbox);

// الإغلاق عند الضغط على الخلفية السوداء
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

