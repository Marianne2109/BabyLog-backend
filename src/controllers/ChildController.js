const Child = require("../models/ChildModel");

//Create new child profie
const createChild = async (req, res) => {
    try {
        const child = new Child(req.body);
        await child.save();
        console.log("Child profile created successfully", child);
        res.status(201).json({ message: "Child profile created successfully", child });
    } catch (error) {
        console.error("An error has occurred when creating the child profile", error);
        res.status(400).json({ error: error.message });
    }
};

//Get all children profiles
const getAllChildren = async (req, res) => {
    try {
        console.log("Fetching all profiles");
        const children = await Child.find();
        console.log("Fetched profiles", children);
        res.status(200).json({ error: error.message });
    }  catch (error) {
        console.error("Error fetching children:", error);
        res.status(500).json({ error: error.message });
    }
};

//Get child by ID
const getChildById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("Fetching child with ID:", id);
        const child = await Child.findById(id);
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



