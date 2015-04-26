// The main purpose of the guide controller is to make sure the user has previously signed up

(function() {

	var app = angular.module('guide.controller', ['checklist-model']);

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	app.controller('GuideController', ['localStorageService', '$location', '$route', '$scope', '$log', 'siteData', '$http',
		function(localStorageService, $location, $route, $scope, $log, siteData, $http) {
		
		$scope.videoData  = {};
		$scope.words = {
			know: []
		}

		var submitBtn = "submitBtn";

		 $scope.userName  = localStorageService.get('Email')
		 $scope.seenGuide = localStorageService.get($scope.userName + 'knownvideosSubmitted')

		// Initial functions to run
		$scope.init = function() {
			// Check to see if the user has signed up
			$scope.checkSignUp();
			// Get the video data which gets used in creating the checkboxes for known words 
			$scope.getVideoData();
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
		$scope.getVideoData = function(){
			$http({
				method: 'GET',
				url: '../scripts/video_data.php',
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				$log.debug('In getVideoData func. My data is: %o', data);
				$scope.videoData = data;
			}).
			error(function(data,status){
				alert('Unable to retrieve video. Please try reloading page!');
			});
		}

		// Submit the words the user knows to the data base
		//   If the user has already seen the guide and submitted known videos, then skip submittion.
		$scope.submitKnownWords = function(){
			if ($scope.seenGuide) {
				$location.path('/video');
				$route.reload();
				return;
			} else if ($scope.words.know.length >= $scope.videoData.length - 1) {
				alert('Can NOT qualify you for this test... You know too many words :)');
				return;
			}

			if ($scope.words.know.length == 0) {
				// Make the list at least have one dummy value
				$scope.words.know.push('NONE');
			}

			$http({
				method: 'POST',
				url: '../scripts/knownwords.php',
				data: $.param({
					'user'        : $scope.userName,
					'knownWords'  : $scope.words.know
				}),
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				$log.debug('Successfully inserted known words');
				localStorageService.set($scope.userName + 'knownvideosSubmitted', true);
				siteData.set('knownWords', $scope.words.know);
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