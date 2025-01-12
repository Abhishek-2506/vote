import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
  const participants = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank", "Grace", "Hannah", "Ivy", "Jack"];

  // Load currentParticipantIndex from localStorage
  useEffect(() => {
    const storedParticipantIndex = localStorage.getItem('currentParticipantIndex');
    if (storedParticipantIndex) {
      setCurrentParticipantIndex(parseInt(storedParticipantIndex, 10));
    }
  }, []);

  // Handle switching to the next participant
  const handleNextParticipant = () => {
    const nextIndex = (currentParticipantIndex + 1) % participants.length;
    setCurrentParticipantIndex(nextIndex);
    localStorage.setItem('currentParticipantIndex', nextIndex);
  };

  const currentParticipant = participants[currentParticipantIndex];

  return (
    <div className="admin-container">
      <header className="header">
        <h1>Admin Panel</h1>
        <p>Current Participant: {currentParticipant}</p>
      </header>
      <main className="main-content">
        <button className="next-button" onClick={handleNextParticipant}>
          Next Participant
        </button>
      </main>
      <style jsx>{`
        .admin-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-image: url('/background.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          color: white;
          font-family: 'Poppins', sans-serif;
        }
        .header {
          background: rgba(0, 0, 0, 0.7);
          padding: 20px;
          text-align: center;
          font-size: 2.5rem;
        }
        .main-content {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .next-button {
          padding: 10px 20px;
          font-size: 1.2rem;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        }
        .next-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        @media (max-width: 600px) {
          .header {
            font-size: 2rem;
          }
          .next-button {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}