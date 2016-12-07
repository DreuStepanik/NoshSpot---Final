(function() {
  'use strict';

  angular
    .module('app')
    .factory('restaurantFactory', restaurantFactory);

  restaurantFactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

  /* @ngInject */
  function restaurantFactory($http, $q, CRUDFactory, apiUrl) {
    return CRUDFactory(apiUrl + '/restaurants', 'restaurant');
  }
})();