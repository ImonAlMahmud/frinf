export default {
  async fetch(request, env, ctx) {
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
        bearer_methods_supported: [
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

    // Check if agent requests markdown content negotiation
    if (accept.includes('text/markdown')) {
      let path = url.pathname;
      if (path === '/' || path === '' || path === '/index.html') {
        path = '/index.md';
      } else if (path.endsWith('.html')) {
        path = path.replace(/\.html$/, '.md');
      } else if (!path.endsWith('.md') && !path.includes('.')) {
        path = `${path}.md`;
      }

      if (path.endsWith('.md')) {
        const assetUrl = new URL(path, request.url);
        const mdRes = await env.ASSETS.fetch(assetUrl);
        if (mdRes.ok) {
          const text = await mdRes.text();
          const tokens = Math.ceil(text.length / 4);
          const headers = new Headers(mdRes.headers);
          headers.set('Content-Type', 'text/markdown; charset=utf-8');
          headers.set('Vary', 'Accept');
          headers.set('x-markdown-tokens', String(tokens));
          headers.set('Access-Control-Allow-Origin', '*');
          return new Response(text, {
            status: 200,
            headers
          });
        }
      }
    }

    // Default HTML / static response for browsers
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    headers.set('Vary', 'Accept');

    let mdPath = url.pathname;
    if (mdPath === '/' || mdPath === '' || mdPath === '/index.html') mdPath = '/index.md';
    else if (mdPath.endsWith('.html')) mdPath = mdPath.replace(/\.html$/, '.md');
    else if (!mdPath.endsWith('.md') && !mdPath.includes('.')) mdPath = `${mdPath}.md`;

    if (mdPath.endsWith('.md')) {
      const currentLink = headers.get('Link') || '';
      const markdownLink = `<${mdPath}>; rel="alternate"; type="text/markdown"`;
      headers.set('Link', currentLink ? `${currentLink}, ${markdownLink}` : markdownLink);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
