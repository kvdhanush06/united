import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const PostTournament = () => {
  const [tournamentName, setTournamentName] = useState("");
  const [description, setDescription] = useState("");
  const [gameName, setGameName] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [tournamentTime, setTournamentTime] = useState("");
  const [tournamentType, setTournamentType] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    try {
      const docRef = await addDoc(collection(db, "tournaments"), {
        tournamentName,
        description,
        gameName,
        maxParticipants,
        tournamentTime,
        tournamentType,
        createdAt: new Date(),
        // creator user id
      });
      setSuccess("Tournament posted successfully!");
    } catch (error) {
      setError("Error adding tournament: " + error.message);
    }
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
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
      <button onClick={handleSubmit}>Post Tournament</button>
    </div>
  );
};

export default PostTournament;
