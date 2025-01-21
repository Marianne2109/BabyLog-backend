const express = require("express");
const mongoose = require("mongoose");
const { Role } = require("../models/RoleModel");
const { User } = require("../models/UserModel");
const { Child } = require("../models/ChildModel");





//Grant access to a user for a specific child profile
const grantAccess = async (req, res) => {
    const { assignedTo, child, role } = req.body;

    try {
        console.log("Granting access: ", { assignedTo, child, role });
        //Validate role
        const validRoles = ["admin", "view", "edit"];
        if (!validRoles.includes(role)){
          console.log("Invalid role provided:", role);
          return res.status(400).json({ message: "Invalid role." });
        }

        //Validate Ids
        if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
          console.log("Invalid assignedTo ID:", assignedTo);
          return res.status(400).json({ message: "Invalid assignedTo ID." });
        }

        if (!mongoose.Types.ObjectId.isValid(child)) {
          console.log("Invalid child ID:", child);
          return res.status(400).json({ message: "Invalid child ID." });
        }     
        
        //Validate the user getting access to a profile
        const user = await User.findById(assignedTo);
        if (!user) {
          console.log("Failed to grant access: User not found", assignedTo);
          return res.status(404).json({ message: "User not found" });
        } 
               
        //check if child profile exists
        const childExists = await Child.findById(child);
        if (!childExists) {
          console.log("Grant access failed, child profile not found", child);
          return res.status(404).json({ message: "Child profile not found" });
        } 

        //check if role exists
        const existingRole = await Role.findOne({ owner: req.user.id, assignedTo, child });
        if (existingRole) {
            console.log("Role already exists for user and child:", { assignedTo, child });
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

    console.log("Access granted successfully", newRole);

    res.status(201).json({ message: "Access has been granted successfully", role: newRole });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

//Remove access
const revokeAccess = async (req, res) => {
    const { assignedTo, child } = req.body;

    try {
        if (!req.user || !req.user.id) {
          console.log("Unauthorized: req.user is missing");
          return res.status(401).json({ message: "Unauthorized: User not authenticated" });
    }
        console.log("Revoking access", { owner: req.user.id, assignedTo, child });

        const role = await Role.findOneAndDelete({ owner: req.user.id, assignedTo, child });
        if (!role) {
          console.log("Role not found", { assignedTo, child });
          return res.status(404).json({ message: "Access not found" });
        }
    
        console.log("Access revoked successfully.");
        res.status(200).json({ message: "Access removed", role });
      } catch (error) {
        console.error("Access error", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
      }
    };
    
    // List all roles for a specific child
    const listAccess = async (req, res) => {
      const { child } = req.params;
    
      try {
          console.log("Listing access for child:", child);

          const roles = await Role.find({ child })
            .populate('assignedTo', 'email firstName lastName')
            .populate('owner', 'email firstName lastName');
    
          console.log("Roles for a child fetched successfully: ", roles);
          res.status(200).json(roles);
      } catch (error) {
          console.error("Server error", error.message);
          res.status(500).json({ message: 'Server error', error: error.message });
      }
    };
    
    module.exports = {
      grantAccess,
      revokeAccess,
      listAccess,
    };