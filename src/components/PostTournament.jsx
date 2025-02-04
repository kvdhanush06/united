import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const PostTournament = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, "tournaments"), {
        name, // tournament name
        description,
        createdAt: new Date(),
        // game date and time
        // entry fee
      });
      alert("Tournament posted!");
    } catch (error) {
      console.error("Error adding tournament:", error.message);
    }
  };

  return (
    <div>
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
