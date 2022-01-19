const mongoose = require('mongoose'); 



const notesSchema = new mongoose.Schema({ 
    content:{
         type: String,
          required: true 
        }, 
        user: { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'User' 
            },
            
   // Include the arrya of ids od all comments in this post schema itself         
//    comments: [
//      {
//        type: mongoose.Schema.Types.ObjectId,
//        ref: 'Comment',
//       }],

//       likes: [{
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Like',
//       }],
    
},{ 
      timestamps: true 
});
             

const Notes = mongoose.model('Notes', notesSchema);
module.exports = Notes;