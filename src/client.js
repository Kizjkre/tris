import * as THREE from 'three';

document.getElementById('start').addEventListener('click', async () => {
  await DeviceOrientationEvent.requestPermission();

  const d = { x: 0, y: 0, z: 0 };

  const factor = 1e-5;

  const socket = new WebSocket('wss://' + await (await fetch('/ip')).text() + ':3000/data');

  socket.addEventListener('open', async () => {
    let prev = performance.now();
    window.addEventListener('deviceorientation', event => {
      const vx = Math.sin(event.alpha * Math.PI / 180) * Math.cos(event.beta * Math.PI / 180);
      const vy = Math.sin(event.beta * Math.PI / 180);
      const vz = factor * (Math.random() * 2 - 1);

      const dt = (performance.now() - prev) * factor;
      d.x += vx * dt;
      d.y += vy * dt;
      d.z += vz * dt;

      d.x = THREE.MathUtils.clamp(d.x, -12, 12);
      d.y = THREE.MathUtils.clamp(d.y, -5, 5);

      socket.send(JSON.stringify({
        x: -d.x.toFixed(2),
        y: d.y.toFixed(2),
        z: d.z.toFixed(2),
        a: event.alpha.toFixed(), // NOTE: Azimuth
        e: event.beta.toFixed(), // NOTE: Elevation
      }));

      prev = now;
    });
  });
});

