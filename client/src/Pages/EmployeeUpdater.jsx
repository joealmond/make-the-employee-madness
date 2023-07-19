import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm/EmployeeForm";
import Loading from "../Components/Loading/Loading";

const EmployeeUpdater = () => {
  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setEmployeeLoading(true);
    const fetchEmployees = async () => {
      const res = await fetch("/api/employees");
      const data = await res.json();
      const employeeSelected = data.filter(
        (employee) => employee._id === id
      )[0];
      setEmployee(employeeSelected);
      setEmployeeLoading(false);
    };
    fetchEmployees();
  }, [id]);

  const handleUpdateEmployee = async (employee) => {
    try {
      const res = await fetch(`/api/employees/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });

      const updated = await res.json();

      if (!res.ok) throw new Error("Could not update record.");

      setUpdateLoading(false);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      employee={employee}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
  );
};

export default EmployeeUpdater;
