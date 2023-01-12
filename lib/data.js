const Mongoose = require('mongoose');
const Config = require('../config.json');

Mongoose.connect(`mongodb://${Config.mongodbHost}/tutor`,
                 { useNewUrlParser: true, useUnifiedTopology: true });

// Put here everything you want to record from each user/session.
module.exports.UserSession = Mongoose.models.UserSession || Mongoose.model(
  'UserSession',
  new Mongoose.Schema({
    id: String,
    method: String,
    beginTimestamp: Date,
    endTimestamp: Date,
    introResponse: Array,
    responses: Array,
    equationsTest: Array,
    survey: Object,
  }),
);
