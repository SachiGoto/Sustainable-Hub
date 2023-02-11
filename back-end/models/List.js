const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    BriefSummary:{
        type: String,
      
      },
      Category: {
        type: String,
       
      },
      Image: {
        type: String,
     
      },
      Summary: {
        type: String,
      
      }, 
        Title: {
        type: String,
      
      }
});


// MongoDB collection name here  will give lowercase plural of name
module.exports = mongoose.model("List", ListSchema);
