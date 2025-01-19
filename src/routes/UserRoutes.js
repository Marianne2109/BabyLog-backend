const express = require("express");
const { 
    createUser,
    getUserProfile,
    getAllUsers,
    updateUser,
    deleteUser,
    allocateRole,
    revokeRole,
 } = require("../controllers/UserController");
const { userMiddleware } = require("../middleware/UserMiddleware"); 

const router = express.Router();

router.post("/", createUser)
router.get("/profile", userMiddleware, getUserProfile);
router.get("/", getAllUsers);
router.put("/:id", userMiddleware, updateUser);
router.delete("/:id", userMiddleware, deleteUser);
router.post("/allocate-role", allocateRole);
router.post("/revoke-role", revokeRole);


module.exports = router;
