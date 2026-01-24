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

const de: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Docker-Konfigurationsdateien für sicheres Ausführen von Claude Code generieren"
  },
  "welcome": {
    "close": "Willkommensnachricht schließen",
    "description": "Claude Code ist Anthropics leistungsstarker KI-Coding-Assistent, der Code direkt auf deinem Rechner lesen, schreiben und ausführen kann. So nützlich das ist – eine KI mit Dateisystem- und Terminal-Zugriff erfordert besondere Vorsicht bei der Sicherheit.",
    "purpose": "Dieses Tool generiert eine komplette Docker-Konfiguration, mit der du Claude Code in einer isolierten Container-Umgebung ausführen kannst. Dein Code bleibt geschützt, während Claude dir weiterhin beim Entwickeln, Debuggen und Refactoring helfen kann.",
    "features": {
      "title": "Was du konfigurieren kannst:",
      "dockerfile": "Wähle, welche Entwicklungswerkzeuge installiert werden (TypeScript, Python, Go, ffmpeg, ImageMagick)",
      "compose": "Setze Umgebungsvariablen (wie deinen API-Schlüssel) und schütze sensible Dateien vor Zugriff",
      "claudeMd": "Schreibe projektspezifische Anweisungen, die Claude zu Beginn jeder Sitzung liest"
    },
    "security": {
      "title": "Enthaltene Sicherheitsfunktionen:",
      "firewall": "Netzwerk-Firewall, die nur Verbindungen zu Anthropic API, npm und GitHub erlaubt",
      "isolation": "Vollständige Isolation vom Host-System und lokalen Netzwerk",
      "readonly": "Sensible Dateien werden als leere, schreibgeschützte Dateien eingebunden",
      "capabilities": "Alle Linux-Capabilities entfernt, keine Rechteeskalation möglich"
    },
    "privacy": {
      "title": "Datenschutz-Hinweis:",
      "description": "Deine Einstellungen werden lokal in deinem Browser (localStorage) gespeichert, damit sie bei deinem nächsten Besuch erhalten bleiben. Aus Sicherheitsgründen werden Werte von Umgebungsvariablen niemals gespeichert – nur die Variablennamen. Es werden keine Daten an einen Server gesendet. Du kannst das Autospeichern jederzeit über das Speicher-Symbol in der Kopfzeile deaktivieren – dabei werden auch alle gespeicherten Daten gelöscht."
    }
  },
  "nav": {
    "header": "Kopfzeilen-Navigation"
  },
  "tabs": {
    "software": "Software",
    "preview": "Vorschau",
    "settings": "Einstellungen",
    "envVariables": "Umgebung",
    "env": "Umg.",
    "protectedFiles": "Geschützte Dateien",
    "protected": "Geschützt"
  },
  "language": {
    "switch": "Sprache"
  },
  "theme": {
    "switch": "Design wechseln"
  },
  "autosave": {
    "enable": "Autospeichern aktivieren",
    "disable": "Autospeichern deaktivieren"
  },
  "reset": {
    "button": "Auf Standard zurücksetzen",
    "title": "Einstellungen zurücksetzen",
    "description": "Möchtest du wirklich alle Einstellungen auf die Standardwerte zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.",
    "cancel": "Abbrechen",
    "confirm": "Zurücksetzen"
  },
  "software": {
    "baseImage": "Basis-Image",
    "baseImageDesc": "Das Docker-Basis-Image bestimmt die Grundlage des Containers. Das Standard-Image 'node' enthält Node.js und npm. Varianten wie 'node:22-slim' für kleinere Images oder 'node:22-bookworm' für zusätzliche Systembibliotheken sind ebenfalls möglich.",
    "image": "Image",
    "typescript": "TypeScript",
    "typescriptDesc": "Installiert den TypeScript-Compiler (tsc) und ts-node zum direkten Ausführen von TypeScript. Unverzichtbar für TypeScript-Projekte: ermöglicht Typprüfung, Kompilierung zu JavaScript und Ausführen von .ts-Dateien ohne manuelle Kompilierung.",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "Ein leistungsstarkes Multimedia-Framework zur Verarbeitung von Audio- und Videodateien. Ermöglicht Formatkonvertierung, Videobearbeitung, Audioextraktion, Streaming und Medienanalyse. Erforderlich für Projekte, die mit Mediendateien arbeiten.",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "Eine umfassende Bildverarbeitungssuite mit Unterstützung für über 200 Formate. Bietet Werkzeuge zum Skalieren, Zuschneiden, Formatkonvertieren, Wasserzeichen und programmatischer Bildbearbeitung. Ideal für automatisierte Bild-Workflows.",
    "python": "Python 3",
    "pythonDesc": "Installiert den Python-3-Interpreter mit pip-Paketmanager. Ermöglicht das Ausführen von Python-Skripten, die Installation von Python-Paketen und die Nutzung Python-basierter Tools. Nützlich für Datenverarbeitung, Skripting und KI/ML-Aufgaben.",
    "uv": "uv",
    "uvDesc": "Installiert uv, einen extrem schnellen Python-Paketinstaller und Resolver, geschrieben in Rust. Es kann pip, pip-tools und virtualenv für schnelleres Abhängigkeitsmanagement ersetzen.",
    "golang": "Go",
    "golangDesc": "Installiert die Programmiersprache Go (Golang) mit dem offiziellen Compiler und Werkzeugen. Ideal für schnelle, statisch kompilierte Programme, CLI-Tools, Webserver und Systemsoftware.",
    "flutter": "Flutter",
    "flutterDesc": "Installiert das Flutter SDK mit Dart und Android-Entwicklungstools. Ermöglicht das Erstellen plattformübergreifender Apps für Mobilgeräte, Web und Desktop aus einer einzigen Codebasis. Enthält Android SDK und Kommandozeilentools.",
    "rust": "Rust",
    "rustDesc": "Installiert die Programmiersprache Rust mit dem Cargo-Paketmanager über rustup. Ideal für schnelle, speichersichere Systemsoftware, CLI-Tools, WebAssembly und Embedded-Anwendungen.",
    "version": "Version",
    "latest": "aktuell",
    "recommendsHint": "Empfohlen: {{packages}}"
  },
  "aptPackages": {
    "title": "Benutzerdefinierte APT-Pakete",
    "description": "Zusätzliche Debian/Ubuntu-Pakete, die im Container installiert werden sollen.",
    "placeholder": "Beispiel: curl, graphviz, tree, sqlite3...",
    "add": "Pakete hinzufügen",
    "remove": "{{package}} entfernen"
  },
  "npmPackages": {
    "title": "Benutzerdefinierte NPM-Pakete",
    "description": "Zusätzliche NPM-Pakete, die global im Container installiert werden sollen.",
    "placeholder": "Beispiel: eslint, prettier, tsx...",
    "add": "Pakete hinzufügen",
    "remove": "{{package}} entfernen",
    "installAs": "Installieren als",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Installationsbenutzer für {{package}} wechseln"
  },
  "runCommands": {
    "title": "Benutzerdefinierte RUN-Befehle",
    "description": "Füge benutzerdefinierte Shell-Befehle hinzu, die während des Docker-Image-Builds ausgeführt werden.",
    "placeholder": "Beispiel: flutter doctor",
    "add": "Befehl hinzufügen",
    "remove": "Befehl entfernen",
    "runAs": "Ausführen als",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Ausführungsbenutzer für Befehl wechseln"
  },
  "env": {
    "description": "Keine Umgebungsvariablen vorhanden.",
    "key": "Schlüssel",
    "value": "Wert",
    "add": "Variable hinzufügen",
    "remove": "Entfernen",
    "keyPlaceholder": "Beispiel: VARIABLEN_NAME",
    "valuePlaceholder": "Beispiel: Wert"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "Die CLAUDE.md enthält projektspezifische Anweisungen, die Claude zu Beginn jeder Sitzung liest. Hier ist der richtige Ort für Coding-Richtlinien, Erklärungen zur Projektstruktur, bevorzugte Technologien oder anderen Kontext, der Claude hilft, das Projekt besser zu verstehen."
  },
  "protectedFiles": {
    "description": "Keine geschützten Dateien vorhanden.",
    "path": "Dateipfad",
    "add": "Pfad hinzufügen",
    "remove": "Entfernen",
    "pathPlaceholder": "Beispiel: .env.local",
    "help": "Pfade sind relativ zu /workspace/. Diese Dateien werden als leere schreibgeschützte Dateien eingebunden, um den Zugriff auf sensible Daten zu verhindern."
  },
  "settings": {
    "title": "settings.json",
    "description": "Konfiguriere Claude Code Berechtigungen, um zu steuern, welche Dateien gelesen, bearbeitet oder abgerufen werden können. Geschützte Dateien werden automatisch als Deny-Regeln hinzugefügt.",
    "permissions": "Berechtigungen",
    "directive": "Direktive",
    "pattern": "Muster",
    "patternPlaceholder": "Beispiel: src/** oder .env",
    "addRule": "Regel hinzufügen",
    "removeRule": "Regel entfernen",
    "allow": "Erlauben",
    "ask": "Nachfragen",
    "deny": "Verweigern",
    "noAllowRules": "Keine Erlauben-Regeln definiert.",
    "noAskRules": "Keine Nachfragen-Regeln definiert.",
    "noDenyRules": "Keine Verweigern-Regeln definiert.",
    "help": "Definiere Berechtigungsregeln für Read(), Edit() und WebFetch() Operationen. Muster unterstützen Glob-Syntax wie src/** für rekursive Übereinstimmung.",
    "learnMore": "Mehr erfahren"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "Das Dockerfile legt fest, welche Software im Container installiert wird. Neben Node.js und Claude Code können zusätzliche Tools wie TypeScript, Python, Go, ffmpeg oder ImageMagick hinzugefügt werden. Die ausgewählte Software steht Claude bei der Ausführung von Befehlen zur Verfügung.",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "Die docker-compose.yaml steuert, wie der Container gestartet wird. Hier können Umgebungsvariablen (wie API-Schlüssel) definiert werden. Geschützte Dateien werden als leere, schreibgeschützte Dateien eingebunden, um Claude den Zugriff auf sensible Daten wie .env-Dateien zu verwehren."
  },
  "dockerCompose": {
    "platform": "Plattform",
    "platformDesc": "Lege eine spezifische Plattform für den Container fest (z.B. linux/amd64). Leer lassen für die Standard-Plattform. Verwende dies, wenn Basis-Images deine Architektur nicht unterstützen.",
    "platformPlaceholder": "Beispiel: linux/amd64"
  },
  "download": {
    "button": "ZIP herunterladen",
    "generating": "Wird generiert...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "GitHub Repository",
    "paypal": "Unterstützen via PayPal"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "Englisch",
    "de": "Deutsch",
    "es": "Spanisch",
    "fr": "Französisch",
    "it": "Italienisch",
    "pt": "Portugiesisch",
    "nl": "Niederländisch",
    "ja": "Japanisch",
    "ko": "Koreanisch",
    "zh": "Chinesisch",
    "ar": "Arabisch",
    "he": "Hebräisch",
    "hi": "Hindi",
    "ur": "Urdu",
    "uk": "Ukrainisch",
    "el": "Griechisch",
    "pl": "Polnisch",
    "tr": "Türkisch"
  },
  "errors": {
    "invalidEnvKey": "Ungültiger Variablenname. Verwenden Sie nur Buchstaben, Zahlen und Unterstriche.",
    "duplicateEnvKey": "Dieser Variablenname existiert bereits.",
    "invalidPath": "Pfad muss relativ sein (kein führendes /) und darf kein .. enthalten"
  },
  "readme": {
    "title": "Claude Code Docker-Konfiguration",
    "generatedBy": "Generiert mit [Claude Initializr]({{url}})",
    "languageSwitch": "Diese Datei auf {{language}} lesen",
    "intro": {
      "title": "Über diese Konfiguration",
      "description": "Dieser Ordner enthält Docker-Konfigurationsdateien, um Claude Code sicher in einem isolierten Container auszuführen. Die Konfiguration bietet Netzwerkisolation, Dateischutz und eine Sandbox-Umgebung für KI-gestützte Entwicklung."
    },
    "files": {
      "title": "Dateiübersicht",
      "dockerfile": "Dockerfile - Definiert das Container-Image mit allen Entwicklungswerkzeugen",
      "dockerCompose": "docker-compose.yaml - Orchestrierungsdatei zum Starten des Containers",
      "env": ".env - Umgebungsvariablen (hier API-Schlüssel eintragen)",
      "initFirewall": "init-firewall.sh - Netzwerk-Firewall-Skript für Sicherheit",
      "workspace": "workspace/ - Dein Arbeitsverzeichnis, das in den Container eingebunden wird",
      "claudeMd": "workspace/CLAUDE.md - Projektanweisungen für Claude",
      "settingsJson": "workspace/.claude/settings.json - Claude Code Berechtigungseinstellungen"
    },
    "baseImage": {
      "title": "Basis-Image",
      "description": "Diese Konfiguration verwendet folgendes Docker-Basis-Image:",
      "dockerHub": "Auf Docker Hub ansehen"
    },
    "platform": {
      "title": "Plattform",
      "description": "Der Container ist für folgende Plattform konfiguriert:"
    },
    "aptPackages": {
      "title": "Systempakete (APT)",
      "description": "Folgende Systempakete werden installiert:"
    },
    "npmPackages": {
      "title": "Zusätzliche NPM-Pakete",
      "description": "Folgende zusätzliche NPM-Pakete werden global installiert:",
      "installedAs": "installiert als {{user}}"
    },
    "envVariables": {
      "title": "Umgebungsvariablen",
      "description": "Folgende Umgebungsvariablen sind konfiguriert (Werte aus Sicherheitsgründen nicht angezeigt):",
      "note": "Füge deine tatsächlichen Werte in die .env-Datei ein, bevor du den Container startest."
    },
    "protectedFiles": {
      "title": "Geschützte Dateien",
      "description": "Folgende Dateien sind geschützt und werden als leere, schreibgeschützte Dateien eingebunden:"
    },
    "settingsJson": {
      "title": "Berechtigungseinstellungen",
      "description": "Claude Code ist mit folgenden Berechtigungsregeln konfiguriert:",
      "allow": "Erlaubte Operationen (automatisch)",
      "ask": "Operationen mit Bestätigung",
      "deny": "Verweigerte Operationen"
    },
    "claudeMd": {
      "title": "Projektanweisungen",
      "description": "Projektspezifische Anweisungen für Claude sind hier definiert:"
    },
    "quickStart": {
      "title": "Schnellstart",
      "step1": "Docker installieren (siehe Voraussetzungen unten)",
      "step2": "Container starten:",
      "step2CustomVersions": "Optional: Mit benutzerdefinierten Software-Versionen bauen (siehe Docker Build Arguments unten):",
      "step3": "Claude Code starten:",
      "step4": "Container stoppen:",
      "note": "Dein Workspace-Ordner ist unter /workspace im Container eingebunden. Siehe den Abschnitt Authentifizierung unten für Anmeldeoptionen."
    },
    "authentication": {
      "title": "Authentifizierung",
      "description": "Claude Code unterstützt zwei Authentifizierungsmethoden. Wähle die, die am besten zu deinen Anforderungen passt:",
      "apiKey": {
        "title": "Option 1: API-Schlüssel",
        "description": "Setze deinen API-Schlüssel in der `.env`-Datei (`ANTHROPIC_API_KEY`). Claude Code verwendet ihn automatisch.",
        "pros": [
          "Funktioniert in headless/automatisierten Umgebungen (CI/CD, Container, SSH)",
          "Kein Browser erforderlich",
          "Keine Nutzungslimits (Pay-per-Use)",
          "Zuverlässig in allen Umgebungen"
        ],
        "cons": [
          "Kostet Geld pro API-Aufruf (Standard-API-Tarife)",
          "API-Schlüssel muss verwaltet und gesichert werden",
          "Kann ohne Ausgabenlimits zu unerwarteten Kosten führen"
        ]
      },
      "browserLogin": {
        "title": "Option 2: Browser-Login (Claude Pro/Max/Team)",
        "description": "Führe `/login` in Claude Code aus, um dich über den Browser mit deinem Abonnement zu authentifizieren.",
        "pros": [
          "Im Abonnement enthalten (vorhersehbare monatliche Kosten)",
          "Keine zusätzlichen API-Kosten",
          "Einheitliche Abrechnung mit Claude.ai"
        ],
        "cons": [
          "Erfordert Browser für die erste Anmeldung",
          "Hat Nutzungslimits, die wöchentlich zurückgesetzt werden",
          "Authentifizierung bleibt möglicherweise nicht in Containern/SSH-Sitzungen bestehen"
        ]
      }
    },
    "buildArgs": {
      "title": "Docker Build Arguments",
      "description": "Du kannst Software-Versionen und Download-URLs während des Docker-Builds konfigurieren. Verwende `--build-arg NAME=WERT`, um Standardwerte zu überschreiben.",
      "versionArgs": {
        "title": "Versions-Argumente",
        "description": "Bestimme, welche Software-Versionen installiert werden:"
      },
      "urlArgs": {
        "title": "URL-Argumente",
        "description": "Überschreibe Download-URLs für Mirrors oder Proxies:"
      },
      "defaultValue": "Standard",
      "example": "Beispiel mit benutzerdefinierten Versionen:"
    },
    "prerequisites": {
      "title": "Voraussetzungen",
      "description": "Du benötigst Docker auf deinem System. Wähle dein Betriebssystem:",
      "windows": {
        "title": "Windows",
        "steps": [
          "Docker Desktop von docker.com/products/docker-desktop herunterladen",
          "Den Installer ausführen und dem Setup-Assistenten folgen",
          "WSL 2 Backend aktivieren, wenn aufgefordert (empfohlen)",
          "Computer bei Bedarf neu starten",
          "Docker Desktop öffnen und warten, bis es gestartet ist"
        ],
        "link": "Offizielle Windows-Installationsanleitung"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "Docker Desktop von docker.com/products/docker-desktop herunterladen",
          "Die .dmg-Datei öffnen und Docker in Programme ziehen",
          "Docker aus dem Programme-Ordner öffnen",
          "Erforderliche Berechtigungen erteilen, wenn aufgefordert",
          "Warten, bis Docker fertig gestartet ist (Wal-Symbol in der Menüleiste)"
        ],
        "link": "Offizielle macOS-Installationsanleitung"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "Paketindex aktualisieren: sudo apt update",
          "Docker installieren: sudo apt install docker.io docker-compose-v2",
          "Benutzer zur Docker-Gruppe hinzufügen: sudo usermod -aG docker $USER",
          "Ab- und wieder anmelden, damit Gruppenänderungen wirksam werden",
          "Installation überprüfen: docker --version"
        ],
        "link": "Offizielle Linux-Installationsanleitung",
        "altNote": "Oder Docker Desktop für eine grafische Oberfläche installieren."
      }
    },
    "troubleshooting": {
      "title": "Fehlerbehebung",
      "issues": {
        "containerNotStarting": {
          "title": "Container startet nicht",
          "solutions": [
            "Prüfen, ob Docker läuft: docker info",
            "Überprüfen, ob die .env-Datei existiert und ANTHROPIC_API_KEY enthält",
            "Auf Port-Konflikte prüfen: docker ps",
            "Container-Logs ansehen: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "Berechtigungsfehler",
          "solutions": [
            "Unter Linux sicherstellen, dass dein Benutzer in der Docker-Gruppe ist",
            "Mit sudo versuchen (nicht für reguläre Nutzung empfohlen)",
            "Dateiberechtigungen im Workspace-Ordner prüfen"
          ]
        },
        "networkIssues": {
          "title": "Netzwerk- oder API-Verbindungsprobleme",
          "solutions": [
            "Das Firewall-Skript erlaubt nur bestimmte Domains",
            "Sicherstellen, dass api.anthropic.com von deinem Netzwerk aus erreichbar ist",
            "Firewall-Logs im Container prüfen: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "Dateien im Container nicht zugänglich",
          "solutions": [
            "Geschützte Dateien sind absichtlich leer - das ist erwartet",
            "Volume-Mounts in docker-compose.yaml prüfen",
            "Sicherstellen, dass der Workspace-Ordner auf dem Host existiert"
          ]
        }
      }
    },
    "links": {
      "title": "Links",
      "initializer": "Neue Konfiguration generieren",
      "documentation": "Claude Code Dokumentation",
      "support": "Probleme melden"
    },
    "author": {
      "title": "Autor",
      "createdBy": "Erstellt von",
      "support": "Dieses Projekt unterstützen"
    },
    "software": {
      "title": "Installierte Software",
      "description": "Folgende Entwicklungswerkzeuge sind installiert:"
    }
  }
};

export default de;
