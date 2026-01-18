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

const zh: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "生成Docker配置文件以安全运行Claude Code"
  },
  "welcome": {
    "close": "关闭欢迎消息",
    "description": "Claude Code是Anthropic强大的AI编程助手，可以直接在您的机器上读取、编写和执行代码。虽然非常有用，但运行具有文件系统和终端访问权限的AI需要仔细考虑安全性。",
    "purpose": "此工具生成完整的Docker配置，允许您在隔离的容器环境中运行Claude Code。您的代码保持受保护状态，同时Claude仍可帮助您开发、调试和重构。",
    "features": {
      "title": "您可以配置的内容：",
      "dockerfile": "选择要安装的开发工具（TypeScript、Python、Go、ffmpeg、ImageMagick）",
      "compose": "设置环境变量（如您的API密钥）并保护敏感文件免受访问",
      "claudeMd": "编写Claude在每次会话开始时读取的项目特定说明"
    },
    "security": {
      "title": "包含的安全功能：",
      "firewall": "网络防火墙仅允许连接到Anthropic API、npm和GitHub",
      "isolation": "与主机系统和本地网络完全隔离",
      "readonly": "敏感文件挂载为空的只读文件",
      "capabilities": "删除所有Linux功能，不允许权限提升"
    },
    "privacy": {
      "title": "隐私声明：",
      "description": "您的设置本地存储在浏览器中（localStorage），以便在您返回时保留。出于安全原因，环境变量的值永远不会被存储——只保存变量名。没有数据发送到任何服务器。您可以随时使用标题中的保存图标禁用自动保存——这也将清除所有存储的数据。"
    }
  },
  "nav": {
    "header": "页眉导航"
  },
  "tabs": {
    "software": "软件",
    "preview": "预览",
    "settings": "设置",
    "envVariables": "环境",
    "env": "环境",
    "protectedFiles": "受保护文件",
    "protected": "受保护"
  },
  "language": {
    "switch": "语言"
  },
  "theme": {
    "switch": "切换主题"
  },
  "autosave": {
    "enable": "启用自动保存",
    "disable": "禁用自动保存"
  },
  "reset": {
    "button": "重置为默认值",
    "title": "重置设置",
    "description": "您确定要将所有设置重置为默认值吗？此操作无法撤消。",
    "cancel": "取消",
    "confirm": "重置"
  },
  "software": {
    "baseImage": "基础镜像",
    "baseImageDesc": "Docker基础镜像决定了容器的基础。默认的'node'镜像包含Node.js和npm。您还可以使用'node:22-slim'等变体获得更小的镜像，或使用'node:22-bookworm'获得额外的系统库。",
    "image": "镜像",
    "typescript": "TypeScript",
    "typescriptDesc": "安装TypeScript编译器（tsc）和ts-node以直接运行TypeScript。对TypeScript项目必不可少，可进行类型检查、编译为JavaScript和运行.ts文件而无需手动编译。",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "用于处理音频和视频文件的强大多媒体框架。支持格式转换、视频编辑、音频提取、流媒体和媒体分析。处理媒体文件的项目需要它。",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "支持200多种格式的综合图像处理套件。提供调整大小、裁剪、格式转换、水印和编程图像处理的工具。非常适合自动化图像工作流程。",
    "python": "Python 3",
    "pythonDesc": "安装带有pip包管理器的Python 3解释器。可以运行Python脚本、安装Python包和使用基于Python的工具。适用于数据处理、脚本编写和AI/ML任务。",
    "uv": "uv",
    "uvDesc": "安装uv，一个用Rust编写的极速Python包安装和解析工具。可替代pip、pip-tools和virtualenv，实现更快的依赖管理。",
    "golang": "Go",
    "golangDesc": "安装带有官方编译器和工具的Go（Golang）编程语言。非常适合构建快速、静态编译的程序、CLI工具、Web服务器和系统软件。",
    "flutter": "Flutter",
    "flutterDesc": "安装包含Dart和Android开发工具的Flutter SDK。从单一代码库构建跨平台的移动、网页和桌面应用程序。包含Android SDK和命令行工具。",
    "rust": "Rust",
    "rustDesc": "通过rustup安装带有Cargo包管理器的Rust编程语言。非常适合构建快速、内存安全的系统软件、CLI工具、WebAssembly和嵌入式应用程序。",
    "version": "版本",
    "latest": "最新",
    "recommendsHint": "推荐: {{packages}}"
  },
  "aptPackages": {
    "title": "自定义APT软件包",
    "description": "添加要在容器中安装的额外Debian/Ubuntu软件包。",
    "placeholder": "示例: curl, graphviz, tree, sqlite3...",
    "add": "添加软件包",
    "remove": "删除 {{package}}"
  },
  "npmPackages": {
    "title": "自定义NPM软件包",
    "description": "添加要在容器中全局安装的额外NPM软件包。",
    "placeholder": "示例: eslint, prettier, tsx...",
    "add": "添加软件包",
    "remove": "删除 {{package}}",
    "installAs": "安装用户",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "切换 {{package}} 的安装用户"
  },
  "runCommands": {
    "title": "自定义RUN命令",
    "description": "添加在Docker镜像构建期间执行的自定义shell命令。",
    "placeholder": "示例: flutter doctor",
    "add": "添加命令",
    "remove": "删除命令",
    "runAs": "运行用户",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "切换命令的运行用户"
  },
  "plugins": {
    "title": "Claude Code 插件",
    "description": "从市场安装 Claude Code 插件。",
    "placeholder": "插件名称@市场名称",
    "add": "添加插件",
    "remove": "删除插件",
    "formatHint": "格式: 插件名称@市场名称",
    "invalidFormat": "格式无效。请使用 plugin@marketplace",
    "suggestions": "推荐插件",
    "loadingSuggestions": "正在加载建议...",
    "addFromMarketplace": "从 {{marketplace}} 添加 {{plugin}}",
    "viewOnGitHub": "在 GitHub 上查看 {{plugin}}"
  },
  "env": {
    "description": "未定义环境变量。",
    "key": "键",
    "value": "值",
    "add": "添加变量",
    "remove": "删除",
    "keyPlaceholder": "示例: 变量名称",
    "valuePlaceholder": "示例: 值"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "CLAUDE.md文件包含Claude在每次会话开始时读取的项目特定说明。这是编码指南、项目结构说明、首选技术或任何其他帮助Claude更好理解项目的上下文的地方。"
  },
  "protectedFiles": {
    "description": "未定义受保护文件。",
    "path": "文件路径",
    "add": "添加路径",
    "remove": "删除",
    "pathPlaceholder": "示例: .env.local",
    "help": "路径相对于/workspace/。这些文件将挂载为空的只读文件，以防止访问敏感数据。"
  },
  "settings": {
    "title": "settings.json",
    "description": "配置 Claude Code 权限以控制哪些文件可以被读取、编辑或获取。受保护的文件会自动添加为拒绝规则。",
    "permissions": "权限",
    "directive": "指令",
    "pattern": "模式",
    "patternPlaceholder": "示例: src/** 或 .env",
    "addRule": "添加规则",
    "removeRule": "删除规则",
    "allow": "允许",
    "ask": "询问",
    "deny": "拒绝",
    "noAllowRules": "未定义允许规则。",
    "noAskRules": "未定义询问规则。",
    "noDenyRules": "未定义拒绝规则。",
    "help": "为 Read()、Edit() 和 WebFetch() 操作定义权限规则。模式支持 glob 语法，如 src/** 用于递归匹配。",
    "learnMore": "了解更多"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "Dockerfile定义在容器中安装哪些软件。除了Node.js和Claude Code外，还可以包含TypeScript、Python、Go、ffmpeg或ImageMagick等附加工具。当Claude执行命令时，所选软件将可用。",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "docker-compose.yaml文件控制容器的启动方式。可以在此定义环境变量（如API密钥）。受保护文件挂载为空的只读文件，以防止Claude访问.env文件等敏感数据。"
  },
  "dockerCompose": {
    "platform": "平台",
    "platformDesc": "为容器设置特定平台（例如linux/amd64）。留空以使用默认平台。当基础镜像不支持您的架构时使用此选项。",
    "platformPlaceholder": "示例: linux/amd64"
  },
  "download": {
    "button": "下载ZIP",
    "generating": "生成中...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "GitHub仓库",
    "paypal": "通过PayPal支持"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "英语",
    "de": "德语",
    "es": "西班牙语",
    "fr": "法语",
    "it": "意大利语",
    "pt": "葡萄牙语",
    "nl": "荷兰语",
    "ja": "日语",
    "ko": "韩语",
    "zh": "中文",
    "ar": "阿拉伯语",
    "he": "希伯来语",
    "hi": "印地语",
    "ur": "乌尔都语",
    "uk": "乌克兰语",
    "el": "希腊语",
    "pl": "波兰语",
    "tr": "土耳其语"
  },
  "errors": {
    "invalidEnvKey": "变量名无效。只能使用字母、数字和下划线。",
    "duplicateEnvKey": "此变量名已存在。",
    "invalidPath": "路径必须是相对路径（不能以/开头）且不能包含.."
  },
  "readme": {
    "title": "Claude Code Docker 配置",
    "generatedBy": "由 [Claude Initializr]({{url}}) 生成",
    "languageSwitch": "阅读{{language}}版本",
    "intro": {
      "title": "关于此配置",
      "description": "此文件夹包含用于在隔离容器中安全运行 Claude Code 的 Docker 配置文件。该配置提供网络隔离、文件保护和 AI 辅助开发的沙盒环境。"
    },
    "files": {
      "title": "文件概述",
      "dockerfile": "Dockerfile - 定义包含所有开发工具的容器镜像",
      "dockerCompose": "docker-compose.yaml - 用于启动容器的编排文件",
      "env": ".env - 环境变量（在此添加您的 API 密钥）",
      "initFirewall": "init-firewall.sh - 用于安全的网络防火墙脚本",
      "workspace": "workspace/ - 挂载到容器中的工作目录",
      "claudeMd": "workspace/CLAUDE.md - Claude 的项目说明",
      "settingsJson": "workspace/.claude/settings.json - Claude Code 权限设置"
    },
    "baseImage": {
      "title": "基础镜像",
      "description": "此配置使用以下 Docker 基础镜像：",
      "dockerHub": "在 Docker Hub 上查看"
    },
    "platform": {
      "title": "平台",
      "description": "容器配置为在此平台上运行："
    },
    "aptPackages": {
      "title": "系统软件包 (APT)",
      "description": "以下系统软件包已安装："
    },
    "npmPackages": {
      "title": "额外 NPM 软件包",
      "description": "以下额外 NPM 软件包已全局安装：",
      "installedAs": "以 {{user}} 身份安装"
    },
    "plugins": {
      "title": "Claude Code 插件",
      "description": "以下 Claude Code 插件已安装并启用：",
      "viewOnGitHub": "在 GitHub 上查看"
    },
    "envVariables": {
      "title": "环境变量",
      "description": "以下环境变量已配置（出于安全原因未显示值）：",
      "note": "在启动容器之前，请将实际值添加到 .env 文件中。"
    },
    "protectedFiles": {
      "title": "受保护文件",
      "description": "以下文件受保护，并作为空的只读文件挂载："
    },
    "settingsJson": {
      "title": "权限设置",
      "description": "Claude Code 配置了以下权限规则：",
      "allow": "允许的操作（自动）",
      "ask": "需要确认的操作",
      "deny": "拒绝的操作"
    },
    "claudeMd": {
      "title": "项目说明",
      "description": "Claude 的项目特定说明定义在："
    },
    "quickStart": {
      "title": "快速开始",
      "step1": "安装 Docker（请参阅下面的先决条件）",
      "step2": "启动容器：",
      "step2CustomVersions": "可选：使用自定义软件版本构建（请参阅下面的 Docker Build Arguments）：",
      "step3": "启动 Claude Code：",
      "step4": "停止容器：",
      "note": "您的 workspace 文件夹挂载在容器内的 /workspace。有关登录选项，请参阅下面的身份验证部分。"
    },
    "authentication": {
      "title": "身份验证",
      "description": "Claude Code 支持两种身份验证方法。选择最适合您需求的方式：",
      "apiKey": {
        "title": "选项 1：API 密钥",
        "description": "在 `.env` 文件中设置您的 API 密钥（`ANTHROPIC_API_KEY`）。Claude Code 将自动使用它。",
        "pros": [
          "在无头/自动化环境中工作（CI/CD、容器、SSH）",
          "无需浏览器",
          "无使用限制（按使用付费）",
          "在所有环境中可靠"
        ],
        "cons": [
          "每次 API 调用都需要付费（标准 API 费率）",
          "需要管理和保护 API 密钥",
          "没有支出限制可能导致意外费用"
        ]
      },
      "browserLogin": {
        "title": "选项 2：浏览器登录（Claude Pro/Max/Team）",
        "description": "在 Claude Code 中运行 `/login`，通过浏览器使用您的订阅进行身份验证。",
        "pros": [
          "包含在您的订阅中（可预测的月费）",
          "无额外 API 费用",
          "与 Claude.ai 统一计费"
        ],
        "cons": [
          "首次登录需要浏览器",
          "有每周重置的使用限制",
          "身份验证可能无法在容器/SSH 会话中持久化"
        ]
      }
    },
    "buildArgs": {
      "title": "Docker Build Arguments",
      "description": "您可以在 Docker 构建期间配置软件版本和下载 URL。使用 `--build-arg 名称=值` 来覆盖默认值。",
      "versionArgs": {
        "title": "版本参数",
        "description": "控制安装哪些软件版本："
      },
      "urlArgs": {
        "title": "URL 参数",
        "description": "覆盖镜像或代理的下载 URL："
      },
      "defaultValue": "默认值",
      "example": "自定义版本示例："
    },
    "prerequisites": {
      "title": "先决条件",
      "description": "您需要在系统上安装 Docker。选择您的操作系统：",
      "windows": {
        "title": "Windows",
        "steps": [
          "从 docker.com/products/docker-desktop 下载 Docker Desktop",
          "运行安装程序并按照设置向导操作",
          "在提示时启用 WSL 2 后端（推荐）",
          "如果需要，重新启动计算机",
          "打开 Docker Desktop 并等待它启动"
        ],
        "link": "官方 Windows 安装指南"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "从 docker.com/products/docker-desktop 下载 Docker Desktop",
          "打开 .dmg 文件并将 Docker 拖到「应用程序」",
          "从「应用程序」文件夹打开 Docker",
          "在提示时授予所需权限",
          "等待 Docker 完成启动（菜单栏中的鲸鱼图标）"
        ],
        "link": "官方 macOS 安装指南"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "更新软件包索引：sudo apt update",
          "安装 Docker：sudo apt install docker.io docker-compose-v2",
          "将用户添加到 docker 组：sudo usermod -aG docker $USER",
          "注销并重新登录以使组更改生效",
          "验证安装：docker --version"
        ],
        "link": "官方 Linux 安装指南",
        "altNote": "或安装 Docker Desktop 以获得图形界面体验。"
      }
    },
    "troubleshooting": {
      "title": "故障排除",
      "issues": {
        "containerNotStarting": {
          "title": "容器无法启动",
          "solutions": [
            "检查 Docker 是否正在运行：docker info",
            "验证 .env 文件是否存在并包含 ANTHROPIC_API_KEY",
            "检查端口冲突：docker ps",
            "查看容器日志：docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "权限被拒绝错误",
          "solutions": [
            "在 Linux 上，确保用户在 docker 组中",
            "尝试使用 sudo 运行（不建议常规使用）",
            "检查 workspace 文件夹中的文件权限"
          ]
        },
        "networkIssues": {
          "title": "网络或 API 连接问题",
          "solutions": [
            "防火墙脚本仅允许特定域",
            "确保 api.anthropic.com 可从您的网络访问",
            "检查容器内的防火墙日志：sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "容器中无法访问文件",
          "solutions": [
            "受保护文件故意为空 - 这是预期行为",
            "检查 docker-compose.yaml 中的卷挂载",
            "确保 workspace 文件夹在主机上存在"
          ]
        }
      }
    },
    "links": {
      "title": "链接",
      "initializer": "生成新配置",
      "documentation": "Claude Code 文档",
      "support": "报告问题"
    },
    "author": {
      "title": "作者",
      "createdBy": "创建者",
      "support": "支持此项目"
    },
    "software": {
      "title": "已安装软件",
      "description": "以下开发工具已安装："
    }
  }
};

export default zh;
