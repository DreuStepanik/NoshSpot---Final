(function() {
  'use strict';

  angular
    .module('app')
    .factory('customerFactory', customerFactory);

  customerFactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

  /* @ngInject */
  function customerFactory($http, $q, CRUDFactory, apiUrl) {
    return CRUDFactory(apiUrl + '/customers', 'customer');
  }
})();