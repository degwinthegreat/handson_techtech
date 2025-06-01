// スキルバーのアニメーション
document.addEventListener('DOMContentLoaded', function() {
    // スキルバーの設定
    const skillBars = document.querySelectorAll('.skill-progress');

    // ページ読み込み時にスキルバーをゆっくりアニメーション
    skillBars.forEach((bar, index) => {
        const width = bar.parentElement.parentElement.querySelector('.skill-level').textContent;
        const percentage = parseInt(width);

        // 初期状態は幅0
        bar.style.width = '0%';

        // 少し遅延してからアニメーション開始（順番に表示）
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, index * 200); // 200ms間隔で順番に表示
    });

    // 統計カウンターのアニメーション
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (target) {
            let current = 0;
            const increment = target / 100; // 50回に分けてカウント

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
