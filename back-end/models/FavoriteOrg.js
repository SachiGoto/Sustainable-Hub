const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
  },
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isLiked:{
    type:boolean
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// MongoDB collection name here  will give lowercase plural of name
module.exports = mongoose.model("FavoriteOrg", FavoriteSchema);
