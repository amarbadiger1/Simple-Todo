import API from "../services/api"
import { toast } from "react-toastify"
import { FaTrash } from "react-icons/fa";
import { IoIosCheckboxOutline } from "react-icons/io";
import { IoIosCheckbox } from "react-icons/io";
import { RiFileEditFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const AllTodo = ({ _id, title, description, completed, fetchtodo }) => {
  const navigate = useNavigate()
  const handleToggle = async () => {
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
    }
  };

  const handleDelete = async () => {
    try {
      const id = _id;
      const res = await API.delete(`/todo/delete-todo/${id}`)
      toast.success(res.data.message);
      fetchtodo()
    } catch (error) {
      console.log(error);
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg)
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
        <button className="text-2xl"
          onClick={handleToggle}
        >
          {completed ? <IoIosCheckbox /> : <IoIosCheckboxOutline />}
        </button>
        <button className="text-xl" onClick={handleEdit}><RiFileEditFill /></button>
        <button onClick={handleDelete} className="text-x"><FaTrash /></button>
      </div>
    </div>
  )
}

export default AllTodo