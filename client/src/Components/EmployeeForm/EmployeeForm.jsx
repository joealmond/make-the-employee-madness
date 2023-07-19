import React, { useState } from "react";
import { Link } from "react-router-dom";

const EmployeeForm = ({ onCancel, disabled, onSave, employee }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (employee) {
      const modifiedEmployee = onSave({
        ...employee,
        name,
        level,
        position,
      });

      return modifiedEmployee;
    }
  };

  console.log(name);
  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <h2>Update Employee</h2>
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
        <button type="submit" disabled={disabled} >Update</button>
        <Link to={"/"}>
          <button onClick={onCancel} >Cancel</button>
        </Link>
      </div>
    </form>
  );
};

export default EmployeeForm;
