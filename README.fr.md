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
  - ImageMagick (traitement d'images)
  - Python 3 (avec sélection de version)
  - TypeScript (avec sélection de version)
  - uv (installateur de paquets Python rapide, recommande Python)
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

### Fonctionnalités générales

- **Prévisualisation en direct** : Visualisez les aperçus en temps réel des fichiers de configuration générés
- **Téléchargement ZIP** : Téléchargez tous les fichiers sous forme d'archive ZIP prête à l'emploi
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

7. **Prévisualiser** : Vérifiez les fichiers de configuration générés dans les onglets de prévisualisation

8. **Télécharger** : Cliquez sur "Télécharger ZIP" pour obtenir tous les fichiers

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

1. Créez un nouveau fichier de locale dans `src/i18n/locales/` (par ex., `fr.json`)
2. Copiez la structure depuis `en.json`
3. Traduisez toutes les chaînes
4. Ajoutez la langue à `src/i18n/index.ts`
5. Ajoutez l'option de langue à `LanguageSwitcher.tsx`

## Accessibilité

Cette application est conçue pour être entièrement accessible :

- Structure HTML sémantique (`<header>`, `<main>`, `<footer>`)
- Labels ARIA sur tous les éléments interactifs
- Support de la navigation au clavier
- Compatible avec les lecteurs d'écran
- Schémas de couleurs à contraste élevé
- Indicateurs de focus sur les éléments interactifs

## Soutien

Si vous trouvez ce projet utile, pensez à le soutenir :

- ⭐ Mettez une étoile au dépôt sur [GitHub](https://github.com/mkloubert/claude-initializr)
- 💝 [Faire un don via PayPal](https://paypal.me/mjkloubert)

## Licence

Licence MIT - voir [LICENSE](./LICENSE) pour les détails.

Copyright © 2026 Marcel Joachim Kloubert
