const express = require("express");

const { 
    registerUser, 
    loginUser,
 } = require("../controllers/AuthController");

const { handleError } = require("../utils/errorHandler");
const router = express.Router();

 
router.post("/register", registerUser);
router.post("/login", loginUser);


module.exports = router;