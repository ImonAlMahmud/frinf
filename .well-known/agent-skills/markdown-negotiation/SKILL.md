# Implement Markdown Content Negotiation

Support `Accept: text/markdown` content negotiation so agents can request markdown versions of pages on Frontier Research and Innovation Foundation (https://www.frinf.org).

## Requirements

- When a request includes `Accept: text/markdown`, return a markdown representation of the page.
- Set `Content-Type: text/markdown; charset=utf-8` on the response.
- HTML remains the default for requests without the markdown accept header.
- Include an `x-markdown-tokens` header with the token count of the markdown content.
- Include `Vary: Accept` header for caching efficiency.
