const Child = require("../models/ChildModel");

//Create new child profie
const createChild = async (req, res) => {
    try {
        const child = new Child({
            ...req.body,
            createdBy: req.user.id,
    });
        await child.save();
        console.log("Child profile created successfully", child);
        res.status(201).json({ message: "Child profile created successfully", child });
    } catch (error) {
        console.error("An error has occurred when creating the child profile", error.message);
        res.status(400).json({ error: error.message });
    }
};


//Get child profile by ID
const getChildProfile = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Fetching child profile:", id);

        const child = await Child.findById(id).populate("createdBy", "email firstName lastName");
        if (!child) {
            console.log("Child not found", id);
            return res.status(404).json({ message: "Child not found"});
        }
        console.log("Child profile:", child);
        res.status(200).json(child);
    } catch (error) {
        console.error("Error fetching child by Id:", error);
        res.status(500).json({ error: error.message });
    }
};


//Get all child profiles - for development and testing purposes
const getAllChildren = async (req, res) => {
    try {
        console.log("fetching all profiles");
        const children = await Child.find({}).populate("createdBy", "email firstName lastName");
        if (children.length === 0) {
            console.log("No profiles found");
            return res.status(404).json({ message: "No profiles found" });
        }
        console.log("Profiles fetched successfully:", children);
        res.status(200).json(children);
    } catch (error) {
        console.error("Error fetching child profiles:", error);
        res.status(500).json({ error: error.message });
    }
};

//Update child profile
const updateChild = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Update profile for child id:", id, "and data:", req.body);

        const existingChild = await Child.findById(id);
        if (!existingChild) {
          console.log("Child not found with Id:", id);
          return res.status(404).json({ message: "Child not found" });  
        }

        console.log("Existing child details:", existingChild);

        const allowedUpdates = [
            "childName",
            "dob", 
            "dueDate", 
            "isPremature", 
            "weightAtBirth", 
            "heightAtBirth", 
            "headCircumferenceAtBirth",
        ];
        const updates = Object.keys(req.body);

        console.log("Updates:", updates);

        const isValidOperation = updates.every((update) => 
            allowedUpdates.includes(update)
    );
        if(!isValidOperation) {
            console.log("Invalid updates", updates);
            return res.status(400).json({ error: "Invalid updates" });
        }

        const updatedChild = await Child.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if(!updatedChild) {
            console.log("Child profile not found, id:", id);
            return res.status(404).json({ message: "Child not found." });
        }


    //     updates.forEach((update) => {
    //         console.log('Updating: ${update} with value:', req.body[update]);
    //         existingChild[update] = req.body[update];
    //     });

    //     await existingChild.save();

        console.log("Child profile successfully updated", updatedChild);
        res.status(200).json({ message: "Child details updated successfully", updatedChild });
    } catch (error) {
        console.error("Error updating details: ", error);
        res.status(500).json({ error: error.message });
    }
};

//Delete a child profile
const deleteChild = async (req, res) => {
    try {
      const { id } = req.params;
      
      const child = await Child.findByIdAndDelete(id);
      if (!child) {
        console.log("Child not found with ID:", id);
        return res.status(404).json({ message: "Child not found" });
      }
      console.log("Child deleted successfully:", child);
      res.status(200).json({ message: "Child deleted successfully" });
    } catch (error) {
        console.error("Error deleting child:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createChild,
    getAllChildren,
    getChildProfile,
    updateChild,
    deleteChild,
};



