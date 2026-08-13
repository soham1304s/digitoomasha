const express = require('express');
const router = express.Router();
const { getAllBudgets, createBudget } = require('../db/db');

// GET /api/budgets
router.get('/budgets', async (req, res) => {
  try {
    const budgets = await getAllBudgets();
    return res.json({ success: true, budgets, total: budgets.length });
  } catch (err) {
    console.error('Get Budgets Error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching budgets.' });
  }
});

// POST /api/budgets
router.post('/budgets', async (req, res) => {
  try {
    const { campaignName, channel, allocatedBudget, dailyCap } = req.body;

    if (!campaignName) {
      return res.status(400).json({ success: false, message: 'Campaign name is required.' });
    }

    const budget = await createBudget({
      campaignName,
      channel,
      allocatedBudget,
      dailyCap,
    });

    if (req.io) {
      req.io.emit('budget_updated', {
        id: budget.id,
        campaignName: budget.campaign_name,
        allocatedBudget: budget.allocated_budget,
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Campaign budget allocated successfully.',
      budget,
    });
  } catch (err) {
    console.error('Create Budget Error:', err);
    return res.status(500).json({ success: false, message: 'Server error allocating budget.' });
  }
});

module.exports = router;
