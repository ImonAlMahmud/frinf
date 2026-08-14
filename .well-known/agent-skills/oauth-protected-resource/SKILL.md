# Implement OAuth Protected Resource Metadata

Publish OAuth Protected Resource Metadata so agents can discover how to authenticate per RFC 9728.

## Requirements
- Serve JSON at `/.well-known/oauth-protected-resource` with HTTP 200.
- Include `resource` (your resource identifier URL).
- Include `authorization_servers` (array of OAuth/OIDC issuer URLs).
- Include `scopes_supported` and `bearer_methods_supported`.
