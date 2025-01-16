const express = require("express");
const { 
    createUser,
    getUserProfile,
    updateUser,
    deleteUser,
    allocateRole,
    revokeRole,
 } = require("../controllers/UserController");
const { userMiddleware } = require("../middleware/UserMiddleware"); 

const router = express.Router();

router.post('/user', createUser)
router.get('/profile', userMiddleware, getUserProfile);
router.put('/user/:id', userMiddleware, updateUser);
router.delete('/user/:id', userMiddleware, deleteUser);
router.post('/allocate-role', allocateRole);
router.post('/revoke-role', revokeRole);


module.exports = router;
