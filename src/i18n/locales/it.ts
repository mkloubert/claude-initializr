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

const it: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Genera file di configurazione Docker per eseguire Claude Code in modo sicuro"
  },
  "welcome": {
    "close": "Chiudi messaggio di benvenuto",
    "description": "Claude Code è il potente assistente di codifica AI di Anthropic che può leggere, scrivere ed eseguire codice direttamente sulla tua macchina. Sebbene incredibilmente utile, eseguire un'IA con accesso al file system e al terminale richiede un'attenta considerazione della sicurezza.",
    "purpose": "Questo strumento genera una configurazione Docker completa che ti permette di eseguire Claude Code in un ambiente container isolato. Il tuo codice rimane protetto mentre Claude può ancora aiutarti a sviluppare, debuggare e refactorizzare.",
    "features": {
      "title": "Cosa puoi configurare:",
      "dockerfile": "Scegli quali strumenti di sviluppo installare (TypeScript, Python, Go, ffmpeg, ImageMagick)",
      "compose": "Imposta variabili d'ambiente (come la tua chiave API) e proteggi file sensibili dall'accesso",
      "claudeMd": "Scrivi istruzioni specifiche del progetto che Claude legge all'inizio di ogni sessione"
    },
    "security": {
      "title": "Funzionalità di sicurezza incluse:",
      "firewall": "Firewall di rete che consente solo connessioni all'API Anthropic, npm e GitHub",
      "isolation": "Isolamento completo dal sistema host e dalla rete locale",
      "readonly": "File sensibili montati come file vuoti in sola lettura",
      "capabilities": "Tutte le capability Linux rimosse, nessuna escalation di privilegi consentita"
    },
    "privacy": {
      "title": "Informativa sulla privacy:",
      "description": "Le tue impostazioni sono memorizzate localmente nel tuo browser (localStorage) in modo che vengano conservate al tuo ritorno. Per motivi di sicurezza, i valori delle variabili d'ambiente non vengono mai memorizzati – vengono salvati solo i nomi delle variabili. Nessun dato viene inviato a nessun server. Puoi disabilitare il salvataggio automatico in qualsiasi momento usando l'icona di salvataggio nell'intestazione – questo cancellerà anche tutti i dati memorizzati."
    }
  },
  "nav": {
    "header": "Navigazione intestazione"
  },
  "tabs": {
    "software": "Software",
    "preview": "Anteprima",
    "settings": "Impostazioni",
    "envVariables": "Ambiente",
    "env": "Amb.",
    "protectedFiles": "File protetti",
    "protected": "Protetti"
  },
  "language": {
    "switch": "Lingua"
  },
  "theme": {
    "switch": "Cambia tema"
  },
  "autosave": {
    "enable": "Attiva salvataggio automatico",
    "disable": "Disattiva salvataggio automatico"
  },
  "reset": {
    "button": "Ripristina valori predefiniti",
    "title": "Ripristina impostazioni",
    "description": "Sei sicuro di voler ripristinare tutte le impostazioni ai valori predefiniti? Questa azione non può essere annullata.",
    "cancel": "Annulla",
    "confirm": "Ripristina"
  },
  "software": {
    "baseImage": "Immagine base",
    "baseImageDesc": "L'immagine base Docker determina la fondazione del tuo container. L'immagine predefinita 'node' include Node.js e npm. Puoi anche usare varianti come 'node:22-slim' per immagini più piccole o 'node:22-bookworm' per librerie di sistema aggiuntive.",
    "image": "Immagine",
    "typescript": "TypeScript",
    "typescriptDesc": "Installa il compilatore TypeScript (tsc) e ts-node per eseguire TypeScript direttamente. Essenziale per progetti TypeScript, permette la verifica dei tipi, la compilazione in JavaScript e l'esecuzione di file .ts senza compilazione manuale.",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "Un potente framework multimediale per elaborare file audio e video. Permette conversione di formato, editing video, estrazione audio, streaming e analisi dei media. Richiesto per progetti che lavorano con file multimediali.",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "Una suite completa di elaborazione immagini che supporta oltre 200 formati. Fornisce strumenti per ridimensionamento, ritaglio, conversione di formato, watermark e manipolazione programmatica delle immagini. Ideale per workflow automatizzati di immagini.",
    "python": "Python 3",
    "pythonDesc": "Installa l'interprete Python 3 con il gestore di pacchetti pip. Permette di eseguire script Python, installare pacchetti Python e usare strumenti basati su Python. Utile per elaborazione dati, scripting e attività AI/ML.",
    "uv": "uv",
    "uvDesc": "Installa uv, un installatore e risolutore di pacchetti Python estremamente veloce scritto in Rust. Può sostituire pip, pip-tools e virtualenv per una gestione delle dipendenze più veloce.",
    "golang": "Go",
    "golangDesc": "Installa il linguaggio di programmazione Go (Golang) con il compilatore e gli strumenti ufficiali. Ideale per creare programmi veloci compilati staticamente, strumenti CLI, server web e software di sistema.",
    "flutter": "Flutter",
    "flutterDesc": "Installa l'SDK Flutter con Dart e gli strumenti di sviluppo Android. Crea app multipiattaforma per dispositivi mobili, web e desktop da un'unica base di codice. Include l'SDK Android e gli strumenti da riga di comando.",
    "rust": "Rust",
    "rustDesc": "Installa il linguaggio di programmazione Rust con il gestore di pacchetti Cargo tramite rustup. Ideale per creare software di sistema veloce e sicuro per la memoria, strumenti CLI, WebAssembly e applicazioni embedded.",
    "version": "Versione",
    "latest": "ultima",
    "recommendsHint": "Raccomandato: {{packages}}"
  },
  "aptPackages": {
    "title": "Pacchetti APT personalizzati",
    "description": "Aggiungi pacchetti Debian/Ubuntu aggiuntivi da installare nel container.",
    "placeholder": "Esempio: curl, graphviz, tree, sqlite3...",
    "add": "Aggiungi pacchetti",
    "remove": "Rimuovi {{package}}"
  },
  "npmPackages": {
    "title": "Pacchetti NPM personalizzati",
    "description": "Aggiungi pacchetti NPM aggiuntivi da installare globalmente nel container.",
    "placeholder": "Esempio: eslint, prettier, tsx...",
    "add": "Aggiungi pacchetti",
    "remove": "Rimuovi {{package}}",
    "installAs": "Installa come",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Cambia utente di installazione per {{package}}"
  },
  "runCommands": {
    "title": "Comandi RUN personalizzati",
    "description": "Aggiungi comandi shell personalizzati da eseguire durante la build dell'immagine Docker.",
    "placeholder": "Esempio: flutter doctor",
    "add": "Aggiungi comando",
    "remove": "Rimuovi comando",
    "runAs": "Esegui come",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Cambia utente di esecuzione per il comando"
  },
  "plugins": {
    "title": "Plugin Claude Code",
    "description": "Installa plugin Claude Code dai marketplace.",
    "placeholder": "nome-plugin@nome-marketplace",
    "add": "Aggiungi Plugin",
    "remove": "Rimuovi plugin",
    "formatHint": "Formato: nome-plugin@nome-marketplace",
    "invalidFormat": "Formato non valido. Usa plugin@marketplace",
    "suggestions": "Plugin suggeriti",
    "loadingSuggestions": "Caricamento suggerimenti...",
    "addFromMarketplace": "Aggiungi {{plugin}} da {{marketplace}}",
    "viewOnGitHub": "Vedi {{plugin}} su GitHub"
  },
  "env": {
    "description": "Nessuna variabile d'ambiente definita.",
    "key": "Chiave",
    "value": "Valore",
    "add": "Aggiungi variabile",
    "remove": "Rimuovi",
    "keyPlaceholder": "Esempio: NOME_VARIABILE",
    "valuePlaceholder": "Esempio: valore"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "Il file CLAUDE.md contiene istruzioni specifiche del progetto che Claude legge all'inizio di ogni sessione. Questo è il posto per linee guida di codifica, spiegazioni della struttura del progetto, tecnologie preferite o qualsiasi altro contesto che aiuti Claude a capire meglio il progetto."
  },
  "protectedFiles": {
    "description": "Nessun file protetto definito.",
    "path": "Percorso file",
    "add": "Aggiungi percorso",
    "remove": "Rimuovi",
    "pathPlaceholder": "Esempio: .env.local",
    "help": "I percorsi sono relativi a /workspace/. Questi file saranno montati come file vuoti in sola lettura per prevenire l'accesso a dati sensibili."
  },
  "settings": {
    "title": "settings.json",
    "description": "Configura i permessi di Claude Code per controllare quali file possono essere letti, modificati o recuperati. I file protetti vengono aggiunti automaticamente come regole di negazione.",
    "permissions": "Permessi",
    "directive": "Direttiva",
    "pattern": "Pattern",
    "patternPlaceholder": "Esempio: src/** o .env",
    "addRule": "Aggiungi regola",
    "removeRule": "Rimuovi regola",
    "allow": "Consenti",
    "ask": "Chiedi",
    "deny": "Nega",
    "noAllowRules": "Nessuna regola di autorizzazione definita.",
    "noAskRules": "Nessuna regola di richiesta definita.",
    "noDenyRules": "Nessuna regola di negazione definita.",
    "help": "Definisci regole di permesso per operazioni Read(), Edit() e WebFetch(). I pattern supportano la sintassi glob come src/** per la corrispondenza ricorsiva.",
    "learnMore": "Scopri di più"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "Il Dockerfile definisce quale software viene installato nel container. Oltre a Node.js e Claude Code, possono essere inclusi strumenti aggiuntivi come TypeScript, Python, Go, ffmpeg o ImageMagick. Il software selezionato sarà disponibile quando Claude eseguirà comandi.",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "Il file docker-compose.yaml controlla come viene avviato il container. Le variabili d'ambiente (come le chiavi API) possono essere definite qui. I file protetti sono montati come file vuoti in sola lettura per impedire a Claude di accedere a dati sensibili come i file .env."
  },
  "dockerCompose": {
    "platform": "Piattaforma",
    "platformDesc": "Imposta una piattaforma specifica per il container (es: linux/amd64). Lascia vuoto per usare la piattaforma predefinita. Usa questo quando le immagini base non supportano la tua architettura.",
    "platformPlaceholder": "Esempio: linux/amd64"
  },
  "download": {
    "button": "Scarica ZIP",
    "generating": "Generazione...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "Repository GitHub",
    "paypal": "Supporta via PayPal"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "inglese",
    "de": "tedesco",
    "es": "spagnolo",
    "fr": "francese",
    "it": "italiano",
    "pt": "portoghese",
    "nl": "olandese",
    "ja": "giapponese",
    "ko": "coreano",
    "zh": "cinese",
    "ar": "arabo",
    "he": "ebraico",
    "hi": "hindi",
    "ur": "urdu",
    "uk": "ucraino",
    "el": "greco",
    "pl": "polacco",
    "tr": "turco"
  },
  "errors": {
    "invalidEnvKey": "Nome variabile non valido. Usa solo lettere, numeri e underscore.",
    "duplicateEnvKey": "Questo nome di variabile esiste già.",
    "invalidPath": "Il percorso deve essere relativo (senza / iniziale) e non può contenere .."
  },
  "readme": {
    "title": "Configurazione Docker Claude Code",
    "generatedBy": "Generato con [Claude Initializr]({{url}})",
    "languageSwitch": "Leggi questo in {{language}}",
    "intro": {
      "title": "Informazioni su questa configurazione",
      "description": "Questa cartella contiene file di configurazione Docker per eseguire Claude Code in modo sicuro in un container isolato. La configurazione fornisce isolamento di rete, protezione dei file e un ambiente sandbox per lo sviluppo assistito dall'IA."
    },
    "files": {
      "title": "Panoramica dei file",
      "dockerfile": "Dockerfile - Definisce l'immagine del container con tutti gli strumenti di sviluppo",
      "dockerCompose": "docker-compose.yaml - File di orchestrazione per avviare il container",
      "env": ".env - Variabili d'ambiente (aggiungi qui le tue chiavi API)",
      "initFirewall": "init-firewall.sh - Script firewall di rete per la sicurezza",
      "workspace": "workspace/ - La tua directory di lavoro montata nel container",
      "claudeMd": "workspace/CLAUDE.md - Istruzioni del progetto per Claude",
      "settingsJson": "workspace/.claude/settings.json - Impostazioni dei permessi di Claude Code"
    },
    "baseImage": {
      "title": "Immagine base",
      "description": "Questa configurazione utilizza la seguente immagine Docker di base:",
      "dockerHub": "Visualizza su Docker Hub"
    },
    "platform": {
      "title": "Piattaforma",
      "description": "Il container è configurato per essere eseguito su questa piattaforma:"
    },
    "aptPackages": {
      "title": "Pacchetti di sistema (APT)",
      "description": "I seguenti pacchetti di sistema sono installati:"
    },
    "npmPackages": {
      "title": "Pacchetti NPM aggiuntivi",
      "description": "I seguenti pacchetti NPM aggiuntivi sono installati globalmente:",
      "installedAs": "installato come {{user}}"
    },
    "plugins": {
      "title": "Plugin Claude Code",
      "description": "I seguenti plugin Claude Code sono installati e attivati:",
      "viewOnGitHub": "Visualizza su GitHub"
    },
    "envVariables": {
      "title": "Variabili d'ambiente",
      "description": "Le seguenti variabili d'ambiente sono configurate (valori non mostrati per sicurezza):",
      "note": "Aggiungi i tuoi valori reali al file .env prima di avviare il container."
    },
    "protectedFiles": {
      "title": "File protetti",
      "description": "I seguenti file sono protetti e montati come file vuoti in sola lettura:"
    },
    "settingsJson": {
      "title": "Impostazioni dei permessi",
      "description": "Claude Code è configurato con le seguenti regole di permesso:",
      "allow": "Operazioni consentite (automatico)",
      "ask": "Operazioni che richiedono conferma",
      "deny": "Operazioni negate"
    },
    "claudeMd": {
      "title": "Istruzioni del progetto",
      "description": "Le istruzioni specifiche del progetto per Claude sono definite in:"
    },
    "quickStart": {
      "title": "Avvio rapido",
      "step1": "Installa Docker (vedi Prerequisiti sotto)",
      "step2": "Avvia il container:",
      "step2CustomVersions": "Opzionale: Compila con versioni software personalizzate (vedi Docker Build Arguments sotto):",
      "step3": "Avvia Claude Code:",
      "step4": "Ferma il container:",
      "note": "La tua cartella workspace è montata su /workspace all'interno del container. Claude Code chiederà la chiave API al primo avvio."
    },
    "buildArgs": {
      "title": "Docker Build Arguments",
      "description": "Puoi configurare le versioni del software e gli URL di download durante la compilazione Docker. Usa `--build-arg NOME=VALORE` per sovrascrivere i valori predefiniti.",
      "versionArgs": {
        "title": "Argomenti di versione",
        "description": "Controlla quali versioni del software vengono installate:"
      },
      "urlArgs": {
        "title": "Argomenti URL",
        "description": "Sovrascrivi gli URL di download per mirror o proxy:"
      },
      "defaultValue": "Predefinito",
      "example": "Esempio con versioni personalizzate:"
    },
    "prerequisites": {
      "title": "Prerequisiti",
      "description": "Hai bisogno di Docker installato sul tuo sistema. Scegli il tuo sistema operativo:",
      "windows": {
        "title": "Windows",
        "steps": [
          "Scarica Docker Desktop da docker.com/products/docker-desktop",
          "Esegui l'installer e segui la procedura guidata",
          "Abilita il backend WSL 2 quando richiesto (consigliato)",
          "Riavvia il computer se necessario",
          "Apri Docker Desktop e attendi che si avvii"
        ],
        "link": "Guida ufficiale all'installazione per Windows"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "Scarica Docker Desktop da docker.com/products/docker-desktop",
          "Apri il file .dmg e trascina Docker in Applicazioni",
          "Apri Docker dalla cartella Applicazioni",
          "Concedi i permessi richiesti quando richiesto",
          "Attendi che Docker finisca di avviarsi (icona balena nella barra dei menu)"
        ],
        "link": "Guida ufficiale all'installazione per macOS"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "Aggiorna l'indice dei pacchetti: sudo apt update",
          "Installa Docker: sudo apt install docker.io docker-compose-v2",
          "Aggiungi il tuo utente al gruppo docker: sudo usermod -aG docker $USER",
          "Disconnettiti e riconnettiti per rendere effettive le modifiche al gruppo",
          "Verifica l'installazione: docker --version"
        ],
        "link": "Guida ufficiale all'installazione per Linux",
        "altNote": "Oppure installa Docker Desktop per un'esperienza con interfaccia grafica."
      }
    },
    "troubleshooting": {
      "title": "Risoluzione dei problemi",
      "issues": {
        "containerNotStarting": {
          "title": "Il container non si avvia",
          "solutions": [
            "Verifica se Docker è in esecuzione: docker info",
            "Verifica che il file .env esista e contenga ANTHROPIC_API_KEY",
            "Controlla i conflitti di porte: docker ps",
            "Visualizza i log del container: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "Errori di permesso negato",
          "solutions": [
            "Su Linux, assicurati che il tuo utente sia nel gruppo docker",
            "Prova ad eseguire con sudo (non consigliato per uso regolare)",
            "Controlla i permessi dei file nella cartella workspace"
          ]
        },
        "networkIssues": {
          "title": "Problemi di rete o connessione API",
          "solutions": [
            "Lo script firewall consente solo domini specifici",
            "Assicurati che api.anthropic.com sia accessibile dalla tua rete",
            "Controlla i log del firewall all'interno del container: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "File non accessibili nel container",
          "solutions": [
            "I file protetti sono intenzionalmente vuoti - questo è previsto",
            "Controlla i mount dei volumi in docker-compose.yaml",
            "Assicurati che la cartella workspace esista sull'host"
          ]
        }
      }
    },
    "links": {
      "title": "Link",
      "initializer": "Genera nuova configurazione",
      "documentation": "Documentazione Claude Code",
      "support": "Segnala problemi"
    },
    "author": {
      "title": "Autore",
      "createdBy": "Creato da",
      "support": "Supporta questo progetto"
    },
    "software": {
      "title": "Software installato",
      "description": "I seguenti strumenti di sviluppo sono installati:"
    }
  }
};

export default it;
