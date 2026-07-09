const express = require("express");
const router = express.Router();
const controller = require("../controllers/planner.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.use(authMiddleware);

router.post("/generate", controller.generate);
router.get("/history", controller.history);
router.get("/:id", controller.getOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);
router.patch("/:id/favorite", controller.favorite);
router.patch("/:id/save", controller.save);
router.post("/:id/duplicate", controller.duplicate);
router.post("/:id/regenerate-day", controller.regenerateDay);

module.exports = router;
