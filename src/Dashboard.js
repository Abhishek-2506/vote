import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Dashboard.css';

export default function Dashboard({ username, isAdmin }) {
  const [votes, setVotes] = useState({});
  const [userVotes, setUserVotes] = useState({});
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(1); // Start from 1
  const [voteMessage, setVoteMessage] = useState('');
  const participants = useMemo(() => ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank", "Grace", "Hannah", "Ivy", "Jack"], []);
  const userId = username; // Use the username as the unique user ID

  // Generate a token for the user
  const generateToken = useCallback((participantName) => {
    return `${userId}-${participantName}`;
  }, [userId]);

  // Handle voting
  const handleVote = (name, type) => {
    const token = generateToken(name);
    if (userVotes[token]) {
      alert('You have already voted for this participant!');
      return;
    }

    const updatedVotes = {
      ...votes,
      [name]: type === 'upvote' ? (votes[name] || 0) + 1 : (votes[name] || 0) - 1,
    };

    const updatedUserVotes = {
      ...userVotes,
      [token]: 1, // Track that the user has voted once
    };

    setVotes(updatedVotes);
    setUserVotes(updatedUserVotes);
    setVoteMessage('Your vote has been registered!');
    localStorage.setItem('votes', JSON.stringify(updatedVotes));
    localStorage.setItem('userVotes', JSON.stringify(updatedUserVotes));
  };

  // Admin-controlled participant display
  const handleNextParticipant = () => {
    const nextIndex = (currentParticipantIndex % participants.length) + 1;
    setCurrentParticipantIndex(nextIndex);
    localStorage.setItem('currentParticipantIndex', nextIndex);
    setVoteMessage(''); // Reset vote message for the next participant
  };

  // Load votes, userVotes, currentParticipantIndex, and voteMessage from localStorage
  useEffect(() => {
    const storedVotes = localStorage.getItem('votes');
    const storedUserVotes = localStorage.getItem('userVotes');
    const storedParticipantIndex = localStorage.getItem('currentParticipantIndex');
    if (storedVotes) {
      setVotes(JSON.parse(storedVotes));
    }
    if (storedUserVotes) {
      setUserVotes(JSON.parse(storedUserVotes));
    }
    if (storedParticipantIndex) {
      setCurrentParticipantIndex(parseInt(storedParticipantIndex, 10));
    }

    // Add event listener for storage changes
    const handleStorageChange = (event) => {
      if (event.key === 'currentParticipantIndex') {
        setCurrentParticipantIndex(parseInt(event.newValue, 10));
        setVoteMessage(''); // Reset vote message for the new participant
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Set voteMessage based on userVotes when component mounts
  useEffect(() => {
    const token = generateToken(participants[currentParticipantIndex - 1]);
    if (userVotes[token]) {
      setVoteMessage('Your vote has been registered!');
    } else {
      setVoteMessage('');
    }
  }, [currentParticipantIndex, userVotes, participants, generateToken]);

  const currentParticipant = participants[currentParticipantIndex - 1];
  const token = generateToken(currentParticipant);

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>TechStar Unplugged</h1>
        <p>Welcome, {username}</p>
      </header>
      <main className="main-content">
        <section className="participant-section">
          <h2>{currentParticipant}</h2>
          {!userVotes[token] ? (
            <div className="vote-buttons">
              <button onClick={() => handleVote(currentParticipant, 'upvote')}>
                <img src="/upvote.jpg" alt="Upvote" className="vote-icon" />
              </button>
              <button onClick={() => handleVote(currentParticipant, 'downvote')}>
                <img src="/downvote.jpg" alt="Downvote" className="vote-icon" />
              </button>
            </div>
          ) : (
            <p style={{ color: 'green' }}>{voteMessage}</p>
          )}
        </section>
        {isAdmin && (
          <button className="next-button" onClick={handleNextParticipant}>
            Next Participant
          </button>
        )}
      </main>
    </div>
  );
}