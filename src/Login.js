import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) {
      setError('Mobile number must be exactly 10 digits');
      return;
    }
    localStorage.setItem('name', name);
    localStorage.setItem('mobileNumber', mobileNumber);
    onLogin(name);
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
      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-image: url('/background.jpg');
          background-size: cover;
          background-position: center;
          color: #e6e6e6;
          font-family: 'Poppins', sans-serif;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          text-align: center;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 10px;
        }
        .form {
          max-width: 400px;
          margin: 0 auto;
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          color: #333;
        }
        .btn {
          width: 100%;
          padding: 12px;
          background-color: #1b9cfc;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
          transition: background-color 0.3s ease;
        }
        .btn:hover {
          background-color: #1287a5;
        }
      `}</style>
    </div>
  );
}