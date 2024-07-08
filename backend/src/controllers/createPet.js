import Pet from '../models/pet.model.js';
import jwt from 'jsonwebtoken';

const createPet = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
  const userId = decodedToken.user.id;

  const { name, gender, neutered, age, weight } = req.body;

  try {
    const newPet = new Pet({
      name,
      gender,
      neutered,
      age,
      weight,
      owner: userId
    });

    const savedPet = await newPet.save();

    res.status(201).json({ pet: savedPet });
  } catch (error) {
    console.error('Error creating pet:', error);
    res.status(400).json({ message: 'Error creating pet', error });
  }
};

export default createPet;
