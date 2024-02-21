import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import './Toolbar.css';

const Toolbar = () => {
  const nav = useNavigate();
  const [userPermissions, setUserPermissions] = useState('');

  const getUserPermissions = async () => {
    try {
      const userToken = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/v1/user/permissions`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': userToken}
      });

      if (response.ok) {
        const data = await response.json();
        setUserPermissions(data);

      } else {
        nav("/login");
      }

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    nav('/');
  }

  useEffect(() => {
    getUserPermissions();
  }, []);

	return (
		<div className="toolbar">
      {userPermissions.includes("create") ? <button onClick={() => nav('/users')}>Usuarios</button> : null}
      {userPermissions.includes("create") ? <button onClick={() => nav('/categories')}>Categorias</button> : null}
      {userPermissions.includes("create") ? <button onClick={() => nav('/themes')}>Temas</button> : null}
      {userPermissions.includes("create") ? <button onClick={() => nav('/post')}>Post</button> : null}
      <button onClick={() => logout()}>Cerrar Sesión</button>
    </div>
	)
}

export default Toolbar;
