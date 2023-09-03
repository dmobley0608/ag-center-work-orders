const express = require('express');


const {register, signIn, verifyUser, logout} = require('../controllers/users');
const {passport} = require('../utils/auth');





const userRouter = express();

userRouter.post('/register', register)
userRouter.post('/login', passport.authenticate('local'), signIn) 
userRouter.post('/logout', logout) 
userRouter.get('/verify-user', verifyUser)



module.exports = userRouter  