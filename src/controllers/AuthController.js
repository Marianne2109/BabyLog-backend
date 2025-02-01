//Auth controller will handle registration and login

const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwtFunctions");
// const { handleError } = require("../utils/errorHandler");

//User registration
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    console.log("Starting user registration: ", { firstName, lastName, email });

    //Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        console.log("User already exists: ", email);
        return res.status(400).json({ message: "User already exists" });
        }
    //create new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    console.log("Creating a new user: ", newUser);

    //save new user to the database
    await newUser.save({ session });
    console.log("User saved successfully: ", newUser);

    // Response with user details including user id    
    res.status(201).json({ 
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
     });
    } catch (error) {
      console.error("Error during registration: ", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
};

//User Login
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log("Login attempt for: ", email);

      //find user by email
      const user = await User.findOne({ email }).select('+password');
      if (!user) {

        console.log("Login failed: User not found");
        return res.status(404).json({ message: "Invalid email or password." });
      }

      //compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("Login failed, passwords don't match")
        return res.status(400).json({ message: "Invalid email or password." });
      }

      //Generate token
      const token = jwt.generateToken(user._id, user.email);
      console.log("Login successful: ", {email, token});

      res.status(200).json({
        message: "Login successful", 
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }
      });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
}