const express = require("express");
const router = express.Router();
const users = require("./users/userController");
const models = require("./model/modelController");
// users
router.post("/userSignup", users.addUser);
router.post("/userLogin", users.userLogin);

// 3Dmodels
router.post("/addModels", models.upload, models.addModels);
router.post("/viewAllModel", models.viewAllModels);

module.exports = router;
