import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FiltersBar from '../filterBar/FiltersBar';

const MisServicios = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    petType: '',
    frequency: '',
    zone: '',
    cost: ''
  });


  const fetchServices = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:3000/user-services', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setServices(res.data);
      setFilteredServices(res.data); // Set filtered services initially
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const applyFilters = () => {
      let filtered = services;
      if (filters.category) {
        filtered = filtered.filter(service => service.category === filters.category);
      }
      if (filters.petType) {
        filtered = filtered.filter(service => service.petType === filters.petType);
      }
      if (filters.frequency) {
        filtered = filtered.filter(service => service.frequency === filters.frequency);
      }
      if (filters.zone) {
        filtered = filtered.filter(service => service.localidad === filters.zone);
      }
      if (filters.cost) {
        filtered = filtered.filter(service => service.cost <= filters.cost);
      }
      setFilteredServices(filtered);
    };
    applyFilters();
  }, [filters, services]);


  const handleDelete = async (serviceId) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.delete(`http://localhost:3000/services/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Service deleted:', res.data);
      // Actualizar la lista de servicios después de eliminar uno
      setServices(services.filter(service => service._id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
      console.log('Axios error details:', error.response);
    }
  };

  return (
    <div >
      <h2 className="text-2xl text-blue-400 font-bold flex justify-center mb-4">Mis Servicios</h2>
      <FiltersBar filters={filters} setFilters={setFilters} handleFilterChange={handleFilterChange} />
      <div className="flex flex-wrap justify-center">
        {filteredServices.map((service) => (
          <div key={service._id} className="bg-blue-300  border border-gray-400 rounded p-4">
            <h3 className="text-2xl text-center font-bold m-4 p-2">{service.name}</h3>
            <p><span className="font-bold">Categoría:</span> {service.category}</p>
            <p><span className="font-bold">Frecuencia:</span> {service.frequency}</p>
            <p><span className="font-bold">Desde:</span> {new Date(service.fromDate).toLocaleDateString()}</p>
            <p><span className="font-bold">Hasta:</span> {new Date(service.toDate).toLocaleDateString()}</p>
            <p><span className="font-bold">Costo:</span> ${service.cost}</p>
            <p><span className="font-bold">Tipo de Servicio:</span> {service.serviceType}</p>
            <p><span className="font-bold">Descripción:</span> {service.description}</p>
            <p><span className="font-bold">Localidad:</span> {service.localidad}</p>
            <div className='w-6 my-4'>
              <img 
                src="images/bote-de-basura.png" 
                alt="Eliminar"
                onClick={() => handleDelete(service._id)}
                className="cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MisServicios;