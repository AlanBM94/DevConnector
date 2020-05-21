const Post = require("./../models/Post");
const User = require("./../models/User");
const Profile = require("./../models/Profile");

const { validationResult } = require("express-validator");

exports.createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.log(error.message);
    if (error.name === "CastError")
      return res
        .status(400)
        .json({ message: "There is no post with that post id" });
    res.status(500).send("Server Error");
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check for ObjectId format and post
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    await post.remove();

    res.json({ message: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.name === "CastError")
      return res
        .status(400)
        .json({ message: "There is no post with that post id" });

    res.status(500).send("Server Error");
  }
};

exports.addLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const postIsAlreadyLikedByCurrentUser =
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0;

    if (postIsAlreadyLikedByCurrentUser) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

exports.removeLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const postHasNotBeenLiked =
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0;

    if (postHasNotBeenLiked) {
      return res.status(400).json({ message: "Post has not been liked" });
    }

    const removedIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removedIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

exports.createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    post.comments.unshift(newComment);

    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ message: "Comments does not exist" });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized" });
    }

    const removedIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removedIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (error) {}
};
