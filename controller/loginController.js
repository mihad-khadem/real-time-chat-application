const getLogin = (req, res, next) => {
  res.render("login", { title: "Login - Chat Application " });
};
module.exports = { getLogin };
