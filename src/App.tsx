import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Entries from "./components/Entries";
import NewEntry from "./components/NewEntry";

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Entries />} />
          <Route path="/new" element={<NewEntry />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
