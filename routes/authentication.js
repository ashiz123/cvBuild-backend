var express = require('express');
var router = express.Router();
const upload = require('../middlewares/upload');
const {verifyToken} = require('../middlewares/verifyToken');
const {login, register, getLoggedInUser} = require('../controllers/authController');
const {storeCv} = require('../controllers/cvController');


//testing push
// authentication
router.post('/register', upload.none(),register);
router.post('/login',upload.none(), login )
router.get('/user', verifyToken, getLoggedInUser);

//
  



  









module.exports = router;
