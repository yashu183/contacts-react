import React, { useReducer } from 'react';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';

import {
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    CONTACT_ERROR,
    CLEAR_CURRENT,
    SET_CURRENT,
    CLEAR_FILTER,
    FILTER_CONTACTS,
    GET_ALL_CONTACTS
} from '../types';
import httpClient from '../../utils/axiosInterceptor';

const ContactState = (props) => {
    const initialState = {
        // contacts: [
        //     {
        //         id: 1,
        //         name: 'cyashu',
        //         password: '1234567778',
        //         email: 'cyashu2000@gmail.com',
        //         phoneNum: 9191919192,
        //         type: 'Personal'
        //     },
        //     {
        //         id: 2,
        //         name: 'cyashu123',
        //         password: '0876467778',
        //         email: 'cyashu2000+1@gmail.com',
        //         phoneNum: 8191919192,
        //         type: 'Personal'
        //     },
        //     {
        //         id: 3,
        //         name: 'cyashu456',
        //         password: '9876567778',
        //         email: 'cyashu2000+3@gmail.com',
        //         phoneNum: 7191919192,
        //         type: 'Professional'
        //     },
        //     {
        //         id: 4,
        //         name: 'cyashu789',
        //         password: '3438567778',
        //         email: 'cyashu2000+4@gmail.com',
        //         phoneNum: 34191919192,
        //         type: 'Professional'
        //     }
        // ],
        contacts: [],
        currentContact: {
            name: '',
            email: '',
            phoneNum: '',
            type: ''
        },
        filteredContacts: null,
        contactsError: null,
        isContactAddedOrUpdated: null
    };

    const [state, dispatch] = useReducer(ContactReducer, initialState);

    // get all contacts
    const getAllContacts = async () => {
        try {
            const res = await httpClient.get('/contacts/getAllContacts');
            dispatch({ type: GET_ALL_CONTACTS, payload: res.data.contacts });
        } catch (error) {
            console.log(error);
        }
    };

    // add contact
    const addContact = async (contact) => {
        try {
            const res = await httpClient.post('/contacts/addContact', contact);
            dispatch({ type: ADD_CONTACT, payload: res.data });
        } catch (error) {
            console.log(error);
            dispatch({ type: CONTACT_ERROR, payload: error.response.data.error });
        }
    };

    // delete contact
    const deleteContact = async (id) => {
        try {
            const res = await httpClient.delete('/contacts/deleteContact/' + id);
            console.log(res);
            dispatch({ type: DELETE_CONTACT, payload: id });
        } catch (error) {
            console.log(error);
        }
    };

    // edit contact
    const updateContact = async (contact) => {
        try {
            const res = await httpClient.put('/contacts/updateContact/' + contact.id, contact);
            dispatch({ type: UPDATE_CONTACT, payload: res.data });
        } catch (error) {
            dispatch({
                type: CONTACT_ERROR,
                payload: error.response.data.error
            });
        }
    };

    // set current contact
    const setCurrentContact = (contact) => {
        dispatch({ type: SET_CURRENT, payload: contact });
    };

    // clear current contact
    const clearCurrentContact = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    // filter contacts
    const filterContacts = (val) => {
        dispatch({ type: FILTER_CONTACTS, payload: val });
    };

    // clear filter contacts
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    // clearIsContactAdded
    const clearIsContactAddedOrUpdated = () => {
        state.isContactAddedOrUpdated = null;
    };

    return (
        <ContactContext.Provider
            value={{
                contacts: state.contacts,
                editingContact: state.currentContact,
                clearEditingContact: clearCurrentContact,
                filteredContacts: state.filteredContacts,
                contactsError: state.contactsError,
                isContactAddedOrUpdated: state.isContactAddedOrUpdated,
                addContact,
                deleteContact,
                updateContact,
                setCurrentContact,
                filterContacts,
                clearFilter,
                getAllContacts,
                clearIsContactAddedOrUpdated
            }}>
            {props.children}
        </ContactContext.Provider>
    );
};

export default ContactState;
