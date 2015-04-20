// It's a good habit to wrap your javascript in a function
(function() {

	var app = angular.module('home.controller', []);

	// Used for the top level controller. Mainly cookie & localStorage
	app.controller('HomeController', ['localStorageService', '$scope', '$log', function(localStorageService, $scope, $log){
		$scope.startHereMsg = 'Get Started';
		$scope.startBtnID = 'startBtn';
		$scope.startUrl = 'signup';

		$scope.checkCookie = function() {
			var name      = localStorageService.get('Name');
			var completed = localStorageService.get('Completed');
			var completedDate = localStorageService.get('CompletedDate');
			var feedback  = localStorageService.get('FeedbackDone');

			if (name) {
				$log.debug('In home... Local storage exists');
				//angular.element('#'+$scope.startBtnID).attr("ui-sref", '#');
				if (completed) {
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
						$scope.startUrl = 'quiz';
					} else if (!feedback) {
						// If it hasn't been a wekk and user hasn't left a feedback, take them to feedback page
						$log.debug('No feedback is left');
						$scope.startHereMsg = 'Pease leave feedback ' + name;
						$scope.startUrl = 'thanks';
					} else {
						// User has finished watching the videos and has left a feedback
						// But it is not a week after the feedback is left
						$scope.startHereMsg = 'Thanks ' + name;
						$scope.startUrl = '#';
					}
				} else {
					// User has not finished watching all the videos
					$scope.startHereMsg = 'Continue ' + name;
					$scope.startUrl = 'guide'; // User has finished the test, stay on page
				}
			} else {
				$log.debug('No local storage');
			}
		}

	}]);
})();