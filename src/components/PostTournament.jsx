import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const PostTournament = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tournamentName, setTournamentName] = useState("");
  const [description, setDescription] = useState("");
  const [gameName, setGameName] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [tournamentTime, setTournamentTime] = useState("");
  const [tournamentType, setTournamentType] = useState("");
  const [prizePool, setPrizePool] = useState("");
  const [entryFee, setEntryFee] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    if (!tournamentName || !description || !gameName || !maxParticipants || !tournamentTime || !tournamentType || !prizePool || !entryFee || !location) {
      setError("All fields are required.");
      return false;
    }
    if (isNaN(maxParticipants) || maxParticipants <= 0) {
      setError("Max Participants must be a positive number.");
      return false;
    }
    if (isNaN(prizePool) || prizePool < 0) {
      setError("Prize Pool must be a non-negative number.");
      return false;
    }
    if (isNaN(entryFee) || entryFee < 0) {
      setError("Entry Fee must be a non-negative number.");
      return false;
    }
    const currentTime = new Date();
    const selectedTime = new Date(tournamentTime);
    if (selectedTime <= currentTime) {
      setError("Tournament time must be in the future.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    setLoading(true);

    if (!validateFields()) {
      setLoading(false);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "tournaments"), {
        tournamentName,
        description,
        gameName,
        maxParticipants,
        tournamentTime,
        tournamentType,
        prizePool,
        entryFee,
        location,
        createdAt: new Date(),
        creatorId: user.uid,
      });
      setSuccess("Tournament posted successfully!");
      navigate("/");
    } catch (error) {
      if (error.code === 'permission-denied') {
        setError("You do not have permission to add a tournament.");
      } else if (error.code === 'network-request-failed') {
        setError("Network error. Please check your internet connection and try again.");
      } else {
        setError("Error adding tournament: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTournamentName("");
    setDescription("");
    setGameName("");
    setMaxParticipants("");
    setTournamentTime("");
    setTournamentType("");
    setPrizePool("");
    setEntryFee("");
    setLocation("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="post-tournament-wrapper">
      <Navbar></Navbar>
    <div className="tournament-section">
      <div className="tournament-container">
        <h2 className="tournament-title">
          Create Tournament
        </h2>
        
        {error && <p className="tournament-message error">{error}</p>}
        {success && <p className="tournament-message success">{success}</p>}
        
        <form className="tournament-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-grid">
            <div className="form-group">
              <input
                type="text"
                placeholder="Tournament Name"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                className="form-input"
                />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Game"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                className="form-input"
                />
            </div>
          </div>

          <div className="form-group">
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-textarea"
              rows={4}
              />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <input
                type="number"
                placeholder="Max Participants"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
                className="form-input"
                />
            </div>

            <div className="form-group">
              <input
                type="datetime-local"
                placeholder="Tournament Time"
                value={tournamentTime}
                onChange={(e) => setTournamentTime(e.target.value)}
                className="form-input"
                />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <input
                type="text"
                placeholder="Tournament Type"
                value={tournamentType}
                onChange={(e) => setTournamentType(e.target.value)}
                className="form-input"
                />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Tournament Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-input"
                />
            </div>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <input
                type="number"
                placeholder="Prize Pool"
                value={prizePool}
                onChange={(e) => setPrizePool(e.target.value)}
                className="form-input"
                />
            </div>

            <div className="form-group">
              <input
                type="number"
                placeholder="Entry Fee"
                value={entryFee}
                onChange={(e) => setEntryFee(e.target.value)}
                className="form-input"
                />
            </div>
          </div>

          <div className="form-buttons">
            <button 
              onClick={handleSubmit} 
              disabled={loading}
              className="tournament-button"
              >
              {loading && <span className="loader"></span>}
              Post Tournament
            </button>
            <button 
              onClick={handleReset} 
              disabled={loading}
              className="tournament-button-secondary"
              >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default PostTournament;
