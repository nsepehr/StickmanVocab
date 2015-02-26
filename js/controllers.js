/* Controllers */
/* 
Here we will write all the controllers for the site.
Not sure if it's a good idea to keep all of the site controllers in one file,
	but will try till we find out :)

*/



// It's a good habit to wrap your javascript in a function
(function() {

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
		this.test = {'firstName': 'Works'};

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
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).
			success(function(data,status){
				alert('Submitted data: ' + data);
			}).
			error(function(data,status){
				alert('Failed to submit data' + status);
			});
		};

	});


})();