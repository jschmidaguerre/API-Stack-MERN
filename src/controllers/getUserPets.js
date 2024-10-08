import Pet from '../models/pet.model.js';
import jwt from 'jsonwebtoken';

const getUserPets = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
  const userId = decodedToken.user.id;

  try {
    const pets = await Pet.find({ owner: userId });
    res.status(200).json(pets);
  } catch (error) {
    console.error('Error fetching user pets:', error);
    res.status(500).json({ message: 'Error fetching user pets' });
  }
};

export default getUserPets;
