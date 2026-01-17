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

import type { SoftwareConfig } from '@/types';

/**
 * Generate additional APT packages based on selected software.
 */
export function generateAptPackages(software: SoftwareConfig): string {
  const packages: string[] = [];

  if (software.ffmpeg.enabled) {
    packages.push('ffmpeg');
  }

  if (software.imagemagick.enabled) {
    packages.push('imagemagick');
  }

  if (software.python.enabled) {
    packages.push('python3', 'python3-pip', 'python3-venv');
  }

  if (packages.length === 0) {
    return '';
  }

  return packages.join(' \\\n  ');
}

/**
 * Generate Dockerfile commands to run as root user.
 */
export function generateRootUserExtensions(software: SoftwareConfig): string {
  const commands: string[] = [];

  // Python symlinks (run as root for /usr/local/bin access)
  if (software.python.enabled) {
    commands.push(
      '# Create Python symlinks for easier access',
      'RUN ln -sf /usr/bin/python3 /usr/local/bin/python && \\',
      '    ln -sf /usr/bin/pip3 /usr/local/bin/pip'
    );
  }

  return commands.join('\n');
}

/**
 * Generate Dockerfile commands to run as node user.
 */
export function generateNodeUserExtensions(software: SoftwareConfig): string {
  const commands: string[] = [];

  // TypeScript installation (as node user via npm)
  if (software.typescript.enabled) {
    const version = software.typescript.version || 'latest';
    const packageSpec = version === 'latest' ? 'typescript' : `typescript@${version}`;
    commands.push(
      '# Install TypeScript globally',
      `RUN npm install -g ${packageSpec}`
    );
  }

  return commands.join('\n');
}

/**
 * Generate all Dockerfile placeholder replacements based on software configuration.
 */
export function generateDockerfileReplacements(software: SoftwareConfig): {
  MORE_APT_PACKAGES: string;
  RUN_AS_ROOT_USER_EXTENSIONS: string;
  RUN_AS_NODE_USER_EXTENSIONS: string;
} {
  return {
    MORE_APT_PACKAGES: generateAptPackages(software),
    RUN_AS_ROOT_USER_EXTENSIONS: generateRootUserExtensions(software),
    RUN_AS_NODE_USER_EXTENSIONS: generateNodeUserExtensions(software),
  };
}
