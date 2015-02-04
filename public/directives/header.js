angular.module('gitfitApp', [])
  .directive('gitfitHeader', [function () {
    return {
      restrict: 'A',
      templateUrl: '../views/header.html'
    };
  }]);
