<div dir="rtl">

# Claude Initializr

**🌐 קראו בשפות אחרות:**
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

[![רישיון: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![תרומה](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

אפליקציית ווב ליצירת קבצי תצורת Docker להרצת [Claude Code](https://docs.anthropic.com/en/docs/claude-code) בצורה בטוחה בסביבת קונטיינר.

**הדגמה חיה:** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## תכונות

### תצורת Dockerfile

- **תמונת בסיס**: הגדרת שם וגרסה של תמונת Docker הבסיס (ברירת מחדל: `node:24`)
- **בחירת תוכנות**: בחרו תוכנות נוספות להתקנה:
  - ffmpeg (עיבוד אודיו/וידאו)
  - Flutter (כולל Dart ו-Android SDK)
  - Go
  - ImageMagick (עיבוד תמונות)
  - Python 3
  - TypeScript
  - uv (מתקין חבילות Python מהיר, ממליץ על Python)
- **הגדרת גרסאות**: גרסאות התוכנות מוגדרות באמצעות ארגומנטי build של Docker (לדוגמה: `--build-arg GO_VERSION=1.22.0`)
- **חבילות APT מותאמות**: הוספת חבילות Debian/Ubuntu נוספות להתקנה בקונטיינר
- **חבילות NPM מותאמות**: הוספת חבילות NPM נוספות להתקנה גלובלית, עם אפשרות להתקנה כמשתמש `root` או `node`
- **פקודות RUN מותאמות**: הוספת פקודות shell מותאמות להרצה במהלך בניית תמונת Docker, עם אפשרות להרצה כמשתמש `root` או `node`

### תצורת docker-compose.yaml

- **משתני סביבה**: הגדרת משתני סביבה לקובץ `.env` שלכם
- **קבצים מוגנים**: ציון קבצים שיש להגן עליהם באמצעות הרכבת קבצים ריקים לקריאה בלבד (מונע גישה לקבצים רגישים כמו `.env.local`)

### עורך CLAUDE.md

- עורך Markdown עם הדגשת תחביר
- פונקציית תצוגה מקדימה מובנית
- כתיבת הוראות ספציפיות לפרויקט עבור Claude

### תצורת settings.json

- **כללי הרשאות**: הגדירו הרשאות Claude Code לניהול גישה לקבצים
  - `Allow` - כללים לפעולות המותרות אוטומטית
  - `Ask` - כללים הדורשים אישור משתמש
  - `Deny` - כללים שנדחים תמיד
- **הנחיות נתמכות**:
  - `Read()` - קובע אילו קבצים Claude יכול לקרוא (לדוגמה: `Read(src/**)`)
  - `Edit()` - קובע אילו קבצים Claude יכול לערוך (לדוגמה: `Edit(.env)`)
  - `WebFetch()` - שולט בגישה לרשת (לדוגמה: `WebFetch(https://api.github.com:*)`)
- **אינטגרציה אוטומטית**: קבצים מוגנים מתווספים אוטומטית ככללי דחייה של `Read()`
- **תמיכה בתבניות Glob**: השתמשו בתבניות כמו `src/**` להתאמה רקורסיבית

### תכונות כלליות

- **תצוגה מקדימה חיה**: צפייה בזמן אמת בקבצי תצורה שנוצרו
- **הורדת ZIP**: הורדת כל הקבצים כארכיון ZIP מוכן לשימוש
- **שמירה אוטומטית**: ההגדרות נשמרות אוטומטית ב-localStorage של הדפדפן (מופעל כברירת מחדל)
- **תמיכה רב-לשונית**: זמין ב-18 שפות:
  - 🌍 ערבית
  - 🇨🇳 סינית
  - 🇳🇱 הולנדית
  - 🇬🇧 אנגלית
  - 🇫🇷 צרפתית
  - 🇩🇪 גרמנית
  - 🇬🇷 יוונית
  - 🇮🇱 עברית
  - 🇮🇳 הינדי
  - 🇮🇹 איטלקית
  - 🇯🇵 יפנית
  - 🇰🇷 קוריאנית
  - 🇵🇱 פולנית
  - 🇵🇹 פורטוגזית
  - 🇪🇸 ספרדית
  - 🇹🇷 טורקית
  - 🇺🇦 אוקראינית
  - 🇵🇰 אורדו
- **ערכת נושא כהה/בהיר**: זיהוי אוטומטי של ערכת נושא עם מתג ידני
- **תמיכת PWA**: ניתן להתקנה כ-Progressive Web App
- **נגיש במלואו**: תואם WCAG עם ניווט מקלדת ותמיכה בקורא מסך
- **עיצוב רספונסיבי**: אופטימיזציה למחשב נייח וטאבלט

### מנגנון שמירה אוטומטית

ניתן להפעיל/לכבות את תכונת השמירה האוטומטית באמצעות סמל השמירה בכותרת:

| סמל             | מצב      | התנהגות                                                        |
| --------------- | -------- | -------------------------------------------------------------- |
| 💾 (שמירה)      | מופעל    | כל השינויים נשמרים אוטומטית ב-localStorage                     |
| 🚫💾 (כבוי)     | מכובה    | השינויים לא נשמרים; נתונים קיימים נמחקים                       |

**איך זה עובד:**

- **הפעלת שמירה אוטומטית**: שומר מיד את ההגדרות הנוכחיות ב-localStorage
- **כיבוי שמירה אוטומטית**: מוחק את כל ההגדרות השמורות מ-localStorage
- העדפת השמירה האוטומטית נזכרת בין סשנים

### פרטיות ואחסון נתונים

אפליקציה זו מכבדת את הפרטיות שלכם:

- **אחסון מקומי בלבד**: כל ההגדרות נשמרות מקומית בדפדפן שלכם (localStorage)
- **ללא תקשורת עם שרת**: שום מידע לא נשלח לשרת כלשהו
- **מאובטח בעיצוב**: **ערכי** משתני הסביבה **לעולם לא נשמרים** - רק שמות המשתנים נשמרים
- **שליטה מלאה**: תוכלו לכבות את השמירה האוטומטית בכל עת באמצעות המתג בכותרת, מה שגם מוחק את כל הנתונים השמורים
- **ערכת נושא מבוססת סשן**: העדפת ערכת הנושא מתאפסת לברירת המחדל של המערכת בעת רענון הדף

## תכונות אבטחה

תצורת Docker שנוצרת כוללת אמצעי אבטחה מקיפים:

### חומת אש רשתית

הסקריפט `init-firewall.sh` מיישם בידוד רשתי קפדני:

- **חומת אש מבוססת iptables** עם מדיניות DROP לכל התעבורה היוצאת
- **גישת רשימה לבנה בלבד** - רק דומיינים מאושרים נגישים:
  - `api.anthropic.com` - Claude API
  - `npm registry` - התקנת חבילות
  - `github.com` - פעולות Git
  - `sentry.io` - דיווח שגיאות
- **פתרון אוטומטי של IP של GitHub** עבור נקודות קצה של web, API ו-git
- **בידוד רשת מארח** - מונע גישה לרשת מקומית
- **אימות חומת אש** - בדיקות מוודאות שהכללים מיושמים כראוי

### הקשחת אבטחת Docker

- **הסרת יכולות**: כל יכולות Linux מוסרות (`cap_drop: ALL`)
- **ללא הסלמת הרשאות**: `no-new-privileges:true`
- **מגבלות משאבים**: הגבלות CPU וזיכרון
- **הרכבות לקריאה בלבד**: קבצים מוגנים מורכבים כקריאה בלבד
- **הרצה לא-root**: רץ כמשתמש `node`

## כלים מותקנים מראש

הקונטיינר שנוצר כולל:

| קטגוריה          | כלים                                |
| ---------------- | ----------------------------------- |
| **Shell**        | zsh עם ערכת נושא Powerline10k, bash |
| **עורכים**       | nano, vim                           |
| **בקרת גרסאות** | git, git-delta, GitHub CLI (gh)     |
| **כלי עזר**      | fzf, jq, less, unzip, man-db        |
| **רשת**          | iptables, ipset, iproute2, dnsutils |

## התחלת עבודה

### דרישות מקדימות

- Node.js 20 ומעלה
- npm 10 ומעלה

### התקנה

```bash
# שכפול המאגר
git clone https://github.com/mkloubert/claude-initializr.git
cd claude-initializr

# התקנת תלויות
npm install

# הפעלת שרת פיתוח
npm run dev

# בניה לייצור
npm run build

# תצוגה מקדימה של בניית הייצור
npm run preview
```

### משתני סביבה

התאמה אישית של האפליקציה באמצעות משתני סביבה. צרו קובץ `.env`:

```bash
# כתובת URL של מאגר GitHub (אופציונלי, השאירו ריק להסתרה)
VITE_GITHUB_URL=https://github.com/mkloubert/claude-initializr

# כתובת URL לתרומה ב-PayPal (אופציונלי, השאירו ריק להסתרה)
VITE_PAYPAL_URL=https://paypal.me/mjkloubert
```

## שימוש

1. **הגדרת תמונת בסיס**: הגדירו את שם וגרסת תמונת Docker הבסיס (למשל, `node:24` או `node:22-slim`)

2. **בחירת תוכנות**: בחרו איזו תוכנה נוספת להתקין בקונטיינר

3. **הוספת חבילות ופקודות מותאמות**:
   - הוספת חבילות APT מותאמות (למשל, `curl`, `graphviz`, `sqlite3`)
   - הוספת חבילות NPM מותאמות להתקנה גלובלית (למשל, `eslint`, `prettier`)
   - בחרו אם חבילות NPM יותקנו כמשתמש `node` (ברירת מחדל) או `root`
   - הוספת פקודות RUN מותאמות להרצה במהלך הבנייה (למשל, `pip install numpy`)
   - בחרו אם פקודות RUN יורצו כמשתמש `node` (ברירת מחדל) או `root`

4. **הגדרת משתני סביבה**: הוספת משתני סביבה שהפרויקט שלכם צריך (למשל, `ANTHROPIC_API_KEY`)

5. **הגנה על קבצים רגישים**: הוספת נתיבים לקבצים שיש להגן עליהם (למשל, `.env.local`)

6. **עריכת CLAUDE.md**: כתיבת הוראות עבור Claude בעורך Markdown

7. **הגדרת הרשאות**: הגדירו כללי הרשאות דרך כרטיס settings.json
   - הוסיפו כללי `Allow` לפעולות המאושרות אוטומטית
   - הוסיפו כללי `Ask` לפעולות הדורשות אישור
   - הוסיפו כללי `Deny` לפעולות אסורות
   - קבצים מוגנים מתווספים אוטומטית ככללי דחייה של `Read()`

8. **תצוגה מקדימה**: בדיקת קבצי התצורה שנוצרו בלשוניות התצוגה המקדימה

9. **הורדה**: לחצו על "הורד ZIP" לקבלת כל הקבצים

## שימוש בקבצים שנוצרו

1. חלצו את קובץ ה-ZIP לתיקיית הפרויקט שלכם

2. העתיקו את קבצי הפרויקט לתיקיית `workspace` (או הרכיבו את הפרויקט הקיים)

3. הגדירו את מפתח ה-API בקובץ `.env`:

   ```bash
   ANTHROPIC_API_KEY=מפתח-ה-api-שלכם-כאן
   ```

4. בנייה והרצת הקונטיינר:

   ```bash
   docker compose up --build
   ```

   **אופציונלי: כתובות URL מותאמות אישית להורדה**

   אם אתם צריכים להשתמש במראה או פרוקסי להורדת חבילות, תוכלו לדרוס את כתובות ה-URL המוגדרות כברירת מחדל בזמן הבנייה. כל כתובות ה-URL תומכות בפרמטרי שאילתה:

   ```bash
   docker compose build \
     --build-arg GO_JSON_URL=https://my-mirror.example.com/golang/?mode=json \
     --build-arg GO_DOWNLOAD_URL=https://my-mirror.example.com/golang \
     --build-arg FLUTTER_JSON_URL=https://my-mirror.example.com/flutter/releases_linux.json \
     --build-arg FLUTTER_BASE_URL=https://my-mirror.example.com/flutter/releases \
     --build-arg UV_INSTALL_SCRIPT_URL=https://my-mirror.example.com/uv/install.sh
   ```

   | ארגומנט בנייה | ברירת מחדל | תיאור |
   |---------------|-------------|-------|
   | `GO_JSON_URL` | `https://go.dev/dl/?mode=json` | כתובת URL ל-API JSON של גרסאות Go (רק עבור "latest") |
   | `GO_DOWNLOAD_URL` | `https://go.dev/dl` | כתובת URL בסיסית להורדת ארכיוני Go |
   | `FLUTTER_JSON_URL` | `https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json` | כתובת URL ל-API JSON של גרסאות Flutter (רק עבור "latest") |
   | `FLUTTER_BASE_URL` | `https://storage.googleapis.com/flutter_infra_release/releases` | כתובת URL בסיסית להורדת ארכיוני Flutter |
   | `UV_INSTALL_SCRIPT_URL` | `https://astral.sh/uv/install.sh` | כתובת URL לסקריפט התקנת uv |

5. התחברות לקונטיינר:

   ```bash
   docker compose exec claude zsh
   ```

6. אתחול חומת האש (דורש סיסמת sudo):

   ```bash
   sudo /usr/local/bin/init-firewall.sh
   ```

7. הפעלת Claude Code:
   ```bash
   claude
   ```

## מבנה הקבצים שנוצרו

```
├── workspace/
│   ├── .claude/
│   │   └── settings.json    # הגדרות Claude
│   ├── .empty               # קובץ ריק להרכבות מוגנות
│   └── CLAUDE.md            # ההוראות שלכם ל-Claude
├── .env                     # משתני סביבה
├── Dockerfile               # הגדרת קונטיינר
├── docker-compose.yaml      # תצורת Docker Compose
└── init-firewall.sh         # סקריפט חומת אש רשתית
```

## פתרון בעיות

### בעיות חומת אש

אם נתקלתם בבעיות רשת לאחר הפעלת חומת האש:

```bash
# בדיקת מצב חומת האש
sudo iptables -L -n

# צפייה בחיבורים חסומים
sudo iptables -L -n -v | grep DROP

# איפוס חומת האש (מאפשר את כל התעבורה)
sudo iptables -F
```

### הקונטיינר לא מתחיל

```bash
# בדיקת לוגים
docker compose logs

# בנייה מחדש ללא מטמון
docker compose build --no-cache
```

### הרשאה נדחתה

וודאו שלתיקיית workspace יש את ההרשאות הנכונות:

```bash
chmod -R 755 workspace
```

### איפוס הגדרות האפליקציה

למחיקת כל ההגדרות השמורות והתחלה מחדש, פתחו את קונסולת המפתח בדפדפן והריצו:

```javascript
localStorage.removeItem("claude-initializr-config");
localStorage.removeItem("claude-initializr-welcome-dismissed");
localStorage.removeItem("claude-initializr-autosave");
```

לאחר מכן רעננו את הדף.

לחלופין, תוכלו לכבות את השמירה האוטומטית באמצעות המתג בכותרת כדי למנוע שמירת הגדרות.

## מחסנית טכנולוגית

- [React 19](https://react.dev/) עם TypeScript ו-React Compiler
- [Vite](https://vite.dev/) כ-bundler
- [Tailwind CSS v4](https://tailwindcss.com/) עם מרחב צבעים OKLCH
- [shadcn/ui](https://ui.shadcn.com/) רכיבים (40+ רכיבים)
- [react-router](https://reactrouter.com/) לניתוב
- [i18next](https://www.i18next.com/) לבינאום
- [JSZip](https://stuk.github.io/jszip/) ליצירת ZIP
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) לתצוגות מקדימות של קוד

## תרומה לפרויקט

תרומות מתקבלות בברכה! אל תהססו להגיש Pull Request.

1. עשו fork למאגר
2. צרו את ענף התכונה שלכם (`git checkout -b feature/amazing-feature`)
3. בצעו commit לשינויים (`git commit -m 'הוספת תכונה מדהימה'`)
4. דחפו לענף (`git push origin feature/amazing-feature`)
5. פתחו Pull Request

### הוספת שפה חדשה

1. צרו קובץ locale חדש ב-`src/i18n/locales/` (למשל, `fr.json`)
2. העתיקו את המבנה מ-`en.json`
3. תרגמו את כל המחרוזות
4. הוסיפו את השפה ל-`src/i18n/index.ts`
5. הוסיפו את אפשרות השפה ל-`LanguageSwitcher.tsx`

## נגישות

אפליקציה זו מעוצבת להיות נגישה במלואה:

- מבנה HTML סמנטי (`<header>`, `<main>`, `<footer>`)
- תגיות ARIA על כל האלמנטים האינטראקטיביים
- תמיכה בניווט מקלדת
- תואם קורא מסך
- סכמות צבעים בניגודיות גבוהה
- מחווני מיקוד על אלמנטים אינטראקטיביים

## תמיכה

אם מצאתם את הפרויקט הזה שימושי, שקלו לתמוך בו:

- ⭐ תנו כוכב למאגר ב-[GitHub](https://github.com/mkloubert/claude-initializr)
- 💝 [תרמו דרך PayPal](https://paypal.me/mjkloubert)

## רישיון

רישיון MIT - ראו [LICENSE](./LICENSE) לפרטים.

זכויות יוצרים © 2026 Marcel Joachim Kloubert

</div>
