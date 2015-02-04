angular.module('gitfitApp',
[
  'ngRoute',
  'gitfitApp.service.user',
  'gitfitApp.controller.profile',
  'gitfitApp.directive.header'
])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html'
    })
    .when('/critter/:username', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
