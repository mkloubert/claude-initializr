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

import type { CustomNpmPackage, CustomRunCommand, PluginEntry, SoftwareConfig } from '@/types';
import { softwareInstallOrder } from '@/config/containerPackages';
import { isPluginNameComplete } from '@/components/config/pluginValidation';

/**
 * Generate Docker ARG definitions for software versions.
 * Versions are configured via build arguments with sensible defaults.
 * Use --build-arg to override at build time (e.g., --build-arg GO_VERSION=1.22.0)
 */
export function generateDockerArgs(software: SoftwareConfig): string {
  const args: string[] = [];

  if (software.typescript.enabled) {
    // TypeScript version (override with --build-arg TYPESCRIPT_VERSION=x.x.x)
    args.push('ARG TYPESCRIPT_VERSION=latest');
  }

  if (software.python.enabled) {
    // Python version (override with --build-arg PYTHON_VERSION=3.x)
    args.push('ARG PYTHON_VERSION=3');
  }

  if (software.uv.enabled) {
    // Install script URL for uv (can be overridden for mirrors/proxies)
    args.push('ARG UV_INSTALL_SCRIPT_URL=https://astral.sh/uv/install.sh');
  }

  if (software.golang.enabled) {
    // Go version: "latest" fetches dynamically, or specify version like "1.22.0"
    args.push('ARG GO_VERSION=latest');
    // JSON API URL for fetching latest version info (used when GO_VERSION=latest)
    args.push('ARG GO_JSON_URL=https://go.dev/dl/?mode=json');
    // Base URL for downloading Go archives
    args.push('ARG GO_DOWNLOAD_URL=https://go.dev/dl');
  }

  if (software.flutter.enabled) {
    // Flutter version: "latest" fetches dynamically, or specify version like "3.24.0"
    args.push('ARG FLUTTER_VERSION=latest');
    // JSON API URL for fetching Flutter releases info (used when FLUTTER_VERSION=latest)
    args.push('ARG FLUTTER_JSON_URL=https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json');
    // Base URL for downloading Flutter archives
    args.push('ARG FLUTTER_BASE_URL=https://storage.googleapis.com/flutter_infra_release/releases');
    // Android Command Line Tools URL (can be overridden for mirrors/proxies)
    args.push('ARG ANDROID_CMDLINE_TOOLS_URL=https://dl.google.com/android/repository');
  }

  return args.join('\n');
}

/**
 * APT packages for each software, keyed by software ID.
 */
const aptPackagesByKey: Record<string, string[]> = {
  python: ['python${PYTHON_VERSION}', 'python${PYTHON_VERSION}-venv', 'python3-pip'],
  uv: ['wget'],
  ffmpeg: ['ffmpeg'],
  imagemagick: ['imagemagick'],
  flutter: ['wget', 'xz-utils', 'zip', 'libglu1-mesa', 'openjdk-17-jdk'],
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
type RootCommandGenerator = () => string[] | null;

const rootCommandsByKey: Record<string, RootCommandGenerator> = {
  python: () => [
    '# Create Python symlinks for easier access',
    'RUN ln -sf /usr/bin/python${PYTHON_VERSION} /usr/local/bin/python && \\',
    '    ln -sf /usr/bin/pip3 /usr/local/bin/pip',
  ],
  uv: () => [
    '# Install uv (Python package manager) system-wide',
    'RUN wget -qO- "${UV_INSTALL_SCRIPT_URL}" \\',
    '    | env UV_INSTALL_DIR=/usr/local/bin INSTALLER_NO_MODIFY_PATH=1 sh',
  ],
  golang: () => {
    // Architecture mapping: dpkg architecture -> Go architecture
    const archMapping = [
      '        amd64) GO_ARCH=amd64 ;; \\',
      '        arm64) GO_ARCH=arm64 ;; \\',
      '        armhf) GO_ARCH=armv6l ;; \\',
      '        armel) GO_ARCH=armv6l ;; \\',
      '        i386) GO_ARCH=386 ;; \\',
      '        ppc64el) GO_ARCH=ppc64le ;; \\',
      '        ppc64) GO_ARCH=ppc64 ;; \\',
      '        s390x) GO_ARCH=s390x ;; \\',
      '        riscv64) GO_ARCH=riscv64 ;; \\',
      '        mips64el) GO_ARCH=mips64le ;; \\',
      '        mipsel) GO_ARCH=mipsle ;; \\',
      '        mips) GO_ARCH=mips ;; \\',
      '        loong64) GO_ARCH=loong64 ;; \\',
      '        *) echo "Unsupported architecture: $ARCH" && exit 1 ;; \\',
    ];

    // Conditional installation: "latest" fetches from API, otherwise uses specified version
    return [
      '# Install Go (supports GO_VERSION=latest or specific version like GO_VERSION=1.22.0)',
      'RUN ARCH=$(dpkg --print-architecture) && \\',
      '    case "$ARCH" in \\',
      ...archMapping,
      '    esac && \\',
      '    if [ "${GO_VERSION}" = "latest" ]; then \\',
      '        GO_FILE=$(wget -qO- "${GO_JSON_URL}" | \\',
      '            jq -r \'.[0].files[] | select(.os == "linux" and .arch == "\'"$GO_ARCH"\'" and .kind == "archive") | .filename\') && \\',
      '        wget -qO- "${GO_DOWNLOAD_URL}/${GO_FILE}" | tar -xzC /usr/local; \\',
      '    else \\',
      '        wget -qO- "${GO_DOWNLOAD_URL}/go${GO_VERSION}.linux-${GO_ARCH}.tar.gz" | tar -xzC /usr/local; \\',
      '    fi && \\',
      '    /usr/local/go/bin/go version',
      'ENV PATH="/usr/local/go/bin:${PATH}"',
    ];
  },
  flutter: () => {
    const commands: string[] = [];

    // Set environment variables for Flutter and Android SDK
    commands.push(
      '# Flutter and Android SDK environment variables',
      'ENV FLUTTER_HOME=/opt/flutter',
      'ENV ANDROID_SDK_ROOT=/opt/android-sdk',
      'ENV ANDROID_HOME=/opt/android-sdk',
      'ENV PATH="${FLUTTER_HOME}/bin:${FLUTTER_HOME}/bin/cache/dart-sdk/bin:${ANDROID_SDK_ROOT}/cmdline-tools/latest/bin:${ANDROID_SDK_ROOT}/platform-tools:${PATH}"',
    );

    // Flutter SDK installation (supports FLUTTER_VERSION=latest or specific version)
    commands.push(
      '',
      '# Download and install Flutter SDK (supports FLUTTER_VERSION=latest or specific version like 3.24.0)',
      '# Note: Flutter SDK only officially supports x64 Linux hosts',
      'RUN set -eux && \\',
      '    mkdir -p /opt && \\',
      '    rm -rf "${FLUTTER_HOME}" && \\',
      '    if [ "${FLUTTER_VERSION}" = "latest" ]; then \\',
      '        FLUTTER_HASH=$(wget -qO- "${FLUTTER_JSON_URL}" | jq -r \'.current_release.stable\') && \\',
      '        FLUTTER_ARCHIVE=$(wget -qO- "${FLUTTER_JSON_URL}" | jq -r --arg h "${FLUTTER_HASH}" \'.releases[] | select(.hash==$h) | .archive\') && \\',
      '        echo "Flutter archive: ${FLUTTER_ARCHIVE}" && \\',
      '        wget -qO /tmp/flutter.tar.xz "${FLUTTER_BASE_URL}/${FLUTTER_ARCHIVE}"; \\',
      '    else \\',
      '        echo "Flutter version: ${FLUTTER_VERSION}" && \\',
      '        wget -qO /tmp/flutter.tar.xz "${FLUTTER_BASE_URL}/stable/linux/flutter_linux_${FLUTTER_VERSION}-stable.tar.xz"; \\',
      '    fi && \\',
      '    tar -xJf /tmp/flutter.tar.xz -C /opt && \\',
      '    rm -f /tmp/flutter.tar.xz && \\',
      '    git config --system --add safe.directory /opt/flutter && \\',
      '    "${FLUTTER_HOME}/bin/flutter" --version',
    );

    // Android Command Line Tools installation (separate RUN for download reliability)
    commands.push(
      '',
      '# Download and install Android Command Line Tools',
      'RUN set -eux && \\',
      '    mkdir -p "${ANDROID_SDK_ROOT}/cmdline-tools" && \\',
      '    CMDLINE_ZIP=$(wget -qO- "https://developer.android.com/studio" | grep -oE \'commandlinetools-linux-[0-9]+_latest\\.zip\' | head -n1) && \\',
      '    echo "Android cmdline tools: ${CMDLINE_ZIP}" && \\',
      '    wget -qO /tmp/cmdline-tools.zip "${ANDROID_CMDLINE_TOOLS_URL}/${CMDLINE_ZIP}" && \\',
      '    rm -rf /tmp/cmdline-tools && mkdir -p /tmp/cmdline-tools && \\',
      '    unzip -q /tmp/cmdline-tools.zip -d /tmp/cmdline-tools && \\',
      '    rm -f /tmp/cmdline-tools.zip && \\',
      '    rm -rf "${ANDROID_SDK_ROOT}/cmdline-tools/latest" && \\',
      '    mkdir -p "${ANDROID_SDK_ROOT}/cmdline-tools/latest" && \\',
      '    mv /tmp/cmdline-tools/cmdline-tools/* "${ANDROID_SDK_ROOT}/cmdline-tools/latest/" && \\',
      '    rm -rf /tmp/cmdline-tools',
    );

    // Android SDK packages installation
    commands.push(
      '',
      '# Install Android SDK packages (platform-tools, platforms, build-tools)',
      'RUN set -eux && \\',
      '    yes | sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --licenses >/dev/null && \\',
      '    sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --install \\',
      '        "platform-tools" \\',
      '        "platforms;android-36" \\',
      '        "platforms;android-35" \\',
      '        "build-tools;36.0.0" \\',
      '        "build-tools;35.0.0" >/dev/null',
    );

    // Accept licenses and configure Flutter
    commands.push(
      '',
      '# Accept Android licenses and configure Flutter',
      'RUN set -eux && \\',
      '    yes | sdkmanager --sdk_root="${ANDROID_SDK_ROOT}" --licenses >/dev/null && \\',
      '    yes | flutter doctor --android-licenses >/dev/null || true && \\',
      '    flutter --disable-analytics && \\',
      '    flutter doctor -v || true',
    );

    // Prepare cache directories for node user
    commands.push(
      '',
      '# Prepare Gradle/Android cache directories for node user',
      'RUN mkdir -p /home/node/.gradle /home/node/.android && \\',
      '    chown -R node:node /home/node/.gradle /home/node/.android && \\',
      '    chown -R node:node "${FLUTTER_HOME}" "${ANDROID_SDK_ROOT}"',
    );

    return commands;
  },
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
      const cmds = generator();
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
type NodeCommandGenerator = () => string[] | null;

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
 * Generate plugin installation commands for Claude Code.
 * Installs plugins from marketplaces using `claude plugin install`.
 *
 * @param plugins - List of plugin entries to install
 * @returns Array of RUN commands for plugin installation
 */
export function generatePluginInstalls(plugins: PluginEntry[]): string[] {
  // Filter to only complete, valid plugin names
  const validPlugins = plugins.filter((p) => isPluginNameComplete(p.name));

  if (validPlugins.length === 0) {
    return [];
  }

  const commands: string[] = [];
  commands.push('# Install Claude Code plugins');

  for (const plugin of validPlugins) {
    commands.push(`RUN claude plugin install ${plugin.name}`);
  }

  return commands;
}

/**
 * Generate Dockerfile commands to run as node user.
 * Commands are generated in installation order.
 */
export function generateNodeUserExtensions(
  software: SoftwareConfig,
  customNpmPackages: CustomNpmPackage[] = [],
  customRunCommands: CustomRunCommand[] = [],
  plugins: PluginEntry[] = []
): string {
  const commands: string[] = [];

  // Add software commands in installation order
  for (const key of softwareInstallOrder) {
    const pkg = software[key as keyof SoftwareConfig];
    const generator = nodeCommandsByKey[key];
    if (pkg?.enabled && generator) {
      const cmds = generator();
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

  // Install Claude Code plugins (after Claude Code is installed)
  const pluginCommands = generatePluginInstalls(plugins);
  if (pluginCommands.length > 0) {
    commands.push(...pluginCommands);
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
  customRunCommands: CustomRunCommand[] = [],
  plugins: PluginEntry[] = []
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
    RUN_AS_NODE_USER_EXTENSIONS: generateNodeUserExtensions(software, customNpmPackages, customRunCommands, plugins),
  };
}
