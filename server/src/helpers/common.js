const helper = require(appDir + '/src/helpers/app');
const register = require(appDir + '/src/helpers/register');

exports.getObject = async (oid) => {
    try {
        let decoded = helper.decode(oid);
        let data = decoded.split('.');

        let id = data[0];
        let modelName = data[1];
        let model = register[modelName];

        let obj = await model(id);
       
        return obj;
    } catch (err) {
        return null
    }

}