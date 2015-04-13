
var site = angular.module('testSite', ['ui.router','LocalStorageModule', 'main.controller', 'signup.controller', 'video.controller', 'feedback.controller']);

// configure our routes
site.config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
	// Local storage and cookie
	localStorageServiceProvider
	.setPrefix('testSite') // prefixes to any key
	.setStorageCookie('360', '/') // In case of fallback set cookie on top domain & expiration of a year
	.setStorageCookieDomain('') // will need to update once launched the product


	// Fallback State
	$urlRouterProvider.otherwise('/');

	$stateProvider
		
		.state('home', {
			url: "/",
			templateUrl: "pages/home.html"
		})

		.state('about', {
			url: "/about",
			templateUrl: "pages/about.html"
		})

		.state('signup', {
			url: "/signup",
			templateUrl: "pages/signup.html"
		})

		.state('guide', {
			url: "/guide",
			templateUrl: "pages/guide.html"
		})

		.state('video', {
			url: "/video",
			templateUrl: "pages/video.html"
		})

		.state('quiz', {
			url: "/quiz",
			templateUrl: "pages/quiz.html"
		})

		.state('thanks', {
			url: "/thanks",
			templateUrl: "pages/thanks.html"
		})
}]);