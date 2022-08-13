const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    `mongodb+srv://mido:${process.env.MONGO_PASSWORD}@cluster0.1suzkrt.mongodb.net/test`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

// Models
const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save();

  res.json(todo);
});

app.listen(PORT, () => console.log("Server run on port " + PORT));
