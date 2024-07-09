const cookieParser = require("cookie-parser");
const express = require("express");
const midError = require("./middleware/error");
const userRoute = require("./routes/userRoute");
const referalRoute = require("./routes/referalRoute");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "https://accredian-frontend-task-two-sigma.vercel.app/",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.use("/api", userRoute);
app.use("/api", referalRoute);

app.use(midError);
module.exports = app;
