angular.module('gitfitApp.controller.profile', [])
  .controller('ProfileCtrl', ['$scope', '$routeParams', 'gitfitUser', function ($scope, $routeParams, gitfitUser) {
    // leave it as 'me' some weird bug...
    gitfitUser.show('me').then(function (user) {
      $scope.user = user;
      gitfitUser.food(user);
      gitfitUser.level(user);
      gitfitUser.schedule(user);
    });

    $scope.$on('$routeChangeSuccess', function () {
      console.log('load');
    })

    $scope.quotes = [
      'A branch, a tag, and a reflog walk into a bar. The bartender says, "What is this, some sort of rebase?"',
      'You can checkout any time you like, but you can never commit.',
      'I kissed a git, and I liked it. I hope my repo don\'t mind it.',
      'The git that keeps on giving.',
      'When you play the game of clones, you merge or you reset --hard.',
      'git is one byte short of a four-letter word.',
      'Once you go git, you never go back.',
      'This is not the greatest commit in the world, this is just a cherry-pick.',
      'No, I\'m gitticus!',
      'GitMan: Able to merge 8-headed octopoii in a single command! X-Ray vision of all code history!',
      'In Git we trust!'
    ];

    $scope.quote = $scope.quotes[Math.floor(Math.random() * $scope.quotes.length)];
  }]);
