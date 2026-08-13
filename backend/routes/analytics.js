const express = require('express');
const router = express.Router();
const { getAllUsers, getAllInquiries, getAllBudgets, getAllContacts } = require('../db/db');

// GET /api/analytics - Overall platform telemetry & summary metrics
router.get('/analytics', async (req, res) => {
  try {
    const users = await getAllUsers();
    const inquiries = await getAllInquiries();
    const budgets = await getAllBudgets();
    const contacts = await getAllContacts();

    const totalBudgetSpent = budgets.reduce((acc, b) => acc + (parseFloat(b.spent_to_date || b.spentToDate || 0)), 0);

    return res.json({
      success: true,
      metrics: {
        totalUsers: users.length,
        totalInquiries: inquiries.length,
        totalContacts: contacts.length,
        totalBudgetsCount: budgets.length,
        totalBudgetSpent,
        systemHealth: '100% Operational',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('Get Analytics Error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching analytics.' });
  }
});

module.exports = router;
