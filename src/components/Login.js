import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import AuthContext from '../context/auth/AuthContext';
import AlertContext from '../context/alert/AlertContext';
import { useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Alert from './Alert';

const Login = () => {
    const authContextObj = useContext(AuthContext);
    const { login, authErrors, setLoading, isLoggedIn } = authContextObj;

    const alertContextObj = useContext(AlertContext);
    const { setAlert, clearAlert } = alertContextObj;

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onTouched',
        reValidateMode: 'onChange'
    });

    const [currentForm, setCurrentForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if (authErrors) {
            console.log(authErrors);
            const id = uuidv4();
            setAlert({ id, msg: authErrors.error, type: 'danger' });
            setTimeout(() => {
                clearAlert(id);
            }, 5000);
        }
        if (isLoggedIn) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authErrors, isLoggedIn]);

    const onChange = (e) => {
        setCurrentForm({
            ...currentForm,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = () => {
        setLoading(true);
        login(currentForm);
    };

    return (
        <>
            <div className="h-screen w-full bg-gray-100">
                <div className="w-11/12 sm:w-2/6 m-auto flex flex-col items-center">
                    <i className="text-6xl text-gray-800 fa-solid fa-address-book mt-5"></i>
                    <h2 className="text-3xl my-5 font-bold">Sign in to your account</h2>
                </div>

                <Alert />

                <form className="login-form border rounded w-11/12 sm:w-2/6 m-auto bg-white p-8">
                    <div className="flex flex-col">
                        <label className="text-sm mb-1">Email</label>
                        <input
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Email is a required feild'
                                }
                            })}
                            onChange={onChange}
                            type="email"
                            name="email"
                            className={
                                errors.email
                                    ? 'border rounded h-9 p-2 w-full border-red-500 focus:outline-none'
                                    : 'border border-slate-300 rounded h-9 p-2 w-full focus:outline-none'
                            }
                        />
                        {errors?.email && (
                            <span className="text-xs text-red-500">{errors.email.message}</span>
                        )}
                    </div>

                    <div className="flex flex-col mt-5">
                        <label className="text-sm mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: 'Password is a required feild'
                                }
                            })}
                            onChange={onChange}
                            className={
                                errors.password
                                    ? 'border rounded h-9 p-2 w-full border-red-500 focus:outline-none'
                                    : 'border border-slate-300 rounded h-9 p-2 w-full focus:outline-none'
                            }
                        />
                        {errors?.password && (
                            <span className="text-xs text-red-500">{errors.password.message}</span>
                        )}
                    </div>

                    <Link to="#">
                        <span className="text-gray-800 underline w-fit block mt-5 ml-auto">
                            Forgot Password ?
                        </span>
                    </Link>

                    <button
                        onClick={handleSubmit(submitForm)}
                        className="border rounded bg-gray-800 hover:bg-gray-700 text-white w-full h-10 mt-5">
                        Sign in
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
