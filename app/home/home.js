viewsModule.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when("/", {
    templateUrl : "./home/home.html",
    controller : 'HomeCtrl'
  });
}]);

viewsModule.controller('HomeCtrl', ['$scope', 'owmUSCities', function($scope, owmUSCities) {
  owmUSCities().then(function(cities) {
    $scope.cities = cities;
  });
}]);
