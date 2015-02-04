angular.module('gitfitApp', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      })
      .when('/critter/:username', {
        templateUrl: 'views/profile.html'
      })
      .otherwise({
        redirectTo: '/'
      });

  $locationProvider.html5Mode(true);
});
