import Service from '../models/service.model.js';
import jwt from 'jsonwebtoken';

const deleteService = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token,`${process.env.JWT_SECRET_KEY}`);
  const userId = decodedToken.user.id;
  
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (service.owner.toString() !== userId) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Error deleting service' });
  }
};

export default deleteService;