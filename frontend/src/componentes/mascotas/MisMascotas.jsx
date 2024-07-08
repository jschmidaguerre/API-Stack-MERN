import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MisMascotas = () => {
  const [pets, setPets] = useState([]);

  const fetchPets = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:3000/user-pets', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPets(res.data);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = async (petId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/pets/${petId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Actualizar la lista de mascotas después de eliminar una
      setPets(pets.filter(pet => pet._id !== petId));
    } catch (error) {
      console.error('Error deleting pet:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl text-blue-400 font-bold flex justify-center mb-4">Mis Mascotas</h2>
      <div className="flex flex-wrap justify-center">
        {pets.map((pet) => (
          <div key={pet._id} className="border bg-blue-300 mx-6 border-gray-400 rounded p-4">
            <h3 className=" text-2xl text-center font-bold m-4 p-2">{pet.name}</h3>
            <p><span className="font-bold">Género:</span> {pet.gender}</p>
            <p><span className="font-bold">Castrado:</span> {pet.neutered}</p>
            <p><span className="font-bold">Edad:</span> {pet.age} años</p>
            <p><span className="font-bold">Peso:</span> {pet.weight} kg</p>
            <div className='w-6 my-4'>
              <img 
                src="images/bote-de-basura.png" 
                alt="Eliminar"
                onClick={() => handleDelete(pet._id)}
                className="cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisMascotas;
