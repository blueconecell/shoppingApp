require("dotenv").config();
const express = require("express");
const passport = require("passport");
const session = require("express-session"); // express-session 미들웨어 추가
const cookieSession = require("cookie-session");
const app = express();

require("./passport-setup");

app.set("view engine", "ejs");

// express-session을 사용하도록 설정
app.use(
  session({
    secret: process.env.SESSION_SECRET, // 세션 암호화를 위한 시크릿 키 (dotenv에서 설정하세요)
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.render("pages/index");
});
app.get("/success", (req, res) => {
  res.render("pages/profile.ejs", { name: req.user.displayName, email: req.user.emails[0].value, pic: req.user.photos[0].value });
});

app.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/google/callback", passport.authenticate("google", { failureRedirect: "/failed" }), function (req, res) {
  res.redirect("/success");
});
app.get("/logout", (req, res) => {
  req.session = null;
  // req.logout();
  res.redirect("/");
});
app.listen(5000, () => {
  console.log("app is running on port 5000");
});
