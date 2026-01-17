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

import dockerfileTemplate from '../assets/templates/Dockerfile?raw';
import dockerComposeTemplate from '../assets/templates/docker-compose.yaml?raw';
import initFirewallTemplate from '../assets/templates/init-firewall.sh?raw';
import claudeSettingsTemplate from '../assets/templates/workspace/.claude/settings.json?raw';

import type { PlaceholderReplacements } from '../types';

/**
 * Get the raw Dockerfile template content.
 */
export function getDockerfileTemplate(): string {
  return dockerfileTemplate;
}

/**
 * Get the raw docker-compose.yaml template content.
 */
export function getDockerComposeTemplate(): string {
  return dockerComposeTemplate;
}

/**
 * Get the raw init-firewall.sh template content.
 */
export function getInitFirewallTemplate(): string {
  return initFirewallTemplate;
}

/**
 * Get the raw .claude/settings.json template content.
 */
export function getClaudeSettingsTemplate(): string {
  return claudeSettingsTemplate;
}

/**
 * Replace placeholders in a template string with the provided values.
 *
 * @param template - The template string containing placeholders
 * @param replacements - Map of placeholder names to replacement values
 * @returns The processed template with placeholders replaced
 */
export function replacePlaceholders(
  template: string,
  replacements: PlaceholderReplacements
): string {
  let result = template;

  for (const [placeholder, value] of Object.entries(replacements)) {
    if (value !== undefined) {
      // When value is empty, also remove the trailing newline
      const suffix = value === '' ? '\\n?' : '';
      const pattern = new RegExp(`### \\{\\{TEMPLATE: ${placeholder}\\}\\} ###${suffix}`, 'g');
      result = result.replace(pattern, value);
    }
  }

  // Remove any remaining unreplaced placeholders (clean up empty ones)
  result = result.replace(/### \{\{TEMPLATE: [A-Z_]+\}\} ###\n?/g, '');

  // Reduce multiple consecutive empty lines to a single empty line
  result = result.replace(/\n{3,}/g, '\n\n');

  return result;
}

/**
 * Process the Dockerfile template with the given placeholder replacements.
 */
export function processDockerfile(replacements: PlaceholderReplacements): string {
  return replacePlaceholders(getDockerfileTemplate(), replacements);
}

/**
 * Process the docker-compose.yaml template with the given placeholder replacements.
 */
export function processDockerCompose(replacements: PlaceholderReplacements): string {
  return replacePlaceholders(getDockerComposeTemplate(), replacements);
}
