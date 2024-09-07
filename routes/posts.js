const express = require('express');
const router = express.Router();
const Posts =  require('../modals/Posts')

// create a post
router.post('/',async(req,res)=>{
   const newPost = new  Posts(req.body)
   try{
     const savedPost = await newPost.save()
     res.status(200).json(savedPost)
   }catch(err){
      res.status(500).json(err)
   }
})
// update a post
router.put('/:id',async(req,res)=>{
   try{
      const post =await Posts.findById(req.params.id)// find the post by using its id
      if (post.userId===req.body.userId){ // compsring the userid with that post's userid
          await post.updateOne({$set:req.body})
          res.status(200).json('the post has been updated')
      }else{
        res.status(403).json("you can update only your post")
      }
   }catch(err){
     res.status(500).json(err)
   }
  
})
// delete post
router.delete('/:id',async(req,res)=>{
   try{
    const post = await Posts.findById(req.params.id)
    if(post.userId===req.body.userId){
      await Posts.findByIdAndDelete(req.params.id)
      res.status(200).json('Your post has been deleted')
    }else{
      res.status(403).json('You can only delete your posts only')
    }
   }catch(err){
      res.status(500).json(err)
   }
})
// like post

// get a post
// get timeline posts

module.exports = router;