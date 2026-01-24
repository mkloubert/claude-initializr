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

/**
 * Base APT packages that are always installed in the container.
 * These come from the Dockerfile template.
 */
export const baseAptPackages: string[] = [
  'aggregate',
  'dnsutils',
  'fzf',
  'gh',
  'git',
  'gnupg2',
  'iptables',
  'ipset',
  'iproute2',
  'jq',
  'less',
  'man-db',
  'nano',
  'procps',
  'sudo',
  'unzip',
  'vim',
  'zsh',
];

/**
 * Base NPM packages that are always installed globally in the container.
 * Note: Claude Code is now installed via native installer, not npm.
 */
export const baseNpmPackages: string[] = [];

/**
 * Optional APT packages mapped to software config keys.
 */
export const optionalAptPackages: Record<string, string[]> = {
  ffmpeg: ['ffmpeg'],
  imagemagick: ['imagemagick'],
  python: ['python3', 'python3-pip', 'python3-venv'],
  uv: ['wget'],
  flutter: ['wget', 'xz-utils', 'zip', 'libglu1-mesa', 'openjdk-17-jdk'],
  rust: ['curl', 'build-essential', 'pkg-config', 'libssl-dev'],
};

/**
 * Optional NPM packages mapped to software config keys.
 */
export const optionalNpmPackages: Record<string, string[]> = {
  typescript: ['typescript'],
};

/**
 * Installation order for software packages.
 * Packages are installed and displayed in this order (dependencies before dependents).
 * This ensures that packages like uv are installed after their dependencies (e.g., Python).
 */
export const softwareInstallOrder: string[] = [
  'python',
  'uv',
  'golang',
  'rust',
  'flutter',
  'typescript',
  'ffmpeg',
  'imagemagick',
];
