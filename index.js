const express = require("express");
const passport = require("passport");
const mailer = require("./mailer");
require("./auth");

const app = express();

app.use(passport.initialize());

//Main Screen with Login Button
app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Log In with Google</a>');
});

// Google Auth
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// Google Auth redirect
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/auth/google/failure",
  })
);

// If Google Auth Success redirected to home page with send mail button
app.get("/home", (req, res) => {
  res.send(`<a href="/send-mail">Send Mail</a>`);
});

// If Google Auth Failed
app.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

//Send Mail to all registerd Users
app.use("/send-mail", (req, res) => {
  mailer.mailSender();
  res.redirect("/home");
});

app.listen(5000, () => console.log("Listening on port: 5000"));
