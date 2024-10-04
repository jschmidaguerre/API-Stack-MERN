// FiltersBar.jsx
import React from 'react';

const FiltersBar = ({ filters, setFilters, handleFilterChange }) => {
  return (
      <div className="bg-blue-300 flex flex-wrap justify-around items-center p-2 border-b-2 mb-10">
        <div className="flex items-center space-x-5">
          <label htmlFor="category" className='font-bold'>Categoría:</label>
          <select
            className="border-2 border-blue-500 rounded px-3 py-1"
            id="category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">Todas</option>
            <option value="Adiestramiento">Adiestramiento</option>
            <option value="Cuidado Doméstico">Cuidado Doméstico</option>
            <option value="Paseos">Paseos</option>
          </select>
        </div>
        <div className="flex items-center space-x-5">
          <label htmlFor="petType" className='font-bold'>Tipo de Mascota:</label>
          <select
            className="border-2 border-blue-500 rounded px-3 py-1"
            id="petType"
            name="petType"
            value={filters.petType}
            onChange={handleFilterChange}
          >
            <option value="">Todas</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
          </select>
        </div>
        <div className="flex items-center space-x-5">
          <label htmlFor="frequency" className='font-bold'>Frecuencia:</label>
          <select
            className="border-2 border-blue-500 rounded px-3 py-1"
            id="frequency"
            name="frequency"
            value={filters.frequency}
            onChange={handleFilterChange}
          >
            <option value="">Todas</option>
            <option value="Unica">Única</option>
            <option value="Diaria">Diaria</option>
            <option value="Semanal">Semanal</option>
            <option value="Mensual">Mensual</option>
          </select>
        </div>
        <div className="flex items-center space-x-5">
          <label htmlFor="zone" className='font-bold'>Zona:</label>
          <select
            className="border-2 border-blue-500 rounded px-3 py-1"
            id="zone"
            name="zone"
            value={filters.zone}
            onChange={handleFilterChange}
          >
            <option value="">Todas</option>
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
        <div className="flex items-center space-x-5">
          <label htmlFor="cost" className='font-bold'>Costo:</label>
          <input
            className="border-2 border-blue-500 rounded px-3 py-1"
            type="number"
            id="cost"
            name="cost"
            value={filters.cost}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      
  );
};

export default FiltersBar;
