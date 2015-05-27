// It's a good habit to wrap your javascript in a function
(function() {

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	var app = angular.module('video.controller', []);	

	app.controller('VideoController', ['$scope', '$http', '$location', '$route','$log', '$timeout', 'siteData', 
		'localStorageService', 'httpVideoDataService', 'httpWatchesService',
		function($scope, $http, $location, $route, $log, $timeout, siteData, localStorageService, httpVideoDataService, httpWatchesService) {
		// ID tags ... May not be the best approach to manipulate the DOM elements directly
		//		ng-src from angular has issues in some browsers. Reading online, seems like there's no good solution
		var videoID = "video-id";
		var srcWebID = "web-vid-src";

		var maxMax = '7'; // Maximum number of videos/flash-cards needed to show

		// This will handle the grabbing the URL for the videos
		$scope.videoTotal;
		$scope.videoIndex = 0;
		$scope.videoData;
		$scope.videoTitle;
		$scope.videoURL;

		// This will handle the grabbing the definition for the flashes
		$scope.flashTotal;
		$scope.flashIndex = 0;
		$scope.flashTitle;
		$scope.flashDefinition;

		// Controls the flash card show vs video
		$scope.showFlash = false;

		// Shows the video title and video out of ... Need to hide the title on the opening video
		$scope.showTitle = false;

		$scope.userName  = localStorageService.get('Email');
		$scope.seenGuide = localStorageService.get($scope.userName + 'knownvideosSubmitted')

		if ($scope.seenGuide) {
			$log.debug('User has completed guide');
		} else {
			$log.debug('User has not completed guide');
			$location.path('/guide');
			$route.reload();
		}

		if (localStorageService.get($scope.userName + 'watchedVideos')) {
			$location.path('/thanks');
			$route.reload();
			return;
		}


		// Get the list of known words for the user
		// Get the list of all videos
		$scope.init = function() {
			// Method needed for getting async data. This ensures that we only execute the rest of the functions after we get the data.

			var dataPromise = httpVideoDataService.get();
			dataPromise.then(function(result){
				$scope.videoData = result.data.videos;
				$scope.flashData = result.data.flashes;
				$log.debug('Got video data: %o', $scope.videoData);
				$log.debug('Got flash data: %o', $scope.flashData);

				var knownWords = {};
				var wordPromise = httpWatchesService.get($scope.userName);
				wordPromise.then(function(result) {
					watchList = result.data;
					$log.debug('My watch list is: %o', watchList);
					$scope.videosToPlay = watchList['videos'];
					$scope.cardsToPlay  = watchList['flashes'];
					$log.debug('The videosToPlay is: %o', $scope.videosToPlay);
					$log.debug('The cardsToPlay is: %o', $scope.cardsToPlay);
					$scope.videoTotal = $scope.videosToPlay.length;
					$scope.flashTotal = $scope.cardsToPlay.length;
					$timeout(function() {
						angular.element('#'+videoID).get(0).pause();
						angular.element('#'+srcWebID).attr("src", 'https://s3-us-west-1.amazonaws.com/smvtestvideotranscoded/Opening_Scene.mp4'); 
						angular.element('#'+videoID).get(0).load();
						angular.element('#'+videoID).get(0).play();
						angular.element('#'+videoID).get(0).onended = function(e) {
							if ($scope.videoIndex == 0) {
								$scope.showTitle = true;
								$scope.changeVideo('next');
							}
						};
					},'500'); // Give a second delay before playing the next video
				})
			})
		}

		// Change the index of the video to show 
		$scope.changeVideo = function(state){
			if (state == 'next' && $scope.videoIndex < $scope.videosToPlay.length) {
				$scope.videoIndex++;
			} else if (state == 'prev' && $scope.videoIndex > 1) {
				$scope.videoIndex--;
			} else if (state == 'next' && $scope.videoIndex == $scope.videosToPlay.length) {
				angular.element('#'+videoID).get(0).pause(); // Stop the video in case it's still playing
				$scope.showFlash = true;
				$scope.changeFlash('next');
				return;
			}
			$timeout($scope.playVideo,'500'); // Give a half a second delay before playing the next video
		}

		// Change the index of the flash to show 
		$scope.changeFlash = function(state){
			if (state == 'next' && $scope.flashIndex < $scope.cardsToPlay.length) {
				$scope.flashIndex++;
			} else if (state == 'prev' && $scope.flashIndex > 1) {
				$scope.flashIndex--;
			} else if (state == 'next' && $scope.flashIndex == $scope.cardsToPlay.length) {
				$scope.goNext();
				return;
			}
			
			var flashName = $scope.cardsToPlay[$scope.flashIndex-1];
			var thisFlash = {};
			$log.debug('Will play flash name: ' + flashName);
			for (var i = 0; i < $scope.flashData.length; i++) {
				var data = $scope.flashData[i];
				if (data.NAME == flashName) {
					thisFlash = data;
					break;
				}
			}
			$log.debug('My flash to show is: %o', data);
			$scope.flashTitle = thisFlash.NAME;
			$scope.flashDefinition = thisFlash.DEFINITION;
		}

		// Play the video through changing the source of the video tag
		$scope.playVideo = function(){
			var videoName = $scope.videosToPlay[$scope.videoIndex-1];
			var thisVideo = {};
			$log.debug('Will play vidoe name: ' + videoName);
			for (var i = 0; i < $scope.videoData.length; i++) {
				var data = $scope.videoData[i];
				if (data.NAME == videoName) {
					thisVideo = data;
					break;
				}
			}
			$log.debug('In playVideo func. My data is: %o', thisVideo);
			angular.element('#'+videoID).get(0).pause();
			angular.element('#'+srcWebID).attr("src", thisVideo.URL); 
			angular.element('#'+videoID).get(0).load();
			angular.element('#'+videoID).get(0).play();
			$scope.videoTitle = thisVideo.NAME;
		};

		// We're just changing the page to feedback page
		$scope.goNext = function() {
			// Store a variable that indicates the videos & flashes have been watched
			localStorageService.set($scope.userName + 'watchedVideos', true);
			$location.path('/thanks');
			$route.reload();
		}

	}]);

})();