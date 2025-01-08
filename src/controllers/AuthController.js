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

        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
        });

        await newUser.save({ session });
        await session.commitTransaction();
        session.endSession();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        handleError(res, error);
    }
};


//User Login
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');
      if (!user) {
        return res.status(404).json({ message: "Invalid email or password." });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password." });
      }

      const token = jwt.generateToken(user._id, user.email);

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        handleError(res, error);
    }
};

module.exports = {
    registerUser,
    loginUser,
}