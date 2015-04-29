// It's a good habit to wrap your javascript in a function
(function() {

	var app = angular.module('home.controller', []);

	// Used for the top level controller. Mainly cookie & localStorage
	app.controller('HomeController', ['localStorageService', '$scope', '$log', function(localStorageService, $scope, $log){
		$scope.startHereMsg = 'Get Started';
		$scope.startBtnID = 'startBtn';
		$scope.startUrl = '#/signup';
		$scope.showNotUser = 'false';

		$scope.checkCookie = function() {
			$scope.userName = localStorageService.get('Name');
			var name  = $scope.userName; 
			var email = localStorageService.get('Email');

			if (name && email) {
				$scope.showNotUser = 'true';
				$log.debug('In home... Local storage exists');
				
				if (completedDate = localStorageService.get(email + 'CompletedWatchDate')) {
					$log.debug('User has completed watching the videos');
					$log.debug('My completed date is: ' + completedDate);
					var now = new Date();
					// for debug  ------ NEED to debug further 
					now.setDate(2015,03,01);
					var weekLater = new Date(completedDate);
					weekLater.setDate(weekLater.getDate() + 7);
					// If it is a week after the user has seen all the videos, then take them to the quiz page
					if (weekLater > now) {
						$log.debug('it is a week after you have taken the test');
						$scope.startHereMsg = 'Click here ' + name;
						$scope.startUrl = '#/quiz';
						return;
					} 
				} 
				if (localStorageService.get(email + 'FeedbackDone')) {
					// User has left a feedback and is done with watching the videos... no more action needed
					$log.debug('Feedback is left');
					$scope.startHereMsg = 'Thanks ' + name;
					$scope.startUrl = '#/';
				} else if (localStorageService.get(email + 'watchedVideos')) {
					// User has watched the videos, but didn't leave a feedback... ask for a feedback
					$scope.startHereMsg = 'Leave Feedback ' + name;
					$scope.startUrl = '#/thanks';
				} else if (localStorageService.get(email + 'knownVideosSubmitted')) {
					// User has gone through the guide, but has not watched the videos
					$scope.startHereMsg = 'Continue ' + name;
					$scope.startUrl = '#/videos';
				} else {
					// User cookie available, but seems like the user stopped at guide page
					$scope.startHereMsg = 'Continue ' + name;
					$scope.startUrl = '#/guide';
				}
			} else {
				$log.debug('No local storage');
			}
		}

	}]);
})();