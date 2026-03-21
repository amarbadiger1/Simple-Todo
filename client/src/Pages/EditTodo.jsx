import React, { useState } from 'react'
import { useEffect } from 'react'
import API from "../services/api"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const EditTodo = () => {
  const { id } = useParams();
  const nagivate = useNavigate()
  const [todo, setTodo] = useState({
    title: "",
    description: ""
  });


  const getSignleTodo = async () => {
    try {
      const res = await API.get(`/todo/get-singleTodo/${id}`)
      setTodo(res.data.todo);
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg)
    }
  }

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({ ...todo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.patch(`todo/update-todo/${id}`, todo)
      nagivate("/dashboard")
      toast.success("todo updated")
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg)
    }
  };

  function goBack() {
    nagivate("/dashboard")
  }

  useEffect(() => {
    getSignleTodo();
  }, [id])

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white px-4 py-6">

      {/* Header */}
      <div className="w-full max-w-xl flex items-center justify-between mb-6">
        <button
          className="text-xl border border-white/40 p-2 rounded-full hover:bg-white/10 transition"
          onClick={goBack}
        >
          <IoMdArrowRoundBack />
        </button>

        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center flex-1">
          Update Todo
        </h1>

        {/* Empty div to balance layout */}
        <div className="w-10"></div>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 shadow-xl">

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            name="title"
            type="text"
            value={todo.title}
            placeholder="Enter Title"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="description"
            type="text"
            value={todo.description}
            placeholder="Enter Description"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/20 placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded-lg font-semibold transition"
          >
            Update
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditTodo
