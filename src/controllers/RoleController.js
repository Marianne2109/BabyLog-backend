//Role controller for managing user roles for child profiles access control
const mongoose = require("mongoose");
const { Role } = require("../models/RoleModel");
const { User } = require("../models/UserModel");

//Grant access to a user for a specific child profile
const grantAccess = async (req, res) => {
    try {
        const { assignedTo, child, role } = req.body;

        console.log("Grant Access Request:", { assignedTo, child, role });

        //Validate role
        const validRoles = ["admin", "view", "edit"];
        if (!validRoles.includes(role)){
          console.log("Invalid role provided:", role);
          return res.status(400).json({ message: "Invalid role." });
        }

        //Validate Ids
        if (!mongoose.Types.ObjectId.isValid(assignedTo)|| !mongoose.Types.ObjectId.isValid(child)) {
          console.log("Invalid ID:", { assignedTo, child });
          return res.status(400).json({ message: "Invalid id supplied." });
        }
        
        //check if user granting access has admin privileges
        const adminRole = await Role.findOne({ assignedTo: req.user.id, child, role: "admin" });
        if (!adminRole) {
          console.log("Access denied: user is not admin", req.user.id);
          return res.status(403).json({ message: "Access denied." });
        }

        //check if user exists
        const user = await User.findById(assignedTo);
        if (!user) {  
          console.log("User not found", assignedTo);
          return res.status(404).json({ message: "User not found" });
        }

        //check if role exists
        const existingRole = await Role.findOne({ assignedTo, child });
        if (existingRole) {
            console.log("Role already exists for user and child:", { assignedTo, child });
            return res.status(400).json({ message: "Access has already been granted" });
        }

    //Create new role
    const newRole = new Role({
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
        console.log("Revoking access", { assignedTo, child });

        //Validate Ids
        if (!mongoose.Types.ObjectId.isValid(assignedTo)|| !mongoose.Types.ObjectId.isValid(child)) {
          console.log("Invalid ID:", { assignedTo, child });
          return res.status(400).json({ message: "Invalid id supplied." });
        }

        //Check and remove role
        const role = await role.findOneAndDelete({ assignedTo, child });
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