const express = require("express");
const auth = require("./../../middlewares/auth");
const { createPostValidations } = require("./../../config/requestValidations");
const postControllers = require("./../../controllers/postControllers");
const router = express.Router();

router.post("/", [auth, createPostValidations], postControllers.createPost);

router.get("/", auth, postControllers.getAllPosts);

router.get("/:id", auth, postControllers.getPostById);

router.delete("/:id", auth, postControllers.deletePost);

router.put("/like/:id", auth, postControllers.addLike);

router.put("/unlike/:id", auth, postControllers.removeLike);

router.post(
  "/comment/:id",
  [auth, createPostValidations],
  postControllers.createComment
);

router.delete("/comment/:id/:comment_id", auth, postControllers.deleteComment);

module.exports = router;
