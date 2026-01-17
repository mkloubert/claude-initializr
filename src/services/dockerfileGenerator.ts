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
import { softwareInstallOrder } from '@/config/containerPackages';

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
 * APT packages for each software, keyed by software ID.
 */
const aptPackagesByKey: Record<string, string[]> = {
  python: ['python${PYTHON_VERSION}', 'python${PYTHON_VERSION}-venv', 'python3-pip'],
  uv: ['curl'],
  ffmpeg: ['ffmpeg'],
  imagemagick: ['imagemagick'],
};

/**
 * Generate additional APT packages based on selected software and custom packages.
 * Packages are added in installation order.
 */
export function generateAptPackages(software: SoftwareConfig, customPackages: string[] = []): string {
  const packages: string[] = [];

  // Add packages in installation order
  for (const key of softwareInstallOrder) {
    const pkg = software[key as keyof SoftwareConfig];
    if (pkg?.enabled && aptPackagesByKey[key]) {
      packages.push(...aptPackagesByKey[key]);
    }
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
 * Root user installation commands for each software, keyed by software ID.
 * Returns array of command lines or null if no root commands needed.
 */
type RootCommandGenerator = (software: SoftwareConfig) => string[] | null;

const rootCommandsByKey: Record<string, RootCommandGenerator> = {
  python: () => [
    '# Create Python symlinks for easier access',
    'RUN ln -sf /usr/bin/python${PYTHON_VERSION} /usr/local/bin/python && \\',
    '    ln -sf /usr/bin/pip3 /usr/local/bin/pip',
  ],
  uv: () => [
    '# Install uv (Python package manager) system-wide',
    'RUN curl -LsSf https://astral.sh/uv/install.sh \\',
    '    | env UV_INSTALL_DIR=/usr/local/bin INSTALLER_NO_MODIFY_PATH=1 sh',
  ],
};

/**
 * Generate Dockerfile commands to run as root user.
 * Commands are generated in installation order.
 */
export function generateRootUserExtensions(
  software: SoftwareConfig,
  customNpmPackages: CustomNpmPackage[] = [],
  customRunCommands: CustomRunCommand[] = []
): string {
  const commands: string[] = [];

  // Add software commands in installation order
  for (const key of softwareInstallOrder) {
    const pkg = software[key as keyof SoftwareConfig];
    const generator = rootCommandsByKey[key];
    if (pkg?.enabled && generator) {
      const cmds = generator(software);
      if (cmds) {
        commands.push(...cmds);
      }
    }
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
 * Node user installation commands for each software, keyed by software ID.
 * Returns array of command lines or null if no node commands needed.
 */
type NodeCommandGenerator = (software: SoftwareConfig) => string[] | null;

const nodeCommandsByKey: Record<string, NodeCommandGenerator> = {
  typescript: () => [
    '# Install TypeScript globally',
    'RUN npm install -g typescript@${TYPESCRIPT_VERSION}',
  ],
  uv: () => [
    '# Make uv available for the node user',
    'RUN mkdir -p /home/node/.local/bin && \\',
    '    cp /usr/local/bin/uv /home/node/.local/bin/uv',
    'ENV PATH="/home/node/.local/bin:${PATH}"',
  ],
};

/**
 * Generate Dockerfile commands to run as node user.
 * Commands are generated in installation order.
 */
export function generateNodeUserExtensions(
  software: SoftwareConfig,
  customNpmPackages: CustomNpmPackage[] = [],
  customRunCommands: CustomRunCommand[] = []
): string {
  const commands: string[] = [];

  // Add software commands in installation order
  for (const key of softwareInstallOrder) {
    const pkg = software[key as keyof SoftwareConfig];
    const generator = nodeCommandsByKey[key];
    if (pkg?.enabled && generator) {
      const cmds = generator(software);
      if (cmds) {
        commands.push(...cmds);
      }
    }
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
