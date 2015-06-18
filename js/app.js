
/* 
	The angular module for the SMV site. 
	Created by: Nima Sepehr
	Date: 04/27/2015

	All rights reserved. You may NOT copy or distribute ANY of the code. 

*/


var site = angular.module('testSite', ['ngRoute', 'LocalStorageModule', 'home.controller', 
	'signup.controller', 'guide.controller','video.controller', 'feedback.controller', 'quiz.controller']);


// Create a service to pass data between controllers
site.factory('siteData', function() {
	
	var savedData = {}
	function set(key,value) {
		savedData['key'] = value;
	}

	function get(key) {
		return savedData['key'];
	}

	return {
		set: set,
		get: get
	}

});

// Create a service for calling the video data php to get the video data needed
site.factory('httpVideoDataService', function($http) {
	var myData = function() {
		return $http({method: "GET", url: '../scripts/video_data.php'}).success(function(result){
			return result.data;
		})
	};
	return {
		get: myData
	};
});

// Create a service for calling the video data php to get the video data needed
site.factory('httpQuizDataService', function($http) {
	var myData = function() {
		return $http({method: "GET", url: '../scripts/getquizdata.php'}).success(function(result){
			return result.data;
		})
	};
	return {
		get: myData
	};
});

// Create a service for getting the known words list. This is for backup in case users reload the page. 
//    since in angular when the page gets reloaded the data gets lost
site.factory('httpWatchesService', function($http) {

	var myData = function(user) {

		// if (knownWords = siteData.get('knownWords')) {
		// 	$log.debug('Got the known words through angualr');
		// 	return knownWords;
		// } 

		return $http({method: "GET", url: '../scripts/getwatches.php?user='+user})
			.success(function(result){
				return result.data;
			})  
			.error(function(result, status){
				//$log.error('Could not get knownvideos. status: ' + status + ' Reason: ' + result);
				alert('Failed to grab data. Please try reloading the page! If issue continues contact support');
				return;
			})

		//$log.debug('Done with the known words service');
	};

	return {
		get: myData
	};
});


// configure our routes
site.config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, localStorageServiceProvider) {
	// Local storage and cookie
	localStorageServiceProvider
	.setPrefix('testSite') // prefixes to any key
	.setStorageCookie('360', '/') // In case of fallback set cookie on top domain & expiration of a year
	.setStorageCookieDomain('') // will need to update once launched the product

	$routeProvider
		
		.when('/home', {
			templateUrl: "pages/home.html", 
			controller: 'HomeController'
		})

		.when('/signup', {
			templateUrl: "pages/signup.html", 
			controller: 'SignupFormController'
		})

		.when('/guide', {
			templateUrl: "pages/guide.html", 
			controller: 'GuideController'
		})

		.when('/video', {
			url: "/video",
			templateUrl: "pages/video.html", 
			controller: 'VideoController'
		})

		.when('/quiz', {
			templateUrl: "pages/quiz.html", 
			controller: 'QuizController'
		})

		.when('/thanks', {
			templateUrl: "pages/thanks.html",
			controller: 'FeedbackController'
		})

		.otherwise({
			redirectTo: '/home'
		});
}]);