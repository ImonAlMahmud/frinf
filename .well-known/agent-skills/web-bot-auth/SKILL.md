# Implement Web Bot Auth

Use Web Bot Auth so your site can identify itself when it sends bot or agent requests, per the IETF WebBotAuth WG.

## Requirements
- Publish a JWKS at `/.well-known/http-message-signatures-directory`.
- The JWKS must contain public keys for HTTP message signature verification.
