// The main purpose of the guide controller is to make sure the user has previously signed up

(function() {

	var app = angular.module('guide.controller', ['checklist-model', 'ui.select', 'ngSanitize']);

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	app.controller('GuideController', ['localStorageService', '$location', '$route', '$scope', '$log', 'siteData', '$http',
		function(localStorageService, $location, $route, $scope, $log, siteData, $http) {


		//$scope.videoData = {};
		$scope.videoData = [];
		$scope.vidSelect = {};

		//$scope.flashData = {};
		$scope.flashData = [];
		$scope.flashSelect = {};

		var submitBtn = "submitBtn";
		$scope.mustSelectNum = 7;

		$scope.userName  = localStorageService.get('Email')
		$scope.seenGuide = localStorageService.get($scope.userName + 'knownvideosSubmitted')


		// Initial functions to run
		$scope.init = function() {
			// Check to see if the user has signed up
			$scope.checkSignUp();
			// Get the video data which gets used in creating the checkboxes for known words 
			$scope.getData();
			// Check if user previously viewed the guide and submitted known words
			$scope.checkKnownWordsSubmitted();
		}

		// Check whether the user has signed up in the previous page
		// For now we're relying on site cookie. We can use the angualr factory/data, but the problem is if they reload the page, that data will be gone.
		$scope.checkSignUp = function() {
			if ($scope.userName) {
				$log.debug('UserName data avaialble... can continue');
			} else {
				$log.debug('UserName data not available... must sign up');
				$location.path('/signup');
				$route.reload();
			}
		}

		// Uses a cookie to see if the user previously viewd and guide and submitted known words
		//   If the user has submitted, then move to the video page
		$scope.checkKnownWordsSubmitted = function() {
			if ($scope.seenGuide) {
				angular.element('#'+submitBtn).attr("value", "Back to video");
				// Need to get the data from known videos and checkmark the known words
				//for (video in $scope.videoData) {
				//	angular.element('#'+video.NAME).attr('checked', true);
				//};
			}
		}

		// Get the video data from the mySQL data base by calling the php script
		$scope.getData = function(){
			$http({
				method: 'GET',
				url: '../scripts/video_data.php',
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				$log.debug('In getVideoData func. My data is: %o', data);
				$scope.videoData = data['videos'];
				$scope.flashData = data['flashes'];
			}).
			error(function(data,status){
				alert('Unable to retrieve video. Please try reloading page!');
			});
		}

		// Submit the words the user knows to the data base
		//   If the user has already seen the guide and submitted known videos, then skip submittion.
		$scope.submitWatches = function(){
			var videos = []; var flashes = [];
			for (var i = 0; i < $scope.vidSelect.selected.length; i++) {
				//$log.debug('My item for vidSelect is: ');
				//$log.debug($scope.vidSelect.selected[i]);
				obj = $scope.vidSelect.selected[i];
				videos[i] = obj.NAME;
			};

			for (var i = 0; i < $scope.flashSelect.selected.length; i++) {
				//$log.debug('My item for vidSelect is: ');
				//$log.debug($scope.vidSelect.selected[i]);
				obj = $scope.flashSelect.selected[i];
				flashes[i] = obj.NAME;
			};


			$log.debug('My video list is: %o', videos);
			$log.debug('My flash list is: %o', flashes);
			if ($scope.seenGuide) {
				$location.path('/video');
				$route.reload();
				return;
			}

			$http({
				method: 'POST',
				url: '../scripts/submit_watches.php',
				data: $.param({
					'user'    : $scope.userName,
					'videos'  : videos,
					'flashes' : flashes
				}),
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				$log.debug('Successfully inserted known words');
				localStorageService.set($scope.userName + 'knownvideosSubmitted', true);
				siteData.set('videosToWatch', videos);
				siteData.set('flashesToWatch', flashes);
				$location.path('/video');
				$route.reload();
			}).
			error(function(data,status){
				$log.debug('Error is: ' + data);
				alert('Unable to continue, please try again');
				$route.reload(); // Is this a good idea?
			});
		}

	}]);

})();