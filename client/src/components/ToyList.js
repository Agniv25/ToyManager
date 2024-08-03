import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ToyList() {
  const [toys, setToys] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToys = async () => {
      try {
        const response = await axios.get("http://localhost:3000/toys");
        setToys(response.data);
      } catch (error) {
        console.error("Fetch toys error", error);
      }
    };
    fetchToys();
  }, []);

  const handleDelete = async (name) => {
    try {
      await axios.delete(`http://localhost:3000/toys/${name}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setToys(toys.filter((toy) => toy.name !== name));
    } catch (error) {
      console.error("Delete toy error", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredToys = toys.filter((toy) =>
    toy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h2>Toy List</h2>
      <input
        type="text"
        placeholder="Search toys..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <Link to="/toys/add">Add Toy</Link>
      <ul>
        {filteredToys.map((toy) => (
          <li key={toy.name}>
            <Link to={`/toys/${toy.name}`}>{toy.name}</Link>
            <button onClick={() => navigate(`/toys/edit/${toy.name}`)}>
              Edit
            </button>
            <button onClick={() => handleDelete(toy.name)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToyList;
