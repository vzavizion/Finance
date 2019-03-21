const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const countrySchema = new Schema({
},
  { collection: 'country', strict: false }
);


const groupSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  countryNames: [{ type: String, required: true, unique: true }]
},
  { collection: 'group', strict: true }
);

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;