const express = require('express')
const {add_admins,get_admin, change_admin,delete_admin,blocked_admin} = require('../controllers/admin');
const { route } = require('./auth_routes');
const router = express.Router();
router.put('/addAdmin',add_admins);
router.get('/getAdmin',get_admin);
router.put('/changeInfoAdmin',change_admin);
router.delete('/deleteAdmin',delete_admin);
router.put('/blocked_admin',blocked_admin);
module.exports = router;

