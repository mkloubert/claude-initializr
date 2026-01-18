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

const pl: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Generuj pliki konfiguracyjne Docker do bezpiecznego uruchamiania Claude Code"
  },
  "welcome": {
    "close": "Zamknij wiadomość powitalną",
    "description": "Claude Code to potężny asystent programistyczny AI firmy Anthropic, który może czytać, pisać i wykonywać kod bezpośrednio na Twojej maszynie. Choć niezwykle przydatny, uruchamianie AI z dostępem do systemu plików i terminala wymaga starannego rozważenia kwestii bezpieczeństwa.",
    "purpose": "To narzędzie generuje kompletną konfigurację Docker, która pozwala uruchamiać Claude Code w izolowanym środowisku kontenera. Twój kod pozostaje chroniony, podczas gdy Claude nadal może pomagać w rozwijaniu, debugowaniu i refaktoryzacji.",
    "features": {
      "title": "Co możesz skonfigurować:",
      "dockerfile": "Wybierz, które narzędzia deweloperskie zainstalować (TypeScript, Python, Go, ffmpeg, ImageMagick)",
      "compose": "Ustaw zmienne środowiskowe (jak klucz API) i chroń wrażliwe pliki przed dostępem",
      "claudeMd": "Napisz instrukcje specyficzne dla projektu, które Claude czyta na początku każdej sesji"
    },
    "security": {
      "title": "Uwzględnione funkcje bezpieczeństwa:",
      "firewall": "Zapora sieciowa zezwalająca tylko na połączenia z API Anthropic, npm i GitHub",
      "isolation": "Pełna izolacja od systemu hosta i sieci lokalnej",
      "readonly": "Wrażliwe pliki montowane jako puste pliki tylko do odczytu",
      "capabilities": "Wszystkie uprawnienia Linux usunięte, brak możliwości eskalacji uprawnień"
    },
    "privacy": {
      "title": "Informacja o prywatności:",
      "description": "Twoje ustawienia są przechowywane lokalnie w przeglądarce (localStorage), aby były zachowane po powrocie. Ze względów bezpieczeństwa wartości zmiennych środowiskowych nigdy nie są zapisywane – tylko nazwy zmiennych są przechowywane. Żadne dane nie są wysyłane na żaden serwer. Możesz wyłączyć automatyczne zapisywanie w dowolnym momencie za pomocą ikony zapisu w nagłówku – spowoduje to również usunięcie wszystkich zapisanych danych."
    }
  },
  "nav": {
    "header": "Nawigacja nagłówka"
  },
  "tabs": {
    "software": "Oprogramowanie",
    "preview": "Podgląd",
    "settings": "Ustawienia",
    "envVariables": "Środowisko",
    "env": "Środ.",
    "protectedFiles": "Chronione pliki",
    "protected": "Chronione"
  },
  "language": {
    "switch": "Język"
  },
  "theme": {
    "switch": "Przełącz motyw"
  },
  "autosave": {
    "enable": "Włącz automatyczne zapisywanie",
    "disable": "Wyłącz automatyczne zapisywanie"
  },
  "reset": {
    "button": "Przywróć domyślne",
    "title": "Zresetuj ustawienia",
    "description": "Czy na pewno chcesz zresetować wszystkie ustawienia do wartości domyślnych? Tej akcji nie można cofnąć.",
    "cancel": "Anuluj",
    "confirm": "Zresetuj"
  },
  "software": {
    "baseImage": "Obraz bazowy",
    "baseImageDesc": "Obraz bazowy Docker określa podstawę Twojego kontenera. Domyślny obraz 'node' zawiera Node.js i npm. Możesz również użyć wariantów jak 'node:22-slim' dla mniejszych obrazów lub 'node:22-bookworm' dla dodatkowych bibliotek systemowych.",
    "image": "Obraz",
    "typescript": "TypeScript",
    "typescriptDesc": "Instaluje kompilator TypeScript (tsc) i ts-node do bezpośredniego uruchamiania TypeScript. Niezbędny dla projektów TypeScript, umożliwia sprawdzanie typów, kompilację do JavaScript i uruchamianie plików .ts bez ręcznej kompilacji.",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "Potężny framework multimedialny do przetwarzania plików audio i wideo. Umożliwia konwersję formatów, edycję wideo, ekstrakcję audio, streaming i analizę mediów. Wymagany dla projektów pracujących z plikami multimedialnymi.",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "Kompleksowy pakiet do przetwarzania obrazów obsługujący ponad 200 formatów. Dostarcza narzędzia do skalowania, przycinania, konwersji formatów, znaków wodnych i programowej manipulacji obrazami. Idealny do zautomatyzowanych przepływów pracy z obrazami.",
    "python": "Python 3",
    "pythonDesc": "Instaluje interpreter Python 3 z menedżerem pakietów pip. Umożliwia uruchamianie skryptów Python, instalowanie pakietów Python i używanie narzędzi opartych na Python. Przydatny do przetwarzania danych, skryptów i zadań AI/ML.",
    "uv": "uv",
    "uvDesc": "Instaluje uv, niezwykle szybki instalator i resolver pakietów Python napisany w Rust. Może zastąpić pip, pip-tools i virtualenv dla szybszego zarządzania zależnościami.",
    "golang": "Go",
    "golangDesc": "Instaluje język programowania Go (Golang) z oficjalnym kompilatorem i narzędziami. Idealny do tworzenia szybkich, statycznie kompilowanych programów, narzędzi CLI, serwerów web i oprogramowania systemowego.",
    "flutter": "Flutter",
    "flutterDesc": "Instaluje Flutter SDK z Dart i narzędziami deweloperskimi Android. Twórz aplikacje wieloplatformowe na urządzenia mobilne, web i desktop z jednej bazy kodu. Zawiera Android SDK i narzędzia wiersza poleceń.",
    "version": "Wersja",
    "latest": "najnowsza",
    "recommendsHint": "Zalecane: {{packages}}"
  },
  "aptPackages": {
    "title": "Niestandardowe pakiety APT",
    "description": "Dodaj dodatkowe pakiety Debian/Ubuntu do zainstalowania w kontenerze.",
    "placeholder": "Przykład: curl, graphviz, tree, sqlite3...",
    "add": "Dodaj pakiety",
    "remove": "Usuń {{package}}"
  },
  "npmPackages": {
    "title": "Niestandardowe pakiety NPM",
    "description": "Dodaj dodatkowe pakiety NPM do globalnej instalacji w kontenerze.",
    "placeholder": "Przykład: eslint, prettier, tsx...",
    "add": "Dodaj pakiety",
    "remove": "Usuń {{package}}",
    "installAs": "Instaluj jako",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Przełącz użytkownika instalacji dla {{package}}"
  },
  "runCommands": {
    "title": "Niestandardowe polecenia RUN",
    "description": "Dodaj niestandardowe polecenia shell do wykonania podczas budowania obrazu Docker.",
    "placeholder": "Przykład: flutter doctor",
    "add": "Dodaj polecenie",
    "remove": "Usuń polecenie",
    "runAs": "Uruchom jako",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Przełącz użytkownika wykonania dla polecenia"
  },
  "plugins": {
    "title": "Wtyczki Claude Code",
    "description": "Instaluj wtyczki Claude Code z marketplace'ów.",
    "placeholder": "nazwa-wtyczki@nazwa-marketplace",
    "add": "Dodaj wtyczkę",
    "remove": "Usuń wtyczkę",
    "formatHint": "Format: nazwa-wtyczki@nazwa-marketplace",
    "invalidFormat": "Nieprawidłowy format. Użyj plugin@marketplace",
    "suggestions": "Sugerowane wtyczki",
    "loadingSuggestions": "Ładowanie sugestii...",
    "addFromMarketplace": "Dodaj {{plugin}} z {{marketplace}}",
    "viewOnGitHub": "Zobacz {{plugin}} na GitHub"
  },
  "env": {
    "description": "Brak zdefiniowanych zmiennych środowiskowych.",
    "key": "Klucz",
    "value": "Wartość",
    "add": "Dodaj zmienną",
    "remove": "Usuń",
    "keyPlaceholder": "Przykład: NAZWA_ZMIENNEJ",
    "valuePlaceholder": "Przykład: wartość"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "Plik CLAUDE.md zawiera instrukcje specyficzne dla projektu, które Claude czyta na początku każdej sesji. To miejsce na wytyczne dotyczące kodowania, wyjaśnienia struktury projektu, preferowane technologie lub inny kontekst pomagający Claude lepiej zrozumieć projekt."
  },
  "protectedFiles": {
    "description": "Brak zdefiniowanych chronionych plików.",
    "path": "Ścieżka pliku",
    "add": "Dodaj ścieżkę",
    "remove": "Usuń",
    "pathPlaceholder": "Przykład: .env.local",
    "help": "Ścieżki są względne do /workspace/. Te pliki będą montowane jako puste pliki tylko do odczytu, aby zapobiec dostępowi do wrażliwych danych."
  },
  "settings": {
    "title": "settings.json",
    "description": "Skonfiguruj uprawnienia Claude Code, aby kontrolować, które pliki mogą być odczytywane, edytowane lub pobierane. Chronione pliki są automatycznie dodawane jako reguły odmowy.",
    "permissions": "Uprawnienia",
    "directive": "Dyrektywa",
    "pattern": "Wzorzec",
    "patternPlaceholder": "Przykład: src/** lub .env",
    "addRule": "Dodaj regułę",
    "removeRule": "Usuń regułę",
    "allow": "Zezwól",
    "ask": "Pytaj",
    "deny": "Odmów",
    "noAllowRules": "Brak zdefiniowanych reguł zezwolenia.",
    "noAskRules": "Brak zdefiniowanych reguł zapytania.",
    "noDenyRules": "Brak zdefiniowanych reguł odmowy.",
    "help": "Zdefiniuj reguły uprawnień dla operacji Read(), Edit() i WebFetch(). Wzorce obsługują składnię glob, taką jak src/** dla dopasowania rekursywnego.",
    "learnMore": "Dowiedz się więcej"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "Dockerfile definiuje, jakie oprogramowanie jest instalowane w kontenerze. Oprócz Node.js i Claude Code można dołączyć dodatkowe narzędzia jak TypeScript, Python, Go, ffmpeg lub ImageMagick. Wybrane oprogramowanie będzie dostępne, gdy Claude wykonuje polecenia.",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "Plik docker-compose.yaml kontroluje sposób uruchamiania kontenera. Zmienne środowiskowe (jak klucze API) mogą być tu zdefiniowane. Chronione pliki są montowane jako puste pliki tylko do odczytu, aby uniemożliwić Claude dostęp do wrażliwych danych jak pliki .env."
  },
  "dockerCompose": {
    "platform": "Platforma",
    "platformDesc": "Ustaw konkretną platformę dla kontenera (np. linux/amd64). Pozostaw puste, aby użyć domyślnej platformy. Użyj tego, gdy obrazy bazowe nie obsługują Twojej architektury.",
    "platformPlaceholder": "Przykład: linux/amd64"
  },
  "download": {
    "button": "Pobierz ZIP",
    "generating": "Generowanie...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "Repozytorium GitHub",
    "paypal": "Wspieraj przez PayPal"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "angielsku",
    "de": "niemiecku",
    "es": "hiszpańsku",
    "fr": "francusku",
    "it": "włosku",
    "pt": "portugalsku",
    "nl": "niderlandzku",
    "ja": "japońsku",
    "ko": "koreańsku",
    "zh": "chińsku",
    "ar": "arabsku",
    "he": "hebrajsku",
    "hi": "hindi",
    "ur": "urdu",
    "uk": "ukraińsku",
    "el": "grecku",
    "pl": "polsku",
    "tr": "turecku"
  },
  "errors": {
    "invalidEnvKey": "Nieprawidłowa nazwa zmiennej. Używaj tylko liter, cyfr i podkreśleń.",
    "duplicateEnvKey": "Ta nazwa zmiennej już istnieje.",
    "invalidPath": "Ścieżka musi być względna (bez początkowego /) i nie może zawierać .."
  },
  "readme": {
    "title": "Konfiguracja Docker dla Claude Code",
    "generatedBy": "Wygenerowano przez [Claude Initializr]({{url}})",
    "languageSwitch": "Przeczytaj to po {{language}}",
    "intro": {
      "title": "O tej konfiguracji",
      "description": "Ten folder zawiera pliki konfiguracyjne Docker do bezpiecznego uruchamiania Claude Code w izolowanym kontenerze. Konfiguracja zapewnia izolację sieciową, ochronę plików i środowisko sandbox do programowania wspomaganego przez AI."
    },
    "files": {
      "title": "Przegląd plików",
      "dockerfile": "Dockerfile - Definiuje obraz kontenera ze wszystkimi narzędziami deweloperskimi",
      "dockerCompose": "docker-compose.yaml - Plik orkiestracji do uruchamiania kontenera",
      "env": ".env - Zmienne środowiskowe (dodaj swoje klucze API tutaj)",
      "initFirewall": "init-firewall.sh - Skrypt zapory sieciowej dla bezpieczeństwa",
      "workspace": "workspace/ - Twój katalog roboczy zamontowany w kontenerze",
      "claudeMd": "workspace/CLAUDE.md - Instrukcje projektu dla Claude",
      "settingsJson": "workspace/.claude/settings.json - Ustawienia uprawnień Claude Code"
    },
    "baseImage": {
      "title": "Obraz bazowy",
      "description": "Ta konfiguracja używa następującego bazowego obrazu Docker:",
      "dockerHub": "Zobacz na Docker Hub"
    },
    "platform": {
      "title": "Platforma",
      "description": "Kontener jest skonfigurowany do uruchamiania na tej platformie:"
    },
    "aptPackages": {
      "title": "Pakiety systemowe (APT)",
      "description": "Zainstalowane są następujące pakiety systemowe:"
    },
    "npmPackages": {
      "title": "Dodatkowe pakiety NPM",
      "description": "Następujące dodatkowe pakiety NPM są zainstalowane globalnie:",
      "installedAs": "zainstalowane jako {{user}}"
    },
    "plugins": {
      "title": "Wtyczki Claude Code",
      "description": "Następujące wtyczki Claude Code są zainstalowane i włączone:",
      "viewOnGitHub": "Zobacz na GitHub"
    },
    "envVariables": {
      "title": "Zmienne środowiskowe",
      "description": "Skonfigurowane są następujące zmienne środowiskowe (wartości nie są pokazane ze względów bezpieczeństwa):",
      "note": "Dodaj swoje rzeczywiste wartości do pliku .env przed uruchomieniem kontenera."
    },
    "protectedFiles": {
      "title": "Chronione pliki",
      "description": "Następujące pliki są chronione i zamontowane jako puste pliki tylko do odczytu, aby zapobiec dostępowi:"
    },
    "settingsJson": {
      "title": "Ustawienia uprawnień",
      "description": "Claude Code jest skonfigurowany z następującymi regułami uprawnień:",
      "allow": "Dozwolone operacje (automatycznie)",
      "ask": "Operacje wymagające potwierdzenia",
      "deny": "Zabronione operacje"
    },
    "claudeMd": {
      "title": "Instrukcje projektu",
      "description": "Instrukcje specyficzne dla projektu dla Claude są zdefiniowane w:"
    },
    "quickStart": {
      "title": "Szybki start",
      "step1": "Zainstaluj Docker (zobacz Wymagania wstępne poniżej)",
      "step2": "Uruchom kontener:",
      "step3": "Uruchom Claude Code:",
      "step4": "Zatrzymaj kontener:",
      "note": "Twój folder workspace jest zamontowany w /workspace wewnątrz kontenera. Claude Code poprosi o klucz API przy pierwszym uruchomieniu."
    },
    "prerequisites": {
      "title": "Wymagania wstępne",
      "description": "Potrzebujesz zainstalowanego Dockera w swoim systemie. Wybierz swój system operacyjny:",
      "windows": {
        "title": "Windows",
        "steps": [
          "Pobierz Docker Desktop z docker.com/products/docker-desktop",
          "Uruchom instalator i postępuj zgodnie z kreatorem konfiguracji",
          "Włącz WSL 2 backend gdy zostaniesz poproszony (zalecane)",
          "Uruchom ponownie komputer jeśli wymagane",
          "Otwórz Docker Desktop i poczekaj na uruchomienie"
        ],
        "link": "Oficjalny przewodnik instalacji dla Windows"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "Pobierz Docker Desktop z docker.com/products/docker-desktop",
          "Otwórz plik .dmg i przeciągnij Docker do Aplikacji",
          "Otwórz Docker z folderu Aplikacje",
          "Udziel wymaganych uprawnień gdy zostaniesz poproszony",
          "Poczekaj aż Docker zakończy uruchamianie (ikona wieloryba na pasku menu)"
        ],
        "link": "Oficjalny przewodnik instalacji dla macOS"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "Zaktualizuj indeks pakietów: sudo apt update",
          "Zainstaluj Docker: sudo apt install docker.io docker-compose-v2",
          "Dodaj swojego użytkownika do grupy docker: sudo usermod -aG docker $USER",
          "Wyloguj się i zaloguj ponownie, aby zmiany grupy zaczęły obowiązywać",
          "Zweryfikuj instalację: docker --version"
        ],
        "link": "Oficjalny przewodnik instalacji dla Linux",
        "altNote": "Lub zainstaluj Docker Desktop dla doświadczenia GUI."
      }
    },
    "troubleshooting": {
      "title": "Rozwiązywanie problemów",
      "issues": {
        "containerNotStarting": {
          "title": "Kontener nie uruchamia się",
          "solutions": [
            "Sprawdź czy Docker działa: docker info",
            "Zweryfikuj czy plik .env istnieje i zawiera ANTHROPIC_API_KEY",
            "Sprawdź konflikty portów: docker ps",
            "Zobacz logi kontenera: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "Błędy odmowy uprawnień",
          "solutions": [
            "Na Linuxie upewnij się, że twój użytkownik jest w grupie docker",
            "Spróbuj uruchomić z sudo (nie zalecane do regularnego użytku)",
            "Sprawdź uprawnienia plików w folderze workspace"
          ]
        },
        "networkIssues": {
          "title": "Problemy z siecią lub połączeniem API",
          "solutions": [
            "Skrypt zapory zezwala tylko na określone domeny",
            "Upewnij się, że api.anthropic.com jest dostępne z twojej sieci",
            "Sprawdź logi zapory wewnątrz kontenera: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "Pliki niedostępne w kontenerze",
          "solutions": [
            "Chronione pliki są celowo puste - to jest oczekiwane",
            "Sprawdź montowania wolumenów w docker-compose.yaml",
            "Upewnij się, że folder workspace istnieje na hoście"
          ]
        }
      }
    },
    "links": {
      "title": "Linki",
      "initializer": "Wygeneruj nową konfigurację",
      "documentation": "Dokumentacja Claude Code",
      "support": "Zgłoś problemy"
    },
    "author": {
      "title": "Autor",
      "createdBy": "Utworzone przez",
      "support": "Wesprzyj ten projekt"
    },
    "software": {
      "title": "Zainstalowane oprogramowanie",
      "description": "Zainstalowane są następujące narzędzia deweloperskie:"
    }
  }
};

export default pl;
