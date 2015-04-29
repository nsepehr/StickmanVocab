// It's a good habit to wrap your javascript in a function
(function() {

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	var app = angular.module('video.controller', []);	

	app.controller('VideoController', ['$scope', '$http', '$location', '$route','$log', '$timeout', 'siteData', 'localStorageService', 'httpVideoDataService', 'httpKnownWordsService',
		function($scope, $http, $location, $route, $log, $timeout, siteData, localStorageService, httpVideoDataService, httpKnownWordsService) {
		// ID tags ... May not be the best approach to manipulate the DOM elements directly
		//		ng-src from angular has issues in some browsers. Reading online, seems like there's no good solution
		var videoID = "video-id";
		var srcWebID = "web-vid-src";

		var maxMax = '7'; // Maximum number of videos/flash-cards needed to show

		// This will handle the grabbing the URL for the videos
		$scope.total;
		$scope.videoIndex = 1;
		$scope.videoData;
		$scope.videoTitle;
		$scope.videoURL;

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
		// Based on these two data, create a new data which contains unknown words
		$scope.init = function() {
			// Method needed for getting async data. This ensures that we only execute the rest of the functions after we get the data.

			var dataPromise = httpVideoDataService.get();
			dataPromise.then(function(result){
				$scope.videoData = result.data;
				$log.debug('Got them data asynchrounsly: %o', $scope.videoData);

				var knownWords = {};
				var wordPromise = httpKnownWordsService.get($scope.userName);
				wordPromise.then(function(result) {
					$scope.knownWords = result.data;
					$log.debug('My knownWords is: %o', $scope.knownWords);

					var maxShow = $scope.numMaxShow($scope.videoData.length, $scope.knownWords.length, maxMax);
					$scope.total = maxShow;
					$log.debug('Will show a maximum of : ' + maxShow);
					$scope.videosToPlay = $scope.createVideoList($scope.videoData, $scope.knownWords, maxShow);
					$scope.cardsToPlay  = $scope.createFlashCardList($scope.videoData, $scope.knownWords, $scope.videosToPlay, maxShow);
					$log.debug('The videosToPlay is: %o', $scope.videosToPlay);
					$log.debug('The cardsToPlay is: %o', $scope.cardsToPlay);
					$timeout($scope.playVideo,'1000'); // Give a second delay before playing the next video
				})
			})
		}

		// Figureout the maximum number of videos & flash-cards the user needs to watch
		//   We want to show an equal # of videos & flash-cards, so we must subtitue the maximum # of available words
		//   from the known videos and divide that # by 2
		$scope.numMaxShow = function(video, words, max) {
			$log.debug('Trying to figureout the maximum # of videos/flash-cards to watch');
			var i = video - words;
			var i2 = Math.floor(i / 2); // Get the rounded value of the division
			if (max < i2) {
				return max;
			}
			return i2;
		}

		// Below is the algorithm for creating the video list which will be played. 
		//   The list will just be the name of the videos to play. The actual data for the video will ba taken from videoData object
		$scope.createVideoList = function(data, words, max) {
			$log.debug('Creating the video list');
			$log.debug('My known words are: ' + words);
			var videoList = [];
			for (var i = 0; i < data.length; i++) {
				thisVideo = data[i];
				$log.debug('thisVideo is: %o', thisVideo);
				if (videoList.length >= max) {
					$log.debug('Breaking from create vid list');
					break;
				} else if (words.indexOf(thisVideo.NAME) > -1){
					$log.debug('Already know this word: ' + thisVideo.NAME);
					continue;
				} else {
					videoList.push(thisVideo.NAME);
				}
			};
			// Return the video list
			return videoList;
		}

		// Create the list of flash-cards to show. This list must not have any words which are in the videoList & known words
		//   The list will be just names... the actual data will come from the videoData object
		$scope.createFlashCardList = function(data, words, vidList, max) {
			$log.debug('Will be creating the flashcard list');
			$log.debug('My known words are: ' + words);
			var cardList = [];
			for (var i = 0; i < data.length; i++) {
				thisVideo = data[i];
				$log.debug('This video is: %o', thisVideo);
				if (cardList.length >= max) {
					$log.debug('Breaking from flashcard list');
					break;
				} else if (words.indexOf(thisVideo.NAME) > -1){
					$log.debug('Already know this word ' + thisVideo.NAME);
					continue;
				} else if (vidList.indexOf(thisVideo.NAME) > -1) {
					$log.debug('This word is in the video list : ' + thisVideo.NAME);
					continue;
				} else {
					cardList.push(thisVideo.NAME);
				}
			};

			return cardList;
		}

		// Change the index of the video to show 
		$scope.changeVideo = function(state){
			if (state == 'next' && $scope.videoIndex < $scope.total) {
				$scope.videoIndex++;
			} else if (state == 'prev' && $scope.videoIndex > 1) {
				$scope.videoIndex--;
			} else if (state == 'next' && $scope.videoIndex == $scope.total) {
				$scope.saveLists();
				return;
			}
			$timeout($scope.playVideo,'500'); // Give a half a second delay before playing the next video
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

		// Here we will save the shown videos & flash-card lists separately. 
		//   This is important as later we will need the data separately to compare the results
		$scope.saveLists = function() {
			// Remove some of the previousely set storages
			// localStorageService.remove($scope.userName + 'knownvideosSubmitted');
			localStorageService.set($scope.userName + 'watchedVideos', true);
			$log.debug('Saving the shown videos & flash-card lists');
			$http({
				method: 'POST',
				url: '../scripts/submit_watches.php',
				data: $.param({
					'user'    : $scope.userName,
					'videos'  : $scope.videosToPlay,
					'flashes' : $scope.cardsToPlay
				}),
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				$log.debug('Successfully inserted watches');
			}).
			error(function(data,status){
				$log.debug('Error is: ' + data);
				alert('An error occured... Please contact SMV support with this code "error 100"');
			});

			$location.path('/thanks');
			$route.reload();
		}

	}]);

})();