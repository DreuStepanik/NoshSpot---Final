(function() {
  'use strict';

  angular
    .module('app')
    .factory('StripePaymentFactory', StripePaymentFactory);

  StripePaymentFactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

  /* @ngInject */
  function StripePaymentFactory($http, $q, CRUDFactory, apiUrl) {
    return CRUDFactory(apiUrl + '/payments/charge', 'payment');
  }
})();