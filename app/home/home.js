viewsModule.config(function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl : "./home/home.html",
    controller : 'HomeCtrl'
  });
});

viewsModule.controller('HomeCtrl', function($scope, owmUSCities, owmHistory) {
  owmHistory.push({ name : "Home", isHome : true });
  owmUSCities()
    .then(function(citiesXhr) {
      $scope.cities = citiesXhr.data;
    });
});
