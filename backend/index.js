require("dotenv").config();

const http = require("http");
const app = require("./app");
const connectDb = require("./config/db");

const normalizePort = (val) => {
  const port = parseInt(val, 10);
  return isNaN(port) ? val : port >= 0 ? port : false;
};

const port = normalizePort(process.env.PORT || 5001);

const onError = (error) => {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      console.error("Server error:", error);
      throw error;
  }
};

const init = async () => {
  try {
    const server = http.createServer(app);

    await connectDb();

    server.listen(port);
    server.on("error", onError);
    server.on("listening", () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (ex) {
    console.error("Initialization error:", ex);
    process.exit(1);
  }
};

init();
