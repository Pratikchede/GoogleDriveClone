import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setAuthToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    axios.post('http://localhost:5000/signup', { username, password })
      .then(response => {
        alert('User created!');
      })
      .catch(error => {
        console.error('Error during signup', error);
      });
  };
//    <Login/>
  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
