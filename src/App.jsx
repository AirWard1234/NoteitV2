import React from "react";
import { Code } from "./pages/code";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Code />} />
      </Routes>
    </Router>
  );
};

export default App;
