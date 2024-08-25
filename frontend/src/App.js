import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar';
import AddUserForm from './components/AddUserForm';
import UserList from './components/UserList';
import EditUser from './components/EditUser';
const PrivateRoute = ({ children }) => {
  return localStorage.getItem('token') ? children : <Navigate to="/" />;
};
function App() {
  return (
    <Router>
      <div>
      <Navbar />
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-user" element={<AddUserForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/edit-user/:id" element={<EditUser />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
