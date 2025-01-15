const jwtFunctions = require("../utils/jwtFunctions");
const User = require("../models/UserModel");

//Validate JWT and add info to the request
const userMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    console.log("Authorization header received:", token);

    if (!token) {
        console.log("Missing authorization header");
        return res.status(401).json({ message: "Access denied: No token provided" });
    }

    try {
        //if token starts with Bearer
        if (!token.startWith("Bearer ")) {
            console.log("Invalid token format");
            return res.status(400).json({ message: "Invalid token format. Expected 'Bearer <token>'"});
        }
        //Extract token
        const tokenValue = token.split(" ")[1];
        console.log("Extracted token:", tokenValue);

        if(!tokenValue) {
            console.log("Token missing after 'Bearer'");
            return res.status(400).json({ message: "Token missing after 'Bearer'"});
        }
        // console.log("Auth header received:", token);

        //Verify the token
        // const verified = jwtFunctions.verifyToken(token.split(" ")[1]);
        // if (!verified) {
        //     console.log("token  not valid");
        //     return res.status(401).json({ message: "Invalid token" });
        // }

        const verified = jwtFunctions.verifyToken(tokenValue);
        console.log("Token verified successfully:", verified);
        
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