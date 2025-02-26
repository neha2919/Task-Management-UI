import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInApi } from '../utils/api';
import Input from '../components/Input';
import Button from '../components/Buttons';
import { Link } from 'react-router-dom'; 
import '../styles/SignIn.css';

const SignIn = ({ setUser }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ userId: '', password: '' });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signInApi(credentials);
    if (response.status) {
      setUser(response.data.userDto);
      navigate('/dashboard');
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="User ID"
          type="text"
          value={credentials.email}
          onChange={handleChange}
          name="userId"
        />
        <Input
          label="Password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          name="password"
        />
        <Button label="Sign In" />
      </form>
      <div className="sign-up-link">
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
