const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 128
    }
    ,
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

UserSchema.pre('save', async function save(next) {
    try{
        const rounds = process.env.NODE_ENV === "development" ? 1 : 10;
        const salt = await bcrypt.genSalt(rounds);
        this.password = await bcrypt.hash(this.password, salt);
        
        next();
    } catch(err){
        next(err);
    }
})



UserSchema.statics.exists = async function (email) {
    let user = await this.findOne({ email });
    if (user) {
        return user;
    }

    return false;
}



module.exports = User = mongoose.model('user', UserSchema);