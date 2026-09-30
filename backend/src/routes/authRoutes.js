const express = require("express");
const rateLimit = require("express-rate-limit");
const { protect } = require("../middleware/auth");
const { login, refresh, logout } = require("../controllers/authController");

const router = express.Router();

// Tighter limiter on login to slow down credential-stuffing/brute force.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again later.",
  },
});

router.post("/login", loginLimiter, login);
router.post("/refresh", refresh);
router.post("/logout", protect, logout);

module.exports = router;
