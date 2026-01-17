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

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { AppConfig } from '@/types';
import {
  processDockerfile,
  processDockerCompose,
  getInitFirewallTemplate,
  getClaudeSettingsTemplate,
} from './templateService';
import { generateDockerfileReplacements } from './dockerfileGenerator';
import { generateEnvFileContent } from './envGenerator';
import { generateDockerComposeReplacements } from './volumeGenerator';

/**
 * Generate a ZIP file containing all Docker configuration files.
 */
export async function generateZipFile(config: AppConfig): Promise<Blob> {
  const zip = new JSZip();

  // Generate Dockerfile with software selections and custom packages
  const dockerfileReplacements = generateDockerfileReplacements(
    config.baseImage,
    config.nodeVersion,
    config.software,
    config.customAptPackages,
    config.customNpmPackages
  );
  const dockerfileContent = processDockerfile(dockerfileReplacements);
  zip.file('Dockerfile', dockerfileContent);

  // Generate docker-compose.yaml with protected file mounts
  const dockerComposeReplacements = generateDockerComposeReplacements(config.protectedFiles);
  const dockerComposeContent = processDockerCompose(dockerComposeReplacements);
  zip.file('docker-compose.yaml', dockerComposeContent);

  // Generate .env file
  const envContent = generateEnvFileContent(config.envVariables);
  zip.file('.env', envContent);

  // Include init-firewall.sh
  const initFirewallContent = getInitFirewallTemplate();
  zip.file('init-firewall.sh', initFirewallContent);

  // Create workspace directory structure
  const workspace = zip.folder('workspace');
  if (workspace) {
    // Include .empty file for protected file mounts
    workspace.file('.empty', '');

    // Include CLAUDE.md
    workspace.file('CLAUDE.md', config.claudeMdContent);

    // Include .claude/settings.json
    const claudeFolder = workspace.folder('.claude');
    if (claudeFolder) {
      const settingsContent = getClaudeSettingsTemplate();
      // Pretty-print JSON
      let formattedSettings: string;
      try {
        const parsed = JSON.parse(settingsContent);
        formattedSettings = JSON.stringify(parsed, null, 2);
      } catch {
        formattedSettings = settingsContent;
      }
      claudeFolder.file('settings.json', formattedSettings);
    }
  }

  // Generate the ZIP blob
  return zip.generateAsync({ type: 'blob' });
}

/**
 * Generate and download the ZIP file.
 */
export async function downloadZipFile(
  config: AppConfig,
  filename: string = 'claude-docker-config.zip'
): Promise<void> {
  const blob = await generateZipFile(config);
  saveAs(blob, filename);
}
