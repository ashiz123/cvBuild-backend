const {body} = require('express-validator');


const validatePersonalInfo =  [
    // Validate auth
  body('auth.id').isInt().withMessage('Auth ID must be an integer'),
  
  // Validate personalInfo fields
  body('personalInfo.phone').isMobilePhone().withMessage('Phone number must be a valid mobile phone number'),
  body('personalInfo.address').isLength({ min: 5 }).withMessage('Address must be at least 5 characters long'),
  body('personalInfo.jobtitle').isLength({ min: 2 }).withMessage('Job title must be at least 2 characters long'),
  body('personalInfo.profile').isLength({ min: 10 }).withMessage('Profile must be at least 10 characters long'),
  
  
  ]


  module.exports = validatePersonalInfo;