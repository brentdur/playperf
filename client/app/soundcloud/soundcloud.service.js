'use strict';

angular.module('musicApp')
  .factory('soundcloud', function ($http) {
    var e = {
      tracks: []
    };

    e.clearTracks = function(){
      e.tracks = [];
    };

    e.searchTracks = function(term){
      var body = {
        genre: term
      };
      return $http.post('/api/soundcloud/tracks', body).success(function(data){
        for(var i = 0; i<data.length; i++){
          e.tracks.push(data[i]);
        }
      });
    };

    e.getSpecific = function(id){
      var body = {
        id: id
      };
      return $http.post('/api/soundcloud/specific', body);
    };
    
    return e;
  });
