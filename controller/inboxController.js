// inbox controller
const getInbox = (req, res, next) => {
  //   console.log("inbox router");
  res.render("inbox", { title: "Inbox - Chat Application " });
};
module.exports = { getInbox };
