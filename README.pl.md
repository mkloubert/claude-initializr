# Claude Initializr

**🌐 Przeczytaj w innych językach:**
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

[![Licencja: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![Wpłać](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

Aplikacja webowa do generowania plików konfiguracyjnych Docker w celu bezpiecznego uruchamiania [Claude Code](https://docs.anthropic.com/en/docs/claude-code) w środowisku kontenerowym.

**Demo na żywo:** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## Funkcje

### Konfiguracja Dockerfile

- **Obraz bazowy**: Konfiguracja nazwy i wersji bazowego obrazu Docker (domyślnie: `node:24`)
- **Wybór oprogramowania**: Wybierz dodatkowe oprogramowanie do zainstalowania:
  - ffmpeg (przetwarzanie audio/wideo)
  - Flutter (zawiera Dart i Android SDK)
  - Go
  - ImageMagick (przetwarzanie obrazów)
  - Python 3
  - Rust (zawiera menedżer pakietów Cargo)
  - TypeScript
  - uv (szybki instalator pakietów Python, zaleca Python)
- **Konfiguracja wersji**: Wersje oprogramowania są konfigurowane poprzez argumenty budowania Docker (np. `--build-arg GO_VERSION=1.22.0`)
- **Niestandardowe pakiety APT**: Dodaj dodatkowe pakiety Debian/Ubuntu do zainstalowania w kontenerze
- **Niestandardowe pakiety NPM**: Dodaj dodatkowe pakiety NPM do zainstalowania globalnie, z opcją instalacji jako użytkownik `root` lub `node`
- **Niestandardowe polecenia RUN**: Dodaj niestandardowe polecenia shell do wykonania podczas budowania obrazu Docker, z opcją uruchomienia jako użytkownik `root` lub `node`

### Konfiguracja docker-compose.yaml

- **Zmienne środowiskowe**: Konfiguracja zmiennych środowiskowych dla pliku `.env`
- **Chronione pliki**: Określ pliki, które powinny być chronione poprzez montowanie pustych plików tylko do odczytu (zapobiega dostępowi do wrażliwych plików jak `.env.local`)

### Edytor CLAUDE.md

- Edytor Markdown z podświetlaniem składni
- Wbudowana funkcja podglądu
- Pisanie instrukcji specyficznych dla projektu dla Claude

### Konfiguracja settings.json

- **Reguły uprawnień**: Skonfiguruj uprawnienia Claude Code do kontroli dostępu do plików
  - `Allow` - Reguły dla automatycznie dozwolonych operacji
  - `Ask` - Reguły wymagające potwierdzenia użytkownika
  - `Deny` - Reguły zawsze odmawiane
- **Obsługiwane dyrektywy**:
  - `Read()` - Kontroluje które pliki Claude może czytać (np: `Read(src/**)`)
  - `Edit()` - Kontroluje które pliki Claude może modyfikować (np: `Edit(.env)`)
  - `WebFetch()` - Kontroluje dostęp do sieci (np: `WebFetch(https://api.github.com:*)`)
- **Automatyczna integracja**: Chronione pliki są automatycznie dodawane jako reguły odmowy `Read()`
- **Obsługa wzorców Glob**: Użyj wzorców jak `src/**` do rekursywnego dopasowania

### Konfiguracja DevContainer (VS Code / GitHub Codespaces)

- **Integracja z VS Code**: Generuj `devcontainer.json` dla VS Code Dev Containers
- **GitHub Codespaces**: Kompatybilna konfiguracja dla programowania w GitHub Codespaces
- **Rozszerzenia**: Konfiguruj rozszerzenia VS Code do automatycznej instalacji
- **Ustawienia**: Definiuj ustawienia VS Code dla środowiska kontenera
- **Features**: Dodaj Dev Container Features (np. GitHub CLI, dodatkowe języki)
- **Przekierowanie portów**: Konfiguruj porty do przekierowania z kontenera
- **Polecenia cyklu życia**: Ustaw polecenia dla zdarzeń post-create, post-start i post-attach
- **Zalecane rozszerzenia**: Automatyczne zalecenia rozszerzeń na podstawie wybranego oprogramowania

### Funkcje ogólne

- **Podgląd na żywo**: Zobacz podglądy generowanych plików konfiguracyjnych w czasie rzeczywistym
- **Pobieranie ZIP**: Pobierz wszystkie pliki jako gotowe do użycia archiwum ZIP
- **Automatyczne generowanie README**: Każdy plik ZIP zawiera szczegółowy README.md z:
  - Przeglądem plików i opisami
  - Informacjami o obrazie bazowym z linkami do Docker Hub
  - Zainstalowanym oprogramowaniem i pakietami z linkami (Debian Tracker, npmjs.com)
  - Kluczami zmiennych środowiskowych (wartości ukryte dla bezpieczeństwa)
  - Listą chronionych plików
  - Podsumowaniem ustawień uprawnień
  - Przewodnikiem szybkiego startu z poleceniami Docker
  - Wymaganiami wstępnymi dla Windows, macOS i Linux
  - Sekcją rozwiązywania problemów
  - Gdy język interfejsu nie jest angielski, zawiera również README.en.md (prosty angielski)
- **Import/Eksport konfiguracji**: Eksportuj swoją konfigurację jako plik JSON i importuj ją w innej przeglądarce lub urządzeniu
- **Automatyczne zapisywanie**: Ustawienia są automatycznie zapisywane w localStorage przeglądarki (domyślnie włączone)
- **Wsparcie wielojęzyczne**: Dostępne w 18 językach:
  - 🌍 Arabski
  - 🇨🇳 Chiński
  - 🇳🇱 Holenderski
  - 🇬🇧 Angielski
  - 🇫🇷 Francuski
  - 🇩🇪 Niemiecki
  - 🇬🇷 Grecki
  - 🇮🇱 Hebrajski
  - 🇮🇳 Hindi
  - 🇮🇹 Włoski
  - 🇯🇵 Japoński
  - 🇰🇷 Koreański
  - 🇵🇱 Polski
  - 🇵🇹 Portugalski
  - 🇪🇸 Hiszpański
  - 🇹🇷 Turecki
  - 🇺🇦 Ukraiński
  - 🇵🇰 Urdu
- **Ciemny/Jasny motyw**: Automatyczne wykrywanie motywu z ręcznym przełączaniem
- **Wsparcie PWA**: Możliwość instalacji jako Progressive Web App
- **Pełna dostępność**: Zgodność z WCAG z nawigacją klawiaturową i wsparciem czytników ekranu
- **Responsywny design**: Zoptymalizowany dla komputerów stacjonarnych i tabletów
- **Skróty klawiaturowe**: Pełna nawigacja klawiaturowa z konfigurowalnymi skrótami (naciśnij `Ctrl+/` lub `⌘+/` aby wyświetlić wszystkie)

### Skróty klawiaturowe

Wszystkie skróty używają `Ctrl` na Windows/Linux i `⌘` (Cmd) na macOS.

| Skrót | Akcja |
| ----- | ----- |
| `Ctrl/⌘ + S` | Pobierz ZIP |
| `Ctrl/⌘ + E` | Przełącz podgląd |
| `Ctrl/⌘ + Shift + D` | Przełącz tryb ciemny/jasny |
| `Ctrl/⌘ + Shift + X` | Przywróć ustawienia domyślne |
| `Ctrl/⌘ + Shift + L` | Otwórz przełącznik języka |
| `Ctrl/⌘ + 1-5` | Przewiń do karty (1=Dockerfile, 2=Docker Compose, 3=CLAUDE.md, 4=settings.json, 5=DevContainer) |
| `Ctrl/⌘ + /` | Otwórz pomoc skrótów klawiaturowych |
| `Escape` | Zamknij okno dialogowe |

Ikona klawiatury w nagłówku również otwiera okno dialogowe pomocy skrótów.

### Mechanizm automatycznego zapisywania

Funkcję automatycznego zapisywania można przełączać za pomocą ikony zapisywania w nagłówku:

| Ikona           | Stan        | Zachowanie                                                          |
| --------------- | ----------- | ------------------------------------------------------------------- |
| 💾 (Zapisz)     | Włączone    | Wszystkie zmiany są automatycznie zapisywane w localStorage         |
| 🚫💾 (Wyłącz)   | Wyłączone   | Zmiany nie są zapisywane; istniejące zapisane dane są usuwane       |

**Jak to działa:**

- **Włączenie automatycznego zapisywania**: Natychmiast zapisuje bieżące ustawienia w localStorage
- **Wyłączenie automatycznego zapisywania**: Usuwa wszystkie zapisane ustawienia z localStorage
- Preferencja automatycznego zapisywania jest zapamiętywana między sesjami

### Import/Eksport konfiguracji

Możesz udostępniać lub tworzyć kopie zapasowe swojej konfiguracji za pomocą plików JSON:

- **Eksport**: Kliknij ikonę przesyłania w nagłówku, aby pobrać bieżącą konfigurację jako `claude-initializr-config.json`
- **Import**: Kliknij ikonę pobierania, aby wybrać wcześniej wyeksportowany plik JSON

**Jak to działa:**

- **Eksport** zapisuje wszystkie ustawienia (obraz bazowy, wybór oprogramowania, pakiety, polecenia, uprawnienia, zawartość CLAUDE.md) w jednym pliku JSON
- **Import** sprawdza plik, wyświetla podgląd zmian i prosi o potwierdzenie przed zastosowaniem
- Ze względów bezpieczeństwa **wartości zmiennych środowiskowych nigdy nie są dołączane** do eksportowanych plików — eksportowane są tylko nazwy zmiennych
- Importowane konfiguracje otrzymują nowe wewnętrzne identyfikatory, aby uniknąć konfliktów
- Format eksportu zawiera pole wersji (`"version": "1.0"`) dla kompatybilności w przód

### Prywatność i przechowywanie danych

Ta aplikacja szanuje Twoją prywatność:

- **Tylko lokalne przechowywanie**: Wszystkie ustawienia są przechowywane lokalnie w Twojej przeglądarce (localStorage)
- **Brak komunikacji z serwerem**: Żadne dane nigdy nie są wysyłane do żadnego serwera
- **Bezpieczeństwo przez projekt**: **Wartości** zmiennych środowiskowych **nigdy nie są zapisywane** - zapisywane są tylko nazwy zmiennych
- **Pełna kontrola**: Możesz wyłączyć automatyczne zapisywanie w dowolnym momencie używając przełącznika w nagłówku, co również usuwa wszystkie zapisane dane
- **Motyw oparty na sesji**: Preferencja motywu jest resetowana do domyślnej systemowej przy przeładowaniu strony

## Funkcje bezpieczeństwa

Wygenerowana konfiguracja Docker zawiera kompleksowe środki bezpieczeństwa:

### Zapora sieciowa

Skrypt `init-firewall.sh` implementuje ścisłą izolację sieciową:

- **Zapora oparta na iptables** z polityką DROP dla całego ruchu wychodzącego
- **Podejście tylko z białą listą** - tylko zatwierdzone domeny są dostępne:
  - `api.anthropic.com` - Claude API
  - `npm registry` - Instalacja pakietów
  - `github.com` - Operacje Git
  - `sentry.io` - Raportowanie błędów
- **Automatyczne rozwiązywanie IP GitHub** dla punktów końcowych web, API i git
- **Izolacja sieci hosta** - zapobiega dostępowi do sieci lokalnej
- **Weryfikacja zapory** - testy zapewniają prawidłowe zastosowanie reguł

### Wzmocnienie bezpieczeństwa Docker

- **Usuwanie możliwości**: Wszystkie możliwości Linux są usuwane (`cap_drop: ALL`)
- **Brak eskalacji uprawnień**: `no-new-privileges:true`
- **Limity zasobów**: Ograniczenia CPU i pamięci
- **Montowania tylko do odczytu**: Chronione pliki są montowane jako tylko do odczytu
- **Wykonanie nie-root**: Uruchamiany jako użytkownik `node`

## Preinstalowane narzędzia

Wygenerowany kontener zawiera:

| Kategoria            | Narzędzia                           |
| -------------------- | ----------------------------------- |
| **Powłoka**          | zsh z motywem Powerline10k, bash    |
| **Edytory**          | nano, vim                           |
| **Kontrola wersji**  | git, git-delta, GitHub CLI (gh)     |
| **Narzędzia**        | fzf, jq, less, unzip, man-db        |
| **Sieć**             | iptables, ipset, iproute2, dnsutils |

## Rozpoczęcie pracy

### Wymagania wstępne

- Node.js 20 lub nowszy
- npm 10 lub nowszy

### Instalacja

```bash
# Sklonuj repozytorium
git clone https://github.com/mkloubert/claude-initializr.git
cd claude-initializr

# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev

# Zbuduj dla produkcji
npm run build

# Podgląd budowy produkcyjnej
npm run preview
```

### Zmienne środowiskowe

Dostosuj aplikację za pomocą zmiennych środowiskowych. Utwórz plik `.env`:

```bash
# URL repozytorium GitHub (opcjonalnie, zostaw puste aby ukryć)
VITE_GITHUB_URL=https://github.com/mkloubert/claude-initializr

# URL darowizny PayPal (opcjonalnie, zostaw puste aby ukryć)
VITE_PAYPAL_URL=https://paypal.me/mjkloubert

# Claude Code permissions documentation URL (optional)
VITE_PERMISSIONS_DOCS_URL=https://docs.anthropic.com/en/docs/claude-code/settings#permission-settings

# Author website URL (optional)
VITE_AUTHOR_URL=https://marcel.coffee

# Author name displayed in footer (optional)
VITE_AUTHOR_NAME=Marcel Joachim Kloubert
```

## Użycie

1. **Skonfiguruj obraz bazowy**: Ustaw nazwę i wersję bazowego obrazu Docker (np. `node:24` lub `node:22-slim`)

2. **Wybierz oprogramowanie**: Wybierz dodatkowe oprogramowanie do zainstalowania w kontenerze

3. **Dodaj niestandardowe pakiety i polecenia**:
   - Dodaj niestandardowe pakiety APT (np. `curl`, `graphviz`, `sqlite3`)
   - Dodaj niestandardowe pakiety NPM do instalacji globalnej (np. `eslint`, `prettier`)
   - Wybierz czy pakiety NPM mają być instalowane jako użytkownik `node` (domyślnie) czy `root`
   - Dodaj niestandardowe polecenia RUN do wykonania podczas budowania (np. `pip install numpy`)
   - Wybierz czy polecenia RUN mają być uruchamiane jako użytkownik `node` (domyślnie) czy `root`

4. **Ustaw zmienne środowiskowe**: Dodaj zmienne środowiskowe potrzebne dla Twojego projektu (np. `ANTHROPIC_API_KEY`)

5. **Chroń wrażliwe pliki**: Dodaj ścieżki do plików, które powinny być chronione (np. `.env.local`)

6. **Edytuj CLAUDE.md**: Napisz instrukcje dla Claude w edytorze Markdown

7. **Konfiguruj uprawnienia**: Ustaw reguły uprawnień w karcie settings.json
   - Dodaj reguły `Allow` dla automatycznie zatwierdzanych operacji
   - Dodaj reguły `Ask` dla operacji wymagających potwierdzenia
   - Dodaj reguły `Deny` dla zabronionych operacji
   - Chronione pliki są automatycznie dodawane jako reguły odmowy `Read()`

8. **Podgląd**: Sprawdź wygenerowane pliki konfiguracyjne w kartach podglądu

9. **Pobierz**: Kliknij "Pobierz ZIP" aby pobrać wszystkie pliki

## Używanie wygenerowanych plików

1. Rozpakuj plik ZIP do katalogu projektu

2. Skopiuj pliki projektu do folderu `workspace` (lub zamontuj istniejący projekt)

3. Ustaw klucz API w pliku `.env`:

   ```bash
   ANTHROPIC_API_KEY=twoj-klucz-api-tutaj
   ```

4. Zbuduj i uruchom kontener:

   ```bash
   docker compose up --build
   ```

   **Opcjonalnie: Niestandardowe wersje oprogramowania**

   Możesz dostosować wersje oprogramowania podczas budowania Docker za pomocą argumentów budowania:

   ```bash
   docker compose build \
     --build-arg CLAUDE_CODE_VERSION=1.0.3 \
     --build-arg FLUTTER_VERSION=3.29.3 \
     --build-arg GIT_DELTA_VERSION=0.18.2 \
     --build-arg GO_VERSION=1.24.3 \
     --build-arg PYTHON_VERSION=3.13.2 \
     --build-arg TYPESCRIPT_VERSION=5.8.3 \
     --build-arg ZSH_IN_DOCKER_VERSION=1.2.0
   ```

   | Argument budowania | Domyślnie | Opis |
   |--------------------|-----------|------|
   | `CLAUDE_CODE_VERSION` | `stable` | Wersja Claude Code (`latest` lub konkretna jak `1.0.58`) |
   | `FLUTTER_VERSION` | `latest` | Wersja Flutter SDK |
   | `GIT_DELTA_VERSION` | `0.18.2` | Wersja git-delta |
   | `GO_VERSION` | `latest` | Wersja Go |
   | `PYTHON_VERSION` | `latest` | Wersja Python 3 |
   | `TYPESCRIPT_VERSION` | `latest` | Wersja TypeScript |
   | `ZSH_IN_DOCKER_VERSION` | `1.2.0` | Wersja zsh-in-docker |

   **Opcjonalnie: Niestandardowe adresy URL pobierania**

   Jeśli musisz użyć serwera lustrzanego lub proxy do pobierania pakietów, możesz nadpisać domyślne adresy URL podczas budowania. Wszystkie adresy URL obsługują parametry zapytania:

   ```bash
   docker compose build \
     --build-arg GO_JSON_URL=https://moj-mirror.example.com/golang/?mode=json \
     --build-arg GO_DOWNLOAD_URL=https://moj-mirror.example.com/golang \
     --build-arg RUSTUP_INSTALL_URL=https://moj-mirror.example.com/rustup/rustup-init.sh \
     --build-arg FLUTTER_JSON_URL=https://moj-mirror.example.com/flutter/releases_linux.json \
     --build-arg FLUTTER_BASE_URL=https://moj-mirror.example.com/flutter/releases \
     --build-arg UV_INSTALL_SCRIPT_URL=https://moj-mirror.example.com/uv/install.sh
   ```

   | Argument budowania | Domyślnie | Opis |
   |--------------------|-----------|------|
   | `GO_JSON_URL` | `https://go.dev/dl/?mode=json` | URL API JSON wersji Go (tylko dla "latest") |
   | `GO_DOWNLOAD_URL` | `https://go.dev/dl` | Bazowy URL dla pobierania archiwów Go |
   | `RUSTUP_INSTALL_URL` | `https://sh.rustup.rs` | URL skryptu instalacyjnego rustup |
   | `FLUTTER_JSON_URL` | `https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json` | URL API JSON wydań Flutter (tylko dla "latest") |
   | `FLUTTER_BASE_URL` | `https://storage.googleapis.com/flutter_infra_release/releases` | Bazowy URL dla pobierania archiwów Flutter |
   | `UV_INSTALL_SCRIPT_URL` | `https://astral.sh/uv/install.sh` | URL skryptu instalacyjnego uv |

5. Połącz się z kontenerem:

   ```bash
   docker compose exec claude zsh
   ```

6. Zainicjuj zaporę (wymaga hasła sudo):

   ```bash
   sudo /usr/local/bin/init-firewall.sh
   ```

7. Uruchom Claude Code:
   ```bash
   claude
   ```

## Struktura wygenerowanych plików

```
├── .devcontainer/           # VS Code Dev Container (optional)
│   ├── devcontainer.json    # Dev Container configuration
│   └── post-create.sh       # Post-create script (if complex commands)
├── workspace/
│   ├── .claude/
│   │   └── settings.json    # Ustawienia Claude
│   ├── .empty               # Pusty plik dla chronionych montowań
│   └── CLAUDE.md            # Twoje instrukcje dla Claude
├── .env                     # Zmienne środowiskowe
├── Dockerfile               # Definicja kontenera
├── docker-compose.yaml      # Konfiguracja Docker Compose
└── init-firewall.sh         # Skrypt zapory sieciowej
```

## Rozwiązywanie problemów

### Problemy z zaporą

Jeśli napotkasz problemy z siecią po włączeniu zapory:

```bash
# Sprawdź status zapory
sudo iptables -L -n

# Zobacz zablokowane połączenia
sudo iptables -L -n -v | grep DROP

# Zresetuj zaporę (zezwól na cały ruch)
sudo iptables -F
```

### Kontener nie uruchamia się

```bash
# Sprawdź logi
docker compose logs

# Przebuduj bez cache
docker compose build --no-cache
```

### Odmowa dostępu

Upewnij się, że katalog workspace ma prawidłowe uprawnienia:

```bash
chmod -R 755 workspace
```

### Resetowanie ustawień aplikacji

Aby wyczyścić wszystkie zapisane ustawienia i zacząć od nowa, otwórz konsolę deweloperską przeglądarki i wykonaj:

```javascript
localStorage.removeItem("claude-initializr-config");
localStorage.removeItem("claude-initializr-welcome-dismissed");
localStorage.removeItem("claude-initializr-autosave");
```

Następnie przeładuj stronę.

Alternatywnie możesz wyłączyć automatyczne zapisywanie używając przełącznika w nagłówku, aby zapobiec zapisywaniu ustawień.

## Stos technologiczny

- [React 19](https://react.dev/) z TypeScript i React Compiler
- [Vite](https://vite.dev/) jako bundler
- [Tailwind CSS v4](https://tailwindcss.com/) z przestrzenią kolorów OKLCH
- [shadcn/ui](https://ui.shadcn.com/) komponenty (40+ komponentów)
- [react-router](https://reactrouter.com/) do routingu
- [i18next](https://www.i18next.com/) do internacjonalizacji
- [JSZip](https://stuk.github.io/jszip/) do generowania ZIP
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) do podglądów kodu

## Współpraca

Wkład jest mile widziany! Zapraszamy do zgłaszania Pull Requestów.

1. Sforkuj repozytorium
2. Utwórz gałąź funkcji (`git checkout -b feature/niesamowita-funkcja`)
3. Zatwierdź zmiany (`git commit -m 'Dodaj niesamowitą funkcję'`)
4. Wypchnij do gałęzi (`git push origin feature/niesamowita-funkcja`)
5. Otwórz Pull Request

### Dodawanie nowego języka

1. Utwórz nowy plik locale w `src/i18n/locales/` (np. `fr.ts`)
2. Zaimportuj i zaimplementuj interfejs `Translations` z `types.ts`
3. Skopiuj strukturę z `en.ts` i przetłumacz wszystkie teksty
4. Dodaj import języka do `src/i18n/index.ts`
5. Dodaj opcję języka do `LanguageSwitcher.tsx`

## Dostępność

Ta aplikacja jest zaprojektowana tak, aby była w pełni dostępna:

- Semantyczna struktura HTML (`<header>`, `<main>`, `<footer>`)
- Etykiety ARIA na wszystkich interaktywnych elementach
- Wsparcie nawigacji klawiaturowej
- Kompatybilność z czytnikami ekranu
- Schematy kolorów o wysokim kontraście
- Wskaźniki fokusa na interaktywnych elementach

## Wydania

Wydania są zautomatyzowane przez GitHub Actions. Aby utworzyć nowe wydanie:

1. Utwórz i wypchnij tag wersji:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. Workflow automatycznie:
   - Buduje projekt
   - Tworzy archiwum ZIP z folderu `dist/`
   - Publikuje GitHub Release z automatycznie wygenerowanymi notatkami wydania

Tagi zawierające `-` (np. `v1.0.0-beta`) są oznaczane jako pre-release.

## Dziennik zmian

### v3.1.2

- Dodano skróty klawiaturowe dla typowych akcji (pobieranie, przełączanie podglądu, zmiana motywu, nawigacja kartami, przełącznik języka, resetowanie)
- Dodano okno dialogowe pomocy skrótów klawiaturowych z pogrupowanym wyświetlaniem
- Dodano wskazówki skrótów w podpowiedziach przycisków z klawiszami modyfikującymi dostosowanymi do systemu operacyjnego
- Dodano region ARIA live dla ogłoszeń czytnika ekranu przy akcjach skrótów
- Dodano import/eksport konfiguracji przez pliki JSON z podglądem różnic i walidacją

### v3.0.0

- Usunięto funkcję wtyczek z interfejsu użytkownika

### v2.0.2

- Przejście na natywny instalator Claude Code zamiast npm
- Naprawiono instalację oficjalnych wtyczek w Dockerfile

### v1.3.0

- Dodano dokumentację uwierzytelniania

### v1.2.0

- Dodano dokumentację argumentów budowania Docker do wszystkich plików README
- Dodano dokumentację niestandardowych adresów URL pobierania dla serwerów lustrzanych i proxy

### v1.1.1

- Dodano wyświetlanie wersji w nagłówku
- Przekonwertowano system i18n z JSON na TypeScript z typowanym interfejsem
- Naprawiono przełączanie języka między plikami README w pobieraniach ZIP

### v1.0.0

- Pierwsze wydanie
- Generator konfiguracji Docker z Dockerfile i docker-compose.yaml
- Wybór oprogramowania (Go, Python, Rust, Flutter, TypeScript, ffmpeg, ImageMagick, uv)
- Niestandardowe pakiety APT, pakiety NPM i polecenia RUN
- Edytor Markdown CLAUDE.md z podglądem
- Edytor uprawnień settings.json (reguły Allow, Ask, Deny)
- Konfiguracja zmiennych środowiskowych i chronionych plików
- Generowanie skryptu zapory sieciowej
- Pobieranie ZIP z automatycznie wygenerowanym README
- Wsparcie wielojęzyczne (18 języków)
- Ciemny/jasny motyw z automatycznym wykrywaniem
- Automatyczne zapisywanie w localStorage
- Wsparcie PWA
- Przepływ pracy wydań GitHub Actions

## Wsparcie

Jeśli uważasz ten projekt za przydatny, rozważ jego wsparcie:

- ⭐ Daj gwiazdkę repozytorium na [GitHub](https://github.com/mkloubert/claude-initializr)
- 💝 [Wpłać przez PayPal](https://paypal.me/mjkloubert)

## Licencja

Licencja MIT - zobacz [LICENSE](./LICENSE) po szczegóły.

Copyright © 2026 Marcel Joachim Kloubert
