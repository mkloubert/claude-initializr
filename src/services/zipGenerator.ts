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
import type { TFunction } from 'i18next';
import type { AppConfig } from '@/types';
import {
  processDockerfile,
  processDockerCompose,
  getInitFirewallTemplate,
} from './templateService';
import { generateDockerfileReplacements } from './dockerfileGenerator';
import { generateEnvFileContent } from './envGenerator';
import { generateDockerComposeReplacements } from './volumeGenerator';
import { generateSettingsJson } from './settingsGenerator';
import { generateReadmeContent } from './readmeGenerator';

/**
 * Language configuration for README generation.
 */
export interface ReadmeLanguageConfig {
  /** Current language code (e.g., 'en', 'de') */
  language: string;
  /** Current language display name (e.g., 'English', 'Deutsch') */
  languageName: string;
  /** Translation function for current language */
  t: TFunction;
  /** Translation function for English (used when generating README.en.md) */
  tEnglish: TFunction;
  /** URL to the Claude Initializr app */
  initializerUrl: string;
}

/**
 * Generate a ZIP file containing all Docker configuration files.
 */
export async function generateZipFile(
  config: AppConfig,
  readmeConfig?: ReadmeLanguageConfig
): Promise<Blob> {
  const zip = new JSZip();

  // Generate Dockerfile with software selections and custom packages
  const dockerfileReplacements = generateDockerfileReplacements(
    config.baseImage,
    config.nodeVersion,
    config.software,
    config.customAptPackages,
    config.customNpmPackages,
    config.customRunCommands,
    config.plugins
  );
  const dockerfileContent = processDockerfile(dockerfileReplacements);
  zip.file('Dockerfile', dockerfileContent);

  // Generate docker-compose.yaml with protected file mounts and platform
  const dockerComposeReplacements = generateDockerComposeReplacements(
    config.protectedFiles,
    config.dockerPlatform
  );
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

    // Include .claude/settings.json with configured permissions and plugins
    const claudeFolder = workspace.folder('.claude');
    if (claudeFolder) {
      const settingsContent = generateSettingsJson(config.claudePermissions, config.plugins, config.protectedFiles);
      claudeFolder.file('settings.json', settingsContent);
    }
  }

  // Generate README files if language config is provided
  if (readmeConfig) {
    const { language, languageName, t, tEnglish, initializerUrl } = readmeConfig;
    const isEnglish = language === 'en';

    if (isEnglish) {
      // Only generate README.md in English
      const readmeContent = generateReadmeContent({
        appConfig: config,
        initializerUrl,
        language: 'en',
        languageName: 'English',
        t,
      });
      zip.file('README.md', readmeContent.trim());
    } else {
      // Generate README.md in current language with link to English version
      // The switch text is in ENGLISH so English speakers can recognize it
      const readmeContent = generateReadmeContent({
        appConfig: config,
        initializerUrl,
        language,
        languageName,
        t,
        includeLanguageSwitch: {
          targetFile: 'README.en.md',
          targetLanguageCode: 'en',
          tTarget: tEnglish, // Switch text in English
        },
      });
      zip.file('README.md', readmeContent.trim());

      // Generate README.en.md (Simple English) with link to localized version
      // The switch text is in the LOCAL LANGUAGE so local speakers can recognize it
      const readmeEnContent = generateReadmeContent({
        appConfig: config,
        initializerUrl,
        language: 'en',
        languageName: 'English',
        t: tEnglish,
        includeLanguageSwitch: {
          targetFile: 'README.md',
          targetLanguageCode: language,
          tTarget: t, // Switch text in local language (e.g., German)
        },
      });
      zip.file('README.en.md', readmeEnContent.trim());
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
  filename: string = 'claude-docker-config.zip',
  readmeConfig?: ReadmeLanguageConfig
): Promise<void> {
  const blob = await generateZipFile(config, readmeConfig);
  saveAs(blob, filename);
}
