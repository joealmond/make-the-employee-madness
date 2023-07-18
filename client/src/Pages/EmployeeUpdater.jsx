import React from 'react'
import { useParams } from 'react-router-dom'

const EmployeeUpdater = () => {
    const { id } = useParams();
  return (
    <div>{id}</div>
  )
}

export default EmployeeUpdater