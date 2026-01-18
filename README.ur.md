<div dir="rtl">

# Claude Initializr

**🌐 دوسری زبانوں میں پڑھیں:**
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

[![لائسنس: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![عطیہ](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

[Claude Code](https://docs.anthropic.com/en/docs/claude-code) کو کنٹینرائزڈ ماحول میں محفوظ طریقے سے چلانے کے لیے Docker کنفیگریشن فائلیں بنانے والی ایک ویب ایپلیکیشن۔

**لائیو ڈیمو:** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## خصوصیات

### Dockerfile کنفیگریشن

- **بیس امیج**: Docker بیس امیج کا نام اور ورژن کنفیگر کریں (ڈیفالٹ: `node:24`)
- **سافٹ ویئر کا انتخاب**: انسٹال کرنے کے لیے اضافی سافٹ ویئر منتخب کریں:
  - ffmpeg (آڈیو/ویڈیو پروسیسنگ)
  - Flutter (Dart اور Android SDK شامل ہے)
  - Go
  - ImageMagick (امیج پروسیسنگ)
  - Python 3
  - TypeScript
  - uv (تیز Python پیکیج انسٹالر، Python کی سفارش کرتا ہے)
- **ورژن کنفیگریشن**: سافٹ ویئر ورژن Docker بلڈ آرگیومینٹس کے ذریعے کنفیگر کیے جاتے ہیں (مثال: `--build-arg GO_VERSION=1.22.0`)
- **حسب ضرورت APT پیکجز**: کنٹینر میں انسٹال کرنے کے لیے اضافی Debian/Ubuntu پیکجز شامل کریں
- **حسب ضرورت NPM پیکجز**: عالمی طور پر انسٹال کرنے کے لیے اضافی NPM پیکجز شامل کریں، `root` یا `node` صارف کے طور پر انسٹال کرنے کا آپشن
- **حسب ضرورت RUN کمانڈز**: Docker امیج بلڈ کے دوران چلانے کے لیے حسب ضرورت shell کمانڈز شامل کریں، `root` یا `node` صارف کے طور پر چلانے کا آپشن
- **Claude Code پلگ انز**: `plugin-name@marketplace-name` فارمیٹ استعمال کرتے ہوئے مارکیٹ پلیسز سے Claude Code پلگ انز انسٹال کریں
  - **پلگ ان تجاویز**: [سرکاری Anthropic مارکیٹ پلیس](https://github.com/anthropics/claude-plugins-official) سے پس منظر میں خودکار طور پر پلگ ان تجاویز لوڈ کرتا ہے
  - تجویز کردہ پلگ انز شامل کرنے کے لیے ایک کلک
  - GitHub پر پلگ انز دیکھنے کے لیے بیرونی لنکس

### docker-compose.yaml کنفیگریشن

- **ماحولیاتی متغیرات**: اپنی `.env` فائل کے لیے ماحولیاتی متغیرات کنفیگر کریں
- **محفوظ فائلیں**: ایسی فائلیں متعین کریں جنہیں خالی صرف پڑھنے والی فائلیں ماؤنٹ کر کے محفوظ کیا جانا چاہیے (`.env.local` جیسی حساس فائلوں تک رسائی روکتا ہے)

### CLAUDE.md ایڈیٹر

- سنٹیکس ہائی لائٹنگ کے ساتھ Markdown ایڈیٹر
- بلٹ ان پریویو فنکشنالٹی
- Claude کے لیے پروجیکٹ مخصوص ہدایات لکھیں

### settings.json کنفیگریشن

- **اجازت کے قواعد**: فائل رسائی کا انتظام کرنے کے لیے Claude Code اجازتیں کنفیگر کریں
  - `Allow` - خود بخود اجازت یافتہ آپریشنز کے لیے قواعد
  - `Ask` - صارف کی تصدیق درکار قواعد
  - `Deny` - ہمیشہ مسترد ہونے والے قواعد
- **معاون ہدایات**:
  - `Read()` - طے کرتا ہے کہ Claude کون سی فائلیں پڑھ سکتا ہے (مثال: `Read(src/**)`)
  - `Edit()` - طے کرتا ہے کہ Claude کون سی فائلیں ایڈٹ کر سکتا ہے (مثال: `Edit(.env)`)
  - `WebFetch()` - نیٹ ورک رسائی کو کنٹرول کرتا ہے (مثال: `WebFetch(https://api.github.com:*)`)
- **خودکار انضمام**: محفوظ فائلیں خود بخود `Read()` انکار قواعد کے طور پر شامل ہوتی ہیں
- **Glob پیٹرن سپورٹ**: تکراری میچنگ کے لیے `src/**` جیسے پیٹرن استعمال کریں

### عمومی خصوصیات

- **لائیو پریویو**: بنائی گئی کنفیگریشن فائلوں کا ریئل ٹائم پریویو دیکھیں
- **ZIP ڈاؤن لوڈ**: تمام فائلیں استعمال کے لیے تیار ZIP آرکائیو کے طور پر ڈاؤن لوڈ کریں
- **آٹو سیو**: سیٹنگز آپ کے براؤزر کے localStorage میں خود بخود محفوظ ہو جاتی ہیں (بطور ڈیفالٹ فعال)
- **کثیر لسانی معاونت**: 18 زبانوں میں دستیاب:
  - 🌍 عربی
  - 🇨🇳 چینی
  - 🇳🇱 ڈچ
  - 🇬🇧 انگریزی
  - 🇫🇷 فرانسیسی
  - 🇩🇪 جرمن
  - 🇬🇷 یونانی
  - 🇮🇱 عبرانی
  - 🇮🇳 ہندی
  - 🇮🇹 اطالوی
  - 🇯🇵 جاپانی
  - 🇰🇷 کوریائی
  - 🇵🇱 پولش
  - 🇵🇹 پرتگالی
  - 🇪🇸 ہسپانوی
  - 🇹🇷 ترکی
  - 🇺🇦 یوکرینی
  - 🇵🇰 اردو
- **ڈارک/لائٹ تھیم**: دستی ٹوگل کے ساتھ خودکار تھیم کی شناخت
- **PWA سپورٹ**: Progressive Web App کے طور پر انسٹال کرنے کے قابل
- **مکمل طور پر قابل رسائی**: کی بورڈ نیویگیشن اور سکرین ریڈر سپورٹ کے ساتھ WCAG مطابق
- **ریسپانسیو ڈیزائن**: ڈیسک ٹاپ اور ٹیبلٹ کے لیے بہتر بنایا گیا

### آٹو سیو میکانزم

آٹو سیو فیچر ہیڈر میں سیو آئیکن کا استعمال کرتے ہوئے ٹوگل کیا جا سکتا ہے:

| آئیکن           | حیثیت     | رویہ                                                          |
| --------------- | --------- | ------------------------------------------------------------- |
| 💾 (سیو)        | فعال      | تمام تبدیلیاں خود بخود localStorage میں محفوظ ہوتی ہیں        |
| 🚫💾 (بند)      | غیر فعال  | تبدیلیاں محفوظ نہیں ہوتیں؛ موجودہ محفوظ ڈیٹا صاف ہو جاتا ہے   |

**یہ کیسے کام کرتا ہے:**

- **آٹو سیو فعال کرنا**: موجودہ سیٹنگز کو فوری طور پر localStorage میں محفوظ کرتا ہے
- **آٹو سیو غیر فعال کرنا**: localStorage سے تمام محفوظ سیٹنگز صاف کرتا ہے
- آپ کی آٹو سیو ترجیح سیشنز میں یاد رکھی جاتی ہے

### رازداری اور ڈیٹا سٹوریج

یہ ایپلیکیشن آپ کی رازداری کا احترام کرتی ہے:

- **صرف مقامی سٹوریج**: تمام سیٹنگز آپ کے براؤزر میں مقامی طور پر محفوظ ہوتی ہیں (localStorage)
- **سرور کمیونیکیشن نہیں**: کوئی بھی ڈیٹا کبھی کسی سرور کو نہیں بھیجا جاتا
- **ڈیزائن سے محفوظ**: ماحولیاتی متغیرات کی **قدریں کبھی محفوظ نہیں ہوتیں** - صرف متغیر کے نام محفوظ ہوتے ہیں
- **مکمل کنٹرول**: آپ ہیڈر میں ٹوگل کا استعمال کرتے ہوئے کسی بھی وقت آٹو سیو کو غیر فعال کر سکتے ہیں، جو تمام محفوظ ڈیٹا بھی صاف کر دیتا ہے
- **سیشن پر مبنی تھیم**: صفحہ دوبارہ لوڈ کرنے پر تھیم کی ترجیح سسٹم ڈیفالٹ پر ری سیٹ ہو جاتی ہے

## سیکیورٹی خصوصیات

بنائی گئی Docker کنفیگریشن میں جامع سیکیورٹی اقدامات شامل ہیں:

### نیٹ ورک فائر وال

`init-firewall.sh` اسکرپٹ سخت نیٹ ورک آئسولیشن نافذ کرتی ہے:

- **iptables پر مبنی فائر وال** تمام آؤٹ باؤنڈ ٹریفک کے لیے DROP پالیسی کے ساتھ
- **صرف اجازت کی فہرست کا طریقہ** - صرف منظور شدہ ڈومینز قابل رسائی ہیں:
  - `api.anthropic.com` - Claude API
  - `npm registry` - پیکج انسٹالیشن
  - `github.com` - Git آپریشنز
  - `sentry.io` - ایرر رپورٹنگ
- **خودکار GitHub IP ریزولوشن** ویب، API اور git اینڈ پوائنٹس کے لیے
- **ہوسٹ نیٹ ورک آئسولیشن** - مقامی نیٹ ورک تک رسائی روکتا ہے
- **فائر وال تصدیق** - ٹیسٹ یقینی بناتے ہیں کہ قوانین صحیح طریقے سے لاگو ہیں

### Docker سیکیورٹی ہارڈننگ

- **کیپیبلٹی ڈراپنگ**: تمام Linux کیپیبلٹیز ہٹا دی جاتی ہیں (`cap_drop: ALL`)
- **پریویلج ایسکیلیشن نہیں**: `no-new-privileges:true`
- **ریسورس لمٹس**: CPU اور میموری کی پابندیاں
- **صرف پڑھنے کے لیے ماؤنٹس**: محفوظ فائلیں صرف پڑھنے کے لیے ماؤنٹ ہوتی ہیں
- **نان روٹ ایگزیکیوشن**: `node` صارف کے طور پر چلتا ہے

## پہلے سے انسٹال شدہ ٹولز

بنایا گیا کنٹینر شامل ہے:

| زمرہ              | ٹولز                                |
| ----------------- | ----------------------------------- |
| **شیل**           | zsh Powerline10k تھیم کے ساتھ، bash |
| **ایڈیٹرز**       | nano، vim                           |
| **ورژن کنٹرول**  | git، git-delta، GitHub CLI (gh)     |
| **یوٹیلیٹیز**    | fzf، jq، less، unzip، man-db        |
| **نیٹ ورک**       | iptables، ipset، iproute2، dnsutils |

## شروع کرنا

### پیشگی ضروریات

- Node.js 20 یا بعد کا
- npm 10 یا بعد کا

### انسٹالیشن

```bash
# ریپازٹری کلون کریں
git clone https://github.com/mkloubert/claude-initializr.git
cd claude-initializr

# ڈیپنڈنسیز انسٹال کریں
npm install

# ڈیولپمنٹ سرور شروع کریں
npm run dev

# پروڈکشن کے لیے بلڈ کریں
npm run build

# پروڈکشن بلڈ پریویو کریں
npm run preview
```

### ماحولیاتی متغیرات

ماحولیاتی متغیرات کا استعمال کرتے ہوئے ایپلیکیشن کو حسب ضرورت بنائیں۔ ایک `.env` فائل بنائیں:

```bash
# GitHub ریپازٹری URL (اختیاری، چھپانے کے لیے خالی چھوڑیں)
VITE_GITHUB_URL=https://github.com/mkloubert/claude-initializr

# PayPal عطیہ URL (اختیاری، چھپانے کے لیے خالی چھوڑیں)
VITE_PAYPAL_URL=https://paypal.me/mjkloubert

# Claude Code permissions documentation URL (optional)
VITE_PERMISSIONS_DOCS_URL=https://docs.anthropic.com/en/docs/claude-code/settings#permission-settings

# Author website URL (optional)
VITE_AUTHOR_URL=https://marcel.coffee

# Author name displayed in footer (optional)
VITE_AUTHOR_NAME=Marcel Joachim Kloubert
```

## استعمال

1. **بیس امیج کنفیگر کریں**: Docker بیس امیج کا نام اور ورژن سیٹ کریں (مثلاً، `node:24` یا `node:22-slim`)

2. **سافٹ ویئر منتخب کریں**: اپنے کنٹینر میں انسٹال کرنے کے لیے اضافی سافٹ ویئر منتخب کریں

3. **حسب ضرورت پیکجز اور کمانڈز شامل کریں**:
   - حسب ضرورت APT پیکجز شامل کریں (مثلاً، `curl`، `graphviz`، `sqlite3`)
   - عالمی طور پر انسٹال کرنے کے لیے حسب ضرورت NPM پیکجز شامل کریں (مثلاً، `eslint`، `prettier`)
   - منتخب کریں کہ NPM پیکجز `node` (ڈیفالٹ) یا `root` صارف کے طور پر انسٹال ہونے چاہئیں
   - بلڈ کے دوران چلانے کے لیے حسب ضرورت RUN کمانڈز شامل کریں (مثلاً، `pip install numpy`)
   - منتخب کریں کہ RUN کمانڈز `node` (ڈیفالٹ) یا `root` صارف کے طور پر چلنی چاہئیں

4. **ماحولیاتی متغیرات سیٹ کریں**: اپنے پروجیکٹ کو جن ماحولیاتی متغیرات کی ضرورت ہے وہ شامل کریں (مثلاً، `ANTHROPIC_API_KEY`)

5. **حساس فائلوں کی حفاظت کریں**: ان فائلوں کے راستے شامل کریں جنہیں محفوظ کیا جانا چاہیے (مثلاً، `.env.local`)

6. **CLAUDE.md میں ترمیم کریں**: Markdown ایڈیٹر میں Claude کے لیے ہدایات لکھیں

7. **اجازتیں کنفیگر کریں**: settings.json کارڈ کے ذریعے اجازت کے قواعد سیٹ کریں
   - خود بخود منظور شدہ آپریشنز کے لیے `Allow` قواعد شامل کریں
   - تصدیق درکار آپریشنز کے لیے `Ask` قواعد شامل کریں
   - ممنوعہ آپریشنز کے لیے `Deny` قواعد شامل کریں
   - محفوظ فائلیں خود بخود `Read()` انکار قواعد کے طور پر شامل ہوتی ہیں

8. **پریویو**: پریویو ٹیبز میں بنائی گئی کنفیگریشن فائلیں چیک کریں

9. **ڈاؤن لوڈ**: تمام فائلیں حاصل کرنے کے لیے "ZIP ڈاؤن لوڈ کریں" پر کلک کریں

## بنائی گئی فائلوں کا استعمال

1. ZIP فائل کو اپنی پروجیکٹ ڈائریکٹری میں نکالیں

2. اپنی پروجیکٹ فائلیں `workspace` فولڈر میں کاپی کریں (یا اپنا موجودہ پروجیکٹ ماؤنٹ کریں)

3. اپنی API کلید `.env` فائل میں سیٹ کریں:

   ```bash
   ANTHROPIC_API_KEY=آپ-کی-api-کلید-یہاں
   ```

4. کنٹینر بلڈ اور رن کریں:

   ```bash
   docker compose up --build
   ```

   **اختیاری: اپنی مرضی کے ڈاؤن لوڈ URLs**

   اگر آپ کو پیکیج ڈاؤن لوڈ کے لیے مرر یا پراکسی استعمال کرنا ہو، تو آپ بلڈ کے دوران ڈیفالٹ URLs کو اوور رائیڈ کر سکتے ہیں۔ تمام URLs کوئری پیرامیٹرز کو سپورٹ کرتے ہیں:

   ```bash
   docker compose build \
     --build-arg GO_JSON_URL=https://my-mirror.example.com/golang/?mode=json \
     --build-arg GO_DOWNLOAD_URL=https://my-mirror.example.com/golang \
     --build-arg FLUTTER_JSON_URL=https://my-mirror.example.com/flutter/releases_linux.json \
     --build-arg FLUTTER_BASE_URL=https://my-mirror.example.com/flutter/releases \
     --build-arg UV_INSTALL_SCRIPT_URL=https://my-mirror.example.com/uv/install.sh
   ```

   | بلڈ آرگومنٹ | ڈیفالٹ | تفصیل |
   |-------------|--------|-------|
   | `GO_JSON_URL` | `https://go.dev/dl/?mode=json` | Go ورژن JSON API URL (صرف "latest" کے لیے) |
   | `GO_DOWNLOAD_URL` | `https://go.dev/dl` | Go آرکائیو ڈاؤن لوڈ کے لیے بیس URL |
   | `FLUTTER_JSON_URL` | `https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json` | Flutter ریلیز JSON API URL (صرف "latest" کے لیے) |
   | `FLUTTER_BASE_URL` | `https://storage.googleapis.com/flutter_infra_release/releases` | Flutter آرکائیو ڈاؤن لوڈ کے لیے بیس URL |
   | `UV_INSTALL_SCRIPT_URL` | `https://astral.sh/uv/install.sh` | uv انسٹال سکرپٹ URL |

5. کنٹینر سے کنیکٹ کریں:

   ```bash
   docker compose exec claude zsh
   ```

6. فائر وال شروع کریں (sudo پاس ورڈ درکار ہے):

   ```bash
   sudo /usr/local/bin/init-firewall.sh
   ```

7. Claude Code شروع کریں:
   ```bash
   claude
   ```

## بنائی گئی فائل کی ساخت

```
├── workspace/
│   ├── .claude/
│   │   └── settings.json    # Claude سیٹنگز
│   ├── .empty               # محفوظ ماؤنٹس کے لیے خالی فائل
│   └── CLAUDE.md            # آپ کی Claude ہدایات
├── .env                     # ماحولیاتی متغیرات
├── Dockerfile               # کنٹینر ڈیفینیشن
├── docker-compose.yaml      # Docker Compose کنفیگریشن
└── init-firewall.sh         # نیٹ ورک فائر وال اسکرپٹ
```

## مسائل کا حل

### فائر وال مسائل

اگر آپ فائر وال فعال کرنے کے بعد نیٹ ورک مسائل کا سامنا کرتے ہیں:

```bash
# فائر وال کی حیثیت چیک کریں
sudo iptables -L -n

# بلاک کیے گئے کنیکشنز دیکھیں
sudo iptables -L -n -v | grep DROP

# فائر وال ری سیٹ کریں (تمام ٹریفک کی اجازت دیتا ہے)
sudo iptables -F
```

### کنٹینر شروع نہیں ہوگا

```bash
# لاگز چیک کریں
docker compose logs

# کیش کے بغیر دوبارہ بلڈ کریں
docker compose build --no-cache
```

### اجازت سے انکار

یقینی بنائیں کہ workspace ڈائریکٹری میں صحیح اجازتیں ہیں:

```bash
chmod -R 755 workspace
```

### ایپلیکیشن سیٹنگز ری سیٹ کریں

تمام محفوظ سیٹنگز صاف کرنے اور نئے سرے سے شروع کرنے کے لیے، اپنے براؤزر کا ڈیولپر کنسول کھولیں اور چلائیں:

```javascript
localStorage.removeItem("claude-initializr-config");
localStorage.removeItem("claude-initializr-welcome-dismissed");
localStorage.removeItem("claude-initializr-autosave");
```

پھر صفحہ دوبارہ لوڈ کریں۔

متبادل طور پر، آپ سیٹنگز کو محفوظ ہونے سے روکنے کے لیے ہیڈر میں ٹوگل کا استعمال کرتے ہوئے آٹو سیو کو غیر فعال کر سکتے ہیں۔

## ٹیک اسٹیک

- [React 19](https://react.dev/) TypeScript اور React Compiler کے ساتھ
- [Vite](https://vite.dev/) بندلر کے طور پر
- [Tailwind CSS v4](https://tailwindcss.com/) OKLCH کلر اسپیس کے ساتھ
- [shadcn/ui](https://ui.shadcn.com/) کمپوننٹس (40+ کمپوننٹس)
- [react-router](https://reactrouter.com/) روٹنگ کے لیے
- [i18next](https://www.i18next.com/) بین الاقوامیت کے لیے
- [JSZip](https://stuk.github.io/jszip/) ZIP جنریشن کے لیے
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) کوڈ پریویوز کے لیے

## شراکت

شراکت کا خیرمقدم ہے! براہ کرم Pull Request جمع کرانے میں ہچکچاہٹ نہ کریں۔

1. ریپازٹری فورک کریں
2. اپنی فیچر برانچ بنائیں (`git checkout -b feature/شاندار-فیچر`)
3. اپنی تبدیلیاں کمٹ کریں (`git commit -m 'شاندار فیچر شامل کریں'`)
4. برانچ پر پش کریں (`git push origin feature/شاندار-فیچر`)
5. Pull Request کھولیں

### نئی زبان شامل کرنا

1. `src/i18n/locales/` میں ایک نئی لوکیل فائل بنائیں (مثلاً، `fr.json`)
2. `en.json` سے ساخت کاپی کریں
3. تمام سٹرنگز کا ترجمہ کریں
4. زبان کو `src/i18n/index.ts` میں شامل کریں
5. زبان کا آپشن `LanguageSwitcher.tsx` میں شامل کریں

## رسائی

یہ ایپلیکیشن مکمل طور پر قابل رسائی ہونے کے لیے ڈیزائن کی گئی ہے:

- سیمینٹک HTML ساخت (`<header>`، `<main>`، `<footer>`)
- تمام انٹرایکٹو عناصر پر ARIA لیبلز
- کی بورڈ نیویگیشن سپورٹ
- سکرین ریڈر کے ساتھ ہم آہنگ
- ہائی کنٹراسٹ کلر سکیمز
- انٹرایکٹو عناصر پر فوکس انڈیکیٹرز

## سپورٹ

اگر آپ کو یہ پروجیکٹ مفید لگتا ہے، تو اس کی سپورٹ پر غور کریں:

- ⭐ [GitHub](https://github.com/mkloubert/claude-initializr) پر ریپازٹری کو سٹار کریں
- 💝 [PayPal کے ذریعے عطیہ کریں](https://paypal.me/mjkloubert)

## لائسنس

MIT لائسنس - تفصیلات کے لیے [LICENSE](./LICENSE) دیکھیں۔

کاپی رائٹ © 2026 Marcel Joachim Kloubert

</div>
