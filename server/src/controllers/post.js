const response = require(appDir + '/src/response/response');
const Post = require(appDir + '/src/models/Post');

const resource = require(appDir + '/src/helpers/common');
const { validationResult } = require('express-validator');

exports.create = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response.failure(res, { errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();

        response.success(res, post);
    } catch (err) {
        response.serverError(res, err.message);
    }

}

exports.getAll = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        response.success(res, posts);
    } catch (err) {
        response.serverError(res);
    }
}

exports.get = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            response.failure(res, { msg: "Post not found" });
        }

        response.success(res, post);
    } catch (err) {
        if (err.kind == "ObjectId") {
            response.failure(res, { msg: "Post not found" });
        }

        response.serverError(res);
    }
}


exports.remove = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            response.failure(res, { msg: "Post not found" });
        }
        await post.remove();

        response.success(res, post);
    } catch (err) {
        if (err.kind == "ObjectId") {
            response.failure(res, { msg: "Post not found" });
        }

        response.serverError(res);
    }
}