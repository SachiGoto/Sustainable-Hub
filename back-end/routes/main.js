const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const recipesController = require("../controllers/recipe");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
router.get("/favorites", ensureAuth, recipesController.getFavorites);

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, recipesController.getProfile);
router.get("/feed", recipesController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
// router.post("/signup", homeController.test);
router.get("/list", homeController.list);
router.post("/addList", upload.single("image"), homeController.createList);
// router.post("/addList", homeController.createList);

module.exports = router;
