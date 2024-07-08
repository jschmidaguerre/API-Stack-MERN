import User from '../models/user.model.js';

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        res.status(500).json({ message: 'Error obteniendo usuarios', error });
    }
};

export { getUsers };