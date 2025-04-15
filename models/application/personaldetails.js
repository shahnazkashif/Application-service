// models/Application.js
const mongoose = require('mongoose');

const personaldetailsSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: [true, 'Surname is required'],
    trim: true,
    minlength: 2
  },
  forename: {
    type: String,
    required: [true, 'Forename is required'],
    trim: true,
    minlength: 2
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['male', 'female', 'other']
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is fff required'],
    validate: {
      validator: function (value) {
        return value < new Date();
      },
      message: 'Date of birth must be in the past'
    }
  },
  mobilenumber: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^\+?[0-9]{7,15}$/, 'Enter a valid mobile number']
  },
  personalemailaddress: {
    type: String,
    match: [/.+\@.+\..+/, 'Enter a valid personal email address']
  },
  workemailaddress: {
    type: String,
    match: [/.+\@.+\..+/, 'Enter a valid work email address']
  },
  preferredemail: {
    type: String,
    enum: ['personal', 'work']
  },
  countryofprimarynursing: {
    type: String,
    trim: true
  },
  eircode: {
    type: String,
    match: [/^[A-Za-z0-9]{3,10}$/, 'Enter a valid Eircode']
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('App-PersonalDetails', personaldetailsSchema);
