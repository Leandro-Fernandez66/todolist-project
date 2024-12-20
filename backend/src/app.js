require("dotenv").config();
const express = require('express');
const cors = require("cors");
const todosRoutes = require("./routes/todoRoutes");
const usersRoutes = require("./routes/userRoutes");
const { authRoutes } = require("./routes/authRoutes");
const { verifyToken } = require("./middlewares/authMiddleware");
const { connectMongoDb } = require("./config/db/mongoDb");

const app = express();

app.use(express.json());

const port = process.env.PORT;

connectMongoDb();

app.use(cors());

app.use("/auth", authRoutes);

app.use(verifyToken);

app.use("/todos", todosRoutes);
app.use("/users", usersRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
