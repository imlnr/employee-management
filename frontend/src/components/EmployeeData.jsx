import React from 'react';
import '../styles/dashboard.css';
import axios from 'axios';

const EmployeeData = ({ data, onDelete }) => {
    const handleDelete = async () => {
        try {
            // Make DELETE request to delete the employee data
            await axios.delete(`http://your-api-url/employees/${data.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            // Call onDelete function passed from parent component to notify about the deletion
            onDelete(data.id);
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    return (
        <tr key={data.id}>
            <td>{data.id}</td>
            <td>{data.firstname}</td>
            <td>{data.lastname}</td>
            <td>{data.email}</td>
            <td>{data.department}</td>
            <td>{data.salary}</td>
            <td>
                <button>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </td>
        </tr>
    );
};

export default EmployeeData;
