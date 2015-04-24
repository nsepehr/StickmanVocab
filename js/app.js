
var site = angular.module('testSite', ['ngRoute','LocalStorageModule', 'home.controller', 'signup.controller', 'guide.controller','video.controller', 'feedback.controller']);

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
			templateUrl: "pages/quiz.html"
		})

		.when('/thanks', {
			templateUrl: "pages/thanks.html",
			controller: 'FeedbackController'
		})

		.otherwise({
			redirectTo: '/home'
		});
}]);