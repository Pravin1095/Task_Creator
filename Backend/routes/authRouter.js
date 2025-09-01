const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const User = require('../mongoose-models/user_data');
const authRouter = express.Router()

authRouter.post('/',async(req, res)=>{
const {isSignIn, userName, email, password, organization} = req.body
let token

if(isSignIn){
try{
const existingUser = await User.findOne({email : email})
let isValidPassword = false;
if(existingUser){
isValidPassword = await bcrypt.compare(password, existingUser.password)
try{
if(isValidPassword){
    token = jwt.sign({userId : existingUser._id, email: existingUser.email},process.env.JWT_SECRET,{expiresIn: 
    '1hr'
})
    res.status(201).json({message : "Login Successful", userId : existingUser._id, token : token, userName : existingUser.name})
}
else{
    res.status(403).json({message : "Invalid password. Please try again"})
}
}
catch(err){
    console.log("Error1", err)
    res.status(400).json({error : err})
}

}
else{
    res.status(403).json({message : "Email does not exist. Please register"})
}
}

catch(err){
     console.log("Error2", err)
res.status(400).json({error :err})
}
}
else{
    let hashedPassword
    try{
        const user = await User.findOne({email : email})
        hashedPassword = await bcrypt.hash(password, 12)
        if(user){
            res.status(403).json({message : "Email id you entered already exists. Please sign in"})
        }
        else{
            const newUser = new User({
                name : userName,
                organization : organization,
                email : email,
                password : hashedPassword
            })
            await newUser.save()
               token = jwt.sign({userId : newUser._id, email: newUser.email},process.env.JWT_SECRET,{expiresIn: 
    '1hr'
})
            res.status(201).json({message : "Registered successfully", userId : newUser._id, token: token, userName : newUser.name})
        }
    }
    catch(err){
res.status(400).json({error : err})
    }
}}
)


module.exports = authRouter