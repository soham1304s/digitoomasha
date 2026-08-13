const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const https = require('https');
const { findUserByEmail, createUser, getAllUsers, updateUserProfile, updateUserStatus, deleteUser } = require('../db/db');

const JWT_SECRET = process.env.JWT_SECRET || 'digitoomasha_super_secret_jwt_key_2026';

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Token Required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or Expired Token' });
    req.user = user;
    next();
  });
}


// POST /api/register (Multi-Step Sign Up)
router.post('/register', async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      companyName,
      jobTitle,
      country,
      city,
      businessName,
      businessWebsite,
      businessCategory,
      industry,
      employeesCount,
      monthlyBudget,
      businessGoals,
      password,
    } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: 'Full Name, Email, and Password are required.' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await createUser({
      fullName,
      email,
      phone,
      companyName,
      jobTitle,
      country,
      city,
      businessName: businessName || companyName,
      businessWebsite,
      businessCategory,
      industry,
      employeesCount,
      monthlyBudget,
      businessGoals,
      passwordHash,
      role: email.includes('admin') ? 'admin' : 'client',
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // Broadcast Live Socket Event to Admin Dashboard
    if (req.io) {
      const liveUserEvent = {
        id: newUser.id,
        fullName: newUser.full_name,
        email: newUser.email,
        businessName: newUser.business_name || newUser.company_name || 'Individual',
        monthlyBudget: newUser.monthly_budget || 'Unspecified',
        timestamp: new Date().toLocaleTimeString(),
      };
      req.io.emit('user_registered', liveUserEvent);
      req.io.emit('stats_updated', await getStatsSummary());
    }

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: {
        id: newUser.id,
        name: newUser.full_name,
        email: newUser.email,
        phone: newUser.phone,
        businessName: newUser.business_name,
        role: newUser.role,
        avatar: newUser.avatar || '',
      },
    });
  } catch (err) {
    console.error('Registration API Error:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// POST /api/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and Password are required.' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    if (user.status === 'Suspended') {
      return res.status(403).json({ message: 'Account Suspended: Access has been disabled by agency administrator.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    // Broadcast Live Socket Event to Admin Dashboard
    if (req.io) {
      const liveLoginEvent = {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        timestamp: new Date().toLocaleTimeString(),
      };
      req.io.emit('user_logged_in', liveLoginEvent);
    }

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        businessName: user.business_name,
        role: user.role,
        avatar: user.avatar || '',
      },
    });
  } catch (err) {
    console.error('Login API Error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// GET /api/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await findUserByEmail(req.user.email);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      user: {
        id: user.id,
        name: user.full_name,
        email: user.email,
        phone: user.phone,
        businessName: user.business_name,
        role: user.role,
        avatar: user.avatar || '',
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/user/profile (Update Profile & Avatar)
router.put('/user/profile', async (req, res) => {
  try {
    const { email, avatar, fullName, phone, jobTitle } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'User email required' });
    }

    const updateData = {};
    if (avatar !== undefined) updateData.avatar = avatar;
    if (fullName !== undefined) updateData.full_name = fullName;
    if (phone !== undefined) updateData.phone = phone;
    if (jobTitle !== undefined) updateData.job_title = jobTitle;

    const updatedUser = await updateUserProfile(email, updateData);

    return res.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    console.error('Update Profile Error:', err);
    res.status(500).json({ message: 'Server error updating profile' });
  }
});

// GET /api/admin/users (Admin Data Feed)
router.get('/admin/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({ users, total: users.length });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});

// PUT /api/admin/users/:id/status (Toggle Suspend/Active)
router.put('/admin/users/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Active', 'Suspended'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status provided.' });
    }

    const updatedUser = await updateUserStatus(id, status);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.io) {
      req.io.emit('user_status_changed', { id: updatedUser.id, status: updatedUser.status });
    }

    res.json({ success: true, message: `Client status updated to ${status}`, user: updatedUser });
  } catch (err) {
    console.error('Update User Status Error:', err);
    res.status(500).json({ message: 'Server error updating user status' });
  }
});

// DELETE /api/admin/users/:id (Remove Client)
router.delete('/admin/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found or already deleted' });
    }

    if (req.io) {
      req.io.emit('user_deleted', { id });
    }

    res.json({ success: true, message: 'Client removed successfully', id });
  } catch (err) {
    console.error('Delete User Error:', err);
    res.status(500).json({ message: 'Server error deleting user' });
  }
});

// Helper for summary stats
async function getStatsSummary() {
  const users = await getAllUsers();
  return {
    totalUsers: users.length,
    activeClients: users.filter((u) => u.role === 'client').length,
    timestamp: new Date().toLocaleTimeString(),
  };
}

router.authenticateToken = authenticateToken;
module.exports = router;
