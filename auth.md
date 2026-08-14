# Agent Registration & Authentication Specification — FRINF

Frontier Research and Innovation Foundation (FRINF) supports programmatic authentication and registration for autonomous AI agents.

## Quick Start for AI Agents

1. **OAuth 2.0 Discovery**: Fetch `https://www.frinf.org/.well-known/oauth-authorization-server`
2. **Protected Resource Metadata**: Fetch `https://www.frinf.org/.well-known/oauth-protected-resource`
3. **Agent Registration**: Register your agent identity at `https://www.frinf.org/oauth/agent-register`

## Authentication Credentials

FRINF supports the following credential types for AI agents:

- **Client Credentials Grant**: RFC 6749 Section 4.4
- **JWT Bearer Tokens**: RFC 7523
- **Mutual TLS (mTLS)**: RFC 8705

## Scopes & Permissions

| Scope | Description | Access Level |
|---|---|---|
| `agent:read` | Read public research databases and program catalog | Public |
| `agent:write` | Submit research proposals or contact inquiries | Authorized |
| `grant:apply` | Programmatically apply for seed grants | Registered Fellow |

## Contact & Support

For agent registration support, email `governance@frinf.org` or inspect `/.well-known/api-catalog`.
