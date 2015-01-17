var site = angular.module('site', ['ui.router', 'site.controllers']);

// configure our routes
site.config(function($stateProvider, $urlRouterProvider) {
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
	});