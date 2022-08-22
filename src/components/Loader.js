import React from 'react';

const Loader = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100/60 z-40 absolute">
            <i className="fa-solid fa-spinner fa-spin-pulse text-4xl"></i>
        </div>
    );
};

export default Loader;
