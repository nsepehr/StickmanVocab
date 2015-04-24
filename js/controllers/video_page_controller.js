// It's a good habit to wrap your javascript in a function
(function() {

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	var app = angular.module('video.controller', []);	

	app.controller('VideoController', ['$scope', '$http', '$location', '$route','$log', '$timeout', 
		function($scope, $http, $location, $route, $log, $timeout) {
		// ID tags ... May not be the best approach to manipulate the DOM elements directly
		//		ng-src from angular has issues in some browsers. Reading online, seems like there's no good solution
		var videoID = "video-id";
		var srcWebID = "web-vid-src";

		// This will handle the grabbing the URL for the videos
		$scope.total;
		$scope.videoIndex = 1;
		$scope.videoData;
		$scope.videoTitle;
		$scope.videoURL;

		// List of the words the user knew
		$scope.knownWords = {};

		$scope.userName  = localStorageService.get('Email')

		// Get the list of known words for the user
		// Get the list of all videos
		// Based on these two data, create a new data which contains unknown words
		$scope.init = function() {
			$scope.getVideoData();
			$scope.getKnownWords();
			$scope.createVideoList();
			//$scope.createFlashCardList();
		}

		$scope.getVideoData = function(){
			$http({
				method: 'GET',
				url: '../scripts/video_data.php',
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				$log.debug('In getVideoData func. My data is: %o', data);
				$scope.knownWords = data;
			}).
			error(function(data,status){
				alert('Unable to retrieve video. Please try reloading page!');
			});
		}

		$scope.getKnownWords = function(){
			$http({
				method: 'POST',
				url: '../scripts/getknownwords.php',
				data: $.param({
					'user'        : $scope.userName,
				}),
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				$log.debug('In getVideoData func. My data is: %o', data);
				$scope.videoData = data;
				$scope.total = $scope.videoData.length;
				$timeout($scope.playVideo,'1000'); // Give a half a second delay before playing the next video
			}).
			error(function(data,status){
				alert('Unable to retrieve video. Please try reloading page!');
			});
		}

		$scope.changeVideo = function(state){
			if (state == 'next' && $scope.videoIndex < $scope.total) {
				$scope.videoIndex++;
			} else if (state == 'prev' && $scope.videoIndex > 1) {
				$scope.videoIndex--;
			} else if (state == 'next' && $scope.videoIndex == $scope.total) {
				$location.path('/thanks');
				$route.reload();
			}
			$timeout($scope.playVideo,'500'); // Give a half a second delay before playing the next video
		}

		$scope.playVideo = function(){
			thisVideo = $scope.videoData[$scope.videoIndex-1];
			$log.debug('In playVideo func. My data is: %o', thisVideo);
			angular.element('#'+videoID).get(0).pause();
			angular.element('#'+srcWebID).attr("src", thisVideo.URL); 
			angular.element('#'+videoID).get(0).load();
			angular.element('#'+videoID).get(0).play();
			$scope.videoTitle = thisVideo.NAME;
		};

	}]);

})();