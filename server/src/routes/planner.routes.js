const express = require("express");
const router = express.Router();
const controller = require("../controllers/planner.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.use(authMiddleware);  

// Conversational flow (new)
router.post("/message", controller.sendMessage);
router.get("/conversation/active", controller.getActiveConversation);
router.post("/conversation/:id/regenerate", controller.regenerateConversation);

// Legacy routes — bridged to conversational flow, kept until Phase 9
router.post("/generate", controller.generate);
router.post("/:id/regenerate-day", controller.regenerateDay);

// Saved plan management — unchanged
router.get("/history", controller.history);
router.get("/:id", controller.getOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.patch("/:id/favorite", controller.favorite);
router.patch("/:id/save", controller.save);
router.post("/:id/duplicate", controller.duplicate);

module.exports = router;
