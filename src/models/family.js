import mongoose from 'mongoose';

export default mongoose.model('Family', new mongoose.Schema({
  name: {
    type: String,
  },
  budget: {
    type: Number,
  },
}));
