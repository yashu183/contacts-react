import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import AuthContext from '../context/auth/AuthContext';
import Loader from './Loader';

const Navbar = () => {
    const [isShow, setIsShow] = useState(true);
    const [isShowMenu, setIsShowMenu] = useState(false);

    const authContextObj = useContext(AuthContext);
    const { isLoggedIn, user, logout, loading, getLoggedInUser, setLoading } = authContextObj;

    const url = useLocation();

    useEffect(() => {
        setLoading(true);
        getLoggedInUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading && <Loader />}
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                                onClick={() => {
                                    setIsShow(!isShow);
                                }}>
                                {isShow && <i className="fa-solid fa-bars text-xl"></i>}
                                {!isShow && <i className="fa-solid fa-xmark text-xl"></i>}
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <i className="text-4xl text-white fa-solid fa-address-book"></i>
                                <h2 className="text-white ml-4 text-xl">Contacts</h2>
                            </div>
                            <div
                                className={
                                    isLoggedIn
                                        ? 'mt-1 hidden sm:block sm:ml-6'
                                        : 'mt-1 hidden sm:block sm:ml-auto'
                                }>
                                {isLoggedIn && (
                                    <div className="flex space-x-4">
                                        <Link
                                            className={
                                                url.pathname === '/'
                                                    ? 'bg-gray-900 text-white px-3 py-2 block rounded-md text-sm font-medium'
                                                    : 'text-white px-3 py-2 rounded-md block text-sm font-medium'
                                            }
                                            to="/">
                                            Home
                                        </Link>
                                        <Link
                                            className={
                                                url.pathname === '/add-contact'
                                                    ? 'bg-gray-900 text-white px-3 py-2 block rounded-md text-sm font-medium'
                                                    : 'text-white px-3 py-2 rounded-md block text-sm font-medium'
                                            }
                                            to="/add-contact">
                                            Add Contact
                                        </Link>
                                        <Link
                                            className={
                                                url.pathname === '/about'
                                                    ? 'bg-gray-900 text-white px-3 py-2 block rounded-md text-sm font-medium'
                                                    : 'text-white px-3 py-2 rounded-md block text-sm font-medium'
                                            }
                                            to="/about">
                                            About
                                        </Link>
                                    </div>
                                )}

                                {!isLoggedIn && (
                                    <div className="flex space-x-4">
                                        <Link
                                            className={
                                                url.pathname === '/register'
                                                    ? 'bg-gray-900 text-white px-3 py-2 block rounded-md text-sm font-medium'
                                                    : 'text-white px-3 py-2 rounded-md block text-sm font-medium'
                                            }
                                            to="/register">
                                            Sign Up
                                        </Link>
                                        <Link
                                            className={
                                                url.pathname === '/login'
                                                    ? 'bg-gray-900 text-white px-3 py-2 block rounded-md text-sm font-medium'
                                                    : 'text-white px-3 py-2 rounded-md block text-sm font-medium'
                                            }
                                            to="/login">
                                            Login
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="ml-3 relative">
                            {isLoggedIn && (
                                <div>
                                    <button
                                        type="button"
                                        className="bg-gray-800 flex justify-center items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                        id="user-menu-button"
                                        aria-expanded="false"
                                        aria-haspopup="true"
                                        onClick={() => {
                                            setIsShowMenu(!isShowMenu);
                                        }}>
                                        <span className="text-white text-xl">{user?.userName}</span>
                                        <i className="text-2xl w-9 h-9 text-white fa-solid fa-user"></i>
                                    </button>
                                </div>
                            )}

                            {isShowMenu && (
                                <div
                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"
                                    tabIndex="-1">
                                    <Link
                                        to="#"
                                        className="block px-4 py-2 text-sm text-gray-700"
                                        role="menuitem"
                                        tabIndex="-1"
                                        onClick={() => {
                                            setLoading(true);
                                            setIsShowMenu(!isShowMenu);
                                            logout();
                                        }}>
                                        Sign out
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {!isShow && (
                    <div className="sm:hidden" id="mobile-menu">
                        {isLoggedIn && (
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <Link
                                    className={
                                        url.pathname === '/'
                                            ? 'bg-gray-900 text-white px-3 py-2 block rounded-md text-sm font-medium'
                                            : 'text-white px-3 py-2 rounded-md block text-sm font-medium'
                                    }
                                    to="/">
                                    Home
                                </Link>
                                <Link
                                    className={
                                        url.pathname === '/add-contact'
                                            ? 'bg-gray-900 text-white px-3 py-2 block rounded-md text-sm font-medium'
                                            : 'text-white px-3 py-2 rounded-md block text-sm font-medium'
                                    }
                                    to="/add-contact">
                                    Add Contact
                                </Link>
                                <Link
                                    className={
                                        url.pathname === '/about'
                                            ? 'bg-gray-900 text-white px-3 py-2 block rounded-md text-sm font-medium'
                                            : 'text-white px-3 py-2 rounded-md block text-sm font-medium'
                                    }
                                    to="/about">
                                    About
                                </Link>
                            </div>
                        )}

                        {!isLoggedIn && (
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                <Link
                                    className={
                                        url.pathname === '/login'
                                            ? 'bg-gray-900 text-white px-3 py-2 block rounded-md text-sm font-medium'
                                            : 'text-white px-3 py-2 rounded-md block text-sm font-medium'
                                    }
                                    to="/login">
                                    Login
                                </Link>
                                <Link
                                    className={
                                        url.pathname === '/register'
                                            ? 'bg-gray-900 text-white px-3 py-2 block rounded-md text-sm font-medium'
                                            : 'text-white px-3 py-2 rounded-md block text-sm font-medium'
                                    }
                                    to="/register">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
