// petSchema.js
import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  neutered: { type: String, required: true },
  age: { type: Number, required: true },
  weight: { type: Number, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Referencia al usuario propietario
});

const Pet = mongoose.model('Pet', petSchema);

export default Pet;