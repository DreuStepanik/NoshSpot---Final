(function() {
  'use strict';

  angular
    .module('app')
    .factory('RestaurantFactory', RestaurantFactory);

  RestaurantFactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

  /* @ngInject */
  function RestaurantFactory($http, $q, CRUDFactory, apiUrl) {
    return CRUDFactory(apiUrl + '/restaurants', 'restaurant');
  }
})();