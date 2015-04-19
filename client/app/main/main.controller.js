'use strict';

angular.module('musicApp')
  .controller('MainCtrl', function ($scope, $http, songza, soundcloud, ngAudio, $timeout, angularPlayer) {
    $scope.stations = songza.stations;
    $scope.tracks = soundcloud.tracks;
    $scope.playable = [];
    $scope.link = songza.link;
    $scope.loaded = true;
    $scope.loading = false;
    $scope.paused = false;
    $scope.controlText = 'Pause';
    $scope.audio = null;
    $scope.current;
    $scope.played = 0;
    angularPlayer.init();


    $scope.songs = {
      id: 'one',
      title: 'songTitle',
      artist: 'ME',
      url: 'https://api.soundcloud.com/tracks/69837941/stream?client_id=c8cff8892431fa994f15e719dc19e6ef'
    };  

    $scope.send = function(){
      songza.searchStations($scope.term).success(function(){
        for(var i = 0; i < $scope.stations.length; i++){
          $scope.playable.push({type: 'songza', item: $scope.stations[i]});
        }
      });
      soundcloud.searchTracks($scope.soundTerm).success(function(){
        for(var i = 0; i < $scope.tracks.length; i++){
          $scope.playable.push({type: 'cloud', item: $scope.tracks[i]});
        }
        $scope.getListen();
      });
      $scope.term = '';
    };

    $scope.getListen = function(){
      $scope.loading = true;
      if($scope.audio != null){
          $scope.audio.stop();
      }
      var choose =  Math.floor(Math.random() * $scope.playable.length);
      var item = $scope.playable[choose];
      $scope.playable.splice(choose, 1);
      $scope.current = item;
      if(item.type === 'songza'){
        $scope.songzaPlay(item.item);
      }
      else if(item.type === 'cloud'){
        $scope.soundCloudPlay(item.item);
      }
    };

    $scope.finishLoading = function(){
      $scope.loaded = true;
      angularPlayer.addTrack({id: $scope.played.toString(), title: $scope.songTitle, artist: 'ME', url: $scope.link});
      angularPlayer.nextTrack();
      $scope.played += 1;
      $scope.loading = false;
      angularPlayer.play();
    };

    $scope.songzaPlay = function(obj){
      songza.getListen(obj.id).success(function(data){
        $scope.link = obj.listen_url;
        $scope.songTitle = obj.title;
        $scope.finishLoading();
      });
    };

    $scope.soundCloudPlay = function(obj){
      $scope.link = obj.stream_url+'?client_id='+$scope.clientID();
      $scope.songTitle = obj.title;
      console.log($scope.link, $scope.songTitle);
      $scope.finishLoading();

    };

    $scope.clientID = function(){
      return 'c8cff8892431fa994f15e719dc19e6ef';
    };

    $scope.$watch('audio.remaining', function(){
      if($scope.audio.remaining <= 0){
        $scope.getListen();
      }
    });

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
