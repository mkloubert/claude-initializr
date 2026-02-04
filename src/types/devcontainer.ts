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
 * A VS Code extension entry for the DevContainer.
 */
export interface VscodeExtension {
  /** Unique identifier for the extension (used as React key) */
  id: string;
  /** VS Code extension ID (e.g., "ms-python.python") */
  extensionId: string;
}

/**
 * A VS Code setting entry for the DevContainer.
 */
export interface VscodeSetting {
  /** Unique identifier for the setting (used as React key) */
  id: string;
  /** Setting key (e.g., "editor.formatOnSave") */
  key: string;
  /** Setting value as string (will be parsed as JSON) */
  value: string;
}

/**
 * A Dev Container Feature entry.
 * Reference: https://containers.dev/features
 */
export interface DevContainerFeature {
  /** Unique identifier for the feature (used as React key) */
  id: string;
  /** Feature reference (e.g., "ghcr.io/devcontainers/features/python:1") */
  feature: string;
}

/**
 * A forwarded port entry for the DevContainer.
 */
export interface ForwardedPort {
  /** Unique identifier for the port (used as React key) */
  id: string;
  /** Port number to forward */
  port: number;
}

/**
 * Lifecycle script type - contains bash script content.
 * Can be empty, in which case a placeholder script is generated.
 */
export type LifecycleScript = string;

/**
 * Complete DevContainer configuration.
 * Based on the Dev Container specification:
 * https://containers.dev/implementors/json_reference/
 */
export interface DevContainerConfig {
  /** Whether DevContainer generation is enabled */
  enabled: boolean;
  /** Display name for the dev container */
  name: string;
  /** VS Code extensions to install */
  extensions: VscodeExtension[];
  /** VS Code settings for the container */
  settings: VscodeSetting[];
  /** Dev Container Features to include */
  features: DevContainerFeature[];
  /** Ports to forward from the container */
  forwardedPorts: ForwardedPort[];
  /** Bash script content for post-create.sh (runs once after container creation) */
  postCreateScript: LifecycleScript;
  /** Bash script content for post-start.sh (runs on each container start) */
  postStartScript: LifecycleScript;
  /** Bash script content for post-attach.sh (runs when VS Code attaches) */
  postAttachScript: LifecycleScript;
}

/**
 * Default DevContainer configuration.
 */
export const defaultDevContainerConfig: DevContainerConfig = {
  enabled: false,
  name: 'Claude Code Dev Environment',
  extensions: [],
  settings: [],
  features: [],
  forwardedPorts: [],
  postCreateScript: '',
  postStartScript: '',
  postAttachScript: '',
};
