angular.module('gitfitApp.directive.header', [])
  .directive('gitfitHeader', [function () {
    return {
      restrict: 'A',
      templateUrl: '../views/header.html'
    };
  }]);
