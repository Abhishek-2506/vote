import React, { useState, useEffect } from 'react';
import './Admin.css';

export default function Admin() {
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(1); // Start from 1
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
    const nextIndex = (currentParticipantIndex % participants.length) + 1;
    setCurrentParticipantIndex(nextIndex);
    localStorage.setItem('currentParticipantIndex', nextIndex);
  };

  const currentParticipant = participants[currentParticipantIndex - 1];

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
    </div>
  );
}