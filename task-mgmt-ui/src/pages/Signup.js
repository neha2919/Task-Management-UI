import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpApi, getRoles } from '../utils/api';
import Input from '../components/Input';
import Button from '../components/Buttons';
import SelectInput from '../components/SelectInput';
import { Link } from 'react-router-dom';
import '../styles/SignUp.css';

const Signup = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    roles: []
  });

  const [roles, setRoles] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const rolesData = await getRoles();
        if (Array.isArray(rolesData)) {
          setRoles(rolesData.map(role => ({ value: role.roleCode, label: role.roleCode })));
        }
      } catch (error) {
        console.error("Failed to fetch roles", error);
      }
    };

    fetchRoles();
  }, []);

  const validatePasswords = (password, confirmPassword) => {
    return password && confirmPassword && password !== confirmPassword ? "Passwords do not match!" : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prevState => {
      const updatedForm = { ...prevState, [name]: value };

      // Validate passwords reactively
      if (name === "password" || name === "confirmPassword") {
        setError(validatePasswords(updatedForm.password, updatedForm.confirmPassword));
      }

      return updatedForm;
    });
  };

  const handleRoleChange = (selectedOptions) => {
    setFormData({
      ...formData,
      roles: selectedOptions ? selectedOptions.map(option => option.value) : [],
    });
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.phoneNumber &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      !error
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const { confirmPassword, ...payload } = formData;
    const response = await signUpApi(payload);
    if (response.status) {
      navigate('/');
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <Input label="First Name" type="text" value={formData.firstName} onChange={handleChange} name="firstName" />
        <Input label="Last Name" type="text" value={formData.lastName} onChange={handleChange} name="lastName" />
        <Input label="Phone Number" type="text" value={formData.phoneNumber} onChange={handleChange} name="phoneNumber" />
        <Input label="Email" type="email" value={formData.email} onChange={handleChange} name="email" />
        <Input label="Password" type="password" value={formData.password} onChange={handleChange} name="password" />
        <Input label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} name="confirmPassword" />

        {error && <p className="error-message">{error}</p>}

        <SelectInput 
          label="Select Roles"
          options={roles}
          isMulti={true}
          value={formData.roles}
          onChange={handleRoleChange}
        />

        <Button label="Sign Up" disabled={!isFormValid()} />
      </form>
      <div className="sign-up-link">
        <p>Already have an account? <Link to="/">Sign In</Link></p>
      </div>
    </div>
  );
};

export default Signup;
