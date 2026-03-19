const AllTodo = ({ _id, title, description, completed }) => {

  const handleToggle = () => {
    console.log("Toggle clicked for:", _id);
    // later you will call API here
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md flex justify-between items-center">

      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-300">{description}</p>
      </div>

      {/* Button */}
      <button
        onClick={handleToggle}
        className={`px-4 py-1 rounded-lg text-sm font-semibold transition border-red-100 border-2`}
      >
        {completed ? "Done" : "Mark Done"}
      </button>

    </div>
  )
}

export default AllTodo