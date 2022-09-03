import React, { useContext, useEffect } from 'react';
import ContactContext from '../context/contacts/ContactContext';
import ContactItem from './ContactItem';
import { v4 as uuidv4 } from 'uuid';
import AlertContext from '../context/alert/AlertContext';
// import bro from '../assets/bro.gif';
import bro_review_no_contacts from '../assets/bro_review_no_contacts.gif';
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

    if (contacts.length === 0) {
        if (loading) {
            return <Loader />;
        } else {
            return (
                <div className="w-full flex flex-col justify-center items-center">
                    <h4 className="block w-fit mx-auto my-4 text-2xl">
                        Please add some contacts...BROOOOOOO!!!!!
                    </h4>
                    <img className="w-96 h-80" src={bro_review_no_contacts} alt="BROOOO!!!!!!!" />
                </div>
            );
        }
    }

    if (filteredContacts && filteredContacts.length === 0) {
        return <img className="w-96 h-80" src={bro_review_no_contacts} alt="BROOOO!!!!!!!" />;
    }

    return !filteredContacts
        ? contacts.map((contact) => {
              return <ContactItem key={contact._id} contact={contact} />;
          })
        : filteredContacts.map((contact) => {
              return <ContactItem key={contact._id} contact={contact} />;
          });
};

export default Contacts;
