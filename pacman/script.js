class PacmanGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.livesElement = document.getElementById('lives');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.finalScoreElement = document.getElementById('finalScore');
        
        // ゲーム設定
        this.tileSize = 20;
        this.rows = 30;
        this.cols = 40;
        
        // ゲーム状態
        this.score = 0;
        this.lives = 3;
        this.gameRunning = false;
        this.gamePaused = false;
        
        // プレイヤー
        this.pacman = {
            x: 19,
            y: 15,
            direction: 'right',
            nextDirection: 'right',
            mouthOpen: true
        };
        
        // ゴースト
        this.ghosts = [
            { x: 19, y: 12, direction: 'up', color: '#ff0000', targetX: 19, targetY: 12 },
            { x: 18, y: 12, direction: 'down', color: '#ffb8ff', targetX: 18, targetY: 12 },
            { x: 20, y: 12, direction: 'left', color: '#00ffff', targetX: 20, targetY: 12 },
            { x: 21, y: 12, direction: 'right', color: '#ffb852', targetX: 21, targetY: 12 }
        ];
        
        // マップ (1=壁, 0=道, 2=ドット, 3=パワーアップ)
        this.map = this.generateMap();
        this.dotsRemaining = this.countDots();
        
        this.setupEventListeners();
        this.gameLoop();
    }
    
    generateMap() {
        // シンプルなマップを生成
        const map = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
        
        // 外壁を作成
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (x === 0 || x === this.cols - 1 || y === 0 || y === this.rows - 1) {
                    map[y][x] = 1;
                }
            }
        }
        
        // 内部の壁を追加
        for (let y = 2; y < this.rows - 2; y += 4) {
            for (let x = 2; x < this.cols - 2; x += 4) {
                if (Math.random() > 0.3) {
                    map[y][x] = 1;
                    if (x + 1 < this.cols - 1) map[y][x + 1] = 1;
                    if (y + 1 < this.rows - 1) map[y + 1][x] = 1;
                }
            }
        }
        
        // ドットを配置
        for (let y = 1; y < this.rows - 1; y++) {
            for (let x = 1; x < this.cols - 1; x++) {
                if (map[y][x] === 0) {
                    // パックマンとゴーストの初期位置周辺は空にする
                    if (Math.abs(x - 19) <= 2 && Math.abs(y - 15) <= 2) continue;
                    if (Math.abs(x - 19) <= 2 && Math.abs(y - 12) <= 2) continue;
                    
                    map[y][x] = 2; // ドット
                }
            }
        }
        
        // パワーアップアイテムを配置
        const powerUpPositions = [
            [3, 3], [36, 3], [3, 26], [36, 26]
        ];
        powerUpPositions.forEach(([x, y]) => {
            if (map[y] && map[y][x] !== undefined) {
                map[y][x] = 3;
            }
        });
        
        return map;
    }
    
    countDots() {
        let count = 0;
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.map[y][x] === 2 || this.map[y][x] === 3) {
                    count++;
                }
            }
        }
        return count;
    }
    
    setupEventListeners() {
        // キーボード操作
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning || this.gamePaused) return;
            
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    this.pacman.nextDirection = 'up';
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    this.pacman.nextDirection = 'down';
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    this.pacman.nextDirection = 'left';
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    this.pacman.nextDirection = 'right';
                    break;
            }
        });
        
        // ボタンイベント
        document.getElementById('startBtn').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('pauseBtn').addEventListener('click', () => {
            this.togglePause();
        });
        
        document.getElementById('restartBtn').addEventListener('click', () => {
            this.restartGame();
        });
    }
    
    startGame() {
        this.gameRunning = true;
        this.gamePaused = false;
        this.gameOverScreen.style.display = 'none';
    }
    
    togglePause() {
        if (this.gameRunning) {
            this.gamePaused = !this.gamePaused;
        }
    }
    
    restartGame() {
        this.score = 0;
        this.lives = 3;
        this.gameRunning = false;
        this.gamePaused = false;
        this.pacman = {
            x: 19,
            y: 15,
            direction: 'right',
            nextDirection: 'right',
            mouthOpen: true
        };
        this.map = this.generateMap();
        this.dotsRemaining = this.countDots();
        this.gameOverScreen.style.display = 'none';
        this.updateUI();
    }
    
    canMove(x, y) {
        return x >= 0 && x < this.cols && y >= 0 && y < this.rows && this.map[y][x] !== 1;
    }
    
    movePacman() {
        // 方向転換チェック
        const directions = {
            up: { x: 0, y: -1 },
            down: { x: 0, y: 1 },
            left: { x: -1, y: 0 },
            right: { x: 1, y: 0 }
        };
        
        const nextDir = directions[this.pacman.nextDirection];
        if (this.canMove(this.pacman.x + nextDir.x, this.pacman.y + nextDir.y)) {
            this.pacman.direction = this.pacman.nextDirection;
        }
        
        const currentDir = directions[this.pacman.direction];
        const newX = this.pacman.x + currentDir.x;
        const newY = this.pacman.y + currentDir.y;
        
        if (this.canMove(newX, newY)) {
            this.pacman.x = newX;
            this.pacman.y = newY;
            
            // アイテム取得チェック
            if (this.map[newY][newX] === 2) {
                this.map[newY][newX] = 0;
                this.score += 10;
                this.dotsRemaining--;
            } else if (this.map[newY][newX] === 3) {
                this.map[newY][newX] = 0;
                this.score += 50;
                this.dotsRemaining--;
            }
        }
        
        // 口の開閉アニメーション
        this.pacman.mouthOpen = !this.pacman.mouthOpen;
    }
    
    moveGhosts() {
        this.ghosts.forEach(ghost => {
            const directions = ['up', 'down', 'left', 'right'];
            const directionDeltas = {
                up: { x: 0, y: -1 },
                down: { x: 0, y: 1 },
                left: { x: -1, y: 0 },
                right: { x: 1, y: 0 }
            };
            
            // ランダムに方向を変更
            if (Math.random() < 0.1) {
                const possibleDirections = directions.filter(dir => {
                    const delta = directionDeltas[dir];
                    return this.canMove(ghost.x + delta.x, ghost.y + delta.y);
                });
                
                if (possibleDirections.length > 0) {
                    ghost.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                }
            }
            
            const delta = directionDeltas[ghost.direction];
            const newX = ghost.x + delta.x;
            const newY = ghost.y + delta.y;
            
            if (this.canMove(newX, newY)) {
                ghost.x = newX;
                ghost.y = newY;
            } else {
                // 壁にぶつかったら別の方向を選ぶ
                const possibleDirections = directions.filter(dir => {
                    const delta = directionDeltas[dir];
                    return this.canMove(ghost.x + delta.x, ghost.y + delta.y);
                });
                
                if (possibleDirections.length > 0) {
                    ghost.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                }
            }
        });
    }
    
    checkCollisions() {
        // ゴーストとの衝突チェック
        for (let ghost of this.ghosts) {
            if (this.pacman.x === ghost.x && this.pacman.y === ghost.y) {
                this.lives--;
                if (this.lives <= 0) {
                    this.gameOver();
                    return;
                } else {
                    // パックマンを初期位置に戻す
                    this.pacman.x = 19;
                    this.pacman.y = 15;
                }
            }
        }
        
        // 全てのドットを取得したかチェック
        if (this.dotsRemaining <= 0) {
            this.score += 1000;
            this.map = this.generateMap();
            this.dotsRemaining = this.countDots();
        }
    }
    
    gameOver() {
        this.gameRunning = false;
        this.finalScoreElement.textContent = this.score;
        this.gameOverScreen.style.display = 'block';
    }
    
    updateUI() {
        this.scoreElement.textContent = this.score;
        this.livesElement.textContent = this.lives;
    }
    
    draw() {
        // 画面をクリア
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // マップを描画
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                const pixelX = x * this.tileSize;
                const pixelY = y * this.tileSize;
                
                switch(this.map[y][x]) {
                    case 1: // 壁
                        this.ctx.fillStyle = '#0000ff';
                        this.ctx.fillRect(pixelX, pixelY, this.tileSize, this.tileSize);
                        break;
                    case 2: // ドット
                        this.ctx.fillStyle = '#ffff00';
                        this.ctx.beginPath();
                        this.ctx.arc(
                            pixelX + this.tileSize / 2,
                            pixelY + this.tileSize / 2,
                            2, 0, Math.PI * 2
                        );
                        this.ctx.fill();
                        break;
                    case 3: // パワーアップ
                        this.ctx.fillStyle = '#ffff00';
                        this.ctx.beginPath();
                        this.ctx.arc(
                            pixelX + this.tileSize / 2,
                            pixelY + this.tileSize / 2,
                            6, 0, Math.PI * 2
                        );
                        this.ctx.fill();
                        break;
                }
            }
        }
        
        // パックマンを描画
        this.drawPacman();
        
        // ゴーストを描画
        this.ghosts.forEach(ghost => this.drawGhost(ghost));
        
        // ポーズ中の表示
        if (this.gamePaused) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#ffff00';
            this.ctx.font = '48px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('一時停止', this.canvas.width / 2, this.canvas.height / 2);
        }
    }
    
    drawPacman() {
        const pixelX = this.pacman.x * this.tileSize + this.tileSize / 2;
        const pixelY = this.pacman.y * this.tileSize + this.tileSize / 2;
        const radius = this.tileSize / 2 - 2;
        
        this.ctx.fillStyle = '#ffff00';
        this.ctx.beginPath();
        
        if (this.pacman.mouthOpen) {
            const angles = {
                right: [0.2 * Math.PI, 1.8 * Math.PI],
                left: [1.2 * Math.PI, 0.8 * Math.PI],
                up: [1.7 * Math.PI, 1.3 * Math.PI],
                down: [0.7 * Math.PI, 0.3 * Math.PI]
            };
            
            const [startAngle, endAngle] = angles[this.pacman.direction];
            this.ctx.arc(pixelX, pixelY, radius, startAngle, endAngle);
            this.ctx.lineTo(pixelX, pixelY);
        } else {
            this.ctx.arc(pixelX, pixelY, radius, 0, Math.PI * 2);
        }
        
        this.ctx.fill();
    }
    
    drawGhost(ghost) {
        const pixelX = ghost.x * this.tileSize + this.tileSize / 2;
        const pixelY = ghost.y * this.tileSize + this.tileSize / 2;
        const radius = this.tileSize / 2 - 2;
        
        this.ctx.fillStyle = ghost.color;
        
        // ゴーストの体
        this.ctx.beginPath();
        this.ctx.arc(pixelX, pixelY - radius / 2, radius, Math.PI, 0);
        this.ctx.rect(pixelX - radius, pixelY - radius / 2, radius * 2, radius * 1.5);
        this.ctx.fill();
        
        // ゴーストの底の波模様
        this.ctx.beginPath();
        this.ctx.moveTo(pixelX - radius, pixelY + radius);
        for (let i = 0; i < 4; i++) {
            const x = pixelX - radius + (i * radius / 2);
            const y = pixelY + radius - (i % 2) * 4;
            this.ctx.lineTo(x, y);
        }
        this.ctx.lineTo(pixelX + radius, pixelY + radius);
        this.ctx.fill();
        
        // 目
        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.arc(pixelX - 4, pixelY - 4, 3, 0, Math.PI * 2);
        this.ctx.arc(pixelX + 4, pixelY - 4, 3, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = '#000';
        this.ctx.beginPath();
        this.ctx.arc(pixelX - 4, pixelY - 4, 1, 0, Math.PI * 2);
        this.ctx.arc(pixelX + 4, pixelY - 4, 1, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    gameLoop() {
        if (this.gameRunning && !this.gamePaused) {
            this.movePacman();
            this.moveGhosts();
            this.checkCollisions();
            this.updateUI();
        }
        
        this.draw();
        
        setTimeout(() => this.gameLoop(), 150);
    }
}

// ゲーム開始
window.addEventListener('load', () => {
    new PacmanGame();
});
