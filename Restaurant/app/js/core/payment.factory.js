(function() {
  'use strict';

  angular
    .module('app')
    .factory('PaymentFactory', PaymentFactory);

  PaymentFactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

  /* @ngInject */
  function PaymentFactory($http, $q, CRUDFactory, apiUrl) {
    return CRUDFactory(apiUrl + '/payments', 'payment');
  }
})();