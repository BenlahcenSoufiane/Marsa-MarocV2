import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct named impor

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  let role;

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Use the correct named function
      role = decodedToken.role;
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto my-10">
      <div className="relative grid min-h-[500px] bg-white p-5 shadow-lg rounded-2xl overflow-x-auto">
        <div className="flex justify-between items-start mb-5">
          <h2 className="font-semibold ml-2 text-4xl text-gray-600">User List</h2>
          
            <Link to="/add-user" className="relative font-bold py-1.5 px-5 mx-5 bg-slate-600 text-white no-underline rounded-md">
              Add User
            </Link>)

        </div>
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 font-bold text-lg text-left text-gray-500 uppercase tracking-wider">MLE</th>
                <th className="px-6 py-3 font-bold text-lg text-left text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 font-bold text-lg text-left text-gray-500 uppercase tracking-wider">Fonction</th>
                <th className="px-6 py-3 font-bold text-lg text-left text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users
                .map(user => (
                  <tr key={user.id} className="border-b last:border-0">
                    <td className="px-6 py-4 whitespace-nowrap">{user.MLE}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.Name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.fonction}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* SHOULD ADD PREVILLIGES OF 1 TO DISPLAY THE BUTTON */}
                      
                        <Link to={`/edit-user/${user.id}`} className="bg-red-600 text-white px-5 py-4 rounded-lg w-24">Edit</Link>
                    
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default UserList;
