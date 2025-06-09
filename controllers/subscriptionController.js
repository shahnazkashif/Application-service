const Subscription = require('../models/application/db_Subscriptiondetails');
const { validationResult } = require('express-validator');

// Create Subscription
const createSubscription = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const newSub = new Subscription({
      ...req.body,
      'meta.createdBy': req.user?.userId
    });
    const saved = await newSub.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get all Subscription
const getAllSubscriptions = async (req, res) => {
  try {
    const filter = {
      ...(req.query.isActive && { 'meta.isActive': req.query.isActive === 'true' }),
      ...(req.query.deleted && { 'meta.deleted': req.query.deleted === 'true' }),
      ...(req.query.profileId && { profileId: req.query.profileId })
    };

    const data = await Subscription.find(filter).sort({ 'meta.createdAt': -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get by id
const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) return res.status(404).json({ error: 'Not found' });
    res.json(subscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }  
};

//update by id
const updateSubscription = async (req, res) => {
    //validationresult required here ?
  try {
    const updateData = {
      ...req.body,
      'meta.updatedBy': req.user?.userId,
      'meta.updatedAt': new Date().toLocaleDateString('en-GB')
    };
    const updated = await Subscription.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }    
};

// Soft Delete
const softDeleteSubscription = async (req, res) => {
  try {
    const updated = await Subscription.findByIdAndUpdate(req.params.id, {
      'meta.deleted': true,
      'meta.updatedBy': req.user?.userId,
      'meta.updatedAt': new Date().toLocaleDateString('en-GB')
    }, { new: true });

    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Subscription soft deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }  
};

// Restore subscription
const restoreSubscription = async (req, res) => {
  try {
    const updated = await Subscription.findByIdAndUpdate(req.params.id, {
      'meta.deleted': false,
      'meta.updatedBy': req.user?.userId,
      'meta.updatedAt': new Date().toLocaleDateString('en-GB')
    }, { new: true });

    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Subscription restored' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }  
};

// Toggle isActive
const toggleSubscriptionStatus = async (req, res) => {
  try {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) return res.status(404).json({ error: 'Not found' });

    subscription.meta.isActive = !subscription.meta.isActive;
    subscription.meta.updatedBy = req.user?.userId;
    subscription.meta.updatedAt = new Date().toLocaleDateString('en-GB');

    await subscription.save();
    res.json({ message: 'Subscription status toggled', isActive: subscription.meta.isActive });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  softDeleteSubscription,
  restoreSubscription,
  toggleSubscriptionStatus,
};
