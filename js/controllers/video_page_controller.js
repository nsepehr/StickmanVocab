// It's a good habit to wrap your javascript in a function
(function() {

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	var app = angular.module('video.controller', []);	

	app.controller('VideoURLController', ['$scope', '$http', '$state', function($scope, $http, $state) {
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

		$scope.getVideoData = function(){
			$http({
				method: 'GET',
				url: '../scripts/video_data.php',
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				console.log('In getVideoData(). My data is: %o', data);
				$scope.videoData = data;
				$scope.total = $scope.videoData.length;
				$scope.playVideo();
			}).
			error(function(data,status){
				alert('Unable to retrieve video. Please try again!');
			});
		}

		$scope.changeVideo = function(state){
			if (state == 'next' && $scope.videoIndex < $scope.total) {
				$scope.videoIndex++;
			} else if (state == 'prev' && $scope.videoIndex > 1) {
				$scope.videoIndex--;
			} else if (state == 'next' && $scope.videoIndex == $scope.total) {
				$state.go('thanks');
			}
			$scope.playVideo();
		}

		$scope.playVideo = function(){
			thisVideo = $scope.videoData[$scope.videoIndex-1];
			console.log('In playVideo(). My data is: %o', thisVideo);
			angular.element('#'+videoID).get(0).pause();
			angular.element('#'+srcWebID).attr("src", thisVideo.URL); 
			angular.element('#'+videoID).get(0).load();
			angular.element('#'+videoID).get(0).play();
			$scope.videoTitle = thisVideo.NAME;
		};

	}]);

})();