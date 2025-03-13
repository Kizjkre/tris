await DeviceOrientationEvent.requestPermission();
alert(1235);

const socket = new WebSocket('ws://10.28.167.181:3000/data');

socket.addEventListener('open', async event => {
  window.addEventListener('deviceorientation', event => {
    alert(123);
    document.body.innerText = '123 ' + JSON.stringify(event);
  });
});

