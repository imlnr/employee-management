import { useDisclosure, useToast } from '@chakra-ui/react';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDep, getEmployees } from '../redux/action';
import EmployeeData from '../components/EmployeeData';
import '../styles/dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch();
    const employees = useSelector(state => state.employees); // Assuming you have employees state in Redux store
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5); // Number of items per page
    const token = localStorage.getItem('token');
    const employee = useMemo(() => employees.employees, [employees]);
    const departments = useSelector(state => state.departments);

    const handlePreviousPage = useCallback(() => {
        setCurrentPage(prevPage => prevPage - 1);
    }, []);

    const handleNextPage = useCallback(() => {
        setCurrentPage(prevPage => prevPage + 1);
    }, []);
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (e) => {
        const selectedValue = e.target.value;
    };

    useEffect(() => {
        // if (token) {
            dispatch(getEmployees(token, currentPage));
        // }
        dispatch(getDep());
    }, [dispatch, token, currentPage]);

    // Calculate start and end index for pagination
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const Deltemsg = ()=>{
        const toast = useToast();
        toast({
            title: "Deleted",
            description: "Successfully Deleted.",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    }

    return (

        <div className='table'>
            <div>
                <input type="text" placeholder='search by name' />
                <div>
                    <label htmlFor="salarySort">Sort Salary:</label>
                    <select id="salarySort" value={selectedOption} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="lowToHigh">Low to High</option>
                        <option value="highToLow">High to Low</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="departmentSelect">Select Department:</label>
                    <select id="departmentSelect" onChange={handleChange}>
                        <option value="">All Departments</option>
                        {departments.map((department, index) => (
                            <option key={index} value={department}>
                                {department}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
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
                    {employee && employee.map((ele, ind) => (
                        <EmployeeData key={ind} data={ele} onDelete={Deltemsg}/>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage}</span>
                <button onClick={handleNextPage} disabled={endIndex >= employees?.length}>Next</button>
            </div>
        </div>
    );
};

export default Dashboard;
