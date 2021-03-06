const handleSuccess = require("../service/handleSuccess");
const handleErrors = require("../service/handleErrors");
const Post = require("../models/post");
const User = require("../models/user");

const posts = {
  async getPosts(req, res) {
    /**
     * #swagger.tags = ["Post - 貼文"]
     * #swagger.description = "取得全部貼文"
     * #swagger.responses[200] = {
        description: "回傳成功",
        schema: {
          "status": "success",
          "data": [
            {
              "_id": "62910fcf424cee452fe573a7",
              "user": {
                "_id": "62910707f5f2259a014470dc",
                "name": "Carol",
                "photo": "https://reurl.cc/x93aR4"
              },
              "image": "https://reurl.cc/x93aR4",
              "content": "貼文內容",
              "createdAt": "2022-05-27T21:23:27.241Z"
            }
          ]
        }
      }
     * #swagger.responses[400] = {
        description: "程式碼錯誤",
        schema: {
          "status": "false",
          "message": "程式碼錯誤"
        }
      }
     */

    const sort = req.query.sort == "asc" ? "createdAt" : "-createdAt";
    const q =
      req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};

    const posts = await Post.find(q)
      .populate({
        path: "user",
        select: "name photo",
      })
      .sort(sort);

    handleSuccess(res, posts);
  },
  async createPost(req, res) {
    /**
     * #swagger.tags = ["Post - 貼文"]
     * #swagger.description = "建立貼文"
     * #swagger.parameters["body"] = {
        in: "body",
        type: "object",
        required: true,
        description: "資料格式",
        schema: {
          "$user": "629109c447b0a4ded7be6d12",
          "$content": "這是貼文內容",
          "image": "https://reurl.cc/x93aR4"
        }
      }
     * #swagger.responses[200] = {
        description: "回傳成功",
        schema: {
          "status": "success",
          "data": {
            "user": "629109c447b0a4ded7be6d12",
            "image": "https://images.unsplash.com/photo-1618988727281-8d54f5d32932?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1177&q=80",
            "content": "我今天很高興",
            "_id": "6291414f7940485d4c39da75",
            "createdAt": "2022-05-27T21:23:27.241Z"
          }
        }
      }
     * #swagger.responses[400] = {
        description: "欄位錯誤",
        schema: {
          "status": "false",
          "message": "貼文內容 未填寫"
        }
      }
     */

    try {
      const { _id, user, image, content } = req.body;
      const isExist = User.findById(_id).exe();

      if (!content.trim() || isExist == null) {
        handleErrors(res, err);
      } else {
        const newPost = await Post.create({
          user,
          image,
          content,
        });
        handleSuccess(res, newPost);
      }
    } catch (err) {
      handleErrors(res, err);
    }
    /*
      POST 新增貼文時，建議判斷有沒有這個使用者，如果傳入不存在的 id ( 相似 id 但使用者資料庫中沒有此 id )，也會被新增成功，但 user 會是 null。

      若要確保使用者存在，可以使用 findById 確認是否有使用者 ID 再做 create 的動作

      可以參考 mongoose 文件 的做法 :
      [Model Name].findById(id).exec() // 如果找不到就是 null
      或是用 Callback 的方式 :

      [Model Name].findById(id, function(err, userDoc) {
        // 找到使用者資料就做特定的事情
      })
    */
  },
};

module.exports = posts;
