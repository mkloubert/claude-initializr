# Claude Initializr

**🌐 他の言語で読む：**
[🌍 العربية](README.ar.md) ·
[🇨🇳 中文](README.zh.md) ·
[🇳🇱 Nederlands](README.nl.md) ·
[🇬🇧 English](README.md) ·
[🇫🇷 Français](README.fr.md) ·
[🇩🇪 Deutsch](README.de.md) ·
[🇬🇷 Ελληνικά](README.el.md) ·
[🇮🇱 עברית](README.he.md) ·
[🇮🇳 हिन्दी](README.hi.md) ·
[🇮🇹 Italiano](README.it.md) ·
[🇯🇵 日本語](README.ja.md) ·
[🇰🇷 한국어](README.ko.md) ·
[🇵🇱 Polski](README.pl.md) ·
[🇵🇹 Português](README.pt.md) ·
[🇪🇸 Español](README.es.md) ·
[🇹🇷 Türkçe](README.tr.md) ·
[🇺🇦 Українська](README.uk.md) ·
[🇵🇰 اردو](README.ur.md)

---

[![ライセンス: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![寄付](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

[Claude Code](https://docs.anthropic.com/en/docs/claude-code)をコンテナ化環境で安全に実行するためのDocker設定ファイルを生成するWebアプリケーションです。

**ライブデモ：** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## 機能

### Dockerfile設定

- **ベースイメージ**：Dockerベースイメージの名前とバージョンを設定（デフォルト：`node:24`）
- **ソフトウェア選択**：インストールする追加ソフトウェアを選択：
  - ffmpeg（オーディオ/ビデオ処理）
  - Flutter（DartとAndroid SDKを含む）
  - Go
  - ImageMagick（画像処理）
  - Python 3
  - TypeScript
  - uv（高速Pythonパッケージインストーラー、Pythonを推奨）
- **バージョン設定**：ソフトウェアのバージョンはDockerビルド引数で設定（例：`--build-arg GO_VERSION=1.22.0`）
- **カスタムAPTパッケージ**：コンテナにインストールする追加のDebian/Ubuntuパッケージを追加
- **カスタムNPMパッケージ**：グローバルにインストールする追加のNPMパッケージを追加、`root`または`node`ユーザーとしてインストールするオプション付き
- **カスタムRUNコマンド**：`root`または`node`ユーザーとして実行するカスタムDockerfile RUNコマンドを追加
- **Claude Codeプラグイン**：`plugin-name@marketplace-name`形式でマーケットプレイスからClaude Codeプラグインをインストール
  - **プラグイン提案**：[公式Anthropicマーケットプレイス](https://github.com/anthropics/claude-plugins-official)からバックグラウンドで自動的にプラグイン提案を読み込み
  - ワンクリックで提案されたプラグインを追加
  - GitHubでプラグインを表示する外部リンク

### docker-compose.yaml設定

- **環境変数**：`.env`ファイル用の環境変数を設定
- **保護ファイル**：空の読み取り専用ファイルをマウントして保護するファイルを指定（`.env.local`などの機密ファイルへのアクセスを防止）

### CLAUDE.mdエディター

- シンタックスハイライト付きMarkdownエディター
- 組み込みプレビュー機能
- Claude用のプロジェクト固有の指示を記述

### settings.json設定

- **パーミッションルール**：ファイルアクセスを管理するためのClaude Codeパーミッションを設定
  - `Allow` - 自動的に許可される操作のルール
  - `Ask` - ユーザー確認が必要なルール
  - `Deny` - 常に拒否されるルール
- **サポートされるディレクティブ**：
  - `Read()` - Claudeが読み取れるファイルを決定（例：`Read(src/**)`）
  - `Edit()` - Claudeが編集できるファイルを決定（例：`Edit(.env)`）
  - `WebFetch()` - ネットワークアクセスを制御（例：`WebFetch(https://api.github.com:*)`）
- **自動統合**：保護されたファイルは自動的に`Read()`拒否ルールとして追加
- **Globパターンサポート**：再帰的マッチングには`src/**`のようなパターンを使用

### 一般機能

- **ライブプレビュー**：生成された設定ファイルのリアルタイムプレビューを表示
- **ZIPダウンロード**：すぐに使えるZIPアーカイブとしてすべてのファイルをダウンロード
- **自動保存**：設定はブラウザのlocalStorageに自動保存（デフォルトで有効）
- **多言語サポート**：18言語で利用可能：
  - 🌍 アラビア語
  - 🇨🇳 中国語
  - 🇳🇱 オランダ語
  - 🇬🇧 英語
  - 🇫🇷 フランス語
  - 🇩🇪 ドイツ語
  - 🇬🇷 ギリシャ語
  - 🇮🇱 ヘブライ語
  - 🇮🇳 ヒンディー語
  - 🇮🇹 イタリア語
  - 🇯🇵 日本語
  - 🇰🇷 韓国語
  - 🇵🇱 ポーランド語
  - 🇵🇹 ポルトガル語
  - 🇪🇸 スペイン語
  - 🇹🇷 トルコ語
  - 🇺🇦 ウクライナ語
  - 🇵🇰 ウルドゥー語
- **ダーク/ライトテーマ**：自動テーマ検出と手動切り替え
- **PWAサポート**：プログレッシブWebアプリとしてインストール可能
- **完全なアクセシビリティ**：キーボードナビゲーションとスクリーンリーダーサポートによるWCAG準拠
- **レスポンシブデザイン**：デスクトップとタブレットに最適化

### 自動保存メカニズム

自動保存機能はヘッダーの保存アイコンを使用して切り替えできます：

| アイコン       | 状態     | 動作                                                     |
| -------------- | -------- | -------------------------------------------------------- |
| 💾（保存）     | 有効     | すべての変更がlocalStorageに自動保存されます             |
| 🚫💾（オフ）   | 無効     | 変更は保存されません；既存の保存データはクリアされます   |

**動作の仕組み：**

- **自動保存を有効にする**：現在の設定を即座にlocalStorageに保存
- **自動保存を無効にする**：localStorageからすべての保存設定をクリア
- 自動保存の設定はセッション間で記憶されます

### プライバシーとデータストレージ

このアプリケーションはあなたのプライバシーを尊重します：

- **ローカルストレージのみ**：すべての設定はブラウザのローカルストレージ（localStorage）に保存されます
- **サーバー通信なし**：データがサーバーに送信されることはありません
- **設計によるセキュリティ**：環境変数の**値は保存されません** - 変数名のみが保存されます
- **完全なコントロール**：ヘッダーのトグルを使用していつでも自動保存を無効にでき、保存されたすべてのデータもクリアされます
- **セッションベースのテーマ**：ページリロード時にテーマ設定はシステムデフォルトにリセットされます

## セキュリティ機能

生成されたDocker設定には包括的なセキュリティ対策が含まれています：

### ネットワークファイアウォール

`init-firewall.sh`スクリプトは厳格なネットワーク分離を実装：

- **iptablesベースのファイアウォール**：すべての送信トラフィックにDROPポリシーを適用
- **許可リストのみのアプローチ** - 許可されたドメインのみアクセス可能：
  - `api.anthropic.com` - Claude API
  - `npm registry` - パッケージインストール
  - `github.com` - Git操作
  - `sentry.io` - エラー報告
- **自動GitHub IP解決**：Web、API、gitエンドポイント用
- **ホストネットワーク分離** - ローカルネットワークへのアクセスを防止
- **ファイアウォール検証** - ルールが正しく適用されていることをテストで確認

### Dockerセキュリティ強化

- **ケーパビリティの削除**：すべてのLinuxケーパビリティを削除（`cap_drop: ALL`）
- **特権昇格なし**：`no-new-privileges:true`
- **リソース制限**：CPUとメモリの制約
- **読み取り専用マウント**：保護ファイルは読み取り専用でマウント
- **非rootユーザーでの実行**：`node`ユーザーとして実行

## プリインストールツール

生成されたコンテナには以下が含まれます：

| カテゴリ           | ツール                              |
| ------------------ | ----------------------------------- |
| **シェル**         | zsh（Powerline10kテーマ）、bash     |
| **エディタ**       | nano、vim                           |
| **バージョン管理** | git、git-delta、GitHub CLI (gh)     |
| **ユーティリティ** | fzf、jq、less、unzip、man-db        |
| **ネットワーク**   | iptables、ipset、iproute2、dnsutils |

## はじめに

### 前提条件

- Node.js 20以上
- npm 10以上

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/mkloubert/claude-initializr.git
cd claude-initializr

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev

# 本番用にビルド
npm run build

# 本番ビルドをプレビュー
npm run preview
```

### 環境変数

環境変数を使用してアプリケーションをカスタマイズします。`.env`ファイルを作成：

```bash
# GitHubリポジトリURL（オプション、空にすると非表示）
VITE_GITHUB_URL=https://github.com/mkloubert/claude-initializr

# PayPal寄付URL（オプション、空にすると非表示）
VITE_PAYPAL_URL=https://paypal.me/mjkloubert

# Claude Code permissions documentation URL (optional)
VITE_PERMISSIONS_DOCS_URL=https://docs.anthropic.com/en/docs/claude-code/settings#permission-settings

# Author website URL (optional)
VITE_AUTHOR_URL=https://marcel.coffee

# Author name displayed in footer (optional)
VITE_AUTHOR_NAME=Marcel Joachim Kloubert
```

## 使用方法

1. **ベースイメージを設定**：Dockerベースイメージの名前とバージョンを設定（例：`node:24`または`node:22-slim`）

2. **ソフトウェアを選択**：コンテナにインストールする追加ソフトウェアを選択

3. **カスタムパッケージ＆コマンドを追加**：
   - カスタムAPTパッケージを追加（例：`curl`、`graphviz`、`sqlite3`）
   - グローバルにインストールするカスタムNPMパッケージを追加（例：`eslint`、`prettier`）
   - NPMパッケージを`node`（デフォルト）または`root`ユーザーとしてインストールするかを選択
   - ビルド中に実行するカスタムRUNコマンドを追加
   - 各RUNコマンドを`node`または`root`ユーザーとして実行するかを選択

4. **環境変数を設定**：プロジェクトに必要な環境変数を追加（例：`ANTHROPIC_API_KEY`）

5. **機密ファイルを保護**：保護するファイルのパスを追加（例：`.env.local`）

6. **CLAUDE.mdを編集**：MarkdownエディターでClaude用の指示を記述

7. **パーミッションを設定**：settings.jsonカードでパーミッションルールを設定
   - 自動承認される操作に`Allow`ルールを追加
   - 確認が必要な操作に`Ask`ルールを追加
   - 禁止される操作に`Deny`ルールを追加
   - 保護されたファイルは自動的に`Read()`拒否ルールとして追加

8. **プレビュー**：プレビュータブで生成された設定ファイルを確認

9. **ダウンロード**：「ZIPをダウンロード」をクリックしてすべてのファイルを取得

## 生成されたファイルの使用

1. プロジェクトディレクトリにZIPファイルを展開

2. プロジェクトファイルを`workspace`フォルダにコピー（または既存のプロジェクトをマウント）

3. `.env`ファイルにAPIキーを設定：

   ```bash
   ANTHROPIC_API_KEY=あなたのAPIキー
   ```

4. コンテナをビルドして起動：

   ```bash
   docker compose up --build
   ```

   **オプション：カスタムダウンロードURL**

   パッケージダウンロードにミラーやプロキシを使用する必要がある場合、ビルド時にデフォルトのURLを上書きできます。すべてのURLはクエリパラメータをサポートしています：

   ```bash
   docker compose build \
     --build-arg GO_JSON_URL=https://my-mirror.example.com/golang/?mode=json \
     --build-arg GO_DOWNLOAD_URL=https://my-mirror.example.com/golang \
     --build-arg FLUTTER_JSON_URL=https://my-mirror.example.com/flutter/releases_linux.json \
     --build-arg FLUTTER_BASE_URL=https://my-mirror.example.com/flutter/releases \
     --build-arg UV_INSTALL_SCRIPT_URL=https://my-mirror.example.com/uv/install.sh
   ```

   | ビルド引数 | デフォルト | 説明 |
   |------------|------------|------|
   | `GO_JSON_URL` | `https://go.dev/dl/?mode=json` | GoバージョンJSON API URL（"latest"選択時のみ） |
   | `GO_DOWNLOAD_URL` | `https://go.dev/dl` | Goアーカイブダウンロードのベースの URL |
   | `FLUTTER_JSON_URL` | `https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json` | FlutterリリースJSON API URL（"latest"選択時のみ） |
   | `FLUTTER_BASE_URL` | `https://storage.googleapis.com/flutter_infra_release/releases` | Flutterアーカイブダウンロードのベースの URL |
   | `UV_INSTALL_SCRIPT_URL` | `https://astral.sh/uv/install.sh` | uvインストールスクリプトURL |

5. コンテナに接続：

   ```bash
   docker compose exec claude zsh
   ```

6. ファイアウォールを初期化（sudoパスワードが必要）：

   ```bash
   sudo /usr/local/bin/init-firewall.sh
   ```

7. Claude Codeを起動：
   ```bash
   claude
   ```

## 生成されるファイル構造

```
├── workspace/
│   ├── .claude/
│   │   └── settings.json    # Claude設定
│   ├── .empty               # 保護マウント用の空ファイル
│   └── CLAUDE.md            # あなたのClaude指示
├── .env                     # 環境変数
├── Dockerfile               # コンテナ定義
├── docker-compose.yaml      # Docker Compose設定
└── init-firewall.sh         # ネットワークファイアウォールスクリプト
```

## トラブルシューティング

### ファイアウォールの問題

ファイアウォールを有効にした後にネットワークの問題が発生した場合：

```bash
# ファイアウォールの状態を確認
sudo iptables -L -n

# ブロックされた接続を表示
sudo iptables -L -n -v | grep DROP

# ファイアウォールをリセット（すべてのトラフィックを許可）
sudo iptables -F
```

### コンテナが起動しない

```bash
# ログを確認
docker compose logs

# キャッシュなしで再ビルド
docker compose build --no-cache
```

### 権限エラー

workspaceディレクトリに正しい権限があることを確認：

```bash
chmod -R 755 workspace
```

### アプリケーション設定のリセット

保存されたすべての設定をクリアして最初からやり直すには、ブラウザの開発者コンソールを開いて実行：

```javascript
localStorage.removeItem("claude-initializr-config");
localStorage.removeItem("claude-initializr-welcome-dismissed");
localStorage.removeItem("claude-initializr-autosave");
```

その後、ページをリロードします。

または、ヘッダーのトグルを使用して自動保存を無効にして、設定の保存を防ぐこともできます。

## 技術スタック

- [React 19](https://react.dev/)（TypeScriptとReact Compiler使用）
- [Vite](https://vite.dev/)（バンドラー）
- [Tailwind CSS v4](https://tailwindcss.com/)（OKLCHカラースペース）
- [shadcn/ui](https://ui.shadcn.com/)コンポーネント（40以上）
- [react-router](https://reactrouter.com/)（ルーティング）
- [i18next](https://www.i18next.com/)（国際化）
- [JSZip](https://stuk.github.io/jszip/)（ZIP生成）
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)（コードプレビュー）

## コントリビューション

コントリビューションを歓迎します！お気軽にPull Requestを送信してください。

1. リポジトリをフォーク
2. フィーチャーブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m '素晴らしい機能を追加'`）
4. ブランチにプッシュ（`git push origin feature/amazing-feature`）
5. Pull Requestを開く

### 新しい言語の追加

1. `src/i18n/locales/`に新しいロケールファイルを作成（例：`fr.json`）
2. `en.json`から構造をコピー
3. すべての文字列を翻訳
4. `src/i18n/index.ts`に言語を追加
5. `LanguageSwitcher.tsx`に言語オプションを追加

## アクセシビリティ

このアプリケーションは完全にアクセシブルに設計されています：

- セマンティックHTML構造（`<header>`、`<main>`、`<footer>`）
- すべてのインタラクティブ要素にARIAラベル
- キーボードナビゲーションサポート
- スクリーンリーダー対応
- ハイコントラストカラースキーム
- インタラクティブ要素のフォーカスインジケーター

## サポート

このプロジェクトが役立つと思ったら、サポートをご検討ください：

- ⭐ [GitHub](https://github.com/mkloubert/claude-initializr)でリポジトリにスターを付ける
- 💝 [PayPalで寄付](https://paypal.me/mjkloubert)

## ライセンス

MITライセンス - 詳細は[LICENSE](./LICENSE)を参照してください。

Copyright © 2026 Marcel Joachim Kloubert
