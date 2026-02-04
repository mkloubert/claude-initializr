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
 * Metadata for a VS Code extension recommendation.
 */
export interface ExtensionMetadata {
  /** VS Code extension ID (e.g., "ms-python.python") */
  id: string;
  /** Display name of the extension */
  name: string;
  /** Brief description of the extension */
  description: string;
}

/**
 * Metadata for a Dev Container Feature recommendation.
 */
export interface FeatureMetadata {
  /** Feature reference (e.g., "ghcr.io/devcontainers/features/python:1") */
  id: string;
  /** Display name of the feature */
  name: string;
  /** Brief description of the feature */
  description: string;
}

/**
 * VS Code extension recommendations by software ID.
 * These extensions are automatically suggested when the corresponding software is enabled.
 */
export const extensionsBySoftware: Record<keyof SoftwareConfig, ExtensionMetadata[]> = {
  typescript: [
    {
      id: 'esbenp.prettier-vscode',
      name: 'Prettier',
      description: 'Code formatter for JavaScript, TypeScript, and more',
    },
    {
      id: 'dbaeumer.vscode-eslint',
      name: 'ESLint',
      description: 'Integrates ESLint JavaScript into VS Code',
    },
  ],
  python: [
    {
      id: 'ms-python.python',
      name: 'Python',
      description: 'IntelliSense, linting, debugging, and more for Python',
    },
    {
      id: 'ms-python.vscode-pylance',
      name: 'Pylance',
      description: 'Fast, feature-rich language support for Python',
    },
  ],
  golang: [
    {
      id: 'golang.go',
      name: 'Go',
      description: 'Rich Go language support for VS Code',
    },
  ],
  rust: [
    {
      id: 'rust-lang.rust-analyzer',
      name: 'rust-analyzer',
      description: 'Rust language support for VS Code',
    },
  ],
  flutter: [
    {
      id: 'dart-code.flutter',
      name: 'Flutter',
      description: 'Flutter support and debugger for VS Code',
    },
    {
      id: 'dart-code.dart-code',
      name: 'Dart',
      description: 'Dart language support and debugger for VS Code',
    },
  ],
  ffmpeg: [],
  imagemagick: [],
  uv: [
    {
      id: 'ms-python.python',
      name: 'Python',
      description: 'IntelliSense, linting, debugging, and more for Python',
    },
  ],
};

/**
 * Dev Container Feature recommendations by software ID.
 * These features are automatically suggested when the corresponding software is enabled.
 */
export const featuresBySoftware: Record<keyof SoftwareConfig, FeatureMetadata[]> = {
  typescript: [],
  python: [
    {
      id: 'ghcr.io/devcontainers/features/python:1',
      name: 'Python',
      description: 'Installs Python, pip, and common utilities',
    },
  ],
  golang: [
    {
      id: 'ghcr.io/devcontainers/features/go:1',
      name: 'Go',
      description: 'Installs Go and common utilities',
    },
  ],
  rust: [
    {
      id: 'ghcr.io/devcontainers/features/rust:1',
      name: 'Rust',
      description: 'Installs Rust, Cargo, and common utilities',
    },
  ],
  flutter: [],
  ffmpeg: [],
  imagemagick: [],
  uv: [],
};

/**
 * Common VS Code extensions that are useful for most development setups.
 */
export const commonExtensions: ExtensionMetadata[] = [
  {
    id: 'eamodio.gitlens',
    name: 'GitLens',
    description: 'Supercharge Git within VS Code',
  },
  {
    id: 'editorconfig.editorconfig',
    name: 'EditorConfig',
    description: 'EditorConfig support for VS Code',
  },
];

/**
 * Common Dev Container Features that are useful for most setups.
 */
export const commonFeatures: FeatureMetadata[] = [
  {
    id: 'ghcr.io/devcontainers/features/github-cli:1',
    name: 'GitHub CLI',
    description: 'Installs the GitHub CLI (gh)',
  },
];

/**
 * Get recommended extensions based on enabled software.
 *
 * @param software - The software configuration
 * @returns Array of unique extension IDs
 */
export function getRecommendedExtensions(software: SoftwareConfig): string[] {
  const extensions = new Set<string>();

  for (const [softwareId, pkg] of Object.entries(software)) {
    if (pkg.enabled) {
      const recommendations = extensionsBySoftware[softwareId as keyof SoftwareConfig];
      for (const ext of recommendations) {
        extensions.add(ext.id);
      }
    }
  }

  return Array.from(extensions).sort();
}

/**
 * Get recommended features based on enabled software.
 *
 * @param software - The software configuration
 * @returns Array of unique feature references
 */
export function getRecommendedFeatures(software: SoftwareConfig): string[] {
  const features = new Set<string>();

  for (const [softwareId, pkg] of Object.entries(software)) {
    if (pkg.enabled) {
      const recommendations = featuresBySoftware[softwareId as keyof SoftwareConfig];
      for (const feat of recommendations) {
        features.add(feat.id);
      }
    }
  }

  return Array.from(features).sort();
}

/**
 * Validates a VS Code extension ID format.
 * Valid format: publisher.extension-name
 *
 * @param extensionId - The extension ID to validate
 * @returns true if valid, false otherwise
 */
export function isValidExtensionId(extensionId: string): boolean {
  // Extension ID format: publisher.extension-name
  // Publisher: alphanumeric and hyphens, must start with alphanumeric
  // Extension name: alphanumeric, hyphens, and underscores
  const pattern = /^[a-zA-Z0-9][a-zA-Z0-9-]*\.[a-zA-Z0-9][a-zA-Z0-9-_]*$/;
  return pattern.test(extensionId);
}

/**
 * Validates a Dev Container Feature reference format.
 * Valid format: ghcr.io/owner/features/name:version or similar OCI references
 *
 * @param featureRef - The feature reference to validate
 * @returns true if valid, false otherwise
 */
export function isValidFeatureReference(featureRef: string): boolean {
  // Feature reference format: registry/owner/path:version
  // Examples:
  // - ghcr.io/devcontainers/features/python:1
  // - ghcr.io/devcontainers-contrib/features/apt-packages:1
  const pattern = /^[a-z0-9][a-z0-9.-]*\/[a-z0-9_-]+\/[a-z0-9_/-]+:[a-z0-9._-]+$/i;
  return pattern.test(featureRef);
}
