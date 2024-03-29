'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SongzaSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Songza', SongzaSchema);