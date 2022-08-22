import { useReducer } from 'react';
import AlertReducer from './AlertReducer';
import { SET_ALERT, CLEAR_ALERT } from '../types';
import AlertContext from './AlertContext';

const AlertState = (props) => {
    const initialState = {
        alerts: []
    };

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // set alert
    const setAlert = (alert) => {
        dispatch({ type: SET_ALERT, payload: alert });
    };

    // clear alert
    const clearAlert = (id) => {
        dispatch({ type: CLEAR_ALERT, payload: id });
    };

    return (
        <AlertContext.Provider value={{ setAlert, alerts: state.alerts, clearAlert }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertState;
