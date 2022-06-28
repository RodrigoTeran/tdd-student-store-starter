const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { NotFoundError } = require("./utils/errors");

app.use(morgan("tiny"))
app.use(express.json());

app.use(
    cors({
        // origin: "https://student-store.vercel.app",
        origin: "*",
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
app.use("/orders", require("./routes/order.routes"));

// Error handlers
app.use((_req, _res, next) => {
    return next(new NotFoundError());
});

app.use((error, _req, res, _next) => {
    const status = error.status || 500;
    const message = error.message || "Something wen't wrong in the application";

    return res.status(status).json({
        error: {
            status,
            message
        }
    });
});

module.exports = app;