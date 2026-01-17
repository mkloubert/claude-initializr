# Claude Initializr

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

A web application to generate Docker configuration files for running [Claude Code](https://docs.anthropic.com/en/docs/claude-code) safely in a containerized environment.

**Live Demo:** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## Features

### Dockerfile Configuration

- **Base Image**: Configure the Docker base image name and version (default: `node:24`)
- **Software Selection**: Choose additional software to install:
  - TypeScript (with version selection)
  - Python 3 (with version selection)
  - ffmpeg (audio/video processing)
  - ImageMagick (image processing)

### docker-compose.yaml Configuration

- **Environment Variables**: Configure environment variables for your `.env` file
- **Protected Files**: Specify files that should be protected by mounting empty read-only files (prevents access to sensitive files like `.env.local`)

### CLAUDE.md Editor

- Markdown editor with syntax highlighting
- Built-in preview functionality
- Write project-specific instructions for Claude

### General Features

- **Live Preview**: See real-time previews of generated configuration files
- **ZIP Download**: Download all files as a ready-to-use ZIP archive
- **Autosave**: Settings are automatically saved to your browser's localStorage (enabled by default)
- **Multi-language Support**: Available in 18 languages:
  - 🌍 العربية (Arabic)
  - 🇩🇪 Deutsch (German)
  - 🇬🇷 Ελληνικά (Greek)
  - 🇬🇧 English
  - 🇪🇸 Español (Spanish)
  - 🇫🇷 Français (French)
  - 🇮🇱 עברית (Hebrew)
  - 🇮🇳 हिन्दी (Hindi)
  - 🇮🇹 Italiano (Italian)
  - 🇯🇵 日本語 (Japanese)
  - 🇰🇷 한국어 (Korean)
  - 🇳🇱 Nederlands (Dutch)
  - 🇵🇱 Polski (Polish)
  - 🇵🇹 Português (Portuguese)
  - 🇹🇷 Türkçe (Turkish)
  - 🇺🇦 Українська (Ukrainian)
  - 🇵🇰 اردو (Urdu)
  - 🇨🇳 中文 (Chinese)
- **Dark/Light Theme**: Automatic theme detection with manual toggle
- **PWA Support**: Installable as a Progressive Web App
- **Fully Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **Responsive Design**: Optimized for desktop and tablet

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
```

## Usage

1. **Configure Base Image**: Set the Docker base image name and version (e.g., `node:24` or `node:22-slim`)

2. **Select Software**: Choose which additional software to install in your container

3. **Set Environment Variables**: Add any environment variables your project needs (e.g., `ANTHROPIC_API_KEY`)

4. **Protect Sensitive Files**: Add paths to files that should be protected (e.g., `.env.local`)

5. **Edit CLAUDE.md**: Write instructions for Claude in the Markdown editor

6. **Preview**: Check the generated configuration files in the preview tabs

7. **Download**: Click "Download ZIP" to get all files

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
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) for code previews

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding a New Language

1. Create a new locale file in `src/i18n/locales/` (e.g., `fr.json`)
2. Copy the structure from `en.json`
3. Translate all strings
4. Add the language to `src/i18n/index.ts`
5. Add the language option to `LanguageSwitcher.tsx`

## Accessibility

This application is designed to be fully accessible:

- Semantic HTML structure (`<header>`, `<main>`, `<footer>`)
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader compatible
- High contrast color schemes
- Focus indicators on interactive elements

## Support

If you find this project useful, consider supporting it:

- ⭐ Star the repository on [GitHub](https://github.com/mkloubert/claude-initializr)
- 💝 [Donate via PayPal](https://paypal.me/mjkloubert)

## License

MIT License - see [LICENSE](./LICENSE) for details.

Copyright © 2026 Marcel Joachim Kloubert
