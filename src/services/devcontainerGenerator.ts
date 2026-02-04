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

import type {
  DevContainerConfig,
  VscodeExtension,
  VscodeSetting,
  DevContainerFeature,
  SoftwareConfig,
} from '@/types';
import {
  extensionsBySoftware,
  featuresBySoftware,
} from '@/config/devcontainer-extensions';

/**
 * DevContainer JSON structure following the specification.
 * @see https://containers.dev/implementors/json_reference/
 */
interface DevContainerJson {
  name: string;
  customizations?: {
    vscode?: {
      extensions?: string[];
      settings?: Record<string, unknown>;
    };
  };
  features?: Record<string, Record<string, unknown>>;
  forwardPorts?: number[];
  postCreateCommand?: string;
  postStartCommand?: string;
  postAttachCommand?: string;
}

/**
 * Lifecycle script types for generation.
 */
export type LifecycleScriptType = 'postCreate' | 'postStart' | 'postAttach';

/**
 * Metadata for a lifecycle script file.
 */
export interface LifecycleScriptFile {
  filename: string;
  content: string;
}

/**
 * Placeholder comments for empty lifecycle scripts.
 * The key is the language code, values are the comments for each script type.
 */
export const lifecyclePlaceholders: Record<string, Record<LifecycleScriptType, string>> = {
  en: {
    postCreate: 'This script runs once after the container is created.\n# Add your initialization commands here (e.g., npm install, pip install -r requirements.txt)',
    postStart: 'This script runs every time the container starts.\n# Add your startup commands here (e.g., start background services)',
    postAttach: 'This script runs every time VS Code attaches to the container.\n# Add commands to run when your editor connects (e.g., activate virtual environment)',
  },
  de: {
    postCreate: 'Dieses Skript wird einmalig nach der Container-Erstellung ausgeführt.\n# Füge hier deine Initialisierungsbefehle ein (z.B. npm install, pip install -r requirements.txt)',
    postStart: 'Dieses Skript wird bei jedem Container-Start ausgeführt.\n# Füge hier deine Startbefehle ein (z.B. Hintergrunddienste starten)',
    postAttach: 'Dieses Skript wird ausgeführt, wenn VS Code sich mit dem Container verbindet.\n# Füge hier Befehle ein, die beim Verbinden des Editors ausgeführt werden sollen (z.B. virtuelle Umgebung aktivieren)',
  },
  es: {
    postCreate: 'Este script se ejecuta una vez después de crear el contenedor.\n# Añade aquí tus comandos de inicialización (p. ej., npm install, pip install -r requirements.txt)',
    postStart: 'Este script se ejecuta cada vez que se inicia el contenedor.\n# Añade aquí tus comandos de inicio (p. ej., iniciar servicios en segundo plano)',
    postAttach: 'Este script se ejecuta cada vez que VS Code se conecta al contenedor.\n# Añade comandos que se ejecuten cuando tu editor se conecte (p. ej., activar entorno virtual)',
  },
  fr: {
    postCreate: 'Ce script s\'exécute une fois après la création du conteneur.\n# Ajoutez vos commandes d\'initialisation ici (par ex. npm install, pip install -r requirements.txt)',
    postStart: 'Ce script s\'exécute à chaque démarrage du conteneur.\n# Ajoutez vos commandes de démarrage ici (par ex. démarrer les services en arrière-plan)',
    postAttach: 'Ce script s\'exécute chaque fois que VS Code se connecte au conteneur.\n# Ajoutez des commandes à exécuter quand votre éditeur se connecte (par ex. activer l\'environnement virtuel)',
  },
  it: {
    postCreate: 'Questo script viene eseguito una volta dopo la creazione del container.\n# Aggiungi qui i tuoi comandi di inizializzazione (es. npm install, pip install -r requirements.txt)',
    postStart: 'Questo script viene eseguito ogni volta che il container si avvia.\n# Aggiungi qui i tuoi comandi di avvio (es. avviare servizi in background)',
    postAttach: 'Questo script viene eseguito ogni volta che VS Code si connette al container.\n# Aggiungi comandi da eseguire quando il tuo editor si connette (es. attivare ambiente virtuale)',
  },
  pt: {
    postCreate: 'Este script é executado uma vez após a criação do container.\n# Adicione seus comandos de inicialização aqui (ex: npm install, pip install -r requirements.txt)',
    postStart: 'Este script é executado toda vez que o container inicia.\n# Adicione seus comandos de inicialização aqui (ex: iniciar serviços em segundo plano)',
    postAttach: 'Este script é executado toda vez que o VS Code se conecta ao container.\n# Adicione comandos para executar quando seu editor se conectar (ex: ativar ambiente virtual)',
  },
  nl: {
    postCreate: 'Dit script wordt eenmalig uitgevoerd na het aanmaken van de container.\n# Voeg hier je initialisatieopdrachten toe (bijv. npm install, pip install -r requirements.txt)',
    postStart: 'Dit script wordt uitgevoerd telkens als de container start.\n# Voeg hier je startopdrachten toe (bijv. achtergrondservices starten)',
    postAttach: 'Dit script wordt uitgevoerd telkens als VS Code verbinding maakt met de container.\n# Voeg opdrachten toe die uitgevoerd moeten worden wanneer je editor verbindt (bijv. virtuele omgeving activeren)',
  },
  ja: {
    postCreate: 'このスクリプトはコンテナ作成後に一度だけ実行されます。\n# 初期化コマンドをここに追加してください（例：npm install, pip install -r requirements.txt）',
    postStart: 'このスクリプトはコンテナが起動するたびに実行されます。\n# 起動コマンドをここに追加してください（例：バックグラウンドサービスの開始）',
    postAttach: 'このスクリプトはVS Codeがコンテナに接続するたびに実行されます。\n# エディタ接続時に実行するコマンドを追加してください（例：仮想環境のアクティベート）',
  },
  ko: {
    postCreate: '이 스크립트는 컨테이너 생성 후 한 번 실행됩니다.\n# 초기화 명령어를 여기에 추가하세요 (예: npm install, pip install -r requirements.txt)',
    postStart: '이 스크립트는 컨테이너가 시작될 때마다 실행됩니다.\n# 시작 명령어를 여기에 추가하세요 (예: 백그라운드 서비스 시작)',
    postAttach: '이 스크립트는 VS Code가 컨테이너에 연결될 때마다 실행됩니다.\n# 에디터 연결 시 실행할 명령어를 추가하세요 (예: 가상 환경 활성화)',
  },
  zh: {
    postCreate: '此脚本在容器创建后运行一次。\n# 在此添加初始化命令（例如：npm install, pip install -r requirements.txt）',
    postStart: '此脚本在容器每次启动时运行。\n# 在此添加启动命令（例如：启动后台服务）',
    postAttach: '此脚本在VS Code每次连接到容器时运行。\n# 添加编辑器连接时要运行的命令（例如：激活虚拟环境）',
  },
  ar: {
    postCreate: 'يتم تشغيل هذا البرنامج النصي مرة واحدة بعد إنشاء الحاوية.\n# أضف أوامر التهيئة هنا (مثل npm install, pip install -r requirements.txt)',
    postStart: 'يتم تشغيل هذا البرنامج النصي في كل مرة تبدأ فيها الحاوية.\n# أضف أوامر البدء هنا (مثل بدء الخدمات في الخلفية)',
    postAttach: 'يتم تشغيل هذا البرنامج النصي في كل مرة يتصل فيها VS Code بالحاوية.\n# أضف الأوامر التي يجب تشغيلها عند اتصال المحرر (مثل تفعيل البيئة الافتراضية)',
  },
  he: {
    postCreate: 'סקריפט זה רץ פעם אחת לאחר יצירת המכולה.\n# הוסף כאן את פקודות האתחול שלך (לדוגמה npm install, pip install -r requirements.txt)',
    postStart: 'סקריפט זה רץ בכל פעם שהמכולה מופעלת.\n# הוסף כאן את פקודות ההפעלה שלך (לדוגמה הפעלת שירותים ברקע)',
    postAttach: 'סקריפט זה רץ בכל פעם ש-VS Code מתחבר למכולה.\n# הוסף פקודות שירוצו כאשר העורך מתחבר (לדוגמה הפעלת סביבה וירטואלית)',
  },
  hi: {
    postCreate: 'यह स्क्रिप्ट कंटेनर बनने के बाद एक बार चलती है।\n# अपने इनिशियलाइज़ेशन कमांड यहाँ जोड़ें (जैसे npm install, pip install -r requirements.txt)',
    postStart: 'यह स्क्रिप्ट हर बार कंटेनर स्टार्ट होने पर चलती है।\n# अपने स्टार्टअप कमांड यहाँ जोड़ें (जैसे बैकग्राउंड सर्विसेज स्टार्ट करना)',
    postAttach: 'यह स्क्रिप्ट हर बार VS Code कंटेनर से कनेक्ट होने पर चलती है।\n# एडिटर कनेक्ट होने पर चलाने के लिए कमांड जोड़ें (जैसे वर्चुअल एनवायरनमेंट एक्टिवेट करना)',
  },
  ur: {
    postCreate: 'یہ اسکرپٹ کنٹینر بننے کے بعد ایک بار چلتی ہے۔\n# اپنے ابتدائی کمانڈز یہاں شامل کریں (مثال کے طور پر npm install, pip install -r requirements.txt)',
    postStart: 'یہ اسکرپٹ ہر بار کنٹینر شروع ہونے پر چلتی ہے۔\n# اپنے آغاز کے کمانڈز یہاں شامل کریں (مثال کے طور پر پس منظر کی خدمات شروع کرنا)',
    postAttach: 'یہ اسکرپٹ ہر بار VS Code کنٹینر سے منسلک ہونے پر چلتی ہے۔\n# ایڈیٹر کنیکٹ ہونے پر چلانے کے لیے کمانڈز شامل کریں (مثال کے طور پر ورچوئل ماحول کو فعال کرنا)',
  },
  uk: {
    postCreate: 'Цей скрипт виконується один раз після створення контейнера.\n# Додайте сюди свої команди ініціалізації (напр., npm install, pip install -r requirements.txt)',
    postStart: 'Цей скрипт виконується кожного разу при запуску контейнера.\n# Додайте сюди свої команди запуску (напр., запуск фонових служб)',
    postAttach: 'Цей скрипт виконується кожного разу, коли VS Code підключається до контейнера.\n# Додайте команди для виконання при підключенні редактора (напр., активація віртуального середовища)',
  },
  el: {
    postCreate: 'Αυτό το script εκτελείται μία φορά μετά τη δημιουργία του container.\n# Προσθέστε τις εντολές αρχικοποίησης εδώ (π.χ. npm install, pip install -r requirements.txt)',
    postStart: 'Αυτό το script εκτελείται κάθε φορά που ξεκινά το container.\n# Προσθέστε τις εντολές εκκίνησης εδώ (π.χ. εκκίνηση υπηρεσιών στο παρασκήνιο)',
    postAttach: 'Αυτό το script εκτελείται κάθε φορά που το VS Code συνδέεται με το container.\n# Προσθέστε εντολές για εκτέλεση όταν συνδέεται ο επεξεργαστής (π.χ. ενεργοποίηση εικονικού περιβάλλοντος)',
  },
  pl: {
    postCreate: 'Ten skrypt jest uruchamiany raz po utworzeniu kontenera.\n# Dodaj tutaj swoje polecenia inicjalizacji (np. npm install, pip install -r requirements.txt)',
    postStart: 'Ten skrypt jest uruchamiany przy każdym uruchomieniu kontenera.\n# Dodaj tutaj swoje polecenia startowe (np. uruchomienie usług w tle)',
    postAttach: 'Ten skrypt jest uruchamiany za każdym razem, gdy VS Code łączy się z kontenerem.\n# Dodaj polecenia do uruchomienia, gdy edytor się łączy (np. aktywacja środowiska wirtualnego)',
  },
  tr: {
    postCreate: 'Bu betik, konteyner oluşturulduktan sonra bir kez çalışır.\n# Başlangıç komutlarınızı buraya ekleyin (örn. npm install, pip install -r requirements.txt)',
    postStart: 'Bu betik, konteyner her başladığında çalışır.\n# Başlatma komutlarınızı buraya ekleyin (örn. arka plan hizmetlerini başlatma)',
    postAttach: 'Bu betik, VS Code konteynere her bağlandığında çalışır.\n# Düzenleyiciniz bağlandığında çalıştırılacak komutları ekleyin (örn. sanal ortamı etkinleştirme)',
  },
};

/**
 * Gets all extension IDs from user configuration.
 */
function getUserExtensionIds(extensions: VscodeExtension[]): Set<string> {
  return new Set(extensions.map((e) => e.extensionId));
}

/**
 * Gets recommended extension IDs based on enabled software.
 * Only returns extensions not already added by the user.
 */
function getRecommendedExtensionIds(
  software: SoftwareConfig,
  userExtensions: Set<string>
): string[] {
  const recommended: string[] = [];

  for (const [softwareId, pkg] of Object.entries(software)) {
    if (pkg.enabled) {
      const extensions = extensionsBySoftware[softwareId as keyof SoftwareConfig];
      for (const ext of extensions) {
        if (!userExtensions.has(ext.id) && !recommended.includes(ext.id)) {
          recommended.push(ext.id);
        }
      }
    }
  }

  return recommended;
}

/**
 * Gets all feature references from user configuration.
 */
function getUserFeatureRefs(features: DevContainerFeature[]): Set<string> {
  return new Set(features.map((f) => f.feature));
}

/**
 * Gets recommended feature references based on enabled software.
 * Only returns features not already added by the user.
 */
function getRecommendedFeatureRefs(
  software: SoftwareConfig,
  userFeatures: Set<string>
): string[] {
  const recommended: string[] = [];

  for (const [softwareId, pkg] of Object.entries(software)) {
    if (pkg.enabled) {
      const features = featuresBySoftware[softwareId as keyof SoftwareConfig];
      for (const feat of features) {
        if (!userFeatures.has(feat.id) && !recommended.includes(feat.id)) {
          recommended.push(feat.id);
        }
      }
    }
  }

  return recommended;
}

/**
 * Parses a VS Code setting value to its appropriate type.
 * Tries to parse as JSON, falls back to string.
 */
function parseSettingValue(value: string): unknown {
  const trimmed = value.trim();

  // Try to parse as JSON (handles booleans, numbers, arrays, objects)
  try {
    return JSON.parse(trimmed);
  } catch {
    // Return as string if not valid JSON
    return trimmed;
  }
}

/**
 * Builds VS Code settings object from setting entries.
 */
function buildSettingsObject(settings: VscodeSetting[]): Record<string, unknown> | undefined {
  const validSettings = settings.filter((s) => s.key.trim().length > 0);

  if (validSettings.length === 0) {
    return undefined;
  }

  return Object.fromEntries(
    validSettings.map((s) => [s.key, parseSettingValue(s.value)])
  );
}

/**
 * Builds the features object for devcontainer.json.
 * Each feature maps to an empty options object by default.
 */
function buildFeaturesObject(
  features: DevContainerFeature[],
  software: SoftwareConfig,
  includeRecommended: boolean
): Record<string, Record<string, unknown>> | undefined {
  const userFeatureRefs = getUserFeatureRefs(features);
  const allFeatures = [...userFeatureRefs];

  // Add recommended features if enabled
  if (includeRecommended) {
    const recommended = getRecommendedFeatureRefs(software, userFeatureRefs);
    allFeatures.push(...recommended);
  }

  if (allFeatures.length === 0) {
    return undefined;
  }

  // Sort for consistent output
  return Object.fromEntries(
    allFeatures.sort().map((feat) => [feat, {}])
  );
}

/**
 * Builds the extensions array for devcontainer.json.
 */
function buildExtensionsArray(
  extensions: VscodeExtension[],
  software: SoftwareConfig,
  includeRecommended: boolean
): string[] | undefined {
  const userExtensionIds = getUserExtensionIds(extensions);
  const allExtensions = [...userExtensionIds];

  // Add recommended extensions if enabled
  if (includeRecommended) {
    const recommended = getRecommendedExtensionIds(software, userExtensionIds);
    allExtensions.push(...recommended);
  }

  if (allExtensions.length === 0) {
    return undefined;
  }

  // Sort for consistent output
  return allExtensions.sort();
}

/**
 * Options for generating the devcontainer.json.
 */
export interface GenerateDevContainerOptions {
  /** Include recommended extensions based on enabled software */
  includeRecommendedExtensions?: boolean;
  /** Include recommended features based on enabled software */
  includeRecommendedFeatures?: boolean;
}

/**
 * Generates the devcontainer.json content from the configuration.
 *
 * @param config - The DevContainer configuration
 * @param software - The software configuration (for recommendations)
 * @param options - Generation options
 * @returns The formatted JSON string
 */
export function generateDevContainerJson(
  config: DevContainerConfig,
  software: SoftwareConfig,
  options: GenerateDevContainerOptions = {}
): string {
  const {
    includeRecommendedExtensions = true,
    includeRecommendedFeatures = true,
  } = options;

  const devcontainer: DevContainerJson = {
    name: config.name || 'Claude Code Dev Environment',
  };

  // Build extensions and settings
  const extensions = buildExtensionsArray(
    config.extensions,
    software,
    includeRecommendedExtensions
  );
  const settings = buildSettingsObject(config.settings);

  // Add VS Code customizations if any exist
  if (extensions || settings) {
    devcontainer.customizations = {
      vscode: {
        ...(extensions && { extensions }),
        ...(settings && { settings }),
      },
    };
  }

  // Add features if any
  const features = buildFeaturesObject(
    config.features,
    software,
    includeRecommendedFeatures
  );
  if (features) {
    devcontainer.features = features;
  }

  // Add forwarded ports if any
  const ports = config.forwardedPorts.map((p) => p.port);
  if (ports.length > 0) {
    devcontainer.forwardPorts = ports.sort((a, b) => a - b);
  }

  // Always reference the lifecycle scripts (they are always generated)
  devcontainer.postCreateCommand = '.devcontainer/post-create.sh';
  devcontainer.postStartCommand = '.devcontainer/post-start.sh';
  devcontainer.postAttachCommand = '.devcontainer/post-attach.sh';

  return JSON.stringify(devcontainer, null, 2);
}

/**
 * Checks if a script has meaningful content (not just whitespace).
 */
export function hasScriptContent(script: string): boolean {
  return script.trim().length > 0;
}

/**
 * Generates a lifecycle script file with the given content or placeholder comments.
 *
 * @param scriptType - The type of lifecycle script
 * @param content - The user-provided script content (may be empty)
 * @param language - The UI language code for localized placeholder comments
 * @returns The complete shell script content
 */
export function generateLifecycleScript(
  scriptType: LifecycleScriptType,
  content: string,
  language: string = 'en'
): string {
  const hasContent = hasScriptContent(content);

  // Get placeholders for the language (fallback to English)
  const langPlaceholders = lifecyclePlaceholders[language] || lifecyclePlaceholders.en;
  const enPlaceholders = lifecyclePlaceholders.en;

  // Use /bin/sh for maximum compatibility (works on all POSIX systems including Alpine)
  const lines = ['#!/bin/sh', ''];

  if (hasContent) {
    // User has provided script content - no automatic set options, user decides
    lines.push(content.trim());
  } else {
    // Empty script - add bilingual placeholder comments
    lines.push('# ' + enPlaceholders[scriptType].split('\n').join('\n# '));

    // Add localized comment if different from English
    if (language !== 'en' && langPlaceholders !== enPlaceholders) {
      lines.push('');
      lines.push('# ' + langPlaceholders[scriptType].split('\n').join('\n# '));
    }

    lines.push('');
    lines.push('# Add your commands below this line:');
    lines.push('');
  }

  return lines.join('\n') + '\n';
}

/**
 * Generates all three lifecycle script files.
 *
 * @param config - The DevContainer configuration
 * @param language - The UI language code for localized placeholder comments
 * @returns Array of lifecycle script files
 */
export function generateLifecycleScripts(
  config: DevContainerConfig,
  language: string = 'en'
): LifecycleScriptFile[] {
  return [
    {
      filename: 'post-create.sh',
      content: generateLifecycleScript('postCreate', config.postCreateScript, language),
    },
    {
      filename: 'post-start.sh',
      content: generateLifecycleScript('postStart', config.postStartScript, language),
    },
    {
      filename: 'post-attach.sh',
      content: generateLifecycleScript('postAttach', config.postAttachScript, language),
    },
  ];
}

/**
 * Gets all extension IDs that will be included in the devcontainer.json.
 * Useful for displaying in the UI or README.
 *
 * @param config - The DevContainer configuration
 * @param software - The software configuration
 * @param includeRecommended - Whether to include recommended extensions
 * @returns Array of extension IDs
 */
export function getAllExtensionIds(
  config: DevContainerConfig,
  software: SoftwareConfig,
  includeRecommended = true
): string[] {
  const userExtensionIds = getUserExtensionIds(config.extensions);
  const allExtensions = [...userExtensionIds];

  if (includeRecommended) {
    const recommended = getRecommendedExtensionIds(software, userExtensionIds);
    allExtensions.push(...recommended);
  }

  return allExtensions.sort();
}

/**
 * Gets all feature references that will be included in the devcontainer.json.
 * Useful for displaying in the UI or README.
 *
 * @param config - The DevContainer configuration
 * @param software - The software configuration
 * @param includeRecommended - Whether to include recommended features
 * @returns Array of feature references
 */
export function getAllFeatureRefs(
  config: DevContainerConfig,
  software: SoftwareConfig,
  includeRecommended = true
): string[] {
  const userFeatureRefs = getUserFeatureRefs(config.features);
  const allFeatures = [...userFeatureRefs];

  if (includeRecommended) {
    const recommended = getRecommendedFeatureRefs(software, userFeatureRefs);
    allFeatures.push(...recommended);
  }

  return allFeatures.sort();
}
