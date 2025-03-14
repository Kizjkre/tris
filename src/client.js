document.getElementById('start').addEventListener('click', async () => {
  await DeviceOrientationEvent.requestPermission();

  const socket = new WebSocket('wss://' + await (await fetch('/ip')).text() + ':3000/data');

  socket.addEventListener('open', async () => {
    window.addEventListener('deviceorientation', event => {
      socket.send(JSON.stringify({ x: event.beta, y: event.gamma, z: event.alpha }));
    });
  });
});

