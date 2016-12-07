(function() {
  'use strict';

  angular
    .module('app')
    .factory('CustomerFactory', CustomerFactory);

  CustomerFactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

  /* @ngInject */
  function CustomerFactory($http, $q, CRUDFactory, apiUrl) {
    return CRUDFactory(apiUrl + '/customers', 'customer');
  }
})();