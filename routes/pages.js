const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/verifyToken');
const {personalInformation, userExperiences, userQualifications, userSkills} = require('../controllers/profileController');


router.get('/profile', verifyToken, (req, res) => {
  res.send('this is profile page');
});



router.get('/profile/personal_details',  verifyToken, personalInformation);
router.get('/profile/qualifications',  verifyToken, userQualifications);
router.get('/profile/experiences',  verifyToken, userExperiences);
router.get('/profile/skills',  verifyToken, userSkills);






  
  
  


  module.exports = router;