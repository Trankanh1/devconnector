const BaseModel = require(appDir+ '/src/models/Model');
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
  
        comments: {
            type: Number
        },
    reactions:{
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
    }
});

PostSchema.method({
    makeResource(){
        const resource = {};
        const fields = [
            "id",
            "user",
            "text",
            "name",
            "avatar",
            "date",
            "data"
        ]
   
        fields.forEach((field) => {
            resource[field] = this[field];
        })

        resource["oid"]= this.oid();

        return  resource;
}});

class Post extends BaseModel{}

PostSchema.loadClass(Post);

module.exports = Post = mongoose.model('post', PostSchema);

