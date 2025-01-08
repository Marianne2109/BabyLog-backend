//User controller handles fetching and updating user details

const express = require("express");

const { User } = require("../module/User");
const { Role } = require("../module/Role");

const router = express.Router();


//Get user profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.UserId;

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
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

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
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
  
      res.status(200).json({ message: "Role allocated successfully", user });
    } catch (error) {
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
  
      res.status(200).json({ message: "Role revoked successfully", user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

module.exports = {
    getUserProfile,
    updateUser,
    deleteUser,
    allocateRole,
    revokeRole,
}

