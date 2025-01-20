const express = require("express");
const path = require("path");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
var cors = require("cors");

// dotenv
dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(moragan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// Static file for images
//! BRANDS
app.use("/brands", express.static(path.join(__dirname, "brands")));
app.use("/", express.static("brands"));
app.use("/admin-brands", express.static("brands"));
//! CREATORS
app.use("/creators", express.static(path.join(__dirname, "creators")));
app.use("/", express.static("creators"));
app.use("/admin-creators", express.static("creators"));
app.use("/creator", express.static("creators"));
//! BRAND X CREATORS
app.use(
  "/brandsxcreators",
  express.static(path.join(__dirname, "brandsxcreators"))
);
app.use("/", express.static("brandsxcreators"));
app.use("/admin-brand-x-creators", express.static("brandsxcreators"));
app.use("/brandsxcreators", express.static("brandsxcreators"));

// routes
app.use("/api/user/", require("./routes/userRoutes"));
app.use("/api/contact/", require("./routes/contactRoutes"));
app.use("/api/admin/", require("./routes/adminRoutes"));

// PORT
const port = process.env.PORT || 8080;

// STATIC FILES RUNNING ON BUILD FOLDER
if (process.env.NODE_MODE === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running..");
  });
}

// Listen
app.listen(port, (req, res) => {
  console.log(
    `Server running in ${process.env.NODE_MODE} Mode on Port ${process.env.PORT}`
      .bgCyan
  );
});
