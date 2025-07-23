const express = require("express");
const {
  createSession,
  getSessionById,
  getMySession,
  deleteSession,
} = require("../controller/sessionController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create", protect, createSession);
router.get("/my-sessions", protect, getMySession);
router.get("/:id", protect, getSessionById);
router.delete("/:id", protect, deleteSession);

module.exports = router;
