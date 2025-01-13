const express = require("express");
const {
    createChild,
    getChildProfile,
    updateChild,
    deleteChild,
} = require("../controllers/ChildController");

const router = express.Router();

router.post('/child', createChild); //Create new child profile
router.get('/child/:id', getChildProfile); //Get a child's profile by id
router.put('/child/:id', updateChild); //Update a childs details
router.delete('/child/:id', deleteChild); //Delete a child 


module.exports = router;


