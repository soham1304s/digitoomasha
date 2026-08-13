const express = require('express');
const router = express.Router();
const { getAllContacts, createContact } = require('../db/db');

// GET /api/contacts
router.get('/contacts', async (req, res) => {
  try {
    const contacts = await getAllContacts();
    return res.json({ success: true, contacts, total: contacts.length });
  } catch (err) {
    console.error('Get Contacts Error:', err);
    return res.status(500).json({ success: false, message: 'Server error fetching contacts.' });
  }
});

// POST /api/contacts
router.post('/contacts', async (req, res) => {
  try {
    const { name, email, phone, company, role, location, segment, leadScore, ltv, ordersCount, acquisitionSource, tags } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Contact Name and Email are required.' });
    }

    const contact = await createContact({
      name,
      email,
      phone,
      company,
      role,
      location,
      segment,
      leadScore,
      ltv,
      ordersCount,
      acquisitionSource,
      tags,
    });

    if (req.io) {
      req.io.emit('contact_created', {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        company: contact.company,
        timestamp: new Date().toLocaleTimeString(),
      });
    }

    return res.status(201).json({
      success: true,
      message: 'CRM contact created successfully.',
      contact,
    });
  } catch (err) {
    console.error('Create Contact Error:', err);
    return res.status(500).json({ success: false, message: 'Server error creating contact.' });
  }
});

module.exports = router;
