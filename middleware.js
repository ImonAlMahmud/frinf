export default async function middleware(request) {
  const url = new URL(request.url);
  const accept = (request.headers.get('accept') || request.headers.get('Accept') || '').toLowerCase();
  const origin = `${url.protocol}//${url.host}`;

  // RFC 9728 OAuth Protected Resource Metadata
  if (url.pathname === '/.well-known/oauth-protected-resource') {
    const data = {
      resource: origin,
      authorization_servers: [
        origin,
        "https://www.frinf.org",
        "https://frinf.org"
      ],
      scopes_supported: [
        "openid",
        "profile",
        "email",
        "agent:read",
        "agent:write",
        "research:access",
        "grant:apply"
      ],
      bearer_methods_supported": [
        "header"
      ],
      resource_documentation: `${origin}/auth.md`
    };
    return new Response(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }

  // RFC 8414 / RFC 9728 OAuth Authorization Server Metadata
  if (url.pathname === '/.well-known/oauth-authorization-server') {
    const data = {
      issuer: origin,
      authorization_endpoint: `${origin}/oauth/authorize`,
      token_endpoint: `${origin}/oauth/token`,
      revocation_endpoint: `${origin}/oauth/revoke`,
      introspection_endpoint: `${origin}/oauth/introspect`,
      registration_endpoint: `${origin}/oauth/agent-register`,
      jwks_uri: `${origin}/.well-known/http-message-signatures-directory`,
      scopes_supported: [
        "openid",
        "profile",
        "email",
        "agent:read",
        "agent:write",
        "research:access",
        "grant:apply"
      ],
      response_types_supported: ["code", "token"],
      grant_types_supported: [
        "authorization_code",
        "client_credentials",
        "refresh_token",
        "urn:ietf:params:oauth:grant-type:token-exchange"
      ],
      token_endpoint_auth_methods_supported: [
        "client_secret_basic",
        "client_secret_post",
        "private_key_jwt"
      ],
      agent_auth: {
        skill: `${origin}/.well-known/agent-skills/auth-md/SKILL.md`,
        register_uri: `${origin}/oauth/agent-register`,
        identity_types_supported: ["identity_assertion", "verified_email", "anonymous"],
        identity_assertion: {
          assertion_types_supported: ["urn:ietf:params:oauth:token-type:id-jag", "verified_email"],
          credential_types_supported: ["bearer_token", "json_web_token"]
        },
        anonymous: {
          credential_types_supported: ["bearer_token"]
        },
        claim_uri: `${origin}/auth.md`,
        revocation_uri: `${origin}/oauth/revoke`,
        events_supported: ["revocation", "expiry"]
      }
    };
    return new Response(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }

  // Markdown Content Negotiation
  if (accept.includes('text/markdown')) {
    let pathname = url.pathname;

    if (pathname === '/' || pathname === '' || pathname === '/index.html') {
      pathname = '/index.md';
    } else if (pathname.endsWith('.html')) {
      pathname = pathname.replace(/\.html$/, '.md');
    } else if (!pathname.endsWith('.md') && !pathname.includes('.')) {
      pathname = `${pathname}.md`;
    }

    if (pathname.endsWith('.md')) {
      const mdUrl = new URL(pathname, request.url);
      const res = await fetch(mdUrl);
      if (res.ok) {
        const text = await res.text();
        const tokens = Math.ceil(text.length / 4);
        return new Response(text, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown; charset=utf-8',
            'Vary': 'Accept',
            'x-markdown-tokens': String(tokens),
            'Access-Control-Allow-Origin': '*'
          }
        });
      }
    }
  }
}

export const config = {
  matcher: '/:path*',
};
