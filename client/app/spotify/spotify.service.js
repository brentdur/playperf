'use strict';

angular.module('musicApp')
  .factory('spotify', function ($http) {
    var e = {

    };

    e.getFeeling = function(term){
      var body = {
        feeling: term
      };
      return $http.post('/api/spotify/feeling', body);
    };

    return e;
  });
