const jwtFunctions = require("../utils/jwtFunctions");
const User = require("../models/UserModel");

//Validate JWT and add info to the request
const userMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        console.log("Missing authorization header");
        return res.status(401).json({ message: "Access denied" });
    }

    try {
        console.log("Auth header received:", token);

        //Verify the token
        const verified = jwtFunctions.verifyToken(token.split(" ")[1]);
        if (!verified) {
            console.log("token  not valid");
            return res.status(401).json({ message: "Invalid token" });
        }

        //Fetch user details
        const user = await User.findById(verified.userId).select("-password");
        if (!user) {
            console.log("User not found for id:", verified.userId);
            return res.status(404).json({ message: "User not found" });
        }

        console.log("user found:", user);

        req.user = user;
        next();
    }   catch (error) {
        console.error("middleware error", error.message);
        res.status(401).json({ message: "Invalid request", error: error.message });
    }
  };

module.exports = {
    userMiddleware,
};