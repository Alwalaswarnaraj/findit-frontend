import { io } from 'socket.io-client';

const socket = io('https://findit-95bx.onrender.com', {
  autoConnect: false, // You control when it connects
});

export default socket;