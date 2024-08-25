import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct named import
import logo from '../images/logo.png'; // Import the logo image
import '../App.css'; // Import the CSS file for Navbar styling


function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let username;
  let id;

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Use the correct named function
      username = decodedToken.username;
      id = decodedToken.id;
      console.log('USERNAME AND ID :' ,username,id);
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="backdrop-filter backdrop-blur-md p-4 ">
      <div className="container mx-auto flex justify-between items-center space-x-8">
        {/* Use img tag with src set to the logo image */}
        <Link to="/">
          <img src={logo} alt="Logo" className="logo-small" />
        </Link>
        <div className="flex space-x-8">
          <Link className="text-gray-700 hover:border text-xl  hover:border-transparent px-8 py-3 rounded-lg hover:text-red-600 hover:bg-white font-bold no-underline" to="/users">USERS</Link>
          <Link className="text-gray-700 hover:border text-xl  hover:border-transparent px-8 py-3 rounded-lg hover:text-red-600 hover:bg-white font-bold no-underline" to="/loans">ADMIN</Link>
          <Link className="text-gray-700 hover:border text-xl  hover:border-transparent px-8 py-3 rounded-lg hover:text-red-600 hover:bg-white font-bold no-underline" to="/dashboard">DASHBOARD</Link>
          <Link className="text-gray-700 hover:border text-xl  hover:border-transparent px-8 py-3 rounded-lg hover:text-red-600 hover:bg-white font-bold no-underline" to="/About">ABOUT US</Link>
          
          
        </div>
        <div className="ml-auto flex space-x-8">
          {token ? (
            <>
              <button
                className="text-white bg-black w-fit border-transparent rounded px-4 py-2 font-bold no-underline"
                onClick={handleLogout}
              >
                Logout
              </button>
              <Link
                className="text-white bg-black w-fit border-transparent rounded px-4 py-2 font-bold no-underline"
                to={`/edit-profile/${id}`}
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link className="text-white bg-[#d4af7a] border-transparent rounded px-4 py-2 font-bold no-underline" to="/AuthPage">Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;