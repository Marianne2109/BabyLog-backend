const express = require("express");
const { 
    createUser,
    getUserProfile,
    updateUser,
    deleteUser,
    allocateRole,
    revokeRole,
 } = require("../controllers/UserController");

const router = express.Router();

router.post('/user', createUser)
router.get('/profile', getUserProfile);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/allocate-role', allocateRole);
router.post('/revoke-role', revokeRole);


module.exports = router;
