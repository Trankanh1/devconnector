exports.create = async (req, object) =>{
    try {
        const user = await User.findById(req.user.id).select('avatar');
        let data = {
            user: req.user.id,
            avatar: user.avatar,
        };

        object.data.reactions[req.body.reaction].unshift(data);
        await object.save();
   
        return object;
    } catch(err){
        throw new Error(err.message);
    }
}