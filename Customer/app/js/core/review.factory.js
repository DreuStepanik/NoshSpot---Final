(function() {
  'use strict';

  angular
    .module('app')
    .factory('reviewFactory', reviewFactory);

  reviewFactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

  /* @ngInject */
  function reviewFactory($http, $q, CRUDFactory, apiUrl) {
    return CRUDFactory(apiUrl + '/reviews', 'review');
  }
})();