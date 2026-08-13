const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {
  getSecuritySettings,
  updateSecuritySettings,
  revokeSession,
  revokeAllOtherSessions,
  findUserByEmail,
  updateUserProfile,
  addLoginHistoryLog,
  getGlobalSecurityAudits
} = require('../db/db');

// GET Security Settings for Client
router.get('/security-settings', async (req, res) => {
  try {
    const userEmail = req.query.email || 'alex.morgan@company.com';
    const settings = await getSecuritySettings(userEmail);
    res.json({ success: true, settings });
  } catch (err) {
    console.error('Error fetching security settings:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve security settings.' });
  }
});

// PUT / UPDATE Security Settings
router.put('/security-settings', async (req, res) => {
  try {
    const userEmail = req.body.email || 'alex.morgan@company.com';
    const updatedSettings = await updateSecuritySettings(userEmail, req.body);

    // Emit real-time Socket.IO notification
    if (req.io) {
      req.io.emit('security_settings_updated', {
        userEmail,
        timestamp: new Date().toISOString(),
        settings: updatedSettings
      });
    }

    res.json({ success: true, message: 'Security settings updated successfully.', settings: updatedSettings });
  } catch (err) {
    console.error('Error updating security settings:', err);
    res.status(500).json({ success: false, message: 'Failed to update security settings.' });
  }
});

// POST Revoke Session
router.post('/security/revoke-session', async (req, res) => {
  try {
    const { email = 'alex.morgan@company.com', sessionId } = req.body;
    const remainingSessions = await revokeSession(email, sessionId);

    if (req.io) {
      req.io.emit('session_revoked', { email, sessionId, timestamp: new Date().toISOString() });
    }

    res.json({ success: true, message: 'Session revoked successfully.', activeSessions: remainingSessions });
  } catch (err) {
    console.error('Error revoking session:', err);
    res.status(500).json({ success: false, message: 'Failed to revoke session.' });
  }
});

// POST Terminate All Other Sessions
router.post('/security/revoke-all-sessions', async (req, res) => {
  try {
    const { email = 'alex.morgan@company.com' } = req.body;
    const currentSessionOnly = await revokeAllOtherSessions(email);

    if (req.io) {
      req.io.emit('all_sessions_revoked', { email, timestamp: new Date().toISOString() });
    }

    res.json({ success: true, message: 'All remote sessions terminated.', activeSessions: currentSessionOnly });
  } catch (err) {
    console.error('Error revoking all sessions:', err);
    res.status(500).json({ success: false, message: 'Failed to terminate remote sessions.' });
  }
});

// POST Change Account Password
router.post('/security/change-password', async (req, res) => {
  try {
    const { email = 'alex.morgan@company.com', currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ success: false, message: 'Current and new password are required.' });
    }

    if (newPassword.length < 12) {
      return res.status(400).json({ success: false, message: 'Password must be at least 12 characters long according to enterprise policy.' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found.' });
    }

    const isMatch = bcrypt.compareSync(currentPassword, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password provided is incorrect.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const newHash = bcrypt.hashSync(newPassword, salt);
    await updateUserProfile(email, { password_hash: newHash });

    // Append log to Login History / Audit Trail
    await addLoginHistoryLog(email, {
      browser: 'Password Security Rotation',
      ip: '103.24.12.8',
      location: 'Kolkata, IN',
      status: 'Success'
    });

    if (req.io) {
      req.io.emit('security_alert', {
        type: 'PASSWORD_CHANGED',
        userEmail: email,
        timestamp: new Date().toISOString()
      });
    }

    res.json({ success: true, message: 'Account password updated successfully!' });
  } catch (err) {
    console.error('Error changing password:', err);
    res.status(500).json({ success: false, message: 'Failed to update account password.' });
  }
});

// GET Global Admin Security Audit Telemetry
router.get('/admin/security-audits', async (req, res) => {
  try {
    const auditData = await getGlobalSecurityAudits();
    res.json({ success: true, auditData });
  } catch (err) {
    console.error('Error fetching admin security audits:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve admin security audits.' });
  }
});

module.exports = router;
