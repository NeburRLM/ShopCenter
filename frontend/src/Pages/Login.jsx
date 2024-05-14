import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const validatePassword = async (event) => {
    event.preventDefault();

    const credentials = {
      username: username,
      password: password,
    };

    const loginFetchConfig = {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    };

    const response = await fetch('http://localhost:4000/user/login', loginFetchConfig);
    if (response.status === 204) {
      navigate('/Home/ShopMain');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <form onSubmit={validatePassword}>
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
            <Button type="submit" variant="contained" color="primary">
              Continue
            </Button>
          </form>
        </div>
        <p className="loginsignup-login">
          Create an account? <Link to="/Register">Click-Here</Link>
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

export default Login;
