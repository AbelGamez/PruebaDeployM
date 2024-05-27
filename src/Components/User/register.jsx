import { useState } from 'react';
import axios from 'axios';
import { Input, Button } from '@nextui-org/react';
import { UserRegister } from '../../Routes/routes';
import { Link, useNavigate } from 'react-router-dom';
import { EyeFilledIcon } from "./EyeIcons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeIcons/EyeSlashFIlledIcon";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        apellidos: '',
        email: '',
        password: '',
        nickname: '',
        telefono: ''
    });

    const [errors, setErrors] = useState({});
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Realizar validaciones locales
        const validationErrors = {};
        if (!formData.name.match(/^[a-zA-Z\s]{1,20}$/)) {
            validationErrors.name = 'The name can only contain letters and have a maximum of 20 characters.';
        }
        if (!formData.apellidos.match(/^[a-zA-Z\s]{1,20}$/)) {
            validationErrors.apellidos = 'Last name can only contain letters and have a maximum of 20 characters.';
        }
        if (!formData.email.match(/^\S+@\S+\.\S+$/)) {
            validationErrors.email = 'The email must be in a valid format.';
        }
        if (formData.password.length < 8) {
            validationErrors.password = 'The password must be at least 8 characters long.';
        }
        if (formData.nickname.length > 20 || formData.nickname.length < 1) {
            validationErrors.nickname = 'The nickname must be between 1 and 20 characters long.';
        }
        if (!formData.telefono.match(/^\d{9}$/)) {
            validationErrors.telefono = 'The phone must contain only 9 numeric digits.';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post(UserRegister(), formData);
                navigate('/login'); 
            } catch (error) {
                if (error.response && error.response.data) {
                    setErrors(error.response.data.errors);
                } else {
                    console.error('Error:', error);
                }
            }
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="mt-20 card">
                <div className="card-body">
                    <h1 className="card-title text-center mx-auto" style={{ color: 'black' }}>Sign Up Now</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label" style={{ color: 'black' }}>Name:</label>
                            <Input type="text" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                            {errors.name && <div className="text-danger">{errors.name}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="apellidos" className="form-label" style={{ color: 'black' }}>Last name:</label>
                            <Input type="text" id="apellidos" name="apellidos" placeholder="Last name" value={formData.apellidos} onChange={handleChange} required />
                            {errors.apellidos && <div className="text-danger">{errors.apellidos}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" style={{ color: 'black' }}>Email:</label>
                            <Input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                            {errors.email && <div className="text-danger">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label" style={{ color: 'black' }}>Password:</label>
                            <div className="relative">
                                <Input type={isPasswordVisible ? "text" : "password"} id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                                <button className="absolute right-2 top-2 focus:outline-none" type="button" onClick={togglePasswordVisibility}>
                                    {isPasswordVisible ? (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            </div>
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nickname" className="form-label" style={{ color: 'black' }}>Nickname:</label>
                            <Input type="text" id="nickname" name="nickname" placeholder="Nickname" value={formData.nickname} onChange={handleChange} required />
                            {errors.nickname && <div className="text-danger">{errors.nickname}</div>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telefono" className="form-label" style={{ color: 'black' }}>Phone number:</label>
                            <Input type="text" id="telefono" name="telefono" placeholder="Phone number" value={formData.telefono} onChange={handleChange} required />
                            {errors.telefono && <div className="text-danger">{errors.telefono}</div>}
                        </div>
                        <div className="flex justify-center">
                            <Button type="submit">Register</Button>
                        </div>
                    </form>
                    <p className="mt-3" style={{ color: 'black' }}>Already have an account? <Link to="/logIn" className="border-b border-black hover:border-blue-500">Log In here</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
