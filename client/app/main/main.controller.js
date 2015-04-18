'use strict';

angular.module('musicApp')
  .controller('MainCtrl', function ($scope, $http, songza) {
    $scope.data = songza.stations;
    $scope.send = function(term){
      songza.searchStations(term);
    };

    $scope.getListen = function(){
      songza.getListen($scope.stationId);
    }
    
  });
