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

const el: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Δημιουργήστε αρχεία διαμόρφωσης Docker για ασφαλή εκτέλεση του Claude Code"
  },
  "welcome": {
    "close": "Κλείσιμο μηνύματος καλωσορίσματος",
    "description": "Το Claude Code είναι ο ισχυρός βοηθός προγραμματισμού AI της Anthropic που μπορεί να διαβάσει, να γράψει και να εκτελέσει κώδικα απευθείας στον υπολογιστή σας. Αν και απίστευτα χρήσιμο, η εκτέλεση AI με πρόσβαση στο σύστημα αρχείων και το τερματικό απαιτεί προσεκτική εξέταση της ασφάλειας.",
    "purpose": "Αυτό το εργαλείο δημιουργεί μια πλήρη διαμόρφωση Docker που σας επιτρέπει να εκτελείτε το Claude Code σε απομονωμένο περιβάλλον container. Ο κώδικάς σας παραμένει προστατευμένος ενώ ο Claude μπορεί ακόμα να σας βοηθήσει να αναπτύξετε, να αποσφαλματώσετε και να αναδιαμορφώσετε.",
    "features": {
      "title": "Τι μπορείτε να διαμορφώσετε:",
      "dockerfile": "Επιλέξτε ποια εργαλεία ανάπτυξης να εγκαταστήσετε (TypeScript, Python, Go, ffmpeg, ImageMagick)",
      "compose": "Ορίστε μεταβλητές περιβάλλοντος (όπως το κλειδί API σας) και προστατέψτε ευαίσθητα αρχεία από πρόσβαση",
      "claudeMd": "Γράψτε οδηγίες συγκεκριμένες για το έργο που ο Claude διαβάζει στην αρχή κάθε συνεδρίας"
    },
    "security": {
      "title": "Συμπεριλαμβανόμενες λειτουργίες ασφάλειας:",
      "firewall": "Τείχος προστασίας δικτύου που επιτρέπει μόνο συνδέσεις στο Anthropic API, npm και GitHub",
      "isolation": "Πλήρης απομόνωση από το σύστημα κεντρικού υπολογιστή και το τοπικό δίκτυο",
      "readonly": "Ευαίσθητα αρχεία προσαρτημένα ως κενά αρχεία μόνο για ανάγνωση",
      "capabilities": "Όλες οι δυνατότητες Linux αφαιρέθηκαν, δεν επιτρέπεται κλιμάκωση δικαιωμάτων"
    },
    "privacy": {
      "title": "Σημείωση απορρήτου:",
      "description": "Οι ρυθμίσεις σας αποθηκεύονται τοπικά στο πρόγραμμα περιήγησής σας (localStorage) ώστε να διατηρούνται όταν επιστρέφετε. Για λόγους ασφαλείας, οι τιμές των μεταβλητών περιβάλλοντος δεν αποθηκεύονται ποτέ – αποθηκεύονται μόνο τα ονόματα των μεταβλητών. Δεν αποστέλλονται δεδομένα σε κανέναν διακομιστή. Μπορείτε να απενεργοποιήσετε την αυτόματη αποθήκευση ανά πάσα στιγμή χρησιμοποιώντας το εικονίδιο αποθήκευσης στην κεφαλίδα – αυτό θα διαγράψει επίσης όλα τα αποθηκευμένα δεδομένα."
    }
  },
  "nav": {
    "header": "Πλοήγηση κεφαλίδας"
  },
  "tabs": {
    "software": "Λογισμικό",
    "preview": "Προεπισκόπηση",
    "settings": "Ρυθμίσεις",
    "envVariables": "Περιβάλλον",
    "env": "Περιβ.",
    "protectedFiles": "Προστατευμένα αρχεία",
    "protected": "Προστατ."
  },
  "language": {
    "switch": "Γλώσσα"
  },
  "theme": {
    "switch": "Εναλλαγή θέματος"
  },
  "autosave": {
    "enable": "Ενεργοποίηση αυτόματης αποθήκευσης",
    "disable": "Απενεργοποίηση αυτόματης αποθήκευσης"
  },
  "reset": {
    "button": "Επαναφορά στις προεπιλογές",
    "title": "Επαναφορά ρυθμίσεων",
    "description": "Είστε βέβαιοι ότι θέλετε να επαναφέρετε όλες τις ρυθμίσεις στις προεπιλεγμένες τιμές τους; Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.",
    "cancel": "Ακύρωση",
    "confirm": "Επαναφορά"
  },
  "software": {
    "baseImage": "Βασική εικόνα",
    "baseImageDesc": "Η βασική εικόνα Docker καθορίζει τη βάση του container σας. Η προεπιλεγμένη εικόνα 'node' περιλαμβάνει Node.js και npm. Μπορείτε επίσης να χρησιμοποιήσετε παραλλαγές όπως 'node:22-slim' για μικρότερες εικόνες ή 'node:22-bookworm' για επιπλέον βιβλιοθήκες συστήματος.",
    "image": "Εικόνα",
    "typescript": "TypeScript",
    "typescriptDesc": "Εγκαθιστά τον μεταγλωττιστή TypeScript (tsc) και το ts-node για απευθείας εκτέλεση TypeScript. Απαραίτητο για έργα TypeScript, επιτρέπει έλεγχο τύπων, μεταγλώττιση σε JavaScript και εκτέλεση αρχείων .ts χωρίς χειροκίνητη μεταγλώττιση.",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "Ένα ισχυρό πλαίσιο πολυμέσων για επεξεργασία αρχείων ήχου και βίντεο. Επιτρέπει μετατροπή μορφής, επεξεργασία βίντεο, εξαγωγή ήχου, streaming και ανάλυση πολυμέσων. Απαιτείται για έργα που εργάζονται με αρχεία πολυμέσων.",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "Μια ολοκληρωμένη σουίτα επεξεργασίας εικόνας που υποστηρίζει πάνω από 200 μορφές. Παρέχει εργαλεία για αλλαγή μεγέθους, περικοπή, μετατροπή μορφής, υδατογράφημα και προγραμματιστική επεξεργασία εικόνων. Ιδανικό για αυτοματοποιημένες ροές εργασίας εικόνων.",
    "python": "Python 3",
    "pythonDesc": "Εγκαθιστά τον διερμηνευτή Python 3 με τον διαχειριστή πακέτων pip. Επιτρέπει την εκτέλεση σεναρίων Python, την εγκατάσταση πακέτων Python και τη χρήση εργαλείων βασισμένων σε Python. Χρήσιμο για επεξεργασία δεδομένων, scripting και εργασίες AI/ML.",
    "uv": "uv",
    "uvDesc": "Εγκαθιστά το uv, έναν εξαιρετικά γρήγορο εγκαταστάτη και resolver πακέτων Python γραμμένο σε Rust. Μπορεί να αντικαταστήσει pip, pip-tools και virtualenv για ταχύτερη διαχείριση εξαρτήσεων.",
    "golang": "Go",
    "golangDesc": "Εγκαθιστά τη γλώσσα προγραμματισμού Go (Golang) με τον επίσημο μεταγλωττιστή και εργαλεία. Ιδανικό για τη δημιουργία γρήγορων, στατικά μεταγλωττισμένων προγραμμάτων, εργαλείων CLI, διακομιστών web και λογισμικού συστήματος.",
    "flutter": "Flutter",
    "flutterDesc": "Εγκαθιστά το Flutter SDK με Dart και εργαλεία ανάπτυξης Android. Δημιουργήστε εφαρμογές πολλαπλών πλατφορμών για κινητά, web και desktop από μία βάση κώδικα. Περιλαμβάνει Android SDK και εργαλεία γραμμής εντολών.",
    "rust": "Rust",
    "rustDesc": "Εγκαθιστά τη γλώσσα προγραμματισμού Rust με τον διαχειριστή πακέτων Cargo μέσω rustup. Ιδανικό για τη δημιουργία γρήγορου, ασφαλούς για τη μνήμη λογισμικού συστήματος, εργαλείων CLI, WebAssembly και ενσωματωμένων εφαρμογών.",
    "version": "Έκδοση",
    "latest": "τελευταία",
    "recommendsHint": "Συνιστάται: {{packages}}"
  },
  "aptPackages": {
    "title": "Προσαρμοσμένα πακέτα APT",
    "description": "Προσθέστε επιπλέον πακέτα Debian/Ubuntu για εγκατάσταση στο container.",
    "placeholder": "Παράδειγμα: curl, graphviz, tree, sqlite3...",
    "add": "Προσθήκη πακέτων",
    "remove": "Αφαίρεση {{package}}"
  },
  "npmPackages": {
    "title": "Προσαρμοσμένα πακέτα NPM",
    "description": "Προσθέστε επιπλέον πακέτα NPM για καθολική εγκατάσταση στο container.",
    "placeholder": "Παράδειγμα: eslint, prettier, tsx...",
    "add": "Προσθήκη πακέτων",
    "remove": "Αφαίρεση {{package}}",
    "installAs": "Εγκατάσταση ως",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Εναλλαγή χρήστη εγκατάστασης για {{package}}"
  },
  "runCommands": {
    "title": "Προσαρμοσμένες εντολές RUN",
    "description": "Προσθέστε προσαρμοσμένες εντολές shell για εκτέλεση κατά τη δημιουργία της εικόνας Docker.",
    "placeholder": "Παράδειγμα: flutter doctor",
    "add": "Προσθήκη εντολής",
    "remove": "Αφαίρεση εντολής",
    "runAs": "Εκτέλεση ως",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Εναλλαγή χρήστη εκτέλεσης για την εντολή"
  },
  "env": {
    "description": "Δεν έχουν οριστεί μεταβλητές περιβάλλοντος.",
    "key": "Κλειδί",
    "value": "Τιμή",
    "add": "Προσθήκη μεταβλητής",
    "remove": "Αφαίρεση",
    "keyPlaceholder": "Παράδειγμα: ONOMA_METAVLITIS",
    "valuePlaceholder": "Παράδειγμα: τιμή"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "Το αρχείο CLAUDE.md περιέχει οδηγίες συγκεκριμένες για το έργο που ο Claude διαβάζει στην αρχή κάθε συνεδρίας. Αυτό είναι το μέρος για οδηγίες κωδικοποίησης, επεξηγήσεις της δομής του έργου, προτιμώμενες τεχνολογίες ή οποιοδήποτε άλλο πλαίσιο που βοηθά τον Claude να κατανοήσει καλύτερα το έργο."
  },
  "protectedFiles": {
    "description": "Δεν έχουν οριστεί προστατευμένα αρχεία.",
    "path": "Διαδρομή αρχείου",
    "add": "Προσθήκη διαδρομής",
    "remove": "Αφαίρεση",
    "pathPlaceholder": "Παράδειγμα: .env.local",
    "help": "Οι διαδρομές είναι σχετικές με /workspace/. Αυτά τα αρχεία θα προσαρτηθούν ως κενά αρχεία μόνο για ανάγνωση για να αποτρέψουν την πρόσβαση σε ευαίσθητα δεδομένα."
  },
  "settings": {
    "title": "settings.json",
    "description": "Διαμορφώστε τα δικαιώματα του Claude Code για να ελέγξετε ποια αρχεία μπορούν να διαβαστούν, να επεξεργαστούν ή να ανακτηθούν. Τα προστατευμένα αρχεία προστίθενται αυτόματα ως κανόνες απόρριψης.",
    "permissions": "Δικαιώματα",
    "directive": "Οδηγία",
    "pattern": "Μοτίβο",
    "patternPlaceholder": "Παράδειγμα: src/** ή .env",
    "addRule": "Προσθήκη κανόνα",
    "removeRule": "Αφαίρεση κανόνα",
    "allow": "Επιτρέπεται",
    "ask": "Ερώτηση",
    "deny": "Απόρριψη",
    "noAllowRules": "Δεν έχουν οριστεί κανόνες επιτρέπεται.",
    "noAskRules": "Δεν έχουν οριστεί κανόνες ερώτησης.",
    "noDenyRules": "Δεν έχουν οριστεί κανόνες απόρριψης.",
    "help": "Ορίστε κανόνες δικαιωμάτων για λειτουργίες Read(), Edit() και WebFetch(). Τα μοτίβα υποστηρίζουν σύνταξη glob όπως src/** για αναδρομική αντιστοίχιση.",
    "learnMore": "Μάθετε περισσότερα"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "Το Dockerfile ορίζει ποιο λογισμικό εγκαθίσταται στο container. Εκτός από το Node.js και το Claude Code, μπορούν να συμπεριληφθούν επιπλέον εργαλεία όπως TypeScript, Python, Go, ffmpeg ή ImageMagick. Το επιλεγμένο λογισμικό θα είναι διαθέσιμο όταν ο Claude εκτελεί εντολές.",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "Το αρχείο docker-compose.yaml ελέγχει πώς ξεκινά το container. Οι μεταβλητές περιβάλλοντος (όπως τα κλειδιά API) μπορούν να οριστούν εδώ. Τα προστατευμένα αρχεία προσαρτώνται ως κενά αρχεία μόνο για ανάγνωση για να αποτρέψουν τον Claude από την πρόσβαση σε ευαίσθητα δεδομένα όπως αρχεία .env."
  },
  "dockerCompose": {
    "platform": "Πλατφόρμα",
    "platformDesc": "Ορίστε μια συγκεκριμένη πλατφόρμα για το container (π.χ. linux/amd64). Αφήστε κενό για να χρησιμοποιήσετε την προεπιλεγμένη πλατφόρμα. Χρησιμοποιήστε το όταν οι βασικές εικόνες δεν υποστηρίζουν την αρχιτεκτονική σας.",
    "platformPlaceholder": "Παράδειγμα: linux/amd64"
  },
  "download": {
    "button": "Λήψη ZIP",
    "generating": "Δημιουργία...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "Αποθετήριο GitHub",
    "paypal": "Υποστήριξη μέσω PayPal"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "Αγγλικά",
    "de": "Γερμανικά",
    "es": "Ισπανικά",
    "fr": "Γαλλικά",
    "it": "Ιταλικά",
    "pt": "Πορτογαλικά",
    "nl": "Ολλανδικά",
    "ja": "Ιαπωνικά",
    "ko": "Κορεατικά",
    "zh": "Κινεζικά",
    "ar": "Αραβικά",
    "he": "Εβραϊκά",
    "hi": "Χίντι",
    "ur": "Ούρντου",
    "uk": "Ουκρανικά",
    "el": "Ελληνικά",
    "pl": "Πολωνικά",
    "tr": "Τουρκικά"
  },
  "importExport": {
    "exportButton": "Εξαγωγή ρυθμίσεων",
    "importButton": "Εισαγωγή ρυθμίσεων",
    "exportSuccess": "Οι ρυθμίσεις εξήχθησαν επιτυχώς.",
    "importSuccess": "Οι ρυθμίσεις εισήχθησαν επιτυχώς.",
    "importErrorInvalidFile": "Μη έγκυρη μορφή αρχείου. Επιλέξτε ένα έγκυρο αρχείο JSON.",
    "importErrorValidation": "Το αρχείο περιέχει μη έγκυρα δεδομένα ρυθμίσεων.",
    "importErrorRead": "Δεν ήταν δυνατή η ανάγνωση του αρχείου. Δοκιμάστε ξανά.",
    "importConfirmTitle": "Εισαγωγή ρυθμίσεων",
    "importConfirmDescription": "Αυτό θα αντικαταστήσει τις τρέχουσες ρυθμίσεις σας. Αυτή η ενέργεια δεν μπορεί να αναιρεθεί.",
    "importConfirmApply": "Εφαρμογή",
    "importConfirmCancel": "Ακύρωση",
    "diffTitle": "Προεπισκόπηση αλλαγών",
    "diffBaseImage": "Βασική εικόνα",
    "diffNodeVersion": "Έκδοση Node",
    "diffDockerPlatform": "Πλατφόρμα Docker",
    "diffSoftware": "Λογισμικό",
    "diffAptPackages": "Πακέτα APT",
    "diffNpmPackages": "Πακέτα NPM",
    "diffRunCommands": "Εντολές RUN",
    "diffEnvVariables": "Μεταβλητές περιβάλλοντος",
    "diffProtectedFiles": "Προστατευμένα αρχεία",
    "diffClaudeMd": "CLAUDE.md",
    "diffPermissions": "Δικαιώματα",
    "diffNoChanges": "Δεν εντοπίστηκαν αλλαγές.",
    "diffCurrent": "Τρέχον",
    "diffImported": "Εισαγόμενο",
    "diffChanged": "Αλλαγμένο",
    "diffUnchanged": "Αμετάβλητο"
  },
  "errors": {
    "invalidEnvKey": "Μη έγκυρο όνομα μεταβλητής. Χρησιμοποιήστε μόνο γράμματα, αριθμούς και κάτω παύλες.",
    "duplicateEnvKey": "Αυτό το όνομα μεταβλητής υπάρχει ήδη.",
    "invalidPath": "Η διαδρομή πρέπει να είναι σχετική (χωρίς αρχικό /) και δεν μπορεί να περιέχει .."
  },
  "readme": {
    "title": "Διαμόρφωση Docker για Claude Code",
    "generatedBy": "Δημιουργήθηκε από το [Claude Initializr]({{url}})",
    "languageSwitch": "Διαβάστε αυτό στα {{language}}",
    "intro": {
      "title": "Σχετικά με αυτή τη διαμόρφωση",
      "description": "Αυτός ο φάκελος περιέχει αρχεία διαμόρφωσης Docker για ασφαλή εκτέλεση του Claude Code σε απομονωμένο container. Η διαμόρφωση παρέχει απομόνωση δικτύου, προστασία αρχείων και περιβάλλον sandbox για ανάπτυξη με υποστήριξη AI."
    },
    "files": {
      "title": "Επισκόπηση αρχείων",
      "dockerfile": "Dockerfile - Ορίζει την εικόνα container με όλα τα εργαλεία ανάπτυξης",
      "dockerCompose": "docker-compose.yaml - Αρχείο ενορχήστρωσης για εκκίνηση του container",
      "env": ".env - Μεταβλητές περιβάλλοντος (προσθέστε τα κλειδιά API σας εδώ)",
      "initFirewall": "init-firewall.sh - Σενάριο τείχους προστασίας δικτύου για ασφάλεια",
      "workspace": "workspace/ - Ο κατάλογος εργασίας σας προσαρτημένος στο container",
      "claudeMd": "workspace/CLAUDE.md - Οδηγίες έργου για τον Claude",
      "settingsJson": "workspace/.claude/settings.json - Ρυθμίσεις δικαιωμάτων Claude Code"
    },
    "baseImage": {
      "title": "Βασική εικόνα",
      "description": "Αυτή η διαμόρφωση χρησιμοποιεί την ακόλουθη βασική εικόνα Docker:",
      "dockerHub": "Προβολή στο Docker Hub"
    },
    "platform": {
      "title": "Πλατφόρμα",
      "description": "Το container έχει ρυθμιστεί να εκτελείται σε αυτή την πλατφόρμα:"
    },
    "aptPackages": {
      "title": "Πακέτα συστήματος (APT)",
      "description": "Τα ακόλουθα πακέτα συστήματος είναι εγκατεστημένα:"
    },
    "npmPackages": {
      "title": "Επιπλέον πακέτα NPM",
      "description": "Τα ακόλουθα επιπλέον πακέτα NPM είναι εγκατεστημένα καθολικά:",
      "installedAs": "εγκατεστημένο ως {{user}}"
    },
    "envVariables": {
      "title": "Μεταβλητές περιβάλλοντος",
      "description": "Οι ακόλουθες μεταβλητές περιβάλλοντος είναι διαμορφωμένες (οι τιμές δεν εμφανίζονται για λόγους ασφαλείας):",
      "note": "Προσθέστε τις πραγματικές σας τιμές στο αρχείο .env πριν ξεκινήσετε το container."
    },
    "protectedFiles": {
      "title": "Προστατευμένα αρχεία",
      "description": "Τα ακόλουθα αρχεία είναι προστατευμένα και προσαρτημένα ως κενά αρχεία μόνο για ανάγνωση για αποτροπή πρόσβασης:"
    },
    "settingsJson": {
      "title": "Ρυθμίσεις δικαιωμάτων",
      "description": "Το Claude Code έχει ρυθμιστεί με τους ακόλουθους κανόνες δικαιωμάτων:",
      "allow": "Επιτρεπόμενες λειτουργίες (αυτόματα)",
      "ask": "Λειτουργίες που απαιτούν επιβεβαίωση",
      "deny": "Απορριπτόμενες λειτουργίες"
    },
    "claudeMd": {
      "title": "Οδηγίες έργου",
      "description": "Οι οδηγίες συγκεκριμένες για το έργο για τον Claude ορίζονται σε:"
    },
    "quickStart": {
      "title": "Γρήγορη εκκίνηση",
      "step1": "Εγκαταστήστε το Docker (δείτε Προαπαιτούμενα παρακάτω)",
      "step2": "Εκκινήστε το container:",
      "step2CustomVersions": "Προαιρετικά: Κατασκευάστε με προσαρμοσμένες εκδόσεις λογισμικού (δείτε Docker Build Arguments παρακάτω):",
      "step3": "Εκκινήστε το Claude Code:",
      "step4": "Σταματήστε το container:",
      "note": "Ο φάκελος workspace σας είναι προσαρτημένος στο /workspace μέσα στο container. Δείτε την ενότητα Πιστοποίηση παρακάτω για επιλογές σύνδεσης."
    },
    "authentication": {
      "title": "Πιστοποίηση",
      "description": "Το Claude Code υποστηρίζει δύο μεθόδους πιστοποίησης. Επιλέξτε αυτή που ταιριάζει καλύτερα στις ανάγκες σας:",
      "apiKey": {
        "title": "Επιλογή 1: Κλειδί API",
        "description": "Ορίστε το κλειδί API στο αρχείο `.env` (`ANTHROPIC_API_KEY`). Το Claude Code θα το χρησιμοποιήσει αυτόματα.",
        "pros": [
          "Λειτουργεί σε headless/αυτοματοποιημένα περιβάλλοντα (CI/CD, containers, SSH)",
          "Δεν απαιτείται πρόγραμμα περιήγησης",
          "Χωρίς όρια χρήσης (πληρωμή ανά χρήση)",
          "Αξιόπιστο σε όλα τα περιβάλλοντα"
        ],
        "cons": [
          "Κοστίζει χρήματα ανά κλήση API (τυπικές τιμές API)",
          "Πρέπει να διαχειριστείτε και να ασφαλίσετε το κλειδί API",
          "Μπορεί να οδηγήσει σε απροσδόκητες χρεώσεις χωρίς όρια δαπανών"
        ]
      },
      "browserLogin": {
        "title": "Επιλογή 2: Σύνδεση μέσω προγράμματος περιήγησης (Claude Pro/Max/Team)",
        "description": "Εκτελέστε `/login` μέσα στο Claude Code για πιστοποίηση μέσω προγράμματος περιήγησης με τη συνδρομή σας.",
        "pros": [
          "Περιλαμβάνεται στη συνδρομή σας (προβλέψιμο μηνιαίο κόστος)",
          "Χωρίς επιπλέον κόστη API",
          "Ενοποιημένη χρέωση με το Claude.ai"
        ],
        "cons": [
          "Απαιτεί πρόγραμμα περιήγησης για την αρχική σύνδεση",
          "Έχει όρια χρήσης που επαναφέρονται εβδομαδιαία",
          "Η πιστοποίηση μπορεί να μη διατηρείται σε containers/συνεδρίες SSH"
        ]
      }
    },
    "buildArgs": {
      "title": "Docker Build Arguments",
      "description": "Μπορείτε να διαμορφώσετε εκδόσεις λογισμικού και URL λήψης κατά τη διάρκεια της κατασκευής Docker. Χρησιμοποιήστε `--build-arg ΟΝΟΜΑ=ΤΙΜΗ` για να αντικαταστήσετε τις προεπιλεγμένες τιμές.",
      "versionArgs": {
        "title": "Ορίσματα έκδοσης",
        "description": "Ελέγξτε ποιες εκδόσεις λογισμικού εγκαθίστανται:"
      },
      "urlArgs": {
        "title": "Ορίσματα URL",
        "description": "Αντικαταστήστε τα URL λήψης για mirrors ή proxies:"
      },
      "defaultValue": "Προεπιλογή",
      "example": "Παράδειγμα με προσαρμοσμένες εκδόσεις:"
    },
    "prerequisites": {
      "title": "Προαπαιτούμενα",
      "description": "Χρειάζεστε εγκατεστημένο Docker στο σύστημά σας. Επιλέξτε το λειτουργικό σας σύστημα:",
      "windows": {
        "title": "Windows",
        "steps": [
          "Κατεβάστε το Docker Desktop από docker.com/products/docker-desktop",
          "Εκτελέστε τον εγκαταστάτη και ακολουθήστε τον οδηγό ρύθμισης",
          "Ενεργοποιήστε το WSL 2 backend όταν σας ζητηθεί (συνιστάται)",
          "Επανεκκινήστε τον υπολογιστή σας αν απαιτείται",
          "Ανοίξτε το Docker Desktop και περιμένετε να ξεκινήσει"
        ],
        "link": "Επίσημος οδηγός εγκατάστασης Windows"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "Κατεβάστε το Docker Desktop από docker.com/products/docker-desktop",
          "Ανοίξτε το αρχείο .dmg και σύρετε το Docker στις Εφαρμογές",
          "Ανοίξτε το Docker από τον φάκελο Εφαρμογές",
          "Παραχωρήστε τα απαιτούμενα δικαιώματα όταν σας ζητηθεί",
          "Περιμένετε να ολοκληρωθεί η εκκίνηση του Docker (εικονίδιο φάλαινας στη γραμμή μενού)"
        ],
        "link": "Επίσημος οδηγός εγκατάστασης macOS"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "Ενημερώστε τον δείκτη πακέτων: sudo apt update",
          "Εγκαταστήστε το Docker: sudo apt install docker.io docker-compose-v2",
          "Προσθέστε τον χρήστη σας στην ομάδα docker: sudo usermod -aG docker $USER",
          "Αποσυνδεθείτε και συνδεθείτε ξανά για να ισχύσουν οι αλλαγές ομάδας",
          "Επαληθεύστε την εγκατάσταση: docker --version"
        ],
        "link": "Επίσημος οδηγός εγκατάστασης Linux",
        "altNote": "Ή εγκαταστήστε το Docker Desktop για εμπειρία GUI."
      }
    },
    "troubleshooting": {
      "title": "Αντιμετώπιση προβλημάτων",
      "issues": {
        "containerNotStarting": {
          "title": "Το container δεν ξεκινά",
          "solutions": [
            "Ελέγξτε αν το Docker εκτελείται: docker info",
            "Επαληθεύστε ότι το αρχείο .env υπάρχει και περιέχει ANTHROPIC_API_KEY",
            "Ελέγξτε για συγκρούσεις θυρών: docker ps",
            "Δείτε τα αρχεία καταγραφής του container: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "Σφάλματα άρνησης δικαιώματος",
          "solutions": [
            "Σε Linux, βεβαιωθείτε ότι ο χρήστης σας είναι στην ομάδα docker",
            "Δοκιμάστε να εκτελέσετε με sudo (δεν συνιστάται για κανονική χρήση)",
            "Ελέγξτε τα δικαιώματα αρχείων στον φάκελο workspace"
          ]
        },
        "networkIssues": {
          "title": "Προβλήματα δικτύου ή σύνδεσης API",
          "solutions": [
            "Το σενάριο τείχους προστασίας επιτρέπει μόνο συγκεκριμένους τομείς",
            "Βεβαιωθείτε ότι το api.anthropic.com είναι προσβάσιμο από το δίκτυό σας",
            "Ελέγξτε τα αρχεία καταγραφής τείχους προστασίας μέσα στο container: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "Τα αρχεία δεν είναι προσβάσιμα στο container",
          "solutions": [
            "Τα προστατευμένα αρχεία είναι σκόπιμα κενά - αυτό είναι αναμενόμενο",
            "Ελέγξτε τις προσαρτήσεις τόμων στο docker-compose.yaml",
            "Βεβαιωθείτε ότι ο φάκελος workspace υπάρχει στον κεντρικό υπολογιστή"
          ]
        }
      }
    },
    "links": {
      "title": "Σύνδεσμοι",
      "initializer": "Δημιουργία νέας διαμόρφωσης",
      "documentation": "Τεκμηρίωση Claude Code",
      "support": "Αναφορά προβλημάτων"
    },
    "author": {
      "title": "Συγγραφέας",
      "createdBy": "Δημιουργήθηκε από",
      "support": "Υποστηρίξτε αυτό το έργο"
    },
    "software": {
      "title": "Εγκατεστημένο λογισμικό",
      "description": "Τα ακόλουθα εργαλεία ανάπτυξης είναι εγκατεστημένα:"
    }
  },
  "keyboardShortcuts": {
    "title": "Συντομεύσεις πληκτρολογίου",
    "description": "Χρησιμοποιήστε συντομεύσεις πληκτρολογίου για γρήγορη πλοήγηση και εκτέλεση ενεργειών.",
    "openHelp": "Συντομεύσεις πληκτρολογίου",
    "categories": {
      "navigation": "Πλοήγηση",
      "actions": "Ενέργειες"
    },
    "shortcuts": {
      "downloadZip": "Λήψη ZIP",
      "forceSave": "Αναγκαστική αποθήκευση",
      "resetDefaults": "Επαναφορά προεπιλογών",
      "togglePreview": "Εναλλαγή προεπισκόπησης",
      "scrollToCard": "Κύλιση στην κάρτα {{number}}",
      "toggleDarkMode": "Εναλλαγή σκοτεινής λειτουργίας",
      "openLanguageSwitcher": "Άνοιγμα επιλογής γλώσσας",
      "closeDialog": "Κλείσιμο διαλόγου",
      "openShortcutsHelp": "Άνοιγμα συντομεύσεων πληκτρολογίου"
    },
    "announced": {
      "downloadStarted": "Η λήψη ξεκίνησε",
      "configReset": "Η διαμόρφωση επαναφέρθηκε στις προεπιλογές",
      "darkModeToggled": "Η σκοτεινή λειτουργία εναλλάχθηκε",
      "previewToggled": "Η προεπισκόπηση εναλλάχθηκε",
      "scrolledToCard": "Κύλιση στην κάρτα {{number}}"
    }
  }
};

export default el;
