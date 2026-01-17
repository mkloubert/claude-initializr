# Claude Initializr

**🌐 In anderen Sprachen lesen:**
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

[![Lizenz: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![Spenden](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

Eine Webanwendung zur Generierung von Docker-Konfigurationsdateien, um [Claude Code](https://docs.anthropic.com/en/docs/claude-code) sicher in einer containerisierten Umgebung auszuführen.

**Live-Demo:** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## Funktionen

### Dockerfile-Konfiguration

- **Basis-Image**: Konfigurieren Sie den Namen und die Version des Docker-Basis-Images (Standard: `node:24`)
- **Software-Auswahl**: Wählen Sie zusätzliche Software zur Installation:
  - TypeScript (mit Versionsauswahl)
  - Python 3 (mit Versionsauswahl)
  - ffmpeg (Audio-/Videoverarbeitung)
  - ImageMagick (Bildverarbeitung)
- **Benutzerdefinierte APT-Pakete**: Fügen Sie zusätzliche Debian/Ubuntu-Pakete zur Installation im Container hinzu
- **Benutzerdefinierte NPM-Pakete**: Fügen Sie zusätzliche NPM-Pakete zur globalen Installation hinzu, mit der Option als `root` oder `node` Benutzer zu installieren

### docker-compose.yaml Konfiguration

- **Umgebungsvariablen**: Konfigurieren Sie Umgebungsvariablen für Ihre `.env`-Datei
- **Geschützte Dateien**: Geben Sie Dateien an, die durch das Einbinden leerer schreibgeschützter Dateien geschützt werden sollen (verhindert Zugriff auf sensible Dateien wie `.env.local`)

### CLAUDE.md Editor

- Markdown-Editor mit Syntax-Hervorhebung
- Integrierte Vorschaufunktion
- Schreiben Sie projektspezifische Anweisungen für Claude

### Allgemeine Funktionen

- **Live-Vorschau**: Sehen Sie Echtzeit-Vorschauen der generierten Konfigurationsdateien
- **ZIP-Download**: Laden Sie alle Dateien als einsatzbereites ZIP-Archiv herunter
- **Automatisches Speichern**: Einstellungen werden automatisch im localStorage Ihres Browsers gespeichert (standardmäßig aktiviert)
- **Mehrsprachige Unterstützung**: Verfügbar in 18 Sprachen:
  - 🌍 Arabisch
  - 🇨🇳 Chinesisch
  - 🇳🇱 Niederländisch
  - 🇬🇧 Englisch
  - 🇫🇷 Französisch
  - 🇩🇪 Deutsch
  - 🇬🇷 Griechisch
  - 🇮🇱 Hebräisch
  - 🇮🇳 Hindi
  - 🇮🇹 Italienisch
  - 🇯🇵 Japanisch
  - 🇰🇷 Koreanisch
  - 🇵🇱 Polnisch
  - 🇵🇹 Portugiesisch
  - 🇪🇸 Spanisch
  - 🇹🇷 Türkisch
  - 🇺🇦 Ukrainisch
  - 🇵🇰 Urdu
- **Dunkles/Helles Design**: Automatische Design-Erkennung mit manueller Umschaltung
- **PWA-Unterstützung**: Installierbar als Progressive Web App
- **Vollständig barrierefrei**: WCAG-konform mit Tastaturnavigation und Screenreader-Unterstützung
- **Responsives Design**: Optimiert für Desktop und Tablet

### Automatisches Speichern

Die Autosave-Funktion kann über das Speicher-Symbol in der Kopfzeile umgeschaltet werden:

| Symbol         | Status      | Verhalten                                                   |
| -------------- | ----------- | ----------------------------------------------------------- |
| 💾 (Speichern) | Aktiviert   | Alle Änderungen werden automatisch im localStorage gespeichert |
| 🚫💾 (Aus)     | Deaktiviert | Änderungen werden nicht gespeichert; vorhandene Daten werden gelöscht |

**Funktionsweise:**

- **Aktivieren des Autosave**: Speichert sofort aktuelle Einstellungen im localStorage
- **Deaktivieren des Autosave**: Löscht alle gespeicherten Einstellungen aus dem localStorage
- Ihre Autosave-Präferenz wird über Sitzungen hinweg gespeichert

### Datenschutz & Datenspeicherung

Diese Anwendung respektiert Ihre Privatsphäre:

- **Nur lokale Speicherung**: Alle Einstellungen werden lokal in Ihrem Browser gespeichert (localStorage)
- **Keine Serverkommunikation**: Es werden niemals Daten an einen Server gesendet
- **Sicher durch Design**: Umgebungsvariablen-**Werte werden niemals gespeichert** - nur Variablennamen werden gespeichert
- **Volle Kontrolle**: Sie können das automatische Speichern jederzeit über den Schalter in der Kopfzeile deaktivieren, was auch alle gespeicherten Daten löscht
- **Sitzungsbasiertes Design**: Die Design-Präferenz wird beim Neuladen der Seite auf den Systemstandard zurückgesetzt

## Sicherheitsfunktionen

Die generierte Docker-Konfiguration enthält umfassende Sicherheitsmaßnahmen:

### Netzwerk-Firewall

Das `init-firewall.sh`-Skript implementiert strikte Netzwerkisolierung:

- **iptables-basierte Firewall** mit DROP-Richtlinie für allen ausgehenden Datenverkehr
- **Nur-Allowlist-Ansatz** - nur freigegebene Domains sind erreichbar:
  - `api.anthropic.com` - Claude API
  - `npm registry` - Paketinstallation
  - `github.com` - Git-Operationen
  - `sentry.io` - Fehlerberichterstattung
- **Automatische GitHub-IP-Auflösung** für Web-, API- und Git-Endpunkte
- **Host-Netzwerkisolierung** - verhindert Zugriff auf das lokale Netzwerk
- **Firewall-Verifizierung** - Tests stellen sicher, dass Regeln korrekt angewendet werden

### Docker-Sicherheitshärtung

- **Capability-Dropping**: Alle Linux-Capabilities werden entfernt (`cap_drop: ALL`)
- **Keine Privilegienerhöhung**: `no-new-privileges:true`
- **Ressourcenlimits**: CPU- und Speicherbeschränkungen
- **Schreibgeschützte Mounts**: Geschützte Dateien werden als schreibgeschützt eingebunden
- **Nicht-Root-Ausführung**: Läuft als `node`-Benutzer

## Vorinstallierte Tools

Der generierte Container enthält:

| Kategorie             | Tools                               |
| --------------------- | ----------------------------------- |
| **Shell**             | zsh mit Powerline10k-Theme, bash    |
| **Editoren**          | nano, vim                           |
| **Versionskontrolle** | git, git-delta, GitHub CLI (gh)     |
| **Hilfsprogramme**    | fzf, jq, less, unzip, man-db        |
| **Netzwerk**          | iptables, ipset, iproute2, dnsutils |

## Erste Schritte

### Voraussetzungen

- Node.js 20 oder höher
- npm 10 oder höher

### Installation

```bash
# Repository klonen
git clone https://github.com/mkloubert/claude-initializr.git
cd claude-initializr

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Für Produktion bauen
npm run build

# Produktions-Build vorschauen
npm run preview
```

### Umgebungsvariablen

Passen Sie die Anwendung mit Umgebungsvariablen an. Erstellen Sie eine `.env`-Datei:

```bash
# GitHub-Repository-URL (optional, leer lassen zum Ausblenden)
VITE_GITHUB_URL=https://github.com/mkloubert/claude-initializr

# PayPal-Spenden-URL (optional, leer lassen zum Ausblenden)
VITE_PAYPAL_URL=https://paypal.me/mjkloubert
```

## Verwendung

1. **Basis-Image konfigurieren**: Legen Sie den Namen und die Version des Docker-Basis-Images fest (z.B. `node:24` oder `node:22-slim`)

2. **Software auswählen**: Wählen Sie, welche zusätzliche Software in Ihrem Container installiert werden soll

3. **Benutzerdefinierte Pakete hinzufügen**:
   - Fügen Sie benutzerdefinierte APT-Pakete hinzu (z.B. `curl`, `graphviz`, `sqlite3`)
   - Fügen Sie benutzerdefinierte NPM-Pakete zur globalen Installation hinzu (z.B. `eslint`, `prettier`)
   - Wählen Sie, ob NPM-Pakete als `node` (Standard) oder `root` Benutzer installiert werden sollen

4. **Umgebungsvariablen festlegen**: Fügen Sie alle Umgebungsvariablen hinzu, die Ihr Projekt benötigt (z.B. `ANTHROPIC_API_KEY`)

5. **Sensible Dateien schützen**: Fügen Sie Pfade zu Dateien hinzu, die geschützt werden sollen (z.B. `.env.local`)

6. **CLAUDE.md bearbeiten**: Schreiben Sie Anweisungen für Claude im Markdown-Editor

7. **Vorschau**: Überprüfen Sie die generierten Konfigurationsdateien in den Vorschau-Tabs

8. **Herunterladen**: Klicken Sie auf "ZIP herunterladen", um alle Dateien zu erhalten

## Verwendung der generierten Dateien

1. Entpacken Sie die ZIP-Datei in Ihr Projektverzeichnis

2. Kopieren Sie Ihre Projektdateien in den `workspace`-Ordner (oder binden Sie Ihr bestehendes Projekt ein)

3. Setzen Sie Ihren API-Schlüssel in der `.env`-Datei:

   ```bash
   ANTHROPIC_API_KEY=ihr-api-schlüssel-hier
   ```

4. Container erstellen und starten:

   ```bash
   docker compose up --build
   ```

5. Mit dem Container verbinden:

   ```bash
   docker compose exec claude zsh
   ```

6. Firewall initialisieren (erfordert sudo-Passwort):

   ```bash
   sudo /usr/local/bin/init-firewall.sh
   ```

7. Claude Code starten:
   ```bash
   claude
   ```

## Generierte Dateistruktur

```
├── workspace/
│   ├── .claude/
│   │   └── settings.json    # Claude-Einstellungen
│   ├── .empty               # Leere Datei für geschützte Mounts
│   └── CLAUDE.md            # Ihre Claude-Anweisungen
├── .env                     # Umgebungsvariablen
├── Dockerfile               # Container-Definition
├── docker-compose.yaml      # Docker Compose-Konfiguration
└── init-firewall.sh         # Netzwerk-Firewall-Skript
```

## Fehlerbehebung

### Firewall-Probleme

Wenn Sie nach dem Aktivieren der Firewall Netzwerkprobleme haben:

```bash
# Firewall-Status prüfen
sudo iptables -L -n

# Blockierte Verbindungen anzeigen
sudo iptables -L -n -v | grep DROP

# Firewall zurücksetzen (erlaubt allen Datenverkehr)
sudo iptables -F
```

### Container startet nicht

```bash
# Logs prüfen
docker compose logs

# Ohne Cache neu bauen
docker compose build --no-cache
```

### Zugriff verweigert

Stellen Sie sicher, dass das Workspace-Verzeichnis die richtigen Berechtigungen hat:

```bash
chmod -R 755 workspace
```

### Anwendungseinstellungen zurücksetzen

Um alle gespeicherten Einstellungen zu löschen und neu zu beginnen, öffnen Sie die Entwicklerkonsole Ihres Browsers und führen Sie aus:

```javascript
localStorage.removeItem("claude-initializr-config");
localStorage.removeItem("claude-initializr-welcome-dismissed");
localStorage.removeItem("claude-initializr-autosave");
```

Laden Sie dann die Seite neu.

Alternativ können Sie das automatische Speichern über den Schalter in der Kopfzeile deaktivieren, um zu verhindern, dass Einstellungen gespeichert werden.

## Tech-Stack

- [React 19](https://react.dev/) mit TypeScript und React Compiler
- [Vite](https://vite.dev/) als Bundler
- [Tailwind CSS v4](https://tailwindcss.com/) mit OKLCH-Farbraum
- [shadcn/ui](https://ui.shadcn.com/) Komponenten (40+ Komponenten)
- [react-router](https://reactrouter.com/) für Routing
- [i18next](https://www.i18next.com/) für Internationalisierung
- [JSZip](https://stuk.github.io/jszip/) für ZIP-Generierung
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) für Code-Vorschauen

## Mitwirken

Beiträge sind willkommen! Bitte reichen Sie gerne einen Pull Request ein.

1. Forken Sie das Repository
2. Erstellen Sie Ihren Feature-Branch (`git checkout -b feature/tolles-feature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Tolles Feature hinzufügen'`)
4. Pushen Sie zum Branch (`git push origin feature/tolles-feature`)
5. Öffnen Sie einen Pull Request

### Eine neue Sprache hinzufügen

1. Erstellen Sie eine neue Locale-Datei in `src/i18n/locales/` (z.B. `fr.json`)
2. Kopieren Sie die Struktur von `en.json`
3. Übersetzen Sie alle Strings
4. Fügen Sie die Sprache zu `src/i18n/index.ts` hinzu
5. Fügen Sie die Sprachoption zu `LanguageSwitcher.tsx` hinzu

## Barrierefreiheit

Diese Anwendung ist vollständig barrierefrei gestaltet:

- Semantische HTML-Struktur (`<header>`, `<main>`, `<footer>`)
- ARIA-Labels auf allen interaktiven Elementen
- Tastaturnavigation unterstützt
- Screenreader-kompatibel
- Kontrastreiche Farbschemata
- Fokusindikatoren auf interaktiven Elementen

## Unterstützung

Wenn Sie dieses Projekt nützlich finden, erwägen Sie es zu unterstützen:

- ⭐ Geben Sie dem Repository einen Stern auf [GitHub](https://github.com/mkloubert/claude-initializr)
- 💝 [Über PayPal spenden](https://paypal.me/mjkloubert)

## Lizenz

MIT-Lizenz - siehe [LICENSE](./LICENSE) für Details.

Copyright © 2026 Marcel Joachim Kloubert
