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

const fr: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Générez des fichiers de configuration Docker pour exécuter Claude Code en toute sécurité"
  },
  "welcome": {
    "close": "Fermer le message de bienvenue",
    "description": "Claude Code est le puissant assistant de codage IA d'Anthropic qui peut lire, écrire et exécuter du code directement sur votre machine. Bien qu'incroyablement utile, exécuter une IA avec un accès au système de fichiers et au terminal nécessite une attention particulière à la sécurité.",
    "purpose": "Cet outil génère une configuration Docker complète qui vous permet d'exécuter Claude Code dans un environnement de conteneur isolé. Votre code reste protégé tandis que Claude peut toujours vous aider à développer, déboguer et refactoriser.",
    "features": {
      "title": "Ce que vous pouvez configurer :",
      "dockerfile": "Choisissez les outils de développement à installer (TypeScript, Python, Go, ffmpeg, ImageMagick)",
      "compose": "Définissez des variables d'environnement (comme votre clé API) et protégez les fichiers sensibles",
      "claudeMd": "Écrivez des instructions spécifiques au projet que Claude lit au début de chaque session"
    },
    "security": {
      "title": "Fonctionnalités de sécurité incluses :",
      "firewall": "Pare-feu réseau n'autorisant que les connexions à l'API Anthropic, npm et GitHub",
      "isolation": "Isolation complète du système hôte et du réseau local",
      "readonly": "Fichiers sensibles montés en lecture seule et vides",
      "capabilities": "Toutes les capacités Linux supprimées, aucune escalade de privilèges autorisée"
    },
    "privacy": {
      "title": "Avis de confidentialité :",
      "description": "Vos paramètres sont stockés localement dans votre navigateur (localStorage) afin d'être conservés lors de votre retour. Pour des raisons de sécurité, les valeurs des variables d'environnement ne sont jamais stockées – seuls les noms des variables sont sauvegardés. Aucune donnée n'est envoyée à un serveur. Vous pouvez désactiver la sauvegarde automatique à tout moment via l'icône de sauvegarde dans l'en-tête – cela effacera également toutes les données stockées."
    }
  },
  "nav": {
    "header": "Navigation de l'en-tête"
  },
  "tabs": {
    "software": "Logiciels",
    "preview": "Aperçu",
    "settings": "Paramètres",
    "envVariables": "Environnement",
    "env": "Env.",
    "protectedFiles": "Fichiers protégés",
    "protected": "Protégés"
  },
  "language": {
    "switch": "Langue"
  },
  "theme": {
    "switch": "Changer de thème"
  },
  "autosave": {
    "enable": "Activer la sauvegarde automatique",
    "disable": "Désactiver la sauvegarde automatique"
  },
  "reset": {
    "button": "Réinitialiser par défaut",
    "title": "Réinitialiser les paramètres",
    "description": "Êtes-vous sûr de vouloir réinitialiser tous les paramètres à leurs valeurs par défaut ? Cette action est irréversible.",
    "cancel": "Annuler",
    "confirm": "Réinitialiser"
  },
  "software": {
    "baseImage": "Image de base",
    "baseImageDesc": "L'image de base Docker détermine la fondation de votre conteneur. L'image par défaut 'node' inclut Node.js et npm. Vous pouvez également utiliser des variantes comme 'node:22-slim' pour des images plus légères ou 'node:22-bookworm' pour des bibliothèques système supplémentaires.",
    "image": "Image",
    "typescript": "TypeScript",
    "typescriptDesc": "Installe le compilateur TypeScript (tsc) et ts-node pour exécuter TypeScript directement. Essentiel pour les projets TypeScript, permettant la vérification de types, la compilation en JavaScript et l'exécution de fichiers .ts sans compilation manuelle.",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "Un puissant framework multimédia pour traiter les fichiers audio et vidéo. Permet la conversion de format, l'édition vidéo, l'extraction audio, le streaming et l'analyse des médias. Requis pour les projets travaillant avec des fichiers multimédias.",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "Une suite complète de traitement d'images prenant en charge plus de 200 formats. Fournit des outils pour le redimensionnement, le recadrage, la conversion de format, le filigrane et la manipulation programmatique d'images. Idéal pour les workflows automatisés d'images.",
    "python": "Python 3",
    "pythonDesc": "Installe l'interpréteur Python 3 avec le gestionnaire de paquets pip. Permet d'exécuter des scripts Python, d'installer des paquets Python et d'utiliser des outils basés sur Python. Utile pour le traitement de données, les scripts et les tâches IA/ML.",
    "uv": "uv",
    "uvDesc": "Installe uv, un installateur et résolveur de paquets Python extrêmement rapide écrit en Rust. Il peut remplacer pip, pip-tools et virtualenv pour une gestion des dépendances plus rapide.",
    "golang": "Go",
    "golangDesc": "Installe le langage de programmation Go (Golang) avec le compilateur et les outils officiels. Idéal pour créer des programmes rapides compilés statiquement, des outils CLI, des serveurs web et des logiciels système.",
    "flutter": "Flutter",
    "flutterDesc": "Installe le SDK Flutter avec Dart et les outils de développement Android. Créez des applications multiplateformes pour mobile, web et bureau à partir d'une seule base de code. Inclut le SDK Android et les outils en ligne de commande.",
    "rust": "Rust",
    "rustDesc": "Installe le langage de programmation Rust avec le gestionnaire de paquets Cargo via rustup. Idéal pour créer des logiciels système rapides et sécurisés en mémoire, des outils CLI, WebAssembly et des applications embarquées.",
    "version": "Version",
    "latest": "dernière",
    "recommendsHint": "Recommandé : {{packages}}"
  },
  "aptPackages": {
    "title": "Paquets APT personnalisés",
    "description": "Ajoutez des paquets Debian/Ubuntu supplémentaires à installer dans le conteneur.",
    "placeholder": "Exemple : curl, graphviz, tree, sqlite3...",
    "add": "Ajouter des paquets",
    "remove": "Supprimer {{package}}"
  },
  "npmPackages": {
    "title": "Paquets NPM personnalisés",
    "description": "Ajoutez des paquets NPM supplémentaires à installer globalement dans le conteneur.",
    "placeholder": "Exemple : eslint, prettier, tsx...",
    "add": "Ajouter des paquets",
    "remove": "Supprimer {{package}}",
    "installAs": "Installer en tant que",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Changer l'utilisateur d'installation pour {{package}}"
  },
  "runCommands": {
    "title": "Commandes RUN personnalisées",
    "description": "Ajoutez des commandes shell personnalisées à exécuter lors de la construction de l'image Docker.",
    "placeholder": "Exemple : flutter doctor",
    "add": "Ajouter une commande",
    "remove": "Supprimer la commande",
    "runAs": "Exécuter en tant que",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Changer l'utilisateur d'exécution pour la commande"
  },
  "plugins": {
    "title": "Plugins Claude Code",
    "description": "Installez des plugins Claude Code depuis des marketplaces.",
    "placeholder": "nom-plugin@nom-marketplace",
    "add": "Ajouter un Plugin",
    "remove": "Supprimer le plugin",
    "formatHint": "Format : nom-plugin@nom-marketplace",
    "invalidFormat": "Format invalide. Utilisez plugin@marketplace",
    "suggestions": "Plugins suggérés",
    "loadingSuggestions": "Chargement des suggestions...",
    "addFromMarketplace": "Ajouter {{plugin}} depuis {{marketplace}}",
    "viewOnGitHub": "Voir {{plugin}} sur GitHub"
  },
  "env": {
    "description": "Aucune variable d'environnement définie.",
    "key": "Clé",
    "value": "Valeur",
    "add": "Ajouter une variable",
    "remove": "Supprimer",
    "keyPlaceholder": "Exemple : NOM_VARIABLE",
    "valuePlaceholder": "Exemple : valeur"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "Le fichier CLAUDE.md contient des instructions spécifiques au projet que Claude lit au début de chaque session. C'est l'endroit pour les directives de codage, les explications de la structure du projet, les technologies préférées ou tout autre contexte aidant Claude à mieux comprendre le projet."
  },
  "protectedFiles": {
    "description": "Aucun fichier protégé défini.",
    "path": "Chemin du fichier",
    "add": "Ajouter un chemin",
    "remove": "Supprimer",
    "pathPlaceholder": "Exemple : .env.local",
    "help": "Les chemins sont relatifs à /workspace/. Ces fichiers seront montés comme fichiers vides en lecture seule pour empêcher l'accès aux données sensibles."
  },
  "settings": {
    "title": "settings.json",
    "description": "Configurez les permissions de Claude Code pour contrôler quels fichiers peuvent être lus, modifiés ou récupérés. Les fichiers protégés sont automatiquement ajoutés comme règles de refus.",
    "permissions": "Permissions",
    "directive": "Directive",
    "pattern": "Motif",
    "patternPlaceholder": "Exemple : src/** ou .env",
    "addRule": "Ajouter une règle",
    "removeRule": "Supprimer la règle",
    "allow": "Autoriser",
    "ask": "Demander",
    "deny": "Refuser",
    "noAllowRules": "Aucune règle d'autorisation définie.",
    "noAskRules": "Aucune règle de demande définie.",
    "noDenyRules": "Aucune règle de refus définie.",
    "help": "Définissez des règles de permission pour les opérations Read(), Edit() et WebFetch(). Les motifs supportent la syntaxe glob comme src/** pour la correspondance récursive.",
    "learnMore": "En savoir plus"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "Le Dockerfile définit quels logiciels sont installés dans le conteneur. En plus de Node.js et Claude Code, des outils supplémentaires comme TypeScript, Python, Go, ffmpeg ou ImageMagick peuvent être inclus. Les logiciels sélectionnés seront disponibles lorsque Claude exécutera des commandes.",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "Le fichier docker-compose.yaml contrôle le démarrage du conteneur. Les variables d'environnement (comme les clés API) peuvent être définies ici. Les fichiers protégés sont montés comme fichiers vides en lecture seule pour empêcher Claude d'accéder aux données sensibles comme les fichiers .env."
  },
  "dockerCompose": {
    "platform": "Plateforme",
    "platformDesc": "Définissez une plateforme spécifique pour le conteneur (ex: linux/amd64). Laissez vide pour utiliser la plateforme par défaut. Utilisez ceci lorsque les images de base ne prennent pas en charge votre architecture.",
    "platformPlaceholder": "Exemple : linux/amd64"
  },
  "download": {
    "button": "Télécharger ZIP",
    "generating": "Génération...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "Dépôt GitHub",
    "paypal": "Soutenir via PayPal"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "anglais",
    "de": "allemand",
    "es": "espagnol",
    "fr": "français",
    "it": "italien",
    "pt": "portugais",
    "nl": "néerlandais",
    "ja": "japonais",
    "ko": "coréen",
    "zh": "chinois",
    "ar": "arabe",
    "he": "hébreu",
    "hi": "hindi",
    "ur": "ourdou",
    "uk": "ukrainien",
    "el": "grec",
    "pl": "polonais",
    "tr": "turc"
  },
  "errors": {
    "invalidEnvKey": "Nom de variable invalide. Utilisez uniquement des lettres, chiffres et underscores.",
    "duplicateEnvKey": "Ce nom de variable existe déjà.",
    "invalidPath": "Le chemin doit être relatif (sans / initial) et ne peut pas contenir .."
  },
  "readme": {
    "title": "Configuration Docker Claude Code",
    "generatedBy": "Généré avec [Claude Initializr]({{url}})",
    "languageSwitch": "Lire ceci en {{language}}",
    "intro": {
      "title": "À propos de cette configuration",
      "description": "Ce dossier contient des fichiers de configuration Docker pour exécuter Claude Code de manière sécurisée dans un conteneur isolé. La configuration fournit une isolation réseau, une protection des fichiers et un environnement sandbox pour le développement assisté par IA."
    },
    "files": {
      "title": "Aperçu des fichiers",
      "dockerfile": "Dockerfile - Définit l'image du conteneur avec tous les outils de développement",
      "dockerCompose": "docker-compose.yaml - Fichier d'orchestration pour démarrer le conteneur",
      "env": ".env - Variables d'environnement (ajoutez vos clés API ici)",
      "initFirewall": "init-firewall.sh - Script de pare-feu réseau pour la sécurité",
      "workspace": "workspace/ - Votre répertoire de travail monté dans le conteneur",
      "claudeMd": "workspace/CLAUDE.md - Instructions du projet pour Claude",
      "settingsJson": "workspace/.claude/settings.json - Paramètres de permissions Claude Code"
    },
    "baseImage": {
      "title": "Image de base",
      "description": "Cette configuration utilise l'image Docker de base suivante :",
      "dockerHub": "Voir sur Docker Hub"
    },
    "platform": {
      "title": "Plateforme",
      "description": "Le conteneur est configuré pour s'exécuter sur cette plateforme :"
    },
    "aptPackages": {
      "title": "Paquets système (APT)",
      "description": "Les paquets système suivants sont installés :"
    },
    "npmPackages": {
      "title": "Paquets NPM supplémentaires",
      "description": "Les paquets NPM supplémentaires suivants sont installés globalement :",
      "installedAs": "installé en tant que {{user}}"
    },
    "plugins": {
      "title": "Plugins Claude Code",
      "description": "Les plugins Claude Code suivants sont installés et activés :",
      "viewOnGitHub": "Voir sur GitHub"
    },
    "envVariables": {
      "title": "Variables d'environnement",
      "description": "Les variables d'environnement suivantes sont configurées (valeurs non affichées pour des raisons de sécurité) :",
      "note": "Ajoutez vos valeurs réelles au fichier .env avant de démarrer le conteneur."
    },
    "protectedFiles": {
      "title": "Fichiers protégés",
      "description": "Les fichiers suivants sont protégés et montés comme fichiers vides en lecture seule :"
    },
    "settingsJson": {
      "title": "Paramètres de permissions",
      "description": "Claude Code est configuré avec les règles de permission suivantes :",
      "allow": "Opérations autorisées (automatique)",
      "ask": "Opérations nécessitant confirmation",
      "deny": "Opérations refusées"
    },
    "claudeMd": {
      "title": "Instructions du projet",
      "description": "Les instructions spécifiques au projet pour Claude sont définies dans :"
    },
    "quickStart": {
      "title": "Démarrage rapide",
      "step1": "Installer Docker (voir Prérequis ci-dessous)",
      "step2": "Démarrer le conteneur :",
      "step2CustomVersions": "Optionnel : Compiler avec des versions de logiciels personnalisées (voir Docker Build Arguments ci-dessous) :",
      "step3": "Démarrer Claude Code :",
      "step4": "Arrêter le conteneur :",
      "note": "Votre dossier workspace est monté sur /workspace à l'intérieur du conteneur. Consultez la section Authentification ci-dessous pour les options de connexion."
    },
    "authentication": {
      "title": "Authentification",
      "description": "Claude Code prend en charge deux méthodes d'authentification. Choisissez celle qui correspond le mieux à vos besoins :",
      "apiKey": {
        "title": "Option 1 : Clé API",
        "description": "Définissez votre clé API dans le fichier `.env` (`ANTHROPIC_API_KEY`). Claude Code l'utilisera automatiquement.",
        "pros": [
          "Fonctionne dans les environnements headless/automatisés (CI/CD, conteneurs, SSH)",
          "Pas de navigateur requis",
          "Pas de limites d'utilisation (paiement à l'usage)",
          "Fiable dans tous les environnements"
        ],
        "cons": [
          "Coûte de l'argent par appel API (tarifs API standard)",
          "Nécessite de gérer et sécuriser la clé API",
          "Peut entraîner des frais inattendus sans limites de dépenses"
        ]
      },
      "browserLogin": {
        "title": "Option 2 : Connexion via navigateur (Claude Pro/Max/Team)",
        "description": "Exécutez `/login` dans Claude Code pour vous authentifier via le navigateur avec votre abonnement.",
        "pros": [
          "Inclus dans votre abonnement (coût mensuel prévisible)",
          "Pas de frais API supplémentaires",
          "Facturation unifiée avec Claude.ai"
        ],
        "cons": [
          "Nécessite un navigateur pour la première connexion",
          "A des limites d'utilisation réinitialisées chaque semaine",
          "L'authentification peut ne pas persister dans les conteneurs/sessions SSH"
        ]
      }
    },
    "buildArgs": {
      "title": "Docker Build Arguments",
      "description": "Vous pouvez configurer les versions de logiciels et les URLs de téléchargement lors de la compilation Docker. Utilisez `--build-arg NOM=VALEUR` pour remplacer les valeurs par défaut.",
      "versionArgs": {
        "title": "Arguments de version",
        "description": "Contrôlez quelles versions de logiciels sont installées :"
      },
      "urlArgs": {
        "title": "Arguments d'URL",
        "description": "Remplacez les URLs de téléchargement pour les miroirs ou proxies :"
      },
      "defaultValue": "Par défaut",
      "example": "Exemple avec des versions personnalisées :"
    },
    "prerequisites": {
      "title": "Prérequis",
      "description": "Vous avez besoin de Docker installé sur votre système. Choisissez votre système d'exploitation :",
      "windows": {
        "title": "Windows",
        "steps": [
          "Téléchargez Docker Desktop depuis docker.com/products/docker-desktop",
          "Exécutez l'installateur et suivez l'assistant de configuration",
          "Activez le backend WSL 2 lorsque demandé (recommandé)",
          "Redémarrez votre ordinateur si nécessaire",
          "Ouvrez Docker Desktop et attendez qu'il démarre"
        ],
        "link": "Guide d'installation officiel pour Windows"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "Téléchargez Docker Desktop depuis docker.com/products/docker-desktop",
          "Ouvrez le fichier .dmg et glissez Docker dans Applications",
          "Ouvrez Docker depuis le dossier Applications",
          "Accordez les permissions requises lorsque demandé",
          "Attendez que Docker finisse de démarrer (icône baleine dans la barre de menu)"
        ],
        "link": "Guide d'installation officiel pour macOS"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "Mettez à jour l'index des paquets : sudo apt update",
          "Installez Docker : sudo apt install docker.io docker-compose-v2",
          "Ajoutez votre utilisateur au groupe docker : sudo usermod -aG docker $USER",
          "Déconnectez-vous et reconnectez-vous pour que les changements de groupe prennent effet",
          "Vérifiez l'installation : docker --version"
        ],
        "link": "Guide d'installation officiel pour Linux",
        "altNote": "Ou installez Docker Desktop pour une expérience avec interface graphique."
      }
    },
    "troubleshooting": {
      "title": "Dépannage",
      "issues": {
        "containerNotStarting": {
          "title": "Le conteneur ne démarre pas",
          "solutions": [
            "Vérifiez si Docker est en cours d'exécution : docker info",
            "Vérifiez que le fichier .env existe et contient ANTHROPIC_API_KEY",
            "Vérifiez les conflits de ports : docker ps",
            "Consultez les logs du conteneur : docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "Erreurs de permission refusée",
          "solutions": [
            "Sur Linux, assurez-vous que votre utilisateur est dans le groupe docker",
            "Essayez d'exécuter avec sudo (non recommandé pour une utilisation régulière)",
            "Vérifiez les permissions des fichiers dans le dossier workspace"
          ]
        },
        "networkIssues": {
          "title": "Problèmes de réseau ou de connexion API",
          "solutions": [
            "Le script de pare-feu n'autorise que des domaines spécifiques",
            "Assurez-vous que api.anthropic.com est accessible depuis votre réseau",
            "Vérifiez les logs du pare-feu à l'intérieur du conteneur : sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "Fichiers non accessibles dans le conteneur",
          "solutions": [
            "Les fichiers protégés sont intentionnellement vides - c'est attendu",
            "Vérifiez les montages de volumes dans docker-compose.yaml",
            "Assurez-vous que le dossier workspace existe sur l'hôte"
          ]
        }
      }
    },
    "links": {
      "title": "Liens",
      "initializer": "Générer une nouvelle configuration",
      "documentation": "Documentation Claude Code",
      "support": "Signaler des problèmes"
    },
    "author": {
      "title": "Auteur",
      "createdBy": "Créé par",
      "support": "Soutenir ce projet"
    },
    "software": {
      "title": "Logiciels installés",
      "description": "Les outils de développement suivants sont installés :"
    }
  }
};

export default fr;
