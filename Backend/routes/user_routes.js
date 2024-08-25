const express = require('express')
const {exportUsers,getUserId,updateUser,getAllUser,addUser,deleteUser,countUser} = require('../controllers/user_controllers')



const router = express.Router();


router.get('/api/users/:id',getUserId);
router.put('/api/users/:id',updateUser);
router.post('/api/users',addUser);
router.get('/api/users',getAllUser);
router.delete('/api/users/:id',deleteUser);
router.get('/api/userscount',countUser);
router.get('/api/export', exportUsers);




module.exports = router;