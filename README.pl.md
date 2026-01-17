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
  - TypeScript (z wyborem wersji)
  - Python 3 (z wyborem wersji)
  - ffmpeg (przetwarzanie audio/wideo)
  - ImageMagick (przetwarzanie obrazów)
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

### Funkcje ogólne

- **Podgląd na żywo**: Zobacz podglądy generowanych plików konfiguracyjnych w czasie rzeczywistym
- **Pobieranie ZIP**: Pobierz wszystkie pliki jako gotowe do użycia archiwum ZIP
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

7. **Podgląd**: Sprawdź wygenerowane pliki konfiguracyjne w kartach podglądu

8. **Pobierz**: Kliknij "Pobierz ZIP" aby pobrać wszystkie pliki

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

1. Utwórz nowy plik locale w `src/i18n/locales/` (np. `fr.json`)
2. Skopiuj strukturę z `en.json`
3. Przetłumacz wszystkie teksty
4. Dodaj język do `src/i18n/index.ts`
5. Dodaj opcję języka do `LanguageSwitcher.tsx`

## Dostępność

Ta aplikacja jest zaprojektowana tak, aby była w pełni dostępna:

- Semantyczna struktura HTML (`<header>`, `<main>`, `<footer>`)
- Etykiety ARIA na wszystkich interaktywnych elementach
- Wsparcie nawigacji klawiaturowej
- Kompatybilność z czytnikami ekranu
- Schematy kolorów o wysokim kontraście
- Wskaźniki fokusa na interaktywnych elementach

## Wsparcie

Jeśli uważasz ten projekt za przydatny, rozważ jego wsparcie:

- ⭐ Daj gwiazdkę repozytorium na [GitHub](https://github.com/mkloubert/claude-initializr)
- 💝 [Wpłać przez PayPal](https://paypal.me/mjkloubert)

## Licencja

Licencja MIT - zobacz [LICENSE](./LICENSE) po szczegóły.

Copyright © 2026 Marcel Joachim Kloubert
