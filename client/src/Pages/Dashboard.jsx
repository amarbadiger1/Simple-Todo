import React, { useEffect, useState } from 'react'
import API from '../services/api';
import AllTodo from '../components/AllTodo';
import Navbar from '../components/Navbar';
import { toast } from "react-toastify";
const Dashboard = () => {
  const [todoData, settodoData] = useState({ title: "", description: "", completed: false })
  const [todo, settodo] = useState([])

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/todo/add-todo", todoData)
      settodoData({ title: "", description: "", completed: false })
      getTodo();
      toast.success(res.data.message);
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg)
    }
  }

  async function getTodo() {
    try {
      const res = await API.get("/todo/get-todo")
      settodo(res.data.todos)
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg)
    }
  }

  useEffect(() => {
    getTodo()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white p-6">


      <Navbar />
      {/* Form Card */}
      <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl">

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Title */}
          <input
            type="text"
            placeholder="Enter Title"
            value={todoData.title}
            onChange={(e) =>
              settodoData({ ...todoData, title: e.target.value })
            }
            className="px-4 py-2 rounded-lg bg-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Description */}
          <input
            type="text"
            placeholder="Enter Description"
            value={todoData.description}
            onChange={(e) =>
              settodoData({ ...todoData, description: e.target.value })
            }
            className="px-4 py-2 rounded-lg bg-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Checkbox */}
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              checked={todoData.completed}
              onChange={(e) =>
                settodoData({ ...todoData, completed: e.target.checked })
              }
            />
            Mark as completed
          </label>

          {/* Button */}
          <button className="bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-semibold transition">
            Add Todo
          </button>

        </form>
      </div>

      {/* Todo List */}
      <div className="mt-10 max-w-xl mx-auto grid gap-4">

        {todo.length === 0 ? (
          <p className="text-center text-gray-400">No todos yet</p>
        ) : (
          todo.map((e) => (
            <div
              key={e._id}
            >
              <AllTodo {...e} fetchtodo={getTodo} />
            </div>
          ))
        )}

      </div>

    </div>
  )
}

export default Dashboard