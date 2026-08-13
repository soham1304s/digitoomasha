const express = require('express');
const router = express.Router();
const { getAllIntegrations, toggleIntegration } = require('../db/db');

// GET /api/integrations
router.get('/integrations', async (req, res) => {
  try {
    const integrations = await getAllIntegrations();
    return res.json({ success: true, integrations, total: integrations.length });
  } catch (err) {
    console.error('Get Integrations Error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching integrations.' });
  }
});

// PUT /api/integrations/:id/toggle
router.put('/integrations/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await toggleIntegration(id);

    if (req.io && updated) {
      req.io.emit('integration_updated', {
        id: updated.id,
        name: updated.name,
        status: updated.status,
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    return res.json({
      success: true,
      message: `Integration status toggled to ${updated ? updated.status : 'updated'}.`,
      integration: updated,
    });
  } catch (err) {
    console.error('Toggle Integration Error:', err);
    return res.status(500).json({ success: false, message: 'Server error toggling integration.' });
  }
});

module.exports = router;
