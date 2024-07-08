import User from '../models/user.model.js';

const id = async (req, res) => {
    const userId = req.params.id; // Obtener el parámetro de la URL
    
    try {
        if (userId.length !== 24) {
            return res.status(400).json({ mensaje: "ID de usuario inválida" });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ mensaje: "No se encontró ningún usuario con esa ID" });
        }

        // Filtrar los campos que no queremos devolver
        const { _id, contrasena, __v, ...resto } = user._doc;

        res.status(200).json(resto);
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        res.status(500).json({ mensaje: 'Error al obtener usuario por ID', error });
    }
};

export default id;
