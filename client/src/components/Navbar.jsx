import React from 'react'
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate()
    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/")
    }
    return (
        <div>
            <nav className='flex justify-between gap-3 max-w-xl m-auto p-2 mb-4'>
                <h1 className='text-2xl font-semibold'>Dashboard</h1>
                <button onClick={handleLogout} className='bg-blue-400 py-1 px-4 rounded font-semibold'>Logout</button>
            </nav>
        </div>
    )
}

export default Navbar
