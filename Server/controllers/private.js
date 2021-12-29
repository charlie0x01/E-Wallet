exports.privateRoute = (req, res, next) => {
  res.send("you have access to private data");
};
