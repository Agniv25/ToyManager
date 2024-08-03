import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import ToyList from "./components/ToyList";
import AddToy from "./components/AddToy";
import EditToy from "./components/EditToy";
import ToyDetail from "./components/ToyDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/toys" element={<ToyList />} />
        <Route path="/toys/add" element={<AddToy />} />
        <Route path="/toys/edit/:name" element={<EditToy />} />
        <Route path="/toys/:name" element={<ToyDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
