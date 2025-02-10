import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const PostTournament = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");
    try {
      const docRef = await addDoc(collection(db, "tournaments"), {
        name, // tournament name
        description,
        createdAt: new Date(),
        // game date and time
        // entry fee
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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleSubmit}>Post Tournament</button>
    </div>
  );
};

export default PostTournament;
