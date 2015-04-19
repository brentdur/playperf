'use strict';

angular.module('musicApp')
  .controller('PlayerCtrl', function ($scope, $http, songza, soundcloud, spotify, angularPlayer, $timeout) {
    $scope.stations = songza.stations;
    $scope.tracks = soundcloud.tracks;
    $scope.playable = [];
    $scope.link = songza.link;
    $scope.loaded = true;
    $scope.loading = false;
    $scope.paused = true;
    $scope.controlText = 'Pause';
    $scope.current;
    $scope.played = 0;
    $scope.moving = 0;
    angularPlayer.init();
    $scope.termPlace = '_Enter Mood';
    $scope.isPlaying = angularPlayer.isPlayingStatus;
    $scope.volume = 90;


    $scope.songs = {
      id: 'one',
      title: 'songTitle',
      artist: 'ME',
      url: 'https://api.soundcloud.com/tracks/69837941/stream?client_id=c8cff8892431fa994f15e719dc19e6ef'
    };  

    $scope.send = function(){
    	$scope.loading = true;
      $scope.playable = [];
      songza.clearStations();
      $scope.stations = [];
      soundcloud.clearTracks();
      $scope.tracks = [];
      songza.searchStations($scope.term).success(function(){
        for(var i = 0; i < $scope.stations.length; i++){
        	var why = 'This station was chosen from a search of the term ' + $scope.term;
          $scope.playable.push({type: 'songza', plays: 0, where: why , item: $scope.stations[i]});
        }
        songza.clearStations();
        $scope.stations = [];
      });

      soundcloud.searchTracks($scope.soundTerm).success(function(){
        for(var i = 0; i < $scope.tracks.length/4; i++){
        	var why = 'This track was chosen from a search of the term ' + $scope.term;
          $scope.playable.push({type: 'cloud', plays: 0, where: why, item: $scope.tracks[i]});
        }
        soundcloud.clearTracks();
        $scope.tracks = [];
      });
      spotify.getFeeling($scope.soundTerm).success(function(data){
      	var end = 5;
      	if(end > data.tracks.items.length){
      		end = data.tracks.items.length;
      	}
      	for(var i = 0; i < end; i++){
      		var artist = data.tracks.items[i].artists[0].name;
      		console.log(artist);
      		songza.searchStations(artist).success(function(data){
      			for(var j = 0; j < data.length; j++){
      				var why = 'This was chosen from an artist search of the term ' + artist;
		          $scope.playable.push({type: 'songza', plays: 0, where: why, item: data[i]});
		        }
      		});
      		// var album = data.tracks.items[i].album.name;
      		// songza.searchStations(album).success(function(data){
      		// 	for(var j = 0; j < data.length; j++){
		      //     $scope.playable.push({type: 'songza', plays: 0, where: 3, item: data[i]});
		      //   }
		       
      		// });
      	}
      });
      $timeout(function(){$scope.getListen()}, 6000);
      // $timeout(function(){$scope.findSims()}, 12000);
    };

    $scope.findSims = function(){
    	songza.getMoods().success(function(data){
      	for(var i = 0; i < data.length; i++){
      		var name = data[i].name.toLowerCase();
      		var tags = data[i].keywords;
      		if($scope.term === name || tags.indexOf($scope.term) != -1){
      			for(var j = 0; j < 5; j++){
      				songza.getStation(data[i].station_ids[j]).success(function(data){
      					$scope.playable.push({type: 'songza', plays: 0, where: 3, item: data});
      				});
      			}
      		}
      	}
      });
    };

    $scope.getListen = function(){
    	console.log("running");
      $scope.loading = true;
      angularPlayer.stop();
      var choose =  Math.floor(Math.random() * $scope.playable.length);
      var item = $scope.playable[choose];
      $scope.current = item;
      $scope.source = item.type;
      $scope.where = item.where;
      if(item.type === 'songza'){
      	if(item.plays > 1) {
      		$scope.playable.splice(choose, 1);
      	}
      	$scope.playable.plays += 1;
        $scope.songzaPlay(item.item);
      }
      else if(item.type === 'cloud'){
      	$scope.playable.splice(choose, 1);
        $scope.soundCloudPlay(item.item);
      }
      if($scope.term){
     	 $scope.termPlace = $scope.term;
     }
      $scope.term = '';
    };

    $scope.finishLoading = function(){
      $scope.loaded = true;
      angularPlayer.addTrack({id: $scope.played.toString(), title: $scope.songTitle, artist: 'ME', url: $scope.link});
      angularPlayer.nextTrack();
      $scope.played += 1;
      $scope.loading = false;
      $scope.paused = false;
      angularPlayer.play();
      for(var i = 0; i < $scope.playable.length; i++){
      	console.log($scope.playable.item.name);
      }
    };

    $scope.$on('track:progress', function(event, data) {
    	$scope.moving = data;
		$scope.$apply();
		if(!$scope.loading){
			if(data >= 99.5) {
				angularPlayer.stop();
				$scope.loading = true;
				$scope.getListen();
			}
		}
	});

    $scope.songzaPlay = function(obj){
      $scope.current = obj.id;
      songza.getListen(obj.id).success(function(data){
        $scope.link = data.listen_url;
        $scope.songTitle = data.song.title;
        $scope.artist = data.song.artist.name;
        $scope.finishLoading();
      });
    };

    $scope.follow = function(){
    	if($scope.source === 'songza'){
    		songza.getSimilar($scope.current).success(function(data){
    		for(var i = 0; i<data.length; i++){
    			$scope.playable.push({type: 'songza', plays: 0, item: data[i]});
    		}
	    	});

	    	songza.getStation($scope.current).success(function(data){
	    		var terms = data.dasherized_name.split('-');
	    		for(var i = 0; i < terms.length; i++){
	    			soundcloud.searchTracks(terms[i]).success(function(info){
	    				for(var j = 0; j < info.length/4; j++){
	    					$scope.playable.push({type: 'cloud', item: info[i]});
	    				}
	    			})
	    		}
	    	});
    	}
    	else if($scope.source === 'cloud'){
    		soundcloud.getSpecific($scope.current).success(function(data){
    			var terms = data[0].tag_list.split(' ');
    			for(var i = 0; i< terms.length; i++){
    				songza.searchStations(terms[i]).success(function(info){
    					for(var i = 0; i<info.length; i++){
			    			$scope.playable.push({type: 'songza', plays: 0, item: info[i]});
			    		}
    				});
    			}
    		});
    	}
    	
    };

    $scope.soundCloudPlay = function(obj){
      $scope.current = obj.id;
      $scope.link = obj.stream_url+'?client_id='+$scope.clientID();
      $scope.songTitle = obj.title;
      $scope.artist = obj.user.username;
      $scope.finishLoading();

    };

    $scope.clientID = function(){
      return 'c8cff8892431fa994f15e719dc19e6ef';
    };

    $scope.toggleAudio = function(){
      if(!$scope.paused){
        angularPlayer.pause();
      }
      else {
        angularPlayer.play();
      }
      $scope.paused = !$scope.paused;
    };

    $scope.volumeSlider = function(increase){
    	angularPlayer.adjustVolume(increase);
    	$scope.volume = angularPlayer.getVolume();
    };
    
  });