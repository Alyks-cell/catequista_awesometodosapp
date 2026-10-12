require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const express = require("express");
const path = require('path');
const app = require("./app");

app.use(express.static(path.join(__dirname, 'dist')));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
