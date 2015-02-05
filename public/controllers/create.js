angular.module('gitfitApp')
.controller('createCtrl', function($scope, $window, gitfitUser){
	$scope.githubAuth = function(){
		//get encodedId for logged in user
		gitfitUser.show('me')
		.then(function(user){
			var id = user.fitbit.user.encodedId;
		  $window.location.href = '/auth/github?encodedId='+id;
		})
	};
});