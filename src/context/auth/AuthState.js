import React from 'react';
import { useReducer } from 'react';
import AuthReducer from './AuthReducer';
import AuthContext from './AuthContext';
import {
    CLEAR_ERRORS,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    REGISTER_FAILED,
    REGISTER_SUCCESS,
    SET_LOADING,
    USER_LOADED,
    LOGOUT
} from '../types';
import httpClient from '../../utils/axiosInterceptor';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        loading: false,
        isLoggedIn: false,
        user: null,
        authErrors: null
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);
    // load user
    const getLoggedInUser = async () => {
        try {
            const res = await httpClient.get('/users/getLoggedInUser');
            dispatch({ type: USER_LOADED, payload: res.data });
        } catch (error) {
            logout();
        }
    };

    // register user
    const registerUser = async (formData) => {
        try {
            const res = await httpClient.post('/users/addUser', formData);
            dispatch({ type: REGISTER_SUCCESS, payload: res.data });
            setTimeout(async () => {
                await getLoggedInUser();
            }, 1000);
        } catch (error) {
            dispatch({
                type: REGISTER_FAILED,
                payload: error.response.data.error.details
                    ? error.response.data.error.details
                    : error.response.data.error?.error
            });
        }
    };

    // login user
    const login = async (formData) => {
        try {
            const res = await httpClient.post('/auth/login', formData);
            dispatch({ type: LOGIN_SUCCESS, payload: res.data });
            setTimeout(async () => {
                await getLoggedInUser();
            }, 1000);
        } catch (error) {
            dispatch({ type: LOGIN_FAILED, payload: error.response.data.error });
        }
    };

    // logout
    const logout = () => {
        dispatch({ type: LOGOUT });
    };

    // clear errors
    const clearAuthErrors = () => {
        dispatch({ type: CLEAR_ERRORS });
    };

    // set loading
    const setLoading = (value) => {
        console.log(value, 'auth state set loadin');
        dispatch({ type: SET_LOADING, payload: value });
    };

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isLoggedIn: state.isLoggedIn,
                user: state.user,
                authErrors: state.authErrors,
                loading: state.loading,
                registerUser,
                clearAuthErrors,
                setLoading,
                login,
                logout,
                getLoggedInUser
            }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;
