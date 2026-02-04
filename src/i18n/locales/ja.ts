// Copyright © 2026 Marcel Joachim Kloubert <marcel@kloubert.dev>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

import type { Translations } from './types';

const ja: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Claude Codeを安全に実行するためのDocker設定ファイルを生成"
  },
  "welcome": {
    "close": "ウェルカムメッセージを閉じる",
    "description": "Claude CodeはAnthropicの強力なAIコーディングアシスタントで、あなたのマシン上で直接コードを読み取り、書き込み、実行できます。非常に便利ですが、ファイルシステムとターミナルへのアクセス権を持つAIを実行するには、セキュリティを慎重に考慮する必要があります。",
    "purpose": "このツールは、Claude Codeを分離されたコンテナ環境で実行できる完全なDocker設定を生成します。あなたのコードは保護されたまま、Claudeは開発、デバッグ、リファクタリングを引き続きサポートできます。",
    "features": {
      "title": "設定できる内容：",
      "dockerfile": "インストールする開発ツールを選択（TypeScript、Python、Go、ffmpeg、ImageMagick）",
      "compose": "環境変数（APIキーなど）を設定し、機密ファイルをアクセスから保護",
      "claudeMd": "Claudeが各セッション開始時に読むプロジェクト固有の指示を記述",
      "devContainer": "シームレスな開発のためのVS Code Dev Container設定を生成"
    },
    "security": {
      "title": "含まれるセキュリティ機能：",
      "firewall": "Anthropic API、npm、GitHubへの接続のみを許可するネットワークファイアウォール",
      "isolation": "ホストシステムとローカルネットワークからの完全な分離",
      "readonly": "機密ファイルは空の読み取り専用ファイルとしてマウント",
      "capabilities": "すべてのLinux機能を削除、権限昇格を許可しない"
    },
    "privacy": {
      "title": "プライバシーに関する注意：",
      "description": "設定はブラウザにローカル保存（localStorage）され、戻ったときに保持されます。セキュリティ上の理由から、環境変数の値は保存されません—変数名のみが保存されます。データはサーバーに送信されません。ヘッダーの保存アイコンを使用していつでも自動保存を無効にできます—これにより、保存されたすべてのデータもクリアされます。"
    }
  },
  "nav": {
    "header": "ヘッダーナビゲーション"
  },
  "tabs": {
    "software": "ソフトウェア",
    "preview": "プレビュー",
    "settings": "設定",
    "envVariables": "環境",
    "env": "環境",
    "protectedFiles": "保護ファイル",
    "protected": "保護"
  },
  "language": {
    "switch": "言語"
  },
  "theme": {
    "switch": "テーマを切り替え"
  },
  "autosave": {
    "enable": "自動保存を有効化",
    "disable": "自動保存を無効化"
  },
  "reset": {
    "button": "デフォルトにリセット",
    "title": "設定をリセット",
    "description": "すべての設定をデフォルト値にリセットしてもよろしいですか？この操作は元に戻せません。",
    "cancel": "キャンセル",
    "confirm": "リセット"
  },
  "software": {
    "baseImage": "ベースイメージ",
    "baseImageDesc": "Dockerベースイメージはコンテナの基盤を決定します。デフォルトの'node'イメージにはNode.jsとnpmが含まれています。'node:22-slim'で小さいイメージ、'node:22-bookworm'で追加のシステムライブラリを使用することもできます。",
    "image": "イメージ",
    "typescript": "TypeScript",
    "typescriptDesc": "TypeScriptコンパイラ（tsc）とts-nodeをインストールしてTypeScriptを直接実行。TypeScriptプロジェクトに必須で、型チェック、JavaScriptへのコンパイル、手動コンパイルなしでの.tsファイル実行が可能。",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "音声・動画ファイルを処理する強力なマルチメディアフレームワーク。フォーマット変換、動画編集、音声抽出、ストリーミング、メディア分析が可能。メディアファイルを扱うプロジェクトに必要。",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "200以上のフォーマットをサポートする包括的な画像処理スイート。リサイズ、切り抜き、フォーマット変換、透かし、プログラムによる画像操作のツールを提供。自動画像ワークフローに最適。",
    "python": "Python 3",
    "pythonDesc": "pipパッケージマネージャー付きのPython 3インタープリターをインストール。Pythonスクリプトの実行、Pythonパッケージのインストール、Pythonベースのツールの使用が可能。データ処理、スクリプト、AI/MLタスクに便利。",
    "uv": "uv",
    "uvDesc": "Rustで書かれた超高速Pythonパッケージインストーラーおよびリゾルバーのuvをインストール。pip、pip-tools、virtualenvを置き換えてより高速な依存関係管理が可能。",
    "golang": "Go",
    "golangDesc": "公式コンパイラとツール付きのGo（Golang）プログラミング言語をインストール。高速で静的にコンパイルされたプログラム、CLIツール、Webサーバー、システムソフトウェアの構築に最適。",
    "flutter": "Flutter",
    "flutterDesc": "DartとAndroid開発ツールを含むFlutter SDKをインストール。単一のコードベースからモバイル、ウェブ、デスクトップ向けのクロスプラットフォームアプリを構築できます。Android SDKとコマンドラインツールが含まれています。",
    "rust": "Rust",
    "rustDesc": "rustupを通じてCargoパッケージマネージャー付きのRustプログラミング言語をインストール。高速でメモリ安全なシステムソフトウェア、CLIツール、WebAssembly、組み込みアプリケーションの構築に最適。",
    "version": "バージョン",
    "latest": "最新",
    "recommendsHint": "推奨: {{packages}}"
  },
  "aptPackages": {
    "title": "カスタムAPTパッケージ",
    "description": "コンテナにインストールする追加のDebian/Ubuntuパッケージを追加します。",
    "placeholder": "例: curl, graphviz, tree, sqlite3...",
    "add": "パッケージを追加",
    "remove": "{{package}}を削除"
  },
  "npmPackages": {
    "title": "カスタムNPMパッケージ",
    "description": "コンテナにグローバルインストールする追加のNPMパッケージを追加します。",
    "placeholder": "例: eslint, prettier, tsx...",
    "add": "パッケージを追加",
    "remove": "{{package}}を削除",
    "installAs": "インストールユーザー",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "{{package}}のインストールユーザーを切り替え"
  },
  "runCommands": {
    "title": "カスタムRUNコマンド",
    "description": "Dockerイメージビルド時に実行するカスタムシェルコマンドを追加します。",
    "placeholder": "例: flutter doctor",
    "add": "コマンドを追加",
    "remove": "コマンドを削除",
    "runAs": "実行ユーザー",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "コマンドの実行ユーザーを切り替え"
  },
  "env": {
    "description": "環境変数が定義されていません。",
    "key": "キー",
    "value": "値",
    "add": "変数を追加",
    "remove": "削除",
    "keyPlaceholder": "例: 変数名",
    "valuePlaceholder": "例: 値"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "CLAUDE.mdファイルには、Claudeが各セッション開始時に読むプロジェクト固有の指示が含まれています。ここはコーディングガイドライン、プロジェクト構造の説明、優先技術、またはClaudeがプロジェクトをより理解するのに役立つその他のコンテキストを記述する場所です。"
  },
  "protectedFiles": {
    "description": "保護ファイルが定義されていません。",
    "path": "ファイルパス",
    "add": "パスを追加",
    "remove": "削除",
    "pathPlaceholder": "例: .env.local",
    "help": "パスは/workspace/からの相対パスです。これらのファイルは機密データへのアクセスを防ぐため、空の読み取り専用ファイルとしてマウントされます。"
  },
  "settings": {
    "title": "settings.json",
    "description": "Claude Codeのパーミッションを設定して、読み取り、編集、取得できるファイルを制御します。保護されたファイルは自動的に拒否ルールとして追加されます。",
    "permissions": "パーミッション",
    "directive": "ディレクティブ",
    "pattern": "パターン",
    "patternPlaceholder": "例: src/** または .env",
    "addRule": "ルールを追加",
    "removeRule": "ルールを削除",
    "allow": "許可",
    "ask": "確認",
    "deny": "拒否",
    "noAllowRules": "許可ルールが定義されていません。",
    "noAskRules": "確認ルールが定義されていません。",
    "noDenyRules": "拒否ルールが定義されていません。",
    "help": "Read()、Edit()、WebFetch()操作のパーミッションルールを定義します。パターンはsrc/**のようなglobシンタックスで再帰的なマッチングをサポートします。",
    "learnMore": "詳しく見る"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "Dockerfileはコンテナにインストールするソフトウェアを定義します。Node.jsとClaude Codeに加えて、TypeScript、Python、Go、ffmpeg、ImageMagickなどの追加ツールを含めることができます。選択したソフトウェアはClaudeがコマンドを実行するときに利用可能になります。",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "docker-compose.yamlファイルはコンテナの起動方法を制御します。環境変数（APIキーなど）をここで定義できます。保護ファイルは空の読み取り専用ファイルとしてマウントされ、Claudeが.envファイルなどの機密データにアクセスするのを防ぎます。"
  },
  "dockerCompose": {
    "platform": "プラットフォーム",
    "platformDesc": "コンテナ用の特定のプラットフォームを設定します（例：linux/amd64）。デフォルトのプラットフォームを使用する場合は空のままにしてください。ベースイメージがアーキテクチャをサポートしていない場合に使用します。",
    "platformPlaceholder": "例: linux/amd64"
  },
  "download": {
    "button": "ZIPをダウンロード",
    "generating": "生成中...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "GitHubリポジトリ",
    "paypal": "PayPalでサポート"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "英語",
    "de": "ドイツ語",
    "es": "スペイン語",
    "fr": "フランス語",
    "it": "イタリア語",
    "pt": "ポルトガル語",
    "nl": "オランダ語",
    "ja": "日本語",
    "ko": "韓国語",
    "zh": "中国語",
    "ar": "アラビア語",
    "he": "ヘブライ語",
    "hi": "ヒンディー語",
    "ur": "ウルドゥー語",
    "uk": "ウクライナ語",
    "el": "ギリシャ語",
    "pl": "ポーランド語",
    "tr": "トルコ語"
  },
  "importExport": {
    "exportButton": "設定をエクスポート",
    "importButton": "設定をインポート",
    "exportSuccess": "設定が正常にエクスポートされました。",
    "importSuccess": "設定が正常にインポートされました。",
    "importErrorInvalidFile": "無効なファイル形式です。有効なJSONファイルを選択してください。",
    "importErrorValidation": "ファイルに無効な設定データが含まれています。",
    "importErrorRead": "ファイルを読み取れませんでした。もう一度お試しください。",
    "importConfirmTitle": "設定をインポート",
    "importConfirmDescription": "現在の設定が置き換えられます。この操作は元に戻せません。",
    "importConfirmApply": "適用",
    "importConfirmCancel": "キャンセル",
    "diffTitle": "変更プレビュー",
    "diffBaseImage": "ベースイメージ",
    "diffNodeVersion": "Nodeバージョン",
    "diffDockerPlatform": "Dockerプラットフォーム",
    "diffSoftware": "ソフトウェア",
    "diffAptPackages": "APTパッケージ",
    "diffNpmPackages": "NPMパッケージ",
    "diffRunCommands": "RUNコマンド",
    "diffEnvVariables": "環境変数",
    "diffProtectedFiles": "保護ファイル",
    "diffClaudeMd": "CLAUDE.md",
    "diffPermissions": "権限",
    "diffDevContainer": "DevContainer",
    "diffNoChanges": "変更は検出されませんでした。",
    "diffCurrent": "現在",
    "diffImported": "インポート",
    "diffChanged": "変更あり",
    "diffUnchanged": "変更なし"
  },
  "errors": {
    "invalidEnvKey": "無効な変数名です。文字、数字、アンダースコアのみを使用してください。",
    "duplicateEnvKey": "この変数名は既に存在します。",
    "invalidPath": "パスは相対パス（先頭に/なし）で、..を含めることはできません"
  },
  "readme": {
    "title": "Claude Code Docker設定",
    "generatedBy": "[Claude Initializr]({{url}})で生成",
    "languageSwitch": "{{language}}で読む",
    "intro": {
      "title": "この設定について",
      "description": "このフォルダには、Claude Codeを分離されたコンテナで安全に実行するためのDocker設定ファイルが含まれています。この設定は、ネットワーク分離、ファイル保護、AI支援開発のためのサンドボックス環境を提供します。"
    },
    "files": {
      "title": "ファイル概要",
      "dockerfile": "Dockerfile - すべての開発ツールを含むコンテナイメージを定義",
      "dockerCompose": "docker-compose.yaml - コンテナを起動するためのオーケストレーションファイル",
      "env": ".env - 環境変数（ここにAPIキーを追加）",
      "initFirewall": "init-firewall.sh - セキュリティのためのネットワークファイアウォールスクリプト",
      "workspace": "workspace/ - コンテナにマウントされる作業ディレクトリ",
      "claudeMd": "workspace/CLAUDE.md - Claudeのプロジェクト指示",
      "settingsJson": "workspace/.claude/settings.json - Claude Codeのパーミッション設定",
      "devcontainer": ".devcontainer/devcontainer.json - VS Code Dev Container設定"
    },
    "baseImage": {
      "title": "ベースイメージ",
      "description": "この設定は以下のDockerベースイメージを使用します：",
      "dockerHub": "Docker Hubで表示"
    },
    "platform": {
      "title": "プラットフォーム",
      "description": "コンテナは以下のプラットフォームで実行するよう設定されています："
    },
    "aptPackages": {
      "title": "システムパッケージ（APT）",
      "description": "以下のシステムパッケージがインストールされています："
    },
    "npmPackages": {
      "title": "追加NPMパッケージ",
      "description": "以下の追加NPMパッケージがグローバルにインストールされています：",
      "installedAs": "{{user}}としてインストール"
    },
    "envVariables": {
      "title": "環境変数",
      "description": "以下の環境変数が設定されています（セキュリティのため値は表示されません）：",
      "note": "コンテナを起動する前に、.envファイルに実際の値を追加してください。"
    },
    "protectedFiles": {
      "title": "保護ファイル",
      "description": "以下のファイルは保護され、空の読み取り専用ファイルとしてマウントされます："
    },
    "settingsJson": {
      "title": "パーミッション設定",
      "description": "Claude Codeは以下のパーミッションルールで設定されています：",
      "allow": "許可された操作（自動）",
      "ask": "確認が必要な操作",
      "deny": "拒否された操作"
    },
    "claudeMd": {
      "title": "プロジェクト指示",
      "description": "Claudeのプロジェクト固有の指示は以下で定義されています："
    },
    "quickStart": {
      "title": "クイックスタート",
      "step1": "Dockerをインストール（下の前提条件を参照）",
      "step2": "コンテナを起動：",
      "step2CustomVersions": "オプション：カスタムソフトウェアバージョンでビルド（下のDocker Build Argumentsを参照）：",
      "step3": "Claude Codeを起動：",
      "step4": "コンテナを停止：",
      "note": "workspaceフォルダはコンテナ内の/workspaceにマウントされます。ログインオプションについては下の認証セクションを参照してください。"
    },
    "authentication": {
      "title": "認証",
      "description": "Claude Codeは2つの認証方法をサポートしています。ニーズに最適なものを選択してください：",
      "apiKey": {
        "title": "オプション1：APIキー",
        "description": "`.env`ファイルでAPIキー（`ANTHROPIC_API_KEY`）を設定します。Claude Codeが自動的に使用します。",
        "pros": [
          "ヘッドレス/自動化環境で動作（CI/CD、コンテナ、SSH）",
          "ブラウザ不要",
          "使用制限なし（従量課金）",
          "すべての環境で信頼性が高い"
        ],
        "cons": [
          "APIコールごとに費用発生（標準API料金）",
          "APIキーの管理とセキュリティ対策が必要",
          "支出制限なしでは予期しない請求の可能性"
        ]
      },
      "browserLogin": {
        "title": "オプション2：ブラウザログイン（Claude Pro/Max/Team）",
        "description": "Claude Code内で`/login`を実行し、ブラウザ経由でサブスクリプションで認証します。",
        "pros": [
          "サブスクリプションに含まれる（予測可能な月額費用）",
          "追加のAPI費用なし",
          "Claude.aiと統一された請求"
        ],
        "cons": [
          "初回ログインにブラウザが必要",
          "週ごとにリセットされる使用制限あり",
          "コンテナ/SSHセッションで認証が維持されない場合あり"
        ]
      }
    },
    "buildArgs": {
      "title": "Docker Build Arguments",
      "description": "Dockerビルド中にソフトウェアバージョンとダウンロードURLを設定できます。デフォルト値を上書きするには `--build-arg 名前=値` を使用します。",
      "versionArgs": {
        "title": "バージョン引数",
        "description": "インストールするソフトウェアバージョンを制御："
      },
      "urlArgs": {
        "title": "URL引数",
        "description": "ミラーまたはプロキシ用のダウンロードURLを上書き："
      },
      "defaultValue": "デフォルト",
      "example": "カスタムバージョンの例："
    },
    "prerequisites": {
      "title": "前提条件",
      "description": "システムにDockerがインストールされている必要があります。オペレーティングシステムを選択してください：",
      "windows": {
        "title": "Windows",
        "steps": [
          "docker.com/products/docker-desktopからDocker Desktopをダウンロード",
          "インストーラーを実行し、セットアップウィザードに従う",
          "求められたらWSL 2バックエンドを有効にする（推奨）",
          "必要に応じてコンピューターを再起動",
          "Docker Desktopを開き、起動を待つ"
        ],
        "link": "公式Windowsインストールガイド"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "docker.com/products/docker-desktopからDocker Desktopをダウンロード",
          ".dmgファイルを開き、Dockerをアプリケーションにドラッグ",
          "アプリケーションフォルダからDockerを開く",
          "求められたら必要な権限を付与",
          "Dockerの起動を待つ（メニューバーのクジラアイコン）"
        ],
        "link": "公式macOSインストールガイド"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "パッケージインデックスを更新: sudo apt update",
          "Dockerをインストール: sudo apt install docker.io docker-compose-v2",
          "ユーザーをdockerグループに追加: sudo usermod -aG docker $USER",
          "グループの変更を有効にするためログアウトして再ログイン",
          "インストールを確認: docker --version"
        ],
        "link": "公式Linuxインストールガイド",
        "altNote": "またはGUI体験のためにDocker Desktopをインストール。"
      }
    },
    "troubleshooting": {
      "title": "トラブルシューティング",
      "issues": {
        "containerNotStarting": {
          "title": "コンテナが起動しない",
          "solutions": [
            "Dockerが実行中か確認: docker info",
            ".envファイルが存在しANTHROPIC_API_KEYが含まれているか確認",
            "ポートの競合を確認: docker ps",
            "コンテナログを表示: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "パーミッション拒否エラー",
          "solutions": [
            "Linuxでは、ユーザーがdockerグループに属していることを確認",
            "sudoで実行を試す（通常の使用には非推奨）",
            "workspaceフォルダのファイル権限を確認"
          ]
        },
        "networkIssues": {
          "title": "ネットワークまたはAPI接続の問題",
          "solutions": [
            "ファイアウォールスクリプトは特定のドメインのみを許可",
            "api.anthropic.comがネットワークからアクセス可能か確認",
            "コンテナ内のファイアウォールログを確認: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "コンテナ内でファイルにアクセスできない",
          "solutions": [
            "保護ファイルは意図的に空です - これは想定通り",
            "docker-compose.yamlのボリュームマウントを確認",
            "ホストにworkspaceフォルダが存在することを確認"
          ]
        }
      }
    },
    "links": {
      "title": "リンク",
      "initializer": "新しい設定を生成",
      "documentation": "Claude Code ドキュメント",
      "support": "問題を報告"
    },
    "author": {
      "title": "作者",
      "createdBy": "作成者",
      "support": "このプロジェクトを支援"
    },
    "software": {
      "title": "インストール済みソフトウェア",
      "description": "以下の開発ツールがインストールされています："
    },
    "devContainer": {
      "title": "VS Code Dev Container",
      "description": "この構成には、シームレスな開発のためのVS Code Dev Containerセットアップが含まれています。",
      "extensions": "以下のVS Code拡張機能が自動的にインストールされます：",
      "features": "以下のDev Container機能が含まれています：",
      "ports": "以下のポートが転送されます：",
      "commands": "設定されたライフサイクルコマンド：",
      "vscodeOpen": "VS Codeで開く",
      "codespacesOpen": "GitHub Codespacesで開く"
    }
  },
  "keyboardShortcuts": {
    "title": "キーボードショートカット",
    "description": "キーボードショートカットを使用して、素早くナビゲートしアクションを実行できます。",
    "openHelp": "キーボードショートカット",
    "categories": {
      "navigation": "ナビゲーション",
      "actions": "アクション"
    },
    "shortcuts": {
      "downloadZip": "ZIPをダウンロード",
      "forceSave": "強制保存",
      "resetDefaults": "デフォルトにリセット",
      "togglePreview": "プレビューを切り替え",
      "scrollToCard": "カード{{number}}にスクロール",
      "toggleDarkMode": "ダークモードを切り替え",
      "openLanguageSwitcher": "言語切り替えを開く",
      "closeDialog": "ダイアログを閉じる",
      "openShortcutsHelp": "キーボードショートカットを開く"
    },
    "announced": {
      "downloadStarted": "ダウンロードを開始しました",
      "configReset": "設定をデフォルトにリセットしました",
      "darkModeToggled": "ダークモードを切り替えました",
      "previewToggled": "プレビューを切り替えました",
      "scrolledToCard": "カード{{number}}にスクロールしました"
    }
  },
  "devContainer": {
    "title": "DevContainer",
    "description": "VS Code Dev ContainersとGitHub Codespacesのサポートを設定します。これにより、開発環境を定義するdevcontainer.jsonファイルが生成されます。",
    "enable": "DevContainerを有効にする",
    "enableDesc": "VS Code Dev ContainersとGitHub Codespaces用のdevcontainer.jsonファイルを生成します。",
    "name": "コンテナ名",
    "nameDesc": "開発コンテナの表示名。",
    "namePlaceholder": "例：マイ開発環境",
    "tabs": {
      "settings": "設定",
      "extensions": "拡張機能",
      "features": "機能",
      "ports": "ポート",
      "preview": "プレビュー"
    },
    "extensions": {
      "title": "VS Code拡張機能",
      "description": "コンテナ作成時に自動的にインストールされる拡張機能。",
      "placeholder": "例：ms-python.python",
      "add": "拡張機能を追加",
      "remove": "{{extension}}を削除",
      "recommended": "推奨拡張機能",
      "recommendedDesc": "選択したソフトウェアに基づいて、これらの拡張機能が推奨されます。",
      "addRecommended": "推奨を追加",
      "noRecommendations": "現在のソフトウェア選択に基づく推奨はありません。"
    },
    "features": {
      "title": "Dev Container機能",
      "description": "機能は、インストールコードと設定の自己完結型ユニットです。",
      "placeholder": "例：ghcr.io/devcontainers/features/python:1",
      "add": "機能を追加",
      "remove": "{{feature}}を削除",
      "recommended": "推奨機能",
      "recommendedDesc": "選択したソフトウェアに基づいて、これらの機能が推奨されます。",
      "addRecommended": "推奨を追加",
      "noRecommendations": "現在のソフトウェア選択に基づく推奨はありません。"
    },
    "ports": {
      "title": "転送ポート",
      "description": "コンテナからホストに自動的に転送されるポート。",
      "placeholder": "例：3000",
      "add": "ポートを追加",
      "remove": "ポート{{port}}を削除",
      "invalid": "有効なポート番号を入力してください（1-65535）。"
    },
    "scripts": {
      "title": "ライフサイクルスクリプト",
      "description": "コンテナのライフサイクルの異なる段階で実行されるBashスクリプト。各スクリプトは個別の.shファイルとして保存されます。",
      "tabs": {
        "postCreate": "post-create.sh",
        "postStart": "post-start.sh",
        "postAttach": "post-attach.sh"
      },
      "postCreateTitle": "Post Createスクリプト",
      "postCreateDesc": "コンテナ作成後に一度だけ実行されます。依存関係のインストールなどの一度きりのセットアップに使用します。",
      "postStartTitle": "Post Startスクリプト",
      "postStartDesc": "コンテナ起動時に毎回実行されます。起動のたびに実行する必要があるタスクに使用します。",
      "postAttachTitle": "Post Attachスクリプト",
      "postAttachDesc": "VS Codeがコンテナに接続するたびに実行されます。",
      "editorPlaceholder": "# ここにbashコマンドを入力してください..."
    },
    "settings": {
      "title": "VS Code設定",
      "description": "開発コンテナのカスタムVS Code設定。",
      "key": "設定キー",
      "value": "値",
      "keyPlaceholder": "例：editor.formatOnSave",
      "valuePlaceholder": "例：true",
      "add": "設定を追加",
      "remove": "設定を削除"
    }
  }
};

export default ja;
