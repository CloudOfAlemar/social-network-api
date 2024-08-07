const express = require("express");
const db = require("./config/connection");
const User = require("./models/User");

const cwd = process.cwd();
const wd = cwd.split("/");

const app = express();
const PORT = process.env.PORT || 3001;

const directory = cwd.includes("social-network-api") ? wd[wd.length - 1] : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server for ${directory} running on port ${PORT}...`);
  });
});
