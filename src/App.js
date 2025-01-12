import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Admin from './Admin';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedMobileNumber = localStorage.getItem('mobileNumber');
    const storedRole = localStorage.getItem('role');
    if (storedName && storedMobileNumber && storedRole) {
      setIsRegistered(true);
      setName(storedName);
      setRole(storedRole);
    }
  }, []);

  const handleLogin = (name, role) => {
    setName(name);
    setRole(role);
    setIsRegistered(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isRegistered ? <Dashboard username={name} isAdmin={role === 'admin'} /> : <Login onLogin={handleLogin} />} />
        <Route path="/gvg/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;