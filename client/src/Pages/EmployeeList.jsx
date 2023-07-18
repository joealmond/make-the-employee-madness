import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../Components/EmployeeTable.css";

const fetchEmployees = async () => {
  const res = await fetch("/api/employees/");
  if (!res.ok) return console.error('Could not fetch.')
  const employees = await res.json();
  return employees;
};

// const deleteEmployee = (id) => {
//   return fetch(`/api/employees/${id}`, {
//     method: "DELETE",
//   }).then((res)=>res.json());
// };

// const fetchEmployees = () => {
//   return fetch("/api/employees").then((res) => res.json());
// };

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/employees/${id}`, { method: "DELETE" });
    if (!res.ok) return console.error('Could not delete.');
    setEmployees((employees) => employees.filter((employee) => employee._id !== id))
  }

  useEffect(() => {
    // fetchEmployees().then((employeesData) => setEmployees(employeesData));
    const getEmployees = async () => {
      const employeesData = await fetchEmployees();
      setEmployees(employeesData);
    };
    getEmployees();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button>Update</button>
                </Link>
              </td>
              <td>
                <button onClick={()=>handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
