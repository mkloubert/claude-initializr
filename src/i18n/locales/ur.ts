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

const ur: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Claude Code کو محفوظ طریقے سے چلانے کے لیے Docker کنفیگریشن فائلیں بنائیں"
  },
  "welcome": {
    "close": "خوش آمدید پیغام بند کریں",
    "description": "Claude Code Anthropic کا طاقتور AI کوڈنگ اسسٹنٹ ہے جو آپ کی مشین پر براہ راست کوڈ پڑھ، لکھ اور چلا سکتا ہے۔ انتہائی مفید ہونے کے باوجود، فائل سسٹم اور ٹرمینل تک رسائی والے AI کو چلانے کے لیے سیکیورٹی پر محتاط غور کی ضرورت ہے۔",
    "purpose": "یہ ٹول ایک مکمل Docker کنفیگریشن بناتا ہے جو آپ کو ایک الگ تھلگ کنٹینر ماحول میں Claude Code چلانے کی اجازت دیتا ہے۔ آپ کا کوڈ محفوظ رہتا ہے جبکہ Claude آپ کی ترقی، ڈیبگنگ اور ری فیکٹرنگ میں مدد کرنا جاری رکھ سکتا ہے۔",
    "features": {
      "title": "آپ کیا کنفیگر کر سکتے ہیں:",
      "dockerfile": "انسٹال کرنے کے لیے ڈیولپمنٹ ٹولز منتخب کریں (TypeScript, Python, Go, ffmpeg, ImageMagick)",
      "compose": "ماحولیاتی متغیرات سیٹ کریں (جیسے آپ کی API کلید) اور حساس فائلوں کو رسائی سے بچائیں",
      "claudeMd": "پروجیکٹ کے مخصوص ہدایات لکھیں جو Claude ہر سیشن کے آغاز میں پڑھتا ہے",
      "devContainer": "ہموار ترقی کے لیے VS Code Dev Container کنفیگریشن بنائیں"
    },
    "security": {
      "title": "شامل سیکیورٹی خصوصیات:",
      "firewall": "نیٹ ورک فائر وال جو صرف Anthropic API، npm اور GitHub سے کنکشن کی اجازت دیتا ہے",
      "isolation": "ہوسٹ سسٹم اور لوکل نیٹ ورک سے مکمل الگ تھلگ",
      "readonly": "حساس فائلیں خالی صرف پڑھنے والی فائلوں کے طور پر ماؤنٹ",
      "capabilities": "تمام Linux صلاحیتیں ہٹا دی گئیں، استحقاق کی بلندی کی اجازت نہیں"
    },
    "privacy": {
      "title": "رازداری کا نوٹس:",
      "description": "آپ کی ترتیبات آپ کے براؤزر میں مقامی طور پر (localStorage) محفوظ ہوتی ہیں تاکہ واپس آنے پر وہ محفوظ رہیں۔ سیکیورٹی وجوہات کی بنا پر، ماحولیاتی متغیرات کی قدریں کبھی محفوظ نہیں ہوتیں - صرف متغیر نام محفوظ ہوتے ہیں۔ کسی بھی سرور پر کوئی ڈیٹا نہیں بھیجا جاتا۔ آپ ہیڈر میں محفوظ آئیکن استعمال کر کے کسی بھی وقت آٹو سیو غیر فعال کر سکتے ہیں - یہ تمام محفوظ ڈیٹا بھی صاف کر دے گا۔"
    }
  },
  "nav": {
    "header": "ہیڈر نیویگیشن"
  },
  "tabs": {
    "software": "سافٹ ویئر",
    "preview": "پیش نظارہ",
    "settings": "ترتیبات",
    "envVariables": "ماحول",
    "env": "ماحول",
    "protectedFiles": "محفوظ فائلیں",
    "protected": "محفوظ"
  },
  "language": {
    "switch": "زبان"
  },
  "theme": {
    "switch": "تھیم تبدیل کریں"
  },
  "autosave": {
    "enable": "آٹو سیو فعال کریں",
    "disable": "آٹو سیو غیر فعال کریں"
  },
  "reset": {
    "button": "ڈیفالٹ پر ری سیٹ کریں",
    "title": "ترتیبات ری سیٹ کریں",
    "description": "کیا آپ واقعی تمام ترتیبات کو ان کی ڈیفالٹ اقدار پر ری سیٹ کرنا چاہتے ہیں؟ اس عمل کو واپس نہیں کیا جا سکتا۔",
    "cancel": "منسوخ",
    "confirm": "ری سیٹ کریں"
  },
  "software": {
    "baseImage": "بیس امیج",
    "baseImageDesc": "Docker بیس امیج آپ کے کنٹینر کی بنیاد طے کرتی ہے۔ ڈیفالٹ 'node' امیج میں Node.js اور npm شامل ہے۔ آپ چھوٹی امیج کے لیے 'node:22-slim' یا اضافی سسٹم لائبریریز کے لیے 'node:22-bookworm' جیسے ویریئنٹس بھی استعمال کر سکتے ہیں۔",
    "image": "امیج",
    "typescript": "TypeScript",
    "typescriptDesc": "TypeScript کو براہ راست چلانے کے لیے TypeScript کمپائلر (tsc) اور ts-node انسٹال کرتا ہے۔ TypeScript پروجیکٹس کے لیے ضروری، ٹائپ چیکنگ، JavaScript میں کمپائلیشن اور دستی کمپائلیشن کے بغیر .ts فائلیں چلانے کے قابل۔",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "آڈیو اور ویڈیو فائلوں کو پروسیس کرنے کے لیے طاقتور ملٹی میڈیا فریم ورک۔ فارمیٹ کنورژن، ویڈیو ایڈیٹنگ، آڈیو ایکسٹریکشن، سٹریمنگ اور میڈیا تجزیہ کو فعال کرتا ہے۔ میڈیا فائلوں کے ساتھ کام کرنے والے پروجیکٹس کے لیے ضروری۔",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "200 سے زیادہ فارمیٹس کو سپورٹ کرنے والا جامع امیج پروسیسنگ سویٹ۔ ری سائزنگ، کراپنگ، فارمیٹ کنورژن، واٹر مارکنگ اور پروگرامیٹک امیج مینیپولیشن کے لیے ٹولز فراہم کرتا ہے۔ خودکار امیج ورک فلو کے لیے مثالی۔",
    "python": "Python 3",
    "pythonDesc": "pip پیکیج مینیجر کے ساتھ Python 3 انٹرپریٹر انسٹال کرتا ہے۔ Python سکرپٹس چلانے، Python پیکیجز انسٹال کرنے اور Python پر مبنی ٹولز استعمال کرنے کے قابل۔ ڈیٹا پروسیسنگ، سکرپٹنگ اور AI/ML کاموں کے لیے مفید۔",
    "uv": "uv",
    "uvDesc": "uv انسٹال کرتا ہے، Rust میں لکھا گیا ایک انتہائی تیز Python پیکیج انسٹالر اور ریزولور۔ تیز ڈیپنڈنسی مینجمنٹ کے لیے pip، pip-tools اور virtualenv کو بدل سکتا ہے۔",
    "golang": "Go",
    "golangDesc": "سرکاری کمپائلر اور ٹولز کے ساتھ Go (Golang) پروگرامنگ زبان انسٹال کرتا ہے۔ تیز، سٹیٹک طور پر کمپائل کردہ پروگرامز، CLI ٹولز، ویب سرورز اور سسٹم سافٹ ویئر بنانے کے لیے مثالی۔",
    "flutter": "Flutter",
    "flutterDesc": "Flutter SDK کو Dart اور Android ڈیولپمنٹ ٹولز کے ساتھ انسٹال کرتا ہے۔ ایک کوڈ بیس سے موبائل، ویب اور ڈیسک ٹاپ کے لیے کراس پلیٹ فارم ایپس بنائیں۔ Android SDK اور کمانڈ لائن ٹولز شامل ہیں۔",
    "rust": "Rust",
    "rustDesc": "rustup کے ذریعے Cargo پیکیج مینیجر کے ساتھ Rust پروگرامنگ زبان انسٹال کرتا ہے۔ تیز، میموری محفوظ سسٹم سافٹ ویئر، CLI ٹولز، WebAssembly اور ایمبیڈڈ ایپلیکیشنز بنانے کے لیے مثالی۔",
    "version": "ورژن",
    "latest": "تازہ ترین",
    "recommendsHint": "تجویز کردہ: {{packages}}"
  },
  "aptPackages": {
    "title": "اپنی مرضی کے APT پیکیجز",
    "description": "کنٹینر میں انسٹال کرنے کے لیے اضافی Debian/Ubuntu پیکیجز شامل کریں۔",
    "placeholder": "مثال: curl, graphviz, tree, sqlite3...",
    "add": "پیکیجز شامل کریں",
    "remove": "{{package}} ہٹائیں"
  },
  "npmPackages": {
    "title": "اپنی مرضی کے NPM پیکیجز",
    "description": "کنٹینر میں گلوبل طور پر انسٹال کرنے کے لیے اضافی NPM پیکیجز شامل کریں۔",
    "placeholder": "مثال: eslint, prettier, tsx...",
    "add": "پیکیجز شامل کریں",
    "remove": "{{package}} ہٹائیں",
    "installAs": "کے طور پر انسٹال کریں",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "{{package}} کے لیے انسٹالیشن صارف تبدیل کریں"
  },
  "runCommands": {
    "title": "اپنی مرضی کے RUN کمانڈز",
    "description": "Docker امیج بلڈ کے دوران چلانے کے لیے اپنی مرضی کے shell کمانڈز شامل کریں۔",
    "placeholder": "مثال: flutter doctor",
    "add": "کمانڈ شامل کریں",
    "remove": "کمانڈ ہٹائیں",
    "runAs": "کے طور پر چلائیں",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "کمانڈ کے لیے رن صارف تبدیل کریں"
  },
  "env": {
    "description": "کوئی ماحولیاتی متغیرات متعین نہیں۔",
    "key": "کلید",
    "value": "قدر",
    "add": "متغیر شامل کریں",
    "remove": "ہٹائیں",
    "keyPlaceholder": "مثال: متغیر_نام",
    "valuePlaceholder": "مثال: قدر"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "CLAUDE.md فائل میں پروجیکٹ کے مخصوص ہدایات ہوتی ہیں جو Claude ہر سیشن کے آغاز میں پڑھتا ہے۔ یہ کوڈنگ گائیڈ لائنز، پروجیکٹ ڈھانچے کی وضاحت، پسندیدہ ٹیکنالوجیز یا کسی بھی دوسرے سیاق و سباق کے لیے جگہ ہے جو Claude کو پروجیکٹ کو بہتر سمجھنے میں مدد کرتا ہے۔"
  },
  "protectedFiles": {
    "description": "کوئی محفوظ فائلیں متعین نہیں۔",
    "path": "فائل پاتھ",
    "add": "پاتھ شامل کریں",
    "remove": "ہٹائیں",
    "pathPlaceholder": "مثال: .env.local",
    "help": "پاتھ /workspace/ سے متعلق ہیں۔ یہ فائلیں حساس ڈیٹا تک رسائی روکنے کے لیے خالی صرف پڑھنے والی فائلوں کے طور پر ماؤنٹ کی جائیں گی۔"
  },
  "settings": {
    "title": "settings.json",
    "description": "Claude Code کی اجازتوں کو ترتیب دیں تاکہ یہ کنٹرول کیا جا سکے کہ کون سی فائلیں پڑھی، ترمیم کی یا حاصل کی جا سکتی ہیں۔ محفوظ فائلیں خود بخود انکار کے قواعد کے طور پر شامل ہو جاتی ہیں۔",
    "permissions": "اجازتیں",
    "directive": "ہدایت",
    "pattern": "پیٹرن",
    "patternPlaceholder": "مثال: src/** یا .env",
    "addRule": "قاعدہ شامل کریں",
    "removeRule": "قاعدہ ہٹائیں",
    "allow": "اجازت دیں",
    "ask": "پوچھیں",
    "deny": "انکار کریں",
    "noAllowRules": "کوئی اجازت کا قاعدہ متعین نہیں۔",
    "noAskRules": "کوئی پوچھنے کا قاعدہ متعین نہیں۔",
    "noDenyRules": "کوئی انکار کا قاعدہ متعین نہیں۔",
    "help": "Read(), Edit() اور WebFetch() آپریشنز کے لیے اجازت کے قواعد متعین کریں۔ پیٹرن recursive مماثلت کے لیے src/** جیسی glob syntax کی حمایت کرتے ہیں۔",
    "learnMore": "مزید جانیں"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "Dockerfile یہ متعین کرتا ہے کہ کنٹینر میں کون سا سافٹ ویئر انسٹال ہوتا ہے۔ Node.js اور Claude Code کے علاوہ، TypeScript، Python، Go، ffmpeg یا ImageMagick جیسے اضافی ٹولز شامل کیے جا سکتے ہیں۔ منتخب سافٹ ویئر Claude کی جانب سے کمانڈز چلاتے وقت دستیاب ہوگا۔",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "docker-compose.yaml فائل کنٹرول کرتی ہے کہ کنٹینر کیسے شروع ہوتا ہے۔ ماحولیاتی متغیرات (جیسے API کلیدیں) یہاں متعین کی جا سکتی ہیں۔ محفوظ فائلیں خالی صرف پڑھنے والی فائلوں کے طور پر ماؤنٹ کی جاتی ہیں تاکہ Claude کو .env فائلوں جیسے حساس ڈیٹا تک رسائی سے روکا جا سکے۔"
  },
  "dockerCompose": {
    "platform": "پلیٹ فارم",
    "platformDesc": "کنٹینر کے لیے ایک مخصوص پلیٹ فارم سیٹ کریں (مثال: linux/amd64)۔ ڈیفالٹ پلیٹ فارم استعمال کرنے کے لیے خالی چھوڑیں۔ جب بیس امیجز آپ کے آرکیٹیکچر کو سپورٹ نہیں کرتے تو اسے استعمال کریں۔",
    "platformPlaceholder": "مثال: linux/amd64"
  },
  "download": {
    "button": "ZIP ڈاؤن لوڈ کریں",
    "generating": "بنا رہے ہیں...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "GitHub ریپوزٹری",
    "paypal": "PayPal سے سپورٹ کریں"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "انگریزی",
    "de": "جرمن",
    "es": "ہسپانوی",
    "fr": "فرانسیسی",
    "it": "اطالوی",
    "pt": "پرتگالی",
    "nl": "ڈچ",
    "ja": "جاپانی",
    "ko": "کوریائی",
    "zh": "چینی",
    "ar": "عربی",
    "he": "عبرانی",
    "hi": "ہندی",
    "ur": "اردو",
    "uk": "یوکرینی",
    "el": "یونانی",
    "pl": "پولش",
    "tr": "ترکی"
  },
  "importExport": {
    "exportButton": "ترتیب برآمد کریں",
    "importButton": "ترتیب درآمد کریں",
    "exportSuccess": "ترتیب کامیابی سے برآمد ہو گئی۔",
    "importSuccess": "ترتیب کامیابی سے درآمد ہو گئی۔",
    "importErrorInvalidFile": "غلط فائل فارمیٹ۔ براہ کرم ایک درست JSON فائل منتخب کریں۔",
    "importErrorValidation": "فائل میں غلط ترتیب ڈیٹا موجود ہے۔",
    "importErrorRead": "فائل پڑھی نہیں جا سکی۔ براہ کرم دوبارہ کوشش کریں۔",
    "importConfirmTitle": "ترتیب درآمد کریں",
    "importConfirmDescription": "یہ آپ کی موجودہ ترتیب کو تبدیل کر دے گا۔ یہ عمل واپس نہیں ہو سکتا۔",
    "importConfirmApply": "لاگو کریں",
    "importConfirmCancel": "منسوخ کریں",
    "diffTitle": "تبدیلیوں کا جائزہ",
    "diffBaseImage": "بنیادی امیج",
    "diffNodeVersion": "Node ورژن",
    "diffDockerPlatform": "Docker پلیٹ فارم",
    "diffSoftware": "سافٹ ویئر",
    "diffAptPackages": "APT پیکیجز",
    "diffNpmPackages": "NPM پیکیجز",
    "diffRunCommands": "RUN کمانڈز",
    "diffEnvVariables": "ماحولیاتی متغیرات",
    "diffProtectedFiles": "محفوظ فائلیں",
    "diffClaudeMd": "CLAUDE.md",
    "diffPermissions": "اجازتیں",
    "diffDevContainer": "DevContainer",
    "diffNoChanges": "کوئی تبدیلی نہیں ملی۔",
    "diffCurrent": "موجودہ",
    "diffImported": "درآمد شدہ",
    "diffChanged": "تبدیل شدہ",
    "diffUnchanged": "غیر تبدیل شدہ"
  },
  "errors": {
    "invalidEnvKey": "غلط متغیر نام۔ صرف حروف، نمبر اور انڈر سکور استعمال کریں۔",
    "duplicateEnvKey": "یہ متغیر نام پہلے سے موجود ہے۔",
    "invalidPath": "پاتھ متعلقہ ہونا چاہیے (شروع میں / نہیں) اور اس میں .. نہیں ہو سکتا"
  },
  "readme": {
    "title": "Claude Code Docker کنفیگریشن",
    "generatedBy": "[Claude Initializr]({{url}}) کی طرف سے بنایا گیا",
    "languageSwitch": "یہ {{language}} میں پڑھیں",
    "intro": {
      "title": "اس کنفیگریشن کے بارے میں",
      "description": "اس فولڈر میں ایک الگ تھلگ کنٹینر میں Claude Code کو محفوظ طریقے سے چلانے کے لیے Docker کنفیگریشن فائلیں ہیں۔ کنفیگریشن نیٹ ورک آئیسولیشن، فائل پروٹیکشن، اور AI کی مدد سے ڈیولپمنٹ کے لیے سینڈ باکسڈ ماحول فراہم کرتی ہے۔"
    },
    "files": {
      "title": "فائلوں کا جائزہ",
      "dockerfile": "Dockerfile - تمام ڈیولپمنٹ ٹولز کے ساتھ کنٹینر امیج کی وضاحت کرتا ہے",
      "dockerCompose": "docker-compose.yaml - کنٹینر شروع کرنے کے لیے آرکیسٹریشن فائل",
      "env": ".env - ماحولیاتی متغیرات (اپنی API کیز یہاں شامل کریں)",
      "initFirewall": "init-firewall.sh - سیکیورٹی کے لیے نیٹ ورک فائر وال اسکرپٹ",
      "workspace": "workspace/ - کنٹینر میں ماؤنٹ کی گئی آپ کی ورکنگ ڈائریکٹری",
      "claudeMd": "workspace/CLAUDE.md - Claude کے لیے پروجیکٹ ہدایات",
      "settingsJson": "workspace/.claude/settings.json - Claude Code اجازت کی ترتیبات",
      "devcontainer": ".devcontainer/devcontainer.json - VS Code Dev Container کنفیگریشن"
    },
    "baseImage": {
      "title": "بیس امیج",
      "description": "یہ کنفیگریشن درج ذیل Docker بیس امیج استعمال کرتی ہے:",
      "dockerHub": "Docker Hub پر دیکھیں"
    },
    "platform": {
      "title": "پلیٹ فارم",
      "description": "کنٹینر اس پلیٹ فارم پر چلنے کے لیے کنفیگر ہے:"
    },
    "aptPackages": {
      "title": "سسٹم پیکیجز (APT)",
      "description": "درج ذیل سسٹم پیکیجز انسٹال ہیں:"
    },
    "npmPackages": {
      "title": "اضافی NPM پیکیجز",
      "description": "درج ذیل اضافی NPM پیکیجز گلوبل طور پر انسٹال ہیں:",
      "installedAs": "{{user}} کے طور پر انسٹال"
    },
    "envVariables": {
      "title": "ماحولیاتی متغیرات",
      "description": "درج ذیل ماحولیاتی متغیرات کنفیگر ہیں (سیکیورٹی کے لیے قدریں نہیں دکھائی گئیں):",
      "note": "کنٹینر شروع کرنے سے پہلے .env فائل میں اپنی اصل قدریں شامل کریں۔"
    },
    "protectedFiles": {
      "title": "محفوظ فائلیں",
      "description": "درج ذیل فائلیں محفوظ ہیں اور رسائی روکنے کے لیے خالی صرف پڑھنے والی فائلوں کے طور پر ماؤنٹ ہیں:"
    },
    "settingsJson": {
      "title": "اجازت کی ترتیبات",
      "description": "Claude Code درج ذیل اجازت کے قواعد کے ساتھ کنفیگر ہے:",
      "allow": "اجازت شدہ آپریشنز (خودکار)",
      "ask": "تصدیق کی ضرورت والے آپریشنز",
      "deny": "انکار شدہ آپریشنز"
    },
    "claudeMd": {
      "title": "پروجیکٹ ہدایات",
      "description": "Claude کے لیے پروجیکٹ کے مخصوص ہدایات یہاں متعین ہیں:"
    },
    "quickStart": {
      "title": "فوری آغاز",
      "step1": "Docker انسٹال کریں (نیچے ضروریات دیکھیں)",
      "step2": "کنٹینر شروع کریں:",
      "step2CustomVersions": "اختیاری: حسب ضرورت سافٹ ویئر ورژن کے ساتھ بنائیں (نیچے Docker Build Arguments دیکھیں):",
      "step3": "Claude Code شروع کریں:",
      "step4": "کنٹینر بند کریں:",
      "note": "آپ کا workspace فولڈر کنٹینر کے اندر /workspace پر ماؤنٹ ہے۔ لاگ ان کے اختیارات کے لیے نیچے تصدیق کا سیکشن دیکھیں۔"
    },
    "authentication": {
      "title": "تصدیق",
      "description": "Claude Code دو تصدیقی طریقوں کی حمایت کرتا ہے۔ وہ منتخب کریں جو آپ کی ضروریات کے لیے بہترین ہو:",
      "apiKey": {
        "title": "آپشن 1: API کلید",
        "description": "اپنی API کلید `.env` فائل میں سیٹ کریں (`ANTHROPIC_API_KEY`)۔ Claude Code خود بخود اسے استعمال کرے گا۔",
        "pros": [
          "headless/خودکار ماحول میں کام کرتا ہے (CI/CD، کنٹینرز، SSH)",
          "براؤزر کی ضرورت نہیں",
          "استعمال کی کوئی حد نہیں (استعمال کے مطابق ادائیگی)",
          "تمام ماحول میں قابل اعتماد"
        ],
        "cons": [
          "ہر API کال پر لاگت آتی ہے (معیاری API نرخ)",
          "API کلید کا انتظام اور حفاظت کرنی ہوگی",
          "خرچ کی حد کے بغیر غیر متوقع چارجز ہو سکتے ہیں"
        ]
      },
      "browserLogin": {
        "title": "آپشن 2: براؤزر لاگ ان (Claude Pro/Max/Team)",
        "description": "Claude Code میں `/login` چلائیں تاکہ براؤزر کے ذریعے اپنی سبسکرپشن سے تصدیق کریں۔",
        "pros": [
          "آپ کی سبسکرپشن میں شامل (متوقع ماہانہ لاگت)",
          "کوئی اضافی API لاگت نہیں",
          "Claude.ai کے ساتھ متحد بلنگ"
        ],
        "cons": [
          "پہلے لاگ ان کے لیے براؤزر درکار",
          "استعمال کی حدیں ہیں جو ہفتہ وار ری سیٹ ہوتی ہیں",
          "کنٹینرز/SSH سیشنز میں تصدیق برقرار نہیں رہ سکتی"
        ]
      }
    },
    "buildArgs": {
      "title": "Docker Build Arguments",
      "description": "آپ Docker بلڈ کے دوران سافٹ ویئر ورژن اور ڈاؤن لوڈ URLs ترتیب دے سکتے ہیں۔ ڈیفالٹ اقدار کو اوور رائڈ کرنے کے لیے `--build-arg نام=قدر` استعمال کریں۔",
      "versionArgs": {
        "title": "ورژن آرگومنٹس",
        "description": "کنٹرول کریں کہ کون سے سافٹ ویئر ورژن انسٹال ہوتے ہیں:"
      },
      "urlArgs": {
        "title": "URL آرگومنٹس",
        "description": "مررز یا پراکسی کے لیے ڈاؤن لوڈ URLs اوور رائڈ کریں:"
      },
      "defaultValue": "ڈیفالٹ",
      "example": "حسب ضرورت ورژن کی مثال:"
    },
    "prerequisites": {
      "title": "ضروریات",
      "description": "آپ کو اپنے سسٹم پر Docker انسٹال کرنا ہوگا۔ اپنا آپریٹنگ سسٹم منتخب کریں:",
      "windows": {
        "title": "Windows",
        "steps": [
          "docker.com/products/docker-desktop سے Docker Desktop ڈاؤن لوڈ کریں",
          "انسٹالر چلائیں اور سیٹ اپ وزرڈ کی پیروی کریں",
          "پوچھے جانے پر WSL 2 backend فعال کریں (تجویز کردہ)",
          "اگر ضرورت ہو تو کمپیوٹر دوبارہ شروع کریں",
          "Docker Desktop کھولیں اور اس کے شروع ہونے کا انتظار کریں"
        ],
        "link": "سرکاری Windows انسٹالیشن گائیڈ"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "docker.com/products/docker-desktop سے Docker Desktop ڈاؤن لوڈ کریں",
          ".dmg فائل کھولیں اور Docker کو Applications میں گھسیٹیں",
          "Applications فولڈر سے Docker کھولیں",
          "پوچھے جانے پر مطلوبہ اجازتیں دیں",
          "Docker کے شروع ہونے کا انتظار کریں (مینو بار میں وہیل آئیکن)"
        ],
        "link": "سرکاری macOS انسٹالیشن گائیڈ"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "پیکیج انڈیکس اپڈیٹ کریں: sudo apt update",
          "Docker انسٹال کریں: sudo apt install docker.io docker-compose-v2",
          "اپنے صارف کو docker گروپ میں شامل کریں: sudo usermod -aG docker $USER",
          "گروپ تبدیلیاں لاگو ہونے کے لیے لاگ آؤٹ اور لاگ ان کریں",
          "انسٹالیشن کی تصدیق کریں: docker --version"
        ],
        "link": "سرکاری Linux انسٹالیشن گائیڈ",
        "altNote": "یا GUI تجربے کے لیے Docker Desktop انسٹال کریں۔"
      }
    },
    "troubleshooting": {
      "title": "مسئلہ حل کرنا",
      "issues": {
        "containerNotStarting": {
          "title": "کنٹینر شروع نہیں ہوتا",
          "solutions": [
            "چیک کریں کہ Docker چل رہا ہے: docker info",
            "تصدیق کریں کہ .env فائل موجود ہے اور ANTHROPIC_API_KEY ہے",
            "پورٹ تنازعات چیک کریں: docker ps",
            "کنٹینر لاگز دیکھیں: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "اجازت مسترد کی غلطیاں",
          "solutions": [
            "Linux پر، یقینی بنائیں کہ آپ کا صارف docker گروپ میں ہے",
            "sudo کے ساتھ چلانے کی کوشش کریں (باقاعدہ استعمال کے لیے تجویز نہیں)",
            "workspace فولڈر میں فائل کی اجازتیں چیک کریں"
          ]
        },
        "networkIssues": {
          "title": "نیٹ ورک یا API کنکشن کے مسائل",
          "solutions": [
            "فائر وال اسکرپٹ صرف مخصوص ڈومینز کی اجازت دیتی ہے",
            "یقینی بنائیں کہ api.anthropic.com آپ کے نیٹ ورک سے قابل رسائی ہے",
            "کنٹینر کے اندر فائر وال لاگز چیک کریں: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "کنٹینر میں فائلیں قابل رسائی نہیں",
          "solutions": [
            "محفوظ فائلیں جان بوجھ کر خالی ہیں - یہ متوقع ہے",
            "docker-compose.yaml میں والیوم ماؤنٹس چیک کریں",
            "یقینی بنائیں کہ workspace فولڈر ہوسٹ پر موجود ہے"
          ]
        }
      }
    },
    "links": {
      "title": "لنکس",
      "initializer": "نئی کنفیگریشن بنائیں",
      "documentation": "Claude Code دستاویزات",
      "support": "مسائل کی رپورٹ کریں"
    },
    "author": {
      "title": "مصنف",
      "createdBy": "بنایا گیا",
      "support": "اس پروجیکٹ کی سپورٹ کریں"
    },
    "software": {
      "title": "انسٹال شدہ سافٹ ویئر",
      "description": "درج ذیل ڈیولپمنٹ ٹولز انسٹال ہیں:"
    },
    "devContainer": {
      "title": "VS Code Dev Container",
      "description": "اس کنفیگریشن میں ہموار ڈیولپمنٹ کے لیے VS Code Dev Container سیٹ اپ شامل ہے۔",
      "extensions": "درج ذیل VS Code ایکسٹینشنز خودکار طور پر انسٹال ہوتی ہیں:",
      "features": "درج ذیل Dev Container فیچرز شامل ہیں:",
      "ports": "درج ذیل پورٹس فارورڈ کیے جاتے ہیں:",
      "commands": "کنفیگر کردہ لائف سائیکل کمانڈز:",
      "vscodeOpen": "VS Code میں کھولیں",
      "codespacesOpen": "GitHub Codespaces میں کھولیں"
    }
  },
  "keyboardShortcuts": {
    "title": "کی بورڈ شارٹ کٹس",
    "description": "تیزی سے نیویگیٹ کرنے اور عمل انجام دینے کے لیے کی بورڈ شارٹ کٹس استعمال کریں۔",
    "openHelp": "کی بورڈ شارٹ کٹس",
    "categories": {
      "navigation": "نیویگیشن",
      "actions": "اعمال"
    },
    "shortcuts": {
      "downloadZip": "ZIP ڈاؤن لوڈ کریں",
      "forceSave": "زبردستی محفوظ کریں",
      "resetDefaults": "ڈیفالٹ پر ری سیٹ کریں",
      "togglePreview": "پیش نظارہ ٹوگل کریں",
      "scrollToCard": "کارڈ {{number}} پر سکرول کریں",
      "toggleDarkMode": "ڈارک موڈ ٹوگل کریں",
      "openLanguageSwitcher": "زبان منتخب کنندہ کھولیں",
      "closeDialog": "ڈائیلاگ بند کریں",
      "openShortcutsHelp": "کی بورڈ شارٹ کٹس کھولیں",
      "undo": "واپس کریں",
      "redo": "دوبارہ کریں"
    },
    "announced": {
      "downloadStarted": "ڈاؤن لوڈ شروع ہو گیا",
      "configReset": "کنفیگریشن ڈیفالٹ پر ری سیٹ ہو گئی",
      "darkModeToggled": "ڈارک موڈ ٹوگل ہو گیا",
      "previewToggled": "پیش نظارہ ٹوگل ہو گیا",
      "scrolledToCard": "کارڈ {{number}} پر سکرول ہو گیا",
      "undoPerformed": "تبدیلی واپس کی گئی",
      "redoPerformed": "تبدیلی دوبارہ کی گئی"
    }
  },
  "history": {
    "title": "ہسٹری",
    "description": "پچھلی کنفیگریشنز دیکھیں اور بحال کریں۔",
    "unavailable": "اس براؤزر میں ہسٹری دستیاب نہیں ہے۔",
    "undo": "واپس کریں",
    "redo": "دوبارہ کریں",
    "clearAll": "سب صاف کریں",
    "clearConfirmTitle": "ہسٹری صاف کریں",
    "clearConfirmDescription": "کیا آپ واقعی تمام ہسٹری صاف کرنا چاہتے ہیں؟ یہ عمل واپس نہیں ہو سکتا۔",
    "clearConfirmCancel": "منسوخ کریں",
    "clearConfirmClear": "صاف کریں",
    "currentState": "موجودہ",
    "restoreButton": "بحال کریں",
    "viewDiffButton": "فرق دیکھیں",
    "emptyState": "ابھی تک کوئی ہسٹری نہیں۔ تبدیلیاں خودکار طور پر ٹریک ہوں گی۔",
    "diffTitle": "تبدیلیوں کا موازنہ",
    "diffFrom": "سے",
    "diffTo": "تک",
    "diffClose": "بند کریں",
    "changes": {
      "initial": "ابتدائی حالت",
      "baseImage": "بیس امیج تبدیل کی گئی",
      "nodeVersion": "Node ورژن تبدیل کیا گیا",
      "dockerPlatform": "Docker پلیٹ فارم تبدیل کیا گیا",
      "softwareEnabled": "{{software}} فعال کیا گیا",
      "softwareDisabled": "{{software}} غیر فعال کیا گیا",
      "aptPackagesAdded": "APT پیکیجز شامل کیے گئے",
      "aptPackagesRemoved": "APT پیکیجز ہٹائے گئے",
      "npmPackagesAdded": "NPM پیکیجز شامل کیے گئے",
      "npmPackagesRemoved": "NPM پیکیجز ہٹائے گئے",
      "runCommandsAdded": "RUN کمانڈز شامل کی گئیں",
      "runCommandsRemoved": "RUN کمانڈز ہٹائی گئیں",
      "envVariablesAdded": "ماحولیاتی متغیرات شامل کیے گئے",
      "envVariablesRemoved": "ماحولیاتی متغیرات ہٹائے گئے",
      "envVariablesChanged": "ماحولیاتی متغیرات میں ترمیم کی گئی",
      "protectedFilesAdded": "محفوظ فائلیں شامل کی گئیں",
      "protectedFilesRemoved": "محفوظ فائلیں ہٹائی گئیں",
      "claudeMdChanged": "CLAUDE.md میں ترمیم کی گئی",
      "permissionsChanged": "اجازتوں میں ترمیم کی گئی",
      "devContainerChanged": "DevContainer سیٹنگز میں ترمیم کی گئی",
      "multipleChanges": "متعدد تبدیلیاں"
    }
  },
  "devContainer": {
    "title": "DevContainer",
    "description": "VS Code Dev Containers اور GitHub Codespaces سپورٹ کنفیگر کریں۔ یہ ایک devcontainer.json فائل بناتا ہے جو آپ کا ڈویلپمنٹ ماحول متعین کرتی ہے۔",
    "enable": "DevContainer فعال کریں",
    "enableDesc": "VS Code Dev Containers اور GitHub Codespaces کے لیے devcontainer.json فائل بنائیں۔",
    "name": "کنٹینر نام",
    "nameDesc": "ڈویلپمنٹ کنٹینر کا ظاہری نام۔",
    "namePlaceholder": "مثال: میرا ڈیو ماحول",
    "tabs": {
      "settings": "ترتیبات",
      "extensions": "ایکسٹینشنز",
      "features": "فیچرز",
      "ports": "پورٹس",
      "preview": "پیش نظارہ"
    },
    "extensions": {
      "title": "VS Code ایکسٹینشنز",
      "description": "ایکسٹینشنز جو کنٹینر بنتے وقت خودکار طور پر انسٹال ہوں گی۔",
      "placeholder": "مثال: ms-python.python",
      "add": "ایکسٹینشن شامل کریں",
      "remove": "{{extension}} ہٹائیں",
      "recommended": "تجویز کردہ ایکسٹینشنز",
      "recommendedDesc": "آپ کے منتخب سافٹ ویئر کی بنیاد پر، یہ ایکسٹینشنز تجویز کی جاتی ہیں۔",
      "addRecommended": "تجویز کردہ شامل کریں",
      "noRecommendations": "موجودہ سافٹ ویئر انتخاب کی بنیاد پر کوئی تجویز نہیں۔"
    },
    "features": {
      "title": "Dev Container فیچرز",
      "description": "فیچرز انسٹالیشن کوڈ اور کنفیگریشن کی خود مختار اکائیاں ہیں۔",
      "placeholder": "مثال: ghcr.io/devcontainers/features/python:1",
      "add": "فیچر شامل کریں",
      "remove": "{{feature}} ہٹائیں",
      "recommended": "تجویز کردہ فیچرز",
      "recommendedDesc": "آپ کے منتخب سافٹ ویئر کی بنیاد پر، یہ فیچرز تجویز کیے جاتے ہیں۔",
      "addRecommended": "تجویز کردہ شامل کریں",
      "noRecommendations": "موجودہ سافٹ ویئر انتخاب کی بنیاد پر کوئی تجویز نہیں۔"
    },
    "ports": {
      "title": "فارورڈ شدہ پورٹس",
      "description": "پورٹس جو خودکار طور پر کنٹینر سے ہوسٹ پر فارورڈ ہوں گے۔",
      "placeholder": "مثال: 3000",
      "add": "پورٹ شامل کریں",
      "remove": "پورٹ {{port}} ہٹائیں",
      "invalid": "براہ کرم ایک درست پورٹ نمبر درج کریں (1-65535)۔"
    },
    "scripts": {
      "title": "لائف سائیکل اسکرپٹس",
      "description": "Bash اسکرپٹس جو کنٹینر لائف سائیکل کے مختلف مراحل میں چلتی ہیں۔ ہر اسکرپٹ ایک الگ .sh فائل کے طور پر محفوظ ہوتی ہے۔",
      "tabs": {
        "postCreate": "post-create.sh",
        "postStart": "post-start.sh",
        "postAttach": "post-attach.sh"
      },
      "postCreateTitle": "Post Create اسکرپٹ",
      "postCreateDesc": "کنٹینر بننے کے بعد ایک بار چلتی ہے۔ ڈیپنڈنسیز انسٹال کرنے جیسی ایک بار کی سیٹ اپ کے لیے استعمال کریں۔",
      "postStartTitle": "Post Start اسکرپٹ",
      "postStartDesc": "ہر بار کنٹینر شروع ہونے پر چلتی ہے۔ ہر سٹارٹ پر چلنے والے کاموں کے لیے استعمال کریں۔",
      "postAttachTitle": "Post Attach اسکرپٹ",
      "postAttachDesc": "ہر بار VS Code کنٹینر سے منسلک ہونے پر چلتی ہے۔",
      "editorPlaceholder": "# یہاں اپنے bash کمانڈز درج کریں..."
    },
    "settings": {
      "title": "VS Code ترتیبات",
      "description": "ڈویلپمنٹ کنٹینر کے لیے اپنی مرضی کی VS Code ترتیبات۔",
      "key": "ترتیب کی کلید",
      "value": "قدر",
      "keyPlaceholder": "مثال: editor.formatOnSave",
      "valuePlaceholder": "مثال: true",
      "add": "ترتیب شامل کریں",
      "remove": "ترتیب ہٹائیں"
    }
  }
};

export default ur;
