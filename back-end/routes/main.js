const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);


router.get("/list", homeController.list);
router.get("/getFavorite", ensureAuth, homeController.getFavList);
router.post("/addList", upload.single("image"), homeController.createList);
router.post("/addFavorite", upload.single("image"), homeController.createFavList);
router.put("/favoriteOrg", homeController.favoriteOrg);

// My favorite org list
router.put("/deleteFavoriteOrg", homeController.deleteFavoriteOrg);

//My favorite list
router.delete("/deleteMyFavOrg/:id", homeController.deleteMyFavOrg);
module.exports = router;
