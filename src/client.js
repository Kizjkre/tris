import * as THREE from 'three';

const [h, s, l] = [Math.random(), Math.random() * 0.4 + 0.5, Math.random() * 0.2 + 0.05];
document.querySelector('button').style.backgroundColor = `hsl(${ h * 360 }, ${ (0.1 + s) * 100 }%, ${ (0.75 + l) * 100 }%)`;

let socket;
let value;
const running = Array(100).fill(0);
let t1 = performance.now();

const start = async () => {
  await DeviceOrientationEvent.requestPermission?.();

  const d = { x: 0, y: 0, z: 0 };

  const factor = 5e-3;

  socket = new WebSocket('wss://' + await (await fetch('/ip')).text() + ':3000/data');

  socket.addEventListener('open', async () => {
    socket.send(JSON.stringify({
      t: 'c', // NOTE: type: 'color'
      h: h.toFixed(2), // NOTE: hue
      s: s.toFixed(2), // NOTE: saturation
      l: l.toFixed(2) // NOTE: luminance
    }));

    let prev = performance.now();
    window.addEventListener('deviceorientation', event => {
      const vx = Math.sin(event.alpha * Math.PI / 180) * Math.cos(event.beta * Math.PI / 180);
      const vy = Math.sin(event.beta * Math.PI / 180);

      const now = performance.now();
      const dt = (now - prev) * factor;
      d.x += vx * dt;
      d.y += vy * dt;

      d.x = THREE.MathUtils.clamp(d.x, -11, 11);
      d.y = THREE.MathUtils.clamp(d.y, -5, 5);

      const azimuth = event.alpha < 180 ? event.alpha + 180 : event.alpha - 180;

      socket.send(JSON.stringify({
        t: 'd', // NOTE: type: 'data'
        x: -d.x.toFixed(2),
        y: d.y.toFixed(2),
        z: d.z.toFixed(2),
        a: azimuth.toFixed(2), // NOTE: Azimuth
        e: event.beta.toFixed(2), // NOTE: Elevation
        v: value.toFixed(2) // NOTE: Value
      }));

      prev = now;
    });
  });

  document.querySelector('button').removeEventListener('click', start);
  document.querySelector('button').addEventListener('click', control);

  document.querySelector('button').innerText = 'tap';
};

const control = () => {
  const t2 = performance.now();
  const d = 3e3 / (t2 - t1);

  running.push(d);
  running.shift();

  t1 = t2;
};

document.querySelector('button').addEventListener('click', start);

const animate = () => {
  const sum = running.reduce((a, b, i) => (0.9 + 0.1 * Math.sin(Math.PI / (2 * running.length) * i + Math.sin(Math.PI / (2 * running.length) * i) / 2)) * (a + b), 0);
  value = Math.min(1, sum / running.length);

  document.querySelector('#value').style.height = value * 1e2 + 'vh';

  running.push(0);
  running.shift();

  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);
