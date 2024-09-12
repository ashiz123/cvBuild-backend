const {body}  = require('express-validator');

const validateExperience = [
    body('jsonExperiences')
      .isArray({min : 1}).withMessage('Atleast one experience is required')
     ]


module.exports = validateExperience;