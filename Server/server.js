require("dotenv").config({ path: "./.env" });
const express = require("express");
// const errorHandler = require("./middleware/error");

const app = express();
PORT = process.env.PORT || 5000;

// body parser : let us extact data from request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// any request hit on "/api/auth" directed to the auth routes
app.use("/auth", require("./routes/auth"));

// protect routes
app.use("/", require("./routes/private"));

// errorHandler, should be the last piece of middleware
// app.use(errorHandler);

// start server, start listening to requests on given port
const server = app.listen(PORT, () => console.log(`Up & Running on ${PORT}`));

// handle 'UnhandledRejection' to prevent server crash
// if UnhandledRejection Error occure, just close the server
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", reason.stack || reason);
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
  server.close(() => {
    process.exit(1);
  });
});
