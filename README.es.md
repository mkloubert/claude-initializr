# Claude Initializr

**🌐 Leer en otros idiomas:**
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

[![Licencia: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![Donar](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

Una aplicación web para generar archivos de configuración Docker para ejecutar [Claude Code](https://docs.anthropic.com/en/docs/claude-code) de forma segura en un entorno contenedorizado.

**Demo en vivo:** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## Características

### Configuración del Dockerfile

- **Imagen base**: Configure el nombre y la versión de la imagen Docker base (predeterminado: `node:24`)
- **Selección de software**: Elija software adicional para instalar:
  - ffmpeg (procesamiento de audio/video)
  - Flutter (incluye Dart y Android SDK)
  - Go
  - ImageMagick (procesamiento de imágenes)
  - Python 3
  - TypeScript
  - uv (instalador rápido de paquetes Python, recomienda Python)
- **Configuración de versiones**: Las versiones del software se configuran mediante argumentos de compilación de Docker (ej: `--build-arg GO_VERSION=1.22.0`)
- **Paquetes APT personalizados**: Agregue paquetes adicionales de Debian/Ubuntu para instalar en el contenedor
- **Paquetes NPM personalizados**: Agregue paquetes NPM adicionales para instalar globalmente, con la opción de instalar como usuario `root` o `node`
- **Comandos RUN personalizados**: Agregue comandos shell personalizados para ejecutar durante la construcción de la imagen Docker, con la opción de ejecutar como usuario `root` o `node`
- **Plugins de Claude Code**: Instale plugins de Claude Code desde marketplaces usando el formato `plugin-name@marketplace-name`
  - **Sugerencias de plugins**: Carga automáticamente sugerencias de plugins desde el [marketplace oficial de Anthropic](https://github.com/anthropics/claude-plugins-official) en segundo plano
  - Un clic para añadir plugins sugeridos
  - Enlaces externos para ver plugins en GitHub

### Configuración de docker-compose.yaml

- **Variables de entorno**: Configure variables de entorno para su archivo `.env`
- **Archivos protegidos**: Especifique archivos que deben protegerse montando archivos vacíos de solo lectura (evita el acceso a archivos sensibles como `.env.local`)

### Editor CLAUDE.md

- Editor Markdown con resaltado de sintaxis
- Funcionalidad de vista previa integrada
- Escriba instrucciones específicas del proyecto para Claude

### Configuración de settings.json

- **Reglas de permisos**: Configura los permisos de Claude Code para controlar el acceso a archivos
  - `Allow` - Reglas para operaciones automáticamente permitidas
  - `Ask` - Reglas que requieren confirmación del usuario
  - `Deny` - Reglas que siempre se deniegan
- **Directivas soportadas**:
  - `Read()` - Controla qué archivos puede leer Claude (ej: `Read(src/**)`)
  - `Edit()` - Controla qué archivos puede modificar Claude (ej: `Edit(.env)`)
  - `WebFetch()` - Controla el acceso a la red (ej: `WebFetch(https://api.github.com:*)`)
- **Integración automática**: Los archivos protegidos se agregan automáticamente como reglas de denegación `Read()`
- **Soporte de patrones Glob**: Usa patrones como `src/**` para coincidencia recursiva

### Características generales

- **Vista previa en vivo**: Vea vistas previas en tiempo real de los archivos de configuración generados
- **Descarga ZIP**: Descargue todos los archivos como un archivo ZIP listo para usar
- **Generación automática de README**: Cada ZIP incluye un README.md detallado con:
  - Descripción general de archivos y descripciones
  - Información de imagen base con enlaces a Docker Hub
  - Software y paquetes instalados con enlaces (Debian Tracker, npmjs.com)
  - Información de plugins con enlaces a GitHub
  - Claves de variables de entorno (valores ocultos por seguridad)
  - Lista de archivos protegidos
  - Resumen de configuración de permisos
  - Guía de inicio rápido con comandos de Docker
  - Requisitos previos para Windows, macOS y Linux
  - Sección de solución de problemas
  - Cuando el idioma de la interfaz no es inglés, también incluye README.en.md (inglés simple)
- **Guardado automático**: La configuración se guarda automáticamente en el localStorage de su navegador (habilitado por defecto)
- **Soporte multilingüe**: Disponible en 18 idiomas:
  - 🌍 Árabe
  - 🇨🇳 Chino
  - 🇳🇱 Neerlandés
  - 🇬🇧 Inglés
  - 🇫🇷 Francés
  - 🇩🇪 Alemán
  - 🇬🇷 Griego
  - 🇮🇱 Hebreo
  - 🇮🇳 Hindi
  - 🇮🇹 Italiano
  - 🇯🇵 Japonés
  - 🇰🇷 Coreano
  - 🇵🇱 Polaco
  - 🇵🇹 Portugués
  - 🇪🇸 Español
  - 🇹🇷 Turco
  - 🇺🇦 Ucraniano
  - 🇵🇰 Urdu
- **Tema oscuro/claro**: Detección automática de tema con cambio manual
- **Soporte PWA**: Instalable como Progressive Web App
- **Totalmente accesible**: Compatible con WCAG con navegación por teclado y soporte para lectores de pantalla
- **Diseño responsive**: Optimizado para escritorio y tablet

### Mecanismo de guardado automático

La función de guardado automático se puede activar/desactivar usando el icono de guardar en el encabezado:

| Icono           | Estado       | Comportamiento                                                       |
| --------------- | ------------ | -------------------------------------------------------------------- |
| 💾 (Guardar)    | Habilitado   | Todos los cambios se guardan automáticamente en localStorage         |
| 🚫💾 (Apagado)  | Deshabilitado| Los cambios no se guardan; los datos existentes se eliminan          |

**Cómo funciona:**

- **Habilitar guardado automático**: Guarda inmediatamente la configuración actual en localStorage
- **Deshabilitar guardado automático**: Elimina toda la configuración guardada de localStorage
- Su preferencia de guardado automático se recuerda entre sesiones

### Privacidad y almacenamiento de datos

Esta aplicación respeta su privacidad:

- **Solo almacenamiento local**: Toda la configuración se almacena localmente en su navegador (localStorage)
- **Sin comunicación con servidor**: Nunca se envían datos a ningún servidor
- **Seguro por diseño**: Los **valores** de las variables de entorno **nunca se almacenan** - solo se guardan los nombres de las variables
- **Control total**: Puede deshabilitar el guardado automático en cualquier momento usando el interruptor en el encabezado, lo que también elimina todos los datos almacenados
- **Tema basado en sesión**: La preferencia de tema se restablece al predeterminado del sistema al recargar la página

## Características de seguridad

La configuración Docker generada incluye medidas de seguridad completas:

### Firewall de red

El script `init-firewall.sh` implementa aislamiento de red estricto:

- **Firewall basado en iptables** con política DROP para todo el tráfico saliente
- **Enfoque de lista blanca** - solo los dominios autorizados son accesibles:
  - `api.anthropic.com` - API de Claude
  - `npm registry` - Instalación de paquetes
  - `github.com` - Operaciones Git
  - `sentry.io` - Informes de errores
- **Resolución automática de IP de GitHub** para endpoints web, API y git
- **Aislamiento de red del host** - evita el acceso a la red local
- **Verificación del firewall** - las pruebas aseguran que las reglas se apliquen correctamente

### Endurecimiento de seguridad de Docker

- **Eliminación de capacidades**: Todas las capacidades de Linux se eliminan (`cap_drop: ALL`)
- **Sin escalada de privilegios**: `no-new-privileges:true`
- **Límites de recursos**: Restricciones de CPU y memoria
- **Montajes de solo lectura**: Los archivos protegidos se montan como solo lectura
- **Ejecución sin root**: Se ejecuta como usuario `node`

## Herramientas preinstaladas

El contenedor generado incluye:

| Categoría              | Herramientas                        |
| ---------------------- | ----------------------------------- |
| **Shell**              | zsh con tema Powerline10k, bash     |
| **Editores**           | nano, vim                           |
| **Control de versiones**| git, git-delta, GitHub CLI (gh)    |
| **Utilidades**         | fzf, jq, less, unzip, man-db        |
| **Red**                | iptables, ipset, iproute2, dnsutils |

## Primeros pasos

### Requisitos previos

- Node.js 20 o superior
- npm 10 o superior

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/mkloubert/claude-initializr.git
cd claude-initializr

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Vista previa de la compilación de producción
npm run preview
```

### Variables de entorno

Personalice la aplicación usando variables de entorno. Cree un archivo `.env`:

```bash
# URL del repositorio GitHub (opcional, dejar vacío para ocultar)
VITE_GITHUB_URL=https://github.com/mkloubert/claude-initializr

# URL de donación PayPal (opcional, dejar vacío para ocultar)
VITE_PAYPAL_URL=https://paypal.me/mjkloubert

# Claude Code permissions documentation URL (optional)
VITE_PERMISSIONS_DOCS_URL=https://docs.anthropic.com/en/docs/claude-code/settings#permission-settings

# Author website URL (optional)
VITE_AUTHOR_URL=https://marcel.coffee

# Author name displayed in footer (optional)
VITE_AUTHOR_NAME=Marcel Joachim Kloubert
```

## Uso

1. **Configurar imagen base**: Establezca el nombre y la versión de la imagen Docker base (ej., `node:24` o `node:22-slim`)

2. **Seleccionar software**: Elija qué software adicional instalar en su contenedor

3. **Agregar paquetes y comandos personalizados**:
   - Agregue paquetes APT personalizados (ej., `curl`, `graphviz`, `sqlite3`)
   - Agregue paquetes NPM personalizados para instalar globalmente (ej., `eslint`, `prettier`)
   - Elija si los paquetes NPM deben instalarse como usuario `node` (predeterminado) o `root`
   - Agregue comandos RUN personalizados para ejecutar durante la construcción (ej., `pip install numpy`)
   - Elija si los comandos RUN deben ejecutarse como usuario `node` (predeterminado) o `root`

4. **Establecer variables de entorno**: Agregue cualquier variable de entorno que su proyecto necesite (ej., `ANTHROPIC_API_KEY`)

5. **Proteger archivos sensibles**: Agregue rutas a archivos que deben protegerse (ej., `.env.local`)

6. **Editar CLAUDE.md**: Escriba instrucciones para Claude en el editor Markdown

7. **Configurar permisos**: Configura las reglas de permisos en la tarjeta settings.json
   - Agrega reglas `Allow` para operaciones auto-aprobadas
   - Agrega reglas `Ask` para operaciones que requieren confirmación
   - Agrega reglas `Deny` para operaciones prohibidas
   - Los archivos protegidos se agregan automáticamente como reglas de denegación `Read()`

8. **Vista previa**: Verifique los archivos de configuración generados en las pestañas de vista previa

9. **Descargar**: Haga clic en "Descargar ZIP" para obtener todos los archivos

## Uso de los archivos generados

1. Extraiga el archivo ZIP en el directorio de su proyecto

2. Copie los archivos de su proyecto a la carpeta `workspace` (o monte su proyecto existente)

3. Establezca su clave API en el archivo `.env`:

   ```bash
   ANTHROPIC_API_KEY=su-clave-api-aquí
   ```

4. Construir e iniciar el contenedor:

   ```bash
   docker compose up --build
   ```

   **Opcional: URLs de descarga personalizadas**

   Si necesita usar un mirror o proxy para las descargas de paquetes, puede sobrescribir las URLs predeterminadas durante la construcción. Todas las URLs soportan parámetros de consulta:

   ```bash
   docker compose build \
     --build-arg GO_JSON_URL=https://mi-mirror.example.com/golang/?mode=json \
     --build-arg GO_DOWNLOAD_URL=https://mi-mirror.example.com/golang \
     --build-arg UV_INSTALL_SCRIPT_URL=https://mi-mirror.example.com/uv/install.sh
   ```

   | Argumento de build | Predeterminado | Descripción |
   |--------------------|----------------|-------------|
   | `GO_JSON_URL` | `https://go.dev/dl/?mode=json` | URL de la API JSON de versiones de Go (solo para "latest") |
   | `GO_DOWNLOAD_URL` | `https://go.dev/dl` | URL base para descargas de archivos Go |
   | `UV_INSTALL_SCRIPT_URL` | `https://astral.sh/uv/install.sh` | URL del script de instalación de uv |

5. Conectarse al contenedor:

   ```bash
   docker compose exec claude zsh
   ```

6. Inicializar el firewall (requiere contraseña sudo):

   ```bash
   sudo /usr/local/bin/init-firewall.sh
   ```

7. Iniciar Claude Code:
   ```bash
   claude
   ```

## Estructura de archivos generados

```
├── workspace/
│   ├── .claude/
│   │   └── settings.json    # Configuración de Claude
│   ├── .empty               # Archivo vacío para montajes protegidos
│   └── CLAUDE.md            # Sus instrucciones para Claude
├── .env                     # Variables de entorno
├── Dockerfile               # Definición del contenedor
├── docker-compose.yaml      # Configuración de Docker Compose
└── init-firewall.sh         # Script de firewall de red
```

## Solución de problemas

### Problemas de firewall

Si encuentra problemas de red después de habilitar el firewall:

```bash
# Verificar estado del firewall
sudo iptables -L -n

# Ver conexiones bloqueadas
sudo iptables -L -n -v | grep DROP

# Restablecer firewall (permite todo el tráfico)
sudo iptables -F
```

### El contenedor no inicia

```bash
# Verificar logs
docker compose logs

# Reconstruir sin caché
docker compose build --no-cache
```

### Permiso denegado

Asegúrese de que el directorio workspace tenga los permisos correctos:

```bash
chmod -R 755 workspace
```

### Restablecer configuración de la aplicación

Para borrar toda la configuración guardada y empezar de nuevo, abra la consola de desarrollador de su navegador y ejecute:

```javascript
localStorage.removeItem("claude-initializr-config");
localStorage.removeItem("claude-initializr-welcome-dismissed");
localStorage.removeItem("claude-initializr-autosave");
```

Luego recargue la página.

Alternativamente, puede deshabilitar el guardado automático usando el interruptor en el encabezado para evitar que se guarde la configuración.

## Stack tecnológico

- [React 19](https://react.dev/) con TypeScript y React Compiler
- [Vite](https://vite.dev/) como bundler
- [Tailwind CSS v4](https://tailwindcss.com/) con espacio de color OKLCH
- [shadcn/ui](https://ui.shadcn.com/) componentes (40+ componentes)
- [react-router](https://reactrouter.com/) para enrutamiento
- [i18next](https://www.i18next.com/) para internacionalización
- [JSZip](https://stuk.github.io/jszip/) para generación de ZIP
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) para vistas previas de código

## Contribuir

¡Las contribuciones son bienvenidas! No dude en enviar un Pull Request.

1. Haga fork del repositorio
2. Cree su rama de característica (`git checkout -b feature/caracteristica-increible`)
3. Confirme sus cambios (`git commit -m 'Agregar característica increíble'`)
4. Empuje a la rama (`git push origin feature/caracteristica-increible`)
5. Abra un Pull Request

### Agregar un nuevo idioma

1. Cree un nuevo archivo de configuración regional en `src/i18n/locales/` (ej., `fr.ts`)
2. Importe e implemente la interfaz `Translations` desde `types.ts`
3. Copie la estructura de `en.ts` y traduzca todas las cadenas
4. Agregue la importación del idioma a `src/i18n/index.ts`
5. Agregue la opción de idioma a `LanguageSwitcher.tsx`

## Accesibilidad

Esta aplicación está diseñada para ser completamente accesible:

- Estructura HTML semántica (`<header>`, `<main>`, `<footer>`)
- Etiquetas ARIA en todos los elementos interactivos
- Soporte de navegación por teclado
- Compatible con lectores de pantalla
- Esquemas de colores de alto contraste
- Indicadores de enfoque en elementos interactivos

## Lanzamientos

Los lanzamientos se automatizan a través de GitHub Actions. Para crear un nuevo lanzamiento:

1. Cree y empuje una etiqueta de versión:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. El flujo de trabajo automáticamente:
   - Compila el proyecto
   - Crea un archivo ZIP desde la carpeta `dist/`
   - Publica un Release de GitHub con notas de lanzamiento auto-generadas

Las etiquetas que contienen `-` (ej. `v1.0.0-beta`) se marcan como pre-lanzamientos.

## Apoyo

Si encuentra útil este proyecto, considere apoyarlo:

- ⭐ Dé una estrella al repositorio en [GitHub](https://github.com/mkloubert/claude-initializr)
- 💝 [Donar a través de PayPal](https://paypal.me/mjkloubert)

## Licencia

Licencia MIT - vea [LICENSE](./LICENSE) para más detalles.

Copyright © 2026 Marcel Joachim Kloubert
