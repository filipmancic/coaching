import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import AdminDashboard from '../../components/AdminDashboard/AdminDashboard';
import ClientDashboard from '../../components/ClientDashboard/ClientDashboard';
import './MojProfil.css'

export default function MojProfil() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['token']);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        if (!cookies.token) {
          navigate('/login'); // Ako nema tokena, preusmerava na login
          return;
        }

        const response = await axios.get('http://localhost:5000/api/auth/verify', {
          withCredentials: true, // Ensures cookies are sent
        },);

        setUserData(response.data.user);
      } catch (error) {
        console.error('Invalid token, redirecting to login:', error);
        removeCookie('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie('token');
    navigate('/login');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return null;
  }

  return (
    <div className='moj-profil'>
      {userData.isAdmin ? (
        <AdminDashboard userData={userData} handleLogout={handleLogout} /> 
      ) : (
        <ClientDashboard userData={userData} handleLogout={handleLogout} /> 
      )}
    </div>
  );
}
