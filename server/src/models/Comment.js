const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    origin: {
        type: String
    },
    comment:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    files:{
        type: [Object]
    },
    user:{
        type: Schema.Types.ObjectId
    },
    data: {
        reactions: {
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
})