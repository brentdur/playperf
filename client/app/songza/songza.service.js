'use strict';

angular.module('musicApp')
  .factory('songza', function ($http) {
    var e = {
      stations: [],
      song: null
    };

    e.searchStations = function(term){
      var body = {
        term: term
      };
      return $http.post('/api/songza/search', body).success(function(data){
        for(var i = 0; i<data.length; i++){
          e.stations.push(data[i]);
        }
      });
    };
    e.getListen = function(id){
      var body = {
        id: id
      };
      return $http.post('/api/songza/listen', body).success(function(data){
        e.song = data;
      });
    };
    return e;
  });
