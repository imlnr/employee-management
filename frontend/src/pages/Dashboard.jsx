import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../redux/action';

const Dashboard = () => {
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employees); // Assuming you have employees state in Redux store
    const [currentPage, setCurrentPage] = useState(1);
    console.log(employees);
    const [perPage] = useState(5); // Number of items per page
    const token = localStorage.getItem('token');
    useEffect(() => {
        dispatch(getEmployees(token)); // Dispatch action to fetch employees
    }, [dispatch]);

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    // Calculate start and end index for pagination
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.slice(startIndex, endIndex).map((employee, index) => (
                        <tr key={index}>
                            <td>{startIndex + index + 1}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.salary}</td>
                            <td>{employee.date}</td>
                            <td>
                                {/* Actions buttons */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={endIndex >= employees.length}>Next</button>
            </div>
        </div>
    );
};

export default Dashboard;
