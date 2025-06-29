import React, { useContext, useEffect } from 'react';
import ContactContext from '../context/contacts/ContactContext';
import ContactItem from './ContactItem';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from '../context/alert/AlertContext';
import AuthContext from '../context/auth/AuthContext';
import Loader from './Loader';

const Contacts = () => {
    const contactContextObj = useContext(ContactContext);
    const authContextObj = useContext(AuthContext);
    const {
        contacts,
        filteredContacts,
        getAllContacts,
        clearIsContactAddedOrUpdated,
        isContactAddedOrUpdated
    } = contactContextObj;

    const { loading, setLoading, getLoggedInUser } = authContextObj;

    const alertContextObj = useContext(AlertContext);
    const { setAlert, clearAlert } = alertContextObj;

    useEffect(() => {
        setLoading(true);
        getLoggedInUser();
        if (isContactAddedOrUpdated === 'added') {
            const id = uuidv4();
            setAlert({ id, msg: 'Contact added successfully', type: 'success' });
            setTimeout(() => {
                clearAlert(id);
            }, 5000);
        }
        if (isContactAddedOrUpdated === 'updated') {
            const id = uuidv4();
            setAlert({ id, msg: 'Contact updated successfully', type: 'success' });
            setTimeout(() => {
                clearAlert(id);
            }, 5000);
        }
        clearIsContactAddedOrUpdated();

        getAllContacts();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (contacts?.length === 0) {
        if (loading) {
            return <Loader />;
        } else {
            return (
                <div className="w-full flex flex-col justify-center items-center">
                    <h4 className="block w-fit mx-auto my-4 text-2xl">
                        Please add some contacts.
                    </h4>
                </div>
            );
        }
    }

    if (filteredContacts && filteredContacts.length === 0) {
        return (
                <div className="w-full flex flex-col justify-center items-center">
                    <h4 className="block w-fit mx-auto my-4 text-2xl">
                        No contacts found.
                    </h4>
                </div>
            );
    }

    return !filteredContacts
        ? contacts?.map((contact) => {
              return <ContactItem key={contact._id} contact={contact} />;
          })
        : filteredContacts.map((contact) => {
              return <ContactItem key={contact._id} contact={contact} />;
          });
};

export default Contacts;
