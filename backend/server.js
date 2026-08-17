const http = require('http');
const { Server } = require('socket.io');
const { execSync } = require('child_process');
const app = require('./app');

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

global.io = io;

let onlineSocketsCount = 0;

io.on('connection', (socket) => {
  onlineSocketsCount++;
  console.log(`⚡ Socket client connected: ${socket.id} (Total: ${onlineSocketsCount})`);

  socket.emit('socket_status', {
    status: 'connected',
    socketId: socket.id,
    onlineClients: onlineSocketsCount,
  });

  io.emit('online_count_update', { count: onlineSocketsCount });

  socket.on('disconnect', () => {
    onlineSocketsCount = Math.max(0, onlineSocketsCount - 1);
    console.log(`🔌 Socket client disconnected: ${socket.id} (Total: ${onlineSocketsCount})`);
    io.emit('online_count_update', { count: onlineSocketsCount });
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

const PORT = process.env.PORT || 5000;
let isReclaimingPort = false;

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE' && !isReclaimingPort) {
    isReclaimingPort = true;
    console.warn(`⚠️ Port ${PORT} is already in use. Reclaiming port...`);
    try {
      execSync(`fuser -k ${PORT}/tcp 2>/dev/null || true`);
    } catch (e) {}
    setTimeout(() => {
      server.listen(PORT);
    }, 500);
  } else if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is still in use after attempted recovery.`);
    process.exit(1);
  } else {
    throw err;
  }
});

server.listen(PORT, () => {
  console.log(`🚀 DigiToomasha Express + Socket.IO Backend running on http://localhost:${PORT}`);
});
