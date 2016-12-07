(function() {
  'use strict';

  angular
    .module('app')
    .factory('CategoryFactory', CategoryFactory);

  CategoryFactory.$inject = ['$http', '$q', 'CRUDFactory', 'apiUrl'];

  /* @ngInject */
  function CategoryFactory($http, $q, CRUDFactory, apiUrl) {
    return CRUDFactory(apiUrl + '/categories', 'category');
  }
})();