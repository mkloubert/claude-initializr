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

const ar: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "إنشاء ملفات تكوين Docker لتشغيل Claude Code بشكل آمن"
  },
  "welcome": {
    "close": "إغلاق رسالة الترحيب",
    "description": "Claude Code هو مساعد البرمجة الذكي القوي من Anthropic الذي يمكنه قراءة وكتابة وتنفيذ الكود مباشرة على جهازك. على الرغم من فائدته الكبيرة، فإن تشغيل ذكاء اصطناعي له صلاحية الوصول إلى نظام الملفات والطرفية يتطلب دراسة متأنية للأمان.",
    "purpose": "تنشئ هذه الأداة تكوين Docker كامل يتيح لك تشغيل Claude Code في بيئة حاوية معزولة. يبقى كودك محمياً بينما يستطيع Claude الاستمرار في مساعدتك في التطوير والتصحيح وإعادة الهيكلة.",
    "features": {
      "title": "ما يمكنك تكوينه:",
      "dockerfile": "اختر أدوات التطوير المراد تثبيتها (TypeScript، Python، Go، ffmpeg، ImageMagick)",
      "compose": "عيّن متغيرات البيئة (مثل مفتاح API الخاص بك) واحمِ الملفات الحساسة من الوصول",
      "claudeMd": "اكتب تعليمات خاصة بالمشروع يقرأها Claude في بداية كل جلسة"
    },
    "security": {
      "title": "ميزات الأمان المضمنة:",
      "firewall": "جدار حماية شبكي يسمح فقط بالاتصالات إلى Anthropic API وnpm وGitHub",
      "isolation": "عزل كامل عن النظام المضيف والشبكة المحلية",
      "readonly": "الملفات الحساسة مثبتة كملفات فارغة للقراءة فقط",
      "capabilities": "إزالة جميع صلاحيات Linux، لا يُسمح بتصعيد الامتيازات"
    },
    "privacy": {
      "title": "إشعار الخصوصية:",
      "description": "يتم تخزين إعداداتك محلياً في متصفحك (localStorage) لتُحفظ عند عودتك. لأسباب أمنية، لا يتم تخزين قيم متغيرات البيئة أبداً - يتم حفظ أسماء المتغيرات فقط. لا تُرسل أي بيانات إلى أي خادم. يمكنك تعطيل الحفظ التلقائي في أي وقت باستخدام أيقونة الحفظ في الرأس - سيؤدي هذا أيضاً إلى مسح جميع البيانات المخزنة."
    }
  },
  "nav": {
    "header": "التنقل في الرأس"
  },
  "tabs": {
    "software": "البرامج",
    "preview": "معاينة",
    "settings": "الإعدادات",
    "envVariables": "البيئة",
    "env": "بيئة",
    "protectedFiles": "الملفات المحمية",
    "protected": "محمي"
  },
  "language": {
    "switch": "اللغة"
  },
  "theme": {
    "switch": "تبديل السمة"
  },
  "autosave": {
    "enable": "تفعيل الحفظ التلقائي",
    "disable": "تعطيل الحفظ التلقائي"
  },
  "reset": {
    "button": "إعادة التعيين إلى الافتراضي",
    "title": "إعادة تعيين الإعدادات",
    "description": "هل أنت متأكد أنك تريد إعادة تعيين جميع الإعدادات إلى قيمها الافتراضية؟ لا يمكن التراجع عن هذا الإجراء.",
    "cancel": "إلغاء",
    "confirm": "إعادة تعيين"
  },
  "software": {
    "baseImage": "الصورة الأساسية",
    "baseImageDesc": "تحدد صورة Docker الأساسية أساس الحاوية الخاصة بك. تتضمن صورة 'node' الافتراضية Node.js وnpm. يمكنك أيضاً استخدام متغيرات مثل 'node:22-slim' للصور الأصغر أو 'node:22-bookworm' لمكتبات النظام الإضافية.",
    "image": "الصورة",
    "typescript": "TypeScript",
    "typescriptDesc": "يثبّت مترجم TypeScript (tsc) وts-node لتشغيل TypeScript مباشرة. ضروري لمشاريع TypeScript، يتيح فحص الأنواع والترجمة إلى JavaScript وتشغيل ملفات .ts بدون ترجمة يدوية.",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "إطار عمل وسائط متعددة قوي لمعالجة ملفات الصوت والفيديو. يتيح تحويل الصيغ وتحرير الفيديو واستخراج الصوت والبث وتحليل الوسائط. مطلوب للمشاريع التي تعمل مع ملفات الوسائط.",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "مجموعة شاملة لمعالجة الصور تدعم أكثر من 200 صيغة. توفر أدوات لتغيير الحجم والقص وتحويل الصيغ والعلامات المائية ومعالجة الصور برمجياً. مثالية لسير عمل الصور الآلي.",
    "python": "Python 3",
    "pythonDesc": "يثبّت مفسر Python 3 مع مدير الحزم pip. يتيح تشغيل نصوص Python وتثبيت حزم Python واستخدام أدوات Python. مفيد لمعالجة البيانات والنصوص ومهام AI/ML.",
    "uv": "uv",
    "uvDesc": "يثبّت uv، مثبّت ومحلل حزم Python سريع للغاية مكتوب بلغة Rust. يمكن أن يحل محل pip وpip-tools وvirtualenv لإدارة تبعيات أسرع.",
    "golang": "Go",
    "golangDesc": "يثبّت لغة البرمجة Go (Golang) مع المترجم والأدوات الرسمية. مثالي لإنشاء برامج سريعة مترجمة بشكل ثابت وأدوات CLI وخوادم الويب وبرامج النظام.",
    "flutter": "Flutter",
    "flutterDesc": "يثبّت Flutter SDK مع Dart وأدوات تطوير Android. أنشئ تطبيقات متعددة المنصات للهاتف المحمول والويب وسطح المكتب من قاعدة كود واحدة. يتضمن Android SDK وأدوات سطر الأوامر.",
    "version": "الإصدار",
    "latest": "الأحدث",
    "recommendsHint": "موصى به: {{packages}}"
  },
  "aptPackages": {
    "title": "حزم APT مخصصة",
    "description": "أضف حزم Debian/Ubuntu إضافية للتثبيت في الحاوية.",
    "placeholder": "مثال: curl, graphviz, tree, sqlite3...",
    "add": "إضافة حزم",
    "remove": "إزالة {{package}}"
  },
  "npmPackages": {
    "title": "حزم NPM مخصصة",
    "description": "أضف حزم NPM إضافية للتثبيت العام في الحاوية.",
    "placeholder": "مثال: eslint, prettier, tsx...",
    "add": "إضافة حزم",
    "remove": "إزالة {{package}}",
    "installAs": "التثبيت كـ",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "تبديل مستخدم التثبيت لـ {{package}}"
  },
  "runCommands": {
    "title": "أوامر RUN مخصصة",
    "description": "أضف أوامر shell مخصصة للتنفيذ أثناء بناء صورة Docker.",
    "placeholder": "مثال: flutter doctor",
    "add": "إضافة أمر",
    "remove": "إزالة الأمر",
    "runAs": "التشغيل كـ",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "تبديل مستخدم التشغيل للأمر"
  },
  "plugins": {
    "title": "إضافات Claude Code",
    "description": "تثبيت إضافات Claude Code من الأسواق.",
    "placeholder": "اسم-الإضافة@اسم-السوق",
    "add": "إضافة إضافة",
    "remove": "إزالة الإضافة",
    "formatHint": "الصيغة: اسم-الإضافة@اسم-السوق",
    "invalidFormat": "صيغة غير صالحة. استخدم plugin@marketplace",
    "suggestions": "الإضافات المقترحة",
    "loadingSuggestions": "جاري تحميل الاقتراحات...",
    "addFromMarketplace": "إضافة {{plugin}} من {{marketplace}}",
    "viewOnGitHub": "عرض {{plugin}} على GitHub"
  },
  "env": {
    "description": "لم يتم تعريف متغيرات البيئة.",
    "key": "المفتاح",
    "value": "القيمة",
    "add": "إضافة متغير",
    "remove": "إزالة",
    "keyPlaceholder": "مثال: اسم_المتغير",
    "valuePlaceholder": "مثال: القيمة"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "يحتوي ملف CLAUDE.md على تعليمات خاصة بالمشروع يقرأها Claude في بداية كل جلسة. هذا هو المكان المناسب لإرشادات البرمجة وشروحات بنية المشروع والتقنيات المفضلة أو أي سياق آخر يساعد Claude على فهم المشروع بشكل أفضل."
  },
  "protectedFiles": {
    "description": "لم يتم تعريف ملفات محمية.",
    "path": "مسار الملف",
    "add": "إضافة مسار",
    "remove": "إزالة",
    "pathPlaceholder": "مثال: .env.local",
    "help": "المسارات نسبية إلى /workspace/. سيتم تثبيت هذه الملفات كملفات فارغة للقراءة فقط لمنع الوصول إلى البيانات الحساسة."
  },
  "settings": {
    "title": "settings.json",
    "description": "قم بتكوين أذونات Claude Code للتحكم في الملفات التي يمكن قراءتها أو تحريرها أو جلبها. تتم إضافة الملفات المحمية تلقائيًا كقواعد رفض.",
    "permissions": "الأذونات",
    "directive": "التوجيه",
    "pattern": "النمط",
    "patternPlaceholder": "مثال: src/** أو .env",
    "addRule": "إضافة قاعدة",
    "removeRule": "إزالة القاعدة",
    "allow": "السماح",
    "ask": "السؤال",
    "deny": "الرفض",
    "noAllowRules": "لم يتم تحديد قواعد السماح.",
    "noAskRules": "لم يتم تحديد قواعد السؤال.",
    "noDenyRules": "لم يتم تحديد قواعد الرفض.",
    "help": "حدد قواعد الأذونات لعمليات Read() و Edit() و WebFetch(). تدعم الأنماط صيغة glob مثل src/** للمطابقة التكرارية.",
    "learnMore": "اعرف المزيد"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "يحدد Dockerfile البرامج المثبتة في الحاوية. بالإضافة إلى Node.js وClaude Code، يمكن تضمين أدوات إضافية مثل TypeScript وPython وGo وffmpeg أو ImageMagick. ستكون البرامج المختارة متاحة عندما ينفذ Claude الأوامر.",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "يتحكم ملف docker-compose.yaml في كيفية بدء الحاوية. يمكن تعريف متغيرات البيئة (مثل مفاتيح API) هنا. يتم تثبيت الملفات المحمية كملفات فارغة للقراءة فقط لمنع Claude من الوصول إلى البيانات الحساسة مثل ملفات .env."
  },
  "dockerCompose": {
    "platform": "المنصة",
    "platformDesc": "حدد منصة محددة للحاوية (مثل linux/amd64). اتركه فارغًا لاستخدام المنصة الافتراضية. استخدم هذا عندما لا تدعم الصور الأساسية معماريتك.",
    "platformPlaceholder": "مثال: linux/amd64"
  },
  "download": {
    "button": "تحميل ZIP",
    "generating": "جارٍ الإنشاء...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "مستودع GitHub",
    "paypal": "الدعم عبر PayPal"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "الإنجليزية",
    "de": "الألمانية",
    "es": "الإسبانية",
    "fr": "الفرنسية",
    "it": "الإيطالية",
    "pt": "البرتغالية",
    "nl": "الهولندية",
    "ja": "اليابانية",
    "ko": "الكورية",
    "zh": "الصينية",
    "ar": "العربية",
    "he": "العبرية",
    "hi": "الهندية",
    "ur": "الأردية",
    "uk": "الأوكرانية",
    "el": "اليونانية",
    "pl": "البولندية",
    "tr": "التركية"
  },
  "errors": {
    "invalidEnvKey": "اسم متغير غير صالح. استخدم الأحرف والأرقام والشرطات السفلية فقط.",
    "duplicateEnvKey": "اسم المتغير هذا موجود بالفعل.",
    "invalidPath": "يجب أن يكون المسار نسبياً (بدون / في البداية) ولا يمكن أن يحتوي على .."
  },
  "readme": {
    "title": "تكوين Docker لـ Claude Code",
    "generatedBy": "تم إنشاؤه بواسطة [Claude Initializr]({{url}})",
    "languageSwitch": "اقرأ هذا بـ{{language}}",
    "intro": {
      "title": "حول هذا التكوين",
      "description": "يحتوي هذا المجلد على ملفات تكوين Docker لتشغيل Claude Code بأمان في حاوية معزولة. يوفر التكوين عزل الشبكة وحماية الملفات وبيئة معزولة للتطوير بمساعدة الذكاء الاصطناعي."
    },
    "files": {
      "title": "نظرة عامة على الملفات",
      "dockerfile": "Dockerfile - يحدد صورة الحاوية مع جميع أدوات التطوير",
      "dockerCompose": "docker-compose.yaml - ملف التنسيق لبدء الحاوية",
      "env": ".env - متغيرات البيئة (أضف مفاتيح API الخاصة بك هنا)",
      "initFirewall": "init-firewall.sh - سكريبت جدار حماية الشبكة للأمان",
      "workspace": "workspace/ - دليل العمل الخاص بك المثبت في الحاوية",
      "claudeMd": "workspace/CLAUDE.md - تعليمات المشروع لـ Claude",
      "settingsJson": "workspace/.claude/settings.json - إعدادات أذونات Claude Code"
    },
    "baseImage": {
      "title": "الصورة الأساسية",
      "description": "يستخدم هذا التكوين صورة Docker الأساسية التالية:",
      "dockerHub": "عرض على Docker Hub"
    },
    "platform": {
      "title": "المنصة",
      "description": "تم تكوين الحاوية للعمل على هذه المنصة:"
    },
    "aptPackages": {
      "title": "حزم النظام (APT)",
      "description": "تم تثبيت حزم النظام التالية:"
    },
    "npmPackages": {
      "title": "حزم NPM الإضافية",
      "description": "تم تثبيت حزم NPM الإضافية التالية عالمياً:",
      "installedAs": "مثبت كـ {{user}}"
    },
    "plugins": {
      "title": "إضافات Claude Code",
      "description": "تم تثبيت وتفعيل إضافات Claude Code التالية:",
      "viewOnGitHub": "عرض على GitHub"
    },
    "envVariables": {
      "title": "متغيرات البيئة",
      "description": "تم تكوين متغيرات البيئة التالية (القيم غير معروضة لأسباب أمنية):",
      "note": "أضف قيمك الفعلية إلى ملف .env قبل بدء الحاوية."
    },
    "protectedFiles": {
      "title": "الملفات المحمية",
      "description": "الملفات التالية محمية ومثبتة كملفات فارغة للقراءة فقط لمنع الوصول:"
    },
    "settingsJson": {
      "title": "إعدادات الأذونات",
      "description": "تم تكوين Claude Code بقواعد الأذونات التالية:",
      "allow": "العمليات المسموح بها (تلقائي)",
      "ask": "العمليات التي تتطلب تأكيداً",
      "deny": "العمليات المرفوضة"
    },
    "claudeMd": {
      "title": "تعليمات المشروع",
      "description": "تم تحديد التعليمات الخاصة بالمشروع لـ Claude في:"
    },
    "quickStart": {
      "title": "البدء السريع",
      "step1": "قم بتثبيت Docker (انظر المتطلبات أدناه)",
      "step2": "ابدأ الحاوية:",
      "step3": "ابدأ Claude Code:",
      "step4": "إيقاف الحاوية:",
      "note": "مجلد workspace الخاص بك مثبت في /workspace داخل الحاوية. سيطلب Claude Code مفتاح API عند التشغيل الأول."
    },
    "prerequisites": {
      "title": "المتطلبات",
      "description": "تحتاج إلى تثبيت Docker على نظامك. اختر نظام التشغيل الخاص بك:",
      "windows": {
        "title": "Windows",
        "steps": [
          "قم بتنزيل Docker Desktop من docker.com/products/docker-desktop",
          "قم بتشغيل المثبت واتبع معالج الإعداد",
          "قم بتمكين WSL 2 backend عند المطالبة (موصى به)",
          "أعد تشغيل الكمبيوتر إذا لزم الأمر",
          "افتح Docker Desktop وانتظر حتى يبدأ"
        ],
        "link": "دليل التثبيت الرسمي لـ Windows"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "قم بتنزيل Docker Desktop من docker.com/products/docker-desktop",
          "افتح ملف .dmg واسحب Docker إلى Applications",
          "افتح Docker من مجلد Applications",
          "امنح الأذونات المطلوبة عند المطالبة",
          "انتظر حتى ينتهي Docker من البدء (أيقونة الحوت في شريط القوائم)"
        ],
        "link": "دليل التثبيت الرسمي لـ macOS"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "قم بتحديث فهرس الحزم: sudo apt update",
          "قم بتثبيت Docker: sudo apt install docker.io docker-compose-v2",
          "أضف مستخدمك إلى مجموعة docker: sudo usermod -aG docker $USER",
          "قم بتسجيل الخروج وتسجيل الدخول مرة أخرى لتفعيل تغييرات المجموعة",
          "تحقق من التثبيت: docker --version"
        ],
        "link": "دليل التثبيت الرسمي لـ Linux",
        "altNote": "أو قم بتثبيت Docker Desktop للحصول على تجربة واجهة رسومية."
      }
    },
    "troubleshooting": {
      "title": "استكشاف الأخطاء وإصلاحها",
      "issues": {
        "containerNotStarting": {
          "title": "الحاوية لا تبدأ",
          "solutions": [
            "تحقق من أن Docker يعمل: docker info",
            "تحقق من وجود ملف .env ويحتوي على ANTHROPIC_API_KEY",
            "تحقق من تعارضات المنافذ: docker ps",
            "عرض سجلات الحاوية: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "أخطاء رفض الإذن",
          "solutions": [
            "على Linux، تأكد من أن مستخدمك في مجموعة docker",
            "جرب التشغيل باستخدام sudo (غير موصى به للاستخدام المنتظم)",
            "تحقق من أذونات الملفات في مجلد workspace"
          ]
        },
        "networkIssues": {
          "title": "مشاكل الشبكة أو اتصال API",
          "solutions": [
            "يسمح سكريبت جدار الحماية فقط بنطاقات محددة",
            "تأكد من إمكانية الوصول إلى api.anthropic.com من شبكتك",
            "تحقق من سجلات جدار الحماية داخل الحاوية: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "لا يمكن الوصول إلى الملفات في الحاوية",
          "solutions": [
            "الملفات المحمية فارغة عمداً - هذا متوقع",
            "تحقق من تثبيتات وحدات التخزين في docker-compose.yaml",
            "تأكد من وجود مجلد workspace على المضيف"
          ]
        }
      }
    },
    "links": {
      "title": "الروابط",
      "initializer": "إنشاء تكوين جديد",
      "documentation": "توثيق Claude Code",
      "support": "الإبلاغ عن مشاكل"
    },
    "author": {
      "title": "المؤلف",
      "createdBy": "تم الإنشاء بواسطة",
      "support": "ادعم هذا المشروع"
    },
    "software": {
      "title": "البرامج المثبتة",
      "description": "تم تثبيت أدوات التطوير التالية:"
    }
  }
};

export default ar;
