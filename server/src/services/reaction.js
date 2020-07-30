const _ = require('lodash');

exports.react = async (req, object) => {
    const {reaction} = req.body;

    try {
        if (!reaction) {
            this.unReact(req.user.id, object);
        } else {

            this.unReact(req.user.id, object);
            const user = await User.findById(req.user.id).select('avatar');
            let data = {
                user: req.user.id,
                avatar: user.avatar,
            };

            object.data.reactions[reaction].unshift(data);
        }

        await object.save();
    
        return object;
    } catch (err) {
        throw new Error(err.message);
    }
}

exports.unReact = (userId, object) => {
    const reactions = [
        "like",
        "love",
        "care",
        "haha",
        "wow",
        "bored",
        "angry"
    ];

    let reactionList = object.data.reactions;

    reactions.forEach((reaction) => {
       
        var removeIndex = _.findIndex(reactionList[reaction], (action) => {
            return action.user == userId
        });
        if(removeIndex != -1){
            reactionList[reaction].splice(removeIndex, 1);
        }
    });
}