const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  Title: {
    type: String,
    // required: true,
  
  },
 
  Image: {
    type: String,
    // required: true,
 
  },
  cloudinaryId:{
    type:String
  },
  Category: {
    type: String,
    // required: true,
   
  },
    BriefSummary:{
        type: String,
        // required: true,
      
  },Summary: {
        type: String,
        // required: true,
      
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  }
        
});


// MongoDB collection name here  will give lowercase plural of name
module.exports = mongoose.model("List", ListSchema);
