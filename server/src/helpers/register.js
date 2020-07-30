module.exports = {
    post: async (id) =>{
        let model =  require(appDir + '/src/models/post');
        return await model.findById(id);
    }
}