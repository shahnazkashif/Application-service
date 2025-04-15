const Personaldetails  = require('../models/application/personaldetails');
const { validationResult } = require('express-validator');

// Create a new application
const createApplication = async (req, res) => {   
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {

    const newApp = new Personaldetails(req.body);
   // const newApp = new Application({ ...req.body, user: req.user?.user });

    const savedApp = await newApp.save();
    res.status(201).json(savedApp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all applications with optional filters
const getAllApplications =  async (req, res) => {
  try {
    const filter = {
      ...(req.query.gender && { gender: req.query.gender }),
      ...(req.query.isActive && { isActive: req.query.isActive === 'true' }),
      ...(req.query.isDelete && { isDelete: req.query.isDelete === 'false' }),
    };

    //const apps = await Personaldetails.find(filter).sort({ createdAt: -1 });
    // api call with filters: GET /api/applications?gender=male&isActive=true
    const apps = await Personaldetails.find({});

    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get application by ID
const getApplicationById = async (req, res) => {
  try {
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ error: 'Not found' });
    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update application
const updateApplication = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updated = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Soft-delete
const softDeleteApplication = async (req, res) => {
  try {
    const deleted = await Application.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { new: true }
    );
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Soft-deleted', deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createApplication,
  getAllApplications,
  getApplicationById, 
  updateApplication,
  softDeleteApplication
};
