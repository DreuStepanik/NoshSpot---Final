(function() {
  'use strict';

  angular
    .module('app')
    .factory('OrderFactory', OrderFactory);

  OrderFactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

  /* @ngInject */
  function OrderFactory($http, $q, CRUDFactory, apiUrl) {
    return CRUDFactory(apiUrl + '/orders', 'order');
  }
})();