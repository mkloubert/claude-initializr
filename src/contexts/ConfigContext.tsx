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

import { useCallback, useMemo, useState, type ReactNode } from 'react';
import {
  defaultAppConfig,
  type AppConfig,
  type EnvVariable,
  type ProtectedFile,
  type SoftwareConfig,
  type SoftwarePackage,
} from '../types';
import { ConfigContext, type ConfigContextValue } from './configContextValue';

interface ConfigProviderProps {
  children: ReactNode;
}

/**
 * Provider component for application configuration state.
 */
export function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useState<AppConfig>(defaultAppConfig);

  // Software configuration actions
  const toggleSoftware = useCallback((softwareId: keyof SoftwareConfig) => {
    setConfig((prev) => ({
      ...prev,
      software: {
        ...prev.software,
        [softwareId]: {
          ...prev.software[softwareId],
          enabled: !prev.software[softwareId].enabled,
        } satisfies SoftwarePackage,
      },
    }));
  }, []);

  const setSoftwareVersion = useCallback(
    (softwareId: keyof SoftwareConfig, version: string) => {
      setConfig((prev) => ({
        ...prev,
        software: {
          ...prev.software,
          [softwareId]: {
            ...prev.software[softwareId],
            version,
          } satisfies SoftwarePackage,
        },
      }));
    },
    []
  );

  // Environment variables actions
  const addEnvVariable = useCallback(() => {
    const newVariable: EnvVariable = {
      id: crypto.randomUUID(),
      key: '',
      value: '',
    };
    setConfig((prev) => ({
      ...prev,
      envVariables: [...prev.envVariables, newVariable],
    }));
  }, []);

  const updateEnvVariable = useCallback(
    (id: string, field: 'key' | 'value', value: string) => {
      setConfig((prev) => ({
        ...prev,
        envVariables: prev.envVariables.map((envVar) =>
          envVar.id === id ? { ...envVar, [field]: value } : envVar
        ),
      }));
    },
    []
  );

  const removeEnvVariable = useCallback((id: string) => {
    setConfig((prev) => ({
      ...prev,
      envVariables: prev.envVariables.filter((envVar) => envVar.id !== id),
    }));
  }, []);

  // Protected files actions
  const addProtectedFile = useCallback(() => {
    const newFile: ProtectedFile = {
      id: crypto.randomUUID(),
      path: '',
    };
    setConfig((prev) => ({
      ...prev,
      protectedFiles: [...prev.protectedFiles, newFile],
    }));
  }, []);

  const updateProtectedFile = useCallback((id: string, path: string) => {
    setConfig((prev) => ({
      ...prev,
      protectedFiles: prev.protectedFiles.map((file) =>
        file.id === id ? { ...file, path } : file
      ),
    }));
  }, []);

  const removeProtectedFile = useCallback((id: string) => {
    setConfig((prev) => ({
      ...prev,
      protectedFiles: prev.protectedFiles.filter((file) => file.id !== id),
    }));
  }, []);

  // CLAUDE.md actions
  const setClaudeMdContent = useCallback((content: string) => {
    setConfig((prev) => ({
      ...prev,
      claudeMdContent: content,
    }));
  }, []);

  // Utility actions
  const resetConfig = useCallback(() => {
    setConfig(defaultAppConfig);
  }, []);

  const value = useMemo<ConfigContextValue>(
    () => ({
      config,
      toggleSoftware,
      setSoftwareVersion,
      addEnvVariable,
      updateEnvVariable,
      removeEnvVariable,
      addProtectedFile,
      updateProtectedFile,
      removeProtectedFile,
      setClaudeMdContent,
      resetConfig,
    }),
    [
      config,
      toggleSoftware,
      setSoftwareVersion,
      addEnvVariable,
      updateEnvVariable,
      removeEnvVariable,
      addProtectedFile,
      updateProtectedFile,
      removeProtectedFile,
      setClaudeMdContent,
      resetConfig,
    ]
  );

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}
