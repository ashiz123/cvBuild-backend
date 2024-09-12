const {body} = require('express-validator');


const validateQualification = [
    body('qualifications')
    .isArray({ min: 1 }).withMessage('Qualifications must be an array and contain at least one item'),

    body('qualifications.*.university')
      .notEmpty().withMessage('University field is required')
      .isString().withMessage('University must be a string'),

    body('qualifications.*.field_of_study')
      .notEmpty().withMessage('Field of study is required')
      .isString().withMessage('Field of study must be a string'),


    body('qualifications.*.completed_from')
    .notEmpty().withMessage('Completed from is required')
    .isString().withMessage('Completed from must be a string'),

    body('qualifications.*.level')
    .notEmpty().withMessage('level from is required')
    .isString().withMessage('level must be a string'),

    body('qualifications.*.detail')
    .notEmpty().withMessage('detail is required')
    .isString().withMessage('detail from must be a string')

]



module.exports = validateQualification;