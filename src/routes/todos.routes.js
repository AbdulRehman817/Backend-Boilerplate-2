import express from "express";
import {
  addTodo,
  allTodo,
  singleTodo,
  deleteTodo,
  editTodo,
  //   singleTodo,
} from "../controllers/todos.controllers.js";

const router = express.Router();

router.post("/todo", addTodo);
router.get("/alltodo", allTodo);
router.get("/todo/:id", singleTodo);
router.delete("/todo/:id", deleteTodo);
router.post("/todo/:id", editTodo);
// router.get("/todobyid", singleTodo);

export default router;
