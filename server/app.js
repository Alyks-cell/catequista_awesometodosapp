require("dotenv").config();
const express = require("express");
const { connectToMongoDB } = require("./database");
const router = require("./routes");

const app = express();
app.use(express.json());

// make sure we are connected before handling a request
// (needed on serverless, where there is no long-running startup)
app.use(async (req, res, next) => {
    try {
        await connectToMongoDB();
        next();
    } catch (error) {
        next(error);
    }
});

// served under /api, and also at the root in case the host strips the prefix
app.use("/api", router);
app.use("/", router);

// always answer with JSON so the client can show what went wrong
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ mssg: err.message || "server error" });
});

module.exports = app;
