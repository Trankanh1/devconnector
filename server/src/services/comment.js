const Comment = require(appDir + '/src/models/comment');


exports.post = async (req, object) => {
    try {
        const user = await User.findById(req.user.id).select('avatar');

        const comment = new Comment();
        comment.user = req.user.id;
        comment.comment = req.body.comment;
        comment.avatar = user.avatar;
        comment.origin = object.oid();
        await comment.save()

        return comment;
    } catch (err) {
        throw new Error(err.message);
    }
}

exports.edit = async (req, object) => {
    let { comment } = req.body;

    try {
        object.comment = comment;

        await object.save();

        return object;
    } catch (err) {
        throw new Error(err.message);
    }
}

exports.load = async (req, object) => {
    try {
        const comments = Comment.find({ origin: object.oid() });

        return comments;
    } catch (err) {
        throw new Error(err.message);
    }
}

exports.remove = async (req, object) => { 

    try {
        await object.remove();
        
        return object;
    } catch (err) {
        throw new Error(err.message);
    }
}