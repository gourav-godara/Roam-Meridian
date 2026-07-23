const Notification = require("../models/notification.model");

// Create one notification
const createNotification = async ({
  user,
  type,
  message,
  link = "",
  relatedId,
}) => {
  return await Notification.create({ user, type, message, link, relatedId });
};

// Create the same notification for a list of users at once
// (e.g. notify every participant when an expense is added)
const createNotificationsForUsers = async (
  userIds,
  { type, message, link = "", relatedId }
) => {
  if (!userIds || userIds.length === 0) return [];

  const docs = userIds.map((user) => ({
    user,
    type,
    message,
    link,
    relatedId,
  }));

  return await Notification.insertMany(docs);
};

// Get the most recent notifications for a user
const getNotifications = async (userId) => {
  return await Notification.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(30);
};

const getUnreadCount = async (userId) => {
  return await Notification.countDocuments({ user: userId, isRead: false });
};

const markAsRead = async (id, userId) => {
  return await Notification.findOneAndUpdate(
    { _id: id, user: userId },
    { isRead: true },
    { new: true }
  );
};

const markAllAsRead = async (userId) => {
  return await Notification.updateMany(
    { user: userId, isRead: false },
    { isRead: true }
  );
};

module.exports = {
  createNotification,
  createNotificationsForUsers,
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
};