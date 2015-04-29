// It's a good habit to wrap your javascript in a function
(function() {

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	var app = angular.module('signup.controller', []);

	app.controller('SignupFormController', ['$scope', '$http', '$location', '$route', '$log', 'siteData', 'localStorageService', 
		function($scope, $http, $location, $route, $log, siteData, localStorageService) {
		// This hash will contain the form information
		this.formData = {};
		$scope.educationList = [
			{'level': 'None'} ,
			{'level': 'High School Diploma'}, 
			{'level': 'Bachelor Degree'},
			{'level': 'Higher Education'}
		];

		this.submitForm = function(){
			var name  = this.formData.firstName;
			var email = this.formData.email;
			$http({
				method: 'POST',
				url: '../scripts/signup.php', 
				data: $.param({
					'firstName': this.formData.firstName,
					'lastName' : this.formData.lastName,
					'email'    : this.formData.email,
					'nationality' : this.formData.nationality,
					'education': this.formData.education.level,
					'age'      : this.formData.age
				}),
				headers: {'Content-Type': contentType}
			}).
			success(function(data,status){
				// alert('Successfully inserted ');
				// siteData.set('UserName', name);
				// siteData.set('UserEmail', email);
				if (localStorageService.set('Name', name) && localStorageService.set('Email', email)) {
					$log.debug('Local storage Successfully inserted for name: ' + name);
				} else {
					$log.debug('Unable to set local storage');
				}

				$log.debug('Chaning location to guide');
				$location.path('/guide'); // Go to the guide page
				$route.reload();
			}).
			error(function(data,status){
				alert('Failed to submit data: ' + status + ' Reason: ' + data);
			});
		};

	}]);
})();