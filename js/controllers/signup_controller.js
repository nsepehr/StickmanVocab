// It's a good habit to wrap your javascript in a function
(function() {

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	var app = angular.module('signup.controller', []);

	app.controller('SignupFormController', ['$scope', '$http', '$state', 'localStorageService', function($scope, $http, $state, localStorageService) {
		// This hash will contain the form information
		this.formData = {};
		$scope.educationList = [
			{'level': 'None'} ,
			{'level': 'High School Diploma'}, 
			{'level': 'Bachelor Degree'},
			{'level': 'Higher Education'}
		];

		$scope.checkCookie = function() {
			if (userName = localStorageService.get('Name')) {
				console.log = 'I see local storage';
				if (done = localStorageService.get('Completed')) {
					console.log = 'This user has completed test';
				}
				$state.go('guide');
			} else {
				console.log('No local storage... fillout the form');
			}
		}

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
})();