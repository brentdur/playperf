'use strict';

var _ = require('lodash');
var Spotify = require('./spotify.model');

// Get list of spotifys
exports.index = function(req, res) {
  Spotify.find(function (err, spotifys) {
    if(err) { return handleError(res, err); }
    return res.json(200, spotifys);
  });
};

// Get a single spotify
exports.show = function(req, res) {
  Spotify.findById(req.params.id, function (err, spotify) {
    if(err) { return handleError(res, err); }
    if(!spotify) { return res.send(404); }
    return res.json(spotify);
  });
};

// Creates a new spotify in the DB.
exports.create = function(req, res) {
  Spotify.create(req.body, function(err, spotify) {
    if(err) { return handleError(res, err); }
    return res.json(201, spotify);
  });
};

// Updates an existing spotify in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Spotify.findById(req.params.id, function (err, spotify) {
    if (err) { return handleError(res, err); }
    if(!spotify) { return res.send(404); }
    var updated = _.merge(spotify, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, spotify);
    });
  });
};

// Deletes a spotify from the DB.
exports.destroy = function(req, res) {
  Spotify.findById(req.params.id, function (err, spotify) {
    if(err) { return handleError(res, err); }
    if(!spotify) { return res.send(404); }
    spotify.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}