const express = require('express');
const router = express.Router();
const { authenticateToken } = require('./auth');
const {
  createClientTemplate,
  getClientTemplatesByEmail,
  getPendingClientTemplates,
  getAllClientTemplates,
  approveClientTemplate,
} = require('../db/db');

// POST /api/templates - Client submits a custom template request
router.post('/templates', authenticateToken, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'client') {
      return res.status(403).json({ success: false, message: 'Only authenticated clients can submit templates.' });
    }

    const {
      title,
      category,
      industry,
      description,
      techStack,
      thumbnail,
      clientEmail,
    } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ success: false, message: 'Title, category, and description are required.' });
    }

    const template = await createClientTemplate({
      title,
      category,
      industry,
      description,
      techStack,
      thumbnail,
      clientEmail: clientEmail || req.user.email,
      status: 'pending',
    });

    if (!template) {
      return res.status(500).json({ success: false, message: 'Failed to submit template request.' });
    }

    if (req.io) {
      req.io.emit('client_template_submitted', template);
    }

    return res.status(201).json({ success: true, template, message: 'Template request submitted successfully.' });
  } catch (err) {
    console.error('Create Client Template Error:', err);
    return res.status(500).json({ success: false, message: 'Server error while submitting template request.' });
  }
});

// GET /api/client/templates - Client gets their approved templates
router.get('/client/templates', authenticateToken, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'client') {
      return res.status(403).json({ success: false, message: 'Only authenticated clients can view their templates.' });
    }

    const templates = await getClientTemplatesByEmail(req.user.email);
    return res.json({ success: true, templates, total: templates.length });
  } catch (err) {
    console.error('Get Client Templates Error:', err);
    return res.status(500).json({ success: false, message: 'Server error while fetching client templates.' });
  }
});

// GET /api/templates/pending - Admin sees pending client template requests
router.get('/templates/pending', authenticateToken, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only administrators can view pending template requests.' });
    }

    const templates = await getPendingClientTemplates();
    return res.json({ success: true, templates, total: templates.length });
  } catch (err) {
    console.error('Get Pending Templates Error:', err);
    return res.status(500).json({ success: false, message: 'Server error while fetching pending template requests.' });
  }
});

// PUT /api/templates/:id/approve - Admin approves client template
router.put('/templates/:id/approve', authenticateToken, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only administrators can approve templates.' });
    }

    const { id } = req.params;
    const { adminNotes } = req.body;

    const template = await approveClientTemplate(id, req.user.email, adminNotes);
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template request not found.' });
    }

    if (req.io) {
      req.io.emit('client_template_approved', template);
    }

    return res.json({ success: true, template, message: 'Template request approved successfully.' });
  } catch (err) {
    console.error('Approve Client Template Error:', err);
    return res.status(500).json({ success: false, message: 'Server error while approving template request.' });
  }
});

// GET /api/admin/templates - Admin sees all client templates
router.get('/admin/templates', authenticateToken, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only administrators can view client templates.' });
    }

    const templates = await getAllClientTemplates();
    return res.json({ success: true, templates, total: templates.length });
  } catch (err) {
    console.error('Get All Client Templates Error:', err);
    return res.status(500).json({ success: false, message: 'Server error while fetching client templates.' });
  }
});

module.exports = router;
