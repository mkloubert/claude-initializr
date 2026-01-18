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

const hi: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Claude Code को सुरक्षित रूप से चलाने के लिए Docker कॉन्फ़िगरेशन फ़ाइलें बनाएं"
  },
  "welcome": {
    "close": "स्वागत संदेश बंद करें",
    "description": "Claude Code Anthropic का शक्तिशाली AI कोडिंग सहायक है जो आपकी मशीन पर सीधे कोड पढ़, लिख और निष्पादित कर सकता है। अत्यंत उपयोगी होने के बावजूद, फ़ाइल सिस्टम और टर्मिनल एक्सेस वाली AI को चलाने के लिए सुरक्षा पर सावधानीपूर्वक विचार आवश्यक है।",
    "purpose": "यह टूल एक पूर्ण Docker कॉन्फ़िगरेशन बनाता है जो आपको एक पृथक कंटेनर वातावरण में Claude Code चलाने की अनुमति देता है। आपका कोड सुरक्षित रहता है जबकि Claude आपकी विकास, डिबगिंग और रिफैक्टरिंग में मदद करना जारी रख सकता है।",
    "features": {
      "title": "आप क्या कॉन्फ़िगर कर सकते हैं:",
      "dockerfile": "इंस्टॉल करने के लिए डेवलपमेंट टूल चुनें (TypeScript, Python, Go, ffmpeg, ImageMagick)",
      "compose": "एनवायरनमेंट वेरिएबल सेट करें (जैसे आपकी API कुंजी) और संवेदनशील फ़ाइलों को एक्सेस से बचाएं",
      "claudeMd": "प्रोजेक्ट-विशिष्ट निर्देश लिखें जो Claude प्रत्येक सत्र की शुरुआत में पढ़ता है"
    },
    "security": {
      "title": "शामिल सुरक्षा सुविधाएं:",
      "firewall": "नेटवर्क फ़ायरवॉल जो केवल Anthropic API, npm और GitHub से कनेक्शन की अनुमति देता है",
      "isolation": "होस्ट सिस्टम और लोकल नेटवर्क से पूर्ण अलगाव",
      "readonly": "संवेदनशील फ़ाइलें खाली केवल-पठनीय फ़ाइलों के रूप में माउंट",
      "capabilities": "सभी Linux क्षमताएं हटाई गईं, विशेषाधिकार वृद्धि की अनुमति नहीं"
    },
    "privacy": {
      "title": "गोपनीयता सूचना:",
      "description": "आपकी सेटिंग्स आपके ब्राउज़र में स्थानीय रूप से (localStorage) संग्रहीत की जाती हैं ताकि वापस आने पर वे सुरक्षित रहें। सुरक्षा कारणों से, एनवायरनमेंट वेरिएबल के मान कभी संग्रहीत नहीं होते - केवल वेरिएबल नाम सहेजे जाते हैं। किसी भी सर्वर पर कोई डेटा नहीं भेजा जाता। आप हेडर में सेव आइकन का उपयोग करके कभी भी ऑटोसेव अक्षम कर सकते हैं - यह सभी संग्रहीत डेटा भी साफ़ कर देगा।"
    }
  },
  "nav": {
    "header": "हेडर नेविगेशन"
  },
  "tabs": {
    "software": "सॉफ्टवेयर",
    "preview": "पूर्वावलोकन",
    "settings": "सेटिंग्स",
    "envVariables": "वातावरण",
    "env": "वाता.",
    "protectedFiles": "संरक्षित फ़ाइलें",
    "protected": "संरक्षित"
  },
  "language": {
    "switch": "भाषा"
  },
  "theme": {
    "switch": "थीम बदलें"
  },
  "autosave": {
    "enable": "ऑटोसेव सक्षम करें",
    "disable": "ऑटोसेव अक्षम करें"
  },
  "reset": {
    "button": "डिफ़ॉल्ट पर रीसेट करें",
    "title": "सेटिंग्स रीसेट करें",
    "description": "क्या आप वाकई सभी सेटिंग्स को उनके डिफ़ॉल्ट मानों पर रीसेट करना चाहते हैं? इस क्रिया को पूर्ववत नहीं किया जा सकता।",
    "cancel": "रद्द करें",
    "confirm": "रीसेट करें"
  },
  "software": {
    "baseImage": "बेस इमेज",
    "baseImageDesc": "Docker बेस इमेज आपके कंटेनर की नींव निर्धारित करती है। डिफ़ॉल्ट 'node' इमेज में Node.js और npm शामिल है। आप छोटी इमेज के लिए 'node:22-slim' या अतिरिक्त सिस्टम लाइब्रेरी के लिए 'node:22-bookworm' जैसे वेरिएंट भी उपयोग कर सकते हैं।",
    "image": "इमेज",
    "typescript": "TypeScript",
    "typescriptDesc": "TypeScript को सीधे चलाने के लिए TypeScript कंपाइलर (tsc) और ts-node इंस्टॉल करता है। TypeScript प्रोजेक्ट्स के लिए आवश्यक, टाइप चेकिंग, JavaScript में कंपाइलेशन और मैन्युअल कंपाइलेशन के बिना .ts फ़ाइलें चलाने में सक्षम।",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "ऑडियो और वीडियो फ़ाइलों को प्रोसेस करने के लिए शक्तिशाली मल्टीमीडिया फ्रेमवर्क। फॉर्मेट कन्वर्शन, वीडियो एडिटिंग, ऑडियो एक्सट्रैक्शन, स्ट्रीमिंग और मीडिया एनालिसिस सक्षम करता है। मीडिया फ़ाइलों के साथ काम करने वाले प्रोजेक्ट्स के लिए आवश्यक।",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "200 से अधिक फॉर्मेट्स को सपोर्ट करने वाला व्यापक इमेज प्रोसेसिंग सूट। रिसाइज़िंग, क्रॉपिंग, फॉर्मेट कन्वर्शन, वॉटरमार्किंग और प्रोग्रामेटिक इमेज मैनिपुलेशन के लिए टूल्स प्रदान करता है। स्वचालित इमेज वर्कफ़्लो के लिए आदर्श।",
    "python": "Python 3",
    "pythonDesc": "pip पैकेज मैनेजर के साथ Python 3 इंटरप्रेटर इंस्टॉल करता है। Python स्क्रिप्ट्स चलाने, Python पैकेज इंस्टॉल करने और Python-आधारित टूल्स उपयोग करने में सक्षम। डेटा प्रोसेसिंग, स्क्रिप्टिंग और AI/ML कार्यों के लिए उपयोगी।",
    "uv": "uv",
    "uvDesc": "uv इंस्टॉल करता है, Rust में लिखा गया एक अत्यंत तेज़ Python पैकेज इंस्टॉलर और रिज़ॉल्वर। तेज़ डिपेंडेंसी मैनेजमेंट के लिए pip, pip-tools और virtualenv को रिप्लेस कर सकता है।",
    "golang": "Go",
    "golangDesc": "आधिकारिक कंपाइलर और टूल्स के साथ Go (Golang) प्रोग्रामिंग भाषा इंस्टॉल करता है। तेज़, स्टैटिकली कंपाइल्ड प्रोग्राम, CLI टूल्स, वेब सर्वर और सिस्टम सॉफ्टवेयर बनाने के लिए आदर्श।",
    "flutter": "Flutter",
    "flutterDesc": "Dart और Android विकास उपकरणों के साथ Flutter SDK स्थापित करता है। एक ही कोडबेस से मोबाइल, वेब और डेस्कटॉप के लिए क्रॉस-प्लेटफॉर्म ऐप्स बनाएं। Android SDK और कमांड-लाइन टूल शामिल हैं।",
    "rust": "Rust",
    "rustDesc": "rustup के माध्यम से Cargo पैकेज मैनेजर के साथ Rust प्रोग्रामिंग भाषा इंस्टॉल करता है। तेज़, मेमोरी-सुरक्षित सिस्टम सॉफ्टवेयर, CLI टूल्स, WebAssembly और एम्बेडेड एप्लीकेशन बनाने के लिए आदर्श।",
    "version": "संस्करण",
    "latest": "नवीनतम",
    "recommendsHint": "अनुशंसित: {{packages}}"
  },
  "aptPackages": {
    "title": "कस्टम APT पैकेज",
    "description": "कंटेनर में इंस्टॉल करने के लिए अतिरिक्त Debian/Ubuntu पैकेज जोड़ें।",
    "placeholder": "उदाहरण: curl, graphviz, tree, sqlite3...",
    "add": "पैकेज जोड़ें",
    "remove": "{{package}} हटाएं"
  },
  "npmPackages": {
    "title": "कस्टम NPM पैकेज",
    "description": "कंटेनर में ग्लोबली इंस्टॉल करने के लिए अतिरिक्त NPM पैकेज जोड़ें।",
    "placeholder": "उदाहरण: eslint, prettier, tsx...",
    "add": "पैकेज जोड़ें",
    "remove": "{{package}} हटाएं",
    "installAs": "के रूप में इंस्टॉल करें",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "{{package}} के लिए इंस्टॉलेशन उपयोगकर्ता बदलें"
  },
  "runCommands": {
    "title": "कस्टम RUN कमांड",
    "description": "Docker इमेज बिल्ड के दौरान चलाने के लिए कस्टम shell कमांड जोड़ें।",
    "placeholder": "उदाहरण: flutter doctor",
    "add": "कमांड जोड़ें",
    "remove": "कमांड हटाएं",
    "runAs": "के रूप में चलाएं",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "कमांड के लिए रन उपयोगकर्ता बदलें"
  },
  "plugins": {
    "title": "Claude Code प्लगइन",
    "description": "मार्केटप्लेस से Claude Code प्लगइन इंस्टॉल करें।",
    "placeholder": "प्लगइन-नाम@मार्केटप्लेस-नाम",
    "add": "प्लगइन जोड़ें",
    "remove": "प्लगइन हटाएं",
    "formatHint": "फॉर्मेट: प्लगइन-नाम@मार्केटप्लेस-नाम",
    "invalidFormat": "अमान्य फॉर्मेट। plugin@marketplace उपयोग करें",
    "suggestions": "सुझाए गए प्लगइन",
    "loadingSuggestions": "सुझाव लोड हो रहे हैं...",
    "addFromMarketplace": "{{marketplace}} से {{plugin}} जोड़ें",
    "viewOnGitHub": "GitHub पर {{plugin}} देखें"
  },
  "env": {
    "description": "कोई एनवायरनमेंट वेरिएबल परिभाषित नहीं।",
    "key": "कुंजी",
    "value": "मान",
    "add": "वेरिएबल जोड़ें",
    "remove": "हटाएं",
    "keyPlaceholder": "उदाहरण: वेरिएबल_नाम",
    "valuePlaceholder": "उदाहरण: मान"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "CLAUDE.md फ़ाइल में प्रोजेक्ट-विशिष्ट निर्देश होते हैं जो Claude प्रत्येक सत्र की शुरुआत में पढ़ता है। यह कोडिंग दिशानिर्देशों, प्रोजेक्ट संरचना स्पष्टीकरण, पसंदीदा तकनीकों या किसी अन्य संदर्भ के लिए जगह है जो Claude को प्रोजेक्ट को बेहतर समझने में मदद करता है।"
  },
  "protectedFiles": {
    "description": "कोई संरक्षित फ़ाइलें परिभाषित नहीं।",
    "path": "फ़ाइल पथ",
    "add": "पथ जोड़ें",
    "remove": "हटाएं",
    "pathPlaceholder": "उदाहरण: .env.local",
    "help": "पथ /workspace/ के सापेक्ष हैं। ये फ़ाइलें संवेदनशील डेटा तक पहुंच रोकने के लिए खाली केवल-पठनीय फ़ाइलों के रूप में माउंट की जाएंगी।"
  },
  "settings": {
    "title": "settings.json",
    "description": "Claude Code अनुमतियों को कॉन्फ़िगर करें ताकि यह नियंत्रित किया जा सके कि कौन सी फ़ाइलें पढ़ी, संपादित या प्राप्त की जा सकती हैं। संरक्षित फ़ाइलें स्वचालित रूप से अस्वीकार नियमों के रूप में जोड़ी जाती हैं।",
    "permissions": "अनुमतियाँ",
    "directive": "निर्देश",
    "pattern": "पैटर्न",
    "patternPlaceholder": "उदाहरण: src/** या .env",
    "addRule": "नियम जोड़ें",
    "removeRule": "नियम हटाएं",
    "allow": "अनुमति दें",
    "ask": "पूछें",
    "deny": "अस्वीकार करें",
    "noAllowRules": "कोई अनुमति नियम परिभाषित नहीं।",
    "noAskRules": "कोई पूछें नियम परिभाषित नहीं।",
    "noDenyRules": "कोई अस्वीकार नियम परिभाषित नहीं।",
    "help": "Read(), Edit() और WebFetch() संचालन के लिए अनुमति नियम परिभाषित करें। पैटर्न पुनरावर्ती मिलान के लिए src/** जैसे glob सिंटैक्स का समर्थन करते हैं।",
    "learnMore": "अधिक जानें"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "Dockerfile परिभाषित करता है कि कंटेनर में कौन सा सॉफ्टवेयर इंस्टॉल होता है। Node.js और Claude Code के अलावा, TypeScript, Python, Go, ffmpeg या ImageMagick जैसे अतिरिक्त टूल शामिल किए जा सकते हैं। चयनित सॉफ्टवेयर Claude द्वारा कमांड निष्पादित करते समय उपलब्ध होगा।",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "docker-compose.yaml फ़ाइल नियंत्रित करती है कि कंटेनर कैसे शुरू होता है। एनवायरनमेंट वेरिएबल (जैसे API कुंजियां) यहां परिभाषित की जा सकती हैं। संरक्षित फ़ाइलें खाली केवल-पठनीय फ़ाइलों के रूप में माउंट की जाती हैं ताकि Claude को .env फ़ाइलों जैसे संवेदनशील डेटा तक पहुंचने से रोका जा सके।"
  },
  "dockerCompose": {
    "platform": "प्लेटफॉर्म",
    "platformDesc": "कंटेनर के लिए एक विशिष्ट प्लेटफॉर्म सेट करें (जैसे linux/amd64)। डिफ़ॉल्ट प्लेटफॉर्म का उपयोग करने के लिए खाली छोड़ें। इसका उपयोग तब करें जब बेस इमेज आपकी आर्किटेक्चर का समर्थन नहीं करती हैं।",
    "platformPlaceholder": "उदाहरण: linux/amd64"
  },
  "download": {
    "button": "ZIP डाउनलोड करें",
    "generating": "बना रहे हैं...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "GitHub रिपॉज़िटरी",
    "paypal": "PayPal से सहायता करें"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "अंग्रेज़ी",
    "de": "जर्मन",
    "es": "स्पेनिश",
    "fr": "फ़्रेंच",
    "it": "इतालवी",
    "pt": "पुर्तगाली",
    "nl": "डच",
    "ja": "जापानी",
    "ko": "कोरियाई",
    "zh": "चीनी",
    "ar": "अरबी",
    "he": "हिब्रू",
    "hi": "हिन्दी",
    "ur": "उर्दू",
    "uk": "यूक्रेनी",
    "el": "यूनानी",
    "pl": "पोलिश",
    "tr": "तुर्की"
  },
  "errors": {
    "invalidEnvKey": "अमान्य वेरिएबल नाम। केवल अक्षर, संख्याएं और अंडरस्कोर का उपयोग करें।",
    "duplicateEnvKey": "यह वेरिएबल नाम पहले से मौजूद है।",
    "invalidPath": "पथ सापेक्ष होना चाहिए (शुरुआत में / नहीं) और इसमें .. नहीं हो सकता"
  },
  "readme": {
    "title": "Claude Code Docker कॉन्फ़िगरेशन",
    "generatedBy": "[Claude Initializr]({{url}}) द्वारा जनरेट किया गया",
    "languageSwitch": "इसे {{language}} में पढ़ें",
    "intro": {
      "title": "इस कॉन्फ़िगरेशन के बारे में",
      "description": "इस फ़ोल्डर में एक पृथक कंटेनर में Claude Code को सुरक्षित रूप से चलाने के लिए Docker कॉन्फ़िगरेशन फ़ाइलें हैं। कॉन्फ़िगरेशन नेटवर्क आइसोलेशन, फ़ाइल सुरक्षा और AI-सहायता प्राप्त विकास के लिए एक सैंडबॉक्स वातावरण प्रदान करता है।"
    },
    "files": {
      "title": "फ़ाइलों का अवलोकन",
      "dockerfile": "Dockerfile - सभी डेवलपमेंट टूल्स के साथ कंटेनर इमेज को परिभाषित करता है",
      "dockerCompose": "docker-compose.yaml - कंटेनर शुरू करने के लिए ऑर्केस्ट्रेशन फ़ाइल",
      "env": ".env - एनवायरनमेंट वेरिएबल्स (यहां अपनी API कुंजियां जोड़ें)",
      "initFirewall": "init-firewall.sh - सुरक्षा के लिए नेटवर्क फ़ायरवॉल स्क्रिप्ट",
      "workspace": "workspace/ - कंटेनर में माउंट की गई आपकी वर्किंग डायरेक्टरी",
      "claudeMd": "workspace/CLAUDE.md - Claude के लिए प्रोजेक्ट निर्देश",
      "settingsJson": "workspace/.claude/settings.json - Claude Code अनुमति सेटिंग्स"
    },
    "baseImage": {
      "title": "बेस इमेज",
      "description": "यह कॉन्फ़िगरेशन निम्नलिखित Docker बेस इमेज का उपयोग करता है:",
      "dockerHub": "Docker Hub पर देखें"
    },
    "platform": {
      "title": "प्लेटफॉर्म",
      "description": "कंटेनर इस प्लेटफॉर्म पर चलने के लिए कॉन्फ़िगर किया गया है:"
    },
    "aptPackages": {
      "title": "सिस्टम पैकेज (APT)",
      "description": "निम्नलिखित सिस्टम पैकेज इंस्टॉल हैं:"
    },
    "npmPackages": {
      "title": "अतिरिक्त NPM पैकेज",
      "description": "निम्नलिखित अतिरिक्त NPM पैकेज ग्लोबली इंस्टॉल हैं:",
      "installedAs": "{{user}} के रूप में इंस्टॉल"
    },
    "plugins": {
      "title": "Claude Code प्लगइन",
      "description": "निम्नलिखित Claude Code प्लगइन इंस्टॉल और सक्षम हैं:",
      "viewOnGitHub": "GitHub पर देखें"
    },
    "envVariables": {
      "title": "एनवायरनमेंट वेरिएबल्स",
      "description": "निम्नलिखित एनवायरनमेंट वेरिएबल्स कॉन्फ़िगर हैं (सुरक्षा के लिए मान नहीं दिखाए गए):",
      "note": "कंटेनर शुरू करने से पहले .env फ़ाइल में अपने वास्तविक मान जोड़ें।"
    },
    "protectedFiles": {
      "title": "संरक्षित फ़ाइलें",
      "description": "निम्नलिखित फ़ाइलें संरक्षित हैं और पहुंच रोकने के लिए खाली केवल-पठनीय फ़ाइलों के रूप में माउंट की गई हैं:"
    },
    "settingsJson": {
      "title": "अनुमति सेटिंग्स",
      "description": "Claude Code निम्नलिखित अनुमति नियमों के साथ कॉन्फ़िगर है:",
      "allow": "अनुमत ऑपरेशन (स्वचालित)",
      "ask": "पुष्टि की आवश्यकता वाले ऑपरेशन",
      "deny": "अस्वीकृत ऑपरेशन"
    },
    "claudeMd": {
      "title": "प्रोजेक्ट निर्देश",
      "description": "Claude के लिए प्रोजेक्ट-विशिष्ट निर्देश यहां परिभाषित हैं:"
    },
    "quickStart": {
      "title": "त्वरित प्रारंभ",
      "step1": "Docker इंस्टॉल करें (नीचे पूर्वापेक्षाएं देखें)",
      "step2": "कंटेनर शुरू करें:",
      "step2CustomVersions": "वैकल्पिक: कस्टम सॉफ़्टवेयर संस्करणों के साथ बिल्ड करें (नीचे Docker Build Arguments देखें):",
      "step3": "Claude Code शुरू करें:",
      "step4": "कंटेनर बंद करें:",
      "note": "आपका workspace फ़ोल्डर कंटेनर के अंदर /workspace पर माउंट है। लॉगिन विकल्पों के लिए नीचे प्रमाणीकरण अनुभाग देखें।"
    },
    "authentication": {
      "title": "प्रमाणीकरण",
      "description": "Claude Code दो प्रमाणीकरण विधियों का समर्थन करता है। वह चुनें जो आपकी आवश्यकताओं के लिए सबसे उपयुक्त हो:",
      "apiKey": {
        "title": "विकल्प 1: API कुंजी",
        "description": "अपनी API कुंजी `.env` फ़ाइल में सेट करें (`ANTHROPIC_API_KEY`)। Claude Code इसे स्वचालित रूप से उपयोग करेगा।",
        "pros": [
          "हेडलेस/स्वचालित वातावरण में काम करता है (CI/CD, कंटेनर, SSH)",
          "ब्राउज़र की आवश्यकता नहीं",
          "कोई उपयोग सीमा नहीं (उपयोग के अनुसार भुगतान)",
          "सभी वातावरणों में विश्वसनीय"
        ],
        "cons": [
          "प्रत्येक API कॉल पर लागत आती है (मानक API दरें)",
          "API कुंजी को प्रबंधित और सुरक्षित करना होगा",
          "खर्च सीमा के बिना अप्रत्याशित शुल्क हो सकते हैं"
        ]
      },
      "browserLogin": {
        "title": "विकल्प 2: ब्राउज़र लॉगिन (Claude Pro/Max/Team)",
        "description": "अपनी सदस्यता के साथ ब्राउज़र के माध्यम से प्रमाणित करने के लिए Claude Code में `/login` चलाएं।",
        "pros": [
          "आपकी सदस्यता में शामिल (अनुमानित मासिक लागत)",
          "कोई अतिरिक्त API लागत नहीं",
          "Claude.ai के साथ एकीकृत बिलिंग"
        ],
        "cons": [
          "पहले लॉगिन के लिए ब्राउज़र आवश्यक",
          "साप्ताहिक रीसेट होने वाली उपयोग सीमाएं हैं",
          "कंटेनर/SSH सत्रों में प्रमाणीकरण बना नहीं रह सकता"
        ]
      }
    },
    "buildArgs": {
      "title": "Docker Build Arguments",
      "description": "आप Docker बिल्ड के दौरान सॉफ़्टवेयर संस्करण और डाउनलोड URL कॉन्फ़िगर कर सकते हैं। डिफ़ॉल्ट मान ओवरराइड करने के लिए `--build-arg नाम=मान` का उपयोग करें।",
      "versionArgs": {
        "title": "संस्करण आर्गुमेंट",
        "description": "नियंत्रित करें कि कौन से सॉफ़्टवेयर संस्करण इंस्टॉल होते हैं:"
      },
      "urlArgs": {
        "title": "URL आर्गुमेंट",
        "description": "मिरर या प्रॉक्सी के लिए डाउनलोड URL ओवरराइड करें:"
      },
      "defaultValue": "डिफ़ॉल्ट",
      "example": "कस्टम संस्करणों का उदाहरण:"
    },
    "prerequisites": {
      "title": "पूर्वापेक्षाएं",
      "description": "आपको अपने सिस्टम पर Docker इंस्टॉल करना होगा। अपना ऑपरेटिंग सिस्टम चुनें:",
      "windows": {
        "title": "Windows",
        "steps": [
          "docker.com/products/docker-desktop से Docker Desktop डाउनलोड करें",
          "इंस्टॉलर चलाएं और सेटअप विज़ार्ड का पालन करें",
          "प्रॉम्प्ट होने पर WSL 2 backend सक्षम करें (अनुशंसित)",
          "यदि आवश्यक हो तो कंप्यूटर पुनरारंभ करें",
          "Docker Desktop खोलें और इसके शुरू होने की प्रतीक्षा करें"
        ],
        "link": "आधिकारिक Windows इंस्टॉलेशन गाइड"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "docker.com/products/docker-desktop से Docker Desktop डाउनलोड करें",
          ".dmg फ़ाइल खोलें और Docker को Applications में खींचें",
          "Applications फ़ोल्डर से Docker खोलें",
          "प्रॉम्प्ट होने पर आवश्यक अनुमतियां दें",
          "Docker के शुरू होने की प्रतीक्षा करें (मेनू बार में व्हेल आइकन)"
        ],
        "link": "आधिकारिक macOS इंस्टॉलेशन गाइड"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "पैकेज इंडेक्स अपडेट करें: sudo apt update",
          "Docker इंस्टॉल करें: sudo apt install docker.io docker-compose-v2",
          "अपने यूजर को docker ग्रुप में जोड़ें: sudo usermod -aG docker $USER",
          "ग्रुप परिवर्तन प्रभावी होने के लिए लॉग आउट और लॉग इन करें",
          "इंस्टॉलेशन सत्यापित करें: docker --version"
        ],
        "link": "आधिकारिक Linux इंस्टॉलेशन गाइड",
        "altNote": "या GUI अनुभव के लिए Docker Desktop इंस्टॉल करें।"
      }
    },
    "troubleshooting": {
      "title": "समस्या निवारण",
      "issues": {
        "containerNotStarting": {
          "title": "कंटेनर शुरू नहीं होता",
          "solutions": [
            "जांचें कि Docker चल रहा है: docker info",
            "सत्यापित करें कि .env फ़ाइल मौजूद है और ANTHROPIC_API_KEY है",
            "पोर्ट कॉन्फ्लिक्ट जांचें: docker ps",
            "कंटेनर लॉग देखें: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "अनुमति अस्वीकृत त्रुटियां",
          "solutions": [
            "Linux पर, सुनिश्चित करें कि आपका यूजर docker ग्रुप में है",
            "sudo के साथ चलाने का प्रयास करें (नियमित उपयोग के लिए अनुशंसित नहीं)",
            "workspace फ़ोल्डर में फ़ाइल अनुमतियां जांचें"
          ]
        },
        "networkIssues": {
          "title": "नेटवर्क या API कनेक्शन समस्याएं",
          "solutions": [
            "फ़ायरवॉल स्क्रिप्ट केवल विशिष्ट डोमेन की अनुमति देती है",
            "सुनिश्चित करें कि api.anthropic.com आपके नेटवर्क से एक्सेस योग्य है",
            "कंटेनर के अंदर फ़ायरवॉल लॉग जांचें: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "कंटेनर में फ़ाइलें एक्सेसिबल नहीं",
          "solutions": [
            "संरक्षित फ़ाइलें जानबूझकर खाली हैं - यह अपेक्षित है",
            "docker-compose.yaml में वॉल्यूम माउंट्स जांचें",
            "सुनिश्चित करें कि workspace फ़ोल्डर होस्ट पर मौजूद है"
          ]
        }
      }
    },
    "links": {
      "title": "लिंक",
      "initializer": "नया कॉन्फ़िगरेशन जनरेट करें",
      "documentation": "Claude Code डॉक्यूमेंटेशन",
      "support": "समस्याएं रिपोर्ट करें"
    },
    "author": {
      "title": "लेखक",
      "createdBy": "द्वारा बनाया गया",
      "support": "इस प्रोजेक्ट को सपोर्ट करें"
    },
    "software": {
      "title": "इंस्टॉल किया गया सॉफ्टवेयर",
      "description": "निम्नलिखित डेवलपमेंट टूल्स इंस्टॉल हैं:"
    }
  }
};

export default hi;
