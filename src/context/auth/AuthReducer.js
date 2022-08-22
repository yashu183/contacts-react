import {
    CLEAR_ERRORS,
    LOGIN_FAILED,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    SET_LOADING,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGOUT
} from '../types';

const AuthReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_FAILED:
            localStorage.removeItem('token');
            return {
                ...state,
                authErrors: action.payload,
                loading: false
            };

        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isLoggedIn: true,
                loading: false
            };

        case USER_LOADED:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
                loading: false,
                authErrors: null
            };

        case LOGIN_FAILED:
            return {
                ...state,
                loading: false,
                authErrors: action.payload
            };

        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                loading: false,
                isLoggedIn: true
            };

        case LOGOUT:
            localStorage.clear();
            return {
                ...state,
                user: null,
                isLoggedIn: false,
                authErrors: null,
                loading: false
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                authErrors: null
            };

        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };

        default:
            return state;
    }
};

export default AuthReducer;
