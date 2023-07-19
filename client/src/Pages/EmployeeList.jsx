import React, { useEffect, useState } from "react";

import EmployeeTable from "../Components/EmployeeTable/EmployeeTable";

const fetchEmployees = async () => {
  const res = await fetch("/api/employees/");
  if (!res.ok) throw new Error("Could not fetch.");
  const employees = await res.json();
  return employees;
};

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/employees/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Could not delete.");
      setEmployees((employees) =>
        employees.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      // fetchEmployees().then((employeesData) => setEmployees(employeesData));
      const getEmployees = async () => {
        const employeesData = await fetchEmployees();
        setEmployees(employeesData);
      };
      getEmployees();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return <EmployeeTable employees={employees} onDelete={handleDelete} />;
};

export default EmployeeList;

// const deleteEmployee = (id) => {
//   return fetch(`/api/employees/${id}`, {
//     method: "DELETE",
//   }).then((res)=>res.json());
// };

// const fetchEmployees = () => {
//   return fetch("/api/employees").then((res) => res.json());
// };
