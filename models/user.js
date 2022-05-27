const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "請輸入您的名字"],
    },
    photo: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "請輸入您的 Email"],
      unique: true,
      lowercase: true,
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

const User = new mongoose.model("user", userSchema);

module.exports = User;
