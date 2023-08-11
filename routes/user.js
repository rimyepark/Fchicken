require("dotenv").config();

const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { signInValidation, signUpValidation, editPasswordValidation } = require("../middlewares/Validations/usersValidation");
const authMiddleware = require("../middlewares/auth");
const { off } = require("process");

const UserController = require("../controllers/user.controller");
const userController = new UserController();
router.post("/signIn", signInValidation, userController.signIn);
router.post("/signUp", signUpValidation, userController.signUp);
router.get("/getUserByUserId", authMiddleware, userController.getUserByUserId);
router.put("/editpassword", authMiddleware, editPasswordValidation, userController.editPassword);

router.get("/signout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(412).json({ message: "오류가 발생하였습니다." });
    return res.status(201).redirect("../../");
  });
});

module.exports = router;
