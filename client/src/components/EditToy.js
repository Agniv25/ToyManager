import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditToy() {
  const { name } = useParams();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToy = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/toys/${name}`);
        setDescription(response.data.description);
        setPrice(response.data.price);
      } catch (error) {
        console.error("Fetch toy error", error);
      }
    };
    fetchToy();
  }, [name]);

  const handleEditToy = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/toys/${name}`,
        { description, price },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      navigate("/toys");
    } catch (error) {
      console.error("Edit toy error", error);
    }
  };

  return (
    <form onSubmit={handleEditToy}>
      <h2>Edit Toy</h2>
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
      <button type="submit">Save</button>
    </form>
  );
}

export default EditToy;
