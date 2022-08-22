import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ContactContext from '../context/contacts/ContactContext';
import AlertContext from '../context/alert/AlertContext';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import Alert from '../components/Alert';

const ContactForm = () => {
    const contactContextObj = useContext(ContactContext);
    const alertContextObj = useContext(AlertContext);
    const authContextObj = useContext(AuthContext);

    const {
        addContact,
        editingContact,
        clearEditingContact,
        updateContact,
        contactsError,
        isContactAddedOrUpdated
    } = contactContextObj;
    const { setAlert, clearAlert } = alertContextObj;
    const { setLoading } = authContextObj;

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        clearErrors,
        formState: { errors, isValid }
    } = useForm({
        mode: 'onTouched',
        reValidateMode: 'onChange'
    });

    const [currentContact, setCurrentContact] = useState({
        name: editingContact.name ? editingContact.name : '',
        email: editingContact.email ? editingContact.email : '',
        phoneNum: editingContact.phoneNum ? editingContact.phoneNum : '',
        type: editingContact.type ? editingContact.type : 'personal'
    });

    const onChange = (e) => {
        if (e.target.name === 'email' && errors.phoneNum?.type === 'validate' && !errors.email) {
            clearErrors('phoneNum');
        }
        if (e.target.name === 'phoneNum' && errors.email?.type === 'validate' && !errors.phoneNum) {
            clearErrors('email');
        }

        setCurrentContact({ ...currentContact, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (contactsError) {
            setLoading(false);
            const id = uuidv4();
            setAlert({ id, msg: contactsError.details[0].message, type: 'danger' });
            setTimeout(() => {
                clearAlert(id);
            }, 5000);
        }
        if (isContactAddedOrUpdated === 'added') {
            setLoading(false);
            setCurrentContact({
                name: '',
                email: '',
                phoneNum: '',
                type: 'personal'
            });
            navigate('/');
        }
        if (isContactAddedOrUpdated === 'updated') {
            setLoading(false);
            clearEditingContact({
                id: '',
                name: '',
                email: '',
                phoneNum: '',
                type: ''
            });
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactsError, isContactAddedOrUpdated]);

    const submitForm = () => {
        setLoading(true);
        if (editingContact.name === '') {
            addContact(currentContact);
        } else {
            updateContact({ ...currentContact, id: editingContact._id });
        }
    };

    return (
        <form className="bg-gray-200 w-full h-screen flex flex-col flex-wrap items-center">
            <div className="flex justify-center my-6">
                {editingContact.name === '' && (
                    <h2 className="text-2xl font-bold">Add new contacts</h2>
                )}
                {editingContact.name !== '' && (
                    <h2 className="text-2xl font-bold">Update contact</h2>
                )}
            </div>

            <Alert />

            <div className="w-11/12 sm:w-2/6 border rounded p-6 bg-white h-fit">
                <div className="name w-full mb-3">
                    <label className="block text-sm" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        {...register('name', { required: true })}
                        onChange={onChange}
                        className={
                            errors.name
                                ? 'border rounded h-9 p-2 w-full border-red-500 focus:outline-none'
                                : 'border border-slate-300 rounded h-9 p-2 w-full focus:outline-none'
                        }
                        value={currentContact.name}
                    />
                    {errors.name && (
                        <span className="text-xs text-red-500">Name is a required feild.</span>
                    )}
                </div>
                <div className="email w-full mb-3">
                    <label className="block text-sm" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        {...register('email', {
                            pattern: {
                                value: /^([a-zA-z0-9._+-])+@([a-zA-z0-9.-])+\.([a-z]{2,10})+$/,
                                message: 'Please provide a valid email'
                            },
                            validate: () => {
                                if (getValues('phoneNum') === '' || !getValues('phoneNum')) {
                                    return (
                                        getValues('email') !== '' ||
                                        'Email or phone number should be given.'
                                    );
                                }
                            }
                        })}
                        onChange={onChange}
                        className={
                            errors.email || errors?.phoneNum?.type === 'validate'
                                ? 'border rounded h-9 p-2 w-full border-red-500 focus:outline-none'
                                : 'border border-slate-300 rounded h-9 p-2 w-full focus:outline-none'
                        }
                        value={currentContact.email}
                    />
                    {errors.email && (
                        <span className="text-xs text-red-500">{errors.email.message}</span>
                    )}
                </div>
                <div className="phoneNum w-full mb-3">
                    <label className="block text-sm" htmlFor="phoneNum">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        name="phoneNum"
                        {...register('phoneNum', {
                            validate: () => {
                                if (getValues('email') === '' || !getValues('email')) {
                                    return (
                                        getValues('phoneNum') !== '' ||
                                        'Email or phone number should be given.'
                                    );
                                }
                            }
                        })}
                        onChange={onChange}
                        className={
                            errors.email?.type === 'validate' ||
                            errors.phoneNum?.type === 'validate'
                                ? 'border border-red-500 rounded h-9 p-2 w-full focus:outline-none'
                                : 'border border-slate-300 rounded h-9 p-2 w-full focus:outline-none'
                        }
                        value={currentContact.phoneNum}
                    />
                    {errors.phoneNum && (
                        <span className="text-xs text-red-500">{errors.phoneNum.message}</span>
                    )}
                </div>
                <div className="type w-full mb-3">
                    <label className="block text-sm mb-1">Type</label>
                    <input
                        type="radio"
                        value="personal"
                        name="type"
                        id="personal"
                        checked={currentContact.type === 'personal'}
                        className="w-4 h-4 hover:cursor-pointer accent-slate-700 mr-2"
                        onClick={onChange}
                        onChange={onChange}
                    />
                    <label htmlFor="personal" className="hover:cursor-pointer mr-5">
                        Personal
                    </label>
                    <input
                        type="radio"
                        value="professional"
                        name="type"
                        id="professional"
                        checked={currentContact.type === 'professional'}
                        className="w-4 h-4 hover:cursor-pointer accent-slate-700 mr-2"
                        onClick={onChange}
                        onChange={onChange}
                    />
                    <label htmlFor="professional" className="hover:cursor-pointer">
                        Professional
                    </label>
                </div>
                {editingContact.name === '' && (
                    <button
                        className="border rounded bg-gray-800 hover:bg-gray-700 hover:cursor-pointer text-white w-full h-9"
                        onClick={handleSubmit(submitForm)}>
                        Submit
                    </button>
                )}
                {editingContact.name !== '' && (
                    <button
                        className="border rounded bg-gray-800 hover:bg-gray-700 hover:cursor-pointer text-white w-full h-9"
                        onClick={handleSubmit(submitForm)}
                        disabled={!isValid}>
                        Update
                    </button>
                )}
            </div>
        </form>
    );
};

export default ContactForm;
