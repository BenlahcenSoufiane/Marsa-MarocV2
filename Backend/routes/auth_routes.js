
const express = require('express')
const {signup,login} = require('../controllers/admin_controllers')



const router = express.Router();




router.post('/login',login)

module.exports = router;