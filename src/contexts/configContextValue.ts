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

import { createContext } from 'react';
import type { AppConfig, SoftwareConfig } from '../types';

/**
 * Context value interface for configuration state and actions.
 */
export interface ConfigContextValue {
  /** Current application configuration */
  config: AppConfig;

  // Software configuration actions
  /** Toggle a software package on/off */
  toggleSoftware: (softwareId: keyof SoftwareConfig) => void;
  /** Update the version for a software package */
  setSoftwareVersion: (softwareId: keyof SoftwareConfig, version: string) => void;

  // Environment variables actions
  /** Add a new environment variable */
  addEnvVariable: () => void;
  /** Update an existing environment variable */
  updateEnvVariable: (id: string, field: 'key' | 'value', value: string) => void;
  /** Remove an environment variable */
  removeEnvVariable: (id: string) => void;

  // Protected files actions
  /** Add a new protected file path */
  addProtectedFile: () => void;
  /** Update a protected file path */
  updateProtectedFile: (id: string, path: string) => void;
  /** Remove a protected file */
  removeProtectedFile: (id: string) => void;

  // CLAUDE.md actions
  /** Update the CLAUDE.md content */
  setClaudeMdContent: (content: string) => void;

  // Utility actions
  /** Reset configuration to defaults */
  resetConfig: () => void;
}

export const ConfigContext = createContext<ConfigContextValue | null>(null);
