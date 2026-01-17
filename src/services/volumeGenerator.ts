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

import type { ProtectedFile } from '@/types';

/**
 * Validates a protected file path.
 * Valid paths are relative (no leading "/") and don't contain "..".
 */
function isValidProtectedPath(path: string): boolean {
  if (!path) return false;
  if (path.startsWith('/')) return false;
  if (path.includes('..')) return false;
  return true;
}

/**
 * Generate volume mount lines for protected files.
 * These mount the .empty file as a read-only replacement for sensitive files.
 * Paths are relative to /workspace/.
 *
 * Example output:
 *   - ./workspace/.empty:/workspace/.env.local:ro
 *   - ./workspace/.empty:/workspace/api/.secrets:ro
 */
export function generateProtectedFileVolumes(files: ProtectedFile[]): string {
  const validFiles = files.filter((f) => f.path && isValidProtectedPath(f.path));

  if (validFiles.length === 0) {
    return '';
  }

  const lines = validFiles.map((file) => {
    // Convert relative path to absolute container path
    // .env.local -> ./workspace/.empty:/workspace/.env.local:ro
    return `- ./workspace/.empty:/workspace/${file.path}:ro`;
  });

  return lines.join('\n      ');
}

/**
 * Generate docker-compose placeholder replacement for protected files.
 */
export function generateDockerComposeReplacements(files: ProtectedFile[]): {
  EMPTY_FILE_LINKS: string;
} {
  return {
    EMPTY_FILE_LINKS: generateProtectedFileVolumes(files),
  };
}
