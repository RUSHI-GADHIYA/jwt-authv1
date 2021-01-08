var express = require('express');
var router = express.Router();
var auth = require('../middleware/handleuser')
var { savedata, finduser, updateuser, deleteuser, homedata, handlelogin } = require('../controller/control');


router.get('/showuser/:id', finduser)
router.post('/signup', savedata);
router.post('/login', handlelogin)
router.put('/update/:id', updateuser);
router.delete('/delete/:id', deleteuser);


router.get('/home', auth, homedata)
module.exports = router;