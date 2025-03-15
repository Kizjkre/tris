import { execSync } from 'node:child_process';
import osc from 'osc';

// REF: https://apple.stackexchange.com/a/20553x
const ip = execSync('ipconfig getifaddr en0').toString().trim();
const sources = {};
let host = null;

const port = new osc.UDPPort({
  localAddress: '0.0.0.0',
  localPort: 3002,
  metadata: true
});

port.open();

Bun.serve({
  fetch(req, server) {
    const url = new URL(req.url);
    if (url.pathname === '/data') {
      const success = server.upgrade(req);
      return success
        ? undefined
        : new Response('WebSocket upgrade error', { status: 400 });
    } else if (url.pathname === '/ip') {
      return new Response(ip);
    }

    const pathname = url.pathname === '/' ? '/client.html' : url.pathname;
    return new Response(Bun.file(import.meta.dir + '/src' + pathname));
  },
  websocket: {
    message(ws, message) {
      sources[ws.remoteAddress] ??= {};

      const { x, y, z } = JSON.parse(message);
      sources[ws.remoteAddress].x = x;
      sources[ws.remoteAddress].y = y;
      sources[ws.remoteAddress].z = z;

      host?.send(JSON.stringify(sources));

      port.send({
        address: '/x',
        args: [{
          type: 'f',
          value: x
        }]
      }, 'localhost', 3001);
    },
    open(ws) {
      if (ws.remoteAddress === '::ffff:127.0.0.1') {
        host = ws;
        port?.open();
      }
    },
    close(ws, code, message) {
      if (ws.remoteAddress === '::ffff:127.0.0.1') port?.close();
    },
    drain(ws) {
    }
  },
  certFile: 'certs/localhost.crt',
  keyFile: 'certs/localhost.key'
});

console.log('https://' + ip + ':3000');
