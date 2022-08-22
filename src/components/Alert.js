import { useContext } from 'react';
import AlertContext from '../context/alert/AlertContext';

const Alert = () => {
    const alertContextObj = useContext(AlertContext);
    const { alerts } = alertContextObj;

    return (
        alerts.length > 0 &&
        alerts.map((alert) => {
            return (
                <div
                    key={alert.id}
                    className={`mb-5 mx-auto w-11/12 sm:w-2/4 p-2 bg-${alert.type} border rounded text-white`}>
                    <i
                        className={
                            alert.type === 'danger'
                                ? 'fa-solid fa-circle-exclamation text-xl mx-2'
                                : 'fa-solid fa-circle-check text-xl mx-2'
                        }></i>
                    {alert.msg}
                </div>
            );
        })
    );
};

export default Alert;
