exports.encode = (data) => {
    let buff = new Buffer.from(data);
    let base64Data = buff.toString('base64');
    
    return base64Data;
}

exports.decode = (data) => {
    let buff = new Buffer.from(data, 'base64');
    let decodedData = buff.toString('ascii');
   
    return decodedData
}

