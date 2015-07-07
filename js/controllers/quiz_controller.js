// This is the controller for the quiz page. 

(function() {

	var app = angular.module('quiz.controller', ['checklist-model']);

	// Variables specific to these controllers
	contentType = 'application/x-www-form-urlencoded';

	app.controller('QuizController', ['localStorageService', '$location', '$route', '$scope', '$log', 'siteData', '$http', 'httpQuizDataService' , 'httpWatchesService', '$routeParams',
		function(localStorageService, $location, $route, $scope, $log, siteData, $http, httpQuizDataService, httpWatchesService, $routeParams) {

		$scope.chosen;

		
		$scope.init = function() {
			$scope.watches = [];
			$scope.quizData = {};

			if ($routeParams.user != undefined) {
				$scope.user = $routeParams.user;
				$log.debug('Got the user name from URL: ' + $scope.user);
				localStorageService.set('Email', $scope.user); // Set so it doesn't show the contact message
			} else {
				$scope.user	   = localStorageService.get('Email');
			}


			if ($scope.user == undefined || $scope.user == '') {
				alert('Could NOT determine your user name. Please contact support');
				$location.path('/home');
				$route.reload();
				return;
			}

			localStorageService.set($scope.user + 'noShowContact', true); // Set so it doesn't show the contact message

			if (localStorageService.get($scope.user + 'QuizDone') === true) {
				alert('You have already taken the quiz. Thanks!!');
				$location.path('/home');
				$route.reload();
				return;
			}

			if (localStorageService.get($scope.user + 'QuizNum') >= 0) {
				$log.debug('I have a quizNum set before');
				$scope.quizNum = localStorageService.get($scope.user + 'QuizNum');
			} else {
				$scope.quizNum = 0;
			}

			$scope.chosen;
			$scope.Question;
			$scope.choiceA;
			$scope.choiceB;
			$scope.choiceC;
			$scope.choiceD;
			$scope.choiceE;
			$scope.choiceF;
			
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
			localStorageService.set($scope.user + 'QuizNum', $scope.quizNum);
			if ($scope.chosen == false) {
				alert('Please choose an answer');
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

			if ($scope.quizNum >= $scope.watches.length){
				localStorageService.set($scope.user + 'QuizDone', true);
				$location.path('/thanks');
				$route.reload();
				return;
			}

			$scope.choiceA = '';
			$scope.choiceB = '';
			$scope.choiceC = '';
			$scope.choiceD = '';
			$scope.choiceE = '';
			$scope.choiceF = '';
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
					$scope.choiceF = obj.F;
				}
			}
			$log.debug("my E choice is : " + $scope.choiceE);
			$scope.chosen = false;
		}
	}]);

})();
