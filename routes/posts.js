var express = require("express");
var router = express.Router();
const PostControllers = require("../controllers/posts");

// 取得所有貼文
router.get("/posts", PostControllers.getPosts);

// 新增貼文
router.post("/post", PostControllers.createPost);

module.exports = router;
