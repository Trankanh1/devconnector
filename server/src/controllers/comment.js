const commentService = require(appDir + '/src/services/comment');
const response = require(appDir + '/src/response/response');
const resource = require(appDir + '/src/helpers/resource');
const helper = require(appDir + '/src/helpers/common');
const { validationResult } = require('express-validator');


exports.postComment = async (req, res, next) => {
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

       const comment =  await commentService.post(req, object);

        response.success(res, comment.makeResource());
    } catch (err) {

        response.serverError(res, err.message);
    }

}

exports.editComment = async (req, res, next) => {
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

        const updatedComment = await commentService.edit(req, object);

        response.success(res, updatedComment.makeResource());
    } catch (err) {

        response.serverError(res, err.message);
    }

}

exports.loadComment = async(req, res, next) => {
    try {
        const { oid } = req.body;
        const object = await helper.getObject(oid);

        if (!object) {
            return response.failure(res, { msg: "Invalid data" });
        }

        const comments = await commentService.load(req, object);

        response.success(res, resource.collection(comments))
    } catch (err) {

        response.serverError(res, err.message);
    }
}

exports.removeComment = async(req, res, next) => {
    try {
        const { oid } = req.body;
        const object = await helper.getObject(oid);

        if (!object) {
            return response.failure(res, { msg: "Invalid data" });
        }

        const comment = await commentService.remove(req, object);

        response.success(res, comment.makeResource())
    } catch (err) {

        response.serverError(res, err.message);
    }
}