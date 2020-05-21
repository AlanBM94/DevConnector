const express = require("express");
const app = express();
const connectDB = require("./config/db");
const usersRoutes = require("./routes/api/users");
const authRoutes = require("./routes/api/auth");
const profileRoutes = require("./routes/api/profile");
const postsRoutes = require("./routes/api/posts");
const path = require("path");

// Connect database
connectDB();

//Init middlewares
app.use(
  express.json({
    extended: false,
  })
);

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
