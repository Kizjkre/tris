import { execSync } from 'node:child_process';

// REF: https://apple.stackexchange.com/a/20553x
const ip = execSync('ipconfig getifaddr en0').toString().trim();
const sources = {};

Bun.serve({
  fetch(req, server) {
    const url = new URL(req.url);
    if (url.pathname === '/data') {
      const success = server.upgrade(req);
      return success
        ? undefined
        : new Response('WebSocket upgrade error', { status: 400 });
    }

    const pathname = url.pathname === '/' ? '/client.html' : url.pathname;
    return new Response(Bun.file(import.meta.dir + '/src' + pathname));
  },
  websocket: {
    message(ws, message) {
      if (!(ws.remoteAddress in sources)) sources[ws.remoteAddress] = {};
      sources[ws.remoteAddress];
    },
    open(ws) {
    },
    close(ws, code, message) {
    },
    drain(ws) {
    }
  },
  certFile: 'certs/localhost.crt',
  keyFile: 'certs/localhost.key'
});
