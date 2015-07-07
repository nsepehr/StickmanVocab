// It's a good habit to wrap your javascript in a function
(function() {

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	var app = angular.module('feedback.controller', ['checklist-model']);	

	app.controller('FeedbackController', ['$scope', '$http', '$log', 'localStorageService', '$location', '$route', 
		function($scope, $http, $log, localStorageService, $location, $route) {
		$scope.videoData;
		$scope.showContact = true;
		this.textArea;

		$scope.videos = {
			checked : []
		};
		var submitBtn = "submitBtn";

		if ($scope.userName = localStorageService.get('Email')) {
			$log.debug('Got the local storage for feedback for user: ' + $scope.userName);
		} else {
			$log.error('Error... no localStorage');
			$location.path('/signup');
			$route.reload();
			return;
		}

		if (localStorageService.get($scope.userName + 'noShowContact')) {
			$log.debug('Not showing contact');
			$scope.showContact = false;
		}

		$scope.setFinishedCookies = function() {
			// Set the finished cookie anyway
			$log.debug('Setting feedback init cookies');

			var d = new Date();
			if (!localStorageService.set($scope.userName + 'CompletedWatchDate', d)) {
				$log.error('Unable to set cookie for completion date');
			}

			return(true);
		}

		this.submitFeedback = function(){
			$log.debug("My text is: " + this.textArea);
			$http({
				method: 'POST',
				url: '../scripts/feedback.php',
				data: $.param({
					'user'        : $scope.userName,
					'feedbackText': this.textArea
				}),
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				$log.debug('Successfully sent feedback');
				$log.debug('Testing known vidoes: ' + data);
				angular.element('#'+submitBtn).attr("disabled", true);
				angular.element('#'+submitBtn).attr("value", "Thank You");
				if (!localStorageService.set($scope.userName + 'FeedbackDone', true)) {
					$log.error('Unable to set cookie for completion');
				}
			}).
			error(function(data,status){
				$log.error('Unable to send feedback: ' + data);
			});
		}

	}]);

})();