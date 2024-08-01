const express = require("express");
const cors = require("cors");

// const { errorHandler } = require("./middleware/error-handler");
const employee = require("./routes/employee");
const cafe = require("./routes/cafe");

const app = express();
app.use(cors());

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Sample route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use("/api/employee", employee);
app.use("/api/cafe", cafe);

// app.use(errorHandler);

module.exports = app;
