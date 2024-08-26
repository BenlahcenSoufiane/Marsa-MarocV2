// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import AddUserForm from './components/AddUserForm';
import UserList from './components/UserList';
import EditUser from './components/EditUser';
import Roote from './pages/admin_page';
import Footer from './components/footer';
import AboutUs from './components/Aboutus';


const PrivateRoute = ({ children }) => {
  console.log('TTT',localStorage.getItem('token'))
  return localStorage.getItem('token') ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/dashboard" element={<><PrivateRoute><Dashboard /></PrivateRoute></>} />
            <Route path="/add-user" element={<PrivateRoute><AddUserForm /></PrivateRoute>} />
            <Route path="/users" element={<PrivateRoute><UserList /></PrivateRoute>} />
            <Route path="/edit-user/:id" element={<PrivateRoute><EditUser /></PrivateRoute>} />
            <Route path="/root" element={<PrivateRoute><Roote /></PrivateRoute>} />
            <Route path="/About" element={<AboutUs/>} />
          </Routes>
           <Footer/>
        </div>
    
      </div>
    </Router>
  );
}

export default App;
