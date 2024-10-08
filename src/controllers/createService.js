import jwt from 'jsonwebtoken';
import Service from '../models/service.model.js';
import User from '../models/user.model.js';
import mongoose from 'mongoose';
const createService = async (req, res) => {

  const { name, category, frequency, fromDate, toDate, cost, petType,description, localidad } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
  const userId = decodedToken.user.id;

  console.log(decodedToken);

  try {
    const id = new mongoose.mongo.ObjectId(userId);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const newService = new Service({
      name,
      category,
      frequency,
      petType,
      fromDate,
      toDate,
      cost,
      description,
      localidad,
      owner: id
    });

    Service.create(newService)
    
    user.services.push(newService);
    await user.save();
    res.status(201).json({ service: newService });
    
    } catch (error) {
    console.log('Error creating service:', error);
    res.status(400).json({ message: 'Error creating service', error });
  }
};

export default createService;
