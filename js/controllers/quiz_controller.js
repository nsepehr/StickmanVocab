// This is the controller for the quiz page. 

(function() {

	var app = angular.module('quiz.controller', ['checklist-model']);

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	app.controller('QuizController', ['localStorageService', '$location', '$route', '$scope', '$log', 'siteData', '$http', 'httpQuizDataService' , 'httpWatchesService',
		function(localStorageService, $location, $route, $scope, $log, siteData, $http, httpQuizDataService, httpWatchesService) {

		$scope.chosen;
		
		$scope.init = function() {
			$scope.watches = [];
			$scope.quizData = {};
			$scope.user	   = localStorageService.get('Email')
			$scope.chosen;

			$scope.Question;
			$scope.choiceA;
			$scope.choiceB;
			$scope.choiceC;
			$scope.choiceD;
			$scope.choiceE;
			$scope.quizNum = 0;
			var dataPromise = httpQuizDataService.get();
			dataPromise.then(function(result) {
				$log.debug('In getting quiz data. My data is: %o', result.data);
				$scope.quizData = result.data;

				// Get the list of videos watched
				var wordPromise = httpWatchesService.get($scope.user);
				wordPromise.then(function(result) {
					var data = result.data;
					$log.debug('In getWatches func. My data is: %o', data);
					for (var i = 0 ; i < data['videos'].length; i++) {
						$scope.watches.push(data['videos'][i]);
					};
					for (var i = 0 ; i < data['flashes'].length; i++) {
						$scope.watches.push(data['flashes'][i]);
					};
					$log.debug('The watches is: %o', $scope.watches);
					$scope.nextQuiz();
				})
			})
		}

		$scope.nextQuiz = function() {
			$log.debug('Inside the next Quiz func, index is: ' + $scope.quizNum);
			$log.debug('Chosen answer is: ' + $scope.chosen);
			$log.debug('length of watches is: ' + $scope.watches.length);
			if ($scope.chosen == false) {
				alert('Please choose an answer');
				return;
			}
			if ($scope.quizNum >= $scope.watches.length){
				$location.path('/thanks');
				$route.reload();
				return;
			}
			if ($scope.chosen != undefined) {
				$log.debug('Answer id defined');
				$http({
					method: 'POST',
					url: '../scripts/submit_answer.php', 
					data: $.param({
						'user'	: $scope.user,
						'word'  : $scope.Question,
						'answer': $scope.chosen
					}),
					headers: {'Content-Type': contentType}
				}).
				success(function(data,status){
					$log.debug('Successfully submitted');
				}).
				error(function(data,status){
					alert('Failed to submit data... please try again: ' + status + ' Reason: ' + data);
					return;
				});
			}
			$scope.choiceA = '';
			$scope.choiceB = '';
			$scope.choiceC = '';
			$scope.choiceD = '';
			$scope.choiceE = '';
			$scope.quizNum++;
			$scope.Question = $scope.watches[$scope.quizNum-1];
			var thisQ = {};
			for (var i = 0; i < $scope.quizData.length; i++) {
				var obj = $scope.quizData[i];
				if (obj.Word == $scope.Question) {
					$scope.choiceA = obj.A;
					$scope.choiceB = obj.B;
					$scope.choiceC = obj.C;
					$scope.choiceD = obj.D;
					$scope.choiceE = obj.E;
				}
			}
			$scope.chosen = false;
		}
	}]);

})();
