const User = require("../models/userModel")
const { hashPassword } = require("../utils/helper")


exports.signIn = async (req, res) => {
    try {
        res.status(200).json({ id: req.user.id, username: req.user.username, role: req.user.role })
    } catch (err) {
        console.log(err)
    }
}

exports.register = async (req, res) => {
    try {
        console.log("registering new user")
        let user = await User.findOne({ username: req.body.username })
        console.log(user)
        if (user) return res.status(401).json("User Account already exists")
        const password = await hashPassword(req.body.password);
        user = User.create({ username: req.body.username, password: password })
        return res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.verifyUser = (req, res)=>{
    if(req.user){
        res.status(200).json(req.user)
    }else{
        res.redirect('/login')
    }
} 