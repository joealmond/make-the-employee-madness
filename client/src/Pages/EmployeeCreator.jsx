import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EmployeeCreator = () => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate();

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    const employee = {
      name,
      level,
      position,
    };

    const res = await fetch("/api/employees/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });

    const created = await res.json();

    if (!res.ok) return "Could not create record.";

    navigate("/");
  };

  return (
    <form className="EmployeeForm" onSubmit={handleCreateSubmit}>
      <h2>Create Employee</h2>
      <div className="control">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>

      <div className="control">
        <label>
          Level:
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </label>
      </div>

      <div className="control">
        <label>
          Position:
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </label>
      </div>
      <div className="buttons">
        <button type="submit">Create</button>
        <Link to={"/"}>
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  );
};

export default EmployeeCreator;
