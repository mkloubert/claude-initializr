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

const en: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Generate Docker configuration files for running Claude Code securely"
  },
  "welcome": {
    "close": "Close welcome message",
    "description": "Claude Code is Anthropic's powerful AI coding assistant that can read, write, and execute code directly on your machine. While incredibly useful, running an AI with file system and terminal access requires careful consideration of security.",
    "purpose": "This tool generates a complete Docker configuration that lets you run Claude Code in an isolated container environment. Your code stays protected while Claude can still help you develop, debug, and refactor.",
    "features": {
      "title": "What you can configure:",
      "dockerfile": "Choose which development tools to install (TypeScript, Python, Go, ffmpeg, ImageMagick)",
      "compose": "Set environment variables (like your API key) and protect sensitive files from being accessed",
      "claudeMd": "Write project-specific instructions that Claude reads at the start of each session"
    },
    "security": {
      "title": "Security features included:",
      "firewall": "Network firewall that only allows connections to Anthropic API, npm, and GitHub",
      "isolation": "Complete isolation from your host system and local network",
      "readonly": "Sensitive files mounted as empty read-only files",
      "capabilities": "All Linux capabilities dropped, no privilege escalation allowed"
    },
    "privacy": {
      "title": "Privacy notice:",
      "description": "Your settings are stored locally in your browser (localStorage) so they are preserved when you return. For security reasons, environment variable values are never stored – only the variable names are saved. No data is sent to any server. You can disable autosave at any time using the save icon in the header – this will also clear all stored data."
    }
  },
  "nav": {
    "header": "Header navigation"
  },
  "tabs": {
    "software": "Software",
    "preview": "Preview",
    "settings": "Settings",
    "envVariables": "Environment",
    "env": "Env",
    "protectedFiles": "Protected Files",
    "protected": "Protected"
  },
  "language": {
    "switch": "Language"
  },
  "theme": {
    "switch": "Toggle theme"
  },
  "autosave": {
    "enable": "Enable autosave",
    "disable": "Disable autosave"
  },
  "reset": {
    "button": "Reset to defaults",
    "title": "Reset Settings",
    "description": "Are you sure you want to reset all settings to their default values? This action cannot be undone.",
    "cancel": "Cancel",
    "confirm": "Reset"
  },
  "software": {
    "baseImage": "Base Image",
    "baseImageDesc": "The Docker base image determines the foundation of your container. The default 'node' image includes Node.js and npm. You can also use variants like 'node:22-slim' for smaller images or 'node:22-bookworm' for additional system libraries.",
    "image": "Image",
    "typescript": "TypeScript",
    "typescriptDesc": "Installs the TypeScript compiler (tsc) and ts-node for running TypeScript directly. Essential for TypeScript projects, enabling type checking, compilation to JavaScript, and running .ts files without manual compilation.",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "A powerful multimedia framework for processing audio and video files. Enables format conversion, video editing, audio extraction, streaming, and media analysis. Required for projects that work with media files.",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "A comprehensive image processing suite supporting over 200 formats. Provides tools for resizing, cropping, format conversion, watermarking, and programmatic image manipulation. Ideal for automated image workflows.",
    "python": "Python 3",
    "pythonDesc": "Installs the Python 3 interpreter with pip package manager. Enables running Python scripts, installing Python packages, and using Python-based tools. Useful for data processing, scripting, and AI/ML tasks.",
    "uv": "uv",
    "uvDesc": "Installs uv, an extremely fast Python package installer and resolver written in Rust. It can replace pip, pip-tools, and virtualenv for faster dependency management.",
    "golang": "Go",
    "golangDesc": "Installs the Go programming language (Golang) with the official compiler and tools. Ideal for building fast, statically compiled programs, CLI tools, web servers, and system software.",
    "flutter": "Flutter",
    "flutterDesc": "Installs the Flutter SDK with Dart and Android development tools. Build cross-platform apps for mobile, web, and desktop from a single codebase. Includes Android SDK and command-line tools.",
    "rust": "Rust",
    "rustDesc": "Installs the Rust programming language with Cargo package manager via rustup. Ideal for building fast, memory-safe system software, CLI tools, WebAssembly, and embedded applications.",
    "version": "Version",
    "latest": "latest",
    "recommendsHint": "Recommended: {{packages}}"
  },
  "aptPackages": {
    "title": "Custom APT Packages",
    "description": "Add additional Debian/Ubuntu packages to install in the container.",
    "placeholder": "Example: curl, graphviz, tree, sqlite3...",
    "add": "Add packages",
    "remove": "Remove {{package}}"
  },
  "npmPackages": {
    "title": "Custom NPM Packages",
    "description": "Add additional NPM packages to install globally in the container.",
    "placeholder": "Example: eslint, prettier, tsx...",
    "add": "Add packages",
    "remove": "Remove {{package}}",
    "installAs": "Install as",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Toggle install user for {{package}}"
  },
  "runCommands": {
    "title": "Custom RUN Commands",
    "description": "Add custom shell commands to execute during Docker image build.",
    "placeholder": "Example: flutter doctor",
    "add": "Add command",
    "remove": "Remove command",
    "runAs": "Run as",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Toggle run user for command"
  },
  "env": {
    "description": "No environment variables defined.",
    "key": "Key",
    "value": "Value",
    "add": "Add Variable",
    "remove": "Remove",
    "keyPlaceholder": "Example: VARIABLE_NAME",
    "valuePlaceholder": "Example: value"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "The CLAUDE.md file contains project-specific instructions that Claude reads at the start of each session. This is the place for coding guidelines, project structure explanations, preferred technologies, or any other context that helps Claude understand the project better."
  },
  "protectedFiles": {
    "description": "No protected files defined.",
    "path": "File Path",
    "add": "Add Path",
    "remove": "Remove",
    "pathPlaceholder": "Example: .env.local",
    "help": "Paths are relative to /workspace/. These files will be mounted as empty read-only files to prevent access to sensitive data."
  },
  "settings": {
    "title": "settings.json",
    "description": "Configure Claude Code permissions to control which files can be read, edited, or fetched. Protected files are automatically added as deny rules.",
    "permissions": "Permissions",
    "directive": "Directive",
    "pattern": "Pattern",
    "patternPlaceholder": "Example: src/** or .env",
    "addRule": "Add Rule",
    "removeRule": "Remove rule",
    "allow": "Allow",
    "ask": "Ask",
    "deny": "Deny",
    "noAllowRules": "No allow rules defined.",
    "noAskRules": "No ask rules defined.",
    "noDenyRules": "No deny rules defined.",
    "help": "Define permission rules for Read(), Edit(), and WebFetch() operations. Patterns support glob syntax like src/** for recursive matching.",
    "learnMore": "Learn more"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "The Dockerfile defines which software is installed in the container. In addition to Node.js and Claude Code, additional tools like TypeScript, Python, Go, ffmpeg or ImageMagick can be included. The selected software will be available when Claude executes commands.",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "The docker-compose.yaml file controls how the container is started. Environment variables (like API keys) can be defined here. Protected files are mounted as empty read-only files to prevent Claude from accessing sensitive data like .env files."
  },
  "dockerCompose": {
    "platform": "Platform",
    "platformDesc": "Set a specific platform for the container (e.g., linux/amd64). Leave empty to use the default platform. Use this when base images do not support your architecture.",
    "platformPlaceholder": "Example: linux/amd64"
  },
  "download": {
    "button": "Download ZIP",
    "generating": "Generating...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "GitHub Repository",
    "paypal": "Support via PayPal"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "English",
    "de": "German",
    "es": "Spanish",
    "fr": "French",
    "it": "Italian",
    "pt": "Portuguese",
    "nl": "Dutch",
    "ja": "Japanese",
    "ko": "Korean",
    "zh": "Chinese",
    "ar": "Arabic",
    "he": "Hebrew",
    "hi": "Hindi",
    "ur": "Urdu",
    "uk": "Ukrainian",
    "el": "Greek",
    "pl": "Polish",
    "tr": "Turkish"
  },
  "errors": {
    "invalidEnvKey": "Invalid variable name. Use only letters, numbers, and underscores.",
    "duplicateEnvKey": "This variable name already exists.",
    "invalidPath": "Path must be relative (no leading /) and cannot contain .."
  },
  "readme": {
    "title": "Claude Code Docker Configuration",
    "generatedBy": "Generated by [Claude Initializr]({{url}})",
    "languageSwitch": "Read this in {{language}}",
    "intro": {
      "title": "About This Configuration",
      "description": "This folder contains Docker configuration files to run Claude Code securely in an isolated container. The configuration provides network isolation, file protection, and a sandboxed environment for AI-assisted development."
    },
    "files": {
      "title": "Files Overview",
      "dockerfile": "Dockerfile - Defines the container image with all development tools",
      "dockerCompose": "docker-compose.yaml - Orchestration file for starting the container",
      "env": ".env - Environment variables (add your API keys here)",
      "initFirewall": "init-firewall.sh - Network firewall script for security",
      "workspace": "workspace/ - Your working directory mounted into the container",
      "claudeMd": "workspace/CLAUDE.md - Project instructions for Claude",
      "settingsJson": "workspace/.claude/settings.json - Claude Code permission settings"
    },
    "baseImage": {
      "title": "Base Image",
      "description": "This configuration uses the following Docker base image:",
      "dockerHub": "View on Docker Hub"
    },
    "platform": {
      "title": "Platform",
      "description": "The container is configured to run on this platform:"
    },
    "aptPackages": {
      "title": "System Packages (APT)",
      "description": "The following system packages are installed:"
    },
    "npmPackages": {
      "title": "Additional NPM Packages",
      "description": "The following additional NPM packages are installed globally:",
      "installedAs": "installed as {{user}}"
    },
    "envVariables": {
      "title": "Environment Variables",
      "description": "The following environment variables are configured (values not shown for security):",
      "note": "Add your actual values to the .env file before starting the container."
    },
    "protectedFiles": {
      "title": "Protected Files",
      "description": "The following files are protected and mounted as empty read-only files to prevent access:"
    },
    "settingsJson": {
      "title": "Permission Settings",
      "description": "Claude Code is configured with the following permission rules:",
      "allow": "Allowed operations (automatic)",
      "ask": "Operations requiring confirmation",
      "deny": "Denied operations"
    },
    "claudeMd": {
      "title": "Project Instructions",
      "description": "Project-specific instructions for Claude are defined in:"
    },
    "quickStart": {
      "title": "Quick Start",
      "step1": "Install Docker (see Prerequisites below)",
      "step2": "Start the container:",
      "step2CustomVersions": "Optional: Build with custom software versions (see Build Arguments below):",
      "step3": "Start Claude Code:",
      "step4": "Stop the container:",
      "note": "Your workspace folder is mounted at /workspace inside the container. See the Authentication section below for login options."
    },
    "authentication": {
      "title": "Authentication",
      "description": "Claude Code supports two authentication methods. Choose the one that best fits your needs:",
      "apiKey": {
        "title": "Option 1: API Key",
        "description": "Set your API key in the `.env` file (`ANTHROPIC_API_KEY`). Claude Code will use it automatically.",
        "pros": [
          "Works in headless/automated environments (CI/CD, containers, SSH)",
          "No browser required",
          "No usage limits (pay per use)",
          "Reliable in all environments"
        ],
        "cons": [
          "Costs money per API call (standard API rates)",
          "Need to manage and secure the API key",
          "Can lead to unexpected charges without spending limits"
        ]
      },
      "browserLogin": {
        "title": "Option 2: Browser Login (Claude Pro/Max/Team)",
        "description": "Run `/login` inside Claude Code to authenticate via browser with your subscription.",
        "pros": [
          "Included in your subscription (predictable monthly cost)",
          "No additional API costs",
          "Unified billing with Claude.ai"
        ],
        "cons": [
          "Requires browser for initial login",
          "Has usage limits that reset weekly",
          "Authentication may not persist in containers/SSH sessions"
        ]
      }
    },
    "buildArgs": {
      "title": "Docker Build Arguments",
      "description": "You can configure software versions and download URLs during the Docker build. Use `--build-arg NAME=VALUE` to override defaults.",
      "versionArgs": {
        "title": "Version Arguments",
        "description": "Control which versions of software are installed:"
      },
      "urlArgs": {
        "title": "URL Arguments",
        "description": "Override download URLs for mirrors or proxies:"
      },
      "defaultValue": "Default",
      "example": "Example with custom versions:"
    },
    "prerequisites": {
      "title": "Prerequisites",
      "description": "You need Docker installed on your system. Choose your operating system:",
      "windows": {
        "title": "Windows",
        "steps": [
          "Download Docker Desktop from docker.com/products/docker-desktop",
          "Run the installer and follow the setup wizard",
          "Enable WSL 2 backend when prompted (recommended)",
          "Restart your computer if required",
          "Open Docker Desktop and wait for it to start"
        ],
        "link": "Official Windows Installation Guide"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "Download Docker Desktop from docker.com/products/docker-desktop",
          "Open the .dmg file and drag Docker to Applications",
          "Open Docker from Applications folder",
          "Grant required permissions when prompted",
          "Wait for Docker to finish starting (whale icon in menu bar)"
        ],
        "link": "Official macOS Installation Guide"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "Update your package index: sudo apt update",
          "Install Docker: sudo apt install docker.io docker-compose-v2",
          "Add your user to docker group: sudo usermod -aG docker $USER",
          "Log out and log back in for group changes to take effect",
          "Verify installation: docker --version"
        ],
        "link": "Official Linux Installation Guide",
        "altNote": "Or install Docker Desktop for a GUI experience."
      }
    },
    "troubleshooting": {
      "title": "Troubleshooting",
      "issues": {
        "containerNotStarting": {
          "title": "Container does not start",
          "solutions": [
            "Check if Docker is running: docker info",
            "Verify the .env file exists and contains ANTHROPIC_API_KEY",
            "Check for port conflicts: docker ps",
            "View container logs: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "Permission denied errors",
          "solutions": [
            "On Linux, ensure your user is in the docker group",
            "Try running with sudo (not recommended for regular use)",
            "Check file permissions in the workspace folder"
          ]
        },
        "networkIssues": {
          "title": "Network or API connection issues",
          "solutions": [
            "The firewall script allows only specific domains",
            "Ensure api.anthropic.com is accessible from your network",
            "Check firewall logs inside container: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "Files not accessible in container",
          "solutions": [
            "Protected files are intentionally empty - this is expected",
            "Check volume mounts in docker-compose.yaml",
            "Ensure the workspace folder exists on host"
          ]
        }
      }
    },
    "links": {
      "title": "Links",
      "initializer": "Generate new configuration",
      "documentation": "Claude Code Documentation",
      "support": "Report Issues"
    },
    "author": {
      "title": "Author",
      "createdBy": "Created by",
      "support": "Support this project"
    },
    "software": {
      "title": "Installed Software",
      "description": "The following development tools are installed:"
    }
  }
};

export default en;
