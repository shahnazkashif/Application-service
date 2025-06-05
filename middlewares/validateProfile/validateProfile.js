// middlewares/validateProfile/validateProfile.js
const personalInfoRules = require('./validatePersonalInfo');
const contactInfoRules = require('./validateContactInfo');
const extrasRules = require('./validateExtras');

module.exports = [
  ...personalInfoRules,
  ...contactInfoRules,
  ...extrasRules,
];
