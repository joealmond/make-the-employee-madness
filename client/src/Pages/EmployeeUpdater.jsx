import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EmployeeUpdater = () => {
  const [employee, setEmployee] = useState(null);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployees = async () => {
      const res = await fetch("/api/employees");
      const data = await res.json();
      const emplyeeSelected = data.filter((employee) => employee._id === id)[0]
      setEmployee(emplyeeSelected)
      setName(emplyeeSelected.name)
      setLevel(emplyeeSelected.level)
      setPosition(emplyeeSelected.position)
    };
    fetchEmployees();
  }, [id]);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    const modifiedEmployee = {
        ...employee,
        name,
        level,
        position
    }

    try {
        const res = await fetch(`/api/employees/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(modifiedEmployee),
        }); 

        const updated = await res.json();

        if (!res.ok) throw new Error("Could not update record.");

        navigate("/");

    } catch (error) {
        console.error(error)
    }
  };

  return (
    <form className="EmployeeForm" onSubmit={handleUpdateSubmit}>
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
        <button type="submit">Update</button>
        <Link to={"/"}>
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  );
};

export default EmployeeUpdater;
