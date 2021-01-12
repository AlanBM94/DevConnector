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
        // res.status(500).send("Server Error");
        res.status(500).send("Error de servidor");
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        console.log(error.message);
        // res.status(500).send("Server Error");
        res.status(500).send("Error de servidor");
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            // return res.status(404).json({ message: "Post not found" });
            return res
                .status(404)
                .json({ message: "Publicación no encontrada" });
        }
        res.json(post);
    } catch (error) {
        console.log(error.message);
        if (error.name === "CastError")
            return (
                res
                    .status(400)
                    // .json({ message: "There is no post with that post id" });
                    .json({ message: "No hay una publicación con ese id" })
            );
        // res.status(500).send("Server Error");
        res.status(500).send("Error de servidor");
    }
};

exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        // Check for ObjectId format and post
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !post) {
            // return res.status(404).json({ message: "Post not found" });
            return res
                .status(404)
                .json({ message: "Publicación no encontrada" });
        }

        // Check user
        if (post.user.toString() !== req.user.id) {
            // return res.status(401).json({ message: "User not authorized" });
            return res.status(401).json({ message: "Usuario no autorizado" });
        }

        await post.remove();

        res.json({ message: "Post removed" });
    } catch (err) {
        console.error(err.message);
        if (err.name === "CastError")
            return (
                res
                    .status(400)
                    // .json({ message: "There is no post with that post id" });
                    .json({ message: "No hay publicación con ese id" })
            );

        // res.status(500).send("Server Error");
        res.status(500).send("Error de servidor");
    }
};

exports.addLike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        post.dislikes = post.dislikes.filter(
            (dislike) => dislike.user.toString() !== req.user.id
        );

        const postIsAlreadyLikedByCurrentUser =
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length > 0;

        if (postIsAlreadyLikedByCurrentUser) {
            // return res.status(400).json({ msg: "Post already liked" });
            return res
                .status(400)
                .json({ msg: "Esta publicación ya tiene un like tuyo" });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.log(error.message);
        // res.status(500).send("Server Error");
        res.status(500).send("Error de servidor");
    }
};

exports.addDislike = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        post.likes = post.likes.filter(
            (like) => like.user.toString() !== req.user.id
        );

        const postIsAlreadyDislikedByCurrentUser =
            post.dislikes.filter(
                (dislike) => dislike.user.toString() === req.user.id
            ).length > 0;

        if (postIsAlreadyDislikedByCurrentUser) {
            // return res.status(400).json({ msg: "Post already disliked" });
            return res
                .status(400)
                .json({ msg: "Esta publicación ya tiene un dislike tuyo" });
        }

        post.dislikes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.dislikes);
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
        // res.status(500).send("Server Error");
        res.status(500).send("Error de servidor");
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        );

        if (!comment) {
            // return res.status(404).json({ message: "Comments does not exist" });
            return res.status(404).json({ message: "No hay comentarioa" });
        }

        if (comment.user.toString() !== req.user.id) {
            // return res.status(401).json({ message: "User not authorized" });
            return res.status(401).json({ message: "Usuario no autorizado" });
        }

        const removedIndex = post.comments
            .map((comment) => comment.user.toString())
            .indexOf(req.user.id);

        post.comments.splice(removedIndex, 1);

        await post.save();

        res.json(post.comments);
    } catch (error) {
        console.log(error);
        // res.status(500).send("Server Error");
        res.status(500).send("Error de servidor");
    }
};
