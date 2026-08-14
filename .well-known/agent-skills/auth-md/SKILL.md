# Skill: Implement Auth.md Agent Registration Discovery

Helps a service publish Auth.md support for agent registration.

## Requirements
- Serve `/auth.md` from the service root as Markdown with an H1 heading that contains `Auth.md`.
- Publish OAuth Protected Resource Metadata at `/.well-known/oauth-protected-resource`.
- Publish OAuth Authorization Server metadata at `/.well-known/oauth-authorization-server` with an `agent_auth` block.
