import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const CrearServicio = () => {
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState({
    name: '',
    frequency: '',
    localidad: '',
    category: '',
    petType: '',
    fromDate: '',
    toDate: '',
    cost: '',
    description: ''
  });

  // Obtener el ID del usuario desde el token
  const token = localStorage.getItem('token');



  const handleChange = (e) => {
    const { name, value } = e.target;
    setServiceData({ ...serviceData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:3000/services',
        { ...serviceData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Servicio creado:', res.data);
      navigate('/mis-servicios');
    } catch (error) {
      console.error('Error creando servicio:', error);
    }
  };

  return (
    <div>
      <h3 className="py-5 flex justify-center text-4xl font-bold text-blue-500">Crear un Nuevo Servicio</h3>
      
      <form className="flex flex-col items-center p-5 space-y-5" onSubmit={handleSubmit}>
  {/* Campos del formulario */}
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor="name">Nombre:</label>
    <input
      className="border-2 border-blue-500 rounded px-3 py-1"
      type="text"
      id="name"
      name="name"
      value={serviceData.name}
      onChange={handleChange}
      required
    />
  </div>
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor="frequency">Frecuencia:</label>
    <select
      className="border-2 border-blue-500 rounded px-3 py-1"
      id="frequency"
      name="frequency"
      value={serviceData.frequency}
      onChange={handleChange}
      required
    >
      <option value="" disabled>Seleccionar Frecuencia</option>
      <option value="Unica">Única</option>
      <option value="Diaria">Diaria</option>
      <option value="Semanal">Semanal</option>
      <option value="Mensual">Mensual</option>
    </select>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor="barrio">Barrio:</label>
    <select
      className="border-2 border-blue-500 rounded px-3 py-1"
      id="localidad"
      name="localidad"
      value={serviceData.localidad}
      onChange={handleChange}
      required
    >
      <option value="" disabled>Seleccionar Barrio</option>
      <option value="Agronomía">Agronomía</option>
      <option value="Almagro">Almagro</option>
      <option value="Balvanera">Balvanera</option>
      <option value="Barracas">Barracas</option>
      <option value="Belgrano">Belgrano</option>
      <option value="Boedo">Boedo</option>
      <option value="Caballito">Caballito</option>
      <option value="Chacarita">Chacarita</option>
      <option value="Coghlan">Coghlan</option>
      <option value="Colegiales">Colegiales</option>
      <option value="Constitución">Constitución</option>
      <option value="Flores">Flores</option>
      <option value="Floresta">Floresta</option>
      <option value="La Boca">La Boca</option>
      <option value="La Paternal">La Paternal</option>
      <option value="Liniers">Liniers</option>
      <option value="Mataderos">Mataderos</option>
      <option value="Monte Castro">Monte Castro</option>
      <option value="Montserrat">Montserrat</option>
      <option value="Nueva Pompeya">Nueva Pompeya</option>
      <option value="Nuñez">Nuñez</option>
      <option value="Palermo">Palermo</option>
      <option value="Parque Avellaneda">Parque Avellaneda</option>
      <option value="Parque Chacabuco">Parque Chacabuco</option>
      <option value="Parque Chas">Parque Chas</option>
      <option value="Parque Patricios">Parque Patricios</option>
      <option value="Puerto Madero">Puerto Madero</option>
      <option value="Recoleta">Recoleta</option>
      <option value="Retiro">Retiro</option>
      <option value="Saavedra">Saavedra</option>
      <option value="San Cristóbal">San Cristóbal</option>
      <option value="San Nicolás">San Nicolás</option>
      <option value="San Telmo">San Telmo</option>
      <option value="Versalles">Versalles</option>
      <option value="Villa Crespo">Villa Crespo</option>
      <option value="Villa Devoto">Villa Devoto</option>
      <option value="Villa General Mitre">Villa General Mitre</option>
      <option value="Villa Lugano">Villa Lugano</option>
      <option value="Villa Luro">Villa Luro</option>
      <option value="Villa Ortúzar">Villa Ortúzar</option>
      <option value="Villa Pueyrredón">Villa Pueyrredón</option>
      <option value="Villa Real">Villa Real</option>
      <option value="Villa Riachuelo">Villa Riachuelo</option>
      <option value="Villa Santa Rita">Villa Santa Rita</option>
      <option value="Villa Soldati">Villa Soldati</option>
      <option value="Villa Urquiza">Villa Urquiza</option>
      <option value="Villa del Parque">Villa del Parque</option>
      <option value="Vélez Sarsfield">Vélez Sarsfield</option>
    </select>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor="category">Categoría:</label>
    <select
      className="border-2 border-blue-500 rounded px-3 py-1"
      id="category"
      name="category"
      value={serviceData.category}
      onChange={handleChange}
      required
    >
      <option value="" disabled>Seleccionar Categoría</option>
      <option value="Adiestramiento">Adiestramiento</option>
      <option value="Cuidado Doméstico">Cuidado Doméstico</option>
      <option value="Paseos">Paseos</option>
    </select>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor="petType">Tipo de Mascota:</label>
    <select
      className="border-2 border-blue-500 rounded px-3 py-1"
      id="petType"
      name="petType"
      value={serviceData.petType}
      onChange={handleChange}
      required
    >
      <option value="" disabled>Seleccionar Tipo de Mascota</option>
      <option value="Perro">Perro</option>
      <option value="Gato">Gato</option>
    </select>
  </div>
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor="fromDate">Desde:</label>
    <input
      className="border-2 border-blue-500 rounded px-3 py-1"
      type="date"
      id="fromDate"
      name="fromDate"
      value={serviceData.fromDate}
      onChange={handleChange}
      required
    />
  </div>
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor="toDate">Hasta:</label>
    <input
      className="border-2 border-blue-500 rounded px-3 py-1"
      type="date"
      id="toDate"
      name="toDate"
      value={serviceData.toDate}
      onChange={handleChange}
      required
    />
  </div>
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor="cost">Costo:</label>
    <input
      className="border-2 border-blue-500 rounded px-3 py-1"
      type="number"
      id="cost"
      name="cost"
      value={serviceData.cost}
      onChange={handleChange}
      required
    />
  </div>
  <div className="flex flex-col items-center space-y-2">
    <label htmlFor="description">Descripción:</label>
    <textarea
      className="border-2 border-blue-500 rounded px-3 py-1"
      id="description"
      name="description"
      value={serviceData.description}
      onChange={handleChange}
      required
    />
  </div>
  <button
    className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 transition duration-300"
    type="submit"
  >
    Crear Servicio
  </button>
</form>

    </div>
  );
};

export default CrearServicio;
