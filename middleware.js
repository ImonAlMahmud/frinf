export default async function middleware(request) {
  const accept = (request.headers.get('accept') || request.headers.get('Accept') || '').toLowerCase();

  if (accept.includes('text/markdown')) {
    const url = new URL(request.url);
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
