// It's a good habit to wrap your javascript in a function
(function() {

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	var app = angular.module('feedback.controller', ['checklist-model']);	

	app.controller('FeedbackController', ['$scope', '$http', 'localStorageService',function($scope, $http, localStorageService) {
		$scope.videoData;
		this.textArea;

		$scope.videos = {
			checked : []
		};
		var submitBtn = "submitBtn";

		if ($scope.userName = localStorageService.get('Email')) {
			console.log('Got the local storage for feedback');
		} else {
			console.log('Error... no localStorage');
			$scope.userName = 'Unknown';
		}

		$scope.getVideos = function(){
			$http({
				method: 'GET',
				url: '../scripts/video_data.php',
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				console.log('In getVideos(). My data is: %o', data);
				$scope.videoData = data;
			}).
			error(function(data,status){
				console.log('Unable to retrieve video. Please try again!');
			});
		}

		this.submitFeedback = function(){
			console.log("My text is: " + this.textArea);
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
				console.log('Successfully sent feedback');
				console.log('Testing known vidoes: ' + data);
				angular.element('#'+submitBtn).attr("disabled", true);
				angular.element('#'+submitBtn).attr("value", "Thank You");
			}).
			error(function(data,status){
				console.log('Unable to send feedback: ' + data);
			});
		}

		this.submitKnownVideos = function(){
			console.log("My video list is %o ", $scope.videos);
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
				console.log('Successfully inserted known words');
				console.log('Testing known vidoes: ' + data);
			}).
			error(function(data,status){
				console.log('Unable to send feedback: ' + data);
			});
		}

	}]);

})();