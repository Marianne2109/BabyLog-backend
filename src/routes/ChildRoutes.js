const express = require("express");
const {
    createChild,
    updateVaccinationStatus,
    getVaccinationStatus,
    getChildProfile,
    getAllChildren,
    updateChild,
    deleteVaccinationRecord,
    deleteChild,    
} = require("../controllers/ChildController");

const router = express.Router();

router.post('/', createChild); //Create new child profile
router.put('/:id/vaccination/:scheduleId', updateVaccinationStatus);
router.get('/:id/vaccination', getVaccinationStatus); //get vaccination status for a child
router.get('/:id', getChildProfile); //Get a child's profile by id
router.get('/', getAllChildren);
router.put('/:id', updateChild); //Update a childs details
router.delete('/:id/vaccination/:scheduleId', deleteVaccinationRecord); //Delete record by scheduleId
router.delete('/:id', deleteChild); //Delete a child 


module.exports = router;


