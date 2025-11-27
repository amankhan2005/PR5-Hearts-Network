// optional: if you want DB users later
import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: String,
  role: { type: String, default: 'admin' },
  name: String,
  createdAt: { type: Date, default: Date.now }
});
export default mongoose.models.User || mongoose.model('User', UserSchema);
