import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const updateProfile = async (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
  const userId = decodedToken.user.id;

  try {
    // Validar si el usuario existe
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualizar los datos del usuario
    user.nombre = nombre;
    user.correo = correo;

    // Solo actualizar la contraseña si se proporciona una nueva
    if (contrasena) {
      const hashedPassword = await bcrypt.hash(contrasena, 10);
      user.contrasena = hashedPassword;
    }

    // Guardar el usuario actualizado en la base de datos
    await user.save();

    res.status(200).json({ message: 'Datos del perfil actualizados correctamente' });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({ message: 'Error al actualizar el perfil' });
  }
};

export default updateProfile;
