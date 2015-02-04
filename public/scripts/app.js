'use strict';

var app = angular
  .module('pathleteApp', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html'
    })
    .when('/create', {
      templateUrl: 'views/create.html'
    });

  $locationProvider.html5Mode({enabled: true, requireBase: false});
});
