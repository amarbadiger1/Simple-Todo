import express from "express"
import jwtVerification from "../auth/jwtVerification.js"
import { getTodo,addTodo,deleteTodo,updateTodo } from "../controller/todoController.js";
const router=express.Router()



router.get("/get-todo",jwtVerification,getTodo);

router.post("/add-todo",jwtVerification,addTodo);

router.delete("/delete-todo/:id",jwtVerification,deleteTodo);

router.patch("/update-todo/:uid",jwtVerification,updateTodo)


export default router