import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactContext from '../context/contacts/ContactContext';
import AuthContext from '../context/auth/AuthContext';
import AlertContext from '../context/alert/AlertContext';
import { v4 as uuidv4 } from 'uuid';

const ContactItem = ({ contact }) => {
    const contactContextObj = useContext(ContactContext);
    const { deleteContact, setCurrentContact } = contactContextObj;

    const authContextObj = useContext(AuthContext);
    const { setLoading } = authContextObj;

    const alertContextObj = useContext(AlertContext);
    const { setAlert, clearAlert } = alertContextObj;

    const { _id, name, email, type, phoneNum } = contact;

    const navigate = useNavigate();

    const onDelete = () => {
        setLoading(true);
        deleteContact(_id)
            .then(() => {
                const id = uuidv4();
                setAlert({ id, msg: 'Contact deleted successfully', type: 'success' });
                setTimeout(() => {
                    clearAlert(id);
                }, 5000);
                setLoading(false);
            })
            .catch(() => {
                const id = uuidv4();
                setAlert({ id, msg: 'Contact deleted failed. Try again', type: 'danger' });
                setTimeout(() => {
                    clearAlert(id);
                }, 5000);
                setLoading(false);
            });
    };

    const onEdit = () => {
        setCurrentContact(contact);
        navigate('/add-contact');
    };

    return (
        <div className="w-80 p-4 border bg-gray-800 text-white rounded mb-4 mr-0 sm:mr-4">
            <div className="header flex mb-3">
                <h1 className="text-xl w-fit">{name}</h1>

                <span
                    className={
                        type === 'Professional'
                            ? 'w-fit px-1 py-0.5 h-fit rounded bg-warning text-xs text-black block ml-auto'
                            : 'w-fit px-1 py-0.5 h-fit rounded bg-success text-xs text-white block ml-auto'
                    }>
                    {type}
                </span>
            </div>

            {email && (
                <div className="email mb-3 flex items-center">
                    <i className="fa-solid fa-envelope block text-gray-500 mr-3 text-lg"></i>
                    <span className="block text-gray-300">{email}</span>
                </div>
            )}

            {phoneNum && (
                <div className="phoneNum mb-3 flex items-center">
                    <i className="fa-solid fa-phone text-gray-500 mr-3 text-lg block"></i>
                    <span className="block text-gray-300">{phoneNum}</span>
                </div>
            )}
            <div className="flex justify-center">
                <button
                    className="py-1.5 px-3 text-white text-lg w-fit bg-gray-500 hover:bg-gray-600 rounded mr-3"
                    onClick={onEdit}>
                    <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button
                    className="py-1.5 px-3 text-white text-lg w-fit bg-danger hover:bg-danger/80 rounded"
                    onClick={onDelete}>
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
        </div>
    );
};

export default ContactItem;
