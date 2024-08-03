import React, { useState } from "react";
import { deleteToy } from "../api";

function DeleteToy({ token, setAction }) {
  const [name, setName] = useState("");

  const handleDeleteToy = async () => {
    try {
      await deleteToy(token, name);
      alert("Toy deleted successfully");
    } catch (error) {
      console.error("Error deleting toy:", error);
      alert("Error deleting toy");
    }
  };

  return (
    <div>
      <h2>Delete Toy</h2>
      <input
        type="text"
        placeholder="Toy Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleDeleteToy}>Delete Toy</button>
      <button onClick={() => setAction("menu")}>Back</button>
    </div>
  );
}

export default DeleteToy;
