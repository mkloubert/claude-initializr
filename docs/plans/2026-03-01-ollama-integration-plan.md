# Ollama Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Ollama as a software package in Claude Initializr that configures environment variables and docker-compose for connecting to a host-based Ollama instance.

**Architecture:** Ollama is added as the 9th entry in `SoftwareConfig`. Unlike other software packages, it installs nothing in the Dockerfile. When toggled on, it adds 3 environment variables (if not present). When toggled off, it removes them. The `extra_hosts` block is always present in docker-compose.yaml.

**Tech Stack:** React 19, TypeScript, i18next, shadcn/ui, react-icons

---

## Phase 1: Core Types and Configuration

### Task 1: Add `ollama` to `SoftwareConfig` interface and defaults

**Files:**
- Modify: `src/types/config.ts:39-48` (SoftwareConfig interface)
- Modify: `src/types/config.ts:183-217` (defaultSoftwareConfig)

**Step 1: Add `ollama` to the `SoftwareConfig` interface**

In `src/types/config.ts`, add `ollama: SoftwarePackage;` to the `SoftwareConfig` interface after `rust`:

```typescript
export interface SoftwareConfig {
  typescript: SoftwarePackage;
  ffmpeg: SoftwarePackage;
  imagemagick: SoftwarePackage;
  python: SoftwarePackage;
  uv: SoftwarePackage;
  golang: SoftwarePackage;
  flutter: SoftwarePackage;
  rust: SoftwarePackage;
  ollama: SoftwarePackage;
}
```

**Step 2: Add `ollama` to `defaultSoftwareConfig`**

Add after the `rust` entry:

```typescript
ollama: {
  id: 'ollama',
  enabled: false,
},
```

**Step 3: Verify build**

Run: `npm run build`
Expected: Build may fail because other files reference `SoftwareConfig` keys — that's expected and fixed in subsequent tasks.

---

### Task 2: Add `ollama` to `softwareInstallOrder`

**Files:**
- Modify: `src/config/containerPackages.ts:76-85` (softwareInstallOrder)

**Step 1: Add 'ollama' to the install order array**

Add `'ollama'` at the end of the `softwareInstallOrder` array:

```typescript
export const softwareInstallOrder: string[] = [
  'python',
  'uv',
  'golang',
  'rust',
  'flutter',
  'typescript',
  'ffmpeg',
  'imagemagick',
  'ollama',
];
```

Note: No entries needed in `optionalAptPackages` or `optionalNpmPackages` since Ollama installs nothing in the container.

---

### Task 3: Add `extra_hosts` to docker-compose.yaml template

**Files:**
- Modify: `src/config/templates/dockerCompose.ts:28-75` (DOCKER_COMPOSE_TEMPLATE)

**Step 1: Add `extra_hosts` block to the template**

Add the `extra_hosts` section after the `tty: true` line (at the end of the service block):

```typescript
export const DOCKER_COMPOSE_TEMPLATE = `services:
  dev:
    ### {{TEMPLATE: PLATFORM}} ###
    build:
      context: .
      dockerfile: ./Dockerfile
      #args:
      #  UID: \${UID-1000}
      #  GID: \${GID-1000}

    # Only your project folder is visible
    volumes:
      - ./workspace:/workspace
      - ./workspace/CLAUDE.md:/workspace/CLAUDE.md:ro
      - ./workspace/.empty:/workspace/.empty:ro
      ### {{TEMPLATE: EMPTY_FILE_LINKS}} ###

    working_dir: /workspace

    env_file:
      - ./.env

    # user: "\${UID-1000}:\${GID-1000}"   # matches host permissions

    cap_drop:
      - ALL                        # drop all kernel capabilities
    security_opt:
      - no-new-privileges:true     # no privilege escalation
      # seccomp: Docker's default profile remains active (recommended)
      # AppArmor/SELinux also apply if active on the host

    # Resource limits (optional but recommended)
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 4g
        reservations:
          cpus: '0.5'
          memory: 512m

    # Network stays on (Claude needs internet for Auth/API)
    # If you want to build completely offline, you can set "network_mode: none" here,
    # but then the CLI won't work.
    # network_mode: none

    tty: true

    extra_hosts:
      - "host.docker.internal:host-gateway"
`;
```

---

## Phase 2: Toggle Logic with Environment Variables

### Task 4: Update `toggleSoftware` in ConfigContext to handle Ollama env vars

**Files:**
- Modify: `src/contexts/ConfigContext.tsx:575-586` (toggleSoftware callback)

**Step 1: Define Ollama env var constants**

Add these constants near the top of the file (after imports, before `STORAGE_KEY`):

```typescript
const OLLAMA_ENV_VARS: Array<{ key: string; value: string }> = [
  { key: 'ANTHROPIC_API_KEY', value: '' },
  { key: 'ANTHROPIC_BASE_URL', value: 'http://host.docker.internal:11434' },
  { key: 'ANTHROPIC_AUTH_TOKEN', value: 'ollama' },
];

const OLLAMA_ENV_KEYS = new Set(OLLAMA_ENV_VARS.map((v) => v.key));
```

**Step 2: Update `toggleSoftware` to handle Ollama**

Replace the existing `toggleSoftware` callback with:

```typescript
const toggleSoftware = useCallback((softwareId: keyof SoftwareConfig) => {
  setConfig((prev) => {
    const newEnabled = !prev.software[softwareId].enabled;
    let envVariables = prev.envVariables;

    if (softwareId === 'ollama') {
      if (newEnabled) {
        // Add Ollama env vars if not already present
        const existingKeys = new Set((envVariables ?? []).map((v) => v.key));
        const varsToAdd = OLLAMA_ENV_VARS.filter((v) => !existingKeys.has(v.key));
        if (varsToAdd.length > 0) {
          envVariables = [
            ...(envVariables ?? []),
            ...varsToAdd.map((v) => ({
              id: generateId(),
              key: v.key,
              value: v.value,
            })),
          ];
        }
      } else {
        // Remove all Ollama env vars regardless of current values
        envVariables = (envVariables ?? []).filter((v) => !OLLAMA_ENV_KEYS.has(v.key));
      }
    }

    return {
      ...prev,
      software: {
        ...prev.software,
        [softwareId]: {
          ...prev.software[softwareId],
          enabled: newEnabled,
        },
      },
      envVariables,
    };
  });
}, []);
```

**Step 3: Verify build**

Run: `npm run build`

---

## Phase 3: UI — Add Ollama to DockerfileEditor

### Task 5: Add Ollama to `softwareMetadata` in DockerfileEditor

**Files:**
- Modify: `src/components/config/DockerfileEditor.tsx:44` (imports)
- Modify: `src/components/config/DockerfileEditor.tsx:55-104` (softwareMetadata)

**Step 1: Add Ollama icon import**

Add `SiOllama` to the react-icons import:

```typescript
import { SiTypescript, SiPython, SiFfmpeg, SiNodedotjs, SiNpm, SiGo, SiFlutter, SiRust, SiOllama } from 'react-icons/si';
```

Note: If `SiOllama` is not available in `react-icons`, use a generic icon from lucide-react as fallback (e.g., `Bot` or `Server`). Check first with `npm run build`.

**Step 2: Add Ollama entry to `softwareMetadata`**

Add after the `rust` entry:

```typescript
ollama: {
  id: 'ollama',
  labelKey: 'software.ollama',
  descriptionKey: 'software.ollamaDesc',
  icon: <SiOllama className="h-5 w-5" aria-hidden="true" />,
},
```

**Step 3: Verify build**

Run: `npm run build`

---

## Phase 4: Internationalization (all 18 locales)

### Task 6: Add `ollama` and `ollamaDesc` to i18n types

**Files:**
- Modify: `src/i18n/locales/types.ts:85-108` (software section in Translations interface)

**Step 1: Add ollama keys to the interface**

Add after `rustDesc: string;`:

```typescript
ollama: string;
ollamaDesc: string;
```

The software section should look like:

```typescript
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
  rust: string;
  rustDesc: string;
  ollama: string;
  ollamaDesc: string;
  version: string;
  latest: string;
  recommendsHint: string;
};
```

---

### Task 7: Add translations to all 18 locale files

**Files to modify (all in `src/i18n/locales/`):**
- `en.ts`, `de.ts`, `fr.ts`, `es.ts`, `it.ts`, `pt.ts`, `nl.ts`, `ja.ts`, `ko.ts`, `zh.ts`, `ar.ts`, `he.ts`, `hi.ts`, `ur.ts`, `uk.ts`, `el.ts`, `pl.ts`, `tr.ts`

**Step 1: Add to each locale file**

In each file, add after the `"rustDesc"` line, before `"version"`:

**en.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "Configures environment variables for connecting Claude Code to a local Ollama instance running on the host. Sets ANTHROPIC_BASE_URL and ANTHROPIC_AUTH_TOKEN so Claude Code uses Ollama as its backend.",
```

**de.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "Konfiguriert Umgebungsvariablen, um Claude Code mit einer lokalen Ollama-Instanz auf dem Host zu verbinden. Setzt ANTHROPIC_BASE_URL und ANTHROPIC_AUTH_TOKEN, damit Claude Code Ollama als Backend nutzt.",
```

**fr.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "Configure les variables d'environnement pour connecter Claude Code a une instance Ollama locale sur l'hote. Definit ANTHROPIC_BASE_URL et ANTHROPIC_AUTH_TOKEN pour que Claude Code utilise Ollama comme backend.",
```

**es.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "Configura variables de entorno para conectar Claude Code a una instancia local de Ollama en el host. Establece ANTHROPIC_BASE_URL y ANTHROPIC_AUTH_TOKEN para que Claude Code use Ollama como backend.",
```

**it.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "Configura le variabili d'ambiente per connettere Claude Code a un'istanza Ollama locale sull'host. Imposta ANTHROPIC_BASE_URL e ANTHROPIC_AUTH_TOKEN affinche Claude Code utilizzi Ollama come backend.",
```

**pt.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "Configura variaveis de ambiente para conectar o Claude Code a uma instancia Ollama local no host. Define ANTHROPIC_BASE_URL e ANTHROPIC_AUTH_TOKEN para que o Claude Code use o Ollama como backend.",
```

**nl.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "Configureert omgevingsvariabelen om Claude Code te verbinden met een lokale Ollama-instantie op de host. Stelt ANTHROPIC_BASE_URL en ANTHROPIC_AUTH_TOKEN in zodat Claude Code Ollama als backend gebruikt.",
```

**ja.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "ホスト上のローカルOllamaインスタンスにClaude Codeを接続するための環境変数を設定します。ANTHROPIC_BASE_URLとANTHROPIC_AUTH_TOKENを設定し、Claude CodeがOllamaをバックエンドとして使用するようにします。",
```

**ko.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "호스트에서 실행 중인 로컬 Ollama 인스턴스에 Claude Code를 연결하기 위한 환경 변수를 구성합니다. ANTHROPIC_BASE_URL과 ANTHROPIC_AUTH_TOKEN을 설정하여 Claude Code가 Ollama를 백엔드로 사용하도록 합니다.",
```

**zh.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "配置环境变量以将 Claude Code 连接到主机上运行的本地 Ollama 实例。设置 ANTHROPIC_BASE_URL 和 ANTHROPIC_AUTH_TOKEN，使 Claude Code 使用 Ollama 作为后端。",
```

**ar.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "يقوم بتكوين متغيرات البيئة لتوصيل Claude Code بنسخة Ollama محلية تعمل على المضيف. يضبط ANTHROPIC_BASE_URL و ANTHROPIC_AUTH_TOKEN ليستخدم Claude Code خدمة Ollama كواجهة خلفية.",
```

**he.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "מגדיר משתני סביבה לחיבור Claude Code למופע Ollama מקומי הפועל על המארח. מגדיר ANTHROPIC_BASE_URL ו-ANTHROPIC_AUTH_TOKEN כדי ש-Claude Code ישתמש ב-Ollama כשרת עורפי.",
```

**hi.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "होस्ट पर चल रहे स्थानीय Ollama इंस्टेंस से Claude Code को कनेक्ट करने के लिए पर्यावरण चर कॉन्फ़िगर करता है। ANTHROPIC_BASE_URL और ANTHROPIC_AUTH_TOKEN सेट करता है ताकि Claude Code बैकएंड के रूप में Ollama का उपयोग करे।",
```

**ur.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "میزبان پر چلنے والے مقامی Ollama مثال سے Claude Code کو جوڑنے کے لیے ماحولیاتی متغیرات ترتیب دیتا ہے۔ ANTHROPIC_BASE_URL اور ANTHROPIC_AUTH_TOKEN سیٹ کرتا ہے تاکہ Claude Code بیک اینڈ کے طور پر Ollama استعمال کرے۔",
```

**uk.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "Налаштовує змінні середовища для підключення Claude Code до локального екземпляра Ollama на хості. Встановлює ANTHROPIC_BASE_URL та ANTHROPIC_AUTH_TOKEN, щоб Claude Code використовував Ollama як бекенд.",
```

**el.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "Ρυθμίζει μεταβλητές περιβάλλοντος για τη σύνδεση του Claude Code με μια τοπική εγκατάσταση Ollama στον κεντρικό υπολογιστή. Ορίζει ANTHROPIC_BASE_URL και ANTHROPIC_AUTH_TOKEN ώστε το Claude Code να χρησιμοποιεί το Ollama ως backend.",
```

**pl.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "Konfiguruje zmienne srodowiskowe do polaczenia Claude Code z lokalna instancja Ollama na hoscie. Ustawia ANTHROPIC_BASE_URL i ANTHROPIC_AUTH_TOKEN, aby Claude Code uzywal Ollama jako backend.",
```

**tr.ts:**
```
"ollama": "Ollama",
"ollamaDesc": "Claude Code'u ana bilgisayarda calisan yerel bir Ollama ornegine baglamak icin ortam degiskenlerini yapilandirir. Claude Code'un Ollama'yi arka uc olarak kullanmasi icin ANTHROPIC_BASE_URL ve ANTHROPIC_AUTH_TOKEN'i ayarlar.",
```

**Step 2: Verify build**

Run: `npm run build`
Expected: PASS — all translations satisfy the `Translations` interface.

---

## Phase 5: Build Verification and TASKS.md

### Task 8: Final build verification

**Step 1: Run full build**

Run: `npm run build`
Expected: PASS with no errors.

**Step 2: Run linter**

Run: `npm run lint`
Expected: PASS with no errors.

**Step 3: Manual verification in browser**

Run: `npm run dev`

Verify:
- Ollama appears in the Software section (alphabetically sorted)
- Toggling Ollama ON adds 3 env vars in the Docker Compose section
- Toggling Ollama OFF removes the 3 env vars
- `extra_hosts` block appears in docker-compose.yaml preview (always, regardless of Ollama)
- Language switching shows correct Ollama translations
- Export/Import preserves Ollama enabled state

---

### Task 9: Update TASKS.md with milestone checklist

**Files:**
- Create/Modify: `TASKS.md`

Write the milestone checklist with phases and tasks.

---

### Task 10: Update README files and documentation

**Files:**
- Modify: `README.md` and all translated README files
- Check if example files need updating

Add Ollama to the software list in the README:
- In the "Software Selection" features section, add Ollama entry
- In the changelog, add a new version entry (v4.1.1 or similar)
- Mention `extra_hosts` configuration
