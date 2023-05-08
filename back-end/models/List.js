const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
  
  },
 
  Image: {
    type: String,
    required: true,
 
  },
  cloudinaryId:{
    type:String
  },
  Category: {
    type: String,
    required: true,
   
  },
    WebsiteLink:{
        type: String,
        required: true,
      
  },Summary: {
        type: String,
        required: true,
      
  }, 
  Tags: [{
    type: String
  }],

  createdAt: {
    type: Date,
    default: Date.now,
  }
        
});


// MongoDB collection name here  will give lowercase plural of name
module.exports = mongoose.model("List", ListSchema);
