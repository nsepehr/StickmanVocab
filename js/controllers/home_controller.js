// It's a good habit to wrap your javascript in a function
(function() {

	var app = angular.module('home.controller', []);

	// Used for the top level controller. Mainly cookie & localStorage
	app.controller('HomeController', ['localStorageService', '$scope', function(localStorageService, $scope){
		$scope.startHereMsg = 'Get Started';

		if ($scope.userName = localStorageService.get('Name')) {
			console.log('Local storage exists');
			$scope.startHereMsg = 'Continue ' + $scope.userName; 
		} else {
			console.log('No local storage');
		}
	}]);
})();