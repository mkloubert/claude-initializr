# Claude Initializr

A web application to generate Docker configuration files for running Claude Code safely in a containerized environment.

## Features

- **Software Selection**: Choose additional software to install in your container:
  - TypeScript (with version selection)
  - ffmpeg (audio/video processing)
  - ImageMagick (image processing)
  - Python 3 (with version selection)

- **Environment Variables Editor**: Configure environment variables for your `.env` file using a simple table interface.

- **CLAUDE.md Editor**: Edit the CLAUDE.md file with a Markdown editor that includes syntax highlighting and preview.

- **Protected Files**: Specify files that should be protected by mounting empty read-only files. This prevents access to sensitive files like `.env.local` or credentials.

- **Live Preview**: See real-time previews of generated files:
  - Dockerfile
  - docker-compose.yaml
  - .claude/settings.json

- **ZIP Download**: Download all configuration files as a ZIP archive ready to use with Docker.

- **Multi-language Support**: Available in English and German.

- **Accessible**: Fully accessible with keyboard navigation and screen reader support.

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm 10 or later

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Configure Software**: On the Configuration tab, select which software you want installed in your container.

2. **Set Environment Variables**: Add any environment variables your project needs.

3. **Edit CLAUDE.md**: Write instructions for Claude in the Markdown editor.

4. **Protect Sensitive Files**: Add paths to files that should be protected (e.g., `/workspace/.env.local`).

5. **Preview**: Switch to the Preview tab to see the generated configuration files.

6. **Download**: Click the "Download ZIP" button to get all files.

## Using the Generated Files

1. Extract the ZIP file to your project directory.

2. Create your workspace folder:

   ```bash
   mkdir -p workspace
   ```

3. Copy your project files to the workspace folder.

4. Build and run the container:

   ```bash
   docker compose up --build
   ```

5. Connect to the container:
   ```bash
   docker compose exec claude bash
   ```

## File Structure

The generated ZIP contains:

```
├── .claude/
│   └── settings.json     # Claude settings
├── workspace/
│   ├── .empty           # Empty file for protected mounts
│   └── CLAUDE.md        # Your Claude instructions
├── .env                 # Environment variables
├── Dockerfile           # Container definition
├── docker-compose.yaml  # Docker Compose configuration
└── init-firewall.sh     # Network firewall script
```

## Tech Stack

- React 19 with TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- react-router
- i18next
- JSZip

## License

MIT License - see [LICENSE](./LICENSE) for details.

Copyright 2026 Marcel Joachim Kloubert
