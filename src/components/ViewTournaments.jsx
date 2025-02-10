import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import Navbar from "./Navbar";

const ViewTournaments = () => {
  const { user } = useAuth(); // Get authenticated user
  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    gameName: "",
    location: "",
    tournamentTime: "",
    maxParticipants: "",
    prizePool: "",
    entryFee: "",
    tournamentType: "",
  });

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
        setFilteredTournaments(tournamentList);
      } catch (err) {
        setError("Failed to load tournaments.");
        console.error(err);
      }
    };

    fetchTournaments();
  }, []);

  useEffect(() => {
    const filterTournaments = () => {
      let filtered = tournaments;
      if (searchTerm) {
        filtered = filtered.filter((tournament) =>
          tournament.tournamentName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          filtered = filtered.filter((tournament) =>
            tournament[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
          );
        }
      });
      setFilteredTournaments(filtered);
    };

    filterTournaments();
  }, [searchTerm, filters, tournaments]);

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    // <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
    //   <Navbar></Navbar>
    //   <h2>Available Tournaments</h2>
    //   {error && <p style={{ color: "red" }}>{error}</p>}
    //   {success && <p style={{ color: "green" }}>{success}</p>}
    //   <input
    //     type="text"
    //     placeholder="Search by Tournament Name"
    //     value={searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //     style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
    //   />
    //   <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    //     <input
    //       type="text"
    //       name="gameName"
    //       placeholder="Filter by Game Name"
    //       value={filters.gameName}
    //       onChange={handleFilterChange}
    //       style={{ padding: "5px" }}
    //     />
    //     <input
    //       type="text"
    //       name="location"
    //       placeholder="Filter by Location"
    //       value={filters.location}
    //       onChange={handleFilterChange}
    //       style={{ padding: "5px" }}
    //     />
    //     <input
    //       type="datetime-local"
    //       name="tournamentTime"
    //       placeholder="Filter by Tournament Time"
    //       value={filters.tournamentTime}
    //       onChange={handleFilterChange}
    //       style={{ padding: "5px" }}
    //     />
    //     <input
    //       type="number"
    //       name="maxParticipants"
    //       placeholder="Filter by Max Participants"
    //       value={filters.maxParticipants}
    //       onChange={handleFilterChange}
    //       style={{ padding: "5px" }}
    //     />
    //     <input
    //       type="number"
    //       name="prizePool"
    //       placeholder="Filter by Prize Pool"
    //       value={filters.prizePool}
    //       onChange={handleFilterChange}
    //       style={{ padding: "5px" }}
    //     />
    //     <input
    //       type="number"
    //       name="entryFee"
    //       placeholder="Filter by Entry Fee"
    //       value={filters.entryFee}
    //       onChange={handleFilterChange}
    //       style={{ padding: "5px" }}
    //     />
    //     <input
    //       type="text"
    //       name="tournamentType"
    //       placeholder="Filter by Tournament Type"
    //       value={filters.tournamentType}
    //       onChange={handleFilterChange}
    //       style={{ padding: "5px" }}
    //     />
    //   </div>
    //   {filteredTournaments.length === 0 && <p>No tournaments available right now.</p>}
    //   <ul style={{ listStyleType: "none", padding: 0 }}>
    //     {filteredTournaments.map((tournament) => (
    //       <li
    //         key={tournament.id}
    //         style={{
    //           border: "1px solid #ddd",
    //           marginBottom: "10px",
    //           padding: "10px",
    //           borderRadius: "5px",
    //         }}
    //       >
    //         <h3>{tournament.tournamentName}</h3>
    //         <p>{tournament.description}</p>
    //         <p><strong>Game Name:</strong> {tournament.gameName}</p>
    //         <p><strong>Max Participants:</strong> {tournament.maxParticipants}</p>
    //         <p><strong>Tournament Date:</strong> {tournament.tournamentTime}</p>
    //         <p><strong>Tournament Type:</strong> {tournament.tournamentType}</p>
    //         <p><strong>Prize Pool:</strong> {tournament.prizePool}</p>
    //         <p><strong>Entry Fee:</strong> {tournament.entryFee}</p>
    //         <p><strong>Tournament Location:</strong> {tournament.location}</p>
    //         <button
    //           onClick={() => handleRegister(tournament.id)}
    //           style={{
    //             backgroundColor: "#007BFF",
    //             color: "white",
    //             padding: "8px 15px",
    //             border: "none",
    //             cursor: "pointer",
    //             borderRadius: "5px",
    //           }}
    //         >
    //           Register
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <div className="view-tournament-wrapper">
      <Navbar/>
      <section className="tournament-section">
        <h2 className="tournament-title">Available Tournaments</h2>
        {error && <p className="tournament-message error">{error}</p>}
        {success && <p className="tournament-message success">{success}</p>}
        
        <input
          type="text"
          className="tournament-search"
          placeholder="Search by Tournament Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="tournament-filters">
          <input
            type="text"
            name="gameName"
            placeholder="Filter by Game Name"
            value={filters.gameName}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Filter by Location"
            value={filters.location}
            onChange={handleFilterChange}
          />
          <input
            type="datetime-local"
            name="tournamentTime"
            placeholder="Filter by Tournament Time"
            value={filters.tournamentTime}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="maxParticipants"
            placeholder="Filter by Max Participants"
            value={filters.maxParticipants}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="prizePool"
            placeholder="Filter by Prize Pool"
            value={filters.prizePool}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="entryFee"
            placeholder="Filter by Entry Fee"
            value={filters.entryFee}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="tournamentType"
            placeholder="Filter by Tournament Type"
            value={filters.tournamentType}
            onChange={handleFilterChange}
          />
        </div>

        {filteredTournaments.length === 0 && (
          <p className="tournament-message">No tournaments available right now.</p>
        )}

        <ul className="tournament-list">
          {filteredTournaments.map((tournament) => (
            <li key={tournament.id} className="tournament-item">
              <h3>{tournament.tournamentName}</h3>
              <p>{tournament.description}</p>
              <p><strong>Game Name:</strong> {tournament.gameName}</p>
              <p><strong>Max Participants:</strong> {tournament.maxParticipants}</p>
              <p><strong>Tournament Date:</strong> {tournament.tournamentTime}</p>
              <p><strong>Tournament Type:</strong> {tournament.tournamentType}</p>
              <p><strong>Prize Pool:</strong> {tournament.prizePool}</p>
              <p><strong>Entry Fee:</strong> {tournament.entryFee}</p>
              <p><strong>Tournament Location:</strong> {tournament.location}</p>
              <button
                onClick={() => handleRegister(tournament.id)}
                className="tournament-button"
              >
                Register
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ViewTournaments;
