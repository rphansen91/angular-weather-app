angular.module('owmApp', ['owmAppViews', 'ngRoute', 'ngAnimate'])
  .config(function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({
      redirectTo : '/'
    });
  })
