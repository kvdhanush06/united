import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

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
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {loading && <p>Loading...</p>}
      <input
        type="text"
        placeholder="Tournament Name"
        value={tournamentName}
        onChange={(e) => setTournamentName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Game"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Max Participants"
        value={maxParticipants}
        onChange={(e) => setMaxParticipants(e.target.value)}
      />
      <input
        type="datetime-local"
        placeholder="Tournament Time"
        value={tournamentTime}
        onChange={(e) => setTournamentTime(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tournament Type"
        value={tournamentType}
        onChange={(e) => setTournamentType(e.target.value)}
      />
      <input
        type="text"
        placeholder="Prize Pool"
        value={prizePool}
        onChange={(e) => setPrizePool(e.target.value)}
      />
      <input
        type="text"
        placeholder="Entry Fee"
        value={entryFee}
        onChange={(e) => setEntryFee(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tournament Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSubmit} disabled={loading}>Post Tournament</button>
      <button onClick={handleReset} disabled={loading}>Reset</button>
    </div>
  );
};

export default PostTournament;
