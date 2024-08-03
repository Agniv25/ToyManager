import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddToy() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleAddToy = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/toys",
        { name, description, price },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      navigate("/toys");
    } catch (error) {
      console.error("Add toy error", error);
    }
  };

  return (
    <form onSubmit={handleAddToy}>
      <h2>Add Toy</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddToy;
