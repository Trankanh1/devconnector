exports.collection = (resource) => {
    var collection = [];
    for (let obj of resource) {
        collection.push(obj.makeResource());
    }

    return collection;
}