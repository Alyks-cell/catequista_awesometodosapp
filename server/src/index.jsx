const express = require("express");
const app = express();

// import our todos router
const router = require("./routes");

// use /api to prefix our endpoints
app.use("/api", router);

const port = 5000;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
}) 