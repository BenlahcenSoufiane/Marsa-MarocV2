import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'
import { MdDelete } from 'react-icons/md';
import { AiOutlineStop } from 'react-icons/ai';

const AdminTable = ({ ondataChange }) => {
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const [adminsList, setAdminList] = useState([]);
    const [userName, setUserName] = useState('');
    const [mail, setMail] = useState('');
    const [privelege, setPrivilege] = useState('');
    const [erreurintellLoad, setErreurintellLoad] = useState(true);
    const [isHover, setIsHover] = useState(false);
    const [indexHover, setIndexHover] = useState(0);
    const [renderCmp, setRenderCmp] = useState(0);
    const buttonStyle = {
        position: 'relative',
        display: 'inline-block',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: isHover ? '#0056b3' : '#007bff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease',
      };
      const buttonStyle2 = {
        position: 'relative',
        display: 'inline-block',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: isHover ? '#d2ee31' : '#e0ff2f',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'background-color 0.3s ease',
      };


    const successAlert = (message) => {
        toast.success(message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: { width: '300px', fontSize: '10px' },
        });
    };

    const errorAlert = (message) => {
        toast.error(message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: { width: '300px', fontSize: '10px' },
        });
    };

    const deleteAdmin = async (id) => {
        try {
            const response = await fetch('http://localhost:3000/deleteAdmin', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });
            if (response.ok) {
                successAlert("Admin deleted successfully");
                setRenderCmp(!renderCmp);
            } else if (response.status === 202) {
                warningAlert("A problem occurred");
            }
        } catch (error) {
            console.log('An error occurred');
            errorAlert("Can't delete the admin");
        }
    };

    const blockAdmin = async (id, prev, stopped) => {
        try {
            const response = await fetch('http://localhost:3000/blocked_admin', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id, prev: prev, stopped: stopped }),
            });
            if (response.ok && !stopped) {
                successAlert('The admin was blcok successfully');
            } else if (response.ok && stopped) {
                successAlert('The admin was unblocked successfully');
            } else if (response.status === 404) {
                warningAlert('Can\'t stop it');
            }
        } catch (error) {
            console.log(error);
            errorAlert('Problem with the server');
        }
    };

    const warningAlert = (message) => {
        toast.warning(message, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            style: { width: '300px', fontSize: '10px' },
            width :100 ,
        });
    };

    const handlePutInfoAdmin = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/changeInfoAdmin', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                successAlert("Changed successfully");
            } else {
                errorAlert('Information not changed');
            }
        } catch (error) {
            Swal.fire({
                title: 'Oops...',
                icon: 'error',
                text: 'Something went wrong, try again!',
            });
        }
    };

    const handleGet = async () => {
        try {
            const response = await fetch('http://localhost:3000/getAdmin', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.ok) {
                setErreurintellLoad(false);
                const data = await response.json();
                setAdminList([...data.admins]);
            } else {
                console.log('There is an error');
            }
        } catch (error) {
            setErreurintellLoad(true);
            console.log('Error');
            Swal.fire({
                title: 'Oops...',
                icon: 'error',
                text: 'Something went wrong, try again!',
            });
        }
    };

    useEffect(() => {
        handleGet();
    }, [renderCmp, ondataChange]);

    const handleChange = (index, keyWord, val) => {
        const tmpData = [...adminsList];
        tmpData[index][keyWord] = val;
        setAdminList(tmpData);
        setRenderCmp(!renderCmp);
    };

    return (
       <div className="admin-table-container mt-5">
            {erreurintellLoad ? (
                <div className="alert admin-table-alert alert-danger" role="alert">
                    An error occurred while loading the data.
                </div>
            ) : (
                <table className="table admin-table">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Privilege</th>
                            <th className="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {adminsList.map((admin, index) => (
                            <tr key={index} onMouseEnter={() => { setIsHover(true); setIndexHover(index); }} onMouseOut={() => setIsHover(false)}>
                                <td onMouseEnter={() => { setIsHover(true); setIndexHover(index); }} onMouseOut={() => setIsHover(false)}>
                                    <input
                                        className="form-control admin-table-input"
                                        type="text"
                                        value={admin.userName}
                                        onFocus={() => setUserName(admin.userName)}
                                        onChange={(event) => handleChange(index, 'userName', event.target.value)}
                                        onBlur={(event) => {
                                            if (userName !== event.target.value) {
                                                handlePutInfoAdmin({ id: admin.id, userName: event.target.value });
                                            }
                                        }}
                                    />
                                </td>
                                <td onMouseEnter={() => { setIsHover(true); setIndexHover(index); }} onMouseOut={() => setIsHover(false)}>
                                    <input
                                        className="form-control admin-table-input"
                                        type="email"
                                        value={admin.mail}
                                        onFocus={() => setMail(admin.mail)}
                                        onChange={(event) => handleChange(index, 'mail', event.target.value)}
                                        onBlur={(event) => {
                                            if (mail !== event.target.value && isValidEmail(event.target.value)) {
                                                handlePutInfoAdmin({ id: admin.id, mail: event.target.value });
                                            } else if (mail !== event.target.value) {
                                                warningAlert('Invalid email address');
                                            }
                                        }}
                                    />
                                </td>
                                <td onMouseEnter={() => { setIsHover(true); setIndexHover(index); }} onMouseOut={() => setIsHover(false)}>
                                    <select
                                        className="form-select admin-table-select"
                                        onFocus={() => setPrivilege(admin.privilege ? 'master admin' : 'admin')}
                                        onBlur={(event) => {
                                            if (privelege !== event.target.value) {
                                                handlePutInfoAdmin({ id: admin.id, privilege: (event.target.value === 'master admin' ? 1 : 0 )})
                                            
                                            }
                                        }}
                                    >
                                        <option value={admin.privilege ?'master admin': 'admin'}>{admin.privilege ? 'master admin': 'admin'}</option>
                                        <option value={!(admin.privilege) ? 'master admin' : 'dmin'}>{!(admin.privilege) ? 'master admin' : 'dmin'}</option>
                                    </select>
                                </td>
                                <td className="text-center" onMouseEnter={() => { setIsHover(true); setIndexHover(index); }} onMouseOut={() => setIsHover(false)}>
                                    {(
                                        <div className="admin-table-actions">
                                            <button
                                                className="admin-table-button admin-table-btn-danger"
                                                onClick={() => deleteAdmin(admin.id)}
                                                onMouseEnter={() => { setIsHover(true); setIndexHover(index); }} onMouseOut={() => setIsHover(false)}
                                            >
                                                <MdDelete />
                                            </button>
                                            <button
                                                className="admin-table-button admin-table-btn-block"
                                                onClick={() => {
                                                    blockAdmin(admin.id, admin.privilege, !admin.stoped);
                                                    handleChange(index, 'stoped', !admin.stoped);
                                                }}
                                                style={admin.stoped ? buttonStyle : buttonStyle2}
                                                onMouseEnter={() => { setIsHover(true); setIndexHover(index); }} onMouseOut={() => setIsHover(false)}
                                            >
                                                <AiOutlineStop />
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <ToastContainer />
        </div>
    );
};

export default AdminTable;
