const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect("mongodb://localhost:27017/myblog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
