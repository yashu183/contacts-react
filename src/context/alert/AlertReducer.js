import { SET_ALERT, CLEAR_ALERT } from '../types';

const AlertReducer = (state, action) => {
    switch (action.type) {
        case SET_ALERT:
            return {
                ...state,
                alerts: [...state.alerts, action.payload]
            };

        case CLEAR_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter((alert) => alert.id !== action.payload)
            };

        default:
            return state;
    }
};

export default AlertReducer;
