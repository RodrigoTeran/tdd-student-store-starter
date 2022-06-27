const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("tiny"))
app.use(express.json());

app.get("/", (_req, res) => {
    res.status(200).json({
        ping: "pong"
    })
})

// Routes
app.use("/store", require("./routes/store.routes"));


module.exports = app;