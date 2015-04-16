// It's a good habit to wrap your javascript in a function
(function() {

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	var app = angular.module('feedback.controller', ['checklist-model']);	

	app.controller('FeedbackController', ['$scope', '$http', '$log', 'localStorageService', function($scope, $http, $log, localStorageService) {
		$scope.videoData;
		this.textArea;

		$scope.videos = {
			checked : []
		};
		var submitBtn = "submitBtn";

		if ($scope.userName = localStorageService.get('Email')) {
			$log.debug('Got the local storage for feedback');
		} else {
			$log.error('Error... no localStorage');
			$scope.userName = 'Unknown';
		}

		$scope.setFinishedCookies = function() {
			// Set the finished cookie anyway
			$log.debug('Setting feedback init cookies');

			var d = new Date();
			if (!localStorageService.set('Completed', true)) {
				$log.error('Unable to set cookie for completion');
			}

			if (!localStorageService.set('CompletedDate', d)) {
				$log.error('Unable to set cookie for completion date');
			}

			return(true);
		}

		$scope.getVideos = function(){
			$http({
				method: 'GET',
				url: '../scripts/video_data.php',
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				$log.debug('In getVideos(). My data is: %o', data);
				$scope.videoData = data;
			}).
			error(function(data,status){
				$log.error('Unable to retrieve video!!');
			});
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
				if (!localStorageService.set('FeedbackDone', true)) {
					$log.error('Unable to set cookie for completion');
				}
			}).
			error(function(data,status){
				$log.error('Unable to send feedback: ' + data);
			});
		}

		this.submitKnownVideos = function(){
			$log.debug("My video list is %o ", $scope.videos);
			$http({
				method: 'POST',
				url: '../scripts/knownvideos.php',
				data: $.param({
					'user'        : $scope.userName,
					'knownWords'  : $scope.videos.checked
				}),
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				$log.debug('Successfully inserted known words');
				$log.debug('Testing known vidoes: ' + data);
			}).
			error(function(data,status){
				$log.error('Unable to send feedback: ' + data);
			});
		}

	}]);

})();