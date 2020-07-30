exports.collection = (resource) => {
    let collection = [];
    for (let obj of resource) {
        collection.push(obj.makeResource());
    }

    return collection;
}