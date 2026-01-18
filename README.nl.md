# Claude Initializr

**🌐 Lees in andere talen:**
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

[![Licentie: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![Doneren](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

Een webapplicatie voor het genereren van Docker-configuratiebestanden om [Claude Code](https://docs.anthropic.com/en/docs/claude-code) veilig in een gecontaineriseerde omgeving uit te voeren.

**Live demo:** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## Functies

### Dockerfile-configuratie

- **Basisimage**: Configureer de naam en versie van het Docker-basisimage (standaard: `node:24`)
- **Softwareselectie**: Kies extra software om te installeren:
  - ffmpeg (audio-/videoverwerking)
  - Flutter (inclusief Dart en Android SDK)
  - Go
  - ImageMagick (beeldverwerking)
  - Python 3
  - TypeScript
  - uv (snelle Python-pakketinstaller, beveelt Python aan)
- **Versieconfiguratie**: Softwareversies worden geconfigureerd via Docker build-argumenten (bijv. `--build-arg GO_VERSION=1.22.0`)
- **Aangepaste APT-pakketten**: Voeg extra Debian/Ubuntu-pakketten toe om in de container te installeren
- **Aangepaste NPM-pakketten**: Voeg extra NPM-pakketten toe om globaal te installeren, met de optie om als `root` of `node` gebruiker te installeren
- **Aangepaste RUN-opdrachten**: Voeg aangepaste shell-opdrachten toe om uit te voeren tijdens de Docker-image build, met de optie om als `root` of `node` gebruiker uit te voeren
- **Claude Code Plugins**: Installeer Claude Code plugins vanuit marketplaces met het formaat `plugin-name@marketplace-name`
  - **Plugin-suggesties**: Laadt automatisch plugin-suggesties van de [officiële Anthropic marketplace](https://github.com/anthropics/claude-plugins-official) op de achtergrond
  - Eén klik om voorgestelde plugins toe te voegen
  - Externe links om plugins op GitHub te bekijken

### docker-compose.yaml Configuratie

- **Omgevingsvariabelen**: Configureer omgevingsvariabelen voor uw `.env`-bestand
- **Beschermde bestanden**: Specificeer bestanden die beschermd moeten worden door lege alleen-lezen bestanden te mounten (voorkomt toegang tot gevoelige bestanden zoals `.env.local`)

### CLAUDE.md Editor

- Markdown-editor met syntaxisaccentuering
- Ingebouwde voorbeeldfunctionaliteit
- Schrijf projectspecifieke instructies voor Claude

### settings.json Configuratie

- **Machtigingsregels**: Configureer Claude Code machtigingen om bestandstoegang te beheren
  - `Allow` - Regels voor automatisch toegestane operaties
  - `Ask` - Regels die gebruikersbevestiging vereisen
  - `Deny` - Regels die altijd worden geweigerd
- **Ondersteunde richtlijnen**:
  - `Read()` - Bepaalt welke bestanden Claude kan lezen (bijv: `Read(src/**)`)
  - `Edit()` - Bepaalt welke bestanden Claude kan wijzigen (bijv: `Edit(.env)`)
  - `WebFetch()` - Bepaalt netwerktoegang (bijv: `WebFetch(https://api.github.com:*)`)
- **Automatische integratie**: Beschermde bestanden worden automatisch toegevoegd als `Read()` weigeringsregels
- **Glob-patroon ondersteuning**: Gebruik patronen zoals `src/**` voor recursieve matching

### Algemene functies

- **Live preview**: Bekijk real-time voorbeelden van gegenereerde configuratiebestanden
- **ZIP-download**: Download alle bestanden als een gebruiksklaar ZIP-archief
- **Automatische README-generatie**: Elke ZIP bevat een gedetailleerde README.md met:
  - Bestandsoverzicht en beschrijvingen
  - Basisimage-informatie met Docker Hub-links
  - Geïnstalleerde software en pakketten met links (Debian Tracker, npmjs.com)
  - Plugin-informatie met GitHub-links
  - Omgevingsvariabele-sleutels (waarden verborgen voor beveiliging)
  - Lijst van beschermde bestanden
  - Samenvatting van machtigingsinstellingen
  - Snelstartgids met Docker-commando's
  - Vereisten voor Windows, macOS en Linux
  - Probleemoplossingssectie
  - Wanneer de UI-taal niet Engels is, bevat ook README.en.md (eenvoudig Engels)
- **Automatisch opslaan**: Instellingen worden automatisch opgeslagen in de localStorage van uw browser (standaard ingeschakeld)
- **Meertalige ondersteuning**: Beschikbaar in 18 talen:
  - 🌍 Arabisch
  - 🇨🇳 Chinees
  - 🇳🇱 Nederlands
  - 🇬🇧 Engels
  - 🇫🇷 Frans
  - 🇩🇪 Duits
  - 🇬🇷 Grieks
  - 🇮🇱 Hebreeuws
  - 🇮🇳 Hindi
  - 🇮🇹 Italiaans
  - 🇯🇵 Japans
  - 🇰🇷 Koreaans
  - 🇵🇱 Pools
  - 🇵🇹 Portugees
  - 🇪🇸 Spaans
  - 🇹🇷 Turks
  - 🇺🇦 Oekraïens
  - 🇵🇰 Urdu
- **Donker/Licht thema**: Automatische themadetectie met handmatige schakelaar
- **PWA-ondersteuning**: Installeerbaar als Progressive Web App
- **Volledig toegankelijk**: WCAG-conform met toetsenbordnavigatie en schermlezersondersteuning
- **Responsief ontwerp**: Geoptimaliseerd voor desktop en tablet

### Automatisch opslaan mechanisme

De autosave-functie kan worden in-/uitgeschakeld met het opslaan-pictogram in de header:

| Pictogram       | Status         | Gedrag                                                              |
| --------------- | -------------- | ------------------------------------------------------------------- |
| 💾 (Opslaan)    | Ingeschakeld   | Alle wijzigingen worden automatisch opgeslagen in localStorage      |
| 🚫💾 (Uit)      | Uitgeschakeld  | Wijzigingen worden niet opgeslagen; bestaande data wordt gewist     |

**Hoe het werkt:**

- **Autosave inschakelen**: Slaat huidige instellingen direct op in localStorage
- **Autosave uitschakelen**: Wist alle opgeslagen instellingen uit localStorage
- Uw autosave-voorkeur wordt onthouden tussen sessies

### Privacy & Gegevensopslag

Deze applicatie respecteert uw privacy:

- **Alleen lokale opslag**: Alle instellingen worden lokaal in uw browser opgeslagen (localStorage)
- **Geen servercommunicatie**: Er worden nooit gegevens naar een server gestuurd
- **Veilig door ontwerp**: **Waarden** van omgevingsvariabelen worden **nooit opgeslagen** - alleen variabelenamen worden bewaard
- **Volledige controle**: U kunt automatisch opslaan op elk moment uitschakelen via de schakelaar in de header, wat ook alle opgeslagen gegevens wist
- **Sessiegebaseerd thema**: Themavoorkeur wordt gereset naar systeemstandaard bij pagina herladen

## Beveiligingsfuncties

De gegenereerde Docker-configuratie bevat uitgebreide beveiligingsmaatregelen:

### Netwerk firewall

Het `init-firewall.sh` script implementeert strikte netwerkisolatie:

- **iptables-gebaseerde firewall** met DROP-beleid voor al het uitgaande verkeer
- **Alleen-allowlist benadering** - alleen goedgekeurde domeinen zijn toegankelijk:
  - `api.anthropic.com` - Claude API
  - `npm registry` - Pakketinstallatie
  - `github.com` - Git-operaties
  - `sentry.io` - Foutrapportage
- **Automatische GitHub IP-resolutie** voor web-, API- en git-endpoints
- **Host netwerkisolatie** - voorkomt toegang tot lokaal netwerk
- **Firewall verificatie** - tests zorgen ervoor dat regels correct worden toegepast

### Docker beveiligingsverharding

- **Capability dropping**: Alle Linux-capabilities worden verwijderd (`cap_drop: ALL`)
- **Geen privilege-escalatie**: `no-new-privileges:true`
- **Resourcelimieten**: CPU- en geheugenbeperkingen
- **Alleen-lezen mounts**: Beschermde bestanden worden alleen-lezen gemount
- **Niet-root uitvoering**: Draait als `node` gebruiker

## Voorgeïnstalleerde tools

De gegenereerde container bevat:

| Categorie           | Tools                               |
| ------------------- | ----------------------------------- |
| **Shell**           | zsh met Powerline10k-thema, bash    |
| **Editors**         | nano, vim                           |
| **Versiebeheer**    | git, git-delta, GitHub CLI (gh)     |
| **Hulpprogramma's** | fzf, jq, less, unzip, man-db        |
| **Netwerk**         | iptables, ipset, iproute2, dnsutils |

## Aan de slag

### Vereisten

- Node.js 20 of hoger
- npm 10 of hoger

### Installatie

```bash
# Clone de repository
git clone https://github.com/mkloubert/claude-initializr.git
cd claude-initializr

# Installeer dependencies
npm install

# Start ontwikkelserver
npm run dev

# Bouw voor productie
npm run build

# Preview productiebouw
npm run preview
```

### Omgevingsvariabelen

Pas de applicatie aan met omgevingsvariabelen. Maak een `.env`-bestand:

```bash
# GitHub repository URL (optioneel, leeg laten om te verbergen)
VITE_GITHUB_URL=https://github.com/mkloubert/claude-initializr

# PayPal donatie URL (optioneel, leeg laten om te verbergen)
VITE_PAYPAL_URL=https://paypal.me/mjkloubert

# Claude Code permissions documentation URL (optional)
VITE_PERMISSIONS_DOCS_URL=https://docs.anthropic.com/en/docs/claude-code/settings#permission-settings

# Author website URL (optional)
VITE_AUTHOR_URL=https://marcel.coffee

# Author name displayed in footer (optional)
VITE_AUTHOR_NAME=Marcel Joachim Kloubert
```

## Gebruik

1. **Configureer basisimage**: Stel de naam en versie van het Docker-basisimage in (bijv. `node:24` of `node:22-slim`)

2. **Selecteer software**: Kies welke extra software in uw container moet worden geïnstalleerd

3. **Voeg aangepaste pakketten en opdrachten toe**:
   - Voeg aangepaste APT-pakketten toe (bijv. `curl`, `graphviz`, `sqlite3`)
   - Voeg aangepaste NPM-pakketten toe om globaal te installeren (bijv. `eslint`, `prettier`)
   - Kies of NPM-pakketten moeten worden geïnstalleerd als `node` (standaard) of `root` gebruiker
   - Voeg aangepaste RUN-opdrachten toe om tijdens de build uit te voeren (bijv. `pip install numpy`)
   - Kies of RUN-opdrachten moeten worden uitgevoerd als `node` (standaard) of `root` gebruiker

4. **Stel omgevingsvariabelen in**: Voeg eventuele omgevingsvariabelen toe die uw project nodig heeft (bijv. `ANTHROPIC_API_KEY`)

5. **Bescherm gevoelige bestanden**: Voeg paden toe naar bestanden die beschermd moeten worden (bijv. `.env.local`)

6. **Bewerk CLAUDE.md**: Schrijf instructies voor Claude in de Markdown-editor

7. **Machtigingen configureren**: Stel machtigingsregels in via de settings.json kaart
   - Voeg `Allow` regels toe voor auto-goedgekeurde operaties
   - Voeg `Ask` regels toe voor operaties die bevestiging vereisen
   - Voeg `Deny` regels toe voor verboden operaties
   - Beschermde bestanden worden automatisch toegevoegd als `Read()` weigeringsregels

8. **Preview**: Controleer de gegenereerde configuratiebestanden in de preview-tabbladen

9. **Download**: Klik op "Download ZIP" om alle bestanden te krijgen

## Gebruik van de gegenereerde bestanden

1. Pak het ZIP-bestand uit in uw projectmap

2. Kopieer uw projectbestanden naar de `workspace` map (of mount uw bestaande project)

3. Stel uw API-sleutel in het `.env`-bestand in:

   ```bash
   ANTHROPIC_API_KEY=uw-api-sleutel-hier
   ```

4. Bouw en start de container:

   ```bash
   docker compose up --build
   ```

   **Optioneel: Aangepaste download-URL's**

   Als u een mirror of proxy nodig heeft voor pakketdownloads, kunt u de standaard-URL's overschrijven tijdens het bouwen. Alle URL's ondersteunen queryparameters:

   ```bash
   docker compose build \
     --build-arg GO_JSON_URL=https://mijn-mirror.example.com/golang/?mode=json \
     --build-arg GO_DOWNLOAD_URL=https://mijn-mirror.example.com/golang \
     --build-arg FLUTTER_JSON_URL=https://mijn-mirror.example.com/flutter/releases_linux.json \
     --build-arg FLUTTER_BASE_URL=https://mijn-mirror.example.com/flutter/releases \
     --build-arg UV_INSTALL_SCRIPT_URL=https://mijn-mirror.example.com/uv/install.sh
   ```

   | Build-argument | Standaard | Beschrijving |
   |----------------|-----------|--------------|
   | `GO_JSON_URL` | `https://go.dev/dl/?mode=json` | URL voor Go-versie JSON API (alleen bij "latest") |
   | `GO_DOWNLOAD_URL` | `https://go.dev/dl` | Basis-URL voor Go-archiefdownloads |
   | `FLUTTER_JSON_URL` | `https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json` | URL voor Flutter releases JSON API (alleen bij "latest") |
   | `FLUTTER_BASE_URL` | `https://storage.googleapis.com/flutter_infra_release/releases` | Basis-URL voor Flutter-archiefdownloads |
   | `UV_INSTALL_SCRIPT_URL` | `https://astral.sh/uv/install.sh` | URL voor uv-installatiescript |

5. Verbind met de container:

   ```bash
   docker compose exec claude zsh
   ```

6. Initialiseer de firewall (vereist sudo-wachtwoord):

   ```bash
   sudo /usr/local/bin/init-firewall.sh
   ```

7. Start Claude Code:
   ```bash
   claude
   ```

## Gegenereerde bestandsstructuur

```
├── workspace/
│   ├── .claude/
│   │   └── settings.json    # Claude-instellingen
│   ├── .empty               # Leeg bestand voor beschermde mounts
│   └── CLAUDE.md            # Uw Claude-instructies
├── .env                     # Omgevingsvariabelen
├── Dockerfile               # Containerdefinitie
├── docker-compose.yaml      # Docker Compose-configuratie
└── init-firewall.sh         # Netwerk firewall-script
```

## Probleemoplossing

### Firewall-problemen

Als u netwerkproblemen ondervindt na het inschakelen van de firewall:

```bash
# Controleer firewallstatus
sudo iptables -L -n

# Bekijk geblokkeerde verbindingen
sudo iptables -L -n -v | grep DROP

# Reset firewall (staat al het verkeer toe)
sudo iptables -F
```

### Container start niet

```bash
# Controleer logs
docker compose logs

# Herbouw zonder cache
docker compose build --no-cache
```

### Toegang geweigerd

Zorg ervoor dat de workspace-map de juiste machtigingen heeft:

```bash
chmod -R 755 workspace
```

### Applicatie-instellingen resetten

Om alle opgeslagen instellingen te wissen en opnieuw te beginnen, open de ontwikkelaarsconsole van uw browser en voer uit:

```javascript
localStorage.removeItem("claude-initializr-config");
localStorage.removeItem("claude-initializr-welcome-dismissed");
localStorage.removeItem("claude-initializr-autosave");
```

Herlaad daarna de pagina.

U kunt ook automatisch opslaan uitschakelen via de schakelaar in de header om te voorkomen dat instellingen worden opgeslagen.

## Tech stack

- [React 19](https://react.dev/) met TypeScript en React Compiler
- [Vite](https://vite.dev/) als bundler
- [Tailwind CSS v4](https://tailwindcss.com/) met OKLCH-kleurruimte
- [shadcn/ui](https://ui.shadcn.com/) componenten (40+ componenten)
- [react-router](https://reactrouter.com/) voor routing
- [i18next](https://www.i18next.com/) voor internationalisering
- [JSZip](https://stuk.github.io/jszip/) voor ZIP-generatie
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) voor code previews

## Bijdragen

Bijdragen zijn welkom! Voel u vrij om een Pull Request in te dienen.

1. Fork de repository
2. Maak uw feature branch (`git checkout -b feature/geweldige-feature`)
3. Commit uw wijzigingen (`git commit -m 'Geweldige feature toevoegen'`)
4. Push naar de branch (`git push origin feature/geweldige-feature`)
5. Open een Pull Request

### Een nieuwe taal toevoegen

1. Maak een nieuw locale-bestand in `src/i18n/locales/` (bijv. `fr.ts`)
2. Importeer en implementeer de `Translations`-interface van `types.ts`
3. Kopieer de structuur van `en.ts` en vertaal alle strings
4. Voeg de taalimport toe aan `src/i18n/index.ts`
5. Voeg de taaloptie toe aan `LanguageSwitcher.tsx`

## Toegankelijkheid

Deze applicatie is ontworpen om volledig toegankelijk te zijn:

- Semantische HTML-structuur (`<header>`, `<main>`, `<footer>`)
- ARIA-labels op alle interactieve elementen
- Toetsenbordnavigatie-ondersteuning
- Compatibel met schermlezers
- Kleuren met hoog contrast
- Focusindicatoren op interactieve elementen

## Releases

Releases worden geautomatiseerd via GitHub Actions. Om een nieuwe release te maken:

1. Maak en push een versie-tag:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. De workflow doet automatisch:
   - Bouwt het project
   - Maakt een ZIP-archief van de `dist/`-map
   - Publiceert een GitHub Release met automatisch gegenereerde release notes

Tags met `-` (bijv. `v1.0.0-beta`) worden gemarkeerd als pre-releases.

## Ondersteuning

Als u dit project nuttig vindt, overweeg dan om het te ondersteunen:

- ⭐ Geef het repository een ster op [GitHub](https://github.com/mkloubert/claude-initializr)
- 💝 [Doneer via PayPal](https://paypal.me/mjkloubert)

## Licentie

MIT-licentie - zie [LICENSE](./LICENSE) voor details.

Copyright © 2026 Marcel Joachim Kloubert
