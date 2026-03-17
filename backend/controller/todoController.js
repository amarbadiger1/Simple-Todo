import Todo from "../model/todoSchema.js"

export const getTodo = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId);
        
        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            })
        }

        const todos = await Todo.find({ user: userId })
        if (todos.length === 0) {
            return res.status(404).json({
                message: "No todos found"
            })
        }

        return res.status(200).json({
            todos
        })
    } catch (error) {
        console.log(error.message)

        return res.status(500).json({
            message: "Server error"
        })
    }

}


export const addTodo = async (req, res) => {
    try {
        const { title, description, completed } = req.body;
        const userid = req.user.id;

        if (!userid) {
            return res.status(401).json({
                message: "User not authenticated"
            })
        }

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            })
        }

        const todo = await Todo.create({
            title,
            description,
            completed,
            user: userid
        })

        res.status(201).json({
            message: "Todo created",
            todo
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Server error"
        })
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const userId = req.user.id;

        // if (!todoId) {
        //     return res.status(404).json({
        //         message: "Delete Id Not Found"
        //     })
        // }
        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            })
        }

        const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, user: userId })

        if (!deletedTodo) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            message: "Todo Deleted"
        });

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Server error"
        })
    }
}


export const updateTodo = async (req, res) => {
    try {
        const updateId = req.params.uid;
        const userId = req.user.id
        if (!userId) {
            return res.status(401).json({
                message: "User not authenticated"
            })
        }
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: updateId, user: userId },
            req.body,
            { returnDocument: "after" }
        );

        if (!updatedTodo) {
            return res.status(400).json({
                message: "Update cancelled"
            });
        }

        return res.status(200).json({
            message: "Todo updated",
            todo: updatedTodo
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Server error"
        })
    }
}