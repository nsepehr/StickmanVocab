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

	var app = angular.module('site.controllers', []);
	
	app.controller('windowCtrl', ['$scope', function ($scope) {
		
		$scope.load = function() {
		/*
	   		$('.full-height').css('height', $(window).height() - 130);
		*/
		};
		$scope.load();
	}]);

	app.controller('SignupFormController', function($scope, $http) {
		// This hash will contain the form information
		this.formData = {};

		this.submitForm = function(){
			$http({
				method: 'POST',
				url: '../scripts/signup.php', 
				data: $.param({
					'firstName': this.formData.firstName,
					'lastName' : this.formData.lastName,
					'DOB'      : this.formData.DOB,
					'email'    : this.formData.email,
					'nationality' : this.formData.nationality
				}),
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				alert('Successfully inserted ');
			}).
			error(function(data,status){
				alert('Failed to submit data' + status);
			});
		};

	});

	app.controller('VideoURLController', ['$scope', '$http', function($scope, $http) {
		// ID tags ... May not be the best approach to manipulate the DOM elements directly
		//		ng-src from angular has issues in some browsers. Reading online, seems like there's no good solution
		var videoID = "video-id";
		var srcWebID = "web-vid-src";

		// This will handle the grabbing the URL for the videos
		$scope.total = 10;
		$scope.videoIndex = 1;
		$scope.videoTitle;
		$scope.videoURL;

		$scope.changeVideo = function(state){
			if (state == 'next' && $scope.videoIndex < $scope.total) {
				$scope.videoIndex++;
			} else if (state == 'prev' && $scope.videoIndex > 1) {
				$scope.videoIndex--;
			}
			$scope.playVideo();
		}

		$scope.playVideo = function(){
			$http({
				method: 'POST',
				url: '../scripts/video_url.php',
				data: $.param({
					'video-index': $scope.videoIndex
				}),
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				console.log('My data is: %o', data);
				angular.element('#'+videoID).get(0).pause();
				angular.element('#'+srcWebID).attr("src", data.videoURL); 
				angular.element('#'+videoID).get(0).load();
				angular.element('#'+videoID).get(0).play();
				//$scope.videoURL = $sce.trustAsResourceUrl(data.videoURL);
				$scope.videoURL = data.videoURL;
				$scope.videoTitle = data.videoTitle;
			}).
			error(function(data,status){
				alert('Unable to retrieve video. Please try again!');
			});
		};

	}]);

/* Couldn't get this to work
	app.directive('video', function() {
    	return {
      		restrict: 'E',
      		link: function(scope, element) {
        		scope.$on('$destroy', function() {
          			element.prop('src', '');
        		});
      		}
    	};
    });
*/


})();