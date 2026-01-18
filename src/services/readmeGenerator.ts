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

import type { TFunction } from 'i18next';
import type {
  AppConfig,
  ClaudePermissions,
  CustomNpmPackage,
  EnvVariable,
  PluginEntry,
  ProtectedFile,
  SoftwareConfig,
} from '@/types';
import {
  baseAptPackages,
  optionalAptPackages,
  optionalNpmPackages,
} from '@/config/containerPackages';
import { GITHUB_URL, PAYPAL_URL, AUTHOR_NAME, AUTHOR_URL } from '@/config/env';

/**
 * Configuration for README generation.
 */
export interface ReadmeConfig {
  appConfig: AppConfig;
  initializerUrl: string;
  language: string;
  languageName: string;
  t: TFunction;
  includeLanguageSwitch?: {
    targetFile: string;
    targetLanguageCode: string;
    /** Translation function for the TARGET language (so the switch text is readable by target language speakers) */
    tTarget: TFunction;
  };
}

/**
 * Sort strings alphabetically (case-insensitive).
 */
function sortAlphabetically(items: string[]): string[] {
  return [...items].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
}

/**
 * Generate Docker Hub link for an image.
 */
function getDockerHubUrl(image: string): string {
  // Extract base image name (remove tag if present)
  const baseName = image.split(':')[0];
  return `https://hub.docker.com/_/${baseName}`;
}

/**
 * Generate Debian Tracker link for a package.
 */
function getDebianTrackerUrl(packageName: string): string {
  // Remove version variables like ${PYTHON_VERSION}
  const cleanName = packageName.replace(/\$\{[^}]+\}/g, '').replace(/[0-9]+$/, '');
  return `https://tracker.debian.org/pkg/${cleanName}`;
}

/**
 * Generate npmjs.com link for a package.
 */
function getNpmUrl(packageName: string): string {
  return `https://www.npmjs.com/package/${packageName}`;
}

/**
 * Generate GitHub URL for a plugin.
 */
function getPluginGitHubUrl(pluginName: string): string {
  // Plugin format: plugin-name@marketplace-name
  // For official marketplace, the URL is anthropics/claude-plugins-official
  const parts = pluginName.split('@');
  if (parts.length !== 2) {
    return '#';
  }
  const [name, marketplace] = parts;
  if (marketplace === 'official') {
    return `https://github.com/anthropics/claude-plugins-official/tree/main/${name}`;
  }
  // For other marketplaces, assume GitHub org format
  return `https://github.com/${marketplace}/${name}`;
}

/**
 * Get all APT packages that will be installed.
 */
function getAllAptPackages(
  software: SoftwareConfig,
  customAptPackages: string[]
): string[] {
  const allPackages: string[] = [...baseAptPackages];

  // Add packages based on enabled software
  for (const [key, packages] of Object.entries(optionalAptPackages)) {
    const softwareKey = key as keyof SoftwareConfig;
    if (software[softwareKey]?.enabled) {
      allPackages.push(...packages);
    }
  }

  // Add custom packages
  allPackages.push(...customAptPackages);

  // Remove duplicates and sort
  const uniquePackages = [...new Set(allPackages)];

  return sortAlphabetically(uniquePackages);
}

/**
 * Get all custom NPM packages that will be installed (excludes base packages like claude-code).
 */
function getCustomNpmPackages(
  software: SoftwareConfig,
  customNpmPackages: CustomNpmPackage[]
): Array<{ name: string; user: string }> {
  const packages: Array<{ name: string; user: string }> = [];

  // Add packages based on enabled software (installed as node user)
  for (const [key, pkgs] of Object.entries(optionalNpmPackages)) {
    const softwareKey = key as keyof SoftwareConfig;
    if (software[softwareKey]?.enabled) {
      for (const pkg of pkgs) {
        packages.push({ name: pkg, user: 'node' });
      }
    }
  }

  // Add custom packages
  for (const pkg of customNpmPackages) {
    packages.push({ name: pkg.name, user: pkg.installAs });
  }

  // Sort by name
  packages.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

  return packages;
}

/**
 * Get enabled software names.
 */
function getEnabledSoftware(software: SoftwareConfig): string[] {
  const enabled: string[] = [];
  const softwareNames: Record<string, string> = {
    typescript: 'TypeScript',
    ffmpeg: 'ffmpeg',
    imagemagick: 'ImageMagick',
    python: 'Python 3',
    uv: 'uv',
    golang: 'Go',
    flutter: 'Flutter',
  };

  for (const [key, name] of Object.entries(softwareNames)) {
    const softwareKey = key as keyof SoftwareConfig;
    if (software[softwareKey]?.enabled) {
      enabled.push(name);
    }
  }

  return sortAlphabetically(enabled);
}

/**
 * Generate the base image section.
 */
function generateBaseImageSection(
  baseImage: string,
  nodeVersion: string,
  t: TFunction
): string {
  const fullImage = `${baseImage}:${nodeVersion}`;
  const dockerHubUrl = getDockerHubUrl(baseImage);

  return `## ${t('readme.baseImage.title')}

${t('readme.baseImage.description')}

- \`${fullImage}\` - [${t('readme.baseImage.dockerHub')}](${dockerHubUrl})

`;
}

/**
 * Generate the platform section (if platform is set).
 */
function generatePlatformSection(platform: string, t: TFunction): string {
  if (!platform) {
    return '';
  }

  return `## ${t('readme.platform.title')}

${t('readme.platform.description')}

- \`${platform}\`

`;
}

/**
 * Generate the software section.
 */
function generateSoftwareSection(software: SoftwareConfig, t: TFunction): string {
  const enabled = getEnabledSoftware(software);

  if (enabled.length === 0) {
    return '';
  }

  let content = `## ${t('readme.software.title')}\n\n`;
  content += `${t('readme.software.description')}\n\n`;

  for (const name of enabled) {
    content += `- ${name}\n`;
  }

  content += '\n';
  return content;
}

/**
 * Generate the APT packages section.
 */
function generateAptPackagesSection(
  software: SoftwareConfig,
  customAptPackages: string[],
  t: TFunction
): string {
  const packages = getAllAptPackages(software, customAptPackages);

  let content = `## ${t('readme.aptPackages.title')}\n\n`;
  content += `${t('readme.aptPackages.description')}\n\n`;

  for (const pkg of packages) {
    const url = getDebianTrackerUrl(pkg);
    content += `- [\`${pkg}\`](${url})\n`;
  }
  content += '\n';

  return content;
}

/**
 * Generate the NPM packages section (only if there are custom packages).
 */
function generateNpmPackagesSection(
  software: SoftwareConfig,
  customNpmPackages: CustomNpmPackage[],
  t: TFunction
): string {
  const packages = getCustomNpmPackages(software, customNpmPackages);

  // Only show section if there are custom packages
  if (packages.length === 0) {
    return '';
  }

  let content = `## ${t('readme.npmPackages.title')}\n\n`;
  content += `${t('readme.npmPackages.description')}\n\n`;

  for (const { name, user } of packages) {
    const url = getNpmUrl(name);
    const userInfo = t('readme.npmPackages.installedAs', { user });
    content += `- [\`${name}\`](${url}) (${userInfo})\n`;
  }
  content += '\n';

  return content;
}

/**
 * Generate the plugins section.
 */
function generatePluginsSection(plugins: PluginEntry[], t: TFunction): string {
  if (plugins.length === 0) {
    return '';
  }

  // Sort plugins alphabetically by name
  const sortedPlugins = [...plugins].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  let content = `## ${t('readme.plugins.title')}\n\n`;
  content += `${t('readme.plugins.description')}\n\n`;

  for (const plugin of sortedPlugins) {
    const url = getPluginGitHubUrl(plugin.name);
    content += `- [\`${plugin.name}\`](${url})\n`;
  }

  content += '\n';
  return content;
}

/**
 * Generate the environment variables section.
 */
function generateEnvVariablesSection(
  envVariables: EnvVariable[] | undefined,
  t: TFunction
): string {
  if (!envVariables || envVariables.length === 0) {
    return '';
  }

  // Sort by key alphabetically
  const sortedVars = [...envVariables].sort((a, b) =>
    a.key.toLowerCase().localeCompare(b.key.toLowerCase())
  );

  let content = `## ${t('readme.envVariables.title')}\n\n`;
  content += `${t('readme.envVariables.description')}\n\n`;

  for (const envVar of sortedVars) {
    content += `- \`${envVar.key}\`\n`;
  }

  content += `\n> **Note:** ${t('readme.envVariables.note')}\n\n`;
  return content;
}

/**
 * Generate the protected files section.
 */
function generateProtectedFilesSection(
  protectedFiles: ProtectedFile[],
  t: TFunction
): string {
  if (protectedFiles.length === 0) {
    return '';
  }

  // Sort by path alphabetically
  const sortedFiles = [...protectedFiles].sort((a, b) =>
    a.path.toLowerCase().localeCompare(b.path.toLowerCase())
  );

  let content = `## ${t('readme.protectedFiles.title')}\n\n`;
  content += `${t('readme.protectedFiles.description')}\n\n`;

  for (const file of sortedFiles) {
    content += `- \`workspace/${file.path}\`\n`;
  }

  content += '\n';
  return content;
}

/**
 * Generate the settings.json section (only if there are permission rules).
 */
function generateSettingsSection(
  permissions: ClaudePermissions,
  t: TFunction
): string {
  const hasRules =
    permissions.allow.length > 0 ||
    permissions.ask.length > 0 ||
    permissions.deny.length > 0;

  // Only show section if there are rules
  if (!hasRules) {
    return '';
  }

  let content = `## ${t('readme.settingsJson.title')}\n\n`;
  content += `${t('readme.settingsJson.description')}\n\n`;

  // Sort rules alphabetically within each category
  const sortRules = (rules: Array<{ directive: string; pattern: string }>) =>
    [...rules].sort((a, b) =>
      `${a.directive}(${a.pattern})`.toLowerCase().localeCompare(
        `${b.directive}(${b.pattern})`.toLowerCase()
      )
    );

  if (permissions.allow.length > 0) {
    content += `### ${t('readme.settingsJson.allow')}\n\n`;
    for (const rule of sortRules(permissions.allow)) {
      content += `- \`${rule.directive}(${rule.pattern})\`\n`;
    }
    content += '\n';
  }

  if (permissions.ask.length > 0) {
    content += `### ${t('readme.settingsJson.ask')}\n\n`;
    for (const rule of sortRules(permissions.ask)) {
      content += `- \`${rule.directive}(${rule.pattern})\`\n`;
    }
    content += '\n';
  }

  if (permissions.deny.length > 0) {
    content += `### ${t('readme.settingsJson.deny')}\n\n`;
    for (const rule of sortRules(permissions.deny)) {
      content += `- \`${rule.directive}(${rule.pattern})\`\n`;
    }
    content += '\n';
  }

  return content;
}

/**
 * Generate the CLAUDE.md section.
 */
function generateClaudeMdSection(t: TFunction): string {
  let content = `## ${t('readme.claudeMd.title')}\n\n`;
  content += `${t('readme.claudeMd.description')}\n\n`;
  content += `- [CLAUDE.md](workspace/CLAUDE.md)\n\n`;

  return content;
}

/**
 * Build argument definition with default value.
 */
interface BuildArg {
  name: string;
  defaultValue: string;
  isVersionArg: boolean;
}

/**
 * Get all available Docker build arguments based on software selection.
 * Arguments are sorted alphabetically (case-insensitive).
 */
function getBuildArgs(software: SoftwareConfig): BuildArg[] {
  const args: BuildArg[] = [];

  // Fixed ARGs (always available)
  args.push(
    { name: 'CLAUDE_CODE_VERSION', defaultValue: 'latest', isVersionArg: true },
    { name: 'GIT_DELTA_VERSION', defaultValue: '0.18.2', isVersionArg: true },
    { name: 'ZSH_IN_DOCKER_VERSION', defaultValue: '1.2.0', isVersionArg: true }
  );

  // Dynamic ARGs based on software selection
  if (software.flutter?.enabled) {
    args.push(
      { name: 'ANDROID_CMDLINE_TOOLS_URL', defaultValue: 'https://dl.google.com/android/repository', isVersionArg: false },
      { name: 'FLUTTER_BASE_URL', defaultValue: 'https://storage.googleapis.com/flutter_infra_release/releases', isVersionArg: false },
      { name: 'FLUTTER_JSON_URL', defaultValue: 'https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json', isVersionArg: false },
      { name: 'FLUTTER_VERSION', defaultValue: 'latest', isVersionArg: true }
    );
  }

  if (software.golang?.enabled) {
    args.push(
      { name: 'GO_DOWNLOAD_URL', defaultValue: 'https://go.dev/dl', isVersionArg: false },
      { name: 'GO_JSON_URL', defaultValue: 'https://go.dev/dl/?mode=json', isVersionArg: false },
      { name: 'GO_VERSION', defaultValue: 'latest', isVersionArg: true }
    );
  }

  if (software.python?.enabled) {
    args.push(
      { name: 'PYTHON_VERSION', defaultValue: '3', isVersionArg: true }
    );
  }

  if (software.rust?.enabled) {
    args.push(
      { name: 'RUSTUP_INSTALL_URL', defaultValue: 'https://sh.rustup.rs', isVersionArg: false }
    );
  }

  if (software.typescript?.enabled) {
    args.push(
      { name: 'TYPESCRIPT_VERSION', defaultValue: 'latest', isVersionArg: true }
    );
  }

  if (software.uv?.enabled) {
    args.push(
      { name: 'UV_INSTALL_SCRIPT_URL', defaultValue: 'https://astral.sh/uv/install.sh', isVersionArg: false }
    );
  }

  // Sort alphabetically (case-insensitive)
  return args.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );
}

/**
 * Generate the Docker build arguments section.
 */
function generateBuildArgsSection(software: SoftwareConfig, t: TFunction): string {
  const allArgs = getBuildArgs(software);
  const versionArgs = allArgs.filter((arg) => arg.isVersionArg);
  const urlArgs = allArgs.filter((arg) => !arg.isVersionArg);

  let content = `## ${t('readme.buildArgs.title')}\n\n`;
  content += `${t('readme.buildArgs.description')}\n\n`;

  // Version Arguments
  if (versionArgs.length > 0) {
    content += `### ${t('readme.buildArgs.versionArgs.title')}\n\n`;
    content += `${t('readme.buildArgs.versionArgs.description')}\n\n`;
    content += `| Argument | ${t('readme.buildArgs.defaultValue')} |\n`;
    content += '|----------|----------|\n';
    for (const arg of versionArgs) {
      content += `| \`${arg.name}\` | \`${arg.defaultValue}\` |\n`;
    }
    content += '\n';
  }

  // URL Arguments
  if (urlArgs.length > 0) {
    content += `### ${t('readme.buildArgs.urlArgs.title')}\n\n`;
    content += `${t('readme.buildArgs.urlArgs.description')}\n\n`;
    content += `| Argument | ${t('readme.buildArgs.defaultValue')} |\n`;
    content += '|----------|----------|\n';
    for (const arg of urlArgs) {
      content += `| \`${arg.name}\` | \`${arg.defaultValue}\` |\n`;
    }
    content += '\n';
  }

  // Example command with version args
  if (versionArgs.length > 0) {
    content += `### ${t('readme.buildArgs.example')}\n\n`;
    content += '```bash\n';
    content += 'docker compose build \\\n';
    const exampleArgs = versionArgs.slice(0, 3).map((arg) => {
      // Generate example values
      if (arg.name === 'CLAUDE_CODE_VERSION') return `  --build-arg ${arg.name}=1.0.0`;
      if (arg.name === 'GO_VERSION') return `  --build-arg ${arg.name}=1.22.0`;
      if (arg.name === 'FLUTTER_VERSION') return `  --build-arg ${arg.name}=3.24.0`;
      if (arg.name === 'PYTHON_VERSION') return `  --build-arg ${arg.name}=3.12`;
      if (arg.name === 'TYPESCRIPT_VERSION') return `  --build-arg ${arg.name}=5.6.0`;
      return `  --build-arg ${arg.name}=${arg.defaultValue}`;
    });
    content += exampleArgs.join(' \\\n') + '\n';
    content += '```\n\n';
  }

  return content;
}

/**
 * Generate the quick start section.
 */
function generateQuickStartSection(software: SoftwareConfig, t: TFunction): string {
  let content = `## ${t('readme.quickStart.title')}\n\n`;

  content += `1. ${t('readme.quickStart.step1')}\n\n`;

  content += `2. ${t('readme.quickStart.step2')}\n\n`;
  content += '   ```bash\n';
  content += '   docker compose up -d --build\n';
  content += '   ```\n\n';

  // Optional: Custom versions example
  const versionArgs = getBuildArgs(software).filter((arg) => arg.isVersionArg);
  if (versionArgs.length > 0) {
    content += `   ${t('readme.quickStart.step2CustomVersions')}\n\n`;
    content += '   ```bash\n';
    content += '   docker compose build \\\n';
    const exampleArgs = versionArgs.slice(0, 2).map((arg) => {
      if (arg.name === 'CLAUDE_CODE_VERSION') return `     --build-arg ${arg.name}=1.0.0`;
      if (arg.name === 'GO_VERSION') return `     --build-arg ${arg.name}=1.22.0`;
      if (arg.name === 'FLUTTER_VERSION') return `     --build-arg ${arg.name}=3.24.0`;
      if (arg.name === 'PYTHON_VERSION') return `     --build-arg ${arg.name}=3.12`;
      if (arg.name === 'TYPESCRIPT_VERSION') return `     --build-arg ${arg.name}=5.6.0`;
      return `     --build-arg ${arg.name}=${arg.defaultValue}`;
    });
    content += exampleArgs.join(' \\\n') + ' && \\\n';
    content += '   docker compose up -d\n';
    content += '   ```\n\n';
  }

  content += `3. ${t('readme.quickStart.step3')}\n\n`;
  content += '   ```bash\n';
  content += '   docker compose exec dev claude\n';
  content += '   ```\n\n';

  content += `4. ${t('readme.quickStart.step4')}\n\n`;
  content += '   ```bash\n';
  content += '   docker compose down\n';
  content += '   ```\n\n';

  content += `> **Note:** ${t('readme.quickStart.note')}\n\n`;

  return content;
}

/**
 * Generate the prerequisites section.
 */
function generatePrerequisitesSection(t: TFunction): string {
  let content = `## ${t('readme.prerequisites.title')}\n\n`;
  content += `${t('readme.prerequisites.description')}\n\n`;

  // Windows
  content += `### ${t('readme.prerequisites.windows.title')}\n\n`;
  const windowsSteps = t('readme.prerequisites.windows.steps', { returnObjects: true }) as string[];
  for (let i = 0; i < windowsSteps.length; i++) {
    content += `${i + 1}. ${windowsSteps[i]}\n`;
  }
  content += `\n[${t('readme.prerequisites.windows.link')}](https://docs.docker.com/desktop/setup/install/windows-install/)\n\n`;

  // macOS
  content += `### ${t('readme.prerequisites.macos.title')}\n\n`;
  const macSteps = t('readme.prerequisites.macos.steps', { returnObjects: true }) as string[];
  for (let i = 0; i < macSteps.length; i++) {
    content += `${i + 1}. ${macSteps[i]}\n`;
  }
  content += `\n[${t('readme.prerequisites.macos.link')}](https://docs.docker.com/desktop/setup/install/mac-install/)\n\n`;

  // Linux
  content += `### ${t('readme.prerequisites.linux.title')}\n\n`;
  const linuxSteps = t('readme.prerequisites.linux.steps', { returnObjects: true }) as string[];
  for (let i = 0; i < linuxSteps.length; i++) {
    content += `${i + 1}. ${linuxSteps[i]}\n`;
  }
  content += `\n[${t('readme.prerequisites.linux.link')}](https://docs.docker.com/desktop/setup/install/linux/)\n\n`;
  content += `> ${t('readme.prerequisites.linux.altNote')}\n\n`;

  return content;
}

/**
 * Generate the troubleshooting section.
 */
function generateTroubleshootingSection(t: TFunction): string {
  let content = `## ${t('readme.troubleshooting.title')}\n\n`;

  const issues = [
    'containerNotStarting',
    'permissionDenied',
    'networkIssues',
    'fileNotAccessible',
  ] as const;

  for (const issue of issues) {
    const title = t(`readme.troubleshooting.issues.${issue}.title`);
    const solutions = t(`readme.troubleshooting.issues.${issue}.solutions`, {
      returnObjects: true,
    }) as string[];

    content += `### ${title}\n\n`;
    for (const solution of solutions) {
      content += `- ${solution}\n`;
    }
    content += '\n';
  }

  return content;
}

/**
 * Generate the links section.
 */
function generateLinksSection(initializerUrl: string, t: TFunction): string {
  let content = `## ${t('readme.links.title')}\n\n`;

  content += `- [${t('readme.links.initializer')}](${initializerUrl})\n`;
  content += `- [${t('readme.links.documentation')}](https://docs.anthropic.com/en/docs/claude-code)\n`;
  content += `- [${t('readme.links.support')}](${GITHUB_URL}/issues)\n`;

  content += '\n';
  return content;
}

/**
 * Generate the author section.
 */
function generateAuthorSection(t: TFunction): string {
  let content = `## ${t('readme.author.title')}\n\n`;

  content += `${t('readme.author.createdBy')} [${AUTHOR_NAME}](${AUTHOR_URL})\n\n`;

  if (PAYPAL_URL) {
    content += `[${t('readme.author.support')}](${PAYPAL_URL})\n\n`;
  }

  return content;
}

/**
 * Generate the files overview section.
 */
function generateFilesSection(t: TFunction): string {
  let content = `## ${t('readme.files.title')}\n\n`;

  content += `- **${t('readme.files.dockerfile')}**\n`;
  content += `- **${t('readme.files.dockerCompose')}**\n`;
  content += `- **${t('readme.files.env')}**\n`;
  content += `- **${t('readme.files.initFirewall')}**\n`;
  content += `- **${t('readme.files.workspace')}**\n`;
  content += `  - **${t('readme.files.claudeMd')}**\n`;
  content += `  - **${t('readme.files.settingsJson')}**\n`;

  content += '\n';
  return content;
}

/**
 * Generate complete README content.
 */
export function generateReadmeContent(config: ReadmeConfig): string {
  const { appConfig, initializerUrl, t, includeLanguageSwitch } = config;

  let content = `# ${t('readme.title')}\n\n`;

  // Language switch link if applicable
  // The text is in the TARGET language so readers who don't understand the current language can recognize it
  if (includeLanguageSwitch) {
    const { tTarget, targetLanguageCode, targetFile } = includeLanguageSwitch;
    // Get the language name in the target language (e.g., "English" in English, "Englisch" in German)
    const translatedLanguageName = tTarget(`languages.${targetLanguageCode}`);
    // Get the switch text in the target language
    const switchText = tTarget('readme.languageSwitch', {
      language: translatedLanguageName,
    });
    content += `> [${switchText}](${targetFile})\n\n`;
  }

  // Generated by notice
  content += `*${t('readme.generatedBy', { url: initializerUrl })}*\n\n`;

  // Introduction
  content += `## ${t('readme.intro.title')}\n\n`;
  content += `${t('readme.intro.description')}\n\n`;

  // Files overview
  content += generateFilesSection(t);

  // Base image
  content += generateBaseImageSection(appConfig.baseImage, appConfig.nodeVersion, t);

  // Platform (if set)
  content += generatePlatformSection(appConfig.dockerPlatform, t);

  // Software
  content += generateSoftwareSection(appConfig.software, t);

  // APT packages
  content += generateAptPackagesSection(
    appConfig.software,
    appConfig.customAptPackages,
    t
  );

  // NPM packages
  content += generateNpmPackagesSection(
    appConfig.software,
    appConfig.customNpmPackages,
    t
  );

  // Plugins
  content += generatePluginsSection(appConfig.plugins, t);

  // Environment variables
  content += generateEnvVariablesSection(appConfig.envVariables, t);

  // Protected files
  content += generateProtectedFilesSection(appConfig.protectedFiles, t);

  // Settings.json / Permissions
  content += generateSettingsSection(appConfig.claudePermissions, t);

  // CLAUDE.md
  content += generateClaudeMdSection(t);

  // Quick start
  content += generateQuickStartSection(appConfig.software, t);

  // Build Arguments
  content += generateBuildArgsSection(appConfig.software, t);

  // Prerequisites
  content += generatePrerequisitesSection(t);

  // Troubleshooting
  content += generateTroubleshootingSection(t);

  // Links
  content += generateLinksSection(initializerUrl, t);

  // Author
  content += generateAuthorSection(t);

  return content;
}
