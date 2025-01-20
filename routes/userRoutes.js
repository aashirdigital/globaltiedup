const express = require("express");
const {
  loginController,
  authController,
  sendMailController,
  verifyOtpController,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");
const browserMiddleware = require("../middlewares/browserMiddleware");
const router = express.Router();

// routes
router.post("/login", browserMiddleware, loginController);
router.post("/getUserData", browserMiddleware, authMiddleware, authController);
router.post("/send-otp", browserMiddleware, sendMailController);
router.post("/verify-otp", browserMiddleware, verifyOtpController);

module.exports = router;
