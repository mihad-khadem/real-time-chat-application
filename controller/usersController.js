// Users Controller
const getUsers = (req, res, next) => {
  res.render("users", { title: "Users - Chat Application " });
};
module.exports = { getUsers };
