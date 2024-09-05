const router = require('express').Router()
const User = require('../modals/user')
const bcrypt = require('bcrypt')

// register
router.post('/register',async(req,res)=>{
  
  try{
    // genrate new password 
   const salt = await bcrypt.genSalt(10) 
   const hashedpassword = await bcrypt.hash(req.body.password,salt)
  // create new user
   const newUser = new User({ // new keyword is using to create new instanse 
    username:req.body.username,
    email:req.body.email,
    password:hashedpassword,
  });
   // save the response
   const user = await newUser.save();
   res.status(200).json(user)
  }catch(err){
    console.log(err);
    
  }
})



module.exports = router