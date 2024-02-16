const express = require("express");
const app = express();
let dbConnect = require("./dbConnect");
require("dotenv").config();

app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MongoDB application." });
});

let userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const gameRoutes = require("./routes/gameRoutes");
app.use("/api/games", gameRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
