import Todos from "../models/todos.models.js";
import mongoose from "mongoose";
// add todo

const addTodo = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    res.status(400).json({
      message: "title or description required",
    });
    return;
  }

  const todo = Todos.create({
    title,
    description,
  });
  todo;
  // get all todo

  res.status(201).json({
    message: "user added to database successfully",
  });
};

//all todos
const allTodo = async (req, res) => {
  const todos = await Todos.find({});
  res.status(201).json({
    message: "Todos retrieved successfully.",
    todos: todos,
  });
};

// get single todo

const singleTodo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ erroe: "No such todos" });
  }

  const todo = await Todos.findById(id);
  res.status(201).json({
    message: "single todo found",
    todo,
  });
};
// delete todo
const deleteTodo = async (req, res) => {
  const { id } = req.params; // Get id from the request params

  // Validate the provided id to make sure it's a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: "No such todos" });
  }

  // Attempt to find and delete the todo item by the provided id
  const todo = await Todos.findByIdAndDelete(id);

  // If the todo is not found, return a 400 error
  if (!todo) {
    return res.status(400).json({
      error: "No todo found",
    });
  }

  // If the todo is deleted successfully, return a success message
  return res.status(200).json({
    message: "Todo deleted successfully",
  });
};

// edit todo
const editTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.json({ error: "No such todos" });
  }
  const todo = await Todos.findByIdAndUpdate(
    id,
    {
      title,
      description,
    },
    { new: true }
  );
  if (!todo) {
    return res.status(400).json({
      error: "No todo found",
    });
  }
  return res.status(200).json(todo);
};

export { addTodo, allTodo, singleTodo, deleteTodo, editTodo };
