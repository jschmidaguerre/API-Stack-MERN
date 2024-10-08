import jwt from 'jsonwebtoken';
import Service from '../models/service.model.js';

const getUserServices = async (req, res) => {
  try {
    // Verificar si el token de autorización está presente en los encabezados
    if (!req.headers.authorization) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }
    
    // Extraer el token y decodificarlo para obtener el userId
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    const userId = decodedToken.user.id;

    // Buscar todos los servicios que pertenecen al usuario con userId
    const services = await Service.find({ owner: userId });
    
    // Devolver los servicios encontrados
    res.status(200).json(services);
  } catch (error) {
    console.log('Error fetching services:', error);
    res.status(400).json({ message: 'Error fetching services', error });
  }
};

export default getUserServices;
