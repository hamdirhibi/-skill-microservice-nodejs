const express = require("express");
const router = express.Router();
const skillController = require("../controllers/skill");
const checkAuth = require("../middleware/checkAuth");




router.post("/", checkAuth ,skillController.addSkill);
router.get("/", checkAuth , skillController.getSkills);
router.delete("/:skillId", checkAuth ,  skillController.deleteSkill);



module.exports = router ; 
