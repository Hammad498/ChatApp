import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState,useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { registerUser } from '../features/auth/authApi.js'
import { toast } from 'react-toastify'


const Register = () => {
  const dispatch= useDispatch();
  const navigate = Navigate();
  const { user,loading,error } = useSelector((state) => state.auth);

  const [values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  });


    const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };


  useEffect(()=>{
    if(user){
      localStorage.setItem('chat-app-user',JSON.stringify(user));
      navigate('/login');
    }
  },[user,navigate]);

  const handleChange = (e) => {
  setValues({ ...values, [e.target.name]: e.target.value });
};

  const handleValidation = () => {
      const {username, email, password,confirmPassword } = values;
      if (!username || !email || !password || !confirmPassword) {
  toast.error("All fields are required", toastOptions);
  return false;
}
if (password !== confirmPassword) {
  toast.error("Passwords do not match", toastOptions);
  return false;
}
      return true;
    };

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(handleValidation()){
      dispatch(registerUser(values));
    }

  }

  return (
    <>
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div className="brand">
            <img src="" alt="" />
            <h1>Chat</h1>
          </div>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={handleChange}
            value={values.username}
          />
           <input
            type="email"
            placeholder="email"
            name="email"
            onChange={handleChange}
            value={values.email}
          />
           <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleChange}
            value={values.password}
          />
           <input
            type="password"
            placeholder="confirmPassword"
            name="confirmPassword"
            onChange={handleChange}
            value={values.confirmPassword}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Registering in...' : 'Register'}
          </button>

          <span>
            Have an account ? <Link to="/login">Login</Link>
          </span>
      </form>
    </FormContainer>
    <ToastContainer />
    {error && <p style={{ color: 'red', textAlign: 'center' }}>{error.message || error}</p>}
    
    </>
  )
}

export default Register


const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(
    to bottom,
    #128c7e 0%,
    #128c7e 20%,
    #DCDCDC 20%,
    #DCDCDC 100%
  );
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: grey;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #ece5dd;
    padding: 3rem 5rem;
  }
  input {
    background-color: white;
    padding: 1rem;
    border: 0.1rem solid white;
    border-radius: 0.4rem;
    color: grey;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #25d366;
      outline: none;
    }
  }
  button {
    background-color: #128c7e;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #075e54;
    }
  }
  span {
    color: grey;
    text-transform: uppercase;
    a {
      color: #128c7e;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

