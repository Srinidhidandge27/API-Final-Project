import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
   name: String,
   position: String,
   team: String,
});

export default mongoose.model('Player', PlayerSchema);
