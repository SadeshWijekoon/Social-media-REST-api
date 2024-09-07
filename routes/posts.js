const express = require('express');
const router = express.Router();
const Posts =  require('../modals/Posts')
const User = require('../modals/user')

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
// like post and unlike a post
 router.post('/:id/like',async(req,res)=>{
   try{
     const post =await Posts.findById(req.params.id)
     if(!post.likes.includes(req.body.userId)){
       await post.updateOne({$push:{likes:req.body.userId}}) // like post
       res.status(200).json('The post has been liked')
     }else{
       await post.updateOne({$pull:{likes:req.body.userId}}) // unlike post
       res.status(200).json('the post has been unliked')
     }
   }catch(err){
      res.status(500).json(err)
   }
 })
// get a post
router.get('/:id', async (req, res) => {
   try {
     const post = await Posts.findById(req.params.id);
     
     if (post) {
       res.status(200).json(post);
     } else {
       res.status(404).json('Post does not exist');
     }
   } catch (err) {
     res.status(500).json(err);
   }
 });
 
   
// get timeline posts
router.get('/timeline/all',async(req,res)=>{
   
   try{
    const currentUser = await User.findById(req.body.userId) 
    const userPost = await Posts.find({userId:currentUser._id})
    const frdPost= await Promise.all(
      currentUser.follwins.map(frdId=>{
       return  Posts.find({userId:frdId})
      })
    )
    res.json(userPost.concat(...frdPost))
   }catch(err){
      res.status(500).json(err)
   }

})

module.exports = router;