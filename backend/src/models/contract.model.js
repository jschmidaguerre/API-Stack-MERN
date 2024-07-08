import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  contactPhone: { type: String, required: true },
  contactEmail: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Solicitada', 'Aceptada', 'Finalizada', 'Cancelada'], default: 'Solicitada' }
});

const Contract = mongoose.model('Contract', contractSchema);
export default Contract;