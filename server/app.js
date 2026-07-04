const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");

app.use(cors());


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Welcome to Yours?");
});

app.post("/test", (req, res) => {
    console.log(req.body);

    res.json({
        message: "Data received successfully!",
        data: req.body
    });
});

module.exports = app;