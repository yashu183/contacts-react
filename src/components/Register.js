import { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthContext from '../context/auth/AuthContext';
import AlertContext from '../context/alert/AlertContext';
import Alert from './Alert';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const authContextObj = useContext(AuthContext);
    const { registerUser, authErrors, clearAuthErrors, setLoading, isLoggedIn } = authContextObj;

    const alertContextObj = useContext(AlertContext);
    const { setAlert, clearAlert } = alertContextObj;

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        getValues,
        clearErrors,
        setError,
        handleSubmit,
        formState: { errors, touchedFields }
    } = useForm({ mode: 'onTouched', reValidateMode: 'onChange' });

    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const onChange = (e) => {
        if (
            e.target.name === 'password' &&
            e.target.value !== '' &&
            touchedFields?.confirmPassword
        ) {
            if (e.target.value === getValues('confirmPassword')) {
                clearErrors('confirmPassword');
            } else {
                setError('confirmPassword', {
                    type: 'validate',
                    message: 'Password is not matching'
                });
            }
        }
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = () => {
        setLoading(true);
        registerUser({
            userName: formData.userName,
            password: formData.password,
            email: formData.email
        });
    };

    useEffect(() => {
        if (authErrors) {
            const id = uuidv4();
            setAlert({
                id,
                msg: authErrors[0].message ? authErrors[0].message : authErrors,
                type: 'danger'
            });
            setTimeout(() => {
                clearAuthErrors();
                clearAlert(id);
            }, 5000);
        }
        if (isLoggedIn) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authErrors, isLoggedIn]);

    return (
        <>
            <div className="h-screen w-full bg-gray-100">
                <div className="w-11/12 sm:w-2/6 m-auto flex flex-col items-center">
                    <i className="text-6xl text-gray-800 fa-solid fa-address-book mt-5"></i>
                    <h2 className="text-3xl my-5 font-bold">Register your account</h2>
                </div>

                <div className="flex justify-center flex-wrap align-middle">
                    <Alert />
                </div>

                <form
                    className="login-form border rounded w-11/12 sm:w-2/6 m-auto bg-white p-8"
                    onSubmit={handleSubmit(submitForm)}>
                    <div className="name w-full mb-3">
                        <label className="block text-sm mb-1" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            name="userName"
                            {...register('userName', { required: true })}
                            onChange={onChange}
                            className={
                                errors.userName
                                    ? 'border rounded h-9 p-2 w-full border-red-500 focus:outline-none'
                                    : 'border border-slate-300 rounded h-9 p-2 w-full focus:outline-none'
                            }
                            value={formData.userName}
                        />
                        {errors.userName && (
                            <span className="text-xs text-red-500">Name is a required feild.</span>
                        )}
                    </div>

                    <div className="flex flex-col mt-3">
                        <label className="text-sm mb-1">Email</label>
                        <input
                            type="text"
                            name="email"
                            {...register('email', {
                                pattern: {
                                    value: /^([a-zA-z0-9._+-])+@([a-zA-z0-9.-])+\.([a-z]{2,10})+$/,
                                    message: 'Please provide a valid email'
                                },
                                required: {
                                    value: true,
                                    message: 'Email is a required feild'
                                }
                            })}
                            onChange={onChange}
                            className={
                                errors.email
                                    ? 'border rounded h-9 p-2 w-full border-red-500 focus:outline-none'
                                    : 'border border-slate-300 rounded h-9 p-2 w-full focus:outline-none'
                            }
                            value={formData.email}
                        />
                        {errors.email && (
                            <span className="text-xs text-red-500 mt-1">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col mt-3 relative">
                        <label className="text-sm mb-1">Password</label>
                        <input
                            type={passwordVisibility ? 'text' : 'password'}
                            name="password"
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: 'Password is a required feild'
                                },
                                minLength: {
                                    value: 8,
                                    message: 'Password should be 8 characters long'
                                },
                                maxLength: {
                                    value: 15,
                                    message: 'Password cant be greaterthan 15 characters'
                                }
                            })}
                            onChange={onChange}
                            className={
                                errors.password
                                    ? 'border rounded h-9 p-2 w-full border-red-500 focus:outline-none'
                                    : 'border border-slate-300 rounded h-9 p-2 w-full focus:outline-none'
                            }
                            value={formData.password}
                        />
                        {passwordVisibility ? (
                            <i
                                onClick={() => {
                                    setPasswordVisibility(!passwordVisibility);
                                }}
                                className="fa-solid fa-eye-slash absolute top-8 right-2 hover:cursor-pointer text-gray-600"></i>
                        ) : (
                            <i
                                onClick={() => {
                                    setPasswordVisibility(!passwordVisibility);
                                }}
                                className="fa-solid fa-eye absolute top-8 right-2 hover:cursor-pointer text-gray-600"></i>
                        )}
                        {errors.password && (
                            <span className="text-xs text-red-500 mt-1">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col mt-3 relative">
                        <label className="text-sm mb-1">Confirm Password</label>
                        <input
                            type={passwordVisibility ? 'text' : 'password'}
                            name="confirmPassword"
                            {...register('confirmPassword', {
                                required: {
                                    value: true,
                                    message: 'Confirm password is a required feild'
                                },
                                validate: () => {
                                    return (
                                        getValues('password') === getValues('confirmPassword') ||
                                        'Password is not matching'
                                    );
                                }
                            })}
                            onChange={onChange}
                            className={
                                errors.confirmPassword
                                    ? 'border rounded h-9 p-2 w-full border-red-500 focus:outline-none'
                                    : 'border border-slate-300 rounded h-9 p-2 w-full focus:outline-none'
                            }
                            value={formData.confirmPassword}
                        />
                        {errors.confirmPassword && (
                            <span className="text-xs text-red-500 mt-1">
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </div>

                    <button
                        className="border rounded bg-gray-800 hover:bg-gray-700 hover:cursor-pointer text-white w-full h-10 mt-5"
                        type="submit">
                        Register
                    </button>

                    <div className="flex">
                        <hr className="w-1/6 sm:w-2/6 mt-8" />
                        <span className="text-gray-600 block w-fit mx-auto mt-5">
                            or continue with
                        </span>
                        <hr className="w-1/6 sm:w-2/6 mt-8" />
                    </div>

                    <div className="social flex flex-wrap justify-around mt-5">
                        <div className="facebook border hover:cursor-pointer hover:bg-gray-100 flex items-center justify-center border-gray-300 rounded round w-16 sm:w-24 h-10">
                            <i className="text-2xl w-fit text-gray-500 fa-brands fa-facebook"></i>
                        </div>
                        <div className="google border hover:cursor-pointer hover:bg-gray-100 flex items-center justify-center border-gray-300 rounded round w-16 sm:w-24 h-10">
                            <i className="text-2xl w-fit text-gray-500 fa-brands fa-google"></i>
                        </div>
                        <div className="twitter border hover:cursor-pointer hover:bg-gray-100 flex items-center justify-center border-gray-300 rounded round w-16 sm:w-24 h-10">
                            <i className="text-2xl w-fit text-gray-500 fa-brands fa-twitter"></i>
                        </div>
                        <div className="github border hover:cursor-pointer hover:bg-gray-100 flex items-center justify-center border-gray-300 rounded round w-16 sm:w-24 h-10">
                            <i className="text-2xl w-fit text-gray-500 fa-brands fa-github"></i>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Register;
