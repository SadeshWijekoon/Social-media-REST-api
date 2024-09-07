const mongoose = require('mongoose');

const PostSchema  = new mongoose.Schema({
   userId:{
    type:String,
    required:true,
   },
   desc:{
    type:String,
    max:500,
   },
   img:{
    type:String,
   },
   likes:{
    type:Array,
    default:[]
   }

},
{timestamps:true}) // this gonna store the crate at and update at time in mongodb
module.exports=mongoose.model("Posts",PostSchema)