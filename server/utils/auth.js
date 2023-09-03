//Passport
const passport = require('passport');

const LocalStrategy = require("passport-local");


const { compareHash } = require('./helper');
const User = require('../models/userModel');
//Local Login
passport.use(new LocalStrategy(
    async function (username, password, done) {
        console.log(username)
        try {
            const user = await User.findOne({ username: username })
            if (!user) return done(null, false)
            //Verify Password Match    
            const match = await compareHash(user.password, password)
            console.log(match)
            if (!match) return done(null, false)
            if (match) console.log("Authentication Successful")
            return done(null, user)
        } catch (err) {
            console.log(err)
        }
    }
));



passport.serializeUser(function (user, cb) {

    process.nextTick(() => {
        cb(null, { id: user.id, username: user.username, role: user.role })
    })
});
passport.deserializeUser(function (user, cb) {
    process.nextTick(() => {
        cb(null, { id: user.id, username: user.username, role: user.role })
    })
})

const checkUser = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        req.method = 'get'
        res.status(403).json("Please log in to proceed")
    }
}

module.exports = { passport, checkUser } 