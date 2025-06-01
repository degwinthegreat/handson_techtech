// スキルバーのアニメーション
document.addEventListener('DOMContentLoaded', function() {
    // スキルバーの設定
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // ページ読み込み時にスキルバーをアニメーション
    skillBars.forEach(bar => {
        const width = bar.parentElement.parentElement.querySelector('.skill-level').textContent;
        const percentage = parseInt(width);
        bar.style.width = percentage + '%';
    });
    
    // 統計カウンターのアニメーション
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (target) {
            let current = 0;
            const increment = target / 50; // 50回に分けてカウント
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(counter);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 50);
        }
    });
});