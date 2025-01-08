

const express = require("express");

const { Role } = require("../module/Role");
const { User } = require("../module/User");

const grantAccess = async (req, res) => {
    const { assignedTo, child, role } = req.body;

    try {
        const user = await User.findById(assignedTo);
        if (!user) return res.status(404).json({ message: "User not found" });

        const childExists = await Child.findById(child);
        if (!childExists) return res.status(404).json({ message: "Child profile not found" });

        //check if role exists
        const existingRole = await Role.findOne({ owner: req.user.id, assignedTo, child });
        if (existingRole) {
            return res.status(400).json({ message: "Access has already been granted" });
        }

    //Create new role
    const newRole = new Role({
        owner: req.user.id,
        assignedTo,
        child,
        role,
    });

    await newRole.save();
    res.status(201).json({ message: "Access has been granted successfully", role: newRole });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//Remove access
const revokeAccess = async (req, res) => {
    const { assignedTo, child } = req.body;

    try {
        const role = await Role.findOneAndDelete({ owner: req.user.id, assignedTo, child });
        if (!role) {
          return res.status(404).json({ message: "Access not found" });
        }
    
        res.status(200).json({ message: "Access removed", role });
      } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
    };
    
    // List all roles for a specific child
    const listAccess = async (req, res) => {
      const { child } = req.params;
    
      try {
        const roles = await Role.find({ child })
          .populate('assignedTo', 'email firstName lastName')
          .populate('owner', 'email firstName lastName');
    
        res.status(200).json(roles);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
    };
    
    module.exports = {
      grantAccess,
      revokeAccess,
      listAccess,
    };