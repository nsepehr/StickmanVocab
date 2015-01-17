/* Controllers */

angular.module('site.controllers', [])

	
	.controller('windowCtrl', ['$scope', function ($scope) {
		
		$scope.load = function() {
		/*
		   $('.full-height').css('height', $(window).height() - 130);
		*/
		};

		$scope.load();

	}]);
