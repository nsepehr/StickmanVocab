/* Controllers */
/* 
Here we will write all the controllers for the site.
Not sure if it's a good idea to keep all of the site controllers in one file,
	but will try till we find out :)

*/



// It's a good habit to wrap your javascript in a function
(function() {

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	var app = angular.module('site.controllers', ['checklist-model']);
	
	app.controller('windowCtrl', ['$scope', function ($scope) {
		
		$scope.load = function() {
		/*
	   		$('.full-height').css('height', $(window).height() - 130);
		*/
		};
		$scope.load();
	}]);

	// Used for the top level controller. Mainly cookie & localStorage
	app.controller('MainController', ['localStorageService', '$scope', function(localStorageService, $scope){
		if ($scope.userName = localStorageService.get('Name')) {
			console.log('Local storage already existed');
		} else {
			console.log('No local storage');
		}
	}]);

	app.controller('SignupFormController', ['$scope', '$http', '$state', 'localStorageService', function($scope, $http, $state, localStorageService) {
		// This hash will contain the form information
		this.formData = {};
		this.education = ['None' ,'High School Diploma', 'Bachelor Degree', 'Higher Education'];

		this.submitForm = function(){
			var name  = this.formData.firstName;
			var email = this.formData.email;
			$http({
				method: 'POST',
				url: '../scripts/signup.php', 
				data: $.param({
					'firstName': this.formData.firstName,
					'lastName' : this.formData.lastName,
					'DOB'      : this.formData.DOB,
					'email'    : this.formData.email,
					'nationality' : this.formData.nationality,
					'education': "Works",
					'age'      : this.formData.age
				}),
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				// alert('Successfully inserted ');
				if (localStorageService.set('Name', name) && localStorageService.set('Email', email)) {
					console.log('Local storage Successfully inserted for name: ' + name);
				} else {
					console.log('Unable to set local storage');
				}	
				$state.go('guide');
			}).
			error(function(data,status){
				alert('Failed to submit data: ' + status + ' Reason: ' + data);
			});
		};

	}]);

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