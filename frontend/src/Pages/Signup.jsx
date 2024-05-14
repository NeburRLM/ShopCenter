import React, { useState } from 'react';
import './LoginSignup.css';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleContinue = async (event) => {
        event.preventDefault();

        const credentials = {
            username: username,
            password: password,
            email: email
        };

        const registerFetchConfig = {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        };

        const response = await fetch('http://localhost:4000/user/register', registerFetchConfig);
        if (response.status === 409) {
            alert('Username already registered');
        } else {
            alert('Registered');
            navigate('/');
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleContinue} className="loginsignup-fields">
                    <TextField
                        type="text"
                        name="username"
                        label="Your Name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        type="password"
                        name="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        type="email"
                        name="email"
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Continue
                    </Button>
                </form>
                <p className="loginsignup-login">
                    Already have an account? <Link to="/">Click here</Link>
                </p>
                <div className="loginsignup-agree">
                    <FormControlLabel
                        control={<Checkbox />}
                        label="By continuing, I agree to the terms of use & privacy policy."
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
