const express = require("express");
const app = express();

app.get("/", (req, res) => {  //route for the home page
    res.send("Welcome to Yours?");
});

module.exports = app;