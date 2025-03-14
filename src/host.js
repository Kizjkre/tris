const socket = new WebSocket('wss://localhost:3000/data');

socket.addEventListener('message', event => {
  const data = JSON.parse(event.data);
  console.log(data);
});

