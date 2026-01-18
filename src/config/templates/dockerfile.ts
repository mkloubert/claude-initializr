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

/**
 * Dockerfile template content.
 *
 * Placeholders:
 * - BASE_IMAGE: Docker base image name
 * - NODE_VERSION: Node.js version tag
 * - DOCKER_ARGS: Additional ARG declarations
 * - MORE_APT_PACKAGES: Additional APT packages to install
 * - RUN_AS_ROOT_USER_EXTENSIONS: Commands to run as root
 * - RUN_AS_NODE_USER_EXTENSIONS: Commands to run as node user
 */
export const DOCKERFILE_TEMPLATE = `FROM ### {{TEMPLATE: BASE_IMAGE}} ###:### {{TEMPLATE: NODE_VERSION}} ###

ARG TZ
ENV TZ="$TZ"

ARG CLAUDE_CODE_VERSION=latest

### {{TEMPLATE: DOCKER_ARGS}} ###

# Install basic development tools and iptables/ipset
RUN apt-get update && apt-get install -y --no-install-recommends \\
  less \\
  git \\
  procps \\
  sudo \\
  fzf \\
  zsh \\
  man-db \\
  unzip \\
  gnupg2 \\
  gh \\
  iptables \\
  ipset \\
  iproute2 \\
  dnsutils \\
  aggregate \\
  jq \\
  nano \\
  vim \\
### {{TEMPLATE: MORE_APT_PACKAGES}} ###
  && apt-get clean && rm -rf /var/lib/apt/lists/*

# Ensure default node user has access to /usr/local/share
RUN mkdir -p /usr/local/share/npm-global && \\
  chown -R node:node /usr/local/share

ARG USERNAME=node

# Persist bash history.
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \\
  && mkdir /commandhistory \\
  && touch /commandhistory/.bash_history \\
  && chown -R $USERNAME /commandhistory

# Set \`DEVCONTAINER\` environment variable to help with orientation
ENV DEVCONTAINER=true

# Create workspace and config directories and set permissions
RUN mkdir -p /workspace /home/node/.claude && \\
  chown -R node:node /workspace /home/node/.claude

WORKDIR /workspace

ARG GIT_DELTA_VERSION=0.18.2
RUN ARCH=$(dpkg --print-architecture) && \\
  wget "https://github.com/dandavison/delta/releases/download/\${GIT_DELTA_VERSION}/git-delta_\${GIT_DELTA_VERSION}_\${ARCH}.deb" && \\
  sudo dpkg -i "git-delta_\${GIT_DELTA_VERSION}_\${ARCH}.deb" && \\
  rm "git-delta_\${GIT_DELTA_VERSION}_\${ARCH}.deb"

USER root

### {{TEMPLATE: RUN_AS_ROOT_USER_EXTENSIONS}} ###

# Set up non-root user
USER node

# Install global packages
ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=$PATH:/usr/local/share/npm-global/bin

# Set the default shell to zsh rather than sh
ENV SHELL=/bin/zsh

# Set the default editor and visual
ENV EDITOR=nano
ENV VISUAL=nano

# Default powerline10k theme
ARG ZSH_IN_DOCKER_VERSION=1.2.0
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v\${ZSH_IN_DOCKER_VERSION}/zsh-in-docker.sh)" -- \\
  -p git \\
  -p fzf \\
  -a "source /usr/share/doc/fzf/examples/key-bindings.zsh" \\
  -a "source /usr/share/doc/fzf/examples/completion.zsh" \\
  -a "export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \\
  -x

# Install Claude
RUN npm install -g @anthropic-ai/claude-code@\${CLAUDE_CODE_VERSION}

### {{TEMPLATE: RUN_AS_NODE_USER_EXTENSIONS}} ###

# Copy and set up firewall script
COPY init-firewall.sh /usr/local/bin/
USER root
RUN chmod +x /usr/local/bin/init-firewall.sh && \\
  echo "node ALL=(root) NOPASSWD: /usr/local/bin/init-firewall.sh" > /etc/sudoers.d/node-firewall && \\
  chmod 0440 /etc/sudoers.d/node-firewall
USER node
`;
