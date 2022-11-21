const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const serviceAccount = require("../firebaseAccountKey.json");
const cookieParser = require("cookie-parser");
const db = require("./database/connect.js");
const authRoute = require("./auth/auth.routes");

dotenv.config({ path: "./.env" });

db.connect();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use("/", express.static(path.join(__dirname, "public")));

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, world!" });
});
app.use("/", authRoute);

app.listen(process.env.PORT, () => {
  console.log("Listen on port: http://localhost:" + process.env.PORT);
});
