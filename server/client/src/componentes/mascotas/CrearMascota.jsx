import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearMascota = () => {
  const navigate = useNavigate();
  const [petData, setPetData] = useState({
    name: '',
    gender: '',
    neutered: '',
    age: '',
    weight: ''
  });

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/pets', petData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Mascota creada:', res.data);
      navigate('/mis-mascotas');
    } catch (error) {
      console.error('Error creando mascota:', error);
    }
  };

  return (
    <div>
      <h3 className="py-5 flex justify-center text-4xl font-bold text-blue-500">Crear una Nueva Mascota</h3>
      <form className="flex flex-col items-center p-5 space-y-5" onSubmit={handleSubmit}>
  {/* Campos del formulario */}
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor="name">Nombre:</label>
    <input
      className="border-2 border-blue-500 rounded px-3 py-1"
      type="text"
      id="name"
      name="name"
      value={petData.name}
      onChange={handleChange}
      required
    />
  </div>
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor="gender">Género:</label>
    <select
      className="border-2 border-blue-500 rounded px-3 py-1"
      id="gender"
      name="gender"
      value={petData.gender}
      onChange={handleChange}
      required
    >
      <option value="" disabled>Seleccionar Género</option>
      <option value="Masculino">Masculino</option>
      <option value="Femenino">Femenino</option>
    </select>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor="neutered">Castrado:</label>
    <select
      className="border-2 border-blue-500 rounded px-3 py-1"
      id="neutered"
      name="neutered"
      value={petData.neutered}
      onChange={handleChange}
      required
    >
      <option value="" disabled>Seleccionar Opción</option>
      <option value="Sí">Sí</option>
      <option value="No">No</option>
    </select>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor="age">Edad:</label>
    <input
      className="border-2 border-blue-500 rounded px-3 py-1"
      type="number"
      id="age"
      name="age"
      value={petData.age}
      onChange={handleChange}
      required
    />
  </div>
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor="weight">Peso en KG:</label>
    <input
      className="border-2 border-blue-500 rounded px-3 py-1"
      type="number"
      id="weight"
      name="weight"
      value={petData.weight}
      onChange={handleChange}
      required
    />
  </div>
  <button
    className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition duration-300"
    type="submit"
  >
    Crear Mascota
  </button>
</form>
    </div>
  );
};

export default CrearMascota;
