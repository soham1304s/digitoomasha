const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const { execSync } = require('child_process');

dotenv.config();

const app = express();
const server = http.createServer(app);

// Configure CORS to allow any local frontend port (5173, 5174, etc.)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Initialize Socket.IO engine & bind to HTTP server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

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

// Middleware to inject `req.io` into every API request route
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Mount Pipeline API Routes
const authRoutes = require('./routes/auth');
const templatesRoutes = require('./routes/templates');
const uploadRoutes = require('./routes/upload');
const inquiriesRoutes = require('./routes/inquiries');
const contactsRoutes = require('./routes/contacts');
const tasksRoutes = require('./routes/tasks');
const budgetsRoutes = require('./routes/budgets');
const integrationsRoutes = require('./routes/integrations');
const socialRoutes = require('./routes/social');
const analyticsRoutes = require('./routes/analytics');
const securityRoutes = require('./routes/security');

app.use('/api', authRoutes);
app.use('/api', templatesRoutes);
app.use('/api', uploadRoutes);
app.use('/api', inquiriesRoutes);
app.use('/api', contactsRoutes);
app.use('/api', tasksRoutes);
app.use('/api', budgetsRoutes);
app.use('/api', integrationsRoutes);
app.use('/api', socialRoutes);
app.use('/api', analyticsRoutes);
app.use('/api', securityRoutes);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'DigiToomasha Node.js Express & Socket.IO Engine',
    timestamp: new Date().toISOString(),
    connectedSockets: onlineSocketsCount,
  });
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

