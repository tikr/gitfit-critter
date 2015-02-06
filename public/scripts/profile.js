angular.module('gitfitApp.controller.profile', [])
  .controller('ProfileCtrl', ['$scope', 'gitfitUser', function ($scope, gitfitUser) {
    gitfitUser.show('rvbsanjose').then(function (user) {
      $scope.user = user;
      gitfitUser.food(user);
      gitfitUser.schedule(user);
    });
  }]);
