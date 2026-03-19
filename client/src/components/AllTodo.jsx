import API from "../services/api"
import { toast } from "react-toastify"
import { FaTrash } from "react-icons/fa";

const AllTodo = ({ _id, title, description, completed, fetchtodo }) => {
  // const [updateTodo, setupdateTodo] = useState({})
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


  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md flex justify-between items-center">

      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-300">{description}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleToggle}
          className={`px-4 py-1 rounded-lg text-sm font-semibold transition border-red-100 border-2`}
        >
          {completed ? "Done" : "Mark Done"}
        </button>
        <button onClick={handleDelete} className="p-2 rounded bg-gray-600"><FaTrash /></button>
      </div>
    </div>
  )
}

export default AllTodo