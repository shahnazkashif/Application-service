const mongoose = require('mongoose');

const ProfessionalSchema = new mongoose.Schema({
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },

  professionalDetails: {
    workLocation:  { type: mongoose.Schema.Types.ObjectId, ref: 'lookups'  }, //where lookuptype='Station'
    otherWorkLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'lookups'}, //where lookuptype='Station',
    workLocationPhone: String,
    grade: { type: mongoose.Schema.Types.ObjectId, ref: 'lookups', required: true }, //where lookuptype='Ranks'
    otherGrade: { type: mongoose.Schema.Types.ObjectId, ref: 'lookups', required: true }, //where lookuptype='Ranks',
    primarySection: String,
    secondarySection: String,
    otherSection: String,
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'lookups' }, //where lookuptype='Districts'
    primarySection: String,
    regionId: { type: mongoose.Schema.Types.ObjectId, ref: 'lookups'  }, //where lookuptype='Divisions',
    pensionNo: String,
    studyLocation: { type: mongoose.Schema.Types.ObjectId, ref: 'lookups'},
    graduationDate: { type: String, match: /^\d{2}\/\d{2}\/\d{4}$/ },
  },

   meta: {
        createdAt: { type: String, default: () => new Date().toLocaleDateString('en-GB') },
        updatedAt: { type: String },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        deleted: { type: Boolean, default: false },
        isActive:  { type: Boolean, default: true  },
      }
 
}, { timestamps: false });

module.exports = mongoose.model('Profile_Professionaldetails', ProfessionalSchema);
