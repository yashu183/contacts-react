import React from 'react';
import Contacts from './Contacts';
import Search from './Search';
import Alert from './Alert';

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center py-3">
            <Search />
            <div className="w-full">
                <Alert />
            </div>
            <Contacts />
        </div>
    );
};

export default Home;
