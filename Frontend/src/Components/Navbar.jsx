import { Link } from "react-router-dom";
import {User ,LogOut} from 'lucide-react'
import '../assets/hobby.png'

const NAVBAR = () => {
  const logout = ()=>{
    
  }
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2">
        <img src="../assets/hobby.png" />
        <span className="text-xl font-semibold"> Hobby</span>
      </Link>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link to="/profile">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center space-x-2">
            <User className="size-5" />
            <span>Profile</span>
          </button>
        </Link>
        <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center space-x-2" onClick={logout}>
          <LogOut className="size-5" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default NAVBAR;
