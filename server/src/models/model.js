const helper = require(appDir+ '/src/helpers/app');

class BaseModel {
    oid(){
        let data = this.id+'.'+this.constructor.modelName;

        return helper.encode(data);
    }
}

module.exports = BaseModel;