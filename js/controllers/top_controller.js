// It's a good habit to wrap your javascript in a function
(function() {

	var app = angular.module('main.controller', []);
	
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
})();