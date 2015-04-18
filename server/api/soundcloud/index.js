'use strict';

var express = require('express');
var controller = require('./soundcloud.controller');

var router = express.Router();

var request = require('request');


//router.get('/', controller.index);
//router.get('/:id', controller.show);
//router.post('/', controller.create);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

router.get('/', function(req, res) {
	request('http://www.google.com', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(200, body);
	  }
	});
});


router.get('/chill', function(req, res) {
	request('http://api.soundcloud.com/playlists?client_id=c8cff8892431fa994f15e719dc19e6ef&tags=chill', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(200, body);
		}

	});
});

router.get('/rock', function(req, res) {
	request('http://api.soundcloud.com/tracks?client_id=c8cff8892431fa994f15e719dc19e6ef&tags=rock', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.json(200, body);
		}
	});
});



module.exports = router;




