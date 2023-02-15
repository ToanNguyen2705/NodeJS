const db = require("../db");
const shortid = require("shortid");

module.exports.index = (request, response) => {
  response.render("user/index", {
    userList: db.get("userList").value(),
  });
};

module.exports.search = (request, response) => {
  let q = request.query.q;
  let matchedUsers = db
    .get("userList")
    .value()
    .filter(
      (userList) => userList.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    );
  response.render("user/index", {
    userList: matchedUsers,
  });
};

module.exports.create = (request, response) => {
  response.render("user/create");
};

module.exports.get = (request, response) => {
  const id = request.params.id;

  const user = db.get("userList").find({ id: id }).value();
  response.render("user/view", {
    user: user,
  });
};

module.exports.postCreate = (request, response) => {
  request.body.id = shortid.generate();
  const errors = [];

  if (!request.body.name) {
    errors.push("Name is required.");
  }

  if (!request.body.phone) {
    errors.push("Phone is required.");
  }

  if (errors.length) {
    response.render("user/create", {
      errors: errors,
      values: request.body,
    });
    return;
  }
  db.get("userList").push(request.body).write();
  response.redirect("/user");
};
