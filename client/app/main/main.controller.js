'use strict';

angular.module('musicApp')
  .controller('MainCtrl', function ($scope, $http, songza, ngAudio) {
    $scope.data = songza.stations;
    $scope.link = songza.link;
    $scope.loaded = false;
    $scope.loading = false;
    $scope.paused = false;
    $scope.controlText = 'Pause';
    $scope.audio = null;
    $scope.send = function(){
      songza.searchStations($scope.term);
    };

    $scope.getListen = function(){
      $scope.loading = true;
      if($scope.audio != null){
          $scope.audio.stop();
        }
      songza.getListen($scope.stationId).success(function(data){
        $scope.link = songza.song.listen_url;
        $scope.songTitle = songza.song.song.title;
        $scope.audio = ngAudio.play($scope.link);
        $scope.loaded = true;
        console.log($scope.audio.paused)
        $scope.loading = false;
      });
    };

    $scope.toggleAudio = function(){
      if(!$scope.paused){
        $scope.controlText = 'Play';
        $scope.audio.pause();
      }
      else {
        $scope.controlText = 'Pause';
        $scope.audio.play();
      }
      $scope.paused = !$scope.paused;
    };
    
  });
