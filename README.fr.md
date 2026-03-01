# Claude Initializr

**🌐 Lire dans d'autres langues :**
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

[![Licence : MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![Faire un don](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

Une application web pour générer des fichiers de configuration Docker permettant d'exécuter [Claude Code](https://docs.anthropic.com/en/docs/claude-code) en toute sécurité dans un environnement conteneurisé.

**Démo en direct :** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## Fonctionnalités

### Configuration du Dockerfile

- **Image de base** : Configurez le nom et la version de l'image Docker de base (par défaut : `node:24`)
- **Sélection de logiciels** : Choisissez des logiciels supplémentaires à installer :
  - ffmpeg (traitement audio/vidéo)
  - Flutter (inclut Dart et Android SDK)
  - Go
  - ImageMagick (traitement d'images)
  - Python 3
  - Rust (inclut le gestionnaire de paquets Cargo)
  - TypeScript
  - uv (installateur de paquets Python rapide, recommande Python)
  - Ollama (connexion à une instance Ollama locale pour utiliser des modèles open source)
- **Configuration des versions** : Les versions des logiciels sont configurées via les arguments de build Docker (ex: `--build-arg GO_VERSION=1.22.0`)
- **Paquets APT personnalisés** : Ajoutez des paquets Debian/Ubuntu supplémentaires à installer dans le conteneur
- **Paquets NPM personnalisés** : Ajoutez des paquets NPM supplémentaires à installer globalement, avec la possibilité de les installer en tant qu'utilisateur `root` ou `node`
- **Commandes RUN personnalisées** : Ajoutez des commandes shell personnalisées à exécuter lors de la construction de l'image Docker, avec la possibilité de les exécuter en tant qu'utilisateur `root` ou `node`

### Configuration docker-compose.yaml

- **Variables d'environnement** : Configurez les variables d'environnement pour votre fichier `.env`
- **Fichiers protégés** : Spécifiez les fichiers qui doivent être protégés en montant des fichiers vides en lecture seule (empêche l'accès aux fichiers sensibles comme `.env.local`)

### Éditeur CLAUDE.md

- Éditeur Markdown avec coloration syntaxique
- Fonctionnalité de prévisualisation intégrée
- Rédigez des instructions spécifiques au projet pour Claude

### Configuration de settings.json

- **Règles de permission**: Configurez les permissions de Claude Code pour contrôler l'accès aux fichiers
  - `Allow` - Règles pour les opérations automatiquement autorisées
  - `Ask` - Règles nécessitant une confirmation de l'utilisateur
  - `Deny` - Règles toujours refusées
- **Directives supportées**:
  - `Read()` - Contrôle quels fichiers Claude peut lire (ex: `Read(src/**)`)
  - `Edit()` - Contrôle quels fichiers Claude peut modifier (ex: `Edit(.env)`)
  - `WebFetch()` - Contrôle l'accès réseau (ex: `WebFetch(https://api.github.com:*)`)
- **Intégration automatique**: Les fichiers protégés sont automatiquement ajoutés comme règles de refus `Read()`
- **Support des patterns Glob**: Utilisez des patterns comme `src/**` pour la correspondance récursive

### Configuration DevContainer (VS Code / GitHub Codespaces)

- **Intégration VS Code**: Générez `devcontainer.json` pour VS Code Dev Containers
- **GitHub Codespaces**: Configuration compatible pour le développement GitHub Codespaces
- **Extensions**: Configurez les extensions VS Code à installer automatiquement
- **Paramètres**: Définissez les paramètres VS Code pour l'environnement du conteneur
- **Features**: Ajoutez des Dev Container Features (ex: GitHub CLI, langages supplémentaires)
- **Redirection de ports**: Configurez les ports à rediriger depuis le conteneur
- **Commandes de cycle de vie**: Configurez les commandes pour les événements post-create, post-start et post-attach
- **Extensions recommandées**: Recommandations automatiques d'extensions basées sur le logiciel sélectionné

### Interface moderne

- **Navigation de barre latérale**: Accès rapide à toutes les sections de configuration avec une barre latérale réductible
- **Disposition en volet divisé**: Éditeur et aperçu en direct côte à côte avec panneaux redimensionnables
- **Support des langues RTL**: Support complet de droite à gauche pour l'arabe, l'hébreu et l'ourdou

### Fonctionnalités générales

- **Prévisualisation en direct** : Visualisez les aperçus en temps réel des fichiers de configuration générés dans le volet divisé
- **Téléchargement ZIP** : Téléchargez tous les fichiers sous forme d'archive ZIP prête à l'emploi
- **Génération automatique du README** : Chaque ZIP comprend un README.md détaillé avec :
  - Vue d'ensemble des fichiers et descriptions
  - Informations sur l'image de base avec liens Docker Hub
  - Logiciels et paquets installés avec liens (Debian Tracker, npmjs.com)
  - Clés des variables d'environnement (valeurs masquées pour la sécurité)
  - Liste des fichiers protégés
  - Résumé des paramètres de permission
  - Guide de démarrage rapide avec commandes Docker
  - Prérequis pour Windows, macOS et Linux
  - Section de dépannage
  - Lorsque la langue de l'interface n'est pas l'anglais, inclut également README.en.md (anglais simple)
- **Import/Export de configuration** : Exportez votre configuration sous forme de fichier JSON et importez-la sur un autre navigateur ou appareil
- **Historique de configuration** : Suivez les modifications avec la fonctionnalité annuler/rétablir
  - Suivi automatique des modifications avec des instantanés différés
  - Annuler/Rétablir avec les raccourcis clavier (`Ctrl+Z` / `Ctrl+Y`)
  - Panneau d'historique avec horodatages et descriptions des modifications
  - Vue diff pour comparer n'importe quels états
  - Restauration vers n'importe quel état de configuration précédent
  - Stocké dans IndexedDB pour la persistance (max 50 entrées)
- **Sauvegarde automatique** : Les paramètres sont automatiquement enregistrés dans le localStorage de votre navigateur (activé par défaut)
- **Support multilingue** : Disponible en 18 langues :
  - 🌍 Arabe
  - 🇨🇳 Chinois
  - 🇳🇱 Néerlandais
  - 🇬🇧 Anglais
  - 🇫🇷 Français
  - 🇩🇪 Allemand
  - 🇬🇷 Grec
  - 🇮🇱 Hébreu
  - 🇮🇳 Hindi
  - 🇮🇹 Italien
  - 🇯🇵 Japonais
  - 🇰🇷 Coréen
  - 🇵🇱 Polonais
  - 🇵🇹 Portugais
  - 🇪🇸 Espagnol
  - 🇹🇷 Turc
  - 🇺🇦 Ukrainien
  - 🇵🇰 Ourdou
- **Thème sombre/clair** : Détection automatique du thème avec basculement manuel
- **Support PWA** : Installable comme Progressive Web App
- **Entièrement accessible** : Conforme WCAG avec navigation au clavier et support des lecteurs d'écran
- **Design responsive** : Optimisé pour ordinateur et tablette
- **Raccourcis clavier** : Navigation complète au clavier avec des raccourcis personnalisables (appuyez sur `Ctrl+/` ou `⌘+/` pour tous les afficher)

### Raccourcis clavier

Tous les raccourcis utilisent `Ctrl` sous Windows/Linux et `⌘` (Cmd) sous macOS.

| Raccourci | Action |
| --------- | ------ |
| `Ctrl/⌘ + S` | Télécharger le ZIP |
| `Ctrl/⌘ + E` | Basculer le volet de prévisualisation |
| `Ctrl/⌘ + B` | Basculer la barre latérale |
| `Ctrl/⌘ + Z` | Annuler |
| `Ctrl/⌘ + Y` | Rétablir |
| `Ctrl/⌘ + Shift + Z` | Rétablir (alternative) |
| `Ctrl/⌘ + Shift + D` | Basculer le mode sombre/clair |
| `Ctrl/⌘ + Shift + X` | Réinitialiser les paramètres par défaut |
| `Ctrl/⌘ + Shift + L` | Ouvrir le sélecteur de langue |
| `Ctrl/⌘ + 1-5` | Basculer vers la section (1=Dockerfile, 2=Docker Compose, 3=CLAUDE.md, 4=settings.json, 5=DevContainer) |
| `Ctrl/⌘ + /` | Ouvrir l'aide des raccourcis clavier |
| `Escape` | Fermer le dialogue |

Accédez à l'aide des raccourcis clavier via le menu des paramètres dans l'en-tête.

### Mécanisme de sauvegarde automatique

La fonction de sauvegarde automatique peut être activée/désactivée via l'icône de sauvegarde dans l'en-tête :

| Icône              | État        | Comportement                                                        |
| ------------------ | ----------- | ------------------------------------------------------------------- |
| 💾 (Sauvegarder)   | Activé      | Toutes les modifications sont automatiquement enregistrées dans le localStorage |
| 🚫💾 (Désactivé)   | Désactivé   | Les modifications ne sont pas enregistrées ; les données existantes sont effacées |

**Comment ça fonctionne :**

- **Activation de la sauvegarde automatique** : Enregistre immédiatement les paramètres actuels dans le localStorage
- **Désactivation de la sauvegarde automatique** : Efface tous les paramètres enregistrés du localStorage
- Votre préférence de sauvegarde automatique est mémorisée entre les sessions

### Import/Export de configuration

Vous pouvez partager ou sauvegarder votre configuration via des fichiers JSON :

- **Exporter** : Cliquez sur l'icône de téléversement dans l'en-tête pour télécharger votre configuration actuelle au format `claude-initializr-config.json`
- **Importer** : Cliquez sur l'icône de téléchargement pour sélectionner un fichier JSON précédemment exporté

**Comment ça fonctionne :**

- **L'export** enregistre tous les paramètres (image de base, sélection de logiciels, paquets, commandes, permissions, contenu CLAUDE.md) dans un seul fichier JSON
- **L'import** valide le fichier, affiche un aperçu des différences et demande confirmation avant d'appliquer
- Pour des raisons de sécurité, les **valeurs des variables d'environnement ne sont jamais incluses** dans les fichiers exportés — seuls les noms de variables sont exportés
- Les configurations importées reçoivent de nouveaux identifiants internes pour éviter les conflits
- Le format d'export inclut un champ de version (`"version": "1.0"`) pour la compatibilité ascendante

### Confidentialité et stockage des données

Cette application respecte votre vie privée :

- **Stockage local uniquement** : Tous les paramètres sont stockés localement dans votre navigateur (localStorage)
- **Aucune communication avec un serveur** : Aucune donnée n'est jamais envoyée à un serveur
- **Sécurisé par conception** : Les **valeurs** des variables d'environnement ne sont **jamais stockées** - seuls les noms de variables sont enregistrés
- **Contrôle total** : Vous pouvez désactiver la sauvegarde automatique à tout moment via le bouton dans l'en-tête, ce qui efface également toutes les données stockées
- **Thème basé sur la session** : La préférence de thème est réinitialisée aux paramètres système par défaut au rechargement de la page

## Fonctionnalités de sécurité

La configuration Docker générée comprend des mesures de sécurité complètes :

### Pare-feu réseau

Le script `init-firewall.sh` implémente une isolation réseau stricte :

- **Pare-feu basé sur iptables** avec politique DROP pour tout le trafic sortant
- **Approche par liste blanche uniquement** - seuls les domaines autorisés sont accessibles :
  - `api.anthropic.com` - API Claude
  - `npm registry` - Installation de paquets
  - `github.com` - Opérations Git
  - `sentry.io` - Rapport d'erreurs
- **Résolution automatique des IP GitHub** pour les points de terminaison web, API et git
- **Isolation du réseau hôte** - empêche l'accès au réseau local
- **Vérification du pare-feu** - des tests garantissent que les règles sont correctement appliquées

### Renforcement de la sécurité Docker

- **Suppression des capacités** : Toutes les capacités Linux sont supprimées (`cap_drop: ALL`)
- **Pas d'escalade de privilèges** : `no-new-privileges:true`
- **Limites de ressources** : Contraintes CPU et mémoire
- **Montages en lecture seule** : Les fichiers protégés sont montés en lecture seule
- **Exécution non-root** : S'exécute en tant qu'utilisateur `node`

## Outils préinstallés

Le conteneur généré comprend :

| Catégorie              | Outils                               |
| ---------------------- | ------------------------------------ |
| **Shell**              | zsh avec thème Powerline10k, bash    |
| **Éditeurs**           | nano, vim                            |
| **Gestion de version** | git, git-delta, GitHub CLI (gh)      |
| **Utilitaires**        | fzf, jq, less, unzip, man-db         |
| **Réseau**             | iptables, ipset, iproute2, dnsutils  |

## Démarrage

### Prérequis

- Node.js 20 ou supérieur
- npm 10 ou supérieur

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/mkloubert/claude-initializr.git
cd claude-initializr

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la construction de production
npm run preview
```

### Variables d'environnement

Personnalisez l'application en utilisant des variables d'environnement. Créez un fichier `.env` :

```bash
# URL du dépôt GitHub (optionnel, laisser vide pour masquer)
VITE_GITHUB_URL=https://github.com/mkloubert/claude-initializr

# URL de don PayPal (optionnel, laisser vide pour masquer)
VITE_PAYPAL_URL=https://paypal.me/mjkloubert

# Claude Code permissions documentation URL (optional)
VITE_PERMISSIONS_DOCS_URL=https://docs.anthropic.com/en/docs/claude-code/settings#permission-settings

# Author website URL (optional)
VITE_AUTHOR_URL=https://marcel.coffee

# Author name displayed in footer (optional)
VITE_AUTHOR_NAME=Marcel Joachim Kloubert
```

## Utilisation

1. **Configurer l'image de base** : Définissez le nom et la version de l'image Docker de base (par ex., `node:24` ou `node:22-slim`)

2. **Sélectionner les logiciels** : Choisissez les logiciels supplémentaires à installer dans votre conteneur

3. **Ajouter des paquets et commandes personnalisés** :
   - Ajoutez des paquets APT personnalisés (par ex., `curl`, `graphviz`, `sqlite3`)
   - Ajoutez des paquets NPM personnalisés à installer globalement (par ex., `eslint`, `prettier`)
   - Choisissez si les paquets NPM doivent être installés en tant qu'utilisateur `node` (par défaut) ou `root`
   - Ajoutez des commandes RUN personnalisées à exécuter lors de la construction (par ex., `pip install numpy`)
   - Choisissez si les commandes RUN doivent être exécutées en tant qu'utilisateur `node` (par défaut) ou `root`

4. **Définir les variables d'environnement** : Ajoutez toutes les variables d'environnement dont votre projet a besoin (par ex., `ANTHROPIC_API_KEY`)

5. **Protéger les fichiers sensibles** : Ajoutez les chemins des fichiers qui doivent être protégés (par ex., `.env.local`)

6. **Modifier CLAUDE.md** : Rédigez les instructions pour Claude dans l'éditeur Markdown

7. **Configurer les permissions**: Configurez les règles de permission dans la section settings.json
   - Ajoutez des règles `Allow` pour les opérations auto-approuvées
   - Ajoutez des règles `Ask` pour les opérations nécessitant confirmation
   - Ajoutez des règles `Deny` pour les opérations interdites
   - Les fichiers protégés sont automatiquement ajoutés comme règles de refus `Read()`

8. **Prévisualiser** : Vérifiez les fichiers de configuration générés dans le volet de prévisualisation

9. **Télécharger** : Cliquez sur "Télécharger ZIP" pour obtenir tous les fichiers

## Utilisation des fichiers générés

1. Extrayez le fichier ZIP dans le répertoire de votre projet

2. Copiez vos fichiers de projet dans le dossier `workspace` (ou montez votre projet existant)

3. Définissez votre clé API dans le fichier `.env` :

   ```bash
   ANTHROPIC_API_KEY=votre-clé-api-ici
   ```

4. Construire et démarrer le conteneur :

   ```bash
   docker compose up --build
   ```

   **Optionnel : Versions de logiciels personnalisées**

   Les versions des logiciels peuvent être configurées via des arguments de build. Utilisez `latest` pour la récupération dynamique des versions ou spécifiez une version explicite :

   ```bash
   docker compose build \
     --build-arg GO_VERSION=1.22.0 \
     --build-arg FLUTTER_VERSION=3.24.0 \
     --build-arg PYTHON_VERSION=3.12 \
     --build-arg TYPESCRIPT_VERSION=5.6.0
   ```

   | Argument de build | Défaut | Description |
   |-------------------|--------|-------------|
   | `CLAUDE_CODE_VERSION` | `stable` | Version de Claude Code (`latest` ou spécifique comme `1.0.58`) |
   | `FLUTTER_VERSION` | `latest` | Version de Flutter (`latest` ou spécifique comme `3.24.0`) |
   | `GIT_DELTA_VERSION` | `0.18.2` | Version de Git delta pour la coloration des diffs |
   | `GO_VERSION` | `latest` | Version de Go (`latest` ou spécifique comme `1.22.0`) |
   | `PYTHON_VERSION` | `3` | Version de Python (ex. `3`, `3.12`) |
   | `TYPESCRIPT_VERSION` | `latest` | Version de TypeScript (`latest` ou spécifique comme `5.6.0`) |
   | `ZSH_IN_DOCKER_VERSION` | `1.2.0` | Version de zsh-in-docker pour la configuration du shell |

   **Optionnel : URLs de téléchargement personnalisées**

   Si vous devez utiliser un miroir ou un proxy pour les téléchargements de paquets, vous pouvez remplacer les URLs par défaut lors de la construction. Toutes les URLs supportent les paramètres de requête :

   ```bash
   docker compose build \
     --build-arg GO_JSON_URL=https://mon-miroir.example.com/golang/?mode=json \
     --build-arg GO_DOWNLOAD_URL=https://mon-miroir.example.com/golang \
     --build-arg RUSTUP_INSTALL_URL=https://mon-miroir.example.com/rustup/rustup-init.sh \
     --build-arg UV_INSTALL_SCRIPT_URL=https://mon-miroir.example.com/uv/install.sh
   ```

   | Argument de build | Défaut | Description |
   |-------------------|--------|-------------|
   | `GO_JSON_URL` | `https://go.dev/dl/?mode=json` | URL de l'API JSON des versions Go (uniquement pour "latest") |
   | `GO_DOWNLOAD_URL` | `https://go.dev/dl` | URL de base pour les téléchargements d'archives Go |
   | `RUSTUP_INSTALL_URL` | `https://sh.rustup.rs` | URL du script d'installation rustup |
   | `UV_INSTALL_SCRIPT_URL` | `https://astral.sh/uv/install.sh` | URL du script d'installation uv |

5. Se connecter au conteneur :

   ```bash
   docker compose exec claude zsh
   ```

6. Initialiser le pare-feu (nécessite le mot de passe sudo) :

   ```bash
   sudo /usr/local/bin/init-firewall.sh
   ```

7. Démarrer Claude Code :
   ```bash
   claude
   ```

## Structure des fichiers générés

```
├── .devcontainer/           # VS Code Dev Container (optional)
│   ├── devcontainer.json    # Dev Container configuration
│   └── post-create.sh       # Post-create script (if complex commands)
├── workspace/
│   ├── .claude/
│   │   └── settings.json    # Paramètres Claude
│   ├── .empty               # Fichier vide pour les montages protégés
│   └── CLAUDE.md            # Vos instructions Claude
├── .env                     # Variables d'environnement
├── Dockerfile               # Définition du conteneur
├── docker-compose.yaml      # Configuration Docker Compose
└── init-firewall.sh         # Script de pare-feu réseau
```

## Dépannage

### Problèmes de pare-feu

Si vous rencontrez des problèmes réseau après avoir activé le pare-feu :

```bash
# Vérifier l'état du pare-feu
sudo iptables -L -n

# Voir les connexions bloquées
sudo iptables -L -n -v | grep DROP

# Réinitialiser le pare-feu (autorise tout le trafic)
sudo iptables -F
```

### Le conteneur ne démarre pas

```bash
# Vérifier les logs
docker compose logs

# Reconstruire sans cache
docker compose build --no-cache
```

### Permission refusée

Assurez-vous que le répertoire workspace a les bonnes permissions :

```bash
chmod -R 755 workspace
```

### Réinitialiser les paramètres de l'application

Pour effacer tous les paramètres enregistrés et recommencer à zéro, ouvrez la console développeur de votre navigateur et exécutez :

```javascript
localStorage.removeItem("claude-initializr-config");
localStorage.removeItem("claude-initializr-welcome-dismissed");
localStorage.removeItem("claude-initializr-autosave");
```

Puis rechargez la page.

Alternativement, vous pouvez désactiver la sauvegarde automatique via le bouton dans l'en-tête pour empêcher l'enregistrement des paramètres.

## Stack technique

- [React 19](https://react.dev/) avec TypeScript et React Compiler
- [Vite](https://vite.dev/) comme bundler
- [Tailwind CSS v4](https://tailwindcss.com/) avec espace colorimétrique OKLCH
- [shadcn/ui](https://ui.shadcn.com/) composants (40+ composants)
- [react-router](https://reactrouter.com/) pour le routage
- [i18next](https://www.i18next.com/) pour l'internationalisation
- [JSZip](https://stuk.github.io/jszip/) pour la génération ZIP
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) pour les prévisualisations de code

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à soumettre une Pull Request.

1. Forkez le dépôt
2. Créez votre branche de fonctionnalité (`git checkout -b feature/fonctionnalite-geniale`)
3. Committez vos modifications (`git commit -m 'Ajouter une fonctionnalité géniale'`)
4. Poussez vers la branche (`git push origin feature/fonctionnalite-geniale`)
5. Ouvrez une Pull Request

### Ajouter une nouvelle langue

1. Créez un nouveau fichier de locale dans `src/i18n/locales/` (par ex., `fr.ts`)
2. Importez et implémentez l'interface `Translations` depuis `types.ts`
3. Copiez la structure depuis `en.ts` et traduisez toutes les chaînes
4. Ajoutez l'import de la langue à `src/i18n/index.ts`
5. Ajoutez l'option de langue à `LanguageSwitcher.tsx`

## Accessibilité

Cette application est conçue pour être entièrement accessible :

- Structure HTML sémantique (`<header>`, `<main>`, `<footer>`)
- Labels ARIA sur tous les éléments interactifs
- Support de la navigation au clavier
- Compatible avec les lecteurs d'écran
- Schémas de couleurs à contraste élevé
- Indicateurs de focus sur les éléments interactifs

## Versions

Les versions sont automatisées via GitHub Actions. Pour créer une nouvelle version :

1. Créez et poussez un tag de version :
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. Le workflow effectue automatiquement :
   - La compilation du projet
   - La création d'une archive ZIP à partir du dossier `dist/`
   - La publication d'une Release GitHub avec des notes de version auto-générées

Les tags contenant `-` (ex. `v1.0.0-beta`) sont marqués comme pré-versions.

## Journal des modifications

### v4.1.2

- Ajout du support Ollama en tant que paquet logiciel
  - Configure les variables d'environnement pour connecter Claude Code aux instances Ollama locales
  - Définit automatiquement `ANTHROPIC_BASE_URL` et `ANTHROPIC_AUTH_TOKEN` lorsqu'activé
  - Les variables d'environnement sont supprimées lorsqu'Ollama est désactivé
- Ajout de la configuration `extra_hosts` dans docker-compose.yaml pour l'accès au réseau hôte

### v4.0.2

- **Refonte majeure de l'interface utilisateur/UX** : Surcharge complète de l'interface pour une meilleure utilisabilité
  - Remplacement de la disposition verticale basée sur des cartes par une disposition Barre latérale + Volet divisé
  - Navigation par barre latérale pour basculer rapidement entre sections avec raccourcis clavier (`Ctrl/⌘ + 1-5`)
  - Volet divisé redimensionnable avec éditeur et aperçu en direct côte à côte
  - Barre latérale réductible avec mode icônes uniquement (`Ctrl/⌘ + B` pour basculer)
  - Divulgation progressive avec sections d'accordéon pour réduire la charge cognitive
- **Support des langues RTL** : Support complet de droite à gauche pour l'arabe, l'hébreu et l'ourdou
  - La barre latérale se positionne automatiquement à droite pour les langues RTL
  - Tous les éléments de l'interface sont correctement en miroir
- **Améliorations de la réactivité** :
  - La barre latérale commence repliée sur les écrans de tablette (768–1023px)
  - Mise en page optimisée pour les appareils mobiles avec aperçu en feuille inférieure
  - Déclencheurs d'accordéon tactiles (hauteur minimale de 44px)
- **Dialogue de bienvenue** : Les visiteurs pour la première fois voient un dialogue de bienvenue au lieu d'une carte statique
  - Peut être rouvert via « À propos » dans la barre latérale
- **Composants hérités supprimés** : Nettoyage des anciens composants basés sur des cartes
- Raccourcis clavier mis à jour pour fonctionner avec la nouvelle mise en page

### v3.2.1

- Ajout de l'historique de configuration avec fonctionnalité annuler/rétablir
  - Suivi automatique des modifications avec des instantanés différés (500ms)
  - Annuler/Rétablir avec les raccourcis clavier (`Ctrl/⌘ + Z` / `Ctrl/⌘ + Y`)
  - Panneau d'historique avec horodatages et descriptions des modifications
  - Vue diff pour comparer les configurations
  - Restauration vers n'importe quel état précédent
  - Stockage IndexedDB pour la persistance (max 50 entrées)
- Ajout du support DevContainer pour VS Code et GitHub Codespaces
  - Génération de la configuration `devcontainer.json`
  - Configuration des extensions et paramètres VS Code
  - Ajout des fonctionnalités Dev Container
  - Configuration de la redirection de ports
  - Configuration des commandes de cycle de vie (post-create, post-start, post-attach)
  - Recommandations automatiques d'extensions basées sur les logiciels sélectionnés
- Ajout du raccourci clavier `Ctrl/⌘ + 5` pour défiler vers la carte DevContainer
- Section d'accueil mise à jour avec la fonctionnalité DevContainer

### v3.1.2

- Ajout de raccourcis clavier pour les actions courantes (téléchargement, basculement de la prévisualisation, changement de thème, navigation entre les cartes, sélecteur de langue, réinitialisation)
- Ajout du dialogue d'aide des raccourcis clavier avec affichage groupé
- Ajout d'indications de raccourcis dans les info-bulles des boutons avec touches de modification adaptées au système
- Ajout d'une région ARIA live pour les annonces de lecteur d'écran lors des actions de raccourcis
- Ajout de l'import/export de configuration via fichiers JSON avec aperçu des différences et validation

### v3.0.0

- Suppression de la fonctionnalité des plugins de l'interface utilisateur

### v2.0.2

- Passage à l'installateur natif de Claude Code au lieu de npm
- Correction de l'installation des plugins officiels dans le Dockerfile

### v1.3.0

- Ajout de la documentation d'authentification

### v1.2.0

- Ajout de la documentation des arguments de build Docker à tous les READMEs
- Ajout de la documentation des URLs de téléchargement personnalisées pour les miroirs et proxies

### v1.1.1

- Ajout de l'affichage de la version dans l'en-tête
- Conversion du système i18n de JSON vers TypeScript avec interface typée
- Correction du changement de langue entre les fichiers README dans les téléchargements ZIP

### v1.0.0

- Version initiale
- Générateur de configuration Docker avec Dockerfile et docker-compose.yaml
- Sélection de logiciels (Go, Python, Rust, Flutter, TypeScript, ffmpeg, ImageMagick, uv)
- Paquets APT personnalisés, paquets NPM et commandes RUN
- Éditeur Markdown CLAUDE.md avec prévisualisation
- Éditeur de permissions settings.json (règles Allow, Ask, Deny)
- Configuration des variables d'environnement et fichiers protégés
- Génération de script de pare-feu réseau
- Téléchargement ZIP avec README généré automatiquement
- Support multilingue (18 langues)
- Thème sombre/clair avec détection automatique
- Sauvegarde automatique dans le localStorage
- Support PWA
- Workflow de publication GitHub Actions

## Soutien

Si vous trouvez ce projet utile, pensez à le soutenir :

- ⭐ Mettez une étoile au dépôt sur [GitHub](https://github.com/mkloubert/claude-initializr)
- 💝 [Faire un don via PayPal](https://paypal.me/mjkloubert)

## Licence

Licence MIT - voir [LICENSE](./LICENSE) pour les détails.

Copyright © 2026 Marcel Joachim Kloubert
