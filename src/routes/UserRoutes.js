const express = require("express");

const { 
    getUserProfile,
    updateUser,
    deleteUser,
    allocateRole,
    revokeRole,
 } = require("../controllers/UserController");
const { ModifiedPathsSnapshot } = require("mongoose");

const router = express.Router();

router.get('/profile', getUserProfile);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/allocate-role', allocateRole);
router.post('/revoke-role', revokeRole);


module.exports = router;
