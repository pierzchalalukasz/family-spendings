import mongoose from 'mongoose';

export default mongoose.model('Family', new mongoose.Schema({
  name: {
    type: String,
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  budget: {
    type: Number,
  },
}));
