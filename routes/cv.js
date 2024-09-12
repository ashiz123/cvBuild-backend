var express = require('express');
var router = express.Router();
const upload = require('../middlewares/upload');
const {verifyToken} = require('../middlewares/verifyToken');
const {storeCv} = require('../controllers/cvController');
const {getAllCv} = require('../controllers/cvController');

//this is the validation use for creating cv. where validate cv validates, and validateRequest throw the response of validation.
const validateCv = require('../validators/cvValidator');
const validateRequest = require('../middlewares/validateRequest');




router.post('/store', 
    upload.none(),
    validateCv,
    validateRequest,
    storeCv
);


router.get('/getAll', verifyToken,  getAllCv);



module.exports = router;