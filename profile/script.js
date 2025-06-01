// DOM要素の取得
const backToTopBtn = document.querySelector('.back-to-top');

// カウンターアニメーション
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.startTime = null;
        this.isAnimated = false;
    }

    animate() {
        if (this.isAnimated) return;
        this.isAnimated = true;

        const startValue = 0;
        const startTime = performance.now();

        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.duration, 1);

            // イージング関数（easeOutCubic）
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (this.target - startValue) * easeProgress);

            this.element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                this.element.textContent = this.target;
            }
        };

        requestAnimationFrame(step);
    }
}

// スキルバーアニメーション
class SkillBarAnimation {
    constructor(element, width) {
        this.element = element;
        this.targetWidth = parseInt(width);
        this.isAnimated = false;
    }

    animate() {
        if (this.isAnimated) return;
        this.isAnimated = true;

        this.element.style.width = '0%';

        setTimeout(() => {
            this.element.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            this.element.style.width = this.targetWidth + '%';
        }, 200);
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// 統計カウンター観察
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target.getAttribute('data-target');
            const counter = new CounterAnimation(entry.target, target);
            counter.animate();
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// スキルバー観察
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            const skillBar = new SkillBarAnimation(entry.target, width);
            skillBar.animate();
            skillsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// 要素のフェードインアニメーション
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// ユーティリティ関数
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

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
            <span class="notification-message">${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // スタイルを設定
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    `;

    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 16px;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    `;

    document.body.appendChild(notification);

    // アニメーション
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // 閉じるボタンのイベント
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });

    // 自動削除
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// パフォーマンス最適化
// 画像の遅延読み込み
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// スクロール位置の保存・復元
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});
