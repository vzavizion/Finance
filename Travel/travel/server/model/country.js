const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const placeSchema = new Schema({
  name: { type: String, required: true },
  sequenceNumber: { type: Number, required: true }
},
  { strict: false }
);


const prioritySchema = new Schema({
  name: { type: String, required: true },
  sequenceNumber: { type: Number, required: true },
  description: { type: String, required: true },
},
  { strict: false }
);


const monthSchema = new Schema({
  name: { type: String, required: true },
  sequenceNumber: { type: Number, required: true }
},
  { strict: false }
);



const seasonSchema = new Schema({
  month: monthSchema,
  range: { type: String }
},
  { strict: false }
);


const seasonInfoSchema = new Schema({
  seasonFrom: seasonSchema,
  seasonTo: seasonSchema,
  description: { type: String, required: false },
  isNoVisit: { type: Boolean, required: true }
},
  { strict: false }
);



const regionSchema = new Schema({
  name: { type: String },
  description: { type: String },

  places: [placeSchema]
},
  { strict: false }
);


const countryRegionSchema = new Schema({

  name: { type: String },
  description: { type: String },

  seasons: [seasonInfoSchema],  
  regions: [regionSchema]
},
  { strict: false }
);


const countrySchema = new Schema({
  name: { type: String, required: true, unique: true },
  continent: { type: String, required: false },
  priority: prioritySchema,
  isVisited: { type: Boolean, required: false },
  seasons: [seasonInfoSchema],
  regions: [countryRegionSchema]
},
  { collection: 'country', strict: true }
);

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;