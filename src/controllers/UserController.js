//User controller handles fetching and updating user details

const express = require("express");

const  { User }  = require("../models/UserModel");
const  { Role }  = require("../models/RoleModel");

const router = express.Router();


//Create user - for seeding and testing purposes.
const createUser = async (req, res) => {
  try {
    const {email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
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

        console.log("User profile retrieved successfully:", user);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error retrieving user profile:", error.message);
        res.status(500).json({ message: "server error", error: error.message });
    }
};

//Get all users (for testing and checking data)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "firstName lastName email _id"); 
    console.log("Existing users:", users);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


//Update user details
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("Received userId for update:", userId);

        const updates = req.body;
        console.log("Update data:", updates);

        //Update user in db
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { 
          new: true,
          runValidators: true,
        });

        if (!updatedUser) {
          console.log("User not found for id:", userId);
          return res.status(404).json({ message: "User not found" });
        }

        console.log("User updated successfully: ", updatedUser);
        res.status(200).json({ 
          message: "User updated successfully:", 
          user: updatedUser,
        });
    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
 };
    


//Delete User
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log("Received userId for deletion:", userId);

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
          console.log("User not found for id:", userId);
          return res.status(404).json({ message: "User not found" });
        }

        console.log("User deleted successfully: ", deletedUser);
        res.status(200).json({ 
          message: "User deleted successfully",
          user: deletedUser,
        });
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
    getAllUsers,
    updateUser,
    deleteUser,
    allocateRole,
    revokeRole,
};

