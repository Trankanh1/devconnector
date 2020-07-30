module.exports = {
    post: async (id) =>{
        let model =  require(appDir + '/src/models/post');
        return await model.findById(id);
    },
    comment: async(id)=>{
        let model =  require(appDir + '/src/models/comment');
        return await model.findById(id);
    }
}