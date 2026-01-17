# Claude Initializr

**🌐 Leggi in altre lingue:**
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

[![Licenza: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![Dona](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

Un'applicazione web per generare file di configurazione Docker per eseguire [Claude Code](https://docs.anthropic.com/en/docs/claude-code) in modo sicuro in un ambiente containerizzato.

**Demo live:** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## Funzionalità

### Configurazione Dockerfile

- **Immagine base**: Configura il nome e la versione dell'immagine Docker base (predefinito: `node:24`)
- **Selezione software**: Scegli software aggiuntivo da installare:
  - ffmpeg (elaborazione audio/video)
  - Flutter (include Dart e Android SDK)
  - Go
  - ImageMagick (elaborazione immagini)
  - Python 3
  - TypeScript
  - uv (installatore veloce di pacchetti Python, raccomanda Python)
- **Configurazione versioni**: Le versioni del software sono configurate tramite argomenti di build Docker (es: `--build-arg GO_VERSION=1.22.0`)
- **Pacchetti APT personalizzati**: Aggiungi pacchetti Debian/Ubuntu aggiuntivi da installare nel container
- **Pacchetti NPM personalizzati**: Aggiungi pacchetti NPM aggiuntivi da installare globalmente, con l'opzione di installarli come utente `root` o `node`
- **Comandi RUN personalizzati**: Aggiungi comandi shell personalizzati da eseguire durante la build dell'immagine Docker, con l'opzione di eseguirli come utente `root` o `node`

### Configurazione docker-compose.yaml

- **Variabili d'ambiente**: Configura le variabili d'ambiente per il tuo file `.env`
- **File protetti**: Specifica i file che devono essere protetti montando file vuoti in sola lettura (impedisce l'accesso a file sensibili come `.env.local`)

### Editor CLAUDE.md

- Editor Markdown con evidenziazione della sintassi
- Funzionalità di anteprima integrata
- Scrivi istruzioni specifiche per il progetto per Claude

### Configurazione settings.json

- **Regole di permesso**: Configura i permessi di Claude Code per controllare l'accesso ai file
  - `Allow` - Regole per operazioni automaticamente consentite
  - `Ask` - Regole che richiedono conferma dell'utente
  - `Deny` - Regole sempre negate
- **Direttive supportate**:
  - `Read()` - Controlla quali file Claude può leggere (es: `Read(src/**)`)
  - `Edit()` - Controlla quali file Claude può modificare (es: `Edit(.env)`)
  - `WebFetch()` - Controlla l'accesso alla rete (es: `WebFetch(https://api.github.com:*)`)
- **Integrazione automatica**: I file protetti vengono aggiunti automaticamente come regole di negazione `Read()`
- **Supporto pattern Glob**: Usa pattern come `src/**` per la corrispondenza ricorsiva

### Funzionalità generali

- **Anteprima live**: Visualizza anteprime in tempo reale dei file di configurazione generati
- **Download ZIP**: Scarica tutti i file come archivio ZIP pronto all'uso
- **Salvataggio automatico**: Le impostazioni vengono salvate automaticamente nel localStorage del browser (abilitato per impostazione predefinita)
- **Supporto multilingue**: Disponibile in 18 lingue:
  - 🌍 Arabo
  - 🇨🇳 Cinese
  - 🇳🇱 Olandese
  - 🇬🇧 Inglese
  - 🇫🇷 Francese
  - 🇩🇪 Tedesco
  - 🇬🇷 Greco
  - 🇮🇱 Ebraico
  - 🇮🇳 Hindi
  - 🇮🇹 Italiano
  - 🇯🇵 Giapponese
  - 🇰🇷 Coreano
  - 🇵🇱 Polacco
  - 🇵🇹 Portoghese
  - 🇪🇸 Spagnolo
  - 🇹🇷 Turco
  - 🇺🇦 Ucraino
  - 🇵🇰 Urdu
- **Tema scuro/chiaro**: Rilevamento automatico del tema con commutazione manuale
- **Supporto PWA**: Installabile come Progressive Web App
- **Completamente accessibile**: Conforme WCAG con navigazione da tastiera e supporto per screen reader
- **Design responsive**: Ottimizzato per desktop e tablet

### Meccanismo di salvataggio automatico

La funzione di salvataggio automatico può essere attivata/disattivata usando l'icona di salvataggio nell'intestazione:

| Icona           | Stato        | Comportamento                                                            |
| --------------- | ------------ | ------------------------------------------------------------------------ |
| 💾 (Salva)      | Abilitato    | Tutte le modifiche vengono salvate automaticamente nel localStorage      |
| 🚫💾 (Spento)   | Disabilitato | Le modifiche non vengono salvate; i dati esistenti vengono cancellati    |

**Come funziona:**

- **Abilitare il salvataggio automatico**: Salva immediatamente le impostazioni correnti nel localStorage
- **Disabilitare il salvataggio automatico**: Cancella tutte le impostazioni salvate dal localStorage
- La tua preferenza di salvataggio automatico viene ricordata tra le sessioni

### Privacy e archiviazione dati

Questa applicazione rispetta la tua privacy:

- **Solo archiviazione locale**: Tutte le impostazioni vengono archiviate localmente nel tuo browser (localStorage)
- **Nessuna comunicazione con server**: Nessun dato viene mai inviato a nessun server
- **Sicuro per design**: I **valori** delle variabili d'ambiente **non vengono mai salvati** - vengono salvati solo i nomi delle variabili
- **Controllo totale**: Puoi disabilitare il salvataggio automatico in qualsiasi momento usando l'interruttore nell'intestazione, che cancella anche tutti i dati salvati
- **Tema basato sulla sessione**: La preferenza del tema viene ripristinata al default di sistema al ricaricamento della pagina

## Funzionalità di sicurezza

La configurazione Docker generata include misure di sicurezza complete:

### Firewall di rete

Lo script `init-firewall.sh` implementa un isolamento di rete rigoroso:

- **Firewall basato su iptables** con politica DROP per tutto il traffico in uscita
- **Approccio solo allowlist** - solo i domini autorizzati sono accessibili:
  - `api.anthropic.com` - API Claude
  - `npm registry` - Installazione pacchetti
  - `github.com` - Operazioni Git
  - `sentry.io` - Segnalazione errori
- **Risoluzione automatica IP GitHub** per endpoint web, API e git
- **Isolamento rete host** - impedisce l'accesso alla rete locale
- **Verifica firewall** - i test assicurano che le regole siano applicate correttamente

### Rafforzamento sicurezza Docker

- **Rimozione capability**: Tutte le capability Linux vengono rimosse (`cap_drop: ALL`)
- **Nessuna escalation di privilegi**: `no-new-privileges:true`
- **Limiti risorse**: Vincoli CPU e memoria
- **Mount in sola lettura**: I file protetti vengono montati in sola lettura
- **Esecuzione non-root**: Viene eseguito come utente `node`

## Strumenti preinstallati

Il container generato include:

| Categoria              | Strumenti                           |
| ---------------------- | ----------------------------------- |
| **Shell**              | zsh con tema Powerline10k, bash     |
| **Editor**             | nano, vim                           |
| **Controllo versione** | git, git-delta, GitHub CLI (gh)     |
| **Utilità**            | fzf, jq, less, unzip, man-db        |
| **Rete**               | iptables, ipset, iproute2, dnsutils |

## Per iniziare

### Prerequisiti

- Node.js 20 o superiore
- npm 10 o superiore

### Installazione

```bash
# Clona il repository
git clone https://github.com/mkloubert/claude-initializr.git
cd claude-initializr

# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev

# Compila per la produzione
npm run build

# Anteprima della build di produzione
npm run preview
```

### Variabili d'ambiente

Personalizza l'applicazione usando le variabili d'ambiente. Crea un file `.env`:

```bash
# URL repository GitHub (opzionale, lascia vuoto per nascondere)
VITE_GITHUB_URL=https://github.com/mkloubert/claude-initializr

# URL donazione PayPal (opzionale, lascia vuoto per nascondere)
VITE_PAYPAL_URL=https://paypal.me/mjkloubert
```

## Utilizzo

1. **Configura l'immagine base**: Imposta il nome e la versione dell'immagine Docker base (es., `node:24` o `node:22-slim`)

2. **Seleziona il software**: Scegli quale software aggiuntivo installare nel tuo container

3. **Aggiungi pacchetti e comandi personalizzati**:
   - Aggiungi pacchetti APT personalizzati (es., `curl`, `graphviz`, `sqlite3`)
   - Aggiungi pacchetti NPM personalizzati da installare globalmente (es., `eslint`, `prettier`)
   - Scegli se i pacchetti NPM devono essere installati come utente `node` (predefinito) o `root`
   - Aggiungi comandi RUN personalizzati da eseguire durante la build (es., `pip install numpy`)
   - Scegli se i comandi RUN devono essere eseguiti come utente `node` (predefinito) o `root`

4. **Imposta le variabili d'ambiente**: Aggiungi tutte le variabili d'ambiente di cui il tuo progetto ha bisogno (es., `ANTHROPIC_API_KEY`)

5. **Proteggi i file sensibili**: Aggiungi percorsi ai file che devono essere protetti (es., `.env.local`)

6. **Modifica CLAUDE.md**: Scrivi le istruzioni per Claude nell'editor Markdown

7. **Configura permessi**: Imposta le regole di permesso nella scheda settings.json
   - Aggiungi regole `Allow` per operazioni auto-approvate
   - Aggiungi regole `Ask` per operazioni che richiedono conferma
   - Aggiungi regole `Deny` per operazioni vietate
   - I file protetti vengono aggiunti automaticamente come regole di negazione `Read()`

8. **Anteprima**: Controlla i file di configurazione generati nelle schede di anteprima

9. **Scarica**: Clicca su "Scarica ZIP" per ottenere tutti i file

## Utilizzo dei file generati

1. Estrai il file ZIP nella directory del tuo progetto

2. Copia i file del tuo progetto nella cartella `workspace` (o monta il tuo progetto esistente)

3. Imposta la tua chiave API nel file `.env`:

   ```bash
   ANTHROPIC_API_KEY=la-tua-chiave-api-qui
   ```

4. Compila e avvia il container:

   ```bash
   docker compose up --build
   ```

   **Opzionale: URL di download personalizzati**

   Se devi usare un mirror o proxy per i download dei pacchetti, puoi sovrascrivere gli URL predefiniti durante la compilazione. Tutti gli URL supportano i parametri di query:

   ```bash
   docker compose build \
     --build-arg GO_JSON_URL=https://mio-mirror.example.com/golang/?mode=json \
     --build-arg GO_DOWNLOAD_URL=https://mio-mirror.example.com/golang \
     --build-arg UV_INSTALL_SCRIPT_URL=https://mio-mirror.example.com/uv/install.sh
   ```

   | Argomento di build | Predefinito | Descrizione |
   |--------------------|-------------|-------------|
   | `GO_JSON_URL` | `https://go.dev/dl/?mode=json` | URL dell'API JSON versioni Go (solo per "latest") |
   | `GO_DOWNLOAD_URL` | `https://go.dev/dl` | URL base per i download degli archivi Go |
   | `UV_INSTALL_SCRIPT_URL` | `https://astral.sh/uv/install.sh` | URL dello script di installazione uv |

5. Connettiti al container:

   ```bash
   docker compose exec claude zsh
   ```

6. Inizializza il firewall (richiede password sudo):

   ```bash
   sudo /usr/local/bin/init-firewall.sh
   ```

7. Avvia Claude Code:
   ```bash
   claude
   ```

## Struttura dei file generati

```
├── workspace/
│   ├── .claude/
│   │   └── settings.json    # Impostazioni Claude
│   ├── .empty               # File vuoto per mount protetti
│   └── CLAUDE.md            # Le tue istruzioni per Claude
├── .env                     # Variabili d'ambiente
├── Dockerfile               # Definizione del container
├── docker-compose.yaml      # Configurazione Docker Compose
└── init-firewall.sh         # Script firewall di rete
```

## Risoluzione problemi

### Problemi di firewall

Se riscontri problemi di rete dopo aver abilitato il firewall:

```bash
# Verifica stato firewall
sudo iptables -L -n

# Visualizza connessioni bloccate
sudo iptables -L -n -v | grep DROP

# Reimposta firewall (consente tutto il traffico)
sudo iptables -F
```

### Il container non si avvia

```bash
# Verifica i log
docker compose logs

# Ricompila senza cache
docker compose build --no-cache
```

### Permesso negato

Assicurati che la directory workspace abbia i permessi corretti:

```bash
chmod -R 755 workspace
```

### Reimpostare le impostazioni dell'applicazione

Per cancellare tutte le impostazioni salvate e ricominciare da zero, apri la console sviluppatori del browser ed esegui:

```javascript
localStorage.removeItem("claude-initializr-config");
localStorage.removeItem("claude-initializr-welcome-dismissed");
localStorage.removeItem("claude-initializr-autosave");
```

Poi ricarica la pagina.

In alternativa, puoi disabilitare il salvataggio automatico usando l'interruttore nell'intestazione per impedire il salvataggio delle impostazioni.

## Stack tecnologico

- [React 19](https://react.dev/) con TypeScript e React Compiler
- [Vite](https://vite.dev/) come bundler
- [Tailwind CSS v4](https://tailwindcss.com/) con spazio colore OKLCH
- [shadcn/ui](https://ui.shadcn.com/) componenti (40+ componenti)
- [react-router](https://reactrouter.com/) per il routing
- [i18next](https://www.i18next.com/) per l'internazionalizzazione
- [JSZip](https://stuk.github.io/jszip/) per la generazione ZIP
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) per le anteprime del codice

## Contribuire

I contributi sono benvenuti! Sentiti libero di inviare una Pull Request.

1. Fai il fork del repository
2. Crea il tuo branch di funzionalità (`git checkout -b feature/funzionalita-fantastica`)
3. Esegui il commit delle tue modifiche (`git commit -m 'Aggiungere funzionalità fantastica'`)
4. Esegui il push al branch (`git push origin feature/funzionalita-fantastica`)
5. Apri una Pull Request

### Aggiungere una nuova lingua

1. Crea un nuovo file locale in `src/i18n/locales/` (es., `fr.json`)
2. Copia la struttura da `en.json`
3. Traduci tutte le stringhe
4. Aggiungi la lingua a `src/i18n/index.ts`
5. Aggiungi l'opzione lingua a `LanguageSwitcher.tsx`

## Accessibilità

Questa applicazione è progettata per essere completamente accessibile:

- Struttura HTML semantica (`<header>`, `<main>`, `<footer>`)
- Etichette ARIA su tutti gli elementi interattivi
- Supporto navigazione da tastiera
- Compatibile con screen reader
- Schemi di colori ad alto contrasto
- Indicatori di focus sugli elementi interattivi

## Supporto

Se trovi utile questo progetto, considera di supportarlo:

- ⭐ Metti una stella al repository su [GitHub](https://github.com/mkloubert/claude-initializr)
- 💝 [Dona tramite PayPal](https://paypal.me/mjkloubert)

## Licenza

Licenza MIT - vedi [LICENSE](./LICENSE) per i dettagli.

Copyright © 2026 Marcel Joachim Kloubert
