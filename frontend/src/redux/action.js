import axios from "axios";
import { GET_DEPARTMENTS_REQUEST, GET_DEPARTMENTS_SUCCESS, GET_EMPLOYEES_FAILURE, GET_EMPLOYEES_REQUEST, GET_EMPLOYEES_SUCCESS, LOGIN_REQUEST } from "./action-types";

const url = 'https://employee-management-tbu5.onrender.com';

export const getEmployees = (token,page) => {
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return async (dispatch) => {
        dispatch({ type: GET_EMPLOYEES_REQUEST })
        try {
            const res = await axios.get(`${url}/emp/employees?page=${page}`, axiosConfig);
            if (res) {
                dispatch({ type: GET_EMPLOYEES_SUCCESS, payload: res.data })
            }
        } catch (error) {
            dispatch({ type: GET_EMPLOYEES_FAILURE })
        }
    }
}

export const getDep = ()=>{
    const token = localStorage.getItem('token');
    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    return async (dispatch)=>{

        dispatch({type:GET_DEPARTMENTS_REQUEST})
        try {
            const res = await axios.get(`${url}/emp/employees/departments`,axiosConfig);
            if(res){
                dispatch({type:GET_DEPARTMENTS_SUCCESS,payload:res.data.departments})
                console.log(res.data);
            }
        } catch (error) {
            dispatch({type:GET_EMPLOYEES_FAILURE})
        }

    }
}