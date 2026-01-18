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

const uk: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Генеруйте конфігураційні файли Docker для безпечного запуску Claude Code"
  },
  "welcome": {
    "close": "Закрити вітальне повідомлення",
    "description": "Claude Code — це потужний AI-асистент для програмування від Anthropic, який може читати, писати та виконувати код безпосередньо на вашій машині. Хоча він неймовірно корисний, запуск AI з доступом до файлової системи та терміналу вимагає ретельного врахування питань безпеки.",
    "purpose": "Цей інструмент генерує повну конфігурацію Docker, яка дозволяє запускати Claude Code в ізольованому контейнерному середовищі. Ваш код залишається захищеним, поки Claude все ще може допомагати вам розробляти, налагоджувати та рефакторити.",
    "features": {
      "title": "Що ви можете налаштувати:",
      "dockerfile": "Виберіть, які інструменти розробки встановити (TypeScript, Python, Go, ffmpeg, ImageMagick)",
      "compose": "Встановіть змінні середовища (наприклад, ваш API-ключ) та захистіть конфіденційні файли від доступу",
      "claudeMd": "Напишіть специфічні для проекту інструкції, які Claude читає на початку кожної сесії"
    },
    "security": {
      "title": "Включені функції безпеки:",
      "firewall": "Мережевий фаєрвол, який дозволяє лише з'єднання з API Anthropic, npm та GitHub",
      "isolation": "Повна ізоляція від хост-системи та локальної мережі",
      "readonly": "Конфіденційні файли монтуються як порожні файли лише для читання",
      "capabilities": "Усі можливості Linux видалено, ескалація привілеїв не дозволена"
    },
    "privacy": {
      "title": "Повідомлення про конфіденційність:",
      "description": "Ваші налаштування зберігаються локально у вашому браузері (localStorage), щоб вони зберігалися при поверненні. З міркувань безпеки значення змінних середовища ніколи не зберігаються — зберігаються лише назви змінних. Жодні дані не надсилаються на будь-який сервер. Ви можете вимкнути автозбереження в будь-який час за допомогою іконки збереження в заголовку — це також очистить усі збережені дані."
    }
  },
  "nav": {
    "header": "Навігація заголовка"
  },
  "tabs": {
    "software": "Програми",
    "preview": "Перегляд",
    "settings": "Налаштування",
    "envVariables": "Середовище",
    "env": "Серед.",
    "protectedFiles": "Захищені файли",
    "protected": "Захищені"
  },
  "language": {
    "switch": "Мова"
  },
  "theme": {
    "switch": "Перемкнути тему"
  },
  "autosave": {
    "enable": "Увімкнути автозбереження",
    "disable": "Вимкнути автозбереження"
  },
  "reset": {
    "button": "Скинути до стандартних",
    "title": "Скинути налаштування",
    "description": "Ви впевнені, що хочете скинути всі налаштування до стандартних значень? Цю дію неможливо скасувати.",
    "cancel": "Скасувати",
    "confirm": "Скинути"
  },
  "software": {
    "baseImage": "Базовий образ",
    "baseImageDesc": "Базовий образ Docker визначає основу вашого контейнера. Стандартний образ 'node' включає Node.js та npm. Ви також можете використовувати варіанти, такі як 'node:22-slim' для менших образів або 'node:22-bookworm' для додаткових системних бібліотек.",
    "image": "Образ",
    "typescript": "TypeScript",
    "typescriptDesc": "Встановлює компілятор TypeScript (tsc) та ts-node для безпосереднього запуску TypeScript. Необхідний для проектів TypeScript, дозволяє перевірку типів, компіляцію в JavaScript та запуск файлів .ts без ручної компіляції.",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "Потужний мультимедійний фреймворк для обробки аудіо та відео файлів. Дозволяє конвертацію форматів, редагування відео, витяг аудіо, потокове передавання та аналіз медіа. Потрібен для проектів, що працюють з медіафайлами.",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "Комплексний пакет обробки зображень, що підтримує понад 200 форматів. Надає інструменти для зміни розміру, обрізки, конвертації форматів, водяних знаків та програмної маніпуляції зображеннями. Ідеальний для автоматизованих робочих процесів із зображеннями.",
    "python": "Python 3",
    "pythonDesc": "Встановлює інтерпретатор Python 3 з менеджером пакетів pip. Дозволяє запускати скрипти Python, встановлювати пакети Python та використовувати інструменти на базі Python. Корисний для обробки даних, скриптів та завдань AI/ML.",
    "uv": "uv",
    "uvDesc": "Встановлює uv, надзвичайно швидкий інсталятор та резолвер пакетів Python, написаний на Rust. Може замінити pip, pip-tools та virtualenv для швидшого керування залежностями.",
    "golang": "Go",
    "golangDesc": "Встановлює мову програмування Go (Golang) з офіційним компілятором та інструментами. Ідеально для створення швидких, статично скомпільованих програм, CLI-інструментів, веб-серверів та системного ПЗ.",
    "flutter": "Flutter",
    "flutterDesc": "Встановлює Flutter SDK з Dart та інструментами розробки Android. Створюйте кросплатформні додатки для мобільних пристроїв, веб та настільних комп'ютерів з однієї кодової бази. Включає Android SDK та інструменти командного рядка.",
    "rust": "Rust",
    "rustDesc": "Встановлює мову програмування Rust з менеджером пакетів Cargo через rustup. Ідеально для створення швидкого, безпечного для пам'яті системного ПЗ, CLI-інструментів, WebAssembly та вбудованих застосунків.",
    "version": "Версія",
    "latest": "остання",
    "recommendsHint": "Рекомендовано: {{packages}}"
  },
  "aptPackages": {
    "title": "Користувацькі APT-пакети",
    "description": "Додайте додаткові пакети Debian/Ubuntu для встановлення в контейнері.",
    "placeholder": "Приклад: curl, graphviz, tree, sqlite3...",
    "add": "Додати пакети",
    "remove": "Видалити {{package}}"
  },
  "npmPackages": {
    "title": "Користувацькі NPM-пакети",
    "description": "Додайте додаткові NPM-пакети для глобального встановлення в контейнері.",
    "placeholder": "Приклад: eslint, prettier, tsx...",
    "add": "Додати пакети",
    "remove": "Видалити {{package}}",
    "installAs": "Встановити як",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Змінити користувача встановлення для {{package}}"
  },
  "runCommands": {
    "title": "Користувацькі команди RUN",
    "description": "Додайте користувацькі shell-команди для виконання під час збірки Docker-образу.",
    "placeholder": "Приклад: flutter doctor",
    "add": "Додати команду",
    "remove": "Видалити команду",
    "runAs": "Виконати як",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Змінити користувача виконання для команди"
  },
  "plugins": {
    "title": "Плагіни Claude Code",
    "description": "Встановити плагіни Claude Code з маркетплейсів.",
    "placeholder": "назва-плагіна@назва-маркетплейсу",
    "add": "Додати плагін",
    "remove": "Видалити плагін",
    "formatHint": "Формат: назва-плагіна@назва-маркетплейсу",
    "invalidFormat": "Невірний формат. Використовуйте plugin@marketplace",
    "suggestions": "Рекомендовані плагіни",
    "loadingSuggestions": "Завантаження пропозицій...",
    "addFromMarketplace": "Додати {{plugin}} з {{marketplace}}",
    "viewOnGitHub": "Переглянути {{plugin}} на GitHub"
  },
  "env": {
    "description": "Змінні середовища не визначено.",
    "key": "Ключ",
    "value": "Значення",
    "add": "Додати змінну",
    "remove": "Видалити",
    "keyPlaceholder": "Приклад: НАЗВА_ЗМІННОЇ",
    "valuePlaceholder": "Приклад: значення"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "Файл CLAUDE.md містить специфічні для проекту інструкції, які Claude читає на початку кожної сесії. Це місце для рекомендацій з кодування, пояснень структури проекту, вибраних технологій або будь-якого іншого контексту, який допомагає Claude краще зрозуміти проект."
  },
  "protectedFiles": {
    "description": "Захищені файли не визначено.",
    "path": "Шлях до файлу",
    "add": "Додати шлях",
    "remove": "Видалити",
    "pathPlaceholder": "Приклад: .env.local",
    "help": "Шляхи відносні до /workspace/. Ці файли будуть змонтовані як порожні файли лише для читання, щоб запобігти доступу до конфіденційних даних."
  },
  "settings": {
    "title": "settings.json",
    "description": "Налаштуйте дозволи Claude Code для контролю над тим, які файли можна читати, редагувати або отримувати. Захищені файли автоматично додаються як правила заборони.",
    "permissions": "Дозволи",
    "directive": "Директива",
    "pattern": "Шаблон",
    "patternPlaceholder": "Приклад: src/** або .env",
    "addRule": "Додати правило",
    "removeRule": "Видалити правило",
    "allow": "Дозволити",
    "ask": "Запитати",
    "deny": "Заборонити",
    "noAllowRules": "Правила дозволу не визначено.",
    "noAskRules": "Правила запиту не визначено.",
    "noDenyRules": "Правила заборони не визначено.",
    "help": "Визначте правила дозволів для операцій Read(), Edit() та WebFetch(). Шаблони підтримують синтаксис glob, наприклад src/** для рекурсивного збігу.",
    "learnMore": "Дізнатися більше"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "Dockerfile визначає, яке програмне забезпечення встановлюється в контейнері. Окрім Node.js та Claude Code, можна додати додаткові інструменти, такі як TypeScript, Python, Go, ffmpeg або ImageMagick. Вибране програмне забезпечення буде доступне, коли Claude виконує команди.",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "Файл docker-compose.yaml контролює, як запускається контейнер. Тут можна визначити змінні середовища (наприклад, API-ключі). Захищені файли монтуються як порожні файли лише для читання, щоб запобігти доступу Claude до конфіденційних даних, таких як файли .env."
  },
  "dockerCompose": {
    "platform": "Платформа",
    "platformDesc": "Встановіть конкретну платформу для контейнера (напр. linux/amd64). Залиште порожнім для використання платформи за замовчуванням. Використовуйте, коли базові образи не підтримують вашу архітектуру.",
    "platformPlaceholder": "Приклад: linux/amd64"
  },
  "download": {
    "button": "Завантажити ZIP",
    "generating": "Генерація...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "Репозиторій GitHub",
    "paypal": "Підтримати через PayPal"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "англійська",
    "de": "німецька",
    "es": "іспанська",
    "fr": "французька",
    "it": "італійська",
    "pt": "португальська",
    "nl": "нідерландська",
    "ja": "японська",
    "ko": "корейська",
    "zh": "китайська",
    "ar": "арабська",
    "he": "іврит",
    "hi": "гінді",
    "ur": "урду",
    "uk": "українська",
    "el": "грецька",
    "pl": "польська",
    "tr": "турецька"
  },
  "errors": {
    "invalidEnvKey": "Недійсна назва змінної. Використовуйте лише літери, цифри та підкреслення.",
    "duplicateEnvKey": "Ця назва змінної вже існує.",
    "invalidPath": "Шлях повинен бути відносним (без початкового /) і не може містити .."
  },
  "readme": {
    "title": "Конфігурація Docker для Claude Code",
    "generatedBy": "Згенеровано за допомогою [Claude Initializr]({{url}})",
    "languageSwitch": "Читати {{language}}",
    "intro": {
      "title": "Про цю конфігурацію",
      "description": "Ця папка містить файли конфігурації Docker для безпечного запуску Claude Code в ізольованому контейнері. Конфігурація забезпечує мережеву ізоляцію, захист файлів та ізольоване середовище для розробки з допомогою ШІ."
    },
    "files": {
      "title": "Огляд файлів",
      "dockerfile": "Dockerfile - Визначає образ контейнера з усіма інструментами розробки",
      "dockerCompose": "docker-compose.yaml - Файл оркестрації для запуску контейнера",
      "env": ".env - Змінні середовища (додайте свої API-ключі тут)",
      "initFirewall": "init-firewall.sh - Скрипт мережевого фаєрвола для безпеки",
      "workspace": "workspace/ - Ваша робоча директорія, змонтована в контейнері",
      "claudeMd": "workspace/CLAUDE.md - Інструкції проекту для Claude",
      "settingsJson": "workspace/.claude/settings.json - Налаштування дозволів Claude Code"
    },
    "baseImage": {
      "title": "Базовий образ",
      "description": "Ця конфігурація використовує наступний базовий образ Docker:",
      "dockerHub": "Переглянути на Docker Hub"
    },
    "platform": {
      "title": "Платформа",
      "description": "Контейнер налаштований для роботи на цій платформі:"
    },
    "aptPackages": {
      "title": "Системні пакети (APT)",
      "description": "Встановлені наступні системні пакети:"
    },
    "npmPackages": {
      "title": "Додаткові NPM-пакети",
      "description": "Наступні додаткові NPM-пакети встановлені глобально:",
      "installedAs": "встановлено як {{user}}"
    },
    "plugins": {
      "title": "Плагіни Claude Code",
      "description": "Наступні плагіни Claude Code встановлені та увімкнені:",
      "viewOnGitHub": "Переглянути на GitHub"
    },
    "envVariables": {
      "title": "Змінні середовища",
      "description": "Налаштовані наступні змінні середовища (значення не показані з міркувань безпеки):",
      "note": "Додайте свої справжні значення до файлу .env перед запуском контейнера."
    },
    "protectedFiles": {
      "title": "Захищені файли",
      "description": "Наступні файли захищені та змонтовані як порожні файли лише для читання для запобігання доступу:"
    },
    "settingsJson": {
      "title": "Налаштування дозволів",
      "description": "Claude Code налаштований з наступними правилами дозволів:",
      "allow": "Дозволені операції (автоматично)",
      "ask": "Операції, що потребують підтвердження",
      "deny": "Заборонені операції"
    },
    "claudeMd": {
      "title": "Інструкції проекту",
      "description": "Специфічні для проекту інструкції для Claude визначені в:"
    },
    "quickStart": {
      "title": "Швидкий старт",
      "step1": "Встановіть Docker (див. Передумови нижче)",
      "step2": "Запустіть контейнер:",
      "step2CustomVersions": "Опційно: Зберіть з власними версіями програмного забезпечення (див. Docker Build Arguments нижче):",
      "step3": "Запустіть Claude Code:",
      "step4": "Зупиніть контейнер:",
      "note": "Ваша папка workspace змонтована в /workspace всередині контейнера. Див. розділ Автентифікація нижче для варіантів входу."
    },
    "authentication": {
      "title": "Автентифікація",
      "description": "Claude Code підтримує два методи автентифікації. Виберіть той, який найкраще відповідає вашим потребам:",
      "apiKey": {
        "title": "Варіант 1: API-ключ",
        "description": "Встановіть свій API-ключ у файлі `.env` (`ANTHROPIC_API_KEY`). Claude Code використовуватиме його автоматично.",
        "pros": [
          "Працює в headless/автоматизованих середовищах (CI/CD, контейнери, SSH)",
          "Не потребує браузера",
          "Без обмежень використання (оплата за використання)",
          "Надійний у всіх середовищах"
        ],
        "cons": [
          "Коштує гроші за кожен виклик API (стандартні тарифи API)",
          "Потрібно керувати та захищати API-ключ",
          "Може призвести до неочікуваних витрат без лімітів витрат"
        ]
      },
      "browserLogin": {
        "title": "Варіант 2: Вхід через браузер (Claude Pro/Max/Team)",
        "description": "Виконайте `/login` у Claude Code для автентифікації через браузер з вашою підпискою.",
        "pros": [
          "Включено у вашу підписку (передбачувана щомісячна вартість)",
          "Без додаткових витрат на API",
          "Уніфікований білінг з Claude.ai"
        ],
        "cons": [
          "Потребує браузер для першого входу",
          "Має обмеження використання, що скидаються щотижня",
          "Автентифікація може не зберігатися в контейнерах/SSH-сесіях"
        ]
      }
    },
    "buildArgs": {
      "title": "Docker Build Arguments",
      "description": "Ви можете налаштувати версії програмного забезпечення та URL-адреси завантаження під час збірки Docker. Використовуйте `--build-arg ІМ'Я=ЗНАЧЕННЯ` для перевизначення значень за замовчуванням.",
      "versionArgs": {
        "title": "Аргументи версій",
        "description": "Контролюйте, які версії програмного забезпечення встановлюються:"
      },
      "urlArgs": {
        "title": "Аргументи URL",
        "description": "Перевизначте URL-адреси завантаження для дзеркал або проксі:"
      },
      "defaultValue": "За замовчуванням",
      "example": "Приклад з власними версіями:"
    },
    "prerequisites": {
      "title": "Передумови",
      "description": "Вам потрібен Docker, встановлений у вашій системі. Виберіть свою операційну систему:",
      "windows": {
        "title": "Windows",
        "steps": [
          "Завантажте Docker Desktop з docker.com/products/docker-desktop",
          "Запустіть інсталятор і дотримуйтесь майстра налаштування",
          "Увімкніть WSL 2 backend за запитом (рекомендовано)",
          "Перезавантажте комп'ютер, якщо потрібно",
          "Відкрийте Docker Desktop і зачекайте, поки він запуститься"
        ],
        "link": "Офіційний посібник з встановлення для Windows"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "Завантажте Docker Desktop з docker.com/products/docker-desktop",
          "Відкрийте файл .dmg і перетягніть Docker до Applications",
          "Відкрийте Docker з папки Applications",
          "Надайте необхідні дозволи за запитом",
          "Зачекайте, поки Docker завершить запуск (іконка кита в рядку меню)"
        ],
        "link": "Офіційний посібник з встановлення для macOS"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "Оновіть індекс пакетів: sudo apt update",
          "Встановіть Docker: sudo apt install docker.io docker-compose-v2",
          "Додайте свого користувача до групи docker: sudo usermod -aG docker $USER",
          "Вийдіть і увійдіть знову, щоб зміни групи набули чинності",
          "Перевірте встановлення: docker --version"
        ],
        "link": "Офіційний посібник з встановлення для Linux",
        "altNote": "Або встановіть Docker Desktop для графічного інтерфейсу."
      }
    },
    "troubleshooting": {
      "title": "Усунення неполадок",
      "issues": {
        "containerNotStarting": {
          "title": "Контейнер не запускається",
          "solutions": [
            "Перевірте, чи працює Docker: docker info",
            "Переконайтеся, що файл .env існує і містить ANTHROPIC_API_KEY",
            "Перевірте конфлікти портів: docker ps",
            "Перегляньте логи контейнера: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "Помилки відмови в дозволі",
          "solutions": [
            "На Linux переконайтеся, що ваш користувач у групі docker",
            "Спробуйте запустити з sudo (не рекомендується для постійного використання)",
            "Перевірте права доступу до файлів у папці workspace"
          ]
        },
        "networkIssues": {
          "title": "Проблеми з мережею або підключенням до API",
          "solutions": [
            "Скрипт фаєрвола дозволяє лише певні домени",
            "Переконайтеся, що api.anthropic.com доступний з вашої мережі",
            "Перевірте логи фаєрвола всередині контейнера: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "Файли недоступні в контейнері",
          "solutions": [
            "Захищені файли навмисно порожні - це очікувано",
            "Перевірте монтування томів у docker-compose.yaml",
            "Переконайтеся, що папка workspace існує на хості"
          ]
        }
      }
    },
    "links": {
      "title": "Посилання",
      "initializer": "Згенерувати нову конфігурацію",
      "documentation": "Документація Claude Code",
      "support": "Повідомити про проблеми"
    },
    "author": {
      "title": "Автор",
      "createdBy": "Створено",
      "support": "Підтримати цей проект"
    },
    "software": {
      "title": "Встановлене програмне забезпечення",
      "description": "Встановлені наступні інструменти розробки:"
    }
  }
};

export default uk;
