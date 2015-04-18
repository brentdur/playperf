'use strict';

var express = require('express');
var Songza = require('songza');
var songza = new Songza({ userAgent: 'myApp/v0.0.1' });

var router = express.Router();

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);
// 

router.post('/search', function(req, res) {
    songza.search.station(req.body.term).then(function(data){
      return res.json(200, data);
    });
});

router.post('/station', function(req, res) {
    songza.station.get(req.body.id, 30).then(function(data){
      return res.json(200, data);
    });
});

router.post('/listen', function(req, res) {
    songza.station.nextSong(req.body.id).then(function(data){
      return res.json(200, data);
    });
});

router.get('/getTags', function(req, res) {
    songza.tag.getAll().then(function(data){
      return res.json(200, data);
    });
});


router.post('/tag', function(req, res) {
    songza.gallery.tag(req.body.tag).then(function(data){
      return res.json(200, data);
    });
    // return res.json(200, sit);
});



module.exports = router;