import React,{useState , useEffect} from 'react';
import '../style.css';
import { jwtDecode } from 'jwt-decode'; // Correct named impor

import BookList from '../components/Details';


function App() {
  const [username, setUsername] = useState('Admin');
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username);
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }

    // Get and format today's date
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setTodayDate(formattedDate);
  }, []);

  const handleDownload = async () => {
    try {
        const todayDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
        const response = await fetch(`http://localhost:3000/api/export`);
        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);

        // Use the todayDate from your state for the filename
        link.setAttribute('download', `shifts_${todayDate}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
    } catch (error) {
        console.error('Error downloading Excel:', error);
    }
};



  return (
    <div className="container">
      <div className="main">
        <h1 className="mx-10 my-10 text-5xl font-serif text-slate-700">Hello {username}</h1>
        <p className="mx-10 mb-10 text-xl text-gray-500">{todayDate}</p>
        <BookList handleDownload={handleDownload} />
      </div>
    </div>
  );
}

export default App;