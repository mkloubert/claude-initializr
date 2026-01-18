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

const nl: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Genereer Docker-configuratiebestanden om Claude Code veilig uit te voeren"
  },
  "welcome": {
    "close": "Welkomstbericht sluiten",
    "description": "Claude Code is Anthropic's krachtige AI-codeerassistent die code direct op je machine kan lezen, schrijven en uitvoeren. Hoewel ongelooflijk nuttig, vereist het uitvoeren van een AI met toegang tot het bestandssysteem en de terminal zorgvuldige overweging van beveiliging.",
    "purpose": "Deze tool genereert een complete Docker-configuratie waarmee je Claude Code in een geïsoleerde containeromgeving kunt uitvoeren. Je code blijft beschermd terwijl Claude je nog steeds kan helpen met ontwikkelen, debuggen en refactoren.",
    "features": {
      "title": "Wat je kunt configureren:",
      "dockerfile": "Kies welke ontwikkeltools te installeren (TypeScript, Python, Go, ffmpeg, ImageMagick)",
      "compose": "Stel omgevingsvariabelen in (zoals je API-sleutel) en bescherm gevoelige bestanden tegen toegang",
      "claudeMd": "Schrijf projectspecifieke instructies die Claude aan het begin van elke sessie leest"
    },
    "security": {
      "title": "Inbegrepen beveiligingsfuncties:",
      "firewall": "Netwerkfirewall die alleen verbindingen met Anthropic API, npm en GitHub toestaat",
      "isolation": "Volledige isolatie van het hostsysteem en lokale netwerk",
      "readonly": "Gevoelige bestanden gemount als lege alleen-lezen bestanden",
      "capabilities": "Alle Linux-capabilities verwijderd, geen privilege-escalatie toegestaan"
    },
    "privacy": {
      "title": "Privacyverklaring:",
      "description": "Je instellingen worden lokaal in je browser (localStorage) opgeslagen zodat ze behouden blijven wanneer je terugkeert. Om veiligheidsredenen worden waarden van omgevingsvariabelen nooit opgeslagen – alleen de variabelenamen worden bewaard. Er worden geen gegevens naar een server verzonden. Je kunt automatisch opslaan op elk moment uitschakelen via het opslagpictogram in de header – dit wist ook alle opgeslagen gegevens."
    }
  },
  "nav": {
    "header": "Header-navigatie"
  },
  "tabs": {
    "software": "Software",
    "preview": "Voorbeeld",
    "settings": "Instellingen",
    "envVariables": "Omgeving",
    "env": "Omg.",
    "protectedFiles": "Beschermde bestanden",
    "protected": "Beschermd"
  },
  "language": {
    "switch": "Taal"
  },
  "theme": {
    "switch": "Thema wisselen"
  },
  "autosave": {
    "enable": "Automatisch opslaan inschakelen",
    "disable": "Automatisch opslaan uitschakelen"
  },
  "reset": {
    "button": "Herstellen naar standaard",
    "title": "Instellingen herstellen",
    "description": "Weet je zeker dat je alle instellingen naar de standaardwaarden wilt herstellen? Deze actie kan niet ongedaan worden gemaakt.",
    "cancel": "Annuleren",
    "confirm": "Herstellen"
  },
  "software": {
    "baseImage": "Basisimage",
    "baseImageDesc": "Het Docker-basisimage bepaalt de basis van je container. Het standaard 'node' image bevat Node.js en npm. Je kunt ook varianten gebruiken zoals 'node:22-slim' voor kleinere images of 'node:22-bookworm' voor extra systeembibliotheken.",
    "image": "Image",
    "typescript": "TypeScript",
    "typescriptDesc": "Installeert de TypeScript-compiler (tsc) en ts-node om TypeScript direct uit te voeren. Essentieel voor TypeScript-projecten, maakt typecontrole, compilatie naar JavaScript en uitvoeren van .ts-bestanden zonder handmatige compilatie mogelijk.",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "Een krachtig multimediaframework voor het verwerken van audio- en videobestanden. Maakt formaatconversie, videobewerking, audio-extractie, streaming en media-analyse mogelijk. Vereist voor projecten die met mediabestanden werken.",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "Een uitgebreide beeldverwerkingssuite die meer dan 200 formaten ondersteunt. Biedt tools voor schalen, bijsnijden, formaatconversie, watermerken en programmatische beeldmanipulatie. Ideaal voor geautomatiseerde beeldworkflows.",
    "python": "Python 3",
    "pythonDesc": "Installeert de Python 3-interpreter met pip-pakketbeheerder. Maakt het uitvoeren van Python-scripts, installeren van Python-pakketten en gebruik van Python-gebaseerde tools mogelijk. Handig voor gegevensverwerking, scripting en AI/ML-taken.",
    "uv": "uv",
    "uvDesc": "Installeert uv, een extreem snelle Python-pakketinstallatie en -resolver geschreven in Rust. Het kan pip, pip-tools en virtualenv vervangen voor sneller afhankelijkheidsbeheer.",
    "golang": "Go",
    "golangDesc": "Installeert de programmeertaal Go (Golang) met de officiële compiler en tools. Ideaal voor het bouwen van snelle, statisch gecompileerde programma's, CLI-tools, webservers en systeemsoftware.",
    "flutter": "Flutter",
    "flutterDesc": "Installeert de Flutter SDK met Dart en Android-ontwikkeltools. Bouw cross-platform apps voor mobiel, web en desktop vanuit één codebase. Bevat Android SDK en opdrachtregelhulpmiddelen.",
    "version": "Versie",
    "latest": "nieuwste",
    "recommendsHint": "Aanbevolen: {{packages}}"
  },
  "aptPackages": {
    "title": "Aangepaste APT-pakketten",
    "description": "Voeg extra Debian/Ubuntu-pakketten toe om in de container te installeren.",
    "placeholder": "Voorbeeld: curl, graphviz, tree, sqlite3...",
    "add": "Pakketten toevoegen",
    "remove": "{{package}} verwijderen"
  },
  "npmPackages": {
    "title": "Aangepaste NPM-pakketten",
    "description": "Voeg extra NPM-pakketten toe om globaal in de container te installeren.",
    "placeholder": "Voorbeeld: eslint, prettier, tsx...",
    "add": "Pakketten toevoegen",
    "remove": "{{package}} verwijderen",
    "installAs": "Installeren als",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Installatiegebruiker wisselen voor {{package}}"
  },
  "runCommands": {
    "title": "Aangepaste RUN-opdrachten",
    "description": "Voeg aangepaste shell-opdrachten toe die tijdens de Docker-image build worden uitgevoerd.",
    "placeholder": "Voorbeeld: flutter doctor",
    "add": "Opdracht toevoegen",
    "remove": "Opdracht verwijderen",
    "runAs": "Uitvoeren als",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Uitvoergebruiker voor opdracht wisselen"
  },
  "plugins": {
    "title": "Claude Code Plugins",
    "description": "Installeer Claude Code plugins vanuit marketplaces.",
    "placeholder": "plugin-naam@marketplace-naam",
    "add": "Plugin toevoegen",
    "remove": "Plugin verwijderen",
    "formatHint": "Formaat: plugin-naam@marketplace-naam",
    "invalidFormat": "Ongeldig formaat. Gebruik plugin@marketplace",
    "suggestions": "Voorgestelde plugins",
    "loadingSuggestions": "Suggesties laden...",
    "addFromMarketplace": "{{plugin}} toevoegen van {{marketplace}}",
    "viewOnGitHub": "{{plugin}} bekijken op GitHub"
  },
  "env": {
    "description": "Geen omgevingsvariabelen gedefinieerd.",
    "key": "Sleutel",
    "value": "Waarde",
    "add": "Variabele toevoegen",
    "remove": "Verwijderen",
    "keyPlaceholder": "Voorbeeld: VARIABELE_NAAM",
    "valuePlaceholder": "Voorbeeld: waarde"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "Het CLAUDE.md-bestand bevat projectspecifieke instructies die Claude aan het begin van elke sessie leest. Dit is de plek voor codeerrichtlijnen, uitleg over de projectstructuur, voorkeurstechnologieën of andere context die Claude helpt het project beter te begrijpen."
  },
  "protectedFiles": {
    "description": "Geen beschermde bestanden gedefinieerd.",
    "path": "Bestandspad",
    "add": "Pad toevoegen",
    "remove": "Verwijderen",
    "pathPlaceholder": "Voorbeeld: .env.local",
    "help": "Paden zijn relatief ten opzichte van /workspace/. Deze bestanden worden gemount als lege alleen-lezen bestanden om toegang tot gevoelige gegevens te voorkomen."
  },
  "settings": {
    "title": "settings.json",
    "description": "Configureer Claude Code-machtigingen om te bepalen welke bestanden kunnen worden gelezen, bewerkt of opgehaald. Beschermde bestanden worden automatisch toegevoegd als weigeringsregels.",
    "permissions": "Machtigingen",
    "directive": "Richtlijn",
    "pattern": "Patroon",
    "patternPlaceholder": "Voorbeeld: src/** of .env",
    "addRule": "Regel toevoegen",
    "removeRule": "Regel verwijderen",
    "allow": "Toestaan",
    "ask": "Vragen",
    "deny": "Weigeren",
    "noAllowRules": "Geen toestemmingsregels gedefinieerd.",
    "noAskRules": "Geen vraagregels gedefinieerd.",
    "noDenyRules": "Geen weigeringsregels gedefinieerd.",
    "help": "Definieer machtigingsregels voor Read(), Edit() en WebFetch() operaties. Patronen ondersteunen glob-syntaxis zoals src/** voor recursieve matching.",
    "learnMore": "Meer informatie"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "Het Dockerfile definieert welke software in de container wordt geïnstalleerd. Naast Node.js en Claude Code kunnen extra tools zoals TypeScript, Python, Go, ffmpeg of ImageMagick worden toegevoegd. De geselecteerde software is beschikbaar wanneer Claude commando's uitvoert.",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "Het docker-compose.yaml-bestand regelt hoe de container wordt gestart. Omgevingsvariabelen (zoals API-sleutels) kunnen hier worden gedefinieerd. Beschermde bestanden worden gemount als lege alleen-lezen bestanden om te voorkomen dat Claude toegang krijgt tot gevoelige gegevens zoals .env-bestanden."
  },
  "dockerCompose": {
    "platform": "Platform",
    "platformDesc": "Stel een specifiek platform in voor de container (bijv. linux/amd64). Laat leeg om het standaardplatform te gebruiken. Gebruik dit wanneer basis-images je architectuur niet ondersteunen.",
    "platformPlaceholder": "Voorbeeld: linux/amd64"
  },
  "download": {
    "button": "ZIP downloaden",
    "generating": "Genereren...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "GitHub Repository",
    "paypal": "Ondersteunen via PayPal"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "Engels",
    "de": "Duits",
    "es": "Spaans",
    "fr": "Frans",
    "it": "Italiaans",
    "pt": "Portugees",
    "nl": "Nederlands",
    "ja": "Japans",
    "ko": "Koreaans",
    "zh": "Chinees",
    "ar": "Arabisch",
    "he": "Hebreeuws",
    "hi": "Hindi",
    "ur": "Urdu",
    "uk": "Oekraïens",
    "el": "Grieks",
    "pl": "Pools",
    "tr": "Turks"
  },
  "errors": {
    "invalidEnvKey": "Ongeldige variabelenaam. Gebruik alleen letters, cijfers en underscores.",
    "duplicateEnvKey": "Deze variabelenaam bestaat al.",
    "invalidPath": "Pad moet relatief zijn (geen leidende /) en mag geen .. bevatten"
  },
  "readme": {
    "title": "Claude Code Docker-configuratie",
    "generatedBy": "Gegenereerd met [Claude Initializr]({{url}})",
    "languageSwitch": "Lees dit in het {{language}}",
    "intro": {
      "title": "Over deze configuratie",
      "description": "Deze map bevat Docker-configuratiebestanden om Claude Code veilig in een geïsoleerde container uit te voeren. De configuratie biedt netwerkisolatie, bestandsbescherming en een sandboxomgeving voor AI-ondersteunde ontwikkeling."
    },
    "files": {
      "title": "Bestandsoverzicht",
      "dockerfile": "Dockerfile - Definieert de containerimage met alle ontwikkeltools",
      "dockerCompose": "docker-compose.yaml - Orkestratiebestand voor het starten van de container",
      "env": ".env - Omgevingsvariabelen (voeg hier je API-sleutels toe)",
      "initFirewall": "init-firewall.sh - Netwerkfirewallscript voor beveiliging",
      "workspace": "workspace/ - Je werkdirectory gemount in de container",
      "claudeMd": "workspace/CLAUDE.md - Projectinstructies voor Claude",
      "settingsJson": "workspace/.claude/settings.json - Claude Code machtigingsinstellingen"
    },
    "baseImage": {
      "title": "Basisimage",
      "description": "Deze configuratie gebruikt het volgende Docker-basisimage:",
      "dockerHub": "Bekijk op Docker Hub"
    },
    "platform": {
      "title": "Platform",
      "description": "De container is geconfigureerd om op dit platform te draaien:"
    },
    "aptPackages": {
      "title": "Systeempakketten (APT)",
      "description": "De volgende systeempakketten zijn geïnstalleerd:"
    },
    "npmPackages": {
      "title": "Extra NPM-pakketten",
      "description": "De volgende extra NPM-pakketten zijn globaal geïnstalleerd:",
      "installedAs": "geïnstalleerd als {{user}}"
    },
    "plugins": {
      "title": "Claude Code Plugins",
      "description": "De volgende Claude Code plugins zijn geïnstalleerd en geactiveerd:",
      "viewOnGitHub": "Bekijk op GitHub"
    },
    "envVariables": {
      "title": "Omgevingsvariabelen",
      "description": "De volgende omgevingsvariabelen zijn geconfigureerd (waarden niet getoond voor beveiliging):",
      "note": "Voeg je werkelijke waarden toe aan het .env-bestand voordat je de container start."
    },
    "protectedFiles": {
      "title": "Beschermde bestanden",
      "description": "De volgende bestanden zijn beschermd en gemount als lege alleen-lezen bestanden:"
    },
    "settingsJson": {
      "title": "Machtigingsinstellingen",
      "description": "Claude Code is geconfigureerd met de volgende machtigingsregels:",
      "allow": "Toegestane operaties (automatisch)",
      "ask": "Operaties die bevestiging vereisen",
      "deny": "Geweigerde operaties"
    },
    "claudeMd": {
      "title": "Projectinstructies",
      "description": "Projectspecifieke instructies voor Claude zijn gedefinieerd in:"
    },
    "quickStart": {
      "title": "Snelstart",
      "step1": "Installeer Docker (zie Vereisten hieronder)",
      "step2": "Start de container:",
      "step3": "Start Claude Code:",
      "step4": "Stop de container:",
      "note": "Je workspace-map is gemount op /workspace in de container. Claude Code vraagt bij eerste start om de API-sleutel."
    },
    "prerequisites": {
      "title": "Vereisten",
      "description": "Je hebt Docker nodig op je systeem. Kies je besturingssysteem:",
      "windows": {
        "title": "Windows",
        "steps": [
          "Download Docker Desktop van docker.com/products/docker-desktop",
          "Voer het installatiebestand uit en volg de installatiewizard",
          "Schakel WSL 2 backend in wanneer gevraagd (aanbevolen)",
          "Herstart je computer indien nodig",
          "Open Docker Desktop en wacht tot het is gestart"
        ],
        "link": "Officiële Windows-installatiegids"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "Download Docker Desktop van docker.com/products/docker-desktop",
          "Open het .dmg-bestand en sleep Docker naar Programma's",
          "Open Docker vanuit de map Programma's",
          "Verleen de vereiste machtigingen wanneer gevraagd",
          "Wacht tot Docker is gestart (walvisicoon in de menubalk)"
        ],
        "link": "Officiële macOS-installatiegids"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "Update je pakketindex: sudo apt update",
          "Installeer Docker: sudo apt install docker.io docker-compose-v2",
          "Voeg je gebruiker toe aan de docker-groep: sudo usermod -aG docker $USER",
          "Log uit en weer in om de groepswijzigingen door te voeren",
          "Verifieer de installatie: docker --version"
        ],
        "link": "Officiële Linux-installatiegids",
        "altNote": "Of installeer Docker Desktop voor een grafische ervaring."
      }
    },
    "troubleshooting": {
      "title": "Probleemoplossing",
      "issues": {
        "containerNotStarting": {
          "title": "Container start niet",
          "solutions": [
            "Controleer of Docker draait: docker info",
            "Verifieer dat het .env-bestand bestaat en ANTHROPIC_API_KEY bevat",
            "Controleer op poortconflicten: docker ps",
            "Bekijk container-logs: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "Toestemming geweigerd fouten",
          "solutions": [
            "Op Linux, zorg dat je gebruiker in de docker-groep zit",
            "Probeer uit te voeren met sudo (niet aanbevolen voor regelmatig gebruik)",
            "Controleer bestandsmachtigingen in de workspace-map"
          ]
        },
        "networkIssues": {
          "title": "Netwerk- of API-verbindingsproblemen",
          "solutions": [
            "Het firewallscript staat alleen specifieke domeinen toe",
            "Zorg dat api.anthropic.com bereikbaar is vanaf je netwerk",
            "Controleer firewall-logs in de container: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "Bestanden niet toegankelijk in container",
          "solutions": [
            "Beschermde bestanden zijn opzettelijk leeg - dit is verwacht",
            "Controleer volume-mounts in docker-compose.yaml",
            "Zorg dat de workspace-map op de host bestaat"
          ]
        }
      }
    },
    "links": {
      "title": "Links",
      "initializer": "Nieuwe configuratie genereren",
      "documentation": "Claude Code Documentatie",
      "support": "Problemen melden"
    },
    "author": {
      "title": "Auteur",
      "createdBy": "Gemaakt door",
      "support": "Dit project ondersteunen"
    },
    "software": {
      "title": "Geïnstalleerde software",
      "description": "De volgende ontwikkeltools zijn geïnstalleerd:"
    }
  }
};

export default nl;
