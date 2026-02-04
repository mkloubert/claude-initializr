# Claude Initializr

**🌐 阅读其他语言版本：**
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

[![许可证: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![捐赠](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

一个用于生成 Docker 配置文件的 Web 应用程序，可在容器化环境中安全运行 [Claude Code](https://docs.anthropic.com/en/docs/claude-code)。

**在线演示：** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## 功能特性

### Dockerfile 配置

- **基础镜像**：配置 Docker 基础镜像名称和版本（默认：`node:24`）
- **软件选择**：选择要安装的额外软件：
  - ffmpeg（音视频处理）
  - Flutter（包含 Dart 和 Android SDK）
  - Go
  - ImageMagick（图像处理）
  - Python 3
  - Rust（包含Cargo包管理器）
  - TypeScript
  - uv（快速 Python 包安装工具，推荐 Python）
- **版本配置**：软件版本通过 Docker 构建参数配置（例如：`--build-arg GO_VERSION=1.22.0`）
- **自定义 APT 包**：添加要在容器中安装的额外 Debian/Ubuntu 软件包
- **自定义 NPM 包**：添加要全局安装的额外 NPM 包，可选择以 `root` 或 `node` 用户身份安装
- **自定义 RUN 命令**：添加以 `root` 或 `node` 用户身份执行的自定义 Dockerfile RUN 命令

### docker-compose.yaml 配置

- **环境变量**：为您的 `.env` 文件配置环境变量
- **受保护文件**：指定需要通过挂载空的只读文件来保护的文件（防止访问敏感文件如 `.env.local`）

### CLAUDE.md 编辑器

- 带语法高亮的 Markdown 编辑器
- 内置预览功能
- 为 Claude 编写项目特定的指令

### settings.json 配置

- **权限规则**：配置 Claude Code 权限以管理文件访问
  - `Allow` - 自动允许的操作规则
  - `Ask` - 需要用户确认的规则
  - `Deny` - 始终拒绝的规则
- **支持的指令**：
  - `Read()` - 确定 Claude 可以读取哪些文件（例如：`Read(src/**)`）
  - `Edit()` - 确定 Claude 可以编辑哪些文件（例如：`Edit(.env)`）
  - `WebFetch()` - 控制网络访问（例如：`WebFetch(https://api.github.com:*)`）
- **自动集成**：受保护的文件自动添加为 `Read()` 拒绝规则
- **Glob 模式支持**：使用 `src/**` 等模式进行递归匹配

### DevContainer 配置（VS Code / GitHub Codespaces）

- **VS Code 集成**：为 VS Code Dev Container 生成 `devcontainer.json`
- **GitHub Codespaces**：兼容 GitHub Codespaces 开发的配置
- **扩展**：配置自动安装的 VS Code 扩展
- **设置**：定义容器环境的 VS Code 设置
- **Features**：添加 Dev Container Features（如 GitHub CLI、其他语言）
- **端口转发**：配置从容器转发的端口
- **生命周期命令**：设置 post-create、post-start 和 post-attach 事件的命令
- **推荐扩展**：基于所选软件的自动扩展推荐

### 通用功能

- **实时预览**：实时查看生成的配置文件预览
- **ZIP 下载**：将所有文件下载为可直接使用的 ZIP 压缩包
- **自动生成 README**：每个 ZIP 包含详细的 README.md：
  - 文件概述和说明
  - 带 Docker Hub 链接的基础镜像信息
  - 已安装软件和包的链接（Debian Tracker、npmjs.com）
  - 环境变量键（出于安全考虑隐藏值）
  - 受保护文件列表
  - 权限设置摘要
  - 包含 Docker 命令的快速入门指南
  - Windows、macOS 和 Linux 先决条件
  - 故障排除部分
  - 当界面语言不是英语时，还包括 README.en.md（简单英语）
- **配置导入/导出**: 将配置导出为 JSON 文件，并在其他浏览器或设备上导入
- **自动保存**：设置自动保存到浏览器的 localStorage（默认启用）
- **多语言支持**：支持 18 种语言：
  - 🌍 阿拉伯语
  - 🇨🇳 中文
  - 🇳🇱 荷兰语
  - 🇬🇧 英语
  - 🇫🇷 法语
  - 🇩🇪 德语
  - 🇬🇷 希腊语
  - 🇮🇱 希伯来语
  - 🇮🇳 印地语
  - 🇮🇹 意大利语
  - 🇯🇵 日语
  - 🇰🇷 韩语
  - 🇵🇱 波兰语
  - 🇵🇹 葡萄牙语
  - 🇪🇸 西班牙语
  - 🇹🇷 土耳其语
  - 🇺🇦 乌克兰语
  - 🇵🇰 乌尔都语
- **深色/浅色主题**：自动检测主题并支持手动切换
- **PWA 支持**：可作为渐进式 Web 应用安装
- **完全无障碍**：符合 WCAG 标准，支持键盘导航和屏幕阅读器
- **响应式设计**：针对桌面和平板电脑优化
- **键盘快捷键**：完整的键盘导航和可自定义的快捷键（按 `Ctrl+/` 或 `⌘+/` 查看全部）

### 键盘快捷键

所有快捷键在 Windows/Linux 上使用 `Ctrl`，在 macOS 上使用 `⌘`（Cmd）。

| 快捷键 | 操作 |
| ------ | ---- |
| `Ctrl/⌘ + S` | 下载 ZIP |
| `Ctrl/⌘ + E` | 切换预览 |
| `Ctrl/⌘ + Shift + D` | 切换深色/浅色模式 |
| `Ctrl/⌘ + Shift + X` | 恢复默认设置 |
| `Ctrl/⌘ + Shift + L` | 打开语言切换器 |
| `Ctrl/⌘ + 1-5` | 滚动到卡片（1=Dockerfile、2=Docker Compose、3=CLAUDE.md、4=settings.json、5=DevContainer） |
| `Ctrl/⌘ + /` | 打开键盘快捷键帮助 |
| `Escape` | 关闭对话框 |

标题栏中的键盘图标也可以打开快捷键帮助对话框。

### 自动保存机制

可以使用标题栏中的保存图标切换自动保存功能：

| 图标           | 状态   | 行为                                           |
| -------------- | ------ | ---------------------------------------------- |
| 💾（保存）     | 已启用 | 所有更改自动保存到 localStorage                |
| 🚫💾（关闭）   | 已禁用 | 更改不会保存；现有保存的数据将被清除           |

**工作原理：**

- **启用自动保存**：立即将当前设置保存到 localStorage
- **禁用自动保存**：从 localStorage 清除所有已保存的设置
- 您的自动保存偏好会在会话之间保持

### 配置导入/导出

您可以通过 JSON 文件共享或备份配置：

- **导出**：点击页头的上传图标，将当前配置下载为 `claude-initializr-config.json`
- **导入**：点击下载图标，选择之前导出的 JSON 文件

**工作原理：**

- **导出**将所有设置（基础镜像、软件选择、软件包、命令、权限、CLAUDE.md 内容）保存到单个 JSON 文件中
- **导入**会验证文件、显示更改的差异预览，并在应用前请求确认
- 出于安全考虑，导出文件中**不包含环境变量的值** — 仅导出变量名称
- 导入的配置会获得新的内部 ID 以避免冲突
- 导出格式包含版本字段（`"version": "1.0"`）以确保向前兼容

### 隐私与数据存储

此应用程序尊重您的隐私：

- **仅本地存储**：所有设置都存储在您浏览器的本地存储（localStorage）中
- **无服务器通信**：永远不会向任何服务器发送数据
- **设计安全**：环境变量的**值永远不会存储** - 只保存变量名称
- **完全控制**：您可以随时使用标题栏中的开关禁用自动保存，这也会清除所有存储的数据
- **基于会话的主题**：页面重新加载时，主题偏好会重置为系统默认值

## 安全功能

生成的 Docker 配置包含全面的安全措施：

### 网络防火墙

`init-firewall.sh` 脚本实现严格的网络隔离：

- **基于 iptables 的防火墙**，对所有出站流量采用 DROP 策略
- **仅白名单方式** - 只有白名单域名可访问：
  - `api.anthropic.com` - Claude API
  - `npm registry` - 包安装
  - `github.com` - Git 操作
  - `sentry.io` - 错误报告
- **自动 GitHub IP 解析**，支持 web、API 和 git 端点
- **主机网络隔离** - 防止访问本地网络
- **防火墙验证** - 测试确保规则正确应用

### Docker 安全加固

- **能力丢弃**：移除所有 Linux 能力（`cap_drop: ALL`）
- **无权限提升**：`no-new-privileges:true`
- **资源限制**：CPU 和内存约束
- **只读挂载**：受保护的文件以只读方式挂载
- **非 root 执行**：以 `node` 用户身份运行

## 预安装工具

生成的容器包含：

| 类别         | 工具                                |
| ------------ | ----------------------------------- |
| **Shell**    | zsh（带 Powerline10k 主题）、bash   |
| **编辑器**   | nano、vim                           |
| **版本控制** | git、git-delta、GitHub CLI (gh)     |
| **实用工具** | fzf、jq、less、unzip、man-db        |
| **网络**     | iptables、ipset、iproute2、dnsutils |

## 快速开始

### 前置要求

- Node.js 20 或更高版本
- npm 10 或更高版本

### 安装

```bash
# 克隆仓库
git clone https://github.com/mkloubert/claude-initializr.git
cd claude-initializr

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 环境变量

使用环境变量自定义应用程序。创建 `.env` 文件：

```bash
# GitHub 仓库 URL（可选，留空则隐藏）
VITE_GITHUB_URL=https://github.com/mkloubert/claude-initializr

# PayPal 捐赠 URL（可选，留空则隐藏）
VITE_PAYPAL_URL=https://paypal.me/mjkloubert

# Claude Code permissions documentation URL (optional)
VITE_PERMISSIONS_DOCS_URL=https://docs.anthropic.com/en/docs/claude-code/settings#permission-settings

# Author website URL (optional)
VITE_AUTHOR_URL=https://marcel.coffee

# Author name displayed in footer (optional)
VITE_AUTHOR_NAME=Marcel Joachim Kloubert
```

## 使用方法

1. **配置基础镜像**：设置 Docker 基础镜像名称和版本（例如 `node:24` 或 `node:22-slim`）

2. **选择软件**：选择要在容器中安装的额外软件

3. **添加自定义包和命令**：
   - 添加自定义 APT 包（例如 `curl`、`graphviz`、`sqlite3`）
   - 添加要全局安装的自定义 NPM 包（例如 `eslint`、`prettier`）
   - 选择 NPM 包是以 `node`（默认）还是 `root` 用户身份安装
   - 添加在构建过程中执行的自定义 RUN 命令
   - 选择每个 RUN 命令是以 `node` 还是 `root` 用户身份执行

4. **设置环境变量**：添加项目需要的任何环境变量（例如 `ANTHROPIC_API_KEY`）

5. **保护敏感文件**：添加需要保护的文件路径（例如 `.env.local`）

6. **编辑 CLAUDE.md**：在 Markdown 编辑器中为 Claude 编写指令

7. **配置权限**：通过 settings.json 卡片设置权限规则
   - 添加 `Allow` 规则用于自动批准的操作
   - 添加 `Ask` 规则用于需要确认的操作
   - 添加 `Deny` 规则用于禁止的操作
   - 受保护的文件会自动添加为 `Read()` 拒绝规则

8. **预览**：在预览选项卡中检查生成的配置文件

9. **下载**：点击"下载 ZIP"获取所有文件

## 使用生成的文件

1. 将 ZIP 文件解压到您的项目目录

2. 将您的项目文件复制到 `workspace` 文件夹（或挂载您现有的项目）

3. 在 `.env` 文件中设置您的 API 密钥：

   ```bash
   ANTHROPIC_API_KEY=您的-api-密钥
   ```

4. 构建并启动容器：

   ```bash
   docker compose up --build
   ```

   **可选：自定义软件版本**

   软件版本可以通过构建参数配置。使用 `latest` 进行动态版本获取，或指定明确的版本：

   ```bash
   docker compose build \
     --build-arg GO_VERSION=1.22.0 \
     --build-arg FLUTTER_VERSION=3.24.0 \
     --build-arg PYTHON_VERSION=3.12 \
     --build-arg TYPESCRIPT_VERSION=5.6.0
   ```

   | 构建参数 | 默认值 | 描述 |
   |----------|--------|------|
   | `CLAUDE_CODE_VERSION` | `stable` | Claude Code 版本（`latest` 或特定版本如 `1.0.58`） |
   | `FLUTTER_VERSION` | `latest` | Flutter 版本（`latest` 或特定版本如 `3.24.0`） |
   | `GIT_DELTA_VERSION` | `0.18.2` | 用于 diff 高亮的 Git delta 版本 |
   | `GO_VERSION` | `latest` | Go 版本（`latest` 或特定版本如 `1.22.0`） |
   | `PYTHON_VERSION` | `3` | Python 版本（如 `3`、`3.12`） |
   | `TYPESCRIPT_VERSION` | `latest` | TypeScript 版本（`latest` 或特定版本如 `5.6.0`） |
   | `ZSH_IN_DOCKER_VERSION` | `1.2.0` | 用于 shell 设置的 zsh-in-docker 版本 |

   **可选：自定义下载 URL**

   如果您需要使用镜像或代理进行包下载，可以在构建时覆盖默认 URL。所有 URL 都支持查询参数：

   ```bash
   docker compose build \
     --build-arg GO_JSON_URL=https://my-mirror.example.com/golang/?mode=json \
     --build-arg GO_DOWNLOAD_URL=https://my-mirror.example.com/golang \
     --build-arg RUSTUP_INSTALL_URL=https://my-mirror.example.com/rustup/rustup-init.sh \
     --build-arg FLUTTER_JSON_URL=https://my-mirror.example.com/flutter/releases_linux.json \
     --build-arg FLUTTER_BASE_URL=https://my-mirror.example.com/flutter/releases \
     --build-arg UV_INSTALL_SCRIPT_URL=https://my-mirror.example.com/uv/install.sh
   ```

   | 构建参数 | 默认值 | 描述 |
   |----------|--------|------|
   | `GO_JSON_URL` | `https://go.dev/dl/?mode=json` | Go 版本 JSON API URL（仅当选择 "latest" 时） |
   | `GO_DOWNLOAD_URL` | `https://go.dev/dl` | Go 归档下载基础 URL |
   | `RUSTUP_INSTALL_URL` | `https://sh.rustup.rs` | rustup 安装脚本 URL |
   | `FLUTTER_JSON_URL` | `https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json` | Flutter 版本 JSON API URL（仅当选择 "latest" 时） |
   | `FLUTTER_BASE_URL` | `https://storage.googleapis.com/flutter_infra_release/releases` | Flutter 归档下载基础 URL |
   | `UV_INSTALL_SCRIPT_URL` | `https://astral.sh/uv/install.sh` | uv 安装脚本 URL |

5. 连接到容器：

   ```bash
   docker compose exec claude zsh
   ```

6. 初始化防火墙（需要 sudo 密码）：

   ```bash
   sudo /usr/local/bin/init-firewall.sh
   ```

7. 启动 Claude Code：
   ```bash
   claude
   ```

## 生成的文件结构

```
├── .devcontainer/           # VS Code Dev Container (optional)
│   ├── devcontainer.json    # Dev Container configuration
│   └── post-create.sh       # Post-create script (if complex commands)
├── workspace/
│   ├── .claude/
│   │   └── settings.json    # Claude 设置
│   ├── .empty               # 用于受保护挂载的空文件
│   └── CLAUDE.md            # 您的 Claude 指令
├── .env                     # 环境变量
├── Dockerfile               # 容器定义
├── docker-compose.yaml      # Docker Compose 配置
└── init-firewall.sh         # 网络防火墙脚本
```

## 故障排除

### 防火墙问题

如果启用防火墙后遇到网络问题：

```bash
# 检查防火墙状态
sudo iptables -L -n

# 查看被阻止的连接
sudo iptables -L -n -v | grep DROP

# 重置防火墙（允许所有流量）
sudo iptables -F
```

### 容器无法启动

```bash
# 检查日志
docker compose logs

# 不使用缓存重新构建
docker compose build --no-cache
```

### 权限被拒绝

确保 workspace 目录具有正确的权限：

```bash
chmod -R 755 workspace
```

### 重置应用程序设置

要清除所有保存的设置并重新开始，打开浏览器的开发者控制台并执行：

```javascript
localStorage.removeItem("claude-initializr-config");
localStorage.removeItem("claude-initializr-welcome-dismissed");
localStorage.removeItem("claude-initializr-autosave");
```

然后重新加载页面。

或者，您可以使用标题栏中的开关禁用自动保存，以防止保存设置。

## 技术栈

- [React 19](https://react.dev/)，使用 TypeScript 和 React Compiler
- [Vite](https://vite.dev/) 作为打包工具
- [Tailwind CSS v4](https://tailwindcss.com/)，使用 OKLCH 色彩空间
- [shadcn/ui](https://ui.shadcn.com/) 组件（40+ 个组件）
- [react-router](https://reactrouter.com/) 用于路由
- [i18next](https://www.i18next.com/) 用于国际化
- [JSZip](https://stuk.github.io/jszip/) 用于 ZIP 生成
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) 用于代码预览

## 贡献

欢迎贡献！请随时提交 Pull Request。

1. Fork 仓库
2. 创建您的功能分支（`git checkout -b feature/amazing-feature`）
3. 提交您的更改（`git commit -m '添加一些很棒的功能'`）
4. 推送到分支（`git push origin feature/amazing-feature`）
5. 打开 Pull Request

### 添加新语言

1. 在 `src/i18n/locales/` 中创建新的语言文件（例如 `fr.ts`）
2. 从 `types.ts` 导入并实现 `Translations` 接口
3. 复制 `en.ts` 的结构并翻译所有字符串
4. 在 `src/i18n/index.ts` 中添加语言导入
5. 将语言选项添加到 `LanguageSwitcher.tsx`

## 无障碍性

此应用程序设计为完全无障碍：

- 语义化 HTML 结构（`<header>`、`<main>`、`<footer>`）
- 所有交互元素都有 ARIA 标签
- 支持键盘导航
- 兼容屏幕阅读器
- 高对比度配色方案
- 交互元素上的焦点指示器

## 发布

发布通过 GitHub Actions 自动化。要创建新发布：

1. 创建并推送版本标签：
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. 工作流程自动：
   - 构建项目
   - 从 `dist/` 文件夹创建 ZIP 存档
   - 发布带有自动生成发布说明的 GitHub Release

包含 `-` 的标签（如 `v1.0.0-beta`）将被标记为预发布。

## 更新日志

### v3.1.2

- 添加了常用操作的键盘快捷键（下载、预览切换、主题切换、卡片导航、语言切换器、重置）
- 添加了分组显示的键盘快捷键帮助对话框
- 在按钮工具提示中添加了带有适配操作系统修饰键的快捷键提示
- 添加了用于快捷键操作屏幕阅读器通知的 ARIA 实时区域
- 添加了通过 JSON 文件导入/导出配置功能，带有差异预览和验证

### v3.0.0

- 从用户界面中移除了插件功能

### v2.0.2

- 切换为使用原生 Claude Code 安装程序代替 npm
- 修复了 Dockerfile 中官方插件的安装问题

### v1.3.0

- 添加了身份验证文档

### v1.2.0

- 在所有 README 中添加了 Docker 构建参数文档
- 添加了用于镜像和代理的自定义下载 URL 文档

### v1.1.1

- 在标题栏中添加了版本显示
- 将 i18n 系统从 JSON 转换为带类型接口的 TypeScript
- 修复了 ZIP 下载中 README 文件之间的语言切换问题

### v1.0.0

- 首次发布
- 使用 Dockerfile 和 docker-compose.yaml 的 Docker 配置生成器
- 软件选择（Go、Python、Rust、Flutter、TypeScript、ffmpeg、ImageMagick、uv）
- 自定义 APT 包、NPM 包和 RUN 命令
- 带预览的 CLAUDE.md Markdown 编辑器
- settings.json 权限编辑器（Allow、Ask、Deny 规则）
- 环境变量和受保护文件配置
- 网络防火墙脚本生成
- 带自动生成 README 的 ZIP 下载
- 多语言支持（18 种语言）
- 带自动检测的深色/浅色主题
- 自动保存到 localStorage
- PWA 支持
- GitHub Actions 发布工作流

## 支持

如果您觉得这个项目有用，请考虑支持它：

- ⭐ 在 [GitHub](https://github.com/mkloubert/claude-initializr) 上给仓库点星
- 💝 [通过 PayPal 捐赠](https://paypal.me/mjkloubert)

## 许可证

MIT 许可证 - 详见 [LICENSE](./LICENSE)。

版权所有 © 2026 Marcel Joachim Kloubert
