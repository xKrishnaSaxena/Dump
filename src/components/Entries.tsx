import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Entry {
  _id: string;
  title: string;
  content: string;
  date: string;
}

const Entries: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    axios
      .get("https://dump-backend.onrender.com/entries")
      .then((response) => setEntries(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div style={{ background: "black", color: "white", padding: "20px" }}>
      <h1 className="text-3xl font-bold mb-8">KRISHNA SAXENA DUMPS HERE</h1>
      {entries.map((entry) => (
        <div key={entry._id} className="mb-8 p-4 border rounded shadow">
          <h2 className="text-2xl font-semibold">{entry.title}</h2>
          <p className="text-lg">{entry.content}</p>
          <small>{new Date(entry.date).toLocaleString()}</small>
        </div>
      ))}
      <Link to="/new" className="text-white font-bold text-lg">
        <button className="mt-4 p-2 bg-blue-500 rounded">New Entry</button>
      </Link>
    </div>
  );
};

export default Entries;
