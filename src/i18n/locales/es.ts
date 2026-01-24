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

const es: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Genera archivos de configuración Docker para ejecutar Claude Code de forma segura"
  },
  "welcome": {
    "close": "Cerrar mensaje de bienvenida",
    "description": "Claude Code es el potente asistente de codificación con IA de Anthropic que puede leer, escribir y ejecutar código directamente en tu máquina. Aunque es increíblemente útil, ejecutar una IA con acceso al sistema de archivos y terminal requiere una consideración cuidadosa de la seguridad.",
    "purpose": "Esta herramienta genera una configuración completa de Docker que te permite ejecutar Claude Code en un entorno de contenedor aislado. Tu código permanece protegido mientras Claude puede seguir ayudándote a desarrollar, depurar y refactorizar.",
    "features": {
      "title": "Lo que puedes configurar:",
      "dockerfile": "Elige qué herramientas de desarrollo instalar (TypeScript, Python, Go, ffmpeg, ImageMagick)",
      "compose": "Establece variables de entorno (como tu clave API) y protege archivos sensibles del acceso",
      "claudeMd": "Escribe instrucciones específicas del proyecto que Claude lee al inicio de cada sesión"
    },
    "security": {
      "title": "Características de seguridad incluidas:",
      "firewall": "Firewall de red que solo permite conexiones a la API de Anthropic, npm y GitHub",
      "isolation": "Aislamiento completo del sistema host y la red local",
      "readonly": "Archivos sensibles montados como archivos vacíos de solo lectura",
      "capabilities": "Todas las capacidades de Linux eliminadas, sin escalada de privilegios permitida"
    },
    "privacy": {
      "title": "Aviso de privacidad:",
      "description": "Tu configuración se almacena localmente en tu navegador (localStorage) para que se conserve cuando regreses. Por razones de seguridad, los valores de las variables de entorno nunca se almacenan – solo se guardan los nombres de las variables. No se envían datos a ningún servidor. Puedes desactivar el autoguardado en cualquier momento usando el icono de guardar en el encabezado – esto también borrará todos los datos almacenados."
    }
  },
  "nav": {
    "header": "Navegación del encabezado"
  },
  "tabs": {
    "software": "Software",
    "preview": "Vista previa",
    "settings": "Configuración",
    "envVariables": "Entorno",
    "env": "Ent.",
    "protectedFiles": "Archivos protegidos",
    "protected": "Protegidos"
  },
  "language": {
    "switch": "Idioma"
  },
  "theme": {
    "switch": "Cambiar tema"
  },
  "autosave": {
    "enable": "Activar autoguardado",
    "disable": "Desactivar autoguardado"
  },
  "reset": {
    "button": "Restablecer valores predeterminados",
    "title": "Restablecer configuración",
    "description": "¿Estás seguro de que quieres restablecer toda la configuración a sus valores predeterminados? Esta acción no se puede deshacer.",
    "cancel": "Cancelar",
    "confirm": "Restablecer"
  },
  "software": {
    "baseImage": "Imagen base",
    "baseImageDesc": "La imagen base de Docker determina la base de tu contenedor. La imagen predeterminada 'node' incluye Node.js y npm. También puedes usar variantes como 'node:22-slim' para imágenes más pequeñas o 'node:22-bookworm' para bibliotecas de sistema adicionales.",
    "image": "Imagen",
    "typescript": "TypeScript",
    "typescriptDesc": "Instala el compilador de TypeScript (tsc) y ts-node para ejecutar TypeScript directamente. Esencial para proyectos TypeScript, permite la verificación de tipos, compilación a JavaScript y ejecución de archivos .ts sin compilación manual.",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "Un potente framework multimedia para procesar archivos de audio y video. Permite conversión de formato, edición de video, extracción de audio, streaming y análisis de medios. Requerido para proyectos que trabajan con archivos multimedia.",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "Una suite completa de procesamiento de imágenes que soporta más de 200 formatos. Proporciona herramientas para redimensionar, recortar, conversión de formato, marcas de agua y manipulación programática de imágenes. Ideal para flujos de trabajo automatizados de imágenes.",
    "python": "Python 3",
    "pythonDesc": "Instala el intérprete de Python 3 con el gestor de paquetes pip. Permite ejecutar scripts de Python, instalar paquetes de Python y usar herramientas basadas en Python. Útil para procesamiento de datos, scripting y tareas de IA/ML.",
    "uv": "uv",
    "uvDesc": "Instala uv, un instalador y resolvedor de paquetes Python extremadamente rápido escrito en Rust. Puede reemplazar pip, pip-tools y virtualenv para una gestión de dependencias más rápida.",
    "golang": "Go",
    "golangDesc": "Instala el lenguaje de programación Go (Golang) con el compilador y herramientas oficiales. Ideal para crear programas rápidos compilados estáticamente, herramientas CLI, servidores web y software de sistema.",
    "flutter": "Flutter",
    "flutterDesc": "Instala el SDK de Flutter con Dart y herramientas de desarrollo Android. Cree aplicaciones multiplataforma para móviles, web y escritorio desde una única base de código. Incluye el SDK de Android y herramientas de línea de comandos.",
    "rust": "Rust",
    "rustDesc": "Instala el lenguaje de programación Rust con el gestor de paquetes Cargo mediante rustup. Ideal para crear software de sistema rápido y seguro en memoria, herramientas CLI, WebAssembly y aplicaciones embebidas.",
    "version": "Versión",
    "latest": "última",
    "recommendsHint": "Recomendado: {{packages}}"
  },
  "aptPackages": {
    "title": "Paquetes APT personalizados",
    "description": "Añade paquetes Debian/Ubuntu adicionales para instalar en el contenedor.",
    "placeholder": "Ejemplo: curl, graphviz, tree, sqlite3...",
    "add": "Añadir paquetes",
    "remove": "Eliminar {{package}}"
  },
  "npmPackages": {
    "title": "Paquetes NPM personalizados",
    "description": "Añade paquetes NPM adicionales para instalar globalmente en el contenedor.",
    "placeholder": "Ejemplo: eslint, prettier, tsx...",
    "add": "Añadir paquetes",
    "remove": "Eliminar {{package}}",
    "installAs": "Instalar como",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Cambiar usuario de instalación para {{package}}"
  },
  "runCommands": {
    "title": "Comandos RUN personalizados",
    "description": "Añade comandos shell personalizados para ejecutar durante la construcción de la imagen Docker.",
    "placeholder": "Ejemplo: flutter doctor",
    "add": "Añadir comando",
    "remove": "Eliminar comando",
    "runAs": "Ejecutar como",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Cambiar usuario de ejecución para comando"
  },
  "env": {
    "description": "No hay variables de entorno definidas.",
    "key": "Clave",
    "value": "Valor",
    "add": "Añadir variable",
    "remove": "Eliminar",
    "keyPlaceholder": "Ejemplo: NOMBRE_VARIABLE",
    "valuePlaceholder": "Ejemplo: valor"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "El archivo CLAUDE.md contiene instrucciones específicas del proyecto que Claude lee al inicio de cada sesión. Este es el lugar para directrices de codificación, explicaciones de la estructura del proyecto, tecnologías preferidas o cualquier otro contexto que ayude a Claude a entender mejor el proyecto."
  },
  "protectedFiles": {
    "description": "No hay archivos protegidos definidos.",
    "path": "Ruta del archivo",
    "add": "Añadir ruta",
    "remove": "Eliminar",
    "pathPlaceholder": "Ejemplo: .env.local",
    "help": "Las rutas son relativas a /workspace/. Estos archivos se montarán como archivos vacíos de solo lectura para prevenir el acceso a datos sensibles."
  },
  "settings": {
    "title": "settings.json",
    "description": "Configura los permisos de Claude Code para controlar qué archivos se pueden leer, editar o recuperar. Los archivos protegidos se agregan automáticamente como reglas de denegación.",
    "permissions": "Permisos",
    "directive": "Directiva",
    "pattern": "Patrón",
    "patternPlaceholder": "Ejemplo: src/** o .env",
    "addRule": "Agregar regla",
    "removeRule": "Eliminar regla",
    "allow": "Permitir",
    "ask": "Preguntar",
    "deny": "Denegar",
    "noAllowRules": "No hay reglas de permiso definidas.",
    "noAskRules": "No hay reglas de consulta definidas.",
    "noDenyRules": "No hay reglas de denegación definidas.",
    "help": "Define reglas de permisos para operaciones Read(), Edit() y WebFetch(). Los patrones soportan sintaxis glob como src/** para coincidencia recursiva.",
    "learnMore": "Más información"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "El Dockerfile define qué software se instala en el contenedor. Además de Node.js y Claude Code, se pueden incluir herramientas adicionales como TypeScript, Python, Go, ffmpeg o ImageMagick. El software seleccionado estará disponible cuando Claude ejecute comandos.",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "El archivo docker-compose.yaml controla cómo se inicia el contenedor. Las variables de entorno (como claves API) se pueden definir aquí. Los archivos protegidos se montan como archivos vacíos de solo lectura para evitar que Claude acceda a datos sensibles como archivos .env."
  },
  "dockerCompose": {
    "platform": "Plataforma",
    "platformDesc": "Establece una plataforma específica para el contenedor (ej: linux/amd64). Deja vacío para usar la plataforma predeterminada. Usa esto cuando las imágenes base no soporten tu arquitectura.",
    "platformPlaceholder": "Ejemplo: linux/amd64"
  },
  "download": {
    "button": "Descargar ZIP",
    "generating": "Generando...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "Repositorio GitHub",
    "paypal": "Apoyar via PayPal"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "inglés",
    "de": "alemán",
    "es": "español",
    "fr": "francés",
    "it": "italiano",
    "pt": "portugués",
    "nl": "neerlandés",
    "ja": "japonés",
    "ko": "coreano",
    "zh": "chino",
    "ar": "árabe",
    "he": "hebreo",
    "hi": "hindi",
    "ur": "urdu",
    "uk": "ucraniano",
    "el": "griego",
    "pl": "polaco",
    "tr": "turco"
  },
  "errors": {
    "invalidEnvKey": "Nombre de variable inválido. Use solo letras, números y guiones bajos.",
    "duplicateEnvKey": "Este nombre de variable ya existe.",
    "invalidPath": "La ruta debe ser relativa (sin / inicial) y no puede contener .."
  },
  "readme": {
    "title": "Configuración Docker de Claude Code",
    "generatedBy": "Generado con [Claude Initializr]({{url}})",
    "languageSwitch": "Leer esto en {{language}}",
    "intro": {
      "title": "Sobre esta configuración",
      "description": "Esta carpeta contiene archivos de configuración Docker para ejecutar Claude Code de forma segura en un contenedor aislado. La configuración proporciona aislamiento de red, protección de archivos y un entorno sandbox para desarrollo asistido por IA."
    },
    "files": {
      "title": "Resumen de archivos",
      "dockerfile": "Dockerfile - Define la imagen del contenedor con todas las herramientas de desarrollo",
      "dockerCompose": "docker-compose.yaml - Archivo de orquestación para iniciar el contenedor",
      "env": ".env - Variables de entorno (añade tus claves API aquí)",
      "initFirewall": "init-firewall.sh - Script de firewall de red para seguridad",
      "workspace": "workspace/ - Tu directorio de trabajo montado en el contenedor",
      "claudeMd": "workspace/CLAUDE.md - Instrucciones del proyecto para Claude",
      "settingsJson": "workspace/.claude/settings.json - Configuración de permisos de Claude Code"
    },
    "baseImage": {
      "title": "Imagen base",
      "description": "Esta configuración usa la siguiente imagen base de Docker:",
      "dockerHub": "Ver en Docker Hub"
    },
    "platform": {
      "title": "Plataforma",
      "description": "El contenedor está configurado para ejecutarse en esta plataforma:"
    },
    "aptPackages": {
      "title": "Paquetes del sistema (APT)",
      "description": "Los siguientes paquetes del sistema están instalados:"
    },
    "npmPackages": {
      "title": "Paquetes NPM adicionales",
      "description": "Los siguientes paquetes NPM adicionales están instalados globalmente:",
      "installedAs": "instalado como {{user}}"
    },
    "envVariables": {
      "title": "Variables de entorno",
      "description": "Las siguientes variables de entorno están configuradas (valores no mostrados por seguridad):",
      "note": "Añade tus valores reales al archivo .env antes de iniciar el contenedor."
    },
    "protectedFiles": {
      "title": "Archivos protegidos",
      "description": "Los siguientes archivos están protegidos y montados como archivos vacíos de solo lectura:"
    },
    "settingsJson": {
      "title": "Configuración de permisos",
      "description": "Claude Code está configurado con las siguientes reglas de permisos:",
      "allow": "Operaciones permitidas (automático)",
      "ask": "Operaciones que requieren confirmación",
      "deny": "Operaciones denegadas"
    },
    "claudeMd": {
      "title": "Instrucciones del proyecto",
      "description": "Las instrucciones específicas del proyecto para Claude están definidas en:"
    },
    "quickStart": {
      "title": "Inicio rápido",
      "step1": "Instalar Docker (ver Requisitos previos abajo)",
      "step2": "Iniciar el contenedor:",
      "step2CustomVersions": "Opcional: Compilar con versiones personalizadas de software (ver Docker Build Arguments abajo):",
      "step3": "Iniciar Claude Code:",
      "step4": "Detener el contenedor:",
      "note": "Tu carpeta workspace está montada en /workspace dentro del contenedor. Consulta la sección Autenticación abajo para las opciones de inicio de sesión."
    },
    "authentication": {
      "title": "Autenticación",
      "description": "Claude Code admite dos métodos de autenticación. Elige el que mejor se adapte a tus necesidades:",
      "apiKey": {
        "title": "Opción 1: Clave API",
        "description": "Configura tu clave API en el archivo `.env` (`ANTHROPIC_API_KEY`). Claude Code la usará automáticamente.",
        "pros": [
          "Funciona en entornos headless/automatizados (CI/CD, contenedores, SSH)",
          "No requiere navegador",
          "Sin límites de uso (pago por uso)",
          "Confiable en todos los entornos"
        ],
        "cons": [
          "Cuesta dinero por llamada API (tarifas API estándar)",
          "Necesitas gestionar y asegurar la clave API",
          "Puede generar cargos inesperados sin límites de gasto"
        ]
      },
      "browserLogin": {
        "title": "Opción 2: Inicio de sesión con navegador (Claude Pro/Max/Team)",
        "description": "Ejecuta `/login` dentro de Claude Code para autenticarte a través del navegador con tu suscripción.",
        "pros": [
          "Incluido en tu suscripción (costo mensual predecible)",
          "Sin costos API adicionales",
          "Facturación unificada con Claude.ai"
        ],
        "cons": [
          "Requiere navegador para el inicio de sesión inicial",
          "Tiene límites de uso que se reinician semanalmente",
          "La autenticación puede no persistir en contenedores/sesiones SSH"
        ]
      }
    },
    "buildArgs": {
      "title": "Docker Build Arguments",
      "description": "Puedes configurar las versiones de software y las URLs de descarga durante la compilación de Docker. Usa `--build-arg NOMBRE=VALOR` para sobrescribir los valores predeterminados.",
      "versionArgs": {
        "title": "Argumentos de versión",
        "description": "Controla qué versiones de software se instalan:"
      },
      "urlArgs": {
        "title": "Argumentos de URL",
        "description": "Sobrescribe las URLs de descarga para mirrors o proxies:"
      },
      "defaultValue": "Predeterminado",
      "example": "Ejemplo con versiones personalizadas:"
    },
    "prerequisites": {
      "title": "Requisitos previos",
      "description": "Necesitas Docker instalado en tu sistema. Elige tu sistema operativo:",
      "windows": {
        "title": "Windows",
        "steps": [
          "Descarga Docker Desktop desde docker.com/products/docker-desktop",
          "Ejecuta el instalador y sigue el asistente de configuración",
          "Activa el backend WSL 2 cuando se solicite (recomendado)",
          "Reinicia tu computadora si es necesario",
          "Abre Docker Desktop y espera a que inicie"
        ],
        "link": "Guía oficial de instalación para Windows"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "Descarga Docker Desktop desde docker.com/products/docker-desktop",
          "Abre el archivo .dmg y arrastra Docker a Aplicaciones",
          "Abre Docker desde la carpeta Aplicaciones",
          "Concede los permisos necesarios cuando se solicite",
          "Espera a que Docker termine de iniciar (icono de ballena en la barra de menú)"
        ],
        "link": "Guía oficial de instalación para macOS"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "Actualiza el índice de paquetes: sudo apt update",
          "Instala Docker: sudo apt install docker.io docker-compose-v2",
          "Añade tu usuario al grupo docker: sudo usermod -aG docker $USER",
          "Cierra sesión y vuelve a iniciarla para que los cambios del grupo surtan efecto",
          "Verifica la instalación: docker --version"
        ],
        "link": "Guía oficial de instalación para Linux",
        "altNote": "O instala Docker Desktop para una experiencia con interfaz gráfica."
      }
    },
    "troubleshooting": {
      "title": "Solución de problemas",
      "issues": {
        "containerNotStarting": {
          "title": "El contenedor no inicia",
          "solutions": [
            "Verifica si Docker está ejecutándose: docker info",
            "Verifica que el archivo .env existe y contiene ANTHROPIC_API_KEY",
            "Busca conflictos de puertos: docker ps",
            "Ver logs del contenedor: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "Errores de permiso denegado",
          "solutions": [
            "En Linux, asegúrate de que tu usuario esté en el grupo docker",
            "Intenta ejecutar con sudo (no recomendado para uso regular)",
            "Verifica los permisos de archivos en la carpeta workspace"
          ]
        },
        "networkIssues": {
          "title": "Problemas de red o conexión API",
          "solutions": [
            "El script de firewall solo permite dominios específicos",
            "Asegúrate de que api.anthropic.com sea accesible desde tu red",
            "Verifica los logs del firewall dentro del contenedor: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "Archivos no accesibles en el contenedor",
          "solutions": [
            "Los archivos protegidos están intencionalmente vacíos - esto es esperado",
            "Verifica los montajes de volumen en docker-compose.yaml",
            "Asegúrate de que la carpeta workspace exista en el host"
          ]
        }
      }
    },
    "links": {
      "title": "Enlaces",
      "initializer": "Generar nueva configuración",
      "documentation": "Documentación de Claude Code",
      "support": "Reportar problemas"
    },
    "author": {
      "title": "Autor",
      "createdBy": "Creado por",
      "support": "Apoyar este proyecto"
    },
    "software": {
      "title": "Software instalado",
      "description": "Las siguientes herramientas de desarrollo están instaladas:"
    }
  }
};

export default es;
