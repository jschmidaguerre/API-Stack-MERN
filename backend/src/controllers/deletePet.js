import Pet from '../models/pet.model.js';
import jwt from 'jsonwebtoken';

const deletePet = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
  const userId = decodedToken.user.id;

  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    if (pet.owner.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    await Pet.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    console.error('Error deleting pet:', error);
    res.status(500).json({ message: 'Error deleting pet' });
  }
};

export default deletePet;
