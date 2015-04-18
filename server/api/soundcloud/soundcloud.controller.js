'use strict';

var _ = require('lodash');
var Soundcloud = require('./soundcloud.model');

// Get list of soundclouds
exports.index = function(req, res) {
  Soundcloud.find(function (err, soundclouds) {
    if(err) { return handleError(res, err); }
    return res.json(200, soundclouds);
  });
};

// Get a single soundcloud
exports.show = function(req, res) {
  Soundcloud.findById(req.params.id, function (err, soundcloud) {
    if(err) { return handleError(res, err); }
    if(!soundcloud) { return res.send(404); }
    return res.json(soundcloud);
  });
};

// Creates a new soundcloud in the DB.
exports.create = function(req, res) {
  Soundcloud.create(req.body, function(err, soundcloud) {
    if(err) { return handleError(res, err); }
    return res.json(201, soundcloud);
  });
};

// Updates an existing soundcloud in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Soundcloud.findById(req.params.id, function (err, soundcloud) {
    if (err) { return handleError(res, err); }
    if(!soundcloud) { return res.send(404); }
    var updated = _.merge(soundcloud, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, soundcloud);
    });
  });
};

// Deletes a soundcloud from the DB.
exports.destroy = function(req, res) {
  Soundcloud.findById(req.params.id, function (err, soundcloud) {
    if(err) { return handleError(res, err); }
    if(!soundcloud) { return res.send(404); }
    soundcloud.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}