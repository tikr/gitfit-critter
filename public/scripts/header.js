angular.module('gitfitApp.controller.header', [])
.controller('HeaderCtrl', function($scope, $window, Auth){
	$scope.isLoggedIn = function(){
		return Auth.isLoggedIn();
	};
});