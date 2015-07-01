// It's a good habit to wrap your javascript in a function
(function() {

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	var app = angular.module('signup.controller', []);

	app.controller('SignupFormController', ['$scope', '$http', '$location', '$route', '$log', 'siteData', 'localStorageService', 
		function($scope, $http, $location, $route, $log, siteData, localStorageService) {
		// This hash will contain the form information
		$scope.formData = {};
		$scope.educationList = [
			{'level': 'None'} ,
			{'level': 'High School Diploma'}, 
			{'level': 'Bachelor Degree'},
			{'level': 'Higher Education'}
		];

		$scope.checkLastName = function() {
			var name = $scope.formData.lastName;
			if (name.length > 0) {
				$scope.lastStatClass = "glyphicon glyphicon-ok";
			} else {
				$scope.lastStatClass = "glyphicon glyphicon-remove";
			}
		}

		$scope.checkFirstName = function() {
			var name = $scope.formData.firstName;
			if (name.length > 0) {
				$scope.firstStatClass = "glyphicon glyphicon-ok";
			} else {
				$scope.firstStatClass = "glyphicon glyphicon-remove";
			}
		}

		$scope.checkNationality = function() {
			var name = $scope.formData.nationality;
			if (name.length > 0) {
				$scope.nationalityStatClass = "glyphicon glyphicon-ok";
			} else {
				$scope.nationalityStatClass = "glyphicon glyphicon-remove";
			}
		}

		$scope.checkAge = function() {
			var age = $scope.formData.age;
			if (age > 9 && age < 99) {
				$scope.ageStatClass = "glyphicon glyphicon-ok";
				$scope.ageError = false;
			} else {
				$scope.ageStatClass = "glyphicon glyphicon-remove";
				$scope.ageError = true;
			}
		}

		$scope.checkEmail = function() {
			var email = $scope.formData.email;
			var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    		if(re.test(email)) {
    			$scope.emailStatClass = "glyphicon glyphicon-ok";
    		} else {
    			$scope.emailStatClass = "glyphicon glyphicon-remove";
    		}
		}

		$scope.submitForm = function(){
			var name  = $scope.formData.firstName;
			var email = $scope.formData.email;
			$http({
				method: 'POST',
				url: '../scripts/signup.php', 
				data: $.param({
					'firstName': $scope.formData.firstName,
					'lastName' : $scope.formData.lastName,
					'email'    : $scope.formData.email,
					'nationality' : $scope.formData.nationality,
					'education': $scope.formData.education.level,
					'age'      : $scope.formData.age
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
				var re = /Duplicate entry.*for key 'PRIMARY'/i;
				if (re.test(data)) {
					alert('The entered Email address has already been used. Please provide another valid email address');
					$scope.emailStatClass = "glyphicon glyphicon-remove";
				} else {
					alert('Failed to submit data: ' + status);
					//alert('Failed to submit data: ' + status + ' Reason: ' + data);
				}
			});
		};

	}]);
})();