import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const NewEntry: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    axios
      .post("https://dump-backend.onrender.com/entries", { title, content })
      .then(() => {
        setTitle("");
        setContent("");
      })
      .catch((error) => console.error("Error saving entry:", error));
  };

  return (
    <div style={{ background: "black", color: "white", padding: "20px" }}>
      <h1 className="text-3xl font-bold mb-8">New Journal Entry</h1>
      <input
        className="w-full p-4 mb-8 border rounded text-black"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ background: "white", color: "black" }}
      />
      <ReactQuill
        value={content}
        onChange={setContent}
        style={{ height: "300px", marginBottom: "20px" }}
      />
      <button
        className="p-3 bg-blue-500 text-white rounded mt-10"
        onClick={handleSubmit}
      >
        Save Entry
      </button>
    </div>
  );
};

export default NewEntry;
