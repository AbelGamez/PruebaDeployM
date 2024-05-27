import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Input, Button } from '@nextui-org/react';
import { AuthContext } from '../../context/AuthContext'; 
import 'tailwindcss/tailwind.css';

const UpdateUserForm = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState({
        name: '',
        apellidos: '',
        email: '',
        nickname: '',
        telefono: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        apellidos: '',
        email: '',
        nickname: '',
        telefono: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Limpiar el error al cambiar el valor del campo
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        // Validar nombre (debe contener solo letras y tener al menos 2 caracteres)
        if (!/^[a-zA-Z]{2,}$/.test(userData.name)) {
            newErrors.name = 'Name must contain only letters and have at least 2 characters';
            valid = false;
        }

        // Validar apellidos (debe contener solo letras y tener al menos 2 caracteres)
        if (!/^[a-zA-Z]{2,}$/.test(userData.apellidos)) {
            newErrors.apellidos = 'Last name must contain only letters and have at least 2 characters';
            valid = false;
        }

        // Validar email
        if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = 'Invalid email address';
            valid = false;
        }

        // Validar nickname (debe contener solo letras y números y tener al menos 4 caracteres)
        if (!/^[a-zA-Z0-9]{4,}$/.test(userData.nickname)) {
            newErrors.nickname = 'Nickname must contain only letters and numbers and have at least 4 characters';
            valid = false;
        }

        // Validar teléfono (debe contener solo números y tener exactamente 9 dígitos)
        if (!/^\d{9}$/.test(userData.telefono)) {
            newErrors.telefono = 'Phone number must contain only numbers and have exactly 9 digits';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(`http://blackm614:Bc3P64B0@www.blackmarket.org.mialias.net/server/public/index.php/api/editUser/${user.id}`, userData); 
                setMessage('User updated correctly');
            } catch (error) {
                setMessage('');
                setError('Error updating the user');
                console.error('Error:', error);
            }
        }
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm('¿Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmDelete) {
            try {
                await axios.delete(`http://blackm614:Bc3P64B0@www.blackmarket.org.mialias.net/server/public/index.php/api/user/${user.id}`); 
                alert('¡Your account has been successfully deleted!');
            } catch (error) {
                setError('Error deleting the account');
                console.error('Error:', error);
            }
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://blackm614:Bc3P64B0@www.blackmarket.org.mialias.net/server/public/index.php/api/user/${user.id}`); 
                setUserData(response.data);
            } catch (error) {
                setError('Error getting user data');
                console.error('Error:', error);
            }
        };
        fetchUserData();
    }, [user.id]);

    return (
<div className="flex justify-center items-center min-h-screen">
    <div className="w-full md:w-3/4 lg:w-1/2">
    <h1 className="text-4xl text-black font-bold text-center mb-8">Update User</h1>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                <Input type="text" id="name" name="name" value={userData.name} onChange={handleChange} className="form-control" />
                {errors.name && <div className="text-red-500">{errors.name}</div>}
            </div>
            <div className="mb-4">
                <label htmlFor="apellidos" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                <Input type="text" id="apellidos" name="apellidos" value={userData.apellidos} onChange={handleChange} className="form-control" />
                {errors.apellidos && <div className="text-red-500">{errors.apellidos}</div>}
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                <Input type="email" id="email" name="email" value={userData.email} readOnly className="form-control" />
                {errors.email && <div className="text-red-500">{errors.email}</div>}
            </div>
            <div className="mb-4">
                <label htmlFor="nickname" className="block text-gray-700 text-sm font-bold mb-2">Nickname:</label>
                <Input type="text" id="nickname" name="nickname" value={userData.nickname} onChange={handleChange} className="form-control" />
                {errors.nickname && <div className="text-red-500">{errors.nickname}</div>}
            </div>
            <div className="mb-4">
                <label htmlFor="telefono" className="block text-gray-700 text-sm font-bold mb-2">Number phone:</label>
                <Input type="text" id="telefono" name="telefono" value={userData.telefono} onChange={handleChange} className="form-control" />
                {errors.telefono && <div className="text-red-500">{errors.telefono}</div>}
            </div>
            <div className="flex justify-between">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Update User
                </Button>
                <Button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDeleteAccount}>
                    Delete Account
                </Button>
            </div>
        </form>
    </div>
</div>








    );
};

export default UpdateUserForm;
