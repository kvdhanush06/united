import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";

const ViewTournaments = () => {
  const { user } = useAuth(); // Get authenticated user
  const [tournaments, setTournaments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const tournamentsCollection = collection(db, "tournaments");
        const snapshot = await getDocs(tournamentsCollection);
        const tournamentList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTournaments(tournamentList);
      } catch (err) {
        setError("Failed to load tournaments.");
        console.error(err);
      }
    };

    fetchTournaments();
  }, []);

  const handleRegister = async (tournamentId) => {
    if (!user) {
      setError("You must be logged in to register for tournaments.");
      return;
    }
    try {
      await addDoc(collection(db, "registrations"), {
        tournamentId,
        userId: user.uid,
        registeredAt: new Date(),
      });
      setSuccess(`Successfully registered for tournament ID: ${tournamentId}`);
    } catch (err) {
      setError("Failed to register. Please try again.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>Available Tournaments</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      {tournaments.length === 0 && <p>No tournaments available right now.</p>}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {tournaments.map((tournament) => (
          <li
            key={tournament.id}
            style={{
              border: "1px solid #ddd",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h3>{tournament.tournamentName}</h3>
            <p>{tournament.description}</p>
            <p><strong>Game:</strong> {tournament.gameName}</p>
            <p><strong>Max Participants:</strong> {tournament.maxParticipants}</p>
            <p><strong>Date:</strong> {tournament.tournamentTime}</p>
            <p><strong>Type:</strong> {tournament.tournamentType}</p>
            <button
              onClick={() => handleRegister(tournament.id)}
              style={{
                backgroundColor: "#007BFF",
                color: "white",
                padding: "8px 15px",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px",
              }}
            >
              Register
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewTournaments;
