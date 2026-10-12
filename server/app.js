require("dotenv").config();
const express = require("express");
const { connectToMongoDB, getConnectedClient } = require("./database");
const router = require("./routes");

const app = express();
app.use(express.json());

// make sure we are connected before handling a request
// (needed on serverless, where there is no long-running startup)
app.use("/api", async (req, res, next) => {
    await connectToMongoDB();
    if (!getConnectedClient()) {
        return res.status(500).json({ mssg: "database unavailable" });
    }
    next();
});

app.use("/api", router);

module.exports = app;
