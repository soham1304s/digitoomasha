require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// PostgreSQL Pool configuration
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@127.0.0.1:5432/digitoomasha_db',
  ssl: process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('127.0.0.1') && !process.env.DATABASE_URL.includes('localhost') ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 2000,
});


const os = require('os');

// Fallback JSON data store file path
const LOCAL_STORE_FILE = path.join(__dirname, 'fallback_store.json');
const isVercel = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
const FALLBACK_FILE = isVercel
  ? path.join(os.tmpdir(), 'fallback_store.json')
  : LOCAL_STORE_FILE;


// Initial seed data generator
function seedInitialStore() {
  const salt = bcrypt.genSaltSync(10);
  const alexHash = bcrypt.hashSync('demo123456', salt);
  const adminHash = bcrypt.hashSync('123456', salt);

  return {
    users: [
      {
        id: 1,
        full_name: 'Alex Morgan',
        email: 'alex.morgan@company.com',
        phone: '+1 (555) 234-5678',
        company_name: 'Lumière D\'or',
        job_title: 'VP of Growth',
        country: 'United States',
        city: 'New York',
        business_name: 'Lumière Skincare Inc.',
        business_website: 'https://lumiereskincare.com',
        business_category: 'E-commerce & Retail',
        industry: 'Beauty & Skincare',
        employees_count: '51-200 employees',
        monthly_budget: '₹1,00,000 - ₹2,50,000/mo',
        business_goals: ['SEO Optimization', 'Paid Ads Scaling'],
        password_hash: alexHash,
        role: 'client',
        avatar: '',
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      },
      {
        id: 2,
        full_name: 'System Admin',
        email: 'admin@digitoomasha.com',
        phone: '+1 (555) 999-0000',
        company_name: 'DigiToomasha Inc.',
        job_title: 'Lead Administrator',
        country: 'United States',
        city: 'San Francisco',
        business_name: 'DigiToomasha Platform',
        business_website: 'https://digitoomasha.com',
        business_category: 'Digital Agency',
        industry: 'Marketing Technology',
        employees_count: '200+ employees',
        monthly_budget: '₹2,50,000+/mo',
        business_goals: ['Platform Control', 'Client Growth'],
        password_hash: adminHash,
        role: 'admin',
        avatar: '',
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      },
    ],
    inquiries: [
      {
        id: 101,
        name: 'David Vance',
        email: 'david.vance@apexretail.io',
        phone: '+1 (555) 345-9876',
        company: 'Apex Retail Group',
        budget: '₹1,00,000 - ₹2,50,000/mo',
        services: ['Search Engine Optimization (SEO)', 'PPC & Paid Search Ads'],
        message: 'Looking to scale organic search revenue and lower CPA on Google Ads.',
        status: 'New Lead',
        created_at: new Date().toISOString(),
      },
      {
        id: 102,
        name: 'Elena Rostova',
        email: 'elena@biotect-labs.com',
        phone: '+44 20 7946 0912',
        company: 'Biotect Health Labs',
        budget: '₹2,50,000+/mo',
        services: ['Custom Web Design & React App', 'Social Media Marketing'],
        message: 'Rebranding our direct-to-consumer supplements storefront.',
        status: 'Proposal Sent',
        created_at: new Date(Date.now() - 86400000).toISOString(),
      }
    ],
    client_templates: [],
    contacts: [
      {
        id: 'ct-1',
        name: 'Vikram Sethi',
        email: 'vikram.sethi@zenth-fashion.in',
        phone: '+91 98201 44321',
        company: 'Zenth Apparel',
        role: 'Founder & CEO',
        location: 'Mumbai, MH',
        segment: 'High LTV Champions',
        leadScore: 94,
        ltv: 4200,
        ordersCount: 8,
        acquisitionSource: 'Google Search Ads',
        lastActive: '12 mins ago',
        avatar: '',
        tags: ['VIP Client', 'High ROAS Target'],
        created_at: new Date().toISOString()
      },
      {
        id: 'ct-2',
        name: 'Jessica Alba',
        email: 'jessica.a@glowskin.co',
        phone: '+1 (555) 887-1234',
        company: 'Glow Skincare',
        role: 'Managing Partner',
        location: 'Los Angeles, CA',
        segment: 'E-Commerce Cart Abandoners',
        leadScore: 78,
        ltv: 1200,
        ordersCount: 3,
        acquisitionSource: 'Meta IG Ads',
        lastActive: '5 hours ago',
        avatar: '',
        tags: ['Agency Partner', 'Cart Abandoner'],
        created_at: new Date(Date.now() - 172800000).toISOString()
      }
    ],
    tasks: [
      {
        id: 'tsk-101',
        title: 'Develop Mobile App OAuth 2.0 Biometric Login',
        description: 'Implement secure JWT authentication flow with Apple FaceID / Google TouchID biometrics and key security tokens in React Native & Swift.',
        status: 'In Progress',
        priority: 'Urgent',
        campaign: 'Mobile App (iOS/Android)',
        assignee_name: 'Software Tech Lead',
        due_date: '2026-08-06',
        subtasks: [
          { id: 'st-1', text: 'Implement OAuth 2.0 PKCE Flow', completed: true },
          { id: 'st-2', text: 'Integrate Native FaceID SDK', completed: true },
          { id: 'st-3', text: 'Encrypted Keyring Token Storage', completed: false }
        ],
        comments: [
          { author: 'Rahul Sharma', time: 'Yesterday, 4:15 PM', text: 'Biometric fallback PIN screen passed Android 14 test suite.' }
        ],
        created_at: new Date().toISOString()
      },
      {
        id: 'tsk-102',
        title: 'Build SaaS Client Dashboard UI & WebSockets',
        description: 'Construct responsive dashboard interface, Kanban board, list views, and real-time Socket.io updates for contract deliverables.',
        status: 'In Review / QA',
        priority: 'High',
        campaign: 'Web Frontend (React/Next.js)',
        assignee_name: 'Ananya Roy',
        due_date: '2026-08-05',
        subtasks: [
          { id: 'st-4', text: 'Build Modular Vanilla CSS System', completed: true },
          { id: 'st-5', text: 'Connect WebSocket Real-Time Stream', completed: true },
          { id: 'st-6', text: 'Responsive Mobile UI Touch Polish', completed: true }
        ],
        comments: [
          { author: 'Software Tech Lead', time: '2 hours ago', text: 'UI components look crisp! Submitting to client QA.' }
        ],
        created_at: new Date().toISOString()
      },
      {
        id: 'tsk-103',
        title: 'Deploy Microservices REST & GraphQL API Infrastructure',
        description: 'Set up Express/Node.js API gateway, rate limiting, Swagger specs, and PostgreSQL database migrations for client contract management.',
        status: 'To Do',
        priority: 'Medium',
        campaign: 'Backend API & Microservices',
        assignee_name: 'Rahul Sharma',
        due_date: '2026-08-08',
        subtasks: [
          { id: 'st-7', text: 'Database Schema Indexing & Migrations', completed: false },
          { id: 'st-8', text: 'Generate Swagger OpenAPI Specs', completed: false }
        ],
        comments: [],
        created_at: new Date().toISOString()
      },
      {
        id: 'tsk-104',
        title: 'Cloud Infrastructure CI/CD & AWS Cluster Deployment',
        description: 'Configure automated GitHub Actions CI/CD pipeline with AWS ECS Fargate, SSL certificates, zero-downtime rolling deploys, and CloudWatch telemetry.',
        status: 'Completed',
        priority: 'High',
        campaign: 'Cloud Infra, DevOps & Security',
        assignee_name: 'Rohan Gupta',
        due_date: '2026-08-03',
        subtasks: [
          { id: 'st-9', text: 'Containerize Node.js & React Apps', completed: true },
          { id: 'st-10', text: 'Automate Zero-Downtime Staging Deploy', completed: true }
        ],
        comments: [
          { author: 'Rohan Gupta', time: 'Aug 3', text: 'CI/CD pipeline build time reduced from 8m to 1.5m!' }
        ],
        created_at: new Date().toISOString()
      },
      {
        id: 'tsk-105',
        title: 'UI/UX Design System & Interactive Figma Wireframes',
        description: 'Create high-fidelity interactive Figma prototypes for client mobile app checkout, navigation drawer, and dark mode theme tokens.',
        status: 'In Progress',
        priority: 'Urgent',
        campaign: 'UI/UX Product Design & Prototyping',
        assignee_name: 'Rahul Sharma',
        due_date: '2026-08-07',
        subtasks: [
          { id: 'st-11', text: 'Define Primary & Secondary Color Tokens', completed: true },
          { id: 'st-12', text: 'Build Interactive Prototype Component Library', completed: false }
        ],
        comments: [],
        created_at: new Date().toISOString()
      }
    ],
    budgets: [
      {
        id: 'bgt-101',
        campaign_name: 'Google Search - High-Intent SaaS Keywords',
        channel: 'Google Ads',
        allocated_budget: 25000,
        spent_to_date: 18200,
        daily_cap: 850,
        roas: 5.21,
        pacing_percent: 72.8,
        status: 'On Track'
      },
      {
        id: 'bgt-102',
        campaign_name: 'Meta IG Reels - Micro Influencer Summer Push',
        channel: 'Meta Ads',
        allocated_budget: 20000,
        spent_to_date: 14500,
        daily_cap: 650,
        roas: 4.82,
        pacing_percent: 72.5,
        status: 'On Track'
      }
    ],
    integrations: [
      {
        id: 'int-101',
        name: 'Google Ads & Performance Max',
        category: 'Ad Networks',
        description: 'Auto-sync search keywords, bidding strategies, impressions, and ROAS metrics.',
        status: 'Connected',
        api_key_masked: 'AIzaSyD-798...x9Q4',
        sync_frequency: 'Real-time (Every 5m)'
      },
      {
        id: 'int-102',
        name: 'Meta Ads & Instagram Business',
        category: 'Social Media',
        description: 'Sync IG Reel performance, Facebook lead forms, custom conversions, and ad creatives.',
        status: 'Connected',
        api_key_masked: 'EAAGm0PX4...92ZB',
        sync_frequency: 'Real-time (Every 15m)'
      },
      {
        id: 'int-103',
        name: 'Cloudinary Media CDN & Storage',
        category: 'Cloud Storage',
        description: 'High-speed media asset uploading, automatic webp compression, and image transformations.',
        status: 'Connected',
        api_key_masked: '633486411435833 (Cloud: db4grmmiw)',
        sync_frequency: 'Instant Webhook'
      }
    ],
    social_posts: [
      {
        id: 'sp-101',
        title: 'Q3 Growth Blueprint: Scaling E-Commerce ROAS from 2.5x to 5.2x',
        caption: '🔥 Unlocking hyper-growth in 2026 requires real-time attribution and dynamic creative testing. Swipe to see our 3-step framework.',
        platforms: ['Linkedin', 'Twitter'],
        status: 'Scheduled',
        scheduled_date: '2026-08-05',
        scheduled_time: '14:30',
        media: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        category: 'Thought Leadership'
      }
    ]
  };
}

// Read JSON Store
function readStore() {
  if (!fs.existsSync(FALLBACK_FILE)) {
    if (isVercel && fs.existsSync(LOCAL_STORE_FILE)) {
      try {
        const raw = fs.readFileSync(LOCAL_STORE_FILE, 'utf8');
        const parsed = JSON.parse(raw);
        try { fs.writeFileSync(FALLBACK_FILE, JSON.stringify(parsed, null, 2)); } catch (err) {}
        return parsed;
      } catch (e) {}
    }
    const seeded = seedInitialStore();
    try { fs.writeFileSync(FALLBACK_FILE, JSON.stringify(seeded, null, 2)); } catch (err) {}
    return seeded;
  }
  try {
    const raw = fs.readFileSync(FALLBACK_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed.users || !parsed.inquiries) {
      const seeded = seedInitialStore();
      try { fs.writeFileSync(FALLBACK_FILE, JSON.stringify(seeded, null, 2)); } catch (err) {}
      return seeded;
    }

    if (!Array.isArray(parsed.client_templates)) {
      parsed.client_templates = [];
      try { fs.writeFileSync(FALLBACK_FILE, JSON.stringify(parsed, null, 2)); } catch (err) {}
    }

    return parsed;
  } catch (e) {
    const seeded = seedInitialStore();
    try { fs.writeFileSync(FALLBACK_FILE, JSON.stringify(seeded, null, 2)); } catch (err) {}
    return seeded;
  }
}

// Write JSON Store
function writeStore(data) {
  try {
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to write JSON fallback store:', err);
  }
}

let isPgConnected = false;

// Initialize PostgreSQL Tables
async function initDb() {
  try {
    const client = await pool.connect();
    client.release();
    await pool.query(`

      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(100),
        company_name VARCHAR(255),
        job_title VARCHAR(255),
        country VARCHAR(100),
        city VARCHAR(100),
        business_name VARCHAR(255),
        business_website VARCHAR(255),
        business_category VARCHAR(100),
        industry VARCHAR(100),
        employees_count VARCHAR(50),
        monthly_budget VARCHAR(100),
        business_goals JSONB DEFAULT '[]',
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'client',
        avatar TEXT DEFAULT '',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        company VARCHAR(255),
        budget VARCHAR(100),
        services JSONB DEFAULT '[]',
        message TEXT,
        status VARCHAR(50) DEFAULT 'New Lead',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS contacts (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100),
        company VARCHAR(255),
        role VARCHAR(255),
        location VARCHAR(100),
        segment VARCHAR(100),
        lead_score INT DEFAULT 80,
        ltv NUMERIC DEFAULT 0,
        orders_count INT DEFAULT 0,
        acquisition_source VARCHAR(100),
        last_active VARCHAR(100),
        avatar TEXT DEFAULT '',
        tags JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS tasks (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        status VARCHAR(50) DEFAULT 'To Do',
        priority VARCHAR(50) DEFAULT 'High',
        campaign VARCHAR(255),
        assignee_name VARCHAR(255),
        due_date VARCHAR(100),
        subtasks JSONB DEFAULT '[]',
        files JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      ALTER TABLE tasks ADD COLUMN IF NOT EXISTS files JSONB DEFAULT '[]';

      CREATE TABLE IF NOT EXISTS budgets (
        id VARCHAR(100) PRIMARY KEY,
        campaign_name VARCHAR(255) NOT NULL,
        channel VARCHAR(100),
        allocated_budget NUMERIC DEFAULT 0,
        spent_to_date NUMERIC DEFAULT 0,
        daily_cap NUMERIC DEFAULT 0,
        roas NUMERIC DEFAULT 0,
        pacing_percent NUMERIC DEFAULT 0,
        status VARCHAR(50) DEFAULT 'On Track'
      );

      CREATE TABLE IF NOT EXISTS integrations (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        description TEXT,
        status VARCHAR(50) DEFAULT 'Connected',
        api_key_masked VARCHAR(255),
        sync_frequency VARCHAR(100)
      );

      CREATE TABLE IF NOT EXISTS social_posts (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        caption TEXT,
        platforms JSONB DEFAULT '[]',
        status VARCHAR(50) DEFAULT 'Scheduled',
        scheduled_date VARCHAR(100),
        scheduled_time VARCHAR(100),
        media TEXT,
        category VARCHAR(100),
        author VARCHAR(255) DEFAULT 'Growth Team',
        published_at VARCHAR(100) DEFAULT '',
        projected_reach VARCHAR(100) DEFAULT '5.5k',
        likes INT DEFAULT 0,
        shares INT DEFAULT 0,
        comments INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS client_templates (
        id VARCHAR(100) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        industry VARCHAR(100),
        description TEXT,
        tech_stack JSONB DEFAULT '[]',
        thumbnail TEXT,
        status VARCHAR(50) DEFAULT 'pending',
        client_email VARCHAR(255),
        approved_by VARCHAR(255),
        admin_notes TEXT,
        is_approved BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        approved_at TIMESTAMP NULL
      );
    `);
    const adminPassHash = '$2a$10$ueF0EDx1PayLvD6g7nN29.WBRsC0PL9O8aIUzHnOoT4MXC7ACfkBm';
    await pool.query('UPDATE users SET password_hash = $1 WHERE LOWER(email) = $2', [adminPassHash, 'admin@digitoomasha.com']);
    isPgConnected = true;
    console.log('✅ PostgreSQL Database connected & schema verified.');
  } catch (err) {
    console.warn('⚠️ PostgreSQL local daemon not reachable. Using fallback store:', err.message);
    isPgConnected = false;
  }
}

initDb();

// USER DB FUNCTIONS
async function findUserByEmail(email) {
  if (isPgConnected) {
    try {
      const res = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [email]);
      if (res.rows[0]) return res.rows[0];
    } catch (err) {
      console.error('Pg findUserByEmail Error:', err);
    }
  }
  const store = readStore();
  return store.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

async function createUser(userData) {
  if (isPgConnected) {
    try {
      const query = `
        INSERT INTO users (
          full_name, email, phone, company_name, job_title, country, city,
          business_name, business_website, business_category, industry,
          employees_count, monthly_budget, business_goals, password_hash, role, avatar
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
        ) RETURNING *;
      `;
      const values = [
        userData.fullName,
        userData.email,
        userData.phone || '',
        userData.companyName || '',
        userData.jobTitle || '',
        userData.country || 'United States',
        userData.city || '',
        userData.businessName || '',
        userData.businessWebsite || '',
        userData.businessCategory || '',
        userData.industry || '',
        userData.employeesCount || '',
        userData.monthlyBudget || '',
        JSON.stringify(userData.businessGoals || []),
        userData.passwordHash,
        userData.role || 'client',
        userData.avatar || '',
      ];
      const res = await pool.query(query, values);
      return res.rows[0];
    } catch (err) {
      console.error('Pg createUser Error:', err);
    }
  }

  const store = readStore();
  const newUser = {
    id: store.users.length + 1,
    full_name: userData.fullName,
    email: userData.email,
    phone: userData.phone || '',
    company_name: userData.companyName || '',
    job_title: userData.jobTitle || '',
    country: userData.country || 'United States',
    city: userData.city || '',
    business_name: userData.businessName || userData.companyName || '',
    business_website: userData.businessWebsite || '',
    business_category: userData.businessCategory || 'E-commerce',
    industry: userData.industry || 'General',
    employees_count: userData.employeesCount || '1-10 employees',
    monthly_budget: userData.monthlyBudget || '₹50,000 - ₹1,00,000/mo',
    business_goals: userData.businessGoals || ['SEO Optimization'],
    password_hash: userData.passwordHash,
    role: userData.role || 'client',
    avatar: userData.avatar || '',
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
  };
  store.users.push(newUser);
  writeStore(store);
  return newUser;
}

async function getAllUsers() {
  if (isPgConnected) {
    try {
      const res = await pool.query(
        'SELECT id, full_name, email, phone, company_name, job_title, country, city, business_name, business_website, business_category, industry, employees_count, monthly_budget, business_goals, role, avatar, status, created_at, last_login FROM users ORDER BY created_at DESC'
      );
      if (res.rows.length > 0) {
        return res.rows.map((u) => ({ ...u, status: u.status || 'Active' }));
      }
    } catch (err) {
      console.warn('Pg getAllUsers fallback:', err.message);
      isPgConnected = false;
    }
  }
  const store = readStore();
  return store.users.map(({ password_hash, ...u }) => ({
    ...u,
    status: u.status || 'Active',
  }));
}

async function updateUserStatus(id, status) {
  if (isPgConnected) {
    try {
      const res = await pool.query('UPDATE users SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
      if (res.rows[0]) return res.rows[0];
    } catch (err) {
      console.error('Pg updateUserStatus Error:', err);
    }
  }

  const store = readStore();
  const index = store.users.findIndex((u) => String(u.id) === String(id));
  if (index !== -1) {
    store.users[index].status = status;
    writeStore(store);
    return store.users[index];
  }
  return null;
}

async function deleteUser(id) {
  if (isPgConnected) {
    try {
      const res = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
      if (res.rows[0]) return true;
    } catch (err) {
      console.error('Pg deleteUser Error:', err);
    }
  }

  const store = readStore();
  const initialLength = store.users.length;
  store.users = store.users.filter((u) => String(u.id) !== String(id));
  if (store.users.length < initialLength) {
    writeStore(store);
    return true;
  }
  return false;
}


async function updateUserProfile(email, updateData) {
  if (isPgConnected) {
    try {
      const keys = Object.keys(updateData);
      const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');
      const values = [email, ...Object.values(updateData)];
      const res = await pool.query(`UPDATE users SET ${setClause} WHERE LOWER(email) = LOWER($1) RETURNING *`, values);
      if (res.rows[0]) return res.rows[0];
    } catch (err) {
      console.error('Pg updateUserProfile Error:', err);
    }
  }

  const store = readStore();
  const index = store.users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase());
  if (index !== -1) {
    store.users[index] = { ...store.users[index], ...updateData };
    writeStore(store);
    return store.users[index];
  }
  return null;
}

// INQUIRIES DB FUNCTIONS
async function createInquiry(data) {
  if (isPgConnected) {
    try {
      const res = await pool.query(
        `INSERT INTO inquiries (name, email, phone, company, budget, services, message, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
          data.name,
          data.email,
          data.phone || '',
          data.company || '',
          data.budget || '₹50,000 - ₹1,00,000/mo',
          JSON.stringify(data.services || []),
          data.message || '',
          'New Lead',
        ]
      );
      return res.rows[0];
    } catch (err) {
      console.error('Pg createInquiry Error:', err);
    }
  }

  const store = readStore();
  const newInquiry = {
    id: store.inquiries.length + 101,
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    company: data.company || '',
    budget: data.budget || '₹50,000 - ₹1,00,000/mo',
    services: data.services || [],
    message: data.message || '',
    status: 'New Lead',
    created_at: new Date().toISOString(),
  };
  store.inquiries.unshift(newInquiry);
  writeStore(store);
  return newInquiry;
}

async function getAllInquiries() {
  if (isPgConnected) {
    try {
      const res = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC');
      return res.rows;
    } catch (err) {
      console.warn('Pg getAllInquiries fallback:', err.message);
      isPgConnected = false;
    }
  }
  return readStore().inquiries || [];
}

async function updateInquiryStatus(id, newStatus) {
  if (isPgConnected) {
    try {
      const res = await pool.query(
        'UPDATE inquiries SET status = $1 WHERE id = $2 RETURNING *',
        [newStatus, id]
      );
      if (res.rows.length > 0) return res.rows[0];
    } catch (err) {
      console.warn('Pg updateInquiryStatus fallback:', err.message);
      isPgConnected = false;
    }
  }
  const store = readStore();
  const inquiry = store.inquiries.find((i) => i.id == id);
  if (inquiry) {
    inquiry.status = newStatus;
    writeStore(store);
    return inquiry;
  }
  return null;
}



// CONTACTS DB FUNCTIONS
async function getAllContacts() {
  if (isPgConnected) {
    try {
      const res = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
      return res.rows;
    } catch (err) {
      console.error('Pg getAllContacts Error:', err);
    }
  }
  return readStore().contacts || [];
}

async function createContact(data) {
  const newId = data.id || `ct-${Date.now()}`;
  if (isPgConnected) {
    try {
      const res = await pool.query(
        `INSERT INTO contacts (id, name, email, phone, company, role, location, segment, lead_score, ltv, orders_count, acquisition_source, last_active, avatar, tags)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
        [
          newId,
          data.name,
          data.email,
          data.phone || '',
          data.company || '',
          data.role || '',
          data.location || '',
          data.segment || 'High LTV Champions',
          data.leadScore || 80,
          data.ltv || 0,
          data.ordersCount || 0,
          data.acquisitionSource || 'Direct',
          'Just now',
          data.avatar || '',
          JSON.stringify(data.tags || []),
        ]
      );
      return res.rows[0];
    } catch (err) {
      console.error('Pg createContact Error:', err);
    }
  }

  const store = readStore();
  const contact = {
    id: newId,
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    company: data.company || '',
    role: data.role || '',
    location: data.location || '',
    segment: data.segment || 'High LTV Champions',
    leadScore: data.leadScore || 80,
    ltv: data.ltv || 0,
    ordersCount: data.ordersCount || 0,
    acquisitionSource: data.acquisitionSource || 'Direct',
    lastActive: 'Just now',
    avatar: data.avatar || '',
    tags: data.tags || [],
    created_at: new Date().toISOString(),
  };
  store.contacts.unshift(contact);
  writeStore(store);
  return contact;
}

// TASKS DB FUNCTIONS
async function getAllTasks() {
  if (isPgConnected) {
    try {
      const res = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
      return res.rows;
    } catch (err) {
      console.error('Pg getAllTasks Error:', err);
    }
  }
  return readStore().tasks || [];
}

async function createTask(data) {
  const newId = data.id || `tsk-${Date.now()}`;
  if (isPgConnected) {
    try {
      const res = await pool.query(
        `INSERT INTO tasks (id, title, description, status, priority, campaign, assignee_name, due_date, subtasks)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          newId,
          data.title,
          data.description || '',
          data.status || 'To Do',
          data.priority || 'High',
          data.campaign || 'General',
          data.assigneeName || 'Client Lead',
          data.dueDate || '2026-08-10',
          JSON.stringify(data.subtasks || []),
        ]
      );
      return res.rows[0];
    } catch (err) {
      console.error('Pg createTask Error:', err);
    }
  }

  const store = readStore();
  const task = {
    id: newId,
    title: data.title,
    description: data.description || '',
    status: data.status || 'To Do',
    priority: data.priority || 'High',
    campaign: data.campaign || 'General',
    assignee_name: data.assigneeName || 'Client Lead',
    due_date: data.dueDate || '2026-08-10',
    subtasks: data.subtasks || [],
    created_at: new Date().toISOString(),
  };
  store.tasks.unshift(task);
  writeStore(store);
  return task;
}

async function updateTask(id, updateData) {
  if (isPgConnected) {
    try {
      const keys = Object.keys(updateData);
      const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');
      const values = [id, ...Object.values(updateData)];
      const res = await pool.query(`UPDATE tasks SET ${setClause} WHERE id = $1 RETURNING *`, values);
      if (res.rows[0]) return res.rows[0];
    } catch (err) {
      console.error('Pg updateTask Error:', err);
    }
  }

  const store = readStore();
  const index = store.tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    store.tasks[index] = { ...store.tasks[index], ...updateData };
    writeStore(store);
    return store.tasks[index];
  }
  return null;
}

async function deleteTask(id) {
  if (isPgConnected) {
    try {
      const res = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
      if (res.rows[0]) return true;
    } catch (err) {
      console.error('Pg deleteTask Error:', err);
    }
  }

  const store = readStore();
  const initialLen = store.tasks.length;
  store.tasks = store.tasks.filter((t) => t.id !== id);
  if (store.tasks.length < initialLen) {
    writeStore(store);
    return true;
  }
  return false;
}


// CLIENT TEMPLATE REQUESTS DB FUNCTIONS
async function createClientTemplate(data) {
  const newId = data.id || `ctpl-${Date.now()}`;
  if (isPgConnected) {
    try {
      const res = await pool.query(
        `INSERT INTO client_templates (
           id, title, category, industry, description, tech_stack, thumbnail, status, client_email, is_approved
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [
          newId,
          data.title,
          data.category,
          data.industry || '',
          data.description || '',
          JSON.stringify(data.techStack || []),
          data.thumbnail || '',
          data.status || 'pending',
          data.clientEmail || '',
          false,
        ]
      );
      return res.rows[0];
    } catch (err) {
      console.error('Pg createClientTemplate Error:', err);
    }
  }

  const store = readStore();
  const template = {
    id: newId,
    title: data.title,
    category: data.category,
    industry: data.industry || '',
    description: data.description || '',
    tech_stack: data.techStack || [],
    thumbnail: data.thumbnail || '',
    status: data.status || 'pending',
    client_email: data.clientEmail || '',
    approved_by: null,
    admin_notes: '',
    is_approved: false,
    created_at: new Date().toISOString(),
    approved_at: null,
  };
  store.client_templates.unshift(template);
  writeStore(store);
  return template;
}

async function getClientTemplatesByEmail(email) {
  if (isPgConnected) {
    try {
      const res = await pool.query(
        'SELECT * FROM client_templates WHERE LOWER(client_email) = LOWER($1) AND is_approved = true ORDER BY approved_at DESC',
        [email]
      );
      return res.rows;
    } catch (err) {
      console.error('Pg getClientTemplatesByEmail Error:', err);
    }
  }

  const store = readStore();
  return (store.client_templates || []).filter(
    (tpl) => tpl.client_email.toLowerCase() === String(email).toLowerCase() && tpl.is_approved
  );
}

async function getPendingClientTemplates() {
  if (isPgConnected) {
    try {
      const res = await pool.query('SELECT * FROM client_templates WHERE is_approved = false ORDER BY created_at DESC');
      return res.rows;
    } catch (err) {
      console.error('Pg getPendingClientTemplates Error:', err);
    }
  }

  const store = readStore();
  return (store.client_templates || []).filter((tpl) => !tpl.is_approved);
}

async function getAllClientTemplates() {
  if (isPgConnected) {
    try {
      const res = await pool.query('SELECT * FROM client_templates ORDER BY created_at DESC');
      return res.rows;
    } catch (err) {
      console.error('Pg getAllClientTemplates Error:', err);
    }
  }

  return readStore().client_templates || [];
}

async function approveClientTemplate(id, approvedBy, adminNotes) {
  if (isPgConnected) {
    try {
      const res = await pool.query(
        `UPDATE client_templates
         SET status = $2,
             is_approved = true,
             approved_by = $3,
             admin_notes = $4,
             approved_at = CURRENT_TIMESTAMP
         WHERE id = $1
         RETURNING *`,
        [id, 'approved', approvedBy || '', adminNotes || '']
      );
      return res.rows[0];
    } catch (err) {
      console.error('Pg approveClientTemplate Error:', err);
    }
  }

  const store = readStore();
  const index = (store.client_templates || []).findIndex((tpl) => tpl.id === id);
  if (index !== -1) {
    store.client_templates[index] = {
      ...store.client_templates[index],
      status: 'approved',
      is_approved: true,
      approved_by: approvedBy || '',
      admin_notes: adminNotes || '',
      approved_at: new Date().toISOString(),
    };
    writeStore(store);
    return store.client_templates[index];
  }
  return null;
}

// BUDGETS DB FUNCTIONS
async function getAllBudgets() {
  if (isPgConnected) {
    try {
      const res = await pool.query('SELECT * FROM budgets');
      return res.rows;
    } catch (err) {
      console.error('Pg getAllBudgets Error:', err);
    }
  }
  return readStore().budgets || [];
}

async function createBudget(data) {
  const newId = data.id || `bgt-${Date.now()}`;
  if (isPgConnected) {
    try {
      const res = await pool.query(
        `INSERT INTO budgets (id, campaign_name, channel, allocated_budget, spent_to_date, daily_cap, roas, pacing_percent, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [
          newId,
          data.campaignName,
          data.channel || 'Google Ads',
          data.allocatedBudget || 10000,
          0,
          data.dailyCap || 400,
          4.5,
          0,
          'On Track',
        ]
      );
      return res.rows[0];
    } catch (err) {
      console.error('Pg createBudget Error:', err);
    }
  }

  const store = readStore();
  const budget = {
    id: newId,
    campaign_name: data.campaignName,
    channel: data.channel || 'Google Ads',
    allocated_budget: data.allocatedBudget || 10000,
    spent_to_date: 0,
    daily_cap: data.dailyCap || 400,
    roas: 4.5,
    pacing_percent: 0,
    status: 'On Track',
  };
  store.budgets.unshift(budget);
  writeStore(store);
  return budget;
}

// INTEGRATIONS DB FUNCTIONS
async function getAllIntegrations() {
  if (isPgConnected) {
    try {
      const res = await pool.query('SELECT * FROM integrations');
      return res.rows;
    } catch (err) {
      console.error('Pg getAllIntegrations Error:', err);
    }
  }
  return readStore().integrations || [];
}

async function toggleIntegration(id) {
  const store = readStore();
  const index = store.integrations.findIndex((item) => item.id === id);
  if (index !== -1) {
    store.integrations[index].status =
      store.integrations[index].status === 'Connected' ? 'Disconnected' : 'Connected';
    writeStore(store);
    return store.integrations[index];
  }
  return null;
}

// SOCIAL POSTS DB FUNCTIONS
async function getAllSocialPosts() {
  if (isPgConnected) {
    try {
      const res = await pool.query('SELECT * FROM social_posts ORDER BY created_at DESC');
      if (res.rows.length > 0) return res.rows;
    } catch (err) {
      console.error('Pg getAllSocialPosts Error:', err);
    }
  }
  return readStore().social_posts || [];
}

async function createSocialPost(data) {
  const newId = data.id || `sp-${Date.now()}`;
  const author = data.author || 'Client Lead';
  const publishedAt = data.status === 'Published' ? 'Just Now' : (data.publishedAt || '');
  const projectedReach = data.projectedReach || '5.5k';

  if (isPgConnected) {
    try {
      const query = `
        INSERT INTO social_posts (
          id, title, caption, platforms, status, scheduled_date, scheduled_time, media, category, author, published_at, projected_reach, likes, shares, comments
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
        ) RETURNING *;
      `;
      const values = [
        newId,
        data.title,
        data.caption || '',
        JSON.stringify(data.platforms || ['Linkedin']),
        data.status || 'Scheduled',
        data.scheduledDate || new Date().toISOString().split('T')[0],
        data.scheduledTime || '14:00',
        data.media || '',
        data.category || 'General',
        author,
        publishedAt,
        projectedReach,
        data.likes || 0,
        data.shares || 0,
        data.comments || 0,
      ];
      const res = await pool.query(query, values);
      if (res.rows[0]) return res.rows[0];
    } catch (err) {
      console.error('Pg createSocialPost Error:', err);
    }
  }

  const store = readStore();
  const isClientAdded = data.isClientAdded !== undefined ? Boolean(data.isClientAdded) : true;
  const clientEmail = data.clientEmail || data.client_email || data.email || '';

  const post = {
    id: newId,
    title: data.title,
    caption: data.caption || '',
    platforms: data.platforms || ['Linkedin'],
    status: data.status || 'Scheduled',
    scheduled_date: data.scheduledDate || new Date().toISOString().split('T')[0],
    scheduled_time: data.scheduledTime || '14:00',
    media: data.media || '',
    category: data.category || 'General',
    author,
    client_email: clientEmail,
    clientEmail: clientEmail,
    published_at: publishedAt,
    projected_reach: projectedReach,
    is_client_added: isClientAdded,
    isClientAdded: isClientAdded,
    likes: data.likes || 0,
    shares: data.shares || 0,
    comments: data.comments || 0,
    created_at: new Date().toISOString(),
  };
  store.social_posts.unshift(post);
  writeStore(store);
  return post;
}

async function updateSocialPost(id, data) {
  if (isPgConnected) {
    try {
      const res = await pool.query(
        `UPDATE social_posts SET
           title = COALESCE($2, title),
           caption = COALESCE($3, caption),
           platforms = COALESCE($4, platforms),
           status = COALESCE($5, status),
           scheduled_date = COALESCE($6, scheduled_date),
           scheduled_time = COALESCE($7, scheduled_time),
           media = COALESCE($8, media),
           category = COALESCE($9, category),
           published_at = COALESCE($10, published_at)
         WHERE id = $1 RETURNING *`,
        [
          id,
          data.title,
          data.caption,
          data.platforms ? JSON.stringify(data.platforms) : null,
          data.status,
          data.scheduledDate,
          data.scheduledTime,
          data.media,
          data.category,
          data.publishedAt,
        ]
      );
      if (res.rows[0]) return res.rows[0];
    } catch (err) {
      console.error('Pg updateSocialPost Error:', err);
    }
  }

  const store = readStore();
  const index = store.social_posts.findIndex((p) => p.id === id);
  if (index !== -1) {
    store.social_posts[index] = {
      ...store.social_posts[index],
      ...data,
      scheduled_date: data.scheduledDate || store.social_posts[index].scheduled_date,
      scheduled_time: data.scheduledTime || store.social_posts[index].scheduled_time,
      published_at: data.publishedAt || store.social_posts[index].published_at,
    };
    writeStore(store);
    return store.social_posts[index];
  }
  return null;
}

async function deleteSocialPost(id) {
  if (isPgConnected) {
    try {
      await pool.query('DELETE FROM social_posts WHERE id = $1', [id]);
    } catch (err) {
      console.error('Pg deleteSocialPost Error:', err);
    }
  }

  const store = readStore();
  store.social_posts = store.social_posts.filter((p) => p.id !== id);
  writeStore(store);
  return { success: true, id };
}

// DEFAULT INITIAL SECURITY SETTINGS OBJECT
function getDefaultSecuritySettings(email) {
  return {
    userEmail: email,
    twoFactorEnabled: true,
    twoFactorMethod: 'authenticator',
    autoExpiry90Days: false,
    alertNewLogin: true,
    alertSecurityChanges: true,
    alertApiKeyGen: true,
    ipWhitelistInput: '103.24.12.8, 192.168.1.*',
    activeSessionsList: [
      { id: 1, device: 'Chrome on Linux (Ubuntu 24.04)', location: 'Kolkata, IN', ip: '103.24.12.8', lastActive: 'Active Now (Current Session)', isCurrent: true, type: 'desktop' },
      { id: 2, device: 'DigiToomasha Mobile App (iOS 17.5)', location: 'Mumbai, IN', ip: '49.36.120.1', lastActive: '14 minutes ago', isCurrent: false, type: 'mobile' },
      { id: 3, device: 'Safari on macOS Sonoma', location: 'San Francisco, US', ip: '192.168.1.42', lastActive: '2 days ago', isCurrent: false, type: 'desktop' }
    ],
    loginHistoryList: [
      { id: 101, timestamp: 'Today, 12:44 PM', browser: 'Chrome 127 / Linux x86_64', location: 'Kolkata, IN', ip: '103.24.12.8', status: 'Success' },
      { id: 102, timestamp: 'Yesterday, 04:15 PM', browser: 'Mobile App / iOS 17.5', location: 'Mumbai, IN', ip: '49.36.120.1', status: 'Success' },
      { id: 103, timestamp: 'Aug 11, 2026 09:30 AM', browser: 'Firefox 128 / Windows 11', location: 'Delhi, IN', ip: '182.74.5.12', status: 'Failed Attempt' },
      { id: 104, timestamp: 'Aug 10, 2026 02:10 PM', browser: 'Safari 17 / macOS', location: 'San Francisco, US', ip: '192.168.1.42', status: 'Success' },
      { id: 105, timestamp: 'Aug 08, 2026 07:22 PM', browser: 'Chrome 126 / Android 14', location: 'Kolkata, IN', ip: '103.24.12.8', status: 'Success' }
    ]
  };
}

async function getSecuritySettings(email) {
  const store = readStore();
  if (!store.security_settings) {
    store.security_settings = {};
  }
  const key = email.toLowerCase();
  if (!store.security_settings[key]) {
    store.security_settings[key] = getDefaultSecuritySettings(email);
    writeStore(store);
  }
  return store.security_settings[key];
}

async function updateSecuritySettings(email, updateData) {
  const store = readStore();
  if (!store.security_settings) {
    store.security_settings = {};
  }
  const key = email.toLowerCase();
  const current = store.security_settings[key] || getDefaultSecuritySettings(email);
  store.security_settings[key] = {
    ...current,
    ...updateData,
    userEmail: email
  };
  writeStore(store);
  return store.security_settings[key];
}

async function revokeSession(email, sessionId) {
  const settings = await getSecuritySettings(email);
  settings.activeSessionsList = settings.activeSessionsList.filter(s => String(s.id) !== String(sessionId));
  await updateSecuritySettings(email, { activeSessionsList: settings.activeSessionsList });
  return settings.activeSessionsList;
}

async function revokeAllOtherSessions(email) {
  const settings = await getSecuritySettings(email);
  settings.activeSessionsList = settings.activeSessionsList.filter(s => s.isCurrent);
  await updateSecuritySettings(email, { activeSessionsList: settings.activeSessionsList });
  return settings.activeSessionsList;
}

async function addLoginHistoryLog(email, logItem) {
  const settings = await getSecuritySettings(email);
  const newLog = {
    id: Date.now(),
    timestamp: 'Just Now',
    browser: logItem.browser || 'Unknown Device',
    location: logItem.location || 'Unknown Location',
    ip: logItem.ip || '127.0.0.1',
    status: logItem.status || 'Success'
  };
  settings.loginHistoryList.unshift(newLog);
  if (settings.loginHistoryList.length > 20) {
    settings.loginHistoryList = settings.loginHistoryList.slice(0, 20);
  }
  await updateSecuritySettings(email, { loginHistoryList: settings.loginHistoryList });
  return settings.loginHistoryList;
}

async function getGlobalSecurityAudits() {
  const store = readStore();
  const allUsers = store.users || [];
  const settingsObj = store.security_settings || {};
  let total2faEnabled = 0;

  allUsers.forEach(u => {
    const sec = settingsObj[u.email.toLowerCase()];
    if (sec && sec.twoFactorEnabled) {
      total2faEnabled++;
    } else if (!sec) {
      total2faEnabled++; // Default 2FA is active
    }
  });

  return {
    totalUsers: allUsers.length,
    usersWith2FA: total2faEnabled,
    adoptionRate: Math.round((total2faEnabled / (allUsers.length || 1)) * 100),
    activeSecurityThreats: 0,
    systemSecurityHealth: 'Optimal',
    recentAuditLogs: [
      { id: 'aud-1', user: 'alex.morgan@company.com', event: '2FA Auth Verified', ip: '103.24.12.8', status: 'Success', time: '10 mins ago' },
      { id: 'aud-2', user: 'admin@digitoomasha.com', event: 'Corporate IP Rule Modified', ip: '192.168.1.1', status: 'Success', time: '1 hour ago' },
      { id: 'aud-3', user: 'david.vance@apexretail.io', event: 'Password Policy Evaluation', ip: '182.74.5.12', status: 'Passed', time: '3 hours ago' }
    ]
  };
}

module.exports = {
  pool,
  findUserByEmail,
  createUser,
  getAllUsers,
  updateUserProfile,
  updateUserStatus,
  deleteUser,
  createInquiry,
  getAllInquiries,
  updateInquiryStatus,
  getAllContacts,
  createContact,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getAllBudgets,
  createBudget,
  getAllIntegrations,
  toggleIntegration,
  getAllSocialPosts,
  createSocialPost,
  updateSocialPost,
  deleteSocialPost,
  createClientTemplate,
  getClientTemplatesByEmail,
  getPendingClientTemplates,
  getAllClientTemplates,
  approveClientTemplate,
  getSecuritySettings,
  updateSecuritySettings,
  revokeSession,
  revokeAllOtherSessions,
  addLoginHistoryLog,
  getGlobalSecurityAudits,
};

