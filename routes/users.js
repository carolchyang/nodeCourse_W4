var express = require("express");
var router = express.Router();
const UserControllers = require("../controllers/users");

// 取得所有用戶
router.get("/users", UserControllers.getUsers);

module.exports = router;
