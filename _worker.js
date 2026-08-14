export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const accept = request.headers.get('accept') || '';

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
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
