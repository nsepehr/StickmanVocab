// This is the controller for the quiz page. 

(function() {

	var app = angular.module('quiz.controller', ['checklist-model']);

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	app.controller('QuizController', ['localStorageService', '$location', '$route', '$scope', '$log', 'siteData', '$http',
		function(localStorageService, $location, $route, $scope, $log, siteData, $http) {

		$scope.quizData = {};
		// Need to write the rest after FE comes
	}]);

})();
