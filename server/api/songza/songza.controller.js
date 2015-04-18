'use strict';

var _ = require('lodash');
// var Songza = require('./songza.model');
var Songza = require('songza');
var songza = new Songza({ userAgent: 'myApp/v0.0.1' });

// Get list of songzas
exports.index = function(req, res) {
    var sit = songza.search.artist('swift').then(function(data){
      return res.json(200, data);
    });
    // return res.json(200, sit);
};

// Get a single songza
exports.show = function(req, res) {
  Songza.findById(req.params.id, function (err, songza) {
    if(err) { return handleError(res, err); }
    if(!songza) { return res.send(404); }
    return res.json(songza);
  });
};

// Creates a new songza in the DB.
exports.create = function(req, res) {
  Songza.create(req.body, function(err, songza) {
    if(err) { return handleError(res, err); }
    return res.json(201, songza);
  });
};

// Updates an existing songza in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Songza.findById(req.params.id, function (err, songza) {
    if (err) { return handleError(res, err); }
    if(!songza) { return res.send(404); }
    var updated = _.merge(songza, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, songza);
    });
  });
};

// Deletes a songza from the DB.
exports.destroy = function(req, res) {
  Songza.findById(req.params.id, function (err, songza) {
    if(err) { return handleError(res, err); }
    if(!songza) { return res.send(404); }
    songza.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}