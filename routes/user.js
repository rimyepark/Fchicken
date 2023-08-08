require("dotenv").config();

const crypto = require("crypto");
const { SECRET_KEY } = process.env;
const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { signInValidation, signUpValidation, editPasswordValidation } = require("../middlewares/Validations/usersValidation");
const authMiddleware = require("../middlewares/auth");
const { off } = require("process");

router.post("/signin", signInValidation, async (req, res) => {
  try {
    const { email, password } = req.body;
    const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString("hex"), 11524, 64, "sha512").toString("hex");
    const userValid = await Users.findOne({
      where: { email: email, password: passwordToCrypto },
      attributes: { exclude: ["password"] },
    });
    console.log(req.session);

    if (!userValid) return res.status(412).json({ message: "아이디와 비밀번호가 일치하지 않습니다." });
    else req.session.user = userValid;
    return res.status(201).json({ message: "로그인 성공" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "오류가 발생하였습니다." });
  }
});

router.get("/signout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(412).json({ message: "오류가 발생하였습니다." });
    return res.status(201).redirect("../../");
  });
});

router.post("/signup", signUpValidation, async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const passwordToCrypto = crypto.pbkdf2Sync(password, SECRET_KEY.toString("hex"), 11524, 64, "sha512").toString("hex");

    await Users.create({ email, name, password: passwordToCrypto, isEmailValid: false });

    return res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "오류가 발생하였습니다." });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { UserId } = req.session.user;
    const user = await Users.findOne({ where: { userId:UserId } });
    res.status(200).json({ user });
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: "오류가 발생하였습니다." });
  }
});

router.put("/editpassword", authMiddleware, editPasswordValidation, async (req, res) => {
  try {
    const { currentPassword, editPassword } = req.body;
    const { UserId } = req.session.user;
    const currentPasswordToCrypto = crypto.pbkdf2Sync(currentPassword, SECRET_KEY.toString("hex"), 11524, 64, "sha512").toString("hex");
    const editPasswordToCrypto = crypto.pbkdf2Sync(editPassword, SECRET_KEY.toString("hex"), 11524, 64, "sha512").toString("hex");

    const currentPasswordValidation = await Users.findOne({ where: { userId:UserId, password: currentPasswordToCrypto } });

    if (!currentPasswordValidation) return res.status(412).json({ message: "현재 비밀번호가 일치하지 않습니다." });

    await Users.update({ password: editPasswordToCrypto }, { where: { userId } });

    req.session.destroy((err) => {
      if (err) return res.status(412).json({ message: "오류가 발생하였습니다." });
      return res.status(201).json({ message: "비밀번호가 정상 변경되어 새로운 비밀번호로 로그인이 필요합니다." });
    });
  } catch (err) {
    console.error(e);
    return res.status(400).json({ message: "오류가 발생하였습니다." });
  }
});

module.exports = router;
