import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  petType: { type: String, required: true },
  frequency: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  cost: { type: Number, required: true },
  description: { type: String, required: true },
  localidad: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Service = mongoose.model('Service', serviceSchema);

export default Service;