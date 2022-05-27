const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      // 因 models/user.js 的 .model("user", userSchema); 命名為 user
      ref: "user",
      required: [true, "貼文 ID 未填寫"],
    },
    image: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      required: [true, "貼文內容 未填寫"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

const Post = new mongoose.model("Post", postSchema);

module.exports = Post;
