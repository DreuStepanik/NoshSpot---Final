(function() {
  'use strict';

  angular
    .module('app')
    .factory('OrderItemFactory', OrderItemFactory);

  OrderItemFactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

  /* @ngInject */
  function OrderItemFactory($http, $q, CRUDFactory, apiUrl) {
    return CRUDFactory(apiUrl + '/orderItems', 'orderItem');
  }
})();