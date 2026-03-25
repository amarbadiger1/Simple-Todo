import React, { useState } from 'react'
import API from '../services/api';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
const Register = () => {
  const [formData, setformData] = useState({ username: "", password: "" })
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/api/register", formData)
      console.log(res.data.message);
      navigate("/")
      toast.success(res.data.message)
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong";
      toast.error(msg)
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-blue-900">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Create Account 🚀
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Username */}
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              type="text"
              placeholder="Enter your Email"
              value={formData.username}
              onChange={(e) =>
                setformData({ ...formData, username: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) =>
                setformData({ ...formData, password: e.target.value })
              }
              className="w-full mt-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
            {/* <p className='text-sm text-white'>Password must be 8 characters</p> */}
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="w-full h-10 mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300 shadow-lg flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Register"
            )}
          </button>

        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  )
}

export default Register