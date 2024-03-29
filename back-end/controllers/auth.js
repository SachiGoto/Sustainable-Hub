const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");

exports.getLogin = (req, res) => {
  console.log("req.user is ", req.user);
  if (req.user) {
    return res.json({ login: true, user: req.user });
  }

  return res.json({ login: false });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push("Please enter a valid email address.");
  if (validator.isEmpty(req.body.password))
    validationErrors.push("Password cannot be blank.");

  if (validationErrors.length) {
    return res.json(validationErrors);
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json("Your email and/or passowrd is not valid");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log("logged in ", user);
      return res.json({ login: true, user: user });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log("User has logged out.");
  });
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push("Please enter a valid email address.");
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push("Password must be at least 8 characters long");
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push("Passwords do not match");

  if (validationErrors.length) {
    return res.json({ error: true, message: validationErrors[0] });
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    favOrg: [],
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        res.json({
          error: true,
          message:
            "Account with that email address or username already exists.",
        });
 
        return res.json("success");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.json("success");
        });
      });
    }
  );
};
