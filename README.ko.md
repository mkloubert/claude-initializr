# Claude Initializr

**🌐 다른 언어로 읽기:**
[🌍 العربية](README.ar.md) ·
[🇨🇳 中文](README.zh.md) ·
[🇳🇱 Nederlands](README.nl.md) ·
[🇬🇧 English](README.md) ·
[🇫🇷 Français](README.fr.md) ·
[🇩🇪 Deutsch](README.de.md) ·
[🇬🇷 Ελληνικά](README.el.md) ·
[🇮🇱 עברית](README.he.md) ·
[🇮🇳 हिन्दी](README.hi.md) ·
[🇮🇹 Italiano](README.it.md) ·
[🇯🇵 日本語](README.ja.md) ·
[🇰🇷 한국어](README.ko.md) ·
[🇵🇱 Polski](README.pl.md) ·
[🇵🇹 Português](README.pt.md) ·
[🇪🇸 Español](README.es.md) ·
[🇹🇷 Türkçe](README.tr.md) ·
[🇺🇦 Українська](README.uk.md) ·
[🇵🇰 اردو](README.ur.md)

---

[![라이선스: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![기부](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

[Claude Code](https://docs.anthropic.com/en/docs/claude-code)를 컨테이너화된 환경에서 안전하게 실행하기 위한 Docker 구성 파일을 생성하는 웹 애플리케이션입니다.

**라이브 데모:** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## 기능

### Dockerfile 구성

- **베이스 이미지**: Docker 베이스 이미지 이름과 버전 구성 (기본값: `node:24`)
- **소프트웨어 선택**: 설치할 추가 소프트웨어 선택:
  - TypeScript (버전 선택 가능)
  - Python 3 (버전 선택 가능)
  - ffmpeg (오디오/비디오 처리)
  - ImageMagick (이미지 처리)
- **사용자 정의 APT 패키지**: 컨테이너에 설치할 추가 Debian/Ubuntu 패키지 추가
- **사용자 정의 NPM 패키지**: 전역으로 설치할 추가 NPM 패키지 추가, `root` 또는 `node` 사용자로 설치 옵션
- **사용자 정의 RUN 명령어**: `root` 또는 `node` 사용자로 실행할 사용자 정의 Dockerfile RUN 명령어 추가

### docker-compose.yaml 구성

- **환경 변수**: `.env` 파일용 환경 변수 구성
- **보호된 파일**: 빈 읽기 전용 파일을 마운트하여 보호해야 할 파일 지정 (`.env.local`과 같은 민감한 파일에 대한 접근 방지)

### CLAUDE.md 편집기

- 구문 강조 기능이 있는 Markdown 편집기
- 내장 미리보기 기능
- Claude를 위한 프로젝트별 지시사항 작성

### 일반 기능

- **실시간 미리보기**: 생성된 구성 파일의 실시간 미리보기 확인
- **ZIP 다운로드**: 모든 파일을 바로 사용 가능한 ZIP 아카이브로 다운로드
- **자동 저장**: 설정이 브라우저의 localStorage에 자동 저장됨 (기본적으로 활성화)
- **다국어 지원**: 18개 언어 지원:
  - 🌍 아랍어
  - 🇨🇳 중국어
  - 🇳🇱 네덜란드어
  - 🇬🇧 영어
  - 🇫🇷 프랑스어
  - 🇩🇪 독일어
  - 🇬🇷 그리스어
  - 🇮🇱 히브리어
  - 🇮🇳 힌디어
  - 🇮🇹 이탈리아어
  - 🇯🇵 일본어
  - 🇰🇷 한국어
  - 🇵🇱 폴란드어
  - 🇵🇹 포르투갈어
  - 🇪🇸 스페인어
  - 🇹🇷 터키어
  - 🇺🇦 우크라이나어
  - 🇵🇰 우르두어
- **다크/라이트 테마**: 자동 테마 감지 및 수동 전환
- **PWA 지원**: Progressive Web App으로 설치 가능
- **완전한 접근성**: 키보드 탐색 및 스크린 리더 지원을 갖춘 WCAG 준수
- **반응형 디자인**: 데스크톱 및 태블릿에 최적화

### 자동 저장 메커니즘

자동 저장 기능은 헤더의 저장 아이콘을 사용하여 전환할 수 있습니다:

| 아이콘         | 상태     | 동작                                                    |
| -------------- | -------- | ------------------------------------------------------- |
| 💾 (저장)      | 활성화   | 모든 변경 사항이 localStorage에 자동 저장됨             |
| 🚫💾 (끔)      | 비활성화 | 변경 사항이 저장되지 않음; 기존 저장 데이터가 삭제됨    |

**작동 방식:**

- **자동 저장 활성화**: 현재 설정을 즉시 localStorage에 저장
- **자동 저장 비활성화**: localStorage에서 모든 저장된 설정 삭제
- 자동 저장 기본 설정은 세션 간에 기억됩니다

### 개인정보 보호 및 데이터 저장

이 애플리케이션은 귀하의 개인정보를 존중합니다:

- **로컬 저장소만 사용**: 모든 설정은 브라우저의 로컬 저장소(localStorage)에 저장됩니다
- **서버 통신 없음**: 어떤 데이터도 서버로 전송되지 않습니다
- **설계에 의한 보안**: 환경 변수 **값은 절대 저장되지 않음** - 변수 이름만 저장됩니다
- **완전한 제어**: 헤더의 토글을 사용하여 언제든지 자동 저장을 비활성화할 수 있으며, 저장된 모든 데이터도 삭제됩니다
- **세션 기반 테마**: 페이지 새로고침 시 테마 기본 설정이 시스템 기본값으로 재설정됩니다

## 보안 기능

생성된 Docker 구성에는 포괄적인 보안 조치가 포함되어 있습니다:

### 네트워크 방화벽

`init-firewall.sh` 스크립트는 엄격한 네트워크 격리를 구현합니다:

- **iptables 기반 방화벽**: 모든 아웃바운드 트래픽에 DROP 정책 적용
- **허용 목록 전용 접근 방식** - 승인된 도메인만 접근 가능:
  - `api.anthropic.com` - Claude API
  - `npm registry` - 패키지 설치
  - `github.com` - Git 작업
  - `sentry.io` - 오류 보고
- **자동 GitHub IP 해석**: 웹, API 및 git 엔드포인트용
- **호스트 네트워크 격리** - 로컬 네트워크 접근 방지
- **방화벽 검증** - 테스트를 통해 규칙이 올바르게 적용되었는지 확인

### Docker 보안 강화

- **기능 제거**: 모든 Linux 기능이 제거됨 (`cap_drop: ALL`)
- **권한 상승 없음**: `no-new-privileges:true`
- **리소스 제한**: CPU 및 메모리 제약
- **읽기 전용 마운트**: 보호된 파일은 읽기 전용으로 마운트
- **비-root 실행**: `node` 사용자로 실행

## 사전 설치된 도구

생성된 컨테이너에는 다음이 포함됩니다:

| 카테고리       | 도구                                |
| -------------- | ----------------------------------- |
| **셸**         | zsh (Powerline10k 테마), bash       |
| **편집기**     | nano, vim                           |
| **버전 관리**  | git, git-delta, GitHub CLI (gh)     |
| **유틸리티**   | fzf, jq, less, unzip, man-db        |
| **네트워크**   | iptables, ipset, iproute2, dnsutils |

## 시작하기

### 전제 조건

- Node.js 20 이상
- npm 10 이상

### 설치

```bash
# 저장소 복제
git clone https://github.com/mkloubert/claude-initializr.git
cd claude-initializr

# 의존성 설치
npm install

# 개발 서버 시작
npm run dev

# 프로덕션용 빌드
npm run build

# 프로덕션 빌드 미리보기
npm run preview
```

### 환경 변수

환경 변수를 사용하여 애플리케이션을 사용자 정의합니다. `.env` 파일을 생성하세요:

```bash
# GitHub 저장소 URL (선택 사항, 숨기려면 비워두기)
VITE_GITHUB_URL=https://github.com/mkloubert/claude-initializr

# PayPal 기부 URL (선택 사항, 숨기려면 비워두기)
VITE_PAYPAL_URL=https://paypal.me/mjkloubert
```

## 사용법

1. **베이스 이미지 구성**: Docker 베이스 이미지 이름과 버전 설정 (예: `node:24` 또는 `node:22-slim`)

2. **소프트웨어 선택**: 컨테이너에 설치할 추가 소프트웨어 선택

3. **사용자 정의 패키지 및 명령어 추가**:
   - 사용자 정의 APT 패키지 추가 (예: `curl`, `graphviz`, `sqlite3`)
   - 전역으로 설치할 사용자 정의 NPM 패키지 추가 (예: `eslint`, `prettier`)
   - NPM 패키지를 `node` (기본값) 또는 `root` 사용자로 설치할지 선택
   - 빌드 중 실행할 사용자 정의 RUN 명령어 추가
   - 각 RUN 명령어를 `node` 또는 `root` 사용자로 실행할지 선택

4. **환경 변수 설정**: 프로젝트에 필요한 환경 변수 추가 (예: `ANTHROPIC_API_KEY`)

5. **민감한 파일 보호**: 보호해야 할 파일 경로 추가 (예: `.env.local`)

6. **CLAUDE.md 편집**: Markdown 편집기에서 Claude를 위한 지시사항 작성

7. **미리보기**: 미리보기 탭에서 생성된 구성 파일 확인

8. **다운로드**: "ZIP 다운로드"를 클릭하여 모든 파일 가져오기

## 생성된 파일 사용

1. ZIP 파일을 프로젝트 디렉토리에 압축 해제

2. 프로젝트 파일을 `workspace` 폴더에 복사 (또는 기존 프로젝트 마운트)

3. `.env` 파일에 API 키 설정:

   ```bash
   ANTHROPIC_API_KEY=여기에-api-키-입력
   ```

4. 컨테이너 빌드 및 실행:

   ```bash
   docker compose up --build
   ```

5. 컨테이너에 연결:

   ```bash
   docker compose exec claude zsh
   ```

6. 방화벽 초기화 (sudo 비밀번호 필요):

   ```bash
   sudo /usr/local/bin/init-firewall.sh
   ```

7. Claude Code 시작:
   ```bash
   claude
   ```

## 생성된 파일 구조

```
├── workspace/
│   ├── .claude/
│   │   └── settings.json    # Claude 설정
│   ├── .empty               # 보호된 마운트용 빈 파일
│   └── CLAUDE.md            # Claude 지시사항
├── .env                     # 환경 변수
├── Dockerfile               # 컨테이너 정의
├── docker-compose.yaml      # Docker Compose 구성
└── init-firewall.sh         # 네트워크 방화벽 스크립트
```

## 문제 해결

### 방화벽 문제

방화벽 활성화 후 네트워크 문제가 발생하는 경우:

```bash
# 방화벽 상태 확인
sudo iptables -L -n

# 차단된 연결 보기
sudo iptables -L -n -v | grep DROP

# 방화벽 재설정 (모든 트래픽 허용)
sudo iptables -F
```

### 컨테이너가 시작되지 않음

```bash
# 로그 확인
docker compose logs

# 캐시 없이 재빌드
docker compose build --no-cache
```

### 권한 거부

workspace 디렉토리에 올바른 권한이 있는지 확인:

```bash
chmod -R 755 workspace
```

### 애플리케이션 설정 재설정

저장된 모든 설정을 지우고 처음부터 시작하려면 브라우저의 개발자 콘솔을 열고 실행:

```javascript
localStorage.removeItem("claude-initializr-config");
localStorage.removeItem("claude-initializr-welcome-dismissed");
localStorage.removeItem("claude-initializr-autosave");
```

그런 다음 페이지를 새로고침합니다.

또는 헤더의 토글을 사용하여 자동 저장을 비활성화하여 설정이 저장되지 않도록 할 수 있습니다.

## 기술 스택

- [React 19](https://react.dev/) (TypeScript 및 React Compiler 사용)
- [Vite](https://vite.dev/) (번들러)
- [Tailwind CSS v4](https://tailwindcss.com/) (OKLCH 색상 공간)
- [shadcn/ui](https://ui.shadcn.com/) 컴포넌트 (40개 이상)
- [react-router](https://reactrouter.com/) (라우팅)
- [i18next](https://www.i18next.com/) (국제화)
- [JSZip](https://stuk.github.io/jszip/) (ZIP 생성)
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) (코드 미리보기)

## 기여

기여를 환영합니다! Pull Request를 제출해 주세요.

1. 저장소 포크
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경 사항 커밋 (`git commit -m '멋진 기능 추가'`)
4. 브랜치에 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 열기

### 새 언어 추가

1. `src/i18n/locales/`에 새 로케일 파일 생성 (예: `fr.json`)
2. `en.json`에서 구조 복사
3. 모든 문자열 번역
4. `src/i18n/index.ts`에 언어 추가
5. `LanguageSwitcher.tsx`에 언어 옵션 추가

## 접근성

이 애플리케이션은 완전히 접근 가능하도록 설계되었습니다:

- 시맨틱 HTML 구조 (`<header>`, `<main>`, `<footer>`)
- 모든 대화형 요소에 ARIA 레이블
- 키보드 탐색 지원
- 스크린 리더 호환
- 고대비 색상 체계
- 대화형 요소의 포커스 표시기

## 지원

이 프로젝트가 유용하다면 지원을 고려해 주세요:

- ⭐ [GitHub](https://github.com/mkloubert/claude-initializr)에서 저장소에 별표 주기
- 💝 [PayPal로 기부](https://paypal.me/mjkloubert)

## 라이선스

MIT 라이선스 - 자세한 내용은 [LICENSE](./LICENSE) 참조.

Copyright © 2026 Marcel Joachim Kloubert
