# Claude Initializr

**🌐 Read in other languages:**
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

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

A web application to generate Docker configuration files for running [Claude Code](https://docs.anthropic.com/en/docs/claude-code) safely in a containerized environment.

**Live Demo:** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## Features

### Dockerfile Configuration

- **Base Image**: Configure the Docker base image name and version (default: `node:24`)
- **Software Selection**: Choose additional software to install:
  - ffmpeg (audio/video processing)
  - Flutter (includes Dart and Android SDK)
  - Go
  - ImageMagick (image processing)
  - Python 3
  - Rust (includes Cargo package manager)
  - TypeScript
  - uv (fast Python package installer, recommends Python)
- **Version Configuration**: Software versions are configured via Docker build arguments (e.g., `--build-arg GO_VERSION=1.22.0`)
- **Custom APT Packages**: Add additional Debian/Ubuntu packages to install in the container
- **Custom NPM Packages**: Add additional NPM packages to install globally, with the option to install as `root` or `node` user
- **Custom RUN Commands**: Add custom shell commands to execute during Docker image build, with the option to run as `root` or `node` user

### docker-compose.yaml Configuration

- **Environment Variables**: Configure environment variables for your `.env` file
- **Protected Files**: Specify files that should be protected by mounting empty read-only files (prevents access to sensitive files like `.env.local`)

### CLAUDE.md Editor

- Markdown editor with syntax highlighting
- Built-in preview functionality
- Write project-specific instructions for Claude

### settings.json Configuration

- **Permission Rules**: Configure Claude Code permissions to control file access
  - `Allow` - Rules for automatically allowed operations
  - `Ask` - Rules that require user confirmation
  - `Deny` - Rules that are always denied
- **Supported Directives**:
  - `Read()` - Control which files Claude can read (e.g., `Read(src/**)`)
  - `Edit()` - Control which files Claude can modify (e.g., `Edit(.env)`)
  - `WebFetch()` - Control network access (e.g., `WebFetch(https://api.github.com:*)`)
- **Automatic Integration**: Protected files are automatically added as `Read()` deny rules
- **Glob Pattern Support**: Use patterns like `src/**` for recursive matching

### General Features

- **Live Preview**: See real-time previews of generated configuration files
- **ZIP Download**: Download all files as a ready-to-use ZIP archive
- **Automatic README Generation**: Each ZIP includes a detailed README.md with:
  - File overview and descriptions
  - Base image information with Docker Hub links
  - Installed software and packages with links (Debian Tracker, npmjs.com)
  - Environment variable keys (values hidden for security)
  - Protected files list
  - Permission settings summary
  - Quick start guide with Docker commands
  - Prerequisites for Windows, macOS, and Linux
  - Troubleshooting section
  - When UI language is not English, also includes README.en.md (Simple English)
- **Configuration Import/Export**: Export your configuration as a JSON file and import it on another browser or device
- **Autosave**: Settings are automatically saved to your browser's localStorage (enabled by default)
- **Multi-language Support**: Available in 18 languages:
  - 🌍 Arabic
  - 🇨🇳 Chinese
  - 🇳🇱 Dutch
  - 🇬🇧 English
  - 🇫🇷 French
  - 🇩🇪 German
  - 🇬🇷 Greek
  - 🇮🇱 Hebrew
  - 🇮🇳 Hindi
  - 🇮🇹 Italian
  - 🇯🇵 Japanese
  - 🇰🇷 Korean
  - 🇵🇱 Polish
  - 🇵🇹 Portuguese
  - 🇪🇸 Spanish
  - 🇹🇷 Turkish
  - 🇺🇦 Ukrainian
  - 🇵🇰 Urdu
- **Dark/Light Theme**: Automatic theme detection with manual toggle
- **PWA Support**: Installable as a Progressive Web App
- **Fully Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **Responsive Design**: Optimized for desktop and tablet
- **Keyboard Shortcuts**: Full keyboard navigation with customizable shortcuts (press `Ctrl+/` or `⌘+/` to view all)

### Keyboard Shortcuts

All shortcuts use `Ctrl` on Windows/Linux and `⌘` (Cmd) on macOS.

| Shortcut | Action |
| -------- | ------ |
| `Ctrl/⌘ + S` | Download ZIP |
| `Ctrl/⌘ + E` | Toggle preview |
| `Ctrl/⌘ + Shift + D` | Toggle dark/light mode |
| `Ctrl/⌘ + Shift + X` | Reset to defaults |
| `Ctrl/⌘ + Shift + L` | Open language switcher |
| `Ctrl/⌘ + 1-4` | Scroll to card (1=Dockerfile, 2=Docker Compose, 3=CLAUDE.md, 4=settings.json) |
| `Ctrl/⌘ + /` | Open keyboard shortcuts help |
| `Escape` | Close dialog |

A keyboard icon in the header also opens the shortcuts help dialog.

### Autosave Mechanism

The autosave feature can be toggled using the save icon in the header:

| Icon           | State    | Behavior                                              |
| -------------- | -------- | ----------------------------------------------------- |
| 💾 (Save)      | Enabled  | All changes are automatically saved to localStorage   |
| 🚫💾 (SaveOff) | Disabled | Changes are not saved; existing saved data is cleared |

**How it works:**

- **Enabling autosave**: Immediately saves current settings to localStorage
- **Disabling autosave**: Clears all saved settings from localStorage
- Your autosave preference is remembered across sessions

### Configuration Import/Export

You can share or back up your configuration using JSON files:

- **Export**: Click the upload icon in the header to download your current configuration as `claude-initializr-config.json`
- **Import**: Click the download icon to select a previously exported JSON file

**How it works:**

- **Export** saves all settings (base image, software selection, packages, commands, permissions, CLAUDE.md content) into a single JSON file
- **Import** validates the file, shows a diff preview of what will change, and asks for confirmation before applying
- For security, **environment variable values are never included** in exported files — only the variable names are exported
- Imported configurations get new internal IDs to prevent conflicts
- The export format includes a version field (`"version": "1.0"`) for forward compatibility

**Export file structure:**

```json
{
  "version": "1.0",
  "appVersion": "1.3.0",
  "exportedAt": "2026-01-15T10:30:00.000Z",
  "config": { ... }
}
```

### Privacy & Data Storage

This application respects your privacy:

- **Local Storage Only**: All settings are stored locally in your browser (localStorage)
- **No Server Communication**: No data is ever sent to any server
- **Secure by Design**: Environment variable **values are never stored** - only variable names are saved
- **Full Control**: You can disable autosave at any time using the toggle in the header, which also clears any stored data
- **Session-based Theme**: Theme preference resets to system default on page reload

## Security Features

The generated Docker configuration includes comprehensive security measures:

### Network Firewall

The `init-firewall.sh` script implements strict network isolation:

- **iptables-based firewall** with DROP policy for all outbound traffic
- **Allowlist-only approach** - only whitelisted domains are accessible:
  - `api.anthropic.com` - Claude API
  - `npm registry` - Package installation
  - `github.com` - Git operations
  - `sentry.io` - Error reporting
- **Automatic GitHub IP resolution** for web, API, and git endpoints
- **Host network isolation** - prevents access to local network
- **Firewall verification** - tests ensure rules are properly applied

### Docker Security Hardening

- **Capability dropping**: All Linux capabilities dropped (`cap_drop: ALL`)
- **No privilege escalation**: `no-new-privileges:true`
- **Resource limits**: CPU and memory constraints
- **Read-only mounts**: Protected files mounted as read-only
- **Non-root execution**: Runs as `node` user

## Pre-installed Tools

The generated container includes:

| Category            | Tools                               |
| ------------------- | ----------------------------------- |
| **Shell**           | zsh with Powerline10k theme, bash   |
| **Editors**         | nano, vim                           |
| **Version Control** | git, git-delta, GitHub CLI (gh)     |
| **Utilities**       | fzf, jq, less, unzip, man-db        |
| **Network**         | iptables, ipset, iproute2, dnsutils |

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm 10 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/mkloubert/claude-initializr.git
cd claude-initializr

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables

Customize the application using environment variables. Create a `.env` file:

```bash
# GitHub repository URL (optional, set empty to hide)
VITE_GITHUB_URL=https://github.com/mkloubert/claude-initializr

# PayPal donation URL (optional, set empty to hide)
VITE_PAYPAL_URL=https://paypal.me/mjkloubert

# Claude Code permissions documentation URL (optional)
VITE_PERMISSIONS_DOCS_URL=https://docs.anthropic.com/en/docs/claude-code/settings#permission-settings

# Author website URL (optional)
VITE_AUTHOR_URL=https://marcel.coffee

# Author name displayed in footer (optional)
VITE_AUTHOR_NAME=Marcel Joachim Kloubert
```

## Usage

1. **Configure Base Image**: Set the Docker base image name and version (e.g., `node:24` or `node:22-slim`)

2. **Select Software**: Choose which additional software to install in your container

3. **Add Custom Packages & Commands**:
   - Add custom APT packages (e.g., `curl`, `graphviz`, `sqlite3`)
   - Add custom NPM packages to install globally (e.g., `eslint`, `prettier`)
   - Choose whether NPM packages should be installed as `node` (default) or `root` user
   - Add custom RUN commands to execute during build (e.g., `pip install numpy`)
   - Choose whether RUN commands should run as `node` (default) or `root` user

4. **Set Environment Variables**: Add any environment variables your project needs (e.g., `ANTHROPIC_API_KEY`)

5. **Protect Sensitive Files**: Add paths to files that should be protected (e.g., `.env.local`)

6. **Edit CLAUDE.md**: Write instructions for Claude in the Markdown editor

7. **Configure Permissions**: Set up permission rules in the settings.json card
   - Add `Allow` rules for operations that should be auto-approved
   - Add `Ask` rules for operations requiring confirmation
   - Add `Deny` rules for forbidden operations
   - Protected files are automatically added as `Read()` deny rules

8. **Preview**: Check the generated configuration files in the preview tabs

9. **Download**: Click "Download ZIP" to get all files

## Using the Generated Files

1. Extract the ZIP file to your project directory

2. Copy your project files to the `workspace` folder (or mount your existing project)

3. Set your API key in the `.env` file:

   ```bash
   ANTHROPIC_API_KEY=your-api-key-here
   ```

4. Build and run the container:

   ```bash
   docker compose up --build
   ```

   **Optional: Custom Software Versions**

   Software versions can be configured via build arguments. Use `latest` for dynamic version fetching or specify an explicit version:

   ```bash
   docker compose build \
     --build-arg GO_VERSION=1.22.0 \
     --build-arg FLUTTER_VERSION=3.24.0 \
     --build-arg PYTHON_VERSION=3.12 \
     --build-arg TYPESCRIPT_VERSION=5.6.0
   ```

   | Build Argument | Default | Description |
   |----------------|---------|-------------|
   | `CLAUDE_CODE_VERSION` | `stable` | Claude Code version (`latest` or specific like `1.0.58`) |
   | `FLUTTER_VERSION` | `latest` | Flutter version (`latest` or specific like `3.24.0`) |
   | `GIT_DELTA_VERSION` | `0.18.2` | Git delta version for diff highlighting |
   | `GO_VERSION` | `latest` | Go version (`latest` or specific like `1.22.0`) |
   | `PYTHON_VERSION` | `3` | Python version (e.g., `3`, `3.12`) |
   | `TYPESCRIPT_VERSION` | `latest` | TypeScript version (`latest` or specific like `5.6.0`) |
   | `ZSH_IN_DOCKER_VERSION` | `1.2.0` | zsh-in-docker version for shell setup |

   **Optional: Custom Download URLs**

   If you need to use a mirror or proxy for package downloads, you can override the default URLs during build. All URLs support query parameters:

   ```bash
   docker compose build \
     --build-arg GO_JSON_URL=https://my-mirror.example.com/golang/?mode=json \
     --build-arg GO_DOWNLOAD_URL=https://my-mirror.example.com/golang \
     --build-arg RUSTUP_INSTALL_URL=https://my-mirror.example.com/rustup/rustup-init.sh \
     --build-arg UV_INSTALL_SCRIPT_URL=https://my-mirror.example.com/uv/install.sh \
     --build-arg FLUTTER_JSON_URL=https://my-mirror.example.com/flutter/releases_linux.json \
     --build-arg FLUTTER_BASE_URL=https://my-mirror.example.com/flutter/releases
   ```

   | Build Argument | Default | Description |
   |----------------|---------|-------------|
   | `FLUTTER_JSON_URL` | `https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json` | URL for Flutter releases JSON API (used when `FLUTTER_VERSION=latest`) |
   | `FLUTTER_BASE_URL` | `https://storage.googleapis.com/flutter_infra_release/releases` | Base URL for Flutter archive downloads |
   | `ANDROID_CMDLINE_TOOLS_URL` | `https://dl.google.com/android/repository` | Base URL for Android command-line tools |
   | `GO_JSON_URL` | `https://go.dev/dl/?mode=json` | URL for Go version JSON API (used when `GO_VERSION=latest`) |
   | `GO_DOWNLOAD_URL` | `https://go.dev/dl` | Base URL for Go archive downloads |
   | `RUSTUP_INSTALL_URL` | `https://sh.rustup.rs` | URL for rustup installer script |
   | `UV_INSTALL_SCRIPT_URL` | `https://astral.sh/uv/install.sh` | URL for uv install script |

5. Connect to the container:

   ```bash
   docker compose exec claude zsh
   ```

6. Initialize the firewall (requires sudo password):

   ```bash
   sudo /usr/local/bin/init-firewall.sh
   ```

7. Start Claude Code:
   ```bash
   claude
   ```

## Generated File Structure

```
├── workspace/
│   ├── .claude/
│   │   └── settings.json    # Claude settings
│   ├── .empty               # Empty file for protected mounts
│   └── CLAUDE.md            # Your Claude instructions
├── .env                     # Environment variables
├── Dockerfile               # Container definition
├── docker-compose.yaml      # Docker Compose configuration
└── init-firewall.sh         # Network firewall script
```

## Troubleshooting

### Firewall Issues

If you encounter network issues after enabling the firewall:

```bash
# Check firewall status
sudo iptables -L -n

# View blocked connections
sudo iptables -L -n -v | grep DROP

# Reset firewall (allows all traffic)
sudo iptables -F
```

### Container Won't Start

```bash
# Check logs
docker compose logs

# Rebuild without cache
docker compose build --no-cache
```

### Permission Denied

Ensure the workspace directory has correct permissions:

```bash
chmod -R 755 workspace
```

### Reset Application Settings

To clear all saved settings and start fresh, open your browser's developer console and run:

```javascript
localStorage.removeItem("claude-initializr-config");
localStorage.removeItem("claude-initializr-welcome-dismissed");
localStorage.removeItem("claude-initializr-autosave");
```

Then reload the page.

Alternatively, you can disable autosave using the save icon toggle in the header to prevent settings from being persisted.

## Tech Stack

- [React 19](https://react.dev/) with TypeScript and React Compiler
- [Vite](https://vite.dev/) as bundler
- [Tailwind CSS v4](https://tailwindcss.com/) with OKLCH color space
- [shadcn/ui](https://ui.shadcn.com/) components (40+ components)
- [react-router](https://reactrouter.com/) for routing
- [i18next](https://www.i18next.com/) for internationalization
- [JSZip](https://stuk.github.io/jszip/) for ZIP generation
- [react-hotkeys-hook](https://github.com/JohannesKlaworkin/react-hotkeys-hook) for keyboard shortcuts
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) for code previews

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding a New Language

1. Create a new locale file in `src/i18n/locales/` (e.g., `fr.ts`)
2. Import and implement the `Translations` interface from `types.ts`
3. Copy the structure from `en.ts` and translate all strings
4. Add the language import to `src/i18n/index.ts`
5. Add the language option to `LanguageSwitcher.tsx`

## Accessibility

This application is designed to be fully accessible:

- Semantic HTML structure (`<header>`, `<main>`, `<footer>`)
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader compatible
- High contrast color schemes
- Focus indicators on interactive elements

## Releases

Releases are automated via GitHub Actions. To create a new release:

1. Create and push a version tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. The workflow automatically:
   - Builds the project
   - Creates a ZIP archive from the `dist/` folder
   - Publishes a GitHub Release with auto-generated release notes

Tags containing `-` (e.g., `v1.0.0-beta`) are marked as pre-releases.

## Changelog

### v3.1.0

- Added keyboard shortcuts for common actions (download, preview toggle, theme switching, card navigation, language switcher, reset)
- Added keyboard shortcuts help dialog with grouped shortcut display
- Added shortcut hints to button tooltips with OS-aware modifier keys
- Added ARIA live region for screen reader announcements of shortcut actions
- Added configuration import/export via JSON files with diff preview and validation

### v3.0.0

- Removed plugins feature from the UI

### v2.0.2

- Switched to native Claude Code installer instead of npm
- Fixed official plugin installation in Dockerfile

### v1.3.0

- Added authentication documentation

### v1.2.0

- Added Docker build arguments documentation to all READMEs
- Added custom download URL documentation for mirrors and proxies

### v1.1.1

- Added version display in the header
- Converted i18n system from JSON to TypeScript with typed interface
- Fixed language switching between README files in ZIP downloads

### v1.0.0

- Initial release
- Docker configuration generator with Dockerfile and docker-compose.yaml
- Software selection (Go, Python, Rust, Flutter, TypeScript, ffmpeg, ImageMagick, uv)
- Custom APT packages, NPM packages, and RUN commands
- CLAUDE.md Markdown editor with preview
- settings.json permission editor (Allow, Ask, Deny rules)
- Environment variables and protected files configuration
- Network firewall script generation
- ZIP download with auto-generated README
- Multi-language support (18 languages)
- Dark/light theme with auto-detection
- Autosave to localStorage
- PWA support
- GitHub Actions release workflow

## Support

If you find this project useful, consider supporting it:

- ⭐ Star the repository on [GitHub](https://github.com/mkloubert/claude-initializr)
- 💝 [Donate via PayPal](https://paypal.me/mjkloubert)

## License

MIT License - see [LICENSE](./LICENSE) for details.

Copyright © 2026 Marcel Joachim Kloubert
