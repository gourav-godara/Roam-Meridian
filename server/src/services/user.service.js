const User = require("../models/user.model");

const searchUsers = async (query, currentUserId) => {
  return await User.find({
    _id: { $ne: currentUserId },
    $or: [
      {
        name: {
          $regex: query,
          $options: "i",
        },
      },
      {
        email: {
          $regex: query,
          $options: "i",
        },
      },
    ],
  }).select("name email");
};

module.exports = {
  searchUsers,
};