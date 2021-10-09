const mongoose = require('mongoose'); 



const postSchema = new mongoose.Schema({ 
    content:{
         type: String,
          required: true 
        }, 
        user: { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'User' 
            },
            
   // Include the arrya of ids od all comments in this post schema itself         
   comments: [
     {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Comment'
     }
   ]
},{ 
      timestamps: true 
});
             

const post = mongoose.model('post', postSchema);
module.exports = post;