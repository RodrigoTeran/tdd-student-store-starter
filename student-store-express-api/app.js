const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(morgan("tiny"))
app.use(express.json());

app.use(
    cors({
        origin: "https://student-store.vercel.app",
        allowedHeaders: ["Content-Type", "Accept"],
        credentials: true,
        methods: ['GET', 'PUT', 'POST']
    })
);

app.get("/", (_req, res) => {
    res.status(200).json({
        ping: "pong"
    })
})

// Routes
app.use("/store", require("./routes/store.routes"));


module.exports = app;