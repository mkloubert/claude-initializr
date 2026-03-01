# Claude Initializr

**🌐 Diğer dillerde okuyun:**
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

[![Lisans: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![Bağış](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

[Claude Code](https://docs.anthropic.com/en/docs/claude-code)'u konteynerize ortamda güvenli bir şekilde çalıştırmak için Docker yapılandırma dosyaları oluşturan bir web uygulaması.

**Canlı Demo:** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## Özellikler

### Dockerfile Yapılandırması

- **Temel İmaj**: Docker temel imaj adını ve sürümünü yapılandırın (varsayılan: `node:24`)
- **Yazılım Seçimi**: Yüklenecek ek yazılımları seçin:
  - ffmpeg (ses/video işleme)
  - Flutter (Dart ve Android SDK içerir)
  - Go
  - ImageMagick (görüntü işleme)
  - Python 3
  - Rust (Cargo paket yöneticisi dahil)
  - TypeScript
  - uv (hızlı Python paket yükleyicisi, Python önerir)
  - Ollama (açık kaynak modelleri kullanmak için yerel Ollama örneğine bağlanma)
- **Sürüm Yapılandırması**: Yazılım sürümleri Docker build argümanları ile yapılandırılır (örn. `--build-arg GO_VERSION=1.22.0`)
- **Özel APT Paketleri**: Konteynere yüklenecek ek Debian/Ubuntu paketleri ekleyin
- **Özel NPM Paketleri**: Global olarak yüklenecek ek NPM paketleri ekleyin, `root` veya `node` kullanıcısı olarak yükleme seçeneği ile
- **Özel RUN Komutları**: Docker imajı oluşturulurken çalıştırılacak özel shell komutları ekleyin, `root` veya `node` kullanıcısı olarak çalıştırma seçeneği ile

### docker-compose.yaml Yapılandırması

- **Ortam Değişkenleri**: `.env` dosyanız için ortam değişkenlerini yapılandırın
- **Korunan Dosyalar**: Boş salt okunur dosyalar monte ederek korunması gereken dosyaları belirtin (`.env.local` gibi hassas dosyalara erişimi önler)

### CLAUDE.md Editörü

- Sözdizimi vurgulama özellikli Markdown editörü
- Yerleşik önizleme işlevi
- Claude için projeye özel talimatlar yazın

### settings.json Yapılandırması

- **İzin Kuralları**: Dosya erişimini yönetmek için Claude Code izinlerini yapılandırın
  - `Allow` - Otomatik olarak izin verilen işlemler için kurallar
  - `Ask` - Kullanıcı onayı gerektiren kurallar
  - `Deny` - Her zaman reddedilen kurallar
- **Desteklenen Direktifler**:
  - `Read()` - Claude'un hangi dosyaları okuyabileceğini belirler (örn: `Read(src/**)`)
  - `Edit()` - Claude'un hangi dosyaları düzenleyebileceğini belirler (örn: `Edit(.env)`)
  - `WebFetch()` - Ağ erişimini kontrol eder (örn: `WebFetch(https://api.github.com:*)`)
- **Otomatik Entegrasyon**: Korunan dosyalar otomatik olarak `Read()` reddetme kuralları olarak eklenir
- **Glob Desen Desteği**: Özyinelemeli eşleştirme için `src/**` gibi desenler kullanın

### DevContainer Yapılandırması (VS Code / GitHub Codespaces)

- **VS Code Entegrasyonu**: VS Code Dev Containers için `devcontainer.json` oluşturun
- **GitHub Codespaces**: GitHub Codespaces geliştirme için uyumlu yapılandırma
- **Uzantılar**: Otomatik kurulum için VS Code uzantılarını yapılandırın
- **Ayarlar**: Konteyner ortamı için VS Code ayarlarını tanımlayın
- **Features**: Dev Container Features ekleyin (örn: GitHub CLI, ek diller)
- **Port Yönlendirme**: Konteynerden yönlendirilecek portları yapılandırın
- **Yaşam Döngüsü Komutları**: post-create, post-start ve post-attach olayları için komutlar ayarlayın
- **Önerilen Uzantılar**: Seçilen yazılıma dayalı otomatik uzantı önerileri

### Modern Arayüz

- **Kenar Çubuğu Navigasyonu**: Tüm yapılandırma bölümlerine hızlı erişim için daraltılabilir kenar çubuğu
- **Bölme Bölmesi Düzeni**: Düzenleyici ve canlı önizlemeyi yan yana yerleştirilen panellerle görebilirsiniz
- **RTL Dil Desteği**: Arapça, İbranice ve Urduca için tam sağdan sola desteği

### Genel Özellikler

- **Canlı Önizleme**: Oluşturulan yapılandırma dosyalarının gerçek zamanlı önizlemelerini bölme paneliyle görebilirsiniz
- **ZIP İndirme**: Tüm dosyaları kullanıma hazır ZIP arşivi olarak indirin
- **Otomatik README Oluşturma**: Her ZIP aşağıdakileri içeren ayrıntılı bir README.md içerir:
  - Dosya genel bakışı ve açıklamaları
  - Docker Hub bağlantılı temel görüntü bilgileri
  - Yüklü yazılım ve paketler bağlantılarıyla (Debian Tracker, npmjs.com)
  - Ortam değişkeni anahtarları (güvenlik için değerler gizli)
  - Korunan dosya listesi
  - İzin ayarları özeti
  - Docker komutları ile hızlı başlangıç kılavuzu
  - Windows, macOS ve Linux için ön koşullar
  - Sorun giderme bölümü
  - Arayüz dili İngilizce olmadığında, README.en.md (basit İngilizce) de dahildir
- **Yapılandırma İçe/Dışa Aktarma**: Yapılandırmanızı JSON dosyası olarak dışa aktarın ve başka bir tarayıcı veya cihazda içe aktarın
- **Yapılandırma Geçmişi**: Geri al/yinele işlevselliği ile değişiklikleri izleyin
  - Gecikmeli anlık görüntülerle otomatik değişiklik izleme
  - Klavye kısayolları ile geri al/yinele (`Ctrl+Z` / `Ctrl+Y`)
  - Zaman damgaları ve değişiklik açıklamaları içeren geçmiş paneli
  - Durumları karşılaştırmak için fark görünümü
  - Herhangi bir önceki yapılandırma durumuna geri yükleme
  - Kalıcılık için IndexedDB'de depolanır (maks. 50 kayıt)
- **Otomatik Kaydetme**: Ayarlar tarayıcınızın localStorage'ına otomatik olarak kaydedilir (varsayılan olarak etkin)
- **Çoklu Dil Desteği**: 18 dilde mevcut:
  - 🌍 Arapça
  - 🇨🇳 Çince
  - 🇳🇱 Flemenkçe
  - 🇬🇧 İngilizce
  - 🇫🇷 Fransızca
  - 🇩🇪 Almanca
  - 🇬🇷 Yunanca
  - 🇮🇱 İbranice
  - 🇮🇳 Hintçe
  - 🇮🇹 İtalyanca
  - 🇯🇵 Japonca
  - 🇰🇷 Korece
  - 🇵🇱 Lehçe
  - 🇵🇹 Portekizce
  - 🇪🇸 İspanyolca
  - 🇹🇷 Türkçe
  - 🇺🇦 Ukraynaca
  - 🇵🇰 Urduca
- **Koyu/Açık Tema**: Manuel geçiş ile otomatik tema algılama
- **PWA Desteği**: Progressive Web App olarak yüklenebilir
- **Tam Erişilebilirlik**: Klavye navigasyonu ve ekran okuyucu desteği ile WCAG uyumlu
- **Duyarlı Tasarım**: Masaüstü ve tablet için optimize edilmiş
- **Klavye Kısayolları**: Özelleştirilebilir kısayollarla tam klavye navigasyonu (tümünü görüntülemek için `Ctrl+/` veya `⌘+/` basın)

### Klavye Kısayolları

Tüm kısayollar Windows/Linux'ta `Ctrl` ve macOS'ta `⌘` (Cmd) kullanır.

| Kısayol | Eylem |
| ------- | ----- |
| `Ctrl/⌘ + S` | ZIP İndir |
| `Ctrl/⌘ + E` | Önizleme panelini değiştir |
| `Ctrl/⌘ + B` | Kenar çubuğunu değiştir |
| `Ctrl/⌘ + Z` | Geri al |
| `Ctrl/⌘ + Y` | Yinele |
| `Ctrl/⌘ + Shift + Z` | Yinele (alternatif) |
| `Ctrl/⌘ + Shift + D` | Koyu/açık modu değiştir |
| `Ctrl/⌘ + Shift + X` | Varsayılanlara sıfırla |
| `Ctrl/⌘ + Shift + L` | Dil seçiciyi aç |
| `Ctrl/⌘ + 1-5` | Bölüme geç (1=Dockerfile, 2=Docker Compose, 3=CLAUDE.md, 4=settings.json, 5=DevContainer) |
| `Ctrl/⌘ + /` | Klavye kısayolları yardımını aç |
| `Escape` | İletişim kutusunu kapat |

Başlıktaki bir klavye simgesi aracılığıyla veya ayarlar menüsünde kısayol yardım iletişim kutusuna erişin.

### Otomatik Kaydetme Mekanizması

Otomatik kaydetme özelliği başlıktaki kaydetme simgesi kullanılarak açılıp kapatılabilir:

| Simge           | Durum      | Davranış                                                          |
| --------------- | ---------- | ----------------------------------------------------------------- |
| 💾 (Kaydet)     | Etkin      | Tüm değişiklikler localStorage'a otomatik olarak kaydedilir       |
| 🚫💾 (Kapalı)   | Devre Dışı | Değişiklikler kaydedilmez; mevcut kaydedilmiş veriler silinir     |

**Nasıl çalışır:**

- **Otomatik kaydetmeyi etkinleştirme**: Mevcut ayarları hemen localStorage'a kaydeder
- **Otomatik kaydetmeyi devre dışı bırakma**: Tüm kaydedilmiş ayarları localStorage'dan siler
- Otomatik kaydetme tercihiniz oturumlar arasında hatırlanır

### Yapılandırma İçe/Dışa Aktarma

Yapılandırmanızı JSON dosyaları aracılığıyla paylaşabilir veya yedekleyebilirsiniz:

- **Dışa Aktarma**: Başlıktaki yükleme simgesine tıklayarak mevcut yapılandırmanızı `claude-initializr-config.json` olarak indirin
- **İçe Aktarma**: Daha önce dışa aktarılmış bir JSON dosyasını seçmek için indirme simgesine tıklayın

**Nasıl çalışır:**

- **Dışa aktarma** tüm ayarları (temel imaj, yazılım seçimi, paketler, komutlar, izinler, CLAUDE.md içeriği) tek bir JSON dosyasına kaydeder
- **İçe aktarma** dosyayı doğrular, değişikliklerin önizlemesini gösterir ve uygulamadan önce onay ister
- Güvenlik nedeniyle, dışa aktarılan dosyalarda **ortam değişken değerleri asla yer almaz** — yalnızca değişken adları dışa aktarılır
- İçe aktarılan yapılandırmalar çakışmaları önlemek için yeni dahili kimlikler alır
- Dışa aktarma formatı ileriye dönük uyumluluk için bir sürüm alanı (`"version": "1.0"`) içerir

### Gizlilik ve Veri Depolama

Bu uygulama gizliliğinize saygı duyar:

- **Yalnızca Yerel Depolama**: Tüm ayarlar tarayıcınızda yerel olarak saklanır (localStorage)
- **Sunucu İletişimi Yok**: Hiçbir veri asla herhangi bir sunucuya gönderilmez
- **Tasarım Gereği Güvenli**: Ortam değişkeni **değerleri asla saklanmaz** - yalnızca değişken adları kaydedilir
- **Tam Kontrol**: Başlıktaki geçiş anahtarını kullanarak otomatik kaydetmeyi istediğiniz zaman devre dışı bırakabilirsiniz, bu da tüm saklanan verileri siler
- **Oturum Tabanlı Tema**: Tema tercihi sayfa yenilendiğinde sistem varsayılanına sıfırlanır

## Güvenlik Özellikleri

Oluşturulan Docker yapılandırması kapsamlı güvenlik önlemleri içerir:

### Ağ Güvenlik Duvarı

`init-firewall.sh` betiği sıkı ağ izolasyonu uygular:

- **iptables tabanlı güvenlik duvarı** tüm giden trafik için DROP politikası ile
- **Yalnızca izin listesi yaklaşımı** - yalnızca onaylı alan adlarına erişilebilir:
  - `api.anthropic.com` - Claude API
  - `npm registry` - Paket yükleme
  - `github.com` - Git işlemleri
  - `sentry.io` - Hata raporlama
- **Otomatik GitHub IP çözümleme** web, API ve git uç noktaları için
- **Ana bilgisayar ağ izolasyonu** - yerel ağa erişimi önler
- **Güvenlik duvarı doğrulaması** - testler kuralların doğru uygulandığından emin olur

### Docker Güvenlik Sertleştirme

- **Yetenek kaldırma**: Tüm Linux yetenekleri kaldırılır (`cap_drop: ALL`)
- **Ayrıcalık yükseltme yok**: `no-new-privileges:true`
- **Kaynak sınırları**: CPU ve bellek kısıtlamaları
- **Salt okunur bağlamalar**: Korunan dosyalar salt okunur olarak bağlanır
- **Root olmayan çalıştırma**: `node` kullanıcısı olarak çalışır

## Önceden Yüklenmiş Araçlar

Oluşturulan konteyner şunları içerir:

| Kategori           | Araçlar                             |
| ------------------ | ----------------------------------- |
| **Kabuk**          | zsh (Powerline10k teması ile), bash |
| **Editörler**      | nano, vim                           |
| **Sürüm Kontrolü** | git, git-delta, GitHub CLI (gh)     |
| **Araçlar**        | fzf, jq, less, unzip, man-db        |
| **Ağ**             | iptables, ipset, iproute2, dnsutils |

## Başlarken

### Gereksinimler

- Node.js 20 veya üstü
- npm 10 veya üstü

### Kurulum

```bash
# Depoyu klonlayın
git clone https://github.com/mkloubert/claude-initializr.git
cd claude-initializr

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Üretim için derleyin
npm run build

# Üretim derlemesini önizleyin
npm run preview
```

### Ortam Değişkenleri

Ortam değişkenlerini kullanarak uygulamayı özelleştirin. Bir `.env` dosyası oluşturun:

```bash
# GitHub depo URL'si (isteğe bağlı, gizlemek için boş bırakın)
VITE_GITHUB_URL=https://github.com/mkloubert/claude-initializr

# PayPal bağış URL'si (isteğe bağlı, gizlemek için boş bırakın)
VITE_PAYPAL_URL=https://paypal.me/mjkloubert

# Claude Code permissions documentation URL (optional)
VITE_PERMISSIONS_DOCS_URL=https://docs.anthropic.com/en/docs/claude-code/settings#permission-settings

# Author website URL (optional)
VITE_AUTHOR_URL=https://marcel.coffee

# Author name displayed in footer (optional)
VITE_AUTHOR_NAME=Marcel Joachim Kloubert
```

## Kullanım

1. **Temel İmajı Yapılandırın**: Docker temel imaj adını ve sürümünü ayarlayın (örn., `node:24` veya `node:22-slim`)

2. **Yazılım Seçin**: Konteynerinize yüklenecek ek yazılımı seçin

3. **Özel Paketler ve Komutlar Ekleyin**:
   - Özel APT paketleri ekleyin (örn., `curl`, `graphviz`, `sqlite3`)
   - Global olarak yüklenecek özel NPM paketleri ekleyin (örn., `eslint`, `prettier`)
   - NPM paketlerinin `node` (varsayılan) veya `root` kullanıcısı olarak yüklenip yüklenmeyeceğini seçin
   - Oluşturma sırasında çalıştırılacak özel RUN komutları ekleyin (örn., `pip install numpy`)
   - RUN komutlarının `node` (varsayılan) veya `root` kullanıcısı olarak çalıştırılıp çalıştırılmayacağını seçin

4. **Ortam Değişkenlerini Ayarlayın**: Projenizin ihtiyaç duyduğu ortam değişkenlerini ekleyin (örn., `ANTHROPIC_API_KEY`)

5. **Hassas Dosyaları Koruyun**: Korunması gereken dosyaların yollarını ekleyin (örn., `.env.local`)

6. **CLAUDE.md'yi Düzenleyin**: Markdown editöründe Claude için talimatlar yazın

7. **İzinleri Yapılandırın**: settings.json bölümü aracılığıyla izin kurallarını ayarlayın
   - Otomatik onaylanan işlemler için `Allow` kuralları ekleyin
   - Onay gerektiren işlemler için `Ask` kuralları ekleyin
   - Yasaklanan işlemler için `Deny` kuralları ekleyin
   - Korunan dosyalar otomatik olarak `Read()` reddetme kuralları olarak eklenir

8. **Önizleme**: Oluşturulan yapılandırma dosyalarını canlı önizleme panelinde kontrol edin

9. **İndirin**: Tüm dosyaları almak için "ZIP İndir"e tıklayın

## Oluşturulan Dosyaları Kullanma

1. ZIP dosyasını proje dizininize çıkarın

2. Proje dosyalarınızı `workspace` klasörüne kopyalayın (veya mevcut projenizi bağlayın)

3. API anahtarınızı `.env` dosyasında ayarlayın:

   ```bash
   ANTHROPIC_API_KEY=api-anahtariniz-buraya
   ```

4. Konteyneri derleyin ve çalıştırın:

   ```bash
   docker compose up --build
   ```

   **İsteğe bağlı: Özel yazılım sürümleri**

   Docker derlemesi sırasında build argümanları kullanarak yazılım sürümlerini özelleştirebilirsiniz:

   ```bash
   docker compose build \
     --build-arg CLAUDE_CODE_VERSION=1.0.3 \
     --build-arg FLUTTER_VERSION=3.29.3 \
     --build-arg GIT_DELTA_VERSION=0.18.2 \
     --build-arg GO_VERSION=1.24.3 \
     --build-arg PYTHON_VERSION=3.13.2 \
     --build-arg TYPESCRIPT_VERSION=5.8.3 \
     --build-arg ZSH_IN_DOCKER_VERSION=1.2.0
   ```

   | Derleme Argümanı | Varsayılan | Açıklama |
   |------------------|------------|----------|
   | `CLAUDE_CODE_VERSION` | `stable` | Claude Code sürümü (`latest` veya `1.0.58` gibi belirli) |
   | `FLUTTER_VERSION` | `latest` | Flutter SDK sürümü |
   | `GIT_DELTA_VERSION` | `0.18.2` | git-delta sürümü |
   | `GO_VERSION` | `latest` | Go sürümü |
   | `PYTHON_VERSION` | `latest` | Python 3 sürümü |
   | `TYPESCRIPT_VERSION` | `latest` | TypeScript sürümü |
   | `ZSH_IN_DOCKER_VERSION` | `1.2.0` | zsh-in-docker sürümü |

   **İsteğe bağlı: Özel indirme URL'leri**

   Paket indirmeleri için bir ayna veya proxy kullanmanız gerekiyorsa, derleme sırasında varsayılan URL'leri geçersiz kılabilirsiniz. Tüm URL'ler sorgu parametrelerini destekler:

   ```bash
   docker compose build \
     --build-arg GO_JSON_URL=https://my-mirror.example.com/golang/?mode=json \
     --build-arg GO_DOWNLOAD_URL=https://my-mirror.example.com/golang \
     --build-arg RUSTUP_INSTALL_URL=https://my-mirror.example.com/rustup/rustup-init.sh \
     --build-arg FLUTTER_JSON_URL=https://my-mirror.example.com/flutter/releases_linux.json \
     --build-arg FLUTTER_BASE_URL=https://my-mirror.example.com/flutter/releases \
     --build-arg UV_INSTALL_SCRIPT_URL=https://my-mirror.example.com/uv/install.sh
   ```

   | Derleme Argümanı | Varsayılan | Açıklama |
   |------------------|------------|----------|
   | `GO_JSON_URL` | `https://go.dev/dl/?mode=json` | Go sürüm JSON API URL'si (yalnızca "latest" için) |
   | `GO_DOWNLOAD_URL` | `https://go.dev/dl` | Go arşiv indirmeleri için temel URL |
   | `RUSTUP_INSTALL_URL` | `https://sh.rustup.rs` | rustup kurulum betiği URL'si |
   | `FLUTTER_JSON_URL` | `https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json` | Flutter sürüm JSON API URL'si (yalnızca "latest" için) |
   | `FLUTTER_BASE_URL` | `https://storage.googleapis.com/flutter_infra_release/releases` | Flutter arşiv indirmeleri için temel URL |
   | `UV_INSTALL_SCRIPT_URL` | `https://astral.sh/uv/install.sh` | uv kurulum betiği URL'si |

5. Konteynere bağlanın:

   ```bash
   docker compose exec claude zsh
   ```

6. Güvenlik duvarını başlatın (sudo şifresi gerektirir):

   ```bash
   sudo /usr/local/bin/init-firewall.sh
   ```

7. Claude Code'u başlatın:
   ```bash
   claude
   ```

## Oluşturulan Dosya Yapısı

```
├── .devcontainer/           # VS Code Dev Container (optional)
│   ├── devcontainer.json    # Dev Container configuration
│   └── post-create.sh       # Post-create script (if complex commands)
├── workspace/
│   ├── .claude/
│   │   └── settings.json    # Claude ayarları
│   ├── .empty               # Korunan bağlamalar için boş dosya
│   └── CLAUDE.md            # Claude talimatlarınız
├── .env                     # Ortam değişkenleri
├── Dockerfile               # Konteyner tanımı
├── docker-compose.yaml      # Docker Compose yapılandırması
└── init-firewall.sh         # Ağ güvenlik duvarı betiği
```

## Sorun Giderme

### Güvenlik Duvarı Sorunları

Güvenlik duvarını etkinleştirdikten sonra ağ sorunlarıyla karşılaşırsanız:

```bash
# Güvenlik duvarı durumunu kontrol edin
sudo iptables -L -n

# Engellenen bağlantıları görüntüleyin
sudo iptables -L -n -v | grep DROP

# Güvenlik duvarını sıfırlayın (tüm trafiğe izin verir)
sudo iptables -F
```

### Konteyner Başlamıyor

```bash
# Günlükleri kontrol edin
docker compose logs

# Önbellek olmadan yeniden derleyin
docker compose build --no-cache
```

### İzin Reddedildi

Workspace dizininin doğru izinlere sahip olduğundan emin olun:

```bash
chmod -R 755 workspace
```

### Uygulama Ayarlarını Sıfırlama

Tüm kaydedilmiş ayarları temizlemek ve sıfırdan başlamak için tarayıcınızın geliştirici konsolunu açın ve çalıştırın:

```javascript
localStorage.removeItem("claude-initializr-config");
localStorage.removeItem("claude-initializr-welcome-dismissed");
localStorage.removeItem("claude-initializr-autosave");
```

Ardından sayfayı yenileyin.

Alternatif olarak, ayarların kaydedilmesini önlemek için başlıktaki geçiş anahtarını kullanarak otomatik kaydetmeyi devre dışı bırakabilirsiniz.

## Teknoloji Yığını

- [React 19](https://react.dev/) TypeScript ve React Compiler ile
- [Vite](https://vite.dev/) paketleyici olarak
- [Tailwind CSS v4](https://tailwindcss.com/) OKLCH renk uzayı ile
- [shadcn/ui](https://ui.shadcn.com/) bileşenleri (40+ bileşen)
- [react-router](https://reactrouter.com/) yönlendirme için
- [i18next](https://www.i18next.com/) uluslararasılaştırma için
- [JSZip](https://stuk.github.io/jszip/) ZIP oluşturma için
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) kod önizlemeleri için

## Katkıda Bulunma

Katkılar memnuniyetle karşılanır! Lütfen bir Pull Request göndermekten çekinmeyin.

1. Depoyu forklayın
2. Özellik dalınızı oluşturun (`git checkout -b feature/harika-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika özellik ekle'`)
4. Dala push edin (`git push origin feature/harika-ozellik`)
5. Bir Pull Request açın

### Yeni Dil Ekleme

1. `src/i18n/locales/` içinde yeni bir yerel dosya oluşturun (örn., `fr.ts`)
2. `types.ts`'den `Translations` arayüzünü içe aktarın ve uygulayın
3. Yapıyı `en.ts`'den kopyalayın ve tüm dizeleri çevirin
4. Dil importunu `src/i18n/index.ts`'e ekleyin
5. Dil seçeneğini `LanguageSwitcher.tsx`'e ekleyin

## Erişilebilirlik

Bu uygulama tamamen erişilebilir olacak şekilde tasarlanmıştır:

- Anlamsal HTML yapısı (`<header>`, `<main>`, `<footer>`)
- Tüm etkileşimli öğelerde ARIA etiketleri
- Klavye navigasyonu desteği
- Ekran okuyucu uyumlu
- Yüksek kontrastlı renk şemaları
- Etkileşimli öğelerde odak göstergeleri

## Sürümler

Sürümler GitHub Actions aracılığıyla otomatikleştirilmiştir. Yeni bir sürüm oluşturmak için:

1. Bir versiyon etiketi oluşturun ve gönderin:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. İş akışı otomatik olarak:
   - Projeyi derler
   - `dist/` klasöründen ZIP arşivi oluşturur
   - Otomatik oluşturulan sürüm notlarıyla GitHub Release yayınlar

`-` içeren etiketler (örn. `v1.0.0-beta`) ön sürüm olarak işaretlenir.

## Değişiklik Günlüğü

### v4.1.3

- Yazılım paketi olarak Ollama desteği eklendi
  - Claude Code'u yerel Ollama örneklerine bağlamak için ortam değişkenlerini yapılandırır
  - Etkinleştirildiğinde `ANTHROPIC_BASE_URL` ve `ANTHROPIC_AUTH_TOKEN` otomatik olarak ayarlanır
  - Ollama devre dışı bırakıldığında ortam değişkenleri kaldırılır
- Ana bilgisayar ağ erişimi için docker-compose.yaml'a `extra_hosts` yapılandırması eklendi

### v4.0.2

- **Büyük Arayüz/Kullanıcı Deneyimi Yeniden Tasarımı**: Tam arayüz yenilemesi
  - Dikey kart tabanlı düzeni Kenar Çubuğu + Bölme Bölmesi düzeniyle değiştirildi
  - Hızlı bölüm geçişi için kenar çubuğu navigasyonu ve kısayollar (`Ctrl/⌘ + 1-5`)
  - Düzenleyici ve canlı önizleme yan yana yerleştirilmiş bölme paneli
  - Daraltılabilir kenar çubuğu ve simge-yalnızca modu (`Ctrl/⌘ + B` ile değiştir)
  - Bilişsel yükü azaltmak için akordeon bölümleri
- **RTL Dil Desteği**: Arapça, İbranice ve Urduca için tam sağdan sola desteği
  - RTL dilleri için kenar çubuğu otomatik olarak sağda konumlandırılır
  - Tüm arayüz öğeleri düzgün şekilde yansıtılır
- **Duyarlı İyileştirmeler**:
  - Kenar çubuğu tablet ekranlarında (768–1023px) daraltılmış olarak başlar
  - Mobil optimizasyonu alt sayfa önizlemesi ile
  - Dokunmatik uyumlu akordeon tetikleyicileri (minimum 44px yükseklik)
- **Hoş Geldiniz İletişim Kutusu**: İlk ziyaretchiler statik kart yerine hoş geldiniz iletişim kutusunu görür
  - Kenar çubuğundan "Hakkında" aracılığıyla yeniden açılabilir
- **Eski Bileşenlerin Kaldırılması**: Eski kart tabanlı bileşenlerin temizlenmesi
- Klavye kısayolları yeni düzen ile çalışacak şekilde güncellendi

### v3.2.1

- Geri al/yinele işlevselliği ile yapılandırma geçmişi eklendi
  - Gecikmeli anlık görüntülerle otomatik değişiklik izleme (500ms)
  - Klavye kısayolları ile geri al/yinele (`Ctrl/⌘ + Z` / `Ctrl/⌘ + Y`)
  - Zaman damgaları ve değişiklik açıklamaları içeren geçmiş paneli
  - Yapılandırmaları karşılaştırmak için fark görünümü
  - Herhangi bir önceki duruma geri yükleme
  - Kalıcılık için IndexedDB depolama (maks. 50 kayıt)
- VS Code ve GitHub Codespaces için DevContainer desteği eklendi
  - `devcontainer.json` yapılandırması oluşturma
  - VS Code uzantıları ve ayarlarını yapılandırma
  - Dev Container özellikleri ekleme
  - Port yönlendirme ayarlama
  - Yaşam döngüsü komutlarını yapılandırma (post-create, post-start, post-attach)
  - Seçili yazılıma göre otomatik uzantı önerileri
- DevContainer bölümüne geçmek için klavye kısayolu `Ctrl/⌘ + 5` eklendi
- DevContainer özelliği ile karşılama bölümü güncellendi

### v3.1.2

- Yaygın eylemler için klavye kısayolları eklendi (indirme, önizleme değiştirme, tema değiştirme, bölüm navigasyonu, dil seçici, sıfırlama)
- Gruplandırılmış görüntüleme ile klavye kısayolları yardım iletişim kutusu eklendi
- İşletim sistemine uygun değiştirici tuşlarla düğme araç ipuçlarına kısayol ipuçları eklendi
- Kısayol eylemleri için ekran okuyucu duyuruları ARIA canlı bölgesi eklendi
- Fark önizlemesi ve doğrulama ile JSON dosyaları üzerinden yapılandırma içe/dışa aktarma eklendi

### v3.0.0

- Eklenti özelliği kullanıcı arayüzünden kaldırıldı

### v2.0.2

- npm yerine yerel Claude Code yükleyicisine geçildi
- Dockerfile'da resmi eklenti kurulumu düzeltildi

### v1.3.0

- Kimlik doğrulama belgeleri eklendi

### v1.2.0

- Tüm README'lere Docker derleme argümanları belgeleri eklendi
- Aynalar ve proxy'ler için özel indirme URL'si belgeleri eklendi

### v1.1.1

- Başlığa sürüm gösterimi eklendi
- i18n sistemi JSON'dan tipli arayüzlü TypeScript'e dönüştürüldü
- ZIP indirmelerinde README dosyaları arasında dil geçişi düzeltildi

### v1.0.0

- İlk sürüm
- Dockerfile ve docker-compose.yaml ile Docker yapılandırma oluşturucu
- Yazılım seçimi (Go, Python, Rust, Flutter, TypeScript, ffmpeg, ImageMagick, uv)
- Özel APT paketleri, NPM paketleri ve RUN komutları
- Önizlemeli CLAUDE.md Markdown düzenleyici
- settings.json izin düzenleyicisi (Allow, Ask, Deny kuralları)
- Ortam değişkenleri ve korunan dosyalar yapılandırması
- Ağ güvenlik duvarı betiği oluşturma
- Otomatik oluşturulan README ile ZIP indirme
- Çoklu dil desteği (18 dil)
- Otomatik algılama ile koyu/açık tema
- localStorage'a otomatik kaydetme
- PWA desteği
- GitHub Actions sürüm iş akışı

## Destek

Bu projeyi faydalı buluyorsanız, desteklemeyi düşünün:

- ⭐ [GitHub](https://github.com/mkloubert/claude-initializr)'da depoya yıldız verin
- 💝 [PayPal ile bağış yapın](https://paypal.me/mjkloubert)

## Lisans

MIT Lisansı - ayrıntılar için [LICENSE](./LICENSE) dosyasına bakın.

Telif Hakkı © 2026 Marcel Joachim Kloubert
