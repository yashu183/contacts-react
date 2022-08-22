import React, { useContext } from 'react';
import ContactContext from '../context/contacts/ContactContext';

const Search = () => {
    const contactContextObj = useContext(ContactContext);
    const { filterContacts, clearFilter } = contactContextObj;

    const filter = (e) => {
        if (e.target.value === '' || !e.target.value) {
            clearFilter();
        } else {
            filterContacts(e.target.value);
        }
    };

    return (
        <div className="mt-3 mb-5 w-11/12 relative mx-auto text-gray-600 flex justify-center">
            <input
                className="border-2 border-gray-800 bg-white h-10 w-full sm:w-1/2 rounded-lg text-sm focus:outline-none p-2 "
                type="search"
                name="search"
                placeholder="Search by Name or Email"
                onChange={filter}
            />

            <button type="submit" className="absolute right-0 sm:right-1/4 top-0 mr-3 mt-1">
                <i className="fa-solid fa-magnifying-glass text-xl text-gray-800"></i>
            </button>
        </div>
    );
};

export default Search;
