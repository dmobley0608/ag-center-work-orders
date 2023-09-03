const express = require('express');


const {register, signIn, verifyUser} = require('../controllers/users');
const {passport} = require('../utils/auth');





const userRouter = express();

userRouter.post('/register', register)
userRouter.post('/login', passport.authenticate('local'), signIn) 
userRouter.get('/verify-user', verifyUser)



module.exports = userRouter  