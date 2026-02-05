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

const pt: Translations = {
  "app": {
    "title": "Claude Initializr",
    "description": "Gere arquivos de configuração Docker para executar Claude Code com segurança"
  },
  "welcome": {
    "close": "Fechar mensagem de boas-vindas",
    "description": "Claude Code é o poderoso assistente de codificação com IA da Anthropic que pode ler, escrever e executar código diretamente na sua máquina. Embora incrivelmente útil, executar uma IA com acesso ao sistema de arquivos e terminal requer consideração cuidadosa de segurança.",
    "purpose": "Esta ferramenta gera uma configuração completa do Docker que permite executar Claude Code em um ambiente de contêiner isolado. Seu código permanece protegido enquanto Claude pode continuar ajudando você a desenvolver, depurar e refatorar.",
    "dialogTitle": "Bem-vindo ao Claude Initializr",
    "getStarted": "Começar",
    "dontShowAgain": "Não mostrar novamente",
    "features": {
      "title": "O que você pode configurar:",
      "dockerfile": "Escolha quais ferramentas de desenvolvimento instalar (TypeScript, Python, Go, ffmpeg, ImageMagick)",
      "compose": "Defina variáveis de ambiente (como sua chave API) e proteja arquivos sensíveis de acesso",
      "claudeMd": "Escreva instruções específicas do projeto que Claude lê no início de cada sessão",
      "devContainer": "Gere configuração VS Code Dev Container para desenvolvimento contínuo"
    },
    "security": {
      "title": "Recursos de segurança incluídos:",
      "firewall": "Firewall de rede que permite apenas conexões com API Anthropic, npm e GitHub",
      "isolation": "Isolamento completo do sistema host e rede local",
      "readonly": "Arquivos sensíveis montados como arquivos vazios somente leitura",
      "capabilities": "Todas as capacidades Linux removidas, nenhuma escalada de privilégios permitida"
    },
    "privacy": {
      "title": "Aviso de privacidade:",
      "description": "Suas configurações são armazenadas localmente no seu navegador (localStorage) para que sejam preservadas quando você retornar. Por razões de segurança, os valores das variáveis de ambiente nunca são armazenados – apenas os nomes das variáveis são salvos. Nenhum dado é enviado para qualquer servidor. Você pode desativar o salvamento automático a qualquer momento usando o ícone de salvar no cabeçalho – isso também limpará todos os dados armazenados."
    }
  },
  "nav": {
    "header": "Navegação do cabeçalho"
  },
  "tabs": {
    "software": "Software",
    "preview": "Visualização",
    "settings": "Configurações",
    "envVariables": "Ambiente",
    "env": "Amb.",
    "protectedFiles": "Arquivos protegidos",
    "protected": "Protegidos"
  },
  "language": {
    "switch": "Idioma"
  },
  "theme": {
    "switch": "Alternar tema"
  },
  "autosave": {
    "enable": "Ativar salvamento automático",
    "disable": "Desativar salvamento automático"
  },
  "reset": {
    "button": "Redefinir para padrão",
    "title": "Redefinir configurações",
    "description": "Tem certeza de que deseja redefinir todas as configurações para seus valores padrão? Esta ação não pode ser desfeita.",
    "cancel": "Cancelar",
    "confirm": "Redefinir"
  },
  "software": {
    "baseImage": "Imagem base",
    "baseImageDesc": "A imagem base do Docker determina a fundação do seu contêiner. A imagem padrão 'node' inclui Node.js e npm. Você também pode usar variantes como 'node:22-slim' para imagens menores ou 'node:22-bookworm' para bibliotecas de sistema adicionais.",
    "image": "Imagem",
    "typescript": "TypeScript",
    "typescriptDesc": "Instala o compilador TypeScript (tsc) e ts-node para executar TypeScript diretamente. Essencial para projetos TypeScript, permitindo verificação de tipos, compilação para JavaScript e execução de arquivos .ts sem compilação manual.",
    "ffmpeg": "ffmpeg",
    "ffmpegDesc": "Um poderoso framework multimídia para processar arquivos de áudio e vídeo. Permite conversão de formato, edição de vídeo, extração de áudio, streaming e análise de mídia. Necessário para projetos que trabalham com arquivos de mídia.",
    "imagemagick": "ImageMagick",
    "imagemagickDesc": "Uma suite completa de processamento de imagens suportando mais de 200 formatos. Fornece ferramentas para redimensionamento, corte, conversão de formato, marca d'água e manipulação programática de imagens. Ideal para fluxos de trabalho automatizados de imagens.",
    "python": "Python 3",
    "pythonDesc": "Instala o interpretador Python 3 com o gerenciador de pacotes pip. Permite executar scripts Python, instalar pacotes Python e usar ferramentas baseadas em Python. Útil para processamento de dados, scripts e tarefas de IA/ML.",
    "uv": "uv",
    "uvDesc": "Instala o uv, um instalador e resolvedor de pacotes Python extremamente rápido escrito em Rust. Pode substituir pip, pip-tools e virtualenv para gerenciamento de dependências mais rápido.",
    "golang": "Go",
    "golangDesc": "Instala a linguagem de programação Go (Golang) com o compilador e ferramentas oficiais. Ideal para criar programas rápidos compilados estaticamente, ferramentas CLI, servidores web e software de sistema.",
    "flutter": "Flutter",
    "flutterDesc": "Instala o SDK Flutter com Dart e ferramentas de desenvolvimento Android. Crie aplicativos multiplataforma para dispositivos móveis, web e desktop a partir de uma única base de código. Inclui SDK Android e ferramentas de linha de comando.",
    "rust": "Rust",
    "rustDesc": "Instala a linguagem de programação Rust com o gerenciador de pacotes Cargo via rustup. Ideal para criar software de sistema rápido e seguro em memória, ferramentas CLI, WebAssembly e aplicações embarcadas.",
    "version": "Versão",
    "latest": "última",
    "recommendsHint": "Recomendado: {{packages}}"
  },
  "aptPackages": {
    "title": "Pacotes APT personalizados",
    "description": "Adicione pacotes Debian/Ubuntu adicionais para instalar no contêiner.",
    "placeholder": "Exemplo: curl, graphviz, tree, sqlite3...",
    "add": "Adicionar pacotes",
    "remove": "Remover {{package}}"
  },
  "npmPackages": {
    "title": "Pacotes NPM personalizados",
    "description": "Adicione pacotes NPM adicionais para instalar globalmente no contêiner.",
    "placeholder": "Exemplo: eslint, prettier, tsx...",
    "add": "Adicionar pacotes",
    "remove": "Remover {{package}}",
    "installAs": "Instalar como",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Alternar usuário de instalação para {{package}}"
  },
  "runCommands": {
    "title": "Comandos RUN personalizados",
    "description": "Adicione comandos shell personalizados para executar durante a construção da imagem Docker.",
    "placeholder": "Exemplo: flutter doctor",
    "add": "Adicionar comando",
    "remove": "Remover comando",
    "runAs": "Executar como",
    "userNode": "node",
    "userRoot": "root",
    "toggleUser": "Alternar usuário de execução para comando"
  },
  "env": {
    "description": "Nenhuma variável de ambiente definida.",
    "key": "Chave",
    "value": "Valor",
    "add": "Adicionar variável",
    "remove": "Remover",
    "keyPlaceholder": "Exemplo: NOME_VARIAVEL",
    "valuePlaceholder": "Exemplo: valor"
  },
  "claudeMd": {
    "title": "CLAUDE.md",
    "description": "O arquivo CLAUDE.md contém instruções específicas do projeto que Claude lê no início de cada sessão. Este é o lugar para diretrizes de codificação, explicações da estrutura do projeto, tecnologias preferidas ou qualquer outro contexto que ajude Claude a entender melhor o projeto."
  },
  "protectedFiles": {
    "description": "Nenhum arquivo protegido definido.",
    "path": "Caminho do arquivo",
    "add": "Adicionar caminho",
    "remove": "Remover",
    "pathPlaceholder": "Exemplo: .env.local",
    "help": "Os caminhos são relativos a /workspace/. Esses arquivos serão montados como arquivos vazios somente leitura para evitar acesso a dados sensíveis."
  },
  "settings": {
    "title": "settings.json",
    "description": "Configure as permissões do Claude Code para controlar quais arquivos podem ser lidos, editados ou buscados. Arquivos protegidos são adicionados automaticamente como regras de negação.",
    "permissions": "Permissões",
    "directive": "Diretiva",
    "pattern": "Padrão",
    "patternPlaceholder": "Exemplo: src/** ou .env",
    "addRule": "Adicionar regra",
    "removeRule": "Remover regra",
    "allow": "Permitir",
    "ask": "Perguntar",
    "deny": "Negar",
    "noAllowRules": "Nenhuma regra de permissão definida.",
    "noAskRules": "Nenhuma regra de consulta definida.",
    "noDenyRules": "Nenhuma regra de negação definida.",
    "help": "Defina regras de permissão para operações Read(), Edit() e WebFetch(). Os padrões suportam sintaxe glob como src/** para correspondência recursiva.",
    "learnMore": "Saiba mais",
    "summary": "Visão geral",
    "denyCount": "{{count}} negados",
    "askCount": "{{count}} perguntar",
    "allowCount": "{{count}} permitidos"
  },
  "preview": {
    "dockerfile": "Dockerfile",
    "dockerfileDesc": "O Dockerfile define qual software é instalado no contêiner. Além de Node.js e Claude Code, ferramentas adicionais como TypeScript, Python, Go, ffmpeg ou ImageMagick podem ser incluídas. O software selecionado estará disponível quando Claude executar comandos.",
    "dockerCompose": "docker-compose.yaml",
    "dockerComposeDesc": "O arquivo docker-compose.yaml controla como o contêiner é iniciado. Variáveis de ambiente (como chaves API) podem ser definidas aqui. Arquivos protegidos são montados como arquivos vazios somente leitura para evitar que Claude acesse dados sensíveis como arquivos .env.",
    "title": "Pré-visualização",
    "showPreview": "Mostrar pré-visualização",
    "hidePreview": "Ocultar pré-visualização",
    "empty": "Nenhuma pré-visualização disponível para esta seção.",
    "settingsJson": "settings.json",
    "devContainer": "devcontainer.json",
    "claudeMdIntegrated": "A pré-visualização está integrada no editor acima."
  },
  "dockerfile": {
    "software": "Software",
    "advancedOptions": "Opções avançadas",
    "softwareCount": "{{count}} selecionados"
  },
  "dockerCompose": {
    "platform": "Plataforma",
    "platformDesc": "Define uma plataforma específica para o contêiner (ex: linux/amd64). Deixe vazio para usar a plataforma padrão. Use quando as imagens base não suportam sua arquitetura.",
    "platformPlaceholder": "Exemplo: linux/amd64",
    "envSection": "Variáveis de ambiente",
    "protectedSection": "Arquivos protegidos"
  },
  "download": {
    "button": "Baixar ZIP",
    "generating": "Gerando...",
    "filename": "claude-docker-config.zip"
  },
  "links": {
    "github": "Repositório GitHub",
    "paypal": "Apoiar via PayPal"
  },
  "footer": {
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "languages": {
    "en": "inglês",
    "de": "alemão",
    "es": "espanhol",
    "fr": "francês",
    "it": "italiano",
    "pt": "português",
    "nl": "holandês",
    "ja": "japonês",
    "ko": "coreano",
    "zh": "chinês",
    "ar": "árabe",
    "he": "hebraico",
    "hi": "hindi",
    "ur": "urdu",
    "uk": "ucraniano",
    "el": "grego",
    "pl": "polonês",
    "tr": "turco"
  },
  "importExport": {
    "exportButton": "Exportar configuração",
    "importButton": "Importar configuração",
    "exportSuccess": "Configuração exportada com sucesso.",
    "importSuccess": "Configuração importada com sucesso.",
    "importErrorInvalidFile": "Formato de arquivo inválido. Selecione um arquivo JSON válido.",
    "importErrorValidation": "O arquivo contém dados de configuração inválidos.",
    "importErrorRead": "Não foi possível ler o arquivo. Tente novamente.",
    "importConfirmTitle": "Importar configuração",
    "importConfirmDescription": "Isso substituirá sua configuração atual. Esta ação não pode ser desfeita.",
    "importConfirmApply": "Aplicar",
    "importConfirmCancel": "Cancelar",
    "diffTitle": "Visualização de alterações",
    "diffBaseImage": "Imagem base",
    "diffNodeVersion": "Versão do Node",
    "diffDockerPlatform": "Plataforma Docker",
    "diffSoftware": "Software",
    "diffAptPackages": "Pacotes APT",
    "diffNpmPackages": "Pacotes NPM",
    "diffRunCommands": "Comandos RUN",
    "diffEnvVariables": "Variáveis de ambiente",
    "diffProtectedFiles": "Arquivos protegidos",
    "diffClaudeMd": "CLAUDE.md",
    "diffPermissions": "Permissões",
    "diffDevContainer": "DevContainer",
    "diffNoChanges": "Nenhuma alteração detectada.",
    "diffCurrent": "Atual",
    "diffImported": "Importado",
    "diffChanged": "Alterado",
    "diffUnchanged": "Inalterado"
  },
  "errors": {
    "invalidEnvKey": "Nome de variável inválido. Use apenas letras, números e underscores.",
    "duplicateEnvKey": "Este nome de variável já existe.",
    "invalidPath": "O caminho deve ser relativo (sem / inicial) e não pode conter .."
  },
  "readme": {
    "title": "Configuração Docker Claude Code",
    "generatedBy": "Gerado com [Claude Initializr]({{url}})",
    "languageSwitch": "Ler isto em {{language}}",
    "intro": {
      "title": "Sobre esta configuração",
      "description": "Esta pasta contém arquivos de configuração Docker para executar Claude Code de forma segura em um contêiner isolado. A configuração fornece isolamento de rede, proteção de arquivos e um ambiente sandbox para desenvolvimento assistido por IA."
    },
    "files": {
      "title": "Visão geral dos arquivos",
      "dockerfile": "Dockerfile - Define a imagem do contêiner com todas as ferramentas de desenvolvimento",
      "dockerCompose": "docker-compose.yaml - Arquivo de orquestração para iniciar o contêiner",
      "env": ".env - Variáveis de ambiente (adicione suas chaves API aqui)",
      "initFirewall": "init-firewall.sh - Script de firewall de rede para segurança",
      "workspace": "workspace/ - Seu diretório de trabalho montado no contêiner",
      "claudeMd": "workspace/CLAUDE.md - Instruções do projeto para Claude",
      "settingsJson": "workspace/.claude/settings.json - Configurações de permissões do Claude Code",
      "devcontainer": ".devcontainer/devcontainer.json - Configuração do VS Code Dev Container"
    },
    "baseImage": {
      "title": "Imagem base",
      "description": "Esta configuração usa a seguinte imagem Docker base:",
      "dockerHub": "Ver no Docker Hub"
    },
    "platform": {
      "title": "Plataforma",
      "description": "O contêiner está configurado para executar nesta plataforma:"
    },
    "aptPackages": {
      "title": "Pacotes do sistema (APT)",
      "description": "Os seguintes pacotes do sistema estão instalados:"
    },
    "npmPackages": {
      "title": "Pacotes NPM adicionais",
      "description": "Os seguintes pacotes NPM adicionais estão instalados globalmente:",
      "installedAs": "instalado como {{user}}"
    },
    "envVariables": {
      "title": "Variáveis de ambiente",
      "description": "As seguintes variáveis de ambiente estão configuradas (valores não mostrados por segurança):",
      "note": "Adicione seus valores reais ao arquivo .env antes de iniciar o contêiner."
    },
    "protectedFiles": {
      "title": "Arquivos protegidos",
      "description": "Os seguintes arquivos estão protegidos e montados como arquivos vazios somente leitura:"
    },
    "settingsJson": {
      "title": "Configurações de permissões",
      "description": "Claude Code está configurado com as seguintes regras de permissão:",
      "allow": "Operações permitidas (automático)",
      "ask": "Operações que requerem confirmação",
      "deny": "Operações negadas"
    },
    "claudeMd": {
      "title": "Instruções do projeto",
      "description": "As instruções específicas do projeto para Claude estão definidas em:"
    },
    "quickStart": {
      "title": "Início rápido",
      "step1": "Instalar Docker (veja Pré-requisitos abaixo)",
      "step2": "Iniciar o contêiner:",
      "step2CustomVersions": "Opcional: Compilar com versões personalizadas de software (veja Docker Build Arguments abaixo):",
      "step3": "Iniciar Claude Code:",
      "step4": "Parar o contêiner:",
      "note": "Sua pasta workspace está montada em /workspace dentro do contêiner. Consulte a seção Autenticação abaixo para opções de login."
    },
    "authentication": {
      "title": "Autenticação",
      "description": "Claude Code suporta dois métodos de autenticação. Escolha o que melhor atende às suas necessidades:",
      "apiKey": {
        "title": "Opção 1: Chave API",
        "description": "Configure sua chave API no arquivo `.env` (`ANTHROPIC_API_KEY`). Claude Code a usará automaticamente.",
        "pros": [
          "Funciona em ambientes headless/automatizados (CI/CD, contêineres, SSH)",
          "Não requer navegador",
          "Sem limites de uso (pagamento por uso)",
          "Confiável em todos os ambientes"
        ],
        "cons": [
          "Custa dinheiro por chamada API (taxas API padrão)",
          "Precisa gerenciar e proteger a chave API",
          "Pode gerar cobranças inesperadas sem limites de gastos"
        ]
      },
      "browserLogin": {
        "title": "Opção 2: Login pelo navegador (Claude Pro/Max/Team)",
        "description": "Execute `/login` dentro do Claude Code para autenticar via navegador com sua assinatura.",
        "pros": [
          "Incluído na sua assinatura (custo mensal previsível)",
          "Sem custos API adicionais",
          "Faturamento unificado com Claude.ai"
        ],
        "cons": [
          "Requer navegador para o login inicial",
          "Tem limites de uso que são redefinidos semanalmente",
          "A autenticação pode não persistir em contêineres/sessões SSH"
        ]
      }
    },
    "buildArgs": {
      "title": "Docker Build Arguments",
      "description": "Você pode configurar versões de software e URLs de download durante a compilação do Docker. Use `--build-arg NOME=VALOR` para substituir os valores padrão.",
      "versionArgs": {
        "title": "Argumentos de versão",
        "description": "Controle quais versões de software são instaladas:"
      },
      "urlArgs": {
        "title": "Argumentos de URL",
        "description": "Substitua URLs de download para mirrors ou proxies:"
      },
      "defaultValue": "Padrão",
      "example": "Exemplo com versões personalizadas:"
    },
    "prerequisites": {
      "title": "Pré-requisitos",
      "description": "Você precisa ter Docker instalado no seu sistema. Escolha seu sistema operacional:",
      "windows": {
        "title": "Windows",
        "steps": [
          "Baixe Docker Desktop de docker.com/products/docker-desktop",
          "Execute o instalador e siga o assistente de configuração",
          "Ative o backend WSL 2 quando solicitado (recomendado)",
          "Reinicie seu computador se necessário",
          "Abra Docker Desktop e aguarde iniciar"
        ],
        "link": "Guia oficial de instalação para Windows"
      },
      "macos": {
        "title": "macOS",
        "steps": [
          "Baixe Docker Desktop de docker.com/products/docker-desktop",
          "Abra o arquivo .dmg e arraste Docker para Aplicativos",
          "Abra Docker da pasta Aplicativos",
          "Conceda as permissões necessárias quando solicitado",
          "Aguarde Docker terminar de iniciar (ícone de baleia na barra de menu)"
        ],
        "link": "Guia oficial de instalação para macOS"
      },
      "linux": {
        "title": "Linux",
        "steps": [
          "Atualize o índice de pacotes: sudo apt update",
          "Instale Docker: sudo apt install docker.io docker-compose-v2",
          "Adicione seu usuário ao grupo docker: sudo usermod -aG docker $USER",
          "Faça logout e login novamente para que as mudanças do grupo tenham efeito",
          "Verifique a instalação: docker --version"
        ],
        "link": "Guia oficial de instalação para Linux",
        "altNote": "Ou instale Docker Desktop para uma experiência com interface gráfica."
      }
    },
    "troubleshooting": {
      "title": "Solução de problemas",
      "issues": {
        "containerNotStarting": {
          "title": "O contêiner não inicia",
          "solutions": [
            "Verifique se Docker está executando: docker info",
            "Verifique se o arquivo .env existe e contém ANTHROPIC_API_KEY",
            "Verifique conflitos de portas: docker ps",
            "Veja os logs do contêiner: docker compose logs"
          ]
        },
        "permissionDenied": {
          "title": "Erros de permissão negada",
          "solutions": [
            "No Linux, certifique-se de que seu usuário está no grupo docker",
            "Tente executar com sudo (não recomendado para uso regular)",
            "Verifique as permissões de arquivos na pasta workspace"
          ]
        },
        "networkIssues": {
          "title": "Problemas de rede ou conexão API",
          "solutions": [
            "O script de firewall permite apenas domínios específicos",
            "Certifique-se de que api.anthropic.com está acessível da sua rede",
            "Verifique os logs do firewall dentro do contêiner: sudo iptables -L -v"
          ]
        },
        "fileNotAccessible": {
          "title": "Arquivos não acessíveis no contêiner",
          "solutions": [
            "Arquivos protegidos são intencionalmente vazios - isso é esperado",
            "Verifique as montagens de volume em docker-compose.yaml",
            "Certifique-se de que a pasta workspace existe no host"
          ]
        }
      }
    },
    "links": {
      "title": "Links",
      "initializer": "Gerar nova configuração",
      "documentation": "Documentação Claude Code",
      "support": "Reportar problemas"
    },
    "author": {
      "title": "Autor",
      "createdBy": "Criado por",
      "support": "Apoiar este projeto"
    },
    "software": {
      "title": "Software instalado",
      "description": "As seguintes ferramentas de desenvolvimento estão instaladas:"
    },
    "devContainer": {
      "title": "VS Code Dev Container",
      "description": "Esta configuração inclui uma configuração VS Code Dev Container para desenvolvimento fluido.",
      "extensions": "As seguintes extensões do VS Code são instaladas automaticamente:",
      "features": "Os seguintes recursos do Dev Container estão incluídos:",
      "ports": "As seguintes portas são encaminhadas:",
      "commands": "Comandos de ciclo de vida configurados:",
      "vscodeOpen": "Abrir no VS Code",
      "codespacesOpen": "Abrir no GitHub Codespaces"
    }
  },
  "keyboardShortcuts": {
    "title": "Atalhos de teclado",
    "description": "Use atalhos de teclado para navegar e executar ações rapidamente.",
    "openHelp": "Atalhos de teclado",
    "categories": {
      "navigation": "Navegação",
      "actions": "Ações"
    },
    "shortcuts": {
      "downloadZip": "Baixar ZIP",
      "forceSave": "Forçar salvamento",
      "resetDefaults": "Redefinir para padrões",
      "togglePreviewPane": "Alternar painel de pré-visualização",
      "toggleSidebar": "Alternar barra lateral",
      "switchSection": "Alternar para seção {{number}}",
      "toggleDarkMode": "Alternar modo escuro",
      "openLanguageSwitcher": "Abrir seletor de idioma",
      "closeDialog": "Fechar diálogo",
      "openShortcutsHelp": "Abrir atalhos de teclado",
      "undo": "Desfazer",
      "redo": "Refazer"
    },
    "announced": {
      "downloadStarted": "Download iniciado",
      "configReset": "Configuração redefinida para os padrões",
      "darkModeToggled": "Modo escuro alternado",
      "previewPaneToggled": "Painel de pré-visualização alternado",
      "sectionSwitched": "Alternância para seção {{number}}",
      "sidebarToggled": "Barra lateral alternada",
      "undoPerformed": "Alteração desfeita",
      "redoPerformed": "Alteração refeita"
    }
  },
  "history": {
    "title": "Histórico",
    "description": "Visualizar e restaurar configurações anteriores.",
    "unavailable": "O histórico não está disponível neste navegador.",
    "undo": "Desfazer",
    "redo": "Refazer",
    "clearAll": "Limpar tudo",
    "clearConfirmTitle": "Limpar histórico",
    "clearConfirmDescription": "Tem certeza de que deseja limpar todo o histórico? Esta ação não pode ser desfeita.",
    "clearConfirmCancel": "Cancelar",
    "clearConfirmClear": "Limpar",
    "currentState": "Atual",
    "restoreButton": "Restaurar",
    "viewDiffButton": "Ver diferenças",
    "emptyState": "Ainda não há histórico. As alterações serão registradas automaticamente.",
    "diffTitle": "Comparando alterações",
    "diffFrom": "De",
    "diffTo": "Para",
    "diffClose": "Fechar",
    "changes": {
      "initial": "Estado inicial",
      "baseImage": "Imagem base alterada",
      "nodeVersion": "Versão do Node alterada",
      "dockerPlatform": "Plataforma Docker alterada",
      "softwareEnabled": "{{software}} habilitado",
      "softwareDisabled": "{{software}} desabilitado",
      "aptPackagesAdded": "Pacotes APT adicionados",
      "aptPackagesRemoved": "Pacotes APT removidos",
      "npmPackagesAdded": "Pacotes NPM adicionados",
      "npmPackagesRemoved": "Pacotes NPM removidos",
      "runCommandsAdded": "Comandos RUN adicionados",
      "runCommandsRemoved": "Comandos RUN removidos",
      "envVariablesAdded": "Variáveis de ambiente adicionadas",
      "envVariablesRemoved": "Variáveis de ambiente removidas",
      "envVariablesChanged": "Variáveis de ambiente modificadas",
      "protectedFilesAdded": "Arquivos protegidos adicionados",
      "protectedFilesRemoved": "Arquivos protegidos removidos",
      "claudeMdChanged": "CLAUDE.md modificado",
      "permissionsChanged": "Permissões modificadas",
      "devContainerChanged": "Configuração do DevContainer modificada",
      "multipleChanges": "Múltiplas alterações"
    }
  },
  "header": {
    "download": "Baixar",
    "downloadZip": "Baixar ZIP",
    "exportConfig": "Exportar configuração",
    "importConfig": "Importar configuração",
    "settings": "Configurações",
    "autosave": "Salvamento automático",
    "theme": "Tema",
    "themeLight": "Claro",
    "themeDark": "Escuro",
    "themeSystem": "Sistema",
    "language": "Idioma",
    "history": "Histórico",
    "resetDefaults": "Restaurar padrões",
    "keyboardShortcuts": "Atalhos de teclado"
  },
  "sidebar": {
    "configuration": "Configuração",
    "actions": "Ações",
    "dockerfile": "Dockerfile",
    "dockerCompose": "Docker Compose",
    "claudeMd": "CLAUDE.md",
    "settings": "Configurações",
    "devContainer": "DevContainer",
    "import": "Importar",
    "export": "Exportar",
    "history": "Histórico",
    "reset": "Redefinir",
    "toggle": "Alternar barra lateral",
    "about": "Sobre",
    "donate": "Doar",
    "copyright": "© 2026 Marcel Joachim Kloubert"
  },
  "devContainer": {
    "title": "DevContainer",
    "description": "Configure o suporte para VS Code Dev Containers e GitHub Codespaces. Isso gera um arquivo devcontainer.json que define seu ambiente de desenvolvimento.",
    "enable": "Habilitar DevContainer",
    "enableDesc": "Gerar um arquivo devcontainer.json para VS Code Dev Containers e GitHub Codespaces.",
    "name": "Nome do contêiner",
    "nameDesc": "Um nome de exibição para o contêiner de desenvolvimento.",
    "namePlaceholder": "Exemplo: Meu ambiente de desenvolvimento",
    "tabs": {
      "settings": "Configurações",
      "extensions": "Extensões",
      "features": "Recursos",
      "ports": "Portas",
      "preview": "Visualização"
    },
    "extensionsSection": "Extensões",
    "featuresSection": "Funcionalidades",
    "portsSection": "Portas encaminhadas",
    "scriptsSection": "Scripts de ciclo de vida",
    "settingsSection": "Configurações do VS Code",
    "extensions": {
      "title": "Extensões do VS Code",
      "description": "Extensões a serem instaladas automaticamente quando o contêiner for criado.",
      "placeholder": "Exemplo: ms-python.python",
      "add": "Adicionar extensão",
      "remove": "Remover {{extension}}",
      "recommended": "Extensões recomendadas",
      "recommendedDesc": "Com base no software selecionado, estas extensões são recomendadas.",
      "addRecommended": "Adicionar recomendadas",
      "noRecommendations": "Nenhuma recomendação com base na seleção de software atual."
    },
    "features": {
      "title": "Recursos do Dev Container",
      "description": "Recursos são unidades independentes de código de instalação e configuração.",
      "placeholder": "Exemplo: ghcr.io/devcontainers/features/python:1",
      "add": "Adicionar recurso",
      "remove": "Remover {{feature}}",
      "recommended": "Recursos recomendados",
      "recommendedDesc": "Com base no software selecionado, estes recursos são recomendados.",
      "addRecommended": "Adicionar recomendados",
      "noRecommendations": "Nenhuma recomendação com base na seleção de software atual."
    },
    "ports": {
      "title": "Portas encaminhadas",
      "description": "Portas a serem encaminhadas automaticamente do contêiner para o host.",
      "placeholder": "Exemplo: 3000",
      "add": "Adicionar porta",
      "remove": "Remover porta {{port}}",
      "invalid": "Por favor, insira um número de porta válido (1-65535)."
    },
    "scripts": {
      "title": "Scripts de ciclo de vida",
      "description": "Scripts Bash executados em diferentes estágios do ciclo de vida do contêiner. Cada script é salvo como um arquivo .sh separado.",
      "tabs": {
        "postCreate": "post-create.sh",
        "postStart": "post-start.sh",
        "postAttach": "post-attach.sh"
      },
      "postCreateTitle": "Script Post Create",
      "postCreateDesc": "Executa uma vez após a criação do contêiner. Use para configuração única como instalação de dependências.",
      "postStartTitle": "Script Post Start",
      "postStartDesc": "Executa cada vez que o contêiner inicia. Use para tarefas que precisam ser executadas em cada inicialização.",
      "postAttachTitle": "Script Post Attach",
      "postAttachDesc": "Executa cada vez que o VS Code se conecta ao contêiner.",
      "editorPlaceholder": "# Insira seus comandos bash aqui..."
    },
    "settings": {
      "title": "Configurações do VS Code",
      "description": "Configurações personalizadas do VS Code para o contêiner de desenvolvimento.",
      "key": "Chave da configuração",
      "value": "Valor",
      "keyPlaceholder": "Exemplo: editor.formatOnSave",
      "valuePlaceholder": "Exemplo: true",
      "add": "Adicionar configuração",
      "remove": "Remover configuração"
    }
  }
};

export default pt;
