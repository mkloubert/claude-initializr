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

const tr: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Claude Code'u güvenli bir şekilde çalıştırmak için Docker yapılandırma dosyaları oluşturun"
  },
  "welcome": {
    "close": "Hoş geldiniz mesajını kapat",
    "description": "Claude Code, Anthropic'in doğrudan makinenizde kod okuyabilen, yazabilen ve çalıştırabilen güçlü AI kodlama asistanıdır. İnanılmaz derecede yararlı olmasına rağmen, dosya sistemi ve terminal erişimine sahip bir AI çalıştırmak, güvenlik konusunda dikkatli değerlendirme gerektirir.",
    "purpose": "Bu araç, Claude Code'u izole bir konteyner ortamında çalıştırmanızı sağlayan eksiksiz bir Docker yapılandırması oluşturur. Kodunuz korunurken Claude size geliştirme, hata ayıklama ve yeniden düzenleme konularında yardımcı olmaya devam edebilir.",
    "features": {
      "title": "Yapılandırabilecekleriniz:",
      "dockerfile": "Hangi geliştirme araçlarının kurulacağını seçin (TypeScript, Python, Go, ffmpeg, ImageMagick)",
      "compose": "Ortam değişkenlerini (API anahtarınız gibi) ayarlayın ve hassas dosyaları erişimden koruyun",
      "claudeMd": "Claude'un her oturumun başında okuduğu projeye özel talimatlar yazın"
    },
    "security": {
      "title": "Dahil edilen güvenlik özellikleri:",
      "firewall": "Yalnızca Anthropic API, npm ve GitHub'a bağlantılara izin veren ağ güvenlik duvarı",
      "isolation": "Ana sistemden ve yerel ağdan tam izolasyon",
      "readonly": "Hassas dosyalar boş salt okunur dosyalar olarak bağlanır",
      "capabilities": "Tüm Linux yetenekleri kaldırıldı, ayrıcalık yükseltmeye izin verilmiyor"
    },
    "privacy": {
      "title": "Gizlilik bildirimi:",
      "description": "Ayarlarınız tarayıcınızda yerel olarak (localStorage) saklanır, böylece geri döndüğünüzde korunur. Güvenlik nedeniyle, ortam değişkenlerinin değerleri asla saklanmaz – yalnızca değişken adları kaydedilir. Hiçbir veri herhangi bir sunucuya gönderilmez. Başlıktaki kaydet simgesini kullanarak otomatik kaydetmeyi istediğiniz zaman devre dışı bırakabilirsiniz – bu ayrıca tüm kaydedilmiş verileri de temizleyecektir."
    }
  },
  "nav": {
    "header": "Başlık navigasyonu"
  },
  "tabs": {
    "software": "Yazılım",
    "preview": "Önizleme",
    "settings": "Ayarlar",
    "envVariables": "Ortam",
    "env": "Ortam",
    "protectedFiles": "Korumalı dosyalar",
    "protected": "Korumalı"
  },
  "language": {
    "switch": "Dil"
  },
  "theme": {
    "switch": "Temayı değiştir"
  },
  "autosave": {
    "enable": "Otomatik kaydetmeyi etkinleştir",
    "disable": "Otomatik kaydetmeyi devre dışı bırak"
  },
  "reset": {
    "button": "Varsayılanlara sıfırla",
    "title": "Ayarları sıfırla",
    "description": "Tüm ayarları varsayılan değerlerine sıfırlamak istediğinizden emin misiniz? Bu işlem geri alınamaz.",
    "cancel": "İptal",
    "confirm": "Sıfırla"
  },
  "software": {
    "baseImage": "Temel imaj",
    "baseImageDesc": "Docker temel imajı konteynerinizin temelini belirler. Varsayılan 'node' imajı Node.js ve npm içerir. Daha küçük imajlar için 'node:22-slim' veya ek sistem kütüphaneleri için 'node:22-bookworm' gibi varyantları da kullanabilirsiniz.",
    "image": "İmaj",
    "typescript": "TypeScript",
    "typescriptDesc": "TypeScript'i doğrudan çalıştırmak için TypeScript derleyicisini (tsc) ve ts-node'u kurar. TypeScript projeleri için gereklidir, tür kontrolü, JavaScript'e derleme ve .ts dosyalarını manuel derleme olmadan çalıştırmayı sağlar.",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "Ses ve video dosyalarını işlemek için güçlü bir multimedya çerçevesi. Format dönüştürme, video düzenleme, ses çıkarma, akış ve medya analizi sağlar. Medya dosyalarıyla çalışan projeler için gereklidir.",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "200'den fazla formatı destekleyen kapsamlı bir görüntü işleme paketi. Yeniden boyutlandırma, kırpma, format dönüştürme, filigran ve programatik görüntü manipülasyonu için araçlar sağlar. Otomatik görüntü iş akışları için idealdir.",
    "python": "Python 3",
    "pythonDesc": "pip paket yöneticisiyle Python 3 yorumlayıcısını kurar. Python betiklerini çalıştırmayı, Python paketlerini kurmayı ve Python tabanlı araçları kullanmayı sağlar. Veri işleme, betik yazma ve AI/ML görevleri için yararlıdır.",
    "uv": "uv",
    "uvDesc": "Rust ile yazılmış son derece hızlı bir Python paket yükleyicisi ve çözümleyicisi olan uv'yi kurar. Daha hızlı bağımlılık yönetimi için pip, pip-tools ve virtualenv'in yerini alabilir.",
    "golang": "Go",
    "golangDesc": "Resmi derleyici ve araçlarla Go (Golang) programlama dilini kurar. Hızlı, statik olarak derlenmiş programlar, CLI araçları, web sunucuları ve sistem yazılımı oluşturmak için idealdir.",
    "flutter": "Flutter",
    "flutterDesc": "Dart ve Android geliştirme araçlarıyla Flutter SDK'yı kurar. Tek bir kod tabanından mobil, web ve masaüstü için çapraz platform uygulamalar oluşturun. Android SDK ve komut satırı araçlarını içerir.",
    "rust": "Rust",
    "rustDesc": "rustup aracılığıyla Cargo paket yöneticisiyle Rust programlama dilini kurar. Hızlı, bellek güvenli sistem yazılımı, CLI araçları, WebAssembly ve gömülü uygulamalar oluşturmak için idealdir.",
    "version": "Sürüm",
    "latest": "en son",
    "recommendsHint": "Önerilen: {{packages}}"
  },
  "aptPackages": {
    "title": "Özel APT Paketleri",
    "description": "Konteynere kurulacak ek Debian/Ubuntu paketleri ekleyin.",
    "placeholder": "Örnek: curl, graphviz, tree, sqlite3...",
    "add": "Paket ekle",
    "remove": "{{package}} paketini kaldır"
  },
  "npmPackages": {
    "title": "Özel NPM Paketleri",
    "description": "Konteynere global olarak kurulacak ek NPM paketleri ekleyin.",
    "placeholder": "Örnek: eslint, prettier, tsx...",
    "add": "Paket ekle",
    "remove": "{{package}} paketini kaldır",
    "installAs": "Olarak kur",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "{{package}} için kurulum kullanıcısını değiştir"
  },
  "runCommands": {
    "title": "Özel RUN Komutları",
    "description": "Docker imajı oluşturulurken çalıştırılacak özel shell komutları ekleyin.",
    "placeholder": "Örnek: flutter doctor",
    "add": "Komut ekle",
    "remove": "Komutu kaldır",
    "runAs": "Olarak çalıştır",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Komut için çalıştırma kullanıcısını değiştir"
  },
  "plugins": {
    "title": "Claude Code Eklentileri",
    "description": "Marketplace'lerden Claude Code eklentileri yükleyin.",
    "placeholder": "eklenti-adı@marketplace-adı",
    "add": "Eklenti ekle",
    "remove": "Eklentiyi kaldır",
    "formatHint": "Format: eklenti-adı@marketplace-adı",
    "invalidFormat": "Geçersiz format. plugin@marketplace kullanın",
    "suggestions": "Önerilen eklentiler",
    "loadingSuggestions": "Öneriler yükleniyor...",
    "addFromMarketplace": "{{marketplace}}'den {{plugin}} ekle",
    "viewOnGitHub": "{{plugin}}'i GitHub'da görüntüle"
  },
  "env": {
    "description": "Tanımlanmış ortam değişkeni yok.",
    "key": "Anahtar",
    "value": "Değer",
    "add": "Değişken ekle",
    "remove": "Kaldır",
    "keyPlaceholder": "Örnek: DEGISKEN_ADI",
    "valuePlaceholder": "Örnek: değer"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "CLAUDE.md dosyası, Claude'un her oturumun başında okuduğu projeye özel talimatları içerir. Burası kodlama yönergeleri, proje yapısı açıklamaları, tercih edilen teknolojiler veya Claude'un projeyi daha iyi anlamasına yardımcı olan diğer bağlamlar için doğru yerdir."
  },
  "protectedFiles": {
    "description": "Tanımlanmış korumalı dosya yok.",
    "path": "Dosya yolu",
    "add": "Yol ekle",
    "remove": "Kaldır",
    "pathPlaceholder": "Örnek: .env.local",
    "help": "Yollar /workspace/'e görelidir. Bu dosyalar, hassas verilere erişimi önlemek için boş salt okunur dosyalar olarak bağlanacaktır."
  },
  "settings": {
    "title": "settings.json",
    "description": "Hangi dosyaların okunabileceğini, düzenlenebileceğini veya getirilebileceğini kontrol etmek için Claude Code izinlerini yapılandırın. Korunan dosyalar otomatik olarak reddetme kuralları olarak eklenir.",
    "permissions": "İzinler",
    "directive": "Yönerge",
    "pattern": "Desen",
    "patternPlaceholder": "Örnek: src/** veya .env",
    "addRule": "Kural ekle",
    "removeRule": "Kuralı kaldır",
    "allow": "İzin ver",
    "ask": "Sor",
    "deny": "Reddet",
    "noAllowRules": "İzin kuralı tanımlanmamış.",
    "noAskRules": "Sorma kuralı tanımlanmamış.",
    "noDenyRules": "Reddetme kuralı tanımlanmamış.",
    "help": "Read(), Edit() ve WebFetch() işlemleri için izin kuralları tanımlayın. Desenler, özyinelemeli eşleştirme için src/** gibi glob sözdizimini destekler.",
    "learnMore": "Daha fazla bilgi"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "Dockerfile, konteynere hangi yazılımın kurulacağını tanımlar. Node.js ve Claude Code'a ek olarak TypeScript, Python, Go, ffmpeg veya ImageMagick gibi ek araçlar dahil edilebilir. Seçilen yazılım, Claude komutları çalıştırdığında kullanılabilir olacaktır.",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "docker-compose.yaml dosyası konteynerin nasıl başlatılacağını kontrol eder. Ortam değişkenleri (API anahtarları gibi) burada tanımlanabilir. Korumalı dosyalar, Claude'un .env dosyaları gibi hassas verilere erişmesini önlemek için boş salt okunur dosyalar olarak bağlanır."
  },
  "dockerCompose": {
    "platform": "Platform",
    "platformDesc": "Konteyner için belirli bir platform ayarlayın (örn: linux/amd64). Varsayılan platformu kullanmak için boş bırakın. Temel imajlar mimarinizi desteklemediğinde bunu kullanın.",
    "platformPlaceholder": "Örnek: linux/amd64"
  },
  "download": {
    "button": "ZIP İndir",
    "generating": "Oluşturuluyor...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "GitHub Deposu",
    "paypal": "PayPal ile Destekle"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "İngilizce",
    "de": "Almanca",
    "es": "İspanyolca",
    "fr": "Fransızca",
    "it": "İtalyanca",
    "pt": "Portekizce",
    "nl": "Felemenkçe",
    "ja": "Japonca",
    "ko": "Korece",
    "zh": "Çince",
    "ar": "Arapça",
    "he": "İbranice",
    "hi": "Hintçe",
    "ur": "Urduca",
    "uk": "Ukraynaca",
    "el": "Yunanca",
    "pl": "Lehçe",
    "tr": "Türkçe"
  },
  "errors": {
    "invalidEnvKey": "Geçersiz değişken adı. Yalnızca harf, rakam ve alt çizgi kullanın.",
    "duplicateEnvKey": "Bu değişken adı zaten mevcut.",
    "invalidPath": "Yol göreceli olmalı (başında / olmamalı) ve .. içeremez"
  },
  "readme": {
    "title": "Claude Code Docker Yapılandırması",
    "generatedBy": "[Claude Initializr]({{url}}) tarafından oluşturuldu",
    "languageSwitch": "Bunu {{language}} dilinde okuyun",
    "intro": {
      "title": "Bu Yapılandırma Hakkında",
      "description": "Bu klasör, Claude Code'u izole bir konteynerde güvenli bir şekilde çalıştırmak için Docker yapılandırma dosyalarını içerir. Yapılandırma, AI destekli geliştirme için ağ izolasyonu, dosya koruması ve sandbox ortamı sağlar."
    },
    "files": {
      "title": "Dosyalara Genel Bakış",
      "dockerfile": "Dockerfile - Tüm geliştirme araçlarıyla konteyner imajını tanımlar",
      "dockerCompose": "docker-compose.yaml - Konteyneri başlatmak için orkestrasyon dosyası",
      "env": ".env - Ortam değişkenleri (API anahtarlarınızı buraya ekleyin)",
      "initFirewall": "init-firewall.sh - Güvenlik için ağ güvenlik duvarı betiği",
      "workspace": "workspace/ - Konteynere bağlanan çalışma dizininiz",
      "claudeMd": "workspace/CLAUDE.md - Claude için proje talimatları",
      "settingsJson": "workspace/.claude/settings.json - Claude Code izin ayarları"
    },
    "baseImage": {
      "title": "Temel İmaj",
      "description": "Bu yapılandırma aşağıdaki Docker temel imajını kullanır:",
      "dockerHub": "Docker Hub'da Görüntüle"
    },
    "platform": {
      "title": "Platform",
      "description": "Konteyner bu platformda çalışacak şekilde yapılandırılmıştır:"
    },
    "aptPackages": {
      "title": "Sistem Paketleri (APT)",
      "description": "Aşağıdaki sistem paketleri kurulmuştur:"
    },
    "npmPackages": {
      "title": "Ek NPM Paketleri",
      "description": "Aşağıdaki ek NPM paketleri global olarak kurulmuştur:",
      "installedAs": "{{user}} olarak kuruldu"
    },
    "plugins": {
      "title": "Claude Code Eklentileri",
      "description": "Aşağıdaki Claude Code eklentileri kurulmuş ve etkinleştirilmiştir:",
      "viewOnGitHub": "GitHub'da Görüntüle"
    },
    "envVariables": {
      "title": "Ortam Değişkenleri",
      "description": "Aşağıdaki ortam değişkenleri yapılandırılmıştır (güvenlik nedeniyle değerler gösterilmemiştir):",
      "note": "Konteyneri başlatmadan önce gerçek değerlerinizi .env dosyasına ekleyin."
    },
    "protectedFiles": {
      "title": "Korumalı Dosyalar",
      "description": "Aşağıdaki dosyalar korunmaktadır ve erişimi önlemek için boş salt okunur dosyalar olarak bağlanmıştır:"
    },
    "settingsJson": {
      "title": "İzin Ayarları",
      "description": "Claude Code aşağıdaki izin kurallarıyla yapılandırılmıştır:",
      "allow": "İzin verilen işlemler (otomatik)",
      "ask": "Onay gerektiren işlemler",
      "deny": "Reddedilen işlemler"
    },
    "claudeMd": {
      "title": "Proje Talimatları",
      "description": "Claude için projeye özel talimatlar şurada tanımlanmıştır:"
    },
    "quickStart": {
      "title": "Hızlı Başlangıç",
      "step1": "Docker'ı kurun (aşağıdaki Ön Koşullar'a bakın)",
      "step2": "Konteyneri başlatın:",
      "step2CustomVersions": "İsteğe bağlı: Özel yazılım sürümleriyle derleyin (aşağıdaki Docker Build Arguments'e bakın):",
      "step3": "Claude Code'u başlatın:",
      "step4": "Konteyneri durdurun:",
      "note": "Workspace klasörünüz konteynerin içinde /workspace konumuna bağlanmıştır. Claude Code ilk başlatmada API anahtarını isteyecektir."
    },
    "buildArgs": {
      "title": "Docker Build Arguments",
      "description": "Docker derlemesi sırasında yazılım sürümlerini ve indirme URL'lerini yapılandırabilirsiniz. Varsayılan değerleri geçersiz kılmak için `--build-arg AD=DEĞER` kullanın.",
      "versionArgs": {
        "title": "Sürüm argümanları",
        "description": "Hangi yazılım sürümlerinin kurulacağını kontrol edin:"
      },
      "urlArgs": {
        "title": "URL argümanları",
        "description": "Aynalar veya proxy'ler için indirme URL'lerini geçersiz kılın:"
      },
      "defaultValue": "Varsayılan",
      "example": "Özel sürümlerle örnek:"
    },
    "prerequisites": {
      "title": "Ön Koşullar",
      "description": "Sisteminizde Docker kurulu olması gerekir. İşletim sisteminizi seçin:",
      "windows": {
        "title": "Windows",
        "steps": [
          "Docker Desktop'ı docker.com/products/docker-desktop adresinden indirin",
          "Yükleyiciyi çalıştırın ve kurulum sihirbazını takip edin",
          "İstendiğinde WSL 2 backend'i etkinleştirin (önerilir)",
          "Gerekirse bilgisayarınızı yeniden başlatın",
          "Docker Desktop'ı açın ve başlamasını bekleyin"
        ],
        "link": "Resmi Windows Kurulum Kılavuzu"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "Docker Desktop'ı docker.com/products/docker-desktop adresinden indirin",
          ".dmg dosyasını açın ve Docker'ı Uygulamalar'a sürükleyin",
          "Docker'ı Uygulamalar klasöründen açın",
          "İstendiğinde gerekli izinleri verin",
          "Docker'ın başlamasını bekleyin (menü çubuğunda balina simgesi)"
        ],
        "link": "Resmi macOS Kurulum Kılavuzu"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "Paket dizinini güncelleyin: sudo apt update",
          "Docker'ı kurun: sudo apt install docker.io docker-compose-v2",
          "Kullanıcınızı docker grubuna ekleyin: sudo usermod -aG docker $USER",
          "Grup değişikliklerinin geçerli olması için çıkış yapın ve tekrar giriş yapın",
          "Kurulumu doğrulayın: docker --version"
        ],
        "link": "Resmi Linux Kurulum Kılavuzu",
        "altNote": "Veya GUI deneyimi için Docker Desktop kurun."
      }
    },
    "troubleshooting": {
      "title": "Sorun Giderme",
      "issues": {
        "containerNotStarting": {
          "title": "Konteyner başlamıyor",
          "solutions": [
            "Docker'ın çalışıp çalışmadığını kontrol edin: docker info",
            ".env dosyasının var olduğunu ve ANTHROPIC_API_KEY içerdiğini doğrulayın",
            "Port çakışmalarını kontrol edin: docker ps",
            "Konteyner günlüklerini görüntüleyin: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "İzin reddedildi hataları",
          "solutions": [
            "Linux'ta kullanıcınızın docker grubunda olduğundan emin olun",
            "sudo ile çalıştırmayı deneyin (düzenli kullanım için önerilmez)",
            "Workspace klasöründeki dosya izinlerini kontrol edin"
          ]
        },
        "networkIssues": {
          "title": "Ağ veya API bağlantı sorunları",
          "solutions": [
            "Güvenlik duvarı betiği yalnızca belirli alan adlarına izin verir",
            "api.anthropic.com'un ağınızdan erişilebilir olduğundan emin olun",
            "Konteyner içindeki güvenlik duvarı günlüklerini kontrol edin: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "Konteynerde dosyalara erişilemiyor",
          "solutions": [
            "Korumalı dosyalar kasıtlı olarak boştur - bu beklenen davranıştır",
            "docker-compose.yaml'daki volume bağlamalarını kontrol edin",
            "Workspace klasörünün ana bilgisayarda var olduğundan emin olun"
          ]
        }
      }
    },
    "links": {
      "title": "Bağlantılar",
      "initializer": "Yeni yapılandırma oluştur",
      "documentation": "Claude Code Dokümantasyonu",
      "support": "Sorunları Bildirin"
    },
    "author": {
      "title": "Yazar",
      "createdBy": "Oluşturan",
      "support": "Bu projeyi destekleyin"
    },
    "software": {
      "title": "Kurulu Yazılımlar",
      "description": "Aşağıdaki geliştirme araçları kurulmuştur:"
    }
  }
};

export default tr;
