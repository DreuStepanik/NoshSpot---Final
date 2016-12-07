(function() {
  'use strict';

  angular
    .module('app')
    .factory('ReviewFactory', ReviewFactory);

  ReviewFactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

  /* @ngInject */
  function ReviewFactory($http, $q, CRUDFactory, apiUrl) {
    return CRUDFactory(apiUrl + '/reviews', 'review');
  }
})();