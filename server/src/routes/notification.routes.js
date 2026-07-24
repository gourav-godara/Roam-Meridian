const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const notificationController = require("../controllers/notification.controller");

const router = express.Router();

router.use(authMiddleware);

router.get("/", notificationController.getNotifications);
router.patch("/:id/read", notificationController.markAsRead);
router.patch("/read-all", notificationController.markAllAsRead);

module.exports = router;