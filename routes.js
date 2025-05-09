const express = require("express");
const router = express.Router();
const users = require("./users/userController");
const models = require("./model/modelController");
// users
router.post("/userSignup", users.addUser);
router.post("/userLogin", users.userLogin);
router.get("/viewUserById/:id", users.userById);

// 3Dmodels
router.post("/addModels", models.upload, models.addModels);
router.post("/viewAllModel", models.viewAllModels);
router.get("/viewModelById/:id", models.viewModelById);

module.exports = router;
