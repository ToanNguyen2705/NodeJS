const { request, response } = require("express");
const express = require("express");
const res = require("express/lib/response");
const bodyParser = require("body-parser");

const userRoute = require("./routes/user.route");

const port = 3000;

const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static("public"));

app.get("/", (request, response) => {
  response.render("index", {
    name: "World",
  });
});

app.use("/user", userRoute);

app.listen(port, () => {
  console.log("server listening on port " + port);
});
