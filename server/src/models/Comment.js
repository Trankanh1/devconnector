const BaseModel = require(appDir+ '/src/models/Model');
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
    avatar:{
        type: String
    },
    data: {
        reactions: {
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
        },
        
})

CommentSchema.method({
    makeResource(){
        const resource = {};
        const fields = [
            "id",
            "user",
            "comment",
            "avatar",
            "origin",
            "data"
        ]
   
        fields.forEach((field) => {
            resource[field] = this[field];
        })

        resource["oid"]= this.oid();

        return  resource;
}});

class Comment extends BaseModel{}

CommentSchema.loadClass(Comment);

module.exports = Comment = mongoose.model('comment', CommentSchema);