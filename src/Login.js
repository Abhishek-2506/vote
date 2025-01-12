import React, { useState } from 'react';
import './Login.css';

export default function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z]+$/.test(name)) {
      setError('Name must contain only alphabets');
      return;
    }
    if (mobileNumber.length !== 10) {
      setError('Mobile number must be exactly 10 digits');
      return;
    }
    localStorage.setItem('name', name);
    localStorage.setItem('mobileNumber', mobileNumber);
    localStorage.setItem('role', 'user'); // Default role is 'user'
    onLogin(name, 'user');
  };

  const handleMobileNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobileNumber(value);
    }
  };

  return (
    <div className="container">
      <div className="glass-effect">
        <h1>🗳️ Welcome to TechStar Unplugged</h1>
        <form onSubmit={handleRegister} className="form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobileNumber">Mobile Number</label>
            <input
              type="text"
              id="mobileNumber"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              required
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="btn">Register Now</button>
        </form>
      </div>
    </div>
  );
}