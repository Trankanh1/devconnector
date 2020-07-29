const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    data: {
        reactions: {
            type: Number
        },
        comments: {
            type: Number
        },
        like: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'users'
                },
                avatar: {
                    type: String
                }
            }],
        love:[
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'users'
                },
                avatar: {
                    type: String
                }
            }],
        care: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'users'
                },
                avatar: {
                    type: String
                }
            }],
        haha: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'users'
                },
                avatar: {
                    type: String
                }
            }],
        wow: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'users'
                },
                avatar: {
                    type: String
                }
            }],
        bored: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'users'
                },
                avatar: {
                    type: String
                }
            }],
        angry: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'users'
                },
                avatar: {
                    type: String
                }
            }],
    }
});

module.exports = Post = mongoose.model('post', PostSchema);

