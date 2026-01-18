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
 * docker-compose.yaml template content.
 *
 * Placeholders:
 * - PLATFORM: Optional platform specification (e.g., linux/amd64)
 * - EMPTY_FILE_LINKS: Volume mounts for protected files
 */
export const DOCKER_COMPOSE_TEMPLATE = `services:
  dev:
    ### {{TEMPLATE: PLATFORM}} ###
    build:
      context: .
      dockerfile: ./Dockerfile
      #args:
      #  UID: \${UID-1000}
      #  GID: \${GID-1000}

    # Only your project folder is visible
    volumes:
      - ./workspace:/workspace
      - ./workspace/CLAUDE.md:/workspace/CLAUDE.md:ro
      - ./workspace/.empty:/workspace/.empty:ro
      ### {{TEMPLATE: EMPTY_FILE_LINKS}} ###

    working_dir: /workspace

    env_file:
      - ./.env

    # user: "\${UID-1000}:\${GID-1000}"   # matches host permissions

    cap_drop:
      - ALL                        # drop all kernel capabilities
    security_opt:
      - no-new-privileges:true     # no privilege escalation
      # seccomp: Docker's default profile remains active (recommended)
      # AppArmor/SELinux also apply if active on the host

    # Resource limits (optional but recommended)
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 4g
        reservations:
          cpus: '0.5'
          memory: 512m

    # Network stays on (Claude needs internet for Auth/API)
    # If you want to build completely offline, you can set "network_mode: none" here,
    # but then the CLI won't work.
    # network_mode: none

    tty: true
`;
