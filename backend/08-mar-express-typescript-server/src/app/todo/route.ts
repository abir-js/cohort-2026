import { Router } from "express";
import TodoController from "./controller.js";

const router = Router();

const controller = new TodoController();

router.get("/", controller.handleGetAllTodos.bind(controller));
// router.post("/")

// router.get("/:id")

// router.put("/:id")
// router.delete("/:id")


export default router;