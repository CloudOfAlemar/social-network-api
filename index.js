/*
  Require modules
*/

const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

/*
  cwd retrieves the path to the directory
*/
const cwd = process.cwd();
const wd = cwd.split("/");

const app = express();
const PORT = process.env.PORT || 3001;

/*
  directory will display the folder related to the API
*/
const directory = cwd.includes("social-network-api") ? wd[wd.length - 1] : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

/*
  Show where the server is running and start the server
*/
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server for ${directory} running on port ${PORT}...`);
  });
});
