const mongoose = require("mongoose");
const cloudinary = require("../middleware/cloudinary");
const Lists = require("../models/List");
const FavList = require("../models/MyFavs");
const User = require("../models/User");

module.exports = {
  deleteMyFavOrg: async (req, res) => {
    try {
      console.log("req.params.id is ", req.params.id);
      // Find post by id
      let myFavOrg = await FavList.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(myFavOrg.cloudinaryId);
      // Delete post from db
      await FavList.remove({ _id: req.params.id });
      res.json("item removed");
    } catch (err) {
      res.json(err);
    }
  },

  deleteFavoriteOrg: async (req, res) => {
    try {
      const userData = await User.find(req.user._id);
      const favOrgArray = userData[0].favOrg;
      let findOrg = favOrgArray.find((org) => {
        return org.list_id == req.body.updateFavOrg.orgId;
      });

      const updatedFavOrg = await User.updateOne(
        { _id: req.user._id },
        {
          $pull: { favOrg: { list_id: req.body.updateFavOrg.orgId } },
        }
      );

      res.json("item deleted");
    } catch (err) {
      console.log(err);
    }
  },
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
        WebsiteLink: req.body.WebsiteLink,
        Summary: req.body.Summary,
        Tags: req.body.Tags,
      });

      res.status(200).json(list);
      console.log("list has been added", list);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to add list" });
    }
  },

  createFavList: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      const list = await FavList.create({
        Title: req.body.Title,
        Image: result.secure_url,
        cloudinaryId: result.public_id,
        WebsiteLink: req.body.WebsiteLink,
        Summary: req.body.Summary,
        User: req.body.User,
      });

      res.status(200).json(list);
      console.log("your favorite has been added", list);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to add list" });
    }
  },

  getFavList: async (req, res) => {
    try {
      const favorites = await FavList.find({ User: req.user._id })
        .sort({ createdAt: "desc" })
        .populate("favlists");
      res.json(favorites);
    } catch (err) {
      console.log(err);
    }
  },
};
