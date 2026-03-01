# Ollama Integration Design

## Summary

Add Ollama as a software package option in Claude Initializr. Ollama runs on the host system, not inside the Docker container. The app configures the container environment so Claude Code can connect to the host-based Ollama instance.

## Requirements (from MILESTONE.md)

When Ollama is selected:

- Set `ANTHROPIC_API_KEY` = `` (empty) if not already present
- Set `ANTHROPIC_BASE_URL` = `http://host.docker.internal:11434` if not already present
- Set `ANTHROPIC_AUTH_TOKEN` = `ollama` if not already present
- When Ollama is deactivated, remove all three variables regardless of current values

Additionally, `extra_hosts: ["host.docker.internal:host-gateway"]` is always set in docker-compose.yaml (independent of Ollama).

## Design Decisions

### Ollama as SoftwarePackage

Ollama follows the existing software package pattern (checkbox in the Dockerfile editor's software section). Unlike other packages, it does not install anything in the Dockerfile. Its effect is limited to:

1. Environment variables (added/removed on toggle)
2. `extra_hosts` in docker-compose.yaml (always present, not Ollama-specific)

### Environment Variable Behavior

- **On enable**: Add 3 env vars only if the key does not already exist in the list
- **On disable**: Remove all 3 env vars regardless of their current values
- This is handled in the `toggleSoftware` callback in ConfigContext

### docker-compose.yaml Changes

The `extra_hosts` block is always present in the template (not conditional on Ollama). This is useful for any use case that needs host access.

## Files to Modify

### Types

- `src/types/config.ts`: Add `ollama` to `SoftwareConfig`

### Configuration

- `src/config/containerPackages.ts`: Add `ollama` to `softwareInstallOrder`
- `src/config/templates/dockerCompose.ts`: Add `extra_hosts` block

### Context

- `src/contexts/ConfigContext.tsx`: Handle Ollama env vars in `toggleSoftware`

### Components

- `src/components/config/DockerfileEditor.tsx`: Add Ollama to `softwareMetadata`

### I18n (all 18 locales)

- Add `software.ollama` and `software.ollamaDesc` translation keys

### Documentation

- `README.md` and all translated README files
- `TASKS.md` with the milestone checklist
