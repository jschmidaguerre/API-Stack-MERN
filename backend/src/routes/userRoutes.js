import express from 'express';
import register from '../controllers/register.js'; // Asegúrate de que la ruta sea correcta
import id from '../controllers/getUserById.js'; // Asegúrate de que la ruta sea correcta
import { getUsers } from '../controllers/userController.js'; // Asegúrate de que la ruta sea correcta
import login from '../controllers/login.js';
import createService from '../controllers/createService.js'
import getUserServices from '../controllers/getUserServices.js';
import deleteService from '../controllers/deleteService.js';
import createPet from '../controllers/createPet.js';
import deletePet from '../controllers/deletePet.js';
import getUserPets from '../controllers/getUserPets.js';
import updateProfile from '../controllers/updateProfile.js';
import getUserProfile from '../controllers/getUserProfile.js';
import authMiddleware from '../authMiddleware.js';

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/registrarse', register);

// Ruta para obtener todos los usuarios
router.get('/usuarios', getUsers);

// Ruta para loguearse
router.post('/login', login)

// Ruta para obtener un usuario por su ID
router.get('/usuarios/:id', id);

// Ruta para crear un servicio
router.post('/services', createService);

// Ruta para obtener todos los servicios por usuario
router.get('/user-services', getUserServices);

// Ruta para eliminar un servicio por usuario
router.delete('/services/:id', deleteService);

// Ruta para crear mascotas (añadirlas)
router.post('/pets', createPet);

// Ruta para eliminar mascotas por usuario
router.delete('/pets/:id', deletePet);

// Ruta para obtener todas las mascotas por usuario
router.get('/user-pets', getUserPets);


// Ruta protegida para obtener el perfil del usuario
router.get('/profile', getUserProfile);

// Ruta protegida para actualizar el perfil del usuario
router.put('/user-profile', updateProfile);


export default router;
