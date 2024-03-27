import { GET_EMPLOYEES_FAILURE, GET_EMPLOYEES_REQUEST, GET_EMPLOYEES_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./action-types"

const initialState = {
    employees: [],
    isLoading: false,
    isError: false,
    isLoggedin: false
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
            return { ...state, isLoading: false, employees: [] };
        default:
            return state
    }
}