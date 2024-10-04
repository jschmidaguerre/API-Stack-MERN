import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileCard = ({ userData, onEdit }) => (
  <div className="flex flex-col items-center p-5 space-y-5">
    <h2 className="text-2xl text-blue-400 font-bold flex justify-center mb-4">Mi Perfil</h2>
    <div className="border border-gray-400 rounded p-4 bg-blue-300">
      <h3 className=" text-2xl text-center font-bold m-4 p-2">{userData.nombre}</h3>
      <p className="mb-10"><span className="font-bold">Correo:</span> {userData.correo}</p>
      <button
        className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition duration-300 font-bold"
        onClick={onEdit}
      >
        Editar Perfil
      </button>
    </div>
  </div>
);

const EditProfileForm = ({ userData, onChange, onSubmit, onCancel }) => (
  <div className="flex flex-col items-center p-5 space-y-5">
    <h2 className="text-2xl text-blue-400 font-bold flex justify-center mb-4">Editar Perfil</h2>
    <form className="flex flex-col items-center space-y-2" onSubmit={onSubmit}>
      <div className="flex flex-col items-center space-y-2">
        <label htmlFor="nombre">Nombre:</label>
        <input
          className="border-2 border-blue-500 rounded px-3 py-1"
          type="text"
          id="nombre"
          name="nombre"
          value={userData.nombre}
          onChange={onChange}
          required
        />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <label htmlFor="correo">Correo:</label>
        <input
          className="border-2 border-blue-500 rounded px-3 py-1"
          type="email"
          id="correo"
          name="correo"
          value={userData.correo}
          onChange={onChange}
          required
        />
      </div>
      <div className="flex flex-col items-center space-y-2">
        <label htmlFor="contrasena">Contraseña:</label>
        <input
          className="border-2 border-blue-500 rounded px-3 py-1"
          type="password"
          id="contrasena"
          name="contrasena"
          value={userData.contrasena}
          onChange={onChange}
        />
      </div>
      <div className="flex space-x-2">
        <button
          className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition duration-300"
          type="submit"
        >
          Guardar Cambios
        </button>
        <button
          className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600 transition duration-300"
          type="button"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
);

const MiPerfil = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    correo: '',
    contrasena: ''
  });
  const [editing, setEditing] = useState(false); // Estado para controlar si se está editando el perfil
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:3000/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(res.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Error fetching user profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:3000/user-profile', userData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Perfil actualizado correctamente');
      setEditing(false); // Una vez guardados los cambios, se desactiva la edición
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Error updating profile');
      alert('Hubo un error al actualizar el perfil');
    }
  };

  const handleEdit = () => {
    setEditing(true); // Activar la edición al hacer clic en "Editar perfil"
  };

  const handleCancel = () => {
    setEditing(false); // Cancelar la edición
  };

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500">{error}</p>}
      {editing ? (
        <EditProfileForm 
          userData={userData} 
          onChange={handleChange} 
          onSubmit={handleSubmit} 
          onCancel={handleCancel} 
        />
      ) : (
        <ProfileCard 
          userData={userData} 
          onEdit={handleEdit} 
        />
      )}
    </div>
  );
};

export default MiPerfil;