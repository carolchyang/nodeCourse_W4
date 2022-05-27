const handleSuccess = require("../service/handleSuccess");
const User = require("../models/user");

const users = {
  async getUsers(req, res) {
    /**
     * #swagger.tags = ["Users - 使用者"]
     */
    const users = await User.find();
    handleSuccess(res, users);
  },
};

module.exports = users;
