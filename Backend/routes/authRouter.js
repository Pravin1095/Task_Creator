const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const User = require('../mongoose-models/user_data');
const authRouter = express.Router()

authRouter.patch('/forgot-password', async(req, res)=>{
const { email } = req.body;
try{
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(403).json({ message: "The email id that you entered does not exist. Please register!" });
  }
else{
  // Generate token
  const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

  // Save token temporarily in DB

  user.resetToken = resetToken
  user.resetTokenExpiry = Date.now() + 15 * 60 * 1000 

  await user.save()

  // Send email with reset link
  const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_GMAIL_ID,   // your Gmail address
    pass: process.env.APP_PWD    // app password (not your Gmail login password!)
  }
});
  await transporter.sendMail({
    to: email,
    subject: "Password Reset - Task Creator",
    html: `<a href="https://task-creator-opal.vercel.app/reset-password/${resetToken}">Click here to reset your password</a>`
  });

  res.status(201).json({ message: "Password reset link has been sent to your email", email : email });
}

}
catch(err){
    console.log("check err ", err)
res.status(400).json({error : err})
}
})



authRouter.post('/reset-password', async(req, res)=>{
 const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.resetToken !== token || Date.now() > user.resetTokenExpiry) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(201).json({ message: "Password reset successful" });
  } catch (err) {
    console.log("checl err", err)
    res.status(400).json({ message: "Invalid or expired token" });
  }
})

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