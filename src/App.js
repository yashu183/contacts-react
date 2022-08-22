import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';

import ContactState from './context/contacts/ContactState';
import { Fragment } from 'react';
import ContactForm from './components/ContactForm';
import AlertState from './context/alert/AlertState';
import AuthState from './context/auth/AuthState';
import PrivateComponent from './components/PrivateComponent';

const App = () => {
    return (
        <AuthState>
            <ContactState>
                <AlertState>
                    <Router>
                        <Fragment>
                            <Navbar />
                            <Routes>
                                <Route
                                    exact
                                    path="/"
                                    element={
                                        <PrivateComponent>
                                            <Home />
                                        </PrivateComponent>
                                    }
                                />
                                <Route
                                    exact
                                    path="/add-contact"
                                    element={
                                        <PrivateComponent>
                                            <ContactForm />
                                        </PrivateComponent>
                                    }
                                />
                                <Route
                                    exact
                                    path="/about"
                                    element={
                                        <PrivateComponent>
                                            <About />
                                        </PrivateComponent>
                                    }
                                />
                                <Route exact path="/login" element={<Login />} />
                                <Route exact path="/register" element={<Register />} />
                            </Routes>
                        </Fragment>
                    </Router>
                </AlertState>
            </ContactState>
        </AuthState>
    );
};

export default App;
