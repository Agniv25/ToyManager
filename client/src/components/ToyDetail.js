import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ToyDetail() {
  const { name } = useParams();
  const [toy, setToy] = useState(null);

  useEffect(() => {
    const fetchToy = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/toys/${name}`);
        setToy(response.data);
      } catch (error) {
        console.error("Fetch toy error", error);
      }
    };
    fetchToy();
  }, [name]);

  if (!toy) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{toy.name}</h2>
      <p>Description: {toy.description}</p>
      <p>Price: {toy.price}</p>
    </div>
  );
}

export default ToyDetail;
