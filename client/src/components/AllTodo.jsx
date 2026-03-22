import API from "../services/api"
import { toast } from "react-toastify"
import { FaTrash } from "react-icons/fa";
import { IoIosCheckboxOutline } from "react-icons/io";
import { IoIosCheckbox } from "react-icons/io";
import { RiFileEditFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AllTodo = ({ _id, title, description, completed, fetchtodo }) => {
  const navigate = useNavigate()
  const [loading, setloading] = useState(false)

  const handleToggle = async () => {
    setloading(true)
    try {
      const id = _id;
      const res = await API.patch(`todo/update-todo/${id}`, { completed: !completed })
      toast.success(res.data.message);
      fetchtodo()
      // console.log(res);
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg)
    } finally {
      setloading(false)
    }
  };

  const handleDelete = async () => {
    setloading(true)
    try {
      const id = _id;
      const res = await API.delete(`/todo/delete-todo/${id}`)
      toast.success(res.data.message);
      fetchtodo()
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg)
    } finally {
      setloading(true)
    }
  }

  const handleEdit = () => {
    navigate(`/edit/${_id}`)
  }

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-300">{description}</p>
      </div>
      <div className="flex gap-2">
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (<>
        <button className="text-2xl"
          onClick={handleToggle}
        >
          {completed ? <IoIosCheckbox /> : <IoIosCheckboxOutline />}
        </button>
          <button className="text-xl" onClick={handleEdit}><RiFileEditFill /></button>
          <button disabled={loading} onClick={handleDelete} className="text-xl"><FaTrash /></button> </>
        )}
      </div>
    </div>
  )
}

export default AllTodo