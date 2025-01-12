
const express = require("express");
const {
    grantAccess,
    revokeAccess,
    listAccess,
} = require("../controllers/RoleController");

const router = express.Router();

router.post("/grant", grantAccess);
router.post("/revoke", revokeAccess);
router.get("/:child", listAccess);

module.exports = router;



