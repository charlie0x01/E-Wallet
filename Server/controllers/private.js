exports.privateRoute = (req, res, next) => {
    res.send("private data");
    next();
}