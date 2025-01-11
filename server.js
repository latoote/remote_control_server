const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

// Route สำหรับ HTTP GET Request ที่ /
app.get('/', (req, res) => {
  res.send('Server is running');
});

// การเชื่อมต่อ Socket.IO
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('touch_event', (data) => {
    console.log('Touch event received:', data);
    socket.broadcast.emit('touch_event', data);
  });

  socket.on('screen_stream', (data) => {
    socket.broadcast.emit('screen_stream', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// เริ่มเซิร์ฟเวอร์ที่พอร์ต 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
