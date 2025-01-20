const express = require("express");
const {
  loginController,
  authController,
  sendMailController,
  verifyOtpController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// routes
router.post("/login", loginController);
router.post("/getUserData", authMiddleware, authController);
router.post("/send-otp", sendMailController);
router.post("/verify-otp", verifyOtpController);

module.exports = router;
