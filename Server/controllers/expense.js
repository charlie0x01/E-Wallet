exports.addExpense = (req, res, next) => {
  res.send("you can add new expenses");
  next();
};
exports.deleteExpense = (req, res, next) => {
  res.send("you can delete an expense");
  next();
};
exports.updateExpense = (req, res, next) => {
  res.send("you can update an expense");
  next();
};
