const Professional = require('../models/application/db_professionaldetails');
const { validationResult } = require('express-validator');

// Create
const createProfessional = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const record = new Professional({
      ...req.body,
      meta: {
        createdBy: req.user?.userId,
        createdAt: new Date().toLocaleDateString('en-GB'),
        isActive: true,
        deleted: false,
      }
    });

    const saved = await record.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all
const getAllProfessionals = async (req, res) => {
  try {
    const filter = {
      ...(req.query.profileId && { profileId: req.query.profileId }),
      ...(req.query.isActive && { 'meta.isActive': req.query.isActive === 'true' }),
      ...(req.query.deleted && { 'meta.deleted': req.query.deleted === 'true' }),
    };

    const result = await Professional.find(filter).sort({ 'meta.createdAt': -1 });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
const getProfessionalById = async (req, res) => {
  try {
    const item = await Professional.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
const updateProfessional = async (req, res) => {
  try {
    const updated = await Professional.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        'meta.updatedAt': new Date().toLocaleDateString('en-GB'),
        'meta.updatedBy': req.user?.userId
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Soft delete
const softDeleteProfessional = async (req, res) => {
  try {
    const result = await Professional.findByIdAndUpdate(
      req.params.id,
      { 'meta.deleted': true },
      { new: true }
    );
    if (!result) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Soft deleted', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Restore
const restoreProfessional = async (req, res) => {
  try {
    const result = await Professional.findByIdAndUpdate(
      req.params.id,
      { 'meta.deleted': false },
      { new: true }
    );
    if (!result) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Restored', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Toggle status
const toggleStatus = async (req, res) => {
  try {
    const result = await Professional.findById(req.params.id);
    if (!result) return res.status(404).json({ message: 'Not found' });

    result.meta.isActive = !result.meta.isActive;
    result.meta.updatedAt = new Date().toLocaleDateString('en-GB');
    await result.save();

    res.json({ message: 'Status toggled', status: result.meta.isActive });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    createProfessional,
    getAllProfessionals,
    getProfessionalById,
    updateProfessional,
    softDeleteProfessional,
    restoreProfessional,
    toggleStatus,
    };