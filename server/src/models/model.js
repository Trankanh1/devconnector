const helper = require(appDir+ '/src/helpers/app');

class BaseModel {
    oid(){
        let data = this.id+'.'+this.constructor.modelName;

        return helper.encode(data);
    }
    isOwner(userId){
        if (this.user != userId) {
            return false;
        }

        return true;
    }
}

module.exports = BaseModel;