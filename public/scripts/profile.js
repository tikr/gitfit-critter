angular.module('gitfitApp.controller.profile', [])
  .controller('ProfileCtrl', ['$scope', 'gitfitUser', function ($scope, gitfitUser) {
    gitfitUser.show('rvbsanjose').then(function (user) {
      $scope.user = user;
      c3.generate({
        bindto: '#food',
        data: {
          columns: [
            [ 'Current', (user.critter.food.current / user.critter.food.needed) * 100 ],
            [ 'Needed', 100 - (user.critter.food.current / user.critter.food.needed) * 100 ]
          ],
          type : 'donut'
        },
        donut: {
          title: 'Bytes comsumption'
        },
        color: {
          pattern: ['#63BCB8', '#F56462']
        }
      });
    });
  }]);
