const mongoose = require("mongoose");
const cloudinary = require("../middleware/cloudinary");
const Lists = require("../models/List");
const User = require("../models/User");

module.exports = {
  favoriteOrg: async (req, res) => {
    try {
      const userData = await User.find(req.user._id);
      const favOrgArray = userData[0].favOrg;
      let findOrg = favOrgArray.find((org) => {
        return org.list_id == req.body.updateFavOrg.favOrg;
      });

      if (findOrg === undefined) {
        console.log("works");
        const updatedFavOrg = await User.updateOne(
          { _id: req.user._id },
          {
            $push: { favOrg: { list_id: req.body.updateFavOrg.favOrg } },
          }
        );
      } else {
        const updatedFavOrg = await User.updateOne(
          { _id: req.user._id },
          {
            $pull: { favOrg: { list_id: req.body.updateFavOrg.favOrg } },
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  },

  getIndex: (req, res) => {
    res.render("index.ejs");
  },

  list: async (req, res) => {
    try {
      const allLists = await Lists.find().sort({ createdAt: "desc" }).lean();
      res.json(allLists);
    } catch (err) {
      console.log(err);
    }
  },

  createList: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const list = await Lists.create({
        Title: req.body.Title,
        Image: result.secure_url,
        cloudinaryId: result.public_id,
        Category: req.body.Category,
        BriefSummary: req.body.BriefSummary,
        Summary: req.body.Summary,
      });

      res.status(200).json(list);
      console.log("list has been added", list);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to add list" });
    }
  },
};
