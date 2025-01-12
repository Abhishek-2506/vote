import React, { useState, useEffect } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedMobileNumber = localStorage.getItem('mobileNumber');
    if (storedName && storedMobileNumber) {
      setIsRegistered(true);
      setName(storedName);
    }
  }, []);

  const handleLogin = (name) => {
    setName(name);
    setIsRegistered(true);
  };

  return (
    <div className="App">
      {isRegistered ? (
        <Dashboard username={name} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;