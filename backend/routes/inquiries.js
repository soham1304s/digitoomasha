const express = require('express');
const router = express.Router();
const { createInquiry, getAllInquiries, updateInquiryStatus } = require('../db/db');

// POST /api/inquiries - Submit Contact Proposal Request
router.post('/inquiries', async (req, res) => {
  try {
    const { name, email, phone, company, budget, services, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and Email are required.' });
    }

    const inquiry = await createInquiry({
      name,
      email,
      phone,
      company,
      budget,
      services,
      message,
    });

    // Broadcast live Socket.IO event to Admin Dashboard
    if (req.io) {
      req.io.emit('new_inquiry', {
        id: inquiry.id,
        name: inquiry.name,
        email: inquiry.email,
        company: inquiry.company || 'Direct Client',
        budget: inquiry.budget,
        services: inquiry.services,
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Proposal request submitted successfully.',
      inquiry,
    });
  } catch (err) {
    console.error('Create Inquiry Error:', err);
    return res.status(500).json({ success: false, message: 'Server error processing proposal request.' });
  }
});

// GET /api/inquiries - Get all proposal inquiries (Admin pipeline)
router.get('/inquiries', async (req, res) => {
  try {
    const inquiries = await getAllInquiries();
    return res.json({ success: true, inquiries, total: inquiries.length });
  } catch (err) {
    console.error('Get Inquiries Error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching inquiries.' });
  }
});

// PUT /api/inquiries/:id/status - Update Inquiry Status (Admin)
router.put('/inquiries/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required.' });
    }

    const updated = await updateInquiryStatus(id, status);

    if (req.io && updated) {
      req.io.emit('inquiry_status_updated', {
        id: updated.id,
        name: updated.name,
        status: updated.status,
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    return res.json({
      success: true,
      message: `Inquiry status updated to ${status}.`,
      inquiry: updated,
    });
  } catch (err) {
    console.error('Update Inquiry Status Error:', err);
    return res.status(500).json({ success: false, message: 'Server error updating inquiry status.' });
  }
});

module.exports = router;

