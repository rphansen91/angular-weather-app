viewsModule.config(function($routeProvider) {
  $routeProvider.when("/near-me", {
    templateUrl : "./home/near-me.html",
    controller : 'NearMeCtrl'
  });
});

viewsModule.controller('NearMeCtrl', function($scope, geolocation, owmNearby, $location, owmHistory, $q) {
  $scope.loading = true;
  owmHistory.push({ name : "Near Me", isNearMe : true });

  geolocation.getLocation()
    .then(function(data) {
      return $q.when({
        lat: data.coords.latitude,
        lng: data.coords.longitude
      });
    })
    .then(owmNearby)
    .then(function(response){
      if(parseInt(response.cod) > 400){
        return $q.reject(response.message);
      }
      else{
        return $q.when(response);
      }
    })
    .then(function(result) {
      $location.path('/cities/' + result.city.id);
    }, function(){
      // error city not found
    })
    .finally(function(){
      $scope.loading = false;
    });
});
