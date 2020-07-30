const response = require(appDir + '/src/response/response');
const Post = require(appDir + '/src/models/post');
const helper = require(appDir + '/src/helpers/common');
const resource = require(appDir + '/src/helpers/resource');
const reactionService = require(appDir + '/src/services/reaction');
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
        response.success(res, resource.collection(posts));
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

        response.success(res, post.makeResource());
    } catch (err) {
        if (err.kind == "ObjectId") {
            response.failure(res, { msg: "Post not found" });
        }

        response.serverError(res, err.message);
    }
}


exports.remove = async (req, res, next) => {
    try {
        const post = await Post.findOne({ _id: req.params.postId, user: req.user.id });
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

exports.reaction = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return response.failure(res, { errors: errors.array() });
    }

    try {
        const { oid } = req.body;
        const object = await helper.getObject(oid);

        if (!object) {
            return response.failure(res, { msg: "Invalid data" });
        }

        await reactionService.react(req, object);

        response.success(res, { msg: "Sucessfully" })
    } catch (err) {
        response.serverError(res, err.message);
    }
}
