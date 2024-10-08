import userSchema from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const register = async (req, res) => {

    console.log(req.body)
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
        return res.status(400).json({ mensaje: 'Falta el nombre, el correo o la contrasena, verifique por favor.' });
    }

    try {
        const existingUser = await userSchema.findOne({ correo });
        if (existingUser) {
            return res.status(400).json({ mensaje: 'Ya existe un usuario con ese correo.' });
        }

        const contrasenaHasheada = await bcrypt.hash(contrasena, 10);
        const nuevoUsuario = new userSchema({
            nombre,
            correo,
            contrasena: contrasenaHasheada
        });

        const usuarioGuardado = await nuevoUsuario.save();
        return res.status(201).json({ mensaje: 'El usuario se ha creado con exito.', usuario: usuarioGuardado });
    } catch (error) {
        console.error('Error registrando nuevo usuario:', error);
        return res.status(500).json({ mensaje: 'Error registrando el usuario', error });
    }
};

export default register;