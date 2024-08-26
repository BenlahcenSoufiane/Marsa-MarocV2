import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FaPlus } from "react-icons/fa";
import './style.css'; // For additional custom styling
import './swal.css';

const AddAdmin = ({onDatachange}) => {
  
  const handleAddAdmin = () => {
    
   
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    Swal.fire({
      title: '<h2 class="swal-custom-title">Add Admin</h2>',
      html: `
        <input type="text" id="userName" class="swal2-input swal-custom-input" placeholder="Username">
        <input type="email" id="email" class="swal2-input swal-custom-input" placeholder="Email">
        <div class="password-container">
          <input type="password" id="password" class="swal2-input swal-custom-input password-input" placeholder="Password">
          <button type="button" id="togglePassword" class="password-toggle-button">
            <span class="password-toggle-icon">👁️</span>
          </button>
        </div>
        <select id="privilege" class="swal2-select swal-custom-select">
          <option value="master_admin">Master Admin</option>
          <option value="admin">Admin</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Add Admin',
      confirmButtonColor: '#6c63ff',
      cancelButtonColor: '#ff6b6b',
      customClass: {
        popup: 'swal-custom-popup',
        confirmButton: 'swal-custom-confirm',
        cancelButton: 'swal-custom-cancel',
      },
      didOpen: () => {
        const togglePasswordButton = Swal.getPopup().querySelector('#togglePassword');
        const passwordInput = Swal.getPopup().querySelector('#password');
  
        togglePasswordButton.addEventListener('click', () => {
          const type = passwordInput.type === 'password' ? 'text' : 'password';
          passwordInput.type = type;
        });
      },
      preConfirm: () => {
        const userName = Swal.getPopup().querySelector('#userName').value;
        const email = Swal.getPopup().querySelector('#email').value;
        const password = Swal.getPopup().querySelector('#password').value;
        const privilege = Swal.getPopup().querySelector('#privilege').value;
  
        if (!userName || !email || !password || !privilege) {
          Swal.showValidationMessage('Please fill out all fields');
          return false;
        } else if (!isValidEmail(email)) {
          Swal.showValidationMessage('The email is invalid');
          return false;
        }
  
        return { userName, email, password, privilege };
      }
    })
    .then((result) => {
      if (result.isConfirmed) {
        const { userName, email, password, privilege } = result.value;
        fetch('http://localhost:3000/addAdmin', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userName, mail: email, password, privilege }),
        })
          .then((response )=> { ; return response.json()})
          .then(data => {
            if (data.success) {
              Swal.fire('Success!', 'Admin added successfully!', 'success');
              onDatachange();
            } else {
              Swal.fire('warning', 'this mail already existed ', 'warning');
            }
          })
          .catch(error => {
            Swal.fire('Error', 'An error occurred while adding the admin', 'error');
          });
      }
    });
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: "#6c63ff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          padding: "10px 20px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          fontSize: "16px",
          marginTop: 20,
          width:60,
          height:40,
        }}
        onClick={handleAddAdmin}
      >
        <FaPlus style={{ marginRight: "8px" }} /> 
      </button>
    </div>
  );
};

export default AddAdmin;
