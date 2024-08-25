// AddBookForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddUserForm() {
  const [formData, setFormData] = useState({
    MLE: '',
    Name: '',
    Fonction: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate('/users');
    })
    .catch(error => console.error('Error adding user:', error));
  };

  return (
    <div className="container mx-36  my-5">
      <form onSubmit={handleSubmit} className="w-2/3 mx-auto  bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-5">Add User</h2>
        
        <div className="mb-5">
          <label htmlFor="mle" className="block mb-2 text-sm font-medium text-gray-900">MLE</label>
          <input
            type="text"
            id="mle"
            name="MLE"
            value={formData.MLE}
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
            value={formData.Name}
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
            name="Fonction"
            value={formData.Fonction}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>

        <button type="submit" className="w-full text-white bg-red-600  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
          Add User
        </button>
      </form>
    </div>
  );
}

export default AddUserForm;
