import {
    ADD_CONTACT,
    UPDATE_CONTACT,
    DELETE_CONTACT,
    CLEAR_CURRENT,
    SET_CURRENT,
    CLEAR_FILTER,
    FILTER_CONTACTS,
    GET_ALL_CONTACTS,
    CONTACT_ERROR
} from '../types';

const ContactReducer = (state, action) => {
    switch (action.type) {
        case GET_ALL_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            };

        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
                isContactAddedOrUpdated: 'added'
            };

        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter((contact) => contact._id !== action.payload)
            };

        case UPDATE_CONTACT:
            return {
                ...state,
                isContactAddedOrUpdated: 'updated'
            };

        case CONTACT_ERROR:
            return {
                ...state,
                contactsError: action.payload
            };

        case SET_CURRENT:
            return {
                ...state,
                currentContact: { ...action.payload, type: action.payload.type.toLowerCase() }
            };

        case CLEAR_CURRENT:
            return {
                ...state,
                currentContact: {
                    name: '',
                    email: '',
                    phoneNum: '',
                    type: 'personal'
                }
            };

        case CLEAR_FILTER:
            return {
                ...state,
                filteredContacts: null
            };

        case FILTER_CONTACTS:
            return {
                ...state,
                filteredContacts: state.contacts.filter((contact) => {
                    return (
                        contact.name.includes(action.payload) ||
                        contact.email.includes(action.payload)
                    );
                })
            };

        default:
            return state;
    }
};

export default ContactReducer;
