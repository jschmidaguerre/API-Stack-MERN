import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
<<<<<<< HEAD
import userRoutes from './routes/userRoutes.js';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
const __dirname = path.resolve();
=======
import user from './models/user.model.js';
import Pet from './models/pet.model.js';  // Importación correcta del modelo Pet
import Service from './models/service.model.js';  // Importación correcta del modelo Service
import login from './controllers/login.js';
import register from './controllers/register.js';
import id from './controllers/getUserById.js';
import Contract from './models/contract.model.js';  // Asegúrate de que la ruta sea correcta


>>>>>>> aaf601497cd5df172c6ffa6e741bfdba33ddba61

//server
const app = express();
const port = 3000;
const uri = 'mongodb://127.0.0.1:27017/test';



// middlewares
app.use(cors());
<<<<<<< HEAD
app.use(express.json())
app.use('/', userRoutes);
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: true }));
=======


app.use(express.json());  // Middleware para parsear JSON


app.post('/register', register);
app.post('/login', login);
app.get('/user/:id', id);


app.put('/api/contracts/:contractId', async (req, res) => {
  const { contractId } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(contractId)) {
    return res.status(400).json({ message: 'Invalid contract ID format' });
  }

  if (!status || !['Solicitada', 'Aceptada', 'Finalizada', 'Cancelada'].includes(status)) {
    return res.status(400).json({ message: 'Invalid or missing status' });
  }

  try {
    const updatedContract = await Contract.findByIdAndUpdate(
      contractId,
      { $set: { status } },
      { new: true }
    );

    if (!updatedContract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    res.status(200).json(updatedContract);
  } catch (error) {
    console.error('Error updating contract status:', error);
    res.status(500).json({ message: 'Error updating contract status', error });
  }
});


// Endpoint para crear mascotas con asociación a un usuario
app.post('/pets', async (req, res) => {
  const { name, gender, neutered, age, weight, ownerId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    return res.status(400).json({ message: 'Invalid owner ID format' });
  }

  try {
    // Crear una nueva mascota
    const pet = new Pet({
      name,
      gender,
      neutered,
      age,
      weight,
      owner: ownerId
    });

    // Guardar la mascota en la base de datos
    const savedPet = await pet.save();

    // Asociar la mascota al usuario
    const user = await User.findById(ownerId);
    user.pets.push(savedPet._id);
    await user.save();

    res.status(201).json(savedPet);
  } catch (error) {
    console.log('Error creating pet:', error);
    res.status(400).json({ message: 'Error creating pet', error });
  }
});
// Endpoint para obtener contratos por providerId
app.get('/api/contracts/provider/:providerId', async (req, res) => {
  const { providerId } = req.params;

  try {
      // Obtener los servicios del proveedor
      const services = await Service.find({ owner: providerId }).select('_id');
      const serviceIds = services.map(service => service._id);

      // Obtener los contratos para esos servicios
      const contracts = await Contract.find({ serviceId: { $in: serviceIds } }).populate('userId', 'nombre correo').populate('serviceId', 'name');

      res.status(200).json(contracts);
  } catch (error) {
      console.error('Error fetching contracts for provider:', error);
      res.status(500).json({ message: 'Error fetching contracts for provider', error });
  }
});



// Endpoint para obtener contratos por userID
app.get('/contracts/user/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID format' });
  }

  try {
    const contracts = await Contract.find({ userId }); // Asegúrate de usar 'userId' que es el campo correcto
    res.status(200).json(contracts);
  } catch (error) {
    console.log('Error fetching contracts:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

app.post('/contracts', async (req, res) => {
  try {
    const newContract = new Contract(req.body);
    await newContract.save();
    res.status(201).json(newContract);
  } catch (error) {
    console.error('Error creating contract:', error);
    res.status(500).json({ message: 'Error creating contract', error: error.message });
  }
});


// Endpoint para crear servicios
app.post('/services', async (req, res) => {
  const { name, category, frequency, fromDate, toDate, cost, serviceType, description, image, localidad, owner } = req.body;

  if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ message: 'Invalid owner ID format' });
  }

  try {
      // Crear un nuevo servicio
      const newService = new Service({
          name,
          category,
          frequency,
          fromDate,
          toDate,
          cost,
          serviceType,
          description,
          image,
          localidad,
          owner
      });

      // Guardar el servicio en la base de datos
      const savedService = await newService.save();

      // Asociar el servicio al usuario
      const user = await User.findById(owner);
      user.services.push(savedService._id);
      await user.save();

      res.status(201).json({ service: savedService });
  } catch (error) {
      console.log('Error creating service:', error);
      res.status(400).json({ message: 'Error creating service', error });
  }
});


// Endpoint para obtener todas las mascotas de un usuario específico
app.get('/pets', async (req, res) => {
  const { ownerId } = req.query;

  if (!ownerId) {
    return res.status(400).json({ message: 'Owner ID is required' });
  }

  if (!mongoose.Types.ObjectId.isValid(ownerId)) {
    return res.status(400).json({ message: 'Invalid owner ID format' });
  }

  try {
    const pets = await Pet.find({ owner: ownerId });
    res.json({ pets });
  } catch (error) {
    console.log('Error fetching pets:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint para eliminar un servicio por ID
app.delete('/services/:id', async (req, res) => {
  const { id } = req.params;  // Extraer el ID del servicio de los parámetros de la URL

  // Validar si el ID tiene un formato válido de MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(`Failed to delete: Invalid ID format provided (${id}).`); // Log de error si el formato de ID es inválido
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      console.log(`Deletion attempt failed: No service found with ID ${id}.`); // Log cuando no se encuentra el servicio
      return res.status(404).json({ message: 'Service not found' });
    }

    console.log(`Service with ID ${id} has been deleted successfully.`); // Log de éxito al eliminar el servicio
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.log(`Error deleting service with ID ${id}:`, error); // Log de cualquier otro error que ocurra
    res.status(500).json({ message: 'Error deleting service', error });
  }
});


app.get('/services', async (req, res) => {
  const { ownerId, localidad, serviceType, category, fromDate, toDate } = req.query;
  const query = {};

  if (ownerId) {
      if (!mongoose.Types.ObjectId.isValid(ownerId)) {
          return res.status(400).json({ message: 'Invalid owner ID format' });
      }
      query.owner = ownerId;
  }

  if (localidad) query.localidad = localidad;
  if (serviceType) query.serviceType = serviceType;
  if (category) query.category = category;
  if (fromDate) query.fromDate = { $gte: new Date(fromDate) };
  if (toDate) query.toDate = { $lte: new Date(toDate) };

  try {
      const services = await Service.find(query);
      res.json({ services });
  } catch (error) {
      console.log('Error fetching services:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
// Endpoint para crear servicios
app.post('/services', async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json({ service: savedService });
  } catch (error) {
    console.log('Error creating service:', error);
    res.status(400).json({ message: 'Error creating service', error });
  }
});

app.get('/user/:id', id)
app.post('/register', register)
app.post('/login', login)



// Endpoint para crear usuarios
app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, edad, correo, contraseña, mascota } = req.body;

    if (!nombre || !edad) {
      return res.status(400).json({ message: 'Bad request, name or age not found' });
    }
    const usuarioNuevo = new usuario({
      nombre,
      edad,
      correo,
      contraseña,
      mascota
    });

    const usuarioGuardado = await usuarioNuevo.save();
    res.status(201).json({ usuario: usuarioGuardado });
    console.log('Usuario creado');
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await usuario.find();
    res.json({ usuarios });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint para obtener todas las mascotas
app.get('/pets', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json({ pets });
  } catch (error) {
    res.status(500).send(error);
  }
});



// Endpoint para eliminar mascotas
app.delete('/pets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Received request to delete pet with id: ${id}`); // Log para ver el ID recibido

    // Convertir el ID a ObjectId utilizando 'new'
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const deletedPet = await Pet.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    if (!deletedPet) {
      console.log(`Pet with id: ${id} not found`);
      return res.status(404).json({ message: 'Pet not found' });
    }

    console.log(`Pet with id: ${id} deleted successfully`);
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.log('Error deleting pet:', error);
    res.status(500).json({ message: 'Error deleting pet', error });
  }
});

// Endpoint para eliminar un servicio por ID
app.delete('/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Received request to delete service with id: ${id}`); // Log para ver el ID recibido

    // Convertir el ID a ObjectId utilizando 'new'
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const deletedService = await Service.findByIdAndDelete(new mongoose.Types.ObjectId(id));
    if (!deletedService) {
      console.log(`Service with id: ${id} not found`);
      return res.status(404).json({ message: 'Service not found' });
    }

    console.log(`Service with id: ${id} deleted successfully`);
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.log('Error deleting service:', error);
    res.status(500).json({ message: 'Error deleting service', error });
  }
});
>>>>>>> aaf601497cd5df172c6ffa6e741bfdba33ddba61

// Conexión a MongoDB y lanzamiento del servidor
mongoose.connect(uri)
  .then(() => {
    console.log('Connection success');
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Connection fail', error);
  });

  // After all route handlers
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});