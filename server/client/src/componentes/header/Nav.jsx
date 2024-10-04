import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica si hay un token en el localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/registrarse');
  };

  const handleCreateService = () => {
    navigate('/services'); // Asegúrate de tener esta ruta configurada
  };

  const handleCreatePet = () => {
    navigate('/pets'); // Asegúrate de tener esta ruta configurada
  };

  const handleMyPets = () => {
    navigate('/mis-mascotas'); // Asegúrate de tener esta ruta configurada
  };

  const handleMyServices = () => {
    navigate('/mis-servicios')
  }

  const handleMyProfile = () => {
    navigate('/mi-perfil')
  }

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token del localStorage
    setIsAuthenticated(false); // Actualiza el estado de autenticación
    navigate('/'); // Redirige a la página principal u otra página
  };


  return (
    <nav className="flex justify-around items-center gap-2">
      {isAuthenticated ? (
        <>
          <button className="font-bold text-blue-400 hover:underline m-5" onClick={handleCreateService}>
            Crear Servicio
          </button>
          <button className="font-bold text-blue-400 hover:underline m-5" onClick={handleMyServices}>
            Mis Servicios
          </button>
          <button className="font-bold text-blue-400 hover:underline m-5" onClick={handleCreatePet}>
            Añadir mascota 🐾
          </button>
          <button className="font-bold text-blue-400 hover:underline m-5" onClick={handleMyPets}>
            Mis Mascotas
          </button>
          <button className="font-bold text-blue-400 hover:underline m-5" onClick={handleMyProfile}>
            <img 
            src="images/usuario.png" 
            alt="usuario" 
            className='w-6'
            />
          </button>
          <button className="font-bold text-blue-400 hover:underline m-5" onClick={handleLogout}>
            <img 
            src="images/cerrar-sesion.png" 
            alt="cerrar-sesion" 
            className='w-6'
            />
          </button>
        </>
      ) : (
        <>
          <button className="font-bold text-blue-400 hover:underline m-5" onClick={handleLogin}>
            Login
          </button>
          <button className="font-bold text-blue-400 hover:underline m-5" onClick={handleRegister}>
            Crear Cuenta
          </button>
        </>
      )}

    </nav>
  );
};

export default Nav;
