//Auth controller will handle registration and login

const mongoose = require("mongoose");
const User = require("../module/User");
const bcrypt = require("bcrypt");
const jwt = require("../jwtFunctions");
const handleError = require("../utils/errorHandler");

//User registration
const registerUser = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { firstName, lastName, email, password } = req.body;

        console.log("Starting user registration: ", { firstName, lastName, email });

        //Check if user already exists
        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "User already exists" });
        }

        //new user instance
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

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration: ", error.message);
        await session.abortTransaction();
        session.endSession();
        handleError(res, error);
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

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("")
        handleError(res, error);
    }
};

module.exports = {
    registerUser,
    loginUser,
}