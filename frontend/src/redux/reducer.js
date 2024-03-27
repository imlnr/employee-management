import { GET_DEPARTMENTS_FAILURE, GET_DEPARTMENTS_REQUEST, GET_DEPARTMENTS_SUCCESS, GET_EMPLOYEES_FAILURE, GET_EMPLOYEES_REQUEST, GET_EMPLOYEES_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./action-types"

const initialState = {
    employees: [],
    isLoading: false,
    isError: false,
    isLoggedin: false,
    departments: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, isLoading: true }
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, isLoggedin: true }
        case LOGIN_FAILURE:
            return { ...state, isLoading: false, isLoggedin: false }
        case GET_EMPLOYEES_REQUEST:
            return { ...state, isLoading: true };
        case GET_EMPLOYEES_SUCCESS:
            return { ...state, isLoading: false, employees: action.payload };
        case GET_EMPLOYEES_FAILURE:
            return { ...state, isLoading: false, employees: [], isError: true };
        case GET_DEPARTMENTS_REQUEST:
            return { ...state, isloading: true }
        case GET_DEPARTMENTS_SUCCESS:
            return { ...state, isloading: false, departments: action.payload };
        case GET_DEPARTMENTS_FAILURE:
            return { ...state, isError: true, isloading: false }
        default:
            return state
    }
}