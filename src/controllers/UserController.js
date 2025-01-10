//User controller handles fetching and updating user details

const express = require("express");

const { User } = require("../module/User");
const { Role } = require("../module/Role");

const router = express.Router();


//Create user - for seeding and testing purposes.
const createUser = async (req, res) => {
  try {
    const {email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
    return res.status(400).json({ message: "User already existing." });
    }
    
    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
    });
    
    await newUser.save();
    console.log("User created successfully: ", newUser);
    res.status(201).json({ message: "User created successfully", user: newUser });
 } catch(error) {
    console.error("Error creating user: ", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
 } 
};


//Get user profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.UserId;

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User profile retrieved successfully.", user);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error retrieving user profile:", error.message);
        res.status(500).json({ message: "server error", error: error.message });
    }
};

//Update user details
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updates = req.body;

        const updateUser = await User.findByIdAndUpdate(userId, updates, { new: true});
        if (!updateUser) {
            return res.status(400).json({ message: "User not found" });
        }

        console.log("User updated successfully: ", updateUser);
        res.status(200).json({ message: "User updated successfully.", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
 };
    


//Delete User
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User deleted successfully: ", deletedUser);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user: ", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
 };

//Allocate role to user
const allocateRole = async (req, res) => {
    try {
      const { userId, roleId } = req.body;
  
      const role = await Role.findById(roleId);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.role = roleId;
      await user.save();

      console.log("Role allocated successfully to user: ", user);
      res.status(200).json({ message: "Role allocated successfully", user });
    } catch (error) {
      console.error("Error allocating role: ", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

//Remove role from user
const revokeRole = async (req, res) => {
    try {
      const { userId } = req.body;
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.role = null;
      await user.save();
  
      console.log("Role revoked successfully from user: ", user);
      res.status(200).json({ message: "Role revoked successfully", user });
    } catch (error) {
      console.error("Error revoking role: ", error.message);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

module.exports = {
    createUser, //added for seeding and testing. 
    getUserProfile,
    updateUser,
    deleteUser,
    allocateRole,
    revokeRole,
};

