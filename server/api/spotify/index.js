'use strict';

var express = require('express');
var controller = require('./spotify.controller');

var router = express.Router();
var request = require('request');

//router.get('/', controller.index);
//router.get('/:id', controller.show);
//router.post('/', controller.create);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

router.post('/playlist', function(req, res) {
	request('https://api.spotify.com/v1/search?q='+ req.body.artist + '&type=playlist', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			return res.json(200, JSON.parse(body));
		}
	});
});

router.post('/track', function(req, res) {
	request('https://api.spotify.com/v1/search?q='+ req.body.artist + '&type=track', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			return res.json(200, JSON.parse(body));
		}
	})
});

module.exports = router;