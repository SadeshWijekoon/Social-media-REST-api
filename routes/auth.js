const router = require('express').Router()
const User = require('../modals/user')
const bcrypt = require('bcrypt')

// register
router.post('/register',async(req,res)=>{
  
  try{
    // genrate new password 
   const salt = await bcrypt.genSalt(10) // this is genrarating random nuber then assinig it tot he salt
   const hashedpassword = await bcrypt.hash(req.body.password,salt) // this combined password and salt together 
  // create new user
   const newUser = new User({ // new keyword is using to create new instanse 
    username:req.body.username,
    email:req.body.email,
    password:hashedpassword,// then we are applying that hashed password instead of direct password 
  });
   // save the response
   const user = await newUser.save();
   res.status(200).json(user)
  }catch(err){
    console.log(err);
    
  }
})
//login
router.post('/login',async(req,res)=>{
  try{
   const user = await User.findOne({email:req.body.email})
   ! user && res.status(404).json("user not found")
   const validPassword = await bcrypt.compare(req.body.password,user.password)
   ! validPassword && res.status(400).json('wrong password')

   res.status(200).json(user)
 } catch(err){
  res.status(500).json(err)
  
 }
})



module.exports = router