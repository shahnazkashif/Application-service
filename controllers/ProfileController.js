const Profile = require('../models/application/db_personaldetails');
const { validationResult } = require('express-validator');

// Create Profile
const createProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    //const profile = new Profile({ ...req.body, createdBy: req.user?.userId });
        const profile = new Profile({ ...req.body });
        const saved = await profile.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Profiles (with optional filters)
const getAllProfiles = async (req, res) => {
  try {
    const filter = {
      ...(req.query.gender && { 'personalInfo.gender': req.query.gender }),
      ...(req.query.isActive && { 'meta.isActive': req.query.isActive === 'true' }),
      ...(req.query.deleted && { 'meta.deleted': req.query.deleted === 'true' }),
      ...(req.query.surname && { 'personalInfo.surname': new RegExp(req.query.surname, 'i') })
    };
    const profiles = await Profile.find(filter).sort({ 'meta.createdAt': -1 });
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Profile by ID
const getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Profile by ID
const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) 
    {
        console.log(errors.array()); // Add this for debugging
        return res.status(400).json({ errors: errors.array() });
    }
    //return res.status(400).json({ errors: errors.array() });

  try {
    const updated = await Profile.findByIdAndUpdate(
      req.params.id,
      { ...req.body, 'meta.updatedBy': req.user?.userId },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Profile not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Soft Delete
const softDeleteProfile = async (req, res) => {
  try {
   // console.log(`Deleting ID: ${req.params.id}`);
    const updated = await Profile.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            'meta.deleted': true,
            'meta.isActive': false,
            'meta.updatedAt': new Date().toLocaleDateString('en-GB'),
            'meta.updatedBy': req.user?.userId || null
          }
        },
        { new: true }
    );
        
    if (!updated) return res.status(404).json({ error: 'Profile not found' });
    res.json({ message: 'Profile soft-deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Restore Profile
const restoreProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Profile.findByIdAndUpdate(
        id,
        {
          $set: {
            'meta.deleted': false,
            'meta.isActive': true,
            'meta.updatedAt': new Date().toLocaleDateString('en-GB'),
            'meta.updatedBy': req.user?.userId || null
          }
        },
        { new: true }
      );

    if (!updated) return res.status(404).json({ error: 'Profile not found' });
    res.json({ message: 'Profile restored' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Toggle isActive
const toggleStatus = async (req, res) => {
  try {
    const { id } = req.params;
  const { isActive } = req.body;

  if (typeof isActive !== 'boolean') {
    return res.status(400).json({ error: '`isActive` must be a boolean value' });
  }
    const updated = await Profile.findByIdAndUpdate(
        id,
      {
        $set: {
          'meta.isActive': isActive,
          'meta.updatedAt': new Date().toLocaleDateString('en-GB'),
          'meta.updatedBy': req.user?.userId || null
        }
      },
      { new: true }
    );

    if (!updated) {
        return res.status(404).json({ error: 'Profile not found' });
      }
    res.json({ message: `Profile status updated to ${isActive}`, profile: updated });
   
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createProfile,
  getAllProfiles,
  getProfileById,
  updateProfile,
  softDeleteProfile,
  restoreProfile,
  toggleStatus,
};
