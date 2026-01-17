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
 * Placeholder names used in Dockerfile template.
 */
export type DockerfilePlaceholder =
  | 'BASE_IMAGE'
  | 'NODE_VERSION'
  | 'DOCKER_ARGS'
  | 'MORE_APT_PACKAGES'
  | 'RUN_AS_ROOT_USER_EXTENSIONS'
  | 'RUN_AS_NODE_USER_EXTENSIONS';

/**
 * Placeholder names used in docker-compose.yaml template.
 */
export type DockerComposePlaceholder = 'EMPTY_FILE_LINKS';

/**
 * All available template placeholder names.
 */
export type TemplatePlaceholder = DockerfilePlaceholder | DockerComposePlaceholder;

/**
 * Map of placeholder names to their replacement content.
 */
export type PlaceholderReplacements = Partial<Record<TemplatePlaceholder, string>>;

/**
 * Pattern used to identify placeholders in templates.
 * Format: ### {{TEMPLATE: PLACEHOLDER_NAME}} ###
 */
export const PLACEHOLDER_PATTERN = /### \{\{TEMPLATE: ([A-Z_]+)\}\} ###/g;

/**
 * Creates a placeholder string for insertion into templates.
 */
export function createPlaceholder(name: TemplatePlaceholder): string {
  return `### {{TEMPLATE: ${name}}} ###`;
}

/**
 * Template file paths relative to the assets/templates directory.
 */
export const TEMPLATE_PATHS = {
  dockerfile: 'Dockerfile',
  dockerCompose: 'docker-compose.yaml',
  env: '.env',
  empty: '.empty',
  initFirewall: 'init-firewall.sh',
  workspace: {
    claudeMd: 'workspace/CLAUDE.md',
    claudeSettings: 'workspace/.claude/settings.json',
  },
} as const;

/**
 * Output file paths for the generated ZIP archive.
 */
export const OUTPUT_PATHS = {
  dockerfile: 'Dockerfile',
  dockerCompose: 'docker-compose.yaml',
  env: '.env',
  empty: 'workspace/.empty',
  initFirewall: 'init-firewall.sh',
  claudeMd: 'workspace/CLAUDE.md',
  claudeSettings: 'workspace/.claude/settings.json',
} as const;
