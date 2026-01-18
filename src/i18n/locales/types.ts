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
 * Translation interface for all supported languages.
 * All locale files must implement this interface to ensure completeness.
 */
export interface Translations {
  app: {
    title: string;
    description: string;
  };
  welcome: {
    close: string;
    description: string;
    purpose: string;
    features: {
      title: string;
      dockerfile: string;
      compose: string;
      claudeMd: string;
    };
    security: {
      title: string;
      firewall: string;
      isolation: string;
      readonly: string;
      capabilities: string;
    };
    privacy: {
      title: string;
      description: string;
    };
  };
  nav: {
    header: string;
  };
  tabs: {
    software: string;
    preview: string;
    settings: string;
    envVariables: string;
    env: string;
    protectedFiles: string;
    protected: string;
  };
  language: {
    switch: string;
  };
  theme: {
    switch: string;
  };
  autosave: {
    enable: string;
    disable: string;
  };
  reset: {
    button: string;
    title: string;
    description: string;
    cancel: string;
    confirm: string;
  };
  software: {
    baseImage: string;
    baseImageDesc: string;
    image: string;
    typescript: string;
    typescriptDesc: string;
    ffmpeg: string;
    ffmpegDesc: string;
    imagemagick: string;
    imagemagickDesc: string;
    python: string;
    pythonDesc: string;
    uv: string;
    uvDesc: string;
    golang: string;
    golangDesc: string;
    flutter: string;
    flutterDesc: string;
    version: string;
    latest: string;
    recommendsHint: string;
  };
  aptPackages: {
    title: string;
    description: string;
    placeholder: string;
    add: string;
    remove: string;
  };
  npmPackages: {
    title: string;
    description: string;
    placeholder: string;
    add: string;
    remove: string;
    installAs: string;
    userNode: string;
    userRoot: string;
    toggleUser: string;
  };
  runCommands: {
    title: string;
    description: string;
    placeholder: string;
    add: string;
    remove: string;
    runAs: string;
    userNode: string;
    userRoot: string;
    toggleUser: string;
  };
  plugins: {
    title: string;
    description: string;
    placeholder: string;
    add: string;
    remove: string;
    formatHint: string;
    invalidFormat: string;
    suggestions: string;
    loadingSuggestions: string;
    addFromMarketplace: string;
    viewOnGitHub: string;
  };
  env: {
    description: string;
    key: string;
    value: string;
    add: string;
    remove: string;
    keyPlaceholder: string;
    valuePlaceholder: string;
  };
  claudeMd: {
    title: string;
    description: string;
  };
  protectedFiles: {
    description: string;
    path: string;
    add: string;
    remove: string;
    pathPlaceholder: string;
    help: string;
  };
  settings: {
    title: string;
    description: string;
    permissions: string;
    directive: string;
    pattern: string;
    patternPlaceholder: string;
    addRule: string;
    removeRule: string;
    allow: string;
    ask: string;
    deny: string;
    noAllowRules: string;
    noAskRules: string;
    noDenyRules: string;
    help: string;
    learnMore: string;
  };
  preview: {
    dockerfile: string;
    dockerfileDesc: string;
    dockerCompose: string;
    dockerComposeDesc: string;
  };
  dockerCompose: {
    platform: string;
    platformDesc: string;
    platformPlaceholder: string;
  };
  download: {
    button: string;
    generating: string;
    filename: string;
  };
  links: {
    github: string;
    paypal: string;
  };
  footer: {
    copyright: string;
  };
  languages: {
    en: string;
    de: string;
    es: string;
    fr: string;
    it: string;
    pt: string;
    nl: string;
    ja: string;
    ko: string;
    zh: string;
    ar: string;
    he: string;
    hi: string;
    ur: string;
    uk: string;
    el: string;
    pl: string;
    tr: string;
  };
  errors: {
    invalidEnvKey: string;
    duplicateEnvKey: string;
    invalidPath: string;
  };
  readme: {
    title: string;
    generatedBy: string;
    languageSwitch: string;
    intro: {
      title: string;
      description: string;
    };
    files: {
      title: string;
      dockerfile: string;
      dockerCompose: string;
      env: string;
      initFirewall: string;
      workspace: string;
      claudeMd: string;
      settingsJson: string;
    };
    baseImage: {
      title: string;
      description: string;
      dockerHub: string;
    };
    platform: {
      title: string;
      description: string;
    };
    aptPackages: {
      title: string;
      description: string;
    };
    npmPackages: {
      title: string;
      description: string;
      installedAs: string;
    };
    plugins: {
      title: string;
      description: string;
      viewOnGitHub: string;
    };
    envVariables: {
      title: string;
      description: string;
      note: string;
    };
    protectedFiles: {
      title: string;
      description: string;
    };
    settingsJson: {
      title: string;
      description: string;
      allow: string;
      ask: string;
      deny: string;
    };
    claudeMd: {
      title: string;
      description: string;
    };
    quickStart: {
      title: string;
      step1: string;
      step2: string;
      step3: string;
      step4: string;
      note: string;
    };
    prerequisites: {
      title: string;
      description: string;
      windows: {
        title: string;
        steps: string[];
        link: string;
      };
      macos: {
        title: string;
        steps: string[];
        link: string;
      };
      linux: {
        title: string;
        steps: string[];
        link: string;
        altNote: string;
      };
    };
    troubleshooting: {
      title: string;
      issues: {
        containerNotStarting: {
          title: string;
          solutions: string[];
        };
        permissionDenied: {
          title: string;
          solutions: string[];
        };
        networkIssues: {
          title: string;
          solutions: string[];
        };
        fileNotAccessible: {
          title: string;
          solutions: string[];
        };
      };
    };
    links: {
      title: string;
      initializer: string;
      documentation: string;
      support: string;
    };
    author: {
      title: string;
      createdBy: string;
      support: string;
    };
    software: {
      title: string;
      description: string;
    };
  };
}
