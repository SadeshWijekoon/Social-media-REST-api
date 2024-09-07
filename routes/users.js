const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../modals/user')

//update user
router.put('/:id',async(req,res)=>{
   if(req.body.userId === req.params.id || req.body.isAdmin){
    if(req.body.password){
        try{
            const salt =  await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }catch(err){
            return res.status(500).json(err)
        }
    }
    try{
      const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true}) //new:true is using for getting the document after updating 
      res.status(200).json('Account has been updated')
    }catch(err){
        return res.status(500).json(err)
    }
   }else{
    return res.status(403).json('You can Update Only ')
   }
})
//delete user
router.delete('/:id',async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){ // authorization. otherwise users will delete other acc without knowing userid of others
     
     try{
       const user = await User.deleteOne({_id:req.params.id})
       res.status(200).json('Account has been deleted')
     }catch(err){
         return res.status(500).json(err)
     }
    }else{
     return res.status(403).json('You can delete your account Only ')
    }
 })
//get a user
router.get('/:id',async(req,res)=>{
    try{
      const user =await User.findById(req.params.id)
      const {password,updateAt,...other}= user._doc // only send ...other
      res.status(200).json(other)
    }catch(err){
        res.status(500).json(err) // if better if we only use .send() when we are working with plain text and html
        
    }
})
//follow a user
router.put('/:id/follow',async(req,res)=>{
   if (req.body.userId !== req.params.id){ // current user and the person who gonna follow not be the same 
     try{
        const user = await User.findById(req.params.id)
        const currentuser = await User.findById(req.body.userId)
        if(!user.follwers.includes(req.body.userId)){
          await user.updateOne({$push:{follwers:req.body.userId}})
          await currentuser.updateOne({$push:{follwins:req.params.id}})
          res.status(200).json("user has been followed")
        }else{
           res.status(403).json('You already follow this user')
        }
     }catch(err){
        res.status(500).json(err)
     }
   }else{
    res.status(403).json('You Can not Follow yourself')
   }
})
//unfollow a user
router.put('/:id/unfollow',async(req,res)=>{
    if (req.body.userId !== req.params.id){ // current user and the person who gonna follow not be the same 
      try{
         const user = await User.findById(req.params.id)
         const currentuser = await User.findById(req.body.userId)
         if(user.follwers.includes(req.body.userId)){
           await user.updateOne({$pull:{follwers:req.body.userId}})
           await currentuser.updateOne({$pull:{follwins:req.params.id}})
           res.status(200).json("user has been unfollowed")
         }else{
            res.status(403).json('You not follow this user')
         }
      }catch(err){
         res.status(500).json(err)
      }
    }else{
     res.status(403).json('You Can not unFollow yourself')
    }
 })


module.exports = router