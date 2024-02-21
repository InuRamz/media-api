import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {
  const nav = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userName: username, password: password}),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.user._id);
        nav("/post");

      } else {
        setError('Credenciales incorrectas');
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión');
    }
  };

  return (
		<div className="full-size">
			<div className="login-container">
      <h2>Iniciar sesión</h2>
				<form>
					<div className="form-group">
						<label htmlFor="username">Usuario:</label>
						<input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
					</div>

					<div className="form-group">
						<label htmlFor="password">Contraseña:</label>
						<input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
					</div>

					{error && <p style={{ color: 'red' }}>{error}</p>}

					<button type="button" className="login-button" onClick={handleLogin}>
						Iniciar sesión
					</button>
				</form>
    	</div>
		</div>
  );
};

export default Login;
