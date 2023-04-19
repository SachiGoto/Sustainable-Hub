const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
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
  WebsiteLink:{
        type: String,
        required: true,
      
  },Summary: {
        type: String,
        required: true,
      
  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  }
        
});


// MongoDB collection name here  will give lowercase plural of name
module.exports = mongoose.model("MyFavs", ListSchema);
