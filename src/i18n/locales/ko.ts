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

import type { Translations } from './types';

const ko: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Claude Code를 안전하게 실행하기 위한 Docker 구성 파일 생성"
  },
  "welcome": {
    "close": "환영 메시지 닫기",
    "description": "Claude Code는 Anthropic의 강력한 AI 코딩 어시스턴트로, 컴퓨터에서 직접 코드를 읽고, 쓰고, 실행할 수 있습니다. 매우 유용하지만, 파일 시스템과 터미널 접근 권한을 가진 AI를 실행하려면 보안을 신중히 고려해야 합니다.",
    "purpose": "이 도구는 격리된 컨테이너 환경에서 Claude Code를 실행할 수 있는 완전한 Docker 구성을 생성합니다. 코드는 보호된 상태로 유지되면서 Claude가 개발, 디버깅, 리팩토링을 계속 도와줄 수 있습니다.",
    "dialogTitle": "Claude Initializr에 오신 것을 환영합니다",
    "getStarted": "시작하기",
    "dontShowAgain": "다시 표시하지 않기",
    "features": {
      "title": "구성할 수 있는 항목:",
      "dockerfile": "설치할 개발 도구 선택 (TypeScript, Python, Go, ffmpeg, ImageMagick)",
      "compose": "환경 변수(API 키 등) 설정 및 민감한 파일 접근 보호",
      "claudeMd": "Claude가 각 세션 시작 시 읽는 프로젝트별 지침 작성",
      "devContainer": "원활한 개발을 위한 VS Code Dev Container 구성 생성"
    },
    "security": {
      "title": "포함된 보안 기능:",
      "firewall": "Anthropic API, npm, GitHub에만 연결을 허용하는 네트워크 방화벽",
      "isolation": "호스트 시스템 및 로컬 네트워크로부터 완전한 격리",
      "readonly": "민감한 파일은 빈 읽기 전용 파일로 마운트",
      "capabilities": "모든 Linux 기능 제거, 권한 상승 불허"
    },
    "privacy": {
      "title": "개인정보 보호 안내:",
      "description": "설정은 브라우저에 로컬로 저장(localStorage)되어 돌아올 때 유지됩니다. 보안상의 이유로 환경 변수 값은 저장되지 않습니다 – 변수 이름만 저장됩니다. 어떤 서버로도 데이터가 전송되지 않습니다. 헤더의 저장 아이콘을 사용하여 언제든지 자동 저장을 비활성화할 수 있습니다 – 이렇게 하면 저장된 모든 데이터도 지워집니다."
    }
  },
  "nav": {
    "header": "헤더 탐색"
  },
  "tabs": {
    "software": "소프트웨어",
    "preview": "미리보기",
    "settings": "설정",
    "envVariables": "환경",
    "env": "환경",
    "protectedFiles": "보호된 파일",
    "protected": "보호됨"
  },
  "language": {
    "switch": "언어"
  },
  "theme": {
    "switch": "테마 전환"
  },
  "autosave": {
    "enable": "자동 저장 활성화",
    "disable": "자동 저장 비활성화"
  },
  "reset": {
    "button": "기본값으로 재설정",
    "title": "설정 재설정",
    "description": "모든 설정을 기본값으로 재설정하시겠습니까? 이 작업은 되돌릴 수 없습니다.",
    "cancel": "취소",
    "confirm": "재설정"
  },
  "software": {
    "baseImage": "베이스 이미지",
    "baseImageDesc": "Docker 베이스 이미지는 컨테이너의 기반을 결정합니다. 기본 'node' 이미지에는 Node.js와 npm이 포함됩니다. 더 작은 이미지를 위해 'node:22-slim', 추가 시스템 라이브러리를 위해 'node:22-bookworm' 등의 변형을 사용할 수도 있습니다.",
    "image": "이미지",
    "typescript": "TypeScript",
    "typescriptDesc": "TypeScript 컴파일러(tsc)와 ts-node를 설치하여 TypeScript를 직접 실행. TypeScript 프로젝트에 필수적이며, 타입 검사, JavaScript로 컴파일, 수동 컴파일 없이 .ts 파일 실행이 가능.",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "오디오 및 비디오 파일 처리를 위한 강력한 멀티미디어 프레임워크. 형식 변환, 비디오 편집, 오디오 추출, 스트리밍, 미디어 분석이 가능. 미디어 파일 작업 프로젝트에 필요.",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "200개 이상의 형식을 지원하는 종합 이미지 처리 제품군. 크기 조정, 자르기, 형식 변환, 워터마크, 프로그래밍 방식 이미지 조작 도구 제공. 자동화된 이미지 워크플로우에 이상적.",
    "python": "Python 3",
    "pythonDesc": "pip 패키지 관리자와 함께 Python 3 인터프리터 설치. Python 스크립트 실행, Python 패키지 설치, Python 기반 도구 사용이 가능. 데이터 처리, 스크립팅, AI/ML 작업에 유용.",
    "uv": "uv",
    "uvDesc": "Rust로 작성된 매우 빠른 Python 패키지 설치 및 해결 도구인 uv를 설치. pip, pip-tools, virtualenv를 대체하여 더 빠른 의존성 관리가 가능.",
    "golang": "Go",
    "golangDesc": "공식 컴파일러와 도구가 포함된 Go(Golang) 프로그래밍 언어를 설치. 빠르고 정적으로 컴파일된 프로그램, CLI 도구, 웹 서버, 시스템 소프트웨어 구축에 이상적.",
    "flutter": "Flutter",
    "flutterDesc": "Dart 및 Android 개발 도구가 포함된 Flutter SDK를 설치합니다. 단일 코드베이스에서 모바일, 웹 및 데스크톱용 크로스 플랫폼 앱을 빌드할 수 있습니다. Android SDK 및 명령줄 도구가 포함되어 있습니다.",
    "rust": "Rust",
    "rustDesc": "rustup을 통해 Cargo 패키지 관리자와 함께 Rust 프로그래밍 언어를 설치합니다. 빠르고 메모리 안전한 시스템 소프트웨어, CLI 도구, WebAssembly 및 임베디드 애플리케이션 구축에 이상적입니다.",
    "version": "버전",
    "latest": "최신",
    "recommendsHint": "권장: {{packages}}"
  },
  "aptPackages": {
    "title": "사용자 정의 APT 패키지",
    "description": "컨테이너에 설치할 추가 Debian/Ubuntu 패키지를 추가하세요.",
    "placeholder": "예: curl, graphviz, tree, sqlite3...",
    "add": "패키지 추가",
    "remove": "{{package}} 제거"
  },
  "npmPackages": {
    "title": "사용자 정의 NPM 패키지",
    "description": "컨테이너에 전역으로 설치할 추가 NPM 패키지를 추가하세요.",
    "placeholder": "예: eslint, prettier, tsx...",
    "add": "패키지 추가",
    "remove": "{{package}} 제거",
    "installAs": "설치 사용자",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "{{package}}의 설치 사용자 전환"
  },
  "runCommands": {
    "title": "사용자 정의 RUN 명령",
    "description": "Docker 이미지 빌드 중 실행할 사용자 정의 쉘 명령을 추가하세요.",
    "placeholder": "예: flutter doctor",
    "add": "명령 추가",
    "remove": "명령 제거",
    "runAs": "실행 사용자",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "명령의 실행 사용자 전환"
  },
  "env": {
    "description": "정의된 환경 변수가 없습니다.",
    "key": "키",
    "value": "값",
    "add": "변수 추가",
    "remove": "제거",
    "keyPlaceholder": "예: 변수_이름",
    "valuePlaceholder": "예: 값"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "CLAUDE.md 파일에는 Claude가 각 세션 시작 시 읽는 프로젝트별 지침이 포함됩니다. 여기에 코딩 가이드라인, 프로젝트 구조 설명, 선호 기술 또는 Claude가 프로젝트를 더 잘 이해하는 데 도움이 되는 기타 컨텍스트를 작성하세요."
  },
  "protectedFiles": {
    "description": "정의된 보호 파일이 없습니다.",
    "path": "파일 경로",
    "add": "경로 추가",
    "remove": "제거",
    "pathPlaceholder": "예: .env.local",
    "help": "경로는 /workspace/를 기준으로 합니다. 이 파일들은 민감한 데이터 접근을 방지하기 위해 빈 읽기 전용 파일로 마운트됩니다."
  },
  "settings": {
    "title": "settings.json",
    "description": "Claude Code 권한을 구성하여 읽기, 편집 또는 가져올 수 있는 파일을 제어합니다. 보호된 파일은 자동으로 거부 규칙으로 추가됩니다.",
    "permissions": "권한",
    "directive": "지시문",
    "pattern": "패턴",
    "patternPlaceholder": "예: src/** 또는 .env",
    "addRule": "규칙 추가",
    "removeRule": "규칙 제거",
    "allow": "허용",
    "ask": "확인",
    "deny": "거부",
    "noAllowRules": "허용 규칙이 정의되지 않았습니다.",
    "noAskRules": "확인 규칙이 정의되지 않았습니다.",
    "noDenyRules": "거부 규칙이 정의되지 않았습니다.",
    "help": "Read(), Edit(), WebFetch() 작업에 대한 권한 규칙을 정의합니다. 패턴은 재귀 매칭을 위해 src/**와 같은 glob 구문을 지원합니다.",
    "learnMore": "자세히 알아보기",
    "summary": "개요",
    "denyCount": "{{count}}개 거부",
    "askCount": "{{count}}개 확인",
    "allowCount": "{{count}}개 허용"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "Dockerfile은 컨테이너에 설치할 소프트웨어를 정의합니다. Node.js와 Claude Code 외에도 TypeScript, Python, Go, ffmpeg, ImageMagick 같은 추가 도구를 포함할 수 있습니다. 선택한 소프트웨어는 Claude가 명령을 실행할 때 사용 가능합니다.",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "docker-compose.yaml 파일은 컨테이너 시작 방법을 제어합니다. 환경 변수(API 키 등)를 여기서 정의할 수 있습니다. 보호된 파일은 Claude가 .env 파일 같은 민감한 데이터에 접근하지 못하도록 빈 읽기 전용 파일로 마운트됩니다.",
    "title": "미리보기",
    "showPreview": "미리보기 표시",
    "hidePreview": "미리보기 숨기기",
    "empty": "이 섹션에 대한 미리보기가 없습니다.",
    "settingsJson": "settings.json",
    "devContainer": "devcontainer.json",
    "claudeMdIntegrated": "미리보기가 위의 편집기에 통합되어 있습니다."
  },
  "dockerfile": {
    "software": "소프트웨어",
    "advancedOptions": "고급 옵션",
    "softwareCount": "{{count}}개 선택됨"
  },
  "dockerCompose": {
    "platform": "플랫폼",
    "platformDesc": "컨테이너에 특정 플랫폼을 설정합니다(예: linux/amd64). 기본 플랫폼을 사용하려면 비워 두세요. 베이스 이미지가 아키텍처를 지원하지 않을 때 사용하세요.",
    "platformPlaceholder": "예: linux/amd64",
    "envSection": "환경 변수",
    "protectedSection": "보호된 파일"
  },
  "download": {
    "button": "ZIP 다운로드",
    "generating": "생성 중...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "GitHub 저장소",
    "paypal": "PayPal로 지원"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "영어",
    "de": "독일어",
    "es": "스페인어",
    "fr": "프랑스어",
    "it": "이탈리아어",
    "pt": "포르투갈어",
    "nl": "네덜란드어",
    "ja": "일본어",
    "ko": "한국어",
    "zh": "중국어",
    "ar": "아랍어",
    "he": "히브리어",
    "hi": "힌디어",
    "ur": "우르두어",
    "uk": "우크라이나어",
    "el": "그리스어",
    "pl": "폴란드어",
    "tr": "터키어"
  },
  "importExport": {
    "exportButton": "설정 내보내기",
    "importButton": "설정 가져오기",
    "exportSuccess": "설정이 성공적으로 내보내졌습니다.",
    "importSuccess": "설정이 성공적으로 가져와졌습니다.",
    "importErrorInvalidFile": "잘못된 파일 형식입니다. 유효한 JSON 파일을 선택하세요.",
    "importErrorValidation": "파일에 잘못된 설정 데이터가 포함되어 있습니다.",
    "importErrorRead": "파일을 읽을 수 없습니다. 다시 시도하세요.",
    "importConfirmTitle": "설정 가져오기",
    "importConfirmDescription": "현재 설정이 대체됩니다. 이 작업은 되돌릴 수 없습니다.",
    "importConfirmApply": "적용",
    "importConfirmCancel": "취소",
    "diffTitle": "변경 미리보기",
    "diffBaseImage": "베이스 이미지",
    "diffNodeVersion": "Node 버전",
    "diffDockerPlatform": "Docker 플랫폼",
    "diffSoftware": "소프트웨어",
    "diffAptPackages": "APT 패키지",
    "diffNpmPackages": "NPM 패키지",
    "diffRunCommands": "RUN 명령어",
    "diffEnvVariables": "환경 변수",
    "diffProtectedFiles": "보호된 파일",
    "diffClaudeMd": "CLAUDE.md",
    "diffPermissions": "권한",
    "diffDevContainer": "DevContainer",
    "diffNoChanges": "변경 사항이 없습니다.",
    "diffCurrent": "현재",
    "diffImported": "가져온",
    "diffChanged": "변경됨",
    "diffUnchanged": "변경 없음"
  },
  "errors": {
    "invalidEnvKey": "잘못된 변수 이름입니다. 문자, 숫자, 밑줄만 사용하세요.",
    "duplicateEnvKey": "이 변수 이름은 이미 존재합니다.",
    "invalidPath": "경로는 상대 경로여야 하며(앞에 / 없음) ..를 포함할 수 없습니다"
  },
  "readme": {
    "title": "Claude Code Docker 구성",
    "generatedBy": "[Claude Initializr]({{url}})로 생성됨",
    "languageSwitch": "{{language}}로 읽기",
    "intro": {
      "title": "이 구성에 대하여",
      "description": "이 폴더에는 격리된 컨테이너에서 Claude Code를 안전하게 실행하기 위한 Docker 구성 파일이 포함되어 있습니다. 이 구성은 네트워크 격리, 파일 보호 및 AI 지원 개발을 위한 샌드박스 환경을 제공합니다."
    },
    "files": {
      "title": "파일 개요",
      "dockerfile": "Dockerfile - 모든 개발 도구를 포함한 컨테이너 이미지 정의",
      "dockerCompose": "docker-compose.yaml - 컨테이너 시작을 위한 오케스트레이션 파일",
      "env": ".env - 환경 변수 (여기에 API 키 추가)",
      "initFirewall": "init-firewall.sh - 보안을 위한 네트워크 방화벽 스크립트",
      "workspace": "workspace/ - 컨테이너에 마운트되는 작업 디렉토리",
      "claudeMd": "workspace/CLAUDE.md - Claude를 위한 프로젝트 지침",
      "settingsJson": "workspace/.claude/settings.json - Claude Code 권한 설정",
      "devcontainer": ".devcontainer/devcontainer.json - VS Code Dev Container 구성"
    },
    "baseImage": {
      "title": "베이스 이미지",
      "description": "이 구성은 다음 Docker 베이스 이미지를 사용합니다:",
      "dockerHub": "Docker Hub에서 보기"
    },
    "platform": {
      "title": "플랫폼",
      "description": "컨테이너는 이 플랫폼에서 실행되도록 구성되었습니다:"
    },
    "aptPackages": {
      "title": "시스템 패키지 (APT)",
      "description": "다음 시스템 패키지가 설치되었습니다:"
    },
    "npmPackages": {
      "title": "추가 NPM 패키지",
      "description": "다음 추가 NPM 패키지가 전역으로 설치되었습니다:",
      "installedAs": "{{user}}로 설치됨"
    },
    "envVariables": {
      "title": "환경 변수",
      "description": "다음 환경 변수가 구성되었습니다 (보안상 값은 표시되지 않음):",
      "note": "컨테이너를 시작하기 전에 .env 파일에 실제 값을 추가하세요."
    },
    "protectedFiles": {
      "title": "보호된 파일",
      "description": "다음 파일은 보호되어 빈 읽기 전용 파일로 마운트됩니다:"
    },
    "settingsJson": {
      "title": "권한 설정",
      "description": "Claude Code는 다음 권한 규칙으로 구성되었습니다:",
      "allow": "허용된 작업 (자동)",
      "ask": "확인이 필요한 작업",
      "deny": "거부된 작업"
    },
    "claudeMd": {
      "title": "프로젝트 지침",
      "description": "Claude를 위한 프로젝트별 지침은 다음에 정의되어 있습니다:"
    },
    "quickStart": {
      "title": "빠른 시작",
      "step1": "Docker 설치 (아래 사전 요구 사항 참조)",
      "step2": "컨테이너 시작:",
      "step2CustomVersions": "선택 사항: 사용자 정의 소프트웨어 버전으로 빌드 (아래 Docker Build Arguments 참조):",
      "step3": "Claude Code 시작:",
      "step4": "컨테이너 중지:",
      "note": "workspace 폴더는 컨테이너 내의 /workspace에 마운트됩니다. 로그인 옵션은 아래 인증 섹션을 참조하세요."
    },
    "authentication": {
      "title": "인증",
      "description": "Claude Code는 두 가지 인증 방법을 지원합니다. 필요에 가장 적합한 방법을 선택하세요:",
      "apiKey": {
        "title": "옵션 1: API 키",
        "description": "`.env` 파일에서 API 키(`ANTHROPIC_API_KEY`)를 설정합니다. Claude Code가 자동으로 사용합니다.",
        "pros": [
          "헤드리스/자동화 환경에서 작동 (CI/CD, 컨테이너, SSH)",
          "브라우저 불필요",
          "사용 제한 없음 (사용량에 따른 지불)",
          "모든 환경에서 안정적"
        ],
        "cons": [
          "API 호출당 비용 발생 (표준 API 요금)",
          "API 키 관리 및 보안 필요",
          "지출 한도 없이 예상치 못한 요금 발생 가능"
        ]
      },
      "browserLogin": {
        "title": "옵션 2: 브라우저 로그인 (Claude Pro/Max/Team)",
        "description": "Claude Code 내에서 `/login`을 실행하여 브라우저를 통해 구독으로 인증합니다.",
        "pros": [
          "구독에 포함됨 (예측 가능한 월별 비용)",
          "추가 API 비용 없음",
          "Claude.ai와 통합 청구"
        ],
        "cons": [
          "최초 로그인에 브라우저 필요",
          "매주 재설정되는 사용 제한 있음",
          "컨테이너/SSH 세션에서 인증이 유지되지 않을 수 있음"
        ]
      }
    },
    "buildArgs": {
      "title": "Docker Build Arguments",
      "description": "Docker 빌드 중에 소프트웨어 버전과 다운로드 URL을 구성할 수 있습니다. 기본값을 재정의하려면 `--build-arg 이름=값`을 사용하세요.",
      "versionArgs": {
        "title": "버전 인수",
        "description": "설치할 소프트웨어 버전 제어:"
      },
      "urlArgs": {
        "title": "URL 인수",
        "description": "미러 또는 프록시용 다운로드 URL 재정의:"
      },
      "defaultValue": "기본값",
      "example": "사용자 정의 버전 예시:"
    },
    "prerequisites": {
      "title": "사전 요구 사항",
      "description": "시스템에 Docker가 설치되어 있어야 합니다. 운영 체제를 선택하세요:",
      "windows": {
        "title": "Windows",
        "steps": [
          "docker.com/products/docker-desktop에서 Docker Desktop 다운로드",
          "설치 프로그램을 실행하고 설정 마법사를 따름",
          "요청 시 WSL 2 백엔드 활성화 (권장)",
          "필요한 경우 컴퓨터 재시작",
          "Docker Desktop을 열고 시작될 때까지 대기"
        ],
        "link": "공식 Windows 설치 가이드"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "docker.com/products/docker-desktop에서 Docker Desktop 다운로드",
          ".dmg 파일을 열고 Docker를 응용 프로그램에 드래그",
          "응용 프로그램 폴더에서 Docker 열기",
          "요청 시 필요한 권한 부여",
          "Docker 시작 완료 대기 (메뉴 바의 고래 아이콘)"
        ],
        "link": "공식 macOS 설치 가이드"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "패키지 인덱스 업데이트: sudo apt update",
          "Docker 설치: sudo apt install docker.io docker-compose-v2",
          "사용자를 docker 그룹에 추가: sudo usermod -aG docker $USER",
          "그룹 변경 사항을 적용하려면 로그아웃 후 다시 로그인",
          "설치 확인: docker --version"
        ],
        "link": "공식 Linux 설치 가이드",
        "altNote": "또는 GUI 환경을 위해 Docker Desktop 설치."
      }
    },
    "troubleshooting": {
      "title": "문제 해결",
      "issues": {
        "containerNotStarting": {
          "title": "컨테이너가 시작되지 않음",
          "solutions": [
            "Docker가 실행 중인지 확인: docker info",
            ".env 파일이 존재하고 ANTHROPIC_API_KEY가 포함되어 있는지 확인",
            "포트 충돌 확인: docker ps",
            "컨테이너 로그 보기: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "권한 거부 오류",
          "solutions": [
            "Linux에서 사용자가 docker 그룹에 속해 있는지 확인",
            "sudo로 실행 시도 (일반 사용에는 권장되지 않음)",
            "workspace 폴더의 파일 권한 확인"
          ]
        },
        "networkIssues": {
          "title": "네트워크 또는 API 연결 문제",
          "solutions": [
            "방화벽 스크립트는 특정 도메인만 허용",
            "api.anthropic.com이 네트워크에서 접근 가능한지 확인",
            "컨테이너 내 방화벽 로그 확인: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "컨테이너에서 파일에 접근할 수 없음",
          "solutions": [
            "보호된 파일은 의도적으로 비어 있음 - 이것은 예상된 동작",
            "docker-compose.yaml의 볼륨 마운트 확인",
            "호스트에 workspace 폴더가 존재하는지 확인"
          ]
        }
      }
    },
    "links": {
      "title": "링크",
      "initializer": "새 구성 생성",
      "documentation": "Claude Code 문서",
      "support": "문제 보고"
    },
    "author": {
      "title": "작성자",
      "createdBy": "제작자",
      "support": "이 프로젝트 지원"
    },
    "software": {
      "title": "설치된 소프트웨어",
      "description": "다음 개발 도구가 설치되었습니다:"
    },
    "devContainer": {
      "title": "VS Code Dev Container",
      "description": "이 구성에는 원활한 개발을 위한 VS Code Dev Container 설정이 포함되어 있습니다.",
      "extensions": "다음 VS Code 확장이 자동으로 설치됩니다:",
      "features": "다음 Dev Container 기능이 포함되어 있습니다:",
      "ports": "다음 포트가 전달됩니다:",
      "commands": "구성된 라이프사이클 명령:",
      "vscodeOpen": "VS Code에서 열기",
      "codespacesOpen": "GitHub Codespaces에서 열기"
    }
  },
  "keyboardShortcuts": {
    "title": "키보드 단축키",
    "description": "키보드 단축키를 사용하여 빠르게 탐색하고 작업을 수행하세요.",
    "openHelp": "키보드 단축키",
    "categories": {
      "navigation": "탐색",
      "actions": "작업"
    },
    "shortcuts": {
      "downloadZip": "ZIP 다운로드",
      "forceSave": "강제 저장",
      "resetDefaults": "기본값으로 초기화",
      "togglePreviewPane": "미리보기 창 전환",
      "toggleSidebar": "사이드바 전환",
      "switchSection": "섹션 {{number}}로 전환",
      "toggleDarkMode": "다크 모드 전환",
      "openLanguageSwitcher": "언어 선택기 열기",
      "closeDialog": "대화 상자 닫기",
      "openShortcutsHelp": "키보드 단축키 열기",
      "undo": "실행 취소",
      "redo": "다시 실행"
    },
    "announced": {
      "downloadStarted": "다운로드가 시작되었습니다",
      "configReset": "설정이 기본값으로 초기화되었습니다",
      "darkModeToggled": "다크 모드가 전환되었습니다",
      "previewPaneToggled": "미리보기 창이 전환되었습니다",
      "sectionSwitched": "섹션 {{number}}로 전환되었습니다",
      "sidebarToggled": "사이드바가 전환되었습니다",
      "undoPerformed": "변경 사항을 실행 취소했습니다",
      "redoPerformed": "변경 사항을 다시 실행했습니다"
    }
  },
  "history": {
    "title": "기록",
    "description": "이전 설정을 보고 복원합니다.",
    "unavailable": "이 브라우저에서는 기록 기능을 사용할 수 없습니다.",
    "undo": "실행 취소",
    "redo": "다시 실행",
    "clearAll": "모두 지우기",
    "clearConfirmTitle": "기록 지우기",
    "clearConfirmDescription": "모든 기록을 지우시겠습니까? 이 작업은 되돌릴 수 없습니다.",
    "clearConfirmCancel": "취소",
    "clearConfirmClear": "지우기",
    "currentState": "현재",
    "restoreButton": "복원",
    "viewDiffButton": "차이점 보기",
    "emptyState": "아직 기록이 없습니다. 변경 사항이 자동으로 추적됩니다.",
    "diffTitle": "변경 사항 비교",
    "diffFrom": "이전",
    "diffTo": "이후",
    "diffClose": "닫기",
    "changes": {
      "initial": "초기 상태",
      "baseImage": "베이스 이미지 변경됨",
      "nodeVersion": "Node 버전 변경됨",
      "dockerPlatform": "Docker 플랫폼 변경됨",
      "softwareEnabled": "{{software}} 활성화됨",
      "softwareDisabled": "{{software}} 비활성화됨",
      "aptPackagesAdded": "APT 패키지 추가됨",
      "aptPackagesRemoved": "APT 패키지 제거됨",
      "npmPackagesAdded": "NPM 패키지 추가됨",
      "npmPackagesRemoved": "NPM 패키지 제거됨",
      "runCommandsAdded": "RUN 명령 추가됨",
      "runCommandsRemoved": "RUN 명령 제거됨",
      "envVariablesAdded": "환경 변수 추가됨",
      "envVariablesRemoved": "환경 변수 제거됨",
      "envVariablesChanged": "환경 변수 수정됨",
      "protectedFilesAdded": "보호된 파일 추가됨",
      "protectedFilesRemoved": "보호된 파일 제거됨",
      "claudeMdChanged": "CLAUDE.md 수정됨",
      "permissionsChanged": "권한 수정됨",
      "devContainerChanged": "DevContainer 설정 수정됨",
      "multipleChanges": "여러 변경 사항"
    }
  },
  "header": {
    "download": "다운로드",
    "downloadZip": "ZIP 다운로드",
    "exportConfig": "설정 내보내기",
    "importConfig": "설정 가져오기",
    "settings": "설정",
    "autosave": "자동 저장",
    "theme": "테마",
    "themeLight": "라이트",
    "themeDark": "다크",
    "themeSystem": "시스템",
    "language": "언어",
    "history": "기록",
    "resetDefaults": "기본값으로 재설정",
    "keyboardShortcuts": "키보드 단축키"
  },
  "sidebar": {
    "configuration": "구성",
    "actions": "작업",
    "dockerfile": "Dockerfile",
    "dockerCompose": "Docker Compose",
    "claudeMd": "CLAUDE.md",
    "settings": "설정",
    "devContainer": "DevContainer",
    "import": "가져오기",
    "export": "내보내기",
    "history": "기록",
    "reset": "초기화",
    "toggle": "사이드바 전환",
    "about": "정보",
    "donate": "후원",
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "devContainer": {
    "title": "DevContainer",
    "description": "VS Code Dev Containers 및 GitHub Codespaces 지원을 구성합니다. 이것은 개발 환경을 정의하는 devcontainer.json 파일을 생성합니다.",
    "enable": "DevContainer 활성화",
    "enableDesc": "VS Code Dev Containers 및 GitHub Codespaces용 devcontainer.json 파일을 생성합니다.",
    "name": "컨테이너 이름",
    "nameDesc": "개발 컨테이너의 표시 이름입니다.",
    "namePlaceholder": "예: 내 개발 환경",
    "tabs": {
      "settings": "설정",
      "extensions": "확장",
      "features": "기능",
      "ports": "포트",
      "preview": "미리보기"
    },
    "extensionsSection": "확장 프로그램",
    "featuresSection": "기능",
    "portsSection": "포워딩된 포트",
    "scriptsSection": "라이프사이클 스크립트",
    "settingsSection": "VS Code 설정",
    "extensions": {
      "title": "VS Code 확장",
      "description": "컨테이너 생성 시 자동으로 설치되는 확장입니다.",
      "placeholder": "예: ms-python.python",
      "add": "확장 추가",
      "remove": "{{extension}} 제거",
      "recommended": "권장 확장",
      "recommendedDesc": "선택한 소프트웨어에 따라 이 확장들이 권장됩니다.",
      "addRecommended": "권장 추가",
      "noRecommendations": "현재 소프트웨어 선택에 따른 권장 사항이 없습니다."
    },
    "features": {
      "title": "Dev Container 기능",
      "description": "기능은 설치 코드와 구성의 독립적인 단위입니다.",
      "placeholder": "예: ghcr.io/devcontainers/features/python:1",
      "add": "기능 추가",
      "remove": "{{feature}} 제거",
      "recommended": "권장 기능",
      "recommendedDesc": "선택한 소프트웨어에 따라 이 기능들이 권장됩니다.",
      "addRecommended": "권장 추가",
      "noRecommendations": "현재 소프트웨어 선택에 따른 권장 사항이 없습니다."
    },
    "ports": {
      "title": "전달 포트",
      "description": "컨테이너에서 호스트로 자동 전달되는 포트입니다.",
      "placeholder": "예: 3000",
      "add": "포트 추가",
      "remove": "포트 {{port}} 제거",
      "invalid": "유효한 포트 번호를 입력하세요 (1-65535)."
    },
    "scripts": {
      "title": "라이프사이클 스크립트",
      "description": "컨테이너 라이프사이클의 여러 단계에서 실행되는 Bash 스크립트입니다. 각 스크립트는 별도의 .sh 파일로 저장됩니다.",
      "tabs": {
        "postCreate": "post-create.sh",
        "postStart": "post-start.sh",
        "postAttach": "post-attach.sh"
      },
      "postCreateTitle": "Post Create 스크립트",
      "postCreateDesc": "컨테이너 생성 후 한 번 실행됩니다. 의존성 설치와 같은 일회성 설정에 사용합니다.",
      "postStartTitle": "Post Start 스크립트",
      "postStartDesc": "컨테이너가 시작될 때마다 실행됩니다. 매 시작 시 실행해야 하는 작업에 사용합니다.",
      "postAttachTitle": "Post Attach 스크립트",
      "postAttachDesc": "VS Code가 컨테이너에 연결될 때마다 실행됩니다.",
      "editorPlaceholder": "# 여기에 bash 명령어를 입력하세요..."
    },
    "settings": {
      "title": "VS Code 설정",
      "description": "개발 컨테이너를 위한 사용자 지정 VS Code 설정입니다.",
      "key": "설정 키",
      "value": "값",
      "keyPlaceholder": "예: editor.formatOnSave",
      "valuePlaceholder": "예: true",
      "add": "설정 추가",
      "remove": "설정 제거"
    }
  }
};

export default ko;
