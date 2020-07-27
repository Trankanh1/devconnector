exports.success = (res, result) =>{
    return res.status(200).json(result);
}

exports.failure = (res, result)=>{
    return res.status(400).json(result);
}

exports.serverError = (res, message) =>{
    if(message){
        return res.status(500).send(`Server error ${message}`);
    }

    return res.status(500).send(`Server error`);

}