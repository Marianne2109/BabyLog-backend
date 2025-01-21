const Child = require("../models/ChildModel");
const User = require("../models/UserModel");
const initializeVaccinationStatus  = require("../utils/vaccinationUtils");


//Create new child profie
const createChild = async (req, res) => {
    try {
        const { dob } = req.body;

        const vaccinationStatus = await initializeVaccinationStatus(dob);
        
        const child = new Child({
            ...req.body,
            createdBy:  req.user.id,
            vaccinationStatus,
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

//Update vaccination status for a child
const updateVaccinationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { scheduleId, status, receiveDate, reminderDate } = req.body;

        if (!scheduleId) {
            return res.status(400).json({ message: "scheduleId is required" });
        }

        console.log(`Updating vaccination status for child ID: ${id}, schedule ID: ${scheduleId}`);

        const child = await Child.findById(id);
        if (!child) {
            console.log("Child not found");
            return res.status(404).json({ message: "Child not found" });
        }

        const vaccination = child.vaccinationStatus.find((v) => v.scheduleId === scheduleId);
        if (!vaccination) {
            console.log(`Vaccination schedule ${scheduleId} not found for child ${id}`);
            return res.status(404).json({ message:  `Vaccination schedule ${scheduleId} not found for this child` });
        }

        console.log("Current vaccination record before update:", vaccination);

        // Automatically mark the vaccination as "completed" if receiveDate is provided
        if (receiveDate) {
            vaccination.status = "up to date";
            vaccination.receiveDate = receiveDate;
            vaccination.reminderDate = null; // Clear reminder date when marked as completed
        } else if (status) {
            // Validate and update status manually if provided
            if (!["up to date", "overdue", "upcoming"].includes(status)) {
                return res.status(400).json({ message: "Invalid status value" });
            }
            vaccination.status = status;
        }

        // Allow updating reminderDate if provided
        if (reminderDate) {
            vaccination.reminderDate = reminderDate;
        }

        await child.save();

        console.log(`Vaccination status updated successfully for child ID: ${id}, schedule ID: ${scheduleId}`);
        res.status(200).json({ message: "Vaccination status successfully updated", vaccination });
    } catch (error) {
        console.error("Error updating status:", error.message);
        res.status(500).json({ error: error.message });
    }
};

//Get vaccination status for a child 
const getVaccinationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { filter, scheduleId } = req.query; 

        console.log(`Fetching vaccination status for child ID: ${id}, filter: ${filter}, scheduleId: ${scheduleId}`);

        const child = await Child.findById(id);
        if (!child) {
            console.log("Child not found for id:", id);
            return res.status(404).json({ message: "Child not found" });
        }

        let vaccinations = child.vaccinationStatus;
        
        //Filter by status
        if (filter) {
            vaccinations = vaccinations.filter((v) => v.status === filter);
        }

        //Filter for scheduleId
        if (scheduleId) {
            vaccinations = vaccinations.filter((v) => v.scheduleId === parseInt(scheduleId));
        }

        console.log(`Vaccination status for child: ${id}`, vaccinations);

        res.status(200).json({ vaccinations });
    } catch (error) {
        console.error("Error fetching vaccination status:", error.message);
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

//Update child profile (not including vaccinationStatus)
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

        console.log("Child profile successfully updated", updatedChild);
        res.status(200).json({ message: "Child details updated successfully", updatedChild });
    } catch (error) {
        console.error("Error updating details: ", error);
        res.status(500).json({ error: error.message });
    }
};

//Delete vaccination record for a child
const deleteVaccinationRecord = async (req, res) => {
    try {
        const { id, scheduleId } = req.params; // Child ID and scheduleId from url

        console.log("Deleting vaccination record for child ID:", id, "and schedule ID:", scheduleId);

        // Find child by id
        const child = await Child.findById(id);
        if (!child) {
            console.log("Child not found for id:", id);
            return res.status(404).json({ message: "Child not found" });
        }

        // Find the vaccination record to delete
        const vaccinationIndex = child.vaccinationStatus.findIndex(
            (v) => v.scheduleId === parseInt(scheduleId)
        );
        if (vaccinationIndex === -1) {
            console.log("Vaccination schedule not found for schedule ID:", scheduleId);
            return res.status(404).json({ message: "Vaccination schedule not found for this child" });
        }

        console.log("Vaccination record before deletion:", child.vaccinationStatus[vaccinationIndex]);

        // Remove the vaccination record
        child.vaccinationStatus.splice(vaccinationIndex, 1);

        // Save the updated child document
        await child.save();
        console.log("Vaccination record deleted successfully for schedule ID:", scheduleId);

        res.status(200).json({
            message: "Vaccination record deleted successfully",
            updatedVaccinationStatus: child.vaccinationStatus,
        });
    } catch (error) {
        console.error("Error deleting vaccination record:", error.message);
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
    updateVaccinationStatus,
    getVaccinationStatus,
    getAllChildren,
    getChildProfile,
    updateChild,
    deleteVaccinationRecord,
    deleteChild,
};



