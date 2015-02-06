angular.module('gitfitApp.directive.header', [])
  .directive('gitfitHeader', ['Auth', function (Auth) {
    return {
      restrict: 'A',
      templateUrl: '../views/header.html',
      link: function(scope){
      	scope.show = function(){
      		if(Auth.isLoggedIn()){
      			//apply css class
      			$('body').addClass('top-padding');
      			return true;
      		}
      	}
      }
    };
  }]);
