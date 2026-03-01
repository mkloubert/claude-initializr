# Claude Initializr

**🌐 Ler em outros idiomas:**
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

[![Licença: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/mkloubert/claude-initializr)
[![Doar](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/mjkloubert)

Uma aplicação web para gerar arquivos de configuração Docker para executar o [Claude Code](https://docs.anthropic.com/en/docs/claude-code) com segurança em um ambiente containerizado.

**Demo ao vivo:** [https://claude.kloubert.dev](https://claude.kloubert.dev)

## Funcionalidades

### Configuração do Dockerfile

- **Imagem base**: Configure o nome e a versão da imagem Docker base (padrão: `node:24`)
- **Seleção de software**: Escolha software adicional para instalar:
  - ffmpeg (processamento de áudio/vídeo)
  - Flutter (inclui Dart e Android SDK)
  - Go
  - ImageMagick (processamento de imagens)
  - Python 3
  - Rust (inclui o gerenciador de pacotes Cargo)
  - TypeScript
  - uv (instalador rápido de pacotes Python, recomenda Python)
  - Ollama (conectar a uma instância Ollama local para usar modelos de código aberto)
- **Configuração de versões**: As versões do software são configuradas via argumentos de build do Docker (ex: `--build-arg GO_VERSION=1.22.0`)
- **Pacotes APT personalizados**: Adicione pacotes Debian/Ubuntu adicionais para instalar no container
- **Pacotes NPM personalizados**: Adicione pacotes NPM adicionais para instalar globalmente, com a opção de instalar como usuário `root` ou `node`
- **Comandos RUN personalizados**: Adicione comandos shell personalizados para executar durante a construção da imagem Docker, com a opção de executar como usuário `root` ou `node`

### Configuração docker-compose.yaml

- **Variáveis de ambiente**: Configure variáveis de ambiente para seu arquivo `.env`
- **Arquivos protegidos**: Especifique arquivos que devem ser protegidos montando arquivos vazios somente leitura (impede acesso a arquivos sensíveis como `.env.local`)

### Editor CLAUDE.md

- Editor Markdown com destaque de sintaxe
- Funcionalidade de visualização integrada
- Escreva instruções específicas do projeto para o Claude

### Configuração do settings.json

- **Regras de permissão**: Configure as permissões do Claude Code para controlar o acesso a arquivos
  - `Allow` - Regras para operações automaticamente permitidas
  - `Ask` - Regras que requerem confirmação do usuário
  - `Deny` - Regras sempre negadas
- **Diretivas suportadas**:
  - `Read()` - Controla quais arquivos Claude pode ler (ex: `Read(src/**)`)
  - `Edit()` - Controla quais arquivos Claude pode modificar (ex: `Edit(.env)`)
  - `WebFetch()` - Controla acesso à rede (ex: `WebFetch(https://api.github.com:*)`)
- **Integração automática**: Arquivos protegidos são adicionados automaticamente como regras de negação `Read()`
- **Suporte a padrões Glob**: Use padrões como `src/**` para correspondência recursiva

### Configuração de DevContainer (VS Code / GitHub Codespaces)

- **Integração com VS Code**: Gere `devcontainer.json` para VS Code Dev Containers
- **GitHub Codespaces**: Configuração compatível para desenvolvimento no GitHub Codespaces
- **Extensões**: Configure extensões do VS Code para instalar automaticamente
- **Configurações**: Defina configurações do VS Code para o ambiente do contêiner
- **Features**: Adicione Dev Container Features (ex: GitHub CLI, linguagens adicionais)
- **Encaminhamento de portas**: Configure portas para encaminhar do contêiner
- **Comandos de ciclo de vida**: Configure comandos para eventos post-create, post-start e post-attach
- **Extensões recomendadas**: Recomendações automáticas de extensões baseadas no software selecionado

### Interface moderna

- **Navegação de barra lateral**: Acesso rápido a todas as seções de configuração com uma barra lateral que pode ser recolhida
- **Layout de painel dividido**: Editor lado a lado e visualização ao vivo com painéis redimensionáveis
- **Suporte RTL**: Suporte completo da direita para esquerda para árabe, hebraico e urdu

### Funcionalidades gerais

- **Visualização ao vivo**: Veja visualizações em tempo real dos arquivos de configuração gerados no painel dividido
- **Download ZIP**: Baixe todos os arquivos como um arquivo ZIP pronto para uso
- **Geração automática de README**: Cada ZIP inclui um README.md detalhado com:
  - Visão geral dos arquivos e descrições
  - Informações da imagem base com links para Docker Hub
  - Software e pacotes instalados com links (Debian Tracker, npmjs.com)
  - Chaves de variáveis de ambiente (valores ocultos por segurança)
  - Lista de arquivos protegidos
  - Resumo das configurações de permissão
  - Guia de início rápido com comandos Docker
  - Pré-requisitos para Windows, macOS e Linux
  - Seção de solução de problemas
  - Quando o idioma da interface não é inglês, também inclui README.en.md (inglês simples)
- **Importar/Exportar configuração**: Exporte sua configuração como arquivo JSON e importe-a em outro navegador ou dispositivo
- **Histórico de configuração**: Rastreie alterações com funcionalidade de desfazer/refazer
  - Rastreamento automático de alterações com snapshots atrasados
  - Desfazer/Refazer com atalhos de teclado (`Ctrl+Z` / `Ctrl+Y`)
  - Painel de histórico com timestamps e descrições de alterações
  - Visualização diff para comparar qualquer estado
  - Restaurar para qualquer estado de configuração anterior
  - Armazenado em IndexedDB para persistência (máx. 50 entradas)
- **Salvamento automático**: As configurações são salvas automaticamente no localStorage do seu navegador (habilitado por padrão)
- **Suporte multilíngue**: Disponível em 18 idiomas:
  - 🌍 Árabe
  - 🇨🇳 Chinês
  - 🇳🇱 Holandês
  - 🇬🇧 Inglês
  - 🇫🇷 Francês
  - 🇩🇪 Alemão
  - 🇬🇷 Grego
  - 🇮🇱 Hebraico
  - 🇮🇳 Hindi
  - 🇮🇹 Italiano
  - 🇯🇵 Japonês
  - 🇰🇷 Coreano
  - 🇵🇱 Polonês
  - 🇵🇹 Português
  - 🇪🇸 Espanhol
  - 🇹🇷 Turco
  - 🇺🇦 Ucraniano
  - 🇵🇰 Urdu
- **Tema escuro/claro**: Detecção automática de tema com alternância manual
- **Suporte PWA**: Instalável como Progressive Web App
- **Totalmente acessível**: Compatível com WCAG com navegação por teclado e suporte a leitores de tela
- **Design responsivo**: Otimizado para desktop e tablet
- **Atalhos de teclado**: Navegação completa por teclado com atalhos personalizáveis (pressione `Ctrl+/` ou `⌘+/` para ver todos)

### Atalhos de teclado

Todos os atalhos usam `Ctrl` no Windows/Linux e `⌘` (Cmd) no macOS.

| Atalho | Ação |
| ------ | ---- |
| `Ctrl/⌘ + S` | Baixar ZIP |
| `Ctrl/⌘ + E` | Alternar painel de visualização |
| `Ctrl/⌘ + B` | Alternar barra lateral |
| `Ctrl/⌘ + Z` | Desfazer |
| `Ctrl/⌘ + Y` | Refazer |
| `Ctrl/⌘ + Shift + Z` | Refazer (alternativo) |
| `Ctrl/⌘ + Shift + D` | Alternar modo escuro/claro |
| `Ctrl/⌘ + Shift + X` | Restaurar padrões |
| `Ctrl/⌘ + Shift + L` | Abrir seletor de idioma |
| `Ctrl/⌘ + 1-5` | Mudar para a seção (1=Dockerfile, 2=Docker Compose, 3=CLAUDE.md, 4=settings.json, 5=DevContainer) |
| `Ctrl/⌘ + /` | Abrir ajuda de atalhos de teclado |
| `Escape` | Fechar diálogo |

Um ícone de teclado no cabeçalho também abre o diálogo de ajuda dos atalhos.

### Mecanismo de salvamento automático

A função de salvamento automático pode ser ativada/desativada usando o ícone de salvar no cabeçalho:

| Ícone           | Estado       | Comportamento                                                         |
| --------------- | ------------ | --------------------------------------------------------------------- |
| 💾 (Salvar)     | Habilitado   | Todas as alterações são salvas automaticamente no localStorage        |
| 🚫💾 (Desligado)| Desabilitado | As alterações não são salvas; os dados existentes são apagados        |

**Como funciona:**

- **Habilitar salvamento automático**: Salva imediatamente as configurações atuais no localStorage
- **Desabilitar salvamento automático**: Limpa todas as configurações salvas do localStorage
- Sua preferência de salvamento automático é lembrada entre sessões

### Importar/Exportar configuração

Você pode compartilhar ou fazer backup da sua configuração através de arquivos JSON:

- **Exportar**: Clique no ícone de upload no cabeçalho para baixar sua configuração atual como `claude-initializr-config.json`
- **Importar**: Clique no ícone de download para selecionar um arquivo JSON previamente exportado

**Como funciona:**

- **A exportação** salva todas as configurações (imagem base, seleção de software, pacotes, comandos, permissões, conteúdo do CLAUDE.md) em um único arquivo JSON
- **A importação** valida o arquivo, mostra uma prévia das diferenças e solicita confirmação antes de aplicar
- Por segurança, os **valores das variáveis de ambiente nunca são incluídos** nos arquivos exportados — apenas os nomes das variáveis são exportados
- As configurações importadas recebem novos identificadores internos para evitar conflitos
- O formato de exportação inclui um campo de versão (`"version": "1.0"`) para compatibilidade futura

### Privacidade e armazenamento de dados

Esta aplicação respeita sua privacidade:

- **Apenas armazenamento local**: Todas as configurações são armazenadas localmente no seu navegador (localStorage)
- **Sem comunicação com servidor**: Nenhum dado é enviado para nenhum servidor
- **Seguro por design**: Os **valores** das variáveis de ambiente **nunca são armazenados** - apenas os nomes das variáveis são salvos
- **Controle total**: Você pode desabilitar o salvamento automático a qualquer momento usando o interruptor no cabeçalho, que também limpa todos os dados armazenados
- **Tema baseado em sessão**: A preferência de tema é redefinida para o padrão do sistema ao recarregar a página

## Funcionalidades de segurança

A configuração Docker gerada inclui medidas de segurança abrangentes:

### Firewall de rede

O script `init-firewall.sh` implementa isolamento de rede rigoroso:

- **Firewall baseado em iptables** com política DROP para todo o tráfego de saída
- **Abordagem apenas allowlist** - apenas domínios autorizados são acessíveis:
  - `api.anthropic.com` - API Claude
  - `npm registry` - Instalação de pacotes
  - `github.com` - Operações Git
  - `sentry.io` - Relatório de erros
- **Resolução automática de IP do GitHub** para endpoints web, API e git
- **Isolamento de rede do host** - impede acesso à rede local
- **Verificação de firewall** - testes garantem que as regras são aplicadas corretamente

### Endurecimento de segurança Docker

- **Remoção de capabilities**: Todas as capabilities Linux são removidas (`cap_drop: ALL`)
- **Sem escalação de privilégios**: `no-new-privileges:true`
- **Limites de recursos**: Restrições de CPU e memória
- **Montagens somente leitura**: Arquivos protegidos são montados como somente leitura
- **Execução não-root**: Executa como usuário `node`

## Ferramentas pré-instaladas

O container gerado inclui:

| Categoria               | Ferramentas                         |
| ----------------------- | ----------------------------------- |
| **Shell**               | zsh com tema Powerline10k, bash     |
| **Editores**            | nano, vim                           |
| **Controle de versão**  | git, git-delta, GitHub CLI (gh)     |
| **Utilitários**         | fzf, jq, less, unzip, man-db        |
| **Rede**                | iptables, ipset, iproute2, dnsutils |

## Começando

### Pré-requisitos

- Node.js 20 ou superior
- npm 10 ou superior

### Instalação

```bash
# Clone o repositório
git clone https://github.com/mkloubert/claude-initializr.git
cd claude-initializr

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev

# Compile para produção
npm run build

# Visualize a compilação de produção
npm run preview
```

### Variáveis de ambiente

Personalize a aplicação usando variáveis de ambiente. Crie um arquivo `.env`:

```bash
# URL do repositório GitHub (opcional, deixe vazio para ocultar)
VITE_GITHUB_URL=https://github.com/mkloubert/claude-initializr

# URL de doação PayPal (opcional, deixe vazio para ocultar)
VITE_PAYPAL_URL=https://paypal.me/mjkloubert

# Claude Code permissions documentation URL (optional)
VITE_PERMISSIONS_DOCS_URL=https://docs.anthropic.com/en/docs/claude-code/settings#permission-settings

# Author website URL (optional)
VITE_AUTHOR_URL=https://marcel.coffee

# Author name displayed in footer (optional)
VITE_AUTHOR_NAME=Marcel Joachim Kloubert
```

## Uso

1. **Configure a imagem base**: Defina o nome e a versão da imagem Docker base (ex., `node:24` ou `node:22-slim`)

2. **Selecione o software**: Escolha qual software adicional instalar no seu container

3. **Adicione pacotes e comandos personalizados**:
   - Adicione pacotes APT personalizados (ex., `curl`, `graphviz`, `sqlite3`)
   - Adicione pacotes NPM personalizados para instalar globalmente (ex., `eslint`, `prettier`)
   - Escolha se os pacotes NPM devem ser instalados como usuário `node` (padrão) ou `root`
   - Adicione comandos RUN personalizados para executar durante a construção (ex., `pip install numpy`)
   - Escolha se os comandos RUN devem ser executados como usuário `node` (padrão) ou `root`

4. **Defina variáveis de ambiente**: Adicione quaisquer variáveis de ambiente que seu projeto precise (ex., `ANTHROPIC_API_KEY`)

5. **Proteja arquivos sensíveis**: Adicione caminhos para arquivos que devem ser protegidos (ex., `.env.local`)

6. **Edite CLAUDE.md**: Escreva instruções para o Claude no editor Markdown

7. **Configurar permissões**: Configure as regras de permissão no cartão settings.json
   - Adicione regras `Allow` para operações auto-aprovadas
   - Adicione regras `Ask` para operações que requerem confirmação
   - Adicione regras `Deny` para operações proibidas
   - Arquivos protegidos são adicionados automaticamente como regras de negação `Read()`

8. **Visualize**: Verifique os arquivos de configuração gerados nas abas de visualização

9. **Baixe**: Clique em "Baixar ZIP" para obter todos os arquivos

## Usando os arquivos gerados

1. Extraia o arquivo ZIP no diretório do seu projeto

2. Copie os arquivos do seu projeto para a pasta `workspace` (ou monte seu projeto existente)

3. Defina sua chave API no arquivo `.env`:

   ```bash
   ANTHROPIC_API_KEY=sua-chave-api-aqui
   ```

4. Compile e inicie o container:

   ```bash
   docker compose up --build
   ```

   **Opcional: Versões de software personalizadas**

   Versões de software podem ser configuradas via argumentos de build. Use `latest` para obtenção dinâmica de versões ou especifique uma versão explícita:

   ```bash
   docker compose build \
     --build-arg GO_VERSION=1.22.0 \
     --build-arg FLUTTER_VERSION=3.24.0 \
     --build-arg PYTHON_VERSION=3.12 \
     --build-arg TYPESCRIPT_VERSION=5.6.0
   ```

   | Argumento de build | Padrão | Descrição |
   |--------------------|--------|-----------|
   | `CLAUDE_CODE_VERSION` | `stable` | Versão do Claude Code (`latest` ou específica como `1.0.58`) |
   | `FLUTTER_VERSION` | `latest` | Versão do Flutter (`latest` ou específica como `3.24.0`) |
   | `GIT_DELTA_VERSION` | `0.18.2` | Versão do Git delta para destaque de diff |
   | `GO_VERSION` | `latest` | Versão do Go (`latest` ou específica como `1.22.0`) |
   | `PYTHON_VERSION` | `3` | Versão do Python (ex. `3`, `3.12`) |
   | `TYPESCRIPT_VERSION` | `latest` | Versão do TypeScript (`latest` ou específica como `5.6.0`) |
   | `ZSH_IN_DOCKER_VERSION` | `1.2.0` | Versão do zsh-in-docker para configuração do shell |

   **Opcional: URLs de download personalizadas**

   Se você precisar usar um mirror ou proxy para downloads de pacotes, pode sobrescrever as URLs padrão durante a compilação. Todas as URLs suportam parâmetros de consulta:

   ```bash
   docker compose build \
     --build-arg GO_JSON_URL=https://meu-mirror.example.com/golang/?mode=json \
     --build-arg GO_DOWNLOAD_URL=https://meu-mirror.example.com/golang \
     --build-arg RUSTUP_INSTALL_URL=https://meu-mirror.example.com/rustup/rustup-init.sh \
     --build-arg FLUTTER_JSON_URL=https://meu-mirror.example.com/flutter/releases_linux.json \
     --build-arg FLUTTER_BASE_URL=https://meu-mirror.example.com/flutter/releases \
     --build-arg UV_INSTALL_SCRIPT_URL=https://meu-mirror.example.com/uv/install.sh
   ```

   | Argumento de build | Padrão | Descrição |
   |--------------------|--------|-----------|
   | `GO_JSON_URL` | `https://go.dev/dl/?mode=json` | URL da API JSON de versões do Go (apenas para "latest") |
   | `GO_DOWNLOAD_URL` | `https://go.dev/dl` | URL base para downloads de arquivos Go |
   | `RUSTUP_INSTALL_URL` | `https://sh.rustup.rs` | URL do script de instalacao do rustup |
   | `FLUTTER_JSON_URL` | `https://storage.googleapis.com/flutter_infra_release/releases/releases_linux.json` | URL da API JSON de versões do Flutter (apenas para "latest") |
   | `FLUTTER_BASE_URL` | `https://storage.googleapis.com/flutter_infra_release/releases` | URL base para downloads de arquivos Flutter |
   | `UV_INSTALL_SCRIPT_URL` | `https://astral.sh/uv/install.sh` | URL do script de instalação do uv |

5. Conecte-se ao container:

   ```bash
   docker compose exec claude zsh
   ```

6. Inicialize o firewall (requer senha sudo):

   ```bash
   sudo /usr/local/bin/init-firewall.sh
   ```

7. Inicie o Claude Code:
   ```bash
   claude
   ```

## Estrutura de arquivos gerados

```
├── .devcontainer/           # VS Code Dev Container (optional)
│   ├── devcontainer.json    # Dev Container configuration
│   └── post-create.sh       # Post-create script (if complex commands)
├── workspace/
│   ├── .claude/
│   │   └── settings.json    # Configurações do Claude
│   ├── .empty               # Arquivo vazio para montagens protegidas
│   └── CLAUDE.md            # Suas instruções para o Claude
├── .env                     # Variáveis de ambiente
├── Dockerfile               # Definição do container
├── docker-compose.yaml      # Configuração Docker Compose
└── init-firewall.sh         # Script de firewall de rede
```

## Solução de problemas

### Problemas de firewall

Se você encontrar problemas de rede após habilitar o firewall:

```bash
# Verifique o status do firewall
sudo iptables -L -n

# Veja conexões bloqueadas
sudo iptables -L -n -v | grep DROP

# Redefina o firewall (permite todo o tráfego)
sudo iptables -F
```

### Container não inicia

```bash
# Verifique os logs
docker compose logs

# Reconstrua sem cache
docker compose build --no-cache
```

### Permissão negada

Certifique-se de que o diretório workspace tenha as permissões corretas:

```bash
chmod -R 755 workspace
```

### Redefinir configurações da aplicação

Para limpar todas as configurações salvas e começar do zero, abra o console de desenvolvedor do seu navegador e execute:

```javascript
localStorage.removeItem("claude-initializr-config");
localStorage.removeItem("claude-initializr-welcome-dismissed");
localStorage.removeItem("claude-initializr-autosave");
```

Em seguida, recarregue a página.

Alternativamente, você pode desabilitar o salvamento automático usando o interruptor no cabeçalho para impedir que as configurações sejam salvas.

## Stack tecnológico

- [React 19](https://react.dev/) com TypeScript e React Compiler
- [Vite](https://vite.dev/) como bundler
- [Tailwind CSS v4](https://tailwindcss.com/) com espaço de cores OKLCH
- [shadcn/ui](https://ui.shadcn.com/) componentes (40+ componentes)
- [react-router](https://reactrouter.com/) para roteamento
- [i18next](https://www.i18next.com/) para internacionalização
- [JSZip](https://stuk.github.io/jszip/) para geração de ZIP
- [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) para visualizações de código

## Contribuir

Contribuições são bem-vindas! Sinta-se à vontade para enviar um Pull Request.

1. Faça fork do repositório
2. Crie seu branch de feature (`git checkout -b feature/feature-incrivel`)
3. Faça commit das suas alterações (`git commit -m 'Adicionar feature incrível'`)
4. Faça push para o branch (`git push origin feature/feature-incrivel`)
5. Abra um Pull Request

### Adicionar um novo idioma

1. Crie um novo arquivo de locale em `src/i18n/locales/` (ex., `fr.ts`)
2. Importe e implemente a interface `Translations` de `types.ts`
3. Copie a estrutura de `en.ts` e traduza todas as strings
4. Adicione a importação do idioma em `src/i18n/index.ts`
5. Adicione a opção de idioma em `LanguageSwitcher.tsx`

## Acessibilidade

Esta aplicação é projetada para ser totalmente acessível:

- Estrutura HTML semântica (`<header>`, `<main>`, `<footer>`)
- Labels ARIA em todos os elementos interativos
- Suporte a navegação por teclado
- Compatível com leitores de tela
- Esquemas de cores de alto contraste
- Indicadores de foco em elementos interativos

## Lançamentos

Os lançamentos são automatizados via GitHub Actions. Para criar um novo lançamento:

1. Crie e envie uma tag de versão:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. O workflow automaticamente:
   - Compila o projeto
   - Cria um arquivo ZIP da pasta `dist/`
   - Publica um Release no GitHub com notas de lançamento auto-geradas

Tags contendo `-` (ex. `v1.0.0-beta`) são marcadas como pré-lançamentos.

## Registro de alterações

### v4.1.2

- Adicionado suporte ao Ollama como pacote de software
  - Configura variáveis de ambiente para conectar o Claude Code a instâncias Ollama locais
  - Define automaticamente `ANTHROPIC_BASE_URL` e `ANTHROPIC_AUTH_TOKEN` quando habilitado
  - Variáveis de ambiente são removidas quando o Ollama é desabilitado
- Adicionada configuração `extra_hosts` ao docker-compose.yaml para acesso à rede do host

### v4.0.2

- **Redesign principal da interface**: Revisão completa da interface para melhor usabilidade
  - Substituição do layout vertical baseado em cartões pelo layout Sidebar + Split Pane
  - Navegação na barra lateral para alternância rápida de seções com atalhos de teclado (`Ctrl/⌘ + 1-5`)
  - Painel dividido redimensionável com editor e visualização ao vivo lado a lado
  - Barra lateral que pode ser recolhida com modo apenas ícone (`Ctrl/⌘ + B` para alternar)
  - Divulgação progressiva com seções com acordeão para reduzir carga cognitiva
- **Suporte de idiomas RTL**: Suporte completo da direita para esquerda para árabe, hebraico e urdu
  - Barra lateral posiciona-se automaticamente à direita para idiomas RTL
  - Todos os elementos da interface estão devidamente espelhados
- **Melhorias de responsividade**:
  - Barra lateral começa recolhida em telas de tablet (768–1023px)
  - Layout otimizado para dispositivos móveis com pré-visualização em bottom sheet
  - Gatilhos de acordeão amigáveis ao toque (altura mínima de 44px)
- **Diálogo de boas-vindas**: Visitantes pela primeira vez veem um diálogo de boas-vindas em vez de um cartão estático
  - Pode ser reaberto via "Sobre" na barra lateral
- **Componentes herdados removidos**: Limpeza de componentes baseados em cartões antigos
- Atalhos de teclado atualizados para funcionar com o novo layout

### v3.2.1

- Adicionado histórico de configuração com funcionalidade de desfazer/refazer
  - Rastreamento automático de alterações com snapshots atrasados (500ms)
  - Desfazer/Refazer com atalhos de teclado (`Ctrl/⌘ + Z` / `Ctrl/⌘ + Y`)
  - Painel de histórico com timestamps e descrições de alterações
  - Visualização diff para comparar configurações
  - Restaurar para qualquer estado anterior
  - Armazenamento IndexedDB para persistência (máx. 50 entradas)
- Adicionado suporte DevContainer para VS Code e GitHub Codespaces
  - Geração de configuração `devcontainer.json`
  - Configuração de extensões e configurações do VS Code
  - Adicionar recursos de Dev Container
  - Configuração de encaminhamento de portas
  - Configuração de comandos de ciclo de vida (post-create, post-start, post-attach)
  - Recomendações automáticas de extensões baseadas no software selecionado
- Adicionado atalho de teclado `Ctrl/⌘ + 5` para rolar até o cartão DevContainer
- Seção de boas-vindas atualizada com a funcionalidade DevContainer

### v3.1.2

- Adicionados atalhos de teclado para ações comuns (download, alternância de visualização, troca de tema, navegação de cartões, seletor de idioma, redefinição)
- Adicionado diálogo de ajuda de atalhos de teclado com exibição agrupada
- Adicionadas dicas de atalhos nos tooltips dos botões com teclas modificadoras adaptadas ao SO
- Adicionada região ARIA live para anúncios de leitor de tela em ações de atalhos
- Adicionada importação/exportação de configuração via arquivos JSON com pré-visualização de diferenças e validação

### v3.0.0

- Removida a funcionalidade de plugins da interface do usuário

### v2.0.2

- Alterado para o instalador nativo do Claude Code em vez do npm
- Corrigida a instalação de plugins oficiais no Dockerfile

### v1.3.0

- Adicionada documentação de autenticação

### v1.2.0

- Adicionada documentação de argumentos de build Docker a todos os READMEs
- Adicionada documentação de URLs de download personalizadas para mirrors e proxies

### v1.1.1

- Adicionada exibição de versão no cabeçalho
- Convertido o sistema i18n de JSON para TypeScript com interface tipada
- Corrigida a troca de idioma entre arquivos README nos downloads ZIP

### v1.0.0

- Lançamento inicial
- Gerador de configuração Docker com Dockerfile e docker-compose.yaml
- Seleção de software (Go, Python, Rust, Flutter, TypeScript, ffmpeg, ImageMagick, uv)
- Pacotes APT personalizados, pacotes NPM e comandos RUN
- Editor Markdown CLAUDE.md com visualização
- Editor de permissões settings.json (regras Allow, Ask, Deny)
- Configuração de variáveis de ambiente e arquivos protegidos
- Geração de script de firewall de rede
- Download ZIP com README gerado automaticamente
- Suporte multilíngue (18 idiomas)
- Tema escuro/claro com detecção automática
- Salvamento automático no localStorage
- Suporte PWA
- Fluxo de trabalho de lançamento GitHub Actions

## Apoio

Se você achar este projeto útil, considere apoiá-lo:

- ⭐ Dê uma estrela no repositório no [GitHub](https://github.com/mkloubert/claude-initializr)
- 💝 [Doar via PayPal](https://paypal.me/mjkloubert)

## Licença

Licença MIT - veja [LICENSE](./LICENSE) para detalhes.

Copyright © 2026 Marcel Joachim Kloubert
