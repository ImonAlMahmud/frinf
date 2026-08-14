# Auth.md - Agent Authentication & Authorization Specification

Frontier Research and Innovation Foundation (FRINF) supports programmatic authentication and registration for autonomous AI agents and bots.

## Quick Start for AI Agents

1. **OAuth Protected Resource Metadata**: Fetch `https://www.frinf.org/.well-known/oauth-protected-resource`
2. **OAuth Authorization Server Metadata**: Fetch `https://www.frinf.org/.well-known/oauth-authorization-server`
3. **Agent Registration**: Register your agent identity at `https://www.frinf.org/oauth/agent-register`

## Agent Registration Protocol

AI Agents can auto-register by providing an identity assertion or credential payload:

```http
POST /oauth/agent-register HTTP/1.1
Host: www.frinf.org
Content-Type: application/json

{
  "agent_id": "urn:agent:research-assistant",
  "client_name": "Autonomous Research Agent",
  "identity_type": "identity_assertion",
  "assertion_type": "urn:ietf:params:oauth:token-type:id-jag",
  "scopes": ["agent:read", "research:access"]
}
```

## Authentication Credentials

FRINF supports the following credential types for AI agents:
- **Client Credentials Grant**: RFC 6749 Section 4.4
- **JWT Bearer Tokens**: RFC 7523 / ID-JAG
- **Mutual TLS (mTLS)**: RFC 8705
- **Anonymous Token Exchange**: RFC 8693

## Scopes & Permissions

| Scope | Description | Access Level |
|---|---|---|
| `agent:read` | Read public research databases and program catalog | Public |
| `agent:write` | Submit research proposals or contact inquiries | Authorized |
| `grant:apply` | Programmatically apply for seed grants | Registered Fellow |

## Contact & Support

For agent registration support, email `governance@frinf.org` or inspect `/.well-known/api-catalog`.
