import React, { useState, useEffect } from 'react';

export default function Dashboard({ username }) {
  const [votes, setVotes] = useState({});
  const [userVotes, setUserVotes] = useState({});
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0);
  const [voteMessage, setVoteMessage] = useState('');
  const participants = ["Alice", "Bob", "Charlie", "Dave", "Eve", "Frank", "Grace", "Hannah", "Ivy", "Jack"];
  const userId = username; // Use the username as the unique user ID

  // Handle voting
  const handleVote = (name, type) => {
    if (userVotes[userId]) {
      alert('You have already voted!');
      return;
    }

    const updatedVotes = {
      ...votes,
      [name]: type === 'upvote' ? (votes[name] || 0) + 1 : (votes[name] || 0) - 1,
    };

    const updatedUserVotes = {
      ...userVotes,
      [userId]: true,
    };

    setVotes(updatedVotes);
    setUserVotes(updatedUserVotes);
    setVoteMessage('Your vote has been registered!');
  };

  // Admin-controlled participant display
  const handleNextParticipant = () => {
    setUserVotes({}); // Reset user votes for the next participant
    setCurrentParticipantIndex((prevIndex) => (prevIndex + 1) % participants.length);
    setVoteMessage(''); // Reset vote message for the next participant
  };

  // Load votes and userVotes from localStorage
  useEffect(() => {
    const storedVotes = localStorage.getItem('votes');
    const storedUserVotes = localStorage.getItem('userVotes');
    if (storedVotes) {
      setVotes(JSON.parse(storedVotes));
    }
    if (storedUserVotes) {
      setUserVotes(JSON.parse(storedUserVotes));
    }
  }, []);

  // Save votes and userVotes to localStorage
  useEffect(() => {
    localStorage.setItem('votes', JSON.stringify(votes));
    localStorage.setItem('userVotes', JSON.stringify(userVotes));
  }, [votes, userVotes]);

  const currentParticipant = participants[currentParticipantIndex];

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>TechStar Unplugged</h1>
        <p>Welcome, {username}</p>
      </header>
      <main className="main-content">
        <section className="participant-section">
          <h2>{currentParticipant}</h2>
          <div className="vote-buttons">
            <button onClick={() => handleVote(currentParticipant, 'upvote')} disabled={userVotes[userId]}>
              <img src="/upvote.jpg" alt="Upvote" className="vote-icon" />
            </button>
            <button onClick={() => handleVote(currentParticipant, 'downvote')} disabled={userVotes[userId]}>
              <img src="/downvote.jpg" alt="Downvote" className="vote-icon" />
            </button>
          </div>
          {voteMessage && <p style={{ color: 'green' }}>{voteMessage}</p>}
        </section>
        <button className="next-button" onClick={handleNextParticipant}>
          Next Participant
        </button>
      </main>
      <style jsx>{`
        .dashboard-container {
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
        .participant-section {
          text-align: center;
          background: rgba(0, 0, 0, 0.6);
          padding: 30px;
          border-radius: 15px;
          width: 90%;
          max-width: 400px;
        }
        h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
        .vote-buttons {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .vote-buttons button {
          margin: 0 10px;
          padding: 15px;
          border: none;
          border-radius: 10px;
          background-color: rgba(255, 255, 255, 0.2);
          cursor: pointer;
        }
        .vote-buttons button:hover {
          background-color: rgba(255, 255, 255, 0.4);
        }
        .vote-buttons button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .vote-icon {
          width: 50px;
          height: 50px;
        }
        .next-button {
          margin-top: 20px;
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
          h2 {
            font-size: 2rem;
          }
          .vote-buttons button {
            padding: 10px;
          }
          .vote-icon {
            width: 40px;
            height: 40px;
          }
          .next-button {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}