const express = require("express");
const {
    createChild,
    getChildProfile,
    updateChild,
    deleteChild,
} = require("../controllers/ChildController");

const router = express.Router();

router.post('/', createChild); //Create new child profile
router.get('/:id', getChildProfile); //Get a child's profile by id
router.put('/:id', updateChild); //Update a childs details
router.delete('/:id', deleteChild); //Delete a child 


module.exports = router;


