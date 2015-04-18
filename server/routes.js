/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
<<<<<<< HEAD
  app.use('/api/songza', require('./api/songza'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
=======
  app.use('/api/soundcloud', require('./api/soundcloud'));
  app.use('/api/thing', require('./api/thing'));
  app.use('/api/user', require('./api/user'));
>>>>>>> e6c5c392d9632e20df3b59f52e11b7dc9851b185

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
