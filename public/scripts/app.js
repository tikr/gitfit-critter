angular.module('gitfitApp',
[
  'ngRoute',
  'gitfitApp.service.user',
  'gitfitApp.controller.profile',
  'gitfitApp.controller.CritterCreateCtrl',
  'gitfitApp.directive.header'
])
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html'
    })
    .when('/critter/create', {
      templateUrl: 'views/create.html',
      controller: 'createCtrl'
    })
    .when('/critter/:username', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl'
    })
    .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CritterCreateCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
});
