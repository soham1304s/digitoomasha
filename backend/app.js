const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Configure CORS to allow any origin in production/development
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware to inject socket engine if available
app.use((req, res, next) => {
  if (!req.io && global.io) {
    req.io = global.io;
  }
  next();
});

// Mount API Routes (supporting both /api prefix and root paths for Vercel service rewrites)
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
app.use('/', authRoutes);

app.use('/api', templatesRoutes);
app.use('/', templatesRoutes);

app.use('/api', uploadRoutes);
app.use('/', uploadRoutes);

app.use('/api', inquiriesRoutes);
app.use('/', inquiriesRoutes);

app.use('/api', contactsRoutes);
app.use('/', contactsRoutes);

app.use('/api', tasksRoutes);
app.use('/', tasksRoutes);

app.use('/api', budgetsRoutes);
app.use('/', budgetsRoutes);

app.use('/api', integrationsRoutes);
app.use('/', integrationsRoutes);

app.use('/api', socialRoutes);
app.use('/', socialRoutes);

app.use('/api', analyticsRoutes);
app.use('/', analyticsRoutes);

app.use('/api', securityRoutes);
app.use('/', securityRoutes);

// Health Check Endpoint
app.get(['/health', '/api/health'], (req, res) => {
  res.json({
    status: 'online',
    service: 'DigiToomasha Node.js Express API Engine',
    timestamp: new Date().toISOString(),
  });
});

module.exports = app;
