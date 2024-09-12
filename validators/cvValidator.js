
const validatePersonalInfo = require('./personalInfoValidator');
const validateQualification = require('./qualifactionValidator');
const validateSkill = require('./skillValidator');
const  validateExperience  = require('./experienceValidator');


const validateCv = [
    ...validateExperience,
    ...validatePersonalInfo,
    ...validateQualification,
    ...validateSkill
]


module.exports = validateCv;