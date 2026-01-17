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
  - TypeScript（可选择版本）
  - Python 3（可选择版本）
  - ffmpeg（音视频处理）
  - ImageMagick（图像处理）
- **自定义 APT 包**：添加要在容器中安装的额外 Debian/Ubuntu 软件包
- **自定义 NPM 包**：添加要全局安装的额外 NPM 包，可选择以 `root` 或 `node` 用户身份安装

### docker-compose.yaml 配置

- **环境变量**：为您的 `.env` 文件配置环境变量
- **受保护文件**：指定需要通过挂载空的只读文件来保护的文件（防止访问敏感文件如 `.env.local`）

### CLAUDE.md 编辑器

- 带语法高亮的 Markdown 编辑器
- 内置预览功能
- 为 Claude 编写项目特定的指令

### 通用功能

- **实时预览**：实时查看生成的配置文件预览
- **ZIP 下载**：将所有文件下载为可直接使用的 ZIP 压缩包
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
```

## 使用方法

1. **配置基础镜像**：设置 Docker 基础镜像名称和版本（例如 `node:24` 或 `node:22-slim`）

2. **选择软件**：选择要在容器中安装的额外软件

3. **添加自定义包**：
   - 添加自定义 APT 包（例如 `curl`、`graphviz`、`sqlite3`）
   - 添加要全局安装的自定义 NPM 包（例如 `eslint`、`prettier`）
   - 选择 NPM 包是以 `node`（默认）还是 `root` 用户身份安装

4. **设置环境变量**：添加项目需要的任何环境变量（例如 `ANTHROPIC_API_KEY`）

5. **保护敏感文件**：添加需要保护的文件路径（例如 `.env.local`）

6. **编辑 CLAUDE.md**：在 Markdown 编辑器中为 Claude 编写指令

7. **预览**：在预览选项卡中检查生成的配置文件

8. **下载**：点击"下载 ZIP"获取所有文件

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

1. 在 `src/i18n/locales/` 中创建新的语言文件（例如 `fr.json`）
2. 复制 `en.json` 的结构
3. 翻译所有字符串
4. 将语言添加到 `src/i18n/index.ts`
5. 将语言选项添加到 `LanguageSwitcher.tsx`

## 无障碍性

此应用程序设计为完全无障碍：

- 语义化 HTML 结构（`<header>`、`<main>`、`<footer>`）
- 所有交互元素都有 ARIA 标签
- 支持键盘导航
- 兼容屏幕阅读器
- 高对比度配色方案
- 交互元素上的焦点指示器

## 支持

如果您觉得这个项目有用，请考虑支持它：

- ⭐ 在 [GitHub](https://github.com/mkloubert/claude-initializr) 上给仓库点星
- 💝 [通过 PayPal 捐赠](https://paypal.me/mjkloubert)

## 许可证

MIT 许可证 - 详见 [LICENSE](./LICENSE)。

版权所有 © 2026 Marcel Joachim Kloubert
