// DOM要素の取得
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const navDots = document.querySelectorAll('.nav-dot');
const contactForm = document.querySelector('.contact-form');

// ハンバーガーメニューの動作
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ナビゲーションリンクのクリック時にメニューを閉じる
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ヘッダーのスクロール効果
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 受講生の声スライダー
let currentSlide = 0;
const totalSlides = testimonialCards.length;

function showSlide(index) {
    // すべてのカードを非表示
    testimonialCards.forEach(card => {
        card.classList.remove('active');
    });

    // すべてのドットを非アクティブ
    navDots.forEach(dot => {
        dot.classList.remove('active');
    });

    // 指定されたスライドを表示
    if (testimonialCards[index]) {
        testimonialCards[index].classList.add('active');
    }

    // 対応するドットをアクティブ
    if (navDots[index]) {
        navDots[index].classList.add('active');
    }
}

// ドットクリックイベント
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// 自動スライド
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// 5秒ごとに自動でスライドを切り替え
setInterval(nextSlide, 5000);

// 初期化
showSlide(0);

// コンタクトフォームの送信処理
contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();

    // フォームデータの取得
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // バリデーション
    if (!data.name || !data.email) {
        showNotification('お名前とメールアドレスは必須項目です。', 'error');
        return;
    }

    if (!isValidEmail(data.email)) {
        showNotification('正しいメールアドレスを入力してください。', 'error');
        return;
    }

    // 送信処理のシミュレーション
    showLoading();

    setTimeout(() => {
        hideLoading();
        showNotification('お申し込みありがとうございます！\n3営業日以内にご連絡いたします。', 'success');
        this.reset();
    }, 2000);
});

// メールアドレスのバリデーション
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 通知の表示
function showNotification(message, type = 'info') {
    // 既存の通知を削除
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // 新しい通知を作成
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    // 閉じるボタンのイベント
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });

    // 5秒後に自動で閉じる
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);

    // アニメーション
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

// ローディング表示
function showLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    loading.innerHTML = `
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>送信中...</p>
        </div>
    `;
    document.body.appendChild(loading);
}

function hideLoading() {
    const loading = document.querySelector('.loading-overlay');
    if (loading) {
        loading.remove();
    }
}

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.feature-card, .course-card, .instructor-card, .testimonial-card'
    );

    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// 統計カウンターアニメーション
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        if (element.textContent.includes('%')) {
            element.textContent = Math.floor(current) + '%';
        } else if (element.textContent.includes('ヶ月')) {
            element.textContent = Math.floor(current) + 'ヶ月';
        } else if (element.textContent.includes('万円')) {
            element.textContent = Math.floor(current) + '万円';
        }
    }, 20);
}

// 統計セクションが見えたときにカウンターアニメーションを開始
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('95%')) {
                    animateCounter(stat, 95);
                } else if (text.includes('3ヶ月')) {
                    animateCounter(stat, 3);
                } else if (text.includes('500万円')) {
                    animateCounter(stat, 500);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// コードアニメーションの改良
const codeLines = document.querySelectorAll('.code-line');
let currentLine = 0;

function typeCodeLine() {
    if (codeLines.length === 0) return;

    codeLines.forEach(line => line.classList.remove('typing'));
    codeLines[currentLine].classList.add('typing');
    currentLine = (currentLine + 1) % codeLines.length;
}

// 2秒ごとに次の行をタイプ
setInterval(typeCodeLine, 2000);

// ページ読み込み完了時の初期化
document.addEventListener('DOMContentLoaded', () => {
    // ヘッダーの初期状態設定
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    }

    // フォーカス時のエフェクト
    const formInputs = document.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});

// CSS for notifications and loading (動的に追加)
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        min-width: 300px;
        max-width: 500px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-content {
        padding: 1.5rem;
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        position: relative;
    }

    .notification-content i:first-child {
        font-size: 1.5rem;
        margin-top: 0.25rem;
    }

    .notification-content p {
        flex: 1;
        margin: 0;
        line-height: 1.5;
    }

    .notification-close {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0.5;
        transition: opacity 0.3s ease;
    }

    .notification-close:hover {
        opacity: 1;
    }

    .notification-success {
        border-left: 4px solid #10b981;
    }

    .notification-success .fa-check-circle {
        color: #10b981;
    }

    .notification-error {
        border-left: 4px solid #ef4444;
    }

    .notification-error .fa-exclamation-circle {
        color: #ef4444;
    }

    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }

    .loading-content {
        background: white;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
    }

    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #2563eb;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .form-group.focused label {
        color: #fbbf24;
        transform: scale(0.9);
    }

    .animate {
        animation: fadeInUp 0.6s ease forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .code-line.typing {
        animation: typewriter 2s steps(40) forwards;
    }

    @media (max-width: 768px) {
        .nav-menu.active {
            display: flex;
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            gap: 2rem;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }

        .notification {
            right: 10px;
            left: 10px;
            min-width: auto;
        }
    }
`;
document.head.appendChild(style);
