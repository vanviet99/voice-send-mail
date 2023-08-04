
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/your-database-name');

const audioSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String,
  },{
    collection:'Audio'
  });
  
  const Audio = mongoose.model('Audio', audioSchema);
  
  module.exports = Audio;


