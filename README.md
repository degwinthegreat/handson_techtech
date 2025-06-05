# 🌟 Web開発初心者向けハンズオン教材

このリポジトリは、Web開発初心者がHTML・CSS・JavaScriptを学ぶためのハンズオン教材です。

## 📁 プロジェクト構成

```
handson_techtech/
├── profile/          # プロフィールサイト（メイン教材）
├── lp/              # ランディングページ
├── myapp/           # Webアプリケーション
├── pacman/          # ゲーム
└── README.md        # このファイル
```

## 🎯 profile/ - プロフィールサイト解説

### 📋 学習目標
- HTMLの基本構造を理解する
- CSSでレイアウトとスタイリングを学ぶ
- シンプルなJavaScriptでアニメーションを実装する

---

## 📝 HTMLタグ解説

### 🔧 基本構造タグ
| タグ | 説明 | 例 |
|------|------|-----|
| `<!DOCTYPE html>` | HTML5文書宣言 | `<!DOCTYPE html>` |
| `<html>` | HTMLページ全体を囲む | `<html lang="ja">` |
| `<head>` | ページの設定情報（非表示） | `<head>...</head>` |
| `<body>` | 画面に表示される内容 | `<body>...</body>` |

### 📄 メタ情報タグ
| タグ | 説明 | 例 |
|------|------|-----|
| `<meta charset="UTF-8">` | 文字コード設定 | 日本語を正しく表示 |
| `<title>` | ブラウザタブのタイトル | `<title>プロフィール</title>` |
| `<link rel="stylesheet">` | CSSファイル読み込み | `<link rel="stylesheet" href="style.css">` |

### 🧭 構造・レイアウトタグ
| タグ | 説明 | 使用場面 |
|------|------|---------|
| `<nav>` | ナビゲーション | メニューバー |
| `<section>` | ページのセクション | ヒーロー、About、Skills |
| `<div>` | 汎用コンテナ | グループ化 |
| `<footer>` | フッター | ページ下部 |

### 📝 テキストタグ
| タグ | 説明 | 重要度 |
|------|------|---------|
| `<h1>` | 最重要見出し | ページタイトル |
| `<h2>`, `<h3>`, `<h4>` | サブ見出し | セクションタイトル |
| `<p>` | 段落 | 本文テキスト |
| `<span>` | インライン要素 | 文字の一部を装飾 |
| `<br>` | 改行 | 強制改行 |

### 🔗 リンク・リストタグ
| タグ | 説明 | 例 |
|------|------|-----|
| `<a href="#">` | リンク | `<a href="#about">私について</a>` |
| `<ul>` | 順序なしリスト | ナビメニュー |
| `<li>` | リスト項目 | メニュー項目 |

### 🎨 装飾タグ
| タグ | 説明 | 例 |
|------|------|-----|
| `<i class="fas fa-user">` | Font Awesomeアイコン | `<i class="fas fa-github"></i>` |

---

## 🎨 CSSプロパティ解説

### 📏 レイアウト関連

#### **Flexbox（横並びレイアウト）**
```css
.hero-content {
    display: flex;           /* 横並び配置 */
    width: 100%;            /* 幅いっぱい */
    align-items: center;    /* 縦方向中央寄せ */
    justify-content: center; /* 横方向中央寄せ */
}
```

#### **幅・高さ指定**
```css
.hero {
    width: 50%;          /* 幅を50%に設定 */
    height: 100vh;       /* 高さを画面全体に設定 */
    max-width: 1200px;   /* 最大幅制限 */
}
```

#### **余白調整**
```css
.container {
    margin: 0 auto;      /* 外側余白で中央寄せ */
    padding: 20px;       /* 内側余白 */
    margin-bottom: 30px; /* 下側のみ外側余白 */
}
```

### 🎯 位置調整

#### **固定配置**
```css
.navbar {
    position: fixed;     /* 画面に固定表示 */
    top: 0;             /* 上端からの位置 */
    width: 100%;        /* 幅いっぱい */
}
```

#### **中央寄せテクニック**
```css
/* テキストの中央寄せ */
.section-header {
    text-align: center;
}

/* 要素の中央寄せ */
.container {
    margin: 0 auto;
}

/* Flexboxで中央寄せ */
.image-placeholder {
    display: flex;
    align-items: center;     /* 縦方向 */
    justify-content: center; /* 横方向 */
}
```

### 🎨 見た目・装飾

#### **色設定**
```css
.hero {
    background: #667eea;    /* 背景色（16進数カラー） */
    color: white;           /* 文字色 */
}
```

#### **文字スタイル**
```css
.hero-title {
    font-size: 56px;        /* 文字サイズ */
    font-weight: bold;      /* 文字を太く */
    font-family: Arial;     /* フォント種類 */
}
```

#### **角丸・境界線**
```css
.image-placeholder {
    border-radius: 50%;           /* 角を丸く（50%で円形） */
    border: 2px solid white;      /* 枠線 */
}
```

#### **リンクスタイル**
```css
.nav-menu a {
    text-decoration: none;    /* 下線を消す */
    color: #333;             /* リンク色 */
}

.nav-menu {
    list-style: none;        /* リストの点を消す */
}
```

---

## 🏗️ 重要なレイアウトパターン

### 1. **コンテナパターン（中央寄せ）**
```css
.container {
    max-width: 1200px;   /* 最大幅制限 */
    margin: 0 auto;      /* 左右中央寄せ */
    padding: 0 20px;     /* 左右に余白 */
}
```
**用途**: ページ全体のコンテンツを画面中央に配置

### 2. **Flexbox 2カラムレイアウト**
```css
.hero-content {
    display: flex;       /* 横並び */
}
.hero-text {
    width: 50%;         /* 左側50% */
}
.hero-image {
    width: 50%;         /* 右側50% */
}
```
**用途**: テキストと画像を横並びに配置

### 3. **円形アイコン**
```css
.image-placeholder {
    width: 200px;
    height: 200px;
    border-radius: 50%;      /* 完全な円 */
    display: flex;
    align-items: center;
    justify-content: center;
}
```
**用途**: プロフィール画像やアイコンボタン

### 4. **固定ナビゲーション**
```css
.navbar {
    position: fixed;     /* 画面に固定 */
    top: 0;             /* 上端に配置 */
    width: 100%;        /* 幅いっぱい */
    background: white;   /* 背景色で隠す */
}
```
**用途**: スクロールしても消えないメニュー

---

## 💡 初心者向け学習ポイント

### ✅ **まず覚えるべき基本プロパティ**
1. **余白**: `margin`（外側）, `padding`（内側）
2. **サイズ**: `width`, `height`
3. **色**: `background`, `color`
4. **文字**: `font-size`, `font-weight`
5. **レイアウト**: `display: flex`

### ✅ **中央寄せの3つの方法**
1. **テキスト**: `text-align: center`
2. **ブロック要素**: `margin: 0 auto`
3. **Flexbox**: `align-items: center` + `justify-content: center`

### ✅ **クラス名の命名規則**
- `.hero`: メインビジュアル部分
- `.container`: コンテンツを囲む枠
- `.btn`: ボタン
- `.nav-`: ナビゲーション関連
- `.section-`: セクション関連

### ✅ **よくあるミス & 解決法**
| ミス | 原因 | 解決法 |
|------|------|--------|
| 要素が横並びにならない | `display: flex`を忘れ | 親要素に`display: flex`を追加 |
| 中央寄せができない | 方法の選択ミス | テキスト→`text-align`, 要素→`margin: 0 auto` |
| 円が楕円になる | 幅と高さが違う | `width`と`height`を同じ値に |

---

## 🚀 学習の進め方

### 1. **基礎固め**
- HTMLの基本タグを覚える
- CSSの基本プロパティを理解する
- 開発者ツールで実際の値を確認する

### 2. **実践練習**
- このプロフィールサイトのコードを読む
- 色やサイズを変更してみる
- 新しいセクションを追加してみる

### 3. **応用発展**
- 他のプロジェクト（lp/, myapp/, pacman/）に挑戦
- 自分だけのプロフィールサイトを作成

---

## 📚 参考リソース

- [MDN Web Docs](https://developer.mozilla.org/ja/) - HTML/CSS/JS公式リファレンス
- [Font Awesome](https://fontawesome.com/) - アイコンライブラリ
- [Google Fonts](https://fonts.google.com/) - Webフォント

---

**Happy Coding! 🎉**
