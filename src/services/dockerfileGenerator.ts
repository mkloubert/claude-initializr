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

import type { CustomNpmPackage, CustomRunCommand, SoftwareConfig } from '@/types';

/**
 * Generate Docker ARG definitions for software versions.
 */
export function generateDockerArgs(software: SoftwareConfig): string {
  const args: string[] = [];

  if (software.typescript.enabled) {
    const version = software.typescript.version || 'latest';
    args.push(`ARG TYPESCRIPT_VERSION=${version}`);
  }

  if (software.python.enabled) {
    const version = software.python.version || '3';
    args.push(`ARG PYTHON_VERSION=${version}`);
  }

  return args.join('\n');
}

/**
 * Generate additional APT packages based on selected software and custom packages.
 */
export function generateAptPackages(software: SoftwareConfig, customPackages: string[] = []): string {
  const packages: string[] = [];

  if (software.ffmpeg.enabled) {
    packages.push('ffmpeg');
  }

  if (software.imagemagick.enabled) {
    packages.push('imagemagick');
  }

  if (software.python.enabled) {
    // Use ARG variable for Python version (e.g., python3.11, python3.12)
    packages.push(
      'python${PYTHON_VERSION}',
      'python${PYTHON_VERSION}-venv',
      'python3-pip'
    );
  }

  // Add custom packages (already deduplicated by the config layer)
  if (customPackages.length > 0) {
    packages.push(...customPackages);
  }

  if (packages.length === 0) {
    return '';
  }

  // Indent packages and add line continuations
  return '  ' + packages.join(' \\\n  ') + ' \\';
}

/**
 * Generate Dockerfile commands to run as root user.
 */
export function generateRootUserExtensions(
  software: SoftwareConfig,
  customNpmPackages: CustomNpmPackage[] = [],
  customRunCommands: CustomRunCommand[] = []
): string {
  const commands: string[] = [];

  // Python symlinks (run as root for /usr/local/bin access)
  if (software.python.enabled) {
    commands.push(
      '# Create Python symlinks for easier access',
      'RUN ln -sf /usr/bin/python${PYTHON_VERSION} /usr/local/bin/python && \\',
      '    ln -sf /usr/bin/pip3 /usr/local/bin/pip'
    );
  }

  // Custom NPM packages to install as root
  const rootNpmPackages = customNpmPackages
    .filter((pkg) => pkg.installAs === 'root')
    .map((pkg) => pkg.name);

  if (rootNpmPackages.length > 0) {
    commands.push(
      '# Install custom global NPM packages (as root)',
      `RUN npm install -g ${rootNpmPackages.join(' ')}`
    );
  }

  // Custom RUN commands to execute as root
  const rootRunCommands = customRunCommands.filter((cmd) => cmd.runAs === 'root');

  if (rootRunCommands.length > 0) {
    commands.push('# Custom commands (as root)');
    for (const cmd of rootRunCommands) {
      commands.push(`RUN ${cmd.command}`);
    }
  }

  return commands.join('\n');
}

/**
 * Generate Dockerfile commands to run as node user.
 */
export function generateNodeUserExtensions(
  software: SoftwareConfig,
  customNpmPackages: CustomNpmPackage[] = [],
  customRunCommands: CustomRunCommand[] = []
): string {
  const commands: string[] = [];

  // TypeScript installation (as node user via npm) - uses ARG for version
  if (software.typescript.enabled) {
    commands.push(
      '# Install TypeScript globally',
      'RUN npm install -g typescript@${TYPESCRIPT_VERSION}'
    );
  }

  // Custom NPM packages to install as node user
  const nodeNpmPackages = customNpmPackages
    .filter((pkg) => pkg.installAs === 'node')
    .map((pkg) => pkg.name);

  if (nodeNpmPackages.length > 0) {
    commands.push(
      '# Install custom global NPM packages (as node)',
      `RUN npm install -g ${nodeNpmPackages.join(' ')}`
    );
  }

  // Custom RUN commands to execute as node user
  const nodeRunCommands = customRunCommands.filter((cmd) => cmd.runAs === 'node');

  if (nodeRunCommands.length > 0) {
    commands.push('# Custom commands (as node)');
    for (const cmd of nodeRunCommands) {
      commands.push(`RUN ${cmd.command}`);
    }
  }

  return commands.join('\n');
}

/**
 * Generate all Dockerfile placeholder replacements based on configuration.
 */
export function generateDockerfileReplacements(
  baseImage: string,
  nodeVersion: string,
  software: SoftwareConfig,
  customAptPackages: string[] = [],
  customNpmPackages: CustomNpmPackage[] = [],
  customRunCommands: CustomRunCommand[] = []
): {
  BASE_IMAGE: string;
  NODE_VERSION: string;
  DOCKER_ARGS: string;
  MORE_APT_PACKAGES: string;
  RUN_AS_ROOT_USER_EXTENSIONS: string;
  RUN_AS_NODE_USER_EXTENSIONS: string;
} {
  return {
    BASE_IMAGE: baseImage,
    NODE_VERSION: nodeVersion,
    DOCKER_ARGS: generateDockerArgs(software),
    MORE_APT_PACKAGES: generateAptPackages(software, customAptPackages),
    RUN_AS_ROOT_USER_EXTENSIONS: generateRootUserExtensions(software, customNpmPackages, customRunCommands),
    RUN_AS_NODE_USER_EXTENSIONS: generateNodeUserExtensions(software, customNpmPackages, customRunCommands),
  };
}
