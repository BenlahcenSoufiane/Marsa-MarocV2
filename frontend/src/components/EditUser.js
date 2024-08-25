// EditUser.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    MLE: '',
    Name: '',
    fonction: ''
  });

  useEffect(() => {
    fetch(`http://localhost:3000/api/users/${id}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        navigate(`/users`);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div className="container mx-24 my-5">
  <form onSubmit={handleSubmit} className="w-2/3 mx-auto  bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-semibold text-gray-900 text-center mb-5">Edit User</h3>

    <div className="mb-5">
      <label htmlFor="mle" className="block mb-2 text-sm font-medium text-gray-900">MLE</label>
      <input
        type="text"
        id="mle"
        name="MLE"
        value={user.MLE}
        onChange={handleChange}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required
      />
    </div>

    <div className="mb-5">
      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
      <input
        type="text"
        id="name"
        name="Name"
        value={user.Name}
        onChange={handleChange}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required
      />
    </div>

    <div className="mb-5">
      <label htmlFor="fonction" className="block mb-2 text-sm font-medium text-gray-900">Fonction</label>
      <input
        type="text"
        id="fonction"
        name="fonction"
        value={user.fonction}
        onChange={handleChange}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        required
      />
    </div>

    <div className="flex justify-end">
      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
        Save
      </button>
    </div>
  </form>
</div>

  );
}

export default EditUser;
