const userService = require("../services/user.service");

const searchUsers = async (req, res) => {
  try {
    const q = req.query.q;

    if (!q) {
      return res.json({
        success: true,
        data: [],
      });
    }

    const users = await userService.searchUsers(
      q,
      req.user.id
    );

    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  searchUsers,
};