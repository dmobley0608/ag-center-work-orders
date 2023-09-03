const bcrypt = require('bcryptjs');

exports.compareHash = async(hash, password)=>{
    const isMatch = await bcrypt.compareSync(password, hash)
    return isMatch;
}

exports.hashPassword=async(phrase)=>{
    const salt = bcrypt.genSaltSync(10)
    const hash = await bcrypt.hashSync(phrase, salt)
    return hash;
}