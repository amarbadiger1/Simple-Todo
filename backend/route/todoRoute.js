import express from "express"
import jwtVerification from "../auth/jwtVerification.js"
import { getTodo,addTodo,deleteTodo,updateTodo,getSingleTodo } from "../controller/todoController.js";
const router=express.Router()



router.get("/get-todo",jwtVerification,getTodo);

router.get("/get-singleTodo/:id",jwtVerification,getSingleTodo);

router.post("/add-todo",jwtVerification,addTodo);

router.delete("/delete-todo/:id",jwtVerification,deleteTodo);

router.patch("/update-todo/:uid",jwtVerification,updateTodo)


export default router