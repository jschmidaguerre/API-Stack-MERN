import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const getUserProfile = async (req, res) => {
  try {
    console.log('req.user:', req.user); // Añade este log
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    // Obtener el ID del usuario desde el token de autorización
    const userId = decodedToken.user.id;

    // Buscar al usuario por su ID en la base de datos
    const user = await User.findById(userId).select('-contrasena'); // Excluir el campo de contraseña

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Devolver los datos del usuario
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
  }
};

export default getUserProfile;
