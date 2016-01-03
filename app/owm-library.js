angular.module('owmLibrary', [])

  .constant('OWM_API_PREFIX', 'http://api.openweathermap.org/data/2.5/forecast')
  .constant('OWM_API_KEY', 'bc6fc7b53ddc63677411338b6228360f')
  .constant('OWM_CITIES_JSON_FILE', './owm-cities.json')
  .factory('owmRequest', ['$http', '$q', 'OWM_API_PREFIX', 'OWM_API_KEY', function($http, $q, OWM_API_PREFIX, OWM_API_KEY){
    return function(params){
      var reqParams = angular.extend({}, params, {APPID: OWM_API_KEY});
      return $http.get(OWM_API_PREFIX, {params: reqParams})
        .then(function(response){
          return $q.when(response.data);
        });
    };
  }]) 
  .factory('owmUSCities', ['$http', '$q', 'OWM_CITIES_JSON_FILE', function($http, $q, OWM_CITIES_JSON_FILE) {
    return function() {
      return $http.get(OWM_CITIES_JSON_FILE, {cache: true})
        .then(function(response){
          return $q.when(response.data);
        });
    };
  }])
  .factory('owmFindCity', ['owmRequest', function(owmRequest) {
    return function(q) {
      var params;
      if(q.match(/^\d+$/)) {
        params = {
          id : q
        };
      } else {
        params = {
          q : q
        };
      }
      return owmRequest(params);
    };
  }])
  .factory('owmNearby', ['owmRequest', function(owmRequest) {
    return function(loc) {
      var params = {
        lat : loc.lat,
        lng : loc.lng
      };
      return owmRequest(params);
    };
  }]);
