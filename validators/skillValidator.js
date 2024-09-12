const {body} = require('express-validator');


const validateSkill = [
body('skills')
  .isArray({min: 1}).withMessage('Skill is required. Atleast one skill is required'),

  body('skills.*.skill_name')
    .notEmpty().withMessage('Skill name is required')
    .isString().withMessage('Skill name should be string'),


]


module.exports = validateSkill;