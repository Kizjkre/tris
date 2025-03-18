import { execSync } from 'node:child_process';
import osc from 'osc';

// REF: https://apple.stackexchange.com/a/20553x
const ip = execSync('ipconfig getifaddr en0').toString().trim();
const sources = {};
const addresses = {};
let i = 0;
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

      message = JSON.parse(message);
      switch (message.t) {
        case 'c':
          const { h, s, l } = message;
          sources[ws.remoteAddress].h = h;
          sources[ws.remoteAddress].s = s;
          sources[ws.remoteAddress].l = l;
          break;
        case 'd':
          const { x, y, z, a, e, v } = message;
          sources[ws.remoteAddress].x = x;
          sources[ws.remoteAddress].y = y;
          sources[ws.remoteAddress].z = z;
          sources[ws.remoteAddress].v = v;

          host?.send(JSON.stringify(sources));

          port.send({
            address: '/' + addresses[ws.remoteAddress],
            args: [
              {
                type: 'f',
                value: a
              },
              {
                type: 'f',
                value: e
              },
              {
                type: 'f',
                value: v
              }
            ]
          }, 'localhost', 3001);
          break;
      }
    },
    open(ws) {
      if (ws.remoteAddress === '::ffff:127.0.0.1') {
        host = ws;
        port?.open();
      } else {
        addresses[ws.remoteAddress] = i++;
        port.send({
          address: '/new',
          args: [{
            type: 'i',
            value: addresses[ws.remoteAddress]
          }]
        }, 'localhost', 3001);
      }
    },
    close(ws, code, message) {
      // if (ws.remoteAddress === '::ffff:127.0.0.1') port?.close();
      delete sources[ws.remoteAddress];
      host?.send(JSON.stringify(sources));
      port.send({
        address: '/delete',
        args: [{
          type: 'i',
          value: addresses[ws.remoteAddress]
        }]
      }, 'localhost', 3001);
    },
    drain(ws) {
    }
  },
  certFile: 'certs/localhost.crt',
  keyFile: 'certs/localhost.key'
});

console.log('https://' + ip + ':3000');
